import React from 'react';
import InfiniteFoldingCard from './InfiniteFoldingCard';
import { sections } from './data/ProductStatisticPageData.js';

export default function ProductStatisticPage({ onBack }) {
  const dataToUse = (sections && sections.length > 0) ? sections : [
    { title: "Placeholder Title", description: "Please add data to ProductStatisticData.js" }
  ];

  return (
    <InfiniteFoldingCard onBack={onBack} 
      data={dataToUse} 
      heading="Product Statistic" 
    />
  );
}



