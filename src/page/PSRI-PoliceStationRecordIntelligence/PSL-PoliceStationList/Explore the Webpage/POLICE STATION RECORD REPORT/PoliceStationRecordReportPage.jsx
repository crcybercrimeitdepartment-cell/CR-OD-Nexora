import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw, Save, Share2, Download,
  MapPin, Map, Hash, FileText, Route, Calendar,
  ShieldAlert, Shield, ShieldCheck, Phone, Mail,
  Gavel, Scale, Building2, Zap, MapPinned, CheckCircle2
} from 'lucide-react';

const allFields = [
  // General Info & Administration
  { id: "1", key: "sl_no", label: "SL No", required: true, icon: Hash },
  { id: "2", key: "police_station_id", label: "Station ID", required: true, icon: Hash },
  { id: "3", key: "police_station_name", label: "Station Name", required: true, icon: Building2 },
  { id: "4", key: "police_station_type", label: "Station Type", required: true, icon: Shield },
  { id: "5", key: "police_station_status", label: "Station Status", required: true, icon: ShieldCheck },
  { id: "6", key: "establishment_year", label: "Est. Year", required: true, icon: Calendar },
  { id: "7", key: "police_range", label: "Police Range", required: true, icon: Map },
  { id: "8", key: "police_sub_division", label: "Sub-Division", required: true, icon: MapPin },
  { id: "9", key: "police_circle", label: "Police Circle", required: true, icon: MapPin },
  { id: "10", key: "controlling_authority", label: "Control Authority", required: true, icon: Building2 },

  // Location & Highways
  { id: "11", key: "tehsil", label: "Tehsil", required: true, icon: MapPin },
  { id: "12", key: "full_address", label: "Full Address", required: true, icon: MapPinned },
  { id: "13", key: "pin_code", label: "PIN Code", required: true, icon: Hash },
  { id: "14", key: "nearest_landmark", label: "Nearest Landmark", required: true, icon: MapPin },
  { id: "15", key: "nearest_nh", label: "Nearest NH", icon: Route },
  { id: "16", key: "nearest_sh", label: "Nearest SH", icon: Route },
  { id: "17", key: "highway_km_chainage", label: "Highway KM", icon: Hash },

  // Jurisdiction & Courts
  { id: "18", key: "court_jurisdiction", label: "Court Jurisdiction", required: true, icon: Scale },
  { id: "19", key: "associated_court_magistrate", label: "Magistrate", required: true, icon: Gavel },
  { id: "20", key: "magistrate_jurisdiction", label: "Magistrate Juris.", required: true, icon: Scale },
  { id: "21", key: "district_court", label: "District Court", required: true, icon: Building2 },
  { id: "22", key: "sessions_court", label: "Sessions Court", required: true, icon: Building2 },
  { id: "23", key: "jail_distance", label: "Jail Distance", required: true, icon: Route },

  // Station Contacts & Facilities
  { id: "24", key: "police_station_email", label: "Station Email", required: true, icon: Mail },
  { id: "25", key: "police_station_phone_number", label: "Station Phone", required: true, icon: Phone },
  { id: "26", key: "police_station_landline", label: "Station Landline", icon: Phone },
  { id: "27", key: "police_station_cug_mobile", label: "Station CUG", required: true, icon: Phone },
  { id: "28", key: "fax_number", label: "Fax Number", icon: FileText },
  { id: "29", key: "nearest_petrol_pump", label: "Nearest Pump", icon: Zap },
  { id: "30", key: "petrol_pump_distance", label: "Pump Distance", icon: Route }
];

