import requests
import scraper

session = requests.Session()
session.headers.update(scraper.HEADERS)
html = session.get('https://www.nike.com/w/mens-shoes-nik1zy7ok').text
prods = scraper.extract_products_from_nike_html(html)
broken = []
for p in prods:
    res = session.get(p['image'])
    if res.status_code != 200:
        broken.append((p['image'], res.status_code))
print(f'Total broken: {len(broken)} out of {len(prods)}')
for b in broken:
    print(b)
