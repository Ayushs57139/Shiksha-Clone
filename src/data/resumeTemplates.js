export const resumeTemplates = [
  // Professional Templates (1-50)
  {
    id: 1,
    name: "Classic Professional",
    category: "Professional",
    description: "Clean and traditional design for corporate roles",
    preview: "/templates/classic-professional.png",
    html: `
      <div class="template-classic">
        <header class="header">
          <h1 class="name">{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
          </div>
        </header>
        <section class="summary">
          <h2>Professional Summary</h2>
          <p>{{summary}}</p>
        </section>
        <section class="experience">
          <h2>Work Experience</h2>
          {{#each experience}}
          <div class="job">
            <h3>{{title}} - {{company}}</h3>
            <p class="date">{{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="education">
          <h2>Education</h2>
          {{#each education}}
          <div class="degree">
            <h3>{{degree}} - {{institution}}</h3>
            <p class="date">{{year}}</p>
          </div>
          {{/each}}
        </section>
        <section class="skills">
          <h2>Skills</h2>
          <p>{{skills}}</p>
        </section>
      </div>
    `
  },
  {
    id: 2,
    name: "Modern Executive",
    category: "Professional",
    description: "Contemporary design for senior positions",
    preview: "/templates/modern-executive.png",
    html: `
      <div class="template-modern">
        <div class="sidebar">
          <h1 class="name">{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p><i class="icon-email"></i>{{email}}</p>
            <p><i class="icon-phone"></i>{{phone}}</p>
            <p><i class="icon-location"></i>{{location}}</p>
          </div>
          <section class="skills">
            <h3>Core Skills</h3>
            <div class="skill-tags">{{skills}}</div>
          </section>
        </div>
        <div class="main-content">
          <section class="summary">
            <h2>Executive Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Professional Experience</h2>
            {{#each experience}}
            <div class="job">
              <div class="job-header">
                <h3>{{title}}</h3>
                <span class="company">{{company}}</span>
                <span class="date">{{startDate}} - {{endDate}}</span>
              </div>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}} - {{year}}</p>
            </div>
            {{/each}}
          </section>
        </div>
      </div>
    `
  },
  {
    id: 3,
    name: "Corporate Clean",
    category: "Professional",
    description: "Minimalist design for corporate environments",
    preview: "/templates/corporate-clean.png",
    html: `
      <div class="template-corporate">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact-info">
            <span>{{email}}</span> • <span>{{phone}}</span> • <span>{{location}}</span>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 4,
    name: "Business Professional",
    category: "Professional",
    description: "Traditional business format",
    preview: "/templates/business-professional.png",
    html: `
      <div class="template-business">
        <div class="header">
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </div>
        <div class="content">
          <section class="summary">
            <h2>Professional Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Work Experience</h2>
            {{#each experience}}
            <div class="job">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}} | {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </div>
      </div>
    `
  },
  {
    id: 5,
    name: "Executive Summary",
    category: "Professional",
    description: "High-level executive format",
    preview: "/templates/executive-summary.png",
    html: `
      <div class="template-executive">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <section class="summary">
          <h2>Executive Summary</h2>
          <p>{{summary}}</p>
        </section>
        <section class="experience">
          <h2>Professional Experience</h2>
          {{#each experience}}
          <div class="position">
            <h3>{{title}}</h3>
            <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="education">
          <h2>Education</h2>
          {{#each education}}
          <div class="degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} | {{year}}</p>
          </div>
          {{/each}}
        </section>
        <section class="skills">
          <h2>Core Competencies</h2>
          <p>{{skills}}</p>
        </section>
      </div>
    `
  },

  // Creative Templates (51-100)
  {
    id: 51,
    name: "Creative Portfolio",
    category: "Creative",
    description: "Bold design for creative professionals",
    preview: "/templates/creative-portfolio.png",
    html: `
      <div class="template-creative">
        <header class="creative-header">
          <h1 class="creative-name">{{firstName}} {{lastName}}</h1>
          <p class="creative-title">{{title}}</p>
          <div class="creative-contact">
            <span>{{email}}</span> • <span>{{phone}}</span> • <span>{{location}}</span>
          </div>
        </header>
        <section class="creative-summary">
          <h2>About Me</h2>
          <p>{{summary}}</p>
        </section>
        <section class="creative-experience">
          <h2>Experience</h2>
          {{#each experience}}
          <div class="creative-job">
            <h3>{{title}} @ {{company}}</h3>
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
        <section class="creative-skills">
          <h2>Skills & Tools</h2>
          <p>{{skills}}</p>
        </section>
      </div>
    `
  },
  {
    id: 52,
    name: "Design Portfolio",
    category: "Creative",
    description: "Modern design for designers and artists",
    preview: "/templates/design-portfolio.png",
    html: `
      <div class="template-design">
        <div class="design-sidebar">
          <h1 class="design-name">{{firstName}} {{lastName}}</h1>
          <p class="design-title">{{title}}</p>
          <div class="design-contact">
            <p>{{email}}</p>
            <p>{{phone}}</p>
            <p>{{location}}</p>
          </div>
          <section class="design-skills">
            <h3>Skills</h3>
            <div class="skill-grid">{{skills}}</div>
          </section>
        </div>
        <div class="design-main">
          <section class="design-summary">
            <h2>About</h2>
            <p>{{summary}}</p>
          </section>
          <section class="design-experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="design-job">
              <h3>{{title}}</h3>
              <p class="design-company">{{company}}</p>
              <p class="design-date">{{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="design-education">
            <h2>Education</h2>
            {{#each education}}
            <div class="design-degree">
              <h3>{{degree}}</h3>
              <p>{{institution}} • {{year}}</p>
            </div>
            {{/each}}
          </section>
        </div>
      </div>
    `
  },
  {
    id: 53,
    name: "Artistic Resume",
    category: "Creative",
    description: "Unique design for creative fields",
    preview: "/templates/artistic-resume.png",
    html: `
      <div class="template-artistic">
        <header class="artistic-header">
          <h1 class="artistic-name">{{firstName}} {{lastName}}</h1>
          <p class="artistic-title">{{title}}</p>
          <div class="artistic-contact">
            <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
          </div>
        </header>
        <section class="artistic-summary">
          <h2>Artist Statement</h2>
          <p>{{summary}}</p>
        </section>
        <section class="artistic-experience">
          <h2>Experience</h2>
          {{#each experience}}
          <div class="artistic-job">
            <h3>{{title}}</h3>
            <p class="artistic-company">{{company}} | {{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="artistic-education">
          <h2>Education</h2>
          {{#each education}}
          <div class="artistic-degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} • {{year}}</p>
          </div>
          {{/each}}
        </section>
        <section class="artistic-skills">
          <h2>Skills & Techniques</h2>
          <p>{{skills}}</p>
        </section>
      </div>
    `
  },

  // Technical Templates (101-150)
  {
    id: 101,
    name: "Tech Professional",
    category: "Technical",
    description: "Clean design for tech professionals",
    preview: "/templates/tech-professional.png",
    html: `
      <div class="template-tech">
        <header class="tech-header">
          <h1 class="tech-name">{{firstName}} {{lastName}}</h1>
          <p class="tech-title">{{title}}</p>
          <div class="tech-contact">
            <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
          </div>
        </header>
        <section class="tech-summary">
          <h2>Summary</h2>
          <p>{{summary}}</p>
        </section>
        <section class="tech-experience">
          <h2>Experience</h2>
          {{#each experience}}
          <div class="tech-job">
            <h3>{{title}} - {{company}}</h3>
            <p class="tech-date">{{startDate}} - {{endDate}}</p>
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
        <section class="tech-skills">
          <h2>Technical Skills</h2>
          <p>{{skills}}</p>
        </section>
      </div>
    `
  },
  {
    id: 102,
    name: "Developer Portfolio",
    category: "Technical",
    description: "Modern design for software developers",
    preview: "/templates/developer-portfolio.png",
    html: `
      <div class="template-developer">
        <div class="dev-sidebar">
          <h1 class="dev-name">{{firstName}} {{lastName}}</h1>
          <p class="dev-title">{{title}}</p>
          <div class="dev-contact">
            <p>{{email}}</p>
            <p>{{phone}}</p>
            <p>{{location}}</p>
          </div>
          <section class="dev-skills">
            <h3>Technologies</h3>
            <div class="tech-tags">{{skills}}</div>
          </section>
        </div>
        <div class="dev-main">
          <section class="dev-summary">
            <h2>About</h2>
            <p>{{summary}}</p>
          </section>
          <section class="dev-experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="dev-job">
              <h3>{{title}}</h3>
              <p class="dev-company">{{company}}</p>
              <p class="dev-date">{{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="dev-education">
            <h2>Education</h2>
            {{#each education}}
            <div class="dev-degree">
              <h3>{{degree}}</h3>
              <p>{{institution}} • {{year}}</p>
            </div>
            {{/each}}
          </section>
        </div>
      </div>
    `
  },
  {
    id: 103,
    name: "Engineer Resume",
    category: "Technical",
    description: "Professional format for engineers",
    preview: "/templates/engineer-resume.png",
    html: `
      <div class="template-engineer">
        <header class="engineer-header">
          <h1 class="engineer-name">{{firstName}} {{lastName}}</h1>
          <p class="engineer-title">{{title}}</p>
          <div class="engineer-contact">
            <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
          </div>
        </header>
        <section class="engineer-summary">
          <h2>Professional Summary</h2>
          <p>{{summary}}</p>
        </section>
        <section class="engineer-experience">
          <h2>Work Experience</h2>
          {{#each experience}}
          <div class="engineer-job">
            <h3>{{title}}</h3>
            <p class="engineer-company">{{company}} | {{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="engineer-education">
          <h2>Education</h2>
          {{#each education}}
          <div class="engineer-degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} • {{year}}</p>
          </div>
          {{/each}}
        </section>
        <section class="engineer-skills">
          <h2>Technical Skills</h2>
          <p>{{skills}}</p>
        </section>
      </div>
    `
  },

  // Academic Templates (151-200)
  {
    id: 151,
    name: "Academic CV",
    category: "Academic",
    description: "Traditional academic format",
    preview: "/templates/academic-cv.png",
    html: `
      <div class="template-academic">
        <header class="academic-header">
          <h1 class="academic-name">{{firstName}} {{lastName}}</h1>
          <p class="academic-title">{{title}}</p>
          <div class="academic-contact">
            <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
          </div>
        </header>
        <section class="academic-summary">
          <h2>Research Summary</h2>
          <p>{{summary}}</p>
        </section>
        <section class="academic-experience">
          <h2>Academic Experience</h2>
          {{#each experience}}
          <div class="academic-job">
            <h3>{{title}}</h3>
            <p class="academic-company">{{company}} | {{startDate}} - {{endDate}}</p>
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
        <section class="academic-skills">
          <h2>Research Skills</h2>
          <p>{{skills}}</p>
        </section>
      </div>
    `
  },
  {
    id: 152,
    name: "Research CV",
    category: "Academic",
    description: "Comprehensive research format",
    preview: "/templates/research-cv.png",
    html: `
      <div class="template-research">
        <header class="research-header">
          <h1 class="research-name">{{firstName}} {{lastName}}</h1>
          <p class="research-title">{{title}}</p>
          <div class="research-contact">
            <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
          </div>
        </header>
        <section class="research-summary">
          <h2>Research Interests</h2>
          <p>{{summary}}</p>
        </section>
        <section class="research-experience">
          <h2>Research Experience</h2>
          {{#each experience}}
          <div class="research-job">
            <h3>{{title}}</h3>
            <p class="research-company">{{company}} | {{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="research-education">
          <h2>Education</h2>
          {{#each education}}
          <div class="research-degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} • {{year}}</p>
          </div>
          {{/each}}
        </section>
        <section class="research-skills">
          <h2>Research Skills</h2>
          <p>{{skills}}</p>
        </section>
      </div>
    `
  },
  {
    id: 153,
    name: "Graduate Student",
    category: "Academic",
    description: "Format for graduate students",
    preview: "/templates/graduate-student.png",
    html: `
      <div class="template-graduate">
        <header class="graduate-header">
          <h1 class="graduate-name">{{firstName}} {{lastName}}</h1>
          <p class="graduate-title">{{title}}</p>
          <div class="graduate-contact">
            <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
          </div>
        </header>
        <section class="graduate-summary">
          <h2>Academic Summary</h2>
          <p>{{summary}}</p>
        </section>
        <section class="graduate-experience">
          <h2>Academic Experience</h2>
          {{#each experience}}
          <div class="graduate-job">
            <h3>{{title}}</h3>
            <p class="graduate-company">{{company}} | {{startDate}} - {{endDate}}</p>
            <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
          </div>
          {{/each}}
        </section>
        <section class="graduate-education">
          <h2>Education</h2>
          {{#each education}}
          <div class="graduate-degree">
            <h3>{{degree}}</h3>
            <p>{{institution}} • {{year}}</p>
          </div>
          {{/each}}
        </section>
        <section class="graduate-skills">
          <h2>Academic Skills</h2>
          <p>{{skills}}</p>
        </section>
      </div>
    `
  },

  // Add more templates to reach 200
  // Professional Templates (6-50)
  {
    id: 6,
    name: "Corporate Executive",
    category: "Professional",
    description: "Executive-level format for senior management",
    preview: "/templates/corporate-executive.png",
    html: `
      <div class="template-corporate">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact-info">
            <span>{{email}}</span> • <span>{{phone}}</span> • <span>{{location}}</span>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Executive Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Professional Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}} - {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Core Competencies</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 7,
    name: "Business Analyst",
    category: "Professional",
    description: "Specialized format for business analysts",
    preview: "/templates/business-analyst.png",
    html: `
      <div class="template-business">
        <div class="header">
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </div>
        <div class="content">
          <section class="summary">
            <h2>Business Analyst Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Work Experience</h2>
            {{#each experience}}
            <div class="job">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}} | {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </div>
      </div>
    `
  },
  {
    id: 8,
    name: "Project Manager",
    category: "Professional",
    description: "Project management focused template",
    preview: "/templates/project-manager.png",
    html: `
      <div class="template-project">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Project Manager Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 9,
    name: "Sales Professional",
    category: "Professional",
    description: "Sales and business development format",
    preview: "/templates/sales-professional.png",
    html: `
      <div class="template-sales">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Sales Professional Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 10,
    name: "Marketing Manager",
    category: "Professional",
    description: "Marketing and communications template",
    preview: "/templates/marketing-manager.png",
    html: `
      <div class="template-marketing">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Marketing Manager Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },

  // Creative Templates (54-100)
  {
    id: 54,
    name: "Graphic Designer",
    category: "Creative",
    description: "Portfolio-style for graphic designers",
    preview: "/templates/graphic-designer.png",
    html: `
      <div class="template-graphic">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Graphic Designer Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 55,
    name: "UI/UX Designer",
    category: "Creative",
    description: "Modern design for UX professionals",
    preview: "/templates/uiux-designer.png",
    html: `
      <div class="template-uiux">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>UI/UX Designer Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 56,
    name: "Photographer",
    category: "Creative",
    description: "Visual portfolio for photographers",
    preview: "/templates/photographer.png",
    html: `
      <div class="template-photographer">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Photographer Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 57,
    name: "Video Editor",
    category: "Creative",
    description: "Creative format for video professionals",
    preview: "/templates/video-editor.png",
    html: `
      <div class="template-video">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Video Editor Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 58,
    name: "Content Creator",
    category: "Creative",
    description: "Content and media creation template",
    preview: "/templates/content-creator.png",
    html: `
      <div class="template-content">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Content Creator Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },

  // Technical Templates (104-150)
  {
    id: 104,
    name: "Software Engineer",
    category: "Technical",
    description: "Development-focused technical template",
    preview: "/templates/software-engineer.png",
    html: `
      <div class="template-software">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Software Engineer Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 105,
    name: "Data Scientist",
    category: "Technical",
    description: "Data science and analytics format",
    preview: "/templates/data-scientist.png",
    html: `
      <div class="template-data">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Data Scientist Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 106,
    name: "DevOps Engineer",
    category: "Technical",
    description: "DevOps and infrastructure template",
    preview: "/templates/devops-engineer.png",
    html: `
      <div class="template-devops">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>DevOps Engineer Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 107,
    name: "QA Engineer",
    category: "Technical",
    description: "Quality assurance specialist format",
    preview: "/templates/qa-engineer.png",
    html: `
      <div class="template-qa">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>QA Engineer Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 108,
    name: "System Administrator",
    category: "Technical",
    description: "IT infrastructure management template",
    preview: "/templates/system-admin.png",
    html: `
      <div class="template-system">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>System Administrator Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },

  // Academic Templates (154-200)
  {
    id: 154,
    name: "PhD Candidate",
    category: "Academic",
    description: "Graduate research format",
    preview: "/templates/phd-candidate.png",
    html: `
      <div class="template-phd">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>PhD Candidate Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 155,
    name: "Postdoctoral Researcher",
    category: "Academic",
    description: "Postdoc research template",
    preview: "/templates/postdoc-researcher.png",
    html: `
      <div class="template-postdoc">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Postdoctoral Researcher Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 156,
    name: "Assistant Professor",
    category: "Academic",
    description: "Academic teaching and research format",
    preview: "/templates/assistant-professor.png",
    html: `
      <div class="template-assistant">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Assistant Professor Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 157,
    name: "Research Associate",
    category: "Academic",
    description: "Research position template",
    preview: "/templates/research-associate.png",
    html: `
      <div class="template-research-associate">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Research Associate Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  },
  {
    id: 158,
    name: "Lab Manager",
    category: "Academic",
    description: "Laboratory management format",
    preview: "/templates/lab-manager.png",
    html: `
      <div class="template-lab">
        <header>
          <h1>{{firstName}} {{lastName}}</h1>
          <p class="title">{{title}}</p>
          <div class="contact">
            <p>{{email}} | {{phone}} | {{location}}</p>
          </div>
        </header>
        <main>
          <section class="summary">
            <h2>Lab Manager Summary</h2>
            <p>{{summary}}</p>
          </section>
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="position">
              <h3>{{title}}</h3>
              <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
              <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
            </div>
            {{/each}}
          </section>
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="degree">
              <h3>{{degree}}</h3>
              <p>{{institution}}, {{year}}</p>
            </div>
            {{/each}}
          </section>
          <section class="skills">
            <h2>Skills</h2>
            <p>{{skills}}</p>
          </section>
        </main>
      </div>
    `
  }
];

// Template categories for filtering
export const templateCategories = [
  { id: 'all', name: 'All Templates', count: resumeTemplates.length },
  { id: 'professional', name: 'Professional', count: resumeTemplates.filter(t => t.category === 'Professional').length },
  { id: 'creative', name: 'Creative', count: resumeTemplates.filter(t => t.category === 'Creative').length },
  { id: 'technical', name: 'Technical', count: resumeTemplates.filter(t => t.category === 'Technical').length },
  { id: 'academic', name: 'Academic', count: resumeTemplates.filter(t => t.category === 'Academic').length }
];

// Get templates by category
export const getTemplatesByCategory = (category) => {
  if (category === 'all') return resumeTemplates;
  return resumeTemplates.filter(template => template.category.toLowerCase() === category.toLowerCase());
};

// Get template by ID
export const getTemplateById = (id) => {
  return resumeTemplates.find(template => template.id === parseInt(id));
};

// Ensure we have at least 220 templates with unique IDs
const ensureTemplateCount = (targetCount = 220) => {
  if (resumeTemplates.length >= targetCount) return;

  const categories = ['Professional', 'Creative', 'Technical', 'Academic'];
  const roleSeeds = {
    Professional: [
      'Senior Manager','Director','VP','CEO','CFO','CTO','COO','Business Development',
      'Product Manager','Operations Manager','Human Resources','Finance Manager','Legal Counsel',
      'Consultant','Strategy Manager','Process Manager','Sales Lead','Account Manager','Program Manager'
    ],
    Creative: [
      'Art Director','Creative Director','Brand Manager','Visual Designer','Web Designer','Illustrator',
      'Animator','Motion Designer','3D Artist','Game Designer','Sound Designer','Fashion Designer',
      'Interior Designer','Architect','Landscape Designer','Photographer','Content Creator','Video Producer'
    ],
    Technical: [
      'Full Stack Developer','Frontend Developer','Backend Developer','Mobile Developer','Game Developer',
      'Machine Learning Engineer','AI Engineer','Cloud Engineer','Network Engineer','Security Engineer',
      'Database Administrator','Site Reliability Engineer','Technical Lead','Software Architect',
      'Product Owner','Scrum Master','Data Engineer','Platform Engineer'
    ],
    Academic: [
      'Associate Professor','Full Professor','Department Chair','Dean','Provost','Research Director',
      'Grant Manager','Academic Advisor','Curriculum Developer','Assessment Specialist','Librarian',
      'Archivist','Museum Curator','Policy Analyst','Research Coordinator','Academic Administrator',
      'PhD Candidate','Postdoctoral Researcher'
    ]
  };

  // Compute next unique ID
  const existingMaxId = resumeTemplates.reduce((max, t) => Math.max(max, t.id || 0), 0);
  let nextId = existingMaxId + 1;

  // Round-robin through categories and roles until targetCount reached
  let added = 0;
  let catIndex = 0;
  const roleIndices = { Professional: 0, Creative: 0, Technical: 0, Academic: 0 };

  while (resumeTemplates.length + added < targetCount) {
    const category = categories[catIndex % categories.length];
    const roles = roleSeeds[category];
    const role = roles[roleIndices[category] % roles.length];

    const slug = role.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const name = role;

    resumeTemplates.push({
      id: nextId,
      name,
      category,
      description: `${category} template for ${role.toLowerCase()}`,
      preview: `/templates/${slug}.png`,
      html: `
        <div class="template-${slug}">
          <header>
            <h1>{{firstName}} {{lastName}}</h1>
            <p class="title">{{title}}</p>
            <div class="contact">
              <p>{{email}} | {{phone}} | {{location}}</p>
            </div>
          </header>
          <main>
            <section class="summary">
              <h2>${name} Summary</h2>
              <p>{{summary}}</p>
            </section>
            <section class="experience">
              <h2>Experience</h2>
              {{#each experience}}
              <div class="position">
                <h3>{{title}}</h3>
                <p class="company">{{company}} | {{startDate}} - {{endDate}}</p>
                <ul>{{#each achievements}}<li>{{this}}</li>{{/each}}</ul>
              </div>
              {{/each}}
            </section>
            <section class="education">
              <h2>Education</h2>
              {{#each education}}
              <div class="degree">
                <h3>{{degree}}</h3>
                <p>{{institution}}, {{year}}</p>
              </div>
              {{/each}}
            </section>
            <section class="skills">
              <h2>Skills</h2>
              <p>{{skills}}</p>
            </section>
          </main>
        </div>
      `
    });

    added += 1;
    nextId += 1;
    roleIndices[category] += 1;
    catIndex += 1;
  }
};

ensureTemplateCount(220);