import React from 'react';
import InfiniteFoldingCard from './InfiniteFoldingCard';
import { sections } from './data/ResearchDevelopmentPageData.js';

export default function ResearchDevelopmentPage({ onBack }) {
  const dataToUse = (sections && sections.length > 0) ? sections : [
    { title: "Placeholder Title", description: "Please add data to ResearchDevelopmentData.js" }
  ];

  return (
    <InfiniteFoldingCard onBack={onBack} 
      data={dataToUse} 
      heading="Research & Development" 
    />
  );
}



