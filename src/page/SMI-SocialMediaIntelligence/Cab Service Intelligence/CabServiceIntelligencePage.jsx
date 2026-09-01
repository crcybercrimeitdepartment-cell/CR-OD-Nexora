import React, { useState } from 'react';
import ToolCard from '../../../components/nexora';
import { Car, MapPin, Map, Building2 } from 'lucide-react';

import UberIntelligencePage from './Uber Intelligence/UberIntelligencePage';
import OlaIntelligencePage from './Ola Intelligence/OlaIntelligencePage';
import RapidoIntelligencePage from './Rapido Intelligence/RapidoIntelligencePage';
import InDriveIntelligencePage from './inDrive Intelligence/InDriveIntelligencePage';
import BluSmartIntelligencePage from './BluSmart Intelligence/BluSmartIntelligencePage';
import MeruCabsIntelligencePage from './Meru Cabs Intelligence/MeruCabsIntelligencePage';
import SavaariIntelligencePage from './Savaari Intelligence/SavaariIntelligencePage';
import JugnooIntelligencePage from './Jugnoo Intelligence/JugnooIntelligencePage';
import NammaYatriIntelligencePage from './Namma Yatri Intelligence/NammaYatriIntelligencePage';
import YatriSathiIntelligencePage from './Yatri Sathi Intelligence/YatriSathiIntelligencePage';
import QuickRideIntelligencePage from './Quick Ride Intelligence/QuickRideIntelligencePage';
import ShohozRideIntelligencePage from './Shohoz Ride Intelligence/ShohozRideIntelligencePage';
import AavegIntelligencePage from './Aaveg Intelligence/AavegIntelligencePage';
import MegaCabsIntelligencePage from './Mega Cabs Intelligence/MegaCabsIntelligencePage';
import CarzonrentIntelligencePage from './Carzonrent Intelligence/CarzonrentIntelligencePage';

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
  const displayTitle = title || "Cab Service Intelligence";
  const displayDesc = description || "Analytics and data records for Cab Service Intelligence. Dive deep into the specific metadata and data patterns of this intelligence sector. Leverage advanced analytical tools, cross-reference multiple data points, and generate comprehensive investigative reports to support ongoing law enforcement operations seamlessly.";

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
 * Handles the display, routing, and user interactions for this specific intelligence record.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.onBack - Callback function triggered when the user clicks the "Back" button to return to the parent dashboard.
 * @returns {JSX.Element} The rendered page layout.
 */
export default function CSIPage({ onBack }) {
  const [activePage, setActivePage] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  React.useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#SMI-csi/')) {
        setActivePage(decodeURIComponent(hash.split('/')[1]));
      } else {
        setActivePage(null);
      }
    };
    
    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToolSelect = (toolName) => {
    window.history.pushState({ page: 'SMI', subPage: 'csi', subTool: toolName }, '', `#SMI-csi/${encodeURIComponent(toolName)}`);
    setActivePage(toolName);
  };

  const handleToolBack = () => {
    if (window.history.state && window.history.state.subTool) {
      window.history.back();
    } else {
      window.history.pushState({ page: 'SMI', subPage: 'csi' }, '', '#SMI-csi');
      setActivePage(null);
    }
  };

  const tools = [
    { name: 'Uber Intelligence', icon: (p) => <Car {...p} />, color: 'text-black', bg: 'bg-gray-200', desc: 'Monitor hyper-local ride histories, driver interactions, and frequent travel routes on Uber.' },
    { name: 'Ola Intelligence', icon: (p) => <Car {...p} />, color: 'text-green-500', bg: 'bg-green-50', desc: 'Analyze regional cab bookings, rental service footprints, and digital payment linkages.' },
    { name: 'Rapido Intelligence', icon: (p) => <MapPin {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Track two-wheeler ride metrics, rapid urban transit data, and exact pickup locations.' },
    { name: 'inDrive Intelligence', icon: (p) => <Map {...p} />, color: 'text-green-600', bg: 'bg-green-100', desc: 'Audit peer-to-peer fare negotiations, inter-city commute logs, and independent driver networks.' },
    { name: 'BluSmart Intelligence', icon: (p) => <Car {...p} />, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Monitor scheduled EV ride patterns, premium commuting routes, and dedicated charging hubs.' },
    { name: 'Meru Cabs Intelligence', icon: (p) => <Car {...p} />, color: 'text-green-700', bg: 'bg-green-100', desc: 'Analyze traditional radio cab histories, airport transfer logs, and corporate mobility data.' },
    { name: 'Savaari Intelligence', icon: (p) => <Map {...p} />, color: 'text-red-500', bg: 'bg-red-50', desc: 'Track intercity outstation rentals, long-distance travel trails, and chauffeur-driven trips.' },
    { name: 'Jugnoo Intelligence', icon: (p) => <MapPin {...p} />, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Audit auto-rickshaw hailing patterns, regional transit frequencies, and localized mobility.' },
    { name: 'Namma Yatri Intelligence', icon: (p) => <Car {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50', desc: 'Monitor open-mobility ride histories, direct driver payments, and regional daily commutes.' },
    { name: 'Yatri Sathi Intelligence', icon: (p) => <MapPin {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Analyze government-backed transit hailing, strict meter fare records, and public fleet usages.' },
    { name: 'Quick Ride Intelligence', icon: (p) => <Map {...p} />, color: 'text-teal-500', bg: 'bg-teal-50', desc: 'Track corporate carpooling footprints, recurring route matches, and verified user transit.' },
    { name: 'Shohoz Ride Intelligence', icon: (p) => <Car {...p} />, color: 'text-green-600', bg: 'bg-green-100', desc: 'Audit international ride-sharing, specific localized transits, and multi-mode transport usage.' },
    { name: 'Aaveg Intelligence', icon: (p) => <Building2 {...p} />, color: 'text-blue-700', bg: 'bg-blue-100', desc: 'Monitor B2B employee mobility, fleet transportation logistics, and corporate shift timings.' },
    { name: 'Mega Cabs Intelligence', icon: (p) => <Car {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Analyze localized radio taxi usage, railway transfer logistics, and urban transit patterns.' },
    { name: 'Carzonrent Intelligence', icon: (p) => <Building2 {...p} />, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Track premium corporate car rentals, luxury fleet movements, and long-term lease metadata.' },
  ];

  if (activePage === 'Uber Intelligence') return <UberIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Ola Intelligence') return <OlaIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Rapido Intelligence') return <RapidoIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'inDrive Intelligence') return <InDriveIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'BluSmart Intelligence') return <BluSmartIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Meru Cabs Intelligence') return <MeruCabsIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Savaari Intelligence') return <SavaariIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Jugnoo Intelligence') return <JugnooIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Namma Yatri Intelligence') return <NammaYatriIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Yatri Sathi Intelligence') return <YatriSathiIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Quick Ride Intelligence') return <QuickRideIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Shohoz Ride Intelligence') return <ShohozRideIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Aaveg Intelligence') return <AavegIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Mega Cabs Intelligence') return <MegaCabsIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Carzonrent Intelligence') return <CarzonrentIntelligencePage onBack={handleToolBack} />;

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4">
      {onBack && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm">
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}
      <Header />
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-4 overflow-x-hidden">
        <main className="flex-1 pt-1 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} onClick={() => handleToolSelect(tool.name)} disableCssAnimation={true} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
