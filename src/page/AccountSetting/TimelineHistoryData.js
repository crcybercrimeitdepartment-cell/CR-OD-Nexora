import { ShieldCheck, Database, FileText, Lock, ShieldAlert, Monitor } from 'lucide-react';

export const mockOverview = {
  total: 1250,
  today: 45,
  week: 320,
  month: 1250,
  activeModules: 5,
  alerts: 12
};

export const mockModules = [
  { 
    id: 'm1', 
    name: 'Authentication',
    stats: '124 logins',
    time: '2h 15m',
    icon: ShieldCheck,
    bg: 'bg-emerald-100',
    color: 'text-emerald-600'
  },
  { 
    id: 'm2', 
    name: 'Data Export',
    stats: '12 exports',
    time: '45m',
    icon: Database,
    bg: 'bg-blue-100',
    color: 'text-blue-600'
  },
  { 
    id: 'm3', 
    name: 'System Logs',
    stats: '5k logs',
    time: '1h 30m',
    icon: FileText,
    bg: 'bg-purple-100',
    color: 'text-purple-600'
  }
];

export const mockCategories = [
  { id: 'c1', name: 'Security', count: 450, icon: Lock },
  { id: 'c2', name: 'System', count: 320, icon: Monitor },
  { id: 'c3', name: 'Alerts', count: 12, icon: ShieldAlert }
];

export const initialActivities = [
  { 
    id: 'ACT-001', 
    date: '10 Aug 2026', 
    time: '10:00 AM', 
    name: 'User Login', 
    module: 'Authentication', 
    type: 'Security', 
    status: 'Success', 
    caseId: 'CASE-001', 
    invId: 'INV-001', 
    refId: 'REF-001', 
    desc: 'User logged in successfully from authorized IP.', 
    result: 'Access Granted', 
    duration: '2 seconds', 
    icon: ShieldCheck, 
    bg: 'bg-emerald-100', 
    color: 'text-emerald-500' 
  },
  { 
    id: 'ACT-002', 
    date: '10 Aug 2026', 
    time: '11:30 AM', 
    name: 'Data Exported', 
    module: 'Data Export', 
    type: 'System', 
    status: 'Completed', 
    caseId: 'CASE-002', 
    invId: 'INV-002', 
    refId: 'REF-002', 
    desc: 'Exported 1500 records from the database.', 
    result: 'File Generated', 
    duration: '45 seconds', 
    icon: Database, 
    bg: 'bg-blue-100', 
    color: 'text-blue-500' 
  }
];
