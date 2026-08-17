import { TGRI_TOOLS } from '../data/subTools';
import React, { useState, useEffect } from 'react';
import { Car, FileText, Activity, MapPin, TrendingUp, GitMerge, Clock, Grid, AlertTriangle, Users, BarChart, FileCheck } from 'lucide-react';
import ToolCard from '../components/nexora';
import { usePageLayout } from '../components/usePageLayout';
import TTIPage from "./TGRI-TollGateRecordIntelligence/TTI-TollTransactionIntelligence";
import VIPage from "./TGRI-TollGateRecordIntelligence/VI-VehicleIntelligence";
import FTIPage from "./TGRI-TollGateRecordIntelligence/FTI-FASTagIntelligence";
import TPIPage from "./TGRI-TollGateRecordIntelligence/TPI-TollPlazaIntelligence";
import MIPage from "./TGRI-TollGateRecordIntelligence/MI-MovementIntelligence";
import RIPage from "./TGRI-TollGateRecordIntelligence/RI-RouteIntelligence";
import TLIPage from "./TGRI-TollGateRecordIntelligence/TLI-TimelineIntelligence";
import PIPage from "./TGRI-TollGateRecordIntelligence/PI-PatternIntelligence";
import RKIPage from "./TGRI-TollGateRecordIntelligence/RKI-RiskIntelligence";
import RLIPage from "./TGRI-TollGateRecordIntelligence/RLI-RelationshipIntelligence";
import AIPage from "./TGRI-TollGateRecordIntelligence/AI-AnalyticsIntelligence";
import IOPage from "./TGRI-TollGateRecordIntelligence/IO-InvestigationOutput";

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
  const displayTitle = title || "Toll Gate Record Intelligence";
  const displayDesc = description || "Analyze FASTag toll logs and ANPR vehicle captures. Track vehicular movements across the national highway network by correlating electronic payments and visual records. Identify convoy patterns, trace suspect trajectories, and verify travel timelines to support complex logistical and criminal investigations.";
  
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
export default function TGRIPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('tgri', TGRI_TOOLS);
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSubPage]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'TGRI' && event.state.subPage) {
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
    window.history.pushState({ page: 'TGRI', subPage: id }, '', '#TGRI-' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'tti') return <TTIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'vi') return <VIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fti') return <FTIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tpi') return <TPIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'mi') return <MIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ri') return <RIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tli') return <TLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pi') return <PIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'rki') return <RKIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'rli') return <RLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ai') return <AIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'io') return <IOPage onBack={handleSubPageBack} />;

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
      
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-6 overflow-x-hidden">
        <div className={`grid ${dynamicGridClass} gap-2.5 sm:gap-4 md:gap-5`}>
          {displayTools.map((tool, idx) => (
            <ToolCard 
              key={tool.id} 
              tool={{ ...tool, description: tool.desc }} 
              index={idx} 
              onClick={(t) => handleSelectSubPage(t.id)} 
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
