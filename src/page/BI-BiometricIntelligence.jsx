import React, { useState } from 'react';
import UploadBiometrics from './BI-BiometricIntelligence/UploadBiometrics';
import CaptureBiometrics from './BI-BiometricIntelligence/CaptureBiometrics';

/**
 * Header Component.
 * Renders the title and a brief description of the page's purpose.
 */
export function Header() {
  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>Biometric Intelligence</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Analyze biometric logs and identity verification systems.
          </p>
        </div>
      </div>
    </header>
  );
}

/**
 * Main Biometric Intelligence Page Component.
 * Orchestrates the navigation between the dashboard grid and the capture/upload workflows.
 * Integrates directly with the browser's History API to provide native swipe-back support.
 *
 * @param {Object} props
 * @param {Function} props.onBack - Callback to return to the parent Tools dashboard
 */
export default function BIPage({ onBack }) {
  // Tracks the currently active biometric task (e.g., 'capture_face', 'upload_iris'). null means grid layout.
  const [activeFeature, setActiveFeature] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync activeFeature state with browser history (popstate)
  // This allows native browser gestures (like trackpad swipe back) to cleanly close the active feature
  React.useEffect(() => {
    const handlePopState = () => {
      if (activeFeature) {
        setActiveFeature(null); // Return to grid without leaving the app
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeFeature]);

  /**
   * Opens a specific biometric feature and pushes a state to browser history.
   * This ensures the next "back" action closes the feature rather than leaving the app.
   */
  const handleFeatureOpen = (feature) => {
    setActiveFeature(feature);
    window.history.pushState({ featureOpen: true }, '');
  };

  /**
   * Closes the active biometric feature and consumes the pushed history state.
   */
  const handleFeatureClose = () => {
    setActiveFeature(null);
    if (window.history.state && window.history.state.featureOpen) {
      window.history.back(); // Clean up the history stack
    }
  };

  /**
   * Master back handler for the top-left UI Back button.
   * If a feature is open, it closes the feature. If not, it returns to the parent dashboard.
   */
  const handleBack = () => {
    if (activeFeature) {
      handleFeatureClose();
    } else if (onBack) {
      onBack();
    }
  };

  const isUpload = activeFeature && activeFeature.startsWith('upload');
  const isCapture = activeFeature && activeFeature.startsWith('capture');

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4">
      {(onBack || activeFeature) && (
        <button onClick={handleBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}
      <Header />
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-4 min-h-[500px]">
        <main className="flex-1 pt-1 pb-10">
          <div className="flex flex-col items-center py-8 sm:py-12 px-4 opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.5s ease-out forwards', animationDelay: '0.2s' }}>
            
            {/* Dashboard Layout */}
            {!activeFeature ? (
              <div className="w-full max-w-[1400px] flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8">
                
                {/* Capture Section */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-2">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8v2M3 14v2M21 8v2M21 14v2M8 3h2M14 3h2M8 21h2M14 21h2M6 6h12v12H6z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Live Biometric Capture</h3>
                      <p className="text-sm text-slate-500 mt-1">Capture real-time biometric data using your device.</p>
                    </div>
                  </div>
                  <hr className="border-slate-100 my-5" />
                  
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {/* Face Card */}
                    <div className="border border-slate-100 rounded-xl p-5 flex flex-col items-center text-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow bg-white">
                      <div className="text-blue-500 mb-1 flex items-center justify-center relative w-14 h-14">
                        <svg className="absolute inset-0 w-full h-full text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
                        </svg>
                        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="font-bold text-slate-700 text-[15px]">Capture Face</span>
                      <button 
                        onClick={() => handleFeatureOpen('capture_face')}
                        className={`w-full py-2.5 px-3 mt-2 text-sm font-semibold rounded-lg border transition-colors flex justify-center items-center gap-2 ${
                          activeFeature === 'capture_face' 
                          ? 'bg-blue-50 text-blue-600 border-blue-600 shadow-sm' 
                          : 'text-blue-500 border-blue-200 hover:bg-blue-50 hover:border-blue-300'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Start Capture
                      </button>
                    </div>

                    {/* Fingerprint Card */}
                    <div className="border border-slate-100 rounded-xl p-5 flex flex-col items-center text-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow bg-white">
                      <div className="text-emerald-500 mb-1 flex items-center justify-center relative w-14 h-14">
                        <svg className="absolute inset-0 w-full h-full text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
                        </svg>
                        <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                      </div>
                      <span className="font-bold text-slate-700 text-[15px]">Capture Fingerprint</span>
                      <button 
                        onClick={() => handleFeatureOpen('capture_fingerprint')}
                        className={`w-full py-2.5 px-3 mt-2 text-sm font-semibold rounded-lg border transition-colors flex justify-center items-center gap-2 ${
                          activeFeature === 'capture_fingerprint' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-600 shadow-sm' 
                          : 'text-emerald-500 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                        Start Capture
                      </button>
                    </div>

                    {/* Iris Card */}
                    <div className="border border-slate-100 rounded-xl p-5 flex flex-col items-center text-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow bg-white">
                      <div className="text-purple-500 mb-1 flex items-center justify-center relative w-14 h-14">
                        <svg className="absolute inset-0 w-full h-full text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
                        </svg>
                        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <span className="font-bold text-slate-700 text-[15px]">Capture Iris</span>
                      <button 
                        onClick={() => handleFeatureOpen('capture_iris')}
                        className={`w-full py-2.5 px-3 mt-2 text-sm font-semibold rounded-lg border transition-colors flex justify-center items-center gap-2 ${
                          activeFeature === 'capture_iris' 
                          ? 'bg-purple-50 text-purple-600 border-purple-600 shadow-sm' 
                          : 'text-purple-500 border-purple-200 hover:bg-purple-50 hover:border-purple-300'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Start Capture
                      </button>
                    </div>

                    {/* Voice Card */}
                    <div className="border border-slate-100 rounded-xl p-5 flex flex-col items-center text-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow bg-white">
                      <div className="text-orange-500 mb-1 flex items-center justify-center relative w-14 h-14">
                        <svg className="absolute inset-0 w-full h-full text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
                        </svg>
                        <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <span className="font-bold text-slate-700 text-[15px]">Capture Voice</span>
                      <button 
                        onClick={() => handleFeatureOpen('capture_voice')}
                        className={`w-full py-2.5 px-3 mt-2 text-sm font-semibold rounded-lg border transition-colors flex justify-center items-center gap-2 ${
                          activeFeature === 'capture_voice' 
                          ? 'bg-orange-50 text-orange-600 border-orange-600 shadow-sm' 
                          : 'text-orange-500 border-orange-200 hover:bg-orange-50 hover:border-orange-300'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                        Start Recording
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-2">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Upload Biometric Data</h3>
                      <p className="text-sm text-slate-500 mt-1">Upload existing biometric files from your device.</p>
                    </div>
                  </div>
                  <hr className="border-slate-100 my-5" />
                  
                  <div 
                    onClick={() => handleFeatureOpen('upload_drag')}
                    className={`w-full border border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center transition-colors cursor-pointer mb-6 min-h-[220px] ${
                      activeFeature === 'upload_drag' 
                      ? 'bg-blue-50 border-blue-400' 
                      : 'bg-slate-50 border-slate-300 hover:bg-slate-100 hover:border-blue-300'
                    }`}
                  >
                    <svg className="w-14 h-14 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="font-bold text-slate-700 text-[17px]">Drag & Drop Files Here</p>
                    <p className="text-slate-500 text-sm mt-1 mb-5">or click to browse files</p>
                    <p className="text-slate-400 text-xs">Supports: JPG, PNG, WSQ, BMP, MP3, WAV</p>
                    <p className="text-slate-400 text-xs mt-1.5 font-medium">Max file size: 50MB</p>
                  </div>

                  <div className="flex items-center justify-center mb-6">
                    <div className="h-px flex-1 bg-slate-100"></div>
                    <span className="px-4 text-blue-500 font-bold text-xs uppercase tracking-wider">OR</span>
                    <div className="h-px flex-1 bg-slate-100"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    {/* Upload Face */}
                    <button
                      onClick={() => handleFeatureOpen('upload_face')}
                      className={`py-3.5 px-4 font-semibold text-[13px] sm:text-sm rounded-xl border transition-colors flex items-center justify-start gap-3 ${
                        activeFeature === 'upload_face' 
                        ? 'bg-blue-50 text-slate-800 border-blue-300 shadow-sm' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-blue-500 flex shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2m4-7a4 4 0 118 0 4 4 0 01-8 0zm-2 9a6 6 0 0112 0H5z" /></svg>
                      </span>
                      <span className="truncate">Upload Face Image</span>
                    </button>

                    {/* Upload Fingerprint */}
                    <button
                      onClick={() => handleFeatureOpen('upload_fingerprint')}
                      className={`py-3.5 px-4 font-semibold text-[13px] sm:text-sm rounded-xl border transition-colors flex items-center justify-start gap-3 ${
                        activeFeature === 'upload_fingerprint' 
                        ? 'bg-emerald-50 text-slate-800 border-emerald-300 shadow-sm' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-emerald-500 flex shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                      </span>
                      <span className="truncate">Upload Fingerprint</span>
                    </button>

                    {/* Upload Iris */}
                    <button
                      onClick={() => handleFeatureOpen('upload_iris')}
                      className={`py-3.5 px-4 font-semibold text-[13px] sm:text-sm rounded-xl border transition-colors flex items-center justify-start gap-3 ${
                        activeFeature === 'upload_iris' 
                        ? 'bg-purple-50 text-slate-800 border-purple-300 shadow-sm' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-purple-500 flex shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </span>
                      <span className="truncate">Upload Iris Scan</span>
                    </button>

                    {/* Upload Voice */}
                    <button
                      onClick={() => handleFeatureOpen('upload_voice')}
                      className={`py-3.5 px-4 font-semibold text-[13px] sm:text-sm rounded-xl border transition-colors flex items-center justify-start gap-3 ${
                        activeFeature === 'upload_voice' 
                        ? 'bg-orange-50 text-slate-800 border-orange-300 shadow-sm' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-orange-500 flex shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                      </span>
                      <span className="truncate">Upload Voice Sample</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in">
                <button 
                  onClick={handleFeatureClose} 
                  className="mb-6 self-start text-blue-600 font-semibold flex items-center gap-2 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Selection
                </button>
                {isUpload && <UploadBiometrics key={activeFeature} featureType={activeFeature} />}
                {isCapture && <CaptureBiometrics key={activeFeature} featureType={activeFeature} />}
              </div>
            )}

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
