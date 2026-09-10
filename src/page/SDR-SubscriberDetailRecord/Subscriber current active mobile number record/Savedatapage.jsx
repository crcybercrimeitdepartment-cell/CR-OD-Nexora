import { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import {
  Folder,
  File,
  FileText,
  Image as ImageIcon,
  FileCode,
  Edit2,
  Trash2,
  Check,
  X,
  FileBox,
  LayoutGrid,
  List,
  ArrowLeft,
  ChevronRight,
  FilePlus,
  FolderPlus,
  Search,
  Upload
} from 'lucide-react';

// Tiny IndexedDB wrapper for storing actual file blobs
const FileStore = {
  db: null,
  init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('FileManagerFiles', 1);
      request.onupgradeneeded = (e) => e.target.result.createObjectStore('files');
      request.onsuccess = (e) => {
        FileStore.db = e.target.result;
        resolve();
      };
      request.onerror = reject;
    });
  },
  save(id, fileBlob) {
    if (!FileStore.db) return;
    FileStore.db.transaction('files', 'readwrite').objectStore('files').put(fileBlob, id);
  },
  get(id) {
    return new Promise((resolve) => {
      if (!FileStore.db) return resolve(null);
      const req = FileStore.db.transaction('files').objectStore('files').get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
  },
  remove(id) {
    if (!FileStore.db) return;
    FileStore.db.transaction('files', 'readwrite').objectStore('files').delete(id);
  }
};
FileStore.init();

const DocxPreview = ({ arrayBuffer }) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    if (!arrayBuffer) return;
    try {
      mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then(result => {
          setHtml(result.value);
        })
        .catch(err => {
          console.error(err);
          setHtml("<p>Error previewing document.</p>");
        });
    } catch (e) {
      console.error(e);
      setHtml("<p>Error decoding document.</p>");
    }
  }, [arrayBuffer]);

  return (
    <div
      className="w-full h-full bg-white text-slate-900 p-8 overflow-y-auto prose prose-slate max-w-none text-sm"
      dangerouslySetInnerHTML={{ __html: html || '<div class="flex items-center justify-center h-full"><p class="text-slate-400">Loading document...</p></div>' }}
    />
  );
};

const XlsxPreview = ({ arrayBuffer }) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    if (!arrayBuffer) return;
    try {
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const htmlString = XLSX.utils.sheet_to_html(worksheet);
      setHtml(htmlString);
    } catch (e) {
      console.error(e);
      setHtml("<p>Error previewing Excel file.</p>");
    }
  }, [arrayBuffer]);

  return (
    <div className="w-full h-full bg-white text-slate-900 p-4 overflow-auto text-sm relative">
      <style>{`
        .excel-preview table { border-collapse: collapse; min-width: 100%; }
        .excel-preview th, .excel-preview td { border: 1px solid #e2e8f0; padding: 6px 10px; text-align: left; white-space: nowrap; max-width: 300px; overflow: hidden; text-overflow: ellipsis; }
        .excel-preview tr:nth-child(even) { background-color: #f8fafc; }
      `}</style>
      <div
        className="excel-preview w-full"
        dangerouslySetInnerHTML={{ __html: html || '<div class="flex items-center justify-center h-full"><p class="text-slate-400">Loading Excel...</p></div>' }}
      />
    </div>
  );
};

