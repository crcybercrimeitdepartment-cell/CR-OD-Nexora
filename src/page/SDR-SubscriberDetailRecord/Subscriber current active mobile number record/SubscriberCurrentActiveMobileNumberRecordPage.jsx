import React, { useState, useEffect } from 'react';
import ToolCard from '../../../components/nexora';
import { usePageLayout } from '../../../components/usePageLayout';
import { Search, History, FileText, Folder } from 'lucide-react';

import ExploreTheWebPage from './Explore the web/Explorethewebpage';
import MyNotepadPage from './MynotepadPage';
import SaveDataPage from './Savedatapage';

export const SMNR_TOOLS = [
  { id: 'search', name: 'Explore the Web', desc: 'Search for anything, manage your history, and discover new content.', icon: (p) => <Search {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'history', name: 'Search History', desc: 'View your past searches and quickly jump back into topics.', icon: (p) => <History {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 'note', name: 'My Notepad', desc: 'Jot down your thoughts, ideas, and keep track of your saved notes.', icon: (p) => <FileText {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { id: 'save-data', name: 'Save Data', desc: 'Organize and manage your local files and folders.', icon: (p) => <Folder {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' }
];

export function Header() {
  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>Subscriber current active mobile number record</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Manage your dashboard, explore web data, track notes, and save data records using these specialized tools.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function SubscriberMobileNumberRecordsPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('smnr', SMNR_TOOLS);
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchedValue, setSearchedValue] = useState('');

  const handleSubSubPageBack = () => {
    setActivePage('home');
  };

  if (activePage === 'search' || activePage === 'history' || activePage === 'searchResults') return <ExploreTheWebPage activePage={activePage} setActivePage={setActivePage} onBack={handleSubSubPageBack} searchedValue={searchedValue} setSearchedValue={setSearchedValue} />;
  if (activePage === 'note') return <MyNotepadPage activePage={activePage} setActivePage={setActivePage} onBack={handleSubSubPageBack} />;
  if (activePage === 'save-data') return <SaveDataPage setActivePage={setActivePage} onBack={handleSubSubPageBack} />;


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
                onClick={() => setActivePage(tool.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
