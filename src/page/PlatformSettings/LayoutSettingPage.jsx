import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NEXORA_MODULES } from '../../data/nexora';
import { ALL_SUB_TOOLS } from '../../data/subTools';
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Sliders,
  Grid,
  List,
  GripVertical,
  Info,
  Check,
  Globe,
  Palette,
  Accessibility,
  LayoutGrid,
  Bell,
  ZoomIn,
  Mic,
  History,
  ShieldCheck,
  Camera,
  KeyRound,
  Layout,
  Maximize2
} from 'lucide-react';

const SAVED_LAYOUT_KEY_SETTINGS = 'nexora_layout_settings_v1';
const SAVED_LAYOUT_KEY_DASHBOARD = 'nexora_layout_settings_v1_Dashboard';

// Icon Map for safe JSON serialization and rendering matching the 12 dashboard cards
const ICON_MAP = {
  Globe,
  Palette,
  Accessibility,
  LayoutGrid,
  Bell,
  Sliders,
  ZoomIn,
  Mic,
  History,
  ShieldCheck,
  Camera,
  KeyRound,
  'language-setting': Globe,
  'customise-theme': Palette,
  'accessibility-setting': Accessibility,
  'layout-setting': LayoutGrid,
  'notification-setting': Bell,
  'animation-setting': Sliders,
  'zoom-controls': ZoomIn,
  'voice-assistant': Mic,
  'user-activity-log': History,
  'platform-security-setting': ShieldCheck,
  'web-camera-setting': Camera,
  '2-factor-authentication': KeyRound
};

// Default preview cards matching the exact 12 modules on the main Dashboard
const DEFAULT_PREVIEW_CARDS = [
  { id: 'language-setting', title: 'Language Setting', desc: 'Select system languages, regional formats, and localized dialect preferences.', iconName: 'Globe', bg: 'bg-[#E3F2FD]', color: 'text-[#2563EB]' },
  { id: 'customise-theme', title: 'Customise Theme', desc: 'Personalize UI color palettes, dark mode toggles, and accent themes.', iconName: 'Palette', bg: 'bg-[#F3E5F5]', color: 'text-[#9C27B0]' },
  { id: 'accessibility-setting', title: 'Accessibility Setting', desc: 'Configure high contrast modes, screen reader support, and font scaling.', iconName: 'Accessibility', bg: 'bg-[#ECFDF5]', color: 'text-[#059669]' },
  { id: 'layout-setting', title: 'Layout Setting', desc: 'Adjust grid spacing, card density, sidebar placement, and dashboard layout.', iconName: 'LayoutGrid', bg: 'bg-[#FFF3E0]', color: 'text-[#EA580C]' },
  { id: 'notification-setting', title: 'Notification Setting', desc: 'Manage push alerts, email notifications, sound cues, and system warnings.', iconName: 'Bell', bg: 'bg-[#FFECEC]', color: 'text-[#DC2626]' },
  { id: 'animation-setting', title: 'Animation Setting', desc: 'Control UI motion, GSAP transition speeds, and reduced motion settings.', iconName: 'Sliders', bg: 'bg-[#F0FDF4]', color: 'text-[#16A34A]' },
  { id: 'zoom-controls', title: 'Zoom Controls', desc: 'Set viewport scale ratios, default zoom levels, and magnification shortcuts.', iconName: 'ZoomIn', bg: 'bg-[#E0F7FA]', color: 'text-[#0891B2]' },
  { id: 'voice-assistant', title: 'Voice Assistant', desc: 'Enable hands-free voice commands, speech recognition, and audio feedback.', iconName: 'Mic', bg: 'bg-[#F5F3FF]', color: 'text-[#7C3AED]' },
  { id: 'user-activity-log', title: 'User Activity Log', desc: 'Audit user login sessions, timestamps, IP histories, and administrative activity.', iconName: 'History', bg: 'bg-[#FEF3C7]', color: 'text-[#D97706]' },
  { id: 'platform-security-setting', title: 'Platform Security Setting', desc: 'Configure firewall rules, encryption standards, session timeouts, and IP white-listing.', iconName: 'ShieldCheck', bg: 'bg-[#EFF6FF]', color: 'text-[#1D4ED8]' },
  { id: 'web-camera-setting', title: 'Web Camera Setting', desc: 'Manage camera devices, resolution quality, frame rates, and video capture permissions.', iconName: 'Camera', bg: 'bg-[#FDF2F8]', color: 'text-[#DB2777]' },
  { id: '2-factor-authentication', title: '2 Factor Authentication', desc: 'Configure TOTP authenticator apps, SMS OTP backups, and biometric 2FA keys.', iconName: 'KeyRound', bg: 'bg-[#FEF2F2]', color: 'text-[#B91C1C]' }
];

