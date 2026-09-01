import React, { useState } from 'react';
import ToolCard from '../../../components/nexora';
import { ShoppingCart, Store, Heart, MonitorPlay, Clock, Building2, Baby, Activity, Home, Eye, Pill, Briefcase, Search } from 'lucide-react';

import AmazonPage from './Amazon/AmazonPage';
import FlipkartPage from './Flipkart/FlipkartPage';
import MyntraPage from './Myntra/MyntraPage';
import MeeshoPage from './Meesho/MeeshoPage';
import AjioPage from './Ajio/AjioPage';
import TataCLiQPage from './Tata CLiQ/TataCLiQPage';
import NykaaPage from './Nykaa/NykaaPage';
import SnapdealPage from './Snapdeal/SnapdealPage';
import RelianceDigitalPage from './Reliance Digital/RelianceDigitalPage';
import CromaPage from './Croma/CromaPage';
import JioMartPage from './JioMart/JioMartPage';
import BigBasketPage from './BigBasket/BigBasketPage';
import BlinkitPage from './Blinkit/BlinkitPage';
import ZeptoPage from './Zepto/ZeptoPage';
import SwiggyInstamartPage from './Swiggy Instamart/SwiggyInstamartPage';
import DMartPage from './DMart/DMartPage';
import FirstCryPage from './FirstCry/FirstCryPage';
import ShoppersStopPage from './Shoppers Stop/ShoppersStopPage';
import DecathlonPage from './Decathlon/DecathlonPage';
import IKEAPage from './IKEA/IKEAPage';
import LenskartPage from './Lenskart/LenskartPage';
import PepperfryPage from './Pepperfry/PepperfryPage';
import UrbanLadderPage from './Urban Ladder/UrbanLadderPage';
import PurpllePage from './Purplle/PurpllePage';
import Tata1mgPage from './Tata 1mg/Tata1mgPage';
import IndiaMARTPage from './IndiaMART/IndiaMARTPage';
import OLXPage from './OLX/OLXPage';
import QuikrPage from './Quikr/QuikrPage';

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
  const displayTitle = title || "Shopping Intelligence";
  const displayDesc = description || "Analytics and data records for Shopping Intelligence. Dive deep into the specific metadata and data patterns of this intelligence sector. Leverage advanced analytical tools, cross-reference multiple data points, and generate comprehensive investigative reports to support ongoing law enforcement operations seamlessly.";

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
export default function SHIPage({ onBack }) {
  const [activePage, setActivePage] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  React.useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#SMI-shi/')) {
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
    window.history.pushState({ page: 'SMI', subPage: 'shi', subTool: toolName }, '', `#SMI-shi/${encodeURIComponent(toolName)}`);
    setActivePage(toolName);
  };

  const handleToolBack = () => {
    if (window.history.state && window.history.state.subTool) {
      window.history.back();
    } else {
      window.history.pushState({ page: 'SMI', subPage: 'shi' }, '', '#SMI-shi');
      setActivePage(null);
    }
  };

  const tools = [
    { name: 'Amazon', icon: (p) => <ShoppingCart {...p} />, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Monitor e-commerce purchases, wishlists, and shipping addresses linked to Amazon accounts.' },
    { name: 'Flipkart', icon: (p) => <ShoppingCart {...p} />, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Analyze user buying behaviors, order histories, and saved payment methods on Flipkart.' },
    { name: 'Myntra', icon: (p) => <Store {...p} />, color: 'text-pink-500', bg: 'bg-pink-50', desc: 'Track fashion trends, wardrobe purchases, and user engagement metrics on Myntra.' },
    { name: 'Meesho', icon: (p) => <Store {...p} />, color: 'text-fuchsia-500', bg: 'bg-fuchsia-50', desc: 'Audit reseller activities, social commerce networks, and product listings on Meesho.' },
    { name: 'Ajio', icon: (p) => <Store {...p} />, color: 'text-slate-800', bg: 'bg-slate-200', desc: 'Extract clothing preferences, order frequencies, and delivery footprints from Ajio profiles.' },
    { name: 'Tata CLiQ', icon: (p) => <ShoppingCart {...p} />, color: 'text-red-500', bg: 'bg-red-50', desc: 'Monitor luxury purchases, multi-category spending, and account details on Tata CLiQ.' },
    { name: 'Nykaa', icon: (p) => <Heart {...p} />, color: 'text-rose-500', bg: 'bg-rose-50', desc: 'Analyze beauty and cosmetic purchases, brand affinities, and product reviews on Nykaa.' },
    { name: 'Snapdeal', icon: (p) => <ShoppingCart {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Track value-based shopping behaviors, regional deliveries, and user profiles on Snapdeal.' },
    { name: 'Reliance Digital', icon: (p) => <MonitorPlay {...p} />, color: 'text-blue-700', bg: 'bg-blue-100', desc: 'Audit electronic appliance purchases, warranties, and delivery records on Reliance Digital.' },
    { name: 'Croma', icon: (p) => <MonitorPlay {...p} />, color: 'text-teal-600', bg: 'bg-teal-100', desc: 'Monitor high-value electronics spending, gadget preferences, and store pickups on Croma.' },
    { name: 'JioMart', icon: (p) => <Store {...p} />, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Analyze daily grocery orders, local merchant interactions, and user footprints on JioMart.' },
    { name: 'BigBasket', icon: (p) => <ShoppingCart {...p} />, color: 'text-green-600', bg: 'bg-green-100', desc: 'Extract household consumption patterns, subscription orders, and locations from BigBasket.' },
    { name: 'Blinkit', icon: (p) => <Clock {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Monitor hyper-local delivery requests, instant purchases, and active tracking on Blinkit.' },
    { name: 'Zepto', icon: (p) => <Clock {...p} />, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Track rapid grocery consumption, frequent delivery zones, and user routines on Zepto.' },
    { name: 'Swiggy Instamart', icon: (p) => <Clock {...p} />, color: 'text-orange-500', bg: 'bg-orange-100', desc: 'Analyze convenience store orders, midnight deliveries, and impulse buying on Instamart.' },
    { name: 'DMart', icon: (p) => <Building2 {...p} />, color: 'text-green-700', bg: 'bg-green-100', desc: 'Audit bulk grocery purchases, offline-to-online transitions, and store networks on DMart.' },
    { name: 'FirstCry', icon: (p) => <Baby {...p} />, color: 'text-blue-400', bg: 'bg-blue-50', desc: 'Monitor infant care purchases, parenting demographics, and targeted spending on FirstCry.' },
    { name: 'Shoppers Stop', icon: (p) => <Store {...p} />, color: 'text-black', bg: 'bg-gray-200', desc: 'Analyze premium retail spending, membership tier upgrades, and brand loyalties on Shoppers Stop.' },
    { name: 'Decathlon', icon: (p) => <Activity {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Track sporting goods purchases, active lifestyle metadata, and regional engagement on Decathlon.' },
    { name: 'IKEA', icon: (p) => <Home {...p} />, color: 'text-blue-800', bg: 'bg-blue-100', desc: 'Audit furniture buying patterns, home improvement orders, and delivery trails on IKEA.' },
    { name: 'Lenskart', icon: (p) => <Eye {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-100', desc: 'Monitor eyewear purchases, prescription metadata, and personal style metrics on Lenskart.' },
    { name: 'Pepperfry', icon: (p) => <Home {...p} />, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Analyze interior decor spending, large asset deliveries, and housing patterns on Pepperfry.' },
    { name: 'Urban Ladder', icon: (p) => <Home {...p} />, color: 'text-orange-700', bg: 'bg-orange-100', desc: 'Track premium furniture purchases, home layouts, and structured deliveries on Urban Ladder.' },
    { name: 'Purplle', icon: (p) => <Heart {...p} />, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100', desc: 'Extract cosmetic buying habits, regional beauty preferences, and user interactions on Purplle.' },
    { name: 'Tata 1mg', icon: (p) => <Pill {...p} />, color: 'text-red-500', bg: 'bg-red-50', desc: 'Monitor pharmaceutical orders, health profiles, and ongoing medication records on Tata 1mg.' },
    { name: 'IndiaMART', icon: (p) => <Briefcase {...p} />, color: 'text-blue-900', bg: 'bg-blue-100', desc: 'Audit B2B transactions, wholesale procurement, and business-to-business networks on IndiaMART.' },
    { name: 'OLX', icon: (p) => <Search {...p} />, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Analyze peer-to-peer selling activities, second-hand market trends, and user locations on OLX.' },
    { name: 'Quikr', icon: (p) => <Search {...p} />, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Track classified ad placements, regional service offerings, and local transactions on Quikr.' },
  ];

  if (activePage === 'Amazon') return <AmazonPage onBack={handleToolBack} />;
  if (activePage === 'Flipkart') return <FlipkartPage onBack={handleToolBack} />;
  if (activePage === 'Myntra') return <MyntraPage onBack={handleToolBack} />;
  if (activePage === 'Meesho') return <MeeshoPage onBack={handleToolBack} />;
  if (activePage === 'Ajio') return <AjioPage onBack={handleToolBack} />;
  if (activePage === 'Tata CLiQ') return <TataCLiQPage onBack={handleToolBack} />;
  if (activePage === 'Nykaa') return <NykaaPage onBack={handleToolBack} />;
  if (activePage === 'Snapdeal') return <SnapdealPage onBack={handleToolBack} />;
  if (activePage === 'Reliance Digital') return <RelianceDigitalPage onBack={handleToolBack} />;
  if (activePage === 'Croma') return <CromaPage onBack={handleToolBack} />;
  if (activePage === 'JioMart') return <JioMartPage onBack={handleToolBack} />;
  if (activePage === 'BigBasket') return <BigBasketPage onBack={handleToolBack} />;
  if (activePage === 'Blinkit') return <BlinkitPage onBack={handleToolBack} />;
  if (activePage === 'Zepto') return <ZeptoPage onBack={handleToolBack} />;
  if (activePage === 'Swiggy Instamart') return <SwiggyInstamartPage onBack={handleToolBack} />;
  if (activePage === 'DMart') return <DMartPage onBack={handleToolBack} />;
  if (activePage === 'FirstCry') return <FirstCryPage onBack={handleToolBack} />;
  if (activePage === 'Shoppers Stop') return <ShoppersStopPage onBack={handleToolBack} />;
  if (activePage === 'Decathlon') return <DecathlonPage onBack={handleToolBack} />;
  if (activePage === 'IKEA') return <IKEAPage onBack={handleToolBack} />;
  if (activePage === 'Lenskart') return <LenskartPage onBack={handleToolBack} />;
  if (activePage === 'Pepperfry') return <PepperfryPage onBack={handleToolBack} />;
  if (activePage === 'Urban Ladder') return <UrbanLadderPage onBack={handleToolBack} />;
  if (activePage === 'Purplle') return <PurpllePage onBack={handleToolBack} />;
  if (activePage === 'Tata 1mg') return <Tata1mgPage onBack={handleToolBack} />;
  if (activePage === 'IndiaMART') return <IndiaMARTPage onBack={handleToolBack} />;
  if (activePage === 'OLX') return <OLXPage onBack={handleToolBack} />;
  if (activePage === 'Quikr') return <QuikrPage onBack={handleToolBack} />;

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
