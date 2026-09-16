import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw, Save, Share2, Download, ArrowRight, ArrowLeft,
  MapPin, MapPinned, Map, Hash, FileText, Globe, Flag,
  Layers, Home, TrendingUp, Shield, Users, Activity,
  Truck, Box, Clock, HeartPulse, Book, Coffee, Moon, Sun,
  CheckCircle2, Calendar
} from 'lucide-react';

const allFields = [
  // Basic Location Details
  { id: "1", key: "pin_code", label: "PIN Code", required: true, icon: Hash },
  { id: "2", key: "pin_code_status", label: "Status", required: true, icon: Activity },
  { id: "3", key: "country", label: "Country", required: true, icon: Globe },
  { id: "4", key: "state", label: "State / UT", required: true, icon: Flag },
  { id: "5", key: "district", label: "District", required: true, icon: Map },
  { id: "6", key: "sub_district", label: "Sub-District", required: true, icon: Layers },
  { id: "7", key: "block", label: "Block", required: true, icon: Box },
  { id: "8", key: "city", label: "City / Town", required: true, icon: Home },
  { id: "9", key: "area", label: "Area", required: true, icon: MapPin },
  { id: "10", key: "location_type", label: "Loc. Type", required: true, icon: FileText },

  // Postal & Coverage Details
  { id: "11", key: "covered_localities", label: "Covered Localities", icon: MapPin },
  { id: "12", key: "covered_villages", label: "Covered Villages", icon: Map },
  { id: "13", key: "covered_towns", label: "Covered Towns", icon: Home },
  { id: "14", key: "nearby_pin_codes", label: "Nearby PINs", icon: Hash },
  { id: "15", key: "area_circle", label: "Area Circle", icon: Layers },
  { id: "16", key: "postal_circle", label: "Postal Circle", icon: MapPin },
  { id: "17", key: "postal_region", label: "Region", icon: Map },
  { id: "18", key: "postal_division", label: "Division", icon: Box },
  { id: "19", key: "head_post_office", label: "Head PO (HPO)", icon: Home },
  { id: "20", key: "primary_delivery_post_office", label: "Primary PO", icon: Truck },
  { id: "21", key: "post_office_name", label: "PO Name", icon: Home },
  { id: "22", key: "post_office_type", label: "PO Type", icon: FileText },
  { id: "23", key: "post_office_delivery_status", label: "PO Status", icon: Activity },
  { id: "24", key: "post_office_associated_location", label: "Assoc. Location", icon: MapPin },
  { id: "25", key: "total_associated_post_offices", label: "Total POs", icon: Hash },

  // Administration & Jurisdiction
  { id: "26", key: "relevant_police_jurisdiction", label: "Police Jurisdiction", icon: Shield },
  { id: "27", key: "assembly_constituency", label: "Assembly Const.", icon: Users },
  { id: "28", key: "parliamentary_constituency", label: "Parliament Const.", icon: Flag },
  { id: "29", key: "no_of_police_stations", label: "Police Stations", icon: Hash },
  { id: "30", key: "no_of_tehsil_offices", label: "Tehsil Offices", icon: Hash },
  { id: "31", key: "no_of_ri_offices", label: "RI Offices", icon: Hash },

  // Infrastructure & Facilities
  { id: "32", key: "no_of_banks", label: "Banks", icon: TrendingUp },
  { id: "33", key: "atms", label: "ATMs", icon: Activity },
  { id: "34", key: "hospitals", label: "Hospitals", icon: HeartPulse },
  { id: "35", key: "medicine_shops", label: "Medicine Shops", icon: Box },
  { id: "36", key: "petrol_pumps", label: "Petrol Pumps", icon: Activity },
  { id: "37", key: "lpg_outlets", label: "LPG Outlets", icon: Box },
  { id: "38", key: "schools", label: "Schools", icon: Book },
  { id: "39", key: "colleges", label: "Colleges", icon: Book },
  { id: "40", key: "restaurants", label: "Restaurants", icon: Coffee },
  { id: "41", key: "lodge", label: "Lodge", icon: Moon },
  { id: "42", key: "hotels", label: "Hotels", icon: Sun },
  { id: "43", key: "temples", label: "Temples", icon: Home },
  { id: "44", key: "mosques", label: "Mosques", icon: Home },
  { id: "45", key: "churches", label: "Churches", icon: Home },
  { id: "46", key: "no_of_area", label: "Total Area", icon: MapPin },
  { id: "47", key: "last_updated", label: "Last Updated", icon: Clock },
];

