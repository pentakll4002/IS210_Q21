"""Get real Nike CDN image URLs for our seed products."""
import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

session = requests.Session()
session.headers.update(HEADERS)

# Scrape multiple pages to get a good pool of unique images
urls = [
    "https://www.nike.com/w/mens-shoes-nik1zy7ok",
    "https://www.nike.com/w/mens-jordan-shoes-37eefznik1zy7ok",
    "https://www.nike.com/w/mens-lifestyle-shoes-13jrmznik1zy7ok",
]

all_images = []
seen = set()

for url in urls:
    html = session.get(url, timeout=15).text
    soup = BeautifulSoup(html, "html.parser")
    for img in soup.find_all("img", class_="product-card__hero-image"):
        src = img.get("src", "")
        if src and "static.nike.com" in src and src not in seen:
            seen.add(src)
            all_images.append(src)

print(f"Found {len(all_images)} unique Nike CDN images")
for i, img in enumerate(all_images[:25]):
    print(f"  [{i}] {img}")
