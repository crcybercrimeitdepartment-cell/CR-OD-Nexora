import React from 'react';
import InfiniteFoldingCard from './InfiniteFoldingCard.jsx';
import { sections } from './data/BenefitsPageData.js';

console.log("IMPORTED SECTIONS:", sections);

export default function BenefitsPage({ onBack }) {
  const dataToUse = (sections && sections.length > 0) ? sections : [
    { title: "Fallback 1", description: "This is a fallback because sections is empty or undefined." },
    { title: "Fallback 2", description: "Please check your browser console for 'IMPORTED SECTIONS'." }
  ];

  return (
    <InfiniteFoldingCard onBack={onBack} 
      data={dataToUse} 
      heading="Benefits of NEXORA" 
    />
  );
}



