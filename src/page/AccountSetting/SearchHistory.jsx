import React, { useState, useMemo } from 'react';
import {
    BarChart2, Target, ShieldCheck, Bookmark, Clock, TrendingUp,
    Search, Filter, Calendar, ChevronLeft, ChevronRight, ChevronsLeft,
    Globe, Briefcase, FileText, User, Phone, Mail, Monitor, HardDrive, MapPin,
    CheckCircle, AlertCircle, XCircle, Slash, Lock, ShieldAlert,
    Eye, RefreshCw, Copy, SearchCode, Save, MoreVertical,
    Activity, Zap, Network, Archive, HelpCircle, FileSearch
} from 'lucide-react';

const MOCK_RECORDS = [
    { id: 1, dt: '10 Aug, 10:30 AM', dateObj: '2024-08-10', timeObj: '10:30 AM', q: '9876543210', type: 'Phone Search', mod: 'CDR', st: 'Completed', stC: 'text-green-700 bg-green-50 border-green-200', res: 24, invId: 'INV-2024-00045', caseId: 'CASE-1024', area: 'Call Detail Records', duration: '00:00:45' },
    { id: 2, dt: '10 Aug, 10:12 AM', dateObj: '2024-08-10', timeObj: '10:12 AM', q: '192.168.x.x', type: 'IP Address Search', mod: 'ITDR', st: 'Completed', stC: 'text-green-700 bg-green-50 border-green-200', res: 12, invId: 'INV-2024-00046', caseId: 'CASE-1025', area: 'Cyber Security', duration: '00:01:12' },
    { id: 3, dt: '09 Aug, 06:40 PM', dateObj: '2024-08-09', timeObj: '06:40 PM', q: 'Case-1024', type: 'Case Search', mod: 'Case Management', st: 'Completed', stC: 'text-green-700 bg-green-50 border-green-200', res: 8, invId: 'INV-2024-00045', caseId: 'CASE-1024', area: 'General Investigation', duration: '00:00:20' },
    { id: 4, dt: '09 Aug, 05:20 PM', dateObj: '2024-08-09', timeObj: '05:20 PM', q: 'john.doe@email.com', type: 'Email Search', mod: 'OSINT', st: 'No Results', stC: 'text-blue-700 bg-blue-50 border-blue-200', res: 0, invId: 'INV-2024-00047', caseId: 'CASE-1026', area: 'Open Source Intelligence', duration: '00:02:05' },
    { id: 5, dt: '09 Aug, 03:15 PM', dateObj: '2024-08-09', timeObj: '03:15 PM', q: '+91 98765 43210', type: 'Phone Search', mod: 'CDR', st: 'Completed', stC: 'text-green-700 bg-green-50 border-green-200', res: 32, invId: 'INV-2024-00048', caseId: 'CASE-1027', area: 'Call Detail Records', duration: '00:01:45' },
    { id: 6, dt: '08 Aug, 11:05 AM', dateObj: '2024-08-08', timeObj: '11:05 AM', q: 'Device-00123', type: 'Device Search', mod: 'ITDR', st: 'Failed', stC: 'text-red-700 bg-red-50 border-red-200', res: 0, invId: 'INV-2024-00049', caseId: 'CASE-1028', area: 'Hardware Forensics', duration: '00:00:10' },
    { id: 7, dt: '08 Aug, 09:45 AM', dateObj: '2024-08-08', timeObj: '09:45 AM', q: 'Location: Mumbai', type: 'Location Search', mod: 'LAR', st: 'Completed', stC: 'text-green-700 bg-green-50 border-green-200', res: 15, invId: 'INV-2024-00050', caseId: 'CASE-1029', area: 'Location Tracking', duration: '00:03:30' },
    { id: 8, dt: '07 Aug, 08:30 PM', dateObj: '2024-08-07', timeObj: '08:30 PM', q: 'Evidence-7788', type: 'Evidence Search', mod: 'Case Management', st: 'Cancelled', stC: 'text-orange-700 bg-orange-50 border-orange-200', res: 0, invId: 'INV-2024-00051', caseId: 'CASE-1030', area: 'Evidence Vault', duration: '00:00:05' },
    { id: 9, dt: '06 Aug, 10:00 AM', dateObj: '2024-08-06', timeObj: '10:00 AM', q: 'suspect_name', type: 'Person Search', mod: 'OSINT', st: 'Completed', stC: 'text-green-700 bg-green-50 border-green-200', res: 3, invId: 'INV-2024-00052', caseId: 'CASE-1031', area: 'Background Check', duration: '00:04:15' },
    { id: 10, dt: '06 Aug, 09:15 AM', dateObj: '2024-08-06', timeObj: '09:15 AM', q: 'passport_scan.pdf', type: 'Document Search', mod: 'Records', st: 'Restricted', stC: 'text-yellow-700 bg-yellow-50 border-yellow-200', res: 0, invId: 'INV-2024-00053', caseId: 'CASE-1032', area: 'Identity Verification', duration: '00:00:01' },
    { id: 11, dt: '05 Aug, 02:45 PM', dateObj: '2024-08-05', timeObj: '02:45 PM', q: '10.0.0.1', type: 'IP Address Search', mod: 'ITDR', st: 'Permission Denied', stC: 'text-purple-700 bg-purple-50 border-purple-200', res: 0, invId: 'INV-2024-00054', caseId: 'CASE-1033', area: 'Network Logs', duration: '00:00:00' },
    { id: 12, dt: '05 Aug, 11:20 AM', dateObj: '2024-08-05', timeObj: '11:20 AM', q: '9876543211', type: 'Phone Search', mod: 'CDR', st: 'Completed', stC: 'text-green-700 bg-green-50 border-green-200', res: 140, invId: 'INV-2024-00055', caseId: 'CASE-1034', area: 'Call Detail Records', duration: '00:02:10' }
];

