import { OSINT_TOOLS } from '../data/subTools';
import React, { useState, useEffect } from 'react';
import ToolCard from '../components/nexora';
import { usePageLayout } from '../components/usePageLayout';

import IIPage from "./OSINT-OpenSourceIntelligence/II-IdentityIntelligence";
import ITIPage from "./OSINT-OpenSourceIntelligence/ITI-InternetIntelligence";
import IMIPage from "./OSINT-OpenSourceIntelligence/IMI-ImageIntelligence";
import DIPage from "./OSINT-OpenSourceIntelligence/DI-DocumentIntelligence";
import CIPage from "./OSINT-OpenSourceIntelligence/CI-CryptocurrencyIntelligence";
import DWIPage from "./OSINT-OpenSourceIntelligence/DWI-DarkWebIntelligence";
import GSIPage from "./OSINT-OpenSourceIntelligence/GSI-GeospatialIntelligence";
import EIPage from "./OSINT-OpenSourceIntelligence/EI-EntityIntelligence";
import RIPage from "./OSINT-OpenSourceIntelligence/RI-RelationshipIntelligence";
import TIPage from "./OSINT-OpenSourceIntelligence/TI-ThreatIntelligence";
import RSIPage from "./OSINT-OpenSourceIntelligence/RSI-RiskIntelligence";
import MIPage from "./OSINT-OpenSourceIntelligence/MI-MonitoringIntelligence";
import EVIPage from "./OSINT-OpenSourceIntelligence/EVI-EvidenceIntelligence";
import AIPage from "./OSINT-OpenSourceIntelligence/AI-AnalyticsIntelligence";
import VIPage from "./OSINT-OpenSourceIntelligence/VI-VisualizationIntelligence";
import UPIIPage from "./OSINT-OpenSourceIntelligence/UPII-UPIIntelligence";
import LIPage from "./OSINT-OpenSourceIntelligence/LI-LandlineIntelligence";
import OSWPage from "./OSINT-OpenSourceIntelligence/OSW-OpenSourceWebsites";
import DBIPage from "./OSINT-OpenSourceIntelligence/DBI-DataBreachIntelligence";
import ICCIPage from "./OSINT-OpenSourceIntelligence/ICCI-InternationalCallingCodeIntelligence";

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
  const displayTitle = title || "Open Source Intelligence";
  const displayDesc = description || "Gather and analyze publicly available data from diverse sources. Harness the power of the open web to construct comprehensive target profiles, monitor public sentiment, and track digital footprints. Utilize advanced scraping, sentiment analysis, and social graph mapping to uncover actionable insights hidden within public forums, news outlets, and registries.";

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
export default function OSINTPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('osint', OSINT_TOOLS);
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'OSINT' && event.state.subPage) {
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
    window.history.pushState({ page: 'OSINT', subPage: id }, '', '#OSINT-' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'ii') return <IIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'iti') return <ITIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'imi') return <IMIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'di') return <DIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ci') return <CIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'dwi') return <DWIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'gsi') return <GSIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ei') return <EIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ri') return <RIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ti') return <TIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'rsi') return <RSIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'mi') return <MIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'evi') return <EVIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ai') return <AIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'vi') return <VIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'upii') return <UPIIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'li') return <LIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'osw') return <OSWPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'dbi') return <DBIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'icci') return <ICCIPage onBack={handleSubPageBack} />;

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
