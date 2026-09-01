import React, { useState } from 'react';
import UploadImage from './UploadImage';
import ScanImage from './ScanImage';
import ClickedPhoto from './ClickedPhoto';

/**
 * Header Component.
 * Renders the title and a brief description of the page's purpose.
 * 
 * @param {Object} props - Component properties.
 * @param {string} [props.title] - Optional override for the title.
 * @param {string} [props.description] - Optional override for the description.
 * @returns {JSX.Element} The rendered header component.
 */
export function Header() {
  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>Facial Recognition Intelligence</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Deploy advanced facial recognition algorithms across live feeds and static imagery. Match suspect faces against extensive criminal databases to generate real-time identification and tracking alerts. Enhance surveillance capabilities by mapping out social connections through shared photographs and crowd-sourced video analysis.
          </p>
        </div>
      </div>
    </header>
  );
}

/**
 * Main Page Component.
 * Handles the display, routing, and user interactions for this specific intelligence record.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.onBack - Callback function triggered when the user clicks the "Back" button to return to the parent dashboard.
 * @returns {JSX.Element} The rendered page layout.
 */
export default function FRIPage({ onBack }) {
  // Tracks which facial recognition method the user wants to use ('upload', 'scan', 'capture', or '')
  const [selectedFeature, setSelectedFeature] = useState('');
  
  // Controls the visibility state of the custom dropdown menu for feature selection
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ensure the page scrolls to the top when navigated to
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4">
      
      {/* Dynamic Back Button injected if the onBack callback is provided by the parent router */}
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
      
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-4 min-h-[500px]">
        <main className="flex-1 pt-1 pb-4">
          <div className="flex flex-col items-center py-8 sm:py-12 px-4 opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: '0.2s' }}>

            {/* Top Search Bar & Feature Selector */}
            <div className="w-full max-w-3xl relative mb-10">
              
              {/* Search Icon Overlay */}
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Text Search Input (Database Lookup placeholder) */}
              <input
                type="text"
                placeholder="Search Facial Records..."
                className="block w-full pl-14 pr-[260px] py-4 sm:py-5 border border-slate-300 rounded-full leading-5 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base sm:text-lg transition-all duration-300"
              />

              {/* Right-aligned Input Controls: Dropdown & Search Button */}
              <div className="absolute inset-y-0 right-2 flex items-center space-x-2">
                
                {/* Custom Dropdown Trigger */}
                <div className="relative flex items-center border-l border-slate-200 pl-2">
                  <div 
                    className="flex items-center justify-between w-[130px] sm:w-[155px] pl-3 pr-2 py-2 text-sm sm:text-base bg-transparent cursor-pointer font-medium text-slate-700 select-none"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {/* Render active human-readable text based on selectedFeature state */}
                    <span className="truncate">
                      {selectedFeature === 'upload' ? 'Upload' : 
                       selectedFeature === 'scan' ? 'Scan' : 
                       selectedFeature === 'capture' ? 'Camera' : 'Select Option'}
                    </span>
                    <svg className={`h-4 w-4 ml-1 flex-shrink-0 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {/* Custom Dropdown Menu Options */}
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-4 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden" style={{ animation: 'fadeIn 0.2s ease-out forwards' }}>
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => { setSelectedFeature(''); setIsDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm sm:text-base hover:bg-slate-50 transition-colors ${selectedFeature === '' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'}`}
                        >
                          Select Option
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSelectedFeature('upload'); setIsDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm sm:text-base hover:bg-slate-50 transition-colors ${selectedFeature === 'upload' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'}`}
                        >
                          Upload Image
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSelectedFeature('scan'); setIsDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm sm:text-base hover:bg-slate-50 transition-colors ${selectedFeature === 'scan' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'}`}
                        >
                          Scan Image
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSelectedFeature('capture'); setIsDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm sm:text-base hover:bg-slate-50 transition-colors ${selectedFeature === 'capture' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'}`}
                        >
                          Camera Capture
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Search Submission Button */}
                <button
                  type="button"
                  className="inline-flex items-center px-5 py-2 sm:py-2.5 border border-transparent text-sm font-semibold rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Dynamic Content Area: Renders the appropriate component based on dropdown selection */}
            <div className="w-full max-w-3xl">
              {selectedFeature === 'upload' && <UploadImage />}
              {selectedFeature === 'scan' && <ScanImage />}
              {selectedFeature === 'capture' && <ClickedPhoto />}
            </div>

            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        </main>
      </div>
    </div>
  );
}
