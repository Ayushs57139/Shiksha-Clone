#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Shiksha College Scraper...');
console.log('📊 This will collect college data from all categories...');
console.log('⏳ This process may take 30-60 minutes...\n');

// Run the scraper
const scraper = spawn('node', ['shiksha-scraper/scraper.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

scraper.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Scraping completed successfully!');
    console.log('📊 College data has been saved to MongoDB');
    console.log('🌐 You can now view the data on your website');
  } else {
    console.log('\n❌ Scraping failed with code:', code);
  }
});

scraper.on('error', (error) => {
  console.error('❌ Error running scraper:', error);
}); 