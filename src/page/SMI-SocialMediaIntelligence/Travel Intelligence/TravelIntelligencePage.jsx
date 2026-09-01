import React, { useState } from 'react';
import ToolCard from '../../../components/nexora';
import { Plane, Map, Train, Car, Building2, Home, Search, Globe, MapPin } from 'lucide-react';

import MakeMyTripIntelligencePage from './MakeMyTrip Intelligence/MakeMyTripIntelligencePage';
import GoibiboIntelligencePage from './Goibibo Intelligence/GoibiboIntelligencePage';
import CleartripIntelligencePage from './Cleartrip Intelligence/CleartripIntelligencePage';
import YatraIntelligencePage from './Yatra Intelligence/YatraIntelligencePage';
import EaseMyTripIntelligencePage from './EaseMyTrip Intelligence/EaseMyTripIntelligencePage';
import IxigoIntelligencePage from './ixigo Intelligence/IxigoIntelligencePage';
import IRCTCIntelligencePage from './IRCTC Intelligence/IRCTCIntelligencePage';
import RedBusIntelligencePage from './redBus Intelligence/RedBusIntelligencePage';
import AbhiBusIntelligencePage from './AbhiBus Intelligence/AbhiBusIntelligencePage';
import ConfirmTktIntelligencePage from './ConfirmTkt Intelligence/ConfirmTktIntelligencePage';
import PaytmTravelIntelligencePage from './Paytm Travel Intelligence/PaytmTravelIntelligencePage';
import BookingIntelligencePage from './Booking.com Intelligence/BookingIntelligencePage';
import AgodaIntelligencePage from './Agoda Intelligence/AgodaIntelligencePage';
import AirbnbIntelligencePage from './Airbnb Intelligence/AirbnbIntelligencePage';
import UberIntelligencePage from './Uber Intelligence/UberIntelligencePage';
import OYOIntelligencePage from './OYO Intelligence/OYOIntelligencePage';
import TrivagoIntelligencePage from './Trivago Intelligence/TrivagoIntelligencePage';
import ExpediaIntelligencePage from './Expedia Intelligence/ExpediaIntelligencePage';
import TripComIntelligencePage from './Trip.com Intelligence/TripComIntelligencePage';
import SkyscannerIntelligencePage from './Skyscanner Intelligence/SkyscannerIntelligencePage';
import GoogleTravelIntelligencePage from './Google Travel Intelligence/GoogleTravelIntelligencePage';
import ThomasCookIntelligencePage from './Thomas Cook Intelligence/ThomasCookIntelligencePage';
import SOTCIntelligencePage from './SOTC Intelligence/SOTCIntelligencePage';
import CoxAndKingsIntelligencePage from './Cox & Kings Intelligence/CoxAndKingsIntelligencePage';

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
  const displayTitle = title || "Travel Intelligence";
  const displayDesc = description || "Analytics and data records for Travel Intelligence. Dive deep into the specific metadata and data patterns of this intelligence sector. Leverage advanced analytical tools, cross-reference multiple data points, and generate comprehensive investigative reports to support ongoing law enforcement operations seamlessly.";

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
export default function TRIPage({ onBack }) {
  const [activePage, setActivePage] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  React.useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#SMI-tri/')) {
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
    window.history.pushState({ page: 'SMI', subPage: 'tri', subTool: toolName }, '', `#SMI-tri/${encodeURIComponent(toolName)}`);
    setActivePage(toolName);
  };

  const handleToolBack = () => {
    if (window.history.state && window.history.state.subTool) {
      window.history.back();
    } else {
      window.history.pushState({ page: 'SMI', subPage: 'tri' }, '', '#SMI-tri');
      setActivePage(null);
    }
  };

  const tools = [
    { name: 'MakeMyTrip Intelligence', icon: (p) => <Plane {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Monitor comprehensive flight bookings, hotel reservations, and holiday package itineraries.' },
    { name: 'Goibibo Intelligence', icon: (p) => <Plane {...p} />, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Analyze rapid flight bookings, last-minute hotel stays, and regional travel patterns.' },
    { name: 'Cleartrip Intelligence', icon: (p) => <Plane {...p} />, color: 'text-green-500', bg: 'bg-green-50', desc: 'Track premium airline bookings, corporate travel arrangements, and destination footprints.' },
    { name: 'Yatra Intelligence', icon: (p) => <Map {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Audit domestic travel histories, corporate ticketing patterns, and integrated tour data.' },
    { name: 'EaseMyTrip Intelligence', icon: (p) => <Plane {...p} />, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Monitor discount-driven travel bookings, frequent flyer logs, and regional flight paths.' },
    { name: 'ixigo Intelligence', icon: (p) => <Train {...p} />, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Analyze railway ticketing data, PNR statuses, and domestic flight price tracking activities.' },
    { name: 'IRCTC Intelligence', icon: (p) => <Train {...p} />, color: 'text-blue-800', bg: 'bg-blue-100', desc: 'Track exhaustive railway travel records, specific train manifests, and passenger details.' },
    { name: 'redBus Intelligence', icon: (p) => <Car {...p} />, color: 'text-red-500', bg: 'bg-red-50', desc: 'Monitor inter-state bus bookings, boarding point footprints, and frequent commuter routes.' },
    { name: 'AbhiBus Intelligence', icon: (p) => <Car {...p} />, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Audit regional road transport bookings, specific fleet usages, and commuter demographics.' },
    { name: 'ConfirmTkt Intelligence', icon: (p) => <Train {...p} />, color: 'text-green-600', bg: 'bg-green-100', desc: 'Analyze waitlisted train tickets, confirmed route updates, and urgent travel planning data.' },
    { name: 'Paytm Travel Intelligence', icon: (p) => <Plane {...p} />, color: 'text-blue-400', bg: 'bg-blue-50', desc: 'Track integrated travel spending, rapid ticket bookings, and holiday purchase metadata.' },
    { name: 'Booking.com Intelligence', icon: (p) => <Building2 {...p} />, color: 'text-blue-700', bg: 'bg-blue-100', desc: 'Monitor international hotel stays, accommodation reservations, and extended vacation logs.' },
    { name: 'Agoda Intelligence', icon: (p) => <Building2 {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-100', desc: 'Audit Asian destination hotel bookings, resort stays, and discounted accommodation data.' },
    { name: 'Airbnb Intelligence', icon: (p) => <Home {...p} />, color: 'text-rose-500', bg: 'bg-rose-100', desc: 'Analyze private property rentals, long-term stay locations, and peer-to-peer hosting footprints.' },
    { name: 'Uber Intelligence', icon: (p) => <Car {...p} />, color: 'text-black', bg: 'bg-gray-200', desc: 'Track hyper-local transportation patterns, airport transfers, and recurring ride histories.' },
    { name: 'OYO Intelligence', icon: (p) => <Building2 {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Monitor budget hotel bookings, short-term regional stays, and local accommodation trends.' },
    { name: 'Trivago Intelligence', icon: (p) => <Search {...p} />, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Analyze hotel price comparison behaviors, accommodation searches, and destination interests.' },
    { name: 'Expedia Intelligence', icon: (p) => <Globe {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Audit global flight itineraries, comprehensive vacation packages, and rental car bookings.' },
    { name: 'Trip.com Intelligence', icon: (p) => <Globe {...p} />, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Track international travel footprints, transcontinental flights, and global accommodation data.' },
    { name: 'Skyscanner Intelligence', icon: (p) => <Search {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100', desc: 'Monitor multi-city flight searches, fare tracking alerts, and preliminary travel planning.' },
    { name: 'Google Travel Intelligence', icon: (p) => <Globe {...p} />, color: 'text-red-500', bg: 'bg-red-50', desc: 'Analyze integrated travel itineraries, flight tracking logs, and automated reservation parsing.' },
    { name: 'Thomas Cook Intelligence', icon: (p) => <Globe {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100', desc: 'Audit premium tour group bookings, forex travel metadata, and comprehensive vacation logs.' },
    { name: 'SOTC Intelligence', icon: (p) => <MapPin {...p} />, color: 'text-blue-700', bg: 'bg-blue-100', desc: 'Track structured holiday packages, corporate incentive tours, and guided excursion footprints.' },
    { name: 'Cox & Kings Intelligence', icon: (p) => <Map {...p} />, color: 'text-teal-600', bg: 'bg-teal-100', desc: 'Monitor luxury travel itineraries, historical tour bookings, and extensive global travel records.' },
  ];

  if (activePage === 'MakeMyTrip Intelligence') return <MakeMyTripIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Goibibo Intelligence') return <GoibiboIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Cleartrip Intelligence') return <CleartripIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Yatra Intelligence') return <YatraIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'EaseMyTrip Intelligence') return <EaseMyTripIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'ixigo Intelligence') return <IxigoIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'IRCTC Intelligence') return <IRCTCIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'redBus Intelligence') return <RedBusIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'AbhiBus Intelligence') return <AbhiBusIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'ConfirmTkt Intelligence') return <ConfirmTktIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Paytm Travel Intelligence') return <PaytmTravelIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Booking.com Intelligence') return <BookingIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Agoda Intelligence') return <AgodaIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Airbnb Intelligence') return <AirbnbIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Uber Intelligence') return <UberIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'OYO Intelligence') return <OYOIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Trivago Intelligence') return <TrivagoIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Expedia Intelligence') return <ExpediaIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Trip.com Intelligence') return <TripComIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Skyscanner Intelligence') return <SkyscannerIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Google Travel Intelligence') return <GoogleTravelIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Thomas Cook Intelligence') return <ThomasCookIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'SOTC Intelligence') return <SOTCIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Cox & Kings Intelligence') return <CoxAndKingsIntelligencePage onBack={handleToolBack} />;

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
