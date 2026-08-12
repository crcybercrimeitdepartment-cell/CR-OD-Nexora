import React, { useState } from 'react';
import {
    ChevronLeft, ChevronRight, Eye, RefreshCcw, Search,
    Filter, Smartphone, Monitor, MapPin, Lock, AlertTriangle, Info,
    ShieldCheck, Clock, Building2, Calendar as CalendarIcon, Download,
    CheckCircle2, XCircle, Globe, User, Activity
} from 'lucide-react';

const MOCK_LOGINS = [
    { id: 'LOG-1001', date: '2024-08-10', time: '10:25 AM', status: 'Successful', deviceName: 'Suraj\'s Laptop', deviceType: 'Laptop', os: 'Windows 11', browser: 'Chrome 126.0', ip: '103.21.244.12', ipType: 'Public IP', location: 'Mumbai, India', method: '2FA Verified', authStatus: 'Authenticated', verifyStatus: 'Verified', reason: '-' },
    { id: 'LOG-1002', date: '2024-08-10', time: '09:57 AM', status: 'Failed', deviceName: 'Suraj\'s Mobile', deviceType: 'Mobile', os: 'Android 14', browser: 'NEXORA App 2.4.1', ip: '103.21.244.12', ipType: 'Public IP', location: 'Mumbai, India', method: 'Password', authStatus: 'Failed', verifyStatus: 'Pending', reason: 'Invalid Credentials' },
    { id: 'LOG-1003', date: '2024-08-10', time: '09:32 AM', status: 'Blocked', deviceName: 'Unknown Device', deviceType: 'Desktop', os: 'Windows 10', browser: 'Chrome 124.0', ip: '185.199.108.23', ipType: 'Public IP', location: 'New Delhi, India', method: 'Password', authStatus: 'Blocked', verifyStatus: 'Failed', reason: 'Unusual Login Activity' },
    { id: 'LOG-1004', date: '2024-08-09', time: '08:41 PM', status: 'Successful', deviceName: 'Suraj\'s Laptop', deviceType: 'Laptop', os: 'Windows 11', browser: 'Edge 126.0', ip: '103.21.244.12', ipType: 'Public IP', location: 'Mumbai, India', method: 'Password', authStatus: 'Authenticated', verifyStatus: 'Verified', reason: '-' },
    { id: 'LOG-1005', date: '2024-08-09', time: '06:15 PM', status: 'Session Expired', deviceName: 'Suraj\'s Mobile', deviceType: 'Mobile', os: 'iOS 17.5', browser: 'NEXORA App 2.4.1', ip: '103.21.244.12', ipType: 'Public IP', location: 'Mumbai, India', method: '2FA Verified', authStatus: 'Expired', verifyStatus: '-', reason: 'Session Timeout' },
    { id: 'LOG-1006', date: '2024-08-08', time: '11:20 AM', status: 'Successful', deviceName: 'Office Desktop', deviceType: 'Desktop', os: 'macOS 14', browser: 'Safari 17.0', ip: '202.164.39.11', ipType: 'Corporate IP', location: 'Bangalore, India', method: 'Organization SSO', authStatus: 'Authenticated', verifyStatus: 'Verified', reason: '-' },
    { id: 'LOG-1007', date: '2024-08-08', time: '10:05 AM', status: 'Failed', deviceName: 'Unknown Device', deviceType: 'Mobile', os: 'iOS 16', browser: 'Safari Mobile', ip: '45.22.19.102', ipType: 'VPN', location: 'London, UK', method: 'Password', authStatus: 'Failed', verifyStatus: 'Pending', reason: 'Authentication Failed' },
    { id: 'LOG-1008', date: '2024-08-07', time: '02:15 PM', status: 'Successful', deviceName: 'Suraj\'s Tablet', deviceType: 'Tablet', os: 'iPadOS 17', browser: 'Chrome 125.0', ip: '103.21.244.12', ipType: 'Public IP', location: 'Mumbai, India', method: 'Authenticator', authStatus: 'Authenticated', verifyStatus: 'Verified', reason: '-' },
    { id: 'LOG-1009', date: '2024-08-07', time: '01:45 PM', status: 'Failed', deviceName: 'Suraj\'s Tablet', deviceType: 'Tablet', os: 'iPadOS 17', browser: 'Chrome 125.0', ip: '103.21.244.12', ipType: 'Public IP', location: 'Mumbai, India', method: 'Authenticator', authStatus: 'Failed', verifyStatus: 'Failed', reason: 'Verification Failed' },
    { id: 'LOG-1010', date: '2024-08-06', time: '09:00 AM', status: 'Successful', deviceName: 'Office Desktop', deviceType: 'Desktop', os: 'macOS 14', browser: 'Safari 17.0', ip: '202.164.39.11', ipType: 'Corporate IP', location: 'Bangalore, India', method: 'Organization SSO', authStatus: 'Authenticated', verifyStatus: 'Verified', reason: '-' },
    { id: 'LOG-1011', date: '2024-08-05', time: '11:30 PM', status: 'Blocked', deviceName: 'Unknown Device', deviceType: 'Desktop', os: 'Linux', browser: 'Firefox 120.0', ip: '112.55.33.22', ipType: 'Proxy', location: 'Moscow, Russia', method: 'Password', authStatus: 'Blocked', verifyStatus: '-', reason: 'Account Locked' },
    { id: 'LOG-1012', date: '2024-08-05', time: '11:25 PM', status: 'Failed', deviceName: 'Unknown Device', deviceType: 'Desktop', os: 'Linux', browser: 'Firefox 120.0', ip: '112.55.33.22', ipType: 'Proxy', location: 'Moscow, Russia', method: 'Password', authStatus: 'Failed', verifyStatus: '-', reason: 'Invalid Credentials' },
    { id: 'LOG-1013', date: '2024-08-05', time: '11:20 PM', status: 'Failed', deviceName: 'Unknown Device', deviceType: 'Desktop', os: 'Linux', browser: 'Firefox 120.0', ip: '112.55.33.22', ipType: 'Proxy', location: 'Moscow, Russia', method: 'Password', authStatus: 'Failed', verifyStatus: '-', reason: 'Invalid Credentials' },
    { id: 'LOG-1014', date: '2024-08-04', time: '08:15 AM', status: 'Rejected', deviceName: 'Guest Laptop', deviceType: 'Laptop', os: 'Windows 10', browser: 'Edge', ip: '49.32.11.22', ipType: 'Public IP', location: 'Pune, India', method: 'Organization SSO', authStatus: 'Rejected', verifyStatus: '-', reason: 'Organization Access Restricted' },
    { id: 'LOG-1015', date: '2024-08-03', time: '04:45 PM', status: 'Successful', deviceName: 'Suraj\'s Laptop', deviceType: 'Laptop', os: 'Windows 11', browser: 'Chrome 126.0', ip: '103.21.244.12', ipType: 'Public IP', location: 'Mumbai, India', method: 'Other Configured Method', authStatus: 'Authenticated', verifyStatus: 'Verified', reason: '-' }
];

