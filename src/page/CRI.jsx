import React, { useState, useEffect } from 'react';
import {
  Building2, FileText, Award, Rocket, Copyright, FileCheck, Heart,
  Briefcase, Lightbulb, Ship, Utensils, Pill, Factory, Store, Wine,
  Globe, CreditCard, PiggyBank, Activity, Layers, ShoppingCart,
  Users, Handshake, ScanLine, Flame, Wind, CheckCircle, Fuel, Scale, Home
} from 'lucide-react';
import ToolCard from '../components/nexora';
import MCAIPage from "./cri/MCAI";
import GSTRIPage from "./cri/GSTRI";
import ISORIPage from "./cri/ISORI";
import SRIPage from "./cri/SRI";
import TRIPage from "./cri/TRI";
import Page12ARIPage from "./cri/12ARI";
import Page80GRIPage from "./cri/80GRI";
import URIPage from "./cri/URI";
import SIRIPage from "./cri/SIRI";
import IECIPage from "./cri/IECI";
import FSSAIIPage from "./cri/FSSAII";
import DLIPage from "./cri/DLI";
import FLIPage from "./cri/FLI";
import TLIPage from "./cri/TLI";
import SERIPage from "./cri/SERI";
import FCRAIPage from "./cri/FCRAI";
import PANIPage from "./cri/PANI";
import TANIPage from "./cri/TANI";
import EPFOIPage from "./cri/EPFOI";
import ESICIPage from "./cri/ESICI";
import NSICIPage from "./cri/NSICI";
import GeMRIPage from "./cri/GeMRI";
import NGODIPage from "./cri/NGODI";
import CSR1IPage from "./cri/CSR1I";
import TMRIPage from "./cri/TMRI";
import FNOCIPage from "./cri/FNOCI";
import PCBIPage from "./cri/PCBI";
import BISIPage from "./cri/BISI";
import PESOIPage from "./cri/PESOI";
import LMRIPage from "./cri/LMRI";
import CERIPage from "./cri/CERI";
import RERAIPage from "./cri/RERAI";

