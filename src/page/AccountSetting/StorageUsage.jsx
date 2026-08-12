import React, { useState, useEffect } from 'react';
import {
    Database, HardDrive, Server, Layers, Shield, FileText, Images, Video, Music,
    File, FileSpreadsheet, Archive, CheckCircle2, AlertTriangle, AlertCircle, Info,
    Eye, Download, RefreshCw, Box, Calendar, LayoutList, CheckCircle, Activity,
    TrendingUp, ShieldAlert, ChevronLeft
} from 'lucide-react';

const formatGB = (num) => typeof num === 'number' ? `${num} GB` : num;
const formatNum = (num) => typeof num === 'number' ? num.toLocaleString() : num;

const DEFAULT_DATA = {
    overview: {
        total: 500, // GB
        used: 325, // GB
        status: 'Normal',
        lastUpdated: '10 Aug, 2024 10:30 AM'
    },
    usageBreakdown: [
        { category: 'Digital Evidence', used: 180, count: 6240 },
        { category: 'Documents', used: 60, count: 2150 },
        { category: 'Case Data', used: 40, count: 1250 },
        { category: 'Reports', used: 25, count: 850 },
        { category: 'Attachments', used: 20, count: 1150 },
        { category: 'Exported Files', used: 10, count: 560 },
        { category: 'Other Authorized Data', used: 5, count: 250 },
    ],
    moduleStorage: [
        { module: 'Digital Evidence', used: 180, files: 6240, records: 8750 },
        { module: 'CDR Investigation', used: 25, files: 1420, records: 3150 },
        { module: 'Case Management', used: 40, files: 1850, records: 2950 },
        { module: 'Reports', used: 25, files: 850, records: 1250 },
        { module: 'OSINT', used: 15, files: 620, records: 980 },
        { module: 'ITDR', used: 10, files: 430, records: 650 },
        { module: 'Other Modules', used: 30, files: 1040, records: 1720 },
    ],
    fileStats: {
        documents: 4200,
        images: 3800,
        videos: 1250,
        audio: 2100,
        pdf: 950,
        spreadsheets: 150,
        others: 'Extracted'
    },
    fileTypes: [
        { type: 'PDF Files', count: 2100, used: 55 },
        { type: 'Images', count: 3800, used: 120 },
        { type: 'Videos', count: 1250, used: 90 },
        { type: 'Audio Files', count: 2100, used: 35 },
        { type: 'Documents', count: 4200, used: 15 },
        { type: 'Spreadsheets', count: 450, used: 5 },
        { type: 'Archives', count: 300, used: 3 },
        { type: 'Other Files', count: 250, used: 2 },
    ],
    alerts: [
        { type: 'Warning', title: 'Storage Warning', desc: 'Storage usage is at 85%.', time: 'Today, 10:20 AM', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
        { type: 'Warning', title: 'Large File Alert', desc: 'File size exceeds 2 GB', time: 'Today, 09:15 AM', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
        { type: 'Limit', title: 'Storage Limit Reached', desc: '75 GB storage remaining', time: 'Yesterday, 06:30 PM', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
        { type: 'Info', title: 'Storage Allocation Changed', desc: 'Storage increased by 100 GB', time: '08 Aug, 2024', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
        { type: 'Critical', title: 'Storage Critical Alert', desc: 'Storage usage is at 95%.', time: '07 Aug, 2024', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' }
    ],
    activities: [
        { date: '10 Aug, 2024', time: '10:30 AM', activity: 'File Uploaded', module: 'Digital Evidence', change: '+2.45 GB', changeColor: 'text-green-600', ref: 'INV-2024-00045 / Suraj Nayak' },
        { date: '10 Aug, 2024', time: '10:15 AM', activity: 'File Added', module: 'CDR Investigation', change: '+1.20 GB', changeColor: 'text-green-600', ref: 'INV-2024-00044 / Suraj Nayak' },
        { date: '10 Aug, 2024', time: '09:45 AM', activity: 'File Updated', module: 'Case Management', change: '+450 MB', changeColor: 'text-green-600', ref: 'CASE-1024 / Suraj Nayak' },
        { date: '09 Aug, 2024', time: '09:30 AM', activity: 'File Exported', module: 'Reports', change: '-780 MB', changeColor: 'text-red-500', ref: 'RPT-2024-00045 / Suraj Nayak' },
        { date: '09 Aug, 2024', time: '06:20 PM', activity: 'File Deleted', module: 'Digital Evidence', change: '-1.15 GB', changeColor: 'text-red-500', ref: 'INV-2024-00043 / System' },
        { date: '09 Aug, 2024', time: '05:10 PM', activity: 'File Restored', module: 'Case Management', change: '+890 MB', changeColor: 'text-green-600', ref: 'CASE-1023 / Suraj Nayak' },
        { date: '09 Aug, 2024', time: '04:45 PM', activity: 'Storage Increased', module: 'System', change: '+100 GB', changeColor: 'text-blue-600', ref: 'Admin / System' },
        { date: '08 Aug, 2024', time: '11:30 AM', activity: 'Storage Decreased', module: 'System', change: '-50 GB', changeColor: 'text-slate-600', ref: 'Admin / System' },
    ],
    policy: {
        policy: 'Standard Enterprise',
        retention: '5 Years',
        maxSize: '5 GB',
        allowedTypes: 'All Supported Types'
    }
};

const CardHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
        <Icon className="w-5 h-5 text-blue-600" />
        <h2 className="text-sm font-bold text-[#1e2a52] uppercase tracking-wide">{title}</h2>
    </div>
);

export default function StorageUsage({ onBack, data = DEFAULT_DATA }) {
    const currentData = { ...DEFAULT_DATA, ...data };
    
    const [lastUpdated, setLastUpdated] = useState(currentData.overview.lastUpdated);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Animation states
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const [displayPercentage, setDisplayPercentage] = useState(0);
    const [isProgressLoaded, setIsProgressLoaded] = useState(false);
    const [animationMultiplier, setAnimationMultiplier] = useState(0);

    // Dynamic Table Totals
    const totalBreakdownUsed = currentData.usageBreakdown.reduce((sum, item) => sum + item.used, 0);
    const totalBreakdownFiles = currentData.usageBreakdown.reduce((sum, item) => sum + item.count, 0);

    const totalModuleUsed = currentData.moduleStorage.reduce((sum, item) => sum + item.used, 0);
    const totalModuleFiles = currentData.moduleStorage.reduce((sum, item) => sum + item.files, 0);
    const totalModuleRecords = currentData.moduleStorage.reduce((sum, item) => sum + item.records, 0);

    const totalFileTypeUsed = currentData.fileTypes.reduce((sum, item) => sum + item.used, 0);
    const totalFileTypeCount = currentData.fileTypes.reduce((sum, item) => sum + item.count, 0);

    // Compute File & Data Statistics aggregate totals dynamically
    const totalStatsFiles = totalFileTypeCount;
    const totalStatsRecords = totalModuleRecords;

    const getFileTypeCount = (keyword) => {
        const found = currentData.fileTypes.find(ft => ft.type.toLowerCase().includes(keyword.toLowerCase()));
        return found ? found.count : 0;
    };
    
    const dynamicFileStats = {
        documents: getFileTypeCount('document'),
        images: getFileTypeCount('image'),
        videos: getFileTypeCount('video'),
        audio: getFileTypeCount('audio'),
        pdf: getFileTypeCount('pdf'),
        spreadsheets: getFileTypeCount('spreadsheet'),
        others: getFileTypeCount('other') + getFileTypeCount('archive')
    };

    // Dynamic Overview Calcs
    const totalStorage = currentData.overview.total;
    const usedStorage = totalFileTypeUsed > 0 ? totalFileTypeUsed : currentData.overview.used;
    const availableStorage = totalStorage - usedStorage;
    const usagePercentage = totalStorage > 0 ? Math.round((usedStorage / totalStorage) * 100) : 0;

    const triggerAnimation = () => {
        setAnimatedPercentage(0);
        setDisplayPercentage(0);
        setIsProgressLoaded(false);
        setAnimationMultiplier(0);
        
        // SVG transition trigger
        const timer = setTimeout(() => {
            setAnimatedPercentage(usagePercentage);
            setIsProgressLoaded(true);
        }, 100);

        // Number animation
        let startTimestamp = null;
        const duration = 1500; // 1.5 seconds

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // EaseOutCubic function for smoother deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setDisplayPercentage(Math.round(easeOut * usagePercentage));
            setAnimationMultiplier(easeOut);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);

        return () => clearTimeout(timer);
    };

    useEffect(() => {
        const cleanup = triggerAnimation();
        return cleanup;
    }, [usagePercentage]);

    // Data dependencies for overview and file stats are resolved above.

    // Dynamic Policy Data
    const dynamicPolicy = {
        ...currentData.policy,
        limit: formatGB(totalStorage),
        allocated: formatGB(totalStorage),
        used: formatGB(usedStorage),
        available: formatGB(availableStorage)
    };

    // Dynamic Status Logic
    let statusText = 'Normal';
    if (usagePercentage > 95) {
        statusText = 'Full';
    } else if (usagePercentage > 85) {
        statusText = 'Critical';
    } else if (usagePercentage > 75) {
        statusText = 'Warning';
    }

    // Action Handlers
    const handleRefresh = () => {
        setIsRefreshing(true);
        // Reset the chart to 0 immediately so it looks like it's reloading
        setAnimatedPercentage(0);
        setDisplayPercentage(0);
        setIsProgressLoaded(false);
        setAnimationMultiplier(0);

        setTimeout(() => {
            const now = new Date();
            setLastUpdated(now.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }));
            setIsRefreshing(false);
            triggerAnimation();
        }, 800);
    };

    const handleActionClick = (actionName) => {
        alert(`Action Triggered: ${actionName}\n\nIn a real application, this function will navigate to the correct page, open a detailed modal, or trigger a file download.`);
    };

    return (
        <div className="min-h-screen bg-transparent text-slate-800 font-sans pb-12 w-full">
            {/* Header Area */}
            <header className="bg-transparent px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300">
                <div className="flex items-center gap-4">
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
                        <h1 className="text-xl md:text-2xl font-black text-[#1e2a52] uppercase tracking-wide flex items-center gap-2">
                            STORAGE USAGE
                        </h1>
                        <p className="text-xs md:text-sm text-slate-500 mt-0.5 leading-tight">Monitor and manage your storage utilization and data</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    Last Updated: <span className="font-bold text-slate-800">{lastUpdated}</span>
                    <RefreshCw onClick={handleRefresh} className={`w-3.5 h-3.5 ml-1 text-slate-400 cursor-pointer hover:text-blue-600 transition-colors ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
                </div>
            </header>

            <div className="px-4 sm:px-6 mt-4 space-y-6 w-full max-w-[1920px] mx-auto pb-8">
                {/* ROW 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Card 1: Storage Overview */}
                    <div className="lg:col-span-12 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <CardHeader icon={Database} title="Storage Overview" />
                        <div className="flex-1 flex flex-col justify-center gap-6">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                                {/* Circular Chart */}
                                <div className="relative w-32 h-32 shrink-0">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle className="text-blue-50 stroke-current" strokeWidth="12" cx="50" cy="50" r="40" fill="transparent"></circle>
                                        <circle className={`text-blue-600 stroke-current ${isRefreshing ? '' : 'transition-all duration-[1500ms] ease-out'}`} strokeWidth="12" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * animatedPercentage) / 100}></circle>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-black text-slate-800">{displayPercentage}%</span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase">Used</span>
                                    </div>
                                </div>
                                {/* Legend */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Database className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500">Total Storage</p>
                                            <p className="text-sm font-black text-slate-800">{formatGB(totalStorage)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500"><Activity className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500">Used Storage</p>
                                            <p className="text-sm font-black text-slate-800">{formatGB(usedStorage)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500">Available Storage</p>
                                            <p className="text-sm font-black text-slate-800">{formatGB(availableStorage)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 mt-2">
                                <div className="text-center">
                                    <p className="text-[10px] text-slate-500 mb-1 font-medium">Storage Usage</p>
                                    <p className="text-sm font-bold text-slate-800">{usagePercentage}%</p>
                                </div>
                                <div className="text-center border-l border-r border-slate-100">
                                    <p className="text-[10px] text-slate-500 mb-1 font-medium">Storage Status</p>
                                    <span className="inline-block px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded">{statusText}</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-slate-500 mb-1 font-medium">Last Updated</p>
                                    <p className="text-[10px] font-bold text-slate-700">{lastUpdated.split(' ')[0]}<br/>{lastUpdated.split(' ').slice(1).join(' ')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Storage Usage Breakdown */}
                    <div className="lg:col-span-12 xl:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <CardHeader icon={Layers} title="Storage Usage Breakdown" />
                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left text-xs whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-slate-100 text-[10px] text-slate-500 font-bold uppercase">
                                        <th className="py-2 pr-2">Category</th>
                                        <th className="py-2 px-2">Used Storage</th>
                                        <th className="py-2 px-2">Percentage</th>
                                        <th className="py-2 pl-2 text-right">Files/Records</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.usageBreakdown.map((item, idx) => {
                                        const itemPct = totalBreakdownUsed > 0 ? Math.round((item.used / totalBreakdownUsed) * 100) : 0;
                                        const displayItemPct = Math.round(itemPct * animationMultiplier);
                                        return (
                                            <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                                <td className="py-2.5 pr-2 font-medium text-slate-700">{item.category}</td>
                                                <td className="py-2.5 px-2 font-bold text-slate-800">{formatGB(item.used)}</td>
                                                <td className="py-2.5 px-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className={`h-full bg-blue-500 rounded-full ${isRefreshing ? '' : 'transition-all duration-[1500ms] ease-out'}`} style={{ width: `${isProgressLoaded ? itemPct : 0}%` }}></div>
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-600 w-6">{displayItemPct}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-2.5 pl-2 text-right font-medium text-slate-700">{formatNum(item.count)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t border-slate-200 font-bold text-slate-800">
                                        <td className="py-3 pr-2">Total</td>
                                        <td className="py-3 px-2">{formatGB(totalBreakdownUsed)}</td>
                                        <td className="py-3 px-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-12 h-1.5 bg-blue-500 rounded-full"></div>
                                                <span className="text-[10px] font-bold w-6">100%</span>
                                            </div>
                                        </td>
                                        <td className="py-3 pl-2 text-right">{formatNum(totalBreakdownFiles)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Card 3: Module-wise Storage */}
                    <div className="lg:col-span-12 xl:col-span-5 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <CardHeader icon={Server} title="Module-wise Storage" />
                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left text-xs whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-slate-100 text-[10px] text-slate-500 font-bold uppercase">
                                        <th className="py-2 pr-2">Module Name</th>
                                        <th className="py-2 px-2">Storage Used</th>
                                        <th className="py-2 px-2">File Count</th>
                                        <th className="py-2 px-2">Record Count</th>
                                        <th className="py-2 pl-2">Usage %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.moduleStorage.map((mod, idx) => {
                                        const modPct = totalModuleUsed > 0 ? Math.round((mod.used / totalModuleUsed) * 100) : 0;
                                        const displayModPct = Math.round(modPct * animationMultiplier);
                                        return (
                                            <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                                <td className="py-2.5 pr-2 font-medium text-slate-700">{mod.module}</td>
                                                <td className="py-2.5 px-2 font-bold text-slate-800">{formatGB(mod.used)}</td>
                                                <td className="py-2.5 px-2 font-medium text-slate-700">{formatNum(mod.files)}</td>
                                                <td className="py-2.5 px-2 font-medium text-slate-700">{formatNum(mod.records)}</td>
                                                <td className="py-2.5 pl-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-slate-600 w-6 text-right">{displayModPct}%</span>
                                                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className={`h-full bg-indigo-500 rounded-full ${isRefreshing ? '' : 'transition-all duration-[1500ms] ease-out'}`} style={{ width: `${isProgressLoaded ? modPct : 0}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t border-slate-200 font-bold text-slate-800">
                                        <td className="py-3 pr-2">Total</td>
                                        <td className="py-3 px-2">{formatGB(totalModuleUsed)}</td>
                                        <td className="py-3 px-2">{formatNum(totalModuleFiles)}</td>
                                        <td className="py-3 px-2">{formatNum(totalModuleRecords)}</td>
                                        <td className="py-3 pl-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] w-6 text-right">100%</span>
                                                <div className="w-12 h-1.5 bg-indigo-500 rounded-full"></div>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ROW 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Card 4: File & Data Statistics */}
                    <div className="lg:col-span-6 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <CardHeader icon={FileText} title="File & Data Statistics" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center gap-1">
                                <File className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="font-black text-slate-800">{formatNum(totalStatsFiles)}</span>
                                <span className="text-[9px] font-bold text-slate-500">Total Files</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center gap-1">
                                <Database className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="font-black text-slate-800">{formatNum(totalStatsRecords)}</span>
                                <span className="text-[9px] font-bold text-slate-500">Total Records</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center gap-1">
                                <FileText className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="font-black text-slate-800">{formatNum(dynamicFileStats.documents)}</span>
                                <span className="text-[9px] font-bold text-slate-500">Documents</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center gap-1">
                                <Images className="w-5 h-5 text-green-600 mb-1" />
                                <span className="font-black text-slate-800">{formatNum(dynamicFileStats.images)}</span>
                                <span className="text-[9px] font-bold text-slate-500">Images</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center gap-1">
                                <Video className="w-5 h-5 text-green-600 mb-1" />
                                <span className="font-black text-slate-800">{formatNum(dynamicFileStats.videos)}</span>
                                <span className="text-[9px] font-bold text-slate-500">Videos</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center gap-1">
                                <Music className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="font-black text-slate-800">{formatNum(dynamicFileStats.audio)}</span>
                                <span className="text-[9px] font-bold text-slate-500">Audio Files</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center gap-1">
                                <File className="w-5 h-5 text-red-500 mb-1" />
                                <span className="font-black text-slate-800">{formatNum(dynamicFileStats.pdf)}</span>
                                <span className="text-[9px] font-bold text-slate-500">PDF Files</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center gap-1">
                                <FileSpreadsheet className="w-5 h-5 text-green-600 mb-1" />
                                <span className="font-black text-slate-800">{formatNum(dynamicFileStats.spreadsheets)}</span>
                                <span className="text-[9px] font-bold text-slate-500">Spreadsheets</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col justify-center items-center text-center gap-1">
                                <Archive className="w-5 h-5 text-slate-400 mb-1" />
                                <span className="font-black text-slate-800">{formatNum(dynamicFileStats.others)}</span>
                                <span className="text-[9px] font-bold text-slate-500">Other Files</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Storage by File Type */}
                    <div className="lg:col-span-6 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col">
                        <CardHeader icon={File} title="Storage by File Type" />
                        <div className="flex-1">
                            <table className="w-full text-left text-[10px]">
                                <thead>
                                    <tr className="border-b border-slate-100 text-[9px] text-slate-500 font-bold uppercase">
                                        <th className="py-1.5 pr-1">Type</th>
                                        <th className="py-1.5 px-0.5 text-center">Files</th>
                                        <th className="py-1.5 px-0.5 text-center">Size</th>
                                        <th className="py-1.5 pl-1 text-right">Usage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.fileTypes.map((ft, idx) => {
                                        const ftPct = totalFileTypeUsed > 0 ? Math.round((ft.used / totalFileTypeUsed) * 100) : 0;
                                        const displayFtPct = Math.round(ftPct * animationMultiplier);
                                        return (
                                            <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                                <td className="py-2 pr-1 font-bold text-slate-700 whitespace-nowrap">{ft.type}</td>
                                                <td className="py-2 px-0.5 font-medium text-slate-600 text-center whitespace-nowrap">{formatNum(ft.count)}</td>
                                                <td className="py-2 px-0.5 font-bold text-slate-800 text-center whitespace-nowrap">{formatGB(ft.used)}</td>
                                                <td className="py-2 pl-1 whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <div className="w-5 sm:w-6 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className={`h-full bg-blue-500 rounded-full ${isRefreshing ? '' : 'transition-all duration-[1500ms] ease-out'}`} style={{ width: `${isProgressLoaded ? ftPct : 0}%` }}></div>
                                                        </div>
                                                        <span className="text-[9px] font-bold text-slate-600 min-w-[18px] text-right">{displayFtPct}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t border-slate-200 font-bold text-slate-800">
                                        <td className="py-3 pr-1">Total</td>
                                        <td className="py-3 px-1 text-center">{formatNum(totalFileTypeCount)}</td>
                                        <td className="py-3 px-1 text-center">{formatGB(totalFileTypeUsed)}</td>
                                        <td className="py-3 pl-1 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <div className="w-8 h-1.5 bg-blue-500 rounded-full"></div>
                                                <span className="text-[10px] w-6 text-right">100%</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Card 6: Storage Status */}
                    <div className="lg:col-span-6 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <CardHeader icon={Activity} title="Storage Status" />
                        <div className="flex flex-col gap-3 flex-1 justify-center">
                            <div className={`flex items-center justify-between p-3 rounded-lg border ${usagePercentage <= 75 ? 'border-green-200 bg-green-50' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                                    <div>
                                        <p className="font-bold text-green-700 text-sm">Normal</p>
                                        <p className="text-[10px] text-green-600">0% - 75%</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {usagePercentage <= 75 && <p className="font-bold text-green-800 text-xs">{usagePercentage}% Used</p>}
                                    <p className="text-[9px] text-green-600">{formatGB(usedStorage)} of {formatGB(totalStorage)}</p>
                                </div>
                            </div>
                            
                            <div className={`flex items-center justify-between p-3 rounded-lg border ${usagePercentage > 75 && usagePercentage <= 85 ? 'border-orange-200 bg-orange-50' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full ${usagePercentage > 75 && usagePercentage <= 85 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500'} flex items-center justify-center`}><AlertTriangle className="w-4 h-4" /></div>
                                    <div>
                                        <p className="font-bold text-slate-700 text-sm">Warning</p>
                                        <p className="text-[10px] text-slate-500">76% - 85%</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {usagePercentage > 75 && usagePercentage <= 85 && <p className="font-bold text-orange-700 text-xs">{usagePercentage}% Used</p>}
                                    <p className="text-[9px] text-slate-500">{formatGB(availableStorage)} Remaining</p>
                                </div>
                            </div>
                            
                            <div className={`flex items-center justify-between p-3 rounded-lg border ${usagePercentage > 85 && usagePercentage <= 95 ? 'border-red-200 bg-red-50' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full ${usagePercentage > 85 && usagePercentage <= 95 ? 'bg-red-500 text-white' : 'bg-red-100 text-red-500'} flex items-center justify-center`}><AlertTriangle className="w-4 h-4" /></div>
                                    <div>
                                        <p className="font-bold text-slate-700 text-sm">Critical</p>
                                        <p className="text-[10px] text-slate-500">86% - 95%</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {usagePercentage > 85 && usagePercentage <= 95 && <p className="font-bold text-red-700 text-xs">{usagePercentage}% Used</p>}
                                    <p className="text-[9px] text-slate-500">{formatGB(availableStorage)} Remaining</p>
                                </div>
                            </div>
                            
                            <div className={`flex items-center justify-between p-3 rounded-lg border ${usagePercentage > 95 ? 'border-purple-200 bg-purple-50' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full ${usagePercentage > 95 ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'} flex items-center justify-center`}><AlertTriangle className="w-4 h-4" /></div>
                                    <div>
                                        <p className="font-bold text-slate-700 text-sm">Full</p>
                                        <p className="text-[10px] text-slate-500">96% - 100%</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {usagePercentage > 95 && <p className="font-bold text-purple-700 text-xs">Storage Full</p>}
                                    <p className="text-[9px] text-slate-500">{formatGB(availableStorage)} Remaining</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 7: Storage Alerts */}
                    <div className="lg:col-span-6 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <CardHeader icon={ShieldAlert} title="Storage Alerts" />
                        <div className="flex-1 flex flex-col gap-4">
                            {currentData.alerts.map((alert, idx) => {
                                const IconComp = alert.icon;
                                return (
                                    <div key={idx} className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-0.5 p-1.5 rounded ${alert.bg} ${alert.color}`}>
                                                <IconComp className="w-3.5 h-3.5" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-800">{alert.title}</p>
                                                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{alert.desc}</p>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-medium text-slate-400 shrink-0 text-right">{alert.time}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ROW 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Card 8: Storage Activity */}
                    <div className="lg:col-span-12 xl:col-span-6 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <CardHeader icon={TrendingUp} title="Storage Activity" />
                        <div className="flex-1 overflow-auto max-h-[320px]">
                            <table className="w-full text-left text-xs whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-slate-100 text-[10px] text-slate-500 font-bold uppercase">
                                        <th className="py-2 pr-2">Date</th>
                                        <th className="py-2 px-2">Time</th>
                                        <th className="py-2 px-2">Activity</th>
                                        <th className="py-2 px-2">Module</th>
                                        <th className="py-2 px-2">Storage Change</th>
                                        <th className="py-2 pl-2">Reference / User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.activities.map((act, idx) => (
                                        <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                            <td className="py-2.5 pr-2 font-medium text-slate-700">{act.date}</td>
                                            <td className="py-2.5 px-2 font-medium text-slate-700">{act.time}</td>
                                            <td className="py-2.5 px-2 font-bold text-slate-800">{act.activity}</td>
                                            <td className="py-2.5 px-2 font-medium text-slate-700">{act.module}</td>
                                            <td className={`py-2.5 px-2 font-bold ${act.changeColor}`}>{act.change}</td>
                                            <td className="py-2.5 pl-2 font-medium text-slate-500">{act.ref}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Card 9: Storage Actions */}
                    <div className="lg:col-span-6 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <CardHeader icon={LayoutList} title="Storage Actions" />
                        <div className="grid grid-cols-2 gap-3 flex-1">
                            <button onClick={() => handleActionClick('View Storage Details')} className="flex flex-col items-center justify-center gap-2 p-3 h-24 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-colors group">
                                <Eye className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold text-slate-700">View Storage Details</span>
                                    <span className="block text-[8px] text-slate-400 mt-0.5">Detailed storage overview</span>
                                </div>
                            </button>
                            <button onClick={() => handleActionClick('View Files')} className="flex flex-col items-center justify-center gap-2 p-3 h-24 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-colors group">
                                <FileText className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold text-slate-700">View Files</span>
                                    <span className="block text-[8px] text-slate-400 mt-0.5">Browse stored files</span>
                                </div>
                            </button>
                            <button onClick={() => handleActionClick('View Module Usage')} className="flex flex-col items-center justify-center gap-2 p-3 h-24 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-colors group">
                                <Layers className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold text-slate-700">View Module Usage</span>
                                    <span className="block text-[8px] text-slate-400 mt-0.5">Module wise storage</span>
                                </div>
                            </button>
                            <button onClick={handleRefresh} className="flex flex-col items-center justify-center gap-2 p-3 h-24 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-colors group">
                                <RefreshCw className={`w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
                                <div className="text-center">
                                    <span className="block text-[10px] font-bold text-slate-700">Refresh Storage</span>
                                    <span className="block text-[8px] text-slate-400 mt-0.5">Update storage information</span>
                                </div>
                            </button>
                            <button onClick={() => handleActionClick('Export Storage Report')} className="col-span-2 flex flex-col items-center justify-center gap-2 p-3 h-20 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-colors group">
                                <div className="flex items-center gap-2">
                                    <Download className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                    <span className="block text-[11px] font-bold text-slate-700">Export Storage Report</span>
                                </div>
                                <span className="block text-[9px] text-slate-400">Download storage report</span>
                            </button>
                        </div>
                    </div>

                    {/* Card 10: Storage Policy */}
                    <div className="lg:col-span-6 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
                        <CardHeader icon={Shield} title="Storage Policy" />
                        <div className="flex flex-col justify-between flex-1 gap-2">
                            <div className="flex items-center justify-between py-1.5 border-b border-slate-50 text-[11px]">
                                <span className="text-slate-500 font-medium flex items-center gap-2"><Database className="w-3.5 h-3.5" /> Storage Limit</span>
                                <span className="font-bold text-slate-800">{dynamicPolicy.limit}</span>
                            </div>
                            <div className="flex items-center justify-between py-1.5 border-b border-slate-50 text-[11px]">
                                <span className="text-slate-500 font-medium flex items-center gap-2"><Server className="w-3.5 h-3.5" /> Allocated Storage</span>
                                <span className="font-bold text-slate-800">{dynamicPolicy.allocated}</span>
                            </div>
                            <div className="flex items-center justify-between py-1.5 border-b border-slate-50 text-[11px]">
                                <span className="text-slate-500 font-medium flex items-center gap-2"><Activity className="w-3.5 h-3.5" /> Storage Used</span>
                                <span className="font-bold text-slate-800">{dynamicPolicy.used}</span>
                            </div>
                            <div className="flex items-center justify-between py-1.5 border-b border-slate-50 text-[11px]">
                                <span className="text-slate-500 font-medium flex items-center gap-2"><Info className="w-3.5 h-3.5" /> Storage Available</span>
                                <span className="font-bold text-slate-800">{dynamicPolicy.available}</span>
                            </div>
                            <div className="flex items-center justify-between py-1.5 border-b border-slate-50 text-[11px]">
                                <span className="text-slate-500 font-medium flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Storage Policy</span>
                                <span className="font-bold text-slate-800">{dynamicPolicy.policy}</span>
                            </div>
                            <div className="flex items-center justify-between py-1.5 border-b border-slate-50 text-[11px]">
                                <span className="text-slate-500 font-medium flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Storage Retention</span>
                                <span className="font-bold text-slate-800">{dynamicPolicy.retention}</span>
                            </div>
                            <div className="flex items-center justify-between py-1.5 border-b border-slate-50 text-[11px]">
                                <span className="text-slate-500 font-medium flex items-center gap-2"><HardDrive className="w-3.5 h-3.5" /> Maximum File Size</span>
                                <span className="font-bold text-slate-800">{dynamicPolicy.maxSize}</span>
                            </div>
                            <div className="flex items-center justify-between py-1.5 text-[11px]">
                                <span className="text-slate-500 font-medium flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Allowed File Types</span>
                                <span className="font-bold text-slate-800">{dynamicPolicy.allowedTypes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