const SEARCH_TYPES = [
    { id: 'Global Search', icon: Globe },
    { id: 'IP Address Search', icon: HardDrive },
    { id: 'Case Search', icon: Briefcase },
    { id: 'Device Search', icon: Monitor },
    { id: 'Investigation Search', icon: FileText },
    { id: 'Document Search', icon: FileText },
    { id: 'Person Search', icon: User },
    { id: 'Evidence Search', icon: ShieldCheck },
    { id: 'Phone Search', icon: Phone },
    { id: 'Location Search', icon: MapPin },
    { id: 'Email Search', icon: Mail },
    { id: 'Other Module Search', icon: Activity },
];

const STATUS_TYPES = [
    { id: 'Completed', icon: CheckCircle, color: 'text-green-500', desc: 'Search completed successfully' },
    { id: 'No Results', icon: Activity, color: 'text-blue-500', desc: 'Search completed - no results found' },
    { id: 'Failed', icon: XCircle, color: 'text-red-500', desc: 'Search failed due to system error' },
    { id: 'Cancelled', icon: Slash, color: 'text-orange-500', desc: 'Search was cancelled by user' },
    { id: 'Restricted', icon: AlertCircle, color: 'text-yellow-500', desc: 'Search restricted by system policy' },
    { id: 'Permission Denied', icon: Lock, color: 'text-purple-500', desc: "You don't have permission" },
];

