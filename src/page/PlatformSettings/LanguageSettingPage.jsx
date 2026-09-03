import React, { useState, useEffect } from 'react';
import { Globe, Save, ArrowLeft, Check, Languages, RotateCcw, X, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🌐' },
  { code: 'hi', name: 'Hindi (हिन्दी)', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali (বাংলা)', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu (తెలుగు)', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi (मराठी)', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil (தமிழ்)', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu (اردو)', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam (മലയാളം)', flag: '🇮🇳' },
  { code: 'or', name: 'Odia (ଓଡ଼ିଆ)', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese (অসমীয়া)', flag: '🇮🇳' },
  { code: 'mai', name: 'Maithili (मैथिली)', flag: '🇮🇳' },
  { code: 'bho', name: 'Bhojpuri (भोजपुरी)', flag: '🇮🇳' },
  { code: 'kok', name: 'Konkani (कोंकणी)', flag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri (कश्मीरी)', flag: '🇮🇳' },
  { code: 'ne', name: 'Nepali (नेपाली)', flag: '🇮🇳' },
  { code: 'sa', name: 'Sanskrit (संस्कृतम्)', flag: '🇮🇳' },
  { code: 'sd', name: 'Sindhi (सिन्धी)', flag: '🇮🇳' },
  { code: 'doi', name: 'Dogri (डोगरी)', flag: '🇮🇳' },
  { code: 'mni', name: 'Manipuri (মৈতৈলোন্)', flag: '🇮🇳' },
  { code: 'brx', name: 'Bodo (बड़ो)', flag: '🇮🇳' },
  { code: 'sat', name: 'Santali (संथाली)', flag: '🇮🇳' },
  { code: 'lus', name: 'Mizo (मिज़ो)', flag: '🇮🇳' },
  { code: 'raj', name: 'Rajasthani (राजस्थानी)', flag: '🇮🇳' },
  { code: 'hne', name: 'Chhattisgarhi (छत्तीसगढ़ी)', flag: '🇮🇳' },
  { code: 'bgc', name: 'Haryanvi (हरियाणवी)', flag: '🇮🇳' },
  { code: 'tcy', name: 'Tulu (ತುಳು)', flag: '🇮🇳' }
];

const SAVED_LANG_KEY = 'nexora_saved_language_v1';

export default function LanguageSetting({ onBack }) {
  const { t, i18n } = useTranslation();

  // Load initial saved language from localStorage if available
  const getInitialLanguage = () => {
    try {
      const saved = localStorage.getItem(SAVED_LANG_KEY);
      if (saved) {
        const found = LANGUAGES.find(l => l.name === saved || l.code === saved);
        if (found) return found;
      }
    } catch (e) {
      console.warn('LocalStorage access error:', e);
    }
    return LANGUAGES[0]; // Default English
  };

  const [selectedLanguageObj, setSelectedLanguageObj] = useState(getInitialLanguage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastInfo, setToastInfo] = useState({ show: false, message: '', type: 'success' });

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleSave = () => {
    try {
      // Save permanently to localStorage
      localStorage.setItem(SAVED_LANG_KEY, selectedLanguageObj.code);
      i18n.changeLanguage(selectedLanguageObj.code);

      // Set cookies for Google Translate fallback
      document.cookie = `googtrans=/en/${selectedLanguageObj.code}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/${selectedLanguageObj.code}; path=/`;

      setToastInfo({
        show: true,
        message: t('languageSetting.successMessage', 'Language updated successfully!'),
        type: 'success'
      });

      // Reload smoothly after toast confirmation
      setTimeout(() => {
        window.location.reload();
      }, 700);
      return;
    } catch (e) {
      console.warn('Failed to save language in localStorage:', e);
    }
  };

  const handleResetLanguage = () => {
    const defaultLang = LANGUAGES[0]; // English
    setSelectedLanguageObj(defaultLang);
    setIsModalOpen(false);

    try {
      // Reset localStorage and i18n to English
      localStorage.setItem(SAVED_LANG_KEY, defaultLang.code);
      i18n.changeLanguage(defaultLang.code);

      // Reset cookies to default English
      document.cookie = `googtrans=/en/${defaultLang.code}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/${defaultLang.code}; path=/`;

      setToastInfo({
        show: true,
        message: t('languageSetting.resetSuccessMessage', 'Language reset to English (Default) successfully!'),
        type: 'reset'
      });

      // Reload smoothly to revert DOM and translation to English
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (e) {
      console.warn('Failed to reset language:', e);
    }
  };

  const filteredLanguages = LANGUAGES.filter(
    lang =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-xs hover:shadow-md text-slate-700 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#1e2a52]" />
          <span>{t('languageSetting.back', 'Back')}</span>
        </button>
      )}

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative">

        {/* Toast Notification */}
        {toastInfo.show && (
          <div
            className={`absolute top-4 right-4 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs sm:text-sm font-semibold animate-fade-in z-50 ${
              toastInfo.type === 'reset' ? 'bg-amber-600' : 'bg-emerald-600'
            }`}
          >
            {toastInfo.type === 'reset' ? (
              <RotateCcw className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>{toastInfo.message}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              {t('languageSetting.title', 'Language Settings')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {t('languageSetting.subtitle', 'Select your preferred language for the Nexora dashboard.')}
            </p>
          </div>
        </div>

        {/* Inner Config Card */}
        <div className="bg-slate-50/60 rounded-2xl p-5 sm:p-7 border border-slate-200/70 space-y-6">
          {/* 3 Interactive Icons Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative">
            {/* 1. Change Language Icon Card / Button (Opens Popup Modal) */}
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsModalOpen(true);
              }}
              className="w-full h-full p-4 rounded-xl border border-slate-200/90 hover:border-blue-400 hover:bg-blue-50/40 bg-white shadow-xs text-left flex items-center gap-3.5 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-blue-100 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all shadow-xs">
                <Languages className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  {t('languageSetting.changeLanguage', 'Change Language')}
                </span>
                <p className="text-sm font-semibold text-slate-700 mt-1 truncate">
                  Select Language
                </p>
              </div>
            </button>

            {/* 2. Active Language Icon Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-3.5 transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-xs">
                <Globe className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {t('languageSetting.activeLanguage', 'Active Language')}
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                    Live
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-800 truncate mt-1 flex items-center gap-1.5 notranslate" translate="no">
                  <span className="text-base">{selectedLanguageObj.flag}</span>
                  <span className="truncate">{selectedLanguageObj.name}</span>
                </p>
              </div>
            </div>

            {/* 3. Reset Language Icon Card / Button */}
            <button
              type="button"
              onClick={handleResetLanguage}
              className="bg-white p-4 rounded-xl border border-slate-200/90 hover:border-amber-300 hover:bg-amber-50/40 active:scale-[0.98] shadow-xs flex items-center gap-3.5 text-left transition-all cursor-pointer group"
              title="Reset to English (Default)"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 flex items-center justify-center shrink-0 border border-amber-100 transition-all shadow-xs">
                <RotateCcw className="w-5 h-5 text-amber-600 group-hover:-rotate-45 transition-transform duration-300" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  {t('languageSetting.resetLanguage', 'Reset Language')}
                </span>
                <p className="text-sm font-semibold text-slate-700 mt-1 truncate">
                  English (Default)
                </p>
              </div>
            </button>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t('languageSetting.saveChanges', 'Save Changes')}</span>
            </button>
          </div>
        </div>

      </div>

      {/* LANGUAGE SELECTION POPUP MODAL */}
      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60"
          style={{ willChange: 'opacity' }}
        >
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden relative"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {t('languageSetting.changeLanguage', 'Select Language')}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Choose from 28+ Indian & Regional Languages
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Filter */}
            <div className="px-5 sm:px-6 pt-3 pb-1">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Indian language (Hindi, Odia, Tamil, Bengali...)"
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Languages Grid */}
            <div className="p-5 sm:p-6 pt-3 max-h-[380px] overflow-y-auto overscroll-contain">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredLanguages.map((lang) => {
                  const isSelected = selectedLanguageObj.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLanguageObj(lang);
                        setIsModalOpen(false);
                      }}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-100 text-blue-900 font-bold shadow-xs'
                          : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/40 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-xs sm:text-sm truncate notranslate" translate="no">
                          {lang.name}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {filteredLanguages.length === 0 && (
                <div className="text-center py-8 text-xs sm:text-sm text-slate-400">
                  No languages found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                Active: <span className="font-bold text-slate-800 notranslate" translate="no">{selectedLanguageObj.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
