/**
 * @file UserActivityLog.jsx
 * @description Hierarchical Module Usage Report. Shows Main modules, expands to show Sub cards.
 * Reusable and dynamic. Uses `resolveModuleName` prop to fetch user-friendly names, avoiding hardcoded dependencies.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { getModuleSessions, clearModuleSessions } from './indexedDB';
import { useActivityTracker } from '../../context/ActivityTrackerContext';

/* ══════════════════════════════════════════════════════════════════════════ */
/*  Helpers                                                                   */
/* ══════════════════════════════════════════════════════════════════════════ */

/** Formats an ISO timestamp to "hh:mm:ss AM" in local time. */
function fmtTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase();
}

/** Formats an ISO timestamp to "DD/MM/YYYY" in local time. */
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/** Formats duration in milliseconds to "XXmXXs". */
function fmtDuration(ms) {
  if (!ms || ms <= 0) return '< 1s';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
}

/** Formats duration in milliseconds to "XXh XXm XXs". */
function fmtTotalDuration(ms) {
  if (!ms || ms <= 0) return '00h 00m 00s';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  Page Header                                                               */
/* ══════════════════════════════════════════════════════════════════════════ */
function PageHeader({ onBack }) {
  return (
    <header className="w-full relative pt-2 sm:pt-4 pb-4 sm:pb-6 mb-4 sm:mb-6 select-none border-b border-slate-200">
      <div className="flex items-center justify-between w-full relative z-20 px-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-[#1e2a52] transition-colors font-medium text-sm sm:text-base px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        )}
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            USER ACTIVITY LOG
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Module Usage Report
          </p>
        </div>
        <div className="w-[80px]" />
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  Main Component                                                            */
/* ══════════════════════════════════════════════════════════════════════════ */
export default function UserActivityLog({ onBack, resolveModuleName }) {
  const { isCameraActive } = useActivityTracker();
  const [sessions, setSessions] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const sessionData = await getModuleSessions();
      setSessions(sessionData);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleClear = async () => {
    if (!window.confirm('Clear all module usage records and captured photos?')) return;
    try {
      await clearModuleSessions();
      setSessions([]);
      setExpandedRows(new Set());
    } catch (err) {
      console.error('Failed to clear data:', err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Grouping
  // Older tracked items might not have 'type'. Treat them as main ONLY IF they are not old sub-sessions containing ' > '
  const mainSessions = sessions.filter(s => s.type === 'main' || (!s.type && !s.moduleName.includes(' > ')));
  const subSessions = sessions.filter(s => s.type === 'sub');

  // Stats
  const totalSessions = mainSessions.length;
  const totalActiveTimeMs = mainSessions.reduce((sum, s) => sum + s.duration, 0);
  const uniqueModules = new Set(mainSessions.map((s) => s.moduleName)).size;
  const cameraStatusText = isCameraActive ? 'Camera ON' : 'Camera OFF';

  return (
    <div className="flex flex-col w-full animate-fade-in pb-16 font-sans">
      <PageHeader onBack={onBack} />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">

          {/* Top Dashboard Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 bg-slate-50">
            <div className="p-3 sm:p-4 text-center border-b md:border-b-0 border-r border-slate-200">
              <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Sessions</p>
              <p className="text-lg sm:text-xl font-bold text-[#1e2a52] mt-1">{totalSessions}</p>
            </div>
            <div className="p-3 sm:p-4 text-center border-b md:border-b-0 md:border-r border-slate-200">
              <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Active Time</p>
              <p className="text-lg sm:text-xl font-bold text-[#1e2a52] mt-1">{fmtTotalDuration(totalActiveTimeMs)}</p>
            </div>
            <div className="p-3 sm:p-4 text-center border-r border-slate-200">
              <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">Modules Used</p>
              <p className="text-lg sm:text-xl font-bold text-[#1e2a52] mt-1">{uniqueModules}</p>
            </div>
            <div className="p-3 sm:p-4 text-center">
              <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-semibold text-slate-500 uppercase tracking-wide">Current Status</p>
              <p className={`text-lg sm:text-xl font-bold mt-1 ${isCameraActive ? 'text-green-600' : 'text-slate-600'}`}>
                {cameraStatusText}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-[#1e2a52]">Detailed Usage Log</h2>
            <div className="flex gap-2">
              <button onClick={fetchSessions} className="text-xs font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded transition">
                Refresh
              </button>
              <button onClick={handleClear} className="text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded transition">
                Clear
              </button>
            </div>
          </div>

          {/* Data Table */}
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Loading sessions...</div>
          ) : mainSessions.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">No module usage recorded yet. Enter a module to start tracking.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse select-none">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-xs font-bold text-slate-600 w-16 whitespace-nowrap">#</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-600 whitespace-nowrap">Module Name</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-600 whitespace-nowrap">Date</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-600 whitespace-nowrap">Start Time</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-600 whitespace-nowrap">Stop Time</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-600 whitespace-nowrap">Duration</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-600 whitespace-nowrap">Image</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-600 whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mainSessions.map((session, idx) => {
                    const rowNum = (mainSessions.length - idx).toString().padStart(3, '0');
                    const isExpanded = expandedRows.has(session.id);
                    const nestedSubs = subSessions.filter(sub => sub.mainSessionId === session.id);
                    const hasSubs = nestedSubs.length > 0;

                    return (
                      <React.Fragment key={session.id}>
                        {/* MAIN ROW */}
                        <tr
                          onClick={() => hasSubs && toggleExpand(session.id)}
                          className={`transition-colors ${hasSubs ? 'cursor-pointer hover:bg-slate-50' : ''} ${isExpanded ? 'bg-slate-50' : ''}`}
                        >
                          <td className="px-6 py-3.5 text-sm text-slate-500">#{rowNum}</td>
                          <td className="px-6 py-3.5 text-sm font-semibold text-[#1e2a52] whitespace-nowrap flex items-center gap-2">
                            {hasSubs ? (
                              <svg className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            ) : (
                              <div className="w-4 h-4" /> // spacer
                            )}
                            {session.moduleName}
                            {hasSubs && <span className="text-[calc(10px*var(--text-scale,1))] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full ml-2">{nestedSubs.length}</span>}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-slate-600 whitespace-nowrap">{fmtDate(session.startTime)}</td>
                          <td className="px-6 py-3.5 text-sm text-slate-600 whitespace-nowrap">{fmtTime(session.startTime)}</td>
                          <td className="px-6 py-3.5 text-sm text-slate-600 whitespace-nowrap">{fmtTime(session.stopTime)}</td>
                          <td className="px-6 py-3.5 text-sm font-mono text-[#1e2a52] font-semibold whitespace-nowrap">{fmtDuration(session.duration)}</td>
                          <td className="px-6 py-3.5 text-sm text-slate-600 whitespace-nowrap">
                            <div className="flex gap-2 items-center overflow-x-auto max-w-[250px]">
                              {session.image && (
                                <img src={session.image} alt="snapshot" onClick={(e) => { e.stopPropagation(); setSelectedImage(session.image); }} className="w-10 h-6 object-cover rounded border border-slate-200 cursor-pointer hover:scale-110 transition-transform shrink-0" />
                              )}
                              {nestedSubs.filter(sub => sub.image).map((sub, i) => (
                                <img key={`sub-img-${i}`} src={sub.image} alt={`sub-snapshot-${i}`} onClick={(e) => { e.stopPropagation(); setSelectedImage(sub.image); }} className="w-10 h-6 object-cover rounded border border-slate-200 cursor-pointer hover:scale-110 transition-transform shrink-0" title={`${sub.moduleName} - ${fmtTime(sub.startTime)}`} />
                              ))}
                              {session.sessionClicks && session.sessionClicks.map((click, i) => (
                                <img key={`click-${i}`} src={click.image} alt={`click-${i}`} onClick={(e) => { e.stopPropagation(); setSelectedImage(click.image); }} className="w-10 h-6 object-cover rounded border border-slate-200 cursor-pointer hover:scale-110 transition-transform shrink-0" title={fmtTime(click.timestamp)} />
                              ))}
                              {!session.image && !nestedSubs.some(sub => sub.image) && (!session.sessionClicks || session.sessionClicks.length === 0) && (
                                <span className="text-[calc(10px*var(--text-scale,1))] text-slate-400">N/A</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-sm text-slate-600">{session.status}</td>
                        </tr>

                        {/* SUB SESSIONS (EXPANDED) */}
                        {isExpanded && hasSubs && (
                          <tr className="bg-slate-50/50">
                            <td colSpan="8" className="p-0 border-b border-slate-200">
                              <div className="bg-slate-100/50 pl-4 sm:pl-16 pr-4 sm:pr-6 py-4 shadow-inner overflow-x-auto">
                                <table className="w-full text-left min-w-max">
                                  <thead>
                                    <tr className="text-[calc(10px*var(--text-scale,1))] uppercase text-slate-400 tracking-wider border-b border-slate-200">
                                      <th className="pb-2 pr-4 font-semibold whitespace-nowrap">Inner Card Visited</th>
                                      <th className="pb-2 px-4 font-semibold whitespace-nowrap">Start Time</th>
                                      <th className="pb-2 px-4 font-semibold whitespace-nowrap">Stop Time</th>
                                      <th className="pb-2 px-4 font-semibold whitespace-nowrap">Time Spent</th>
                                      <th className="pb-2 px-4 font-semibold whitespace-nowrap">Snapshot</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-200/50">
                                    {nestedSubs.map(sub => {
                                      const fullName = resolveModuleName ? resolveModuleName(sub.moduleName, session.moduleName) : null;
                                      return (
                                      <tr key={sub.id} className="hover:bg-slate-200/30 transition-colors">
                                        <td className="py-2.5 pr-4 text-xs font-medium text-[#1e2a52] flex items-center gap-2 whitespace-nowrap">
                                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                                          <span>{sub.moduleName} {fullName && fullName !== sub.moduleName && <span className="text-slate-400 font-normal ml-1">({fullName})</span>}</span>
                                        </td>
                                        <td className="py-2.5 px-4 text-xs text-slate-500 font-mono whitespace-nowrap">{fmtTime(sub.startTime)}</td>
                                        <td className="py-2.5 px-4 text-xs text-slate-500 font-mono whitespace-nowrap">{fmtTime(sub.stopTime)}</td>
                                        <td className="py-2.5 px-4 text-xs font-semibold text-slate-600 whitespace-nowrap">{fmtDuration(sub.duration)}</td>
                                        <td className="py-2.5 px-4 text-xs text-slate-600">
                                          <div className="flex gap-2 items-center overflow-x-auto max-w-[150px]">
                                            {sub.image ? (
                                              <img src={sub.image} alt="sub-snapshot" onClick={(e) => { e.stopPropagation(); setSelectedImage(sub.image); }} className="w-8 h-5 object-cover rounded border border-slate-200 cursor-pointer hover:scale-110 transition-transform shrink-0" />
                                            ) : (
                                              <span className="text-[calc(10px*var(--text-scale,1))] text-slate-400">N/A</span>
                                            )}
                                            {sub.sessionClicks && sub.sessionClicks.map((click, i) => (
                                              <img key={i} src={click.image} alt={`click-${i}`} onClick={(e) => { e.stopPropagation(); setSelectedImage(click.image); }} className="w-8 h-5 object-cover rounded border border-slate-200 cursor-pointer hover:scale-110 transition-transform shrink-0" title={fmtTime(click.timestamp)} />
                                            ))}
                                          </div>
                                        </td>
                                      </tr>
                                    )})}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Image Modal ──────────────────────────────────────────────── */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative inline-block cursor-default" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-[60] text-white hover:text-red-500 transition-colors bg-slate-800 hover:bg-slate-900 border-2 border-white/20 p-1.5 sm:p-2 rounded-full cursor-pointer shadow-xl"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              title="Close (Minimize)"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged snapshot" 
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain border-2 border-white/20 block" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
