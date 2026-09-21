import React from 'react';

/**
 * Standard SectionHeader Component for NEXORA Report Pages.
 * 
 * Enforces the standardized numbered layout:
 * "01. Section Title"
 *
 * @param {Object} props
 * @param {string|number} props.number - The section number (e.g., 1, "01")
 * @param {string} props.title - The section title
 * @param {string} [props.subtitle] - Optional section subtitle or description
 * @param {React.ComponentType} [props.icon] - Optional Lucide icon component
 * @param {string} [props.badge] - Optional badge count/text
 * @param {string} [props.accentColor] - Optional accent theme color ('orange', 'green', 'rose', 'blue')
 * @param {string} [props.className] - Additional classes
 */
export default function SectionHeader({
  number,
  title,
  subtitle,
  icon: Icon,
  badge,
  accentColor = 'blue',
  className = ''
}) {
  // Format number as 2 digits: 1 -> "01"
  const formattedNumber = typeof number === 'number'
    ? String(number).padStart(2, '0')
    : String(number || '').padStart(2, '0');

  // Theme styles for the number badge
  const themeMap = {
    orange: 'bg-orange-50 text-[#ea580c] border-orange-200',
    green: 'bg-green-50 text-[#16a34a] border-green-200',
    rose: 'bg-rose-50 text-[#e11d48] border-rose-200',
    blue: 'bg-blue-50 text-[#1e3a8a] border-blue-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const badgeTheme = themeMap[accentColor] || themeMap.blue;

  return (
    <div className={`w-full flex flex-col gap-1 pt-4 pb-2 select-none ${className}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Numbered Badge: 01 */}
        {formattedNumber && (
          <span
            className={`px-2 sm:px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-mono font-black border shadow-2xs shrink-0 ${badgeTheme}`}
          >
            {formattedNumber}
          </span>
        )}

        {/* Optional Section Icon */}
        {Icon && (
          <div className="text-[#1e3a8a] shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}

        {/* Section Title */}
        <h2 className="text-xs sm:text-sm md:text-base font-extrabold text-[#1e3a8a] uppercase tracking-wider truncate">
          {title}
        </h2>

        {/* Optional Badge */}
        {badge && (
          <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
            {badge}
          </span>
        )}

        {/* Subtle Horizontal Divider */}
        <div className="flex-1 h-px bg-slate-200/80 ml-1 hidden sm:block" />
      </div>

      {/* Subtitle if present */}
      {subtitle && (
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium pl-0.5 sm:pl-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
