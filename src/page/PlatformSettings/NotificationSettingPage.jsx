import React from 'react';

export default function NotificationSettingPage({ onBack }) {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[50vh] p-8">
      {onBack && (
        <button onClick={onBack} className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-10 z-[100] text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm">
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span>Back</span>
        </button>
      )}
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
         <svg className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black text-[#1e2a52] mb-4 text-center tracking-tight">Notification Setting</h2>
      <p className="text-slate-500 font-medium text-center max-w-lg text-sm sm:text-base leading-relaxed">
        Manage email, push, and in-app alert preferences.
      </p>
      <div className="mt-8 px-6 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-xs uppercase tracking-widest border border-blue-100">
        Module Under Development
      </div>
    </div>
  );
}
