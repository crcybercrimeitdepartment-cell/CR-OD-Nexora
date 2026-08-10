import React from 'react';
import InfiniteFoldingCard from './InfiniteFoldingCard';
import { sections } from './data/GlobalPresencePageData.js';

export default function GlobalPresencePage({ onBack }) {
  const dataToUse = (sections && sections.length > 0) ? sections : [
    { title: "Placeholder Title", description: "Please add data to GlobalPresenceData.js" }
  ];

  return (
    <InfiniteFoldingCard onBack={onBack} 
      data={dataToUse} 
      heading="Global Presence" 
    />
  );
}



