import { SDR_TOOLS } from '../data/subTools';
import React, { useState, useEffect } from 'react';
import ToolCard from '../components/nexora';

import BSNLSRPage from "./SDR-SubscriberDetailRecord/BSNLSR-BSNLSubscriberRecords";
import ASRPage from "./SDR-SubscriberDetailRecord/ASR-AirtelSubscriberRecords";
import JSRPage from "./SDR-SubscriberDetailRecord/JSR-JioSubscriberRecords";
import VISRPage from "./SDR-SubscriberDetailRecord/VISR-VodafoneIdeaSubscriberRecords";
import IMEIIPage from "./SDR-SubscriberDetailRecord/IMEII-IMEIIntelligence";
import SARPage from "./SDR-SubscriberDetailRecord/SAR-SDRAnalysisReport";
import MNVPage from "./SDR-SubscriberDetailRecord/MNV-MobileNumberVerification";
import RHPage from "./SDR-SubscriberDetailRecord/RH-ReportHistory";
import TNOLPage from "./SDR-SubscriberDetailRecord/TNOL-TelecomNodalOfficerList";
import SDRDEMO_1Page from "./SDR-SubscriberDetailRecord/SDR-DEMO_1";
import SDRDEMO_2Page from "./SDR-SubscriberDetailRecord/SDR-DEMO_2";
import SDRDEMO_3Page from "./SDR-SubscriberDetailRecord/SDR-DEMO_3";

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
  const displayTitle = title || "Subscriber Detail Record";
  const displayDesc = description || "Verify SIM registration, CAF details, and subscriber identity.";

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
export default function SDRPage({ onBack }) {
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'SDR' && event.state.subPage) {
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
    window.history.pushState({ page: 'SDR', subPage: id }, '', '#SDR-' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'bsnlsr') return <BSNLSRPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'asr') return <ASRPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'jsr') return <JSRPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'visr') return <VISRPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'imeii') return <IMEIIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sar') return <SARPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'mnv') return <MNVPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'rh') return <RHPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tnol') return <TNOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sdrd1') return <SDRDEMO_1Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sdrd2') return <SDRDEMO_2Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sdrd3') return <SDRDEMO_3Page onBack={handleSubPageBack} />;

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
            {SDR_TOOLS.map((tool, index) => (
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