export function Header({ title, description }) {
  const displayTitle = title || "Company Registration Intelligence";
  const displayDesc = description || "Audit corporate records, regulatory registrations, and business intelligence.";
  
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

const CRI_TOOLS = [
  { id: 'mcai', name: 'MCAI', desc: 'Ministry of Corporate Affairs Intelligence - Audit corporate records, DIN lookups & company filings', icon: (p) => <Building2 {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'gstri', name: 'GSTRI', desc: 'Goods and Services Tax Return Intelligence - Track GST returns, tax defaults & compliance audits', icon: (p) => <FileText {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { id: 'isori', name: 'ISORI', desc: 'ISO Registration Intelligence - Verify ISO certifications, validity & standards compliance', icon: (p) => <Award {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 'sri', name: 'SRI', desc: 'Startup Registration Intelligence - Monitor registered startups, DPIIT recognition & funding', icon: (p) => <Rocket {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: 'tri', name: 'TRI', desc: 'Trademark Registration Intelligence - Search trademark registries, IP filings & status', icon: (p) => <Copyright {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { id: '12ari', name: '12ARI', desc: 'Section 12A Registration Intelligence - Audit NGO tax exemptions & trust compliance', icon: (p) => <FileCheck {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { id: '80gri', name: '80GRI', desc: 'Section 80G Registration Intelligence - Track tax deduction certificates for charitable organizations', icon: (p) => <Heart {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { id: 'uri', name: 'URI', desc: 'Udyam Registration Intelligence - Verify MSME registrations & micro-enterprise credentials', icon: (p) => <Briefcase {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { id: 'siri', name: 'SIRI', desc: 'Startup India Registration Intelligence - Validate Startup India portal credentials & benefits', icon: (p) => <Lightbulb {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { id: 'ieci', name: 'IECI', desc: 'Import Export Code Intelligence - Monitor trade licenses, export codes & cross-border trade logs', icon: (p) => <Ship {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'fssaii', name: 'FSSAII', desc: 'FSSAI Registration Intelligence - Track food safety licenses, hygiene audits & vendor compliance', icon: (p) => <Utensils {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'dli', name: 'DLI', desc: 'Drug License Intelligence - Audit pharmaceutical licenses, distribution channels & pharmacy logs', icon: (p) => <Pill {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'fli', name: 'FLI', desc: 'Factory License Intelligence - Verify manufacturing licenses, plant compliance & industrial permits', icon: (p) => <Factory {...p} />, color: 'text-slate-600', bg: 'bg-slate-100' },
  { id: 'tli', name: 'TLI', desc: 'Trade License Intelligence - Track local trade permits, municipal licenses & commercial registries', icon: (p) => <Store {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'seri', name: 'SERI', desc: 'State Excise Registration Intelligence - Monitor liquor licenses, excise duties & state tax compliance', icon: (p) => <Wine {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'fcrai', name: 'FCRAI', desc: 'Foreign Contribution Regulation Act Intelligence - Track foreign donations, NGO funding & FCRA accounts', icon: (p) => <Globe {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { id: 'pani', name: 'PANI', desc: 'PAN Card Intelligence - Verify Permanent Account Numbers, associated entities & tax histories', icon: (p) => <CreditCard {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'tani', name: 'TANI', desc: 'TAN Card Intelligence - Audit Tax Deduction and Collection Account Numbers & TDS compliance', icon: (p) => <CreditCard {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 'epfoi', name: 'EPFOI', desc: 'Employees Provident Fund Organization Intelligence - Track EPF contributions, establishment codes & payroll data', icon: (p) => <PiggyBank {...p} />, color: 'text-blue-400', bg: 'bg-blue-50' },
  { id: 'esici', name: 'ESICI', desc: 'Employees State Insurance Corporation Intelligence - Monitor ESIC registrations, employee health insurance & factory compliance', icon: (p) => <Activity {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'nsici', name: 'NSICI', desc: 'National Small Industries Corporation Intelligence - Verify NSIC certificates, government procurement & MSME benefits', icon: (p) => <Layers {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'gemri', name: 'GeMRI', desc: 'Government e-Marketplace Registration Intelligence - Track GeM portal vendors, procurement bids & supplier ratings', icon: (p) => <ShoppingCart {...p} />, color: 'text-orange-400', bg: 'bg-orange-50' },
  { id: 'ngodi', name: 'NGODI', desc: 'NGO Darpan Intelligence - Verify NITI Aayog NGO Darpan IDs, trust deeds & government grants', icon: (p) => <Users {...p} />, color: 'text-green-600', bg: 'bg-green-100' },
  { id: 'csr1i', name: 'CSR1I', desc: 'CSR-1 Registration Intelligence - Monitor Corporate Social Responsibility filings & approved implementing agencies', icon: (p) => <Handshake {...p} />, color: 'text-rose-400', bg: 'bg-rose-50' },
  { id: 'tmri', name: 'TMRI', desc: 'Trade Mark Registration Intelligence - Monitor trademark portfolios, IP infringement & brand registries', icon: (p) => <ScanLine {...p} />, color: 'text-purple-400', bg: 'bg-purple-50' },
  { id: 'fnoci', name: 'FNOCI', desc: 'Fire NOC Intelligence - Track Fire Department No Objection Certificates & building safety audits', icon: (p) => <Flame {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { id: 'pcbi', name: 'PCBI', desc: 'Pollution Control Board Intelligence - Verify environmental clearances, emission logs & PCB consents', icon: (p) => <Wind {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { id: 'bisi', name: 'BISI', desc: 'Bureau of Indian Standards Intelligence - Track BIS certifications, ISI marks & product quality standards', icon: (p) => <CheckCircle {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'pesoi', name: 'PESOI', desc: 'Petroleum and Explosives Safety Organization Intelligence - Audit explosive licenses, petroleum storage & hazardous material transport', icon: (p) => <Fuel {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'lmri', name: 'LMRI', desc: 'Legal Metrology Registration Intelligence - Monitor weights & measures licenses, packaging compliance & LMPC certificates', icon: (p) => <Scale {...p} />, color: 'text-slate-500', bg: 'bg-slate-100' },
  { id: 'ceri', name: 'CERI', desc: 'Customs & Excise Registration Intelligence - Track customs broker licenses, bonded warehouses & ICEGATE registrations', icon: (p) => <Ship {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { id: 'rerai', name: 'RERAI', desc: 'Real Estate Regulatory Authority Intelligence - Verify RERA project registrations, builder compliance & real estate agent logs', icon: (p) => <Home {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' }
];

export default function CRIPage({ onBack }) {
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSubPage]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'CRI' && event.state.subPage) {
        setSelectedSubPage(event.state.subPage);
      } else {
        setSelectedSubPage(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    // Check initial state in case of direct load or forward navigation
    if (window.history.state && window.history.state.subPage) {
      setSelectedSubPage(window.history.state.subPage);
    }
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectSubPage = (id) => {
    window.history.pushState({ page: 'CRI', subPage: id }, '', `#CRI-${id}`);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'mcai') return <MCAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'gstri') return <GSTRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'isori') return <ISORIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sri') return <SRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tri') return <TRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === '12ari') return <Page12ARIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === '80gri') return <Page80GRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'uri') return <URIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'siri') return <SIRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ieci') return <IECIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fssaii') return <FSSAIIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'dli') return <DLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fli') return <FLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tli') return <TLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'seri') return <SERIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fcrai') return <FCRAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pani') return <PANIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tani') return <TANIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'epfoi') return <EPFOIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'esici') return <ESICIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'nsici') return <NSICIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'gemri') return <GeMRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ngodi') return <NGODIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'csr1i') return <CSR1IPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tmri') return <TMRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fnoci') return <FNOCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pcbi') return <PCBIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'bisi') return <BISIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pesoi') return <PESOIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lmri') return <LMRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ceri') return <CERIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'rerai') return <RERAIPage onBack={handleSubPageBack} />;

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
      
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-6 overflow-x-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {CRI_TOOLS.map((tool, idx) => (
            <ToolCard 
              key={tool.id} 
              tool={{ ...tool, description: tool.desc }} 
              index={idx} 
              onClick={(t) => handleSelectSubPage(t.id)} 
            />
          ))}
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
