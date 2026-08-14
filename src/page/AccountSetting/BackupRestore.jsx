import React, { useState, useEffect } from 'react';
import {
  Clock, HardDrive, AlertCircle, RefreshCw, FileText, Download, Shield, Search, ChevronRight, ChevronLeft, Database, Play, Filter, FileCode, CheckCircle2, Eye, ShieldCheck, Calendar, RotateCcw, List, Loader2
} from 'lucide-react';

const generateBackups = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `BAK-${57892 - i}`,
    date: `10 Aug 2026`,
    time: `0${(i % 9) + 1}:00 AM`,
    type: i % 3 === 0 ? 'Full Backup' : 'Incremental',
    size: i % 3 === 0 ? '245 GB' : '78 GB',
    status: i % 7 === 0 && i !== 0 ? 'Failed' : 'Successful',
    creator: 'System'
  }));
};

const generateHistory = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `REST-${1024 - i}`,
    bakId: `BAK-${45621 - i}`,
    type: i % 2 === 0 ? 'Case Restore' : 'Full Restore',
    data: i % 2 === 0 ? `CASE-${1024 - i}` : 'All Data',
    reqBy: 'Admin User',
    status: i % 6 === 0 && i !== 0 ? 'Failed' : 'Completed'
  }));
};

export function Header({ lastUpdated, isRefreshing, onRefresh }) {
  return (
    <header className="w-full relative pt-8 sm:pt-12 pb-2 sm:pb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full max-w-[1720px]">
          <div className="flex-1 text-left flex flex-col items-start min-w-0">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
              Backup & Restore
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base font-medium text-slate-600 max-w-2xl leading-relaxed">
              Manage system backups, schedules, storage, verification and restore operations.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Last Updated: {lastUpdated}</span>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className={`w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 bg-white transition-all ${isRefreshing ? 'opacity-70' : 'hover:bg-gray-50'}`}>
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

const Badge = ({ text, type }) => {
  const styles = {
    success: "bg-[#E8F8F0] text-[#00A350] border-[#C5EBD6]",
    error: "bg-[#FFF4F4] text-[#FF4D4F] border-[#FFD8D8]",
    warning: "bg-[#FFF4E5] text-[#FF8C00] border-[#FFD9A3]",
    info: "bg-blue-50 text-blue-600 border border-blue-200",
    purple: "bg-purple-50 text-purple-600 border border-purple-200",
  };
  return <span className={`px-2 py-0.5 rounded text-[calc(10px*var(--text-scale,1))] font-bold ${styles[type] || styles.info}`}>{text}</span>;
}

const CardTitle = ({ title, actionText, onAction, isLoading }) => (
  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
    <div className="flex items-center gap-2.5">
      <h2 className="text-[calc(15px*var(--text-scale,1))] font-bold text-[#1e2a52]">{title}</h2>
    </div>
    {actionText && (
      <button onClick={onAction} disabled={isLoading} className="text-[calc(11px*var(--text-scale,1))] font-bold text-blue-600 hover:underline flex items-center gap-1 disabled:opacity-50 disabled:no-underline">
        {isLoading && actionText === 'Refresh' && <Loader2 className="w-3 h-3 animate-spin" />}
        {isLoading && actionText === 'Refresh' ? 'Refreshing...' : actionText}
      </button>
    )}
  </div>
);

const Pagination = ({ currentPage, totalPages, totalRecords, onPageChange }) => (
  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
    <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-500">Total Records: {totalRecords}</span>
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-5 h-5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 flex items-center justify-center">
        <ChevronLeft className="w-3 h-3" />
      </button>
      <div className="flex gap-1 mx-1">
        <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Pg {currentPage}</span>
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-5 h-5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 flex items-center justify-center">
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export default function BackupRestorePage({ onBack }) {
  // Global States
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('10 Aug 2026, 10:30 AM');

  // Data States
  const [records, setRecords] = useState([]);
  const [history, setHistory] = useState([]);

  // Pagination States
  const recordsPerPage = 5;
  const historyPerPage = 5;
  const [recordsPage, setRecordsPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);

  // Detail View State
  const [selectedBackup, setSelectedBackup] = useState(null);

  // Form & Action States
  const [isCreating, setIsCreating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [currentRestoreRequest, setCurrentRestoreRequest] = useState(null);
  const [restoreForm, setRestoreForm] = useState({
    version: '',
    type: '',
    category: '',
    caseId: '',
    dest: '',
    reason: ''
  });

  // Modal State
  const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);

  // Storage Stats State
  const [storage, setStorage] = useState({ total: 1.5, used: 1.02 });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Initial fetch simulation
    const initRecords = generateBackups(28);
    setRecords(initRecords);
    setSelectedBackup(initRecords[0]);
    setHistory(generateHistory(45));
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date().toLocaleString());
      setIsRefreshing(false);
    }, 1000);
  };

  const handleCreateBackup = () => {
    setIsCreating(true);
    setTimeout(() => {
      const newBackup = {
        id: `BAK-${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'Manual Backup',
        size: '120 GB',
        status: 'Successful',
        creator: 'Admin User'
      };
      setRecords([newBackup, ...records]);
      setSelectedBackup(newBackup);
      setStorage(prev => ({ ...prev, used: prev.used + 0.12 })); // Increase usage
      setRecordsPage(1);
      setIsCreating(false);
    }, 2000);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      alert("Backup Verification Completed Successfully!");
    }, 1500);
  };

  const handleFormChange = (e) => {
    setRestoreForm({ ...restoreForm, [e.target.name]: e.target.value });
  };

  // Pagination Logic
  const currentRecords = records.slice((recordsPage - 1) * recordsPerPage, recordsPage * recordsPerPage);
  const totalRecordsPages = Math.ceil(records.length / recordsPerPage);

  const currentHistory = history.slice((historyPage - 1) * historyPerPage, historyPage * historyPerPage);
  const totalHistoryPages = Math.ceil(history.length / historyPerPage);

  const storagePercentage = Math.round((storage.used / storage.total) * 100);

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4 bg-transparent ">
      {onBack && (
        <button onClick={onBack}
          className="absolute -top-2 left-1 sm:top-1 sm:left-3 md:left-4 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm">
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}
      <Header lastUpdated={lastUpdated} isRefreshing={isRefreshing} onRefresh={handleRefresh} />

      <div className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 pb-10 mt-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-stretch">

          {/* 1. Backup Overview */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Backup Overview" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-5 flex-1">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-500 mb-0.5">Backup Status</div>
                  <div className="text-[calc(12px*var(--text-scale,1))] font-black text-green-600">Successful</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-500 mb-0.5">Last Successful Backup</div>
                  <div className="text-[calc(12px*var(--text-scale,1))] font-black text-[#1e2a52]">10 Aug 2026</div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-400">02:00 AM</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-500 mb-0.5">Last Failed Backup</div>
                  <div className="text-[calc(12px*var(--text-scale,1))] font-black text-[#1e2a52]">07 Aug 2026</div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-400">11:20 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-500 mb-0.5">Next Scheduled Backup</div>
                  <div className="text-[calc(12px*var(--text-scale,1))] font-black text-[#1e2a52]">11 Aug 2026</div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-400">02:00 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <HardDrive className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-500 mb-0.5">Total Backup Size</div>
                  <div className="text-[calc(12px*var(--text-scale,1))] font-black text-[#1e2a52]">245 GB</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <FileCode className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-500 mb-0.5">Available Versions</div>
                  <div className="text-[calc(12px*var(--text-scale,1))] font-black text-[#1e2a52]">{records.length}</div>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 mt-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">Storage Status</span>
                <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500">{storagePercentage}% Used ({storage.used.toFixed(2)} TB / {storage.total.toFixed(2)} TB)</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden flex">
                <div className={`h-full rounded-full transition-all duration-1000 ${storagePercentage > 85 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${storagePercentage}%` }}></div>
              </div>
            </div>
          </div>

          {/* 2. Backup Records */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Backup Records" actionText="Refresh" onAction={handleRefresh} isLoading={isRefreshing} />
            <div className="overflow-x-auto -mx-1 flex-1">
              <table className="w-full text-left border-collapse min-w-[360px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-2 px-1 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Backup ID</th>
                    <th className="pb-2 px-1 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="pb-2 px-1 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="pb-2 px-1 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="pb-2 px-1 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Size</th>
                    <th className="pb-2 px-1 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentRecords.map((row, i) => (
                    <tr key={row.id}
                      onClick={() => setSelectedBackup(row)}
                      className={`transition-colors cursor-pointer ${selectedBackup?.id === row.id ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}`}>
                      <td className={`py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-bold ${selectedBackup?.id === row.id ? 'text-blue-700' : 'text-gray-700'}`}>{row.id}</td>
                      <td className="py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-600">{row.date}</td>
                      <td className="py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500">{row.time}</td>
                      <td className="py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-600">{row.type.includes('Inc') ? 'Inc.' : row.type}</td>
                      <td className="py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500">{row.size}</td>
                      <td className="py-2.5 px-1">
                        {row.status === 'Successful' ? <Badge text="Successful" type="success" /> : <Badge text="Failed" type="error" />}
                      </td>
                    </tr>
                  ))}
                  {currentRecords.length === 0 && (
                    <tr><td colSpan="6" className="py-4 text-center text-xs text-gray-400">No records found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={recordsPage}
              totalPages={totalRecordsPages}
              totalRecords={records.length}
              onPageChange={setRecordsPage}
            />
          </div>

          {/* 3. Backup Details */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Backup Details" actionText="Download Log" onAction={() => alert('Downloading log...')} />
            {selectedBackup ? (
              <div className="flex flex-col gap-2.5 flex-1 animate-in fade-in duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Backup ID</span>
                  <span className="text-[calc(12px*var(--text-scale,1))] font-black text-blue-600">{selectedBackup.id}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Backup Type</span>
                  <Badge text={selectedBackup.type} type="purple" />
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Created</span>
                  <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{selectedBackup.date}, {selectedBackup.time}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Backup Size</span>
                  <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{selectedBackup.size}</span>
                </div>
                <div className="flex justify-between items-start pb-3 border-b border-gray-50">
                  <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Status</span>
                  <Badge text={selectedBackup.status} type={selectedBackup.status === 'Successful' ? 'success' : 'error'} />
                </div>

                <div className="pt-1.5 flex-1">
                  <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52] mb-2.5">Included Data</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Case Data', 'Reports', 'Investigation Data', 'Configuration Data', 'Evidence Metadata', 'System Records'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 opacity-90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-auto flex justify-between">
                  <div>
                    <div className="text-[calc(9px*var(--text-scale,1))] font-bold text-gray-400 mb-0.5">Encryption</div>
                    <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">AES-256</div>
                  </div>
                  <div>
                    <div className="text-[calc(9px*var(--text-scale,1))] font-bold text-gray-400 mb-0.5">Integrity</div>
                    <div className={`text-[calc(11px*var(--text-scale,1))] font-bold ${selectedBackup.status === 'Successful' ? 'text-green-600' : 'text-red-500'}`}>
                      {selectedBackup.status === 'Successful' ? 'Verified' : 'Failed'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[calc(9px*var(--text-scale,1))] font-bold text-gray-400 mb-0.5">Location</div>
                    <div className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">Primary Repository</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-sm text-gray-400 font-medium">
                Select a record to view details
              </div>
            )}
          </div>

          {/* 4. Backup Schedule */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Backup Schedule" />
            <div className="flex flex-col gap-3.5 flex-1">
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Schedule Type</span>
                <Badge text="Daily" type="info" />
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Next Backup</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">11 Aug 2026, 02:00 AM</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Last Backup</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{records[0]?.date || '-'}, {records[0]?.time || '-'}</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Frequency</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">Every 24 Hours</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Retention</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">60 Days</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Backup Window</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">01:30 AM - 03:30 AM</span>
              </div>
            </div>
          </div>

          {/* 5. Backup Storage */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Backup Storage" />
            <div className="flex flex-col gap-2.5 flex-1">
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Storage Type</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">On-Premises</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Storage Status</span>
                <span className={`text-[calc(11px*var(--text-scale,1))] font-bold ${storagePercentage > 90 ? 'text-red-500' : 'text-green-600'}`}>
                  {storagePercentage > 90 ? 'Critical' : 'Healthy'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Total Storage</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{storage.total.toFixed(2)} TB</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Used Storage</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{storage.used.toFixed(2)} TB ({storagePercentage}%)</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Available Storage</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{(storage.total - storage.used).toFixed(2)} TB ({100 - storagePercentage}%)</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Backup Count</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{records.length}</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Encryption Status</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-green-600">Enabled</span>
              </div>

              <div className="pt-2 mt-auto">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">Storage Health</span>
                  <span className={`text-[calc(10px*var(--text-scale,1))] font-bold ${storagePercentage > 90 ? 'text-red-500' : 'text-green-600'}`}>
                    {storagePercentage > 90 ? 'Action Required' : 'Good'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className={`h-full rounded-full transition-all duration-1000 ${storagePercentage > 85 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${storagePercentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Backup Verification */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Backup Verification" actionText={isVerifying ? 'Verifying...' : 'Verify Now'} onAction={handleVerify} />
            <div className="flex flex-col gap-2.5 flex-1 relative">
              {isVerifying && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                </div>
              )}
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Integrity Verification</span>
                <Badge text="Verified" type="success" />
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Last Verification</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{lastUpdated}</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Verification Result</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-green-600">Successful</span>
              </div>

              <div className="mb-1.5 mt-1">
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-blue-600">Backup Health</span>
              </div>
              <div className="bg-[#f0fdf4] border border-green-100 rounded-lg p-4 flex items-center gap-3.5 mb-3.5 transition-colors">
                <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(34,197,94,0.3)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[calc(14px*var(--text-scale,1))] font-black text-green-700">Verified</div>
                  <div className="text-[calc(10px*var(--text-scale,1))] font-semibold text-green-600/80 mt-0.5">Backup is healthy and usable.</div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500">Next Verification</span>
                <div className="flex items-center gap-1.5 text-[calc(11px*var(--text-scale,1))] font-black text-[#1e2a52]">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  Tomorrow, 03:00 AM
                </div>
              </div>
            </div>
          </div>

          {/* 7. Restore */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Restore" />
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-1 xl:gap-3">
                <label className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-600 whitespace-nowrap">Select Backup</label>
                <select name="version" value={restoreForm.version} onChange={handleFormChange} className="flex-1 w-full xl:max-w-[170px] border border-gray-200 rounded-md px-2.5 py-1.5 text-[calc(10px*var(--text-scale,1))] font-semibold text-[#1e2a52] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow">
                  <option value="">Select Backup</option>
                  {records.slice(0, 5).map(r => (
                    <option key={r.id} value={r.id}>{r.id} - {r.date}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-1 xl:gap-3">
                <label className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-600 whitespace-nowrap">Restore Type</label>
                <select name="type" value={restoreForm.type} onChange={handleFormChange} className="flex-1 w-full xl:max-w-[170px] border border-gray-200 rounded-md px-2.5 py-1.5 text-[calc(10px*var(--text-scale,1))] font-semibold text-[#1e2a52] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow">
                  <option value="">Select Type</option>
                  <option value="Full">Full Restore</option>
                  <option value="Partial">Partial Restore</option>
                  <option value="Files">Specific Files</option>
                </select>
              </div>
              <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-1 xl:gap-3">
                <label className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-600 whitespace-nowrap">Data Category</label>
                <select name="category" value={restoreForm.category} onChange={handleFormChange} className="flex-1 w-full xl:max-w-[170px] border border-gray-200 rounded-md px-2.5 py-1.5 text-[calc(10px*var(--text-scale,1))] font-semibold text-[#1e2a52] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow">
                  <option value="">Select Category</option>
                  <option value="All">All Categories</option>
                  <option value="Cases">Case Data</option>
                  <option value="Config">System Config</option>
                </select>
              </div>
              <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-1 xl:gap-3">
                <label className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-600 whitespace-nowrap">Case / Inv. <span className="text-gray-400 font-normal">(Optional)</span></label>
                <input type="text" name="caseId" value={restoreForm.caseId} onChange={handleFormChange} placeholder="Enter Case ID" className="flex-1 w-full xl:max-w-[170px] border border-gray-200 rounded-md px-2.5 py-1.5 text-[calc(10px*var(--text-scale,1))] font-semibold placeholder:text-gray-400 text-[#1e2a52] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow" />
              </div>
              <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-1 xl:gap-3">
                <label className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-600 whitespace-nowrap">Destination</label>
                <select name="dest" value={restoreForm.dest} onChange={handleFormChange} className="flex-1 w-full xl:max-w-[170px] border border-gray-200 rounded-md px-2.5 py-1.5 text-[calc(10px*var(--text-scale,1))] font-semibold text-[#1e2a52] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow">
                  <option value="">Select Destination</option>
                  <option value="Original">Original Location</option>
                  <option value="Alternate">Alternate Location</option>
                </select>
              </div>
              <div className="flex flex-col justify-between items-start gap-1 flex-1">
                <label className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-600 whitespace-nowrap">Restore Reason</label>
                <textarea name="reason" value={restoreForm.reason} onChange={handleFormChange} placeholder="Enter restore reason..." className="w-full flex-1 border border-gray-200 rounded-md px-2.5 py-2 text-[calc(10px*var(--text-scale,1))] font-semibold placeholder:text-gray-400 text-[#1e2a52] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none min-h-[50px] transition-shadow"></textarea>
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <button
                disabled={isRestoring}
                onClick={() => {
                  if (!restoreForm.version || !restoreForm.type) {
                    alert("Please select a Backup Version and Restore Type");
                    return;
                  }
                  setIsRestoring(true);
                  setTimeout(() => {
                    setIsRestoring(false);
                    setCurrentRestoreRequest({
                      id: `REQ-${Math.floor(Math.random() * 9000) + 1000}`,
                      bakId: restoreForm.version,
                      reqBy: 'Admin User',
                      reason: restoreForm.reason || 'Data restoration',
                      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    });
                    setRestoreForm({ version: '', type: '', category: '', caseId: '', dest: '', reason: '' });
                  }, 1200);
                }}
                className={`w-full text-white rounded-lg py-2.5 text-[calc(11px*var(--text-scale,1))] font-bold transition-all shadow-[0_2px_8px_rgba(139,92,246,0.25)] flex justify-center items-center gap-2 ${isRestoring ? 'bg-purple-400' : 'bg-[#8b5cf6] hover:bg-[#7c3aed] hover:shadow-lg active:scale-[0.98]'}`}>
                {isRestoring ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                {isRestoring ? 'Submitting Request...' : 'Preview Restore'}
              </button>
            </div>
          </div>

          {/* 8. Restore Request */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Restore Request" actionText="View All" onAction={() => alert("Viewing all Restore Requests...")} />
            {currentRestoreRequest ? (
              <div className="flex flex-col xl:flex-row gap-5 xl:gap-3 flex-1 animate-in fade-in duration-300">
                <div className="flex-1 flex flex-col gap-2.5">
                  <div className="flex justify-between items-start">
                    <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Request ID</span>
                    <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{currentRestoreRequest.id}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Requested By</span>
                    <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{currentRestoreRequest.reqBy}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Backup ID</span>
                    <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-blue-600">{currentRestoreRequest.bakId}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Reason</span>
                    <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-[#1e2a52] text-right max-w-[100px] truncate" title={currentRestoreRequest.reason}>{currentRestoreRequest.reason}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500 mt-0.5">Requested On</span>
                    <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-[#1e2a52] text-right">{currentRestoreRequest.date}</span>
                  </div>
                  <div className="flex justify-between items-start mt-1">
                    <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500 pt-1">Approval Status</span>
                    <Badge text="Pending Approval" type="warning" />
                  </div>
                  <div className="flex justify-between items-start mt-1">
                    <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500 pt-1">Restore Status</span>
                    <Badge text="Requested" type="info" />
                  </div>
                </div>

                {/* Stepper tracking */}
                <div className="w-full xl:w-[130px] pt-4 xl:pt-0 pl-2 xl:pl-3 border-t xl:border-t-0 xl:border-l border-gray-100 flex flex-col justify-between min-h-[160px]">
                  {[
                    { label: 'Requested', time: currentRestoreRequest.date, active: true, current: true },
                    { label: 'Pending Approval', time: '', active: false },
                    { label: 'Approved', time: '', active: false },
                    { label: 'Processing', time: '', active: false },
                    { label: 'Completed', time: '', active: false },
                  ].map((step, idx, arr) => (
                    <div key={idx} className="relative flex flex-col gap-0.5 pb-4 last:pb-0 flex-1">
                      {idx !== arr.length - 1 && (
                        <div className={`absolute left-[5px] top-[16px] bottom-[-2px] w-[1.5px] ${step.active ? 'bg-blue-500' : 'bg-gray-200'} z-0`}></div>
                      )}
                      <div className="flex items-start gap-2 relative z-10">
                        <div className={`w-3 h-3 rounded-full mt-0.5 shrink-0 flex items-center justify-center ${step.current || step.active ? 'bg-blue-500 ring-2 ring-blue-100' : 'border-[1.5px] border-gray-200 bg-white'}`}>
                        </div>
                        <div className="flex flex-col -mt-0.5">
                          <span className={`text-[calc(9px*var(--text-scale,1))] font-bold ${step.active || step.current ? 'text-[#1e2a52]' : 'text-gray-400'}`}>{step.label}</span>
                          {step.time && <span className="text-[calc(8px*var(--text-scale,1))] font-semibold text-gray-400 mt-0.5 leading-tight">{step.time}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <RotateCcw className="w-8 h-8 text-gray-200 mb-2" />
                <div className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-400">No Active Restore Request</div>
                <div className="text-[calc(9px*var(--text-scale,1))] font-semibold text-gray-400 mt-1">Submit a restore to track it here.</div>
              </div>
            )}
          </div>

          {/* 9. Restore History */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Restore History" actionText="Refresh" onAction={handleRefresh} isLoading={isRefreshing} />
            <div className="overflow-x-auto -mx-1 flex-1">
              <table className="w-full text-left border-collapse min-w-[320px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-1.5 px-1 text-[calc(9px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Restore ID</th>
                    <th className="pb-1.5 px-1 text-[calc(9px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Backup ID</th>
                    <th className="pb-1.5 px-1 text-[calc(9px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="pb-1.5 px-1 text-[calc(9px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Data Restored</th>
                    <th className="pb-1.5 px-1 text-[calc(9px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Requested By</th>
                    <th className="pb-1.5 px-1 text-[calc(9px*var(--text-scale,1))] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentHistory.map((row, i) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-bold text-gray-700">{row.id}</td>
                      <td className="py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500">{row.bakId}</td>
                      <td className="py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-600">{row.type}</td>
                      <td className="py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-600">{row.data}</td>
                      <td className="py-2.5 px-1 text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-500">{row.reqBy}</td>
                      <td className="py-2.5 px-1">
                        <span className={`text-[calc(9px*var(--text-scale,1))] font-bold ${row.status === 'Completed' ? 'text-[#00A350]' : 'text-[#FF4D4F]'}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={historyPage}
              totalPages={totalHistoryPages}
              totalRecords={history.length}
              onPageChange={setHistoryPage}
            />
          </div>

          {/* 10. Backup Security */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Backup Security" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4 flex-1">
              {[
                { icon: Shield, label: 'Encryption', val: 'AES-256' },
                { icon: HardDrive, label: 'Secure Storage', val: 'Enabled' },
                { icon: ShieldCheck, label: 'Access Control', val: 'Role Based' },
                { icon: FileText, label: 'Backup Access Logging', val: 'Enabled' },
                { icon: CheckCircle2, label: 'Backup Authentication', val: 'Enabled' },
                { icon: CheckCircle2, label: 'Restore Authorization', val: 'Enabled' },
                { icon: Database, label: 'Integrity Verification', val: 'Enabled' },
                { icon: CheckCircle2, label: 'Data Protection Policy', val: 'Compliant' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-[#1e2a52] sm:text-right">{item.val}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#f0f7ff] border border-blue-100 rounded-lg p-3 flex items-start gap-2.5 mt-auto">
              <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[calc(10px*var(--text-scale,1))] font-semibold text-blue-800 leading-snug">
                All backups are secured and protected as per government guidelines.
              </p>
            </div>
          </div>

          {/* 11. Backup & Restore Actions */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Backup & Restore Actions" />
            <div className="grid grid-cols-3 gap-2.5 flex-1">
              <button onClick={() => alert("Viewing backups...")} className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-gray-600 text-center leading-tight">View Backup</span>
              </button>

              <button onClick={() => alert("Viewing detailed logs...")} className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-gray-600 text-center leading-tight">View Details</span>
              </button>

              <button
                onClick={handleCreateBackup}
                disabled={isCreating}
                className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-gray-100 transition-all group ${isCreating ? 'opacity-70' : 'hover:border-gray-200 hover:bg-gray-50/50'}`}>
                <div className="w-9 h-9 rounded-lg bg-green-50 text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                </div>
                <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-gray-600 text-center leading-tight">
                  {isCreating ? 'Creating...' : 'Create Backup'}
                </span>
              </button>

              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                </div>
                <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-gray-600 text-center leading-tight">
                  {isVerifying ? 'Verifying...' : 'Verify Backup'}
                </span>
              </button>

              <button onClick={() => alert("Restore Requested!")} className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-gray-600 text-center leading-tight">Request Restore</span>
              </button>

              <button onClick={() => alert("Status: Active")} className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[calc(9px*var(--text-scale,1))] font-bold text-gray-600 text-center leading-tight">Restore Status</span>
              </button>

              <button onClick={() => alert("Viewing full restore history...")} className="col-span-3 flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all group mt-1">
                <List className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                <span className="text-[calc(10px*var(--text-scale,1))] font-bold text-gray-600 text-center leading-tight">Full Restore History</span>
              </button>
            </div>
          </div>

          {/* 12. Backup Retention */}
          <div className="bg-white border border-gray-200/80 rounded-[12px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col h-full">
            <CardTitle title="Backup Retention" />
            <div className="flex flex-col gap-2.5 flex-1">
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Retention Period</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">60 Days</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Backup Available From</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">12 Jun 2026</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Backup Expiry</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">11 Oct 2026</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Automatic Cleanup</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#00A350] bg-[#E8F8F0] px-1.5 py-0.5 rounded">Enabled</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Retention Policy</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">Keep last {records.length} versions</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-[calc(11px*var(--text-scale,1))] font-semibold text-gray-500">Backup Version Count</span>
                <span className="text-[calc(11px*var(--text-scale,1))] font-bold text-[#1e2a52]">{records.length} / Unlimited</span>
              </div>

              <div className="bg-[#fff9e6] border border-[#ffeeba] rounded-lg p-3 flex items-start gap-2.5 mt-auto">
                <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-[calc(9px*var(--text-scale,1))] sm:text-[calc(10px*var(--text-scale,1))] font-semibold text-orange-800 leading-snug">
                  Old backups will be automatically deleted after the retention period as per policy.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full Restore History Modal */}
      {showFullHistoryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={() => setShowFullHistoryModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col relative z-10 animate-in zoom-in-95 duration-200 overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <List className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-[#1e2a52]">Full Restore History</h2>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">Comprehensive log of all restore operations across the system.</p>
                </div>
              </div>
              <button onClick={() => setShowFullHistoryModal(false)} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search by ID, User..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full sm:w-[250px] shadow-sm transition-shadow" />
              </div>
              <div className="flex items-center gap-2">
                 <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm"><Filter className="w-3.5 h-3.5" /> Filter</button>
                 <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm"><Download className="w-3.5 h-3.5" /> Export Data</button>
              </div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-auto p-0 bg-white">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-gray-50/90 backdrop-blur-sm shadow-sm z-10 border-b border-gray-200">
                  <tr>
                    <th className="py-3.5 px-5 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 uppercase tracking-wider">Restore ID</th>
                    <th className="py-3.5 px-5 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 uppercase tracking-wider">Backup ID</th>
                    <th className="py-3.5 px-5 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="py-3.5 px-5 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="py-3.5 px-5 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 uppercase tracking-wider">Data Restored</th>
                    <th className="py-3.5 px-5 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 uppercase tracking-wider">Requested By</th>
                    <th className="py-3.5 px-5 text-[calc(11px*var(--text-scale,1))] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {history.map((row) => (
                    <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="py-4 px-5 text-[calc(11px*var(--text-scale,1))] sm:text-xs font-bold text-[#1e2a52]">{row.id}</td>
                      <td className="py-4 px-5 text-[calc(11px*var(--text-scale,1))] sm:text-xs font-bold text-blue-600 hover:underline cursor-pointer">{row.bakId}</td>
                      <td className="py-4 px-5 text-[calc(11px*var(--text-scale,1))] sm:text-xs font-semibold text-gray-500">11 Aug 2026, 12:45 PM</td>
                      <td className="py-4 px-5 text-[calc(11px*var(--text-scale,1))] sm:text-xs font-semibold text-gray-600">{row.type}</td>
                      <td className="py-4 px-5 text-[calc(11px*var(--text-scale,1))] sm:text-xs font-semibold text-gray-600 max-w-[120px] truncate">{row.data}</td>
                      <td className="py-4 px-5 text-[calc(11px*var(--text-scale,1))] sm:text-xs font-semibold text-gray-600">{row.reqBy}</td>
                      <td className="py-4 px-5">
                        <span className={`px-2.5 py-1 rounded-full text-[calc(10px*var(--text-scale,1))] font-bold border ${row.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
