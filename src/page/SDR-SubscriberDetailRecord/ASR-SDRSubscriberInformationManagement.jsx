import React from 'react';
import ToolCard from '../../components/nexora';
import { FileText, UserCheck, ClipboardList, Power, PowerOff, RefreshCw, Repeat, Users, FileSignature, History, Hash, PhoneCall, Smartphone, Layers } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>SDR Subscriber Information Management</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Manage and access comprehensive subscriber information records, Customer Application Forms (CAF), and identity archives across all telecom operators.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function ASRPage({ onBack }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tools = [
    { name: 'Customer Application Form (CAF)', icon: (p) => <FileText {...p} />, color: 'text-sky-600', bg: 'bg-sky-100', desc: 'Review original CAF submissions and subscriber details.' },
    { name: 'e-KYC & Customer Verification', icon: (p) => <UserCheck {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100', desc: 'Verify digital KYC status and identity documentation.' },
    { name: 'Subscriber Registration Record', icon: (p) => <ClipboardList {...p} />, color: 'text-violet-600', bg: 'bg-violet-100', desc: 'Access full telecom registration information.' },
    { name: 'SIM Activation Record', icon: (p) => <Power {...p} />, color: 'text-amber-600', bg: 'bg-amber-100', desc: 'Audit initial SIM activation timestamps and logs.' },
    { name: 'SIM Deactivation & Disconnection Record', icon: (p) => <PowerOff {...p} />, color: 'text-rose-600', bg: 'bg-rose-100', desc: 'Track history of disconnected or deactivated numbers.' },
    { name: 'SIM Reconnection & Reactivation Record', icon: (p) => <RefreshCw {...p} />, color: 'text-lime-600', bg: 'bg-lime-100', desc: 'Monitor reactivated or reissued SIM statuses.' },
    { name: 'Mobile Number Portability (MNP) Record', icon: (p) => <Repeat {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100', desc: 'View MNP history and operator switching logs.' },
    { name: 'Subscriber Ownership / Transfer Record', icon: (p) => <Users {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100', desc: 'Check records of SIM ownership transfers.' },
    { name: 'KYC Update / Re-KYC Record', icon: (p) => <FileSignature {...p} />, color: 'text-teal-600', bg: 'bg-teal-100', desc: 'Review subsequent KYC updates or re-verification.' },
    { name: 'SIM Replacement History', icon: (p) => <History {...p} />, color: 'text-pink-600', bg: 'bg-pink-100', desc: 'Track history of lost or replaced SIM cards.' },
    { name: 'Mobile Number Allocation Record', icon: (p) => <Hash {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100', desc: 'Identify mobile number blocks and allocations.' },
    { name: 'Alternate Mobile Number Record', icon: (p) => <PhoneCall {...p} />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Retrieve associated or emergency contact numbers.' },
    { name: 'IMEI–SIM / Device Association Record', icon: (p) => <Smartphone {...p} />, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Link IMSI/SIM data to associated handset IMEI.' },
    { name: 'DEMO', icon: (p) => <Layers {...p} />, color: 'text-red-600', bg: 'bg-red-100', desc: 'Interactive demonstration module.' },
    { name: 'DEMO', icon: (p) => <Layers {...p} />, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Interactive demonstration module.' },
    { name: 'DEMO', icon: (p) => <Layers {...p} />, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100', desc: 'Interactive demonstration module.' },
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} onClick={() => {}} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
