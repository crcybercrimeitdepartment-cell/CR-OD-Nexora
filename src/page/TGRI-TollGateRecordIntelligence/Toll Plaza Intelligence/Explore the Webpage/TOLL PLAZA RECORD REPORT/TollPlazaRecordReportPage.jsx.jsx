import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, RotateCcw, Save, Share2, Download, ArrowRight, ArrowLeft,
    MapPin, Map, Hash, FileText, Settings, Navigation, Route, Calendar,
    ShieldAlert, BadgeCent, Banknote, History, Zap, Lightbulb, Users,
    User, Phone, Mail, Car, Truck, Ambulance, Siren, Stethoscope, Droplets,
    Utensils, Construction, CheckSquare, FileSignature, MonitorCheck,
    Landmark, ShieldCheck, MapPinned, CreditCard, Ticket, BatteryCharging,
    Video, Headset, HardHat, Briefcase, Ruler, Pin, CheckCircle2,
    Signpost, Fuel, FileCheck, Bell, Timer, UserCheck, Tag, Scale, Radio,
    Megaphone, Bus, Bath, SquareParking, PhoneCall, Flame, HeartPulse, Hospital,
    AlertTriangle, Target, Link, CalendarCheck, CalendarClock, RefreshCcw
} from 'lucide-react';

