import mongoose from 'mongoose';
import Template from '../models/Template.js';

// Comprehensive color palettes for diverse themes
const colorPalettes = [
  // Professional Blues
  { accent: '#1e40af', secondary: '#1e293b', tertiary: '#64748b', name: 'Corporate Blue' },
  { accent: '#0ea5e9', secondary: '#0f172a', tertiary: '#475569', name: 'Sky Blue' },
  { accent: '#0284c7', secondary: '#0c4a6e', tertiary: '#0369a1', name: 'Ocean Blue' },
  { accent: '#3b82f6', secondary: '#1e3a8a', tertiary: '#60a5fa', name: 'Royal Blue' },
  
  // Professional Greens
  { accent: '#059669', secondary: '#064e3b', tertiary: '#10b981', name: 'Forest Green' },
  { accent: '#16a34a', secondary: '#14532d', tertiary: '#22c55e', name: 'Emerald Green' },
  { accent: '#65a30d', secondary: '#365314', tertiary: '#84cc16', name: 'Lime Green' },
  { accent: '#22c55e', secondary: '#052e16', tertiary: '#4ade80', name: 'Mint Green' },
  
  // Professional Purples
  { accent: '#7c3aed', secondary: '#581c87', tertiary: '#a855f7', name: 'Royal Purple' },
  { accent: '#8b5cf6', secondary: '#4c1d95', tertiary: '#c084fc', name: 'Violet' },
  { accent: '#9333ea', secondary: '#6b21a8', tertiary: '#d946ef', name: 'Magenta' },
  { accent: '#a855f7', secondary: '#5b21b6', tertiary: '#e879f9', name: 'Lavender' },
  
  // Professional Reds
  { accent: '#dc2626', secondary: '#7f1d1d', tertiary: '#ef4444', name: 'Crimson Red' },
  { accent: '#ea580c', secondary: '#9a3412', tertiary: '#f97316', name: 'Orange Red' },
  { accent: '#f59e0b', secondary: '#92400e', tertiary: '#fbbf24', name: 'Amber' },
  { accent: '#eab308', secondary: '#a16207', tertiary: '#facc15', name: 'Golden Yellow' },
  
  // Professional Grays
  { accent: '#374151', secondary: '#111827', tertiary: '#6b7280', name: 'Charcoal' },
  { accent: '#4b5563', secondary: '#1f2937', tertiary: '#9ca3af', name: 'Slate Gray' },
  { accent: '#6b7280', secondary: '#374151', tertiary: '#d1d5db', name: 'Neutral Gray' },
  { accent: '#9ca3af', secondary: '#4b5563', tertiary: '#e5e7eb', name: 'Light Gray' },
  
  // Creative Colors
  { accent: '#ec4899', secondary: '#be185d', tertiary: '#f472b6', name: 'Pink' },
  { accent: '#06b6d4', secondary: '#155e75', tertiary: '#22d3ee', name: 'Cyan' },
  { accent: '#8b5cf6', secondary: '#5b21b6', tertiary: '#c084fc', name: 'Purple' },
  { accent: '#f97316', secondary: '#ea580c', tertiary: '#fb923c', name: 'Orange' },
  
  // Technical Colors
  { accent: '#10b981', secondary: '#047857', tertiary: '#34d399', name: 'Tech Green' },
  { accent: '#3b82f6', secondary: '#1d4ed8', tertiary: '#60a5fa', name: 'Tech Blue' },
  { accent: '#f59e0b', secondary: '#d97706', tertiary: '#fbbf24', name: 'Tech Yellow' },
  { accent: '#ef4444', secondary: '#dc2626', tertiary: '#f87171', name: 'Tech Red' },
  
  // Academic Colors
  { accent: '#7c2d12', secondary: '#431407', tertiary: '#dc2626', name: 'Academic Red' },
  { accent: '#1e40af', secondary: '#1e3a8a', tertiary: '#3b82f6', name: 'Academic Blue' },
  { accent: '#166534', secondary: '#14532d', tertiary: '#16a34a', name: 'Academic Green' },
  { accent: '#7c2d12', secondary: '#92400e', tertiary: '#ea580c', name: 'Academic Brown' }
];

