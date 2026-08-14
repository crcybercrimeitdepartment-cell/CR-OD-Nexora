import React, { useState, useEffect } from 'react';
import {
  Type,
  Eye,
  MousePointer2,
  Activity,
  Save,
  ArrowLeft,
  Check,
  ChevronDown,
  RotateCcw,
  Monitor,
  Headphones,
  Maximize
} from 'lucide-react';

const SAVED_ACCESSIBILITY_KEY = 'nexora_accessibility_settings_v1';

const DEFAULT_SETTINGS = {
  visualDisplayEnabled: true,
  textSize: 'Medium',
  highContrast: false,
  letterSpacing: 'Normal',
  reducedMotion: false,
  focusIndicators: true,
  screenReaderMode: false,
  colorBlindMode: 'None'
};

const applyAccessibilitySettingsToDOM = (settings) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  
  const isEnabled = settings.visualDisplayEnabled ?? true;

  // Text Size
  if (!isEnabled) {
    root.style.fontSize = '16px';
    root.style.setProperty('--text-scale', '1');
  }
  else if (settings.textSize === 'Small') {
    root.style.fontSize = '14px';
    root.style.setProperty('--text-scale', '0.875');
  }
  else if (settings.textSize === 'Large') {
    root.style.fontSize = '18px';
    root.style.setProperty('--text-scale', '1.125');
  }
  else if (settings.textSize === 'Extra Large') {
    root.style.fontSize = '20px';
    root.style.setProperty('--text-scale', '1.25');
  }
  else {
    root.style.fontSize = '16px'; // Medium
    root.style.setProperty('--text-scale', '1');
  }

  // Letter Spacing
  if (!isEnabled) root.style.letterSpacing = 'normal';
  else if (settings.letterSpacing === 'Wide') root.style.letterSpacing = '0.05em';
  else if (settings.letterSpacing === 'Extra Wide') root.style.letterSpacing = '0.1em';
  else root.style.letterSpacing = 'normal'; // Normal

  // High Contrast
  if (isEnabled && settings.highContrast) {
    root.style.filter = 'contrast(125%) saturate(1.1)';
  } else {
    root.style.filter = 'none';
  }
};

