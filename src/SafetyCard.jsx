import React from 'react';
import './SafetyCard.css';

export default function SafetyCard({ data }) {
  // If there's no data yet, don't render anything
  if (!data) return null;

  // Extract the JSON properties returned from AWS Bedrock
  // Adjust these variable names if your Bedrock JSON keys are different!
  const { status, phonetics, nuance } = data;

  // Determine styles and icons based on the vetting status
  let statusClass = 'status-default';
  let icon = null;

  if (status === 'SAFE') {
    statusClass = 'status-safe';
    // SVG Checkmark
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    );
  } else if (status === 'IFFY') {
    statusClass = 'status-iffy';
    // SVG Alert Triangle
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    );
  } else if (status === 'AVOID') {
    statusClass = 'status-avoid';
    // SVG Stop/X 
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    );
  }

  return (
    <div className="safety-card">
      {/* Banner Area */}
      <div className={`safety-header ${statusClass}`}>
        <span className="status-icon">{icon}</span>
        <h4 className="status-text">{status}</h4>
      </div>
      
      {/* Analysis Details Area */}
      <div className="safety-body">
        {phonetics && (
          <div className="safety-section">
            <h5>Phonetics & Pronunciation</h5>
            <p>{phonetics}</p>
          </div>
        )}
        
        {nuance && (
          <div className="safety-section">
            <h5>Cultural Nuance & Brand Safety</h5>
            <p>{nuance}</p>
          </div>
        )}
      </div>
    </div>
  );
}