import React, { useState, useRef, useEffect } from 'react';
import { FileText, Database, Calendar, User, Info, Folder, HardDrive, Search, File, UploadCloud, FileAudio, AlertCircle, Video, RefreshCw, Trash2, Filter, RefreshCcw, Download, ChevronDown, ShieldCheck, X, AlertTriangle, ShieldAlert, XCircle, Clock, CheckCircle2 } from 'lucide-react';
import { summaryStats, deleteHistoryData } from './deleteHistoryData';

const componentStyles = `
  .card {
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  }
  .btn-outline {
    border: 1px solid #e2e8f0;
    color: #64748b;
    transition: background-color 0.2s, color 0.2s;
    font-weight: 500;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .btn-outline:hover {
    background-color: #f8fafc;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 9999px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #cbd5e1;
  }
`;

export const DeletedItemDetails = ({ item }) => {
  if (!item) {
    return (
      <div className="card p-5 h-full flex flex-col bg-white">
        <CardHeader number={2} title="Deleted Item Details" />
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
          <Info className="w-10 h-10 mb-2 text-slate-200" />
          <p className="text-sm">Select an item to view details</p>
        </div>
      </div>
    );
  }

  const DetailRow = ({ icon: Icon, label, value, isBadge = false }) => (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
      <div className="mt-0.5 text-slate-400">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="text-xs text-slate-500 mb-0.5">{label}</div>
        {isBadge ? (
          <StatusBadge status={value} />
        ) : (
          <div className="text-sm font-medium text-slate-800">{value}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="card p-5 h-full flex flex-col bg-white">
      <CardHeader number={2} title="Deleted Item Details" />
      
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-100">
          <div className="text-xs text-slate-500 mb-1">Deletion ID</div>
          <div className="text-sm font-mono font-bold text-blue-700">{item.deletionId}</div>
        </div>

        <DetailRow icon={FileText} label="Item Name" value={item.itemName} />
        <DetailRow icon={Database} label="Record ID" value={item.recordId} />
        <DetailRow icon={Folder} label="Module / Type" value={`${item.module} — ${item.itemType}`} />
        
        <div className="flex gap-4 py-2.5 border-b border-slate-100">
          <div className="flex-1">
            <div className="text-xs text-slate-500 mb-0.5">Case ID</div>
            <div className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block border border-blue-100">{item.caseId}</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-500 mb-0.5">Investigation ID</div>
            <div className="text-sm font-medium text-slate-800">{item.investigationId}</div>
          </div>
        </div>

        <DetailRow icon={Calendar} label="Deleted Date & Time" value={`${item.deletedDate}, ${item.deletedTime}`} />
        <DetailRow icon={User} label="Deleted By" value={item.deletedBy} />
        <DetailRow icon={Info} label="Deletion Reason" value={item.deletionReason} />
        <DetailRow icon={Info} label="Deletion Status" value={item.status} isBadge={true} />
        <DetailRow icon={Calendar} label="Retention / Deletion Deadline" value={item.retentionDeadline} />
      </div>
    </div>
  );
};


const getModuleIcon = (type) => {
  switch (type) {
    case 'Report': return <FileText className="w-4 h-4 text-blue-500" />;
    case 'Evidence': return <HardDrive className="w-4 h-4 text-purple-500" />;
    case 'CDR': return <Search className="w-4 h-4 text-teal-500" />;
    case 'Document': return <File className="w-4 h-4 text-slate-500" />;
    case 'Export': return <UploadCloud className="w-4 h-4 text-green-500" />;
    case 'Transcript': return <FileAudio className="w-4 h-4 text-orange-500" />;
    case 'Video': return <Video className="w-4 h-4 text-red-500" />;
    default: return <FileText className="w-4 h-4 text-slate-400" />;
  }
};

export const DeletedItemsTable = ({ items, selectedItem, onSelectItem, onRestore, onPermanentDelete }) => {
  return (
    <div className="card p-5 h-full flex flex-col bg-white">
      <CardHeader number={1} title="Deleted Items" />
      
      <div className="flex-1 overflow-auto w-full custom-scrollbar">
        <div className="min-w-[900px]">
          <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider rounded-tl-md">Item</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Module</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Case / Inv ID</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date & Time</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Deleted By</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right rounded-tr-md">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr 
                key={item.deletionId}
                onClick={() => onSelectItem(item)}
                className={`hover:bg-blue-50/50 cursor-pointer transition-colors duration-150 group ${selectedItem?.deletionId === item.deletionId ? 'bg-blue-50/80' : ''}`}
              >
                <td className="py-3 px-4 align-top">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                      {getModuleIcon(item.itemType)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-800">{item.itemName}</div>
                      <div className="text-xs text-slate-500 mt-0.5 bg-slate-100 inline-block px-1.5 py-0.5 rounded">{item.itemType}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 align-top">
                  <span className="text-sm text-slate-600">{item.module}</span>
                </td>
                <td className="py-3 px-4 align-top">
                  <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-1 inline-block border border-blue-100">{item.caseId}</div>
                  <div className="text-xs text-slate-500 block">{item.investigationId}</div>
                </td>
                <td className="py-3 px-4 align-top">
                  <div className="text-sm text-slate-800 font-medium">{item.deletedDate}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.deletedTime}</div>
                </td>
                <td className="py-3 px-4 align-top">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {item.deletedBy.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm text-slate-700">{item.deletedBy}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[100px]" title={item.deletionReason}>{item.deletionReason}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 align-top">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3 px-4 align-top text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSelectItem(item); }}
                      className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium px-2 py-1"
                    >
                      View
                    </button>
                    {item.status === 'Restore Available' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onRestore(item); }}
                        className="text-xs text-green-600 hover:text-green-800 hover:underline font-medium px-2 py-1"
                      >
                        Restore
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-500">
                  <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p>No deleted records found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
        <div>Showing 1 to {items.length} of {items.length} entries</div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-slate-200 rounded text-slate-400 cursor-not-allowed">Prev</button>
          <button className="px-3 py-1 border border-slate-200 bg-blue-50 text-blue-600 rounded">1</button>
          <button className="px-3 py-1 border border-slate-200 rounded text-slate-400 cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
};


export const DeleteHistoryActions = () => {
  const ActionButton = ({ icon: Icon, title, description, colorClass }) => (
    <button className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-left w-full group">
      <div className={`mt-0.5 p-2 rounded-md ${colorClass} group-hover:scale-110 transition-transform`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-800">{title}</div>
        <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{description}</div>
      </div>
    </button>
  );

  return (
    <div className="card p-5 h-full flex flex-col bg-white">
      <CardHeader number={7} title="Delete History Actions" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 flex-1 content-start">
        <ActionButton icon={Info} title="View Details" description="See complete deleted item information." colorClass="bg-blue-50 text-blue-600" />
        <ActionButton icon={RefreshCw} title="Restore" description="Restore recoverable records." colorClass="bg-green-50 text-green-600" />
        <ActionButton icon={Trash2} title="Permanent Delete" description="Permanently delete approved records." colorClass="bg-red-50 text-red-600" />
        <ActionButton icon={Search} title="Search" description="Search deleted history." colorClass="bg-purple-50 text-purple-600" />
        <ActionButton icon={Filter} title="Filter" description="Filter deleted records." colorClass="bg-orange-50 text-orange-600" />
        <ActionButton icon={RefreshCcw} title="Refresh" description="Refresh deletion history." colorClass="bg-teal-50 text-teal-600" />
        <ActionButton icon={Download} title="Export" description="Export delete history." colorClass="bg-slate-100 text-slate-600" />
      </div>
    </div>
  );
};


const CustomSelect = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 hover:bg-white cursor-pointer flex justify-between items-center outline-none focus:ring-1 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`truncate pr-2 ${selected === placeholder ? 'text-slate-700' : 'text-slate-900'}`}>{selected}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="relative z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option, idx) => (
              <div 
                key={idx}
                className="px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const DeleteHistoryFilters = () => {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="card p-5 h-full flex flex-col bg-white">
      <CardHeader number={6} title="Delete History Search & Filters" />
      
      <div key={resetKey} className="space-y-4 flex-1">
        <div>
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Search</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input type="text" placeholder="Search item name..." className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none" />
            <input type="text" placeholder="e.g. RPT-88521" className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none" />
            <input type="text" placeholder="Search case ID..." className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none" />
            <input type="text" placeholder="Search investigation ID..." className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
        </div>
        
        <div>
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Filters</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            <CustomSelect placeholder="Select Date Range" options={['Select Date Range', 'Last 7 Days', 'Last 30 Days']} />
            <CustomSelect placeholder="All Modules" options={['All Modules', 'Reports', 'Digital Evidence']} />
            <CustomSelect placeholder="All Types" options={['All Types', 'Report', 'Document']} />
            <CustomSelect placeholder="All Status" options={['All Status', 'Restore Available', 'Permanently Deleted']} />
            <CustomSelect placeholder="All Users" options={['All Users', 'Admin User', 'Investigator']} />
            <CustomSelect placeholder="All Approval Status" options={['All Approval Status', 'Pending', 'Approved']} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
        <button onClick={handleReset} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
          Reset
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Apply Filters
        </button>
      </div>
    </div>
  );
};


export const DeleteHistoryHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-xl border border-slate-200 card-shadow mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Delete History</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track, review and manage deleted records, restoration requests and permanent deletion activities across the NEXORA platform.
        </p>
      </div>
      <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 px-4 py-2 rounded-lg w-full sm:w-auto">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-green-800">Your account is secure</span>
            <span className="text-[10px] text-green-600">Last checked: 2 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};


