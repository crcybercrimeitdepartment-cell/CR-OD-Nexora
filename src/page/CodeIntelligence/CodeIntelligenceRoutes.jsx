import React, { useState, useEffect } from 'react';

// Sub-page component imports
import MobileNumberIdentificationAndVerificationPage from './MobileNumberIdentificationAndVerification/MobileNumberIdentificationAndVerificationPage';
import TelecomAndSTDCodeIdentificationAndVerificationPage from './TelecomAndSTDCodeIdentificationAndVerification/TelecomAndSTDCodeIdentificationAndVerificationPage';
import VehicleNumberIdentificationAndVerificationPage from './VehicleNumberIdentificationAndVerification/VehicleNumberIdentificationAndVerificationPage';
import PINCodeIdentificationAndVerificationPage from './PINCodeIdentificationAndVerification/PINCodeIdentificationAndVerificationPage';
import CountryCodeAndMobileNumberIdentificationAndVerificationPage from './CountryCodeAndMobileNumberIdentificationAndVerification/CountryCodeAndMobileNumberIdentificationAndVerificationPage';
import EmailAddressIdentificationAndVerificationPage from './EmailAddressIdentificationAndVerification/EmailAddressIdentificationAndVerificationPage';
import IPAddressIdentificationAndVerificationPage from './IPAddressIdentificationAndVerification/IPAddressIdentificationAndVerificationPage';
import IMEINumberIdentificationAndVerificationPage from './IMEINumberIdentificationAndVerification/IMEINumberIdentificationAndVerificationPage';
import IFSCCodeIdentificationAndVerificationPage from './IFSCCodeIdentificationAndVerification/IFSCCodeIdentificationAndVerificationPage';
import BankAccountNumberIdentificationAndVerificationPage from './BankAccountNumberIdentificationAndVerification/BankAccountNumberIdentificationAndVerificationPage';
import AadhaarNumberIdentificationAndVerificationPage from './AadhaarNumberIdentificationAndVerification/AadhaarNumberIdentificationAndVerificationPage';
import PANNumberIdentificationAndVerificationPage from './PANNumberIdentificationAndVerification/PANNumberIdentificationAndVerificationPage';
import GSTINIdentificationAndVerificationPage from './GSTINIdentificationAndVerification/GSTINIdentificationAndVerificationPage';
import VehicleChassisNumberIdentificationAndVerificationPage from './VehicleChassisNumberIdentificationAndVerification/VehicleChassisNumberIdentificationAndVerificationPage';
import VehicleEngineNumberIdentificationAndVerificationPage from './VehicleEngineNumberIdentificationAndVerification/VehicleEngineNumberIdentificationAndVerificationPage';
import RTOCodeIdentificationAndVerificationPage from './RTOCodeIdentificationAndVerification/RTOCodeIdentificationAndVerificationPage';
import PostalAddressIdentificationAndVerificationPage from './PostalAddressIdentificationAndVerification/PostalAddressIdentificationAndVerificationPage';
import STDCodeAndAreaIdentificationAndVerificationPage from './STDCodeAndAreaIdentificationAndVerification/STDCodeAndAreaIdentificationAndVerificationPage';
import ISDCountryCodeIdentificationAndVerificationPage from './ISDCountryCodeIdentificationAndVerification/ISDCountryCodeIdentificationAndVerificationPage';
import BankSWIFTBICCodeIdentificationAndVerificationPage from './BankSWIFTBICCodeIdentificationAndVerification/BankSWIFTBICCodeIdentificationAndVerificationPage';

