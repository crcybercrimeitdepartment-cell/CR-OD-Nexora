import React, { useState } from 'react';
import ToolCard from '../../../components/nexora';
import { Search, Phone, PhoneForwarded, CreditCard, User, History } from 'lucide-react';

// Import the newly created pages
import MobileNumberPage from './MobileNumberPage';
import AlternateMobileNumberPage from './AlternateMobileNumberPage';
import AadhaarNumberPage from './AadhaarNumberPage';
import NameAndFathersNamePage from "./Name&Father'sNamePage";
import SearchHistoryPage from './SearchHistoryPage';

export function Header() {
  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>Search Box</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Search and query subscriber records across all telecom providers. Perform multi-criteria lookups by mobile number, identity card, name, or search history.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function BSNLSRPage({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  React.useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#SDR-bsnlsr/')) {
        setActivePage(decodeURIComponent(hash.split('/')[1]));
      } else {
        setActivePage(null);
      }
    };
    
    // Initial check
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToolSelect = (toolName) => {
    window.history.pushState({ page: 'SDR', subPage: 'bsnlsr', subTool: toolName }, '', `#SDR-bsnlsr/${encodeURIComponent(toolName)}`);
    setActivePage(toolName);
  };

  const handleToolBack = () => {
    if (window.history.state && window.history.state.subTool) {
      window.history.back();
    } else {
      window.history.pushState({ page: 'SDR', subPage: 'bsnlsr' }, '', '#SDR-bsnlsr');
      setActivePage(null);
    }
  };

  if (activePage === 'Mobile Number') return <MobileNumberPage onBack={handleToolBack} />;
  if (activePage === 'Alternate Mobile Number') return <AlternateMobileNumberPage onBack={handleToolBack} />;
  if (activePage === 'Aadhaar Number') return <AadhaarNumberPage onBack={handleToolBack} />;
  if (activePage === "Name & Father's Name") return <NameAndFathersNamePage onBack={handleToolBack} />;
  if (activePage === 'Search History') return <SearchHistoryPage onBack={handleToolBack} />;

  const tools = [
    { name: 'Mobile Number', icon: (p) => <Phone {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100', desc: 'Query records by primary 10-digit mobile number.' },
    { name: 'Alternate Mobile Number', icon: (p) => <PhoneForwarded {...p} />, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Search via alternate or emergency numbers.' },
    { name: 'Aadhaar Number', icon: (p) => <CreditCard {...p} />, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Verify identity via Aadhaar registration.' },
    { name: "Name & Father's Name", icon: (p) => <User {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100', desc: 'Filter records by subscriber and parental name.' },
    { name: 'Search History', icon: (p) => <History {...p} />, color: 'text-rose-600', bg: 'bg-rose-100', desc: 'Review recent subscriber query logs.' },
  ];

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
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-2 overflow-x-hidden">
        {/* Search Bar Component below Title */}
        <div className="max-w-3xl mx-auto w-full mb-6">
          <div className="relative flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-sm p-1.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-200">
            <div className="pl-3.5 pr-2 text-slate-400">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subscriber records by Mobile, Aadhaar, Name, or Father's Name..."
              className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none px-2 py-2"
            />
            <button className="bg-[#1e2a52] hover:bg-blue-950 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 text-xs sm:text-sm shrink-0 flex items-center gap-2 cursor-pointer">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        <main className="flex-1 pt-1 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} onClick={() => handleToolSelect(tool.name)} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
