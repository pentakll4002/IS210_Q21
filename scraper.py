import os
import re
import csv
import random
import requests
from datetime import datetime
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Nike.com URLs to scrape (these return server-rendered HTML with product data)
# ---------------------------------------------------------------------------
NIKE_URLS = [
    # General / Shop All
    "https://www.nike.com/w/mens-nik1",
    "https://www.nike.com/w/womens-5e1x6",
    "https://www.nike.com/w/kids-v4dh",
    
    # Men's Shoes
    "https://www.nike.com/w/mens-shoes-nik1zy7ok",
    "https://www.nike.com/w/mens-lifestyle-shoes-13jrmznik1zy7ok",
    "https://www.nike.com/w/mens-jordan-shoes-37eefznik1zy7ok",
    "https://www.nike.com/w/mens-running-shoes-37v7jznik1zy7ok",
    "https://www.nike.com/w/mens-basketball-shoes-3glsmznik1zy7ok",
    "https://www.nike.com/w/mens-dunk-shoes-90aohznik1zy7ok",
    "https://www.nike.com/w/mens-air-max-shoes-a6d8hznik1zy7ok",
    "https://www.nike.com/w/mens-air-force-1-shoes-5sj3yznik1zy7ok",

    # Men's Clothing & Accessories
    "https://www.nike.com/w/mens-clothing-6ymx6znik1",
    "https://www.nike.com/w/mens-tops-t-shirts-9om13znik1",
    "https://www.nike.com/w/mens-hoodies-pullovers-68sqhznik1",
    "https://www.nike.com/w/mens-pants-tights-2kq19znik1",
    "https://www.nike.com/w/mens-accessories-equipment-awwpwznik1",
    "https://www.nike.com/w/mens-bags-backpacks-a5a4xznik1",

    # Women's Shoes
    "https://www.nike.com/w/womens-shoes-5e1x6zy7ok",
    "https://www.nike.com/w/womens-lifestyle-shoes-13jrmz5e1x6zy7ok",
    "https://www.nike.com/w/womens-jordan-shoes-37eefz5e1x6zy7ok",
    "https://www.nike.com/w/womens-running-shoes-37v7jz5e1x6zy7ok",

    # Women's Clothing & Accessories
    "https://www.nike.com/w/womens-clothing-5e1x6z6ymx6",
    "https://www.nike.com/w/womens-tops-t-shirts-5e1x6z9om13",
    "https://www.nike.com/w/womens-hoodies-pullovers-5e1x6z68sqh",
    "https://www.nike.com/w/womens-pants-tights-2kq19z5e1x6",
    "https://www.nike.com/w/womens-accessories-equipment-5e1x6zawwpw",

    # Kids
    "https://www.nike.com/w/kids-shoes-v4dhzy7ok",
    "https://www.nike.com/w/kids-clothing-6ymx6zv4dh",
    "https://www.nike.com/w/kids-accessories-equipment-awwpwzv4dh",
    
    # Specific Collections
    "https://www.nike.com/w/new-3n82y",
    "https://www.nike.com/w/bestsellers-1e5x6",
    "https://www.nike.com/w/jordan-shoes-37eefzy7ok",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}




