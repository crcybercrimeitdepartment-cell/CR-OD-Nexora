import { useState, useEffect } from 'react';
import { Search as SearchIcon, History, Clock, X, Trash2, ArrowRight, Home } from 'lucide-react';
import { SDRSearchResultsPage } from './Search Data/SDRSearchResultsPage';
import DetailsPage from './Search Data/DetailsPage';

export default function Explorethewebpage({ activePage, setActivePage, searchedValue, setSearchedValue }) {
  const [query, setQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      // Migrate old string arrays to objects if needed
      return parsed.map(item => 
        typeof item === 'string' ? { query: item, date: new Date().toLocaleString() } : item
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newItem = { query: query.trim(), date: new Date().toLocaleString() };
    const newHistory = [newItem, ...history.filter(item => item.query !== query.trim())].slice(0, 10);
    setHistory(newHistory);
    setSearchedValue?.(query.trim());
    setActivePage('searchResults');
    setSelectedRecord(null);
    setQuery('');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeHistoryItem = (itemToRemove, e) => {
    e.stopPropagation();
    setHistory(history.filter(item => item.query !== itemToRemove.query));
  };

  const handleHistoryItemClick = (item) => {
    setQuery(item.query);
    setSearchedValue?.(item.query);
    setActivePage('searchResults');
    setSelectedRecord(null);
  };

  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
  };

  if (activePage === 'searchResults') {
    const handleGlobalBack = () => {
      if (selectedRecord) {
        setSelectedRecord(null);
      } else {
        setActivePage('search');
      }
    };

    return (
      <div className="relative z-10 w-full min-h-screen flex flex-col animate-in fade-in duration-500">
        <div className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 select-none z-20">
          <button 
            onClick={handleGlobalBack}
            className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
          >
            <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Back</span>
          </button>
        </div>

        <div className="flex-1 w-full relative z-10 pt-12 sm:pt-16">
          {selectedRecord ? (
            <DetailsPage record={selectedRecord} />
          ) : (
            <SDRSearchResultsPage 
              searchedParameter="Search Query" 
              searchedValue={searchedValue} 
              onSelectRecord={handleSelectRecord}
            />
          )}
        </div>
      </div>
    );
  }

  if (activePage === 'history') {
    return (
      <>
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-in fade-in duration-500">
        <div className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none z-20">
          <button 
            onClick={() => setActivePage('search')}
            className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
          >
            <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Back</span>
          </button>

          {history.length > 0 && (
            <button 
              onClick={clearHistory}
              className="absolute top-1.5 right-3 sm:top-5 sm:right-6 md:right-10 z-50 text-red-500 hover:text-red-700 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-red-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
            >
              <Trash2 size={16} className="shrink-0" />
              <span>Clear All</span>
            </button>
          )}

          <div className="flex items-center justify-center w-full relative z-20">
            <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
                <span>Search History</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
                View your past searches and quickly jump back into topics.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 overflow-y-auto">
          {history.length > 0 ? (
            <div className="space-y-3 animate-in fade-in duration-500">
              {history.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => handleHistoryItemClick(item)}
                  className="group flex items-center justify-between p-4 sm:p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_4px_25px_rgb(59,130,246,0.1)] hover:bg-white/80 cursor-pointer transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4 overflow-hidden">
                    <div className="p-3 bg-white/50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500 rounded-xl transition-colors shadow-sm shrink-0">
                      <Clock size={20} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-slate-700 text-lg group-hover:text-slate-900 font-bold truncate">
                        {item.query}
                      </span>
                      <span className="text-xs font-medium text-slate-500 mt-0.5">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => removeHistoryItem(item, e)}
                    className="p-3 text-slate-400 opacity-0 md:opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-white/80 hover:shadow-sm rounded-full transition-all shrink-0"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-4 mt-10">
              <div className="p-6 bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-white/60">
                <History size={48} className="text-slate-300" />
              </div>
              <p className="text-lg font-medium">No recent searches</p>
              <button 
                onClick={() => setActivePage('search')} 
                className="px-6 py-2 bg-blue-500 text-white shadow-lg shadow-blue-500/30 rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 transition-all font-medium mt-2"
              >
                Start searching
              </button>
            </div>
          )}
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <div className="relative z-10 w-full min-h-screen flex flex-col animate-in fade-in duration-500">
      <div className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none z-20">
        <button 
          onClick={() => setActivePage('home')}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>

        <button 
          onClick={() => setActivePage('history')}
          className="absolute top-1.5 right-3 sm:top-5 sm:right-6 md:right-10 z-50 text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-blue-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <History size={16} className="shrink-0" />
          <span>History</span>
        </button>

        <div className="flex items-center justify-center w-full relative z-20">
          <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
              <span>Explore the Web</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Search for anything, manage your history, and discover new content.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center p-4 overflow-y-auto pb-12">
        <div className="w-full max-w-4xl flex flex-col items-center animate-in fade-in zoom-in-95 duration-700 mt-4">
          <div className="w-full relative flex items-center group mb-8">
            <form 
              onSubmit={handleSearch} 
              className="w-full relative flex items-center bg-white/80 backdrop-blur-2xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgb(59,130,246,0.25)] focus-within:shadow-[0_12px_50px_rgb(59,130,246,0.35)] focus-within:bg-white border border-white/80 transition-all duration-500 ease-out transform hover:-translate-y-1 z-20"
            >
              <div className="pl-6 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <SearchIcon size={26} strokeWidth={2.5} className="group-focus-within:scale-110 transition-transform duration-300" />
              </div>
              
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search subscriber records..."
                className="w-full py-5 px-5 bg-transparent outline-none text-slate-800 text-xl placeholder-slate-400 font-bold tracking-wide"
              />
              
              {query && (
                <button 
                  type="button"
                  onClick={() => setQuery('')}
                  className="pr-4 text-slate-300 hover:text-slate-500 transition-colors hover:scale-110"
                >
                  <X size={24} strokeWidth={3} />
                </button>
              )}

              <div className="pr-3">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-cyan-500 text-white p-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-blue-500/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  <ArrowRight size={24} strokeWidth={3} />
                </button>
              </div>
            </form>
          </div>

          {/* Information Section */}
          <div className="w-full bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 md:p-10 border border-white/60 shadow-xl text-slate-700 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2a52] mb-4 flex items-center gap-3">
              <SearchIcon className="text-blue-500" size={28} strokeWidth={3} />
              Search Options
            </h2>
            <p className="mb-6 text-slate-600 font-semibold text-lg leading-relaxed">
              Search for subscriber records using any one of the following search options:
            </p>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {['Mobile Number', 'Alternate Mobile Number', 'Aadhaar Number', 'Passport Number', 'PAN Number', 'Subscriber Name + Father Name'].map(opt => (
                <span key={opt} className="px-5 py-2.5 bg-blue-50 text-blue-700 border border-blue-100 font-bold rounded-xl text-sm shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default">{opt}</span>
              ))}
            </div>

            <hr className="border-slate-200/60 my-8" />

            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2a52] mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">!</div>
              Search Result
            </h2>
            <p className="mb-6 text-slate-600 font-semibold text-lg leading-relaxed">
              The system will display the same complete set of available subscriber data regardless of the search method used, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mb-10">
              {['Personal Details', 'SIM Details', 'Service Details', 'KYC Details', 'Connection Details', 'Address Details', 'Contact Details', 'Operator Details', 'All associated Mobile Number / SIM Records'].map(detail => (
                <div key={detail} className="flex items-center gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-sm font-bold text-slate-700 hover:shadow-md transition-shadow">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                  {detail}
                </div>
              ))}
            </div>

            <hr className="border-slate-200/60 my-8" />

            <h2 className="text-2xl sm:text-3xl font-black text-[#1e2a52] mb-6 flex items-center gap-3">
              <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Search Behaviour
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Mobile Number', desc: 'Displays all subscriber records associated with the searched mobile number. If the same mobile number is associated with multiple subscriber names, all matching records will be displayed.' },
                { title: 'Alternate Mobile Number', desc: 'Displays all subscriber records associated with the searched alternate mobile number.' },
                { title: 'Aadhaar Number', desc: 'Displays all mobile numbers/SIM connections linked with the searched Aadhaar number, along with their complete associated details.' },
                { title: 'Passport Number', desc: 'Displays all subscriber/mobile/SIM records linked with the searched passport number.' },
                { title: 'PAN Number', desc: 'Displays all subscriber/mobile/SIM records linked with the searched PAN number.' },
                { title: 'Subscriber Name + Father Name', desc: 'Both fields must be entered together. The system displays records where both Subscriber Name and Father Name match the entered information.' }
              ].map(behavior => (
                <div key={behavior.title} className="bg-gradient-to-r from-white to-slate-50/50 border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                  <h3 className="font-black text-lg sm:text-xl text-indigo-800 mb-2 group-hover:text-indigo-600 transition-colors">{behavior.title}</h3>
                  <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">{behavior.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
