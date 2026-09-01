import React, { useState } from 'react';
import ToolCard from '../../../components/nexora';
import { CreditCard, Smartphone, DollarSign, Wallet, Building2, SmartphoneNfc } from 'lucide-react';

import GooglePayPage from './Google Pay/GooglePayPage';
import PhonePePage from './PhonePe/PhonePePage';
import PaytmPage from './Paytm/PaytmPage';
import BHIMPage from './BHIM/BHIMPage';
import AmazonPayPage from './Amazon Pay/AmazonPayPage';
import WhatsAppPayPage from './WhatsApp Pay/WhatsAppPayPage';
import MobiKwikPage from './MobiKwik/MobiKwikPage';
import FreechargePage from './Freecharge/FreechargePage';
import CREDPage from './CRED/CREDPage';
import AirtelThanksPage from './Airtel Thanks/AirtelThanksPage';
import JioFinancePage from './JioFinance/JioFinancePage';
import SamsungWalletPage from './Samsung Wallet/SamsungWalletPage';
import PayZappPage from './PayZapp/PayZappPage';
import TataNeuPage from './Tata Neu/TataNeuPage';
import NaviPage from './Navi/NaviPage';
import SlicePage from './Slice/SlicePage';
import BharatPePage from './BharatPe/BharatPePage';
import PayNearbyPage from './PayNearby/PayNearbyPage';
import ICICiMobilePayPage from './ICICI iMobile Pay/ICICiMobilePayPage';
import SBIYONOPage from './SBI YONO/SBIYONOPage';
import AxisMobilePage from './Axis Mobile/AxisMobilePage';
import Kotak811Page from './Kotak811/Kotak811Page';
import AirtelPaymentsBankPage from './Airtel Payments Bank/AirtelPaymentsBankPage';
import JioPaymentsBankPage from './Jio Payments Bank/JioPaymentsBankPage';
import IndiaPostPaymentsBankPage from './India Post Payments Bank/IndiaPostPaymentsBankPage';
import FinoPaymentsBankPage from './Fino Payments Bank/FinoPaymentsBankPage';
import NSDLPaymentsBankPage from './NSDL Payments Bank/NSDLPaymentsBankPage';

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
  const displayTitle = title || "Payment Intelligence";
  const displayDesc = description || "Analytics and data records for Payment Intelligence. Dive deep into the specific metadata and data patterns of this intelligence sector. Leverage advanced analytical tools, cross-reference multiple data points, and generate comprehensive investigative reports to support ongoing law enforcement operations seamlessly.";

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
export default function PMIPage({ onBack }) {
  const [activePage, setActivePage] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  React.useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#SMI-pmi/')) {
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
    window.history.pushState({ page: 'SMI', subPage: 'pmi', subTool: toolName }, '', `#SMI-pmi/${encodeURIComponent(toolName)}`);
    setActivePage(toolName);
  };

  const handleToolBack = () => {
    if (window.history.state && window.history.state.subTool) {
      window.history.back();
    } else {
      window.history.pushState({ page: 'SMI', subPage: 'pmi' }, '', '#SMI-pmi');
      setActivePage(null);
    }
  };

  const tools = [
    { name: 'Google Pay', icon: (p) => <Smartphone {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Analyze transaction histories, linked bank accounts, and digital payment footprints on Google Pay.' },
    { name: 'PhonePe', icon: (p) => <Smartphone {...p} />, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Extract payment behaviors, merchant interactions, and peer-to-peer transfers via PhonePe.' },
    { name: 'Paytm', icon: (p) => <Smartphone {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100', desc: 'Monitor wallet balances, UPI transactions, and e-commerce payment activities on Paytm.' },
    { name: 'BHIM', icon: (p) => <Smartphone {...p} />, color: 'text-green-600', bg: 'bg-green-100', desc: 'Audit UPI mandates, government payment records, and direct benefit transfers via BHIM.' },
    { name: 'Amazon Pay', icon: (p) => <CreditCard {...p} />, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Track e-commerce spending, gift card usage, and bill payment history on Amazon Pay.' },
    { name: 'WhatsApp Pay', icon: (p) => <Smartphone {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100', desc: 'Correlate social chat metadata with peer-to-peer payment trails on WhatsApp Pay.' },
    { name: 'MobiKwik', icon: (p) => <Wallet {...p} />, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Analyze digital wallet spending, loan repayments, and recurring bill payments on MobiKwik.' },
    { name: 'Freecharge', icon: (p) => <Wallet {...p} />, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Monitor utility bill payments, recharge histories, and digital wallet logs on Freecharge.' },
    { name: 'CRED', icon: (p) => <CreditCard {...p} />, color: 'text-zinc-800', bg: 'bg-zinc-200', desc: 'Track credit card bill payments, reward redemptions, and high-value spending patterns on CRED.' },
    { name: 'Airtel Thanks', icon: (p) => <Smartphone {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Audit telecom recharges, broadband payments, and wallet transactions on Airtel Thanks.' },
    { name: 'JioFinance', icon: (p) => <DollarSign {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Analyze digital lending profiles, insurance premium payments, and financial interactions on Jio.' },
    { name: 'Samsung Wallet', icon: (p) => <SmartphoneNfc {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100', desc: 'Monitor tap-to-pay usage, saved cards, and NFC-based digital transactions via Samsung Wallet.' },
    { name: 'PayZapp', icon: (p) => <Wallet {...p} />, color: 'text-sky-600', bg: 'bg-sky-100', desc: 'Track HDFC-backed wallet payments, linked card activities, and online merchant spending.' },
    { name: 'Tata Neu', icon: (p) => <Smartphone {...p} />, color: 'text-purple-700', bg: 'bg-purple-200', desc: 'Audit loyalty points, cross-brand e-commerce purchases, and digital payments on Tata Neu.' },
    { name: 'Navi', icon: (p) => <DollarSign {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100', desc: 'Analyze micro-loans, mutual fund investments, and digital lending histories on Navi.' },
    { name: 'Slice', icon: (p) => <CreditCard {...p} />, color: 'text-violet-600', bg: 'bg-violet-100', desc: 'Monitor credit line usage, split payments, and short-term borrowing behaviors on Slice.' },
    { name: 'BharatPe', icon: (p) => <Building2 {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100', desc: 'Track merchant QR code settlements, business loan records, and commercial transactions.' },
    { name: 'PayNearby', icon: (p) => <Building2 {...p} />, color: 'text-sky-600', bg: 'bg-sky-100', desc: 'Audit agent-led financial services, cash withdrawals, and micro-ATM interactions on PayNearby.' },
    { name: 'ICICI iMobile Pay', icon: (p) => <Building2 {...p} />, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Analyze banking application metadata, fund transfers, and integrated payment histories.' },
    { name: 'SBI YONO', icon: (p) => <Building2 {...p} />, color: 'text-blue-700', bg: 'bg-blue-200', desc: 'Monitor digital banking footprints, lifestyle purchases, and financial interactions via YONO.' },
    { name: 'Axis Mobile', icon: (p) => <Building2 {...p} />, color: 'text-rose-600', bg: 'bg-rose-100', desc: 'Track mobile banking activities, UPI transfers, and account service requests on Axis Mobile.' },
    { name: 'Kotak811', icon: (p) => <Building2 {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Audit digital-first bank accounts, virtual debit card usage, and online spending via Kotak811.' },
    { name: 'Airtel Payments Bank', icon: (p) => <Building2 {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Analyze rural banking footprints, remittance histories, and micro-savings on Airtel Bank.' },
    { name: 'Jio Payments Bank', icon: (p) => <Building2 {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Monitor telecom-linked banking, direct benefit transfers, and digital account usage on Jio.' },
    { name: 'India Post Payments Bank', icon: (p) => <Building2 {...p} />, color: 'text-red-700', bg: 'bg-red-200', desc: 'Audit postal banking services, rural remittances, and government financial aid via IPPB.' },
    { name: 'Fino Payments Bank', icon: (p) => <Building2 {...p} />, color: 'text-sky-600', bg: 'bg-sky-100', desc: 'Track merchant point-of-sale transactions, micro-banking, and remittance trails on Fino.' },
    { name: 'NSDL Payments Bank', icon: (p) => <Building2 {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100', desc: 'Analyze digital securities linked accounts, banking histories, and payment interactions on NSDL.' },
  ];

  if (activePage === 'Google Pay') return <GooglePayPage onBack={handleToolBack} />;
  if (activePage === 'PhonePe') return <PhonePePage onBack={handleToolBack} />;
  if (activePage === 'Paytm') return <PaytmPage onBack={handleToolBack} />;
  if (activePage === 'BHIM') return <BHIMPage onBack={handleToolBack} />;
  if (activePage === 'Amazon Pay') return <AmazonPayPage onBack={handleToolBack} />;
  if (activePage === 'WhatsApp Pay') return <WhatsAppPayPage onBack={handleToolBack} />;
  if (activePage === 'MobiKwik') return <MobiKwikPage onBack={handleToolBack} />;
  if (activePage === 'Freecharge') return <FreechargePage onBack={handleToolBack} />;
  if (activePage === 'CRED') return <CREDPage onBack={handleToolBack} />;
  if (activePage === 'Airtel Thanks') return <AirtelThanksPage onBack={handleToolBack} />;
  if (activePage === 'JioFinance') return <JioFinancePage onBack={handleToolBack} />;
  if (activePage === 'Samsung Wallet') return <SamsungWalletPage onBack={handleToolBack} />;
  if (activePage === 'PayZapp') return <PayZappPage onBack={handleToolBack} />;
  if (activePage === 'Tata Neu') return <TataNeuPage onBack={handleToolBack} />;
  if (activePage === 'Navi') return <NaviPage onBack={handleToolBack} />;
  if (activePage === 'Slice') return <SlicePage onBack={handleToolBack} />;
  if (activePage === 'BharatPe') return <BharatPePage onBack={handleToolBack} />;
  if (activePage === 'PayNearby') return <PayNearbyPage onBack={handleToolBack} />;
  if (activePage === 'ICICI iMobile Pay') return <ICICiMobilePayPage onBack={handleToolBack} />;
  if (activePage === 'SBI YONO') return <SBIYONOPage onBack={handleToolBack} />;
  if (activePage === 'Axis Mobile') return <AxisMobilePage onBack={handleToolBack} />;
  if (activePage === 'Kotak811') return <Kotak811Page onBack={handleToolBack} />;
  if (activePage === 'Airtel Payments Bank') return <AirtelPaymentsBankPage onBack={handleToolBack} />;
  if (activePage === 'Jio Payments Bank') return <JioPaymentsBankPage onBack={handleToolBack} />;
  if (activePage === 'India Post Payments Bank') return <IndiaPostPaymentsBankPage onBack={handleToolBack} />;
  if (activePage === 'Fino Payments Bank') return <FinoPaymentsBankPage onBack={handleToolBack} />;
  if (activePage === 'NSDL Payments Bank') return <NSDLPaymentsBankPage onBack={handleToolBack} />;

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
