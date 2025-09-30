import mongoose from 'mongoose';
import Template from '../models/Template.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/collegeinfo')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Extended color palettes for more variety
const extendedColorPalettes = [
  // Modern Professional
  { accent: '#2563eb', secondary: '#1e40af', tertiary: '#3b82f6', name: 'Modern Blue' },
  { accent: '#059669', secondary: '#047857', tertiary: '#10b981', name: 'Modern Green' },
  { accent: '#dc2626', secondary: '#b91c1c', tertiary: '#ef4444', name: 'Modern Red' },
  { accent: '#7c3aed', secondary: '#6d28d9', tertiary: '#8b5cf6', name: 'Modern Purple' },
  { accent: '#ea580c', secondary: '#c2410c', tertiary: '#f97316', name: 'Modern Orange' },
  
  // Creative & Artistic
  { accent: '#ec4899', secondary: '#be185d', tertiary: '#f472b6', name: 'Creative Pink' },
  { accent: '#06b6d4', secondary: '#0891b2', tertiary: '#22d3ee', name: 'Creative Cyan' },
  { accent: '#8b5cf6', secondary: '#7c3aed', tertiary: '#a78bfa', name: 'Creative Violet' },
  { accent: '#f59e0b', secondary: '#d97706', tertiary: '#fbbf24', name: 'Creative Amber' },
  
  // Tech & Digital
  { accent: '#10b981', secondary: '#059669', tertiary: '#34d399', name: 'Tech Emerald' },
  { accent: '#3b82f6', secondary: '#2563eb', tertiary: '#60a5fa', name: 'Tech Blue' },
  { accent: '#f59e0b', secondary: '#d97706', tertiary: '#fbbf24', name: 'Tech Gold' },
  { accent: '#ef4444', secondary: '#dc2626', tertiary: '#f87171', name: 'Tech Red' },
  
  // Academic & Research
  { accent: '#1e40af', secondary: '#1e3a8a', tertiary: '#3b82f6', name: 'Academic Blue' },
  { accent: '#7c2d12', secondary: '#431407', tertiary: '#dc2626', name: 'Academic Red' },
  { accent: '#365314', secondary: '#1a2e05', tertiary: '#65a30d', name: 'Academic Green' },
  { accent: '#581c87', secondary: '#3b0764', tertiary: '#7c3aed', name: 'Academic Purple' },
  
  // Healthcare & Medical
  { accent: '#059669', secondary: '#047857', tertiary: '#10b981', name: 'Medical Green' },
  { accent: '#dc2626', secondary: '#b91c1c', tertiary: '#ef4444', name: 'Medical Red' },
  { accent: '#2563eb', secondary: '#1d4ed8', tertiary: '#3b82f6', name: 'Medical Blue' },
  { accent: '#7c3aed', secondary: '#6d28d9', tertiary: '#8b5cf6', name: 'Medical Purple' },
  
  // Finance & Business
  { accent: '#374151', secondary: '#1f2937', tertiary: '#6b7280', name: 'Finance Gray' },
  { accent: '#059669', secondary: '#047857', tertiary: '#10b981', name: 'Finance Green' },
  { accent: '#dc2626', secondary: '#b91c1c', tertiary: '#ef4444', name: 'Finance Red' },
  { accent: '#f59e0b', secondary: '#d97706', tertiary: '#fbbf24', name: 'Finance Gold' },
  
  // Design & Creative
  { accent: '#ec4899', secondary: '#be185d', tertiary: '#f472b6', name: 'Design Pink' },
  { accent: '#06b6d4', secondary: '#0891b2', tertiary: '#22d3ee', name: 'Design Cyan' },
  { accent: '#8b5cf6', secondary: '#7c3aed', tertiary: '#a78bfa', name: 'Design Purple' },
  { accent: '#f59e0b', secondary: '#d97706', tertiary: '#fbbf24', name: 'Design Orange' },
  
  // Minimalist & Clean
  { accent: '#374151', secondary: '#1f2937', tertiary: '#6b7280', name: 'Minimal Gray' },
  { accent: '#1f2937', secondary: '#111827', tertiary: '#374151', name: 'Minimal Dark' },
  { accent: '#6b7280', secondary: '#4b5563', tertiary: '#9ca3af', name: 'Minimal Light' },
  { accent: '#9ca3af', secondary: '#6b7280', tertiary: '#d1d5db', name: 'Minimal Silver' }
];

// Extended layout variations
const layoutVariations = [
  'executive', 'creative', 'technical', 'marketing', 'academic', 'financial',
  'minimalist', 'modern', 'classic', 'bold', 'elegant', 'dynamic'
];

