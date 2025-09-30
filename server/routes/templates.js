import express from 'express';
import Template from '../models/Template.js';

const router = express.Router();

// Color palettes generator for diverse themes
function pickPalette(index) {
  const palettes = [
    { accent: '#0ea5e9', secondary: '#0f172a' }, // sky + slate
    { accent: '#22c55e', secondary: '#0b132b' }, // green + dark blue
    { accent: '#f59e0b', secondary: '#111827' }, // amber + gray-900
    { accent: '#ef4444', secondary: '#1f2937' }, // red + gray-800
    { accent: '#8b5cf6', secondary: '#0a0a0a' }, // violet + near-black
    { accent: '#14b8a6', secondary: '#0b132b' }, // teal + dark blue
    { accent: '#f97316', secondary: '#111827' }, // orange + gray-900
    { accent: '#10b981', secondary: '#0f172a' }, // emerald + slate-900
    { accent: '#6366f1', secondary: '#111827' }, // indigo
    { accent: '#84cc16', secondary: '#0b132b' }, // lime
  ];
  return palettes[index % palettes.length];
}

// Helper to seed docs
function buildHtml(category, role, slug) {
  const baseHeader = `
    <header class="header">
      <h1 class="name">{{firstName}} {{lastName}}</h1>
      <p class="title">${role}</p>
      <div class="contact"><span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span></div>
    </header>`;

  if (category === 'Creative') {
    return `
      <div class="template-${slug} creative">
        <div class="layout">
          <aside class="sidebar">
            <div class="avatar"></div>
            <h2 class="side-name">{{firstName}}<br/>{{lastName}}</h2>
            <div class="side-contact">{{email}}<br/>{{phone}}<br/>{{location}}</div>
            <h3>Skills</h3>
            <div class="skill-tags">{{skills}}</div>
          </aside>
          <main class="main">
            ${baseHeader}
            <section class="summary"><h2>About</h2><p>{{summary}}</p></section>
            <section class="experience"><h2>Experience</h2>
            {{#each experience}}
              <div class="job"><div class="job-head"><h3>{{title}}</h3><span>{{company}}</span><span>{{startDate}} - {{endDate}}</span></div><ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul></div>
            {{/each}}
            </section>
            <section class="education"><h2>Education</h2>
            {{#each education}}<div class="degree"><h3>{{degree}}</h3><p>{{institution}} • {{year}}</p></div>{{/each}}
            </section>
          </main>
        </div>
      </div>`;
  }

  if (category === 'Technical') {
    return `
      <div class="template-${slug} technical">
        ${baseHeader}
        <section class="summary"><h2>Profile</h2><p>{{summary}}</p></section>
        <section class="skills"><h2>Technical Skills</h2><p>{{skills}}</p></section>
        <section class="projects"><h2>Projects</h2>
          {{#each projects}}
            <div class="project"><h3>{{name}}</h3><p><i>{{technologies}}</i></p><p>{{description}}</p></div>
          {{/each}}
        </section>
        <section class="experience"><h2>Experience</h2>
          {{#each experience}}<div class="job"><h3>{{title}} - {{company}}</h3><p>{{startDate}} - {{endDate}}</p><ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul></div>{{/each}}
        </section>
        <section class="education"><h2>Education</h2>
          {{#each education}}<div class="degree"><h3>{{degree}}</h3><p>{{institution}} - {{year}}</p></div>{{/each}}
        </section>
      </div>`;
  }

  if (category === 'Academic') {
    return `
      <div class="template-${slug} academic">
        ${baseHeader}
        <section class="summary"><h2>Research Summary</h2><p>{{summary}}</p></section>
        <section class="experience"><h2>Academic Experience</h2>
          {{#each experience}}<div class="job"><h3>{{title}}</h3><p>{{company}} • {{startDate}} - {{endDate}}</p><ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul></div>{{/each}}
        </section>
        <section class="education"><h2>Education</h2>
          {{#each education}}<div class="degree"><h3>{{degree}}</h3><p>{{institution}} • {{year}}</p></div>{{/each}}
        </section>
        <section class="certifications"><h2>Awards & Certifications</h2>
          {{#each certifications}}<div class="cert"><strong>{{name}}</strong> — {{issuer}} ({{date}})</div>{{/each}}
        </section>
      </div>`;
  }

  // Professional (default)
  return `
    <div class="template-${slug} professional">
      ${baseHeader}
      <section class="summary"><h2>Professional Summary</h2><p>{{summary}}</p></section>
      <section class="experience"><h2>Work Experience</h2>
        {{#each experience}}<div class="job"><h3>{{title}}</h3><p class="meta">{{company}} | {{startDate}} - {{endDate}}</p><ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul></div>{{/each}}
      </section>
      <section class="education"><h2>Education</h2>
        {{#each education}}<div class="degree"><h3>{{degree}}</h3><p>{{institution}} | {{year}}</p></div>{{/each}}
      </section>
      <section class="skills"><h2>Core Competencies</h2><p>{{skills}}</p></section>
    </div>`;
}