# ---------------------------------------------------------------------------
# Parsing helpers
# ---------------------------------------------------------------------------
def extract_products_from_nike_html(html_text):
    """Parse Nike.com HTML and extract clean product name, link, and real static.nike.com image URL."""
    soup = BeautifulSoup(html_text, "html.parser")
    products = []
    
    # Locate all product card containers (highly reliable on Nike.com)
    cards = soup.find_all("div", class_=lambda x: x and "product-card" in x)
    if not cards:
        cards = soup.find_all("div", attrs={"data-testid": "product-card"})
        
    for card in cards:
        # 1. Extract Product Name & Subtitle
        name_el = card.find(class_=lambda x: x and "product-card__title" in x)
        if not name_el:
            name_el = card.find("a", class_=lambda x: x and "link-overlay" in x)
            
        name = ""
        if name_el:
            name = name_el.get_text(strip=True)
            
        # Clean name: sometimes it appends subtitles like "Men's Shoes" or "Women's Basketball Shoes"
        subtitle_el = card.find(class_=lambda x: x and "product-card__subtitle" in x)
        subtitle = subtitle_el.get_text(strip=True) if subtitle_el else ""
        
        if not name or len(name) < 3:
            continue
            
        # Skip navigation or promotion entries
        if any(skip in name.lower() for skip in ["help", "store", "join", "sign", "extra 20%", "code:"]):
            continue
            
        # 2. Extract Product URL
        link_el = card.find("a", href=True)
        url = link_el.get("href", "") if link_el else ""
        if url and not url.startswith("http"):
            url = "https://www.nike.com" + url
        
        # 3. Extract Real Price
        usd_price = 0.0
        price_el = card.find(attrs={"data-testid": "product-price"})
        if price_el:
            price_text = price_el.get_text(strip=True)
            num_str = re.sub(r'[^\d\.]', '', price_text)
            if num_str:
                try:
                    usd_price = float(num_str)
                except ValueError:
                    pass

        # 4. Extract Real Product Image (from static.nike.com)
        img_url = ""
        
        # Check all possible image fields in the card
        img_els = card.find_all("img")
        for img_el in img_els:
            # 1. Prefer src directly (contains the full, untruncated high-res URL)
            src = img_el.get("src", "")
            if src and "static.nike.com" in src:
                img_url = src
                break
                
            # 2. Check lazy-load indicators
            data_src = img_el.get("data-src", "")
            if data_src and "static.nike.com" in data_src:
                img_url = data_src
                break
                
            # 3. Safely parse srcset (splitting on ', ' to avoid splitting CDN parameters)
            srcset = img_el.get("srcset", "")
            if srcset:
                # Nike CDN uses ',' inside URLs, but separate URLs in srcset are delimited by ', ' (comma followed by space)
                urls = [u.strip().split(" ")[0] for u in srcset.split(", ") if u.strip()]
                nike_urls = [u for u in urls if "static.nike.com" in u]
                if nike_urls:
                    best_url = [u for u in nike_urls if "592" in u or "w_592" in u or "limit,w" in u]
                    img_url = best_url[0] if best_url else nike_urls[0]
                    break
                
            # 4. Safely parse data-srcset
            data_srcset = img_el.get("data-srcset", "")
            if data_srcset:
                urls = [u.strip().split(" ")[0] for u in data_srcset.split(", ") if u.strip()]
                nike_urls = [u for u in urls if "static.nike.com" in u]
                if nike_urls:
                    img_url = nike_urls[0]
                    break
        
        # Standardize URL protocol
        if img_url and img_url.startswith("//"):
            img_url = "https:" + img_url
            
        # We only accept products with real Nike static images to avoid placeholders!
        if name and img_url and "static.nike.com" in img_url:
            products.append({
                "name": name,
                "url": url,
                "image": img_url,
                "subtitle": subtitle,
                "usd_price": usd_price
            })
            
    return products


def scrape_nike_pages():
    """Scrape all configured Nike.com URLs and return deduplicated product list."""
    session = requests.Session()
    session.headers.update(HEADERS)
    
    all_products = []
    seen = set()
    
    for idx, url in enumerate(NIKE_URLS):
        print(f"[{idx+1}/{len(NIKE_URLS)}] Scraping: {url}")
        try:
            resp = session.get(url, timeout=15)
            if resp.status_code != 200:
                print(f"  -> HTTP {resp.status_code}, skipping.")
                continue
            page_products = extract_products_from_nike_html(resp.text)
            new_count = 0
            for p in page_products:
                key = p["name"].strip()
                if key not in seen and len(key) > 3:
                    seen.add(key)
                    all_products.append(p)
                    new_count += 1
            print(f"  -> Found {new_count} new products (total: {len(all_products)})")
        except Exception as e:
            print(f"  -> Error: {e}")
    
    print(f"\nTotal unique products scraped: {len(all_products)}")
    return all_products


# ---------------------------------------------------------------------------
# Data enrichment
# ---------------------------------------------------------------------------
def determine_brand(name):
    low = name.lower()
    if "jordan" in low:
        return "Jordan"
    if "nike" in low:
        return "Nike"
    if "adidas" in low or "yeezy" in low:
        return "adidas"
    if "new balance" in low:
        return "New Balance"
    if "converse" in low:
        return "Converse"
    return "Nike"  # default for Nike.com products


