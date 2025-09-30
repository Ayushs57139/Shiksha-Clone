import React from 'react';

const TemplatePreview = ({ template, className = "" }) => {
  const renderMiniPreview = () => {
    // Get template display name
    const getDisplayName = (name) => {
      if (!name) return 'Template';
      return name.length > 40 ? name.substring(0, 40) + '...' : name;
    };

    // Get template description based on category
    const getDescription = (template) => {
      const category = template.category || 'Professional';
      const layout = template.layout || 'default';
      const name = template.name || 'Template';
      const shortName = name.length > 35 ? name.substring(0, 35) + '...' : name;
      return `${category} template for ${shortName}`;
    };
    
    return (
      <div style={{ 
        height: '100%', 
        backgroundColor: 'white',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Icon */}
        <div style={{ 
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: `linear-gradient(135deg, ${template.accentColor || '#0f766e'}, ${template.secondaryColor || '#14b8a6'})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            ★
          </div>
        </div>
        
        {/* Template Name */}
        <div style={{ 
          color: '#1f2937',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '6px',
          lineHeight: '1.2',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}>
          {getDisplayName(template.name)}
        </div>
        
        {/* Description */}
        <div style={{ 
          color: '#6b7280',
          fontSize: '12px',
          textAlign: 'center',
          lineHeight: '1.3',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}>
          {getDescription(template)}
        </div>
      </div>
    );
  };

  return (
    <div className={`template-preview ${className}`}>
      {renderMiniPreview()}
    </div>
  );
};

export default TemplatePreview;
