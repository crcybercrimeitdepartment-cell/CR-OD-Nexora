/**
 * @file App.jsx
 * @description Root application component for Nexora Intelligence Platform.
 */
import React, { useState, useMemo, useEffect } from 'react';

/* -------------------------------------------------------------------------- */
/*  Layout Components                                                          */
/* -------------------------------------------------------------------------- */
import ToolCard, { Header as GlobalHeader, Footer as GlobalFooter } from './components/nexora';

/* -------------------------------------------------------------------------- */
/*  Home Dashboard Data                                                        */
/* -------------------------------------------------------------------------- */
import { NEXORA_MODULES } from './data/nexora';  // 40 top-level category cards
import { ALL_SUB_TOOLS } from './data/subTools'; // All extracted sub-category cards
import CDRPage from "./page/CDR-CallDetailRecord";
import SDRPage from "./page/SDR-SubscriberDetailRecord";
import TDRPage from "./page/TDR-TowerDumpRecord";
import ILDPage from "./page/ILD-InternationalLongDistance";
import ITDRPage from "./page/ITDR-InternetTrafficDetailRecord";
import IPDRPage from "./page/IPDR-InternetProtocolDetailRecord";
import IDRPage from "./page/IDR-InternetDataRecord";
import LARPage from "./page/LAR-LocationAnalysisRecord";
import OSINTPage from "./page/OSINT-OpenSourceIntelligence";
import SMIPage from "./page/SMI-SocialMediaIntelligence";
import CTIPage from "./page/CTI-CyberThreatIntelligence";
import BSARPage from "./page/BSAR-BankStatementAnalysisReport";
import BRIPage from "./page/BRI-BankRecordIntelligence";
import RTOIPage from "./page/RTOI-RegionalTransportOfficeIntelligence";
import PRIPage from "./page/PRI-PrisonRecordIntelligence";
import LIHPage from "./page/LIH-LawIntelligenceHub";
import BIPage from "./page/BI-BiometricIntelligence";
import FRIPage from "./page/FRI-FacialRecognitionIntelligence";
import CCTVIPage from "./page/CCTVI-CCTVIntelligence";
import LRIPage from "./page/LRI-LandRecordIntelligence";
import ERIPage from "./page/ERI-EducationRecordIntelligence";
import KYCDIPage from "./page/KYCDI-KYCDocumentIntelligence";
import PSRIPage from "./page/PSRI-PoliceStationRecordIntelligence";
import CoRIPage from "./page/CoRI-CourtRecordIntelligence";
import PORIPage from "./page/PORI-PostOfficeRecordIntelligence";
import CSRIPage from "./page/CSRI-CourierServiceRecordIntelligence";
import TGRIPage from "./page/TGRI-TollGateRecordIntelligence";
import GHLRIPage from "./page/GHLRI-GuestHouse&LodgeRecordIntelligence";
import PPRIPage from "./page/PPRI-PetrolPumpRecordIntelligence";
import RIIPage from "./page/RII-RailwayInformationIntelligence";
import PCRIPage from "./page/PCRI-PINCodeRecordIntelligence";
import CRIPage from "./page/CRI-CompanyRegistrationIntelligence";
import MIIPage from "./page/MII-MinisterInformationIntelligence";
import MInfIPage from "./page/MInfI-MediaInformationIntelligence";
import MDRIPage from "./page/MDRI-MedicalDataRecordIntelligence";
import TIIPage from "./page/TII-TempleInformationIntelligence";
import TDIPage from "./page/TDI-TelephoneDirectoryIntelligence";
import IntelligenceModulesPage from "./page/IntelligenceModules";
import AboutUsPage from "./page/AboutUs";
import ContactUsPage from "./page/ContactUs";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);

  const query = searchQuery.trim().toLowerCase();

  const filteredMainTools = useMemo(() => {
    if (!query) return NEXORA_MODULES;
    return NEXORA_MODULES.filter(parent => {
      const parentName = (parent.name || parent.title || '').toLowerCase();
      const parentDesc = (parent.description || '').toLowerCase();
      return parentName.includes(query) || parentDesc.includes(query);
    });
  }, [query]);

  const filteredSubTools = useMemo(() => {
    if (!query) return [];
    return ALL_SUB_TOOLS.filter(tool => {
      const toolName = (tool.name || tool.title || '').toLowerCase();
      const toolDesc = (tool.desc || tool.description || '').toLowerCase();
      return toolName.includes(query) || toolDesc.includes(query);
    });
  }, [query]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    // If the user starts typing, immediately switch to the global Home Dashboard
    if (val.trim().length > 0 && selectedPage !== null) {
      setSelectedPage(null);
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleToolClick = (tool) => {
    console.log('Tool clicked:', tool);
    setSearchQuery(''); // clear search on navigation
    if (tool.parentId) {
      // It's an inner card!
      window.history.pushState({ page: tool.parentId, subPage: tool.id }, '', `#${tool.parentId}/${tool.id}`);
      setSelectedPage(tool.parentId);
    } else {
      // It's a main module
      const pageId = tool.name === "Intelligence Modules" ? "IntelligenceModules" : tool.name === "About Us" ? "AboutUs" : tool.name === "Contact Us" ? "ContactUs" : tool.name;
      window.history.pushState({ page: pageId }, '', `#${pageId}`);
      setSelectedPage(pageId);
    }
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.page) {
      window.history.back();
    } else {
      setSelectedPage(null);
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setSelectedPage(event.state.page);
      } else {
        setSelectedPage(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchQuery, selectedPage]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-slate-900 selection:text-white bg-[#f0f6ff] w-full max-w-full">
      {/* GLOBAL HEADER */}
      <GlobalHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* MAIN CONTENT AREA WITH ASHOK STAMBH WATERMARK */}
      <div className="flex-1 flex flex-col w-full relative overflow-hidden">
        {/* Ashok Stambh Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 p-4 sm:p-8">
          <img
            src="/image.png"
            alt="Ashok Stambh Watermark"
            className={`w-auto max-w-[92vw] object-contain opacity-[0.10] filter drop-shadow-sm transition-all duration-500 ${selectedPage === 'KYCDI'
              ? 'h-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[550px]'
              : 'h-full max-h-[580px] sm:max-h-[780px] md:max-h-[950px] lg:max-h-[1100px]'
              }`}
          />
        </div>

        <div className="relative z-10 flex-1 flex flex-col w-full">
        {selectedPage === null ? (
          <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 lg:py-10">
            {query && filteredMainTools.length === 0 && filteredSubTools.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.4s ease-out forwards' }}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1e2a52] mb-1 sm:mb-2 text-center">No matching intelligence modules found</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium text-center">Try adjusting your search query.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Top-Level Categories */}
                {(!query || filteredMainTools.length > 0) && (
                  <div>
                    {query && <h2 className="text-xl font-bold text-[#1e2a52] mb-4">Main Categories</h2>}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                      {filteredMainTools.map((tool, index) => (
                        <ToolCard key={tool.name} tool={tool} index={index} onClick={handleToolClick} />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Sub-Tools */}
                {query && filteredSubTools.length > 0 && (
                  <div className="mt-4 pt-6 border-t border-slate-200">
                    <h2 className="text-xl font-bold text-[#1e2a52] mb-4">Inner Intelligence Tools</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                      {filteredSubTools.map((tool, index) => (
                        <ToolCard key={`${tool.parentId}-${tool.id}`} tool={tool} index={index} onClick={handleToolClick} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        ) : selectedPage === "CDR" ? <CDRPage onBack={handleBack} searchQuery={searchQuery} />
            : selectedPage === "SDR" ? <SDRPage onBack={handleBack} searchQuery={searchQuery} />
              : selectedPage === "TDR" ? <TDRPage onBack={handleBack} searchQuery={searchQuery} />
                : selectedPage === "ILD" ? <ILDPage onBack={handleBack} searchQuery={searchQuery} />
                  : selectedPage === "ITDR" ? <ITDRPage onBack={handleBack} searchQuery={searchQuery} />
                    : selectedPage === "IPDR" ? <IPDRPage onBack={handleBack} searchQuery={searchQuery} />
                      : selectedPage === "IDR" ? <IDRPage onBack={handleBack} searchQuery={searchQuery} />
                        : selectedPage === "LAR" ? <LARPage onBack={handleBack} searchQuery={searchQuery} />
                          : selectedPage === "OSINT" ? <OSINTPage onBack={handleBack} searchQuery={searchQuery} />
                            : selectedPage === "SMI" ? <SMIPage onBack={handleBack} searchQuery={searchQuery} />
                              : selectedPage === "CTI" ? <CTIPage onBack={handleBack} searchQuery={searchQuery} />
                                : selectedPage === "BSAR" ? <BSARPage onBack={handleBack} searchQuery={searchQuery} />
                                  : selectedPage === "BRI" ? <BRIPage onBack={handleBack} searchQuery={searchQuery} />
                                    : selectedPage === "RTOI" ? <RTOIPage onBack={handleBack} searchQuery={searchQuery} />
                                      : selectedPage === "PRI" ? <PRIPage onBack={handleBack} searchQuery={searchQuery} />
                                        : selectedPage === "LIH" ? <LIHPage onBack={handleBack} searchQuery={searchQuery} />
                                          : selectedPage === "BI" ? <BIPage onBack={handleBack} searchQuery={searchQuery} />
                                            : selectedPage === "FRI" ? <FRIPage onBack={handleBack} searchQuery={searchQuery} />
                                              : selectedPage === "CCTVI" ? <CCTVIPage onBack={handleBack} searchQuery={searchQuery} />
                                                : selectedPage === "LRI" ? <LRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                  : selectedPage === "ERI" ? <ERIPage onBack={handleBack} searchQuery={searchQuery} />
                                                    : selectedPage === "KYCDI" ? <KYCDIPage onBack={handleBack} searchQuery={searchQuery} />
                                                      : selectedPage === "PSRI" ? <PSRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                        : selectedPage === "CoRI" ? <CoRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                          : selectedPage === "PORI" ? <PORIPage onBack={handleBack} searchQuery={searchQuery} />
                                                            : selectedPage === "CSRI" ? <CSRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                              : selectedPage === "TGRI" ? <TGRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                : selectedPage === "GHLRI" ? <GHLRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                  : selectedPage === "PPRI" ? <PPRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                    : selectedPage === "RII" ? <RIIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                      : selectedPage === "PCRI" ? <PCRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                        : selectedPage === "CRI" ? <CRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                          : selectedPage === "MII" ? <MIIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                            : selectedPage === "MInfI" ? <MInfIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                              : selectedPage === "MDRI" ? <MDRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                                : selectedPage === "TII" ? <TIIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                                  : selectedPage === "TDI" ? <TDIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                                    : selectedPage === "IntelligenceModules" ? <IntelligenceModulesPage onBack={handleBack} searchQuery={searchQuery} />
                                                                                      : selectedPage === "AboutUs" ? <AboutUsPage onBack={handleBack} searchQuery={searchQuery} />
                                                                                        : selectedPage === "ContactUs" ? <ContactUsPage onBack={handleBack} searchQuery={searchQuery} />
                                                                                          : query !== "" ? (
                                                                                            <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 pt-2 pb-2 overflow-x-hidden flex-1 flex flex-col">
                                                                                              <main className="flex-1 pt-2 pb-2">
                                                                                                <div className="mb-4 space-y-6">
                                                                                                  {filteredMainTools.length > 0 && (
                                                                                                    <div>
                                                                                                      <h2 className="text-lg font-bold text-slate-800 mb-4 px-1 flex items-center gap-2">
                                                                                                        <span>Matching Categories</span>
                                                                                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{filteredMainTools.length}</span>
                                                                                                      </h2>
                                                                                                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                                                                                                        {filteredMainTools.map((tool, idx) => (
                                                                                                          <ToolCard key={tool.id} tool={tool} index={idx} onClick={(t) => { setSearchQuery(''); handleToolClick(t); }} />
                                                                                                        ))}
                                                                                                      </div>
                                                                                                    </div>
                                                                                                  )}

                                                                                                  {filteredMainTools.length === 0 && (
                                                                                                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-slate-500">
                                                                                                      <p className="text-base font-semibold text-slate-700">No tools found matching "{searchQuery}"</p>
                                                                                                      <p className="text-xs text-slate-400 mt-1">Try searching with a different term or keyword.</p>
                                                                                                    </div>
                                                                                                  )}
                                                                                                </div>
                                                                                              </main>
                                                                                            </div>
                                                                                          ) : (
                                                                                            <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 pt-2 pb-2 overflow-x-hidden flex-1 flex flex-col">
                                                                                              <main className="flex-1 pt-2 pb-2">
                                                                                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                                                                                                  {NEXORA_MODULES.map((tool, idx) => (
                                                                                                    <ToolCard
                                                                                                      key={tool.id}
                                                                                                      tool={tool}
                                                                                                      index={idx}
                                                                                                      onClick={handleToolClick}
                                                                                                    />
                                                                                                  ))}
                                                                                                </div>
                                                                                              </main>
                                                                                            </div>
                                                                                          )}
        </div>
      </div>

      {/* GLOBAL FOOTER */}
      <GlobalFooter pageName="NEXORA INTELLIGENCE" audience="Law Enforcement & Security Agencies" />
    </div>
  );
}
