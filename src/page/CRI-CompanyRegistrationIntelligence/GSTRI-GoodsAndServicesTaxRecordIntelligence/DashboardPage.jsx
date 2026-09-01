import { Search, StickyNote, History, List, Folder, Cloud, Trash2 } from 'lucide-react';

export default function DashboardPage({ setActivePage }) {
  return (
    <>
      <div className="relative z-10 w-full flex flex-col items-center pt-24 md:pt-40 px-2 sm:px-6 animate-in fade-in zoom-in-95 duration-700 pb-16">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 w-full max-w-full px-2 sm:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150 fill-mode-both">
        
        {/* Search Card */}
        <div 
          onClick={() => setActivePage('search')}
          className="group bg-white/80 backdrop-blur-md w-full p-3 rounded-2xl border border-white/60 shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer transition-all duration-300 flex flex-row items-center hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/50 transition-colors duration-300"></div>
          
          {/* Icon Box */}
          <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-[#F4F7FF] group-hover:scale-105 transition-transform duration-300 shadow-sm">
            <Search size={20} strokeWidth={2.5} className="text-blue-600" />
          </div>

          {/* Text Content */}
          <div className="ml-3.5 flex flex-col text-left z-10">
            <h2 className="text-sm md:text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">Explore the Web</h2>
            <p className="text-slate-500 text-[11px] md:text-xs font-medium leading-snug mt-0.5">Search for anything, manage your history, and discover new content.</p>
          </div>
        </div>

        {/* History Card */}
        <div 
          onClick={() => setActivePage('history')}
          className="group bg-white/80 backdrop-blur-md w-full p-3 rounded-2xl border border-white/60 shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer transition-all duration-300 flex flex-row items-center hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-purple-50/0 group-hover:bg-purple-50/50 transition-colors duration-300"></div>
          
          {/* Icon Box */}
          <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-purple-50 group-hover:scale-105 transition-transform duration-300 shadow-sm">
            <History size={20} strokeWidth={2.5} className="text-purple-500" />
          </div>

          {/* Text Content */}
          <div className="ml-3.5 flex flex-col text-left z-10">
            <h2 className="text-sm md:text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">Search History</h2>
            <p className="text-slate-500 text-[11px] md:text-xs font-medium leading-snug mt-0.5">View your past searches and quickly jump back into topics.</p>
          </div>
        </div>

        {/* Note Card */}
        <div 
          onClick={() => setActivePage('note')}
          className="group bg-white/80 backdrop-blur-md w-full p-3 rounded-2xl border border-white/60 shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer transition-all duration-300 flex flex-row items-center hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-amber-50/0 group-hover:bg-amber-50/50 transition-colors duration-300"></div>
          
          {/* Icon Box */}
          <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-[#FFF8F0] group-hover:scale-105 transition-transform duration-300 shadow-sm">
            <StickyNote size={20} strokeWidth={2.5} className="text-amber-500" />
          </div>

          {/* Text Content */}
          <div className="ml-3.5 flex flex-col text-left z-10">
            <h2 className="text-sm md:text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">My Notepad</h2>
            <p className="text-slate-500 text-[11px] md:text-xs font-medium leading-snug mt-0.5">Jot down your thoughts, ideas, and keep track of your saved notes.</p>
          </div>
        </div>

        {/* Save Data Card */}
        <div 
          onClick={() => setActivePage('save-data')}
          className="group bg-white/80 backdrop-blur-md w-full p-3 rounded-2xl border border-white/60 shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer transition-all duration-300 flex flex-row items-center hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-indigo-50/0 group-hover:bg-indigo-50/50 transition-colors duration-300"></div>
          
          {/* Icon Box */}
          <div className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-indigo-50 group-hover:scale-105 transition-transform duration-300 shadow-sm">
            <Folder size={20} strokeWidth={2.5} className="text-indigo-500" />
          </div>

          {/* Text Content */}
          <div className="ml-3.5 flex flex-col text-left z-10">
            <h2 className="text-sm md:text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">Save Data</h2>
            <p className="text-slate-500 text-[11px] md:text-xs font-medium leading-snug mt-0.5">Organize and manage your local files and folders.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