// Extended categories for more variety
const categories = [
  'Professional', 'Creative', 'Technical', 'Academic', 'Financial', 'Marketing',
  'Healthcare', 'Education', 'Engineering', 'Design', 'Business', 'Sales',
  'Management', 'Consulting', 'Research', 'Media', 'Entertainment', 'Sports',
  'Legal', 'Real Estate', 'Hospitality', 'Retail', 'Manufacturing', 'Technology'
];

// Extended job roles for more specific templates
const jobRoles = [
  // Executive & Management
  'CEO', 'CTO', 'CFO', 'COO', 'VP of Sales', 'VP of Marketing', 'VP of Engineering',
  'Director of Operations', 'Director of Product', 'Director of HR', 'General Manager',
  'Regional Manager', 'Department Head', 'Team Lead', 'Project Manager',
  
  // Technical Roles
  'Software Engineer', 'Senior Developer', 'Full Stack Developer', 'Frontend Developer',
  'Backend Developer', 'DevOps Engineer', 'Data Scientist', 'Data Analyst',
  'Machine Learning Engineer', 'AI Engineer', 'Cloud Architect', 'System Administrator',
  'Database Administrator', 'Security Engineer', 'QA Engineer', 'Mobile Developer',
  
  // Creative & Design
  'Creative Director', 'Art Director', 'Graphic Designer', 'UI/UX Designer',
  'Web Designer', 'Product Designer', 'Brand Designer', 'Motion Graphics Designer',
  'Video Editor', 'Photographer', 'Content Creator', 'Social Media Manager',
  
  // Marketing & Sales
  'Marketing Manager', 'Digital Marketing Specialist', 'Content Marketing Manager',
  'SEO Specialist', 'PPC Specialist', 'Email Marketing Manager', 'Brand Manager',
  'Sales Manager', 'Account Executive', 'Business Development Manager',
  'Customer Success Manager', 'Product Marketing Manager',
  
  // Business & Finance
  'Business Analyst', 'Financial Analyst', 'Investment Banker', 'Consultant',
  'Strategy Consultant', 'Management Consultant', 'Operations Manager',
  'Supply Chain Manager', 'Procurement Manager', 'Risk Manager',
  
  // Healthcare & Medical
  'Doctor', 'Nurse', 'Pharmacist', 'Medical Researcher', 'Healthcare Administrator',
  'Clinical Manager', 'Medical Writer', 'Healthcare Consultant',
  
  // Education & Research
  'Professor', 'Researcher', 'Academic Advisor', 'Curriculum Developer',
  'Training Manager', 'Instructional Designer', 'Education Consultant',
  
  // Other Professional Roles
  'Lawyer', 'Attorney', 'Legal Counsel', 'Paralegal', 'HR Manager',
  'Recruiter', 'Operations Analyst', 'Business Development Executive'
];

