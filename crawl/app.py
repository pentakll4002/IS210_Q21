import cloudscraper
import pandas as pd
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import json
from datetime import datetime

BASE_URL = "https://mwc.com.vn"

class MWCCrawler:
    def __init__(self):
        self.scraper = cloudscraper.create_scraper(
            browser={
                'browser': 'chrome',
                'platform': 'windows',
                'mobile': False
            }
        )
        self.products: List[Dict] = []

    def fetch_page(self, url: str) -> Optional[str]:
        """Fetch a page using cloudscraper."""
        try:
            response = self.scraper.get(url, timeout=30)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None

    def parse_product_card(self, card) -> Optional[Dict]:
        """Parse a single product card from the HTML."""
        try:
            # mwc.com.vn selectors
            name_elem = card.find("p", class_="product-grid-title")
            if not name_elem:
                return None
            
            name = name_elem.get_text(strip=True)
            
            # Get product URL from a.product-grid-info
            link_elem = card.find("a", class_="product-grid-info")
            product_url = link_elem.get("href") if link_elem else None
            if product_url and not product_url.startswith("http"):
                product_url = f"{BASE_URL}{product_url}"
            
            # Get price - search within the product-grid-info link
            price = None
            original_price = None
            info_link = card.find("a", class_="product-grid-info")
            if info_link:
                price_elem = info_link.find("span", class_="product-grid-price-new-text")
                if price_elem:
                    price = price_elem.get_text(strip=True)
                    print(f"DEBUG: Raw price text: '{price}'")
                else:
                    # Try alternative selector
                    price_elem2 = card.find("p", class_="product-grid-price")
                    if price_elem2:
                        price = price_elem2.get_text(strip=True)
                        print(f"DEBUG: Alt price text: '{price}'")
            
            # Get image from a.product-grid-image > img
            image_link = card.find("a", class_="product-grid-image")
            image_url = None
            if image_link:
                image_elem = image_link.find("img")
                if image_elem:
                    image_url = image_elem.get("src")
                    # Decode HTML entities in URL
                    if image_url:
                        image_url = image_url.replace("&amp;", "&")
            
            brand = "MWC" if name else "Unknown"
            price = self.clean_price(price) if price else None
            original_price = self.clean_price(original_price) if original_price else None
            
            return {
                "name": name,
                "price": price,
                "original_price": original_price,
                "image": image_url,
                "brand": brand,
                "url": product_url,
                "scraped_at": datetime.now().isoformat()
            }
        except Exception as e:
            print(f"Error parsing product card: {e}")
            return None

    def clean_price(self, price_str: str) -> Optional[float]:
        """Clean and convert price string to float."""
        if not price_str:
            return None
        try:
            # Vietnamese prices use comma as thousand separator (e.g., 375,000đ)
            # Remove currency symbol and comma, keep only digits
            cleaned = price_str.replace("₫", "").replace(".", "").replace(",", "").strip()
            return float(cleaned)
        except ValueError:
            return None

    def scrape_category_page(self, url: str) -> List[Dict]:
        """Scrape products from a category page."""
        html = self.fetch_page(url)
        if not html:
            return []
        
        # Save HTML for debugging
        with open("debug.html", "w", encoding="utf-8") as f:
            f.write(html)
        print("Saved HTML to debug.html")
        
        soup = BeautifulSoup(html, "html.parser")
        products = []
        
        # Find all product cards (div.product-grid-item)
        product_cards = soup.find_all("div", class_="product-grid-item")
        
        print(f"Found {len(product_cards)} product cards on {url}")
        
        for i, card in enumerate(product_cards[:3]):  # Debug first 3
            print(f"\n--- Card {i} ---")
            info_link = card.find("a", class_="product-grid-info")
            print(f"Info link found: {info_link is not None}")
            if info_link:
                price_elem = info_link.find("span", class_="product-grid-price-new-text")
                print(f"Price elem in info_link: {price_elem is not None}")
                if not price_elem:
                    price_elem2 = card.find("p", class_="product-grid-price")
                    print(f"Price elem p.product-grid-price: {price_elem2 is not None}")
                    if price_elem2:
                        print(f"Price text: {price_elem2.get_text(strip=True)}")
        
        for card in product_cards:
            product = self.parse_product_card(card)
            if product:
                products.append(product)
        
        return products

    def scrape_all_products(self):
        """Main method to scrape all products from the site."""
        print("Starting crawl of mwc.com.vn with cloudscraper...")
        
        category_urls = [f"{BASE_URL}/"]
        
        for url in category_urls:
            products = self.scrape_category_page(url)
            self.products.extend(products)
        
        unique_products = []
        seen = set()
        for product in self.products:
            key = (product["name"], product["url"])
            if key not in seen:
                seen.add(key)
                unique_products.append(product)
        
        self.products = unique_products
        print(f"Scraped {len(self.products)} unique products")

    def save_to_csv(self, filename: str = "products.csv"):
        """Save products to CSV file."""
        if not self.products:
            print("No products to save")
            return
        
        df = pd.DataFrame(self.products)
        df.to_csv(filename, index=False, encoding="utf-8")
        print(f"Saved {len(df)} products to {filename}")

    def save_to_json(self, filename: str = "products.json"):
        """Save products to JSON file."""
        if not self.products:
            print("No products to save")
            return
        
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(self.products, f, ensure_ascii=False, indent=2)
        print(f"Saved {len(self.products)} products to {filename}")

    def save_to_typescript(self, filename: str = "products.ts"):
        """Save products to TypeScript format for the React app."""
        if not self.products:
            print("No products to save")
            return
        
        ts_content = """export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  category: string;
  soldOut?: boolean;
}

export const products: Product[] = [
"""
        
        for i, product in enumerate(self.products, 1):
            brand = product.get("brand") or "Unknown"
            price = product.get("price") or 0
            original_price = product.get("original_price")
            image = product.get("image") or ""
            name = product.get("name", "").replace('"', '\\"')
            
            category = "sneakers"
            url = product.get("url", "").lower()
            if "apparel" in url or "shirt" in name.lower() or "hoodie" in name.lower():
                category = "apparel"
            elif "new" in url or "arrival" in url:
                category = "new-arrivals"
            elif "best" in url or "seller" in url:
                category = "best-seller"
            
            ts_content += f"""  {{
    id: {i},
    name: "{name}",
    price: {price},
"""
            if original_price:
                ts_content += f'    originalPrice: {original_price},\n'
            ts_content += f"""    image: '{image}',
    brand: '{brand}',
    category: '{category}' as const,
  }},
"""
        
        ts_content += "];\n"
        
        with open(filename, "w", encoding="utf-8") as f:
            f.write(ts_content)
        print(f"Saved {len(self.products)} products to {filename}")


def main():
    crawler = MWCCrawler()
    
    try:
        crawler.scrape_all_products()
        crawler.save_to_csv()
        crawler.save_to_json()
        crawler.save_to_typescript()
        
        print("\nSample products:")
        for i, product in enumerate(crawler.products[:5], 1):
            print(f"{i}. {product['name']} - ₫{product['price']}")
            
    finally:
        pass


if __name__ == "__main__":
    main()
