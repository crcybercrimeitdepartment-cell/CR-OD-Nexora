import { SMI_TOOLS } from '../data/subTools';
import React, { useState, useEffect } from 'react';
import {
  Users, UserCheck, MessageCircle, Share2, Camera, Hash, Briefcase, 
  Send, MessageSquare, Smartphone, PlaySquare, Globe, Heart, PhoneCall, 
  AtSign, FileText, Video
} from 'lucide-react';
import ToolCard from '../components/nexora';
import { usePageLayout } from '../components/usePageLayout';

import CIPage from "./SMI-SocialMediaIntelligence/CI-ContactIntelligence";
import PIPage from "./SMI-SocialMediaIntelligence/PI-ProfileIntelligence";
import CRIPage from "./SMI-SocialMediaIntelligence/CRI-CommunicationRegistrationIntelligence";
import FBPIPage from "./SMI-SocialMediaIntelligence/FBPI-FacebookPlatformIntelligence";
import IGIPage from "./SMI-SocialMediaIntelligence/IGI-InstagramIntelligence";
import XTIPage from "./SMI-SocialMediaIntelligence/XTI-X(Twitter)Intelligence";
import LIIPage from "./SMI-SocialMediaIntelligence/LII-LinkedInIntelligence";
import TGIPage from "./SMI-SocialMediaIntelligence/TGI-TelegramIntelligence";
import WAIPage from "./SMI-SocialMediaIntelligence/WAI-WhatsAppIntelligence";
import SCIPage from "./SMI-SocialMediaIntelligence/SCI-SnapchatIntelligence";
import YTIPage from "./SMI-SocialMediaIntelligence/YTI-YouTubeIntelligence";
import GBIPage from "./SMI-SocialMediaIntelligence/GBI-GoogleBusinessIntelligence";
import PMIPage from "./SMI-SocialMediaIntelligence/PMI-PaymentIntelligence";
import SHIPage from "./SMI-SocialMediaIntelligence/SHI-ShoppingIntelligence";
import FDIPage from "./SMI-SocialMediaIntelligence/FDI-FoodDeliveryIntelligence";
import TRIPage from "./SMI-SocialMediaIntelligence/TRI-TravelIntelligence";
import CSIPage from "./SMI-SocialMediaIntelligence/CSI-CabServiceIntelligence";
import SBIPage from "./SMI-SocialMediaIntelligence/SBI-SubscriptionIntelligence";
import MDIPage from "./SMI-SocialMediaIntelligence/MDI-MediaIntelligence";
import TLIPage from "./SMI-SocialMediaIntelligence/TLI-TimelineIntelligence";

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
  const displayTitle = title || "Social Media Intelligence";
  const displayDesc = description || "Correlate profiles and map social graphs across platforms. Extract actionable intelligence from digital interactions, public posts, and network connections. Identify key influencers, uncover hidden affiliations, and track the digital footprint of suspects to build comprehensive behavioral profiles and monitor online activities.";

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
export default function SMIPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('smi', SMI_TOOLS);
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'SMI' && event.state.subPage) {
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
    window.history.pushState({ page: 'SMI', subPage: id }, '', '#SMI-' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'ci') return <CIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pi') return <PIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cri') return <CRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fbpi') return <FBPIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'igi') return <IGIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'xti') return <XTIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lii') return <LIIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tgi') return <TGIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'wai') return <WAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sci') return <SCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'yti') return <YTIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'gbi') return <GBIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pmi') return <PMIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'shi') return <SHIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fdi') return <FDIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tri') return <TRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'csi') return <CSIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sbi') return <SBIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'mdi') return <MDIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tli') return <TLIPage onBack={handleSubPageBack} />;

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
                onClick={(t) => handleSelectSubPage(t.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
