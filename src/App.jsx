/**
 * @file App.jsx
 * @description Root application component for Nexora Intelligence Platform.
 */
import React, { useState, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
import BSARPage from "./page/BSAR-BankStatementAnalysisReport";
import BRIPage from "./page/BRI-BankRecordIntelligence";
import RTOIPage from "./page/RTOI-RegionalTransportOfficeIntelligence";
import PRIPage from "./page/PRI-PrisonRecordIntelligence";
import LIHPage from "./page/LIH-LawIntelligenceHub";
import BIPage from "./page/BI-BiometricIntelligence";
import FRIPage from "./page/FRI-FacialRecognitionIntelligence";
import LRIPage from "./page/LRI-LandRecordIntelligence";
import ERIPage from "./page/ERI-EducationRecordIntelligence";
import KYCDIPage from "./page/KYCDI-KYCDocumentIntelligence";
import PSRIPage from "./page/PSRI-PoliceStationRecordIntelligence";
import CoRIPage from "./page/CoRI-CourtRecordIntelligence";
import PORIPage from "./page/PORI-PostOfficeRecordIntelligence";
import TGRIPage from "./page/TGRI-TollGateRecordIntelligence";
import GHLRIPage from "./page/GHLRI-GuestHouse&LodgeRecordIntelligence";
import PPRIPage from "./page/PPRI-PetrolPumpRecordIntelligence";
import RIIPage from "./page/RII-RailwayInformationIntelligence";
import PCRIPage from "./page/PCRI-PINCodeRecordIntelligence";
import CRIPage from "./page/CRI-CompanyRegistrationIntelligence";
import MDRIPage from "./page/MDRI-MedicalDataRecordIntelligence";
import AboutUsPage from "./page/AboutUs";
import AccountSettingPage from "./page/AccountSetting";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);

  const query = searchQuery.trim().toLowerCase();

  const filteredMainTools = useMemo(() => {
    if (!query) return NEXORA_MODULES;
    const terms = query.split(/\s+/).filter(Boolean);
    return NEXORA_MODULES.filter(parent => {
      const text = `${parent.name || ''} ${parent.title || ''} ${parent.description || ''} ${parent.id || ''}`.toLowerCase();
      return terms.every(term => text.includes(term));
    });
  }, [query]);

  const filteredSubTools = useMemo(() => {
    if (!query) return [];
    const terms = query.split(/\s+/).filter(Boolean);
    return ALL_SUB_TOOLS.filter(tool => {
      const text = `${tool.name || ''} ${tool.title || ''} ${tool.fullName || ''} ${tool.desc || ''} ${tool.description || ''} ${tool.id || ''} ${tool.parentId || ''}`.toLowerCase();
      return terms.every(term => text.includes(term));
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setSearchQuery(''); // clear search on navigation
    if (tool.parentId) {
      // It's an inner card!
      window.history.pushState({ page: tool.parentId, subPage: tool.id }, '', `#${tool.parentId}/${tool.id}`);
      setSelectedPage(tool.parentId);
    } else {
      // It's a main module
      const pageId = tool.name === "Intelligence Modules" ? "IntelligenceModules" : tool.name === "About Us" ? "AboutUs" : tool.name === "Account Setting" ? "AccountSetting" : tool.name;
      window.history.pushState({ page: pageId }, '', `#${pageId}`);
      setSelectedPage(pageId);
    }
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (window.history.state && window.history.state.page) {
      window.history.back();
    } else if (window.location.hash) {
      window.history.back();
    } else {
      setSelectedPage(null);
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    const handlePopState = (event) => {
      scrollToTop();
      if (event.state && event.state.page) {
        setSelectedPage(event.state.page);
      } else {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          const parts = hash.split('/');
          setSelectedPage(parts[0]);
        } else {
          setSelectedPage(null);
        }
      }
    };

    const handleHashChange = () => {
      scrollToTop();
    };

    // Check initial location hash on mount
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      const parts = initialHash.split('/');
      setSelectedPage(parts[0]);
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Touch Swipe-Right Gesture Handler (Mobile Back Swipe)
  useEffect(() => {
    if (selectedPage === null) return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = Math.abs(endY - startY);

        // Swipe right from left edge (< 80px) or horizontal swipe (> 110px) with low vertical movement (< 60px)
        if (deltaX > 70 && deltaY < 60 && (startX < 80 || deltaX > 110)) {
          handleBack();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [selectedPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 20);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedPage]);

  useGSAP(() => {
    // Revert existing scroll triggers before creating new ones to prevent duplication on re-renders
    ScrollTrigger.getAll().forEach(t => t.kill());

    // 1. Pin the background watermark for ALL pages (Main Page & Sub-pages like CDR, SDR, etc.)
    ScrollTrigger.create({
      trigger: "#cards-container",
      pin: "#watermark-bg",
      start: "top top",
      end: "bottom bottom",
      pinSpacing: false,
      pinType: "fixed",
      anticipatePin: 1,
    });

    // 2. Symmetric butter-smooth card shrink & fade animation for ALL pages EXCEPT AccountSetting
    if (selectedPage !== 'AccountSetting') {
      const cards = gsap.utils.toArray('.tool-card-gsap');
      cards.forEach((card) => {
        gsap.to(card, {
          opacity: 0,
          scale: 0.6,
          y: -15,
          transformOrigin: "center top",
          ease: "sine.inOut", // Symmetric easing curve for fluid motion in both directions!
          scrollTrigger: {
            trigger: card,
            start: "top 50px",  // Starts shrinking near header boundary
            end: "top -30px",   // Fully disappears under top header
            scrub: 0.5,         // 0.5s Physics inertia cushion for smooth direction reversal
          }
        });
      });
    }

    if (selectedPage === null) {
      // 3. Animate cards entry dynamically on main page
      const mainCards = gsap.utils.toArray('.tool-card-gsap');
      if (mainCards.length > 0) {
        gsap.fromTo(mainCards,
          {
            x: (index) => {
              const row = Math.floor(index / 4);
              return row % 2 === 0 ? -120 : 120;
            },
            y: 0,
            opacity: 0,
            scale: 0.96
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.05,
            ease: "expo.out",
            force3D: true,
            scrollTrigger: {
              trigger: "#cards-container",
              start: "top 80%",
              end: "bottom top",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }
  }, { dependencies: [selectedPage, query] }); // hook depends on route and search query changes

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-slate-900 selection:text-white bg-[#f0f6ff] w-full max-w-full">
      {/* GLOBAL HEADER */}
      <GlobalHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* MAIN CONTENT AREA WITH ASHOK STAMBH WATERMARK */}
      <div id="cards-container" className={`flex-1 flex flex-col w-full relative overflow-hidden ${selectedPage !== null ? 'min-h-[125vh]' : ''}`}>
        {/* Ashok Stambh Watermark - GPU Accelerated */}
        <div id="watermark-bg" className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none select-none flex items-start justify-center" style={{ willChange: 'transform' }}>
          <div className="h-screen w-full flex items-center justify-center p-4 sm:p-8 overflow-hidden">
            <img
              src="/image.png"
              alt="Ashok Stambh Watermark"
              className={`w-auto max-w-[92vw] object-contain opacity-[0.15] filter drop-shadow-sm transition-[max-height] duration-500 ${selectedPage === 'KYCDI'
                ? 'h-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[550px]'
                : 'h-full max-h-[580px] sm:max-h-[780px] md:max-h-[950px] lg:max-h-[1100px]'
                }`}
            />
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col w-full">
          <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 lg:py-10 flex flex-col min-h-[calc(100vh-160px)]">
            {selectedPage === null ? (
              query && filteredMainTools.length === 0 && filteredSubTools.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-in flex-1" style={{ animation: 'fadeIn 0.4s ease-out forwards' }}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1e2a52] mb-1 sm:mb-2 text-center">No matching intelligence modules found</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium text-center">Try adjusting your search query.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-8 flex-1">
                  {/* Top-Level Categories */}
                  {(!query || filteredMainTools.length > 0) && (
                    <div>
                      {query && <h2 className="text-xl font-bold text-[#1e2a52] mb-4">Main Categories</h2>}
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                        {filteredMainTools.map((tool, index) => (
                          <div className="tool-card-gsap" key={tool.name}>
                            <ToolCard tool={tool} index={index} onClick={handleToolClick} disableCssAnimation={true} />
                          </div>
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
                          <div className="tool-card-gsap" key={`${tool.parentId}-${tool.id}`}>
                            <ToolCard tool={tool} index={index} onClick={handleToolClick} disableCssAnimation={true} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
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
                                : selectedPage === "BSAR" ? <BSARPage onBack={handleBack} searchQuery={searchQuery} />
                                  : selectedPage === "BRI" ? <BRIPage onBack={handleBack} searchQuery={searchQuery} />
                                    : selectedPage === "RTOI" ? <RTOIPage onBack={handleBack} searchQuery={searchQuery} />
                                      : selectedPage === "PRI" ? <PRIPage onBack={handleBack} searchQuery={searchQuery} />
                                        : selectedPage === "LIH" ? <LIHPage onBack={handleBack} searchQuery={searchQuery} />
                                          : selectedPage === "BI" ? <BIPage onBack={handleBack} searchQuery={searchQuery} />
                                            : selectedPage === "FRI" ? <FRIPage onBack={handleBack} searchQuery={searchQuery} />
                                              : selectedPage === "LRI" ? <LRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                : selectedPage === "ERI" ? <ERIPage onBack={handleBack} searchQuery={searchQuery} />
                                                  : selectedPage === "KYCDI" ? <KYCDIPage onBack={handleBack} searchQuery={searchQuery} />
                                                    : selectedPage === "PSRI" ? <PSRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                      : selectedPage === "CoRI" ? <CoRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                        : selectedPage === "PORI" ? <PORIPage onBack={handleBack} searchQuery={searchQuery} />
                                                          : selectedPage === "TGRI" ? <TGRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                            : selectedPage === "GHLRI" ? <GHLRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                              : selectedPage === "PPRI" ? <PPRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                : selectedPage === "RII" ? <RIIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                  : selectedPage === "PCRI" ? <PCRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                    : selectedPage === "CRI" ? <CRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                      : selectedPage === "MDRI" ? <MDRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                        : selectedPage === "AboutUs" ? <AboutUsPage onBack={handleBack} searchQuery={searchQuery} />
                                                                          : selectedPage === "AccountSetting" ? <AccountSettingPage onBack={handleBack} searchQuery={searchQuery} />
                                                                            : null
            }
          </main>
        </div>
      </div>

      {/* GLOBAL FOOTER */}
      <GlobalFooter pageName="NEXORA INTELLIGENCE" audience="Law Enforcement & Security Agencies" />
    </div>
  );
}
