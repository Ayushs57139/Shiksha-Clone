#!/usr/bin/env node

import { generateAllTemplates } from './generateTemplates.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🚀 Starting template generation...');
console.log('📊 This will create 220 unique resume templates with distinct colors and designs');

generateAllTemplates()
  .then(() => {
    console.log('✅ Template generation completed successfully!');
    console.log('🎨 220 unique templates have been created with:');
    console.log('   - Unique color schemes for each template');
    console.log('   - Role-specific layouts and designs');
    console.log('   - Professional, Creative, Technical, and Academic categories');
    console.log('   - Usage tracking and analytics');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Template generation failed:', error);
    process.exit(1);
  });
