import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Info,
  RefreshCw
} from 'lucide-react';

/**
 * Standard StatusBadge Component for NEXORA Reports and Data Pages.
 * 
 * Maps semantic status text to consistent colors and icons matching NEXORA design guidelines.
 *
 * @param {Object} props
 * @param {string} props.status - The status text (e.g., 'Active', 'Inactive', 'Verified', etc.)
 * @param {'sm'|'md'} [props.size='sm'] - Badge size
 * @param {string} [props.className] - Additional classes
 */
export default function StatusBadge({ status, size = 'sm', className = '' }) {
  if (!status) return null;

  const normalized = String(status).trim().toLowerCase();

  let Icon = Info;
  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (
    normalized === 'active' ||
    normalized === 'verified' ||
    normalized === 'completed' ||
    normalized === 'success' ||
    normalized === 'approved' ||
    normalized === 'restored' ||
    normalized === 'delivery' ||
    normalized === 'delivered'
  ) {
    Icon = normalized === 'verified' ? ShieldCheck : CheckCircle2;
    colorClasses = 'bg-emerald-100/90 text-emerald-800 border-emerald-300/80';
  } else if (
    normalized === 'pending' ||
    normalized === 'in progress' ||
    normalized === 'processing' ||
    normalized === 'requested' ||
    normalized === 'restore requested' ||
    normalized === 'transit' ||
    normalized === 'in transit'
  ) {
    Icon = normalized.includes('request') ? RefreshCw : Clock;
    colorClasses = 'bg-amber-100/90 text-amber-800 border-amber-300/80';
  } else if (
    normalized === 'inactive' ||
    normalized === 'failed' ||
    normalized === 'rejected' ||
    normalized === 'error' ||
    normalized === 'permanently deleted' ||
    normalized === 'deleted' ||
    normalized === 'closed' ||
    normalized === 'deactivated' ||
    normalized === 'disconnected' ||
    normalized === 'unavailable' ||
    normalized === 'non delivery' ||
    normalized === 'non-delivery'
  ) {
    Icon = XCircle;
    colorClasses = 'bg-rose-100/90 text-rose-800 border-rose-300/80';
  } else if (
    normalized === 'available' ||
    normalized === 'open' ||
    normalized === 'operational'
  ) {
    Icon = Activity;
    colorClasses = 'bg-blue-100/90 text-blue-800 border-blue-300/80';
  } else if (
    normalized === 'warning' ||
    normalized === 'flagged' ||
    normalized === 'suspended'
  ) {
    Icon = AlertTriangle;
    colorClasses = 'bg-orange-100/90 text-orange-800 border-orange-300/80';
  }

  const sizeClasses = size === 'md'
    ? 'px-3 py-1 text-xs sm:text-sm gap-1.5'
    : 'px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs gap-1';

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full border shadow-2xs whitespace-nowrap select-none ${sizeClasses} ${colorClasses} ${className}`}
    >
      <Icon className={size === 'md' ? 'w-3.5 h-3.5 shrink-0' : 'w-3 h-3 shrink-0'} strokeWidth={2.2} />
      <span>{status}</span>
    </span>
  );
}
