import React, { useState } from 'react';
import ToolCard from '../../../components/nexora';
import { FileInput, Eye, Settings, HardDrive } from 'lucide-react';
import SubscriberApp from './SDRDataInputPage';

// Import the new pages
import SDRDataViewPage from './SDRDataViewPage';
import SDRDataManagementPage from './SDRDataManagementPage';
import SDRDataStoragePage from './SDRDataStoragePage';

export function Header() {
  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>SDR Data Admin</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Administer and manage SDR data records, system configurations, storage repositories, and input pipelines.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function RHPage({ onBack }) {
  const [activeTool, setActiveTool] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTool]);

  React.useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#SDR-rh/')) {
        setActiveTool(decodeURIComponent(hash.split('/')[1]));
      } else {
        setActiveTool(null);
      }
    };
    
    // Initial check
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToolSelect = (toolName) => {
    window.history.pushState({ page: 'SDR', subPage: 'rh', subTool: toolName }, '', `#SDR-rh/${encodeURIComponent(toolName)}`);
    setActiveTool(toolName);
  };

  const handleToolBack = () => {
    if (window.history.state && window.history.state.subTool) {
      window.history.back();
    } else {
      window.history.pushState({ page: 'SDR', subPage: 'rh' }, '', '#SDR-rh');
      setActiveTool(null);
    }
  };

  if (activeTool === 'SDR Data Input') {
    return (
      <div className="relative min-h-screen">
        <button onClick={handleToolBack}
          className="absolute top-4 left-4 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back to Admin</span>
        </button>
        <SubscriberApp />
      </div>
    );
  }

  if (activeTool === 'SDR Data View') return <SDRDataViewPage onBack={handleToolBack} />;
  if (activeTool === 'SDR Data Management') return <SDRDataManagementPage onBack={handleToolBack} />;
  if (activeTool === 'SDR Data Storage') return <SDRDataStoragePage onBack={handleToolBack} />;

  const tools = [
    { name: 'SDR Data Input', icon: (p) => <FileInput {...p} />, color: 'text-amber-600', bg: 'bg-amber-100', desc: 'Batch import and upload raw SDR datasets.' },
    { name: 'SDR Data View', icon: (p) => <Eye {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Query and view administrative SDR data entries.' },
    { name: 'SDR Data Management', icon: (p) => <Settings {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100', desc: 'Configure system settings and data permissions.' },
    { name: 'SDR Data Storage', icon: (p) => <HardDrive {...p} />, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Monitor storage usage and database archives.' },
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
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-4 overflow-x-hidden">
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
