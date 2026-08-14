/**
 * @file App.jsx
 * @description Root application component for Nexora Intelligence Platform.
 */
import React, { useState, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStickyNavAnimation } from './components/useStickyNavAnimation';

import laptopWatermark from './assets/WaterMark.png';
import phoneWatermark from './assets/PhoneWaterMark.png';
import { useActivityTracker } from './context/ActivityTrackerContext';

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*  Layout Components                                                          */
/* -------------------------------------------------------------------------- */
import ToolCard, { Header as GlobalHeader, Footer as GlobalFooter } from './components/nexora';
import NexoraAgent from './components/Agent/NexoraAgent';

/* -------------------------------------------------------------------------- */
/*  Home Dashboard Data                                                        */
/* -------------------------------------------------------------------------- */
import { NEXORA_MODULES } from './data/nexora';  // 40 top-level category cards
import { ALL_SUB_TOOLS } from './data/subTools'; // All extracted sub-category cards
import PlatformSettingsPage from './page/PlatformSettingsPage';
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
import LoginPage from "./page/LoginPage";
import { motion } from 'framer-motion';
import { VoiceProvider } from './page/PlatformSettings/VoiceAssistantPage';
import { Lock, AlertTriangle, Key, ArrowRight } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });

  const [globalLayoutSettings, setGlobalLayoutSettings] = useState(null);

  // Module Lock State
  const [moduleLockConfig, setModuleLockConfig] = useState(null);
  const [unlockedModules, setUnlockedModules] = useState([]);

  // Zoom State
  const [zoomSettings, setZoomSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_zoom_settings_v1');
      return saved ? JSON.parse(saved) : { zoomLevel: 100, autoScaling: true };
    } catch (e) { return { zoomLevel: 100, autoScaling: true }; }
  });

  useEffect(() => {
    const loadLocks = () => {
      try {
        const saved = localStorage.getItem('nexora_module_lock_v1');
        if (saved) setModuleLockConfig(JSON.parse(saved));
        else setModuleLockConfig(null);
      } catch (e) {}
    };
    const loadZoom = () => {
      try {
        const saved = localStorage.getItem('nexora_zoom_settings_v1');
        if (saved) setZoomSettings(JSON.parse(saved));
        else setZoomSettings({ zoomLevel: 100, autoScaling: true });
      } catch (e) {}
    };

    loadLocks();
    loadZoom();
    window.addEventListener('storage', loadLocks);
    window.addEventListener('securityUpdate', loadLocks);
    window.addEventListener('storage', loadZoom);
    window.addEventListener('zoomUpdate', loadZoom);
    return () => {
      window.removeEventListener('storage', loadLocks);
      window.removeEventListener('securityUpdate', loadLocks);
      window.removeEventListener('storage', loadZoom);
      window.removeEventListener('zoomUpdate', loadZoom);
    };
  }, []);

  const getLockedPageId = (pageId, subPageId) => {
    if (!moduleLockConfig?.globalLockEnabled) return false;
    
    if (subPageId && !unlockedModules.includes(subPageId) && moduleLockConfig.lockedModules?.[subPageId]?.locked) {
      return subPageId;
    }
    
    if (pageId && !unlockedModules.includes(pageId) && moduleLockConfig.lockedModules?.[pageId]?.locked) {
      return pageId;
    }
    
    return false;
  };

  const LockScreen = ({ pageId, onUnlock }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const lockData = moduleLockConfig.lockedModules[pageId];
      const expectedPassword = (lockData && !lockData.useDefault) ? lockData.customPassword : moduleLockConfig.defaultPassword;
      
      if (password === expectedPassword) {
        onUnlock(pageId);
      } else {
        setError('Incorrect password. Access denied.');
        setPassword('');
      }
    };

    return (
      <div className="flex-1 flex flex-col items-center justify-start sm:justify-center pt-8 sm:pt-20 pb-16 sm:pb-32 px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md w-full animate-fade-in text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>
          <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-rose-100">
            <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Access Restricted</h2>
          <p className="text-sm text-slate-500 font-medium mb-8">
            The <strong className="text-slate-800">{pageId}</strong> module is locked. Please enter the required password to gain access to this section.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter password..."
                autoFocus
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 transition-all outline-none"
              />
            </div>

            {error && (
              <p className="text-xs font-bold text-rose-500 flex items-center justify-center gap-1.5 animate-shake">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </p>
            )}

            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <span>Unlock Module</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const loadLayout = () => {
      try {
        const saved = localStorage.getItem('nexora_layout_settings_v1_Dashboard');
        if (saved) {
          setGlobalLayoutSettings(JSON.parse(saved));
        } else {
          setGlobalLayoutSettings(null);
        }
      } catch (e) {}
    };
    
    loadLayout();
    window.addEventListener('storage', loadLayout);
    window.addEventListener('layoutUpdate', loadLayout);
    return () => {
      window.removeEventListener('storage', loadLayout);
      window.removeEventListener('layoutUpdate', loadLayout);
    };
  }, []);

  // Initialize Global Accessibility Settings
  useEffect(() => {
    const applyAccessibility = () => {
      try {
        const saved = localStorage.getItem('nexora_accessibility_settings_v1');
        if (saved) {
          const settings = JSON.parse(saved);
          const root = document.documentElement;
          
          const isEnabled = settings.visualDisplayEnabled ?? true;

          if (!isEnabled) {
            root.style.fontSize = '16px';
            root.style.setProperty('--text-scale', '1');
            root.style.letterSpacing = 'normal';
            root.style.filter = 'none';
          } else {
            if (settings.textSize === 'Small') {
              root.style.fontSize = '14px';
              root.style.setProperty('--text-scale', '0.875');
            } else if (settings.textSize === 'Large') {
              root.style.fontSize = '18px';
              root.style.setProperty('--text-scale', '1.125');
            } else if (settings.textSize === 'Extra Large') {
              root.style.fontSize = '20px';
              root.style.setProperty('--text-scale', '1.25');
            } else {
              root.style.fontSize = '16px'; // Medium
              root.style.setProperty('--text-scale', '1');
            }

            if (settings.letterSpacing === 'Wide') root.style.letterSpacing = '0.05em';
            else if (settings.letterSpacing === 'Extra Wide') root.style.letterSpacing = '0.1em';
            else root.style.letterSpacing = 'normal'; // Normal

            if (settings.highContrast) root.style.filter = 'contrast(125%) saturate(1.1)';
            else root.style.filter = 'none';
          }
        }
      } catch (e) {}
    };

    applyAccessibility();
    window.addEventListener('storage', applyAccessibility);
    window.addEventListener('accessibilityUpdate', applyAccessibility);
    return () => {
      window.removeEventListener('storage', applyAccessibility);
      window.removeEventListener('accessibilityUpdate', applyAccessibility);
    };
  }, []);

  // Initialize Global Animation Settings
  useEffect(() => {
    const applyAnimationSettings = () => {
      try {
        const saved = localStorage.getItem('nexora_animation_settings_v1');
        let styleTag = document.getElementById('nexora-animation-overrides');
        
        if (!styleTag) {
          styleTag = document.createElement('style');
          styleTag.id = 'nexora-animation-overrides';
          document.head.appendChild(styleTag);
        }

        if (saved) {
          const settings = JSON.parse(saved);
          let cssRules = '';
          
          if (settings.enableAnimations === false) {
            cssRules += `
              *, *::before, *::after {
                animation-duration: 0.001ms !important;
                animation-delay: 0s !important;
              }
            `;
          }
          
          if (settings.enableTransitions === false) {
            cssRules += `
              *, *::before, *::after {
                transition-duration: 0.001ms !important;
                transition-delay: 0s !important;
              }
            `;
          }
          
          if (settings.enableHoverEffects === false) {
            cssRules += `
              [class*="hover:"]:hover {
                transform: none !important;
                box-shadow: none !important;
              }
            `;
          }
          
          styleTag.innerHTML = cssRules;
        } else {
          styleTag.innerHTML = '';
        }
      } catch (e) {
        console.warn('Failed to apply animation settings:', e);
      }
    };

    applyAnimationSettings();
    window.addEventListener('storage', applyAnimationSettings);
    window.addEventListener('animationUpdate', applyAnimationSettings);
    return () => {
      window.removeEventListener('storage', applyAnimationSettings);
      window.removeEventListener('animationUpdate', applyAnimationSettings);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);
  const [activeSubPage, setActiveSubPage] = useState(null);

  // Intercept pushState so App.jsx knows when inner pages navigate
  useEffect(() => {
    const originalPushState = window.history.pushState;
    window.history.pushState = function(state, title, url) {
      originalPushState.apply(this, arguments);
      if (state && state.page) {
        setSelectedPage(state.page);
        setActiveSubPage(state.subPage || null);
      }
    };
    
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setSelectedPage(event.state.page);
        setActiveSubPage(event.state.subPage || null);
      } else {
        setSelectedPage(null);
        setActiveSubPage(null);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.history.pushState = originalPushState;
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const { trackLocation, stopMainSession } = useActivityTracker();

  useEffect(() => {
    if (!isAuthenticated) return;
    
    trackLocation(selectedPage, activeSubPage);
    
    return () => {
      stopMainSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPage, activeSubPage, isAuthenticated]);
  const getColsForWidth = (w) => {
    if (w < 768) return 2;
    return 4;
  };

  const [layoutConfig, setLayoutConfig] = useState(() => ({
    cols: typeof window !== 'undefined' ? getColsForWidth(window.innerWidth) : 4,
    chunkSize: 16
  }));

  useEffect(() => {
    const handleResize = () => {
      const currentCols = getColsForWidth(window.innerWidth);
      setLayoutConfig(prev => prev.cols === currentCols ? prev : { ...prev, cols: currentCols });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainRef = React.useRef(null);
  const scrollPositions = React.useRef({});
  const isNavigatingBack = React.useRef(false);

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
      setActiveSubPage(null);
      window.history.pushState(null, '', '#Home');
    }
  };

  const handleToolClick = (tool) => {
    // Save current scroll position before navigating
    scrollPositions.current[selectedPage || 'home'] = document.getElementById('main-scroll-container')?.scrollTop || 0;
    isNavigatingBack.current = false;
    
    setSearchQuery(''); // clear search on navigation
    if (tool.parentId) {
      // It's an inner card!
      window.history.pushState({ page: tool.parentId, subPage: tool.id }, '', `#${tool.parentId}/${tool.id}`);
      setSelectedPage(tool.parentId);
      setActiveSubPage(tool.id);
    } else {
      // It's a main module
      const pageId = tool.name === "Intelligence Modules" ? "IntelligenceModules" : tool.name === "About Us" ? "AboutUs" : tool.name === "Account Setting" ? "AccountSetting" : tool.name;
      window.history.pushState({ page: pageId, subPage: null }, '', `#${pageId}`);
      setSelectedPage(pageId);
      setActiveSubPage(null);
    }
  };

  const handleHeaderIconClick = (id) => {
    scrollPositions.current[selectedPage || 'home'] = document.getElementById('main-scroll-container')?.scrollTop || 0;
    isNavigatingBack.current = false;
    setSearchQuery('');
    
    if (id === 'DashboardSettings') {
      window.history.pushState({ page: 'PlatformSettings', subPage: 'layout' }, '', '#PlatformSettings/layout');
      setSelectedPage('PlatformSettings');
      setActiveSubPage('layout');
      return;
    }

    window.history.pushState({ page: id, subPage: null }, '', `#${id}`);
    setSelectedPage(id);
    setActiveSubPage(null);
  };

  const handleBack = () => {
    if (window.history.length > 1 && (window.history.state?.page || window.location.hash)) {
      window.history.back();
    } else {
      isNavigatingBack.current = true;
      setSelectedPage(null);
      window.history.pushState(null, '', '#Home');
    }
  };

  useEffect(() => {
    if (selectedPage) {
      const pageName = selectedPage.replace(/([A-Z])/g, ' $1').trim();
      document.title = `${pageName} - NEXORA Intelligence`;
    } else {
      document.title = "NEXORA — Advanced Intelligence & Investigation Records Platform";
    }
  }, [selectedPage]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const getPageFromHash = (hashString) => {
      const hash = hashString.replace('#', '');
      if (!hash || hash === 'Home') return null;
      let pageId = hash.split('/')[0];
      if (pageId.startsWith('AboutUs-')) {
        return 'AboutUs';
      }
      if (pageId.startsWith('AccountSetting-')) {
        return 'AccountSetting';
      }
      return pageId;
    };

    const handlePopState = (event) => {
      isNavigatingBack.current = true;
      if (event.state && event.state.page) {
        setSelectedPage(event.state.page);
        setActiveSubPage(event.state.subPage || null);
      } else {
        const hashStr = window.location.hash.replace('#', '');
        setSelectedPage(getPageFromHash(window.location.hash));
        setActiveSubPage(hashStr.split('/')[1] || null);
      }
    };

    const handleHashChange = () => {
      // Handled primarily by popstate
    };

    // Check initial location hash on mount
    const initialPage = getPageFromHash(window.location.hash);
    const initialHash = window.location.hash.replace('#', '');
    const initialSubPage = initialHash.split('/')[1] || null;
    if (!initialPage && window.location.hash !== '#Home') {
      window.history.replaceState(null, '', '#Home');
    }
    setSelectedPage(initialPage);
    setActiveSubPage(initialSubPage);

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
    const handleForceScroll = (e) => {
      const targetScroll = e.detail || 0;
      const setScroll = () => {
        const container = document.getElementById('main-scroll-container');
        if (container) container.scrollTo({ top: targetScroll, left: 0, behavior: 'instant' });
      };
      setScroll();
      setTimeout(setScroll, 20);
      setTimeout(setScroll, 100);
    };
    window.addEventListener('app:forceScroll', handleForceScroll);
    return () => window.removeEventListener('app:forceScroll', handleForceScroll);
  }, []);

  useEffect(() => {
    // Restore scroll position when navigating back, including for the home page.
    const targetScroll = isNavigatingBack.current ? (scrollPositions.current[selectedPage || 'home'] || 0) : 0;
    
    const setScroll = () => {
      const container = document.getElementById('main-scroll-container');
      if (container) container.scrollTo({ top: targetScroll, left: 0, behavior: 'instant' });
    };

    setScroll();
    
    const timer = setTimeout(setScroll, 20);
    const timer2 = setTimeout(setScroll, 100);
    
    isNavigatingBack.current = false;
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [selectedPage]);

  useEffect(() => {
    if (searchQuery) {
      const container = document.getElementById('main-scroll-container');
      if (container) container.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [searchQuery]);

  useStickyNavAnimation({
    selectedPage,
    layoutConfig,
    query: searchQuery,
    scopeRef: mainRef,
    isAuthenticated
  });

  const handleLoginSuccess = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <VoiceProvider>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      ref={mainRef} 
      className="min-h-screen flex flex-col font-sans selection:bg-slate-900 selection:text-white bg-[#f0f6ff] w-full max-w-full"
    >
      {/* Ashok Stambh Global Watermark */}
      <div id="watermark-bg" className="fixed top-0 left-0 w-full h-[100vh] z-0 pointer-events-none select-none">
        <div className="w-full h-full overflow-hidden">
          {/* Desktop Watermark */}
          <img
            src={laptopWatermark}
            alt="Global Background Desktop"
            className="hidden md:block w-full h-full object-cover opacity-20 filter drop-shadow-sm"
          />
          {/* Mobile Watermark */}
          <img
            src={phoneWatermark}
            alt="Global Background Mobile"
            className="block md:hidden w-full h-full object-contain object-bottom opacity-20 filter drop-shadow-sm"
          />
        </div>
      </div>

      {/* GLOBAL HEADER */}
      <GlobalHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onHeaderIconClick={handleHeaderIconClick}
        selectedPage={selectedPage}
        onHomeClick={() => {
          setSelectedPage(null);
          window.history.pushState(null, '', '#Home');
        }}
      />

      {/* STICKY ICON NAV (Populated row by row as cards fly into it) */}
      <div id="sticky-icon-nav" className={`fixed top-0 left-0 w-full bg-transparent border-b border-transparent z-40 pointer-events-none transition-colors duration-300 ${selectedPage !== null ? 'hidden' : ''}`}>
        <div className="w-full max-h-[140px] sm:max-h-[170px] overflow-hidden">
          <div id="sticky-icon-nav-scroll" className="relative flex justify-between items-center px-2 sm:px-6 py-2 w-full min-h-[60px] sm:min-h-[80px]">
            {(() => {
              const { cols } = layoutConfig;
              const tools = NEXORA_MODULES;

              const leftSideCards = [];
              const rightSideCards = [];

              for (let i = 0; i < tools.length; i += cols) {
                const rowCards = tools.slice(i, i + cols);
                const mid = Math.ceil(rowCards.length / 2);

                const leftPart = rowCards.slice(0, mid);
                leftPart.reverse().forEach((tool, idx) => {
                  leftSideCards.push({ tool, originalIdx: i + (mid - 1 - idx) });
                });

                const rightPart = rowCards.slice(mid);
                rightPart.forEach((tool, idx) => {
                  rightSideCards.push({ tool, originalIdx: i + mid + idx });
                });
              }

              return (
                <>
                  {/* LEFT SIDE QUEUE - CDR at far left, then SDR, etc. */}
                  <div className="flex flex-row-reverse justify-end items-center w-1/2 overflow-hidden" style={{ gap: 0, WebkitMaskImage: 'linear-gradient(to right, black 96%, transparent 100%)', maskImage: 'linear-gradient(to right, black 96%, transparent 100%)' }}>
                    {leftSideCards.map(({ tool, originalIdx }) => {
                      const IconComp = tool.icon;
                      const isElement = React.isValidElement(tool.icon);
                      return (
                        <div key={`left-${originalIdx}`} id={`sticky-wrapper-${originalIdx}`} className="max-w-0 opacity-0 overflow-hidden shrink-0 flex items-center justify-center">
                          <div className="px-1 sm:px-2 flex items-center justify-center">
                            <div id={`sticky-icon-${originalIdx}`} className="flex flex-col items-center gap-1 min-w-[44px] sm:min-w-[50px] cursor-pointer group scale-50" onClick={() => handleToolClick(tool)}>
                              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center ${tool.bgColor || 'bg-slate-100'} ${tool.iconColor || 'text-slate-600'} transition-transform group-hover:scale-110 shadow-sm border border-slate-200/50`}>
                                {isElement ? tool.icon : typeof IconComp === 'function' ? <IconComp className="w-4 h-4 sm:w-5 sm:h-5" /> : null}
                              </div>
                              <span className="text-[calc(9px*var(--text-scale,1))] sm:text-[calc(10px*var(--text-scale,1))] font-bold text-slate-700 uppercase tracking-wide group-hover:text-red-600">{tool.id || tool.name.substring(0, 5)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* RIGHT SIDE QUEUE - ILD at far right, then TDR, etc. */}
                  <div className="flex flex-row justify-end items-center w-1/2 overflow-hidden" style={{ gap: 0, WebkitMaskImage: 'linear-gradient(to left, black 96%, transparent 100%)', maskImage: 'linear-gradient(to left, black 96%, transparent 100%)' }}>
                    {rightSideCards.map(({ tool, originalIdx }) => {
                      const IconComp = tool.icon;
                      const isElement = React.isValidElement(tool.icon);
                      return (
                        <div key={`right-${originalIdx}`} id={`sticky-wrapper-${originalIdx}`} className="max-w-0 opacity-0 overflow-hidden shrink-0 flex items-center justify-center">
                          <div className="px-1 sm:px-2 flex items-center justify-center">
                            <div id={`sticky-icon-${originalIdx}`} className="flex flex-col items-center gap-1 min-w-[44px] sm:min-w-[50px] cursor-pointer group scale-50" onClick={() => handleToolClick(tool)}>
                              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center ${tool.bgColor || 'bg-slate-100'} ${tool.iconColor || 'text-slate-600'} transition-transform group-hover:scale-110 shadow-sm border border-slate-200/50`}>
                                {isElement ? tool.icon : typeof IconComp === 'function' ? <IconComp className="w-4 h-4 sm:w-5 sm:h-5" /> : null}
                              </div>
                              <span className="text-[calc(9px*var(--text-scale,1))] sm:text-[calc(10px*var(--text-scale,1))] font-bold text-slate-700 uppercase tracking-wide group-hover:text-red-600">{tool.id || tool.name.substring(0, 5)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div id="cards-container" style={{ zoom: `${zoomSettings.zoomLevel}%` }} className={`flex-1 flex flex-col w-full relative overflow-hidden`}>
        <div className="relative z-10 flex-1 flex flex-col w-full">
          <main className={`flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-6 flex flex-col ${selectedPage === null ? 'min-h-[calc(100vh-160px)] pt-16 sm:pt-20 lg:pt-24 pb-10 md:pb-16' : 'pt-2 sm:pt-4'}`}>
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
                      {(() => {
                        let dynamicGridClass = 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4';
                        let displayTools = [...filteredMainTools];
                        
                        if (globalLayoutSettings) {
                          if (globalLayoutSettings.arrangement === 'List') {
                            dynamicGridClass = 'grid-cols-1';
                          } else {
                            const cols = globalLayoutSettings.gridColumns || 4;
                            if (cols === 2) dynamicGridClass = 'grid-cols-2';
                            else if (cols === 3) dynamicGridClass = 'grid-cols-3';
                            else if (cols === 4) dynamicGridClass = 'grid-cols-4';
                          }
                          
                          // Reorder based on layout settings
                          if (globalLayoutSettings.cards && Array.isArray(globalLayoutSettings.cards)) {
                            const savedCardIds = globalLayoutSettings.cards.map(c => c.id);
                            displayTools.sort((a, b) => {
                              const aId = a.id || a.name;
                              const bId = b.id || b.name;
                              const aIndex = savedCardIds.indexOf(aId);
                              const bIndex = savedCardIds.indexOf(bId);
                              
                              if (aIndex === -1 && bIndex === -1) return 0;
                              if (aIndex === -1) return 1;
                              if (bIndex === -1) return -1;
                              return aIndex - bIndex;
                            });
                          }
                        }
                        
                        return (
                          <div className={`grid ${dynamicGridClass} gap-3 sm:gap-4 md:gap-5`}>
                            {displayTools.map((tool, index) => (
                          <div className="tool-card-gsap" key={tool.name}>
                            <ToolCard tool={tool} index={index} onClick={handleToolClick} disableCssAnimation={true} />
                          </div>
                        ))}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Sub-Tools */}
                  {query && filteredSubTools.length > 0 && (
                    <div className="mt-4 pt-6 border-t border-slate-200">
                      <h2 className="text-xl font-bold text-[#1e2a52] mb-4">Inner Intelligence Tools</h2>
                      {(() => {
                        let dynamicGridClass = 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4';
                        if (globalLayoutSettings) {
                          if (globalLayoutSettings.arrangement === 'List') {
                            dynamicGridClass = 'grid-cols-1';
                          } else {
                            const cols = globalLayoutSettings.gridColumns || 4;
                            if (cols === 2) dynamicGridClass = 'grid-cols-2';
                            else if (cols === 3) dynamicGridClass = 'grid-cols-3';
                            else if (cols === 4) dynamicGridClass = 'grid-cols-4';
                          }
                        }
                        return (
                          <div className={`grid ${dynamicGridClass} gap-3 sm:gap-4 md:gap-5`}>
                            {filteredSubTools.map((tool, index) => (
                          <div className="tool-card-gsap" key={`${tool.parentId}-${tool.id}`}>
                            <ToolCard tool={tool} index={index} onClick={handleToolClick} disableCssAnimation={true} />
                          </div>
                        ))}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )
            ) : getLockedPageId(selectedPage, activeSubPage) ? (
               <LockScreen pageId={getLockedPageId(selectedPage, activeSubPage)} onUnlock={(id) => setUnlockedModules(prev => [...prev, id])} />
            ) : selectedPage === "PlatformSettings" ? <PlatformSettingsPage onBack={handleBack} />
              : selectedPage === "CDR" ? <CDRPage onBack={handleBack} searchQuery={searchQuery} />
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
      <NexoraAgent onNavigateToModule={handleHeaderIconClick} />
    </motion.div>
    </VoiceProvider>
  );
}