const ModalOverlay = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const ViewDetailsModal = ({ isOpen, onClose, item, onRestore, onPermanentDelete }) => {
  if (!item) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="text-lg font-bold text-slate-800">Deleted Item Details</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-200">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-5 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
          <div className="col-span-2 bg-blue-50/50 border border-blue-100 p-3 rounded-lg mb-2">
            <div className="text-xs text-slate-500 mb-1">Deletion ID</div>
            <div className="text-sm font-mono font-bold text-blue-700">{item.deletionId}</div>
          </div>
          
          <div className="col-span-2">
            <div className="text-xs text-slate-500 mb-1">Item Name</div>
            <div className="text-sm font-medium text-slate-800">{item.itemName}</div>
          </div>
          
          <div>
            <div className="text-xs text-slate-500 mb-1">Item Type</div>
            <div className="text-sm text-slate-800">{item.itemType}</div>
          </div>
          
          <div>
            <div className="text-xs text-slate-500 mb-1">Record ID</div>
            <div className="text-sm font-mono text-slate-700">{item.recordId}</div>
          </div>
          
          <div>
            <div className="text-xs text-slate-500 mb-1">Module</div>
            <div className="text-sm text-slate-800">{item.module}</div>
          </div>
          
          <div>
            <div className="text-xs text-slate-500 mb-1">Deletion Status</div>
            <StatusBadge status={item.status} />
          </div>
          
          <div className="col-span-2 border-t border-slate-100 pt-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">Case ID</div>
                <div className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block border border-blue-100">{item.caseId}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Investigation ID</div>
                <div className="text-sm font-medium text-slate-800">{item.investigationId}</div>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 border-t border-slate-100 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">Deleted By</div>
                <div className="text-sm text-slate-800">{item.deletedBy}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Deleted Date & Time</div>
                <div className="text-sm text-slate-800">{item.deletedDate}, {item.deletedTime}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-slate-500 mb-1">Deletion Reason</div>
                <div className="text-sm text-slate-800 bg-slate-50 p-2 rounded border border-slate-100">{item.deletionReason}</div>
              </div>
              <div className="col-span-2 mt-2">
                <div className="text-xs text-slate-500 mb-1">Retention Deadline</div>
                <div className="text-sm text-red-600 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> {item.retentionDeadline}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
        <button onClick={onClose} className="btn-outline">
          Close
        </button>
        {item.status === 'Restore Available' && (
          <button onClick={() => { onClose(); onRestore(item); }} className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm transition-colors">
            Restore Record
          </button>
        )}
        {item.approvalStatus === 'Approved' && item.status !== 'Permanently Deleted' && (
          <button onClick={() => { onClose(); onPermanentDelete(item); }} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors">
            Permanent Delete
          </button>
        )}
      </div>
    </ModalOverlay>
  );
};

