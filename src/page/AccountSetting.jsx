import { ACCOUNTSETTING_TOOLS } from '../data/subTools';
import React, { useState, useEffect } from 'react';
import ToolCard from '../components/nexora';
import { usePageLayout } from '../components/usePageLayout';

import AS1Page from './AccountSetting/Profile';
import AS2Page from './AccountSetting/PersonalInformation';
import AS3Page from './AccountSetting/OrganizationDetails';
import AS4Page from './AccountSetting/RolePermissions';
import AS5Page from './AccountSetting/SecuritySettings';
import AS6Page from './AccountSetting/ActiveSessions';
import AS7Page from './AccountSetting/DeviceManagement';
import AS8Page from './AccountSetting/LoginHistory';
import AS9Page from './AccountSetting/SearchHistory';
import AS10Page from './AccountSetting/TimelineHistory';
import AS11Page from './AccountSetting/WorkHistory';
import AS12Page from './AccountSetting/OrderHistory';
import AS13Page from './AccountSetting/DeleteHistory';
import AS14Page from './AccountSetting/DataExport';
import AS15Page from './AccountSetting/BackupRestore';
import AS16Page from './AccountSetting/StorageUsage';
import AS17Page from './AccountSetting/AuditLogs';
import AS18Page from './AccountSetting/SubscriptionBilling';
import AS19Page from './AccountSetting/Notifications';
import AS20Page from './AccountSetting/LanguageRegion';
import AS21Page from './AccountSetting/Appearance';
import AS22Page from './AccountSetting/PrivacySettings';
import AS23Page from './AccountSetting/InviteTeam';
import AS24Page from './AccountSetting/SupportCenter';
import AS25Page from './AccountSetting/LegalInformation';
import AS26Page from './AccountSetting/DeleteAccount';
import AS27Page from './AccountSetting/Logout';
import AS28Page from './AccountSetting/AccountSettingDemo1';

/**
 * Header Component.
 * Renders the title and a brief description of the page's purpose.
 * 
 * @param {Object} props - Component properties.
 * @param {string} [props.title] - Optional override for the title.
 * @param {string} [props.description] - Optional override for the description.
 * @returns {JSX.Element} The rendered header component.
 */
export function Header({ title, description }) {
  const displayTitle = title || "Account Setting";
  const displayDesc = description || "Manage personal profile, security configuration, system permissions & account preferences.";

  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>{displayTitle}</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {displayDesc}
          </p>
        </div>
      </div>
    </header>
  );
}

/**
 * Main Page Component.
 * Handles the display, routing, and user interactions for Account Setting modules.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.onBack - Callback function triggered when the user clicks the "Back" button to return to parent.
 * @returns {JSX.Element} The rendered page layout.
 */
export default function AccountSettingPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('account-setting', ACCOUNTSETTING_TOOLS);
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'AccountSetting' && event.state.subPage) {
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
    window.history.pushState({ page: 'AccountSetting', subPage: id }, '', '#AccountSetting-' + id);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'as1') return <AS1Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as2') return <AS2Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as3') return <AS3Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as4') return <AS4Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as5') return <AS5Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as6') return <AS6Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as7') return <AS7Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as8') return <AS8Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as9') return <AS9Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as10') return <AS10Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as11') return <AS11Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as12') return <AS12Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as13') return <AS13Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as14') return <AS14Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as15') return <AS15Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as16') return <AS16Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as17') return <AS17Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as18') return <AS18Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as19') return <AS19Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as20') return <AS20Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as21') return <AS21Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as22') return <AS22Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as23') return <AS23Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as24') return <AS24Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as25') return <AS25Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as26') return <AS26Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as27') return <AS27Page onBack={handleSubPageBack} />;
  if (selectedSubPage === 'as28') return <AS28Page onBack={handleSubPageBack} />;

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4">
      {onBack && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}
      <Header />
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-4 overflow-x-hidden">
        <main className="flex-1 pt-1 pb-4">
          <div className={`grid ${dynamicGridClass} gap-2.5 sm:gap-4 md:gap-5`}>
            {displayTools.map((tool, index) => (
              <div key={tool.id}>
                <ToolCard
                  tool={{ ...tool, description: tool.desc }}
                  index={index}
                  onClick={() => handleSelectSubPage(tool.id)}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