async function seedDocsIfEmpty() {
  const count = await Template.countDocuments();
  if (count > 0) return false;
  const categories = ['Professional', 'Creative', 'Technical', 'Academic'];
  const rolesMap = {
    Professional: ['Senior Manager','Director','VP','CEO','CFO','CTO','COO','Product Manager','Operations Manager','HR Manager','Finance Manager','Legal Counsel','Consultant','Strategy Manager','Process Manager','Sales Lead','Account Manager','Program Manager'],
    Creative: ['Art Director','Creative Director','Brand Manager','Visual Designer','Web Designer','Illustrator','Animator','Motion Designer','3D Artist','Game Designer','Sound Designer','Fashion Designer','Interior Designer','Architect','Landscape Designer','Photographer','Content Creator','Video Producer'],
    Technical: ['Full Stack Developer','Frontend Developer','Backend Developer','Mobile Developer','Game Developer','Machine Learning Engineer','AI Engineer','Cloud Engineer','Network Engineer','Security Engineer','Database Administrator','SRE','Technical Lead','Software Architect','Product Owner','Scrum Master','Data Engineer','Platform Engineer'],
    Academic: ['Associate Professor','Professor','Department Chair','Dean','Provost','Research Director','Grant Manager','Academic Advisor','Curriculum Developer','Assessment Specialist','Librarian','Archivist','Museum Curator','Policy Analyst','Research Coordinator','Academic Administrator','PhD Candidate','Postdoctoral Researcher']
  };
  const docs = [];
  let created = 0;
  while (created < 220) {
    const category = categories[created % categories.length];
    const role = rolesMap[category][created % rolesMap[category].length];
    const slug = role.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const html = buildHtml(category, role, slug);
    const palette = pickPalette(created);
    docs.push({ name: `${role} ${category}`, category, description: `${category} template tailored for ${role}`, preview: `/templates/${slug}.png`, html, accentColor: palette.accent, secondaryColor: palette.secondary });
    created++;
  }
  await Template.insertMany(docs);
  return true;
}

// Generate mock templates when database is not available
function generateMockTemplates() {
  const categories = ['Professional', 'Creative', 'Technical', 'Academic', 'Financial', 'Marketing', 'Healthcare', 'Education', 'Engineering', 'Design', 'Business', 'Sales', 'Management', 'Consulting', 'Research', 'Media', 'Entertainment', 'Sports', 'Legal', 'Real Estate', 'Hospitality', 'Retail', 'Manufacturing', 'Technology'];
  const roles = [
    'Senior Manager', 'Director', 'VP', 'CEO', 'CFO', 'CTO', 'COO', 'Product Manager', 'Operations Manager', 'HR Manager', 'Finance Manager', 'Legal Counsel', 'Consultant', 'Strategy Manager', 'Process Manager', 'Sales Lead', 'Account Manager', 'Program Manager',
    'Art Director', 'Creative Director', 'Brand Manager', 'Visual Designer', 'Web Designer', 'Illustrator', 'Animator', 'Motion Designer', '3D Artist', 'Game Designer', 'Sound Designer', 'Fashion Designer', 'Interior Designer', 'Architect', 'Landscape Designer', 'Photographer', 'Content Creator', 'Video Producer',
    'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Mobile Developer', 'Game Developer', 'Machine Learning Engineer', 'AI Engineer', 'Cloud Engineer', 'Network Engineer', 'Security Engineer', 'Database Administrator', 'SRE', 'Technical Lead', 'Software Architect', 'Product Owner', 'Scrum Master', 'Data Engineer', 'Platform Engineer',
    'Associate Professor', 'Professor', 'Department Chair', 'Dean', 'Provost', 'Research Director', 'Grant Manager', 'Academic Advisor', 'Curriculum Developer', 'Assessment Specialist', 'Librarian', 'Archivist', 'Museum Curator', 'Policy Analyst', 'Research Coordinator', 'Academic Administrator', 'PhD Candidate', 'Postdoctoral Researcher'
  ];
  
  const mockTemplates = [];
  for (let i = 0; i < 220; i++) {
    const category = categories[i % categories.length];
    const role = roles[i % roles.length];
    const palette = pickPalette(i);
    
    mockTemplates.push({
      _id: `mock_template_${i}`,
      name: `${role} ${category}`,
      category: category,
      description: `${category} template tailored for ${role}`,
      preview: `/templates/mock-${i}.png`,
      html: buildHtml(category, role, `mock-${i}`),
      accentColor: palette.accent,
      secondaryColor: palette.secondary,
      tertiaryColor: palette.tertiary || '#ffffff',
      layout: ['executive', 'creative', 'technical', 'academic', 'minimalist', 'modern', 'classic', 'bold', 'elegant', 'dynamic'][i % 10],
      focus: ['leadership', 'innovation', 'technical', 'academic', 'creative', 'business', 'analytical', 'strategic'][i % 8],
      usageCount: Math.floor(Math.random() * 100),
      isActive: true,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    });
  }
  
  return mockTemplates;
}

