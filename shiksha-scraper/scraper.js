import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import College from './models/College.js'; // match your filename
import { connectDB } from './db.js';

const BASE_URL = 'https://www.shiksha.com';
const categories = [
  { name: 'MBA', path: '/mba/ranking/top-mba-colleges-in-india/2-2-0-0-0' },
  { name: 'Engineering', path: '/engineering/ranking/top-engineering-colleges-in-india/44-2-0-0-0' },
  { name: 'Medical', path: '/medicine-health-sciences/ranking/top-medical-colleges-in-india/56-2-0-0-0' },
];

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let total = 0, step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });
}

async function scrapeCategory({ name, path }) {
  console.log(`🌐 Scraping ${name}`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
  try {
    await page.goto(BASE_URL + path, { waitUntil: 'networkidle2', timeout: 60000 });
    await autoScroll(page);
    await page.waitForSelector('.tuple-inst-info', { timeout: 30000 });
    
    const rows = await page.$$eval('.tuple-inst-info', els => els.map(el => {
      const a = el.querySelector('a.rank_clg');
      const name = a?.innerText?.trim();
      const href = a?.getAttribute('href');
      const slug = href?.split('/').filter(Boolean).pop() || null;
      const fees = el.querySelector('div.text--secondary:has(span:contains("Fees"))')?.innerText.replace('Fees:', '').trim();
      const salary = el.querySelector('div.text--secondary:has(span:contains("Salary"))')?.innerText.replace('Salary :', '').trim();
      const rating = el.querySelector('.rating-block')?.innerText?.trim();
      const reviews = el.querySelector('a[href*="/reviews"]')?.innerText?.match(/\d+/)?.[0];
      return { name, link: BASE_URL + href, slug, fees, salary, rating, reviews: reviews ? parseInt(reviews) : null };
    }));
    
    let added = 0;
    for (const c of rows) {
      if (!c.slug) continue;
      const up = await College.findOneAndUpdate({ slug: c.slug }, { ...c, category: name }, { upsert: true, new: true });
      if (up.wasNew) added++;
    }
    console.log(`✅ ${added} new ${name} entries.`);
  } catch (err) {
    console.error(`❌ ${name} scrape failed:`, err.message);
  } finally {
    await browser.close();
  }
}

(async () => {
  await connectDB();
  for (const c of categories) await scrapeCategory(c);
  console.log('🎉 All done!');
  mongoose.disconnect();
})();
