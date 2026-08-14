import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Key,
  Clock,
  Smartphone,
  AlertTriangle,
  History,
  LogOut,
  Save,
  ArrowLeft,
  Check,
  RotateCcw,
  Monitor,
  ChevronDown,
  ChevronUp,
  Lock,
  Search,
  Settings2,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { NEXORA_MODULES } from '../../data/nexora';
import { ALL_SUB_TOOLS } from '../../data/subTools';

const SAVED_SECURITY_KEY = 'nexora_security_settings_v1';
const SAVED_LOCK_KEY = 'nexora_module_lock_v1';

const DEFAULT_SETTINGS = {
  sessionTimeout: '15 Minutes',
  require2FA: true,
  loginAlerts: true,
  suspiciousActivityAlerts: true
};

const MOCK_SESSIONS = [
  { id: 1, device: 'Windows PC - Chrome', ip: '192.168.1.104', location: 'Mumbai, India', time: 'Active Now', current: true },
  { id: 2, device: 'iPhone 14 Pro - Safari', ip: '192.168.1.205', location: 'Delhi, India', time: 'Last active: 2 hrs ago', current: false },
  { id: 3, device: 'MacBook Air - Firefox', ip: '203.0.113.45', location: 'Pune, India', time: 'Last active: Yesterday', current: false },
];

