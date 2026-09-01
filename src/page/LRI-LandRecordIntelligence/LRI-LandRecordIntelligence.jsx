import React, { useState, useEffect } from 'react';
import ToolCard from '../../components/nexora';
import { Home, Building2, Briefcase, Users, MapPin, Landmark, Layers } from 'lucide-react';

import VerifyFlatOwnershipAndTransactionLogsPage from "./VerifyFlatOwnershipAndTransactionLogsPage";
import AnalyzeApartmentRecordsAndHistoryPage from "./AnalyzeApartmentRecordsAndHistoryPage";
import ReviewBuilderProjectsAndCredibilityPage from "./ReviewBuilderProjectsAndCredibilityPage";
import CheckTenantBackgroundsAndLeasesPage from "./CheckTenantBackgroundsAndLeasesPage";
import VerifyLandRegistryAndPastTransfersPage from "./VerifyLandRegistryAndPastTransfersPage";
import AccessHousingSocietyRegistrationRecordsPage from "./AccessHousingSocietyRegistrationRecordsPage";
import DemoPage from "./DemoPage";

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
  const displayTitle = title || "Land Record Intelligence";
  const displayDesc = description || "Verify property ownership, land revenue, and deed registrations. Uncover hidden assets, trace property transfer histories, and identify fraudulent land transactions. Utilize spatial mapping and archival cross-referencing to investigate money laundering, establish suspect net worth, and resolve complex real estate disputes with unparalleled accuracy.";
  
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
export default function LRIPage({ onBack }) {
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  const tools = [
    { id: 'sfh', name: 'Verify flat ownership and transaction logs.', desc: 'Access specific flat details and ownership changes.', icon: (p) => <Home {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'sah', name: 'Analyze apartment records and history.', desc: 'Review historical logs and structural records.', icon: (p) => <Building2 {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'sbh', name: 'Review builder projects and credibility.', desc: 'Track construction firms and project credibility.', icon: (p) => <Briefcase {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'sth', name: 'Check tenant backgrounds and leases.', desc: 'Verify rental histories and lease agreements.', icon: (p) => <Users {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'slh', name: 'Verify land registry and past transfers.', desc: 'Analyze land registry records and property deeds.', icon: (p) => <MapPin {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'ssh', name: 'Access housing society registration records.', desc: 'Verify registration details for housing societies.', icon: (p) => <Landmark {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
    { id: 'demo1', name: 'Demo', desc: 'Demo tool for showcasing future integrations.', icon: (p) => <Layers {...p} />, color: 'text-gray-500', bg: 'bg-gray-100' },
    { id: 'demo2', name: 'Demo', desc: 'Demo tool for showcasing future integrations.', icon: (p) => <Layers {...p} />, color: 'text-gray-500', bg: 'bg-gray-100' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSubPage]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'LRI' && event.state.subPage) {
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
    window.history.pushState({ page: 'LRI', subPage: id }, '', '#LRI-' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'sfh') return <VerifyFlatOwnershipAndTransactionLogsPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sah') return <AnalyzeApartmentRecordsAndHistoryPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sbh') return <ReviewBuilderProjectsAndCredibilityPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sth') return <CheckTenantBackgroundsAndLeasesPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'slh') return <VerifyLandRegistryAndPastTransfersPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ssh') return <AccessHousingSocietyRegistrationRecordsPage onBack={handleSubPageBack} />;
  
  if (selectedSubPage === 'demo1' || selectedSubPage === 'demo2') {
    return <DemoPage onBack={handleSubPageBack} />;
  }

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} onClick={() => handleSelectSubPage(tool.id)} disableCssAnimation={true} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
