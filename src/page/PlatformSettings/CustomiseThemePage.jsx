import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check, Sun, Moon, Monitor } from 'lucide-react';
import ToolCard, { Header as GlobalHeader, Footer as GlobalFooter } from '../../components/nexora';
import { NEXORA_MODULES } from '../../data/nexora';


const COLORS = [
  { name: 'Sky Blue', icon: '🔵', value: '#0ea5e9' },
  { name: 'Midnight Navy', icon: '🌌', value: '#1e3a8a' },
  { name: 'Emerald Green', icon: '🟢', value: '#10b981' },
  { name: 'Royal Purple', icon: '🟣', value: '#8b5cf6' },
  { name: 'Cyber Teal', icon: '🩵', value: '#0d9488' },
  { name: 'Sunset Orange', icon: '🟠', value: '#f97316' },
  { name: 'Rose Pink', icon: '🌸', value: '#f43f5e' },
  { name: 'Amber Gold', icon: '🟡', value: '#f59e0b' },
  { name: 'Ocean Blue', icon: '🌊', value: '#0284c7' },
  { name: 'Lime Green', icon: '🟩', value: '#84cc16' },
  { name: 'Slate Gray', icon: '⚫', value: '#64748b' },
  { name: 'Crimson Red', icon: '🔴', value: '#dc2626' },
];

const DISPLAY_MODES = [
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'system', name: 'System', icon: Monitor },
  { id: 'custom', name: 'Custom Color', icon: Palette },
];

const hex2rgb = (hex) => {
  const v = parseInt(hex.replace('#', ''), 16);
  return `${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}`;
};

