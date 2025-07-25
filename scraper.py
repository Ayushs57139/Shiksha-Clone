from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from pymongo import MongoClient
import time

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["shiksha"]
col = db["mba_colleges"]

# Selenium setup
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(options=options)

url = "https://www.shiksha.com/mba/ranking/top-mba-colleges-in-india/2-2-0-0-0"

try:
    print("🌐 Opening page...")
    driver.get(url)

    # Wait until the page loads the college cards
    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "div.tupleWrapper"))
    )

    # Scroll to bottom to load everything
    for _ in range(5):
        driver.execute_script("window.scrollBy(0, 3000);")
        time.sleep(1)

    soup = BeautifulSoup(driver.page_source, "html.parser")
    cards = soup.select("div.tupleWrapper")
    print("📦 Found", len(cards), "college cards")

    for el in cards:
        try:
            name_el = el.select_one("a[data-click-event-name='institute_name']")
            name = name_el.get_text(strip=True) if name_el else "N/A"
            link = name_el["href"] if name_el else "N/A"
            if not link.startswith("http"):
                link = "https://www.shiksha.com" + link

            slug = link.split("/")[-1].split("-")[0] if link != "N/A" else None

            # Extracting Fees & Salary
            fees_el = el.find("span", string=lambda s: s and "₹" in s and "Fees" in s)
            fees = fees_el.get_text(strip=True) if fees_el else None

            salary_el = el.find("span", string=lambda s: s and "₹" in s and "Salary" in s)
            salary = salary_el.get_text(strip=True) if salary_el else None

            rating_el = el.select_one(".rating-block, .rating-box")
            rating = rating_el.get_text(strip=True) if rating_el else None

            data = {
                "name": name,
                "link": link,
                "slug": slug,
                "category": "MBA",
                "fees": fees,
                "salary": salary,
                "rating": rating
            }

            if not col.find_one({"slug": slug}):
                col.insert_one(data)
                print("✅ Inserted:", name)
            else:
                print("🟡 Already exists:", name)

        except Exception as e:
            print("❌ Error parsing card:", e)

finally:
    driver.quit()
    print("🔒 Done.")