// Generate comprehensive templates
async function generateExtendedTemplates() {
  try {
    console.log('Starting extended template generation...');
    
    const templates = [];
    let templateCount = 0;
    
    // Generate templates for each combination
    for (const category of categories) {
      for (const layout of layoutVariations) {
        for (let i = 0; i < 3; i++) { // 3 templates per category-layout combination
          const colorPalette = extendedColorPalettes[Math.floor(Math.random() * extendedColorPalettes.length)];
          const jobRole = jobRoles[Math.floor(Math.random() * jobRoles.length)];
          
          // Generate unique template name
          const templateName = `${jobRole} - ${category} ${layout.charAt(0).toUpperCase() + layout.slice(1)}`;
          
          // Generate HTML based on layout
          const html = generateTemplateHTML(layout, colorPalette);
          
          const template = {
            name: templateName,
            category: category,
            layout: layout,
            focus: `${category.toLowerCase()} professional`,
            description: `Professional ${layout} template specifically designed for ${jobRole.toLowerCase()} positions with ${colorPalette.name.toLowerCase()} color scheme`,
            html: html,
            accentColor: colorPalette.accent,
            secondaryColor: colorPalette.secondary,
            tertiaryColor: colorPalette.tertiary,
            usageCount: Math.floor(Math.random() * 50) // Random usage count
          };
          
          templates.push(template);
          templateCount++;
        }
      }
    }
    
    console.log(`Generated ${templateCount} templates`);
    
    // Clear existing templates and insert new ones
    await Template.deleteMany({});
    console.log('Cleared existing templates');
    
    // Insert new templates in batches
    const batchSize = 100;
    for (let i = 0; i < templates.length; i += batchSize) {
      const batch = templates.slice(i, i + batchSize);
      await Template.insertMany(batch);
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(templates.length / batchSize)}`);
    }
    
    console.log(`Successfully created ${templateCount} extended templates!`);
    
    // Display statistics
    const stats = await Template.aggregate([
      { $group: { _id: '$layout', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\nLayout distribution:');
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} templates`);
    });
    
    const categoryStats = await Template.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\nCategory distribution:');
    categoryStats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} templates`);
    });
    
  } catch (error) {
    console.error('Error generating templates:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Generate HTML for different layouts
function generateTemplateHTML(layout, colorPalette) {
  const baseHTML = `
    <div class="resume-template" style="
      --accent: ${colorPalette.accent};
      --secondary: ${colorPalette.secondary};
      --tertiary: ${colorPalette.tertiary};
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      background: white;
      color: #333;
    ">
      {{#if personalInfo}}
      <div class="header" style="
        text-align: center;
        padding: 30px 0;
        border-bottom: 3px solid var(--accent);
        margin-bottom: 30px;
      ">
        <h1 class="name" style="
          color: var(--accent);
          font-size: 2.5em;
          margin: 0 0 10px 0;
          font-weight: 700;
        ">{{personalInfo.firstName}} {{personalInfo.lastName}}</h1>
        <p class="title" style="
          color: var(--secondary);
          font-size: 1.2em;
          margin: 0 0 15px 0;
          font-weight: 500;
        ">{{personalInfo.title}}</p>
        <div class="contact" style="
          color: var(--tertiary);
          font-size: 0.9em;
        ">
          {{personalInfo.email}} | {{personalInfo.phone}} | {{personalInfo.location}}
        </div>
      </div>
      {{/if}}
      
      <div class="content" style="padding: 0 20px;">
        {{#if summary}}
        <section class="summary" style="margin-bottom: 25px;">
          <h2 style="
            color: var(--accent);
            font-size: 1.3em;
            margin-bottom: 10px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 5px;
          ">PROFESSIONAL SUMMARY</h2>
          <p style="line-height: 1.6; color: var(--secondary);">{{summary}}</p>
        </section>
        {{/if}}
        
        {{#if experience}}
        <section class="experience" style="margin-bottom: 25px;">
          <h2 style="
            color: var(--accent);
            font-size: 1.3em;
            margin-bottom: 15px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 5px;
          ">PROFESSIONAL EXPERIENCE</h2>
          {{#each experience}}
          <div class="job" style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
              <h3 style="color: var(--secondary); font-size: 1.1em; margin: 0;">{{title}}</h3>
              <span style="color: var(--tertiary); font-size: 0.9em;">{{startDate}} - {{endDate}}</span>
            </div>
            <p style="color: var(--accent); font-weight: 600; margin: 0 0 8px 0;">{{company}}</p>
            <p style="line-height: 1.5; color: var(--secondary);">{{description}}</p>
          </div>
          {{/each}}
        </section>
        {{/if}}
        
        {{#if education}}
        <section class="education" style="margin-bottom: 25px;">
          <h2 style="
            color: var(--accent);
            font-size: 1.3em;
            margin-bottom: 15px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 5px;
          ">EDUCATION</h2>
          {{#each education}}
          <div class="degree" style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
              <h3 style="color: var(--secondary); font-size: 1.1em; margin: 0;">{{degree}}</h3>
              <span style="color: var(--tertiary); font-size: 0.9em;">{{graduationYear}}</span>
            </div>
            <p style="color: var(--accent); font-weight: 600; margin: 0;">{{institution}}</p>
          </div>
          {{/each}}
        </section>
        {{/if}}
        
        {{#if skills}}
        <section class="skills" style="margin-bottom: 25px;">
          <h2 style="
            color: var(--accent);
            font-size: 1.3em;
            margin-bottom: 15px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 5px;
          ">SKILLS</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            {{#each skills}}
            <span style="
              background: var(--accent);
              color: white;
              padding: 4px 12px;
              border-radius: 15px;
              font-size: 0.9em;
              font-weight: 500;
            ">{{this}}</span>
            {{/each}}
          </div>
        </section>
        {{/if}}
        
        {{#if projects}}
        <section class="projects" style="margin-bottom: 25px;">
          <h2 style="
            color: var(--accent);
            font-size: 1.3em;
            margin-bottom: 15px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 5px;
          ">PROJECTS</h2>
          {{#each projects}}
          <div class="project" style="margin-bottom: 15px;">
            <h3 style="color: var(--secondary); font-size: 1.1em; margin: 0 0 5px 0;">{{name}}</h3>
            <p style="line-height: 1.5; color: var(--secondary);">{{description}}</p>
          </div>
          {{/each}}
        </section>
        {{/if}}
      </div>
    </div>
  `;
  
  return baseHTML;
}

// Run the generation
generateExtendedTemplates();