def determine_category_and_dm(name, subtitle):
    low = (name + " " + subtitle).lower()
    if any(w in low for w in ["shirt", "hoodie", "jacket", "pants", "shorts", "fleece", "tee", "top", "joggers", "clothing", "apparel"]):
        return "Clothing", "DM4"
    elif any(w in low for w in ["bag", "backpack", "socks", "cap", "hat", "sunglasses", "towel", "earbuds", "headband", "equipment", "accessories"]):
        return "Accessories", "DM5"
    else:
        return "Sneakers", "DM3"


def map_brand_id(brand):
    return {"Nike": "TH1", "Jordan": "TH2", "adidas": "TH3",
            "New Balance": "TH4", "Converse": "TH5"}.get(brand, "TH1")


def generate_description(name, brand):
    templates = [
        f"Featuring premium materials and signature {brand} design details, this sneaker delivers excellent impact protection and unmatched comfort.",
        f"A historic {brand} silhouette reimagined with a modern aesthetic, it showcases classic color-blocking that elevates any casual outfit.",
        f"Crafted with durable uppers and specialized traction, this {brand} release blends legendary sportswear history with contemporary performance.",
        f"Designed for lightweight cushioning and everyday lifestyle wear, it provides a retro look while ensuring modern durability and flexibility.",
        f"Engineered with a responsive midsole system and secure support, this {brand} sneaker is a great choice for enthusiasts.",
    ]
    return random.choice(templates)


def generate_color():
    return random.choice([
        "White/Black", "Black/White", "Grey/White", "Triple White", "Triple Black",
        "Red/White", "Blue/White", "Sail/Navy", "Olive/Gum", "Cream/Sand",
        "Multi-Color", "Grey Castlerock", "Volt/Black", "Navy/White", "Varsity Red/Black",
        "University Blue", "Bred", "Shadow", "Pine Green", "Light Bone",
    ])


def generate_sizes():
    return "US 7, US 8, US 8.5, US 9, US 9.5, US 10, US 10.5, US 11, US 12"


