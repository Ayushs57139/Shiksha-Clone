import express from 'express';
import Resume from '../models/Resume.js';
import puppeteer from 'puppeteer';
import Template from '../models/Template.js';

const router = express.Router();

// Get all resumes (admin only)
router.get('/all', async (req, res) => {
  try {
    const resumes = await Resume.find()
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: resumes
    });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resumes'
    });
  }
});

// Get user's resume
router.get('/user/:userId', async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }
    
    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('Error fetching user resume:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resume'
    });
  }
});

// Create or update resume
router.post('/save', async (req, res) => {
  try {
    const { userId, resumeData } = req.body;
    
    if (!userId || !resumeData) {
      return res.status(400).json({
        success: false,
        message: 'User ID and resume data are required'
      });
    }
    
    // Check if resume exists for this user
    let resume = await Resume.findOne({ userId });
    
    if (resume) {
      // Update existing resume
      resume.set(resumeData);
      await resume.save();
    } else {
      // Create new resume
      resume = new Resume({
        userId,
        ...resumeData
      });
      await resume.save();
    }
    
    res.json({
      success: true,
      message: 'Resume saved successfully',
      data: resume
    });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving resume'
    });
  }
});

// Generate PDF
router.post('/generate-pdf', async (req, res) => {
  try {
    const { resumeData } = req.body;
    
    if (!resumeData) {
      return res.status(400).json({
        success: false,
        message: 'Resume data is required'
      });
    }
    
    // Build HTML either from selected template (Handlebars-like) or default
    let htmlContent = generateResumeHTML(resumeData);
    if (resumeData.selectedTemplateId) {
      try {
        const tpl = await Template.findById(resumeData.selectedTemplateId);
        if (tpl && tpl.html) {
          htmlContent = wrapTemplateHTML(applyTemplateHtml(tpl.html, resumeData), tpl.accentColor, tpl.secondaryColor, tpl.tertiaryColor);
          // Increment usage count
          await Template.findByIdAndUpdate(resumeData.selectedTemplateId, { $inc: { usageCount: 1 } });
        }
      } catch (e) {
        console.error('Template render fallback:', e.message);
      }
    }
    
    // Launch puppeteer with better configuration
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
    
    // Set viewport and content
    await page.setViewport({ width: 1200, height: 800 });
    await page.setContent(htmlContent, { 
      waitUntil: ['networkidle0', 'domcontentloaded'] 
    });
    
    // Wait a bit for content to render
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate PDF with better settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      displayHeaderFooter: false
    });
    
    await browser.close();
    
    // Set response headers for proper PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-cache');
    
    // Send the PDF buffer
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating PDF: ' + error.message
    });
  }
});