const DASHBOARD_PREVIEW_CARDS = NEXORA_MODULES.map(m => ({
  id: m.id || m.name,
  title: m.name,
  desc: m.description,
  icon: m.icon,
  bg: m.bgColor,
  color: m.iconColor
}));

const TARGET_PAGES = [
  { id: 'dashboard', label: 'Main Dashboard', defaultCards: DASHBOARD_PREVIEW_CARDS, key: SAVED_LAYOUT_KEY_DASHBOARD },
  { id: 'settings', label: 'Platform Settings', defaultCards: DEFAULT_PREVIEW_CARDS, key: SAVED_LAYOUT_KEY_SETTINGS }
];

const subPageGroups = {};
ALL_SUB_TOOLS.forEach(tool => {
  if (!subPageGroups[tool.parentId]) {
    subPageGroups[tool.parentId] = [];
  }
  subPageGroups[tool.parentId].push({
    id: tool.id,
    title: tool.name,
    desc: tool.desc,
    icon: tool.icon,
    bg: tool.bg,
    color: tool.color
  });
});

Object.keys(subPageGroups).forEach(parentId => {
  const mod = NEXORA_MODULES.find(m => m.id.toUpperCase() === parentId.toUpperCase() || m.id === parentId);
  const label = mod ? `${mod.name} Modules` : `${parentId} Modules`;
  
  let pageId = parentId.toLowerCase();
  if (parentId === 'AboutUs') pageId = 'about-us';
  if (parentId === 'AccountSetting') pageId = 'account-setting';

  TARGET_PAGES.push({
    id: pageId,
    label: label,
    defaultCards: subPageGroups[parentId],
    key: `nexora_layout_settings_v1_${pageId}`
  });
});

const getDefaultSettings = (pageId) => {
  const target = TARGET_PAGES.find(p => p.id === pageId);
  return {
    gridColumns: 4,
    arrangement: 'Grid',
    spacing: 'Comfortable',
    cardSize: 'Medium',
    cards: target.defaultCards
  };
};

