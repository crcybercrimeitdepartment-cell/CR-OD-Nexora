import React, { useState, useEffect } from 'react';
import { Globe, Save, ChevronDown, ArrowLeft, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi (हिन्दी)', flag: '🇮🇳' },
  { code: 'or', name: 'Odia (ଓଡ଼ିଆ)', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali (বাংলা)', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu (తెలుగు)', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil (தமிழ்)', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi (मराठी)', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam (മലയാളം)', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸' }
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
  const [isOpen, setIsOpen] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    try {
      // Save permanently to localStorage so changes fix/persist across page re-opens
      localStorage.setItem(SAVED_LANG_KEY, selectedLanguageObj.code);
      i18n.changeLanguage(selectedLanguageObj.code);

      // Trigger Google Translate for the entire project DOM
      document.cookie = `googtrans=/en/${selectedLanguageObj.code}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/${selectedLanguageObj.code}; path=/`; // Fallback for local testing
      
      // Reload the page to apply the translation everywhere instantly
      window.location.reload();
      return; 
    } catch (e) {
      console.warn('Failed to save language in localStorage:', e);
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-xs hover:shadow-md text-slate-700 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#1e2a52]" />
          <span>{t('languageSetting.back')}</span>
        </button>
      )}

      {/* Main Container Card matching screenshot */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative">

        {/* Save Toast Notification */}
        {savedToast && (
          <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs sm:text-sm font-semibold animate-fade-in z-50">
            <Check className="w-4 h-4" />
            <span>{t('languageSetting.successMessage')}</span>
          </div>
        )}

        {/* Page Header matching screenshot */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              {t('languageSetting.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {t('languageSetting.subtitle')}
            </p>
          </div>
        </div>

        {/* Inner Config Card matching screenshot */}
        <div className="bg-slate-50/60 rounded-2xl p-5 sm:p-7 border border-slate-200/70 space-y-6">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {t('languageSetting.available')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              {t('languageSetting.setAsDefault')}
            </p>
          </div>

          {/* Select Input Field */}
          <div className="space-y-2 relative">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              Language
            </label>

            {/* Custom Dropdown Trigger */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white border border-blue-400 hover:border-blue-600 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer shadow-xs transition-all"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 notranslate" translate="no">
                  {selectedLanguageObj.name}
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div 
                data-lenis-prevent="true"
                className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 max-h-[250px] overflow-y-auto overscroll-contain"
              >
                {LANGUAGES.map((lang, idx) => (
                  <div
                    key={`${lang.code}-${idx}`}
                    onClick={() => {
                      setSelectedLanguageObj(lang);
                      setIsOpen(false);
                    }}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer hover:bg-blue-50/70 transition-colors ${selectedLanguageObj.name === lang.name ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <span className="notranslate" translate="no">{lang.name}</span>
                    </div>
                    {selectedLanguageObj.name === lang.name && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save Changes Button matching screenshot */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t('languageSetting.saveChanges')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
