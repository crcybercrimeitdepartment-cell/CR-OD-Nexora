const fs = require('fs');
const file = 'src/page/PlatformSettings/NotificationSettingPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add shrink-0 to ALL toggle switches
content = content.replace(/className=\{`w-11 h-6 flex items-center/g, 'className={`w-11 h-6 shrink-0 flex items-center');

// 2. Add flex-1 min-w-0 pr-2 to the text wrappers in the flex containers to allow wrapping without pushing
content = content.replace(/<div className="flex items-center justify-between gap-2(?: pt-1 relative)?">[\s\S]*?<div>/g, (match) => {
  return match.replace(/<div>$/, '<div className="flex-1 min-w-0 pr-3">');
});

// Also fix the alerts section which has an extra flex wrapper
content = content.replace(/<div className="flex items-center gap-2.5">/g, '<div className="flex items-center gap-3 flex-1 min-w-0">');
content = content.replace(/<div className="flex items-center gap-3 flex-1 min-w-0">[\s\S]*?<div>/g, (match) => {
  return match.replace(/<div>$/, '<div className="flex-1 min-w-0 pr-2">');
});

// Allow secondary text to wrap
content = content.replace(/<span className="text-\[calc\(11px\*var\(--text-scale,1\)\)\] text-slate-400">/g, '<span className="block text-[calc(11px*var(--text-scale,1))] text-slate-400 mt-0.5 leading-snug">');
content = content.replace(/<span className="text-\[calc\(10.5px\*var\(--text-scale,1\)\)\] text-slate-400">/g, '<span className="block text-[calc(10.5px*var(--text-scale,1))] text-slate-400 mt-0.5 leading-snug">');

// Allow title text to wrap/truncate
content = content.replace(/<span className="block text-xs font-bold text-slate-800">/g, '<span className="block text-xs font-bold text-slate-800 truncate sm:whitespace-normal">');

fs.writeFileSync(file, content);
console.log('Successfully applied flex fixes');
