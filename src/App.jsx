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
import CDRPage from "./page/CDR";
import SDRPage from "./page/SDR";
import TDRPage from "./page/TDR";
import ILDPage from "./page/ILD";
import ITDRPage from "./page/ITDR";
import IPDRPage from "./page/IPDR";
import IDRPage from "./page/IDR";
import LARPage from "./page/LAR";
import OSINTPage from "./page/OSINT";
import SMIPage from "./page/SMI";
import CTIPage from "./page/CTI";
import BSARPage from "./page/BSAR";
import BRIPage from "./page/BRI";
import RTOIPage from "./page/RTOI";
import PRIPage from "./page/PRI";
import LIHPage from "./page/LIH";
import BIPage from "./page/BI";
import FRIPage from "./page/FRI";
import CCTVIPage from "./page/CCTVI";
import LRIPage from "./page/LRI";
import ERIPage from "./page/ERI";
import KYCDIPage from "./page/KYCDI";
import PSRIPage from "./page/PSRI";
import CoRIPage from "./page/CoRI";
import PORIPage from "./page/PORI";
import CSRIPage from "./page/CSRI";
import TGRIPage from "./page/TGRI";
import GHLRIPage from "./page/GHLRI";
import PPRIPage from "./page/PPRI";
import RIIPage from "./page/RII";
import PCRIPage from "./page/PCRI";
import CRIPage from "./page/CRI";
import MIIPage from "./page/MII";
import MInfIPage from "./page/MInfI";
import MDRIPage from "./page/MDRI";
import TIIPage from "./page/TII";
import TDIPage from "./page/TDI";
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
      return parentName.includes(query);
    });
  }, [query]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
  };

  const handleToolClick = (tool) => {
    console.log('Tool clicked:', tool);
    const pageId = tool.name === "Intelligence Modules" ? "IntelligenceModules" : tool.name === "About Us" ? "AboutUs" : tool.name === "Contact Us" ? "ContactUs" : tool.name;
    window.history.pushState({ page: pageId }, '', `#${pageId}`);
    setSelectedPage(pageId);
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
    <div className="min-h-screen flex flex-col font-sans selection:bg-slate-900 selection:text-white bg-[#f0f6ff] overflow-x-hidden w-full max-w-full">
      {/* GLOBAL HEADER */}
      <GlobalHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* MAIN CONTENT AREA WITH ASHOK STAMBH WATERMARK */}
      <div className="flex-1 flex flex-col w-full relative overflow-hidden">
        {/* Ashok Stambh Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <img
            src="/image.png"
            alt="Ashok Stambh Watermark"
            className={`w-auto max-w-[92vw] object-contain opacity-[0.10] filter drop-shadow-sm transition-all duration-500 ${selectedPage === 'KYCDI'
              ? 'h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px]'
              : 'h-[580px] sm:h-[780px] md:h-[950px] lg:h-[1100px]'
              }`}
          />
        </div>

        <div className="relative z-10 flex-1 flex flex-col w-full">
          {selectedPage === "CDR" ? <CDRPage onBack={handleBack} searchQuery={searchQuery} />
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
