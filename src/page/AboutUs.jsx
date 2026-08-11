import { ABOUTUS_TOOLS } from '../data/subTools';
import React, { useState, useEffect } from 'react';
import ToolCard from '../components/nexora';
import { usePageLayout } from '../components/usePageLayout';

// The 14 Integrated Pages
import IntroductionPage from './AboutUs/IntroductionPage';
import PurposePage from './AboutUs/PurposePage';
import ObjectivePage from './AboutUs/ObjectivePage';
import VisionPage from './AboutUs/VisionPage';
import MissionPage from './AboutUs/MissionPage';
import CapabilitiesPage from './AboutUs/CapabilitiesPage';
import TechnologyPage from './AboutUs/TechnologyPage';
import BenefitsPage from './AboutUs/BenefitsPage';
import TargetUserPage from './AboutUs/TargetUserPage';
import WhyChoosePage from './AboutUs/WhyChoosePage';
import CommitmentPage from './AboutUs/CommitmentPage';
import SupportPage from './AboutUs/SupportPage';
import RoadmapPage from './AboutUs/RoadmapPage';
import ContactPage from './AboutUs/ContactPage';

// The 10 New Integrated Pages
import WhoWeArePage from './AboutUs/WhoWeArePage';
import OurCoreValuesPage from './AboutUs/OurCoreValuesPage';
import AIInnovationPage from './AboutUs/AIInnovationPage';
import WorkFlowAutomationPage from './AboutUs/WorkFlowAutomationPage';
import ResearchDevelopmentPage from './AboutUs/ResearchDevelopmentPage';
import QualityAssurancePage from './AboutUs/QualityAssurancePage';
import PerformanceReliabilityPage from './AboutUs/PerformanceReliabilityPage';
import DataProtectionPage from './AboutUs/DataProtectionPage';
import ProductStatisticPage from './AboutUs/ProductStatisticPage';
import GlobalPresencePage from './AboutUs/GlobalPresencePage';

/**
 * Header Component.
 * Renders the title and a brief description of the page's purpose.
 */
export function Header({ title, description }) {
  const displayTitle = title || "About Us";
  const displayDesc = description || "Learn more about Nexora platform architecture, intelligence capabilities & mission.";

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
 * Generic Placeholder Component for unimplemented pages
 */
function ComingSoonPage({ onBack, id }) {
  const tool = ABOUTUS_TOOLS.find(t => t.id === id);
  const title = tool ? tool.name : 'Coming Soon';
  
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  
  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4">
      {onBack && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm">
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}
      <Header title={title} description={`Analytics and data records for ${title}.`} />
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-4 overflow-x-hidden">
        <main className="flex-1 pt-1 pb-4 bg-transparent">
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: '0.2s' }}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(37,99,235,0.12)] border border-blue-200/50">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1e2a52] to-blue-800 mb-3 sm:mb-4 tracking-tight drop-shadow-sm text-center">
              Coming Soon
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium text-center max-w-lg leading-relaxed">
              We are actively developing powerful new analytics tools for {title}. These features will be available in the next major update.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

/**
 * Main Page Component.
 */
export default function AboutUsPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('about-us', ABOUTUS_TOOLS);

  const [selectedSubPage, setSelectedSubPage] = useState(null);
  const scrollPosRef = React.useRef(0);
  const isNavigatingBack = React.useRef(false);

  useEffect(() => {
    const getSubPageFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('AboutUs-')) {
        return hash.replace('AboutUs-', '');
      } else if (hash.startsWith('AboutUs/')) {
        return hash.split('/')[1];
      }
      return null;
    };

    const handlePopState = (event) => {
      isNavigatingBack.current = true;
      if (event.state && event.state.subPage) {
        setSelectedSubPage(event.state.subPage);
      } else {
        setSelectedSubPage(getSubPageFromHash());
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    if (window.history.state && window.history.state.subPage) {
      setSelectedSubPage(window.history.state.subPage);
    } else {
      setSelectedSubPage(getSubPageFromHash());
    }
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isNavigatingBack.current) {
      if (selectedSubPage === null) {
        window.dispatchEvent(new CustomEvent('app:forceScroll', { detail: scrollPosRef.current }));
      } else {
        window.dispatchEvent(new CustomEvent('app:forceScroll', { detail: 0 }));
      }
    } else {
      window.dispatchEvent(new CustomEvent('app:forceScroll', { detail: 0 }));
    }
    isNavigatingBack.current = false;
  }, [selectedSubPage]);

  const handleSelectSubPage = (id) => {
    scrollPosRef.current = window.scrollY || document.documentElement.scrollTop;
    isNavigatingBack.current = false;
    window.history.pushState({ page: 'AboutUs', subPage: id }, '', '#AboutUs/' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    isNavigatingBack.current = true;
    if (window.history.length > 1 && window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      window.history.pushState({ page: 'AboutUs' }, '', '#AboutUs');
      setSelectedSubPage(null);
    }
  };


  if (selectedSubPage === 'au1') return <IntroductionPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au2') return <WhoWeArePage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au3') return <PurposePage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au4') return <ObjectivePage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au5') return <VisionPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au6') return <MissionPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au7') return <OurCoreValuesPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au10') return <AIInnovationPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au11') return <WorkFlowAutomationPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au12') return <CapabilitiesPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au13') return <TechnologyPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au14') return <ResearchDevelopmentPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au15') return <QualityAssurancePage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au16') return <PerformanceReliabilityPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au17') return <DataProtectionPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au18') return <BenefitsPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au19') return <ProductStatisticPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au20') return <GlobalPresencePage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au21') return <TargetUserPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au22') return <WhyChoosePage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au23') return <CommitmentPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au24') return <SupportPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au25') return <RoadmapPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au26') return <ContactPage onBack={handleSubPageBack} />;

  if (selectedSubPage && selectedSubPage.startsWith('au')) {
    return <ComingSoonPage onBack={handleSubPageBack} id={selectedSubPage} />;
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
          <div className={`grid ${dynamicGridClass} gap-2.5 sm:gap-4 md:gap-5`}>
            {displayTools.map((tool, index) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={index}
                onClick={(t) => handleSelectSubPage(t.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
