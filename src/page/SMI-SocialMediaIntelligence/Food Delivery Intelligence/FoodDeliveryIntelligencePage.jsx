import React, { useState } from 'react';
import ToolCard from '../../../components/nexora';
import { Utensils, Coffee, Store, Package, Heart, Building2 } from 'lucide-react';

import SwiggyIntelligencePage from './Swiggy Intelligence/SwiggyIntelligencePage';
import ZomatoIntelligencePage from './Zomato Intelligence/ZomatoIntelligencePage';
import UberEatsIntelligencePage from './Uber Eats Intelligence/UberEatsIntelligencePage';
import DominosIntelligencePage from "./Domino's Intelligence/DominosIntelligencePage";
import PizzaHutIntelligencePage from './Pizza Hut Intelligence/PizzaHutIntelligencePage';
import KFCIntelligencePage from './KFC Intelligence/KFCIntelligencePage';
import McDonaldsIntelligencePage from "./McDonald's Intelligence/McDonaldsIntelligencePage";
import EatSureIntelligencePage from './EatSure Intelligence/EatSureIntelligencePage';
import FreshMenuIntelligencePage from './FreshMenu Intelligence/FreshMenuIntelligencePage';
import RebelFoodsIntelligencePage from './Rebel Foods Intelligence/RebelFoodsIntelligencePage';
import Box8IntelligencePage from './Box8 Intelligence/Box8IntelligencePage';
import FaasosIntelligencePage from './Faasos Intelligence/FaasosIntelligencePage';
import BehrouzBiryaniIntelligencePage from './Behrouz Biryani Intelligence/BehrouzBiryaniIntelligencePage';
import OvenStoryIntelligencePage from './Oven Story Intelligence/OvenStoryIntelligencePage';
import WowMomoIntelligencePage from './Wow! Momo Intelligence/WowMomoIntelligencePage';
import BurgerKingIntelligencePage from './Burger King Intelligence/BurgerKingIntelligencePage';
import SubwayIntelligencePage from './Subway Intelligence/SubwayIntelligencePage';
import EatClubIntelligencePage from './EatClub Intelligence/EatClubIntelligencePage';
import CurefoodsIntelligencePage from './Curefoods Intelligence/CurefoodsIntelligencePage';

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
  const displayTitle = title || "Food Delivery Intelligence";
  const displayDesc = description || "Analytics and data records for Food Delivery Intelligence. Dive deep into the specific metadata and data patterns of this intelligence sector. Leverage advanced analytical tools, cross-reference multiple data points, and generate comprehensive investigative reports to support ongoing law enforcement operations seamlessly.";

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
export default function FDIPage({ onBack }) {
  const [activePage, setActivePage] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  React.useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#SMI-fdi/')) {
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
    window.history.pushState({ page: 'SMI', subPage: 'fdi', subTool: toolName }, '', `#SMI-fdi/${encodeURIComponent(toolName)}`);
    setActivePage(toolName);
  };

  const handleToolBack = () => {
    if (window.history.state && window.history.state.subTool) {
      window.history.back();
    } else {
      window.history.pushState({ page: 'SMI', subPage: 'fdi' }, '', '#SMI-fdi');
      setActivePage(null);
    }
  };

  const tools = [
    { name: 'Swiggy Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Monitor food delivery patterns, instant grocery footprints, and hyper-local transactions.' },
    { name: 'Zomato Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Analyze restaurant reservations, user reviews, and food delivery metadata on Zomato.' },
    { name: 'Uber Eats Intelligence', icon: (p) => <Package {...p} />, color: 'text-green-600', bg: 'bg-green-100', desc: 'Track regional food delivery requests, active order timelines, and drop-off locations.' },
    { name: 'Domino\'s Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Audit pizza delivery histories, saved addresses, and frequent customer profiles.' },
    { name: 'Pizza Hut Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-red-500', bg: 'bg-red-50', desc: 'Monitor fast-food orders, loyalty points, and digital delivery interactions on Pizza Hut.' },
    { name: 'KFC Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-red-700', bg: 'bg-red-100', desc: 'Analyze fried chicken deliveries, bucket orders, and store-pickup activities.' },
    { name: 'McDonald\'s Intelligence', icon: (p) => <Coffee {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50', desc: 'Track drive-thru analytics, McDelivery orders, and regional store dependencies.' },
    { name: 'EatSure Intelligence', icon: (p) => <Store {...p} />, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Audit cloud kitchen orders, multi-brand cart data, and food consumption behaviors.' },
    { name: 'FreshMenu Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-100', desc: 'Monitor healthy food orders, daily lunch delivery footprints, and recurring meals.' },
    { name: 'Rebel Foods Intelligence', icon: (p) => <Building2 {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100', desc: 'Analyze aggregated cloud kitchen footprints, brand affinities, and virtual restaurant data.' },
    { name: 'Box8 Intelligence', icon: (p) => <Package {...p} />, color: 'text-amber-500', bg: 'bg-amber-100', desc: 'Track late-night food delivery metrics, meal box orders, and demographic hotspots.' },
    { name: 'Faasos Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100', desc: 'Audit fast-food wrap deliveries, user profiles, and regional food consumption patterns.' },
    { name: 'Behrouz Biryani Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Monitor premium biryani orders, high-value cart metrics, and family meal purchases.' },
    { name: 'Oven Story Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Analyze pizza delivery footprints, regional favorites, and digital payment combinations.' },
    { name: 'Wow! Momo Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50', desc: 'Track localized fast-food orders, specific regional consumption, and targeted delivery metrics.' },
    { name: 'Burger King Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Monitor burger deliveries, cross-combo consumption, and store pickup records.' },
    { name: 'Subway Intelligence', icon: (p) => <Utensils {...p} />, color: 'text-green-600', bg: 'bg-green-100', desc: 'Audit healthy food orders, specific ingredient affinities, and frequent store visits.' },
    { name: 'EatClub Intelligence', icon: (p) => <Store {...p} />, color: 'text-teal-600', bg: 'bg-teal-100', desc: 'Analyze membership-based food delivery histories, discounted orders, and loyalty usage.' },
    { name: 'Curefoods Intelligence', icon: (p) => <Heart {...p} />, color: 'text-rose-500', bg: 'bg-rose-100', desc: 'Monitor health-conscious meal orders, fitness demographic footprints, and subscriptions.' },
  ];

  if (activePage === 'Swiggy Intelligence') return <SwiggyIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Zomato Intelligence') return <ZomatoIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Uber Eats Intelligence') return <UberEatsIntelligencePage onBack={handleToolBack} />;
  if (activePage === "Domino's Intelligence") return <DominosIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Pizza Hut Intelligence') return <PizzaHutIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'KFC Intelligence') return <KFCIntelligencePage onBack={handleToolBack} />;
  if (activePage === "McDonald's Intelligence") return <McDonaldsIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'EatSure Intelligence') return <EatSureIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'FreshMenu Intelligence') return <FreshMenuIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Rebel Foods Intelligence') return <RebelFoodsIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Box8 Intelligence') return <Box8IntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Faasos Intelligence') return <FaasosIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Behrouz Biryani Intelligence') return <BehrouzBiryaniIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Oven Story Intelligence') return <OvenStoryIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Wow! Momo Intelligence') return <WowMomoIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Burger King Intelligence') return <BurgerKingIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Subway Intelligence') return <SubwayIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'EatClub Intelligence') return <EatClubIntelligencePage onBack={handleToolBack} />;
  if (activePage === 'Curefoods Intelligence') return <CurefoodsIntelligencePage onBack={handleToolBack} />;

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
              <ToolCard key={tool.name} tool={tool} index={index} onClick={() => handleToolSelect(tool.name)} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
