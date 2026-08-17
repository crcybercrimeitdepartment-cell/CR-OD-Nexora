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
  EyeOff,
  Power,
  MessageSquare
} from 'lucide-react';
import { NEXORA_MODULES } from '../../data/nexora';
import { ALL_SUB_TOOLS } from '../../data/subTools';

const SAVED_STATUS_KEY = 'nexora_module_status_v1';

export default function ModuleManagementPage({ onBack }) {

  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // MODULE STATUS STATE
  const [moduleStatusConfig, setModuleStatusConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(SAVED_STATUS_KEY);
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {
      globalManagementEnabled: true,
      defaultTitle: 'Currently in Production',
      defaultMessage: 'This module is currently disabled and undergoing development. Please try again later.',
      disabledModules: {}
    };
  });

  // Auto-save status settings and notify App.jsx
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STATUS_KEY, JSON.stringify(moduleStatusConfig));
      window.dispatchEvent(new Event('moduleStatusUpdate'));
    } catch (e) {
      console.warn('Failed to auto-save status:', e);
    }
  }, [moduleStatusConfig]);

  // Search & Expand State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('All');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Custom Message Modal State
  const [modalState, setModalState] = useState({ isOpen: false, targetModule: null, title: '', message: '' });

  const openMessageModal = (moduleId, e) => {
    if (e) e.stopPropagation();
    let currentTitle = '';
    let currentMsg = '';
    
    if (moduleId === 'GLOBAL_DEFAULT') {
      currentTitle = moduleStatusConfig.defaultTitle || 'Currently in Production';
      currentMsg = moduleStatusConfig.defaultMessage || 'This module is currently disabled and undergoing development. Please try again later.';
    } else {
      const config = moduleStatusConfig.disabledModules?.[moduleId];
      if (typeof config === 'object' && config !== null) {
        currentTitle = config.title || '';
        currentMsg = config.message || '';
      } else if (typeof config === 'string') {
        currentTitle = '';
        currentMsg = config;
      }
    }
    setModalState({
      isOpen: true,
      targetModule: moduleId,
      title: currentTitle,
      message: currentMsg
    });
  };

  const saveCustomMessage = (e) => {
    e.preventDefault();
    if (modalState.targetModule === 'GLOBAL_DEFAULT') {
      setModuleStatusConfig(prev => ({
        ...prev,
        defaultTitle: modalState.title.trim() || 'Currently in Production',
        defaultMessage: modalState.message.trim() || 'This module is currently disabled and undergoing development. Please try again later.'
      }));
      setToastMessage('Global default alert updated');
    } else {
      const t = modalState.title.trim();
      const m = modalState.message.trim();
      let newConfig;
      if (!t && !m) newConfig = true;
      else if (!t && m) newConfig = m;
      else newConfig = { title: t, message: m };

      setModuleStatusConfig(prev => ({
        ...prev,
        disabledModules: {
          ...prev.disabledModules,
          [modalState.targetModule]: newConfig
        }
      }));
      setToastMessage('Custom alert saved');
    }
    
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
    setModalState({ isOpen: false, targetModule: null, title: '', message: '' });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGlobalStatusToggle = () => {
    setModuleStatusConfig(prev => ({ ...prev, globalManagementEnabled: !prev.globalManagementEnabled }));
  };

  const toggleModuleStatus = (moduleId) => {
    if (!moduleStatusConfig.globalManagementEnabled) return;

    setModuleStatusConfig(prev => {
      const isDisabled = prev.disabledModules?.[moduleId];
      const newDisabledModules = { ...prev.disabledModules };
      
      if (isDisabled) {
        // Enable it
        delete newDisabledModules[moduleId];
        setToastMessage(`Module Enabled`);
      } else {
        // Disable it
        newDisabledModules[moduleId] = true;
        setToastMessage(`Module Disabled`);
      }
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
      return { ...prev, disabledModules: newDisabledModules };
    });
  };

  const handleEnableAllClick = () => {
    setModuleStatusConfig(prev => ({ ...prev, disabledModules: {} }));
    setToastMessage('All Modules Enabled');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleRestoreDefaults = () => {
    setModuleStatusConfig({
      globalManagementEnabled: true,
      defaultTitle: 'Currently in Production',
      defaultMessage: 'This module is currently disabled and undergoing development. Please try again later.',
      disabledModules: {}
    });
    setToastMessage('Restored to default settings');
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const allModules = NEXORA_MODULES;
  
  const filteredModules = allModules.filter(m => {
    const mId = m.id || m.name;
    const isParentDisabled = !!moduleStatusConfig.disabledModules?.[mId] || !!moduleStatusConfig.disabledModules?.[m.name];
    
    const subTools = ALL_SUB_TOOLS.filter(t => t.parentId === mId || t.parentId === m.name);
    const hasDisabledSubTool = subTools.some(st => !!moduleStatusConfig.disabledModules?.[st.id]);
    const hasEnabledSubTool = subTools.some(st => !moduleStatusConfig.disabledModules?.[st.id]);

    const matchesSearch = searchQuery.trim() === '' || 
                          (m.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          subTools.some(st => (st.name || '').toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterTab === 'Enabled') {
      return !isParentDisabled || hasEnabledSubTool;
    }
    if (filterTab === 'Disabled') {
      return isParentDisabled || hasDisabledSubTool;
    }

    return true;
  });

  const enabledCount = allModules.filter(m => {
    const mId = m.id || m.name;
    const isParentDisabled = !!moduleStatusConfig.disabledModules?.[mId] || !!moduleStatusConfig.disabledModules?.[m.name];
    const subTools = ALL_SUB_TOOLS.filter(t => t.parentId === mId || t.parentId === m.name);
    const hasEnabledSubTool = subTools.some(st => !moduleStatusConfig.disabledModules?.[st.id]);
    return !isParentDisabled || hasEnabledSubTool;
  }).length;

  const disabledCount = allModules.filter(m => {
    const mId = m.id || m.name;
    const isParentDisabled = !!moduleStatusConfig.disabledModules?.[mId] || !!moduleStatusConfig.disabledModules?.[m.name];
    const subTools = ALL_SUB_TOOLS.filter(t => t.parentId === mId || t.parentId === m.name);
    const hasDisabledSubTool = subTools.some(st => !!moduleStatusConfig.disabledModules?.[st.id]);
    return isParentDisabled || hasDisabledSubTool;
  }).length;

  const toggleExpand = (moduleId, e) => {
    if (e) e.stopPropagation();
    setActiveDropdown(prev => prev === moduleId ? null : moduleId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-xs hover:shadow-md text-slate-700 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#1e2a52]" />
          <span>Back</span>
        </button>
      )}

      <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden space-y-6">

        {savedToast && (
          <div className="fixed top-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold z-50 transition-all duration-300 animate-bounce">
            <Check className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Module Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-2xl">
            Configure, install, and manage platform modules. Enable or disable modules dynamically.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-md">
                <Settings2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  Module Status
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Toggle platform features on or off without deleting them.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <span className="text-sm font-bold text-slate-700">Enable Module Management</span>
              <button
                type="button"
                onClick={handleGlobalStatusToggle}
                className={`w-12 h-6.5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shadow-inner ${moduleStatusConfig.globalManagementEnabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-xs transform transition-transform duration-200 ${moduleStatusConfig.globalManagementEnabled ? 'translate-x-5.5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className={`transition-opacity duration-300 ${moduleStatusConfig.globalManagementEnabled ? 'opacity-100 pointer-events-auto' : 'opacity-40 pointer-events-none'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Power className="w-4 h-4 text-emerald-600" />
                    Quick Actions
                  </h4>
                  <p className="text-[calc(11px*var(--text-scale,1))] text-slate-500 mt-0.5">Quickly enable all disabled modules.</p>
                </div>
                <div className="flex items-center gap-2">
                   <button onClick={handleRestoreDefaults} className="px-3 py-2 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5" title="Restore Default Settings">
                     <RotateCcw className="w-3.5 h-3.5" />
                   </button>
                   <button onClick={handleEnableAllClick} className="px-4 py-2 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 text-xs font-bold rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer">
                     Enable All Modules
                   </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    Global Default Alert
                  </h4>
                  <div className="mt-1 pr-4">
                    <p className="text-xs font-bold text-slate-700 truncate">{moduleStatusConfig.defaultTitle || 'Currently in Production'}</p>
                    <p className="text-[calc(10px*var(--text-scale,1))] text-slate-500 line-clamp-1 mt-0.5">
                      {moduleStatusConfig.defaultMessage || 'This module is currently disabled and undergoing development. Please try again later.'}
                    </p>
                  </div>
                </div>
                <div>
                   <button onClick={() => openMessageModal('GLOBAL_DEFAULT')} className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer">
                     Edit Default Alert
                   </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Status Filter Tabs */}
                <div className="flex p-1 bg-slate-100 rounded-lg shrink-0">
                  <button 
                    onClick={() => setFilterTab('All')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filterTab === 'All' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    All ({allModules.length})
                  </button>
                  <button 
                    onClick={() => setFilterTab('Enabled')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filterTab === 'Enabled' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Enabled ({enabledCount})
                  </button>
                  <button 
                    onClick={() => setFilterTab('Disabled')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filterTab === 'Disabled' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Disabled ({disabledCount})
                  </button>
                </div>

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
                  const uniqueKey = module.id || module.name;
                  const mId = module.name; // ID used for toggling
                  const isDisabled = !!moduleStatusConfig.disabledModules?.[uniqueKey] || !!moduleStatusConfig.disabledModules?.[mId];
                  
                  const subTools = ALL_SUB_TOOLS.filter(t => t.parentId === uniqueKey || t.parentId === mId);
                  
                  // Filter visible sub-tools based on tab
                  const visibleSubTools = subTools.filter(st => {
                    if (filterTab === 'All') return true;
                    const stIsDisabled = !!moduleStatusConfig.disabledModules?.[st.id];
                    if (filterTab === 'Enabled') return !stIsDisabled;
                    if (filterTab === 'Disabled') return stIsDisabled;
                    return true;
                  });

                  const isExpanded = activeDropdown === uniqueKey || (searchQuery.trim().length > 0 && subTools.some(st => (st.name || '').toLowerCase().includes(searchQuery.toLowerCase())));
                  
                  return (
                    <div key={uniqueKey} className="flex flex-col gap-2 relative">
                      <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${isDisabled ? 'bg-slate-50/50 border-slate-200/50 opacity-60' : 'bg-white border-emerald-200'}`}>
                        <div className="flex-1 min-w-0">
                          <span className={`block text-xs font-bold truncate ${isDisabled ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{module.name}</span>
                          <span className="block text-[calc(10px*var(--text-scale,1))] text-slate-500 truncate">{module.description}</span>
                          {visibleSubTools.length > 0 && (
                            <button 
                              onClick={(e) => toggleExpand(uniqueKey, e)}
                              className="mt-2 text-[calc(10px*var(--text-scale,1))] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors relative z-10 cursor-pointer"
                            >
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              {isExpanded ? 'Hide Inner Pages' : `View Inner Pages (${visibleSubTools.length})`}
                            </button>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 shrink-0 relative z-10">
                          {isDisabled && (
                            <button
                              type="button"
                              onClick={(e) => openMessageModal(uniqueKey, e)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                              title="Customize Disabled Message"
                            >
                              <Settings2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => toggleModuleStatus(mId)}
                            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${!isDisabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                            title={!isDisabled ? 'Enabled' : 'Disabled'}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform ${!isDisabled ? 'translate-x-4' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>

                      {isExpanded && visibleSubTools.length > 0 && (
                        <div 
                          ref={dropdownRef}
                          className="absolute left-0 mt-2 top-[100%] w-full z-50 bg-white border border-slate-200/80 rounded-xl shadow-2xl py-2"
                        >
                          <div 
                            className="flex flex-col gap-2 max-h-[220px] overflow-y-auto custom-scrollbar px-3" 
                            data-lenis-prevent="true"
                          >
                          {visibleSubTools.map(subTool => {
                            const stId = subTool.id;
                            const stIsDisabled = !!moduleStatusConfig.disabledModules?.[stId];

                            return (
                              <div key={stId} className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 transition-colors ${stIsDisabled ? 'bg-slate-50/50 border-slate-100 opacity-60' : 'bg-white border-emerald-100'}`}>
                                <div className="flex-1 min-w-0">
                                  <span className={`block text-[calc(11px*var(--text-scale,1))] font-bold truncate ${stIsDisabled ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{subTool.name}</span>
                                  <span className="block text-[calc(9px*var(--text-scale,1))] text-slate-400 truncate">{subTool.desc}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {stIsDisabled && (
                                    <button
                                      type="button"
                                      onClick={(e) => openMessageModal(stId, e)}
                                      className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                                      title="Customize Disabled Message"
                                    >
                                      <Settings2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => toggleModuleStatus(stId)}
                                    className={`w-8 h-4.5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${!stIsDisabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                  >
                                    <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-xs transform transition-transform ${!stIsDisabled ? 'translate-x-3.5' : 'translate-x-0'}`} />
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
      </div>

      {/* CUSTOM MESSAGE MODAL OVERLAY */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in relative border border-slate-200">
            <button onClick={() => setModalState({ isOpen: false, targetModule: null, title: '', message: '' })} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="p-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 mx-auto border border-indigo-100">
                <Settings2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
                Customize Alert
              </h3>
              <p className="text-xs text-slate-500 text-center mb-6">
                Configure the alert shown when users try to access <span className="font-bold">{modalState.targetModule === 'GLOBAL_DEFAULT' ? 'disabled modules' : modalState.targetModule}</span>.
              </p>

              <form onSubmit={saveCustomMessage} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">Alert Title</label>
                  <input
                    type="text"
                    value={modalState.title}
                    onChange={(e) => setModalState({ ...modalState, title: e.target.value })}
                    placeholder="e.g. Currently in Production"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">Alert Message</label>
                  <textarea
                    value={modalState.message}
                    onChange={(e) => setModalState({ ...modalState, message: e.target.value })}
                    placeholder="e.g. This module is undergoing maintenance..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none h-24"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 ml-1">Leave blank to use defaults.</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Save className="w-4 h-4" />
                  Save Configuration
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
