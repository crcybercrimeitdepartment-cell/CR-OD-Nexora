import React, { useState } from 'react';
import {
    Search, ChevronDown, Eye, Download, FileText, ChevronLeft, ChevronRight,
    Calendar, CreditCard, LayoutList, Package, Activity, Settings, IndianRupee,
    ShieldCheck, Zap, ArrowUpRight, Check, SlidersHorizontal, Clock, HelpCircle,
    RefreshCcw, FolderOpen, HeadphonesIcon, XCircle, AlertCircle, PauseCircle, CheckCircle2
} from 'lucide-react';
import { MOCK_ORDERS } from './OrderHistoryData';

const StatusBadge = ({ status, large = false }) => {
    const s = status.toLowerCase();
    const sizeClasses = large ? "px-2.5 py-1 text-[11px]" : "px-2 py-0.5 text-[10px]";
    if (['paid', 'completed', 'active'].includes(s)) return <span className={`${sizeClasses} bg-green-50/80 text-green-600 font-bold rounded`}> {status} </span>;
    if (['expired', 'cancelled'].includes(s)) return <span className={`${sizeClasses} bg-red-50/80 text-red-500 font-bold rounded`}> {status} </span>;
    if (['refunded'].includes(s)) return <span className={`${sizeClasses} bg-blue-50 text-blue-600 font-bold rounded`}> {status} </span>;
    return <span className={`${sizeClasses} bg-slate-50 text-slate-600 font-bold rounded`}>{status}</span>;
};

const CardHeader = ({ icon: Icon, title, iconColor = "text-blue-600" }) => (
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <h2 className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{title}</h2>
    </div>
);

const KeyValue = ({ label, value, valueNode, boldValue = false }) => (
    <div className="flex justify-between items-center py-2 text-[11px]">
        <span className="font-bold text-slate-700 dark:text-slate-300">{label}</span>
        {valueNode ? valueNode : <span className={`text-right text-slate-600 dark:text-slate-400 ${boldValue ? "font-black text-slate-800 dark:text-slate-200" : "font-semibold"}`}>{value}</span>}
    </div>
);

