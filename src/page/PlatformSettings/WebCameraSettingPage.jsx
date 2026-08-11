import React, { useState } from 'react';
import { Camera, CheckCircle2, AlertCircle, Power, Image as ImageIcon } from 'lucide-react';
import { useActivityTracker } from '../../context/ActivityTrackerContext';

export default function WebCameraSettingPage({ onBack }) {
  const { cameraRef, isCameraActive } = useActivityTracker();
  const [lastImage, setLastImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleToggle = () => {
    if (cameraRef.current) {
      cameraRef.current.toggleCamera();
    }
  };

  const handleCapture = async () => {
    if (cameraRef.current && isCameraActive) {
      setIsCapturing(true);
      const img = await cameraRef.current.captureImage();
      setLastImage(img);
      setTimeout(() => setIsCapturing(false), 500);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-screen pb-16 animate-fade-in font-sans">
      
      {/* Header */}
      <header className="w-full relative pt-4 pb-6 mb-6 select-none border-b border-slate-200">
        <div className="flex items-center justify-between w-full relative z-20 px-6 sm:px-10">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-500 hover:text-[#1e2a52] transition-colors font-medium text-sm sm:text-base px-3 py-1.5 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          )}
          <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
              Web Camera Setting
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Configure camera permissions, test captures, and monitor activity logging.
            </p>
          </div>
          <div className="w-[80px]" />
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto px-6 space-y-6">
        
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isCameraActive ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
              <Camera className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1e2a52]">Camera Engine</h2>
              <div className="flex items-center gap-2 mt-1">
                {isCameraActive ? (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    Active & Recording
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm font-medium text-slate-500">
                    <AlertCircle className="w-4 h-4" />
                    Currently Offline
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleToggle}
            className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
              isCameraActive 
                ? 'bg-rose-500 hover:bg-rose-600 text-white active:scale-95'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
            }`}
          >
            <Power className="w-4 h-4" />
            {isCameraActive ? 'Stop Camera' : 'Start Camera'}
          </button>
        </div>

        {/* Capture Test Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-[#1e2a52] mb-4">Diagnostics & Testing</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Use this section to verify that the camera is properly capturing background images. This engine is used by the system to log activity snapshots when navigating between critical modules.
            </p>
            
            <button
              onClick={handleCapture}
              disabled={!isCameraActive || isCapturing}
              className="w-full py-3.5 rounded-xl font-bold text-sm border-2 border-indigo-100 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-200 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCapturing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  Capturing...
                </span>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  Capture Test Snapshot
                </>
              )}
            </button>
            
            {isCameraActive && (
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                  Hardware access granted. The camera is active and ready for background capturing. Activity will be logged in IndexedDB.
                </p>
              </div>
            )}
          </div>

          {/* Preview Window */}
          <div className="bg-slate-50 rounded-2xl p-6 shadow-inner border border-slate-200 flex flex-col items-center justify-center min-h-[300px]">
            {lastImage ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-white">
                <img src={lastImage} alt="Test capture" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-2 text-center text-white text-[10px] font-mono">
                  Captured at {new Date().toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <ImageIcon className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm font-medium">No test image captured yet.</p>
                <p className="text-xs mt-1 text-slate-400 text-center max-w-[200px]">
                  Turn on the camera and capture a snapshot to preview it here.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
