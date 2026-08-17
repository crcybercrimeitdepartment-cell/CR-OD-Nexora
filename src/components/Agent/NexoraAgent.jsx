import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  X,
  Search,
  ChevronRight,
  Info,
  Target,
  Briefcase,
  Gift,
  CheckCircle2,
  ListFilter,
  Sparkles,
  RefreshCw,
  ArrowUpRight,
  ShieldAlert,
  Send,
  Zap,
  HelpCircle,
  FileText,
  Award,
  Tag,
  Sliders,
  Eye,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { AGENT_CARDS_DATA, ALL_AGENT_CARDS, detectCardAndTab, filterCardsSmart } from './agentCardsData';
import agentDesktopWatermark from '../../assets/WaterMark.png';
import agentPhoneWatermark from '../../assets/PhoneWaterMark.png';

export default function NexoraAgent({ onNavigateToModule, searchQuery, onSearchChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [inputQuery, setInputQuery] = useState('');
  const [showAllGreetingCards, setShowAllGreetingCards] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'agent',
      type: 'greeting',
      text: 'Hello! I am the Nexora Intelligence Agent. Ask me about any of the 24 intelligence cards available on the platform, or select one below.'
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState(null);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition for Voice Assistance
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice('Listening... Speak card name or question now!');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputQuery(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setVoiceNotice('Microphone access denied. Please grant permission in browser settings.');
        } else if (event.error === 'no-speech') {
          setVoiceNotice('No speech detected. Please speak into microphone.');
        } else {
          setVoiceNotice('Voice error. Try clicking mic again.');
        }
        setTimeout(() => setVoiceNotice(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceNotice(null);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition init error:', err);
      setVoiceSupported(false);
    }
  }, []);

  const toggleMic = () => {
    if (!voiceSupported) {
      alert('Voice Recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, Brave, or Safari.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        console.warn(e);
      }
      setIsListening(false);
    } else {
      try {
        setVoiceNotice('Starting microphone...');
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Mic start error:', err);
        setIsListening(false);
      }
    }
  };

  const handleSpeakText = (textToSpeak) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = textToSpeak.replace(/[^\w\s.,]/gi, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen, activeTab, selectedCardId]);

  // Search filtering for the 24 cards
  const filteredCards = useMemo(() => {
    return filterCardsSmart(inputQuery);
  }, [inputQuery]);

  const handleSelectCard = (cardKey, autoTab = null, userQueryText = null) => {
    const card = typeof cardKey === 'string' 
      ? (AGENT_CARDS_DATA[cardKey.toLowerCase()] || ALL_AGENT_CARDS.find(c => c.id.toLowerCase() === cardKey.toLowerCase())) 
      : cardKey;
    if (!card) return;

    setSelectedCardId(card.id);
    setActiveTab(autoTab);

    const userText = userQueryText || `Tell me about ${card.name} (${card.shortName})`;

    if (autoTab && ['introduction', 'overview', 'purpose', 'work', 'mission', 'vision', 'whyChooseUs', 'benefits', 'useCases', 'featureMenu', 'keywords', 'other'].includes(autoTab)) {
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'user',
          text: userText
        },
        {
          sender: 'agent',
          type: 'tab_response',
          cardId: card.id,
          cardData: card,
          selectedTab: autoTab
        }
      ]);
    } else {
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'user',
          text: userText
        },
        {
          sender: 'agent',
          type: 'card_prompt',
          cardId: card.id,
          cardData: card
        }
      ]);
    }
  };

  const handleSelectTab = (tabName, cardData) => {
    setSelectedCardId(cardData.id);
    setActiveTab(tabName);
    const tabLabels = {
      introduction: 'Introduction',
      overview: 'Overview',
      purpose: 'Purpose',
      work: 'Work of This Module',
      mission: 'Mission Statement',
      vision: 'Future Vision',
      whyChooseUs: 'Why Choose Us',
      benefits: 'Benefits',
      useCases: 'Use Cases',
      featureMenu: 'Feature Menu',
      keywords: 'Required Keywords',
      other: 'Other Details & Security'
    };

    setChatHistory(prev => [
      ...prev,
      {
        sender: 'user',
        text: tabLabels[tabName] || tabName
      },
      {
        sender: 'agent',
        type: 'tab_response',
        cardId: cardData.id,
        cardData: cardData,
        selectedTab: tabName
      }
    ]);
  };

  const getLastActiveCard = () => {
    if (selectedCardId) {
      const card = ALL_AGENT_CARDS.find(c => c.id.toLowerCase() === selectedCardId.toLowerCase());
      if (card) return card;
    }
    for (let i = chatHistory.length - 1; i >= 0; i--) {
      if (chatHistory[i].cardData) {
        return chatHistory[i].cardData;
      }
    }
    return null;
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    const q = inputQuery.trim();
    if (!q) return;

    // Use smart card & tab intent detection
    const { card: matchedCard, tab: detectedTab } = detectCardAndTab(q);
    const lastActiveCard = getLastActiveCard();

    // Check if this query is a follow-up question referencing the previously discussed card
    const isFollowUpQuery = !matchedCard && lastActiveCard && (
      detectedTab || 
      /\b(it|its|this|that|previous|before|again|same|module|card|more|details|tell\s+me|show|explain)\b/i.test(q)
    );

    if (matchedCard) {
      setInputQuery('');
      handleSelectCard(matchedCard.id, detectedTab, q);
    } else if (isFollowUpQuery && lastActiveCard) {
      setInputQuery('');
      const targetTab = detectedTab || activeTab || 'overview';
      setSelectedCardId(lastActiveCard.id);
      setActiveTab(targetTab);

      setChatHistory(prev => [
        ...prev,
        {
          sender: 'user',
          text: q
        },
        {
          sender: 'agent',
          type: 'tab_response',
          cardId: lastActiveCard.id,
          cardData: lastActiveCard,
          selectedTab: targetTab,
          isFollowUp: true,
          followUpCardName: lastActiveCard.name,
          followUpCardShort: lastActiveCard.shortName
        }
      ]);
    } else {
      const results = filterCardsSmart(q);
      setChatHistory(prev => [
        ...prev,
        { sender: 'user', text: q },
        {
          sender: 'agent',
          type: 'search_results',
          query: q,
          results: results
        }
      ]);
      setInputQuery('');
    }
  };

  const handleReset = () => {
    setSelectedCardId(null);
    setActiveTab(null);
    setInputQuery('');
    setChatHistory([
      {
        sender: 'agent',
        type: 'greeting',
        text: 'Session reset! Select any intelligence card or type a keyword to explore.'
      }
    ]);
  };

  return (
    <>
      {/* FLOATING AGENT ICON (BOTTOM RIGHT) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 md:right-8 z-[999999] flex flex-row-reverse items-center gap-3 pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#1e2a52] via-blue-900 to-indigo-900 text-white shadow-[0_10px_25px_rgba(30,42,82,0.4)] flex items-center justify-center border-2 border-blue-400/40 focus:outline-none focus:ring-4 focus:ring-blue-500/30 group shrink-0"
          title="Open Nexora Intelligence Agent"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md animate-pulse"></span>
          {isOpen ? (
            <X className="w-6 h-6 text-white transition-transform duration-200" />
          ) : (
            <Bot className="w-7 h-7 text-blue-300 group-hover:rotate-12 transition-transform duration-200" />
          )}
        </motion.button>

        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-[#1e2a52] text-white px-3.5 py-2 rounded-full shadow-xl border border-blue-400/30 cursor-pointer hover:bg-slate-800 transition-all text-xs font-bold shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Nexora Agent</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AGENT DRAWER / MODAL WINDOW (SOLID OUTER CONTAINER WITH GLASSMORPHIC INNER CARDS) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-[88px] sm:bottom-[96px] right-4 sm:right-6 md:right-8 w-[calc(100vw-32px)] max-w-[420px] sm:w-[420px] md:w-[440px] h-[580px] max-h-[calc(100vh-120px)] min-h-[360px] bg-[#f0f6ff] rounded-3xl shadow-[0_25px_70px_rgba(15,23,42,0.35)] border border-[#b5d7fb] flex flex-col min-h-0 z-[999999] overflow-hidden font-sans pointer-events-auto"
          >
            {/* BACKGROUND WATERMARKS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0 mix-blend-multiply opacity-20">
              <img
                src={agentDesktopWatermark}
                alt="Agent Desktop Background Watermark"
                className="hidden sm:block absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />
              <img
                src={agentPhoneWatermark}
                alt="Agent Phone Background Watermark"
                className="block sm:hidden absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {/* AGENT HEADER */}
            <div className="relative z-10 bg-gradient-to-r from-[#1e2a52] via-slate-900 to-indigo-950 text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shadow-inner">
                  <Bot className="w-6 h-6 text-blue-300" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900 animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wide text-white flex items-center gap-1.5">
                    Nexora AI Assistant
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium">Interactive Module Knowledge Engine</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300 hover:text-white"
                  title="Reset Agent Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300 hover:text-white"
                  title="Close Agent"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* QUICK CARD SELECTOR BAR */}
            <div data-lenis-prevent="true" className="relative z-10 bg-white/40 backdrop-blur-xl border-b border-white/60 p-2.5 shrink-0 overflow-x-auto overscroll-contain scrollbar-none flex items-center gap-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <span className="text-[10px] font-extrabold text-[#1e2a52]/70 uppercase tracking-wider px-2 shrink-0">Quick Cards:</span>
              {ALL_AGENT_CARDS.map(card => (
                <button
                  key={card.id}
                  onClick={() => handleSelectCard(card.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 shrink-0 border ${
                    selectedCardId === card.id
                      ? 'bg-gradient-to-r from-[#1e2a52] to-[#2b3a6d] text-white border-blue-400/40 shadow-[0_4px_12px_rgba(30,42,82,0.3)] scale-[1.03]'
                      : 'bg-white/60 hover:bg-white/90 backdrop-blur-md text-slate-700 border-white/80 hover:border-blue-400/50 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  {card.shortName}
                </button>
              ))}
            </div>

            {/* CHAT MESSAGES BODY */}
            <div ref={chatContainerRef} data-lenis-prevent="true" className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-4 bg-[#f4f8ff]/50">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.sender === 'user' ? (
                    <div className="bg-gradient-to-r from-[#1e2a52] to-[#2a3c74] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl rounded-tr-none shadow-[0_6px_18px_rgba(30,42,82,0.25)] border border-blue-400/30 max-w-[85%] backdrop-blur-md">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="w-full space-y-3">
                      {/* Greeting (HYPER-TRANSPARENT GLASSMORPHISM CARD) */}
                      {msg.type === 'greeting' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-white/65 via-white/40 to-blue-100/30 backdrop-blur-2xl border border-white/80 rounded-2xl p-4 shadow-[0_12px_40px_rgba(30,42,82,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] text-xs font-medium text-slate-800 space-y-3.5">
                          {/* Ambient Glowing Glass Flare */}
                          <div className="absolute -top-12 -left-12 w-36 h-36 bg-gradient-to-br from-blue-400/20 via-indigo-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                          <div className="relative z-10 flex items-start gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md border border-white/40">
                              <Sparkles className="w-4 h-4 text-blue-100" />
                            </div>
                            <p className="text-slate-900 leading-relaxed font-semibold pt-0.5">{msg.text}</p>
                          </div>

                          {/* Header & Toggle for Featured vs All 24 Cards inside Agent Body */}
                          <div className="relative z-10 flex items-center justify-between border-t border-slate-200/50 pt-2.5">
                            <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                              {showAllGreetingCards ? `All ${ALL_AGENT_CARDS.length} Intelligence Cards:` : 'Featured Quick Cards:'}
                            </span>
                            <button
                              onClick={() => setShowAllGreetingCards(!showAllGreetingCards)}
                              className="text-[11px] font-bold text-blue-900 hover:text-blue-950 bg-white/40 hover:bg-white/80 backdrop-blur-xl px-2.5 py-1 rounded-xl border border-white/80 shadow-2xs transition-all flex items-center gap-1 hover:shadow-xs"
                            >
                              <span>{showAllGreetingCards ? 'Show Featured Only' : `View All ${ALL_AGENT_CARDS.length} Cards`}</span>
                              <ChevronRight className={`w-3.5 h-3.5 text-blue-600 transition-transform duration-200 ${showAllGreetingCards ? 'rotate-90' : ''}`} />
                            </button>
                          </div>

                          {/* Grid of Glassmorphism Cards inside Agent Body (4 or All 24 Cards) */}
                          <div className={`relative z-10 grid grid-cols-2 gap-2.5 pt-1 ${showAllGreetingCards ? 'max-h-[260px] overflow-y-auto pr-1 scrollbar-thin' : ''}`}>
                            {(showAllGreetingCards ? ALL_AGENT_CARDS : ALL_AGENT_CARDS.slice(0, 4)).map((c, i) => {
                              const cardAccents = [
                                { bg: 'from-blue-500/20 via-blue-500/5 to-transparent', border: 'hover:border-blue-400', badgeBg: 'bg-blue-600 text-white shadow-blue-500/30' },
                                { bg: 'from-emerald-500/20 via-emerald-500/5 to-transparent', border: 'hover:border-emerald-400', badgeBg: 'bg-emerald-600 text-white shadow-emerald-500/30' },
                                { bg: 'from-indigo-500/20 via-indigo-500/5 to-transparent', border: 'hover:border-indigo-400', badgeBg: 'bg-indigo-600 text-white shadow-indigo-500/30' },
                                { bg: 'from-purple-500/20 via-purple-500/5 to-transparent', border: 'hover:border-purple-400', badgeBg: 'bg-purple-600 text-white shadow-purple-500/30' },
                                { bg: 'from-amber-500/20 via-amber-500/5 to-transparent', border: 'hover:border-amber-400', badgeBg: 'bg-amber-600 text-white shadow-amber-500/30' },
                                { bg: 'from-rose-500/20 via-rose-500/5 to-transparent', border: 'hover:border-rose-400', badgeBg: 'bg-rose-600 text-white shadow-rose-500/30' }
                              ];
                              const accent = cardAccents[i % cardAccents.length];

                              return (
                                <button
                                  key={c.id}
                                  onClick={() => handleSelectCard(c.id)}
                                  className={`relative overflow-hidden group flex items-center justify-between p-3 rounded-xl bg-white/45 hover:bg-white/85 backdrop-blur-2xl border border-white/80 ${accent.border} transition-all duration-300 text-left shadow-[0_4px_16px_rgba(30,42,82,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:shadow-[0_10px_25px_rgba(30,58,138,0.18)] hover:-translate-y-1`}
                                >
                                  {/* Glass gradient overlay */}
                                  <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                                  <div className="relative z-10 space-y-1 pr-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className={`text-[10px] font-black tracking-wider px-1.5 py-0.5 rounded-md shadow-xs ${accent.badgeBg}`}>
                                        {c.shortName}
                                      </span>
                                    </div>
                                    <div className="text-[11px] font-bold text-slate-900 group-hover:text-blue-950 truncate max-w-[110px] leading-tight">
                                      {c.subtitle}
                                    </div>
                                  </div>

                                  <div className="relative z-10 w-7 h-7 rounded-lg bg-white/60 group-hover:bg-blue-600 backdrop-blur-md border border-white/80 group-hover:border-blue-500 flex items-center justify-center shrink-0 transition-all duration-300 shadow-2xs group-hover:shadow-md">
                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Card Suggestion Menu (HYPER-TRANSPARENT GLASSMORPHISM CARD) */}
                      {msg.type === 'card_prompt' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-white/65 via-white/40 to-blue-100/30 backdrop-blur-2xl border border-white/80 rounded-2xl p-4 shadow-[0_12px_40px_rgba(30,42,82,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] space-y-3.5 border-l-4 border-l-blue-600">
                          {/* Ambient Glowing Glass Flare */}
                          <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

                          <div className="relative z-10 flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-black text-blue-900 bg-blue-500/20 backdrop-blur-md border border-blue-400/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                                {msg.cardData.subtitle}
                              </span>
                              <h4 className="text-sm font-black text-slate-900 mt-1.5 flex items-center gap-2">
                                {msg.cardData.name}
                                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-500/15 px-1.5 py-0.2 rounded border border-blue-300/40">{msg.cardData.shortName}</span>
                              </h4>
                            </div>
                            {onNavigateToModule && (
                              <button
                                onClick={() => onNavigateToModule(msg.cardData.shortName)}
                                className="text-[11px] font-extrabold text-blue-900 hover:text-blue-950 flex items-center gap-1 bg-white/40 hover:bg-white/80 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-white/80 shrink-0 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5"
                              >
                                <span>Go to App</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                              </button>
                            )}
                          </div>

                          <div className="relative z-10 p-3 bg-white/35 backdrop-blur-xl rounded-xl border border-white/70 text-xs text-slate-800 font-semibold shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)]">
                            <p className="flex items-center gap-1.5">
                              <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                              Select a topic below to view intelligence details:
                            </p>
                          </div>

                          {/* 12 OPTION BUTTONS (HYPER-TRANSPARENT GLASS TILES) */}
                          <div data-lenis-prevent="true" className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 max-h-[190px] overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
                            {[
                              { id: 'introduction', name: 'Introduction', icon: FileText, color: 'text-cyan-600', hoverGlow: 'hover:border-cyan-400/80 hover:shadow-cyan-500/25' },
                              { id: 'overview', name: 'Overview', icon: Info, color: 'text-blue-600', hoverGlow: 'hover:border-blue-400/80 hover:shadow-blue-500/25' },
                              { id: 'purpose', name: 'Purpose', icon: Target, color: 'text-emerald-600', hoverGlow: 'hover:border-emerald-400/80 hover:shadow-emerald-500/25' },
                              { id: 'work', name: 'Work', icon: Briefcase, color: 'text-indigo-600', hoverGlow: 'hover:border-indigo-400/80 hover:shadow-indigo-500/25' },
                              { id: 'mission', name: 'Mission', icon: Zap, color: 'text-amber-600', hoverGlow: 'hover:border-amber-400/80 hover:shadow-amber-500/25' },
                              { id: 'vision', name: 'Vision', icon: Eye, color: 'text-sky-600', hoverGlow: 'hover:border-sky-400/80 hover:shadow-sky-500/25' },
                              { id: 'whyChooseUs', name: 'Why Choose Us', icon: Award, color: 'text-teal-600', hoverGlow: 'hover:border-teal-400/80 hover:shadow-teal-500/25' },
                              { id: 'benefits', name: 'Benefit', icon: Gift, color: 'text-purple-600', hoverGlow: 'hover:border-purple-400/80 hover:shadow-purple-500/25' },
                              { id: 'useCases', name: 'Use', icon: CheckCircle2, color: 'text-amber-600', hoverGlow: 'hover:border-amber-400/80 hover:shadow-amber-500/25' },
                              { id: 'featureMenu', name: 'Feature Menu', icon: ListFilter, color: 'text-rose-600', hoverGlow: 'hover:border-rose-400/80 hover:shadow-rose-500/25' },
                              { id: 'keywords', name: 'Keywords', icon: Tag, color: 'text-violet-600', hoverGlow: 'hover:border-violet-400/80 hover:shadow-violet-500/25' },
                              { id: 'other', name: 'Other Details', icon: Sliders, color: 'text-slate-600', hoverGlow: 'hover:border-slate-400/80 hover:shadow-slate-500/25' }
                            ].map(opt => {
                              const Icon = opt.icon;
                              return (
                                <button
                                  key={opt.id}
                                  onClick={() => handleSelectTab(opt.id, msg.cardData)}
                                  className={`flex items-center gap-1.5 p-2 bg-gradient-to-br from-white/50 to-white/20 hover:from-[#1e2a52] hover:to-[#2b3a6d] hover:text-white backdrop-blur-2xl border border-white/80 ${opt.hoverGlow} rounded-xl transition-all duration-300 text-left font-bold text-[11px] text-slate-900 group shadow-[0_4px_16px_rgba(31,38,135,0.07),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:shadow-lg hover:-translate-y-0.5`}
                                >
                                  <div className="w-5.5 h-5.5 rounded-lg bg-white/50 group-hover:bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/70 transition-colors">
                                    <Icon className={`w-3 h-3 ${opt.color} group-hover:text-white`} />
                                  </div>
                                  <span className="truncate">{opt.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Tab Response Details (HYPER-TRANSPARENT GLASSMORPHISM CARD) */}
                      {msg.type === 'tab_response' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-white/65 via-white/40 to-indigo-100/30 backdrop-blur-2xl border border-white/80 rounded-2xl p-4 shadow-[0_12px_40px_rgba(30,42,82,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] space-y-3.5 border-l-4 border-l-indigo-600">
                          {/* Ambient Glowing Glass Flare */}
                          <div className="absolute -top-10 -left-10 w-36 h-36 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

                          {/* Follow-up Context Preserved Header Badge */}
                          {msg.isFollowUp && (
                            <div className="relative z-10 flex items-center justify-between px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 border border-blue-400/40 text-xs font-bold text-slate-800 shadow-2xs mb-1">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" style={{ animationDuration: '3s' }} />
                                <span className="text-slate-600 font-semibold text-[11px] truncate">Follow-up for:</span>
                                <span className="font-extrabold text-[#1e2a52] bg-white/80 px-2 py-0.5 rounded-md border border-white/90 shrink-0">
                                  {msg.followUpCardName || msg.cardData.name} ({msg.followUpCardShort || msg.cardData.shortName})
                                </span>
                              </div>
                              <span className="text-[9px] font-black text-blue-800 uppercase tracking-wider bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30 shrink-0">
                                Context Preserved
                              </span>
                            </div>
                          )}

                          {/* Card Header & App Navigation */}
                          <div className="relative z-10 flex items-start justify-between gap-2 border-b border-slate-200/50 pb-2.5">
                            <div>
                              <span className="text-[9px] font-extrabold text-indigo-900 bg-indigo-500/20 backdrop-blur-md border border-indigo-300/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                                {msg.cardData.subtitle} &bull; {msg.cardData.shortName}
                              </span>
                              <h4 className="text-sm font-black text-slate-900 mt-1">{msg.cardData.name}</h4>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => {
                                  const textToRead = typeof msg.cardData[msg.selectedTab] === 'string'
                                    ? msg.cardData[msg.selectedTab]
                                    : Array.isArray(msg.cardData[msg.selectedTab])
                                      ? msg.cardData[msg.selectedTab].join('. ')
                                      : `${msg.cardData.name}. ${msg.cardData.overview}`;
                                  handleSpeakText(textToRead);
                                }}
                                className={`p-1.5 rounded-xl border backdrop-blur-xl transition-all shadow-xs flex items-center gap-1 text-[11px] font-bold ${
                                  isSpeaking
                                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                                    : 'bg-white/40 hover:bg-white/80 text-blue-900 border-white/80'
                                }`}
                                title={isSpeaking ? "Stop Voice Output" : "Listen to Voice Assistance"}
                              >
                                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
                                <span className="hidden sm:inline">{isSpeaking ? 'Mute' : 'Speak'}</span>
                              </button>

                              {onNavigateToModule && (
                                <button
                                  onClick={() => onNavigateToModule(msg.cardData.shortName)}
                                  className="text-[11px] font-extrabold text-blue-900 hover:text-blue-950 flex items-center gap-1 bg-white/40 hover:bg-white/80 backdrop-blur-xl px-2.5 py-1.5 rounded-xl border border-white/80 shrink-0 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5"
                                >
                                  <span>Open</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Topic Navigation Pills (HYPER-TRANSPARENT GLASS) */}
                          <div className="relative z-10 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none border-b border-slate-200/50">
                            {[
                              { id: 'introduction', label: 'Intro' },
                              { id: 'overview', label: 'Overview' },
                              { id: 'purpose', label: 'Purpose' },
                              { id: 'work', label: 'Work' },
                              { id: 'mission', label: 'Mission' },
                              { id: 'vision', label: 'Vision' },
                              { id: 'whyChooseUs', label: 'Why Choose Us' },
                              { id: 'benefits', label: 'Benefits' },
                              { id: 'useCases', label: 'Use Cases' },
                              { id: 'featureMenu', label: 'Features' },
                              { id: 'keywords', label: 'Keywords' },
                              { id: 'other', label: 'Other Details' }
                            ].map(t => (
                              <button
                                key={t.id}
                                onClick={() => handleSelectTab(t.id, msg.cardData)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                                  msg.selectedTab === t.id
                                    ? 'bg-gradient-to-r from-[#1e2a52] to-[#2b3a6d] text-white shadow-md border border-blue-400/40 backdrop-blur-md'
                                    : 'bg-white/35 backdrop-blur-xl text-slate-800 border border-white/70 hover:bg-white/70 hover:text-slate-950 hover:border-blue-400/60'
                                }`}
                              >
                                {t.label}
                              </button>
                            ))}
                          </div>

                          {/* Output Content Area (HYPER-TRANSPARENT INNER CONTAINER) */}
                          <div className="relative z-10 pt-1">
                            {/* Introduction */}
                            {msg.selectedTab === 'introduction' && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider flex items-center gap-1">
                                  <FileText className="w-3 h-3" /> Introduction
                                </span>
                                <p className="text-xs font-medium text-slate-900 leading-relaxed bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.introduction}
                                </p>
                              </div>
                            )}

                            {/* Overview */}
                            {msg.selectedTab === 'overview' && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                                  <Info className="w-3 h-3" /> Overview
                                </span>
                                <p className="text-xs font-medium text-slate-900 leading-relaxed bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.overview}
                                </p>
                              </div>
                            )}

                            {/* Purpose */}
                            {msg.selectedTab === 'purpose' && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                                  <Target className="w-3 h-3" /> Purpose
                                </span>
                                <p className="text-xs font-medium text-slate-900 leading-relaxed bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.purpose}
                                </p>
                              </div>
                            )}

                            {/* Work */}
                            {msg.selectedTab === 'work' && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                                  <Briefcase className="w-3 h-3" /> Work of This Module
                                </span>
                                <div className="text-xs font-medium text-slate-900 leading-relaxed whitespace-pre-line bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.work}
                                </div>
                              </div>
                            )}

                            {/* Mission */}
                            {msg.selectedTab === 'mission' && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                                  <Zap className="w-3 h-3" /> Mission Statement
                                </span>
                                <p className="text-xs font-medium text-slate-900 leading-relaxed bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.mission}
                                </p>
                              </div>
                            )}

                            {/* Vision */}
                            {msg.selectedTab === 'vision' && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1">
                                  <Eye className="w-3 h-3" /> Future Vision & Analytical Scope
                                </span>
                                <p className="text-xs font-medium text-slate-900 leading-relaxed bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.vision}
                                </p>
                              </div>
                            )}

                            {/* Why Choose Us */}
                            {msg.selectedTab === 'whyChooseUs' && (
                              <div className="space-y-2">
                                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider flex items-center gap-1">
                                  <Award className="w-3 h-3" /> Why Choose Us
                                </span>
                                <ul className="space-y-1.5 bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.whyChooseUs?.map((w, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-900 font-medium">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                                      <span>{w}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Benefits */}
                            {msg.selectedTab === 'benefits' && (
                              <div className="space-y-2">
                                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1">
                                  <Gift className="w-3 h-3" /> Key Benefits
                                </span>
                                <ul className="space-y-1.5 bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.benefits?.map((b, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-900 font-medium">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Use Cases */}
                            {msg.selectedTab === 'useCases' && (
                              <div className="space-y-2">
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Primary Use Cases
                                </span>
                                <div className="flex flex-wrap gap-1.5 bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.useCases?.map((u, i) => (
                                    <span key={i} className="bg-amber-500/20 text-amber-950 border border-amber-400/40 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-extrabold shadow-2xs">
                                      {u}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Feature Menu */}
                            {msg.selectedTab === 'featureMenu' && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                                    <ListFilter className="w-3 h-3" /> Features & Sub-Tools List
                                  </span>
                                  <span className="text-[10px] font-semibold text-slate-500">{msg.cardData.featureMenu?.length || 0} items</span>
                                </div>
                                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                                  {msg.cardData.featureMenu?.map((feat, i) => (
                                    <div key={i} className="p-2.5 bg-white/45 hover:bg-white/80 backdrop-blur-xl border border-white/80 rounded-xl transition-all shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5">
                                      <div className="font-bold text-xs text-slate-900">{feat.name}</div>
                                      <div className="text-[11px] text-slate-700 font-medium mt-0.5">{feat.desc}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Required Keywords */}
                            {msg.selectedTab === 'keywords' && (
                              <div className="space-y-2">
                                <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wider flex items-center gap-1">
                                  <Tag className="w-3 h-3" /> Required Keywords & Search Aliases
                                </span>
                                <div className="flex flex-wrap gap-1.5 bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.keywords?.map((k, i) => (
                                    <span key={i} className="bg-violet-500/20 text-violet-950 border border-violet-400/40 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-extrabold shadow-2xs">
                                      {k}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Other Details */}
                            {msg.selectedTab === 'other' && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                                  <Sliders className="w-3 h-3" /> Other Specifications, Formats & Security
                                </span>
                                <div className="text-xs font-medium text-slate-900 leading-relaxed whitespace-pre-line bg-white/35 backdrop-blur-2xl p-3.5 rounded-xl border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_20px_rgba(30,42,82,0.04)]">
                                  {msg.cardData.other}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Search Results (HYPER-TRANSPARENT GLASSMORPHISM CARD) */}
                      {msg.type === 'search_results' && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-white/65 via-white/40 to-blue-100/30 backdrop-blur-2xl border border-white/80 rounded-2xl p-4 shadow-[0_12px_40px_rgba(30,42,82,0.12)] space-y-3">
                          <p className="text-xs text-slate-800 font-semibold">
                            Found {msg.results.length} matching cards for "{msg.query}":
                          </p>
                          <div className="space-y-2 max-h-[200px] overflow-y-auto">
                            {msg.results.map(c => (
                              <div
                                key={c.id}
                                onClick={() => handleSelectCard(c.id)}
                                className="p-3 bg-white/45 hover:bg-white/85 backdrop-blur-xl border border-white/80 hover:border-blue-400/60 rounded-xl cursor-pointer transition-all flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5"
                              >
                                <div>
                                  <div className="font-bold text-xs text-slate-900">{c.name} ({c.shortName})</div>
                                  <div className="text-[10px] text-slate-600 font-medium">{c.subtitle}</div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-blue-600" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* VOICE ASSISTANT LISTENING BANNER */}
            <AnimatePresence>
              {(isListening || voiceNotice) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative z-10 px-3 py-1.5 bg-gradient-to-r from-red-600/15 via-rose-600/15 to-indigo-600/15 border-t border-rose-300/40 flex items-center justify-between text-xs font-extrabold text-rose-950 shrink-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                    </span>
                    <span className="truncate text-[11px]">{voiceNotice || 'Listening... Speak card name or question now!'}</span>
                  </div>
                  {isListening && (
                    <button
                      type="button"
                      onClick={toggleMic}
                      className="text-[10px] font-black text-rose-700 bg-white/80 hover:bg-white px-2 py-0.5 rounded-md border border-rose-200 transition-colors shrink-0 shadow-2xs"
                    >
                      Stop Mic
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CHAT INPUT BAR WITH MICROPHONE ASSISTANT */}
            <form onSubmit={handleSendMessage} className="relative z-10 p-3 bg-white/80 backdrop-blur-xl border-t border-white/80 flex items-center gap-1.5 shrink-0 shadow-lg">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={isListening ? "Listening to your voice..." : "Search card (e.g. CDR) or ask question..."}
                  className={`w-full text-slate-900 placeholder:text-slate-400 text-xs font-semibold rounded-xl pl-9 pr-3 py-2.5 border transition-all shadow-inner outline-none ${
                    isListening
                      ? 'bg-rose-50/90 border-rose-400 ring-2 ring-rose-500/20'
                      : 'bg-slate-100/80 focus:bg-white/95 border-white/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-md'
                  }`}
                />
              </div>

              {/* MICROPHONE VOICE ASSISTANT BUTTON */}
              <button
                type="button"
                onClick={toggleMic}
                className={`p-2.5 rounded-xl transition-all shadow-md shrink-0 active:scale-95 border ${
                  isListening
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-400 animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                    : 'bg-white/80 hover:bg-white text-slate-700 hover:text-blue-900 border-white/90 shadow-2xs'
                }`}
                title={isListening ? "Stop Voice Listening" : "Start Voice Assistant Microphone"}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-white" />
                ) : (
                  <Mic className="w-4 h-4 text-blue-600" />
                )}
              </button>

              {/* SEND QUERY BUTTON */}
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="bg-gradient-to-r from-[#1e2a52] to-[#2a3c74] hover:from-[#172142] hover:to-[#223263] disabled:opacity-40 text-white p-2.5 rounded-xl transition-all shadow-md shrink-0 active:scale-95 border border-blue-400/30"
                title="Send query to agent"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
