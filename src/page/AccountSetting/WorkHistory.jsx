import React, { useState } from 'react';
import {
  Zap, FileSearch, Grid, Filter, HardDrive,
  Briefcase, CheckSquare, Clock, AlertCircle, Clock4,
  Calendar, ChevronDown, MoreVertical, X, Search, RefreshCw, Download,
  Layers, Flag
} from 'lucide-react';

const workHistoryData = [
  { id: 'WRK-2041', title: 'CDR Evidence Analysis', type: 'Investigation', caseId: 'CASE-2041', invId: 'INV-1028', module: 'CDR Investigation', date: '08 Aug 2026', priority: 'High', status: 'In Progress', time: '2h 40m', lastActive: '10 Aug 11:42 AM', progress: 72 },
  { id: 'WRK-2038', title: 'Financial Record Verification', type: 'Verification', caseId: 'CASE-1987', invId: 'INV-1003', module: 'Financial Module', date: '07 Aug 2026', priority: 'Medium', status: 'Pending Review', time: '1h 20m', lastActive: '10 Aug 10:20 AM', progress: 90 },
  { id: 'WRK-2037', title: 'Location Analysis', type: 'Analysis', caseId: 'CASE-1966', invId: 'INV-0991', module: 'Location Intelligence', date: '06 Aug 2026', priority: 'High', status: 'In Progress', time: '3h 15m', lastActive: '10 Aug 09:15 AM', progress: 45 },
  { id: 'WRK-2032', title: 'Social Media Profiling', type: 'Investigation', caseId: 'CASE-1923', invId: 'INV-0944', module: 'OSINT', date: '04 Aug 2026', priority: 'Low', status: 'Completed', time: '2h 05m', lastActive: '09 Aug 06:30 PM', progress: 100 },
  { id: 'WRK-2030', title: 'Bank Statement Review', type: 'Verification', caseId: 'CASE-1890', invId: 'INV-0922', module: 'Financial Module', date: '03 Aug 2026', priority: 'Medium', status: 'On Hold', time: '45m', lastActive: '08 Aug 04:10 PM', progress: 30 },
  { id: 'WRK-2028', title: 'Vehicle Movement Analysis', type: 'Analysis', caseId: 'CASE-1850', invId: 'INV-0890', module: 'VI Module', date: '02 Aug 2026', priority: 'High', status: 'Completed', time: '1h 50m', lastActive: '07 Aug 11:30 AM', progress: 100 },
];