// Role-specific template configurations
const roleConfigurations = {
  // Professional Roles
  'Senior Manager': { category: 'Professional', layout: 'executive', focus: 'leadership' },
  'Director': { category: 'Professional', layout: 'executive', focus: 'strategy' },
  'VP': { category: 'Professional', layout: 'executive', focus: 'vision' },
  'CEO': { category: 'Professional', layout: 'executive', focus: 'leadership' },
  'CFO': { category: 'Professional', layout: 'financial', focus: 'finance' },
  'CTO': { category: 'Professional', layout: 'technical', focus: 'technology' },
  'COO': { category: 'Professional', layout: 'operational', focus: 'operations' },
  'Product Manager': { category: 'Professional', layout: 'product', focus: 'product' },
  'Operations Manager': { category: 'Professional', layout: 'operational', focus: 'operations' },
  'HR Manager': { category: 'Professional', layout: 'people', focus: 'human-resources' },
  'Finance Manager': { category: 'Professional', layout: 'financial', focus: 'finance' },
  'Legal Counsel': { category: 'Professional', layout: 'legal', focus: 'legal' },
  'Consultant': { category: 'Professional', layout: 'consulting', focus: 'consulting' },
  'Strategy Manager': { category: 'Professional', layout: 'strategy', focus: 'strategy' },
  'Process Manager': { category: 'Professional', layout: 'process', focus: 'process' },
  'Sales Lead': { category: 'Professional', layout: 'sales', focus: 'sales' },
  'Account Manager': { category: 'Professional', layout: 'account', focus: 'account' },
  'Program Manager': { category: 'Professional', layout: 'program', focus: 'program' },
  'Business Analyst': { category: 'Professional', layout: 'analytical', focus: 'analysis' },
  'Project Manager': { category: 'Professional', layout: 'project', focus: 'project' },
  'Marketing Manager': { category: 'Professional', layout: 'marketing', focus: 'marketing' },
  'Sales Professional': { category: 'Professional', layout: 'sales', focus: 'sales' },
  'Corporate Executive': { category: 'Professional', layout: 'executive', focus: 'executive' },
  'Executive Summary': { category: 'Professional', layout: 'executive', focus: 'summary' },
  'Business Professional': { category: 'Professional', layout: 'business', focus: 'business' },
  'Corporate Clean': { category: 'Professional', layout: 'corporate', focus: 'corporate' },
  'Modern Executive': { category: 'Professional', layout: 'modern', focus: 'modern' },
  'Classic Professional': { category: 'Professional', layout: 'classic', focus: 'classic' },

  // Creative Roles
  'Art Director': { category: 'Creative', layout: 'artistic', focus: 'art' },
  'Creative Director': { category: 'Creative', layout: 'creative', focus: 'creative' },
  'Brand Manager': { category: 'Creative', layout: 'brand', focus: 'brand' },
  'Visual Designer': { category: 'Creative', layout: 'visual', focus: 'visual' },
  'Web Designer': { category: 'Creative', layout: 'web', focus: 'web' },
  'Illustrator': { category: 'Creative', layout: 'illustration', focus: 'illustration' },
  'Animator': { category: 'Creative', layout: 'animation', focus: 'animation' },
  'Motion Designer': { category: 'Creative', layout: 'motion', focus: 'motion' },
  '3D Artist': { category: 'Creative', layout: '3d', focus: '3d' },
  'Game Designer': { category: 'Creative', layout: 'game', focus: 'game' },
  'Sound Designer': { category: 'Creative', layout: 'sound', focus: 'sound' },
  'Fashion Designer': { category: 'Creative', layout: 'fashion', focus: 'fashion' },
  'Interior Designer': { category: 'Creative', layout: 'interior', focus: 'interior' },
  'Architect': { category: 'Creative', layout: 'architecture', focus: 'architecture' },
  'Landscape Designer': { category: 'Creative', layout: 'landscape', focus: 'landscape' },
  'Photographer': { category: 'Creative', layout: 'photography', focus: 'photography' },
  'Content Creator': { category: 'Creative', layout: 'content', focus: 'content' },
  'Video Producer': { category: 'Creative', layout: 'video', focus: 'video' },
  'Graphic Designer': { category: 'Creative', layout: 'graphic', focus: 'graphic' },
  'UI/UX Designer': { category: 'Creative', layout: 'uiux', focus: 'uiux' },
  'Video Editor': { category: 'Creative', layout: 'video', focus: 'video' },
  'Creative Portfolio': { category: 'Creative', layout: 'portfolio', focus: 'portfolio' },
  'Design Portfolio': { category: 'Creative', layout: 'design', focus: 'design' },
  'Artistic Resume': { category: 'Creative', layout: 'artistic', focus: 'artistic' },

  // Technical Roles
  'Full Stack Developer': { category: 'Technical', layout: 'fullstack', focus: 'fullstack' },
  'Frontend Developer': { category: 'Technical', layout: 'frontend', focus: 'frontend' },
  'Backend Developer': { category: 'Technical', layout: 'backend', focus: 'backend' },
  'Mobile Developer': { category: 'Technical', layout: 'mobile', focus: 'mobile' },
  'Game Developer': { category: 'Technical', layout: 'game', focus: 'game' },
  'Machine Learning Engineer': { category: 'Technical', layout: 'ml', focus: 'ml' },
  'AI Engineer': { category: 'Technical', layout: 'ai', focus: 'ai' },
  'Cloud Engineer': { category: 'Technical', layout: 'cloud', focus: 'cloud' },
  'Network Engineer': { category: 'Technical', layout: 'network', focus: 'network' },
  'Security Engineer': { category: 'Technical', layout: 'security', focus: 'security' },
  'Database Administrator': { category: 'Technical', layout: 'database', focus: 'database' },
  'SRE': { category: 'Technical', layout: 'sre', focus: 'sre' },
  'Technical Lead': { category: 'Technical', layout: 'lead', focus: 'lead' },
  'Software Architect': { category: 'Technical', layout: 'architect', focus: 'architect' },
  'Product Owner': { category: 'Technical', layout: 'product', focus: 'product' },
  'Scrum Master': { category: 'Technical', layout: 'scrum', focus: 'scrum' },
  'Data Engineer': { category: 'Technical', layout: 'data', focus: 'data' },
  'Platform Engineer': { category: 'Technical', layout: 'platform', focus: 'platform' },
  'Software Engineer': { category: 'Technical', layout: 'software', focus: 'software' },
  'Data Scientist': { category: 'Technical', layout: 'data', focus: 'data' },
  'DevOps Engineer': { category: 'Technical', layout: 'devops', focus: 'devops' },
  'QA Engineer': { category: 'Technical', layout: 'qa', focus: 'qa' },
  'System Administrator': { category: 'Technical', layout: 'system', focus: 'system' },
  'Tech Professional': { category: 'Technical', layout: 'tech', focus: 'tech' },
  'Developer Portfolio': { category: 'Technical', layout: 'developer', focus: 'developer' },
  'Engineer Resume': { category: 'Technical', layout: 'engineer', focus: 'engineer' },

  // Academic Roles
  'Associate Professor': { category: 'Academic', layout: 'professor', focus: 'teaching' },
  'Professor': { category: 'Academic', layout: 'professor', focus: 'research' },
  'Department Chair': { category: 'Academic', layout: 'chair', focus: 'administration' },
  'Dean': { category: 'Academic', layout: 'dean', focus: 'leadership' },
  'Provost': { category: 'Academic', layout: 'provost', focus: 'administration' },
  'Research Director': { category: 'Academic', layout: 'research', focus: 'research' },
  'Grant Manager': { category: 'Academic', layout: 'grant', focus: 'grants' },
  'Academic Advisor': { category: 'Academic', layout: 'advisor', focus: 'advising' },
  'Curriculum Developer': { category: 'Academic', layout: 'curriculum', focus: 'curriculum' },
  'Assessment Specialist': { category: 'Academic', layout: 'assessment', focus: 'assessment' },
  'Librarian': { category: 'Academic', layout: 'library', focus: 'library' },
  'Archivist': { category: 'Academic', layout: 'archive', focus: 'archive' },
  'Museum Curator': { category: 'Academic', layout: 'museum', focus: 'museum' },
  'Policy Analyst': { category: 'Academic', layout: 'policy', focus: 'policy' },
  'Research Coordinator': { category: 'Academic', layout: 'coordination', focus: 'coordination' },
  'Academic Administrator': { category: 'Academic', layout: 'administration', focus: 'administration' },
  'PhD Candidate': { category: 'Academic', layout: 'phd', focus: 'research' },
  'Postdoctoral Researcher': { category: 'Academic', layout: 'postdoc', focus: 'research' },
  'Assistant Professor': { category: 'Academic', layout: 'assistant', focus: 'teaching' },
  'Research Associate': { category: 'Academic', layout: 'research', focus: 'research' },
  'Lab Manager': { category: 'Academic', layout: 'lab', focus: 'laboratory' },
  'Academic CV': { category: 'Academic', layout: 'cv', focus: 'academic' },
  'Research CV': { category: 'Academic', layout: 'research', focus: 'research' },
  'Graduate Student': { category: 'Academic', layout: 'graduate', focus: 'graduate' }
};

