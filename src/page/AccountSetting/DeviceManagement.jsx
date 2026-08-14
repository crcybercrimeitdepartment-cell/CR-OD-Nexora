import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, Smartphone, Monitor, ShieldCheck, ShieldAlert, 
  MapPin, Clock, CheckCircle2, XCircle, AlertTriangle, 
  History, Shield, Lock, Unlock, MoreVertical, Search,
  Eye, Edit2, ShieldOff, Trash2, ArrowRight, ArrowLeft, Activity, 
  BellRing, X
} from 'lucide-react';

// ==========================================
// MOCK DATA GENERATORS
// ==========================================
const generateId = () => Math.random().toString(36).substring(2, 9).toUpperCase();
const getCurrentTime = () => new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

import { initialDevices, initialHistory, initialSecurityAlerts } from './DeviceManagementData';

// ==========================================
// HELPER COMPONENTS
// ==========================================
const DeviceIcon = ({ type, className = "w-6 h-6" }) => {
  switch (type) {
    case 'Laptop': return <Laptop className={className} />;
    case 'Mobile': return <Smartphone className={className} />;
    case 'Desktop': return <Monitor className={className} />;
    default: return <Monitor className={className} />;
  }
};

const StatusBadge = ({ status, trust }) => {
  if (status === 'Blocked') {
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[calc(10px*var(--text-scale,1))] sm:text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50"><XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Blocked</span>;
  }
  if (trust === 'Trusted') {
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[calc(10px*var(--text-scale,1))] sm:text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"><CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Trusted</span>;
  }
  return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[calc(10px*var(--text-scale,1))] sm:text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50"><AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Untrusted</span>;
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function DeviceManagementPage({ onBack }) {
  const [devices, setDevices] = useState(initialDevices);
  const [history, setHistory] = useState(initialHistory);
  const [securityAlerts, setSecurityAlerts] = useState(initialSecurityAlerts);
  
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (selectedDevice) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDevice]);

  // Computed state
  const currentDevice = devices.find(d => d.isCurrent);
  const trustedDevices = devices.filter(d => d.trustStatus === 'Trusted' && !d.isCurrent);
  const blockedDevices = devices.filter(d => d.status === 'Blocked');

  // Animation Variants
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  // ==========================================
  // REAL-TIME ACTIONS LOGIC
  // ==========================================
  const logHistory = (action, deviceName, icon, color, prevIp = "-", newIp = "-") => {
    const newLog = { id: `hist_${Date.now()}`, action, target: deviceName, time: getCurrentTime(), icon, color, prevIp, newIp };
    setHistory(prev => [newLog, ...prev]);
  };

  const logSecurityAlert = (type, title, desc, icon, color, bg) => {
    const newAlert = { id: `sec_${Date.now()}`, type, title, desc, time: getCurrentTime(), icon, color, bg };
    setSecurityAlerts(prev => [newAlert, ...prev]);
  };

  const handleAction = (e, device, action) => {
    e.stopPropagation();
    setActiveDropdown(null);

    // Prompt for reasoning/renaming using native prompts for simplicity in demo
    let reason = null;
    let newName = null;

    if (action === 'block') {
      if (device.isCurrent) return alert("You cannot block your current device.");
      reason = window.prompt("Enter block reason:");
      if (!reason) return;
    }

    if (action === 'rename') {
      newName = window.prompt("Enter new device name:", device.name);
      if (!newName || newName === device.name) return;
    }

    setDevices(prevDevices => prevDevices.map(d => {
      if (d.id !== device.id) return d;
      
      const updated = { ...d };
      
      switch (action) {
        case 'trust':
          updated.trustStatus = 'Trusted';
          updated.status = 'Active';
          updated.trustedDate = getCurrentTime();
          logHistory("Device Trusted", updated.name, ShieldCheck, "text-emerald-500", d.ip, d.ip);
          logSecurityAlert("trust", "Device Trust Change Alert", `${updated.name} marked as trusted.`, ShieldCheck, "text-emerald-500", "bg-emerald-100 dark:bg-emerald-900/30");
          break;
        case 'untrust':
          if (d.isCurrent) return d;
          updated.trustStatus = 'Untrusted';
          updated.trustedDate = null;
          logHistory("Trust Removed", updated.name, ShieldAlert, "text-amber-500", d.ip, d.ip);
          logSecurityAlert("trust", "Device Trust Change Alert", `Trust removed from ${updated.name}.`, ShieldAlert, "text-amber-500", "bg-amber-100 dark:bg-amber-900/30");
          break;
        case 'block':
          updated.status = 'Blocked';
          updated.trustStatus = 'Blocked';
          updated.blockReason = reason;
          updated.blockedDate = getCurrentTime();
          logHistory("Device Blocked", updated.name, ShieldOff, "text-rose-500", d.ip, d.ip);
          logSecurityAlert("block", "Device Block Alert", `${updated.name} was blocked. Reason: ${reason}`, ShieldOff, "text-rose-500", "bg-rose-100 dark:bg-rose-900/30");
          break;
        case 'unblock':
          updated.status = 'Inactive';
          updated.trustStatus = 'Untrusted';
          updated.blockReason = null;
          updated.blockedDate = null;
          logHistory("Device Unblocked", updated.name, Unlock, "text-blue-500", d.ip, d.ip);
          break;
        case 'rename':
          updated.name = newName;
          logHistory("Device Renamed", `${d.name} -> ${newName}`, Edit2, "text-purple-500", d.ip, d.ip);
          break;
        case 'verify':
          updated.verificationStatus = 'Verified';
          updated.verificationDate = getCurrentTime();
          updated.verificationMethod = 'Manual Override';
          logHistory("Device Verified", updated.name, ShieldCheck, "text-emerald-500", d.ip, d.ip);
          break;
      }
      return updated;
    }));

    if (action === 'remove') {
      if (device.isCurrent) return alert("You cannot remove your current device.");
      if (window.confirm(`Are you sure you want to remove ${device.name}?`)) {
        setDevices(prev => prev.filter(d => d.id !== device.id));
        logHistory("Device Removed", device.name, Trash2, "text-slate-500", device.ip, "-");
        logSecurityAlert("remove", "Device Removal Confirmation", `${device.name} was successfully removed from your account.`, Trash2, "text-slate-500", "bg-slate-100 dark:bg-slate-800");
      }
    }

    if (action === 'view') {
      setSelectedDevice(device);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-transparent text-slate-800 dark:text-slate-200 pt-20 sm:pt-24 pb-12 px-3 sm:px-6 relative font-sans">
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
      <div className="max-w-[1500px] mx-auto w-full z-10 relative">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight flex items-center gap-3">
              Device Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
              Manage and monitor all devices accessing your account
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-4 py-2 shadow-sm w-full sm:w-auto">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Your account is secure</span>
                <span className="text-xs font-semibold text-emerald-600/70 dark:text-emerald-400/70">Last checked: Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 xl:grid-cols-12 gap-6"
        >
          
          {/* Main Content Area (Col 1-8) */}
          <div className="col-span-1 xl:col-span-8 flex flex-col gap-6">
            
            {/* 1. My Current Device */}
            <motion.div variants={itemVariants} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[24px] p-6 border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
              
              <div className="flex items-center gap-5 z-10 relative w-full sm:w-auto">
                <div className="w-16 h-16 rounded-[18px] bg-blue-100 dark:bg-blue-900/50 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                  <DeviceIcon type={currentDevice?.type} className="w-8 h-8" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                    <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">1. My Current Device</span>
                    <span className="px-2 py-0.5 rounded-full text-[calc(9px*var(--text-scale,1))] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 whitespace-nowrap shrink-0">This Device</span>
                  </div>
                  <span className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white leading-tight break-words pr-2">{currentDevice?.name}</span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{currentDevice?.os} • {currentDevice?.browser}</span>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 break-words leading-tight"><MapPin className="w-3.5 h-3.5 shrink-0" /> {currentDevice?.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 z-10 w-full sm:w-auto bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                 <div className="flex flex-col">
                   <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-slate-400 uppercase tracking-wider">Current IP Address</span>
                   <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{currentDevice?.ip} <span className="text-xs text-slate-500">({currentDevice?.ipType})</span></span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-slate-400 uppercase tracking-wider">Trust Status</span>
                   <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {currentDevice?.trustStatus}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-slate-400 uppercase tracking-wider">Last Used</span>
                   <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> {currentDevice?.lastUsed}
                   </span>
                 </div>
              </div>
            </motion.div>

            {/* 2. My Devices List */}
            <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg flex flex-col relative z-30">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between bg-white/30 dark:bg-slate-900/30 rounded-t-[28px]">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">2. My Devices</h2>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">{devices.length} Registered</span>
                </div>
              </div>

              <div className="flex flex-col divide-y divide-slate-100/50 dark:divide-slate-800/50 p-2">
                {devices.map((device) => (
                  <div key={device.id} className={`flex flex-col xl:flex-row items-start xl:items-center justify-between p-4 sm:p-5 pr-14 xl:pr-4 rounded-[20px] transition-colors relative ${activeDropdown === device.id ? 'z-50' : 'z-10'} ${device.isCurrent ? 'bg-blue-50/40 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800/30' : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'}`}>
                    
                    {/* Device Info */}
                    <div className="flex items-center gap-4 w-full xl:w-1/3 mb-4 xl:mb-0">
                      <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm border ${device.isCurrent ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 border-blue-200 dark:border-blue-800/50' : device.status === 'Blocked' ? 'bg-rose-50 dark:bg-rose-900/40 text-rose-500 border-rose-200 dark:border-rose-800/50' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}>
                        <DeviceIcon type={device.type} />
                      </div>
                      <div className="flex flex-col min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-800 dark:text-white truncate">{device.name}</span>
                          {device.isCurrent && <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[calc(9px*var(--text-scale,1))] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">Current</span>}
                        </div>
                        <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 dark:text-slate-400 mt-0.5 truncate">{device.os} • {device.browser}</span>
                        <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 truncate">ID: {device.id}</span>
                      </div>
                    </div>

                    {/* Extended Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-nowrap items-start xl:items-center justify-between xl:justify-end w-full xl:w-2/3 gap-4 xl:gap-8 pt-3 xl:pt-0 border-t border-slate-100/50 dark:border-slate-800/50 xl:border-t-0">
                      
                      <div className="flex flex-col min-w-[100px]">
                        <span className="text-[calc(10px*var(--text-scale,1))] font-bold uppercase text-slate-400 tracking-wider">Last IP & Location</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{device.ip} <span className="text-[calc(10px*var(--text-scale,1))] text-slate-500">({device.ipType})</span></span>
                        <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-slate-500 truncate">{device.location.split(',')[0]}</span>
                      </div>
                      
                      <div className="flex flex-col min-w-[90px]">
                        <span className="text-[calc(10px*var(--text-scale,1))] font-bold uppercase text-slate-400 tracking-wider mb-1">Status</span>
                        <StatusBadge status={device.status} trust={device.trustStatus} />
                      </div>

                      <div className="flex flex-col min-w-[110px] col-span-2 sm:col-span-1 mt-1 sm:mt-0">
                         <span className="text-[calc(10px*var(--text-scale,1))] font-bold uppercase text-slate-400 tracking-wider">Registered / Used</span>
                         <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-slate-500 truncate">{device.registeredDate.split(',')[0]}</span>
                         <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                          {device.status === 'Active' ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>}
                          {device.lastUsed}
                        </div>
                      </div>

                      {/* 7. Device Actions Dropdown */}
                      <div className="absolute top-4 right-4 xl:static xl:top-auto xl:right-auto shrink-0 z-20">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === device.id ? null : device.id); }}
                          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === device.id && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-0 top-10 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 py-1"
                            >
                              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider">7. Device Actions</span>
                                <button onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-700">
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <button onClick={(e) => handleAction(e, device, 'view')} className="w-full text-left px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"><Eye className="w-4 h-4" /> View Details</button>
                              <button onClick={(e) => handleAction(e, device, 'rename')} className="w-full text-left px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"><Edit2 className="w-4 h-4" /> Rename Device</button>
                              <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                              
                              {device.trustStatus !== 'Trusted' && <button onClick={(e) => handleAction(e, device, 'trust')} className="w-full text-left px-4 py-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Mark as Trusted</button>}
                              {device.trustStatus === 'Trusted' && !device.isCurrent && <button onClick={(e) => handleAction(e, device, 'untrust')} className="w-full text-left px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Remove Trust</button>}
                              
                              {device.status !== 'Blocked' && !device.isCurrent && <button onClick={(e) => handleAction(e, device, 'block')} className="w-full text-left px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2"><ShieldOff className="w-4 h-4" /> Block Device</button>}
                              {device.status === 'Blocked' && <button onClick={(e) => handleAction(e, device, 'unblock')} className="w-full text-left px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2"><Unlock className="w-4 h-4" /> Unblock Device</button>}
                              
                              <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                              {!device.isCurrent && <button onClick={(e) => handleAction(e, device, 'remove')} className="w-full text-left px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2"><Trash2 className="w-4 h-4" /> Remove Device</button>}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Detail Lists - 5. Trusted & 6. Blocked */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 5. Trusted Devices List */}
              <motion.div variants={itemVariants} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[24px] border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col overflow-hidden">
                <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50">
                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-white">5. Trusted Devices</h3>
                  <span className="px-2 py-0.5 rounded text-[calc(10px*var(--text-scale,1))] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{trustedDevices.length + 1}</span>
                </div>
                <div className="p-2 flex flex-col divide-y divide-slate-100/50 dark:divide-slate-800/50">
                  {[currentDevice, ...trustedDevices].map(dev => (
                    <div key={'trust_'+dev.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-white">{dev.name}</span>
                        <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-slate-500">Trusted: {dev.trustedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">Trusted</span>
                        {!dev.isCurrent && (
                          <button onClick={(e) => handleAction(e, dev, 'untrust')} className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors" title="Remove Trust">
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 6. Blocked Devices List */}
              <motion.div variants={itemVariants} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[24px] border border-white/60 dark:border-slate-700/50 shadow-sm flex flex-col overflow-hidden">
                <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50">
                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-white">6. Blocked Devices</h3>
                  <span className="px-2 py-0.5 rounded text-[calc(10px*var(--text-scale,1))] font-black bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">{blockedDevices.length}</span>
                </div>
                <div className="p-2 flex flex-col divide-y divide-slate-100/50 dark:divide-slate-800/50">
                  {blockedDevices.length === 0 ? (
                     <div className="p-6 text-center text-sm font-bold text-slate-500">No blocked devices</div>
                  ) : blockedDevices.map(dev => (
                    <div key={'blk_'+dev.id} className="flex items-start justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <div className="flex flex-col gap-1 w-[70%]">
                        <div className="flex items-center gap-2">
                          <DeviceIcon type={dev.type} className="w-3.5 h-3.5 text-rose-500" />
                          <span className="text-xs font-bold text-slate-800 dark:text-white truncate">{dev.name}</span>
                        </div>
                        <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-slate-500">IP: {dev.ip}</span>
                        <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-rose-600/80 line-clamp-2 leading-tight">Reason: {dev.blockReason}</span>
                        <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-slate-400">Blocked: {dev.blockedDate}</span>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50 px-2 py-0.5 rounded">Blocked</span>
                        <button onClick={(e) => handleAction(e, dev, 'unblock')} className="text-[calc(10px*var(--text-scale,1))] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded transition-colors border border-blue-100 dark:border-blue-800/50">
                          Unblock
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

          </div>

          {/* Right Sidebar Area (Col 9-12) */}
          <div className="col-span-1 xl:col-span-4 flex flex-col gap-6">
            
            {/* 8. Device Security */}
            <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-[calc(15px*var(--text-scale,1))] text-slate-800 dark:text-white">8. Device Security</h3>
                <span className="px-2 py-0.5 rounded text-[calc(10px*var(--text-scale,1))] font-black bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">{securityAlerts.length} Alerts</span>
              </div>
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {securityAlerts.map(alert => (
                  <div key={alert.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${alert.bg} ${alert.color}`}>
                      <alert.icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col flex-1 pt-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-extrabold text-slate-800 dark:text-white">{alert.title}</span>
                        <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-slate-400 shrink-0">{alert.time}</span>
                      </div>
                      <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-slate-500 leading-tight mt-1">{alert.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Device Summary Chart */}
            <motion.div variants={itemVariants} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[24px] border border-white/60 dark:border-slate-700/50 shadow-sm p-6 flex flex-col">
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-white mb-5 uppercase tracking-wider text-center">Summary Chart</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                {/* Donut representation */}
                <div className="relative w-32 h-32 rounded-full border-[14px] border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-inner">
                   <div className="absolute inset-[-14px] rounded-full border-[14px] border-emerald-500 border-r-transparent border-b-transparent transform -rotate-45 transition-all duration-500" />
                   <div className="absolute inset-[-14px] rounded-full border-[14px] border-amber-500 border-t-transparent border-l-transparent border-b-transparent transform rotate-[45deg] transition-all duration-500" />
                   <div className="absolute inset-[-14px] rounded-full border-[14px] border-rose-500 border-t-transparent border-l-transparent border-r-transparent transform -rotate-[45deg] transition-all duration-500" />
                   
                   <div className="flex flex-col items-center bg-white dark:bg-slate-900 w-full h-full rounded-full justify-center shadow">
                     <span className="text-3xl font-black text-slate-800 dark:text-white leading-none">{devices.length}</span>
                     <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-slate-400 uppercase tracking-wider mt-1">Total</span>
                   </div>
                </div>
                
                <div className="flex flex-col gap-3">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                     <div className="w-3 h-3 rounded bg-emerald-500" /> {trustedDevices.length + 1} Trusted
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                     <div className="w-3 h-3 rounded bg-amber-500" /> {devices.filter(d=>d.trustStatus==='Untrusted').length} Untrusted
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                     <div className="w-3 h-3 rounded bg-rose-500" /> {blockedDevices.length} Blocked
                   </div>
                </div>
              </div>
            </motion.div>
            
            {/* 9. Device History */}
            <motion.div variants={itemVariants} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[24px] border border-white/60 dark:border-slate-700/50 shadow-sm p-5 flex flex-col flex-1 min-h-[300px]">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-[calc(15px*var(--text-scale,1))] text-slate-800 dark:text-white">9. Device History</h3>
                <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-slate-400 uppercase tracking-wider">{history.length} Events</span>
              </div>
              <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {history.map(hist => (
                  <div key={hist.id} className="flex flex-col gap-2 relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 ml-2">
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${hist.color.replace('text-', 'bg-')}`}></div>
                    </div>
                    <div className="flex items-center justify-between -mt-1">
                      <span className={`text-xs font-extrabold ${hist.color}`}>{hist.action}</span>
                      <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-slate-400">{hist.time}</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700/50">
                      <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-700 dark:text-slate-300 block mb-1">Device: {hist.target}</span>
                      <div className="flex items-center gap-3 text-[calc(10px*var(--text-scale,1))] font-semibold text-slate-500">
                         <span>Old IP: {hist.prevIp}</span>
                         <ArrowRight className="w-2.5 h-2.5 text-slate-300" />
                         <span>New IP: {hist.newIp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>

      {/* 3 & 4. Device Details & Verification Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedDevice && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedDevice(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-[#0B1120] rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-500" /> 3. Device Details
                </h2>
                <button 
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedDevice(null); }} 
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedDevice(null); }}
                  onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedDevice(null); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm relative z-[999] pointer-events-auto cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-slate-800 dark:group-hover:text-white pointer-events-none transition-colors" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white pointer-events-none transition-colors">Back</span>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-8 bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-[24px] border border-blue-100 dark:border-blue-900/50">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-700 shadow-sm">
                    <DeviceIcon type={selectedDevice.type} className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col flex-1 w-full">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-2xl font-black text-slate-800 dark:text-white">{selectedDevice.name}</h3>
                      <StatusBadge status={selectedDevice.status} trust={selectedDevice.trustStatus} />
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs font-bold text-slate-500 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">Device ID: <span className="text-slate-800 dark:text-slate-200">{selectedDevice.id}</span></span>
                      <span className="text-xs font-bold text-slate-500 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">Type: <span className="text-slate-800 dark:text-slate-200">{selectedDevice.type}</span></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                   
                   {/* Info Blocks */}
                   <div className="flex flex-col">
                     <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider mb-1.5 flex items-center gap-1.5"><Laptop className="w-3 h-3" /> Operating System</span>
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">{selectedDevice.os}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider mb-1.5 flex items-center gap-1.5"><Search className="w-3 h-3" /> Browser / App</span>
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">{selectedDevice.browser}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider mb-1.5 flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Last Known Location</span>
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">{selectedDevice.location}</span>
                   </div>

                   {/* IP Block */}
                   <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                     <div className="flex flex-col">
                       <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider mb-1">Current/Last IP Address</span>
                       <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{selectedDevice.ip} <span className="text-xs text-slate-500 bg-slate-200 dark:bg-slate-700 px-1.5 rounded">{selectedDevice.ipType}</span></span>
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider mb-1">IP First Seen</span>
                       <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{selectedDevice.ipFirstSeen}</span>
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider mb-1">IP Last Seen</span>
                       <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{selectedDevice.ipLastSeen}</span>
                     </div>
                   </div>

                   {/* Time Block */}
                   <div className="flex flex-col">
                     <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider mb-1.5 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Registered Date & Time</span>
                     <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{selectedDevice.registeredDate}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider mb-1.5 flex items-center gap-1.5"><Activity className="w-3 h-3" /> Last Used Date & Time</span>
                     <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{selectedDevice.lastUsed === 'Just now' ? 'Today, Just now' : selectedDevice.lastUsed}</span>
                   </div>
                   
                   {/* 4. Device Verification Section inside Modal */}
                   <div className="sm:col-span-2 lg:col-span-3 mt-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                     <h4 className="text-sm font-extrabold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-500" /> 4. Device Verification</h4>
                     
                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-emerald-50/50 dark:bg-emerald-900/10 p-5 rounded-[20px] border border-emerald-100 dark:border-emerald-800/50 gap-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                             <span className="text-[calc(10px*var(--text-scale,1))] font-black uppercase text-slate-400 tracking-wider">Verification Status:</span>
                             {selectedDevice.verificationStatus === 'Verified' ? (
                               <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                             ) : selectedDevice.verificationStatus === 'Verification Pending' ? (
                               <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800/50 flex items-center gap-1"><Clock className="w-3 h-3" /> Verification Pending</span>
                             ) : (
                               <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-800/50 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Verification Required</span>
                             )}
                          </div>
                          
                          {selectedDevice.verificationStatus === 'Verified' && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
                               <span>Method: <span className="text-emerald-600 dark:text-emerald-400">{selectedDevice.verificationMethod}</span></span>
                               <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                               <span>Date: {selectedDevice.verificationDate}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          {selectedDevice.verificationStatus !== 'Verified' ? (
                             <button onClick={(e) => handleAction(e, selectedDevice, 'verify')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow transition-colors">Verify Device</button>
                          ) : (
                             <button onClick={(e) => handleAction(e, selectedDevice, 'verify')} className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold rounded-lg shadow-sm transition-colors">Re-verify Device</button>
                          )}
                        </div>
                     </div>
                   </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
}
