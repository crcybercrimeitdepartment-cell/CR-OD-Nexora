import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Clock, Calendar, Briefcase, FileText,
  Search, Filter, RefreshCw, Download, Database,
  Eye, ShieldCheck, ShieldAlert, CheckCircle2,
  XCircle, AlertTriangle, ArrowRight, ArrowLeft,
  Server, UserCheck, HardDrive, Smartphone,
  MoreVertical, X, Settings, Loader2
} from 'lucide-react';
import { mockOverview, mockModules, mockCategories, initialActivities } from './TimelineHistoryData';

// ==========================================
// HELPER COMPONENTS
// ==========================================
const StatusBadge = ({ status }) => {
  if (status === 'Failed' || status === 'Error') {
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50"><XCircle className="w-3 h-3" /> {status}</span>;
  }
  if (status === 'Success' || status === 'Completed') {
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"><CheckCircle2 className="w-3 h-3" /> {status}</span>;
  }
  return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50"><AlertTriangle className="w-3 h-3" /> {status}</span>;
};


// ==========================================
// MAIN COMPONENT
// ==========================================
export default function TimelineHistoryPage({ onBack }) {
  const [activities, setActivities] = useState(initialActivities);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Real-time tracking state
  const [sessionSeconds, setSessionSeconds] = useState(42 * 60 + 17);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mockTimeSpent = useMemo(() => {
    const formatTime = (totalSeconds) => {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      if (h > 0) return `${h}h ${m}m`;
      return `${m}m`;
    };

    const formatTimeWithSeconds = (totalSeconds) => {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      if (h > 0) return `${h}h ${m}m ${s}s`;
      return `${m}m ${s}s`;
    };

    const totalBase = 98 * 3600 + 42 * 60;
    const todayBase = 5 * 3600 + 18 * 60;
    const weekBase = 18 * 3600 + 36 * 60;
    const elapsed = sessionSeconds - (42 * 60 + 17);
    
    const currentTotal = totalBase + elapsed;
    const currentToday = todayBase + elapsed;
    const currentWeek = weekBase + elapsed;
    const avgDailySeconds = Math.floor(currentTotal / 30);

    return {
      total: formatTime(currentTotal),
      today: formatTime(currentToday),
      week: formatTime(currentWeek),
      month: formatTime(currentTotal),
      avgDaily: formatTime(avgDailySeconds),
      currentSession: formatTimeWithSeconds(sessionSeconds),
      longestSession: "3h 45m (08 Aug 2026)",
      firstLogin: "09:15 AM",
      lastActivity: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  }, [sessionSeconds, currentTime]);

  // Filters State
  const [filters, setFilters] = useState({
    dateRange: "",
    module: "",
    type: "",
    caseId: "",
    invId: "",
    status: "",
    searchQuery: "",
    searchCase: "",
    searchInv: "",
    searchRecord: "",
    searchModule: ""
  });

  // Modal scroll lock
  useEffect(() => {
    if (selectedActivity) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedActivity]);

  // Derived/Filtered Data
  const filteredActivities = useMemo(() => {
    return activities.filter(act => {
      if (filters.searchQuery && !act.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
      if (filters.searchCase && !act.caseId.toLowerCase().includes(filters.searchCase.toLowerCase())) return false;
      if (filters.searchInv && !act.invId.toLowerCase().includes(filters.searchInv.toLowerCase())) return false;
      if (filters.searchRecord && !act.refId.toLowerCase().includes(filters.searchRecord.toLowerCase())) return false;
      if (filters.module && filters.module !== "All Modules" && act.module !== filters.module) return false;
      if (filters.type && filters.type !== "All Types" && act.type !== filters.type) return false;
      if (filters.status && filters.status !== "All Status" && act.status !== filters.status) return false;
      return true;
    });
  }, [activities, filters]);


  // Action Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: "", module: "", type: "", caseId: "", invId: "", status: "",
      searchQuery: "", searchCase: "", searchInv: "", searchRecord: "", searchModule: ""
    });
  };

  const simulateRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulating new activity
      const newAct = {
        id: `ACT-00${activities.length + 1}`,
        date: "10 Aug 2026",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        name: "Timeline Refreshed",
        action: "User refreshed history",
        caseId: "-",
        invId: "-",
        refId: "-",
        module: "System",
        result: "Refresh Complete",
        desc: "Timeline was manually refreshed by user.",
        duration: "1s",
        status: "Success",
        type: "System Activity",
        icon: RefreshCw,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30"
      };
      setActivities([newAct, ...activities]);
    }, 800);
  };

  const handleExport = () => {
    alert("Exporting timeline history to CSV... (Simulated)");
  };

  // Animation Variants
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };


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
      <div className="max-w-[1600px] mx-auto w-full z-10 relative flex flex-col gap-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-[28px] border border-white/60 dark:border-slate-800/60 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight flex items-center gap-3">
              Timeline History
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
              Track and review your activity timeline and time spent across NEXORA platform
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl px-4 py-2 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Your account is secure</span>
                <span className="text-xs font-semibold text-emerald-600/70 dark:text-emerald-400/70">Last checked: 2 min ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Container */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-12 gap-6 grid-flow-dense">
          
          {/* ======================================================== */}
          {/* ROW 1: Overview & Time Spent */}
          {/* ======================================================== */}
          
          {/* 1. Activity Overview */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-6 lg:col-span-4 xl:col-span-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col justify-between">
            <h3 className="font-extrabold text-[15px] text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-xs">1</span> 
              Activity Overview
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-1 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group cursor-default">
                 <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-slate-400 group-hover:text-blue-500 transition-colors">
                   <Activity className="w-3.5 h-3.5" /> Total
                 </div>
                 <span className="text-2xl font-black text-slate-800 dark:text-white">{mockOverview.total}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-1 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group cursor-default">
                 <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-slate-400 group-hover:text-emerald-500 transition-colors">
                   <Calendar className="w-3.5 h-3.5" /> Today
                 </div>
                 <span className="text-2xl font-black text-slate-800 dark:text-white">{mockOverview.today}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-1 hover:border-purple-300 dark:hover:border-purple-700 transition-colors group cursor-default">
                 <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-slate-400 group-hover:text-purple-500 transition-colors">
                   <Calendar className="w-3.5 h-3.5" /> This Week
                 </div>
                 <span className="text-2xl font-black text-slate-800 dark:text-white">{mockOverview.week}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-1 hover:border-amber-300 dark:hover:border-amber-700 transition-colors group cursor-default">
                 <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-slate-400 group-hover:text-amber-500 transition-colors">
                   <Calendar className="w-3.5 h-3.5" /> This Month
                 </div>
                 <span className="text-2xl font-black text-slate-800 dark:text-white">{mockOverview.month}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto border-t border-slate-100 dark:border-slate-800 pt-4">
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Last Activity</span>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{mockOverview.lastActivityDate}</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Most Recent Module</span>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><Database className="w-3 h-3 text-blue-500" /> {mockOverview.mostRecentModule}</span>
               </div>
            </div>
          </motion.div>

          {/* 2. Time Spent / Session Duration */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-12 lg:col-span-8 xl:col-span-5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col">
            <h3 className="font-extrabold text-[15px] text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center text-xs">2</span> 
              Time Spent / Session Duration
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><Clock className="w-3 h-3 text-blue-500" /> Total Time</span>
                 <span className="text-lg font-black text-slate-800 dark:text-white">{mockTimeSpent.total}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-500" /> Today</span>
                 <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{mockTimeSpent.today}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> This Week</span>
                 <span className="text-lg font-black text-slate-800 dark:text-white">{mockTimeSpent.week}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1"><Clock className="w-3 h-3 text-purple-500" /> This Month</span>
                 <span className="text-lg font-black text-slate-800 dark:text-white">{mockTimeSpent.month}</span>
               </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 mb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Avg Daily Time</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{mockTimeSpent.avgDaily}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Current Session</span>
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                  {mockTimeSpent.currentSession} 
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:col-span-1 col-span-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Longest Session</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{mockTimeSpent.longestSession}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto px-2">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                 <UserCheck className="w-4 h-4 text-slate-400" /> First Login: <span className="text-slate-700 dark:text-slate-300">{mockTimeSpent.firstLogin}</span>
               </div>
               <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
               <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                 <Activity className="w-4 h-4 text-slate-400" /> Last Active: <span className="text-slate-700 dark:text-slate-300">{mockTimeSpent.lastActivity}</span>
               </div>
            </div>
          </motion.div>

          {/* 4. Module Activity */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-6 lg:col-span-5 xl:col-span-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-extrabold text-[15px] text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center text-xs">4</span> 
                Module Activity
              </h3>
              <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition-colors">View All <ArrowRight className="w-3 h-3" /></button>
            </div>
            
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[220px] custom-scrollbar pr-2">
              {mockModules.map(mod => (
                <div key={mod.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50 gap-3 sm:gap-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 ${mod.bg} ${mod.color}`}>
                      <mod.icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-extrabold text-slate-800 dark:text-white">{mod.name}</span>
                      <span className="text-[10px] font-semibold text-slate-500 mt-0.5">{mod.stats}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700/50 w-full sm:w-auto mt-2 sm:mt-0">
                    <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Time Spent</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{mod.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* ROW 2: Activity Timeline, Details & Actions Grid */}
          {/* ======================================================== */}

          {/* 3. Activity Timeline */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-6 lg:col-span-7 xl:col-span-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-extrabold text-[15px] text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-600 flex items-center justify-center text-xs">3</span> 
                Activity Timeline
              </h3>
              <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-bold text-[10px] border border-blue-100 dark:border-blue-800/50">10 Aug 2026</span>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-3 relative">
               {/* Vertical Line */}
               <div className="absolute left-[39px] top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-700/50 z-0 hidden sm:block"></div>
               
               {isLoading ? (
                 <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <span className="text-sm font-bold">Refreshing Timeline...</span>
                 </div>
               ) : (
                 <div className="flex flex-col gap-6 relative z-10 pt-2 pb-6">
                   {filteredActivities.length === 0 ? (
                      <div className="text-center text-sm font-bold text-slate-500 py-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">No activities match filters.</div>
                   ) : (
                     filteredActivities.slice(0, 5).map((act, idx) => (
                       <div key={act.id} className="flex gap-4 group cursor-pointer" onClick={() => setSelectedActivity(act)}>
                          {/* Time Column (Hidden on very small screens, displayed in card instead) */}
                          <div className="w-[70px] shrink-0 text-right pt-2 hidden sm:block">
                            <span className="text-[11px] font-extrabold text-slate-500 group-hover:text-blue-600 transition-colors">{act.time}</span>
                          </div>
                          
                          {/* Timeline Node */}
                          <div className="relative pt-1.5 hidden sm:flex justify-center w-6 shrink-0">
                             <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 group-hover:border-blue-500 transition-colors z-10 flex items-center justify-center">
                                <div className={`w-1.5 h-1.5 rounded-full ${act.color.replace('text-', 'bg-')} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                             </div>
                          </div>
                          
                          {/* Content Card */}
                          <div className="flex-1 bg-white/50 dark:bg-slate-800/40 p-4 rounded-[20px] border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all group-hover:border-blue-200 dark:group-hover:border-blue-800/50 group-hover:-translate-y-0.5">
                             <div className="flex justify-between items-start mb-2">
                               <div className="flex items-center gap-2">
                                 <div className={`w-6 h-6 rounded-md flex items-center justify-center ${act.bg} ${act.color}`}>
                                    <act.icon className="w-3.5 h-3.5" />
                                 </div>
                                 <h4 className="text-sm font-extrabold text-slate-800 dark:text-white line-clamp-1">{act.name}</h4>
                               </div>
                               <StatusBadge status={act.status} />
                             </div>
                             
                             {/* Mobile Time */}
                             <div className="sm:hidden text-[10px] font-bold text-slate-400 mb-2">{act.time}</div>

                             <div className="flex flex-col gap-1.5 mt-3 text-[11px] font-semibold text-slate-500 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
                               <div className="flex items-center justify-between">
                                 <span>Case: <span className="text-slate-700 dark:text-slate-300 font-bold">{act.caseId}</span></span>
                                 <span className="text-[9px] text-slate-400 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">{act.module}</span>
                               </div>
                             </div>
                             
                             <div className="mt-3 flex items-center text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider">
                               View Details <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                             </div>
                          </div>
                       </div>
                     ))
                   )}
                 </div>
               )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <button className="text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">Load More History</button>
            </div>
          </motion.div>

          {/* 5. Detailed Work Activity (Table View) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-12 xl:col-span-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg flex flex-col h-[600px] overflow-hidden">
             <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white/30 dark:bg-slate-900/30">
               <h3 className="font-extrabold text-[15px] text-slate-800 dark:text-white flex items-center gap-2">
                 <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center text-xs">5</span> 
                 Detailed Work Activity
               </h3>
               <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline">View All <ArrowRight className="w-3 h-3" /></button>
             </div>
             
             <div className="flex-1 overflow-auto custom-scrollbar p-0">
               <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead className="bg-slate-50/80 dark:bg-slate-800/50 sticky top-0 z-20 backdrop-blur-md">
                   <tr>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Date & Time</th>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Module</th>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Activity / Action</th>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Case / Inv ID</th>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Status</th>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider">Time</th>
                     <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 tracking-wider text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                   {filteredActivities.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-sm font-bold text-slate-500">No detailed records match your filters.</td>
                      </tr>
                   ) : (
                     filteredActivities.map((act) => (
                       <tr key={act.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                         <td className="px-4 py-3 align-top">
                           <div className="flex flex-col gap-0.5">
                             <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{act.date}</span>
                             <span className="text-[10px] font-semibold text-slate-500">{act.time}</span>
                           </div>
                         </td>
                         <td className="px-4 py-3 align-top">
                           <div className="flex items-center gap-2">
                             <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${act.bg} ${act.color}`}><act.icon className="w-3 h-3" /></div>
                             <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{act.module}</span>
                           </div>
                         </td>
                         <td className="px-4 py-3 align-top">
                           <div className="flex flex-col gap-1">
                             <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">{act.name}</span>
                             <span className="text-[10px] font-semibold text-slate-500 line-clamp-1">{act.action}</span>
                           </div>
                         </td>
                         <td className="px-4 py-3 align-top">
                           <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded w-fit">{act.caseId}</span>
                             <span className="text-[10px] font-semibold text-slate-500">{act.invId}</span>
                           </div>
                         </td>
                         <td className="px-4 py-3 align-top">
                           <StatusBadge status={act.status} />
                         </td>
                         <td className="px-4 py-3 align-top">
                           <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{act.duration}</span>
                         </td>
                         <td className="px-4 py-3 align-top text-right">
                           <button onClick={() => setSelectedActivity(act)} className="text-[10px] font-bold text-blue-600 hover:text-white hover:bg-blue-600 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors">
                             View Details
                           </button>
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
             </div>
          </motion.div>


          {/* ======================================================== */}
          {/* ROW 3: Categories, Filters, Actions, Retention */}
          {/* ======================================================== */}
          
          {/* 6. Activity Categories */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-6 lg:col-span-4 xl:col-span-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-[15px] text-slate-800 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-900/40 text-teal-600 flex items-center justify-center text-xs">6</span> 
                Categories
              </h3>
            </div>
            
            <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-1">
              {mockCategories.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-2">
                    <cat.icon className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{cat.name}</span>
                  </div>
                  <span className="text-[11px] font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{cat.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 8. Timeline Filters & Search */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-12 lg:col-span-8 xl:col-span-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6">
             <h3 className="font-extrabold text-[15px] text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center text-xs">8</span> 
                Timeline Filters & Search
             </h3>
             
             <div className="flex flex-col gap-5">
               {/* Search Row */}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                 <div className="flex flex-col gap-1.5 md:col-span-2">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Search Activity</label>
                   <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input type="text" name="searchQuery" value={filters.searchQuery} onChange={handleFilterChange} placeholder="Search activity name..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 dark:text-white" />
                   </div>
                 </div>
                 <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Case ID</label>
                   <input type="text" name="searchCase" value={filters.searchCase} onChange={handleFilterChange} placeholder="e.g. CASE-102" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 dark:text-white" />
                 </div>
                 <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Record ID</label>
                   <input type="text" name="searchRecord" value={filters.searchRecord} onChange={handleFilterChange} placeholder="e.g. RPT-88" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 dark:text-white" />
                 </div>
               </div>

               {/* Filters Row */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Module</label>
                   <select name="module" value={filters.module} onChange={handleFilterChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300 appearance-none">
                     <option value="">All Modules</option>
                     <option value="Reports">Reports</option>
                     <option value="Digital Evidence">Digital Evidence</option>
                     <option value="CDR Investigation">CDR Investigation</option>
                     <option value="Case Management">Case Management</option>
                   </select>
                 </div>
                 <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Activity Type</label>
                   <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300 appearance-none">
                     <option value="">All Types</option>
                     <option value="Report Activity">Report Activity</option>
                     <option value="Evidence Activity">Evidence Activity</option>
                     <option value="Investigation Activity">Investigation Activity</option>
                     <option value="Data Activity">Data Activity</option>
                   </select>
                 </div>
                 <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Status</label>
                   <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300 appearance-none">
                     <option value="">All Status</option>
                     <option value="Success">Success</option>
                     <option value="Failed">Failed</option>
                     <option value="Pending">Pending</option>
                   </select>
                 </div>
                 <div className="flex flex-col justify-end">
                    <button onClick={handleResetFilters} className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs py-2.5 rounded-xl transition-colors border border-slate-200 dark:border-slate-700">
                      Reset Filters
                    </button>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* 9 & 10. Actions and Retention */}
          <div className="col-span-1 md:col-span-6 lg:col-span-12 xl:col-span-3 flex flex-col gap-6">
            
            {/* 9. Timeline Actions */}
            <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-5">
              <h3 className="font-extrabold text-[15px] text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-900/40 text-pink-600 flex items-center justify-center text-xs">9</span> 
                Timeline Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                 <button onClick={simulateRefresh} className="flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 dark:bg-slate-800/50 dark:hover:bg-blue-900/20 p-3 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors group">
                   <RefreshCw className={`w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-colors ${isLoading ? 'animate-spin' : ''}`} />
                   <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Refresh</span>
                 </button>
                 <button onClick={handleExport} className="flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800/50 dark:hover:bg-emerald-900/20 p-3 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors group">
                   <Download className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                   <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Export Timeline</span>
                 </button>
                 <button disabled className="col-span-2 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed">
                   <XCircle className="w-4 h-4 text-slate-400" />
                   <span className="text-[10px] font-bold text-slate-500">Historical Activity Cannot Be Edited/Deleted</span>
                 </button>
              </div>
            </motion.div>

            {/* 10. Timeline Retention */}
            <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-5">
              <h3 className="font-extrabold text-[15px] text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center text-xs border border-gray-200 dark:border-gray-700">10</span> 
                Retention Policy
              </h3>
              <div className="flex flex-col gap-2.5">
                 <div className="flex justify-between items-center text-xs">
                   <span className="font-semibold text-slate-500">Retention Period</span>
                   <span className="font-bold text-slate-800 dark:text-white">12 Months</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                   <span className="font-semibold text-slate-500">Records From</span>
                   <span className="font-bold text-slate-800 dark:text-white">10 Aug 2025</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                   <span className="font-semibold text-slate-500">Records Until</span>
                   <span className="font-bold text-slate-800 dark:text-white">10 Aug 2026</span>
                 </div>
                 <div className="h-px w-full bg-slate-200 dark:bg-slate-700 my-1"></div>
                 <div className="flex justify-between items-center text-xs">
                   <span className="font-semibold text-slate-500">Auto Cleanup</span>
                   <span className="font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">Enabled</span>
                 </div>
                 <div className="mt-2 text-[9px] font-medium text-slate-400 text-center flex items-start gap-1">
                    <ShieldAlert className="w-3 h-3 shrink-0 mt-0.5" />
                    Timeline data is automatically managed and retained according to organization policy.
                 </div>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* 7. Activity Details Modal */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0B1120] rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center shrink-0">
                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-sm">7</span> 
                  Activity Details
                </h2>
                <button 
                  onClick={() => setSelectedActivity(null)} 
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm text-slate-600 dark:text-slate-300 font-bold text-xs"
                >
                  <X className="w-4 h-4" /> Close
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start gap-5 mb-8 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-[24px] border border-slate-100 dark:border-slate-700/50">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${selectedActivity.bg} ${selectedActivity.color} border-${selectedActivity.color.replace('text-', '')}/30`}>
                    <selectedActivity.icon className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col flex-1 w-full">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{selectedActivity.name}</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {selectedActivity.date}, {selectedActivity.time}</span>
                      <StatusBadge status={selectedActivity.status} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Module Information */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2">Module Information</h4>
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Module Name</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedActivity.module}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Activity Type</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedActivity.type}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Action Performed</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedActivity.action}</span>
                      </div>
                    </div>
                  </div>

                  {/* Investigation Context */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2">Investigation Context</h4>
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Case ID</span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">{selectedActivity.caseId}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Investigation ID</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedActivity.invId}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Related Record ID</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedActivity.refId}</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Result */}
                  <div className="flex flex-col gap-4 md:col-span-2 mt-2">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2">Activity Result</h4>
                    
                    <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col gap-3">
                       <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Result Summary</span>
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{selectedActivity.result}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Description</span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">{selectedActivity.desc}</span>
                      </div>
                      <div className="flex items-center gap-8 mt-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                         <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-slate-500 uppercase">Time Taken</span>
                           <span className="text-sm font-black text-slate-800 dark:text-slate-200">{selectedActivity.duration}</span>
                         </div>
                         <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-slate-500 uppercase">Activity ID</span>
                           <span className="text-sm font-bold text-slate-500">{selectedActivity.id}</span>
                         </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