// Template HTML generators for different layouts
const layoutGenerators = {
  executive: (role, colors) => `
    <div class="template-executive" style="--accent: ${colors.accent}; --secondary: ${colors.secondary}; --tertiary: ${colors.tertiary};">
      <header class="executive-header">
        <div class="name-section">
          <h1 class="name">{{firstName}} {{lastName}}</h1>
          <p class="title">${role}</p>
          <div class="contact-bar">
            <span>{{email}}</span> • <span>{{phone}}</span> • <span>{{location}}</span>
          </div>
        </div>
      </header>
      <main class="executive-content">
        <section class="executive-summary">
          <h2>Executive Summary</h2>
          <p>{{summary}}</p>
        </section>
        <section class="executive-experience">
          <h2>Leadership Experience</h2>
          {{#each experience}}
          <div class="executive-position">
            <div class="position-header">
              <h3>{{title}}</h3>
              <span class="company">{{company}}</span>
              <span class="duration">{{startDate}} - {{endDate}}</span>
            </div>
            <ul class="achievements">
              {{#each achievements}}<li>{{this}}</li>{{/each}}
            </ul>
          </div>
          {{/each}}
        </section>
        <section class="executive-education">
          <h2>Education</h2>
          {{#each education}}
          <div class="degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} • {{year}}</p>
          </div>
          {{/each}}
        </section>
        <section class="executive-skills">
          <h2>Core Competencies</h2>
          <div class="skills-grid">{{skills}}</div>
        </section>
      </main>
    </div>`,

  creative: (role, colors) => `
    <div class="template-creative" style="--accent: ${colors.accent}; --secondary: ${colors.secondary}; --tertiary: ${colors.tertiary};">
      <div class="creative-layout">
        <aside class="creative-sidebar">
          <div class="creative-avatar"></div>
          <h1 class="creative-name">{{firstName}}<br/>{{lastName}}</h1>
          <p class="creative-role">${role}</p>
          <div class="creative-contact">
            <p>{{email}}</p>
            <p>{{phone}}</p>
            <p>{{location}}</p>
          </div>
          <section class="creative-skills">
            <h3>Skills & Tools</h3>
            <div class="skill-tags">{{skills}}</div>
          </section>
        </aside>
        <main class="creative-main">
          <section class="creative-about">
            <h2>About</h2>
            <p>{{summary}}</p>
          </section>
          <section class="creative-experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="creative-job">
              <h3>{{title}}</h3>
              <p class="creative-company">{{company}}</p>
              <p class="creative-date">{{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="creative-education">
            <h2>Education</h2>
            {{#each education}}
            <div class="creative-degree">
              <h3>{{degree}}</h3>
              <p>{{institution}} • {{year}}</p>
            </div>
            {{/each}}
          </section>
        </main>
      </div>
    </div>`,

  technical: (role, colors) => `
    <div class="template-technical" style="--accent: ${colors.accent}; --secondary: ${colors.secondary}; --tertiary: ${colors.tertiary};">
      <header class="tech-header">
        <h1 class="tech-name">{{firstName}} {{lastName}}</h1>
        <p class="tech-title">${role}</p>
        <div class="tech-contact">
          <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
        </div>
      </header>
      <main class="tech-content">
        <section class="tech-summary">
          <h2>Technical Profile</h2>
          <p>{{summary}}</p>
        </section>
        <section class="tech-skills">
          <h2>Technical Skills</h2>
          <div class="tech-skills-grid">{{skills}}</div>
        </section>
        <section class="tech-projects">
          <h2>Key Projects</h2>
          {{#each projects}}
          <div class="tech-project">
            <h3>{{name}}</h3>
            <p class="tech-stack"><em>{{technologies}}</em></p>
            <p>{{description}}</p>
          </div>
          {{/each}}
        </section>
        <section class="tech-experience">
          <h2>Professional Experience</h2>
          {{#each experience}}
          <div class="tech-job">
            <h3>{{title}} - {{company}}</h3>
            <p class="tech-duration">{{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="tech-education">
          <h2>Education</h2>
          {{#each education}}
          <div class="tech-degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} • {{year}}</p>
          </div>
          {{/each}}
        </section>
      </main>
    </div>`,

  academic: (role, colors) => `
    <div class="template-academic" style="--accent: ${colors.accent}; --secondary: ${colors.secondary}; --tertiary: ${colors.tertiary};">
      <header class="academic-header">
        <h1 class="academic-name">{{firstName}} {{lastName}}</h1>
        <p class="academic-title">${role}</p>
        <div class="academic-contact">
          <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
        </div>
      </header>
      <main class="academic-content">
        <section class="academic-summary">
          <h2>Research Summary</h2>
          <p>{{summary}}</p>
        </section>
        <section class="academic-experience">
          <h2>Academic Experience</h2>
          {{#each experience}}
          <div class="academic-position">
            <h3>{{title}}</h3>
            <p class="academic-institution">{{company}} • {{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="academic-education">
          <h2>Education</h2>
          {{#each education}}
          <div class="academic-degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} • {{year}}</p>
          </div>
          {{/each}}
        </section>
        <section class="academic-certifications">
          <h2>Awards & Certifications</h2>
          {{#each certifications}}
          <div class="academic-cert">
            <strong>{{name}}</strong> — {{issuer}} ({{date}})
          </div>
          {{/each}}
        </section>
      </main>
    </div>`,

  // Additional specialized layouts
  financial: (role, colors) => `
    <div class="template-financial" style="--accent: ${colors.accent}; --secondary: ${colors.secondary}; --tertiary: ${colors.tertiary};">
      <header class="financial-header">
        <h1 class="financial-name">{{firstName}} {{lastName}}</h1>
        <p class="financial-title">${role}</p>
        <div class="financial-contact">
          <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
        </div>
      </header>
      <main class="financial-content">
        <section class="financial-summary">
          <h2>Financial Expertise</h2>
          <p>{{summary}}</p>
        </section>
        <section class="financial-experience">
          <h2>Financial Experience</h2>
          {{#each experience}}
          <div class="financial-position">
            <h3>{{title}}</h3>
            <p class="financial-company">{{company}} | {{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="financial-education">
          <h2>Education & Certifications</h2>
          {{#each education}}
          <div class="financial-degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} • {{year}}</p>
          </div>
          {{/each}}
        </section>
      </main>
    </div>`,

  marketing: (role, colors) => `
    <div class="template-marketing" style="--accent: ${colors.accent}; --secondary: ${colors.secondary}; --tertiary: ${colors.tertiary};">
      <header class="marketing-header">
        <h1 class="marketing-name">{{firstName}} {{lastName}}</h1>
        <p class="marketing-title">${role}</p>
        <div class="marketing-contact">
          <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
        </div>
      </header>
      <main class="marketing-content">
        <section class="marketing-summary">
          <h2>Marketing Expertise</h2>
          <p>{{summary}}</p>
        </section>
        <section class="marketing-experience">
          <h2>Marketing Experience</h2>
          {{#each experience}}
          <div class="marketing-position">
            <h3>{{title}}</h3>
            <p class="marketing-company">{{company}} | {{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="marketing-education">
          <h2>Education</h2>
          {{#each education}}
          <div class="marketing-degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} • {{year}}</p>
          </div>
          {{/each}}
        </section>
      </main>
    </div>`
};