export const PermanentDeleteModal = ({ isOpen, onClose, item, onConfirm }) => {
  const [confirmed, setConfirmed] = useState(false);
  
  // Reset state when opened
  React.useEffect(() => {
    if (isOpen) setConfirmed(false);
  }, [isOpen]);

  if (!item) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center p-4 border-b border-red-100 bg-red-50">
        <h3 className="text-lg font-bold text-red-700 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Confirm Permanent Deletion
        </h3>
        <button onClick={onClose} className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-100">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-5">
        <div className="mb-4 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-800">⚠ This action cannot be undone.</h4>
          <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
            You are about to permanently delete this record from the NEXORA platform. It will be unrecoverable.
          </p>
        </div>
        
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500">Item</div>
              <div className="text-sm font-semibold text-slate-800">{item.itemName}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Record ID</div>
              <div className="text-sm font-mono text-slate-700">{item.recordId}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Case</div>
              <div className="text-sm text-slate-800">{item.caseId}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Investigation</div>
              <div className="text-sm text-slate-800">{item.investigationId}</div>
            </div>
          </div>
        </div>
        
        <label className="flex items-start gap-3 cursor-pointer group bg-red-50/50 p-3 rounded-lg border border-red-100">
          <input 
            type="checkbox" 
            className="mt-0.5 rounded text-red-600 focus:ring-red-500 border-slate-300 cursor-pointer w-4 h-4"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
            I understand that this action is irreversible and the record will be permanently destroyed.
          </span>
        </label>
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors">
          Cancel
        </button>
        <button 
          onClick={() => { onConfirm(); onClose(); }} 
          disabled={!confirmed}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 ${
            confirmed ? 'bg-red-600 hover:bg-red-700 shadow-sm' : 'bg-red-300 cursor-not-allowed'
          }`}
        >
          Confirm Permanent Delete
        </button>
      </div>
    </ModalOverlay>
  );
};


export const DeletionApproval = ({ item }) => {
  if (!item) {
    return (
      <div className="card p-5 h-full flex flex-col bg-white">
        <CardHeader number={5} title="Deletion Approval" />
        <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
          Select an item to view options
        </div>
      </div>
    );
  }

  const { approvalRequired, approvalStatus, requestedBy, approvedBy, approvalDate } = item;

  return (
    <div className="card p-5 h-full flex flex-col bg-white">
      <CardHeader number={5} title="Deletion Approval" />
      
      {!approvalRequired ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center w-full">
            <Info className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-700">Not Required</h4>
            <p className="text-xs text-slate-500 mt-1">This record did not require special approval for deletion.</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Approval Status</span>
            {approvalStatus === 'Pending' && (
              <span className="flex items-center gap-1 text-xs font-medium bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full border border-orange-200">
                <Clock className="w-3.5 h-3.5" /> Pending
              </span>
            )}
            {approvalStatus === 'Approved' && (
              <span className="flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full border border-green-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Approved
              </span>
            )}
            {approvalStatus === 'Rejected' && (
              <span className="flex items-center gap-1 text-xs font-medium bg-red-100 text-red-700 px-2.5 py-1 rounded-full border border-red-200">
                <XCircle className="w-3.5 h-3.5" /> Rejected
              </span>
            )}
          </div>
          
          <div className="space-y-3 flex-1">
            <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
              <div className="text-[11px] text-slate-500 uppercase font-semibold mb-0.5">Requested By</div>
              <div className="text-sm text-slate-800 font-medium">{requestedBy || 'N/A'}</div>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
              <div className="text-[11px] text-slate-500 uppercase font-semibold mb-0.5">Approved By</div>
              <div className="text-sm text-slate-800 font-medium">{approvedBy || '—'}</div>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
              <div className="text-[11px] text-slate-500 uppercase font-semibold mb-0.5">Approval Date & Time</div>
              <div className="text-sm text-slate-800 font-medium">{approvalDate || '—'}</div>
            </div>
          </div>
          
          {approvalStatus === 'Pending' && (
            <button className="mt-4 w-full py-2 btn-outline text-blue-600 border-blue-200 hover:bg-blue-50">
              View Approval Details
            </button>
          )}
        </div>
      )}
    </div>
  );
};


export const DeletionRetention = ({ item }) => {
  if (!item) {
    return (
      <div className="card p-5 h-full flex flex-col bg-white">
        <CardHeader number={8} title="Deletion Retention" />
        <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
          Select an item to view options
        </div>
      </div>
    );
  }

  // Calculate some mock dates based on the item's retention deadline
  const deletedDateStr = item.deletedDate;
  const deadlineStr = item.retentionDeadline;

  return (
    <div className="card p-5 h-full flex flex-col bg-white">
      <CardHeader number={8} title="Deletion Retention" />
      
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <div className="text-xs text-slate-500 mb-0.5">Deleted Date</div>
            <div className="text-sm font-medium text-slate-800">{deletedDateStr}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">Retention Period</div>
            <div className="text-sm font-medium text-slate-800">1 Month</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">Scheduled Deletion</div>
            <div className="text-sm font-medium text-red-600">{deadlineStr}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">Auto Permanent Delete</div>
            <div className="text-sm font-medium text-slate-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Enabled
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-[10px] text-slate-500 font-semibold uppercase mb-2">
            <span>{deletedDateStr}</span>
            <span>{deadlineStr}</span>
          </div>
          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-red-400 w-2/3 rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-slate-500">Deleted</span>
            <span className="text-red-500 font-medium flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Permanent Deletion</span>
          </div>
        </div>
        
        <div className="mt-auto bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Deleted records are retained according to the organization's applicable retention policy. Records may become permanently unavailable after the retention period expires.
          </p>
        </div>
      </div>
    </div>
  );
};


export const DeletionStatus = () => {
  const StatItem = ({ icon: Icon, label, count, colorClass, iconColorClass }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0 group cursor-pointer hover:bg-slate-50 transition-colors px-2 -mx-2 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
          <Icon className={`w-4 h-4 ${iconColorClass}`} />
        </div>
        <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900">{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
        {count}
      </span>
    </div>
  );

  return (
    <div className="card p-5 h-full flex flex-col bg-white">
      <CardHeader number={9} title="Deletion Status" />
      <div className="flex-1 flex flex-col justify-start overflow-y-auto pr-2 custom-scrollbar">
        <StatItem 
          icon={Info} 
          label="Deleted" 
          count={summaryStats.deleted} 
          colorClass="bg-slate-100" 
          iconColorClass="text-slate-600" 
        />
        <StatItem 
          icon={CheckCircle2} 
          label="Restore Available" 
          count={summaryStats.restoreAvailable} 
          colorClass="bg-blue-50" 
          iconColorClass="text-blue-600" 
        />
        <StatItem 
          icon={RefreshCw} 
          label="Restore Requested" 
          count={summaryStats.restoreRequested} 
          colorClass="bg-orange-50" 
          iconColorClass="text-orange-600" 
        />
        <StatItem 
          icon={CheckCircle2} 
          label="Restored" 
          count={summaryStats.restored} 
          colorClass="bg-green-50" 
          iconColorClass="text-green-600" 
        />
        <StatItem 
          icon={AlertTriangle} 
          label="Permanent Deletion Requested" 
          count={summaryStats.permanentDeletionRequested} 
          colorClass="bg-orange-50" 
          iconColorClass="text-orange-600" 
        />
        <StatItem 
          icon={Trash2} 
          label="Permanently Deleted" 
          count={summaryStats.permanentlyDeleted} 
          colorClass="bg-red-50" 
          iconColorClass="text-red-600" 
        />
        <StatItem 
          icon={XCircle} 
          label="Deletion Failed" 
          count={summaryStats.deletionFailed} 
          colorClass="bg-red-100" 
          iconColorClass="text-red-700" 
        />
      </div>
    </div>
  );
};


export const PermanentDeleteCard = ({ item, onPermanentDelete }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    setConfirmed(false);
    setIsSuccess(false);
    setIsDeleting(false);
  }, [item]);

  if (!item) {
    return (
      <div className="card p-5 h-full flex flex-col bg-white">
        <CardHeader number={4} title="Permanent Delete" />
        <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
          Select an item to view options
        </div>
      </div>
    );
  }

  // Hide or disable if not approved (if approval is required) or already permanently deleted
  const isAlreadyDeleted = item.status === 'Permanently Deleted';
  const needsApproval = item.approvalRequired && item.approvalStatus !== 'Approved';

  if (isAlreadyDeleted) {
    return (
      <div className="card p-5 h-full flex flex-col bg-white border-red-100">
        <CardHeader number={4} title="Permanent Delete" />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
            <Trash2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-slate-800 mb-1">Permanently Deleted</h4>
          <p className="text-xs text-slate-500 max-w-[200px]">This record has been permanently removed from the system.</p>
        </div>
      </div>
    );
  }

  if (needsApproval) {
    return (
      <div className="card p-5 h-full flex flex-col bg-white">
        <CardHeader number={4} title="Permanent Delete" />
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center mt-2">
          <ShieldAlert className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-700 mb-1">Approval Required</h4>
          <p className="text-xs text-slate-500">
            This record requires approval before it can be permanently deleted.
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (!confirmed) return;
    if (onPermanentDelete) {
      onPermanentDelete(item);
    }
  };

  return (
    <div className="card p-5 h-full flex flex-col bg-white border border-red-100 relative overflow-hidden">
      <CardHeader number={4} title="Permanent Delete" />
      
      <div className="flex-1 flex flex-col overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 shrink-0">
          <div className="flex items-center gap-2 text-red-700 font-bold mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wide">High-Risk Operation</span>
          </div>
          <div className="text-xs text-slate-500 mt-2">Item Name</div>
          <div className="font-semibold text-slate-800 mt-0.5">{item.itemName}</div>
          <div className="flex gap-4 mt-2">
            <div>
              <div className="text-xs text-slate-500">Record ID</div>
              <div className="text-xs font-mono text-slate-700">{item.recordId}</div>
            </div>
          </div>
        </div>
        
        <h4 className="text-sm font-semibold text-slate-800 mb-2">Permanent Delete Confirmation</h4>
        <div className="text-xs text-slate-600 mb-4 bg-orange-50 border-l-2 border-orange-500 p-2 text-orange-800">
          Warning: Permanent deletion cannot be undone. Please confirm before continuing.
        </div>
        
        <label className="flex items-start gap-2 mb-4 cursor-pointer group mt-auto">
          <input 
            type="checkbox" 
            className="mt-0.5 rounded text-red-600 focus:ring-red-500 border-slate-300 cursor-pointer"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span className="text-xs text-slate-600 group-hover:text-slate-800 transition-colors">
            I understand that permanent deletion is irreversible and that the record will no longer be recoverable.
          </span>
        </label>
        
        <div className="mt-auto pt-4 shrink-0">
          <button 
            onClick={handleDelete}
            disabled={!confirmed}
            className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              confirmed 
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" /> Permanently Delete
          </button>
        </div>
      </div>
    </div>
  );
};


export const RestoreCard = ({ item, onRestoreItem }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reason, setReason] = useState('');

  // Reset state when item changes
  React.useEffect(() => {
    setConfirmed(false);
    setIsSuccess(false);
    setIsRestoring(false);
    setReason('');
  }, [item]);

  if (!item) {
    return (
      <div className="card p-5 h-full flex flex-col bg-white">
        <CardHeader number={3} title="Restore" />
        <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
          Select an item to view options
        </div>
      </div>
    );
  }

  const isRecoverable = item.status === 'Restore Available' || item.status === 'Deleted';
  
  if (!isRecoverable && !isSuccess && item.status !== 'Restored' && item.status !== 'Restore Requested') {
    return (
      <div className="card p-5 h-full flex flex-col bg-white">
        <CardHeader number={3} title="Restore" />
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center mt-2">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-700 mb-1">Restore Not Available</h4>
          <p className="text-xs text-slate-500">
            This item cannot be restored according to the applicable retention or deletion policy.
          </p>
        </div>
      </div>
    );
  }

  const handleRestore = () => {
    if (!confirmed) return;
    setIsRestoring(true);
    // Simulate API call
    setTimeout(() => {
      setIsRestoring(false);
      setIsSuccess(true);
      if (onRestoreItem) onRestoreItem(item.deletionId, reason);
    }, 1500);
  };

  return (
    <div className="card p-5 h-full flex flex-col bg-white relative overflow-hidden">
      <CardHeader number={3} title="Restore" />
      
      {isSuccess || item.status === 'Restored' || item.status === 'Restore Requested' ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-slate-800 mb-1">
            {item.status === 'Restored' ? 'Restored' : 'Restore Requested'}
          </h4>
          <div className="bg-slate-50 p-3 rounded-lg w-full text-left mt-4 border border-slate-100">
            <div className="text-xs text-slate-500">Restored By</div>
            <div className="text-sm font-medium text-slate-800">{item.restoredBy || 'Current User'}</div>
            
            <div className="text-xs text-slate-500 mt-2">Restore Date & Time</div>
            <div className="text-sm font-medium text-slate-800">{item.restoreDate || 'Just now'}</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 mb-4 shrink-0">
            <div className="text-xs text-slate-500">Restore Item</div>
            <div className="font-semibold text-slate-800 mt-0.5">{item.itemName}</div>
            <div className="text-xs font-mono text-blue-600 mt-1">{item.recordId}</div>
          </div>
          
          <h4 className="text-sm font-semibold text-slate-800 mb-2">Restore Confirmation</h4>
          <p className="text-xs text-slate-600 mb-4">
            Are you sure you want to restore this deleted item?
          </p>
          
          <div className="mb-4">
            <label className="text-xs text-slate-500 mb-1 block">Restore Reason</label>
            <textarea 
              className="w-full border border-slate-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={2}
              placeholder="Enter reason for restoring this item..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
          
          <label className="flex items-start gap-2 mb-4 cursor-pointer group">
            <input 
              type="checkbox" 
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span className="text-xs text-slate-600 group-hover:text-slate-800 transition-colors">
              I confirm that I am authorized to restore this record.
            </span>
          </label>
          
          <div className="mt-auto pt-4 shrink-0">
            <button 
              onClick={handleRestore}
              disabled={!confirmed || isRestoring}
              className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                confirmed 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isRestoring ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Restoring...</>
              ) : (
                <><RefreshCw className="w-4 h-4" /> Restore Item</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export const StatusBadge = ({ status }) => {
  let colorClass = "bg-gray-100 text-gray-700";
  let Icon = Info;

  switch (status) {
    case 'Restore Available':
    case 'Restored':
      colorClass = "bg-green-100 text-green-700 border border-green-200";
      Icon = CheckCircle2;
      break;
    case 'Restore Requested':
    case 'Pending':
      colorClass = "bg-orange-100 text-orange-700 border border-orange-200";
      Icon = RefreshCw;
      break;
    case 'Deleted':
      colorClass = "bg-slate-100 text-slate-700 border border-slate-200";
      Icon = Info;
      break;
    case 'Permanent Deletion Requested':
      colorClass = "bg-red-50 text-red-600 border border-red-200";
      Icon = AlertTriangle;
      break;
    case 'Permanently Deleted':
    case 'Deletion Failed':
    case 'Rejected':
      colorClass = "bg-red-100 text-red-700 border border-red-200";
      Icon = XCircle;
      break;
    case 'Approved':
      colorClass = "bg-green-100 text-green-700 border border-green-200";
      Icon = ShieldCheck;
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

export const CardHeader = ({ number, title }) => {
  return (
    <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-3">
      <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shadow-sm">
        {number}
      </div>
      <h3 className="text-[15px] font-semibold text-slate-800">{title}</h3>
    </div>
  );
};

export const DeletHistoryPage = ({ onBack }) => {
  const [items, setItems] = useState(deleteHistoryData);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Modals state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPermanentDeleteModalOpen, setIsPermanentDeleteModalOpen] = useState(false);
  const [itemToActOn, setItemToActOn] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleOpenViewModal = (item) => {
    setItemToActOn(item);
    setIsViewModalOpen(true);
  };

  const handleOpenPermanentDeleteModal = (item) => {
    setItemToActOn(item);
    setIsPermanentDeleteModalOpen(true);
  };

  const handleRestoreItem = (deletionId, reason) => {
    setItems(items.map(item => 
      item.deletionId === deletionId 
        ? { ...item, status: 'Restored', restoreReason: reason, restoredBy: 'Current User', restoreDate: new Date().toLocaleString() } 
        : item
    ));
    if (selectedItem?.deletionId === deletionId) {
      setSelectedItem({ ...selectedItem, status: 'Restored', restoreReason: reason, restoredBy: 'Current User', restoreDate: new Date().toLocaleString() });
    }
  };

  const handleConfirmPermanentDelete = () => {
    if (!itemToActOn) return;
    setItems(items.map(item => 
      item.deletionId === itemToActOn.deletionId 
        ? { ...item, status: 'Permanently Deleted' } 
        : item
    ));
    if (selectedItem?.deletionId === itemToActOn.deletionId) {
      setSelectedItem({ ...selectedItem, status: 'Permanently Deleted' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-800 p-4 md:p-6 lg:p-8 font-sans relative">
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
      <style>{componentStyles}</style>
      <div className="max-w-[1600px] mx-auto space-y-6 pt-10">
        
        <DeleteHistoryHeader />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Row 1 */}
          <div className="lg:col-span-2 xl:col-span-3 h-[400px] md:h-[500px]">
            <DeletedItemsTable 
              items={items} 
              selectedItem={selectedItem} 
              onSelectItem={handleSelectItem}
              onRestore={(item) => { handleSelectItem(item); }}
              onPermanentDelete={(item) => { handleSelectItem(item); handleOpenPermanentDeleteModal(item); }}
            />
          </div>
          <div className="lg:col-span-1 xl:col-span-1 h-[400px] md:h-[500px] order-last lg:order-none">
            <DeletionStatus />
          </div>

          {/* Row 2 */}
          <div className="lg:col-span-1 xl:col-span-1 h-auto min-h-[400px] lg:h-[400px]">
            <DeletedItemDetails item={selectedItem} />
          </div>
          <div className="lg:col-span-1 xl:col-span-1 h-[400px]">
            <RestoreCard item={selectedItem} onRestoreItem={handleRestoreItem} />
          </div>
          <div className="lg:col-span-1 xl:col-span-1 h-[400px]">
            <PermanentDeleteCard item={selectedItem} onPermanentDelete={handleOpenPermanentDeleteModal} />
          </div>
          <div className="lg:col-span-1 xl:col-span-1 h-[400px]">
            <DeletionApproval item={selectedItem} />
          </div>

          {/* Row 3 */}
          <div className="lg:col-span-3 xl:col-span-4 mb-2">
            <DeleteHistoryFilters />
          </div>
          <div className="lg:col-span-1 xl:col-span-2">
            <DeleteHistoryActions />
          </div>
          <div className="lg:col-span-2 xl:col-span-2">
            <DeletionRetention item={selectedItem} />
          </div>

        </div>
      </div>

      {/* Modals */}
      <ViewDetailsModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        item={itemToActOn}
        onRestore={(item) => { handleSelectItem(item); }}
        onPermanentDelete={handleOpenPermanentDeleteModal}
      />

      <PermanentDeleteModal 
        isOpen={isPermanentDeleteModalOpen} 
        onClose={() => setIsPermanentDeleteModalOpen(false)} 
        item={itemToActOn}
        onConfirm={handleConfirmPermanentDelete}
      />
    </div>
  );
};

export default DeletHistoryPage;
