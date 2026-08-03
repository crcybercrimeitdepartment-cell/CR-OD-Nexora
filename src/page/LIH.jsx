import React, { useState, useEffect } from 'react';
import {
  Book, Scale, Shield, FileText, Gavel, Landmark, FileSearch, 
  Users, Briefcase, AlertCircle, Bookmark, Scroll, Search, 
  Folder, Database, Globe, Lock, Info, BookOpen
} from 'lucide-react';
import ToolCard from '../components/nexora';

import BNSIPage from "./lih/BNSI";
import BNSSIPage from "./lih/BNSSI";
import BSAIPage from "./lih/BSAI";
import IPCIPage from "./lih/IPCI";
import CrPCIPage from "./lih/CrPCI";
import IEAIPage from "./lih/IEAI";
import LDIPage from "./lih/LDI";
import LARIPage from "./lih/LARI";
import SLIPage from "./lih/SLI";
import LFFIPage from "./lih/LFFI";
import LJIPage from "./lih/LJI";
import LCNIPage from "./lih/LCNI";
import PMSIPage from "./lih/PMSI";
import LTIPage from "./lih/LTI";
import CRIPage from "./lih/CRI";
import IGIPage from "./lih/IGI";
import GOIPage from "./lih/GOI";
import LAIPage from "./lih/LAI";
import LDRIPage from "./lih/LDRI";
import CSIPage from "./lih/CSI";

export function Header({ title, description }) {
  const displayTitle = title || "Law Intelligence Hub";
  const displayDesc = description || "Access centralized legal databases and judicial archives.";

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

const LIH_TOOLS = [
  { id: 'bnsi', name: 'BNSI', desc: 'Bharatiya Nyaya Sanhita Intelligence - Access provisions and analytics.', icon: (p) => <Book {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'bnssi', name: 'BNSSI', desc: 'Bharatiya Nagarik Suraksha Sanhita Intelligence - Explore procedures and codes.', icon: (p) => <Scale {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'bsai', name: 'BSAI', desc: 'Bharatiya Sakshya Adhiniyam Intelligence - Evidence laws and records.', icon: (p) => <Shield {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'ipci', name: 'IPCI', desc: 'Indian Penal Code Intelligence - Historical penal code references.', icon: (p) => <Gavel {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'crpci', name: 'CrPCI', desc: 'Code of Criminal Procedure Intelligence - Procedural law records.', icon: (p) => <Landmark {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 'ieai', name: 'IEAI', desc: 'Indian Evidence Act Intelligence - Archive of evidence laws.', icon: (p) => <FileSearch {...p} />, color: 'text-gray-800', bg: 'bg-gray-100' },
  { id: 'ldi', name: 'LDI', desc: 'Legal Dictionary Intelligence - Analyze and manage legal documents.', icon: (p) => <FileText {...p} />, color: 'text-blue-700', bg: 'bg-blue-50' },
  { id: 'lari', name: 'LARI', desc: 'Legal Acts & Rules Intelligence - AI-driven legal research.', icon: (p) => <Search {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { id: 'sli', name: 'SLI', desc: 'Specialized Laws Intelligence - Search through statutory provisions.', icon: (p) => <Scroll {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'lffi', name: 'LFFI', desc: 'Legal Forms & Formats Intelligence - Filing guidelines and frameworks.', icon: (p) => <Folder {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'lji', name: 'LJI', desc: 'Legal Judgments Intelligence - Access historical and recent judgments.', icon: (p) => <Gavel {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'lcni', name: 'LCNI', desc: 'Legal Circulars & Notifications Intelligence - Map relationships between cases.', icon: (p) => <Database {...p} />, color: 'text-gray-900', bg: 'bg-gray-200' },
  { id: 'pmsi', name: 'PMSI', desc: 'Police Manuals & SOP Intelligence - Inmate and prison records.', icon: (p) => <Lock {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { id: 'lti', name: 'LTI', desc: 'Legal Templates Intelligence - Emerging technologies in the legal sector.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { id: 'cri', name: 'CRI', desc: 'Court Rules Intelligence - Search and analyze criminal histories.', icon: (p) => <AlertCircle {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-100' },
  { id: 'igi', name: 'IGI', desc: 'Investigation Guidelines Intelligence - Tools for digital forensics.', icon: (p) => <Search {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'goi', name: 'GOI', desc: 'Government Orders Intelligence - Analyze official orders and gazettes.', icon: (p) => <Bookmark {...p} />, color: 'text-red-400', bg: 'bg-red-50' },
  { id: 'lai', name: 'LAI', desc: 'Legal Amendment Intelligence - AI assistance for legal opinions.', icon: (p) => <Users {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 'ldri', name: 'LDRI', desc: 'Legal Drafting Intelligence - Alternative dispute tracking.', icon: (p) => <Briefcase {...p} />, color: 'text-gray-800', bg: 'bg-gray-200' },
  { id: 'csi', name: 'CSI', desc: 'Case Study Intelligence - Analytics for crime scene investigations.', icon: (p) => <Info {...p} />, color: 'text-black', bg: 'bg-pink-100' }
];

export default function LIHPage({ onBack }) {
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSubPage]);

  const handleSubPageBack = () => {
    setSelectedSubPage(null);
  };

  if (selectedSubPage === 'bnsi') return <BNSIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'bnssi') return <BNSSIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'bsai') return <BSAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ipci') return <IPCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'crpci') return <CrPCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ieai') return <IEAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ldi') return <LDIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lari') return <LARIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sli') return <SLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lffi') return <LFFIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lji') return <LJIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lcni') return <LCNIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pmsi') return <PMSIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lti') return <LTIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cri') return <CRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'igi') return <IGIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'goi') return <GOIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lai') return <LAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ldri') return <LDRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'csi') return <CSIPage onBack={handleSubPageBack} />;

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
            {LIH_TOOLS.map((tool, index) => (
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