// Generate unique template for each role
function generateTemplate(role, index) {
  const config = roleConfigurations[role] || { category: 'Professional', layout: 'executive', focus: 'general' };
  const colors = colorPalettes[index % colorPalettes.length];
  const layout = config.layout;
  const generator = layoutGenerators[layout] || layoutGenerators.executive;
  
  const slug = role.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return {
    name: role,
    category: config.category,
    description: `${config.category} template specifically designed for ${role.toLowerCase()} positions with ${colors.name.toLowerCase()} color scheme`,
    preview: `/templates/${slug}.png`,
    html: generator(role, colors),
    accentColor: colors.accent,
    secondaryColor: colors.secondary,
    tertiaryColor: colors.tertiary,
    layout: layout,
    focus: config.focus,
    isActive: true
  };
}

// Main generation function
async function generateAllTemplates() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/collegeinfo');
    console.log('Connected to MongoDB');

    // Clear existing templates
    await Template.deleteMany({});
    console.log('Cleared existing templates');

    // Get all roles
    const allRoles = Object.keys(roleConfigurations);
    
    // Generate 220 templates by cycling through roles and adding variations
    const templates = [];
    let templateIndex = 0;
    
    // Generate base templates for each role
    for (const role of allRoles) {
      templates.push(generateTemplate(role, templateIndex));
      templateIndex++;
    }
    
    // Add variations to reach 220 templates
    const variations = ['Senior', 'Lead', 'Principal', 'Staff', 'Junior', 'Associate'];
    const domains = ['Enterprise', 'Startup', 'Corporate', 'Consulting', 'Government', 'Non-profit'];
    
    while (templates.length < 220) {
      const baseRole = allRoles[templateIndex % allRoles.length];
      const variation = variations[Math.floor(templateIndex / allRoles.length) % variations.length];
      const domain = domains[Math.floor(templateIndex / (allRoles.length * variations.length)) % domains.length];
      
      let variedRole;
      if (templateIndex < 150) {
        variedRole = `${variation} ${baseRole}`;
      } else {
        variedRole = `${domain} ${baseRole}`;
      }
      
      templates.push(generateTemplate(variedRole, templateIndex));
      templateIndex++;
    }
    
    // Insert all templates
    await Template.insertMany(templates);
    console.log(`Successfully generated ${templates.length} unique templates`);
    
    // Print summary
    const categoryCounts = templates.reduce((acc, template) => {
      acc[template.category] = (acc[template.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('Template distribution by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} templates`);
    });
    
  } catch (error) {
    console.error('Error generating templates:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the generation
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllTemplates();
}

export { generateAllTemplates, generateTemplate, colorPalettes, roleConfigurations };
