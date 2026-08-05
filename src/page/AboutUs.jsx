import { ABOUTUS_TOOLS } from '../data/subTools';
import React, { useState, useEffect } from 'react';
import ToolCard from '../components/nexora';
import AU1Page from './AboutUs/AU1-IntroductiontoNEXORA';
import AU2Page from './AboutUs/AU2-PurposeofNEXORA';
import AU3Page from './AboutUs/AU3-ObjectivesofNEXORA';
import AU4Page from './AboutUs/AU4-VisionofNEXORA';
import AU5Page from './AboutUs/AU5-MissionofNEXORA';
import AU6Page from './AboutUs/AU6-CoreValuesofNEXORA';
import AU7Page from './AboutUs/AU7-HistoryofNEXORA';
import AU8Page from './AboutUs/AU8-KeyFeaturesofNEXORA';
import AU9Page from './AboutUs/AU9-CoreIntelligenceModulesofNEXORA';
import AU10Page from './AboutUs/AU10-InvestigationCapabilitiesofNEXORA';
import AU11Page from './AboutUs/AU11-TechnologyStackofNEXORA';
import AU12Page from './AboutUs/AU12-SecurityFrameworkofNEXORA';
import AU13Page from './AboutUs/AU13-AIAnalyticsinNEXORA';
import AU14Page from './AboutUs/AU14-SearchIntelligenceEngine';
import AU15Page from './AboutUs/AU15-ReportingVisualization';
import AU16Page from './AboutUs/AU16-BenefitsofNEXORA';
import AU17Page from './AboutUs/AU17-TargetUsersofNEXORA';
import AU18Page from './AboutUs/AU18-IndustriesDepartmentsServed';
import AU19Page from './AboutUs/AU19-InvestigationWorkflow';
import AU20Page from './AboutUs/AU20-SystemIntegrations';
import AU21Page from './AboutUs/AU21-ScalabilityPerformance';
import AU22Page from './AboutUs/AU22-ResearchInnovation';
import AU23Page from './AboutUs/AU23-FutureRoadmapofNEXORA';
import AU24Page from './AboutUs/AU24-WhyChooseNEXORA';
import AU25Page from './AboutUs/AU25-OurCommitment';
import AU26Page from './AboutUs/AU26-SuccessStoriesAchievements';
import AU27Page from './AboutUs/AU27-PartnersCollaborations';
import AU28Page from './AboutUs/AU28-CertificationsStandards';
import AU29Page from './AboutUs/AU29-SupportServices';
import AU30Page from './AboutUs/AU30-ContactNEXORA';
import AU31Page from './AboutUs/AU31-AboutDEMO1';
import AU32Page from './AboutUs/AU32-AboutDEMO2';

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
 * Main Page Component.
 * Handles the display, routing, and user interactions for this specific intelligence record.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.onBack - Callback function triggered when the user clicks the "Back" button to return to the parent dashboard.
 * @returns {JSX.Element} The rendered page layout.
 */
export default function AboutUsPage({ onBack }) {

  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handlePopState = (event) => {
      if (event.state && event.state.subPage) {
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
    window.history.pushState({ page: 'AboutUs', subPage: id }, '', '#AboutUs-' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };


  if (selectedSubPage === 'au1') return <AU1Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au2') return <AU2Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au3') return <AU3Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au4') return <AU4Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au5') return <AU5Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au6') return <AU6Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au7') return <AU7Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au8') return <AU8Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au9') return <AU9Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au10') return <AU10Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au11') return <AU11Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au12') return <AU12Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au13') return <AU13Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au14') return <AU14Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au15') return <AU15Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au16') return <AU16Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au17') return <AU17Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au18') return <AU18Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au19') return <AU19Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au20') return <AU20Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au21') return <AU21Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au22') return <AU22Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au23') return <AU23Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au24') return <AU24Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au25') return <AU25Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au26') return <AU26Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au27') return <AU27Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au28') return <AU28Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au29') return <AU29Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au30') return <AU30Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au31') return <AU31Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'au32') return <AU32Page onBack={handleSubPageBack} />;

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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {ABOUTUS_TOOLS.map((tool, index) => (
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