# ---------------------------------------------------------------------------
# Output generators
# ---------------------------------------------------------------------------
def build_csv_and_sql(products):
    """Create enriched CSV and Oracle SQL seed files."""
    csv_path = os.path.join("database", "scraped_goat_all.csv")
    sql_path = os.path.join("database", "scraped_goat_all_seed.sql")
    os.makedirs("database", exist_ok=True)

    headers = [
        "product_id", "name", "brand", "category", "price", "original_price",
        "image_url", "quantity", "status", "description", "rating",
        "reviews_count", "sizes", "color", "gender", "created_at", "updated_at",
    ]
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    start_id = 2000
    csv_rows = []
    sql_rows = []

    # Enforce static.nike.com images strictly
    valid_products = [p for p in products if p.get("image") and "static.nike.com" in p["image"]]

    for idx, item in enumerate(valid_products):
        pid = f"SP{start_id + idx}"
        brand = determine_brand(item["name"])
        
        # Calculate price in VND based on 26,000 VND/USD exchange rate
        # Use real price if extracted, else fallback
        usd_price = item.get("usd_price")
        if not usd_price:
            usd_price = random.randint(75, 350)
            
        price = float(usd_price * 26000)
        
        original_price = ""
        if random.random() < 0.35:
            # Original price is 12% to 30% higher, rounded to the nearest 10,000 VND
            multiplier = random.uniform(1.12, 1.30)
            raw_orig = usd_price * multiplier * 26000
            original_price = float(round(raw_orig / 10000) * 10000)
        
        # Use the REAL Nike CDN image from the scraped product
        img_url = item["image"]
        quantity = random.randint(15, 120)
        status = "AVAILABLE"
        description = generate_description(item["name"], brand)
        rating = round(random.uniform(4.2, 4.9), 1)
        reviews = random.randint(5, 150)
        color = generate_color()
        
        # Determine gender strictly from Nike subtitle
        sub = item.get("subtitle", "").lower()
        if "women" in sub:
            gender = "Women"
        elif "men" in sub:
            gender = "Men"
        elif "kids" in sub or "older" in sub or "younger" in sub:
            gender = "Kids"
        else:
            gender = random.choices(["Men", "Women", "Unisex"], weights=[40, 20, 40])[0]
            
        sizes = generate_sizes()
        cat_name, cat_id = determine_category_and_dm(item["name"], item.get("subtitle", ""))

        row = {
            "product_id": pid, "name": item["name"], "brand": brand,
            "category": cat_name, "price": price,
            "original_price": original_price, "image_url": img_url,
            "quantity": quantity, "status": status, "description": description,
            "rating": rating, "reviews_count": reviews, "sizes": sizes,
            "color": color, "gender": gender,
            "created_at": timestamp, "updated_at": timestamp,
        }
        csv_rows.append(row)
        
        # Oracle SQL row
        mathuonghieu = map_brand_id(brand)
        trangthai = "CONHANG"
        sql_rows.append({
            "Masanpham": pid, "TenSP": item["name"],
            "Madanhmuc": cat_id, "Mathuonghieu": mathuonghieu,
            "Gia": price,
            "GiaGoc": original_price if original_price else None,
            "HinhAnh": img_url, "SoLuong": quantity,
            "TrangThai": trangthai, "MoTa": description,
            "NgayTao": timestamp, "NgayCapNhat": timestamp,
            "Sizes": sizes.split(", "),
        })

    # Write CSV
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(csv_rows)
    print(f"\n[CSV] Saved {len(csv_rows)} products to: {csv_path}")

    # Write SQL
    with open(sql_path, "w", encoding="utf-8") as f:
        f.write("-- ==========================================================\n")
        f.write("-- SNEAKER SHOP - SCRAPED PRODUCTS SEED (Nike.com data)\n")
        f.write(f"-- Generated: {timestamp}\n")
        f.write(f"-- Total products: {len(sql_rows)}\n")
        f.write("-- ==========================================================\n\n")
        f.write("-- 1. INSERT INTO SANPHAM\n")
        for p in sql_rows:
            esc_name = p["TenSP"].replace("'", "''")
            esc_desc = p["MoTa"].replace("'", "''")
            gia_goc = str(p["GiaGoc"]) if p["GiaGoc"] else "NULL"
            f.write(
                f"INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, "
                f"Gia, GiaGoc, HinhAnh, SoLuong, TrangThai, MoTa, NgayTao, NgayCapNhat) "
                f"VALUES ('{p['Masanpham']}', '{esc_name}', '{p['Madanhmuc']}', "
                f"'{p['Mathuonghieu']}', {p['Gia']}, {gia_goc}, '{p['HinhAnh']}', "
                f"{p['SoLuong']}, '{p['TrangThai']}', '{esc_desc}', "
                f"TO_TIMESTAMP('{p['NgayTao']}', 'YYYY-MM-DD HH24:MI:SS'), "
                f"TO_TIMESTAMP('{p['NgayCapNhat']}', 'YYYY-MM-DD HH24:MI:SS'));\n"
            )
        f.write("\n-- 2. INSERT INTO KICHCO_SANPHAM\n")
        kc_seq = 5000
        for p in sql_rows:
            total_qty = p["SoLuong"]
            size_list = p["Sizes"]
            remaining = total_qty
            for i, size_name in enumerate(size_list):
                if i < len(size_list) - 1:
                    share = random.randint(0, remaining)
                else:
                    share = remaining
                remaining -= share
                size_id = f"KC{kc_seq}"
                kc_seq += 1
                f.write(
                    f"INSERT INTO KICHCO_SANPHAM (MaKichCo, Masanpham, TenKichCo, SoLuong) "
                    f"VALUES ('{size_id}', '{p['Masanpham']}', '{size_name}', {share});\n"
                )
        f.write("\nCOMMIT;\n")
    print(f"[SQL] Saved Oracle seed to: {sql_path}")

    return csv_rows


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    print("=" * 60)
    print("  SNEAKER SHOP - Nike.com Product Scraper")
    print("=" * 60)
    print()
    
    products = scrape_nike_pages()
    
    if not products:
        print("\nNo products found from scraping. This should not happen.")
        print("Check your internet connection and try again.")
    else:
        build_csv_and_sql(products)
        print(f"\nDone! Scraped {len(products)} real Nike/Jordan sneakers.")
