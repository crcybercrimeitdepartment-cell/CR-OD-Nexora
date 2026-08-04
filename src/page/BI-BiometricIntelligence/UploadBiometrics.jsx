import React, { useState } from 'react';

/**
 * UploadBiometrics Component
 * Handles the uploading of various biometric data files (Face, Fingerprint, Iris, Voice).
 * Dynamically updates the UI, icons, and allowed file types based on the selected feature.
 * 
 * @param {Object} props
 * @param {string} props.featureType - The specific biometric feature type (e.g., 'upload_face', 'upload_voice')
 */
export default function UploadBiometrics({ featureType }) {
  // State to hold the currently uploaded file's local preview URL
  const [file, setFile] = useState(null);

  // Determine the exact active biometric feature type based on the prop
  const isFace = featureType === 'upload_face';
  const isFingerprint = featureType === 'upload_fingerprint';
  const isIris = featureType === 'upload_iris';
  const isVoice = featureType === 'upload_voice';
  
  // Format the human-readable feature name for UI text rendering
  const featureName = isFace ? 'Face Image' : isFingerprint ? 'Fingerprint' : isIris ? 'Iris Scan' : isVoice ? 'Voice Recording' : 'Biometric Data';

  /**
   * Handles the file input change event.
   * Extracts the file and generates a local blob URL for previewing before analysis.
   */
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  /**
   * Dynamically renders the correct SVG icon based on the active feature.
   * Utilizes a perfectly centered relative flex layout to prevent path overlapping.
   */
  const renderIcon = () => {
    if (isFace) {
      return (
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Background Corner Brackets */}
          <svg className="absolute inset-0 w-full h-full text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
          </svg>
          {/* Inner Face Icon */}
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      );
    }
    if (isFingerprint) {
      return (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
          </svg>
          <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        </div>
      );
    }
    if (isIris) {
      return (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
          </svg>
          <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      );
    }
    if (isVoice) {
      return (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
          </svg>
          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
      );
    }
    
    // Default Drag Area Icon
    return (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    );
  };

  /**
   * Returns the dynamic background color class based on the active feature type.
   * Ensures the UI matches the feature's established color coding.
   */
  const getBgColor = () => {
    if (isFace) return "bg-blue-50 border border-blue-100 shadow-sm";
    if (isFingerprint) return "bg-emerald-50 border border-emerald-100 shadow-sm";
    if (isIris) return "bg-purple-50 border border-purple-100 shadow-sm";
    if (isVoice) return "bg-orange-50 border border-orange-100 shadow-sm";
    return "bg-slate-50 border border-slate-200 shadow-sm"; // Fallback color
  };

  return (
    <div className="w-full p-8 bg-white rounded-3xl shadow-sm border border-slate-200 mt-2 flex flex-col items-center justify-center animate-fade-in transition-all min-h-[400px]">
      
      {/* State 1: File is NOT uploaded yet (Show Upload Input) */}
      {!file ? (
        <>
          {/* Dynamic Icon Container */}
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${getBgColor()}`}>
            {renderIcon()}
          </div>
          
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Upload {featureName}</h3>
          
          <p className="text-slate-500 mb-8 text-center max-w-sm text-[15px]">
            Please upload a secure {featureName.toLowerCase()} file from your device for analysis.
          </p>
          
          {/* Hidden File Input wrapped in a stylized label button */}
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Browse Files
            {/* Limit file selection to audio for voice, image for others */}
            <input type="file" className="hidden" accept={isVoice ? "audio/*" : "image/*"} onChange={handleFileChange} />
          </label>
        </>
      ) : (
        
        /* State 2: File IS uploaded (Show Preview & Action Buttons) */
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-sm p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl mb-8 flex flex-col items-center justify-center">
            
            {/* Conditional Rendering: Show audio visualization for voice, image preview for others */}
            {isVoice ? (
              <div className="w-full h-32 flex items-center justify-center text-orange-500">
                {/* Audio pulse animation placeholder */}
                <svg className="w-16 h-16 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
              </div>
            ) : (
              <img src={file} alt="Uploaded biometric" className="max-h-56 object-contain rounded-xl" />
            )}
          </div>
          
          {/* Action Buttons: Remove File & Analyze Data */}
          <div className="flex gap-4">
            <button onClick={() => setFile(null)} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
              Remove
            </button>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Analyze Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
