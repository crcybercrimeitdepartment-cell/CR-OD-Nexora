import React, { useState, useEffect } from 'react';
import { TDR_TOOLS } from '../../data/subTools';
import ToolCard from '../../components/nexora';
import { usePageLayout } from '../../components/usePageLayout';

// Import sub-components
import IMPPage from './Import';
import DFPage from './DynamicFilters';
import SUMPage from './Summary';
import CNPage from './CommonNumbers';
import UCMMINPage from './UncommonMissingMobileIMEINumbers';
import AUCMINPage from './AdvancedUncommonMobileIMEINumbers';
import SAPage from './SplitAnalysis';
import CWSMICGPage from './CompareWithSuspectMobileNoIMEICellIDsGroup';
import NABTCPage from './NumbersActivatedBeforeTheCrimeResultBasedOnSDR';
import TDRD1Page from './TDR-DEMO_1';
import TDRD2Page from './TDR-DEMO_2';
import TDRD3Page from './TDR-DEMO_3';
import TDRD4Page from './TDR-DEMO_4';
import TDRD5Page from './TDR-DEMO_5';
import TDRD6Page from './TDR-DEMO_6';
import TDRD7Page from './TDR-DEMO_7';

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
  const displayTitle = title || "Tower Dump Record";
  const displayDesc = description || "Analyze and visualize cellular tower dump records and connections. Pinpoint mobile device locations, track movements across cells, and identify common numbers active within specific geofences. Utilize advanced spatial analytics and dynamic filtering to isolate suspicious activity, correlate suspect movements, and map out complex network interactions seamlessly.";

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
export default function TDRPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('tdr', TDR_TOOLS);
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'TDR' && event.state.subPage) {
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
    window.history.pushState({ page: 'TDR', subPage: id }, '', '#TDR-' + id);
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
  if (selectedSubPage === 'df') return <DFPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sum') return <SUMPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cn') return <CNPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ucmmin') return <UCMMINPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'aucmin') return <AUCMINPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sa') return <SAPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cwsmicg') return <CWSMICGPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'nabtc') return <NABTCPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tdrd1') return <TDRD1Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tdrd2') return <TDRD2Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tdrd3') return <TDRD3Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tdrd4') return <TDRD4Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tdrd5') return <TDRD5Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tdrd6') return <TDRD6Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tdrd7') return <TDRD7Page onBack={handleSubPageBack} />;

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
          <div className={`grid ${dynamicGridClass} gap-2.5 sm:gap-4 md:gap-5`}>
            {displayTools.map((tool, index) => (
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