const CODE_INTELLIGENCE_MODULES = [
  MobileNumberIdentificationAndVerificationPage.moduleData,
  TelecomAndSTDCodeIdentificationAndVerificationPage.moduleData,
  VehicleNumberIdentificationAndVerificationPage.moduleData,
  PINCodeIdentificationAndVerificationPage.moduleData,
  CountryCodeAndMobileNumberIdentificationAndVerificationPage.moduleData,
  EmailAddressIdentificationAndVerificationPage.moduleData,
  IPAddressIdentificationAndVerificationPage.moduleData,
  IMEINumberIdentificationAndVerificationPage.moduleData,
  IFSCCodeIdentificationAndVerificationPage.moduleData,
  BankAccountNumberIdentificationAndVerificationPage.moduleData,
  AadhaarNumberIdentificationAndVerificationPage.moduleData,
  PANNumberIdentificationAndVerificationPage.moduleData,
  GSTINIdentificationAndVerificationPage.moduleData,
  VehicleChassisNumberIdentificationAndVerificationPage.moduleData,
  VehicleEngineNumberIdentificationAndVerificationPage.moduleData,
  RTOCodeIdentificationAndVerificationPage.moduleData,
  PostalAddressIdentificationAndVerificationPage.moduleData,
  STDCodeAndAreaIdentificationAndVerificationPage.moduleData,
  ISDCountryCodeIdentificationAndVerificationPage.moduleData,
  BankSWIFTBICCodeIdentificationAndVerificationPage.moduleData,
];

