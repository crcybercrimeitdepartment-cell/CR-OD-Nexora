import { Zap, Calendar, CreditCard, Shield, Activity, RefreshCw, FileText, Download } from 'lucide-react';

export const statsBoxesData = [
  { title: 'Current Plan', val: 'Premium', isStatus: false, icon: Zap, bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600', b: 'border-blue-100 dark:border-blue-800' },
  { title: 'Status', val: 'Active', isStatus: true, icon: Activity, bg: 'bg-emerald-50 dark:bg-emerald-900/20', color: 'text-emerald-600', b: 'border-emerald-100 dark:border-emerald-800' },
  { title: 'Billing', val: 'Annually', isStatus: false, icon: Calendar, bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-600', b: 'border-purple-100 dark:border-purple-800' },
  { title: 'Payment', val: 'Verified', isStatus: false, icon: CreditCard, bg: 'bg-amber-50 dark:bg-amber-900/20', color: 'text-amber-600', b: 'border-amber-100 dark:border-amber-800' },
  { title: 'Security', val: 'High', isStatus: false, icon: Shield, bg: 'bg-rose-50 dark:bg-rose-900/20', color: 'text-rose-600', b: 'border-rose-100 dark:border-rose-800' }
];

export const planFeaturesData = [
  'Advanced analytics and reporting',
  'Unlimited projects and team members',
  '24/7 dedicated priority support',
  'Custom domain and branding'
];

export const actionButtonsData = [
  { id: 'renew', label: 'Renew Subscription', icon: RefreshCw, bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600' },
  { id: 'change', label: 'Change Plan', icon: Zap, bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600' },
  { id: 'en-auto-ren', label: 'Enable Auto-Renew', icon: RefreshCw, bg: 'bg-emerald-100 dark:bg-emerald-900/40', color: 'text-emerald-600' },
  { id: 'en-auto-pay', label: 'Enable Auto-Pay', icon: CreditCard, bg: 'bg-teal-100 dark:bg-teal-900/40', color: 'text-teal-600' },
  { id: 'upd-pay', label: 'Update Payment', icon: CreditCard, bg: 'bg-amber-100 dark:bg-amber-900/40', color: 'text-amber-600' },
  { id: 'view-bill', label: 'View Latest Bill', icon: FileText, bg: 'bg-indigo-100 dark:bg-indigo-900/40', color: 'text-indigo-600' },
  { id: 'download', label: 'Download Invoice', icon: Download, bg: 'bg-slate-100 dark:bg-slate-800', color: 'text-slate-600 dark:text-slate-400' }
];
