import { LRI_TOOLS } from '../data/subTools';
import React, { useState, useEffect } from 'react';
import ToolCard from '../components/nexora';
import { usePageLayout } from '../components/usePageLayout';
import { Search } from 'lucide-react';

import SFHPage from "./LRI-LandRecordIntelligence/SFH-SearchFlatHistory";
import SAHPage from "./LRI-LandRecordIntelligence/SAH-SearchApartmentHistory";
import SBHPage from "./LRI-LandRecordIntelligence/SBH-SearchBuilderHistory";
import STHPage from "./LRI-LandRecordIntelligence/STH-SearchTenantHistory";
import SLHPage from "./LRI-LandRecordIntelligence/SLH-SearchLandHistory";
import SSHPage from "./LRI-LandRecordIntelligence/SSH-SearchSocietyHistory";

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
  const displayDesc = description || "Verify property ownership, land revenue, and deed registrations.";
  
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
  const { dynamicGridClass, displayTools } = usePageLayout('lri', LRI_TOOLS);
  const [selectedSubPage, setSelectedSubPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  if (selectedSubPage === 'sfh') return <SFHPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sah') return <SAHPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sbh') return <SBHPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sth') return <STHPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'slh') return <SLHPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ssh') return <SSHPage onBack={handleSubPageBack} />;

  const filteredTools = LRI_TOOLS.filter(tool => 
    tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-2 sm:py-6 overflow-x-hidden">
        
        {/* Search Dropdown Section */}
        <div className="w-full max-w-2xl mx-auto mt-6 sm:mt-12">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <Search className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Record Search</h2>
              <p className="text-slate-500 font-medium">Select the type of land record you wish to search</p>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform" />
              </div>
              
              <select 
                className="block w-full pl-14 pr-12 py-4 sm:py-5 text-base sm:text-lg border-2 border-slate-200 rounded-2xl bg-white shadow-sm hover:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer text-slate-700 font-semibold"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) handleSelectSubPage(e.target.value);
                }}
              >
                <option value="" disabled hidden>Select a Category...</option>
                {displayTools.map(tool => (
                  <option key={tool.id} value={tool.id}>
                    {tool.desc.split(' - ')[0]}
                  </option>
                ))}
              </select>
              
              <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                <div className="bg-slate-100 p-1 rounded-md group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                  <svg className="w-5 h-5 text-slate-500 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-start gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
              <div className="text-blue-500 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Select a category from the dropdown above to access detailed historical records for flats, apartments, lands, and related entities.
              </p>
            </div>
          </div>
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
