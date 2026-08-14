import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Pause, Play, Square, GripVertical, Mic, MicOff, X, UserCircle2, CheckCircle2, FastForward } from 'lucide-react';

// ============================================================================
// 1. CONTEXT (State Management)
// ============================================================================
const VoiceContext = createContext();

export function useVoice() {
  return useContext(VoiceContext);
}

// ============================================================================
// 2. PROVIDER & ENGINE (Global Wrapper + Headless Engine + Floating UI)
// ============================================================================
export function VoiceProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voiceType, setVoiceType] = useState('female');
  const voiceTypeRef = useRef('female');
  const [readingSpeed, setReadingSpeed] = useState(1);
  const readingSpeedRef = useRef(1);
  
  const hoverTimeout = useRef(null);

  // Sync ref with state for use inside setTimeout closures
  useEffect(() => {
    voiceTypeRef.current = voiceType;
  }, [voiceType]);

  useEffect(() => {
    readingSpeedRef.current = readingSpeed;
  }, [readingSpeed]);

  const toggleVoice = () => {
    const newVoice = voiceType === 'female' ? 'male' : 'female';
    setVoiceType(newVoice);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const pauseResume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const toggleEnabled = () => {
    setEnabled(prev => !prev);
  };

  // --------------------------------------------------
  // Speech Engine Logic (Mouse Listeners)
  // --------------------------------------------------
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech synthesis is not supported in this browser.");
      return;
    }

    if (!enabled) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Don't read the voice assistant button or playback controls to avoid annoying loops
      if (target.closest('#voice-playback-controls') || target.closest('#voice-assistant-nav-btn')) return;

      // Find the most relevant container to read
      let readTarget = target;
      
      // If hovering inside an interactive element (like a ToolCard), read the whole thing together
      const interactiveParent = target.closest('button, [role="button"], a');
      if (interactiveParent) {
        readTarget = interactiveParent;
      }

      // Extract text content. Prioritize aria-labels or innerText of specific elements
      let textToRead = '';
      
      if (readTarget.getAttribute('aria-label')) {
        textToRead = readTarget.getAttribute('aria-label');
      } else if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LI'].includes(readTarget.tagName) || readTarget.getAttribute('role') === 'button') {
        textToRead = readTarget.innerText || readTarget.textContent;
      } else {
        // If it's a generic div, only read it if it has direct text nodes
        const hasDirectText = Array.from(readTarget.childNodes).some(
          node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        );
        if (hasDirectText) {
          textToRead = readTarget.innerText || readTarget.textContent;
        }
      }

      textToRead = (textToRead || '').trim();

      if (textToRead.length > 0) {
        clearTimeout(hoverTimeout.current);
        
        hoverTimeout.current = setTimeout(() => {
          window.speechSynthesis.cancel();
          
          const utterance = new SpeechSynthesisUtterance(textToRead);
          
          // Attempt to find a voice based on selected voiceType
          const voices = window.speechSynthesis.getVoices();
          let selectedVoice = null;
          
          if (voiceTypeRef.current === 'female') {
            selectedVoice = voices.find(voice => 
              voice.name.toLowerCase().includes('female') || 
              voice.name.toLowerCase().includes('woman') ||
              voice.name.toLowerCase().includes('zira') ||       // Windows
              voice.name.toLowerCase().includes('samantha') ||   // macOS
              voice.name.toLowerCase().includes('victoria') ||
              voice.name.toLowerCase().includes('karen') ||
              voice.name.toLowerCase().includes('tessa')
            );
          } else {
            selectedVoice = voices.find(voice => 
              voice.name.toLowerCase().includes('male') || 
              voice.name.toLowerCase().includes('man') ||
              voice.name.toLowerCase().includes('david') ||      // Windows
              voice.name.toLowerCase().includes('alex') ||       // macOS
              voice.name.toLowerCase().includes('daniel') ||
              voice.name.toLowerCase().includes('mark')
            );
          }

          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
          
          utterance.rate = readingSpeedRef.current;
          
          utterance.onstart = () => { setIsSpeaking(true); setIsPaused(false); };
          utterance.onend = () => { setIsSpeaking(false); setIsPaused(false); };
          utterance.onerror = () => { setIsSpeaking(false); setIsPaused(false); };

          window.speechSynthesis.speak(utterance);
        }, 1000); // 1000ms hover delay
      }
    };

    const handleMouseOut = () => {
      clearTimeout(hoverTimeout.current);
    };

    // Use passive listeners for better performance
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(hoverTimeout.current);
      window.speechSynthesis.cancel();
    };
  }, [enabled, setIsSpeaking, setIsPaused, voiceTypeRef]);

  // Ensure voices are loaded (Chrome sometimes needs this)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <VoiceContext.Provider value={{
      enabled, setEnabled, toggleEnabled,
      isSpeaking, setIsSpeaking,
      isPaused, setIsPaused,
      voiceType, setVoiceType, voiceTypeRef,
      readingSpeed, setReadingSpeed, readingSpeedRef,
      toggleVoice, pauseResume, stopReading
    }}>
      {children}
      
      {/* Floating Playback Controls at Bottom Center */}
      <AnimatePresence>
        {enabled && (
          <motion.div
            id="voice-playback-controls"
            drag
            dragMomentum={false}
            whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
            initial={{ opacity: 0, y: 30, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 30, x: "-50%", scale: 0.9 }}
            className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 backdrop-blur-xl rounded-full px-4 py-2 cursor-grab border"
            style={{ 
              backgroundColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.15)',
              borderColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.25)',
              boxShadow: '0 8px 32px 0 rgba(var(--primary-theme-color-rgb, 0, 0, 0), 0.2), inset 0 0 0 1px rgba(var(--primary-theme-color-rgb, 255, 255, 255), 0.1)'
            }}
          >
            {/* Drag Handle */}
            <div 
              className="flex items-center justify-center transition-colors cursor-grab active:cursor-grabbing hover:opacity-80"
              style={{ color: 'var(--primary-theme-color, #64748b)' }}
            >
              <GripVertical className="w-5 h-5" />
            </div>
            
            <button
              onClick={pauseResume}
              className={`p-3 rounded-full transition-all hover:bg-white/20 dark:hover:bg-black/20 ${
                isPaused 
                  ? 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' 
                  : ''
              }`}
              style={!isPaused ? { color: 'var(--primary-theme-color, #1e2a52)' } : {}}
            >
              {isPaused ? <Play className="w-5 h-5" fill="currentColor" /> : <Pause className="w-5 h-5" fill="currentColor" />}
            </button>
            <div className="w-px h-8" style={{ backgroundColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.2)' }} />
            <button
              onClick={stopReading}
              className="p-3 rounded-full hover:bg-rose-100/50 hover:text-rose-600 dark:hover:bg-rose-900/50 dark:hover:text-rose-400 transition-all"
              style={{ color: 'var(--primary-theme-color, #1e2a52)' }}
            >
              <Square className="w-5 h-5" fill="currentColor" />
            </button>
            <div className="w-px h-8" style={{ backgroundColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.2)' }} />
            <button
              onClick={toggleVoice}
              className="px-3 py-1.5 rounded-full text-[calc(13px*var(--text-scale,1))] font-semibold transition-all hover:bg-white/20 dark:hover:bg-black/20 flex items-center gap-1.5 whitespace-nowrap border"
              style={{ 
                color: 'var(--primary-theme-color, #1e2a52)',
                borderColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.25)',
                backgroundColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.05)'
              }}
            >
              {voiceType === 'female' ? '👩 Female' : '👨 Male'}
            </button>
            <div className="w-px h-8" style={{ backgroundColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.2)' }} />
            <button
              onClick={() => {
                const nextSpeed = readingSpeed >= 2.5 ? 0.5 : readingSpeed + 0.5;
                setReadingSpeed(nextSpeed);
              }}
              className="px-3 py-1.5 rounded-full text-[calc(13px*var(--text-scale,1))] font-semibold transition-all hover:bg-white/20 dark:hover:bg-black/20 flex items-center gap-1.5 whitespace-nowrap border"
              style={{ 
                color: 'var(--primary-theme-color, #1e2a52)',
                borderColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.25)',
                backgroundColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.05)'
              }}
              title="Change Reading Speed"
            >
              <FastForward className="w-4 h-4" />
              {Number(readingSpeed).toFixed(1)}x
            </button>
            <div className="w-px h-8" style={{ backgroundColor: 'rgba(var(--primary-theme-color-rgb, 30, 42, 82), 0.2)' }} />
            <button
              onClick={() => {
                stopReading();
                setEnabled(false);
              }}
              className="p-3 rounded-full hover:bg-rose-100/50 hover:text-rose-600 dark:hover:bg-rose-900/50 dark:hover:text-rose-400 transition-all"
              style={{ color: 'var(--primary-theme-color, #1e2a52)' }}
              title="Turn off Voice Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </VoiceContext.Provider>
  );
}