export default function SearchHistory({ onBack, data = MOCK_RECORDS }) {
    const [records, setRecords] = React.useState(data);
    const [selectedRecord, setSelectedRecord] = React.useState(data[0] || null);

    React.useEffect(() => {
        setRecords(data);
        if (data.length > 0 && !selectedRecord) {
            setSelectedRecord(data[0]);
        }
    }, [data]);

    // Filters State
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [searchType, setSearchType] = useState('All Types');
    const [moduleFilter, setModuleFilter] = useState('All Modules');
    const [resultAvailability, setResultAvailability] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [caseId, setCaseId] = useState('');
    const [invId, setInvId] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;

    // Derived Data
    const filteredRecords = useMemo(() => {
        return records.filter(r => {
            if (searchType !== 'All Types' && r.type !== searchType) return false;
            if (moduleFilter !== 'All Modules' && r.mod !== moduleFilter) return false;
            if (statusFilter && r.st !== statusFilter) return false;
            if (resultAvailability === 'With Results' && r.res === 0) return false;
            if (resultAvailability === 'No Results' && r.res > 0) return false;
            if (searchQuery && !r.q.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (caseId && !r.caseId.toLowerCase().includes(caseId.toLowerCase())) return false;
            if (invId && !r.invId.toLowerCase().includes(invId.toLowerCase())) return false;

            if (fromDate && r.dateObj < fromDate) return false;
            if (toDate && r.dateObj > toDate) return false;

            return true;
        });
    }, [records, searchType, moduleFilter, statusFilter, resultAvailability, searchQuery, caseId, invId, fromDate, toDate]);

    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage) || 1;
    const paginatedRecords = filteredRecords.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    // Actions
    const handleReset = () => {
        setFromDate('');
        setToDate('');
        setSearchType('All Types');
        setModuleFilter('All Modules');
        setResultAvailability('All');
        setSearchQuery('');
        setCaseId('');
        setInvId('');
        setStatusFilter('');
        setCurrentPage(1);
    };

    const handleApplyFilters = () => {
        setCurrentPage(1);
    };

    const handleCopy = () => {
        if (selectedRecord?.q) {
            navigator.clipboard.writeText(selectedRecord.q);
            alert("Search query copied to clipboard!");
        }
    };

    const handleRunAgain = () => {
        if (selectedRecord?.q) {
            setSearchQuery(selectedRecord.q);
            setSearchType(selectedRecord.type || 'All Types');
            setModuleFilter(selectedRecord.mod || 'All Modules');
            setCurrentPage(1);
            setTimeout(() => document.getElementById('search-query-input')?.focus(), 100);
        }
    };

    const handleFocusSearch = () => {
        document.getElementById('search-query-input')?.focus();
    };

    const handleScrollToFilters = () => {
        document.getElementById('filters-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleViewDetails = () => {
        document.getElementById('search-details-section')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    // Overview Stats
    const totalSearches = 1248 + records.length;
    const todayStr = new Date().toISOString().split('T')[0];
    const todaySearches = records.filter(r => r.dateObj === todayStr).length;
    const typeCounts = records.reduce((acc, r) => { acc[r.type] = (acc[r.type] || 0) + 1; return acc; }, {});
    const mostUsedType = Object.keys(typeCounts).sort((a, b) => typeCounts[b] - typeCounts[a])[0] || 'None';
    const lastRecord = records.length > 0 ? records[0] : null;

    return (
        <div className=" text-slate-800 font-sans pb-12 w-full">
            {/* Header Area */}
            <header className="bg-transparent px-4 sm:px-6 md:px-10 py-3 sm:py-4 flex items-center gap-4 sticky top-0 z-50 transition-all duration-300">
                      {onBack && (
                          <button onClick={onBack}
                            className="text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm shrink-0"
                          >
                            <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            <span className="hidden sm:inline">Back</span>
                          </button>
                      )}
                <div className="flex flex-col items-start text-left">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-black text-[#1e2a52] uppercase tracking-wide flex items-center gap-2">
                        SEARCH HISTORY
                    </h1>
                    <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs md:text-sm text-slate-500 mt-0.5 leading-tight">Track and manage all your search activities</p>
                </div>
            </header>

            <div className="px-4 sm:px-6 mt-0 sm:mt-2 space-y-6 w-full max-w-[1920px] mx-auto pb-8">

                {/* Card 1 — Search Overview */}
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h2 className="text-sm font-bold text-[#1e2a52] uppercase tracking-wide">Quick Summary</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <BarChart2 className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
                        </div>
                        <div>
                            <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Total Searches</p>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">{totalSearches.toLocaleString()}</h3>
                            <p className="text-[calc(10px*var(--text-scale,1))] text-green-600 font-bold mt-1">↑ 18.6% <span className="text-slate-400 font-medium">vs last 7 days</span></p>
                        </div>
                    </div>

                    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default">
                        <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <Target className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" />
                        </div>
                        <div>
                            <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Searches</p>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">{todaySearches + 56}</h3>
                            <p className="text-[calc(10px*var(--text-scale,1))] text-green-600 font-bold mt-1">↑ 12.5% <span className="text-slate-400 font-medium">vs yesterday</span></p>
                        </div>
                    </div>

                    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <ShieldCheck className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                        </div>
                        <div>
                            <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Searches</p>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">120</h3>
                            <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-medium mt-1">Last 7 days</p>
                        </div>
                    </div>

                    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default">
                        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <Bookmark className="w-6 h-6 transition-transform duration-300 origin-top group-hover:-rotate-12 group-hover:scale-110" />
                        </div>
                        <div>
                            <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Saved Searches</p>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">18</h3>
                            <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-medium mt-1">Quick access</p>
                        </div>
                    </div>

                    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <Clock className="w-6 h-6 transition-transform duration-500 group-hover:-rotate-90 group-hover:scale-110" />
                        </div>
                        <div>
                            <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Last Search</p>
                            <h3 className="text-sm font-bold text-slate-800 leading-tight mt-1">{lastRecord ? lastRecord.dt : 'N/A'}</h3>
                            <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-medium mt-1">{lastRecord ? lastRecord.type : 'N/A'}</p>
                        </div>
                    </div>

                    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default">
                        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <TrendingUp className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110" />
                        </div>
                        <div>
                            <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Most Used Type</p>
                            <h3 className="text-sm font-bold text-slate-800 leading-tight mt-1 truncate">{mostUsedType}</h3>
                            <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-medium mt-1">32% of total searches</p>
                        </div>
                    </div>
                </div>

                {/* Row 2: Filters, Type, Status, Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Card 5 — Search Filters */}
                    <div id="filters-section" className="lg:col-span-5 xl:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-blue-600" />
                            <h2 className="text-sm font-bold text-[#1e2a52] uppercase tracking-wide">Search Filters</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                            <div className="col-span-1 sm:col-span-2">
                                <label className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#475569] mb-1.5 block tracking-wide">Date Range</label>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                    <div className="relative flex-1">
                                        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full px-3.5 py-2.5 text-[calc(11px*var(--text-scale,1))] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 transition-all shadow-sm cursor-pointer" />
                                    </div>
                                    <span className="text-xs font-medium text-slate-400 hidden sm:inline">to</span>
                                    <div className="relative flex-1">
                                        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-full px-3.5 py-2.5 text-[calc(11px*var(--text-scale,1))] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 transition-all shadow-sm cursor-pointer" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#475569] mb-1.5 block tracking-wide">Search Type</label>
                                <select value={searchType} onChange={e => setSearchType(e.target.value)} className="w-full px-3.5 py-2.5 text-[calc(11px*var(--text-scale,1))] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 transition-all shadow-sm appearance-none cursor-pointer">
                                    <option>All Types</option>
                                    {SEARCH_TYPES.map(t => <option key={t.id}>{t.id}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#475569] mb-1.5 block tracking-wide">Module</label>
                                <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)} className="w-full px-3.5 py-2.5 text-[calc(11px*var(--text-scale,1))] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 transition-all shadow-sm appearance-none cursor-pointer">
                                    <option>All Modules</option>
                                    <option>CDR</option>
                                    <option>ITDR</option>
                                    <option>Case Management</option>
                                    <option>OSINT</option>
                                    <option>LAR</option>
                                    <option>Records</option>
                                </select>
                            </div>

                            <div className="col-span-1 sm:col-span-2">
                                <label className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#475569] mb-1.5 block tracking-wide">Result Availability</label>
                                <select value={resultAvailability} onChange={e => setResultAvailability(e.target.value)} className="w-full px-3.5 py-2.5 text-[calc(11px*var(--text-scale,1))] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 transition-all shadow-sm appearance-none cursor-pointer">
                                    <option>All</option>
                                    <option>With Results</option>
                                    <option>No Results</option>
                                </select>
                            </div>

                            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#475569] mb-1.5 block tracking-wide">Search Query</label>
                                    <input id="search-query-input" type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search query..." className="w-full px-3.5 py-2.5 text-[calc(11px*var(--text-scale,1))] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 transition-all shadow-sm" />
                                </div>
                                <div>
                                    <label className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#475569] mb-1.5 block tracking-wide">Case ID</label>
                                    <input type="text" value={caseId} onChange={e => setCaseId(e.target.value)} placeholder="Enter Case ID" className="w-full px-3.5 py-2.5 text-[calc(11px*var(--text-scale,1))] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 transition-all shadow-sm" />
                                </div>
                                <div>
                                    <label className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#475569] mb-1.5 block tracking-wide">Investigation ID</label>
                                    <input type="text" value={invId} onChange={e => setInvId(e.target.value)} placeholder="Enter Inv ID" className="w-full px-3.5 py-2.5 text-[calc(11px*var(--text-scale,1))] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 transition-all shadow-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                            <button onClick={handleReset} className="w-full sm:flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-lg text-[calc(11px*var(--text-scale,1))] font-bold transition-all shadow-sm">
                                Reset
                            </button>
                            <button onClick={handleApplyFilters} className="w-full sm:flex-[2] bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 text-white py-2.5 rounded-lg text-[calc(11px*var(--text-scale,1))] font-bold transition-all flex justify-center items-center gap-1.5 shadow-md">
                                <Filter className="w-3.5 h-3.5" /> Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Card 4 — Search Type */}
                    <div className="lg:col-span-3 xl:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <Network className="w-5 h-5 text-blue-600" />
                            <h2 className="text-sm font-bold text-[#1e2a52] uppercase tracking-wide">Search Type</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 flex-1 overflow-y-auto">
                            {SEARCH_TYPES.map(t => {
                                const Icon = t.icon;
                                const isActive = searchType === t.id;
                                return (
                                    <button type="button"
                                        key={t.id}
                                        onClick={() => setSearchType(isActive ? 'All Types' : t.id)}
                                        className={`flex items-center gap-2 text-xs font-medium cursor-pointer w-full text-left p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 ${isActive ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} /> {t.id}
                                    </button>
                                );
                            })}
                        </div>

                    </div>

                    {/* Card 6 — Search Status & Card 7 — Actions */}
                    <div className="lg:col-span-4 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                        {/* Search Status */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="w-5 h-5 text-blue-600" />
                                <h2 className="text-sm font-bold text-[#1e2a52] uppercase tracking-wide">Search Status</h2>
                            </div>
                            <div className="space-y-3 flex-1 overflow-y-auto">
                                {STATUS_TYPES.map(s => {
                                    const Icon = s.icon;
                                    const isActive = statusFilter === s.id;
                                    return (
                                        <div
                                            key={s.id}
                                            onClick={() => setStatusFilter(isActive ? '' : s.id)}
                                            className={`flex gap-3 items-start p-1.5 -ml-1.5 rounded cursor-pointer transition-colors ${isActive ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                                        >
                                            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${s.color}`} />
                                            <div>
                                                <p className="text-xs font-bold text-slate-700">{s.id}</p>
                                                <p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">{s.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Search Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-blue-600" />
                                <h2 className="text-sm font-bold text-[#1e2a52] uppercase tracking-wide">Search Actions</h2>
                            </div>
                            <div className="space-y-3 flex-1 overflow-y-auto">
                                <button onClick={handleViewDetails} className="w-full text-left flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-50 active:scale-[0.98]">
                                    <Eye className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">View Search</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">View selected search details</p></div>
                                </button>
                                <button onClick={handleRunAgain} className="w-full text-left flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-50 active:scale-[0.98]">
                                    <RefreshCw className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Run Search Again</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Run the same search again</p></div>
                                </button>
                                <button onClick={handleCopy} className="w-full text-left flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-50 active:scale-[0.98]">
                                    <Copy className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Copy Search Query</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Copy search query to clipboard</p></div>
                                </button>
                                <button onClick={handleScrollToFilters} className="w-full text-left flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-50 active:scale-[0.98]">
                                    <Filter className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Filter</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Filter search history</p></div>
                                </button>
                                <button onClick={handleFocusSearch} className="w-full text-left flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-50 active:scale-[0.98]">
                                    <SearchCode className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Search</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Search in history</p></div>
                                </button>
                                <button className="w-full text-left flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-50 active:scale-[0.98]">
                                    <Save className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Save Search</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Save current search</p></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 3: Records, Details, Context */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Card 2 — Search Records */}
                    <div className="lg:col-span-12 xl:col-span-7 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <h2 className="text-sm font-bold text-[#1e2a52] uppercase tracking-wide">Search Records</h2>
                            </div>
                        </div>

                        <div className="overflow-x-auto min-h-[300px] pb-3">
                            <table className="w-full text-left text-xs whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-500 font-bold">
                                        <th className="py-2.5 px-2">Date & Time</th>
                                        <th className="py-2.5 px-2">Search Query</th>
                                        <th className="py-2.5 px-2">Search Type</th>
                                        <th className="py-2.5 px-2">Module</th>
                                        <th className="py-2.5 px-2">Status</th>
                                        <th className="py-2.5 px-2 text-center">Results</th>
                                        <th className="py-2.5 px-2 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedRecords.length > 0 ? paginatedRecords.map((row, i) => {
                                        const isSelected = selectedRecord?.id === row.id;
                                        return (
                                            <tr key={i} tabIndex={0} onKeyDown={(e) => { if(e.key==='Enter') setSelectedRecord(row); }} className={`border-b border-slate-100 font-medium transition-all duration-200 cursor-pointer group ${isSelected ? 'bg-blue-50/60 shadow-[inset_4px_0_0_0_#2563eb]' : 'hover:bg-slate-50 text-slate-700 hover:-translate-y-[1px] hover:shadow-sm'}`} onClick={() => setSelectedRecord(row)}>
                                                <td className="py-2.5 px-2">{row.dt}</td>
                                                <td className="py-2.5 px-2">{row.q}</td>
                                                <td className="py-2.5 px-2">{row.type}</td>
                                                <td className="py-2.5 px-2">{row.mod}</td>
                                                <td className="py-2.5 px-2">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[calc(10px*var(--text-scale,1))] font-bold ${row.stC}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${row.stC.includes('green') ? 'bg-green-500' : row.stC.includes('red') ? 'bg-red-500' : row.stC.includes('blue') ? 'bg-blue-500' : row.stC.includes('orange') ? 'bg-orange-500' : row.stC.includes('yellow') ? 'bg-yellow-500' : 'bg-purple-500'}`} />
        {row.st}
    </span>
                                                </td>
                                                <td className="py-2.5 px-2 text-center">{row.res}</td>
                                                <td className="py-2.5 px-2 text-center flex items-center justify-center gap-2">
<button tabIndex={0} onClick={(e) => { e.stopPropagation(); setSelectedRecord(row); handleViewDetails(); }} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95 ${isSelected ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 opacity-0 group-hover:opacity-100 focus:opacity-100'}`}>View</button>
</td>
</tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <Search className="w-8 h-8 text-slate-300" />
                                                    <p>No search records found matching the criteria.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-between mt-6 pt-5 border-t border-slate-100 gap-4">
                            <span className="text-[calc(11px*var(--text-scale,1))] text-slate-500 font-medium text-center sm:text-left">Showing {filteredRecords.length > 0 ? (currentPage - 1) * recordsPerPage + 1 : 0} to {Math.min(currentPage * recordsPerPage, filteredRecords.length)} of {filteredRecords.length} records</span>
                            <div className="flex items-center gap-2 text-xs">
                                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50 transition-colors"><ChevronsLeft className="w-4 h-4" /></button>
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button 
                                        key={page} 
                                        onClick={() => setCurrentPage(page)} 
                                        className={`w-7 h-7 rounded flex items-center justify-center text-[calc(11px*var(--text-scale,1))] font-bold shadow-sm transition-colors ${currentPage === page ? 'bg-indigo-600 text-white' : 'text-[#1e2a52] hover:bg-slate-50 border border-slate-200'}`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="w-7 h-7 flex items-center justify-center rounded border border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 — Search Details */}
                    <div id="search-details-section" className="lg:col-span-6 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <FileSearch className="w-5 h-5 text-blue-600" />
                                <h2 className="text-sm font-bold text-[#1e2a52] uppercase tracking-wide">Search Details</h2>
                            </div>
                            {selectedRecord && (
                                <span className={`px-2 py-0.5 rounded-full border text-[calc(10px*var(--text-scale,1))] font-bold ${selectedRecord.stC}`}>{selectedRecord.st}</span>
                            )}
                        </div>

                        {selectedRecord ? (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-800 mb-2">Search Information</h3>
                                    <div className="space-y-1.5 text-xs">
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Search Query</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.q}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Search Date</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.dateObj}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Search Time</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.timeObj}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Search Type</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.type}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Search Status</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.st}</span></div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-3">
                                    <h3 className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-800 mb-2">Module Information</h3>
                                    <div className="space-y-1.5 text-xs">
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Module Name</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.mod}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Investigation Area</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.area}</span></div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-3">
                                    <h3 className="text-[calc(11px*var(--text-scale,1))] font-bold text-slate-800 mb-2">Result Information</h3>
                                    <div className="space-y-1.5 text-xs">
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Result Count</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.res}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Search Completed</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.res > 0 ? 'Yes' : 'No'}</span></div>
                                        <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Search Duration</span> <span className="font-medium text-slate-700 truncate text-right">{selectedRecord.duration}</span></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-48 flex items-center justify-center text-slate-400 text-xs text-center px-4">
                                Select a record to view its details.
                            </div>
                        )}

                        <button onClick={handleRunAgain} className="mt-5 w-full py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 shadow-sm hover:shadow-md group">
                            <Eye className="w-4 h-4 transition-transform group-hover:scale-110" /> View Full Results
                        </button>
                    </div>

                    {/* Card 8 — Search Context */}
                    <div className="lg:col-span-6 xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Network className="w-5 h-5 text-blue-600" />
                            <h2 className="text-sm font-bold text-[#1e2a52] uppercase tracking-wide">Search Context</h2>
                        </div>

                        {selectedRecord ? (
                            <div className="space-y-3 mt-4">
                                <div tabIndex={0} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"><ShieldAlert className="w-3.5 h-3.5" /></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-bold uppercase tracking-wider">Investigation ID</p>
                                        <p className="text-xs font-semibold text-slate-700 truncate">{selectedRecord.invId}</p>
                                    </div>
                                </div>
                                <div tabIndex={0} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"><Briefcase className="w-3.5 h-3.5" /></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-bold uppercase tracking-wider">Case ID</p>
                                        <p className="text-xs font-semibold text-slate-700 truncate">{selectedRecord.caseId}</p>
                                    </div>
                                </div>
                                <div tabIndex={0} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"><HardDrive className="w-3.5 h-3.5" /></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-bold uppercase tracking-wider">Module</p>
                                        <p className="text-xs font-semibold text-slate-700 truncate">{selectedRecord.mod}</p>
                                    </div>
                                </div>
                                <div tabIndex={0} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"><FileText className="w-3.5 h-3.5" /></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-bold uppercase tracking-wider">Search Type</p>
                                        <p className="text-xs font-semibold text-slate-700 truncate">{selectedRecord.type}</p>
                                    </div>
                                </div>
                                <div tabIndex={0} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"><Eye className="w-3.5 h-3.5" /></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-bold uppercase tracking-wider">Search Query</p>
                                        <p className="text-xs font-semibold text-slate-700 truncate">{selectedRecord.q}</p>
                                    </div>
                                </div>
                                <div tabIndex={0} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"><Calendar className="w-3.5 h-3.5" /></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-bold uppercase tracking-wider">Search Date & Time</p>
                                        <p className="text-xs font-semibold text-slate-700 truncate">{selectedRecord.dt}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-48 flex items-center justify-center text-slate-400 text-xs text-center px-4 mt-4">
                                Context data unavailable.
                            </div>
                        )}
                    </div>
                </div>

                {/* Card 9 — Search History Retention */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-4 transition-all hover:shadow-md group">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Archive className="w-5 h-5" />
                        </div>
                        <h2 className="text-base font-black text-[#1e2a52] uppercase tracking-wide">Search History Retention</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        <div className="flex gap-4 items-center group-hover:translate-x-1 transition-transform">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[calc(10px*var(--text-scale,1))] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Retention Period</p>
                                <p className="text-lg font-black text-slate-700 leading-tight">180 Days</p>
                                <p className="text-[calc(10px*var(--text-scale,1))] text-slate-400 font-medium">(6 Months)</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center sm:border-l border-slate-100 sm:pl-6 md:pl-8 group-hover:translate-x-1 transition-transform">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[calc(10px*var(--text-scale,1))] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Available From</p>
                                <p className="text-base font-bold text-slate-700 mt-0.5">11 Feb, 2024</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center sm:border-l border-slate-100 sm:pl-6 md:pl-8 group-hover:translate-x-1 transition-transform">
                            <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 shrink-0">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[calc(10px*var(--text-scale,1))] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Available Until</p>
                                <p className="text-base font-bold text-slate-700 mt-0.5">10 Aug, 2024</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center sm:border-l border-slate-100 sm:pl-6 md:pl-8 group-hover:translate-x-1 transition-transform">
                            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[calc(10px*var(--text-scale,1))] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Cleanup Status</p>
                                <p className="text-base font-bold text-green-600 mt-0.5">Enabled</p>
                                <p className="text-[calc(10px*var(--text-scale,1))] text-slate-400 font-medium">Auto cleanup after 180 days</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 rounded-xl flex gap-4 items-start border border-purple-100/50">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-purple-500 shrink-0 shadow-sm">
                            <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-700 mb-0.5">System Policy Note</p>
                            <p className="text-[calc(11px*var(--text-scale,1))] text-slate-500 font-medium leading-relaxed">Search history is automatically managed by system policy. Manual deletion is not allowed to maintain audit and investigation integrity.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
