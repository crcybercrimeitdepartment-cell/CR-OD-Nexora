import React from 'react';
import InfiniteFoldingCard from './InfiniteFoldingCard';
import { sections } from './data/OurCoreValuesPageData.js';

export default function OurCoreValuesPage({ onBack }) {
  const dataToUse = (sections && sections.length > 0) ? sections : [
    { title: "Placeholder Title", description: "Please add data to OurCoreValuesData.js" }
  ];

  return (
    <InfiniteFoldingCard onBack={onBack} 
      data={dataToUse} 
      heading="Our Core Values" 
    />
  );
}