const FormField = ({ id, label, value, required, icon: Icon }) => {
    return (
        <div className="flex items-center bg-white/60 backdrop-blur-md border border-white/50 rounded-[10px] p-2 sm:p-2.5 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 hover:border-green-400 w-full group overflow-hidden">
            <div className="bg-[#16a34a] rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 shadow-sm mr-3 group-hover:scale-105 transition-transform duration-300">
                {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.2} />}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <label className="text-[10px] sm:text-[11px] font-bold text-[#1e3a8a] uppercase tracking-wide block truncate" title={label}>
                    {label} {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
                <div className="w-full overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <p className="text-[12px] sm:text-[14px] font-extrabold text-[#1e3a8a] inline-block mt-0.5" title={value || 'N/A'}>
                        {value || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

const SkeletonField = () => {
    return (
        <div className="flex items-center bg-white/60 backdrop-blur-md border border-white/50 rounded-[10px] p-2 sm:p-2.5 shadow-sm w-full h-[52px] sm:h-[62px] overflow-hidden">
            <div className="bg-slate-200 rounded-full w-8 h-8 sm:w-10 sm:h-10 shrink-0 mr-3 animate-pulse"></div>
            <div className="flex-1 flex flex-col justify-center gap-2">
                <div className="bg-slate-200 h-2 sm:h-2.5 w-16 sm:w-20 rounded animate-pulse"></div>
                <div className="bg-slate-200 h-2.5 sm:h-3 w-24 sm:w-32 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

export default function PoliceStationFrontend() {
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5s skeleton loading simulation
        return () => clearTimeout(timer);
    }, []);

    const formattedDate = new Date().toLocaleString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
    const formattedTime = new Date().toLocaleString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
    });

    return (
        <div className="min-h-screen bg-transparent font-sans flex flex-col w-full">

            <div className="w-full flex-1 bg-transparent flex flex-col relative">

                {/* Main Header (Transparent Theme) */}
                <div className="bg-transparent flex flex-col pt-6 pb-2 shrink-0 z-20 relative">
                    
                    {/* Top: Icon & Title */}
                    <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 px-4">
                        <div className="text-[#16a34a] shrink-0">
                            <ShieldCheck className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-[18px] sm:text-2xl md:text-[26px] font-extrabold text-[#1e3a8a] tracking-wide uppercase leading-tight">
                                POLICE STATION RECORD REPORT
                            </h1>
                            <p className="text-slate-500 text-[11px] sm:text-[14px] font-medium mt-0.5">
                                Police Station Data Record
                            </p>
                        </div>
                    </div>

                    {/* Middle: Action Bar */}
                    <div className="mt-3 sm:mt-5 px-3 sm:px-6 md:px-8 w-full">
                        <div className="flex flex-col lg:flex-row items-center justify-between bg-white/60 backdrop-blur-md border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.05)] rounded-xl p-3 sm:px-4 sm:py-3 gap-3 sm:gap-4 lg:gap-0">
                            
                            {/* Left: Report ID & Date */}
                            <div className="flex flex-row items-center justify-between sm:justify-start gap-2 sm:gap-6 w-full lg:w-auto">
                                
                                {/* Report ID */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none min-w-0">
                                    <div className="p-1.5 sm:p-2 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 sm:w-5 h-5 text-[#16a34a]" />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">REPORT ID</p>
                                        <p className="text-[11px] sm:text-[13px] md:text-[14px] font-extrabold text-[#1e3a8a] truncate w-full">PS-2025-000123</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden sm:block w-px h-10 bg-slate-200 shrink-0"></div>

                                {/* Generated On */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none min-w-0 justify-end sm:justify-start">
                                    <div className="p-1.5 sm:p-2 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4 sm:w-5 h-5 text-[#16a34a]" />
                                    </div>
                                    <div className="flex flex-col items-end sm:items-start min-w-0 text-right sm:text-left">
                                        <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">GENERATED ON</p>
                                        <p className="text-[10px] sm:text-[13px] md:text-[14px] font-extrabold text-[#1e3a8a] truncate w-full">{formattedDate} | {formattedTime}</p>
                                    </div>
                                </div>

                            </div>

                            {/* Right: Buttons */}
                            <div className="flex flex-row items-center justify-center sm:justify-end gap-1.5 sm:gap-3 w-full lg:w-auto pt-2 sm:pt-0 border-t border-slate-100 sm:border-0 mt-1 sm:mt-0">
                                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-white/70 backdrop-blur-sm text-[#16a34a] rounded-lg border border-[#16a34a] hover:bg-green-50 transition-all text-[11px] sm:text-[13px] font-bold flex-1 sm:flex-none whitespace-nowrap">
                                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> <span>Share</span>
                                </button>
                                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-white/70 backdrop-blur-sm text-[#16a34a] rounded-lg border border-[#16a34a] hover:bg-green-50 transition-all text-[11px] sm:text-[13px] font-bold flex-1 sm:flex-none whitespace-nowrap">
                                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> <span>Download</span>
                                </button>
                                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-[#16a34a] text-white rounded-lg border border-[#16a34a] hover:bg-[#15803d] shadow-sm transition-all text-[11px] sm:text-[13px] font-bold flex-1 sm:flex-none whitespace-nowrap">
                                    <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> <span>Save Data</span>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 bg-transparent flex flex-col">

                    <div className="p-4 sm:p-6 md:p-8 flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key="police-station-grid"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 px-1"
                            >
                                {isLoading ? (
                                    [...Array(30)].map((_, idx) => <SkeletonField key={idx} />)
                                ) : (
                                    allFields.map((field) => (
                                        <FormField
                                            key={field.id}
                                            id={field.id}
                                            label={field.label}
                                            value={field.value || ""}
                                            required={field.required}
                                            icon={field.icon}
                                        />
                                    ))
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Submit Footer */}
                    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 bg-transparent border-t border-green-200/50 flex items-center justify-end mt-auto shrink-0 gap-3">
                        <button
                            className="flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-[10px] text-[14px] font-bold bg-[#16a34a] text-white hover:bg-[#15803d] transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#16a34a]/50 w-full sm:w-auto sm:min-w-[160px] cursor-pointer"
                        >
                            Submit <Save className="w-4 h-4 ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