// Helper function to generate HTML for PDF
function generateResumeHTML(resumeData) {
  // Helper function to safely get values
  const safeGet = (obj, key, defaultValue = '') => {
    return obj && obj[key] ? obj[key] : defaultValue;
  };
  
  // Helper function to safely join arrays
  const safeJoin = (arr, separator = ', ') => {
    return Array.isArray(arr) && arr.length > 0 ? arr.join(separator) : '';
  };
  
  const personalInfo = resumeData.personalInfo || {};
  const name = safeGet(personalInfo, 'name', 'Your Name');
  const email = safeGet(personalInfo, 'email', '');
  const phone = safeGet(personalInfo, 'phone', '');
  const address = safeGet(personalInfo, 'address', '');
  const linkedin = safeGet(personalInfo, 'linkedin', '');
  const website = safeGet(personalInfo, 'website', '');
  
  // Build contact info string
  const contactParts = [email, phone, address, linkedin, website].filter(Boolean);
  const contactInfo = contactParts.join(' | ');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Resume - ${name}</title>
      <style>
        @page {
          size: A4;
          margin: 20mm;
        }
        body {
          font-family: 'Arial', 'Helvetica', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          font-size: 12px;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #2c7a7b;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .name {
          font-size: 28px;
          font-weight: bold;
          color: #2c7a7b;
          margin-bottom: 10px;
        }
        .contact-info {
          font-size: 12px;
          color: #666;
          margin-bottom: 10px;
          word-wrap: break-word;
        }
        .section {
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .section-title {
          font-size: 16px;
          font-weight: bold;
          color: #2c7a7b;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 5px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .item {
          margin-bottom: 12px;
          page-break-inside: avoid;
        }
        .item-title {
          font-weight: bold;
          font-size: 14px;
          color: #2c7a7b;
        }
        .item-subtitle {
          color: #666;
          font-size: 12px;
          margin-bottom: 5px;
          font-style: italic;
        }
        .item-description {
          font-size: 12px;
          margin-top: 5px;
          text-align: justify;
        }
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-tag {
          background-color: #e2e8f0;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          color: #2c7a7b;
        }
        .project-item, .certification-item {
          margin-bottom: 12px;
          padding-left: 12px;
          border-left: 3px solid #e2e8f0;
        }
        ul {
          margin: 5px 0;
          padding-left: 20px;
        }
        li {
          margin-bottom: 3px;
        }
        .summary-text {
          text-align: justify;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${name}</div>
        <div class="contact-info">${contactInfo}</div>
      </div>
      
      ${resumeData.summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="summary-text">${resumeData.summary}</div>
        </div>
      ` : ''}
      
      ${resumeData.education && resumeData.education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${resumeData.education.map(edu => `
            <div class="item">
              <div class="item-title">${safeGet(edu, 'degree', 'Degree')}</div>
              <div class="item-subtitle">${safeGet(edu, 'institution', 'Institution')} | ${safeGet(edu, 'year', 'Year')} ${safeGet(edu, 'gpa') ? `| GPA: ${safeGet(edu, 'gpa')}` : ''}</div>
              ${safeGet(edu, 'description') ? `<div class="item-description">${safeGet(edu, 'description')}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${resumeData.experience && resumeData.experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Work Experience</div>
          ${resumeData.experience.map(exp => `
            <div class="item">
              <div class="item-title">${safeGet(exp, 'title', 'Position')}</div>
              <div class="item-subtitle">${safeGet(exp, 'company', 'Company')} | ${safeGet(exp, 'duration', 'Duration')}</div>
              <div class="item-description">${safeGet(exp, 'description', '')}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${resumeData.skills && resumeData.skills.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-list">
            ${resumeData.skills.map(skill => `
              <span class="skill-tag">${skill}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      ${resumeData.projects && resumeData.projects.length > 0 ? `
        <div class="section">
          <div class="section-title">Projects</div>
          ${resumeData.projects.map(project => `
            <div class="project-item">
              <div class="item-title">${safeGet(project, 'name', 'Project Name')}</div>
              <div class="item-subtitle">${safeGet(project, 'technologies', 'Technologies')}</div>
              <div class="item-description">${safeGet(project, 'description', '')}</div>
              ${safeGet(project, 'link') ? `<div class="item-subtitle">Link: ${safeGet(project, 'link')}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${resumeData.certifications && resumeData.certifications.length > 0 ? `
        <div class="section">
          <div class="section-title">Certifications</div>
          ${resumeData.certifications.map(cert => `
            <div class="certification-item">
              <div class="item-title">${safeGet(cert, 'name', 'Certification Name')}</div>
              <div class="item-subtitle">${safeGet(cert, 'issuer', 'Issuer')} | ${safeGet(cert, 'date', 'Date')}</div>
              ${safeGet(cert, 'link') ? `<div class="item-subtitle">Link: ${safeGet(cert, 'link')}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </body>
    </html>
  `;
}

// Very small helper to replace {{placeholders}} and simple each blocks
function applyTemplateHtml(templateHtml, resumeData) {
  const data = normalizeResumeData(resumeData);

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

function normalizeResumeData(resumeData) {
  const personal = resumeData.personalInfo || {};
  const [firstName, ...rest] = (personal.name || '').split(' ');
  const lastName = rest.join(' ');
  return {
    firstName: firstName || 'First',
    lastName: lastName || 'Last',
    title: resumeData.summary ? 'Professional Summary' : '',
    email: personal.email || '',
    phone: personal.phone || '',
    location: personal.address || '',
    summary: resumeData.summary || '',
    skills: (resumeData.skills || []).join(', '),
    education: (resumeData.education || []).map(e => ({
      degree: e.degree,
      institution: e.institution,
      year: e.year
    })),
    experience: (resumeData.experience || []).map(x => ({
      title: x.title,
      company: x.company,
      startDate: (x.duration || '').split('-')[0]?.trim() || '',
      endDate: (x.duration || '').split('-')[1]?.trim() || '',
      achievements: (x.description ? x.description.split('\n') : [])
    })),
    projects: (resumeData.projects || []).map(p => ({
      name: p.name,
      technologies: p.technologies,
      description: p.description,
      link: p.link
    })),
    certifications: (resumeData.certifications || []).map(c => ({
      name: c.name,
      issuer: c.issuer,
      date: c.date,
      link: c.link
    })),
  };
}

function wrapTemplateHTML(inner, accent = '#0f766e', secondary = '#111827', tertiary = '#64748b') {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    :root{--accent:${accent}; --secondary:${secondary}; --tertiary:${tertiary};}
    body{font-family: Arial, Helvetica, sans-serif; color:var(--secondary); line-height:1.6;}
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
  </style></head><body>${inner}</body></html>`;
}

export default router; 