const allFields = [
    // General Information & Location
    { id: "1", key: "state", label: "State", required: true, icon: Map },
    { id: "2", key: "toll_plaza_name", label: "Plaza Name", required: true, icon: Landmark },
    { id: "3", key: "toll_plaza_reference_id", label: "Plaza Ref ID", required: true, icon: Hash },
    { id: "4", key: "toll_gate_type", label: "Gate Type", required: true, icon: Settings },
    { id: "5", key: "toll_plaza_code", label: "Plaza Code", required: true, icon: Hash },
    { id: "6", key: "toll_gate_id", label: "Gate ID", required: true, icon: Hash },
    { id: "7", key: "contractor", label: "Contractor", required: true, icon: HardHat },
    { id: "8", key: "project_name", label: "Project Name", required: true, icon: FileText },
    { id: "9", key: "highway_type", label: "Highway Type", required: true, icon: Route },
    { id: "10", key: "highway_number", label: "Highway Number", required: true, icon: Signpost },
    { id: "11", key: "highway_section", label: "Highway Section", required: true, icon: Route },
    { id: "12", key: "chainage_km", label: "Chainage / KM", required: true, icon: Ruler },
    { id: "13", key: "tollable_length", label: "Tollable Length", required: true, icon: Ruler },
    { id: "14", key: "road_direction", label: "Road Direction", required: true, icon: Navigation },
    { id: "15", key: "nearest_junction", label: "Nearest Junction", required: true, icon: MapPin },

    // Operations & Contact Info
    { id: "16", key: "toll_plaza_address", label: "Plaza Address", required: true, icon: MapPinned },
    { id: "17", key: "toll_collection_payment", label: "Toll Payment", required: true, icon: Banknote },
    { id: "18", key: "vehicle_wise_toll_rates", label: "Vehicle Toll Rates", required: true, icon: Car },
    { id: "19", key: "journey_concession_rates", label: "Concession Rates", required: true, icon: Ticket },
    { id: "20", key: "toll_fee_dates_rules", label: "Fee Dates & Rules", required: true, icon: Calendar },
    { id: "21", key: "lane_traffic_capacity", label: "Traffic Capacity", required: true, icon: Car },
    { id: "22", key: "toll_rules_documents", label: "Rules & Documents", required: true, icon: FileText },
    { id: "23", key: "nearest_police_station", label: "Nearest Police", required: true, icon: ShieldAlert },
    { id: "24", key: "nearest_police_station_distance", label: "Police Distance", required: true, icon: Route },
    { id: "25", key: "surveillance_security", label: "Surveillance", required: true, icon: Video },
    { id: "26", key: "toll_plaza_helpline_number", label: "Helpline Number", required: true, icon: Headset },
    { id: "27", key: "toll_plaza_email_id", label: "Plaza Email", required: true, icon: Mail },
    { id: "28", key: "toll_plaza_in_charge_name", label: "In-charge Name", required: true, icon: User },
    { id: "29", key: "toll_plaza_in_charge_mobile_number", label: "In-charge Mobile", required: true, icon: Phone },
    { id: "30", key: "toll_plaza_in_charge_email_id", label: "In-charge Email", required: true, icon: Mail },

    // Key Personnel & Details
    { id: "31", key: "toll_plaza_operator_name", label: "Operator Name", required: true, icon: User },
    { id: "32", key: "toll_plaza_operator_mobile_number", label: "Operator Mobile", required: true, icon: Phone },
    { id: "33", key: "toll_plaza_operator_email_id", label: "Operator Email", required: true, icon: Mail },
    { id: "34", key: "toll_plaza_owner_name", label: "Owner Name", required: true, icon: User },
    { id: "35", key: "toll_plaza_owner_mobile_number", label: "Owner Mobile", required: true, icon: Phone },
    { id: "36", key: "toll_plaza_owner_email_id", label: "Owner Email", required: true, icon: Mail },
    { id: "37", key: "toll_plaza_manager_name", label: "Manager Name", required: true, icon: User },
    { id: "38", key: "toll_plaza_manager_designation", label: "Manager Desig.", required: true, icon: Briefcase },
    { id: "39", key: "toll_plaza_manager_official_mobile_number", label: "Manager Mobile", required: true, icon: Phone },
    { id: "40", key: "toll_plaza_manager_official_email_id", label: "Manager Email", required: true, icon: Mail },
    { id: "41", key: "nearest_petrol_pump", label: "Nearest Pump", icon: Fuel },
    { id: "42", key: "toll_plaza_establishment_commissioning_reference", label: "Commissioning Ref", icon: FileCheck },
    { id: "43", key: "location_village", label: "Location/Village", required: true, icon: MapPin },
    { id: "44", key: "stretch_starting_chainage", label: "Start Chainage", required: true, icon: Ruler },
    { id: "45", key: "stretch_ending_chainage", label: "End Chainage", required: true, icon: Ruler },

    // Toll Rates & Concessions
    { id: "46", key: "latitude", label: "Latitude", required: true, icon: Pin },
    { id: "47", key: "longitude", label: "Longitude", required: true, icon: Pin },
    { id: "48", key: "nearest_city_town", label: "Nearest City", required: true, icon: Building2 },
    { id: "49", key: "fee_notification_number", label: "Fee Notification", required: true, icon: Bell },
    { id: "50", key: "toll_rate_revision_due_date", label: "Rate Rev. Due", required: true, icon: Calendar },
    { id: "51", key: "latest_rate_revision_date", label: "Latest Rate Rev.", required: true, icon: Calendar },
    { id: "52", key: "concession_period", label: "Concession Period", required: true, icon: Timer },
    { id: "53", key: "toll_collection_agency", label: "Collection Agency", required: true, icon: Users },
    { id: "54", key: "local_non_commercial_vehicle_pass", label: "Local Pass", required: true, icon: Ticket },
    { id: "55", key: "local_resident_eligibility", label: "Local Resident", required: true, icon: UserCheck },
    { id: "56", key: "daily_pass", label: "Daily Pass", required: true, icon: Ticket },
    { id: "57", key: "frequent_user_concession", label: "Freq. User Conc.", required: true, icon: Ticket },
    { id: "58", key: "other_concessions_discounts", label: "Other Discounts", icon: Tag },
    { id: "59", key: "hybrid_manual_lanes", label: "Hybrid/Manual Lanes", required: true, icon: Settings },
    { id: "60", key: "toll_booths", label: "Toll Booths", required: true, icon: Building2 },

    // Infrastructure & Amenities
    { id: "61", key: "weigh_in_motion_system", label: "Weigh-in-Motion", required: true, icon: Scale },
    { id: "62", key: "emergency_communication_system", label: "Emergency Comm.", required: true, icon: Radio },
    { id: "63", key: "public_announcement_system", label: "Public Announce", required: true, icon: Megaphone },
    { id: "64", key: "electricity_power_supply", label: "Electricity Supply", required: true, icon: Zap },
    { id: "65", key: "generator_power_backup", label: "Generator Backup", required: true, icon: BatteryCharging },
    { id: "66", key: "lighting_system", label: "Lighting System", required: true, icon: Lightbulb },
    { id: "67", key: "other_infrastructure", label: "Other Infra.", icon: Construction },
    { id: "68", key: "bus_lay_by", label: "Bus Lay-by", icon: Bus },
    { id: "69", key: "restaurant_food_facility", label: "Food Facility", icon: Utensils },
    { id: "70", key: "drinking_water", label: "Drinking Water", icon: Droplets },
    { id: "71", key: "toilet_facility", label: "Toilet Facility", icon: Bath },
    { id: "72", key: "parking_facility", label: "Parking", icon: SquareParking },
    { id: "73", key: "medical_facility", label: "Medical Facility", icon: Stethoscope },
    { id: "74", key: "atm_banking_facility", label: "ATM/Banking", icon: CreditCard },
    { id: "75", key: "other_amenities", label: "Other Amenities", icon: CheckSquare },

    // Emergency & Safety Contacts
    { id: "76", key: "nhai_highway_helpline", label: "NHAI Helpline", required: true, icon: PhoneCall },
    { id: "77", key: "emergency_number", label: "Emergency Number", required: true, icon: PhoneCall },
    { id: "78", key: "ambulance_number", label: "Ambulance", required: true, icon: Ambulance },
    { id: "79", key: "crane_recovery_number", label: "Crane Recovery", required: true, icon: Truck },
    { id: "80", key: "route_patrol_number", label: "Route Patrol", required: true, icon: Siren },
    { id: "81", key: "highway_patrol_number", label: "Highway Patrol", required: true, icon: ShieldAlert },
    { id: "82", key: "fire_rescue_contact", label: "Fire & Rescue", required: true, icon: Flame },
    { id: "83", key: "medical_emergency_contact", label: "Medical Emergency", required: true, icon: HeartPulse },
    { id: "84", key: "police_station_contact", label: "Police Station", required: true, icon: ShieldAlert },
    { id: "85", key: "hospital_contact", label: "Hospital Contact", required: true, icon: Hospital },
    { id: "86", key: "other_emergency_facility", label: "Other Emergency", icon: AlertTriangle },
    { id: "87", key: "project_director_contact", label: "Proj. Director", required: true, icon: User },
    { id: "88", key: "representative_of_consultant", label: "Consultant Rep.", required: true, icon: User },
    { id: "89", key: "consultant_contact", label: "Consultant Contact", required: true, icon: Phone },
    { id: "90", key: "representative_of_concessionaire", label: "Concessionaire Rep.", required: true, icon: User },

    // Verification & Data Admin
    { id: "91", key: "concessionaire_contact", label: "Concessionaire Contact", required: true, icon: Phone },
    { id: "92", key: "traffic_data_as_on_date", label: "Traffic Data As-On", required: true, icon: Calendar },
    { id: "93", key: "target_date", label: "Target Date", required: true, icon: Target },
    { id: "94", key: "project_length", label: "Project Length", required: true, icon: Ruler },
    { id: "95", key: "record_id", label: "Record ID", required: true, icon: Hash },
    { id: "96", key: "source_authority", label: "Source Authority", required: true, icon: Landmark },
    { id: "97", key: "source_url_reference", label: "Source URL", required: true, icon: Link },
    { id: "98", key: "data_collection_date", label: "Collection Date", required: true, icon: Calendar },
    { id: "99", key: "last_verified_date", label: "Last Verified", required: true, icon: CalendarCheck },
    { id: "100", key: "next_verification_date", label: "Next Verification", required: true, icon: CalendarClock },
    { id: "101", key: "verified_by", label: "Verified By", required: true, icon: UserCheck },
    { id: "102", key: "verification_status", label: "Verification Status", required: true, icon: CheckCircle2 },
    { id: "103", key: "data_version", label: "Data Version", required: true, icon: Hash },
    { id: "104", key: "last_data_update", label: "Last Data Update", required: true, icon: RefreshCcw }
];

const TollIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Horizontal Toll Gate Bar */}
    <rect x="1.5" y="10" width="21" height="2.5" />
    {/* Bottom Left Road */}
    <polygon points="2,22 10.5,22 10.5,13.5 5.5,13.5" />
    {/* Bottom Right Road */}
    <polygon points="22,22 13.5,22 13.5,13.5 18.5,13.5" />
    {/* Top Left Road */}
    <polygon points="6.8,8.5 10.5,8.5 10.5,2 9.3,2" />
    {/* Top Right Road */}
    <polygon points="17.2,8.5 13.5,8.5 13.5,2 14.7,2" />
  </svg>
);

const FormField = ({ id, label, value, required, icon: Icon }) => {
    return (
        <div className="flex items-center bg-white/60 backdrop-blur-md border border-white/50 rounded-[10px] p-2 sm:p-2.5 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:bg-white/80 transition-all duration-300 hover:border-orange-400 w-full group overflow-hidden">
            <div className="bg-[#ea580c] rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 shadow-sm mr-3 group-hover:scale-105 transition-transform duration-300">
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

export default function TollPlazaFrontend() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5s skeleton loading simulation
        return () => clearTimeout(timer);
    }, []);

    const displayFields = allFields;
    const ITEMS_PER_PAGE = 30;
    const totalPages = Math.max(1, Math.ceil(displayFields.length / ITEMS_PER_PAGE));
    const currentFields = displayFields.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

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
                        <div className="text-[#ea580c] shrink-0">
                            <TollIcon className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-[18px] sm:text-2xl md:text-[26px] font-extrabold text-[#1e3a8a] tracking-wide uppercase leading-tight">
                                TOLL PLAZA RECORD REPORT
                            </h1>
                            <p className="text-slate-500 text-[11px] sm:text-[14px] font-medium mt-0.5">
                                Toll Plaza & Highway Data Record
                            </p>
                        </div>
                    </div>

                    {/* Middle: Action Bar */}
                    <div className="mt-3 sm:mt-5 px-3 sm:px-6 md:px-8 w-full">
                        <div className="flex flex-col lg:flex-row items-center justify-between bg-white/60 backdrop-blur-md border border-slate-200/80 shadow-[0_2px_15px_rgb(0,0,0,0.03)] rounded-xl p-3 sm:px-4 sm:py-3 gap-3 sm:gap-4 lg:gap-0">
                            
                            {/* Left: Report ID & Date */}
                            <div className="flex flex-row items-center justify-between sm:justify-start gap-2 sm:gap-6 w-full lg:w-auto">
                                
                                {/* Report ID */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none min-w-0">
                                    <div className="p-1.5 sm:p-2 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 sm:w-5 h-5 text-[#ea580c]" />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">REPORT ID</p>
                                        <p className="text-[11px] sm:text-[13px] md:text-[14px] font-extrabold text-[#1e3a8a] truncate w-full">TOLL-2025-000123</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden sm:block w-px h-10 bg-slate-200 shrink-0"></div>

                                {/* Generated On */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none min-w-0 justify-end sm:justify-start">
                                    <div className="p-1.5 sm:p-2 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4 sm:w-5 h-5 text-[#ea580c]" />
                                    </div>
                                    <div className="flex flex-col items-end sm:items-start min-w-0 text-right sm:text-left">
                                        <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">GENERATED ON</p>
                                        <p className="text-[10px] sm:text-[13px] md:text-[14px] font-extrabold text-[#1e3a8a] truncate w-full">{formattedDate} | {formattedTime}</p>
                                    </div>
                                </div>

                            </div>

                            {/* Right: Buttons */}
                            <div className="flex flex-row items-center justify-center sm:justify-end gap-1.5 sm:gap-3 w-full lg:w-auto pt-2 sm:pt-0 border-t border-slate-100 sm:border-0 mt-1 sm:mt-0">
                                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-white/70 backdrop-blur-sm text-[#ea580c] rounded-lg border border-[#ea580c] hover:bg-orange-50 transition-all text-[11px] sm:text-[13px] font-bold flex-1 sm:flex-none whitespace-nowrap">
                                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> <span>Share</span>
                                </button>
                                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-white/70 backdrop-blur-sm text-[#ea580c] rounded-lg border border-[#ea580c] hover:bg-orange-50 transition-all text-[11px] sm:text-[13px] font-bold flex-1 sm:flex-none whitespace-nowrap">
                                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> <span>Download</span>
                                </button>
                                <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-[#ea580c] text-white rounded-lg border border-[#ea580c] hover:bg-[#d95308] shadow-sm transition-all text-[11px] sm:text-[13px] font-bold flex-1 sm:flex-none whitespace-nowrap">
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
                                key={currentPage}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 px-1"
                            >
                                {isLoading ? (
                                    [...Array(ITEMS_PER_PAGE)].map((_, idx) => <SkeletonField key={idx} />)
                                ) : (
                                    currentFields.map((field) => (
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

                    {/* Pagination Footer */}
                    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 bg-transparent border-t border-orange-100/50 flex items-center justify-between mt-auto shrink-0 gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-[10px] text-[12px] sm:text-[14px] font-bold transition-all flex-1 sm:flex-none ${currentPage === 0
                            ? 'bg-slate-100/50 backdrop-blur-sm text-slate-400 cursor-not-allowed'
                            : 'bg-white/70 backdrop-blur-sm text-[#ea580c] border-[1.5px] border-[#ea580c] hover:bg-[#ea580c] hover:text-white shadow-sm cursor-pointer'
                            }`}
                    >
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Prev
                    </button>

                    <div className="text-[11px] sm:text-[13px] font-bold text-slate-500 whitespace-nowrap hidden sm:block">
                        Page {currentPage + 1} of {totalPages}
                    </div>
                    <div className="text-[11px] sm:text-[13px] font-bold text-slate-500 whitespace-nowrap sm:hidden">
                        {currentPage + 1} / {totalPages}
                    </div>

                    {currentPage === totalPages - 1 ? (
                        <button
                            className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-[10px] text-[12px] sm:text-[14px] font-bold bg-[#ea580c] text-white hover:bg-[#c2410c] transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#ea580c]/50 flex-1 sm:flex-none cursor-pointer"
                        >
                            Submit <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-[10px] text-[12px] sm:text-[14px] font-bold bg-[#ea580c] text-white hover:bg-[#c2410c] transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#ea580c]/50 flex-1 sm:flex-none cursor-pointer"
                        >
                            Next <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);
}