// ============================================================================
// 3. SETTINGS PAGE UI
// ============================================================================
function VoiceAssistantPageUI({ onBack }) {
  const {
    enabled,
    toggleEnabled,
    isSpeaking,
    isPaused,
    voiceType,
    readingSpeed,
    setReadingSpeed,
    toggleVoice,
    pauseResume,
    stopReading
  } = useVoice();

  return (
    <div id="voice-assistant-page-container" className="flex flex-col w-full items-center justify-start pt-16 sm:pt-24 pb-8 sm:pb-16 z-50 relative min-h-[80vh] overflow-hidden bg-transparent">
      
      {onBack && (
        <button 
          onClick={onBack} 
          className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-10 z-[100] text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span>Back</span>
        </button>
      )}

      {/* Main Studio Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-20 w-[95%] max-w-4xl bg-white/5 dark:bg-[#0B1120]/5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/40 dark:border-white/10 flex flex-col md:flex-row overflow-hidden rounded-[32px] sm:rounded-[40px]"
      >
        {/* LEFT COLUMN: Controls */}
        <div className="flex-1 flex flex-col bg-transparent backdrop-blur-sm border-r border-white/20 dark:border-white/5">
          
          <div className="p-6 lg:p-8 flex-1">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
                  {enabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Voice Assistant</h2>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Read aloud any text you hover over</p>
                </div>
              </div>
            </div>

            {/* Master Toggle */}
            <div className="mb-10">
              <div 
                onClick={toggleEnabled}
                className={`w-full group cursor-pointer border-2 rounded-2xl p-5 flex items-center justify-between transition-all duration-300 backdrop-blur-md ${
                  enabled 
                    ? 'border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-900/10 shadow-[0_8px_30px_-12px_rgba(16,185,129,0.3)]' 
                    : 'border-white/20 dark:border-slate-700/20 hover:border-white/40 dark:hover:border-slate-600/30 bg-white/5 dark:bg-slate-900/10'
                }`}
              >
                <div>
                  <h3 className={`text-lg font-bold transition-colors ${enabled ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    Enable Assistant
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                    {enabled ? 'Assistant is active and ready.' : 'Turn on to start reading.'}
                  </p>
                </div>
                
                {/* Switch UI */}
                <div className={`relative w-14 h-8 rounded-full transition-colors duration-300 shadow-inner ${enabled ? 'bg-emerald-500' : 'bg-slate-300/40 dark:bg-slate-700/40'}`}>
                  <motion.div 
                    layout
                    className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                    animate={{ x: enabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-8 overflow-hidden"
                >
                  {/* Voice Selection */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <UserCircle2 className="w-4 h-4" /> Voice Type
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => voiceType !== 'female' && toggleVoice()}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 backdrop-blur-md ${
                          voiceType === 'female'
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shadow-sm'
                            : 'border-white/20 dark:border-slate-700/20 bg-white/5 dark:bg-slate-800/5 text-slate-600 dark:text-slate-400 hover:border-white/40 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-2xl">👩</span>
                        <span className="font-bold">Female Voice</span>
                        {voiceType === 'female' && <CheckCircle2 className="w-4 h-4 absolute top-3 right-3" />}
                      </button>
                      
                      <button
                        onClick={() => voiceType !== 'male' && toggleVoice()}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 backdrop-blur-md ${
                          voiceType === 'male'
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shadow-sm'
                            : 'border-white/20 dark:border-slate-700/20 bg-white/5 dark:bg-slate-800/5 text-slate-600 dark:text-slate-400 hover:border-white/40 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-2xl">👨</span>
                        <span className="font-bold">Male Voice</span>
                        {voiceType === 'male' && <CheckCircle2 className="w-4 h-4 absolute top-3 right-3" />}
                      </button>
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Volume2 className="w-4 h-4" /> Playback Controls
                    </h4>
                    
                    <div className="flex items-center gap-3 bg-white/5 dark:bg-slate-900/5 backdrop-blur-md p-2 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-sm">
                      <button
                        onClick={pauseResume}
                        className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
                          isPaused 
                            ? 'bg-amber-100/40 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 backdrop-blur-md' 
                            : 'hover:bg-white/20 dark:hover:bg-slate-800/20 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isPaused ? <Play className="w-5 h-5" fill="currentColor" /> : <Pause className="w-5 h-5" fill="currentColor" />}
                        {isPaused ? 'Resume' : 'Pause'}
                      </button>
                      
                      <div className="w-px h-10 bg-slate-400/20 dark:bg-slate-500/20" />
                      
                      <button
                        onClick={stopReading}
                        className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-rose-100/40 hover:text-rose-800 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 text-slate-700 dark:text-slate-300 transition-all"
                      >
                        <Square className="w-5 h-5" fill="currentColor" />
                        Stop Reading
                      </button>
                    </div>
                  </div>

                  {/* Reading Speed Controls */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <FastForward className="w-4 h-4" /> Reading Speed
                    </h4>
                    
                    <div className="flex items-center gap-4 bg-white/5 dark:bg-slate-900/5 backdrop-blur-md p-4 rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-sm">
                      <span className="font-bold text-slate-700 dark:text-slate-300 w-12 text-center">{Number(readingSpeed).toFixed(1)}x</span>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="2.5" 
                        step="0.1" 
                        value={readingSpeed} 
                        onChange={(e) => setReadingSpeed(parseFloat(e.target.value))}
                        className="flex-1 accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* RIGHT COLUMN: Realtime Status */}
        <div className="hidden md:flex flex-1 flex-col bg-transparent p-6 lg:p-8 relative overflow-hidden z-10">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
               Live Status
            </h4>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative z-10">
            {enabled ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-white dark:bg-slate-800 shadow-xl border-4 border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center relative">
                  {isSpeaking ? (
                    <>
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute inset-0 bg-emerald-400 rounded-full"
                      />
                      <Volume2 className="w-10 h-10 text-emerald-500 relative z-10" />
                    </>
                  ) : isPaused ? (
                    <Pause className="w-10 h-10 text-amber-500" />
                  ) : (
                    <Mic className="w-10 h-10 text-emerald-500" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  {isSpeaking ? 'Reading Aloud...' : isPaused ? 'Paused' : 'Waiting for hover...'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs text-center font-medium leading-relaxed">
                  {isSpeaking 
                    ? 'Currently reading the content you are hovering over.' 
                    : isPaused 
                      ? 'Reading is paused. Click resume to continue.'
                      : 'Move your mouse over any text on the screen to hear it spoken.'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center opacity-50 grayscale">
                <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <MicOff className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Assistant Disabled</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs text-center font-medium">
                  Enable the assistant to start hearing content read aloud.
                </p>
              </div>
            )}
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-transparent to-slate-100/30 dark:to-slate-900/50 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

export default function VoiceAssistantPage({ onBack }) {
  return <VoiceAssistantPageUI onBack={onBack} />;
}