const StatusBadge = ({ status }) => {
    let colorClass = 'text-slate-700 bg-slate-100';
    if (status === 'Successful') colorClass = 'text-emerald-600 bg-emerald-50';
    if (status === 'Failed') colorClass = 'text-red-500 bg-red-50';
    if (status === 'Blocked') colorClass = 'text-orange-500 bg-orange-50';
    if (status === 'Session Expired') colorClass = 'text-indigo-500 bg-indigo-50';
    if (status === 'Rejected') colorClass = 'text-indigo-500 bg-indigo-50';

    return (
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${colorClass} whitespace-nowrap`}>
            {status}
        </span>
    );
};

const CardHeader = ({ title, rightContent }) => (
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-[#1e2a52]">{title}</h3>
        </div>
        {rightContent && <div>{rightContent}</div>}
    </div>
);

const KeyValueList = ({ icon: Icon, title, items }) => (
    <div className="mb-4 last:mb-0">
        <div className="flex items-center gap-1.5 mb-2">
            <Icon className="w-3.5 h-3.5 text-indigo-500" />
            <h4 className="text-[11px] font-bold text-indigo-900">{title}</h4>
        </div>
        <div className="space-y-1.5 ml-5">
            {items.map((item, idx) => (
                <div key={idx} className="flex text-[10px]">
                    <span className="text-slate-500 font-medium w-28 shrink-0">{item.label}</span>
                    <span className="text-slate-400 mx-2">:</span>
                    <span className="text-[#1e2a52] font-bold flex-1">{item.value}</span>
                </div>
            ))}
        </div>
    </div>
);

const ProgressBar = ({ color, percent }) => (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
);

export default function LoginHistory2({ onBack }) {
    const [logins, setLogins] = useState(MOCK_LOGINS);
    const [selectedLogin, setSelectedLogin] = useState(MOCK_LOGINS[0]);

    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        status: '',
        device: '',
        ipAddress: '',
        location: '',
        searchDeviceName: '',
        searchIp: '',
        searchDate: ''
    });

    const [expandedRowId, setExpandedRowId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    // Reset page to 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [logins]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const filtered = MOCK_LOGINS.filter(login => {
            const matchStatus = !filters.status || login.status === filters.status;
            const matchDevice = !filters.device || login.deviceType === filters.device;
            const matchIpFilter = !filters.ipAddress || login.ip.includes(filters.ipAddress);
            const matchLocation = !filters.location || login.location === filters.location;

            const matchSearchName = !filters.searchDeviceName || login.deviceName.toLowerCase().includes(filters.searchDeviceName.toLowerCase());
            const matchSearchIp = !filters.searchIp || login.ip.includes(filters.searchIp);
            const matchSearchDate = !filters.searchDate || login.date.includes(filters.searchDate);

            let matchDateFrom = true;
            let matchDateTo = true;
            if (filters.dateFrom) {
                matchDateFrom = new Date(login.date) >= new Date(filters.dateFrom);
            }
            if (filters.dateTo) {
                matchDateTo = new Date(login.date) <= new Date(filters.dateTo);
            }

            return matchStatus && matchDevice && matchIpFilter && matchLocation && matchSearchName && matchSearchIp && matchSearchDate && matchDateFrom && matchDateTo;
        });
        setLogins(filtered);
    };

    const resetFilters = () => {
        setFilters({
            dateFrom: '', dateTo: '', status: '', device: '', ipAddress: '', location: '', searchDeviceName: '', searchIp: '', searchDate: ''
        });
        setLogins(MOCK_LOGINS);
    };

    const removeFilter = (key) => {
        setFilters(prev => ({ ...prev, [key]: '' }));
    };

    // Auto-apply filters when removed from chips
    React.useEffect(() => {
        applyFilters();
    }, [filters]);

    const activeFilters = Object.entries(filters).filter(([k, v]) => v !== '');

    // -- DYNAMIC CALCULATIONS --
    const totalAttempts = logins.length;
    const successfulCount = logins.filter(l => l.status === 'Successful').length;
    const failedCount = logins.filter(l => l.status === 'Failed').length;
    const blockedCount = logins.filter(l => l.status === 'Blocked').length;
    const rejectedCount = logins.filter(l => l.status === 'Rejected').length;
    const expiredCount = logins.filter(l => l.status === 'Session Expired').length;

    const successfulPct = totalAttempts ? ((successfulCount / totalAttempts) * 100).toFixed(2) : 0;
    const failedPct = totalAttempts ? ((failedCount / totalAttempts) * 100).toFixed(2) : 0;
    const blockedPct = totalAttempts ? ((blockedCount / totalAttempts) * 100).toFixed(2) : 0;
    const rejectedPct = totalAttempts ? ((rejectedCount / totalAttempts) * 100).toFixed(2) : 0;
    const expiredPct = totalAttempts ? ((expiredCount / totalAttempts) * 100).toFixed(2) : 0;

    const lastSuccessful = [...logins].filter(l => l.status === 'Successful').sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))[0];
    const lastFailed = [...logins].filter(l => l.status === 'Failed').sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))[0];

    const methodsList = [
        { key: 'Password', icon: Lock, color: 'text-orange-500', bg: 'bg-orange-500', hoverBg: 'group-hover:bg-orange-600' },
        { key: '2FA Verified', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-500', hoverBg: 'group-hover:bg-blue-600' },
        { key: 'Authenticator', icon: Smartphone, color: 'text-indigo-500', bg: 'bg-indigo-500', hoverBg: 'group-hover:bg-indigo-600' },
        { key: 'Organization SSO', icon: Building2, color: 'text-indigo-500', bg: 'bg-indigo-500', hoverBg: 'group-hover:bg-indigo-600' },
        { key: 'Other Configured Method', icon: null, color: 'text-slate-400', bg: 'bg-slate-400', hoverBg: 'group-hover:bg-slate-500' }
    ];

    const methodStats = methodsList.map(m => {
        const count = logins.filter(l => l.method === m.key).length;
        const pct = totalAttempts ? ((count / totalAttempts) * 100).toFixed(2) : 0;
        return { ...m, count, pct };
    });

    const failedLogins = logins.filter(l => l.status !== 'Successful');
    const reasonsMap = failedLogins.reduce((acc, l) => {
        if (l.reason && l.reason !== '-') {
            acc[l.reason] = (acc[l.reason] || 0) + 1;
        }
        return acc;
    }, {});
    const failedReasons = Object.entries(reasonsMap)
        .map(([label, count]) => ({ label, count, pct: failedLogins.length ? ((count / failedLogins.length) * 100).toFixed(2) : 0 }))
        .sort((a, b) => b.count - a.count);

    const uniqueDevices = new Set(logins.map(l => l.deviceName)).size;
    const uniqueIPs = new Set(logins.map(l => l.ip)).size;
    const unusualLogins = logins.filter(l => l.reason === 'Unusual Login Activity').length;
    const verificationRequired = logins.filter(l => l.reason && l.reason.includes('Verification')).length;

    const allDates = logins.map(l => new Date(l.date));
    const oldestDate = allDates.length ? new Date(Math.min(...allDates)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
    const newestDate = allDates.length ? new Date(Math.max(...allDates)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

    const totalPages = Math.ceil(totalAttempts / entriesPerPage) || 1;
    const paginatedLogins = logins.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    return (
        <div className="w-full text-slate-800 font-sans bg-transparent min-h-screen relative">
            {/* Header */}
            <header className="py-2 sm:py-4 flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 sm:gap-4">
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
                    <div>
                        <h1 className="text-xl sm:text-3xl font-black text-[#1e2a52] uppercase tracking-wider">LOGIN HISTORY</h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">View and analyze all login attempts and security related information.</p>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="-mx-4 sm:-mx-6 md:-mx-10 min-h-screen pb-12 pt-6 px-4 sm:px-6 md:px-10">
                <div className="space-y-4 w-full max-w-[1920px] mx-auto">

                    {/* ROW 2: Filters & Search */}
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <CardHeader num="7" title="Login Filters & Search" />

                        <div className="border-t border-slate-100 pt-4 flex flex-col gap-4">
                            {/* Active Filters Chips */}
                            {activeFilters.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold text-slate-500 mr-1">Active Filters:</span>
                                    {activeFilters.map(([key, value]) => (
                                        <div key={key} className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full">
                                            <span>{key}: {value}</span>
                                            <button onClick={() => removeFilter(key)} className="hover:text-indigo-900 transition-colors">
                                                <XCircle className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ROW 1: Filters */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Date From</label>
                                    <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} className="w-full px-3 py-2 text-[11px] font-medium text-slate-700 bg-white/40 border border-white/40 backdrop-blur-sm shadow-[0_4px_12px_rgb(0,0,0,0.02)] rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300 transition-all cursor-pointer" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Date To</label>
                                    <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} className="w-full px-3 py-2 text-[11px] font-medium text-slate-700 bg-white/40 border border-white/40 backdrop-blur-sm shadow-[0_4px_12px_rgb(0,0,0,0.02)] rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300 transition-all cursor-pointer" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Login Status</label>
                                    <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full px-3 py-2 text-[11px] font-medium text-slate-700 bg-white/40 border border-white/40 backdrop-blur-sm shadow-[0_4px_12px_rgb(0,0,0,0.02)] rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300 transition-all appearance-none cursor-pointer">
                                        <option value="">All Status</option>
                                        <option value="Successful">Successful</option>
                                        <option value="Failed">Failed</option>
                                        <option value="Blocked">Blocked</option>
                                        <option value="Session Expired">Session Expired</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Device</label>
                                    <select name="device" value={filters.device} onChange={handleFilterChange} className="w-full px-3 py-2 text-[11px] font-medium text-slate-700 bg-white/40 border border-white/40 backdrop-blur-sm shadow-[0_4px_12px_rgb(0,0,0,0.02)] rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300 transition-all appearance-none cursor-pointer">
                                        <option value="">All Devices</option>
                                        <option value="Laptop">Laptop</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Desktop">Desktop</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">IP Address</label>
                                    <input type="text" name="ipAddress" value={filters.ipAddress} onChange={handleFilterChange} placeholder="Enter IP" className="w-full px-3 py-2 text-[11px] font-medium text-slate-700 bg-white/40 border border-white/40 backdrop-blur-sm shadow-[0_4px_12px_rgb(0,0,0,0.02)] rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300 transition-all" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Location</label>
                                    <select name="location" value={filters.location} onChange={handleFilterChange} className="w-full px-3 py-2 text-[11px] font-medium text-slate-700 bg-white/40 border border-white/40 backdrop-blur-sm shadow-[0_4px_12px_rgb(0,0,0,0.02)] rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300 transition-all appearance-none cursor-pointer">
                                        <option value="">All Locations</option>
                                        <option value="Mumbai, India">Mumbai, India</option>
                                        <option value="New Delhi, India">New Delhi, India</option>
                                    </select>
                                </div>
                            </div>

                            {/* ROW 2: Search */}
                            <fieldset className="border border-white/60 bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 mt-2">
                                <legend className="px-2 text-[11px] font-bold text-indigo-800 flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> Detailed Search</legend>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Device Name</label>
                                        <input type="text" name="searchDeviceName" value={filters.searchDeviceName} onChange={handleFilterChange} placeholder="Enter Device Name" className="w-full px-3 py-2 text-[11px] font-medium text-slate-700 bg-white/40 border border-white/40 backdrop-blur-sm shadow-[0_4px_12px_rgb(0,0,0,0.02)] rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300 transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Exact IP Address</label>
                                        <input type="text" name="searchIp" value={filters.searchIp} onChange={handleFilterChange} placeholder="Enter IP Address" className="w-full px-3 py-2 text-[11px] font-medium text-slate-700 bg-white/40 border border-white/40 backdrop-blur-sm shadow-[0_4px_12px_rgb(0,0,0,0.02)] rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300 transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Exact Date</label>
                                        <input type="date" name="searchDate" value={filters.searchDate} onChange={handleFilterChange} className="w-full px-3 py-2 text-[11px] font-medium text-slate-700 bg-white/40 border border-white/40 backdrop-blur-sm shadow-[0_4px_12px_rgb(0,0,0,0.02)] rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-indigo-300 transition-all cursor-pointer" />
                                    </div>
                                    <div className="flex items-center justify-end gap-3 mt-2 sm:mt-0">
                                        <button onClick={resetFilters} className="px-5 py-2 border border-white/60 bg-white/40 text-slate-700 rounded-lg text-[11px] font-bold hover:bg-white/60 transition-all shadow-sm">
                                            Reset
                                        </button>
                                        <button onClick={applyFilters} className="flex items-center justify-center gap-1.5 px-5 py-2 bg-indigo-600 text-white rounded-lg text-[11px] font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all w-full md:w-auto">
                                            <Filter className="w-3.5 h-3.5" fill="currentColor" /> Apply
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    {/* ROW 1: Overview, Records, Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                        {/* Card 1: Login Overview */}
                        <div className="lg:col-span-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <CardHeader num="1" title="Login Overview" />
                            <div className="border-t border-slate-100 pt-4 flex-1">
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Total Login Attempts */}
                                    <button onClick={() => setFilters(prev => ({ ...prev, status: '' }))} className="bg-white/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/70 cursor-pointer group border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div></div>
                                        </div>
                                        <span className="text-2xl font-black text-[#1e2a52]">{totalAttempts.toLocaleString()}</span>
                                        <span className="text-[10px] font-bold text-[#1e2a52] mt-1 leading-tight">Total Login<br />Attempts</span>
                                        <svg className="w-16 h-4 mt-2 text-blue-400 opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,15 Q15,5 30,10 T60,10 T100,5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    </button>
                                    {/* Successful Logins */}
                                    <button onClick={() => setFilters(prev => ({ ...prev, status: 'Successful' }))} className="bg-white/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/70 cursor-pointer group border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        </div>
                                        <span className="text-xl font-black text-[#1e2a52]">{successfulCount.toLocaleString()}</span>
                                        <span className="text-[10px] font-bold text-[#1e2a52] mt-1 leading-tight">Successful<br />Logins</span>
                                        <span className="text-[10px] font-bold text-emerald-500 mt-2">{successfulPct}%</span>
                                    </button>
                                    {/* Failed Logins */}
                                    <button onClick={() => setFilters(prev => ({ ...prev, status: 'Failed' }))} className="bg-white/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/70 cursor-pointer group border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mb-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </div>
                                        </div>
                                        <span className="text-xl font-black text-[#1e2a52]">{failedCount.toLocaleString()}</span>
                                        <span className="text-[10px] font-bold text-[#1e2a52] mt-1 leading-tight">Failed<br />Logins</span>
                                        <span className="text-[10px] font-bold text-red-500 mt-2">{failedPct}%</span>
                                    </button>
                                    {/* Blocked Attempts */}
                                    <button onClick={() => setFilters(prev => ({ ...prev, status: 'Blocked' }))} className="bg-white/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/70 cursor-pointer group border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            </div>
                                        </div>
                                        <span className="text-xl font-black text-[#1e2a52]">{blockedCount.toLocaleString()}</span>
                                        <span className="text-[10px] font-bold text-[#1e2a52] mt-1 leading-tight">Blocked Login<br />Attempts</span>
                                        <span className="text-[10px] font-bold text-orange-500 mt-2">{blockedPct}%</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-3">
                                    <div className="bg-white border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                                        <div className="flex items-start justify-center gap-1.5 mb-2">
                                            <div className="w-5 h-5 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0"><CalendarIcon className="w-3 h-3 text-emerald-600" /></div>
                                            <span className="text-[10px] font-bold text-[#1e2a52] leading-tight">Last Successful<br />Login</span>
                                        </div>
                                        <div className="text-[11px] font-bold text-[#1e2a52]">{lastSuccessful ? lastSuccessful.date : '-'}</div>
                                        <div className="text-[10px] font-medium text-[#1e2a52] mt-0.5">{lastSuccessful ? lastSuccessful.time : '-'}</div>
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
                                        <div className="flex items-start justify-center gap-1.5 mb-2">
                                            <div className="w-5 h-5 rounded bg-red-50 border border-red-100 flex items-center justify-center shrink-0"><CalendarIcon className="w-3 h-3 text-red-600" /></div>
                                            <span className="text-[10px] font-bold text-[#1e2a52] leading-tight">Last Failed Login</span>
                                        </div>
                                        <div className="text-[11px] font-bold text-[#1e2a52]">{lastFailed ? lastFailed.date : '-'}</div>
                                        <div className="text-[10px] font-medium text-[#1e2a52] mt-0.5">{lastFailed ? lastFailed.time : '-'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Login Records */}
                        <div className="lg:col-span-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <CardHeader num="2" title="Login Records" rightContent={
                                <button className="text-[10px] font-bold text-indigo-600 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">View All</button>
                            } />
                            <div className="border-t border-slate-100 pt-2 flex-1 flex flex-col">
                                <div className="flex-1 overflow-auto max-h-[380px]">
                                    <table className="w-full text-left whitespace-nowrap">
                                        <thead className="bg-white/40 backdrop-blur-sm sticky top-0 z-10">
                                            <tr className="border-b border-slate-200 text-[11px] text-[#1e2a52] font-black tracking-wider">
                                                <th className="py-3 px-2 w-8"></th>
                                                <th className="py-3 px-2">Date / Time</th>
                                                <th className="py-3 px-2">Status</th>
                                                <th className="py-3 px-2">Device Name</th>
                                                <th className="py-3 px-2">OS</th>
                                                <th className="py-3 px-2">IP Address</th>
                                                <th className="py-3 px-2">Location</th>
                                                <th className="py-3 px-2 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedLogins.map((log, idx) => (
                                                <React.Fragment key={idx}>
                                                    <tr className={`border-b border-slate-100 last:border-0 hover:bg-white/50 transition-colors cursor-pointer ${selectedLogin?.id === log.id ? 'bg-indigo-50/30' : 'bg-white/30 backdrop-blur-sm'}`} onClick={() => setSelectedLogin(log)}>
                                                        <td className="py-3 px-2 text-center" onClick={(e) => { e.stopPropagation(); setExpandedRowId(expandedRowId === log.id ? null : log.id); }}>
                                                            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                                <ChevronRight className={`w-4 h-4 transition-transform ${expandedRowId === log.id ? 'rotate-90' : ''}`} />
                                                            </button>
                                                        </td>
                                                        <td className="py-3 px-2">
                                                            <div className="text-[11px] font-semibold text-slate-700">{log.date}</div>
                                                            <div className="text-[10px] text-slate-500">{log.time}</div>
                                                        </td>
                                                        <td className="py-3 px-2"><StatusBadge status={log.status} /></td>
                                                        <td className="py-3 px-2 text-[11px] font-semibold text-slate-700">{log.deviceName}</td>
                                                        <td className="py-3 px-2 text-[11px] font-semibold text-slate-700">{log.os}</td>
                                                        <td className="py-3 px-2 text-[11px] font-semibold text-slate-700">{log.ip}</td>
                                                        <td className="py-3 px-2 text-[11px] font-semibold text-slate-700">{log.location}</td>
                                                        <td className="py-3 px-2 text-center">
                                                            <Eye className="w-4 h-4 inline-block text-slate-400 hover:text-indigo-600 transition-colors" />
                                                        </td>
                                                    </tr>
                                                    {expandedRowId === log.id && (
                                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                                            <td colSpan="8" className="px-10 py-4">
                                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                                    <div>
                                                                        <span className="text-[10px] font-bold text-slate-400 block mb-1">Device Type</span>
                                                                        <span className="text-[11px] font-semibold text-slate-700">{log.deviceType}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-[10px] font-bold text-slate-400 block mb-1">Browser / App</span>
                                                                        <span className="text-[11px] font-semibold text-slate-700">{log.browser}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-[10px] font-bold text-slate-400 block mb-1">IP Type</span>
                                                                        <span className="text-[11px] font-semibold text-slate-700">{log.ipType}</span>
                                                                    </div>
                                                                    {log.status !== 'Successful' && log.reason && log.reason !== '-' && (
                                                                        <div>
                                                                            <span className="text-[10px] font-bold text-slate-400 block mb-1">Failure Reason</span>
                                                                            <span className="text-[11px] font-bold text-red-500">{log.reason}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                                    <span className="text-xs font-semibold text-slate-500">Showing {totalAttempts === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, totalAttempts)} of {totalAttempts} entries</span>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent transition-colors disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-7 h-7 rounded flex items-center justify-center text-[11px] font-bold shadow-sm transition-colors ${currentPage === page ? 'bg-indigo-600 text-white' : 'text-[#1e2a52] hover:bg-slate-50 border border-slate-200'}`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent transition-colors disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Login Details */}
                        <div className="lg:col-span-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <CardHeader num="3" title="Login Details" rightContent={
                                <button className="text-[10px] font-bold text-indigo-600 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">View Full Details</button>
                            } />
                            <div className="border-t border-slate-100 pt-4 flex-1">
                                {selectedLogin ? (
                                    <div className="space-y-4">
                                        <KeyValueList icon={User} title="Login Information" items={[
                                            { label: 'Login Date', value: selectedLogin.date },
                                            { label: 'Login Time', value: selectedLogin.time },
                                            { label: 'Login Status', value: <StatusBadge status={selectedLogin.status} /> },
                                            { label: 'Login Method', value: selectedLogin.method },
                                        ]} />
                                        <KeyValueList icon={Smartphone} title="Device Information" items={[
                                            { label: 'Device Name', value: selectedLogin.deviceName },
                                            { label: 'Device Type', value: selectedLogin.deviceType },
                                            { label: 'Operating System', value: selectedLogin.os },
                                            { label: 'Browser / App', value: selectedLogin.browser },
                                        ]} />
                                        <KeyValueList icon={Globe} title="Network Information" items={[
                                            { label: 'IP Address', value: selectedLogin.ip },
                                            { label: 'IP Type', value: selectedLogin.ipType },
                                            { label: 'Location', value: selectedLogin.location },
                                        ]} />
                                        <KeyValueList icon={ShieldCheck} title="Security Information" items={[
                                            { label: 'Authentication Status', value: <span className={selectedLogin.authStatus === 'Authenticated' ? 'text-emerald-500 font-bold' : 'text-orange-500 font-bold'}>{selectedLogin.authStatus}</span> },
                                            { label: 'Verification Status', value: <span className={selectedLogin.verifyStatus === 'Verified' ? 'text-emerald-500 font-bold' : 'text-[#1e2a52] font-bold'}>{selectedLogin.verifyStatus}</span> },
                                            ...(selectedLogin.status !== 'Successful' && selectedLogin.reason && selectedLogin.reason !== '-'
                                                ? [{ label: 'Failure Reason', value: <span className="text-red-500 font-bold">{selectedLogin.reason}</span> }]
                                                : []
                                            )
                                        ]} />
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-xs text-slate-400 font-medium text-center p-4">Select a record</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ROW 3: Stats, Methods, Failed, Indicators, Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">

                        {/* Card 4: Login Status */}
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <CardHeader num="4" title="Login Status" />
                            <div className="border-t border-slate-100 pt-4 flex-1 flex flex-col items-center justify-center">

                                <div className="w-full space-y-3">
                                    <button onClick={() => setFilters(prev => ({ ...prev, status: 'Successful' }))} className="w-full flex justify-between items-center text-[10px] hover:bg-emerald-50/50 p-1.5 -mx-1.5 rounded-lg transition-all cursor-pointer">
                                        <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span className="font-bold text-[#1e2a52]">Successful</span></div>
                                        <div className="flex items-center gap-1"><span className="font-bold text-[#1e2a52]">{successfulCount}</span><span className="text-slate-400 font-medium">({successfulPct}%)</span></div>
                                    </button>
                                    <button onClick={() => setFilters(prev => ({ ...prev, status: 'Failed' }))} className="w-full flex justify-between items-center text-[10px] hover:bg-red-50/50 p-1.5 -mx-1.5 rounded-lg transition-all cursor-pointer">
                                        <div className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-500" /><span className="font-bold text-[#1e2a52]">Failed</span></div>
                                        <div className="flex items-center gap-1"><span className="font-bold text-[#1e2a52]">{failedCount}</span><span className="text-slate-400 font-medium">({failedPct}%)</span></div>
                                    </button>
                                    <button onClick={() => setFilters(prev => ({ ...prev, status: 'Blocked' }))} className="w-full flex justify-between items-center text-[10px] hover:bg-orange-50/50 p-1.5 -mx-1.5 rounded-lg transition-all cursor-pointer">
                                        <div className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-orange-500" /><span className="font-bold text-[#1e2a52]">Blocked</span></div>
                                        <div className="flex items-center gap-1"><span className="font-bold text-[#1e2a52]">{blockedCount}</span><span className="text-slate-400 font-medium">({blockedPct}%)</span></div>
                                    </button>
                                    <button onClick={() => setFilters(prev => ({ ...prev, status: 'Rejected' }))} className="w-full flex justify-between items-center text-[10px] hover:bg-indigo-50/50 p-1.5 -mx-1.5 rounded-lg transition-all cursor-pointer">
                                        <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-500 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div></div><span className="font-bold text-[#1e2a52]">Rejected</span></div>
                                        <div className="flex items-center gap-1"><span className="font-bold text-[#1e2a52]">{rejectedCount}</span><span className="text-slate-400 font-medium">({rejectedPct}%)</span></div>
                                    </button>
                                    <button onClick={() => setFilters(prev => ({ ...prev, status: 'Session Expired' }))} className="w-full flex justify-between items-center text-[10px] hover:bg-indigo-50/50 p-1.5 -mx-1.5 rounded-lg transition-all cursor-pointer">
                                        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-400" /><span className="font-bold text-[#1e2a52]">Session Expired</span></div>
                                        <div className="flex items-center gap-1"><span className="font-bold text-[#1e2a52]">{expiredCount}</span><span className="text-slate-400 font-medium">({expiredPct}%)</span></div>
                                    </button>
                                </div>

                                {/* Donut Chart */}
                                <div className="relative w-28 h-28 mt-6 mb-2">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        {successfulCount > 0 && <circle onClick={() => setFilters(prev => ({ ...prev, status: 'Successful' }))} className="cursor-pointer transition-all hover:stroke-[14px]" cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - successfulPct / 100)} />}
                                        {failedCount > 0 && <circle onClick={() => setFilters(prev => ({ ...prev, status: 'Failed' }))} className="cursor-pointer transition-all hover:stroke-[14px]" cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - failedPct / 100)} style={{ transformOrigin: '50% 50%', transform: `rotate(${successfulPct * 3.6}deg)` }} />}
                                        {blockedCount > 0 && <circle onClick={() => setFilters(prev => ({ ...prev, status: 'Blocked' }))} className="cursor-pointer transition-all hover:stroke-[14px]" cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - blockedPct / 100)} style={{ transformOrigin: '50% 50%', transform: `rotate(${(parseFloat(successfulPct) + parseFloat(failedPct)) * 3.6}deg)` }} />}
                                        {rejectedCount > 0 && <circle onClick={() => setFilters(prev => ({ ...prev, status: 'Rejected' }))} className="cursor-pointer transition-all hover:stroke-[14px]" cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - rejectedPct / 100)} style={{ transformOrigin: '50% 50%', transform: `rotate(${(parseFloat(successfulPct) + parseFloat(failedPct) + parseFloat(blockedPct)) * 3.6}deg)` }} />}
                                        {expiredCount > 0 && <circle onClick={() => setFilters(prev => ({ ...prev, status: 'Session Expired' }))} className="cursor-pointer transition-all hover:stroke-[14px]" cx="50" cy="50" r="40" fill="transparent" stroke="#818cf8" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - expiredPct / 100)} style={{ transformOrigin: '50% 50%', transform: `rotate(${(parseFloat(successfulPct) + parseFloat(failedPct) + parseFloat(blockedPct) + parseFloat(rejectedPct)) * 3.6}deg)` }} />}
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-[13px] font-black text-[#1e2a52]">{totalAttempts}</span>
                                        <span className="text-[8px] font-bold text-[#1e2a52] leading-tight text-center mt-0.5">Total Attempts</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 5: Login Method */}
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <CardHeader num="5" title="Login Method" />
                            <div className="border-t border-slate-100 pt-4 flex-1 flex flex-col gap-4">
                                {methodStats.map((method, idx) => (
                                    <button key={idx} className="w-full text-left hover:scale-[1.02] transition-transform cursor-pointer group p-1 -mx-1 rounded">
                                        <div className="flex justify-between items-center text-[10px] mb-1">
                                            <div className="flex items-center gap-2">
                                                {method.icon ? <method.icon className={`w-3.5 h-3.5 ${method.color}`} /> : <div className="w-3.5 h-3.5 flex items-center justify-center text-slate-400 text-xs font-bold tracking-widest">...</div>}
                                                <span className="font-bold text-[#1e2a52]">{method.key}</span>
                                            </div>
                                            <span className="font-bold text-[#1e2a52]">{method.count} <span className="text-slate-400 font-medium ml-0.5">({method.pct}%)</span></span>
                                        </div>
                                        <ProgressBar color={`${method.bg} ${method.hoverBg}`} percent={method.pct} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Card 6: Failed Login Info */}
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <CardHeader num="6" title="Failed Login Information" />
                            <div className="border-t border-slate-100 pt-4 flex-1 flex flex-col gap-3">
                                {failedReasons.length > 0 ? failedReasons.slice(0, 7).map((item, idx) => (
                                    <div key={idx} className={`flex justify-between items-center text-[10px] p-1.5 -mx-1.5 rounded-lg ${idx === 0 ? 'bg-indigo-50/70 border border-indigo-100/50 shadow-sm' : ''}`}>
                                        <div className="flex items-center gap-2">
                                            <div className={idx === 0 ? "text-indigo-600" : "text-red-500"}>
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                                            </div>
                                            <span className={`font-bold ${idx === 0 ? 'text-indigo-900' : 'text-[#1e2a52]'}`}>{item.label}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className={`text-[11px] font-black ${idx === 0 ? 'text-indigo-700' : 'text-[#1e2a52]'}`}>{item.count}</span>
                                            <span className="text-slate-400 font-medium w-10 text-right">({item.pct}%)</span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                        No failed login data available in current view.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Card 8: Security Indicators */}
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <CardHeader num="8" title="Login Security Indicators" />
                            <div className="border-t border-slate-100 pt-4 flex-1 flex flex-col justify-between gap-2">
                                <button onClick={() => setFilters(prev => ({ ...prev, searchDeviceName: '' }))} className="flex items-center justify-between group hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg cursor-pointer transition-colors text-left">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                                            <Monitor className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-bold text-[#1e2a52]">Unique Devices</div>
                                            <div className="text-[9px] font-medium text-[#1e2a52] opacity-70">Total unique devices logged</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-[#1e2a52]">{uniqueDevices}</span>
                                </button>
                                <button onClick={() => setFilters(prev => ({ ...prev, searchIp: '' }))} className="flex items-center justify-between group hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg cursor-pointer transition-colors text-left">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-100 transition-colors">
                                            <MapPin className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-bold text-[#1e2a52]">Unique IPs</div>
                                            <div className="text-[9px] font-medium text-[#1e2a52] opacity-70">Total unique IP addresses</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-[#1e2a52]">{uniqueIPs}</span>
                                </button>
                                <button onClick={() => setFilters(prev => ({ ...prev, status: 'Blocked' }))} className="flex items-center justify-between group hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg cursor-pointer transition-colors text-left">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 group-hover:bg-orange-100 transition-colors">
                                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-bold text-[#1e2a52]">Unusual Logins</div>
                                            <div className="text-[9px] font-medium text-[#1e2a52] opacity-70">Unusual activity detected</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-[#1e2a52]">{unusualLogins}</span>
                                </button>
                                <button onClick={() => setFilters(prev => ({ ...prev, status: 'Failed' }))} className="flex items-center justify-between group hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg cursor-pointer transition-colors text-left">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
                                            <ShieldCheck className="w-4 h-4 text-indigo-500" />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-bold text-[#1e2a52]">Verification Required</div>
                                            <div className="text-[9px] font-medium text-[#1e2a52] opacity-70">Additional verification needed</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-[#1e2a52]">{verificationRequired}</span>
                                </button>
                            </div>
                        </div>

                        {/* Card 9: History Actions */}
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <CardHeader num="9" title="Login History Actions" />
                            <div className="border-t border-slate-100 pt-4 flex-1 flex flex-col justify-between gap-3">
                                <button className="flex items-center gap-3 group text-left w-full">
                                    <div className="w-7 h-7 rounded-full bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center shrink-0 transition-colors">
                                        <Eye className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-indigo-800">View Details</div>
                                        <div className="text-[9px] font-medium text-[#1e2a52] opacity-70">View selected login details</div>
                                    </div>
                                </button>
                                <button className="flex items-center gap-3 group text-left w-full">
                                    <div className="w-7 h-7 rounded-full bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center shrink-0 transition-colors">
                                        <Search className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-indigo-800">Search</div>
                                        <div className="text-[9px] font-medium text-[#1e2a52] opacity-70">Search login history</div>
                                    </div>
                                </button>
                                <button className="flex items-center gap-3 group text-left w-full">
                                    <div className="w-7 h-7 rounded-full bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center shrink-0 transition-colors">
                                        <Filter className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-indigo-800">Filter</div>
                                        <div className="text-[9px] font-medium text-[#1e2a52] opacity-70">Filter login history</div>
                                    </div>
                                </button>
                                <button className="flex items-center gap-3 group text-left w-full">
                                    <div className="w-7 h-7 rounded-full bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center shrink-0 transition-colors">
                                        <RefreshCcw className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-indigo-800">Refresh</div>
                                        <div className="text-[9px] font-medium text-[#1e2a52] opacity-70">Refresh records</div>
                                    </div>
                                </button>
                                <button className="flex items-center gap-3 group text-left w-full">
                                    <div className="w-7 h-7 rounded-full bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center shrink-0 transition-colors">
                                        <Download className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-indigo-800">Export Login History</div>
                                        <div className="text-[9px] font-medium text-[#1e2a52] opacity-70">Export login history report</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ROW 4: Retention */}
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-5 flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-between">

                        <div className="w-full lg:w-auto">
                            <CardHeader num="10" title="Login History Retention" />
                            <div className="border-t border-slate-100 pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2"><CalendarIcon className="w-3.5 h-3.5 text-indigo-500" /><span className="font-bold text-[#1e2a52]">Retention Period</span></div>
                                        <span className="text-[#1e2a52] mx-2">:</span>
                                        <span className="font-bold text-[#1e2a52]">365 Days</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2"><CalendarIcon className="w-3.5 h-3.5 text-indigo-500" /><span className="font-bold text-[#1e2a52]">Records Available From</span></div>
                                        <span className="text-[#1e2a52] mx-2">:</span>
                                        <span className="font-bold text-[#1e2a52]">{oldestDate}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2"><CalendarIcon className="w-3.5 h-3.5 text-indigo-500" /><span className="font-bold text-[#1e2a52]">Records Available Until</span></div>
                                        <span className="text-[#1e2a52] mx-2">:</span>
                                        <span className="font-bold text-[#1e2a52]">{newestDate}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 md:border-l md:border-slate-100 md:pl-6">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-indigo-500" /><span className="font-bold text-[#1e2a52]">Automatic Cleanup Status</span></div>
                                        <span className="text-[#1e2a52] mx-2">:</span>
                                        <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Enabled</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] pt-4">
                                        <div className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-indigo-500" /><span className="font-bold text-[#1e2a52]">Retention Controlled By</span></div>
                                        <span className="text-[#1e2a52] mx-2">:</span>
                                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Organization/System Policy</span>
                                    </div>
                                </div>

                                <div className="md:border-l md:border-slate-100 md:pl-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full border border-indigo-200 flex items-center justify-center shrink-0">
                                        <Info className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div className="text-[10px] font-bold text-[#1e2a52]">
                                        Login history is retained as per organization policy.<br /><br />
                                        <span className="font-medium opacity-80">Users cannot clear or delete history manually.</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="shrink-0 w-32 h-32 hidden lg:flex items-center justify-center bg-indigo-50 rounded-full border border-indigo-100">
                            <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 text-indigo-500" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                                <path d="M12 7v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <path d="M12 13h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
