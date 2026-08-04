import React, { useState, useEffect } from 'react';
import { IPDR_TOOLS } from '../data/subTools';
import ToolCard from '../components/nexora';

// Import sub-components
import IMPPage from './IPDR-InternetProtocolDetailRecord/Import';
import IPDRMPage from './IPDR-InternetProtocolDetailRecord/IPDRMapping';
import GAPage from './IPDR-InternetProtocolDetailRecord/GeoAnalysis';
import CMNPage from './IPDR-InternetProtocolDetailRecord/CommonMobileNumbersIMEICellIDsDestinationIPDestinationPort';
import CWSMPage from './IPDR-InternetProtocolDetailRecord/CompareWithSuspectMobileNumbersIMEICellIDsDestinationIPGroup';
import IBPNPage from './IPDR-InternetProtocolDetailRecord/IdentifyBPartyNumbers';
import IPDRRPage from './IPDR-InternetProtocolDetailRecord/IPDRRequisition';
import CWIPPage from './IPDR-InternetProtocolDetailRecord/CountryWiseIPs';
import UMNPage from './IPDR-InternetProtocolDetailRecord/UncommonMissingNumbers';
import SAPage from './IPDR-InternetProtocolDetailRecord/SplitAnalysis';
import IPDRD1Page from './IPDR-InternetProtocolDetailRecord/IPDR-DEMO_1';
import IPDRD2Page from './IPDR-InternetProtocolDetailRecord/IPDR-DEMO_2';

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
  const displayTitle = title || "Internet Protocol Detail Record";
  const displayDesc = description || "Analyze and visualize internet protocol connection records.";

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
export default function IPDRPage({ onBack }) {
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'IPDR' && event.state.subPage) {
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
    window.history.pushState({ page: 'IPDR', subPage: id }, '', '#IPDR-' + id);
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
  if (selectedSubPage === 'ipdrm') return <IPDRMPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ga') return <GAPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cmn') return <CMNPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cwsm') return <CWSMPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ibpn') return <IBPNPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ipdrr') return <IPDRRPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cwip') return <CWIPPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'umn') return <UMNPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sa') return <SAPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ipdrd1') return <IPDRD1Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ipdrd2') return <IPDRD2Page onBack={handleSubPageBack} />;

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
            {IPDR_TOOLS.map((tool, index) => (
              <div 
                key={tool.id} 
                className="opacity-0"
                style={{ animation: 'fadeInUp 0.5s ease-out forwards', animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <ToolCard 
                  tool={{ ...tool, description: tool.desc }} 
                  onClick={() => handleSelectSubPage(tool.id)} 
                  customHeight="h-[104px] sm:h-[120px]"
                />
              </div>
            ))}
          </div>
          
          <style jsx>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </main>
      </div>
    </div>
  );
}
