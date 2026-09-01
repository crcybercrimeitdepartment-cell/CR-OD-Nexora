import React from 'react';
import ToolCard from '../../../components/nexora';
import { Smartphone, Shield, CheckCircle, Cpu, RefreshCw, History } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>Mobile Number Verification</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Authenticate mobile numbers, SIM registration status, and CAF identity details across telecom registries. Leverage real-time carrier lookup and audit device binding history.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function MNVPage({ onBack }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const tools = [];

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
        <main className="flex-1 flex flex-col items-center justify-center min-h-[40vh] pt-1 pb-4">
          <div className="w-20 h-20 bg-slate-100/50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-200">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3 tracking-tight">Coming Soon</h2>
          <p className="text-slate-500 font-medium text-center max-w-md leading-relaxed">
            This module is currently under development. Check back later for updates and new features.
          </p>
        </main>
      </div>
    </div>
  );
}
