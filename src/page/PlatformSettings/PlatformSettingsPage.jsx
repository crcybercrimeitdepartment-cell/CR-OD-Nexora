import React, { useState, useEffect } from 'react';
import ToolCard from '../../components/nexora';
import { ChevronLeft, Languages, Palette, Accessibility, Layout, Bell, Sparkles, ZoomIn, Mic, History, Shield, Camera, KeyRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import LanguageSettingPage from './LanguageSettingPage';
import CustomiseThemePage from './CustomiseThemePage';
import AccessibilitySettingPage from './AccessibilitySettingPage';
import LayoutSettingPage from './LayoutSettingPage';
import NotificationSettingPage from './NotificationSettingPage';
import AnimationSettingPage from './AnimationSettingPage';
import ZoomControlsPage from './ZoomControlsPage';
import VoiceAssistantPage from './VoiceAssistantPage';
import UserActivityLogPage from './UserActivityLogPage';
import PlatformSecuritySettingPage from './PlatformSecuritySettingPage';
import WebCameraSettingPage from './WebCameraSettingPage';
import TwoFactorAuthenticationPage from './TwoFactorAuthenticationPage';

const SETTINGS_CARDS = [
  { id: 'lang', title: 'Language Setting', description: 'Configure platform language and regional formatting preferences.', icon: <Languages className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 'theme', title: 'Customise Theme', description: 'Personalize the visual appearance with dark, light, or system themes.', icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 'access', title: 'Accessibility Setting', description: 'Adjust contrast, text size, and screen reader compatibility.', icon: <Accessibility className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 'layout', title: 'Layout Setting', description: 'Modify the dashboard layout, sidebar positioning, and grid density.', icon: <Layout className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
  { id: 'notif', title: 'Notification Setting', description: 'Manage email, push, and in-app alert preferences.', icon: <Bell className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-red-100', iconColor: 'text-red-600' },
  { id: 'anim', title: 'Animation Setting', description: 'Toggle UI animations, transitions, and motion effects.', icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { id: 'zoom', title: 'Zoom Controls', description: 'Configure default magnification levels and UI scaling.', icon: <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-cyan-100', iconColor: 'text-cyan-600' },
  { id: 'voice', title: 'Voice Assistant', description: 'Enable and configure voice commands and speech recognition.', icon: <Mic className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { id: 'log', title: 'User Activity Log', description: 'Review your session history, logins, and system interactions.', icon: <History className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-teal-100', iconColor: 'text-teal-600' },
  { id: 'sec', title: 'Platform Security Setting', description: 'Manage active sessions, trusted devices, and security alerts.', icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-rose-100', iconColor: 'text-rose-600' },
  { id: 'cam', title: 'Web Camera Setting', description: 'Configure camera permissions, default devices, and background effects.', icon: <Camera className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-fuchsia-100', iconColor: 'text-fuchsia-600' },
  { id: '2fa', title: '2 Factor Authentication', description: 'Enhance security with SMS, email, or authenticator app verification.', icon: <KeyRound className="w-5 h-5 sm:w-6 sm:h-6" />, bgColor: 'bg-amber-100', iconColor: 'text-amber-600' },
];

export default function PlatformSettingsPage({ onBack }) {
  const { t } = useTranslation();
  const [selectedSubPage, setSelectedSubPage] = useState(null);
  const [layoutSettings, setLayoutSettings] = useState(null);
  const scrollPosRef = React.useRef(0);
  const isNavigatingBack = React.useRef(false);

  // Load layout configuration
  useEffect(() => {
    const loadLayout = () => {
      try {
        const saved = localStorage.getItem('nexora_layout_settings_v1');
        if (saved) {
          setLayoutSettings(JSON.parse(saved));
        } else {
          setLayoutSettings(null);
        }
      } catch (e) {}
    };
    
    loadLayout();
    // Optional: listen to storage events if changed in another tab
    window.addEventListener('storage', loadLayout);
    window.addEventListener('layoutUpdate', loadLayout);
    return () => {
      window.removeEventListener('storage', loadLayout);
      window.removeEventListener('layoutUpdate', loadLayout);
    };
  }, [selectedSubPage]);

  useEffect(() => {
    if (isNavigatingBack.current) {
      if (selectedSubPage === null) {
        window.dispatchEvent(new CustomEvent('app:forceScroll', { detail: scrollPosRef.current }));
      } else {
        window.dispatchEvent(new CustomEvent('app:forceScroll', { detail: 0 }));
      }
    } else {
      window.dispatchEvent(new CustomEvent('app:forceScroll', { detail: 0 }));
    }
    isNavigatingBack.current = false;
  }, [selectedSubPage]);

  useEffect(() => {
    const handlePopState = (event) => {
      isNavigatingBack.current = true;
      if (event.state && event.state.page === 'PlatformSettings' && event.state.subPage) {
        setSelectedSubPage(event.state.subPage);
      } else {
        setSelectedSubPage(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    if (window.history.state && window.history.state.subPage) {
      setSelectedSubPage(window.history.state.subPage);
    }
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectSubPage = (id) => {
    scrollPosRef.current = window.scrollY || document.documentElement.scrollTop;
    isNavigatingBack.current = false;
    window.history.pushState({ page: 'PlatformSettings', subPage: id }, '', '#PlatformSettings/' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    isNavigatingBack.current = true;
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'lang') return <LanguageSettingPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'theme') return <CustomiseThemePage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'access') return <AccessibilitySettingPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'layout') return <LayoutSettingPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'notif') return <NotificationSettingPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'anim') return <AnimationSettingPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'zoom') return <ZoomControlsPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'voice') return <VoiceAssistantPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'log') return <UserActivityLogPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sec') return <PlatformSecuritySettingPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'cam') return <WebCameraSettingPage onBack={handleSubPageBack} />;
  if (selectedSubPage === '2fa') return <TwoFactorAuthenticationPage onBack={handleSubPageBack} />;

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4">
      {onBack && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>{t('languageSetting.back', 'Back')}</span>
        </button>
      )}

      {/* Header Section */}
      <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
        <div className="flex items-center justify-center w-full relative z-20">
          <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
              <span>{t('platformSettings.title', 'Platform Settings')}</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {t('platformSettings.subtitle', 'Configure your personal preferences and platform behavior.')}. Dive deep into the specific metadata and data patterns of this intelligence sector. Leverage advanced analytical tools, cross-reference multiple data points, and generate comprehensive investigative reports to support ongoing law enforcement operations seamlessly.
          </p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-4 overflow-x-hidden">
        <main className="flex-1 pt-1 pb-4">
          {(() => {
            // Apply Layout Settings
            let displayCards = [...SETTINGS_CARDS];
            let gridClass = 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

            if (layoutSettings) {
              // 1. Reorder
              if (layoutSettings.cards && Array.isArray(layoutSettings.cards)) {
                const shortIdMap = {
                  'language-setting': 'lang',
                  'customise-theme': 'theme',
                  'accessibility-setting': 'access',
                  'layout-setting': 'layout',
                  'notification-setting': 'notif',
                  'animation-setting': 'anim',
                  'zoom-controls': 'zoom',
                  'voice-assistant': 'voice',
                  'user-activity-log': 'log',
                  'platform-security-setting': 'sec',
                  'web-camera-setting': 'cam',
                  '2-factor-authentication': '2fa'
                };
                
                const reordered = [];
                layoutSettings.cards.forEach(savedCard => {
                  const shortId = shortIdMap[savedCard.id];
                  const originalCard = SETTINGS_CARDS.find(c => c.id === shortId);
                  if (originalCard) reordered.push(originalCard);
                });
                
                // Add any missing cards to the end
                SETTINGS_CARDS.forEach(c => {
                  if (!reordered.find(rc => rc.id === c.id)) reordered.push(c);
                });
                displayCards = reordered;
              }

              // 2. Arrangement & Columns
              if (layoutSettings.arrangement === 'List') {
                gridClass = 'grid-cols-1';
              } else {
                const cols = layoutSettings.gridColumns || 4;
                if (cols === 2) gridClass = 'grid-cols-1 sm:grid-cols-2';
                else if (cols === 3) gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
                else if (cols === 4) gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
              }
            }

            return (
              <div className={`grid ${gridClass} gap-2.5 sm:gap-4 md:gap-5`}>
                {displayCards.map((tool, index) => {
              const translationKeyBase = tool.id === 'lang' ? 'language-setting' :
                                         tool.id === 'theme' ? 'customise-theme' :
                                         tool.id === 'access' ? 'accessibility-setting' :
                                         tool.id === 'layout' ? 'layout-setting' :
                                         tool.id === 'notif' ? 'notification-setting' :
                                         tool.id === 'anim' ? 'animation-setting' :
                                         tool.id === 'zoom' ? 'zoom-controls' :
                                         tool.id === 'voice' ? 'voice-assistant' :
                                         tool.id === 'log' ? 'user-activity-log' :
                                         tool.id === 'sec' ? 'platform-security-setting' :
                                         tool.id === 'cam' ? 'web-camera-setting' :
                                         tool.id === '2fa' ? '2-factor-authentication' : tool.id;
                                         
              const translatedTool = {
                ...tool,
                title: t(`modules.${translationKeyBase}.name`, tool.title),
                description: t(`modules.${translationKeyBase}.description`, tool.description)
              };

              return (
                <ToolCard
                  key={tool.id}
                  tool={translatedTool}
                  index={index}
                  onClick={() => handleSelectSubPage(tool.id)}
                />
              );
            })}
            </div>
            );
          })()}
        </main>
      </div>
    </div>
  );
}