const FormField = ({ id, label, value, required, icon: Icon }) => {
  return (
    <div className="flex items-center bg-white/60 backdrop-blur-md border border-white/50 rounded-[10px] p-2 sm:p-2.5 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 hover:border-pink-400 w-full group overflow-hidden">
      <div className="bg-[#e11d48] rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 shadow-sm mr-3 group-hover:scale-105 transition-transform duration-300">
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

const PincodeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Base Shadow */}
    <ellipse cx="12" cy="21" rx="6" ry="2" />
    {/* Pin Body with Hole */}
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 20.5 12 20.5C12 20.5 19 14.25 19 9C19 5.134 15.866 2 12 2ZM12 11.5C10.619 11.5 9.5 10.381 9.5 9C9.5 7.619 10.619 6.5 12 6.5C13.381 6.5 14.5 7.619 14.5 9C14.5 10.381 13.381 11.5 12 11.5Z" />
  </svg>
);

export default function PincodeFrontend() {
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
            <div className="text-[#e11d48] shrink-0">
              <PincodeIcon className="w-10 h-10 sm:w-14 sm:h-14" />
            </div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-[18px] sm:text-2xl md:text-[26px] font-extrabold text-[#1e3a8a] tracking-wide uppercase leading-tight">
                PIN CODE RECORD REPORT
              </h1>
              <p className="text-slate-500 text-[11px] sm:text-[14px] font-medium mt-0.5">
                PIN Code / Location Intelligence Record
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
                  <div className="p-1.5 sm:p-2 rounded-lg bg-pink-50 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 h-5 text-[#e11d48]" />
                  </div>
                  <div className="flex flex-col items-start min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">REPORT ID</p>
                    <p className="text-[11px] sm:text-[13px] md:text-[14px] font-extrabold text-[#1e3a8a] truncate w-full">PIN-2025-000123</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-10 bg-slate-200 shrink-0"></div>

                {/* Generated On */}
                <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none min-w-0 justify-end sm:justify-start">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-pink-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 h-5 text-[#e11d48]" />
                  </div>
                  <div className="flex flex-col items-end sm:items-start min-w-0 text-right sm:text-left">
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">GENERATED ON</p>
                    <p className="text-[10px] sm:text-[13px] md:text-[14px] font-extrabold text-[#1e3a8a] truncate w-full">{formattedDate} | {formattedTime}</p>
                  </div>
                </div>

              </div>

              {/* Right: Buttons */}
              <div className="flex flex-row items-center justify-center sm:justify-end gap-1.5 sm:gap-3 w-full lg:w-auto pt-2 sm:pt-0 border-t border-slate-100 sm:border-0 mt-1 sm:mt-0">
                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-white/70 backdrop-blur-sm text-[#e11d48] rounded-lg border border-[#e11d48] hover:bg-pink-50 transition-all text-[11px] sm:text-[13px] font-bold flex-1 sm:flex-none whitespace-nowrap">
                  <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> <span>Share</span>
                </button>
                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-white/70 backdrop-blur-sm text-[#e11d48] rounded-lg border border-[#e11d48] hover:bg-pink-50 transition-all text-[11px] sm:text-[13px] font-bold flex-1 sm:flex-none whitespace-nowrap">
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> <span>Download</span>
                </button>
                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-[#e11d48] text-white rounded-lg border border-[#e11d48] hover:bg-[#be185d] shadow-sm transition-all text-[11px] sm:text-[13px] font-bold flex-1 sm:flex-none whitespace-nowrap">
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
                key="pincode-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 px-1"
              >
                {isLoading ? (
                  [...Array(allFields.length)].map((_, idx) => <SkeletonField key={idx} />)
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
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 bg-transparent border-t border-pink-200/50 flex items-center justify-end mt-auto shrink-0 gap-3">
            <button
              className="flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-[10px] text-[14px] font-bold bg-[#e11d48] text-white hover:bg-[#be185d] transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#e11d48]/50 w-full sm:w-auto sm:min-w-[160px] cursor-pointer"
            >
              Submit <Save className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
