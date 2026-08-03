import React, { useState } from 'react';
import { Landmark, Flame, Plane, CreditCard, UserCheck, ShoppingCart, Baby, FileText } from 'lucide-react';
import EBIPage from './kycdi/EBI';
import LPGRIPage from './kycdi/LPGRI';
import PIMPage from './kycdi/PIM';
import PANIPage from './kycdi/PANI';
import VIIPage from './kycdi/VII';
import RCIPage from './kycdi/RCI';
import BCIPage from './kycdi/BCI';
import CCIPage from './kycdi/CCI';
import ToolCard from '../components/nexora';

export function Header() {
  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>KYC Document Intelligence</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Verify identity documents, Aadhaar/PAN audits, and KYC records.
          </p>
        </div>
      </div>
    </header>
  );
}

const KYC_TOOLS = [
  { id: 'ebi', name: 'EBI', desc: 'Electricity Bill Intelligence - Analyze voter profiles, constituency logs & election fraud detection', icon: (p) => <Landmark {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'lpgri', name: 'LPGRI', desc: 'LPG Record Intelligence - Monitor gas subsidy records, consumer logs & distribution audits', icon: (p) => <Flame {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: 'pim', name: 'PIM', desc: 'Passport Intelligence Module - Track passport issuance, travel logs & visa immigration history', icon: (p) => <Plane {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { id: 'pani', name: 'PANI', desc: 'PAN Intelligence - Verify PAN details, tax defaults & linked corporate entities', icon: (p) => <CreditCard {...p} />, color: 'text-green-600', bg: 'bg-green-100' },
  { id: 'vii', name: 'VII', desc: 'Voter ID Intelligence - Audit voter ID registrations, duplicate records & electoral rolls', icon: (p) => <UserCheck {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 'rci', name: 'RCI', desc: 'Residence Certificate Intelligence - Verify ration card benefits, family trees & civil supplies logs', icon: (p) => <ShoppingCart {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { id: 'bci', name: 'BCI', desc: 'Birth Certificate Intelligence - Access municipal birth records, parentage audits & registry logs', icon: (p) => <Baby {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { id: 'cci', name: 'CCI', desc: 'Caste Certificate Intelligence - Validate caste certificate issuance, validity & reservation benefits', icon: (p) => <FileText {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
];

export default function KYCDIPage({ onBack }) {
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSubPage]);

  React.useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'KYCDI' && event.state.subPage) {
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
    window.history.pushState({ page: 'KYCDI', subPage: id }, '', `#KYCDI-${id}`);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'ebi') return <EBIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lpgri') return <LPGRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pim') return <PIMPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pani') return <PANIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'vii') return <VIIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'rci') return <RCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'bci') return <BCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cci') return <CCIPage onBack={handleSubPageBack} />;

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
          {KYC_TOOLS.map((tool, idx) => (
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
