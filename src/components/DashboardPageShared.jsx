import { Search, StickyNote, History, Folder } from 'lucide-react';

/**
 * Shared DashboardPage component used across all sub-intelligence pages.
 * Renders 4 navigation cards (Explore the Web, Search History, My Notepad, Save Data)
 * using the EXACT same ToolCard visual design system as the parent module grid.
 *
 * Design matches: nexora.jsx ToolCard component
 */

const DASHBOARD_TOOLS = [
  {
    id: 'search',
    name: 'Explore the Web',
    description: 'Search for anything, manage your history, and discover new content.',
    Icon: Search,
    bg: 'bg-[#F4F7FF]',
    color: 'text-blue-600',
  },
  {
    id: 'history',
    name: 'Search History',
    description: 'View your past searches and quickly jump back into topics.',
    Icon: History,
    bg: 'bg-purple-50',
    color: 'text-purple-500',
  },
  {
    id: 'note',
    name: 'My Notepad',
    description: 'Jot down your thoughts, ideas, and keep track of your saved notes.',
    Icon: StickyNote,
    bg: 'bg-[#FFF8F0]',
    color: 'text-amber-500',
  },
  {
    id: 'save-data',
    name: 'Save Data',
    description: 'Organize and manage your local files and folders.',
    Icon: Folder,
    bg: 'bg-indigo-50',
    color: 'text-indigo-500',
  },
];

export default function DashboardPage({ setActivePage }) {
  return (
    <div className="w-full flex flex-col items-center pt-4 sm:pt-6 px-4 sm:px-6 md:px-10 pb-8 animate-in fade-in zoom-in-95 duration-700">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 w-full max-w-[1720px]">
        {DASHBOARD_TOOLS.map((tool, idx) => {
          const rowIndex = Math.floor(idx / 2);
          const delayMs = rowIndex * 120;
          const slideAnimation =
            rowIndex % 2 === 0 ? 'animate-card-slide-left' : 'animate-card-slide-right';
          const IconComp = tool.Icon;
          return (
            <div
              key={tool.id}
              onClick={() => setActivePage(tool.id)}
              style={{ animationDelay: `${delayMs}ms` }}
              className={`${slideAnimation} bg-white rounded-[14px] sm:rounded-[18px] p-2.5 sm:p-3.5 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-250 ease-out cursor-pointer flex flex-nowrap items-center justify-start gap-2.5 sm:gap-4 group select-none relative overflow-hidden h-full min-h-[84px] sm:min-h-[96px]`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePage(tool.id);
                }
              }}
            >
              {/* Animated border trace on hover — matches ToolCard */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 overflow-visible">
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="16"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="2"
                  pathLength="100"
                  className="animate-draw-line"
                />
              </svg>

              {/* Icon badge */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-xl sm:rounded-2xl ${tool.bg} ${tool.color} flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-sm relative z-0`}
              >
                <IconComp className="w-[18px] h-[18px] sm:w-6 sm:h-6" />
              </div>

              {/* Text */}
              <div className="flex flex-col text-left min-w-[90px] sm:min-w-0 relative z-0 flex-1">
                <h3 className="text-[calc(11px*var(--text-scale,1))] sm:text-[calc(14px*var(--text-scale,1))] font-bold text-slate-900 leading-snug line-clamp-3 group-hover:text-red-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[calc(9.5px*var(--text-scale,1))] sm:text-[calc(11.5px*var(--text-scale,1))] text-slate-500 font-normal leading-tight line-clamp-2 mt-0.5 sm:mt-1">
                  {tool.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
