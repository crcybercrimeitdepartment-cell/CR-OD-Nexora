import { CORI_TOOLS } from '../data/subTools';
import React, { useState, useEffect } from 'react';
import ToolCard from '../components/nexora';
import { usePageLayout } from '../components/usePageLayout';

import SCIPage from "./CoRI-CourtRecordIntelligence/SCI-SupremeCourtInformation";
import HCIPage from "./CoRI-CourtRecordIntelligence/HCI-HighCourtInformation";
import DCIPage from "./CoRI-CourtRecordIntelligence/DCI-DistrictCourtInformation";
import FCIPage from "./CoRI-CourtRecordIntelligence/FCI-FamilyCourtInformation";
import CCIPage from "./CoRI-CourtRecordIntelligence/CCI-CivilCourtInformation";
import CrCIPage from "./CoRI-CourtRecordIntelligence/CrCI-CriminalCourtInformation";
import ComCIPage from "./CoRI-CourtRecordIntelligence/ComCI-CommercialCourtInformation";
import ConCIPage from "./CoRI-CourtRecordIntelligence/ConCI-ConsumerCourtInformation";
import SpCIPage from "./CoRI-CourtRecordIntelligence/SpCI-SpecialCourtInformation";
import TIPage from "./CoRI-CourtRecordIntelligence/TI-TribunalInformation";
import FTCIPage from "./CoRI-CourtRecordIntelligence/FTCI-FastTrackCourtInformation";
import LAIPage from "./CoRI-CourtRecordIntelligence/LAI-LokAdalatInformation";
import GNIPage from "./CoRI-CourtRecordIntelligence/GNI-GramNyayalayaInformation";
import CpxIPage from "./CoRI-CourtRecordIntelligence/CpxI-CourtComplexInformation";
import COLPage from "./CoRI-CourtRecordIntelligence/COL-CollectorOfficeList";
import SCOLPage from "./CoRI-CourtRecordIntelligence/SCOL-SubCollectorOfficeList";
import TOLPage from "./CoRI-CourtRecordIntelligence/TOL-TahasildarOfficeList";
import BDOLPage from "./CoRI-CourtRecordIntelligence/BDOL-BlockDevelopmentOfficeList";
import RIOLPage from "./CoRI-CourtRecordIntelligence/RIOL-RevenueInspectorOfficeList";
import RCOLPage from "./CoRI-CourtRecordIntelligence/RCOL-RevenueCircleOfficeList";
import GPOLPage from "./CoRI-CourtRecordIntelligence/GPOL-GramPanchayatOfficeList";
import PSOLPage from "./CoRI-CourtRecordIntelligence/PSOL-PanchayatSamitiOfficeList";
import ZPOLPage from "./CoRI-CourtRecordIntelligence/ZPOL-ZillaParishadOfficeList";
import MOLPage from "./CoRI-CourtRecordIntelligence/MOL-MunicipalityOfficeList";
import MCOLPage from "./CoRI-CourtRecordIntelligence/MCOL-MunicipalCorporationOfficeList";
import NACOLPage from "./CoRI-CourtRecordIntelligence/NACOL-NotifiedAreaCouncilOfficeList";
import DRDAOLPage from "./CoRI-CourtRecordIntelligence/DRDAOL-DistrictRuralDevelopmentAgencyOfficeList";
import SROLPage from "./CoRI-CourtRecordIntelligence/SROL-SubRegistrarOfficeList";

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
  const displayTitle = title || "Court Record Intelligence";
  const displayDesc = description || "Comprehensive judicial, administrative, and tribunal intelligence. Access a centralized repository of case files, ongoing litigations, and historical court verdicts across multiple jurisdictions. Streamline background checks, track legal precedents, and monitor suspect involvement in civil or criminal proceedings with advanced search and cross-referencing tools.";
  
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
export default function CoRIPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('cori', CORI_TOOLS);
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSubPage]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'CoRI' && event.state.subPage) {
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
    window.history.pushState({ page: 'CoRI', subPage: id }, '', '#CoRI-' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'sci') return <SCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'hci') return <HCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'dci') return <DCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fci') return <FCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cci') return <CCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'crci') return <CrCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'comci') return <ComCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'conci') return <ConCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'spci') return <SpCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ti') return <TIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ftci') return <FTCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lai') return <LAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'gni') return <GNIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cpxi') return <CpxIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'col') return <COLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'scol') return <SCOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tol') return <TOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'bdol') return <BDOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'riol') return <RIOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'rcol') return <RCOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'gpol') return <GPOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'psol') return <PSOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'zpol') return <ZPOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'mol') return <MOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'mcol') return <MCOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'nacol') return <NACOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'drdaol') return <DRDAOLPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'srol') return <SROLPage onBack={handleSubPageBack} />;

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