export default function AS11Page({ onBack }) {
  // Search and Input States
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI Interaction States
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [showAllActive, setShowAllActive] = useState(false);
  
  // Active Filter States
  const [activeStatusFilter, setActiveStatusFilter] = useState('All');
  const [activeDateFilter, setActiveDateFilter] = useState('All');
  const [activeModuleFilter, setActiveModuleFilter] = useState('All');
  const [activeTypeFilter, setActiveTypeFilter] = useState('All');
  const [activePriorityFilter, setActivePriorityFilter] = useState('All');

  // Dynamic Options
  const uniqueDates = ['All', ...new Set(workHistoryData.map(item => item.date))];
  const uniqueModules = ['All', ...new Set(workHistoryData.map(item => item.module))];
  const uniqueTypes = ['All', ...new Set(workHistoryData.map(item => item.type))];
  const uniquePriorities = ['All', ...new Set(workHistoryData.map(item => item.priority))];

  // Dynamic Aggregations
  const totalCount = workHistoryData.length;
  const inProgressCount = workHistoryData.filter(x => x.status === 'In Progress').length;
  const pendingCount = workHistoryData.filter(x => x.status === 'Pending Review').length;
  const completedCount = workHistoryData.filter(x => x.status === 'Completed').length;
  const onHoldCount = workHistoryData.filter(x => x.status === 'On Hold').length;
  const overdueCount = workHistoryData.filter(x => x.status === 'Overdue').length;
  const cancelledCount = workHistoryData.filter(x => x.status === 'Cancelled').length;

  const moduleStats = Object.values(workHistoryData.reduce((acc, work) => {
    if (!acc[work.module]) {
      acc[work.module] = { name: work.module, t: 0, a: 0, c: 0, time: work.time }; // mock time accumulation for now
    }
    acc[work.module].t++;
    if (work.status === 'In Progress' || work.status === 'Pending Review') acc[work.module].a++;
    if (work.status === 'Completed') acc[work.module].c++;
    return acc;
  }, {}));

  // Handle manual refresh simulation with a short timeout
  const handleRefresh = () => {
    setIsRefreshing(true);
    setSearchQuery('');
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Core data filtering logic applied to the work history table
  const filteredData = workHistoryData.filter(row => {
    // Check search query against multiple fields
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = row.id.toLowerCase().includes(query) ||
        row.title.toLowerCase().includes(query) ||
        row.caseId.toLowerCase().includes(query) ||
        row.invId.toLowerCase().includes(query) ||
        row.module.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Apply exact match dropdown filters
    if (activeStatusFilter !== 'All' && row.status !== activeStatusFilter) return false;
    if (activeDateFilter !== 'All' && row.date !== activeDateFilter) return false;
    if (activeModuleFilter !== 'All' && row.module !== activeModuleFilter) return false;
    if (activeTypeFilter !== 'All' && row.type !== activeTypeFilter) return false;
    if (activePriorityFilter !== 'All' && row.priority !== activePriorityFilter) return false;

    return true;
  });

  // Export filtered data to a CSV file format and trigger download
  const handleExport = () => {
    const headers = ['Work ID', 'Work Title', 'Work Type', 'Case ID', 'Investigation ID', 'Module', 'Assigned Date', 'Priority', 'Status', 'Time Spent', 'Last Activity'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row =>
        [row.id, `"${row.title}"`, row.type, row.caseId, row.invId, `"${row.module}"`, row.date, row.priority, row.status, row.time, `"${row.lastActive}"`].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'work_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPercentage = (count) => totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
  const inProgressPct = getPercentage(inProgressCount);
  const pendingPct = getPercentage(pendingCount);
  const completedPct = getPercentage(completedCount);
  const onHoldPct = getPercentage(onHoldCount);
  const overduePct = getPercentage(overdueCount);
  const cancelledPct = getPercentage(cancelledCount);

  let acc = 0;
  const inP = (acc += inProgressPct);
  const pen = (acc += pendingPct);
  const com = (acc += completedPct);
  const onH = (acc += onHoldPct);
  const ove = (acc += overduePct);

  const conicGradient = `conic-gradient(
    #00A350 0% ${inP}%,
    #FF8C00 ${inP}% ${pen}%,
    #3b82f6 ${pen}% ${com}%,
    #a855f7 ${com}% ${onH}%,
    #ef4444 ${onH}% ${ove}%,
    #9ca3af ${ove}% 100%
  )`;

  return (
    <div className="flex-1 flex flex-col w-full  bg-transparent pb-10">
      {/* Header and Back Button */}
      <div className="relative w-full pt-11 sm:pt-4 mb-4">
        {onBack && (
          <button onClick={onBack}
            className="absolute -top-2 left-1 sm:top-1 sm:left-3 md:left-4 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
          >
            <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Back</span>
          </button>
        )}
        <header className="w-full max-w-[1600px] mx-auto px-4 lg:px-6 relative pt-8 sm:pt-12 pb-2 sm:pb-3 select-none">
          <div className="flex items-start justify-start w-full relative z-20">
            <div className="flex-1 text-left flex flex-col items-start min-w-0">
              <h1 className="text-2xl sm:text-3xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
                <span>Work History</span>
              </h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base font-medium text-slate-600 max-w-2xl leading-relaxed">
                Track your assigned investigation work, actions and progress
              </p>
            </div>
          </div>
        </header>


      </div>

      {/* Main Dashboard Layout */}
      <div className={`flex flex-col gap-5 p-4 lg:p-6 mx-auto w-full max-w-[1600px] transition-all duration-300 ${isRefreshing ? 'opacity-40 pointer-events-none scale-[0.99] blur-[1px]' : 'opacity-100'}`}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* 1 Work Overview */}
          <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-[calc(17px*var(--text-scale,1))] font-bold text-[#1e2a52]">Work Overview</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {/* Total */}
            <div className="bg-white border border-gray-100 rounded-[14px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
              <div className="w-[38px] h-[38px] rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3.5">
                <Briefcase className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 mb-1.5 block">Total Work Items</span>
              <span className="text-[calc(26px*var(--text-scale,1))] font-black text-[#1e2a52] leading-none">{totalCount}</span>
            </div>
            {/* Active */}
            <div className="bg-white border border-gray-100 rounded-[14px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
              <div className="w-[38px] h-[38px] rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3.5">
                <Zap className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 mb-1.5 block">Active Work</span>
              <span className="text-[calc(26px*var(--text-scale,1))] font-black text-[#1e2a52] leading-none">{inProgressCount}</span>
            </div>
            {/* Completed */}
            <div className="bg-white border border-gray-100 rounded-[14px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
              <div className="w-[38px] h-[38px] rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-3.5">
                <CheckSquare className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 mb-1.5 block">Completed</span>
              <span className="text-[calc(26px*var(--text-scale,1))] font-black text-[#1e2a52] leading-none">{completedCount}</span>
            </div>
            {/* Pending */}
            <div className="bg-white border border-gray-100 rounded-[14px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
              <div className="w-[38px] h-[38px] rounded-xl bg-orange-50 text-orange-400 flex items-center justify-center mb-3.5">
                <Clock className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 mb-1.5 block">Pending Work</span>
              <span className="text-[calc(26px*var(--text-scale,1))] font-black text-[#1e2a52] leading-none">{pendingCount}</span>
            </div>
            {/* On Hold */}
            <div className="bg-white border border-gray-100 rounded-[14px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
              <div className="w-[38px] h-[38px] rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-3.5">
                <Clock4 className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 mb-1.5 block">On Hold</span>
              <span className="text-[calc(26px*var(--text-scale,1))] font-black text-[#1e2a52] leading-none">{onHoldCount}</span>
            </div>
            {/* Overdue */}
            <div className="bg-white border border-gray-100 rounded-[14px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
              <div className="w-[38px] h-[38px] rounded-xl bg-red-50 text-red-400 flex items-center justify-center mb-3.5">
                <AlertCircle className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 mb-1.5 block">Overdue Work</span>
              <span className="text-[calc(26px*var(--text-scale,1))] font-black text-[#1e2a52] leading-none">{overdueCount}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center"><FileSearch className="w-5 h-5" /></div>
              <div>
                <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 mb-0.5">Last Worked Item</div>
                <div className="text-[calc(14px*var(--text-scale,1))] font-black text-[#1e2a52]">{workHistoryData[0]?.title || 'No recent activity'}</div>
                <div className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-400 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {workHistoryData[0]?.lastActive || ''}</div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Clock4 className="w-5 h-5" /></div>
              <div>
                <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 mb-0.5">Total Active Work Time</div>
                <div className="text-2xl font-black text-[#1e2a52]">42h 18m</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Current / Active Work */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <h2 className="text-[calc(17px*var(--text-scale,1))] font-bold text-[#1e2a52]">Current / Active Work</h2>
            </div>
            <button
              onClick={() => setShowAllActive(!showAllActive)}
              className="text-[calc(12px*var(--text-scale,1))] font-bold text-blue-600 hover:underline">
              {showAllActive ? 'Show Less ←' : 'View All →'}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {workHistoryData.filter(item => item.status === 'In Progress' || item.status === 'Pending Review').slice(0, showAllActive ? undefined : 2).map((work, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm relative overflow-hidden flex flex-col gap-3">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${work.status === 'In Progress' ? 'bg-[#00A350]' : 'bg-[#FF8C00]'}`}></div>
                <div className="pl-3 flex justify-between items-start">
                  <div>
                    <h3 className="text-[calc(16px*var(--text-scale,1))] font-bold text-[#1e2a52]">{work.title}</h3>
                    <div className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500 mt-1">{work.id} - {work.caseId} - {work.module}</div>
                  </div>
                  <span className={`px-2 py-0.5 text-[calc(11px*var(--text-scale,1))] font-bold rounded-md border ${work.status === 'In Progress' ? 'bg-[#E8F8F0] text-[#00A350] border-[#C5EBD6]' : 'bg-[#FFF4E5] text-[#FF8C00] border-[#FFD9A3]'
                    }`}>
                    {work.status}
                  </span>
                </div>
                <div className="pl-3 flex items-center justify-between text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 mt-2">
                  <span>Assigned: <span className="text-gray-800">{work.date}</span></span>
                  <span>Priority: <span className={work.priority === 'High' ? 'text-red-500' : work.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'}>{work.priority}</span></span>
                  <span>Time Spent: <span className="text-gray-800">{work.time}</span></span>
                </div>
                <div className="pl-3 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full">
                    <div className={`h-full rounded-full ${work.status === 'In Progress' ? 'bg-[#00A350]' : 'bg-[#FF8C00]'}`} style={{ width: `${work.progress}%` }}></div>
                  </div>
                  <span className="text-[calc(11px*var(--text-scale,1))] font-black text-[#1e2a52]">{work.progress}%</span>
                </div>
                <div className="pl-2 flex justify-between items-center pt-2 border-t border-gray-100 mt-1">
                  <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-400">Last Activity: {work.lastActive}</span>
                  <button onClick={() => setSelectedWork(work)} className={`text-[calc(11px*var(--text-scale,1))] font-bold ${work.status === 'In Progress' ? 'text-[#00A350]' : 'text-[#FF8C00]'}`}>
                    Continue Work
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* 3 Work History */}
        <div id="work-history-table" className="w-full flex flex-col gap-3 mt-2 scroll-mt-24">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <h2 className="text-[calc(17px*var(--text-scale,1))] font-bold text-[#1e2a52] dark:text-white">Work History</h2>
            </div>
            <button
              onClick={() => document.getElementById('work-history-table')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[calc(12px*var(--text-scale,1))] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition-transform">
              View All →
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col p-4">

            <div className="overflow-x-auto border border-gray-100 rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Work ID</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Work Title</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Work Type</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Case ID</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Investigation ID</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Module</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Assigned Date</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Priority</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Status</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Time Spent</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">Last Activity</th>
                    <th className="px-3 py-2 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/60 dark:hover:bg-blue-900/10 transition-colors cursor-pointer group active:scale-[0.99]" onClick={() => setSelectedWork(row)}>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-700 dark:text-gray-300">{row.id}</td>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-700 dark:text-gray-300">{row.title}</td>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-700 dark:text-gray-300">{row.type}</td>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-700 dark:text-gray-300">{row.caseId}</td>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-700 dark:text-gray-300">{row.invId}</td>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-700 dark:text-gray-300">{row.module}</td>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-700 dark:text-gray-300">{row.date}</td>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-bold">
                        <span className={row.priority === 'High' ? 'text-red-500' : row.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'}>{row.priority}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 text-[calc(9px*var(--text-scale,1))] font-bold rounded border inline-flex ${row.status === 'In Progress' ? 'bg-green-50 text-green-700 border-green-200' :
                          row.status === 'Pending Review' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                            row.status === 'Completed' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                              'bg-purple-50 text-purple-600 border-purple-200'
                          }`}>{row.status}</span>
                      </td>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-700 dark:text-gray-300">{row.time}</td>
                      <td className="px-3 py-2 text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500 dark:text-gray-400">{row.lastActive}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={(e) => { e.stopPropagation(); setSelectedWork(row); }} className="px-2 py-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-all active:scale-95 shadow-sm">View Details</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4 Work Details */}
        {selectedWork && (
          <div className="w-full flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <h2 className="text-[calc(17px*var(--text-scale,1))] font-bold text-[#1e2a52]">Work Details</h2>
              </div>
              <button onClick={() => setSelectedWork(null)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[calc(18px*var(--text-scale,1))] font-black text-[#1e2a52] pr-2">{selectedWork.title}</h3>
                  <span className={`px-2 py-0.5 text-[calc(11px*var(--text-scale,1))] font-bold rounded-md border ${selectedWork.status === 'In Progress' ? 'bg-green-50 text-green-700 border-green-200' :
                      selectedWork.status === 'Pending Review' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                        selectedWork.status === 'Completed' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                    {selectedWork.status}
                  </span>
                </div>
                <div className="text-[calc(12px*var(--text-scale,1))] font-semibold text-gray-500 mt-1">{selectedWork.id}</div>

                {/* Tabs */}
                <div className="flex p-1 bg-white rounded-lg border border-gray-100 mt-5">
                  <button className="flex-1 py-2 text-[calc(12px*var(--text-scale,1))] font-bold bg-white text-blue-600 shadow-sm rounded-md border border-gray-200">Overview</button>
                  <button className="flex-1 py-2 text-[calc(12px*var(--text-scale,1))] font-bold text-gray-500 hover:text-gray-700">Activity</button>
                  <button className="flex-1 py-2 text-[calc(12px*var(--text-scale,1))] font-bold text-gray-500 hover:text-gray-700">Attachments</button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-5 flex-1 overflow-y-auto">

                {/* Work Information */}
                <div>
                  <h4 className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Work Information</h4>
                  <div className="flex justify-between text-[calc(11px*var(--text-scale,1))] mb-2">
                    <span className="text-gray-500 font-semibold">Work Type</span>
                    <span className="font-bold text-gray-800">{selectedWork.type}</span>
                  </div>
                  <div className="flex justify-between text-[calc(11px*var(--text-scale,1))]">
                    <span className="text-gray-500 font-semibold w-24">Description</span>
                    <span className="font-semibold text-gray-700 text-right">Detailed task execution for {selectedWork.title} related to {selectedWork.module}.</span>
                  </div>
                </div>

                {/* Investigation Context */}
                <div>
                  <h4 className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Investigation Context</h4>
                  <div className="flex justify-between text-[calc(11px*var(--text-scale,1))] mb-2">
                    <span className="text-gray-500 font-semibold">Case ID</span>
                    <span className="font-bold text-[#1e2a52]">{selectedWork.caseId}</span>
                  </div>
                  <div className="flex justify-between text-[calc(11px*var(--text-scale,1))] mb-2">
                    <span className="text-gray-500 font-semibold">Investigation ID</span>
                    <span className="font-bold text-[#1e2a52]">{selectedWork.invId}</span>
                  </div>
                  <div className="flex justify-between text-[calc(11px*var(--text-scale,1))] mb-2">
                    <span className="text-gray-500 font-semibold">Module</span>
                    <span className="font-bold text-gray-800">{selectedWork.module}</span>
                  </div>
                </div>

                {/* Assignment */}
                <div>
                  <h4 className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Assignment</h4>
                  <div className="flex justify-between items-center text-[calc(11px*var(--text-scale,1))] mb-2">
                    <span className="text-gray-500 font-semibold">Assigned By</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[calc(8px*var(--text-scale,1))] font-bold">RK</div>
                      <span className="font-bold text-gray-800">System Admin</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[calc(11px*var(--text-scale,1))] mb-2">
                    <span className="text-gray-500 font-semibold">Assigned To</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[calc(8px*var(--text-scale,1))] font-bold">U</div>
                      <span className="font-bold text-gray-800">You</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[calc(11px*var(--text-scale,1))] mb-2">
                    <span className="text-gray-500 font-semibold">Assigned Date</span>
                    <span className="font-bold text-gray-800">{selectedWork.date}</span>
                  </div>
                  <div className="flex justify-between text-[calc(11px*var(--text-scale,1))]">
                    <span className="text-gray-500 font-semibold">Priority</span>
                    <span className={`font-bold ${selectedWork.priority === 'High' ? 'text-red-500' : selectedWork.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'}`}>{selectedWork.priority}</span>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <h4 className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Progress</h4>
                  <div className="flex justify-between items-center text-[calc(11px*var(--text-scale,1))] mb-3">
                    <span className="text-gray-500 font-semibold">Current Status</span>
                    <span className="font-bold text-green-600">{selectedWork.status}</span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-[calc(10px*var(--text-scale,1))] font-bold mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-900">{selectedWork.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${selectedWork.progress || 0}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[calc(11px*var(--text-scale,1))]">
                    <span className="text-gray-500 font-semibold">Last Activity</span>
                    <span className="font-bold text-gray-800">{selectedWork.lastActive}</span>
                  </div>
                </div>

                {/* Time */}
                <div>
                  <h4 className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Time</h4>
                  <div className="flex justify-between text-[calc(11px*var(--text-scale,1))] mb-2">
                    <span className="text-gray-500 font-semibold">Total Work Time</span>
                    <span className="font-bold text-blue-600">{selectedWork.time}</span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="mt-2">
                  <h4 className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Actions</h4>
                  <div className="flex gap-2 mb-2">
                    <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[calc(11px*var(--text-scale,1))] font-bold rounded-lg shadow-sm transition-colors">
                      Open Work
                    </button>
                    {selectedWork.status !== 'Completed' && (
                      <button className="flex-1 py-2 bg-white border border-green-600 text-green-600 hover:bg-green-50 text-[calc(11px*var(--text-scale,1))] font-bold rounded-lg shadow-sm transition-colors">
                        Continue Work
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Row 3: Module, Activity, Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">

          {/* 5 Module-wise Work */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <h2 className="text-[calc(17px*var(--text-scale,1))] font-bold text-[#1e2a52]">Module-wise Work</h2>
              </div>
              <button
                onClick={() => document.getElementById('work-history-table')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[calc(12px*var(--text-scale,1))] font-bold text-blue-600 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-[280px] overflow-hidden">
              <table className="w-full text-left text-[calc(10px*var(--text-scale,1))]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-2 font-bold text-gray-500">Module Name</th>
                    <th className="pb-2 font-bold text-gray-500 text-center">Total</th>
                    <th className="pb-2 font-bold text-gray-500 text-center">Active</th>
                    <th className="pb-2 font-bold text-gray-500 text-center">Completed</th>
                    <th className="pb-2 font-bold text-gray-500 text-center">Time Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {moduleStats.map((m, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-2 font-bold text-gray-700 flex items-center gap-1.5"><Grid className="w-3 h-3 text-blue-500" />{m.name}</td>
                      <td className="py-2 font-bold text-gray-700 text-center">{m.t}</td>
                      <td className="py-2 font-bold text-green-600 text-center">{m.a}</td>
                      <td className="py-2 font-bold text-blue-600 text-center">{m.c}</td>
                      <td className="py-2 font-bold text-gray-500 text-center">{m.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6 Work Activity */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <h2 className="text-[calc(17px*var(--text-scale,1))] font-bold text-[#1e2a52] dark:text-white">Work Activity <span className="text-gray-500 dark:text-gray-400 font-normal drop-shadow-md">(CDR Evidence Analysis)</span></h2>
              </div>
              <button
                className="text-[calc(12px*var(--text-scale,1))] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer active:scale-95 transition-transform">
                View All →
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-[280px] overflow-hidden flex flex-col gap-3 relative">
              {[
                { time: '11:42 AM', title: 'Evidence Reviewed', desc: 'CDR Investigation • 18m', dot: 'bg-green-500', status: 'In Progress' },
                { time: '11:20 AM', title: 'Analysis Performed', desc: 'CDR Investigation • 22m', dot: 'bg-green-500', status: 'In Progress' },
                { time: '10:58 AM', title: 'Data Reviewed', desc: 'CDR Investigation • 15m', dot: 'bg-green-500', status: 'In Progress' },
                { time: '10:40 AM', title: 'Search Performed', desc: 'CDR Investigation • 12m', dot: 'bg-green-500', status: 'In Progress' },
                { time: '10:15 AM', title: 'Work Started', desc: 'CDR Investigation', dot: 'bg-blue-500', status: 'Started' }
              ].map((act, i) => (
                <div key={i} className="flex gap-3 relative z-10">
                  <div className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-500 w-12 text-right pt-0.5">{act.time}</div>
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${act.dot} border-2 border-white ring-2 ring-gray-50`}></div>
                  <div className="flex-1 flex justify-between items-start">
                    <div>
                      <div className="text-[calc(12px*var(--text-scale,1))] font-bold text-gray-800 leading-tight">{act.title}</div>
                      <div className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-400 mt-0.5">{act.desc}</div>
                    </div>
                    <div className={`text-[calc(10px*var(--text-scale,1))] font-bold ${act.status === 'Started' ? 'text-blue-500' : 'text-green-500'}`}>{act.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7 Work Status */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[calc(17px*var(--text-scale,1))] font-bold text-[#1e2a52]">Work Status</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-[280px] overflow-hidden flex flex-col justify-center items-center relative">
              <h3 className="absolute top-4 left-4 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500">Work Status Distribution</h3>
              <div className="flex items-center gap-6 mt-4 w-full justify-center">
                {/* Donut Chart Mockup */}
                <div className="w-32 h-32 rounded-full relative flex items-center justify-center" style={{ background: conicGradient }}>
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-black text-[#1e2a52] leading-none">{totalCount}</div>
                      <div className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
                {/* Legend */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[calc(11px*var(--text-scale,1))]"><div className="w-2 h-2 rounded-full bg-[#00A350]"></div><span className="font-bold text-gray-700 w-24">In Progress</span><span className="text-gray-500">{inProgressCount} ({inProgressPct}%)</span></div>
                  <div className="flex items-center gap-2 text-[calc(11px*var(--text-scale,1))]"><div className="w-2 h-2 rounded-full bg-[#FF8C00]"></div><span className="font-bold text-gray-700 w-24">Pending Review</span><span className="text-gray-500">{pendingCount} ({pendingPct}%)</span></div>
                  <div className="flex items-center gap-2 text-[calc(11px*var(--text-scale,1))]"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="font-bold text-gray-700 w-24">Completed</span><span className="text-gray-500">{completedCount} ({completedPct}%)</span></div>
                  <div className="flex items-center gap-2 text-[calc(11px*var(--text-scale,1))]"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="font-bold text-gray-700 w-24">On Hold</span><span className="text-gray-500">{onHoldCount} ({onHoldPct}%)</span></div>
                  <div className="flex items-center gap-2 text-[calc(11px*var(--text-scale,1))]"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="font-bold text-gray-700 w-24">Overdue</span><span className="text-gray-500">{overdueCount} ({overduePct}%)</span></div>
                  <div className="flex items-center gap-2 text-[calc(11px*var(--text-scale,1))]"><div className="w-2 h-2 rounded-full bg-gray-400"></div><span className="font-bold text-gray-700 w-24">Cancelled</span><span className="text-gray-500">{cancelledCount} ({cancelledPct}%)</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Row 4: Retention */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-[calc(17px*var(--text-scale,1))] font-bold text-[#1e2a52]">Work Retention</h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 xl:gap-16 w-full">
              <div>
                <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 mb-1">Retention Period</div>
                <div className="text-[calc(13px*var(--text-scale,1))] font-black text-[#1e2a52]">7 Years</div>
              </div>
              <div>
                <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 mb-1">Records Available From</div>
                <div className="text-[calc(13px*var(--text-scale,1))] font-black text-[#1e2a52]">10 Aug 2019</div>
              </div>
              <div>
                <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 mb-1">Records Available Until</div>
                <div className="text-[calc(13px*var(--text-scale,1))] font-black text-[#1e2a52]">Present</div>
              </div>
              <div>
                <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 mb-1">Automatic Retention Cleanup</div>
                <div className="text-[calc(13px*var(--text-scale,1))] font-bold text-green-600">Enabled</div>
              </div>
              <div>
                <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 mb-1">Retention Controlled By</div>
                <div className="text-[calc(13px*var(--text-scale,1))] font-black text-[#1e2a52]">Organization Policy</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
              <HardDrive className="w-5 h-5 text-blue-500" />
              <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-blue-800">Historical work records cannot be deleted or modified.<br />All work history is retained as per organization policy.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