export default function ThemeSelector({ onBack }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Applied State (affects actual application)
  const [appliedColor, setAppliedColor] = useState(COLORS[0].value);
  const [appliedMode, setAppliedMode] = useState('light');

  // Staged State (affects only the preview modal)
  const [stagedColor, setStagedColor] = useState(COLORS[0].value);
  const [stagedMode, setStagedMode] = useState('light');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem('theme-color');
    const savedMode = localStorage.getItem('theme-mode');
    if (savedColor) {
      setAppliedColor(savedColor);
      setStagedColor(savedColor);
    }
    if (savedMode) {
      setAppliedMode(savedMode);
      setStagedMode(savedMode);
    }
    setMounted(true);
  }, []);

  // Global Theme Injection based on APPLIED state
  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem('theme-color', appliedColor);
    localStorage.setItem('theme-mode', appliedMode);

    const root = document.documentElement;
    root.style.setProperty('--primary-theme-color', appliedColor);
    root.style.setProperty('--primary-theme-color-rgb', hex2rgb(appliedColor));

    const applyTheme = (modeId) => {
      // Reset classes
      root.classList.remove('dark', 'custom-color-theme');
      document.body.classList.remove('dark-mode-active', 'custom-color-theme');
      
      if (modeId === 'dark') {
        root.classList.add('dark');
        document.body.classList.add('dark-mode-active');
      } else if (modeId === 'custom') {
        root.classList.add('custom-color-theme');
        document.body.classList.add('custom-color-theme');
      } else if (modeId === 'system') {
        const isSysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isSysDark) {
          root.classList.add('dark');
          document.body.classList.add('dark-mode-active');
        }
      }
    };

    applyTheme(appliedMode);
  }, [appliedColor, appliedMode, mounted]);

  // System theme change listener for APPLIED state
  useEffect(() => {
    if (appliedMode !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark-mode-active');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark-mode-active');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [appliedMode]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOpen = () => {
    setStagedColor(appliedColor);
    setStagedMode(appliedMode);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setAppliedColor(stagedColor);
    setAppliedMode(stagedMode);
    setIsOpen(false);
  };

  // Preview Logic
  const isPreviewDark = stagedMode === 'dark' || (stagedMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isPreviewCustom = stagedMode === 'custom';
  const previewRgb = hex2rgb(stagedColor);

  return (
    <div className="flex-1 flex flex-col w-full min-h-screen relative p-4 sm:p-6 md:p-8 overflow-hidden bg-slate-900/50 backdrop-blur-md z-50">
      
      {/* Global Dynamic Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Global Dynamic Theme Overrides */
          ::selection {
            background: rgba(var(--primary-theme-color-rgb), 0.3) !important;
            color: inherit;
          }
          
          /* Dark Mode Overrides */
          .dark-mode-active,
          .dark-mode-active .min-h-screen {
            background-color: #020617 !important; /* slate-950 */
            color: #f8fafc !important; /* slate-50 */
          }
          
          .dark-mode-active header,
          .dark-mode-active footer {
            background-color: #0f172a !important; /* slate-900 */
            border-color: #1e293b !important;
          }
          
          .dark-mode-active header h1,
          .dark-mode-active h2,
          .dark-mode-active h3 {
            color: #e2e8f0 !important; /* slate-200 */
          }
          
          .dark-mode-active header p,
          .dark-mode-active footer p,
          .dark-mode-active footer span,
          .dark-mode-active footer div,
          .dark-mode-active footer h3 {
            color: #cbd5e1 !important;
          }
          
          .dark-mode-active header input {
            background-color: #1e293b !important;
            border-color: transparent !important;
            color: #f8fafc !important;
          }
          
          .dark-mode-active header button.bg-\\[\\#1e2a52\\] {
            background-color: #2563eb !important;
            color: white !important;
          }
          
          .dark-mode-active .bg-white {
            background-color: #0f172a !important; /* slate-900 */
            border-color: #1e293b !important;
          }
          
          .dark-mode-active .text-slate-800,
          .dark-mode-active .text-slate-700,
          .dark-mode-active .text-slate-600 {
            color: #cbd5e1 !important; /* slate-300 */
          }

          /* Custom Color Theme Overrides */
          .custom-color-theme,
          .custom-color-theme .min-h-screen {
            background-color: rgba(var(--primary-theme-color-rgb), 0.03) !important;
            color: var(--primary-theme-color) !important;
          }

          .custom-color-theme h2,
          .custom-color-theme h3,
          .custom-color-theme .text-\\[\\#1e2a52\\] {
            color: var(--primary-theme-color) !important;
          }
          
          /* Dynamic and Attractive Header Heading (NEXORA text) */
          .custom-color-theme header h1 {
            background: linear-gradient(135deg, var(--primary-theme-color) 0%, rgba(var(--primary-theme-color-rgb), 0.6) 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            color: var(--primary-theme-color) !important;
            text-shadow: 0px 4px 16px rgba(var(--primary-theme-color-rgb), 0.25) !important;
            filter: drop-shadow(0 2px 4px rgba(var(--primary-theme-color-rgb), 0.1));
          }

          .custom-color-theme .bg-\\[\\#f0f6ff\\] {
            background-color: transparent !important;
          }

          .custom-color-theme .bg-white,
          .custom-color-theme .bg-slate-100 {
            background-color: white !important;
            border-color: rgba(var(--primary-theme-color-rgb), 0.2) !important;
            box-shadow: 0 4px 20px rgba(var(--primary-theme-color-rgb), 0.08) !important;
          }

          /* Header and Nav Bar Overrides */
          .custom-color-theme header,
          .custom-color-theme footer {
            background-color: rgba(var(--primary-theme-color-rgb), 0.04) !important;
            border-color: rgba(var(--primary-theme-color-rgb), 0.15) !important;
          }
          
          .custom-color-theme header p,
          .custom-color-theme footer,
          .custom-color-theme footer p,
          .custom-color-theme footer span,
          .custom-color-theme footer div,
          .custom-color-theme footer h3 {
            color: rgba(var(--primary-theme-color-rgb), 0.85) !important;
          }
          
          .custom-color-theme header input {
            background-color: white !important;
            border-color: rgba(var(--primary-theme-color-rgb), 0.3) !important;
            color: var(--primary-theme-color) !important;
          }
          
          .custom-color-theme header button.bg-\\[\\#1e2a52\\] {
            background-color: var(--primary-theme-color) !important;
            color: white !important;
            box-shadow: 0 4px 15px rgba(var(--primary-theme-color-rgb), 0.4) !important;
          }
          
          .custom-color-theme header button.bg-\\[\\#1e2a52\\]:hover {
            box-shadow: 0 6px 20px rgba(var(--primary-theme-color-rgb), 0.6) !important;
            transform: translateY(-2px);
          }
          
          .custom-color-theme #sticky-icon-nav.is-sticky {
            background-color: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(10px);
            border-bottom-color: rgba(var(--primary-theme-color-rgb), 0.15) !important;
            box-shadow: 0 4px 20px rgba(var(--primary-theme-color-rgb), 0.08) !important;
          }
          
          .custom-color-theme .text-slate-800,
          .custom-color-theme .text-slate-700,
          .custom-color-theme .text-slate-600 {
            color: var(--primary-theme-color) !important;
            opacity: 0.9;
          }
          
          .theme-colored-text {
            color: var(--primary-theme-color) !important;
          }
          
          .theme-colored-bg {
            background-color: var(--primary-theme-color) !important;
          }
        `
      }} />

      {/* Main Theme Studio Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="flex-1 w-full max-w-[1600px] mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row"
      >
        {/* LEFT COLUMN: Controls */}
        <div className="w-full md:w-[420px] shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5" style={{ color: stagedColor }} />
                Appearance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customize your Nexora experience
              </p>
            </div>
            {onBack && (
              <button 
                onClick={onBack}
                className="px-4 py-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2 text-sm"
              >
                <X className="w-4 h-4" /> Close
              </button>
            )}
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            
            {/* Display Mode Section */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                Display Mode
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {DISPLAY_MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = stagedMode === mode.id;
                  return (
                    <motion.button
                      key={mode.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStagedMode(mode.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                        isActive 
                          ? 'bg-slate-50 dark:bg-slate-800 shadow-md' 
                          : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                      style={{
                        borderColor: isActive ? stagedColor : undefined,
                        color: isActive ? stagedColor : 'var(--tw-text-slate-500)'
                      }}
                    >
                      <Icon className={`w-5 h-5 mb-1.5 ${!isActive && 'text-slate-400 dark:text-slate-500'}`} />
                      <span className={`text-[11px] font-medium ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        {mode.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Theme Colors Section */}
            <AnimatePresence>
              {stagedMode === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                    Theme Color
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {COLORS.map((color) => {
                      const isActive = stagedColor === color.value;
                      return (
                        <motion.button
                          key={color.name}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setStagedColor(color.value)}
                          className={`relative group flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all overflow-hidden ${
                            isActive 
                              ? 'shadow-md' 
                              : 'border-transparent bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                          style={{
                            borderColor: isActive ? stagedColor : 'transparent',
                            backgroundColor: isActive ? `rgba(${parseInt(color.value.slice(1,3),16)}, ${parseInt(color.value.slice(3,5),16)}, ${parseInt(color.value.slice(5,7),16)}, 0.1)` : undefined
                          }}
                        >
                          {/* Color Circle */}
                          <div 
                            className="w-8 h-8 rounded-full shadow-sm mb-1.5 flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ backgroundColor: color.value }}
                          >
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-white"
                              >
                                <Check className="w-4 h-4" />
                              </motion.div>
                            )}
                          </div>
                          
                          {/* Text */}
                          <span className={`text-[9px] font-semibold text-center leading-tight ${
                            isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                          }`}>
                            {color.name}
                          </span>

                          {/* Active Indicator Glow */}
                          {isActive && (
                            <motion.div
                              layoutId="activeColorGlow"
                              className="absolute inset-0 z-[-1] opacity-20"
                              style={{ background: `radial-gradient(circle at center, ${color.value} 0%, transparent 70%)` }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
          
          {/* Mobile Footer (Hidden on MD) */}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end md:hidden">
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 rounded-xl text-white font-medium shadow-sm transition-all hover:opacity-90 hover:shadow-md active:scale-95 w-full"
              style={{ backgroundColor: stagedColor }}
            >
              Apply Theme <Check className="w-4 h-4 inline-block ml-1" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Realtime Preview */}
        <div className="hidden md:flex flex-1 flex-col bg-slate-100 dark:bg-slate-950 p-6 lg:p-8 relative overflow-hidden">
          <div className="mb-4 shrink-0 relative z-10">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Monitor className="w-4 h-4" /> Realtime Preview
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              See how your theme looks before applying
            </p>
          </div>

          {/* Mini App Mockup using actual components */}
          <div 
            className="flex-1 rounded-2xl border-4 border-slate-200 dark:border-slate-700 overflow-hidden relative shadow-inner w-full min-h-[450px]"
            style={{
              backgroundColor: isPreviewDark ? '#020617' : isPreviewCustom ? `rgba(${previewRgb}, 0.03)` : '#f0f6ff'
            }}
          >
            <div 
              className={`absolute top-0 left-0 w-[250%] h-[250%] origin-top-left pointer-events-none transition-colors duration-300 ${isPreviewDark ? 'dark-mode-active' : ''} ${isPreviewCustom ? 'custom-color-theme' : ''}`}
              style={{
                transform: 'scale(0.4)', // w-[250%] * 0.4 = exactly 100% of parent width, no blank spaces!
                backgroundColor: isPreviewDark ? '#020617' : isPreviewCustom ? `rgba(${previewRgb}, 0.03)` : '#f0f6ff',
                '--primary-theme-color': stagedColor,
                '--primary-theme-color-rgb': previewRgb,
              }}
            >
              <GlobalHeader searchQuery="" onSearchChange={() => {}} disableScrollAnimation={true} />
              
              <main className="w-full mx-auto px-12 pt-8 pb-20">
                <div className="grid grid-cols-4 gap-6">
                  {NEXORA_MODULES.slice(0, 16).map((tool, index) => (
                    <ToolCard key={tool.name} tool={tool} index={index} disableCssAnimation={true} />
                  ))}
                </div>
              </main>
              
              <GlobalFooter pageName="NEXORA INTELLIGENCE" audience="Law Enforcement & Security Agencies" />
            </div>
          </div>

          {/* Confirm Button Overlay at Bottom of Right Column */}
          <div className="mt-6 shrink-0 flex justify-end relative z-10">
            <button
              onClick={handleConfirm}
              className="px-8 py-3 rounded-xl text-white font-bold shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 text-lg"
              style={{ backgroundColor: stagedColor }}
            >
              Apply Theme <Check className="w-5 h-5" />
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}