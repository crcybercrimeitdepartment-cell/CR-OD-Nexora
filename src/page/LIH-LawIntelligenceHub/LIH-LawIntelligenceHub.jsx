import { LIH_TOOLS } from '../../data/subTools';
import React, { useState, useEffect } from 'react';
import {
  Book, Scale, Shield, FileText, Gavel, Landmark, FileSearch, 
  Users, Briefcase, AlertCircle, Bookmark, Scroll, Search, 
  Folder, Database, Globe, Lock, Info, BookOpen
} from 'lucide-react';
import ToolCard from '../../components/nexora';
import { usePageLayout } from '../../components/usePageLayout';

import BNSIPage from "./BNSI-BharatiyaNyayaSanhitaIntelligence";
import BNSSIPage from "./BNSSI-BharatiyaNagarikSurakshaSanhitaIntelligence";
import BSAIPage from "./BSAI-BharatiyaSakshyaAdhiniyamIntelligence";
import IPCIPage from "./IPCI-IndianPenalCodeIntelligence";
import CrPCIPage from "./CrPCI-CodeofCriminalProcedureIntelligence";
import IEAIPage from "./IEAI-IndianEvidenceActIntelligence";
import LDIPage from "./LDI-LegalDictionaryIntelligence";
import LARIPage from "./LARI-LegalActs&RulesIntelligence";
import SLIPage from "./SLI-SpecializedLawsIntelligence";
import LFFIPage from "./LFFI-LegalForms&FormatsIntelligence";
import LJIPage from "./LJI-LegalJudgmentsIntelligence";
import LCNIPage from "./LCNI-LegalCirculars&NotificationsIntelligence";
import PMSIPage from "./PMSI-PoliceManuals&SOPIntelligence";
import LTIPage from "./LTI-LegalTemplatesIntelligence";
import CRIPage from "./CRI-CourtRulesIntelligence";
import IGIPage from "./IGI-InvestigationGuidelinesIntelligence";
import GOIPage from "./GOI-GovernmentOrdersIntelligence";
import LAIPage from "./LAI-LegalAmendmentIntelligence";
import LDRIPage from "./LDRI-LegalDraftingIntelligence";
import CSIPage from "./CSI-CaseStudyIntelligence";

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
  const displayTitle = title || "Law Intelligence Hub";
  const displayDesc = description || "Access centralized legal databases and judicial archives. Empower your investigations with instant access to penal codes, legal precedents, and procedural guidelines. Streamline case preparation by searching through historical rulings, interpreting complex legal frameworks, and ensuring all operational activities align with current legislative standards.";

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
export default function LIHPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('lih', LIH_TOOLS);
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.subPage) {
        setSelectedSubPage(event.state.subPage);
      } else {
        setSelectedSubPage(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    // Check initial state if navigated directly via search
    if (window.history.state && window.history.state.subPage) {
      setSelectedSubPage(window.history.state.subPage);
    }
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSubPage]);

  const handleSubPageSelect = (toolId) => {
    window.history.pushState({ page: 'LIH', subPage: toolId }, '', `#LIH/${toolId}`);
    setSelectedSubPage(toolId);
  };

  const handleSubPageBack = () => {
    // If we have history state for this subpage, go back natively to pop the state
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
      // Clean up URL if needed, though window.history.back() is preferred if it was pushed
      window.history.replaceState({ page: 'LIH' }, '', '#LIH');
    }
  };

  if (selectedSubPage === 'bnsi') return <BNSIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'bnssi') return <BNSSIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'bsai') return <BSAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ipci') return <IPCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'crpci') return <CrPCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ieai') return <IEAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ldi') return <LDIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lari') return <LARIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sli') return <SLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lffi') return <LFFIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lji') return <LJIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lcni') return <LCNIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pmsi') return <PMSIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lti') return <LTIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cri') return <CRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'igi') return <IGIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'goi') return <GOIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lai') return <LAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ldri') return <LDRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'csi') return <CSIPage onBack={handleSubPageBack} />;

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
                onClick={(t) => handleSubPageSelect(t.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
