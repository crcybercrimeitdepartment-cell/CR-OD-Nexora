import { ShieldCheck, ShieldAlert, Monitor, Laptop, Smartphone, AlertTriangle } from 'lucide-react';

export const initialDevices = [
  { 
    id: 'DVC-001', 
    name: 'MacBook Pro 16"', 
    type: 'Laptop', 
    os: 'macOS 13.5', 
    browser: 'Chrome 115', 
    location: 'New York, US', 
    ip: '192.168.1.45', 
    ipType: 'IPv4', 
    ipFirstSeen: '2023-01-01', 
    ipLastSeen: '2023-10-25', 
    registeredDate: '2022-11-15, 10:00 AM', 
    lastUsed: 'Just now', 
    trustStatus: 'Trusted', 
    status: 'Active', 
    trustedDate: '2022-11-15', 
    verificationStatus: 'Verified', 
    verificationDate: '2023-09-01', 
    verificationMethod: '2FA', 
    isCurrent: true 
  },
  { 
    id: 'DVC-002', 
    name: 'iPhone 14 Pro', 
    type: 'Mobile', 
    os: 'iOS 17.0', 
    browser: 'Safari Mobile', 
    location: 'London, UK', 
    ip: '10.0.0.12', 
    ipType: 'IPv4', 
    ipFirstSeen: '2023-02-14', 
    ipLastSeen: '2023-10-24', 
    registeredDate: '2023-02-14, 08:30 PM', 
    lastUsed: '2 days ago', 
    trustStatus: 'Trusted', 
    status: 'Inactive', 
    trustedDate: '2023-02-14', 
    verificationStatus: 'Verified', 
    verificationDate: '2023-02-15', 
    verificationMethod: 'Biometric', 
    isCurrent: false 
  },
  { 
    id: 'DVC-003', 
    name: 'Unknown Windows PC', 
    type: 'Desktop', 
    os: 'Windows 11', 
    browser: 'Edge', 
    location: 'Moscow, RU', 
    ip: '172.16.254.1', 
    ipType: 'IPv4', 
    ipFirstSeen: '2023-10-20', 
    ipLastSeen: '2023-10-20', 
    registeredDate: '2023-10-20, 03:00 AM', 
    lastUsed: '5 days ago', 
    trustStatus: 'Blocked', 
    status: 'Blocked', 
    blockReason: 'Suspicious login attempt from unauthorized location.', 
    blockedDate: '2023-10-20', 
    verificationStatus: 'Verification Required', 
    isCurrent: false 
  }
];

export const initialHistory = [
  { id: 'h1', action: 'Login Successful', target: 'MacBook Pro 16"', time: 'Today, 10:00 AM', icon: ShieldCheck, color: 'text-emerald-500', prevIp: '192.168.1.45', newIp: '192.168.1.45' },
  { id: 'h2', action: 'Device Blocked', target: 'Unknown Windows PC', time: 'Oct 20, 03:05 AM', icon: ShieldAlert, color: 'text-rose-500', prevIp: '172.16.254.1', newIp: '172.16.254.1' }
];

export const initialSecurityAlerts = [
  { id: 's1', type: 'block', title: 'Suspicious Login Attempt', desc: 'Blocked unauthorized access from Moscow, RU.', time: 'Oct 20', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' }
];