export default function PlatformSecuritySettingPage({ onBack }) {
  const getSavedSettings = () => {
    try {
      const saved = localStorage.getItem(SAVED_SECURITY_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage access error:', e);
    }
    return DEFAULT_SETTINGS;
  };

  const initialSettings = getSavedSettings();

  const [sessionTimeout, setSessionTimeout] = useState(initialSettings.sessionTimeout);
  const [timeoutDropdownOpen, setTimeoutDropdownOpen] = useState(false);
  
  const [require2FA, setRequire2FA] = useState(initialSettings.require2FA);
  const [loginAlerts, setLoginAlerts] = useState(initialSettings.loginAlerts);
  const [suspiciousActivityAlerts, setSuspiciousActivityAlerts] = useState(initialSettings.suspiciousActivityAlerts);

  const [activeSessions, setActiveSessions] = useState(MOCK_SESSIONS);

  // Global Save Toast & Message
  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Security Settings saved successfully!');

  // MODULE LOCK STATE
  const [moduleLockConfig, setModuleLockConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(SAVED_LOCK_KEY);
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {
      globalLockEnabled: false,
      defaultPassword: null,
      lockedModules: {}
    };
  });

  // Auto-save lock settings and notify App.jsx
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_LOCK_KEY, JSON.stringify(moduleLockConfig));
      window.dispatchEvent(new Event('securityUpdate'));
    } catch (e) {
      console.warn('Failed to auto-save locks:', e);
    }
  }, [moduleLockConfig]);

  // Search & Expand State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // MODAL STATE
  const [modalState, setModalState] = useState({ isOpen: false, type: null, targetModule: null, step: 1 });
  const [modalInput, setModalInput] = useState('');
  const [modalError, setModalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const openModal = (type, targetModule = null) => {
    setModalState({ isOpen: true, type, targetModule, step: 1 });
    setModalInput('');
    setModalError('');
    setShowPassword(false);
  };

  const closeModal = () => setModalState({ isOpen: false, type: null, targetModule: null, step: 1 });

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setModalError('');
    
    const { type, step, targetModule } = modalState;

    if (type === 'SET_DEFAULT') {
      if (step === 1) {
        // Step 1: Verify Login Password
        // Verify against the actual platform login password
        if (modalInput === 'CR@Secure2026IT') {
          setModalState({ ...modalState, step: 2 });
          setModalInput('');
        } else {
          setModalError('Incorrect login password.');
        }
      } else {
        // Step 2: Set New Default Password
        if (modalInput.length < 4) {
          setModalError('Password must be at least 4 characters.');
          return;
        }
        setModuleLockConfig(prev => ({ ...prev, defaultPassword: modalInput }));
        setToastMessage('Default Lock Password set successfully.');
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 3000);
        closeModal();
      }
    } else if (type === 'RESET_DEFAULT') {
      if (step === 1) {
        if (modalInput === moduleLockConfig.defaultPassword || modalInput === 'CR@Secure2026IT') {
          setModalState({ ...modalState, step: 2 });
          setModalInput('');
        } else {
          setModalError('Incorrect current default password.');
        }
      } else {
        if (modalInput.length < 4) {
          setModalError('Password must be at least 4 characters.');
          return;
        }
        setModuleLockConfig(prev => ({ ...prev, defaultPassword: modalInput }));
        setToastMessage('Default Lock Password updated.');
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 3000);
        closeModal();
      }
    } else if (type === 'REMOVE_ALL_LOCKS') {
      if (step === 1) {
        if (modalInput === 'CR@Secure2026IT') {
          setModalState({ ...modalState, step: 2 });
          setModalInput('');
        } else {
          setModalError('Incorrect login password.');
        }
      } else {
        if (modalInput === moduleLockConfig.defaultPassword) {
          setModuleLockConfig(prev => ({
            ...prev,
            defaultPassword: null,
            lockedModules: {}
          }));
          setToastMessage('All locks and default password removed.');
          setSavedToast(true);
          setTimeout(() => setSavedToast(false), 3000);
          closeModal();
        } else {
          setModalError('Incorrect default password.');
        }
      }
    } else if (type === 'SET_CUSTOM') {
      if (step === 1) {
        if (modalInput === moduleLockConfig.defaultPassword || modalInput === 'CR@Secure2026IT') {
          setModalState({ ...modalState, step: 2 });
          setModalInput('');
        } else {
          setModalError('Incorrect default password.');
        }
      } else {
        if (modalInput.length < 4) {
          setModalError('Password must be at least 4 characters.');
          return;
        }
        setModuleLockConfig(prev => ({
          ...prev,
          lockedModules: {
            ...prev.lockedModules,
            [targetModule]: {
              locked: true,
              useDefault: false,
              customPassword: modalInput
            }
          }
        }));
        setToastMessage(`Custom Password set for module.`);
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 3000);
        closeModal();
      }
    } else if (type === 'TOGGLE_GLOBAL_LOCK') {
      if (modalInput === moduleLockConfig.defaultPassword || modalInput === 'CR@Secure2026IT') {
        setModuleLockConfig(prev => ({ ...prev, globalLockEnabled: false }));
        setToastMessage('Global Module Locks Disabled.');
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 3000);
        closeModal();
      } else {
        setModalError('Incorrect password.');
      }
    } else if (type === 'UNLOCK_MODULE') {
      const moduleLock = moduleLockConfig.lockedModules[targetModule];
      const correctPassword = moduleLock.useDefault ? moduleLockConfig.defaultPassword : moduleLock.customPassword;
      if (modalInput === correctPassword || modalInput === 'CR@Secure2026IT') {
        setModuleLockConfig(prev => {
          const newLockedModules = { ...prev.lockedModules };
          delete newLockedModules[targetModule];
          return { ...prev, lockedModules: newLockedModules };
        });
        setToastMessage(`Module unlocked successfully.`);
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 3000);
        closeModal();
      } else {
        setModalError('Incorrect password.');
      }
    }
  };

  const handleGlobalLockToggle = () => {
    if (moduleLockConfig.globalLockEnabled) {
      if (!moduleLockConfig.defaultPassword) {
         setModuleLockConfig(prev => ({ ...prev, globalLockEnabled: false }));
      } else {
         openModal('TOGGLE_GLOBAL_LOCK');
      }
    } else {
      setModuleLockConfig(prev => ({ ...prev, globalLockEnabled: true }));
    }
  };

  const handleRemoveAllLocksClick = () => {
    const hasCustomLocks = Object.values(moduleLockConfig.lockedModules || {}).some(lock => lock.useDefault === false);
    if (hasCustomLocks) {
      setToastMessage('Cannot remove locks: Please remove all custom passwords manually first.');
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 4000);
      return;
    }
    openModal('REMOVE_ALL_LOCKS');
  };

  const toggleModuleLock = (moduleId) => {
    if (!moduleLockConfig.defaultPassword) {
      setToastMessage('Please set a Default Password first.');
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
      return;
    }
    
    setModuleLockConfig(prev => {
      const isCurrentlyLocked = prev.lockedModules?.[moduleId]?.locked;
      const newLockedModules = { ...prev.lockedModules };
      
      if (isCurrentlyLocked) {
        // Require password to unlock, do not unlock instantly
        // Using setTimeout to avoid state conflicts if called from within a render/effect cycle
        setTimeout(() => openModal('UNLOCK_MODULE', moduleId), 0);
        return prev;
      } else {
        // Lock it with default password instantly
        newLockedModules[moduleId] = { locked: true, useDefault: true, customPassword: null };
      }
      return { ...prev, lockedModules: newLockedModules };
    });
  };

  const toggleModulePasswordType = (moduleId) => {
    const isUsingDefault = moduleLockConfig.lockedModules[moduleId]?.useDefault;
    if (isUsingDefault) {
      openModal('SET_CUSTOM', moduleId);
    } else {
      // Revert to default password
      setModuleLockConfig(prev => ({
        ...prev,
        lockedModules: {
          ...prev.lockedModules,
          [moduleId]: { locked: true, useDefault: true, customPassword: null }
        }
      }));
      setToastMessage('Reverted to Default Password.');
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    }
  };

  const allModules = NEXORA_MODULES;
  
  const filteredModules = allModules.filter(m => {
    // If the parent matches, show it
    if ((m.name || '').toLowerCase().includes(searchQuery.toLowerCase())) return true;
    
    // Check if any sub-tools match the search query
    const mId = m.id || m.name;
    const subTools = ALL_SUB_TOOLS.filter(t => t.parentId === mId || t.parentId === m.name);
    return subTools.some(st => (st.name || '').toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const toggleExpand = (moduleId, e) => {
    if (e) e.stopPropagation();
    setActiveDropdown(prev => prev === moduleId ? null : moduleId);
  };

  const handleSave = () => {
    const updatedSettings = {
      sessionTimeout,
      require2FA,
      loginAlerts,
      suspiciousActivityAlerts
    };

    try {
      localStorage.setItem(SAVED_SECURITY_KEY, JSON.stringify(updatedSettings));
      // moduleLockConfig is auto-saved via useEffect
    } catch (e) {
      console.warn('Failed to save settings to localStorage:', e);
    }

    setToastMessage('Security Settings saved successfully!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleReset = () => {
    setSessionTimeout(DEFAULT_SETTINGS.sessionTimeout);
    setRequire2FA(DEFAULT_SETTINGS.require2FA);
    setLoginAlerts(DEFAULT_SETTINGS.loginAlerts);
    setSuspiciousActivityAlerts(DEFAULT_SETTINGS.suspiciousActivityAlerts);

    try {
      localStorage.removeItem(SAVED_SECURITY_KEY);
      localStorage.removeItem(SAVED_LOCK_KEY);
    } catch (e) {
      console.warn('Failed to clear localStorage on reset:', e);
    }

    setModuleLockConfig({ globalLockEnabled: false, defaultPassword: null, lockedModules: {} });

    setToastMessage('Security Settings reset to default values!');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleRevokeSession = (id) => {
    setActiveSessions(prev => prev.filter(session => session.id !== id));
    setToastMessage('Session revoked successfully.');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const timeoutOptions = ['5 Minutes', '15 Minutes', '30 Minutes', '1 Hour', 'Never'];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Back to Dashboard Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-xs hover:shadow-md text-slate-700 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#1e2a52]" />
          <span>Back</span>
        </button>
      )}

      {/* Main Wrapper */}
      <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden space-y-6">

        {/* Dynamic Toast Alert positioning */}
        {savedToast && (
          <div className="fixed top-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold z-50 transition-all duration-300 animate-bounce">
            <Check className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Platform Security Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-2xl">
            Manage account sessions, login history, password, device access, session timeout, and security alerts.
          </p>
        </div>

                {/* MODULE & CARD LOCKING SYSTEM PANEL */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col space-y-5">
          {/* Header & Global Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-md">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  Module & Card Locking System
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Restrict access to specific dashboard cards and platform sections.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <span className="text-sm font-bold text-slate-700">Enable Module Locks</span>
              <button
                type="button"
                onClick={handleGlobalLockToggle}
                className={`w-12 h-6.5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shadow-inner ${moduleLockConfig.globalLockEnabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-xs transform transition-transform duration-200 ${moduleLockConfig.globalLockEnabled ? 'translate-x-5.5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className={`transition-opacity duration-300 ${moduleLockConfig.globalLockEnabled ? 'opacity-100 pointer-events-auto' : 'opacity-40 pointer-events-none'}`}>
            {/* Default Password Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5">
              <div>
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Key className="w-4 h-4 text-indigo-600" />
                  Default Master Password
                </h4>
                <p className="text-[calc(11px*var(--text-scale,1))] text-slate-500 mt-0.5">Used as the fallback password for all locked modules.</p>
              </div>
              <div>
                {moduleLockConfig.defaultPassword ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal('RESET_DEFAULT')} className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors">
                      Reset Default Password
                    </button>
                    <button onClick={handleRemoveAllLocksClick} className="px-4 py-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 hover:text-red-700 text-xs font-bold rounded-lg shadow-2xs transition-colors">
                      Remove All Locks
                    </button>
                  </div>
                ) : (
                  <button onClick={() => openModal('SET_DEFAULT')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
                    Set Default Password
                  </button>
                )}
              </div>
            </div>

            {/* Modules List Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">Select Modules to Lock</h4>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search modules..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-indigo-500 w-48 sm:w-64"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredModules.map((module) => {
                  const mId = module.name; // Must match App.jsx pageId (tool.name)
                  const isLocked = !!moduleLockConfig.lockedModules?.[mId]?.locked;
                  const useDefault = !!moduleLockConfig.lockedModules?.[mId]?.useDefault !== false;
                  
                  // Get sub-tools for this module
                  const subTools = ALL_SUB_TOOLS.filter(t => t.parentId === mId || t.parentId === module.name);
                  
                  // Auto-expand logic if needed, but let's just use activeDropdown
                  const isExpanded = activeDropdown === mId || (searchQuery.trim().length > 0 && subTools.some(st => (st.name || '').toLowerCase().includes(searchQuery.toLowerCase())));
                  
                  return (
                    <div key={mId} className="flex flex-col gap-2 relative">
                      {/* Parent Module Card */}
                      <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${isLocked ? 'bg-indigo-50/50 border-indigo-200' : 'bg-white border-slate-200'}`}>
                        <div className="flex-1 min-w-0">
                          <span className="block text-xs font-bold text-slate-800 truncate">{module.name}</span>
                          <span className="block text-[calc(10px*var(--text-scale,1))] text-slate-500 truncate">{module.description}</span>
                          {subTools.length > 0 && (
                            <button 
                              onClick={(e) => toggleExpand(mId, e)}
                              className="mt-2 text-[calc(10px*var(--text-scale,1))] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors relative z-10"
                            >
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              {isExpanded ? 'Hide Inner Pages' : `View Inner Pages (${subTools.length})`}
                            </button>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 shrink-0 relative z-10">
                          {isLocked && (
                            <button 
                              onClick={() => toggleModulePasswordType(mId)}
                              className={`px-2 py-1 text-[calc(9px*var(--text-scale,1))] font-bold rounded flex items-center gap-1 transition-colors ${useDefault ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                              title={useDefault ? 'Using Default Password' : 'Using Custom Password'}
                            >
                              <Settings2 className="w-3 h-3" />
                              {useDefault ? 'Default' : 'Custom'}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => toggleModuleLock(mId)}
                            className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${isLocked ? 'bg-red-500' : 'bg-slate-300'}`}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform ${isLocked ? 'translate-x-4' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>

                      {/* Sub-Tools (Inner Pages) List as a Floating Box */}
                      {isExpanded && subTools.length > 0 && (
                        <div 
                          ref={dropdownRef}
                          className="absolute left-0 mt-2 top-[100%] w-full z-50 bg-white border border-slate-200/80 rounded-xl shadow-2xl py-2"
                        >
                          <div 
                            className="flex flex-col gap-2 max-h-[220px] overflow-y-auto custom-scrollbar px-3" 
                            data-lenis-prevent="true"
                          >
                          {subTools.map(subTool => {
                            const stId = subTool.id;
                            const stIsLocked = !!moduleLockConfig.lockedModules?.[stId]?.locked;
                            const stUseDefault = !!moduleLockConfig.lockedModules?.[stId]?.useDefault;

                            return (
                              <div key={stId} className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 transition-colors ${stIsLocked ? 'bg-indigo-50/30 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}>
                                <div className="flex-1 min-w-0">
                                  <span className="block text-[calc(11px*var(--text-scale,1))] font-bold text-slate-700 truncate">{subTool.name}</span>
                                  <span className="block text-[calc(9px*var(--text-scale,1))] text-slate-400 truncate">{subTool.desc}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {stIsLocked && (
                                    <button 
                                      onClick={() => toggleModulePasswordType(stId)}
                                      className={`px-1.5 py-0.5 text-[calc(8px*var(--text-scale,1))] font-bold rounded flex items-center gap-1 transition-colors ${stUseDefault ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                                      title={stUseDefault ? 'Using Default Password' : 'Using Custom Password'}
                                    >
                                      <Settings2 className="w-2.5 h-2.5" />
                                      {stUseDefault ? 'Default' : 'Custom'}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => toggleModuleLock(stId)}
                                    className={`w-7 h-4 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${stIsLocked ? 'bg-red-500' : 'bg-slate-300'}`}
                                  >
                                    <div className={`bg-white w-3 h-3 rounded-full shadow-xs transform transition-transform ${stIsLocked ? 'translate-x-3' : 'translate-x-0'}`} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FULL WIDTH PANEL: Active Sessions & History */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs">
                <History className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Active Sessions & Login History
                </h3>
                <p className="text-[calc(11px*var(--text-scale,1))] sm:text-xs text-slate-500 font-medium">
                  Review and revoke access from unrecognized devices.
                </p>
              </div>
            </div>
            {activeSessions.length > 1 && (
              <button 
                onClick={() => {
                  setActiveSessions(activeSessions.filter(s => s.current));
                  setToastMessage('All other sessions revoked.');
                  setSavedToast(true);
                  setTimeout(() => setSavedToast(false), 2500);
                }}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 rounded-lg transition-colors"
              >
                Revoke All Others
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-[calc(10px*var(--text-scale,1))] uppercase font-extrabold text-slate-500 tracking-wider">
                  <th className="p-3 pl-4">Device / Browser</th>
                  <th className="p-3 hidden sm:table-cell">IP Address</th>
                  <th className="p-3 hidden md:table-cell">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right pr-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-white transition-colors group">
                    <td className="p-3 pl-4 flex items-center gap-2">
                      {session.device.includes('iPhone') || session.device.includes('Mobile') 
                        ? <Smartphone className="w-4 h-4 text-slate-400" /> 
                        : <Monitor className="w-4 h-4 text-slate-400" />}
                      <span className="text-xs font-bold text-slate-700">{session.device}</span>
                    </td>
                    <td className="p-3 text-xs text-slate-500 font-mono hidden sm:table-cell">{session.ip}</td>
                    <td className="p-3 text-xs text-slate-500 hidden md:table-cell">{session.location}</td>
                    <td className="p-3">
                      {session.current ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[calc(10px*var(--text-scale,1))] font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Current
                        </span>
                      ) : (
                        <span className="text-[calc(10px*var(--text-scale,1))] font-medium text-slate-400">{session.time}</span>
                      )}
                    </td>
                    <td className="p-3 text-right pr-4">
                      {!session.current && (
                        <button 
                          onClick={() => handleRevokeSession(session.id)}
                          className="inline-flex items-center justify-center p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Revoke Session"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {activeSessions.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-xs text-slate-400 font-medium">No active sessions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

{/* TOP ROW GRID (2 PANELS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PANEL 1: Access Control */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 shadow-2xs">
                  <Lock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Access & Authentication
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Secure your account credentials and sessions.
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-5 pt-2">
                {/* Change Password (Dummy Button) */}
                <div className="flex items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Password</span>
                      <span className="text-[calc(10.5px*var(--text-scale,1))] text-slate-400">Last changed 45 days ago</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs">
                    Update
                  </button>
                </div>

                {/* Switch: Require 2FA */}
                <div className="flex items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Two-Factor Auth (2FA)</span>
                      <span className="text-[calc(10.5px*var(--text-scale,1))] text-slate-400">Require code on new device logins</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequire2FA(!require2FA)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${require2FA ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${require2FA ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Dropdown: Session Timeout */}
                <div className="flex items-center justify-between gap-2 pt-1 px-1 relative">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Session Timeout</span>
                      <span className="text-[calc(10.5px*var(--text-scale,1))] text-slate-400">Auto-logout after inactivity</span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setTimeoutDropdownOpen(!timeoutDropdownOpen)}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-2 shadow-2xs hover:border-slate-400 cursor-pointer min-w-[110px] justify-between"
                    >
                      <span>{sessionTimeout}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                    {timeoutDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 py-1 min-w-[120px]">
                        {timeoutOptions.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              setSessionTimeout(opt);
                              setTimeoutDropdownOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-indigo-50 ${sessionTimeout === opt ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'}`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* PANEL 2: Alerts & Monitoring */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 shadow-2xs">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Alerts & Monitoring
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Get notified about unusual activities.
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-5 pt-2">
                {/* Switch: Login Alerts */}
                <div className="flex items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">New Device Logins</span>
                      <span className="text-[calc(10.5px*var(--text-scale,1))] text-slate-400">Receive alerts on unrecognized devices</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLoginAlerts(!loginAlerts)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${loginAlerts ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${loginAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Switch: Suspicious Activity */}
                <div className="flex items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-800">Suspicious Activity</span>
                      <span className="text-[calc(10.5px*var(--text-scale,1))] text-slate-400">Alerts for failed logins or abnormal usage</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSuspiciousActivityAlerts(!suspiciousActivityAlerts)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${suspiciousActivityAlerts ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200 ${suspiciousActivityAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                
                <div className="p-3 mt-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-2.5">
                   <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                   <p className="text-[calc(10px*var(--text-scale,1))] sm:text-xs font-medium text-amber-800 leading-relaxed">
                     We recommend keeping all security alerts enabled to prevent unauthorized access to the intelligence platform.
                   </p>
                </div>

              </div>
            </div>
          </div>
        </div>


        {/* BOTTOM ACTION BUTTONS: RESET & SAVE */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-sm font-bold rounded-xl shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2.5 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4.5 h-4.5" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>

      {/* PASSWORD MODAL OVERLAY */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="p-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
                {modalState.type === 'SET_DEFAULT' && modalState.step === 1 && 'Verify Login'}
                {modalState.type === 'SET_DEFAULT' && modalState.step === 2 && 'Set Default Password'}
                {modalState.type === 'RESET_DEFAULT' && modalState.step === 1 && 'Verify Current Default'}
                {modalState.type === 'RESET_DEFAULT' && modalState.step === 2 && 'Set New Default Password'}
                {modalState.type === 'SET_CUSTOM' && modalState.step === 1 && 'Verify Default Password'}
                {modalState.type === 'SET_CUSTOM' && modalState.step === 2 && 'Set Custom Password'}
                {modalState.type === 'TOGGLE_GLOBAL_LOCK' && 'Verify to Disable'}
                {modalState.type === 'UNLOCK_MODULE' && 'Verify to Unlock'}
                {modalState.type === 'REMOVE_ALL_LOCKS' && modalState.step === 1 && 'Master Verification'}
                {modalState.type === 'REMOVE_ALL_LOCKS' && modalState.step === 2 && 'Confirm Deletion'}
              </h3>
              <p className="text-xs text-slate-500 text-center mb-6">
                {modalState.type === 'SET_DEFAULT' && modalState.step === 1 && 'Enter your account login password to continue.'}
                {modalState.type === 'SET_DEFAULT' && modalState.step === 2 && 'Enter a new master lock password for the modules.'}
                {modalState.type === 'RESET_DEFAULT' && modalState.step === 1 && 'Enter your current default lock password.'}
                {modalState.type === 'RESET_DEFAULT' && modalState.step === 2 && 'Enter your new default lock password.'}
                {modalState.type === 'SET_CUSTOM' && modalState.step === 1 && 'Enter the default lock password to authorize custom password creation.'}
                {modalState.type === 'SET_CUSTOM' && modalState.step === 2 && `Enter a unique lock password for ${modalState.targetModule}.`}
                {modalState.type === 'TOGGLE_GLOBAL_LOCK' && 'Enter your default lock password to disable global locks.'}
                {modalState.type === 'UNLOCK_MODULE' && 'Enter the required lock password to disable this lock.'}
                {modalState.type === 'REMOVE_ALL_LOCKS' && modalState.step === 1 && 'Enter your account login password to authorize this action.'}
                {modalState.type === 'REMOVE_ALL_LOCKS' && modalState.step === 2 && 'Enter the default lock password to completely remove all module locks.'}
              </p>

              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all pr-10"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                {modalError && (
                  <p className="text-[calc(11px*var(--text-scale,1))] font-bold text-red-500 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {modalError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  {modalState.step === 1 ? 'Verify & Continue' : 'Save Password'}
                  {modalState.step === 1 && <ChevronDown className="w-4 h-4 -rotate-90" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
