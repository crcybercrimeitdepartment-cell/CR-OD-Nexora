import React, { useState } from 'react';
import DashboardPage from './DashboardPage';
import Explorethewebpage from './Explorethewebpage';
import MynotepadPage from './MynotepadPage';
import Savedatapage from './Savedatapage';

export default function QuikrPage({ onBack }) {
  const [activePage, setActivePage] = useState('home');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4 overflow-x-hidden min-h-screen">
      {onBack && activePage === 'home' && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}

      {activePage === 'home' && (
        <>
          <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none z-20">
            <div className="flex items-center justify-center w-full relative z-20">
              <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
                  <span>Quikr</span>
                </h1>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
                  Analytics and data records for Quikr. Dive deep into the specific metadata and data patterns of this intelligence sector.
                </p>
              </div>
            </div>
          </header>
          <DashboardPage setActivePage={setActivePage} />
        </>
      )}

      {(activePage === 'search' || activePage === 'history') && (
        <Explorethewebpage activePage={activePage} setActivePage={setActivePage} />
      )}
      
      {(activePage === 'note' || activePage === 'saved-notes') && (
        <MynotepadPage activePage={activePage} setActivePage={setActivePage} />
      )}

      {activePage === 'save-data' && (
        <Savedatapage onBack={() => setActivePage('home')} />
      )}
    </div>
  );
}