export default function Savedatapage({ onBack }) {
  // Navigation state: null represents root ("Save Data")
  const [currentFolderId, setCurrentFolderId] = useState(null);

  // All files and folders in a unified flat state with parentId references
  const defaultItems = [
    { id: '1', parentId: null, name: 'Documents', isFolder: true, date: '8/31/2026 10:30 AM', size: '--' },
    { id: '2', parentId: null, name: 'Images', isFolder: true, date: '8/31/2026 11:15 AM', size: '--' },
    { id: '3', parentId: null, name: 'Projects', date: '8/31/2026 02:45 PM', isFolder: true, size: '--' },

    // Items inside 'Documents' (id: '1')
    { id: '4', parentId: '1', name: 'Resume.pdf', isFolder: false, date: '8/31/2026 10:32 AM', size: '1.2 MB' },
    { id: '5', parentId: '1', name: 'Meeting_Notes.txt', isFolder: false, date: '8/31/2026 10:40 AM', size: '14 KB' },
    { id: '6', parentId: '1', name: 'Personal', isFolder: true, date: '8/31/2026 10:50 AM', size: '--' },

    // Items inside 'Images' (id: '2')
    { id: '7', parentId: '2', name: 'ProfilePhoto.png', isFolder: false, date: '8/31/2026 11:20 AM', size: '2.4 MB' },
    { id: '8', parentId: '2', name: 'Wallpaper.jpg', isFolder: false, date: '8/31/2026 11:25 AM', size: '4.1 MB' },

    // Items inside 'Projects' (id: '3')
    { id: '9', parentId: '3', name: 'App.jsx', isFolder: false, date: '8/31/2026 02:46 PM', size: '8.5 KB' },
  ];

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('fileManagerItems');
    if (savedItems) {
      try {
        return JSON.parse(savedItems);
      } catch (e) {
        console.error('Failed to parse items from localStorage', e);
      }
    }
    return defaultItems;
  });

  useEffect(() => {
    localStorage.setItem('fileManagerItems', JSON.stringify(items));
  }, [items]);

  const [viewMode, setViewMode] = useState('list');
  const [isCreating, setIsCreating] = useState(null); // 'folder' | 'file' | null
  const [newItemName, setNewItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [previewData, setPreviewData] = useState(null); // Holds loaded blobUrl or arrayBuffer

  // Load preview data from IndexedDB when a file is selected
  useEffect(() => {
    setPreviewData(null); // Reset immediately on new selection
    if (!selectedItem || selectedItem.isFolder) return;

    FileStore.get(selectedItem.id).then(blob => {
      if (!blob) return;

      const ext = selectedItem.name.toLowerCase().split('.').pop();
      if (['pdf', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext) || selectedItem.type?.startsWith('image/')) {
        const url = URL.createObjectURL(blob);
        setPreviewData({ type: 'url', payload: url });
        return () => URL.revokeObjectURL(url);
      } else if (['docx', 'xlsx', 'xls'].includes(ext)) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewData({ type: 'buffer', payload: e.target.result });
        reader.readAsArrayBuffer(blob);
      }
    });
  }, [selectedItem]);

  // Clear selection when navigating or searching
  useEffect(() => {
    setSelectedItem(null);
  }, [currentFolderId, searchQuery]);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    Array.from(e.target.files).forEach(file => {
      let sizeStr = '';
      if (file.size < 1024) sizeStr = file.size + ' B';
      else if (file.size < 1024 * 1024) sizeStr = (file.size / 1024).toFixed(1) + ' KB';
      else if (file.size < 1024 * 1024 * 1024) sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      else sizeStr = (file.size / (1024 * 1024 * 1024)).toFixed(1) + ' GB';

      const now = new Date();
      const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        parentId: currentFolderId,
        name: file.name,
        isFolder: false,
        date: dateStr,
        size: sizeStr,
        type: file.type
      };

      // Save the actual file Blob to the background store
      FileStore.save(newItem.id, file);

      setItems(prev => [...prev, newItem]);
    });

    e.target.value = null;
  };

  // Get current folder items or search results
  const currentItems = searchQuery.trim() !== ''
    ? items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items.filter(item => item.parentId === currentFolderId);

  // Build breadcrumbs path
  const getBreadcrumbs = () => {
    const path = [];
    let currId = currentFolderId;

    while (currId !== null) {
      const found = items.find(i => i.id === currId);
      if (found) {
        path.unshift(found);
        currId = found.parentId;
      } else {
        break;
      }
    }

    return [{ id: null, name: 'Save Data' }, ...path];
  };

  const breadcrumbs = getBreadcrumbs();

  // Helper for file/folder icons
  const getItemIcon = (name, isFolder) => {
    if (isFolder) {
      return <Folder className="w-5 h-5 fill-amber-500/20 text-amber-400" />;
    }
    const ext = name.split('.').pop()?.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'].includes(ext)) {
      return <ImageIcon className="w-5 h-5 text-emerald-400" />;
    }
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json'].includes(ext)) {
      return <FileCode className="w-5 h-5 text-cyan-400" />;
    }
    if (['pdf', 'txt', 'doc', 'docx'].includes(ext)) {
      return <FileText className="w-5 h-5 text-rose-400" />;
    }
    return <File className="w-5 h-5 text-slate-400" />;
  };

  // Handlers for creating items
  const handleCreate = () => {
    if (newItemName.trim() === '') return;

    const isFolder = isCreating === 'folder';
    let finalName = newItemName.trim();

    // Add default extension if it's a file without one
    if (!isFolder && !finalName.includes('.')) {
      finalName += '.txt';
    }

    const newItem = {
      id: Date.now().toString(),
      parentId: currentFolderId,
      name: finalName,
      isFolder: isFolder,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      size: isFolder ? '--' : `${(Math.random() * 3 + 0.1).toFixed(1)} MB`
    };

    setItems([newItem, ...items]);
    setNewItemName('');
    setIsCreating(null);
  };

  // Handlers for editing
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const saveEdit = (id) => {
    if (editName.trim() === '') return;
    setItems(items.map(i => i.id === id ? { ...i, name: editName.trim() } : i));
    setEditingId(null);
    setEditName('');
  };

  // Recursive delete handler for folders & files
  const handleDelete = (id) => {
    // Collect all child IDs if it's a folder (recursive)
    const getChildrenIds = (parentId) => {
      const children = items.filter(item => item.parentId === parentId);
      let ids = children.map(c => c.id);
      children.forEach(c => {
        if (c.isFolder) ids = [...ids, ...getChildrenIds(c.id)];
      });
      return ids;
    };

    const idsToDelete = [id, ...getChildrenIds(id)];
    setItems(items.filter(item => !idsToDelete.includes(item.id)));
    if (selectedItem && idsToDelete.includes(selectedItem.id)) {
      setSelectedItem(null);
    }

    // Cleanup file data from the background store
    idsToDelete.forEach(deleteId => FileStore.remove(deleteId));
  };

  return (
    <div className="relative z-10 w-full min-h-screen text-slate-900 p-6 md:p-12 overflow-hidden font-sans animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Top Header Section */}
        <div className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none z-20">
          {onBack && (
            <button 
              onClick={onBack}
              className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
            >
              <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span>Back</span>
            </button>
          )}

          <div className="flex items-center justify-center w-full relative z-20">
            <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
                <span>Save Data</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
                Organize and manage your digital workspace.
              </p>
            </div>
          </div>
        </div>

        {/* Controls & Search Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-white/40 pb-6 mt-4">
          {/* Create Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <label className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full font-medium text-sm transition-all shadow-sm border border-indigo-200 shrink-0 cursor-pointer">
              <Upload className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Upload</span>
              <input type="file" className="hidden" onChange={handleFileUpload} multiple />
            </label>
            <button
              onClick={() => setIsCreating('folder')}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium text-sm transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] shrink-0"
            >
              <FolderPlus className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">New Folder</span>
            </button>
            <button
              onClick={() => setIsCreating('file')}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-white/80 hover:bg-white text-slate-700 rounded-full font-medium text-sm transition-all shadow-sm border border-white/60 shrink-0"
            >
              <FilePlus className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">New File</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto justify-end">
            {/* Search Bar */}
            <div className="relative group w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search files & folders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 sm:focus:w-64 bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white/90 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white/40 p-1 rounded-xl border border-white/60 shrink-0 hidden sm:flex">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Breadcrumb Path Bar (Hide during search) */}
        {!searchQuery && (
          <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm overflow-x-auto shadow-sm">
            {breadcrumbs.map((crumb, idx) => (
              <div key={crumb.id || 'root'} className="flex items-center gap-2 flex-shrink-0">
                {idx > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
                <button
                  onClick={() => setCurrentFolderId(crumb.id)}
                  className={`flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium ${idx === breadcrumbs.length - 1 ? 'text-blue-600' : 'text-slate-500'
                    }`}
                >
                  {idx === 0 && <Folder className="w-4 h-4 text-blue-500" />}
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Creation Input Bar */}
        {isCreating && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="p-2 bg-blue-50 rounded-lg">
              {isCreating === 'folder' ? (
                <Folder className="w-5 h-5 text-amber-500" />
              ) : (
                <FileText className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <input
              autoFocus
              type="text"
              placeholder={isCreating === 'folder' ? "Folder name..." : "File name (e.g. notes.txt)..."}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              className="flex-1 bg-transparent text-slate-900 text-base placeholder-slate-400 focus:outline-none border-none"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleCreate}
                className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors border border-green-100"
                title="Create"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => { setIsCreating(null); setNewItemName(''); }}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-100"
                title="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Main View: List Mode */}
        {viewMode === 'list' ? (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[400px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 py-3.5 border-b border-slate-200 text-xs font-bold text-slate-500 tracking-wider uppercase bg-slate-50/50 shrink-0">
              <div className="col-span-6 md:col-span-5">Name</div>
              <div className="col-span-4 md:col-span-3">Date Modified</div>
              <div className="hidden md:block md:col-span-2">Size</div>
              <div className="hidden md:block md:col-span-1">Type</div>
              <div className="col-span-2 md:col-span-1 text-right">Actions</div>
            </div>

            {/* List Items */}
            <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
              {currentItems.length === 0 && !isCreating ? (
                <div className="py-16 text-center text-slate-400 flex flex-col items-center bg-slate-50/30">
                  <Folder className="w-12 h-12 mb-3 opacity-30 text-slate-400" />
                  <p className="text-sm font-medium">This folder is empty. Create a file or folder above.</p>
                </div>
              ) : (
                currentItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    onDoubleClick={() => item.isFolder && setCurrentFolderId(item.id)}
                    className={`group grid grid-cols-12 items-center px-6 py-3.5 transition-colors duration-150 cursor-pointer ${selectedItem?.id === item.id ? 'bg-blue-50/50 border-l-2 border-blue-500' : 'hover:bg-slate-50/80'}`}
                  >
                    {/* Name Column */}
                    <div className="col-span-6 md:col-span-5 flex items-center gap-3 pr-4">
                      <div className="p-2 bg-slate-100 rounded-lg flex-shrink-0 border border-slate-200/50">
                        {getItemIcon(item.name, item.isFolder)}
                      </div>

                      {editingId === item.id ? (
                        <div className="flex items-center gap-2 flex-1" onClick={(e) => e.stopPropagation()}>
                          <input
                            autoFocus
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit(item.id)}
                            className="flex-1 bg-white text-slate-900 text-sm font-semibold px-2 py-1.5 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
                          />
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span
                          onClick={() => item.isFolder && setCurrentFolderId(item.id)}
                          className={`text-sm truncate ${item.isFolder ? 'text-slate-900 hover:text-blue-600 font-bold' : 'text-slate-700 font-medium'
                            }`}
                          title={item.name}
                        >
                          {item.name}
                        </span>
                      )}
                    </div>

                    {/* Date Modified */}
                    <div className="col-span-4 md:col-span-3 text-xs text-slate-500 font-medium">
                      {item.date}
                    </div>

                    {/* Size */}
                    <div className="hidden md:block md:col-span-2 text-xs text-slate-500 font-medium">
                      {item.size}
                    </div>

                    {/* Type */}
                    <div className="hidden md:block md:col-span-1 text-xs text-slate-500 font-medium">
                      {item.isFolder ? 'Folder' : item.name.split('.').pop()?.toUpperCase()}
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 md:col-span-1 flex items-center justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => startEditing(item)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Rename"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-[400px] overflow-y-auto p-1 content-start">
            {currentItems.length === 0 && !isCreating ? (
              <div className="col-span-full py-20 text-center text-slate-400 flex flex-col items-center">
                <Folder className="w-16 h-16 mb-4 opacity-30" />
                <p className="text-lg font-medium">This folder is empty.</p>
              </div>
            ) : (
              currentItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  onDoubleClick={() => item.isFolder && setCurrentFolderId(item.id)}
                  className={`group relative border rounded-2xl p-5 transition-all duration-300 cursor-pointer shadow-sm ${selectedItem?.id === item.id ? 'bg-blue-50/30 border-blue-400 ring-2 ring-blue-100' : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md'}`}
                >
                  <div className="absolute top-4 right-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => startEditing(item)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Rename"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col items-start gap-4">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      {getItemIcon(item.name, item.isFolder)}
                    </div>

                    <div className="w-full">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2 mt-1 w-full" onClick={(e) => e.stopPropagation()}>
                          <input
                            autoFocus
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit(item.id)}
                            className="flex-1 bg-white text-slate-900 text-sm font-semibold px-2 py-1.5 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-sm w-full"
                          />
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <h3 className="text-base font-bold text-slate-900 truncate pr-16" title={item.name}>
                          {item.name}
                        </h3>
                      )}
                      <p className="text-xs text-slate-500 font-medium mt-1">{item.date} • {item.size}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* File Preview Section */}
        <div className="mt-6 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" /> Details & Preview
          </h2>
          {selectedItem ? (
            <div className="bg-slate-50/80 p-6 rounded-xl border border-slate-100 w-full overflow-hidden flex flex-col gap-6">
              {/* Header: Icon & Metadata */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                  {(() => {
                    const isF = selectedItem.isFolder;
                    if (isF) return <Folder className="w-7 h-7 sm:w-8 sm:h-8 fill-amber-500/20 text-amber-400" />;
                    const ext = selectedItem.name.split('.').pop()?.toLowerCase();
                    if (['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'].includes(ext)) return <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />;
                    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json'].includes(ext)) return <FileCode className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />;
                    if (['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-rose-400" />;
                    return <File className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400" />;
                  })()}
                </div>
                <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left min-w-0 w-full">
                  <h3 className="text-xl font-bold text-slate-900 break-words truncate w-full mb-2">{selectedItem.name}</h3>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-1 w-full">
                    <p className="text-slate-500 text-sm font-medium">Type: <span className="text-slate-700">{selectedItem.isFolder ? 'Folder' : selectedItem.name.split('.').pop()?.toUpperCase()}</span></p>
                    <p className="text-slate-500 text-sm font-medium">Size: <span className="text-slate-700">{selectedItem.size}</span></p>
                    <p className="text-slate-500 text-sm font-medium">Modified: <span className="text-slate-700">{selectedItem.date}</span></p>
                  </div>
                </div>
              </div>

              {/* Preview Block spanning full width */}
              {!selectedItem.isFolder && (
                <div className="w-full">
                  {previewData ? (
                    <div className="w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden border border-slate-200 bg-white shadow-inner">
                      {(selectedItem.type?.startsWith('image/') || selectedItem.name.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i)) ? (
                        <img src={previewData.payload} alt={selectedItem.name} className="w-full h-full object-contain bg-slate-100/50" />
                      ) : (selectedItem.type === 'application/pdf' || selectedItem.name.toLowerCase().endsWith('.pdf')) ? (
                        <iframe src={previewData.payload} className="w-full h-full bg-slate-100" title="PDF Preview" />
                      ) : selectedItem.name.toLowerCase().endsWith('.docx') ? (
                        <DocxPreview arrayBuffer={previewData.payload} />
                      ) : (selectedItem.name.toLowerCase().endsWith('.xlsx') || selectedItem.name.toLowerCase().endsWith('.xls')) ? (
                        <XlsxPreview arrayBuffer={previewData.payload} />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-500 p-6 text-center">
                          <FileBox className="w-12 h-12 mb-3 opacity-40 text-indigo-400" />
                          <p className="font-medium text-slate-600 mb-1">Preview not supported</p>
                          <p className="text-xs">We currently support previews for Images and PDFs directly in the browser.</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 sm:p-4 bg-indigo-50/80 border border-indigo-100 rounded-xl text-indigo-700 text-sm w-full font-medium flex items-start gap-2">
                      <span className="shrink-0 text-xl">👀</span>
                      <p>Preview is not available. File data could not be found or you just refreshed and it's loading...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-300">
              <FileBox className="w-10 h-10 mb-3 opacity-30" />
              <p className="font-medium text-sm">Select a file or folder to view details</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