function ToolCard({ tool, index = 0, onClick, customHeight, disableCssAnimation = false }) {
  const IconComponent = tool.icon;
  const isElement = React.isValidElement(tool.icon);
  const toolName = tool.name || tool.title;
  const toolBg = tool.bgColor || tool.bg || 'bg-slate-100';
  const toolIconColor = tool.iconColor || tool.color || 'text-slate-600';

  const rowIndex = Math.floor(index / 2);
  const delayMs = rowIndex * 120;
  const slideAnimation = disableCssAnimation
    ? ''
    : (rowIndex % 2 === 0 ? 'animate-card-slide-left' : 'animate-card-slide-right');

  const cardHeight = customHeight || 'h-[84px] sm:h-[96px]';

  return (
    <div
      onClick={() => {
        if (onClick) onClick(tool);
      }}
      style={disableCssAnimation ? {} : { animationDelay: `${delayMs}ms` }}
      className={`${slideAnimation} bg-white rounded-[14px] sm:rounded-[18px] p-2.5 sm:p-3.5 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-250 ease-out cursor-pointer flex items-center gap-2.5 sm:gap-4 group select-none relative overflow-hidden ${cardHeight}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onClick) onClick(tool);
        }
      }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 overflow-visible">
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx="16"
          fill="none"
          stroke="#0F172A"
          strokeWidth="2"
          pathLength="100"
          className="animate-draw-line"
        />
      </svg>

      <div className={`w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-xl sm:rounded-2xl ${toolBg} ${toolIconColor} flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-sm relative z-0`}>
        {isElement ? (
          tool.icon
        ) : typeof IconComponent === 'function' ? (
          <IconComponent className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
        ) : null}
      </div>

      <div className="flex flex-col text-left min-w-0 relative z-0">
        <h3 className="text-[11px] sm:text-[14px] font-bold text-slate-900 leading-snug line-clamp-3 group-hover:text-red-600 transition-colors">
          {toolName}
        </h3>
        <p className="text-[9.5px] sm:text-[11.5px] text-slate-500 font-normal leading-tight line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1">
          {tool.description || tool.desc}
        </p>
      </div>
    </div>
  );
}

function Header({ title, description }) {
  const displayTitle = title || "Code Intelligence";
  const displayDesc = description || "Analyze, identify, and verify multi-parameter communication, geographic, and financial records. Correlate mobile numbers, telecom STD codes, vehicle registrations, postal PIN codes, banking IFSC keys, and identity data to accelerate comprehensive investigative workflows and intelligence operations.";

  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>{displayTitle}</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {displayDesc}
          </p>
        </div>
      </div>
    </header>
  );
}

const _MODULE_ROUTES = {
  'mobile-number': MobileNumberIdentificationAndVerificationPage,
  'telecom-std': TelecomAndSTDCodeIdentificationAndVerificationPage,
  'vehicle-number': VehicleNumberIdentificationAndVerificationPage,
  'pin-code': PINCodeIdentificationAndVerificationPage,
  'country-code': CountryCodeAndMobileNumberIdentificationAndVerificationPage,
  'email-address': EmailAddressIdentificationAndVerificationPage,
  'ip-address': IPAddressIdentificationAndVerificationPage,
  'imei-number': IMEINumberIdentificationAndVerificationPage,
  'ifsc-code': IFSCCodeIdentificationAndVerificationPage,
  'bank-account': BankAccountNumberIdentificationAndVerificationPage,
  'aadhaar-number': AadhaarNumberIdentificationAndVerificationPage,
  'pan-number': PANNumberIdentificationAndVerificationPage,
  'gstin': GSTINIdentificationAndVerificationPage,
  'chassis-number': VehicleChassisNumberIdentificationAndVerificationPage,
  'engine-number': VehicleEngineNumberIdentificationAndVerificationPage,
  'rto-code': RTOCodeIdentificationAndVerificationPage,
  'postal-address': PostalAddressIdentificationAndVerificationPage,
  'std-code': STDCodeAndAreaIdentificationAndVerificationPage,
  'isd-code': ISDCountryCodeIdentificationAndVerificationPage,
  'swift-bic': BankSWIFTBICCodeIdentificationAndVerificationPage,
};

export default function CodeIntelligenceRoutes({ onBack, searchQuery = '' }) {
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = (module) => {
    setActiveModule(module.id);
  };

  if (activeModule) {
    const ActiveComponent = _MODULE_ROUTES[activeModule];
    if (ActiveComponent) {
      return (
        <div className="relative w-full min-h-screen">
          <button
            onClick={() => setActiveModule(null)}
            className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
          >
            <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>
          <ActiveComponent onBack={() => setActiveModule(null)} />
        </div>
      );
    }
  }

  const query = (searchQuery || '').toLowerCase().trim();
  const filteredModules = query
    ? CODE_INTELLIGENCE_MODULES.filter(m =>
      m.name.toLowerCase().includes(query) ||
      (m.desc && m.desc.toLowerCase().includes(query))
    )
    : CODE_INTELLIGENCE_MODULES;

  return (
    <div className="min-h-screen bg-transparent flex-1 flex flex-col w-full relative pt-11 sm:pt-4 font-sans">
      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawLine 0.6s ease-in-out forwards;
        }
        @keyframes cardSlideLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes cardSlideRight {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-card-slide-left {
          animation: cardSlideLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-card-slide-right {
          animation: cardSlideRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
      )}

      <Header />

      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-4 overflow-x-hidden">
        <main className="flex-1 pt-1 pb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {filteredModules.map((module, index) => (
              <ToolCard
                key={module.id}
                tool={{
                  ...module,
                  description: module.desc,
                  bgColor: module.bg,
                  iconColor: module.color
                }}
                index={index}
                onClick={() => handleCardClick(module)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export {
  MobileNumberIdentificationAndVerificationPage,
  TelecomAndSTDCodeIdentificationAndVerificationPage,
  VehicleNumberIdentificationAndVerificationPage,
  PINCodeIdentificationAndVerificationPage,
  CountryCodeAndMobileNumberIdentificationAndVerificationPage,
  EmailAddressIdentificationAndVerificationPage,
  IPAddressIdentificationAndVerificationPage,
  IMEINumberIdentificationAndVerificationPage,
  IFSCCodeIdentificationAndVerificationPage,
  BankAccountNumberIdentificationAndVerificationPage,
  AadhaarNumberIdentificationAndVerificationPage,
  PANNumberIdentificationAndVerificationPage,
  GSTINIdentificationAndVerificationPage,
  VehicleChassisNumberIdentificationAndVerificationPage,
  VehicleEngineNumberIdentificationAndVerificationPage,
  RTOCodeIdentificationAndVerificationPage,
  PostalAddressIdentificationAndVerificationPage,
  STDCodeAndAreaIdentificationAndVerificationPage,
  ISDCountryCodeIdentificationAndVerificationPage,
  BankSWIFTBICCodeIdentificationAndVerificationPage
};
