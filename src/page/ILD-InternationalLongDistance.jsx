import React, { useState, useEffect } from 'react';
import { ILD_TOOLS } from '../data/subTools';
import ToolCard from '../components/nexora';

// Import sub-components
import IMPPage from './ILD-InternationalLongDistance/Import';
import GRPage from './ILD-InternationalLongDistance/GeneralReport';
import MRPage from './ILD-InternationalLongDistance/MappingReport';
import ARPage from './ILD-InternationalLongDistance/AnalysisReport';
import MCPage from './ILD-InternationalLongDistance/MixedCalls';
import NNPage from './ILD-InternationalLongDistance/NewNumbers';
import CNPage from './ILD-InternationalLongDistance/CommonNumbers';
import CWSMPage from './ILD-InternationalLongDistance/CompareWithSuspectMobileNumbers';
import ILDD1Page from './ILD-InternationalLongDistance/ILD-DEMO_1';
import ILDD2Page from './ILD-InternationalLongDistance/ILD-DEMO_2';
import ILDD3Page from './ILD-InternationalLongDistance/ILD-DEMO_3';
import ILDD4Page from './ILD-InternationalLongDistance/ILD-DEMO_4';

/**
 * Header Component.
 * Renders the title and a brief description of the page's purpose.
 * 
 * @param {Object} props - Component properties.
 * @param {string} [props.title] - Optional override for the title.
 * @param {string} [props.description] - Optional override for the description.
 * @returns {JSX.Element} The rendered header component.
 */
export function Header({ title, description }) {
  const displayTitle = title || "International Long Distance";
  const displayDesc = description || "Analyze international long distance communication records.";

  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>{displayTitle}</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {displayDesc}
          </p>
        </div>
      </div>
    </header>
  );
}

/**
 * Main Page Component.
 * Handles the display, routing, and user interactions for this specific intelligence record.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.onBack - Callback function triggered when the user clicks the "Back" button to return to the parent dashboard.
 * @returns {JSX.Element} The rendered page layout.
 */
export default function ILDPage({ onBack }) {
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'ILD' && event.state.subPage) {
        setSelectedSubPage(event.state.subPage);
      } else {
        setSelectedSubPage(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    if (window.history.state && window.history.state.subPage) {
      setSelectedSubPage(window.history.state.subPage);
    }
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectSubPage = (id) => {
    window.history.pushState({ page: 'ILD', subPage: id }, '', '#ILD-' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'imp') return <IMPPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'gr') return <GRPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'mr') return <MRPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ar') return <ARPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'mc') return <MCPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'nn') return <NNPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cn') return <CNPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cwsm') return <CWSMPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ildd1') return <ILDD1Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ildd2') return <ILDD2Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ildd3') return <ILDD3Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ildd4') return <ILDD4Page onBack={handleSubPageBack} />;

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4">
      {onBack && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}
      
      <Header />
      
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-4 overflow-x-hidden">
        <main className="flex-1 pt-1 pb-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {ILD_TOOLS.map((tool, index) => (
              <ToolCard 
                key={tool.id} 
                tool={{ ...tool, description: tool.desc }} 
                index={index}
                onClick={() => handleSelectSubPage(tool.id)} 
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
