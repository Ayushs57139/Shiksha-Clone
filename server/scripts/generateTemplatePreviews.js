import puppeteer from 'puppeteer';
import Template from '../models/Template.js';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Sample resume data for preview generation
const sampleResumeData = {
  firstName: 'John',
  lastName: 'Doe',
  title: 'Software Engineer',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  summary: 'Experienced software engineer with 5+ years of experience in full-stack development. Passionate about creating scalable web applications and leading technical teams.',
  skills: 'JavaScript, React, Node.js, Python, AWS, Docker, Kubernetes',
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      year: '2018'
    }
  ],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      startDate: '2021',
      endDate: 'Present',
      achievements: [
        'Led development of microservices architecture serving 1M+ users',
        'Improved application performance by 40% through optimization',
        'Mentored junior developers and conducted code reviews'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'StartupXYZ',
      startDate: '2019',
      endDate: '2021',
      achievements: [
        'Developed RESTful APIs using Node.js and Express',
        'Built responsive frontend components with React',
        'Collaborated with cross-functional teams in agile environment'
      ]
    }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      technologies: 'React, Node.js, MongoDB, Stripe',
      description: 'Full-stack e-commerce platform with payment integration and admin dashboard'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022'
    }
  ]
};

// Helper function to apply template data (similar to the one in resumes.js)
function applyTemplateHtml(templateHtml, resumeData) {
  const data = resumeData;

  // each blocks for arrays: {{#each experience}} ... {{/each}}
  const eachRegex = /\{\{#each\s+(\w+)}}([\s\S]*?)\{\{\/each}}/g;
  let rendered = templateHtml.replace(eachRegex, (match, key, inner) => {
    const arr = data[key];
    if (!Array.isArray(arr)) return '';
    return arr.map((item) => {
      return inner.replace(/\{\{(\w+)}}/g, (m, k) => (item[k] ?? ''));
    }).join('');
  });

  // simple placeholders like {{firstName}}
  rendered = rendered.replace(/\{\{(\w+)}}/g, (m, key) => (data[key] ?? ''));
  return rendered;
}

function wrapTemplateHTML(inner, accent = '#0f766e', secondary = '#111827', tertiary = '#64748b') {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    :root{--accent:${accent}; --secondary:${secondary}; --tertiary:${tertiary};}
    body{font-family: Arial, Helvetica, sans-serif; color:var(--secondary); line-height:1.6; margin:0; padding:20px;}
    h1,h2,h3{color:var(--accent); margin-bottom:8px;}
    .header{border-bottom:3px solid var(--accent); padding-bottom:12px; margin-bottom:16px}
    .title{color:var(--tertiary); font-weight:500;}
    .sidebar{background:rgba(0,0,0,0.03); padding:12px;}
    .skill-tags{color:var(--accent)}
    .job-head{display:flex; gap:8px; align-items:center;}
    .contact-bar{color:var(--tertiary); font-size:14px;}
    .company{color:var(--tertiary); font-style:italic;}
    .duration{color:var(--tertiary); font-size:12px;}
    .achievements{margin:8px 0; padding-left:16px;}
    .achievements li{margin-bottom:4px;}
    .skills-grid{display:flex; flex-wrap:wrap; gap:8px;}
    .skill-tag{background:var(--accent); color:white; padding:4px 8px; border-radius:4px; font-size:12px;}
    .creative-avatar{width:80px; height:80px; background:var(--accent); border-radius:50%; margin:0 auto 16px;}
    .tech-skills-grid{display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); gap:8px;}
    .academic-cert{margin-bottom:8px; padding:8px; background:rgba(0,0,0,0.02); border-left:3px solid var(--accent);}
    .template-executive, .template-creative, .template-technical, .template-academic, .template-financial, .template-marketing {
      max-width: 800px; margin: 0 auto; background: white; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
  </style></head><body>${inner}</body></html>`;
}

async function generateTemplatePreviews() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/collegeinfo');
    console.log('Connected to MongoDB');

    // Get all templates
    const templates = await Template.find({ isActive: true });
    console.log(`Found ${templates.length} templates to generate previews for`);

    // Create previews directory if it doesn't exist
    const previewsDir = path.join(process.cwd(), 'public', 'template-previews');
    if (!fs.existsSync(previewsDir)) {
      fs.mkdirSync(previewsDir, { recursive: true });
    }

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 1000 });

    let generated = 0;
    for (const template of templates) {
      try {
        // Generate HTML content
        const htmlContent = wrapTemplateHTML(
          applyTemplateHtml(template.html, sampleResumeData),
          template.accentColor,
          template.secondaryColor,
          template.tertiaryColor
        );

        // Set content and wait for rendering
        await page.setContent(htmlContent, { 
          waitUntil: ['networkidle0', 'domcontentloaded'] 
        });

        // Wait a bit for content to render
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate screenshot
        const slug = template.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const screenshotPath = path.join(previewsDir, `${slug}.png`);
        
        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
          type: 'png'
        });

        // Update template with preview path
        await Template.findByIdAndUpdate(template._id, {
          preview: `/template-previews/${slug}.png`
        });

        generated++;
        console.log(`Generated preview for: ${template.name} (${generated}/${templates.length})`);

      } catch (error) {
        console.error(`Error generating preview for ${template.name}:`, error.message);
      }
    }

    await browser.close();
    console.log(`✅ Successfully generated ${generated} template previews`);

  } catch (error) {
    console.error('Error generating template previews:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the generation
if (import.meta.url === `file://${process.argv[1]}`) {
  generateTemplatePreviews();
}

export { generateTemplatePreviews };
