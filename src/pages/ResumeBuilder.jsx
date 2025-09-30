import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaStar, FaDownload, FaEye, FaEdit, FaTrash, FaSave, FaPalette, FaSync } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const ResumeBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    selectedTemplateId: null
  });

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  // Load existing resume data when component mounts
  useEffect(() => {
    if (user) {
      loadResumeData();
    }
    const tpl = searchParams.get('template');
    if (tpl) {
      setResumeData(prev => ({ ...prev, selectedTemplateId: tpl }));
      loadTemplate(tpl);
    }
  }, [user]);

  // Force preview update when resumeData changes
  useEffect(() => {
    setPreviewKey(prev => prev + 1);
  }, [resumeData]);

  const loadTemplate = async (templateId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/templates/${templateId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSelectedTemplate(data.data);
        }
      }
    } catch (error) {
      console.error('Error loading template:', error);
    }
  };

  const loadResumeData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/resumes/user/${user._id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setResumeData(data.data);
          // Load template if one is selected
          if (data.data.selectedTemplateId) {
            loadTemplate(data.data.selectedTemplateId);
          }
        }
      }
    } catch (error) {
      console.error('Error loading resume data:', error);
    }
  };

  const saveResume = async () => {
    if (!user) {
      setMessage('Please login to save your resume');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/resumes/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          resumeData
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Resume saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving resume');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      setMessage('Error saving resume');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!user) {
      setMessage('Please login to download your resume');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/resumes/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        
        // Check if the blob is actually a PDF
        if (blob.type !== 'application/pdf') {
          console.error('Response is not a PDF:', blob.type);
          setMessage('Error: Generated file is not a valid PDF');
          return;
        }
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume_${user.firstName}_${user.lastName}.pdf`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setMessage('PDF downloaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('PDF generation failed:', errorData);
        setMessage(`Error generating PDF: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      setMessage('Error generating PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const previewResume = () => {
    setShowPreview(!showPreview);
  };

  const handleTemplateSelection = () => {
    navigate('/templates');
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        institution: '',
        year: '',
        gpa: '',
        description: ''
      }]
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: '',
        company: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        name: '',
        description: '',
        technologies: '',
        link: ''
      }]
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        issuer: '',
        date: '',
        link: ''
      }]
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateEducation = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const updateExperience = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const updateSkill = (index, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const updateProject = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const updateCertification = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const renderTemplatePreview = () => {
    if (!selectedTemplate) {
      // Default preview when no template is selected - show basic resume structure
      return (
        <div className="prose max-w-none">
          <div className="text-center border-b-2 border-teal-500 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-teal-600 mb-2">
              {resumeData.personalInfo.name || 'Your Name'}
            </h1>
            <p className="text-gray-600">
              {resumeData.personalInfo.email && resumeData.personalInfo.phone 
                ? `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}`
                : resumeData.personalInfo.email || resumeData.personalInfo.phone || 'Enter your contact information'
              }
              {resumeData.personalInfo.address && ` | ${resumeData.personalInfo.address}`}
            </p>
            {resumeData.personalInfo.linkedin && (
              <p className="text-gray-600">LinkedIn: {resumeData.personalInfo.linkedin}</p>
            )}
            {resumeData.personalInfo.website && (
              <p className="text-gray-600">Website: {resumeData.personalInfo.website}</p>
            )}
          </div>
          
          {resumeData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-teal-600 mb-2">Professional Summary</h2>
              <p className="text-gray-700">{resumeData.summary}</p>
            </div>
          )}

          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-teal-600 mb-2">Work Experience</h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company} | {exp.duration}</p>
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-teal-600 mb-2">Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution} | {edu.year} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                  {edu.description && <p className="text-gray-700 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-teal-600 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-teal-600 mb-2">Projects</h2>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-gray-600">{project.technologies}</p>
                  <p className="text-gray-700 mt-1">{project.description}</p>
                  {project.link && <p className="text-blue-600 mt-1">Link: {project.link}</p>}
                </div>
              ))}
            </div>
          )}

          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-teal-600 mb-2">Certifications</h2>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer} | {cert.date}</p>
                  {cert.link && <p className="text-blue-600 mt-1">Link: {cert.link}</p>}
                </div>
              ))}
            </div>
          )}

          {!resumeData.personalInfo.name && !resumeData.summary && !resumeData.experience?.length && !resumeData.education?.length && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Start filling out your information to see the preview</p>
              <p className="text-sm text-gray-400">Select a template for a more professional look</p>
            </div>
          )}
        </div>
      );
    }

    const layout = selectedTemplate.layout || 'executive';
    
    switch (layout) {
      case 'executive':
        return renderExecutiveLayout();
      case 'creative':
        return renderCreativeLayout();
      case 'technical':
        return renderTechnicalLayout();
      case 'academic':
        return renderAcademicLayout();
      case 'financial':
        return renderFinancialLayout();
      case 'marketing':
        return renderMarketingLayout();
      default:
        return renderExecutiveLayout();
    }
  };

  const renderExecutiveLayout = () => (
    <div 
      className="template-executive"
      style={{
        '--accent': selectedTemplate?.accentColor || '#0f766e',
        '--secondary': selectedTemplate?.secondaryColor || '#111827',
        '--tertiary': selectedTemplate?.tertiaryColor || '#64748b',
        fontFamily: 'Inter, Segoe UI, Roboto, sans-serif',
        lineHeight: '1.5',
        color: selectedTemplate?.secondaryColor || '#111827',
        maxWidth: '900px',
        margin: '0 auto',
        background: 'transparent',
        padding: '0',
        boxShadow: 'none',
        borderRadius: '0',
        position: 'relative',
        overflow: 'visible',
        border: 'none'
      }}
    >
      <header 
        className="executive-header"
        style={{
          background: 'transparent',
          textAlign: 'center',
          padding: '60px 50px',
          margin: '0',
          position: 'relative',
          color: selectedTemplate?.secondaryColor || '#111827',
          zIndex: '2'
        }}
      >
        <h1 
          className="name"
          style={{
            fontSize: '3.2rem',
            fontWeight: '900',
            color: selectedTemplate?.accentColor || '#0f766e',
            marginBottom: '15px',
            letterSpacing: '1px',
            textShadow: 'none',
            position: 'relative',
            zIndex: '3'
          }}
        >
          {resumeData.personalInfo.name || 'Your Name'}
        </h1>
        <p 
          className="title"
          style={{
            fontSize: '1.4rem',
            color: selectedTemplate?.tertiaryColor || '#64748b',
            fontWeight: '600',
            marginBottom: '25px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            position: 'relative',
            zIndex: '3'
          }}
        >
          {selectedTemplate?.name || 'Your Title'}
        </p>
        <div 
          className="contact-bar"
          style={{
            fontSize: '1.1rem',
            color: selectedTemplate?.secondaryColor || '#111827',
            letterSpacing: '0.5px',
            fontWeight: '400',
            lineHeight: '1.8',
            position: 'relative',
            zIndex: '3'
          }}
        >
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
          {resumeData.personalInfo.address && ` | ${resumeData.personalInfo.address}`}
        </div>
      </header>
      <main 
        className="executive-content"
        style={{
          display: 'grid',
          gap: '40px',
          padding: '50px',
          position: 'relative',
          zIndex: '2'
        }}
      >
        {resumeData.summary && (
          <section className="executive-summary">
            <h2 
              style={{ 
                color: selectedTemplate?.accentColor || '#0f766e',
                fontSize: '1.6rem',
                fontWeight: '800',
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                position: 'relative',
                paddingLeft: '25px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Executive Summary
            </h2>
            <p>{resumeData.summary}</p>
          </section>
        )}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="executive-experience">
            <h2 
              style={{ 
                color: selectedTemplate?.accentColor || '#0f766e',
                fontSize: '1.6rem',
                fontWeight: '800',
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                position: 'relative',
                paddingLeft: '25px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Leadership Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="executive-position">
                <div className="position-header">
                  <h3>{exp.title}</h3>
                  <span className="company">{exp.company}</span>
                  <span className="duration">{exp.duration}</span>
                </div>
                <ul className="achievements">
                  {exp.description && exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="executive-education">
            <h2>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="degree">
                <h3>{edu.degree}</h3>
                <p>{edu.institution} • {edu.year}</p>
              </div>
            ))}
          </section>
        )}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="executive-skills">
            <h2 
              style={{ 
                color: selectedTemplate?.accentColor || '#0f766e',
                fontSize: '1.6rem',
                fontWeight: '800',
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                position: 'relative',
                paddingLeft: '25px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Core Competencies
            </h2>
            <div 
              className="skills-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '12px',
                marginTop: '20px'
              }}
            >
              {resumeData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag"
                  style={{
                    background: 'transparent',
                    color: selectedTemplate?.accentColor || '#0f766e',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'visible',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    border: `2px solid ${selectedTemplate?.accentColor || '#0f766e'}`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );

  const renderCreativeLayout = () => (
    <div 
      className="template-creative"
      style={{
        background: 'transparent',
        display: 'grid',
        gridTemplateColumns: '350px 1fr',
        gap: '40px',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0'
      }}
    >
      <aside 
        className="creative-sidebar"
        style={{
          background: 'transparent',
          padding: '40px 30px'
        }}
      >
        <div 
          className="creative-avatar"
          style={{
            width: '120px',
            height: '120px',
            background: 'transparent',
            border: `3px solid ${selectedTemplate?.accentColor || '#0f766e'}`,
            borderRadius: '50%',
            margin: '0 auto 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: selectedTemplate?.accentColor || '#0f766e'
          }}
        >
          👤
        </div>
        <h1 
          className="creative-name"
          style={{
            fontSize: '2rem',
            fontWeight: '800',
            textAlign: 'center',
            color: selectedTemplate?.accentColor || '#0f766e',
            marginBottom: '10px'
          }}
        >
          {resumeData.personalInfo.name || 'Your Name'}
        </h1>
        <p 
          className="creative-role"
          style={{
            fontSize: '1.1rem',
            color: selectedTemplate?.tertiaryColor || '#64748b',
            textAlign: 'center',
            marginBottom: '30px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {selectedTemplate?.name || 'Your Title'}
        </p>
        <div 
          className="creative-contact"
          style={{
            color: selectedTemplate?.secondaryColor || '#111827',
            lineHeight: '1.6'
          }}
        >
          <p>{resumeData.personalInfo.email}</p>
          <p>{resumeData.personalInfo.phone}</p>
          <p>{resumeData.personalInfo.address}</p>
        </div>
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section 
            className="creative-skills"
            style={{ marginTop: '30px' }}
          >
            <h3 
              style={{
                color: selectedTemplate?.accentColor || '#0f766e',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Skills & Tools
            </h3>
            <div 
              className="skill-tags"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              {resumeData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag"
                  style={{
                    background: 'transparent',
                    color: selectedTemplate?.accentColor || '#0f766e',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    border: `1px solid ${selectedTemplate?.accentColor || '#0f766e'}`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </aside>
      <main 
        className="creative-main"
        style={{
          padding: '40px 30px',
          background: 'transparent'
        }}
      >
        {resumeData.summary && (
          <section 
            className="creative-about"
            style={{ marginBottom: '40px' }}
          >
            <h2 
              style={{
                color: selectedTemplate?.accentColor || '#0f766e',
                fontSize: '1.5rem',
                fontWeight: '800',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              About
            </h2>
            <p 
              style={{
                color: selectedTemplate?.secondaryColor || '#111827',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}
            >
              {resumeData.summary}
            </p>
          </section>
        )}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="creative-experience">
            <h2>Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="creative-job">
                <h3>{exp.title}</h3>
                <p className="creative-company">{exp.company}</p>
                <p className="creative-date">{exp.duration}</p>
                <ul>
                  {exp.description && exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="creative-education">
            <h2>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="creative-degree">
                <h3>{edu.degree}</h3>
                <p>{edu.institution} • {edu.year}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );

  const renderTechnicalLayout = () => (
    <div 
      className="template-technical"
      style={{
        background: 'transparent',
        fontFamily: 'JetBrains Mono, Fira Code, Consolas, Monaco, monospace',
        lineHeight: '1.6',
        color: selectedTemplate?.secondaryColor || '#111827',
        maxWidth: '950px',
        margin: '0 auto',
        padding: '0'
      }}
    >
      <header 
        className="tech-header"
        style={{
          background: 'transparent',
          textAlign: 'center',
          padding: '50px 40px',
          margin: '0',
          position: 'relative'
        }}
      >
        <h1 
          className="tech-name"
          style={{
            fontSize: '2.8rem',
            fontWeight: '900',
            color: selectedTemplate?.accentColor || '#0f766e',
            marginBottom: '12px',
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          {resumeData.personalInfo.name || 'Your Name'}
        </h1>
        <p 
          className="tech-title"
          style={{
            fontSize: '1.1rem',
            color: selectedTemplate?.tertiaryColor || '#64748b',
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontFamily: 'Consolas, monospace'
          }}
        >
          {selectedTemplate?.name || 'Your Title'}
        </p>
        <div 
          className="tech-contact"
          style={{
            fontSize: '0.9rem',
            color: selectedTemplate?.secondaryColor || '#111827',
            fontFamily: 'Consolas, monospace'
          }}
        >
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.address}
        </div>
      </header>
      <main 
        className="tech-content"
        style={{
          padding: '50px',
          background: 'transparent'
        }}
      >
        {resumeData.summary && (
          <section 
            className="tech-summary"
            style={{ marginBottom: '40px' }}
          >
            <h2 
              style={{
                color: selectedTemplate?.accentColor || '#0f766e',
                fontSize: '1.5rem',
                fontWeight: '800',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Technical Profile
            </h2>
            <p 
              style={{
                color: selectedTemplate?.secondaryColor || '#111827',
                lineHeight: '1.6'
              }}
            >
              {resumeData.summary}
            </p>
          </section>
        )}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section 
            className="tech-skills"
            style={{ marginBottom: '40px' }}
          >
            <h2 
              style={{
                color: selectedTemplate?.accentColor || '#0f766e',
                fontSize: '1.5rem',
                fontWeight: '800',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Technical Skills
            </h2>
            <div 
              className="tech-skills-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px'
              }}
            >
              {resumeData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag"
                  style={{
                    background: 'transparent',
                    color: selectedTemplate?.accentColor || '#0f766e',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    border: `2px solid ${selectedTemplate?.accentColor || '#0f766e'}`,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: 'Consolas, monospace'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <section className="tech-projects">
            <h2>Key Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="tech-project">
                <h3>{project.name}</h3>
                <p className="tech-stack"><em>{project.technologies}</em></p>
                <p>{project.description}</p>
              </div>
            ))}
          </section>
        )}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="tech-experience">
            <h2>Professional Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="tech-job">
                <h3>{exp.title} - {exp.company}</h3>
                <p className="tech-duration">{exp.duration}</p>
                <ul>
                  {exp.description && exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="tech-education">
            <h2>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="tech-degree">
                <h3>{edu.degree}</h3>
                <p>{edu.institution} • {edu.year}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );

  const renderAcademicLayout = () => (
    <div className="template-academic">
      <header className="academic-header">
        <h1 className="academic-name">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <p className="academic-title">{selectedTemplate.name}</p>
        <div className="academic-contact">
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.address}
        </div>
      </header>
      <main className="academic-content">
        {resumeData.summary && (
          <section className="academic-summary">
            <h2>Research Summary</h2>
            <p>{resumeData.summary}</p>
          </section>
        )}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="academic-experience">
            <h2>Academic Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="academic-position">
                <h3>{exp.title}</h3>
                <p className="academic-institution">{exp.company} • {exp.duration}</p>
                <ul>
                  {exp.description && exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="academic-education">
            <h2>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="academic-degree">
                <h3>{edu.degree}</h3>
                <p>{edu.institution} • {edu.year}</p>
              </div>
            ))}
          </section>
        )}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <section className="academic-certifications">
            <h2>Awards & Certifications</h2>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="academic-cert">
                <strong>{cert.name}</strong> — {cert.issuer} ({cert.date})
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );

  const renderFinancialLayout = () => (
    <div className="template-financial">
      <header className="financial-header">
        <h1 className="financial-name">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <p className="financial-title">{selectedTemplate.name}</p>
        <div className="financial-contact">
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.address}
        </div>
      </header>
      <main className="financial-content">
        {resumeData.summary && (
          <section className="financial-summary">
            <h2>Financial Expertise</h2>
            <p>{resumeData.summary}</p>
          </section>
        )}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="financial-experience">
            <h2>Financial Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="financial-position">
                <h3>{exp.title}</h3>
                <p className="financial-company">{exp.company} | {exp.duration}</p>
                <ul>
                  {exp.description && exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="financial-education">
            <h2>Education & Certifications</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="financial-degree">
                <h3>{edu.degree}</h3>
                <p>{edu.institution} • {edu.year}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );

  const renderMarketingLayout = () => (
    <div 
      className="template-marketing"
      style={{
        background: 'transparent',
        fontFamily: 'Inter, Segoe UI, Roboto, sans-serif',
        lineHeight: '1.5',
        color: selectedTemplate?.secondaryColor || '#111827',
        maxWidth: '950px',
        margin: '0 auto',
        padding: '0'
      }}
    >
      <header 
        className="marketing-header"
        style={{
          background: 'transparent',
          textAlign: 'center',
          padding: '60px 50px',
          margin: '0',
          position: 'relative'
        }}
      >
        <h1 
          className="marketing-name"
          style={{
            fontSize: '3rem',
            fontWeight: '900',
            color: selectedTemplate?.accentColor || '#0f766e',
            marginBottom: '15px',
            letterSpacing: '1px'
          }}
        >
          {resumeData.personalInfo.name || 'Your Name'}
        </h1>
        <p 
          className="marketing-title"
          style={{
            fontSize: '1.3rem',
            color: selectedTemplate?.tertiaryColor || '#64748b',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: '600'
          }}
        >
          {selectedTemplate?.name || 'Your Title'}
        </p>
        <div 
          className="marketing-contact"
          style={{
            fontSize: '1rem',
            color: selectedTemplate?.secondaryColor || '#111827',
            letterSpacing: '0.5px',
            fontWeight: '400',
            lineHeight: '1.6'
          }}
        >
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.address}
        </div>
      </header>
      <main 
        className="marketing-content"
        style={{
          padding: '50px',
          background: 'transparent'
        }}
      >
        {resumeData.summary && (
          <section 
            className="marketing-summary"
            style={{ marginBottom: '40px' }}
          >
            <h2 
              style={{
                color: selectedTemplate?.accentColor || '#0f766e',
                fontSize: '1.6rem',
                fontWeight: '800',
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                position: 'relative',
                paddingLeft: '25px'
              }}
            >
              Marketing Expertise
            </h2>
            <p 
              style={{
                color: selectedTemplate?.secondaryColor || '#111827',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}
            >
              {resumeData.summary}
            </p>
          </section>
        )}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="marketing-experience">
            <h2>Marketing Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="marketing-position">
                <h3>{exp.title}</h3>
                <p className="marketing-company">{exp.company} | {exp.duration}</p>
                <ul>
                  {exp.description && exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="marketing-education">
            <h2>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="marketing-degree">
                <h3>{edu.degree}</h3>
                <p>{edu.institution} • {edu.year}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
            <p className="text-xl text-teal-100">Create a professional resume in minutes</p>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`p-4 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        </div>
      )}

      {/* Template Info Display */}
      {selectedTemplate && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-blue-800">Active Template: {selectedTemplate.name}</h3>
                <p className="text-xs text-blue-600">Category: {selectedTemplate.category} | Layout: {selectedTemplate.layout}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{backgroundColor: selectedTemplate.accentColor}}
                    title={`Accent: ${selectedTemplate.accentColor}`}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{backgroundColor: selectedTemplate.secondaryColor}}
                    title={`Secondary: ${selectedTemplate.secondaryColor}`}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{backgroundColor: selectedTemplate.tertiaryColor}}
                    title={`Tertiary: ${selectedTemplate.tertiaryColor}`}
                  ></div>
                </div>
                <span className="text-xs text-blue-600">Color Scheme</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Resume Sections</h2>
              <nav className="space-y-2">
                {[
                  { id: 'personal', name: 'Personal Info', icon: FaUser },
                  { id: 'summary', name: 'Summary', icon: FaStar },
                  { id: 'education', name: 'Education', icon: FaGraduationCap },
                  { id: 'experience', name: 'Experience', icon: FaBriefcase },
                  { id: 'skills', name: 'Skills', icon: FaStar },
                  { id: 'projects', name: 'Projects', icon: FaStar },
                  { id: 'certifications', name: 'Certifications', icon: FaStar }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-teal-100 text-teal-700 border-l-4 border-teal-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={previewResume}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <FaEye className="h-4 w-4" />
                  <span>{showPreview ? 'Hide Preview' : 'Preview Resume'}</span>
                </button>
                <button
                  onClick={downloadPDF}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <FaDownload className="h-4 w-4" />
                  <span>{loading ? 'Generating...' : 'Download PDF'}</span>
                </button>
                <button
                  onClick={saveResume}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  <FaSave className="h-4 w-4" />
                  <span>{loading ? 'Saving...' : 'Save Resume'}</span>
                </button>
                <button
                  onClick={handleTemplateSelection}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  <FaPalette className="h-4 w-4" />
                  <span>{selectedTemplate ? `Template: ${selectedTemplate.name}` : 'Select Template'}</span>
                  {selectedTemplate && (
                    <div className="flex space-x-1 ml-2">
                      <div 
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{backgroundColor: selectedTemplate.accentColor}}
                        title={`Accent: ${selectedTemplate.accentColor}`}
                      ></div>
                      <div 
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{backgroundColor: selectedTemplate.secondaryColor}}
                        title={`Secondary: ${selectedTemplate.secondaryColor}`}
                      ></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {showPreview ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Resume Preview</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPreviewKey(prev => prev + 1)}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
                      title="Refresh Preview"
                    >
                      <FaSync className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div 
                  key={previewKey}
                  className="resume-preview"
                  style={{
                    '--accent': selectedTemplate?.accentColor || '#0f766e',
                    '--secondary': selectedTemplate?.secondaryColor || '#111827',
                    '--tertiary': selectedTemplate?.tertiaryColor || '#64748b'
                  }}
                >
                  <div 
                    className="template-wrapper"
                    style={{
                      '--accent': selectedTemplate?.accentColor || '#0f766e',
                      '--secondary': selectedTemplate?.secondaryColor || '#111827',
                      '--tertiary': selectedTemplate?.tertiaryColor || '#64748b'
                    }}
                  >
                    {renderTemplatePreview()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Personal Information */}
                {activeSection === 'personal' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.name}
                          onChange={(e) => updatePersonalInfo('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.address}
                          onChange={(e) => updatePersonalInfo('address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                        <input
                          type="url"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your LinkedIn profile"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          value={resumeData.personalInfo.website}
                          onChange={(e) => updatePersonalInfo('website', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your website"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary */}
                {activeSection === 'summary' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Professional Summary</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                      <textarea
                        value={resumeData.summary}
                        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Write a compelling professional summary..."
                      />
                    </div>
                  </div>
                )}

                {/* Education */}
                {activeSection === 'education' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Education</h3>
                      <button
                        onClick={addEducation}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Education
                      </button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">Education #{index + 1}</h4>
                            <button
                              onClick={() => removeItem('education', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Bachelor of Technology"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., IIT Delhi"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                              <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., 2020-2024"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                              <input
                                type="text"
                                value={edu.gpa}
                                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., 8.5/10"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={edu.description}
                              onChange={(e) => updateEducation(index, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Brief description of your education..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {activeSection === 'experience' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Work Experience</h3>
                      <button
                        onClick={addExperience}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Experience
                      </button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">Experience #{index + 1}</h4>
                            <button
                              onClick={() => removeItem('experience', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                              <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Software Engineer"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Google"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                              <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Jan 2023 - Present"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(index, 'description', e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Describe your responsibilities and achievements..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {activeSection === 'skills' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Skills</h3>
                      <button
                        onClick={addSkill}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Skill
                      </button>
                    </div>
                    <div className="space-y-4">
                      {resumeData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Enter a skill"
                          />
                          <button
                            onClick={() => removeItem('skills', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {activeSection === 'projects' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Projects</h3>
                      <button
                        onClick={addProject}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Project
                      </button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.projects.map((project, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">Project #{index + 1}</h4>
                            <button
                              onClick={() => removeItem('projects', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                              <input
                                type="text"
                                value={project.name}
                                onChange={(e) => updateProject(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., E-commerce Website"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                              <input
                                type="text"
                                value={project.technologies}
                                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., React, Node.js, MongoDB"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                              <input
                                type="url"
                                value={project.link}
                                onChange={(e) => updateProject(index, 'link', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., https://github.com/username/project"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              value={project.description}
                              onChange={(e) => updateProject(index, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="Describe your project..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {activeSection === 'certifications' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">Certifications</h3>
                      <button
                        onClick={addCertification}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Add Certification
                      </button>
                    </div>
                    <div className="space-y-6">
                      {resumeData.certifications.map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">Certification #{index + 1}</h4>
                            <button
                              onClick={() => removeItem('certifications', index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                              <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., AWS Certified Solutions Architect"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., Amazon Web Services"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                              <input
                                type="text"
                                value={cert.date}
                                onChange={(e) => updateCertification(index, 'date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., December 2023"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Link</label>
                              <input
                                type="url"
                                value={cert.link}
                                onChange={(e) => updateCertification(index, 'link', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                placeholder="e.g., https://aws.amazon.com/certification"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder; 