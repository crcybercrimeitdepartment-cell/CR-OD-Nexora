import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check, Sun, Moon, Monitor, Paintbrush } from 'lucide-react';
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
  { id: 'default', name: 'Default Theme', icon: Paintbrush },
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'system', name: 'System', icon: Monitor },
];

const hex2rgb = (hex) => {
  const v = parseInt(hex.replace('#', ''), 16);
  return `${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}`;
};

export default function ThemeSelector({ onBack, onApply }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Applied State (affects actual application)
  const [appliedColor, setAppliedColor] = useState('#1e2a52');
  const [appliedMode, setAppliedMode] = useState('default');

  // Staged State (affects only the preview modal)
  const [stagedColor, setStagedColor] = useState('#1e2a52');
  const [stagedMode, setStagedMode] = useState('default');

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

  // Global Theme Injection based on APPLIED state (Affects entire app)
  useEffect(() => {
    if (!mounted) return;
    
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
      } else if (modeId === 'system') {
        const isSysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isSysDark) {
          root.classList.add('dark');
          document.body.classList.add('dark-mode-active');
        }
      }

      if (modeId !== 'default') {
        root.classList.add('custom-color-theme');
        document.body.classList.add('custom-color-theme');
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
    localStorage.setItem('theme-color', stagedColor);
    localStorage.setItem('theme-mode', stagedMode);
    if (onApply) {
      onApply();
    } else if (onBack) {
      onBack();
    }
  };

  // Preview Logic
  const isPreviewDark = stagedMode === 'dark' || (stagedMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isPreviewCustom = stagedMode !== 'default';
  const previewRgb = hex2rgb(stagedColor);

  return (
    <div className="flex flex-col w-full items-center justify-center py-4 sm:py-8 z-50 relative min-h-[100vh] overflow-hidden bg-transparent">
      
      {onBack && (
        <button 
          onClick={() => {
            const savedColor = localStorage.getItem('theme-color') || '#1e2a52';
            const savedMode = localStorage.getItem('theme-mode') || 'default';
            setStagedColor(savedColor);
            setStagedMode(savedMode);
            onBack();
          }} 
          className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-10 z-[100] text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span>Back</span>
        </button>
      )}
      {/* Main Theme Studio Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-[1200px] h-[75vh] min-h-[550px] max-h-[750px] bg-white/70 dark:bg-[#0B1120]/95 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden border border-white/40 dark:border-slate-800 flex flex-col md:flex-row relative z-10"
      >
        {/* LEFT COLUMN: Controls */}
        <div className="w-full md:w-[420px] shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-white/40 dark:border-slate-800/60 bg-white/40 dark:bg-[#060a13]/50 overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/40 dark:border-slate-800/60 flex items-center justify-between bg-transparent sticky top-0 z-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5" style={{ color: stagedColor }} />
                Appearance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customize your Nexora experience
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 overflow-y-auto custom-scrollbar flex-1">
            
            {/* Display Mode Section */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Display Mode
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {DISPLAY_MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = stagedMode === mode.id;
                  return (
                    <motion.button
                      key={mode.id}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setStagedMode(mode.id);
                        if (mode.id === 'default') {
                          setStagedColor('#1e2a52');
                        }
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all backdrop-blur-sm ${
                        isActive 
                          ? 'bg-white/40 dark:bg-slate-800/40 shadow-md border-white/60 dark:border-white/30' 
                          : 'border-white/20 dark:border-slate-700/30 hover:border-white/40 dark:hover:border-slate-500 bg-transparent hover:bg-white/10'
                      }`}
                      style={{
                        borderColor: isActive ? stagedColor : undefined,
                        color: isActive ? stagedColor : 'var(--tw-text-slate-500)'
                      }}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${!isActive && 'text-slate-500 dark:text-slate-400'}`} />
                      <span className={`text-[10px] font-medium ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        {mode.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Theme Colors Section */}
            <div className="mt-4 mb-5">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Theme Color
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map((color) => {
                  const isActive = stagedColor === color.value;
                  return (
                    <motion.button
                      key={color.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setStagedColor(color.value);
                        if (stagedMode === 'default') {
                          setStagedMode('light'); // Switch to a custom mode if they pick a color while on Default
                        }
                      }}
                      className={`relative group flex flex-col items-center justify-center p-1.5 rounded-xl border transition-all overflow-hidden backdrop-blur-sm ${
                        isActive 
                          ? 'shadow-sm border-transparent' 
                          : 'border-white/20 dark:border-slate-700/30 bg-transparent hover:bg-white/10 hover:border-white/30'
                      }`}
                      style={{
                        borderColor: isActive ? stagedColor : 'transparent',
                        backgroundColor: isActive ? `rgba(${parseInt(color.value.slice(1,3),16)}, ${parseInt(color.value.slice(3,5),16)}, ${parseInt(color.value.slice(5,7),16)}, 0.1)` : undefined
                      }}
                    >
                      {/* Color Circle */}
                      <div 
                        className="w-6 h-6 rounded-full shadow-sm mb-1 flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color.value }}
                      >
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-white"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Text */}
                      <span className={`text-[9px] font-semibold text-center leading-tight ${
                        isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                      }`}>
                        {color.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

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
        <div className="hidden md:flex flex-1 flex-col bg-transparent p-6 lg:p-8 relative overflow-hidden z-10">
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
            className="flex-1 rounded-2xl border border-white/40 dark:border-slate-700/60 overflow-hidden relative shadow-2xl w-full min-h-[350px] bg-black/10 dark:bg-black/30 backdrop-blur-xl"
          >
            <div 
              className={`absolute top-0 left-0 w-[285%] h-[285%] origin-top-left pointer-events-none text-[#0F172A] dark:text-[#f8fafc] ${isPreviewDark ? 'dark dark-mode-active' : ''} ${isPreviewCustom ? 'custom-color-theme' : ''}`}
              style={{
                transform: 'scale(0.35)', // w-[285%] * 0.35 = ~100% of parent width
                backgroundColor: isPreviewDark ? '#020617' : isPreviewCustom ? `rgba(${previewRgb}, 0.03)` : '#f0f6ff',
                backgroundImage: isPreviewDark && isPreviewCustom 
                  ? `radial-gradient(circle at 50% 0%, rgba(${previewRgb}, 0.25) 0%, transparent 60%)` 
                  : (isPreviewCustom && !isPreviewDark 
                      ? `radial-gradient(at 0% 0%, rgba(${previewRgb}, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(${previewRgb}, 0.15) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(${previewRgb}, 0.1) 0px, transparent 50%)` 
                      : 'none'),
                '--primary-theme-color': stagedColor,
                '--primary-theme-color-rgb': previewRgb,
              }}
            >
              <GlobalHeader searchQuery="" onSearchChange={() => {}} disableScrollAnimation={true} />
              
              <main className="w-full mx-auto px-12 pt-8 pb-20">
                <div className="grid grid-cols-4 gap-6">
                  {NEXORA_MODULES.slice(0, 8).map((tool, index) => (
                    <ToolCard key={tool.name} tool={tool} index={index} disableCssAnimation={true} />
                  ))}
                </div>
              </main>
              
              <GlobalFooter pageName="NEXORA INTELLIGENCE" audience="Law Enforcement & Security Agencies" hideAnimation={true} />
            </div>
          </div>

          {/* Confirm Button Overlay at Bottom of Right Column */}
          <div className="mt-6 shrink-0 flex justify-end relative z-10">
            <button
              onClick={() => {
                // Save to localStorage
                localStorage.setItem('theme-color', stagedColor);
                localStorage.setItem('theme-mode', stagedMode);
                
                // Update applied state to instantly trigger global CSS changes
                setAppliedColor(stagedColor);
                setAppliedMode(stagedMode);

                if (onApply) {
                  onApply();
                } else if (onBack) {
                  onBack();
                }
              }}
              className="px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 text-white flex items-center gap-2"
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