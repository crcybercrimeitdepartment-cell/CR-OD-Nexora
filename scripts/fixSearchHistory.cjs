const fs = require('fs');
const file = 'src/page/AccountSetting/SearchHistory.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update handleRunAgain and add handlers
const oldHandlers = `    const handleRunAgain = () => {
        if (selectedRecord?.q) {
            alert(\`Running search again for query: \${selectedRecord.q}\`);
        }
    }`;
const newHandlers = `    const handleRunAgain = () => {
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
    };`;
content = content.replace(oldHandlers, newHandlers);

// 2. Add IDs to sections
content = content.replace(
    '<div className="lg:col-span-5 xl:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">',
    '<div id="filters-section" className="lg:col-span-5 xl:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">'
);
content = content.replace(
    '<div className="lg:col-span-6 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-5">',
    '<div id="search-details-section" className="lg:col-span-6 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-5">'
);
content = content.replace(
    '<input type="text" value={searchQuery}',
    '<input id="search-query-input" type="text" value={searchQuery}'
);

// 3. Update Status Badges
content = content.replace(
    /<span className=\{`px-2 py-0\.5 rounded-full border text-\[calc\(10px\*var\(--text-scale,1\)\)\] font-bold \$\{row\.stC\}`\}>\{row\.st\}<\/span>/g,
    `<span className={\`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[calc(10px*var(--text-scale,1))] font-bold \${row.stC}\`}>
        <span className={\`w-1.5 h-1.5 rounded-full \${row.stC.includes('green') ? 'bg-green-500' : row.stC.includes('red') ? 'bg-red-500' : row.stC.includes('blue') ? 'bg-blue-500' : row.stC.includes('orange') ? 'bg-orange-500' : row.stC.includes('yellow') ? 'bg-yellow-500' : 'bg-purple-500'}\`} />
        {row.st}
    </span>`
);

// 4. Update Table Rows and View Buttons
const oldTableRow = /<tr key=\{i\} className=\{`border-b border-slate-100 font-medium transition-colors cursor-pointer \$\{isSelected \? 'bg-blue-50\/50' : 'hover:bg-slate-50 text-slate-700'\}`\} onClick=\{\(\) => setSelectedRecord\(row\)\}>([\s\S]*?)<td className="py-2\.5 px-2 text-center flex items-center justify-center gap-2">\s*<button onClick=\{\(e\) => \{ e\.stopPropagation\(\); setSelectedRecord\(row\); \}\} className="text-blue-600 hover:text-blue-800 font-bold">View<\/button>\s*<MoreVertical className="w-3\.5 h-3\.5 text-slate-400 hover:text-slate-600" \/>\s*<\/td>\s*<\/tr>/g;

content = content.replace(oldTableRow, (match, innerContent) => {
    return `<tr key={i} tabIndex={0} onKeyDown={(e) => { if(e.key==='Enter') setSelectedRecord(row); }} className={\`border-b border-slate-100 font-medium transition-all duration-200 cursor-pointer group \${isSelected ? 'bg-blue-50/60 shadow-[inset_4px_0_0_0_#2563eb]' : 'hover:bg-slate-50 text-slate-700 hover:-translate-y-[1px] hover:shadow-sm'}\`} onClick={() => setSelectedRecord(row)}>${innerContent}<td className="py-2.5 px-2 text-center flex items-center justify-center gap-2">\n<button tabIndex={0} onClick={(e) => { e.stopPropagation(); setSelectedRecord(row); handleViewDetails(); }} className={\`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-95 \${isSelected ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 opacity-0 group-hover:opacity-100 focus:opacity-100'}\`}>View</button>\n</td>\n</tr>`;
});

// 5. Update Actions Side Panel
const oldActions = `<div className="flex gap-3 items-start hover:bg-slate-50 p-1 -ml-1 rounded cursor-pointer transition-colors">
                                    <Eye className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">View Search</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">View selected search details</p></div>
                                </div>
                                <div onClick={handleRunAgain} className="flex gap-3 items-start hover:bg-slate-50 p-1 -ml-1 rounded cursor-pointer transition-colors">
                                    <RefreshCw className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Run Search Again</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Run the same search again</p></div>
                                </div>
                                <div onClick={handleCopy} className="flex gap-3 items-start hover:bg-slate-50 p-1 -ml-1 rounded cursor-pointer transition-colors">
                                    <Copy className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Copy Search Query</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Copy search query to clipboard</p></div>
                                </div>
                                <div className="flex gap-3 items-start hover:bg-slate-50 p-1 -ml-1 rounded cursor-pointer transition-colors">
                                    <Filter className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Filter</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Filter search history</p></div>
                                </div>
                                <div className="flex gap-3 items-start hover:bg-slate-50 p-1 -ml-1 rounded cursor-pointer transition-colors">
                                    <SearchCode className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Search</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Search in history</p></div>
                                </div>
                                <div className="flex gap-3 items-start hover:bg-slate-50 p-1 -ml-1 rounded cursor-pointer transition-colors">
                                    <Save className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                    <div><p className="text-xs font-bold text-slate-700">Save Search</p><p className="text-[calc(9px*var(--text-scale,1))] text-slate-500 leading-tight">Save current search</p></div>
                                </div>`;

const newActions = `<button onClick={handleViewDetails} className="w-full text-left flex gap-3 items-start hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-50 active:scale-[0.98]">
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
                                </button>`;

content = content.replace(oldActions, newActions);

// 6. Update "View Full Results"
const oldViewFull = `<button className="mt-5 w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" /> View Full Results
                        </button>`;
const newViewFull = `<button onClick={handleRunAgain} className="mt-5 w-full py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 shadow-sm hover:shadow-md group">
                            <Eye className="w-4 h-4 transition-transform group-hover:scale-110" /> View Full Results
                        </button>`;
content = content.replace(oldViewFull, newViewFull);

// 7. Make Context Items focusable
content = content.replace(/<div className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">/g, '<div tabIndex={0} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">');

// 8. Fix Search Type interactive buttons
const oldSearchTypeDivs = /<div\s*key=\{t\.id\}\s*onClick=\{\(\) => setSearchType\(isActive \? 'All Types' : t\.id\)\}\s*className=\{`flex items-center gap-2 text-xs font-medium cursor-pointer p-1 -ml-1 rounded transition-colors \$\{isActive \? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'\}`\}\s*>/g;

content = content.replace(oldSearchTypeDivs, (match) => {
    return match
        .replace('<div', '<button type="button"')
        .replace('p-1 -ml-1 rounded transition-colors', 'w-full text-left p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95');
});

content = content.replace(/<\/Icon className=\{`w-4 h-4 \$\{isActive \? 'text-blue-600' : 'text-slate-400'\}`\} \/> \{t\.id\}\s*<\/div>/g, (match) => {
    return match.replace('</div>', '</button>');
});

// Also replace the closing </div> of search types correctly
content = content.replace(/<Icon className=\{`w-4 h-4 \$\{isActive \? 'text-blue-600' : 'text-slate-400'\}`\} \/> \{t\.id\}\s*<\/div>/g, (match) => match.replace('</div>', '</button>'));


fs.writeFileSync(file, content);
console.log('Successfully applied all Search History fixes');
