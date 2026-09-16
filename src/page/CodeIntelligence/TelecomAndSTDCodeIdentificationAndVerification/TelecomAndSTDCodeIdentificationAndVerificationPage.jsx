import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import DashboardPage from './DashboardPage';
import Explorethewebpage from './Explorethewebpage';
import MynotepadPage from './MynotepadPage';
import Savedatapage from './Savedatapage';

export default function TelecomAndSTDCodeIdentificationAndVerificationPage() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const title = TelecomAndSTDCodeIdentificationAndVerificationPage.moduleData.name;
  const description = TelecomAndSTDCodeIdentificationAndVerificationPage.moduleData.desc;

  return (
    <div className="flex-1 flex flex-col w-full relative overflow-x-hidden min-h-screen bg-transparent">
      {activePage === 'home' && (
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Header */}
          <header className="w-full relative pt-6 sm:pt-10 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
            <div className="flex items-center justify-center w-full relative z-20">
              <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
                  <span>{title}</span>
                </h1>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-semibold text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </header>

          <DashboardPage setActivePage={setActivePage} />
        </div>
      )}
      {(activePage === 'search' || activePage === 'history') && (
        <Explorethewebpage activePage={activePage} setActivePage={setActivePage} />
      )}
      {(activePage === 'note' || activePage === 'saved-notes') && (
        <MynotepadPage activePage={activePage} setActivePage={setActivePage} />
      )}
      {activePage === 'save-data' && (
        <Savedatapage onBack={() => setActivePage('home')} />
      )}
    </div>
  );
}

TelecomAndSTDCodeIdentificationAndVerificationPage.moduleData = {
  id: 'telecom-std',
  name: 'Telecom & STD Code Identification & Verification',
  desc: 'Lookup telecom operators, circles, and STD codes.',
  icon: (p) => <Radio {...p} />,
  color: 'text-indigo-500',
  bg: 'bg-indigo-50'
};
