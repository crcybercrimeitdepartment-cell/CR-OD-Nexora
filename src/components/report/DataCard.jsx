import React from 'react';
import StatusBadge from './StatusBadge';

/**
 * Standard DataCard Component for NEXORA Report Pages.
 * 
 * Standard structure:
 * ┌────────────────────────────────────────────┐
 * │  [ICON]  FIELD NAME                    #01 │
 * │          Actual field value                │
 * └────────────────────────────────────────────┘
 *
 * @param {Object} props
 * @param {string|number} [props.id] - Sequential number or field ID (e.g. 1 -> "#01")
 * @param {string} props.label - Field label/name
 * @param {string|number} [props.value] - Actual field value
 * @param {boolean} [props.required] - If true, displays red asterisk
 * @param {React.ComponentType} [props.icon] - Field icon component
 * @param {string} [props.accentColor] - Theme color ('orange', 'green', 'rose', 'blue')
 * @param {boolean} [props.isStatus] - Force render value as a StatusBadge
 * @param {string} [props.className] - Additional classes
 */
export default function DataCard({
  id,
  label,
  value,
  required = false,
  icon: Icon,
  accentColor = 'blue',
  isStatus = false,
  className = ''
}) {
  const iconThemeMap = {
    orange: 'bg-orange-500 text-white',
    green: 'bg-emerald-600 text-white',
    rose: 'bg-rose-500 text-white',
    blue: 'bg-blue-600 text-white',
  };

  const hoverBorderMap = {
    orange: 'hover:border-orange-300',
    green: 'hover:border-emerald-300',
    rose: 'hover:border-rose-300',
    blue: 'hover:border-blue-300',
  };

  const iconBg = iconThemeMap[accentColor] || 'bg-slate-700 text-white';
  const hoverBorder = hoverBorderMap[accentColor] || 'hover:border-slate-300';

  // Format sequential number (e.g., 1 -> "#01", 15 -> "#15", "03" -> "#03")
  let formattedIndex = null;
  if (id !== undefined && id !== null && id !== '') {
    const rawStr = String(id).trim().replace(/^#/, '');
    const num = parseInt(rawStr, 10);
    if (!isNaN(num)) {
      formattedIndex = `#${String(num).padStart(2, '0')}`;
    } else {
      formattedIndex = `#${rawStr}`;
    }
  }

  // Check if value should render as a status badge
  const normalizedLabel = String(label || '').toLowerCase();
  const normalizedValue = String(value || '').trim().toLowerCase();
  const isStatusField =
    isStatus ||
    normalizedLabel.includes('status') ||
    [
      'active',
      'inactive',
      'verified',
      'pending',
      'completed',
      'failed',
      'available',
      'unavailable',
      'delivery',
      'non-delivery',
      'operational'
    ].includes(normalizedValue);

  const isNA = value === undefined || value === null || String(value).trim() === '' || normalizedValue === 'n/a';

  return (
    <div
      data-field-id={id}
      className={`flex items-start bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs hover:shadow-sm transition-all duration-150 w-full group min-w-0 ${hoverBorder} ${className}`}
    >
      {/* Left-side Icon */}
      <div
        className={`${iconBg} rounded-lg w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 shadow-2xs mr-3 mt-0.5 group-hover:scale-105 transition-transform duration-150`}
      >
        {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.2} />}
      </div>

      {/* Content Container */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Top Header Row: FIELD NAME on Left, #01 on Right */}
        <div className="flex items-center justify-between gap-1.5 w-full min-w-0 mb-1">
          <label
            className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate"
            title={label}
          >
            {label} {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          {formattedIndex && (
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 shrink-0 select-none">
              {formattedIndex}
            </span>
          )}
        </div>

        {/* Value Row */}
        <div className="w-full min-w-0">
          {isStatusField && !isNA ? (
            <div className="pt-0.5">
              <StatusBadge status={String(value)} />
            </div>
          ) : isNA ? (
            <p className="text-[12px] sm:text-[13px] font-medium italic text-slate-400 leading-snug break-words whitespace-normal">
              {value || 'N/A'}
            </p>
          ) : (
            <p
              className="text-[13px] sm:text-[14px] font-bold text-slate-900 leading-snug break-words whitespace-normal"
              title={String(value)}
            >
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
