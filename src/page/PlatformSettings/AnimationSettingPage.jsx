import React, { useState } from 'react';
import {
  Activity,
  PlaySquare,
  MousePointer2,
  FastForward,
  Save,
  ArrowLeft,
  Check,
  RotateCcw,
  MonitorPlay
} from 'lucide-react';

const SAVED_ANIM_KEY = 'nexora_animation_settings_v1';

const DEFAULT_SETTINGS = {
  enableAnimations: true,
  enableTransitions: true,
  enableHoverEffects: true,
  animationSpeed: 1.0,
};

export default function AnimationSettingPage({ onBack }) {
  // Load saved settings from localStorage on initial render
  const getSavedSettings = () => {
    try {
      const saved = localStorage.getItem(SAVED_ANIM_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage access error:', e);
    }
    return DEFAULT_SETTINGS;
  };

  const initialSettings = getSavedSettings();

  const [enableAnimations, setEnableAnimations] = useState(initialSettings.enableAnimations);
  const [enableTransitions, setEnableTransitions] = useState(initialSettings.enableTransitions);
  const [enableHoverEffects, setEnableHoverEffects] = useState(initialSettings.enableHoverEffects);
  const [animationSpeed, setAnimationSpeed] = useState(initialSettings.animationSpeed);

  // Global Save Toast & Message
  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Animation Settings saved successfully!');

  const handleSave = () => {
    const updatedSettings = {
      enableAnimations,
      enableTransitions,
      enableHoverEffects,
      animationSpeed
    };

    try {
      localStorage.setItem(SAVED_ANIM_KEY, JSON.stringify(updatedSettings));
      window.dispatchEvent(new Event('animationUpdate'));
    } catch (e) {
      console.warn('Failed to save animation settings to localStorage:', e);
    }

    setToastMessage('Animation Settings saved successfully!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleReset = () => {
    setEnableAnimations(DEFAULT_SETTINGS.enableAnimations);
    setEnableTransitions(DEFAULT_SETTINGS.enableTransitions);
    setEnableHoverEffects(DEFAULT_SETTINGS.enableHoverEffects);
    setAnimationSpeed(DEFAULT_SETTINGS.animationSpeed);

    try {
      localStorage.removeItem(SAVED_ANIM_KEY);
      window.dispatchEvent(new Event('animationUpdate'));
    } catch (e) {
      console.warn('Failed to clear localStorage on reset:', e);
    }

    setToastMessage('Animation Settings reset to default values!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Back to Dashboard Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-xs hover:shadow-md text-slate-700 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#1e2a52]" />
          <span>Back</span>
        </button>
      )}

      {/* Main Wrapper */}
      <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden space-y-6">

        {/* Dynamic Toast Alert positioning */}
        {savedToast && (
          <div className="fixed top-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold z-50 transition-all duration-300 animate-bounce">
            <Check className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Animation Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Enable/disable animations, transitions, hover effects, and adjust animation speed.
          </p>
        </div>

        {/* TOP ROW GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PANEL 1: Global Motion */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 shadow-2xs">
                  <MonitorPlay className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Global Motion
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Toggle main UI animations and transitions.
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4 pt-2">
                {/* Switch: Enable Animations */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Enable Animations</span>
                      <span className="text-[calc(10.5px*var(--text-scale,1))] text-slate-400">Master switch for all complex animations</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enableAnimations}
                    onClick={() => setEnableAnimations(!enableAnimations)}
                    className={`w-11 h-6 shrink-0 flex items-center rounded-full p-1 cursor-pointer outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-indigo-500 hover:ring-4 active:scale-90 ${enableAnimations ? 'hover:ring-indigo-200 bg-indigo-600 transition-all duration-300 ease-out' : 'hover:ring-slate-200 bg-slate-300 transition-none'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform ${enableAnimations ? 'transition-transform duration-300 ease-out translate-x-5' : 'transition-none translate-x-0'}`} />
                  </button>
                </div>

                {/* Switch: Enable Transitions */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                      <PlaySquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Enable Transitions</span>
                      <span className="text-[calc(10.5px*var(--text-scale,1))] text-slate-400">Page routing and component loading effects</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enableTransitions}
                    onClick={() => setEnableTransitions(!enableTransitions)}
                    className={`w-11 h-6 shrink-0 flex items-center rounded-full p-1 outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-90 ${!enableAnimations ? 'opacity-50 cursor-not-allowed transition-none bg-slate-300' : enableTransitions ? 'cursor-pointer hover:ring-4 hover:ring-indigo-200 bg-indigo-600 transition-all duration-300 ease-out' : 'cursor-pointer hover:ring-4 hover:ring-slate-200 bg-slate-300 transition-all duration-300 ease-out'}`}
                    disabled={!enableAnimations}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform ${enableAnimations ? 'transition-transform duration-300 ease-out' : 'transition-none'} ${enableTransitions && enableAnimations ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Switch: Hover Effects */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                      <MousePointer2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Hover Effects</span>
                      <span className="text-[calc(10.5px*var(--text-scale,1))] text-slate-400">Interactive mouse-over visual changes</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enableHoverEffects}
                    onClick={() => setEnableHoverEffects(!enableHoverEffects)}
                    className={`w-11 h-6 shrink-0 flex items-center rounded-full p-1 outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-90 ${!enableAnimations ? 'opacity-50 cursor-not-allowed transition-none bg-slate-300' : enableHoverEffects ? 'cursor-pointer hover:ring-4 hover:ring-indigo-200 bg-indigo-600 transition-all duration-300 ease-out' : 'cursor-pointer hover:ring-4 hover:ring-slate-200 bg-slate-300 transition-all duration-300 ease-out'}`}
                    disabled={!enableAnimations}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform ${enableAnimations ? 'transition-transform duration-300 ease-out' : 'transition-none'} ${enableHoverEffects && enableAnimations ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2: Speed Controls */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 shadow-2xs">
                  <FastForward className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Speed Controls
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Adjust the overall duration of animations.
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    Global Animation Speed
                  </h4>
                  
                  <div className={`flex items-center gap-4 bg-slate-50 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm ${!enableAnimations ? 'opacity-50 pointer-events-none' : ''}`}>
                    <span className="font-bold text-slate-700 w-12 text-center">{Number(animationSpeed).toFixed(1)}x</span>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="2.5" 
                      step="0.1" 
                      value={animationSpeed} 
                      onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                      className={`flex-1 accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 hover:accent-indigo-500 active:scale-[0.99] ${enableAnimations ? 'transition-all duration-300' : 'transition-none'}`}
                      aria-label="Global Animation Speed"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 px-1 text-[calc(10px*var(--text-scale,1))] font-bold text-slate-400 uppercase">
                    <span>Slower (0.5x)</span>
                    <span>Normal (1.0x)</span>
                    <span>Faster (2.5x)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS: RESET & SAVE */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-sm font-bold rounded-xl shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2.5 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4.5 h-4.5" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
