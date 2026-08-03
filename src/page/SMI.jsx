import React, { useState, useEffect } from 'react';
import {
  Users, UserCheck, MessageCircle, Share2, Camera, Hash, Briefcase, 
  Send, MessageSquare, Smartphone, PlaySquare, Globe, Heart, PhoneCall, 
  AtSign, FileText, Video
} from 'lucide-react';
import ToolCard from '../components/nexora';

import CIPage from "./smi/CI";
import PIPage from "./smi/PI";
import CRIPage from "./smi/CRI";
import FBPIPage from "./smi/FBPI";
import IGIPage from "./smi/IGI";
import XTIPage from "./smi/XTI";
import LIIPage from "./smi/LII";
import TGIPage from "./smi/TGI";
import WAIPage from "./smi/WAI";
import SCIPage from "./smi/SCI";
import YTIPage from "./smi/YTI";
import GBIPage from "./smi/GBI";
import PMIPage from "./smi/PMI";
import SHIPage from "./smi/SHI";
import FDIPage from "./smi/FDI";
import TRIPage from "./smi/TRI";
import CSIPage from "./smi/CSI";
import SBIPage from "./smi/SBI";
import MDIPage from "./smi/MDI";
import TLIPage from "./smi/TLI";

export function Header({ title, description }) {
  const displayTitle = title || "Social Media Intelligence";
  const displayDesc = description || "Correlate profiles and map social graphs across platforms.";

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

const SMI_TOOLS = [
  { id: 'ci', name: 'CI', desc: 'Contact Intelligence - Extract and analyze contact lists and phonebooks across platforms.', icon: (p) => <Users {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'pi', name: 'PI', desc: 'Profile Intelligence - Cross-reference user profiles and avatars across multiple social networks.', icon: (p) => <UserCheck {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'cri', name: 'CRI', desc: 'Communication Registration Intelligence - Monitor public chat rooms, group interactions and community forums.', icon: (p) => <MessageCircle {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'fbpi', name: 'FBPI', desc: 'Facebook Platform Intelligence - Analyze Facebook timelines, friend lists, and public interactions.', icon: (p) => <Share2 {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'igi', name: 'IGI', desc: 'Instagram Intelligence - Track Instagram posts, followers, stories, and engagement metrics.', icon: (p) => <Camera {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 'xti', name: 'XTI', desc: 'X (Twitter) Intelligence - Monitor tweets, retweets, hashtags, and social sentiment on X.', icon: (p) => <Hash {...p} />, color: 'text-gray-800', bg: 'bg-gray-100' },
  { id: 'lii', name: 'LII', desc: 'LinkedIn Intelligence - Audit professional networks, employment histories, and company connections.', icon: (p) => <Briefcase {...p} />, color: 'text-blue-700', bg: 'bg-blue-50' },
  { id: 'tgi', name: 'TGI', desc: 'Telegram Intelligence - Analyze Telegram public channels, group memberships, and forwarded messages.', icon: (p) => <Send {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { id: 'wai', name: 'WAI', desc: 'WhatsApp Intelligence - Track WhatsApp public groups, broadcast lists, and business profiles.', icon: (p) => <MessageSquare {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'sci', name: 'SCI', desc: 'Snapchat Intelligence - Monitor Snapchat public stories, Snap Maps, and user engagement.', icon: (p) => <Smartphone {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'yti', name: 'YTI', desc: 'YouTube Intelligence - Analyze YouTube channel statistics, video comments, and subscriber networks.', icon: (p) => <PlaySquare {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'gbi', name: 'GBI', desc: 'Google Business Intelligence - Audit code repositories, developer contributions, and issue discussions.', icon: (p) => <Globe {...p} />, color: 'text-gray-900', bg: 'bg-gray-200' },
  { id: 'pmi', name: 'PMI', desc: 'Payment Intelligence - Track Pinterest boards, saved pins, and visual interest networks.', icon: (p) => <Heart {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { id: 'shi', name: 'SHI', desc: 'Shopping Intelligence - Monitor regional content, trending topics, and user engagement on Sharechat.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { id: 'fdi', name: 'FDI', desc: 'Food Delivery Intelligence - Analyze Discord servers, Reddit forums, and community discussions.', icon: (p) => <MessageCircle {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-100' },
  { id: 'tri', name: 'TRI', desc: 'Travel Intelligence - Verify caller identities, spam reports, and phone directory listings.', icon: (p) => <PhoneCall {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'csi', name: 'CSI', desc: 'Cab Service Intelligence - Track activity on community platforms like Quora and Craigslist.', icon: (p) => <Users {...p} />, color: 'text-red-400', bg: 'bg-red-50' },
  { id: 'sbi', name: 'SBI', desc: 'Subscription Intelligence - Analyze Skype profiles, public directories, and personal blog posts.', icon: (p) => <AtSign {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 'mdi', name: 'MDI', desc: 'Media Intelligence - Audit Medium articles, author networks, and long-form content platforms.', icon: (p) => <FileText {...p} />, color: 'text-gray-800', bg: 'bg-gray-200' },
  { id: 'tli', name: 'TLI', desc: 'Timeline Intelligence - Monitor short-form video content, viral trends, and creator analytics.', icon: (p) => <Video {...p} />, color: 'text-black', bg: 'bg-pink-100' }
];

export default function SMIPage({ onBack }) {
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSubPage]);

  const handleSubPageBack = () => {
    setSelectedSubPage(null);
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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {SMI_TOOLS.map((tool, index) => (
              <ToolCard
                key={tool.id}
                tool={{ ...tool, description: tool.desc }}
                index={index}
                onClick={(t) => setSelectedSubPage(t.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
