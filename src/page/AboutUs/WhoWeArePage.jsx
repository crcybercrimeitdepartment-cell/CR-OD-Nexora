import React from 'react';
import InfiniteFoldingCard from './InfiniteFoldingCard';
import { sections } from './data/WhoWeArePageData.js';

export default function WhoWeArePage({ onBack }) {
  const dataToUse = (sections && sections.length > 0) ? sections : [
    { title: "Placeholder Title", description: "Please add data to WhoWeAreData.js" }
  ];

  return (
    <InfiniteFoldingCard onBack={onBack} 
      data={dataToUse} 
      heading="Who we are" 
    />
  );
}



