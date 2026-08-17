import React, { useState } from 'react';
import { Lock, Settings2, ArrowLeft } from 'lucide-react';
import ModuleLockingPage from './ModuleLockingPage';
import ModuleManagementPage from './ModuleManagementPage';
import ToolCard from '../../components/nexora';

const SECURITY_CARDS = [
  { 
    id: 'lock', 
    title: 'Module & Card Locking System', 
    description: 'Restrict access to specific dashboard cards and platform sections.', 
    icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />, 
    bgColor: 'bg-indigo-100', 
    iconColor: 'text-indigo-600' 
  },
  { 
    id: 'manage', 
    title: 'Module Management', 
    description: 'Configure, install, and manage platform modules.', 
    icon: <Settings2 className="w-5 h-5 sm:w-6 sm:h-6" />, 
    bgColor: 'bg-emerald-100', 
    iconColor: 'text-emerald-600' 
  },
];

export default function PlatformSecuritySettingPage({ onBack }) {
  const [activeCard, setActiveCard] = useState(null);

  if (activeCard === 'lock') {
    return <ModuleLockingPage onBack={() => setActiveCard(null)} />;
  }

  if (activeCard === 'manage') {
    return <ModuleManagementPage onBack={() => setActiveCard(null)} />;
  }

  return (
    <div className="w-full max-w-[1720px] mx-auto p-4 sm:p-6 md:p-8">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-xs hover:shadow-md text-slate-700 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#1e2a52]" />
          <span>Back to Platform Settings</span>
        </button>
      )}

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
          Platform Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-2xl">
          Manage platform module access and configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 pt-4">
        {SECURITY_CARDS.map((card, index) => (
          <ToolCard
            key={card.id}
            tool={{
              id: card.id,
              name: card.title, // ToolCard expects 'name'
              description: card.description,
              icon: card.icon, // Pass the element directly
              bgColor: card.bgColor,
              iconColor: card.iconColor
            }}
            index={index}
            onClick={() => setActiveCard(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