export default function AccessibilitySettingPage({ onBack }) {
  // Load saved settings from localStorage on initial render
  const getSavedSettings = () => {
    try {
      const saved = localStorage.getItem(SAVED_ACCESSIBILITY_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage access error:', e);
    }
    return DEFAULT_SETTINGS;
  };

  const initialSettings = getSavedSettings();

  // Visual Display State
  const [visualDisplayEnabled, setVisualDisplayEnabled] = useState(initialSettings.visualDisplayEnabled);
  const [textSize, setTextSize] = useState(initialSettings.textSize);
  const [textSizeDropdownOpen, setTextSizeDropdownOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(initialSettings.highContrast);
  const [letterSpacing, setLetterSpacing] = useState(initialSettings.letterSpacing);
  const [letterSpacingDropdownOpen, setLetterSpacingDropdownOpen] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(initialSettings.colorBlindMode);
  const [colorBlindDropdownOpen, setColorBlindDropdownOpen] = useState(false);

  // Motion & Interaction State
  const [reducedMotion, setReducedMotion] = useState(initialSettings.reducedMotion);
  const [focusIndicators, setFocusIndicators] = useState(initialSettings.focusIndicators);

  // Assistive Technology State
  const [screenReaderMode, setScreenReaderMode] = useState(initialSettings.screenReaderMode);

  // Global Save Toast & Message
  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Accessibility Settings saved successfully!');

  // Live preview effect
  useEffect(() => {
    applyAccessibilitySettingsToDOM({
      visualDisplayEnabled,
      textSize,
      letterSpacing,
      highContrast
    });
  }, [visualDisplayEnabled, textSize, letterSpacing, highContrast]);

  const handleSave = () => {
    const updatedSettings = {
      visualDisplayEnabled,
      textSize,
      highContrast,
      letterSpacing,
      colorBlindMode,
      reducedMotion,
      focusIndicators,
      screenReaderMode
    };

    try {
      localStorage.setItem(SAVED_ACCESSIBILITY_KEY, JSON.stringify(updatedSettings));
      window.dispatchEvent(new Event('accessibilityUpdate'));
    } catch (e) {
      console.warn('Failed to save accessibility settings to localStorage:', e);
    }

    setToastMessage('Accessibility Settings saved successfully!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleReset = () => {
    setVisualDisplayEnabled(DEFAULT_SETTINGS.visualDisplayEnabled);
    setTextSize(DEFAULT_SETTINGS.textSize);
    setHighContrast(DEFAULT_SETTINGS.highContrast);
    setLetterSpacing(DEFAULT_SETTINGS.letterSpacing);
    setColorBlindMode(DEFAULT_SETTINGS.colorBlindMode);
    setReducedMotion(DEFAULT_SETTINGS.reducedMotion);
    setFocusIndicators(DEFAULT_SETTINGS.focusIndicators);
    setScreenReaderMode(DEFAULT_SETTINGS.screenReaderMode);

    try {
      localStorage.removeItem(SAVED_ACCESSIBILITY_KEY);
      applyAccessibilitySettingsToDOM(DEFAULT_SETTINGS);
      window.dispatchEvent(new Event('accessibilityUpdate'));
    } catch (e) {
      console.warn('Failed to clear localStorage on reset:', e);
    }

    setToastMessage('Settings restored to default values!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const textSizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  const letterSpacings = ['Normal', 'Wide', 'Extra Wide'];
  const colorBlindModes = ['None', 'Protanopia', 'Deuteranopia', 'Tritanopia'];

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
            Accessibility Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Improve usability with text size, contrast, reduced motion, spacing, focus indicators, and other accessibility options.
          </p>
        </div>

        {/* TOP ROW GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            
            {/* PANEL 1: Visual Display */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
              <div>
                {/* Header with Master Toggle */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        Visual Display
                      </h3>
                      <p className="text-xs text-slate-400 font-normal">
                        Adjust text size, spacing, and contrast.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVisualDisplayEnabled(!visualDisplayEnabled)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${visualDisplayEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${visualDisplayEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Controls - visually disabled if visualDisplayEnabled is false */}
                <div className={`space-y-4 pt-2 transition-opacity duration-300 ${!visualDisplayEnabled ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
                  {/* Switch: High Contrast */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-xs font-bold text-slate-800">High Contrast</span>
                      <span className="text-[calc(11px*var(--text-scale,1))] text-slate-400">Increase contrast for better readability</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHighContrast(!highContrast)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${highContrast ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${highContrast ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Dropdown: Text Size */}
                  <div className="flex items-center justify-between gap-2 pt-1 relative">
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Text Size</span>
                      <span className="text-[calc(11px*var(--text-scale,1))] text-slate-400">Choose the default text size</span>
                    </div>
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setTextSizeDropdownOpen(!textSizeDropdownOpen)}
                        className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs hover:border-slate-400 cursor-pointer min-w-[110px] justify-between"
                      >
                        <span>{textSize}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                      {textSizeDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 py-1 min-w-[120px]">
                          {textSizes.map((size) => (
                            <div
                              key={size}
                              onClick={() => {
                                setTextSize(size);
                                setTextSizeDropdownOpen(false);
                              }}
                              className={`px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-blue-50 ${textSize === size ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'}`}
                            >
                              {size}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dropdown: Letter Spacing */}
                  <div className="flex items-center justify-between gap-2 pt-1 relative">
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Letter Spacing</span>
                      <span className="text-[calc(11px*var(--text-scale,1))] text-slate-400">Increase space between letters</span>
                    </div>
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setLetterSpacingDropdownOpen(!letterSpacingDropdownOpen)}
                        className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs hover:border-slate-400 cursor-pointer min-w-[110px] justify-between"
                      >
                        <span>{letterSpacing}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                      {letterSpacingDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 py-1 min-w-[120px]">
                          {letterSpacings.map((spacing) => (
                            <div
                              key={spacing}
                              onClick={() => {
                                setLetterSpacing(spacing);
                                setLetterSpacingDropdownOpen(false);
                              }}
                              className={`px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-blue-50 ${letterSpacing === spacing ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'}`}
                            >
                              {spacing}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dropdown: Color Blind Mode */}
                  <div className="flex items-center justify-between gap-2 pt-1 relative">
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Color Blind Filter</span>
                      <span className="text-[calc(11px*var(--text-scale,1))] text-slate-400">Adjust colors for color blindness</span>
                    </div>
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setColorBlindDropdownOpen(!colorBlindDropdownOpen)}
                        className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs hover:border-slate-400 cursor-pointer min-w-[110px] justify-between"
                      >
                        <span>{colorBlindMode}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                      {colorBlindDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 py-1 min-w-[130px]">
                          {colorBlindModes.map((mode) => (
                            <div
                              key={mode}
                              onClick={() => {
                                setColorBlindMode(mode);
                                setColorBlindDropdownOpen(false);
                              }}
                              className={`px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-blue-50 ${colorBlindMode === mode ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'}`}
                            >
                              {mode}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* PANEL 3: Assistive Technology */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5 flex-1">
              <div>
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100 shadow-2xs">
                    <Headphones className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      Assistive Technology
                    </h3>
                    <p className="text-xs text-slate-400 font-normal">
                      Options for screen readers and voice control.
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4 pt-1">
                  {/* Switch: Screen Reader Mode */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Screen Reader Optimization</span>
                      <span className="text-[calc(11px*var(--text-scale,1))] text-slate-400">Enhance compatibility with screen readers</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setScreenReaderMode(!screenReaderMode)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${screenReaderMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${screenReaderMode ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            
            {/* LIVE TEXT PREVIEW BOX */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-2 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 shadow-2xs">
                  <Type className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Live Preview Box
                  </h3>
                  <p className="text-[calc(11px*var(--text-scale,1))] text-slate-400 font-normal">
                    See how your visual settings affect the actual text size globally across Nexora.
                  </p>
                </div>
              </div>

              {/* Box Preview */}
              <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 text-[#1e2a52] transition-all">
                <h4 className="font-bold mb-2">Example Intelligence Report</h4>
                <p className="opacity-80">
                  This text dynamically reflects your selected <span className="font-bold underline text-blue-700">{!visualDisplayEnabled ? 'Default' : textSize}</span> font size and <span className="font-bold underline text-blue-700">{!visualDisplayEnabled ? 'Default' : letterSpacing}</span> letter spacing. Changes happen instantly for a real preview before you save!
                </p>
              </div>
            </div>

            {/* PANEL 2: Motion & Interaction */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5 flex-1">
              <div>
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
                    <Activity className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      Motion & Interaction
                    </h3>
                    <p className="text-xs text-slate-400 font-normal">
                      Control animations and focus indicators.
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4 pt-2">
                  {/* Switch: Reduced Motion */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                        <Monitor className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800">Reduced Motion</span>
                        <span className="text-[calc(11px*var(--text-scale,1))] text-slate-400">Minimize animations and transitions</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReducedMotion(!reducedMotion)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${reducedMotion ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${reducedMotion ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Switch: Focus Indicators */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <MousePointer2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800">Focus Indicators</span>
                        <span className="text-[calc(10.5px*var(--text-scale,1))] text-slate-400">Highlight active elements for keyboard users</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFocusIndicators(!focusIndicators)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${focusIndicators ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${focusIndicators ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS: RESTORE DEFAULT & SAVE */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-6">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-sm font-bold rounded-xl shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Restore to Default</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2.5 px-8 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4.5 h-4.5 shrink-0" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
