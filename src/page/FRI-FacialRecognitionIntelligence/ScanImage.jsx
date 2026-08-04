import React, { useState, useEffect } from 'react';

/**
 * ScanImage Component
 * 
 * Simulates a hardware scanning process. Displays a progress bar and animated spinner
 * to visually communicate scanning status to the user before allowing them to analyze
 * the "scanned" document.
 */
export default function ScanImage() {
  // State variables tracking the progress of the scanning simulation
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0); // Progress percentage (0-100)
  const [scanComplete, setScanComplete] = useState(false);

  /**
   * Effect Hook: Handles the progression of the simulated scan interval.
   * Increments the progress bar by 2% every 50 milliseconds.
   */
  useEffect(() => {
    let interval;
    if (isScanning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Once 100% is reached, stop the interval and update state flags
            clearInterval(interval);
            setIsScanning(false);
            setScanComplete(true);
            return 100;
          }
          return prev + 2; // Increment progress
        });
      }, 50);
    }
    
    // Cleanup function ensures the interval clears if the component unmounts mid-scan
    return () => clearInterval(interval);
  }, [isScanning]);

  /**
   * Resets all state flags and initiates the scanning simulation process.
   */
  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setScanComplete(false);
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-slate-200 mt-6 flex flex-col items-center justify-center animate-fade-in transition-all min-h-[300px]">
      
      {/* State 1: Idle (Not scanning and not complete) */}
      {!isScanning && !scanComplete ? (
        <>
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Scan Image</h3>
          <p className="text-slate-500 mb-6 text-center max-w-md">Connect to a scanner to directly import physical photos for analysis.</p>
          <button onClick={startScan} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-full transition-colors shadow-sm">
            Start Scanning
          </button>
        </>
      ) : isScanning ? (
        
        /* State 2: Actively Scanning (Show animated progress) */
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Animated Spinner Icon */}
          <div className="w-20 h-20 mb-6 relative">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Scanning Document...</h3>
          
          {/* Progress Bar Track */}
          <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
            {/* Progress Bar Fill */}
            <div className="bg-indigo-600 h-full transition-all duration-75" style={{ width: `${progress}%` }}></div>
          </div>
          
          <p className="text-sm text-slate-500 font-medium">{progress}% Complete</p>
        </div>
      ) : (
        
        /* State 3: Scan Complete (Show success and action buttons) */
        <div className="w-full flex flex-col items-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Scan Successful</h3>
          <p className="text-slate-500 mb-6 text-center">The document has been scanned and is ready for facial recognition.</p>
          
          {/* Action Buttons: Retry & Analyze */}
          <div className="flex gap-4">
            <button onClick={() => setScanComplete(false)} className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full transition-colors">
              Scan Again
            </button>
            <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Analyze Face
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
