import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, CreditCard, RefreshCw, AlertTriangle, CheckCircle2,
  Calendar, Info, Lock, Settings, ChevronRight, X, User,
  FileText, ShieldCheck, HelpCircle, HardDrive, Edit2, ShieldAlert,
  ArrowRight, MapPin, Clock, Database
} from 'lucide-react';
import { statsBoxesData, planFeaturesData, actionButtonsData } from './SubscriptionBillingData';
import OrderHistory from './OrderHistory';

export default function SubscriptionBillingPage({ onBack }) {
  // State 
  const [autoRenew, setAutoRenew] = useState(true);
  const [autoPay, setAutoPay] = useState(true);
  
  // Simulated Functional State
  const [currentPlan, setCurrentPlan] = useState("Premium Plan");
  const [planAmount, setPlanAmount] = useState("2,50,000");
  const [paymentMethod, setPaymentMethod] = useState("•••• 4242");
  
  // Toast State
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const handleAction = (message) => {
    setToastMsg(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Card wrappers helper
  const Card = ({ 
    title, subtitle, icon: Icon, number, colSpan, children, 
    bg = "bg-white/60 dark:bg-slate-900/60",
    borderColor = "border-white/80 dark:border-slate-700/60",
    badgeBg = "bg-[#148395]",
    iconColor = "text-[#148395]"
  }) => (
    <motion.div variants={itemVariants} className={`col-span-1 ${colSpan} ${bg} backdrop-blur-2xl rounded-[28px] border ${borderColor} shadow-lg p-5 sm:p-6 flex flex-col relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-5 border-b border-slate-100/50 dark:border-slate-800/50 pb-4">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-lg ${badgeBg} text-white flex items-center justify-center text-sm font-black shrink-0`}>{number}</span> 
          <div className="flex flex-col">
            <h3 className="font-extrabold text-[16px] sm:text-[18px] text-slate-800 dark:text-white truncate">{title}</h3>
            {subtitle && <span className="text-xs font-semibold text-slate-500">{subtitle}</span>}
          </div>
        </div>
        {Icon && <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor} shrink-0 ml-2 drop-shadow-sm`} />}
      </div>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );

  if (showOrderHistory) {
    return <OrderHistory onBack={() => setShowOrderHistory(false)} />;
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 pt-20 sm:pt-24 pb-12 px-3 sm:px-6 relative font-sans">
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
       <div className="max-w-[1720px] mx-auto w-full z-10 relative">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight flex items-center gap-3">
                Subscription & Billing
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                Manage your subscription, billing, and payment settings
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowOrderHistory(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-[#148395] hover:from-blue-500 hover:to-[#17a2b8] text-white border border-white/20 rounded-xl px-5 py-2 shadow-[0_0_15px_rgba(20,131,149,0.4)] hover:shadow-[0_0_25px_rgba(20,131,149,0.6)] hover:-translate-y-0.5 transition-all duration-300 h-[42px] group"
              >
                <FileText className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span className="text-sm font-extrabold hidden sm:inline tracking-wide">Order History</span>
                <ChevronRight className="w-4 h-4 text-blue-100 group-hover:translate-x-1 transition-transform ml-0.5" />
              </button>
              
              <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-4 py-2 shadow-sm w-full sm:w-auto h-[42px]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 leading-tight">Account secure</span>
                  <span className="text-[9px] sm:text-xs font-semibold text-emerald-600/70 dark:text-emerald-400/70 leading-tight">Checked: 2m ago</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 grid-flow-dense">
            
            {/* 1. Current Subscription */}
            <Card title="Current Subscription" subtitle="Here's your active plan and usage overview" number="1" icon={Crown} colSpan="col-span-1 md:col-span-12 lg:col-span-12 xl:col-span-8" bg="bg-cyan-50/40 dark:bg-[#148395]/10" borderColor="border-cyan-200/50 dark:border-[#148395]/30" badgeBg="bg-[#148395]" iconColor="text-[#148395]">
              <div className="flex flex-col gap-3">
                
                {/* Banner */}
                <div className="bg-gradient-to-r from-[#17a2b8]/20 to-[#f0f9fa] dark:from-[#17a2b8]/30 dark:to-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between relative overflow-hidden border border-[#17a2b8]/20">
                   <div className="absolute top-0 right-0 w-[200px] h-[200px] border-[20px] border-[#17a2b8]/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                   <div className="absolute bottom-0 left-0 w-[100px] h-[100px] border-[10px] border-[#17a2b8]/5 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />
                   
                   <div className="flex items-center gap-4 relative z-10 w-full">
                     <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
                       <svg className="absolute inset-0 w-full h-full text-[#148395] drop-shadow-md" fill="currentColor" viewBox="0 0 100 100">
                         <polygon points="50 5 95 25 95 75 50 95 5 75 5 25" />
                       </svg>
                       <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10 drop-shadow-sm" />
                     </div>
                     
                     <div className="flex flex-col">
                       <div className="flex items-center gap-1.5 mb-1 bg-white/60 dark:bg-slate-900/60 w-max px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
                         <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-widest leading-none">Active</span>
                       </div>
                       <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">{currentPlan}</span>
                       <span className="text-lg sm:text-xl font-extrabold text-[#148395] dark:text-[#2bcbd7] leading-tight mt-1">₹{planAmount} <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500">/ Year</span></span>
                       <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-0.5">Billing Cycle: <span className="text-[#148395] font-black">Annually</span></span>
                     </div>
                   </div>
                </div>

                {/* 5 Stats boxes */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
                  {statsBoxesData.map((s, i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-2 border border-slate-100 dark:border-slate-800 rounded-xl bg-white/80 dark:bg-slate-900/80 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 border ${s.bg} ${s.color} ${s.b}`}>
                        <s.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">{s.title}</span>
                      {s.isStatus ? (
                         <span className="px-1.5 py-0.5 mt-1 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span>{s.val}</span>
                      ) : (
                         <span className={`text-[11px] sm:text-[12px] font-black text-center mt-1 leading-none ${s.textCol || 'text-slate-800 dark:text-white'}`}>{s.val}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Features and Storage */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                   {/* Left: Plan Features */}
                   <div className="border border-slate-100 dark:border-slate-800 rounded-2xl p-3 sm:p-4 bg-white/80 dark:bg-slate-900/80 shadow-sm flex flex-col relative overflow-hidden">
                     <div className="flex items-center gap-2 mb-3">
                       <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center border border-emerald-100 dark:border-emerald-800/50">
                         <Crown className="w-3.5 h-3.5" />
                       </div>
                       <span className="text-[10px] font-black uppercase text-[#148395] tracking-widest">Plan Features</span>
                     </div>
                     <ul className="flex flex-col gap-2 flex-1 mb-3">
                       {planFeaturesData.map((f, i) => (
                         <React.Fragment key={i}>
                           <li className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
                             <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                               <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                             </div>
                             {f}
                           </li>
                           {i !== 3 && <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />}
                         </React.Fragment>
                       ))}
                     </ul>
                     <div className="mt-auto p-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-[#f0f9fa] dark:from-blue-900/20 dark:to-[#17a2b8]/10 border border-blue-100 dark:border-[#17a2b8]/20 flex items-center gap-2">
                       <div className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0">
                         <Crown className="w-4 h-4 text-blue-600" />
                       </div>
                       <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-tight">Your plan gives access to all premium tools.</span>
                     </div>
                   </div>

                   {/* Right: Storage */}
                   <div className="border border-slate-100 dark:border-slate-800 rounded-2xl p-3 sm:p-4 bg-white/80 dark:bg-slate-900/80 shadow-sm flex flex-col items-center justify-center relative">
                     <div className="flex items-center gap-2 mb-2 w-full absolute top-3 left-3">
                       <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center border border-blue-100 dark:border-blue-800/50">
                         <Database className="w-3.5 h-3.5" />
                       </div>
                       <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Storage</span>
                     </div>
                     
                     <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mt-5 mb-4">
                       {/* Donut Chart SVG */}
                       <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                         <circle className="text-slate-100 dark:text-slate-800" strokeWidth="12" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                         <circle className="text-[#148395]" strokeWidth="12" strokeDasharray={`${24 * 2.51} 251.2`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" style={{ transition: 'stroke-dasharray 1s ease-in-out' }} />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center mt-0.5">
                         <Database className="w-4 h-4 text-blue-600 mb-0.5 drop-shadow-sm" />
                         <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white leading-none">120 GB</span>
                         <span className="text-[9px] font-bold text-slate-500 mt-1">Used (24%)</span>
                       </div>
                     </div>

                     <div className="text-center mb-3 w-full pb-2 border-b border-dashed border-slate-200 dark:border-slate-700">
                       <span className="text-base sm:text-lg font-black text-slate-800 dark:text-white block">500 GB</span>
                       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Total Storage</span>
                     </div>

                     <div className="w-full flex flex-col gap-1.5 mt-auto">
                       <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                         <div className="h-full bg-gradient-to-r from-[#17a2b8] to-[#2bcbd7] rounded-full" style={{ width: '24%' }} />
                       </div>
                       <div className="flex justify-between items-center px-0.5">
                         <span className="text-[9px] sm:text-[10px] font-bold text-[#148395]">120 GB</span>
                         <span className="text-[8px] sm:text-[9px] font-bold text-slate-400">/ 500 GB (24%)</span>
                       </div>
                     </div>
                   </div>
                </div>

                {/* Bottom Alert */}
                <div className="bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl p-3 flex items-center justify-between relative overflow-hidden shadow-sm">
                   <div className="flex items-center gap-3 relative z-10">
                     <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                       <ShieldCheck className="w-3.5 h-3.5" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 dark:text-emerald-100 leading-none mb-1">Your subscription is active and secure.</span>
                       <span className="text-[9px] sm:text-[10px] font-semibold text-slate-600 dark:text-emerald-400/80 leading-none">Enjoy uninterrupted access to all premium features.</span>
                     </div>
                   </div>
                   <div className="relative z-10 hidden sm:block">
                     <ShieldCheck className="w-8 h-8 text-emerald-500/20 dark:text-emerald-400/10" />
                   </div>
                </div>

              </div>
            </Card>

            {/* 2. Subscription Renewal */}
            <Card title="Subscription Renewal" number="2" icon={RefreshCw} colSpan="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-4" bg="bg-blue-50/50 dark:bg-blue-900/10" borderColor="border-blue-200/50 dark:border-blue-800/30" badgeBg="bg-blue-600" iconColor="text-blue-500">
               <div className="flex flex-col divide-y divide-slate-100/50 dark:divide-slate-800/50 h-full justify-between">
                  <div className="flex flex-col gap-3 pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 truncate pr-2">Current Plan</span>
                      <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate">{currentPlan}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 truncate pr-2">Renewal Duration</span>
                      <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate">1 Year</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 truncate pr-2">Renewal Price</span>
                      <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate">₹{planAmount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 truncate pr-2">Renewal Plan</span>
                      <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate">{currentPlan}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 truncate pr-2">Renewal Date</span>
                      <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate">10 Aug 2027</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 truncate pr-2">Renewal Status</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shrink-0">Upcoming</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex flex-col gap-3 mt-auto">
                    <button 
                      onClick={() => handleAction("Subscription successfully renewed for 1 Year!")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm flex items-center justify-center gap-2"
                    >
                       Renew Now
                    </button>
                    <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/10 text-[10px] text-blue-600 dark:text-blue-400 font-semibold text-center leading-tight">
                       <Calendar className="w-3.5 h-3.5 shrink-0" /> Your subscription will be renewed on 10 Aug 2027
                    </div>
                  </div>
               </div>
            </Card>

            {/* 3. Auto-Renewal */}
            <Card title="Auto-Renewal" number="3" icon={RefreshCw} colSpan="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-4" bg="bg-emerald-50/50 dark:bg-emerald-900/10" borderColor="border-emerald-200/50 dark:border-emerald-800/30" badgeBg="bg-emerald-500" iconColor="text-emerald-500">
               <div className="flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                     <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">Auto-Renewal</span>
                     <button 
                       onClick={() => setAutoRenew(!autoRenew)}
                       className={`w-12 h-6 rounded-full p-1 transition-colors relative flex items-center ${autoRenew ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                     >
                       <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" style={{ x: autoRenew ? 24 : 0 }} />
                       <span className="absolute left-2 text-[9px] font-black text-white" style={{ opacity: autoRenew ? 1 : 0 }}>ON</span>
                       <span className="absolute right-1.5 text-[9px] font-black text-white" style={{ opacity: autoRenew ? 0 : 1 }}>OFF</span>
                     </button>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 truncate pr-2">Next Renewal Date</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate">10 Aug 2027</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 truncate pr-2">Renewal Amount</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate">₹2,50,000</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mb-2 border-b border-slate-100 dark:border-slate-800/50 pb-3">
                      <span className="font-bold text-slate-500 truncate pr-2">Auto-Renewal Status</span>
                      <span className={`font-bold shrink-0 ${autoRenew ? 'text-emerald-500' : 'text-slate-400'}`}>{autoRenew ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <button 
                      onClick={() => setAutoRenew(!autoRenew)}
                      className={`w-full py-2.5 rounded-xl text-sm font-bold border transition-colors ${autoRenew ? 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50' : 'border-emerald-200 dark:border-emerald-800/50 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10'}`}
                    >
                      {autoRenew ? 'Disable Auto-Renewal' : 'Enable Auto-Renewal'}
                    </button>

                    <div className={`p-3 rounded-lg text-[10px] font-semibold flex items-start gap-2 leading-tight ${autoRenew ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'}`}>
                       <RefreshCw className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                       {autoRenew ? 'Your subscription will be automatically renewed on the renewal date.' : 'Auto-renewal is off. You will need to manually renew your subscription to avoid disruption.'}
                    </div>
                  </div>
               </div>
            </Card>

            {/* 4. Auto-Pay */}
            <Card title="Auto-Pay" number="4" icon={CreditCard} colSpan="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-4" bg="bg-teal-50/50 dark:bg-teal-900/10" borderColor="border-teal-200/50 dark:border-teal-800/30" badgeBg="bg-teal-500" iconColor="text-teal-500">
               <div className="flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                     <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">Auto-Pay</span>
                     <button 
                       onClick={() => setAutoPay(!autoPay)}
                       className={`w-12 h-6 rounded-full p-1 transition-colors relative flex items-center ${autoPay ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                     >
                       <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" style={{ x: autoPay ? 24 : 0 }} />
                       <span className="absolute left-2 text-[9px] font-black text-white" style={{ opacity: autoPay ? 1 : 0 }}>ON</span>
                       <span className="absolute right-1.5 text-[9px] font-black text-white" style={{ opacity: autoPay ? 0 : 1 }}>OFF</span>
                     </button>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 truncate pr-2">Payment Method</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shrink-0">
                        <div className="w-6 h-4 bg-blue-800 rounded flex items-center justify-center text-[7px] font-black text-white tracking-widest">VISA</div>
                        {paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 truncate pr-2">Next Payment Date</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate">10 Aug 2027</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 truncate pr-2">Next Payment Amount</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate">₹{planAmount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mb-2 border-b border-slate-100 dark:border-slate-800/50 pb-3">
                      <span className="font-bold text-slate-500 truncate pr-2">Authorization</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shrink-0 ${autoPay ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>{autoPay ? 'Authorized' : 'Not Authorized'}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <button 
                      onClick={() => setAutoPay(!autoPay)}
                      className={`w-full py-2.5 rounded-xl text-sm font-bold border transition-colors ${autoPay ? 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50' : 'border-blue-200 dark:border-blue-800/50 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10'}`}
                    >
                      {autoPay ? 'Disable Auto-Pay' : 'Enable Auto-Pay'}
                    </button>

                    <div className={`p-3 rounded-lg text-[10px] font-semibold flex items-start gap-2 leading-tight ${autoPay ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'}`}>
                       <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                       {autoPay ? 'Payments will be automatically processed using your default payment method.' : 'Auto-pay is disabled. You will be reminded to pay manually before the due date.'}
                    </div>
                  </div>
               </div>
            </Card>

            {/* 5. Plan Change */}
            <Card title="Plan Change" number="5" icon={RefreshCw} colSpan="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-4" bg="bg-purple-50/50 dark:bg-purple-900/10" borderColor="border-purple-200/50 dark:border-purple-800/30" badgeBg="bg-purple-500" iconColor="text-purple-500">
               <div className="flex flex-col gap-5 h-full">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Current Plan</span>
                      <span className="text-sm font-black text-slate-700 dark:text-slate-200">{currentPlan}</span>
                   </div>
                   
                   <div className="relative">
                     <div className="absolute top-1/2 left-0 sm:left-[-16px] w-full sm:w-8 h-8 -translate-y-1/2 flex items-center justify-center z-10 pointer-events-none">
                       <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center sm:rotate-0 rotate-90 hidden sm:flex">
                         <ArrowRight className="w-4 h-4 text-slate-400" />
                       </div>
                       <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center rotate-90 sm:hidden -mt-16">
                         <ArrowRight className="w-4 h-4 text-slate-400" />
                       </div>
                     </div>
                     <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-wider mb-1">Available Plan</span>
                        <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">{currentPlan === "Premium Plan" ? "Enterprise Plan" : "Premium Plan"}</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="flex flex-col gap-3 flex-1">
                   <div className="flex justify-between items-center text-xs border-b border-slate-100 dark:border-slate-800/50 pb-2">
                     <span className="font-bold text-slate-500 truncate pr-2">Price Difference</span>
                     <span className="font-extrabold text-slate-800 dark:text-slate-200 shrink-0">₹75,000</span>
                   </div>
                   <div className="flex justify-between items-center text-xs border-b border-slate-100 dark:border-slate-800/50 pb-2">
                     <span className="font-bold text-slate-500 truncate pr-2">Effective Date</span>
                     <span className="font-extrabold text-slate-800 dark:text-slate-200 shrink-0">Next Billing Cycle</span>
                   </div>
                   <div className="flex justify-between items-center text-xs border-b border-slate-100 dark:border-slate-800/50 pb-2">
                     <span className="font-bold text-slate-500 truncate pr-2">Change Type</span>
                     <span className="font-extrabold text-slate-800 dark:text-slate-200 shrink-0">Upgrade</span>
                   </div>
                   <div className="flex justify-between items-center text-xs mb-2">
                     <span className="font-bold text-slate-500 truncate pr-2">Plan Change Status</span>
                     <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 shrink-0">Allowed</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-auto">
                    <button 
                      onClick={() => { setCurrentPlan("Enterprise Plan"); setPlanAmount("5,00,000"); handleAction("Successfully upgraded to Enterprise Plan!"); }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs shadow-md transition-colors w-full"
                    >
                      Upgrade Plan
                    </button>
                    <button 
                      onClick={() => { setCurrentPlan("Standard Plan"); setPlanAmount("75,000"); handleAction("Successfully downgraded to Standard Plan."); }}
                      className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-2 rounded-lg text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors w-full"
                    >
                      Downgrade Plan
                    </button>
                    <button 
                      onClick={() => handleAction("Viewing plan comparison details...")}
                      className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-2 rounded-lg text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors w-full"
                    >
                      View Details
                    </button>
                 </div>
               </div>
            </Card>

            {/* 6. Payment Method */}
            <Card title="Payment Method" number="6" icon={CreditCard} colSpan="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-6" bg="bg-amber-50/50 dark:bg-amber-900/10" borderColor="border-amber-200/50 dark:border-amber-800/30" badgeBg="bg-amber-500" iconColor="text-amber-500">
               <div className="flex flex-col gap-4 h-full">
                 <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-xl p-4 flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-6 bg-blue-800 rounded flex items-center justify-center text-[9px] font-black text-white tracking-widest shadow-sm shrink-0">VISA</div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase truncate">Default Method</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200 truncate">{paymentMethod}</span>
                        <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap">Exp: 12/28</span>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 shrink-0">Default</span>
                 </div>

                 <div className="flex flex-col gap-1 mt-2 border-t border-slate-100 dark:border-slate-800/50 pt-3">
                   <button 
                     onClick={() => handleAction("Initiating add new payment method flow...")}
                     className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors w-full text-left"
                   >
                     <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 shrink-0"><CreditCard className="w-3.5 h-3.5" /></div>
                     <span className="truncate">Add Method</span>
                   </button>
                   <button 
                     onClick={() => { setPaymentMethod("•••• 9999"); handleAction("Default payment method successfully updated!"); }}
                     className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors w-full text-left"
                   >
                     <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 shrink-0"><Edit2 className="w-3.5 h-3.5" /></div>
                     <span className="truncate">Update Method</span>
                   </button>
                   <button 
                     onClick={() => { setPaymentMethod("None"); handleAction("Payment method removed from account."); }}
                     className="flex items-center gap-3 p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-xs font-bold text-rose-600 transition-colors w-full text-left"
                   >
                     <div className="w-6 h-6 rounded bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-500 shrink-0"><AlertTriangle className="w-3.5 h-3.5" /></div>
                     <span className="truncate">Remove Method</span>
                   </button>
                 </div>

                 <div className="mt-auto border-t border-slate-100 dark:border-slate-800/50 pt-3">
                   <div className="flex justify-between items-center text-xs mb-1">
                     <span className="font-bold text-slate-500 truncate">Method Status</span>
                     <span className="font-extrabold text-emerald-600 shrink-0">Active</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                     <span className="font-bold text-slate-500 truncate">Verification</span>
                     <span className="font-extrabold text-emerald-600 shrink-0">Verified</span>
                   </div>
                 </div>
               </div>
            </Card>

            {/* 7. Billing Information */}
            <Card title="Billing Information" number="7" icon={FileText} colSpan="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-6" bg="bg-indigo-50/50 dark:bg-indigo-900/10" borderColor="border-indigo-200/50 dark:border-indigo-800/30" badgeBg="bg-indigo-500" iconColor="text-indigo-500">
               <div className="flex flex-col gap-4 h-full">
                 <div className="flex flex-col gap-2">
                   <div className="flex justify-between items-center text-xs">
                     <span className="font-bold text-slate-500 truncate pr-2">Current Billing Amount</span>
                     <span className="font-extrabold text-slate-800 dark:text-slate-200 shrink-0">₹2,50,000</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                     <span className="font-bold text-slate-500 truncate pr-2">Discount</span>
                     <span className="font-extrabold text-emerald-600 shrink-0">- ₹0</span>
                   </div>
                   <div className="flex justify-between items-center text-xs border-b border-slate-100 dark:border-slate-800/50 pb-2">
                     <span className="font-bold text-slate-500 truncate pr-2">Tax (18%)</span>
                     <span className="font-extrabold text-slate-800 dark:text-slate-200 shrink-0">₹45,000</span>
                   </div>
                   <div className="flex justify-between items-center text-sm mt-1">
                     <span className="font-black text-slate-700 dark:text-slate-300 truncate pr-2">Total Payable</span>
                     <span className="font-black text-blue-600 dark:text-blue-400 shrink-0">₹2,95,000</span>
                   </div>
                 </div>

                 <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 mt-auto flex flex-col gap-3 border border-slate-100 dark:border-slate-700/50">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 truncate pr-2">Billing Cycle</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 shrink-0">Annually</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 truncate pr-2">Next Billing Date</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 shrink-0">10 Aug 2027</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 truncate pr-2">Next Billing Amount</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 shrink-0">₹2,95,000</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 truncate pr-2">Billing Status</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/30 shrink-0">Upcoming</span>
                    </div>
                 </div>
               </div>
            </Card>

            {/* 8. Billing & Subscription Actions */}
            <Card title="Billing & Subscription Actions" number="8" icon={Settings} colSpan="col-span-1 md:col-span-6 lg:col-span-12 xl:col-span-12" bg="bg-slate-50/50 dark:bg-slate-900/40" borderColor="border-slate-200/50 dark:border-slate-700/50" badgeBg="bg-slate-700 dark:bg-slate-600" iconColor="text-slate-600 dark:text-slate-400">
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                 {actionButtonsData.map((action) => {
                   const handlers = {
                     'renew': () => handleAction("Subscription Renewed!"),
                     'change': () => handleAction("Opening plan catalog..."),
                     'en-auto-ren': () => { setAutoRenew(true); handleAction("Auto-Renewal Enabled!"); },
                     'dis-auto-ren': () => { setAutoRenew(false); handleAction("Auto-Renewal Disabled."); },
                     'en-auto-pay': () => { setAutoPay(true); handleAction("Auto-Pay Enabled!"); },
                     'dis-auto-pay': () => { setAutoPay(false); handleAction("Auto-Pay Disabled."); },
                     'upd-pay': () => handleAction("Opening payment gateway..."),
                     'view-bill': () => handleAction("Downloading latest invoice (PDF)...")
                   };
                   return (
                   <button 
                     key={action.id} 
                     onClick={handlers[action.id]}
                     className="flex flex-row items-center justify-start gap-3 p-3 rounded-xl border hover:shadow-md transition-all hover:-translate-y-0.5 bg-white/50 dark:bg-slate-800/30 text-left h-full border-slate-200 dark:border-slate-700 group w-full"
                   >
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                       <action.icon className="w-5 h-5" />
                     </div>
                     <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">
                       {action.label}
                     </span>
                   </button>
                   );
                 })}
               </div>
               
               <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-extrabold text-slate-800 dark:text-white">Need help with your subscription?</span>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500">Our support team is here to assist you with any billing or subscription related queries.</span>
                    </div>
                 </div>
                 <button 
                   onClick={() => handleAction("Initiating secure support chat...")}
                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-colors text-sm w-full sm:w-auto whitespace-nowrap"
                 >
                   Contact Support
                 </button>
               </div>
            </Card>

          </motion.div>
       </div>

       {/* Toast Notification overlay */}
       <AnimatePresence>
         {showToast && (
           <motion.div
             initial={{ opacity: 0, y: 50, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20, scale: 0.9 }}
             className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold border border-slate-700 dark:border-white shadow-blue-500/20"
           >
             <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
             {toastMsg}
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