export default function OrderHistory({ onBack }) {
    const [orders, setOrders] = useState(MOCK_ORDERS);
    
    const [filters, setFilters] = useState({
        searchOrderId: '',
        searchPlanName: '',
        searchTransactionId: '',
        dateRange: '',
        plan: '',
        orderStatus: '',
        paymentStatus: '',
        subscriptionStatus: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        let filtered = [...MOCK_ORDERS];
        
        if (filters.searchOrderId) {
            filtered = filtered.filter(o => o.id.toLowerCase().includes(filters.searchOrderId.toLowerCase()));
        }
        if (filters.searchPlanName || filters.plan) {
            const planTerm = (filters.searchPlanName || filters.plan).toLowerCase();
            filtered = filtered.filter(o => o.name.toLowerCase().includes(planTerm));
        }
        if (filters.orderStatus) {
            filtered = filtered.filter(o => o.oStatus.toLowerCase() === filters.orderStatus.toLowerCase());
        }
        if (filters.paymentStatus) {
            filtered = filtered.filter(o => o.pStatus.toLowerCase() === filters.paymentStatus.toLowerCase());
        }
        
        setOrders(filtered);
    };

    const resetFilters = () => {
        setFilters({
            searchOrderId: '',
            searchPlanName: '',
            searchTransactionId: '',
            dateRange: '',
            plan: '',
            orderStatus: '',
            paymentStatus: '',
            subscriptionStatus: ''
        });
        setOrders(MOCK_ORDERS);
    };
    return (
        <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 pt-20 sm:pt-24 pb-12 px-3 sm:px-6 relative font-sans">


            {/* Header */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 w-full max-w-[1720px] mx-auto px-4">
                <div className="flex items-center gap-4">
                      {onBack && (
                          <button onClick={onBack}
                            className="text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm shrink-0"
                          >
                            <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            <span className="hidden sm:inline">Back</span>
                          </button>
                      )}
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight flex items-center gap-3">Order History</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">View and manage all your orders, subscriptions, payments, and related details.</p>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 md:px-10 mt-2 space-y-4 w-full max-w-[1720px] mx-auto relative z-10">

                {/* Card 11: Search & Filters */}
                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-5">
                    <div className="flex items-center gap-2.5 mb-5">
                        <Search className="w-5 h-5 text-blue-600" />
                        <h3 className="text-base font-black text-slate-800 dark:text-white">Search & Filters</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Search Order ID</label>
                            <input name="searchOrderId" value={filters.searchOrderId} onChange={handleFilterChange} type="text" placeholder="Enter Order ID" className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Search Plan Name</label>
                            <input name="searchPlanName" value={filters.searchPlanName} onChange={handleFilterChange} type="text" placeholder="Enter Plan Name" className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Search Transaction ID</label>
                            <input name="searchTransactionId" value={filters.searchTransactionId} onChange={handleFilterChange} type="text" placeholder="Enter Transaction ID" className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Date Range</label>
                            <input name="dateRange" value={filters.dateRange} onChange={handleFilterChange} type="date" className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-slate-500" />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Plan</label>
                            <select name="plan" value={filters.plan} onChange={handleFilterChange} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white text-slate-500">
                                <option value="">Select Plan</option>
                                <option value="Standard Enterprise">Standard Enterprise</option>
                                <option value="Professional">Professional</option>
                                <option value="Basic">Basic</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Order Status</label>
                            <select name="orderStatus" value={filters.orderStatus} onChange={handleFilterChange} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white text-slate-500">
                                <option value="">Select Status</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Payment Status</label>
                            <select name="paymentStatus" value={filters.paymentStatus} onChange={handleFilterChange} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white text-slate-500">
                                <option value="">Select Status</option>
                                <option value="Paid">Paid</option>
                                <option value="Refunded">Refunded</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Subscription Status</label>
                            <select name="subscriptionStatus" value={filters.subscriptionStatus} onChange={handleFilterChange} className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 appearance-none bg-white text-slate-500">
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Expired">Expired</option>
                            </select>
                        </div>

                        <div className="flex items-end justify-end gap-3 sm:col-span-2 lg:col-span-4 xl:col-span-2 mt-2 xl:mt-0">
                            <button onClick={resetFilters} className="flex-1 xl:flex-none flex items-center justify-center gap-1.5 px-6 py-2 border border-slate-300 rounded-md text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors h-[36px]">
                                <RefreshCcw className="w-3.5 h-3.5" /> Reset
                            </button>
                            <button onClick={applyFilters} className="flex-1 xl:flex-none flex items-center justify-center gap-1.5 px-6 py-2 bg-blue-500 text-white rounded-md text-[11px] font-bold hover:bg-blue-600 transition-colors h-[36px]">
                                <Search className="w-3.5 h-3.5" /> Apply Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* ROW 2: Order Records & Details */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
                    {/* Card 1: Order Records Table */}
                    <div className="xl:col-span-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-4 flex flex-col">
                        <CardHeader icon={LayoutList} title="Order Records" />
                        <div className="flex-1 overflow-auto mt-2 max-h-[400px]">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm z-10">
                                    <tr className="border-b border-slate-200 dark:border-slate-700/60 text-[10px] text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider">
                                        <th className="py-2.5 px-2">Order ID</th>
                                        <th className="py-2.5 px-2">Date & Time</th>
                                        <th className="py-2.5 px-2">Plan Details</th>
                                        <th className="py-2.5 px-2">Duration</th>
                                        <th className="py-2.5 px-2">Amount</th>
                                        <th className="py-2.5 px-2">Payment</th>
                                        <th className="py-2.5 px-2">Status</th>
                                        <th className="py-2.5 px-2 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((ord, idx) => (
                                        <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/60 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                            <td className="py-2.5 px-2 text-[11px] font-bold text-slate-700 dark:text-slate-300">{ord.id}</td>
                                            <td className="py-2.5 px-2">
                                                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{ord.date}</div>
                                                <div className="text-[9px] text-slate-500 mt-0.5">{ord.time}</div>
                                            </td>
                                            <td className="py-2.5 px-2">
                                                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{ord.name}</div>
                                                <div className="text-[9px] text-slate-500 mt-0.5">{ord.type}</div>
                                            </td>
                                            <td className="py-2.5 px-2 text-[11px] font-medium text-slate-600 dark:text-slate-400">{ord.duration}</td>
                                            <td className="py-2.5 px-2 text-[11px] font-bold text-slate-800 dark:text-slate-200">₹ {ord.amount}</td>
                                            <td className="py-2.5 px-2"><StatusBadge status={ord.pStatus} /></td>
                                            <td className="py-2.5 px-2"><StatusBadge status={ord.oStatus} /></td>
                                            <td className="py-2.5 px-2 text-center">
                                                <button className="p-1.5 rounded-md text-blue-600 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors inline-flex items-center justify-center shadow-sm">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Card 2: Order Details */}
                    <div className="xl:col-span-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col">
                        <CardHeader large icon={FileText} title="Order Details" />
                        <div className="flex-1 flex flex-col gap-3 mt-2">
                            <KeyValue large label="Order ID" value="ORD-2024-1001" boldValue />
                            <KeyValue large label="Order Date" value="10 Aug, 2024" />
                            <KeyValue large label="Order Time" value="10:30 AM" />
                            <KeyValue large label="Order Status" valueNode={<StatusBadge status="Completed" large />} />
                            <KeyValue large label="Purchase Type" value="New Subscription" />
                            <KeyValue large label="Order Ref No." value="REF-1001" />
                        </div>
                    </div>

                    {/* Card 3: Plan Details */}
                    <div className="xl:col-span-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col">
                        <CardHeader large icon={Package} title="Plan Details" />
                        <div className="flex-1 flex flex-col gap-3 mt-2">
                            <KeyValue large label="Plan Name" value="Standard Enterprise" boldValue />
                            <KeyValue large label="Plan Type" value="Subscription" />
                            <KeyValue large label="Plan Description" value="Enterprise Suite" />
                            <KeyValue large label="Sub. Duration" value="12 Months" />
                            <KeyValue large label="Start Date" value="10 Aug, 2024" />
                            <KeyValue large label="Expiry Date" value="09 Aug, 2025" />
                            <KeyValue large label="Renewal Date" value="09 Aug, 2025" />
                            <KeyValue large label="Plan Status" valueNode={<span className="text-green-500 font-bold text-sm">Active</span>} />
                        </div>
                    </div>
                </div>

                {/* ROW 3: 5 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                    {/* Card 4: Purchased Features */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-4 flex flex-col">
                        <CardHeader icon={ShieldCheck} title="Purchased Features" iconColor="text-green-500" />
                        <div className="flex-1 flex flex-col gap-3 mt-2">
                            <KeyValue large label="Included Features" valueNode={<span className="px-2 py-0.5 bg-blue-50 text-blue-600 font-bold rounded">45</span>} />
                            <KeyValue large label="Add-on Features" valueNode={<span className="px-2 py-0.5 bg-purple-50 text-purple-600 font-bold rounded">12</span>} />
                            <KeyValue large label="Not Included" valueNode={<span className="px-2 py-0.5 bg-red-50 text-red-500 font-bold rounded">8</span>} />
                            <KeyValue large label="Feature Status" valueNode={<span className="text-green-600 font-bold">All Active</span>} />
                        </div>
                    </div>

                    {/* Card 5: Pricing & Amount */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-4 flex flex-col">
                        <CardHeader icon={IndianRupee} title="Pricing & Amount" iconColor="text-blue-600" />
                        <div className="flex-1 flex flex-col gap-3 mt-2">
                            <KeyValue large label="Plan Price" value="₹ 5,999.00" boldValue />
                            <KeyValue large label="Billing Cycle" value="Annually" />
                            <KeyValue large label="Discount" value="- ₹ 0.00" />
                            <KeyValue large label="Add-on Charges" value="₹ 0.00" />
                            <KeyValue large label="Tax (18%)" value="₹ 1,079.82" />
                            <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 flex justify-between items-center mt-1">
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Total Amount</span>
                                <span className="text-sm font-black text-blue-600">₹ 7,078.82</span>
                            </div>
                            <KeyValue large label="Currency" value="INR" />
                        </div>
                    </div>

                    {/* Card 6: Payment Information */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-4 flex flex-col">
                        <CardHeader icon={CreditCard} title="Payment Information" iconColor="text-blue-600" />
                        <div className="flex-1 flex flex-col gap-3 mt-2">
                            <KeyValue large label="Payment Method" value="Credit Card" />
                            <KeyValue large label="Payment Date" value="10 Aug, 2024" />
                            <KeyValue large label="Payment Status" valueNode={<span className="text-green-500 font-bold text-xs">Paid</span>} />
                            <KeyValue large label="Transaction ID" value="TXN-2024-00045" />
                            <KeyValue large label="Payment Reference" value="PAY-REF-1001" />
                            <KeyValue large label="Payment Confirmation" valueNode={<span className="text-green-500 font-bold text-xs">Confirmed</span>} />
                        </div>
                    </div>

                    {/* Card 7: Subscription Status */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-4 flex flex-col">
                        <CardHeader icon={Activity} title="Subscription Status" iconColor="text-purple-500" />
                        <div className="mt-2 space-y-3">
                            <div className="flex items-center gap-2.5 p-2 bg-green-50 rounded border border-green-100">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-bold text-green-700">Active</span>
                            </div>
                            <div className="flex items-center gap-2.5 px-2 py-1">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span className="text-xs font-medium text-slate-600">Pending Activation</span>
                            </div>
                            <div className="flex items-center gap-2.5 px-2 py-1">
                                <AlertCircle className="w-4 h-4 text-purple-500" />
                                <span className="text-xs font-medium text-slate-600">Expiring Soon</span>
                            </div>
                            <div className="flex items-center gap-2.5 px-2 py-1">
                                <XCircle className="w-4 h-4 text-red-500" />
                                <span className="text-xs font-medium text-slate-600">Expired</span>
                            </div>
                            <div className="flex items-center gap-2.5 px-2 py-1">
                                <PauseCircle className="w-4 h-4 text-slate-500" />
                                <span className="text-xs font-medium text-slate-600">Suspended</span>
                            </div>
                            <div className="flex items-center gap-2.5 px-2 py-1">
                                <XCircle className="w-4 h-4 text-red-500" />
                                <span className="text-xs font-medium text-slate-600">Cancelled</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 8: Order Timeline */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-4 flex flex-col">
                        <CardHeader icon={Clock} title="Order Timeline" iconColor="text-blue-500" />
                        <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-2 mt-4 space-y-5">
                            <div className="relative pl-5">
                                <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white"></div>
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Order Created</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">10 Aug, 2024 10:30 AM</p>
                            </div>
                            <div className="relative pl-5">
                                <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Payment Completed</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">10 Aug, 2024 10:31 AM</p>
                            </div>
                            <div className="relative pl-5">
                                <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Order Approved</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">10 Aug, 2024 10:32 AM</p>
                            </div>
                            <div className="relative pl-5">
                                <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-white"></div>
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Subscription Activated</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">10 Aug, 2024 10:35 AM</p>
                            </div>
                            <div className="relative pl-5 opacity-50">
                                <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 bg-slate-300 rounded-full border-2 border-white"></div>
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Subscription Renewed</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">Pending (09 Aug, 2025)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROW 4: Documents & Actions */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {/* Card 9: Order Documents */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-4 flex flex-col">
                        <CardHeader icon={FileText} title="Order Documents" />
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-1">
                            <div className="flex flex-col p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-blue-200 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white">
                                <FileText className="w-5 h-5 text-blue-500 mb-2 transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex-1">
                                    <p className="text-[9px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Invoice</p>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                                    <span className="text-[8px] text-slate-400">PDF</span>
                                    <Download className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                </div>
                            </div>
                            <div className="flex flex-col p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-red-200 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white">
                                <FileText className="w-5 h-5 text-red-500 mb-2 transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex-1">
                                    <p className="text-[9px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Payment Receipt</p>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                                    <span className="text-[8px] text-slate-400">PDF</span>
                                    <Download className="w-3 h-3 text-slate-400 group-hover:text-red-500 transition-colors" />
                                </div>
                            </div>
                            <div className="flex flex-col p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-green-200 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white">
                                <FileText className="w-5 h-5 text-green-500 mb-2 transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex-1">
                                    <p className="text-[9px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Order Confirmation</p>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                                    <span className="text-[8px] text-slate-400">PDF</span>
                                    <Download className="w-3 h-3 text-slate-400 group-hover:text-green-500 transition-colors" />
                                </div>
                            </div>
                            <div className="flex flex-col p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-purple-200 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white">
                                <FileText className="w-5 h-5 text-purple-500 mb-2 transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex-1">
                                    <p className="text-[9px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Subscription Document</p>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                                    <span className="text-[8px] text-slate-400">PDF</span>
                                    <Download className="w-3 h-3 text-slate-400 group-hover:text-purple-500 transition-colors" />
                                </div>
                            </div>
                            <div className="flex flex-col p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-orange-200 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white">
                                <FileText className="w-5 h-5 text-orange-500 mb-2 transition-transform duration-300 group-hover:scale-110" />
                                <div className="flex-1">
                                    <p className="text-[9px] font-bold text-slate-700 dark:text-slate-300 leading-tight">License / Auth.</p>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                                    <span className="text-[8px] text-slate-400">PDF</span>
                                    <Download className="w-3 h-3 text-slate-400 group-hover:text-orange-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 10: Order Actions */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-4 flex flex-col">
                        <CardHeader icon={Zap} title="Order Actions" />
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-1 h-full">
                            <button className="flex flex-col items-center justify-center p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-blue-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 group transition-all duration-300 text-center bg-white">
                                <Eye className="w-4 h-4 text-slate-500 group-hover:text-blue-600 mb-1.5 transition-transform duration-300 group-hover:scale-125" />
                                <span className="text-[9px] font-bold text-slate-600 group-hover:text-blue-700 leading-tight transition-colors">View Order</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-blue-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 group transition-all duration-300 text-center bg-white">
                                <LayoutList className="w-4 h-4 text-slate-500 group-hover:text-blue-600 mb-1.5 transition-transform duration-300 group-hover:scale-125" />
                                <span className="text-[9px] font-bold text-slate-600 group-hover:text-blue-700 leading-tight transition-colors">View Plan</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-blue-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 group transition-all duration-300 text-center bg-white">
                                <ShieldCheck className="w-4 h-4 text-slate-500 group-hover:text-blue-600 mb-1.5 transition-transform duration-300 group-hover:scale-125" />
                                <span className="text-[9px] font-bold text-slate-600 group-hover:text-blue-700 leading-tight transition-colors">View Features</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-blue-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 group transition-all duration-300 text-center bg-white">
                                <CreditCard className="w-4 h-4 text-slate-500 group-hover:text-blue-600 mb-1.5 transition-transform duration-300 group-hover:scale-125" />
                                <span className="text-[9px] font-bold text-slate-600 group-hover:text-blue-700 leading-tight transition-colors">View Payment</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-blue-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 group transition-all duration-300 text-center bg-white">
                                <Download className="w-4 h-4 text-blue-500 group-hover:text-blue-600 mb-1.5 transition-transform duration-300 group-hover:scale-125" />
                                <span className="text-[9px] font-bold text-blue-600 group-hover:text-blue-700 leading-tight transition-colors">Download Invoice</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-blue-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 group transition-all duration-300 text-center bg-white">
                                <Download className="w-4 h-4 text-blue-500 group-hover:text-blue-600 mb-1.5 transition-transform duration-300 group-hover:scale-125" />
                                <span className="text-[9px] font-bold text-blue-600 group-hover:text-blue-700 leading-tight transition-colors">Download Receipt</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-2.5 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-blue-200 hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 group transition-all duration-300 text-center col-span-3 sm:col-span-2 bg-white">
                                <Activity className="w-4 h-4 text-slate-500 group-hover:text-blue-600 mb-1.5 transition-transform duration-300 group-hover:scale-125" />
                                <span className="text-[9px] font-bold text-slate-600 group-hover:text-blue-700 leading-tight transition-colors">View Subscription</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ROW 5: Summary & Upgrade */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mt-2">
                    {/* Order Summary */}
                    <div className="xl:col-span-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-4 flex items-center flex-wrap gap-4 lg:gap-8">
                        <div className="mr-4">
                            <h2 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wide mb-0.5">Order Summary</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 dark:border-slate-800"><FileText className="w-4 h-4 text-slate-500" /></div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-500">Total Orders</p>
                                <p className="text-sm font-black text-slate-800 dark:text-slate-200">25</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-slate-100 dark:border-slate-800 pl-4 lg:pl-8">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 dark:border-slate-800"><IndianRupee className="w-4 h-4 text-slate-500" /></div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-500">Total Spent</p>
                                <p className="text-sm font-black text-slate-800 dark:text-slate-200">₹ 1,24,975</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-slate-100 dark:border-slate-800 pl-4 lg:pl-8">
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center border border-green-100"><ShieldCheck className="w-4 h-4 text-green-500" /></div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-500">Active Subscriptions</p>
                                <p className="text-sm font-black text-slate-800 dark:text-slate-200">3</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-slate-100 dark:border-slate-800 pl-4 lg:pl-8">
                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100"><Calendar className="w-4 h-4 text-orange-500" /></div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-500">Expired Subscriptions</p>
                                <p className="text-sm font-black text-slate-800 dark:text-slate-200">1</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-slate-100 dark:border-slate-800 pl-4 lg:pl-8">
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center border border-red-100"><XCircle className="w-4 h-4 text-red-500" /></div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-500">Cancelled Orders</p>
                                <p className="text-sm font-black text-slate-800 dark:text-slate-200">2</p>
                            </div>
                        </div>
                    </div>

                    {/* Upgrade Banner */}
                    <div className="xl:col-span-1 bg-blue-50 rounded-xl border border-blue-100 p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-xs font-black text-blue-900 mb-1">Need More Storage or Features?</h3>
                            <p className="text-[9px] font-medium text-blue-700">Upgrade your plan for more power and advanced tools.</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors shrink-0 ml-2">
                            Upgrade Plan <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
