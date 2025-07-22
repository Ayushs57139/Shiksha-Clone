import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import connectDB from './db.js';
import College from './models/College.js';

dotenv.config();

async function startScraper() {
  await connectDB();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("🌐 Navigating to website...");
  await page.goto('https://www.shiksha.com/mba/ranking/top-mba-colleges-in-india/2-2-0-0-0', {
    waitUntil: 'networkidle0'
  });

  await page.waitForTimeout(5000);
  await page.waitForSelector('.rankingTuple__name');

  const data = await page.evaluate(() => {
    const elements = document.querySelectorAll('.rankingTuple__name');
    return Array.from(elements).map(el => el.innerText.trim());
  });

  console.log("✅ Scraped Data:", data);

  for (let name of data) {
    await College.create({ name });
  }

  console.log("✅ Data saved to MongoDB");
  await browser.close();
}

startScraper();