export default function LayoutSetting({ onBack }) {
  const { t } = useTranslation();
  
  // Target Page State
  const [targetPageId, setTargetPageId] = useState('dashboard');
  const currentTarget = TARGET_PAGES.find(p => p.id === targetPageId);

  // Load saved settings from localStorage safely
  const getSavedSettings = (pageId) => {
    const target = TARGET_PAGES.find(p => p.id === pageId);
    const defaults = getDefaultSettings(pageId);
    try {
      const saved = localStorage.getItem(target.key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.cards)) {
          const validIds = target.defaultCards.map(d => d.id);
          const savedCardIds = parsed.cards.map(c => c.id);

          const merged = parsed.cards
            .filter(c => validIds.includes(c.id))
            .map(c => {
              const def = target.defaultCards.find(d => d.id === c.id);
              return { ...def, ...c };
            });

          target.defaultCards.forEach(def => {
            if (!savedCardIds.includes(def.id)) {
              merged.push(def);
            }
          });

          parsed.cards = merged;
        }
        return { ...defaults, ...parsed };
      }
    } catch (e) {
      console.warn('LocalStorage access error:', e);
    }
    return defaults;
  };

  const initialSettings = getSavedSettings(targetPageId);

  // State Management
  const [gridColumns, setGridColumns] = useState(initialSettings.gridColumns);
  const [arrangement, setArrangement] = useState(initialSettings.arrangement);
  const [spacing, setSpacing] = useState(initialSettings.spacing);
  const [cardSize, setCardSize] = useState(initialSettings.cardSize);
  const [cards, setCards] = useState(initialSettings.cards);

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const settings = getSavedSettings(targetPageId);
    setGridColumns(settings.gridColumns);
    setArrangement(settings.arrangement);
    setSpacing(settings.spacing);
    setCardSize(settings.cardSize);
    setCards(settings.cards);
  }, [targetPageId]);

  // Drag State
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState(null);

  // Toast State
  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Layout settings saved successfully!');

  // Save Settings to LocalStorage & notify dashboard
  const handleSave = () => {
    const layoutSettings = {
      gridColumns,
      arrangement,
      spacing,
      cardSize,
      cards: cards.map((c) => ({
        id: c.id,
        title: c.title,
        desc: c.desc,
        iconName: c.iconName || c.id,
        bg: c.bg,
        color: c.color
      }))
    };

    try {
      localStorage.setItem(currentTarget.key, JSON.stringify(layoutSettings));
      window.dispatchEvent(new Event('layoutUpdate'));
    } catch (e) {
      console.warn('Failed to save layout settings:', e);
    }

    setToastMessage(`Layout settings saved & applied to ${currentTarget.label}!`);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  // Reset Order & Settings
  const handleResetOrder = () => {
    const defaults = getDefaultSettings(targetPageId);
    setGridColumns(defaults.gridColumns);
    setArrangement(defaults.arrangement);
    setSpacing(defaults.spacing);
    setCardSize(defaults.cardSize);
    setCards(defaults.cards);

    try {
      localStorage.removeItem(currentTarget.key);
      window.dispatchEvent(new Event('layoutUpdate'));
    } catch (e) {
      console.warn('Failed to reset localStorage:', e);
    }

    setToastMessage(`${currentTarget.label} layout reset to default!`);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  // Reset ALL Global Layouts
  const handleResetAllGlobal = () => {
    TARGET_PAGES.forEach(page => {
      try {
        localStorage.removeItem(page.key);
      } catch (e) {}
    });

    const defaults = getDefaultSettings(targetPageId);
    setGridColumns(defaults.gridColumns);
    setArrangement(defaults.arrangement);
    setSpacing(defaults.spacing);
    setCardSize(defaults.cardSize);
    setCards(defaults.cards);

    window.dispatchEvent(new Event('layoutUpdate'));

    setToastMessage('All global layouts across all pages reset to default!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === index) return;
    setDragOverItemIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === dropIndex) return;

    const updatedCards = [...cards];
    const [draggedCard] = updatedCards.splice(draggedItemIndex, 1);
    updatedCards.splice(dropIndex, 0, draggedCard);

    setCards(updatedCards);
    setDraggedItemIndex(null);
    setDragOverItemIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDragOverItemIndex(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pt-16 sm:pt-24 pb-8 sm:pb-16 px-4 sm:px-6 md:px-8 space-y-6 relative min-h-[80vh] z-50">
      {onBack && (
        <button onClick={onBack} className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-10 z-[100] text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm">
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span>{t('layoutSetting.back', 'Back')}</span>
        </button>
      )}
      
      {/* Top Action Row (Save Button) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-10 z-[100] flex items-center gap-2 sm:gap-4">

        <button
          onClick={handleResetAllGlobal}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 active:scale-95 text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Global Settings</span>
        </button>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{t('layoutSetting.saveChanges')}</span>
        </button>
      </div>

      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold z-50 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
          {t('layoutSetting.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 mb-6">
          Customize structure and density for individual platform areas.
        </p>

        {/* Page Selector Custom Dropdown */}
        <div className="relative w-full max-w-sm mt-2" ref={dropdownRef}>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-slate-100/80 border border-slate-200 text-slate-800 text-sm font-bold py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-slate-200/50 transition-all shadow-sm cursor-pointer flex items-center justify-between select-none"
          >
            <span className="truncate">{TARGET_PAGES.find(p => p.id === targetPageId)?.label || 'Select Page'}</span>
            <svg className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          
          {isDropdownOpen && (
            <div 
              onWheel={(e) => e.stopPropagation()}
              className="absolute z-[9999] w-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-2xl max-h-[176px] overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent pointer-events-auto"
            >
              {TARGET_PAGES.map(page => (
                <div
                  key={page.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTargetPageId(page.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`px-4 py-3 text-sm font-bold cursor-pointer transition-colors ${
                    targetPageId === page.id ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600' : 'text-slate-700 hover:bg-slate-100 border-l-4 border-transparent'
                  }`}
                >
                  {page.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===================================================================
          1. LIVE PREVIEW SECTION (PLACED ON TOP AS REQUESTED)
          =================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        {/* Live Preview Header with Arrangement Toggle Icons */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              {t('layoutSetting.preview')} <span className="text-xs text-slate-400 font-normal">({t('layoutSetting.cardOrderDesc')})</span>
            </h2>
          </div>
          <div className="flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/80 shadow-2xs">
            <button
              type="button"
              onClick={() => setArrangement('Grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${arrangement === 'Grid' ? 'bg-white text-indigo-600 shadow-2xs font-bold' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setArrangement('List')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${arrangement === 'List' ? 'bg-white text-indigo-600 shadow-2xs font-bold' : 'text-slate-400 hover:text-slate-600'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Draggable Cards Grid in Live Preview (Full Width Top View) */}
        <div className={
          arrangement === 'Grid'
            ? `grid ${gridColumns === 2 ? 'grid-cols-2' : gridColumns === 3 ? 'grid-cols-3' : 'grid-cols-4'} gap-3.5`
            : 'space-y-3'
        }>
          {cards.map((card, index) => {
            const CardIcon = ICON_MAP[card.iconName] || ICON_MAP[card.id] || Globe;
            const isDragging = draggedItemIndex === index;
            const isDragOver = dragOverItemIndex === index;

            return (
              <div
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-2xl ${gridColumns >= 3 && arrangement === 'Grid' ? 'p-2 sm:p-3' : 'p-3.5'} border transition-all cursor-grab active:cursor-grabbing flex ${gridColumns >= 3 && arrangement === 'Grid' ? 'flex-col justify-center text-center' : 'items-center justify-between'} shadow-2xs hover:shadow-md ${
                  isDragging ? 'opacity-40 scale-95 border-indigo-400 border-dashed bg-indigo-50/50' : 'border-slate-200/90'
                } ${isDragOver ? 'border-indigo-600 ring-2 ring-indigo-200' : ''}`}
              >
                <div className={`flex ${gridColumns >= 3 && arrangement === 'Grid' ? 'flex-col items-center justify-center gap-1 sm:gap-2 w-full' : 'items-center gap-3 min-w-0 pr-1'}`}>
                  {!(gridColumns >= 3 && arrangement === 'Grid') && (
                    <GripVertical className="w-4 h-4 text-slate-300 shrink-0 hidden sm:block" />
                  )}
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${card.bg || card.bgColor || 'bg-blue-50'} ${card.color || card.iconColor || 'text-blue-600'} flex items-center justify-center shrink-0 border border-slate-100`}>
                    {React.isValidElement(card.icon) ? React.cloneElement(card.icon, { className: 'w-4 h-4 sm:w-4.5 sm:h-4.5' }) : <CardIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
                  </div>
                  <div className="min-w-0 w-full">
                    <h4 className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-900 truncate w-full">{t(`modules.${card.id}.name`, card.title)}</h4>
                    {!(gridColumns >= 3 && arrangement === 'Grid') && (
                      <p className="text-[calc(11px*var(--text-scale,1))] text-slate-400 truncate w-full">{t(`modules.${card.id}.description`, card.desc)}</p>
                    )}
                  </div>
                </div>

                {!(gridColumns >= 3 && arrangement === 'Grid') && (
                  <span className="text-xs font-extrabold text-slate-700 px-2 shrink-0">
                    {index + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================
          2. DASHBOARD ARRANGEMENT CONTROLS SECTION (PLACED BELOW LIVE PREVIEW)
          =================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        {/* Section Title */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {t('layoutSetting.title')}
          </h2>
        </div>

        {/* Arrangement Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Column Left: Grid Columns & Arrangement */}
          <div className="space-y-6">

            {/* Control 1: Grid Columns */}
            <div className="space-y-3">
              <div>
                <span className="block text-xs sm:text-sm font-bold text-slate-800">{t('layoutSetting.gridColumns')}</span>
                <p className="text-[calc(11px*var(--text-scale,1))] text-slate-400 font-medium">{t('layoutSetting.gridColumnsDesc')}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-1">
                {[2, 3, 4].map((cols) => {
                  const isSelected = gridColumns === cols;
                  return (
                    <button
                      key={cols}
                      type="button"
                      onClick={() => setGridColumns(cols)}
                      className={`py-3.5 px-2 rounded-2xl border-2 flex flex-col items-center justify-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#635BFF] text-[#635BFF] bg-indigo-50/30 font-extrabold shadow-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex gap-1 items-center justify-center">
                        {Array.from({ length: cols }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-3 sm:w-2.5 sm:h-3.5 rounded-[2px] transition-colors ${
                              isSelected ? 'bg-[#635BFF]' : 'bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[calc(11px*var(--text-scale,1))] sm:text-xs font-bold leading-none">{cols} Columns</span>
                    </button>
                  );
                })}
              </div>
            </div>





          </div>

          {/* Column Right: Card Order, Drag Info & Widget Order */}
          <div className="space-y-6">

            {/* Control 4: Card Order + Reset Button */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">{t('layoutSetting.cardOrder')}</h3>
                  <p className="text-[calc(11px*var(--text-scale,1))] text-slate-400 font-medium">{t('layoutSetting.cardOrderDesc')}</p>
                </div>
                <button
                  type="button"
                  onClick={handleResetOrder}
                  className="px-3.5 py-2 border border-slate-200 hover:border-slate-300 bg-white text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t('layoutSetting.resetOrder')}</span>
                </button>
              </div>

              {/* Drag & Drop Reorder Info Card */}
              <div className="bg-[#f5f8ff] border border-[#e2ebff] rounded-2xl p-4 flex items-center gap-4 mt-2 shadow-2xs">
                <div className="w-11 h-11 rounded-2xl bg-[#e8edff] text-[#635BFF] flex items-center justify-center shrink-0">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#312e81]">{t('layoutSetting.cardOrder')}</h4>
                  <p className="text-[calc(11px*var(--text-scale,1))] text-[#635BFF] font-semibold mt-0.5 leading-snug">
                    {t('layoutSetting.dragInfo')}
                  </p>
                </div>
              </div>
            </div>



          </div>

        </div>
      </div>

      {/* ===================================================================
          3. CARD SIZE SECTION
          =================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        {/* Section Title */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {t('layoutSetting.cardSize')}
          </h2>
        </div>

        <p className="text-xs text-slate-500 font-medium">{t('layoutSetting.cardSizeDesc')}</p>

        {/* 2-Column Split: Card Size Selectors vs Preview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: 4 Size Options (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
            {[
              { size: 'Small', icon: Layout },
              { size: 'Medium', icon: Layout },
              { size: 'Large', icon: Maximize2 },
              { size: 'Auto-fit', icon: Grid }
            ].map(({ size }) => {
              const isSelected = cardSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setCardSize(size)}
                  className={`p-4 rounded-2xl border text-center font-bold text-xs transition-all cursor-pointer flex flex-col items-center gap-2.5 ${
                    isSelected
                      ? 'border-2 border-[#635BFF] text-[#635BFF] bg-white font-extrabold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-6 rounded-md border flex items-center justify-center ${isSelected ? 'border-[#635BFF] bg-[#635BFF] text-white' : 'border-slate-300 bg-slate-100 text-slate-500'}`}>
                    <div className="w-4 h-3 border border-current rounded-2xs" />
                  </div>
                  <span>{size}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Previews with actual cards (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50/60 rounded-2xl p-5 border border-slate-200/70 flex flex-col">
            <div className="text-xs font-bold text-slate-800 mb-4">{t('layoutSetting.preview')} ({t(`layoutSetting.${cardSize === 'Auto-fit' ? 'autoFit' : cardSize.toLowerCase()}`)})</div>
            <div className="flex-1 flex flex-col justify-center">
              <div className={`grid gap-3 w-full mx-auto ${
                cardSize === 'Small' ? 'grid-cols-2 max-w-lg' : 
                cardSize === 'Large' ? 'grid-cols-1 max-w-xl' : 
                'grid-cols-1 sm:grid-cols-2 max-w-2xl'
              }`}>
                {cards.slice(0, cardSize === 'Large' ? 1 : 2).map((card) => {
                  const CardIcon = ICON_MAP[card.iconName] || ICON_MAP[card.id] || Globe;
                  
                  // Apply size specific classes based on cardSize
                  let paddingClass = 'p-3.5';
                  let iconSize = 'w-4.5 h-4.5';
                  let iconContainerSize = 'w-9 h-9';
                  let titleSize = 'text-xs sm:text-sm';
                  let descSize = 'text-[calc(11px*var(--text-scale,1))]';
                  let gapClass = 'gap-3';
                  
                  if (cardSize === 'Small') {
                    paddingClass = 'p-2.5';
                    iconSize = 'w-3.5 h-3.5';
                    iconContainerSize = 'w-7 h-7 rounded-lg';
                    titleSize = 'text-[calc(11px*var(--text-scale,1))] sm:text-xs';
                    descSize = 'text-[calc(9px*var(--text-scale,1))] sm:text-[calc(10px*var(--text-scale,1))]';
                    gapClass = 'gap-2';
                  } else if (cardSize === 'Large') {
                    paddingClass = 'p-5 sm:p-6';
                    iconSize = 'w-6 h-6 sm:w-8 sm:h-8';
                    iconContainerSize = 'w-12 h-12 sm:w-16 sm:h-16 rounded-2xl';
                    titleSize = 'text-base sm:text-lg';
                    descSize = 'text-xs sm:text-sm whitespace-normal';
                    gapClass = 'gap-4';
                  } else if (cardSize === 'Auto-fit') {
                    paddingClass = 'p-4';
                    iconSize = 'w-5 h-5';
                    iconContainerSize = 'w-10 h-10 rounded-xl';
                  }

                  return (
                    <div key={`preview-${card.id}`} className={`bg-white rounded-2xl ${paddingClass} border-2 border-[#635BFF] ring-4 ring-indigo-50 shadow-md flex items-center justify-between transition-all`}>
                      <div className={`flex items-center ${gapClass} min-w-0 pr-1`}>
                        <div className={`${iconContainerSize} ${card.bg || card.bgColor || 'bg-blue-50'} ${card.color || card.iconColor || 'text-blue-600'} flex items-center justify-center shrink-0 border border-slate-100 transition-all`}>
                          {React.isValidElement(card.icon) ? React.cloneElement(card.icon, { className: iconSize }) : <CardIcon className={iconSize} />}
                        </div>
                        <div className="min-w-0">
                          <h4 className={`${titleSize} font-bold text-slate-900 ${cardSize === 'Large' ? '' : 'truncate'}`}>{t(`modules.${card.id}.name`, card.title)}</h4>
                          <p className={`${descSize} text-slate-400 ${cardSize === 'Large' ? 'mt-1' : 'truncate'}`}>{t(`modules.${card.id}.description`, card.desc)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className="bg-indigo-50/60 border border-indigo-100/80 rounded-2xl p-4 flex items-center gap-3 text-xs text-indigo-900 font-medium">
        <Info className="w-4 h-4 text-indigo-600 shrink-0" />
        <span>Changes apply instantly to your dashboard preview. Click <strong>Save Changes</strong> to apply permanently.</span>
      </div>

    </div>
  );
}
