import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  Monitor,
  Save,
  ArrowLeft,
  Check,
  RotateCcw,
  Search,
  Layout,
  Radio
} from 'lucide-react';
import ToolCard from '../../components/nexora';

const SAVED_ZOOM_KEY = 'nexora_zoom_settings_v1';

const DEFAULT_SETTINGS = {
  zoomLevel: 100, // Percentage
  autoScaling: true,
};

export default function ZoomControlsPage({ onBack }) {
  const getSavedSettings = () => {
    try {
      const saved = localStorage.getItem(SAVED_ZOOM_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage access error:', e);
    }
    return DEFAULT_SETTINGS;
  };

  const initialSettings = getSavedSettings();

  const [zoomLevel, setZoomLevel] = useState(initialSettings.zoomLevel);
  const [autoScaling, setAutoScaling] = useState(initialSettings.autoScaling);

  // Global Save Toast & Message
  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Zoom Settings saved successfully!');

  const handleSave = () => {
    const updatedSettings = {
      zoomLevel,
      autoScaling
    };

    try {
      localStorage.setItem(SAVED_ZOOM_KEY, JSON.stringify(updatedSettings));
      window.dispatchEvent(new Event('zoomUpdate'));
    } catch (e) {
      console.warn('Failed to save zoom settings to localStorage:', e);
    }

    setToastMessage('Zoom Settings saved successfully!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleReset = () => {
    setZoomLevel(DEFAULT_SETTINGS.zoomLevel);
    setAutoScaling(DEFAULT_SETTINGS.autoScaling);

    try {
      localStorage.removeItem(SAVED_ZOOM_KEY);
      window.dispatchEvent(new Event('zoomUpdate'));
    } catch (e) {
      console.warn('Failed to clear localStorage on reset:', e);
    }

    setToastMessage('Zoom Settings reset to default values!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const presets = [75, 100, 125, 150];

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
            Zoom Controls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Increase or decrease the website interface size for better viewing and readability.
          </p>
        </div>

        {/* TOP ROW GRID (2 PANELS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PANEL 1: Zoom Settings */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 border border-cyan-100 shadow-2xs">
                  <Search className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Magnification Level
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Adjust the overall scaling of the interface elements.
                  </p>
                </div>
              </div>

              {/* Slider Control */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-slate-800">Interface Size</span>
                    <div className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-lg font-black text-sm border border-cyan-100 shadow-sm">
                      {zoomLevel}%
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-slate-50 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <ZoomOut className="w-5 h-5 text-slate-400 shrink-0" />
                    <input 
                      type="range" 
                      min="50" 
                      max="200" 
                      step="5" 
                      value={zoomLevel} 
                      onChange={(e) => setZoomLevel(parseInt(e.target.value))}
                      className="flex-1 accent-cyan-500 h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <ZoomIn className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-3">Quick Presets</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {presets.map(preset => (
                      <button
                        key={preset}
                        onClick={() => setZoomLevel(preset)}
                        className={`py-2 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                          zoomLevel === preset 
                            ? 'bg-cyan-50 border-cyan-300 text-cyan-700 shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {preset}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  {/* Switch: Auto Scaling */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Maximize className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <span className="block text-xs font-bold text-slate-800 truncate sm:whitespace-normal">Responsive Auto-Scaling</span>
                        <span className="block text-[calc(10.5px*var(--text-scale,1))] text-slate-400 mt-0.5 leading-snug">Automatically adjust text sizes on small screens</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoScaling(!autoScaling)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${autoScaling ? 'bg-cyan-500' : 'bg-slate-300'}`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${autoScaling ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* PANEL 2: Live Preview */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col space-y-5 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-2 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 shadow-2xs">
                <Layout className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  Live Preview
                </h3>
                <p className="text-xs text-slate-400 font-normal">
                  See how the UI scales with your selected zoom level.
                </p>
              </div>
            </div>

            {/* Preview Container */}
            <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative flex items-center justify-center p-8 min-h-[250px]">
              
              {/* Scaled Preview Item */}
              <div 
                className="w-full max-w-[320px] sm:max-w-[380px] transition-transform duration-300 origin-center"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                <ToolCard 
                  tool={{
                    name: 'TDR',
                    description: 'Tower Dump Record - Analyze cellular tower logs to uncover criminal networks.',
                    icon: () => <Radio className="w-5 h-5" />,
                    bgColor: 'bg-rose-50',
                    iconColor: 'text-rose-600'
                  }} 
                  disableCssAnimation={true}
                />
              </div>

              {/* Grid Background Pattern */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            </div>
            
            {/* Warning if too large */}
            {zoomLevel > 150 && (
              <div className="absolute bottom-6 left-6 right-6 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-4 py-2 rounded-lg text-center z-10 shadow-sm animate-pulse">
                High zoom levels may cause horizontal scrolling on smaller screens.
              </div>
            )}
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
            className="inline-flex items-center gap-2.5 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4.5 h-4.5" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