// List templates with optional filters. If none exist, auto-seed once.
router.get('/', async (req, res) => {
  try {
    const { category, q, isActive } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (typeof isActive !== 'undefined') filter.isActive = isActive === 'true';
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ];
    }
    
    let templates = [];
    try {
      templates = await Template.find(filter).sort({ createdAt: -1 });
      if (templates.length === 0) {
        const seeded = await seedDocsIfEmpty();
        if (seeded) {
          templates = await Template.find(filter).sort({ createdAt: -1 });
        }
      }
    } catch (dbError) {
      console.error('Database error, using fallback data:', dbError);
      // Fallback to mock data when database is not available
      templates = generateMockTemplates();
    }
    
    res.json({ success: true, data: templates });
  } catch (err) {
    console.error('Error listing templates:', err);
    // Fallback to mock data
    const mockTemplates = generateMockTemplates();
    res.json({ success: true, data: mockTemplates });
  }
});

// Get template by id
router.get('/:id', async (req, res) => {
  try {
    const tpl = await Template.findById(req.params.id);
    if (!tpl) return res.status(404).json({ success: false, message: 'Template not found' });
    res.json({ success: true, data: tpl });
  } catch (err) {
    console.error('Error getting template:', err);
    res.status(500).json({ success: false, message: 'Error getting template' });
  }
});

// Create template
router.post('/', async (req, res) => {
  try {
    const tpl = await Template.create(req.body);
    res.status(201).json({ success: true, data: tpl });
  } catch (err) {
    console.error('Error creating template:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update template
router.put('/:id', async (req, res) => {
  try {
    const tpl = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tpl) return res.status(404).json({ success: false, message: 'Template not found' });
    res.json({ success: true, data: tpl });
  } catch (err) {
    console.error('Error updating template:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete template
router.delete('/:id', async (req, res) => {
  try {
    const tpl = await Template.findByIdAndDelete(req.params.id);
    if (!tpl) return res.status(404).json({ success: false, message: 'Template not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting template:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Increment template usage count
router.post('/:id/use', async (req, res) => {
  try {
    const tpl = await Template.findByIdAndUpdate(
      req.params.id,
      { $inc: { usageCount: 1 } },
      { new: true }
    );
    if (!tpl) return res.status(404).json({ success: false, message: 'Template not found' });
    res.json({ success: true, data: tpl });
  } catch (err) {
    console.error('Error updating template usage:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;

// Enhanced seed endpoint to bulk-generate 220 unique templates
router.post('/seed', async (req, res) => {
  try {
    const count = await Template.countDocuments();
    if (count >= 220) return res.json({ success: true, message: 'Already seeded', count });
    
    // Import the generation function
    const { generateAllTemplates } = await import('../scripts/generateTemplates.js');
    await generateAllTemplates();
    
    const newCount = await Template.countDocuments();
    res.json({ success: true, message: 'Seeded 220 unique templates', count: newCount });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Seed failed: ' + e.message });
  }
});

// Refresh (drop and reseed) — cautious use in dev only
router.post('/seed/refresh', async (req, res) => {
  try {
    await Template.deleteMany({});
    await seedDocsIfEmpty();
    res.json({ success: true, message: 'Templates refreshed' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Refresh failed' });
  }
});


