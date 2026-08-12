import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Calendar, Building2, Briefcase, Phone, Contact, Home, Mail, MapPin, 
  CheckCircle2, ShieldCheck, Camera, Edit, Activity, Save, X, Building
} from 'lucide-react';

export default function ProfilePage({ onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullName: "Subrajit Jena",
    designation: "MERN Stack Developer",
    department: "Development",
    employeeId: "EMP12345",
    accountType: "Employee",
    accountStatus: "Active",
    activationDate: "01 May 2024",
    gender: "Male",
    dob: "15 March 2001",
    mobile: "+91 98765 43210",
    permanentAddress: "At/Po: Chandaka, Bhubaneswar\nKhordha, Odisha - 752054",
    email: "subrajit.jena@example.com",
    officeAddress: "CR Intelligence Pvt. Ltd.,\nBhubaneswar, Odisha - 751024"
  });

  const [editFormData, setEditFormData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setProfileData(editFormData);
      setIsEditing(false);
    } else {
      setEditFormData(profileData);
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Stagger variants for the bento grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full pb-10 px-4 sm:px-6 lg:px-8 relative min-h-screen flex flex-col">
      {onBack && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}
      
      <div className="max-w-5xl mx-auto w-full z-10">
        {/* Main Glass Panel */}
        <div className="bg-white/40 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[24px] sm:rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/60 dark:border-slate-700/50 p-3 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-8">
          
          {/* TOP HEADER SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-slate-800/60 dark:to-slate-800/40 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between relative overflow-hidden border border-white/80 dark:border-slate-700/60 shadow-inner"
          >
            {/* Abstract Layered Waves Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[28px]">
              <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 left-0 w-full h-full opacity-30 dark:opacity-20">
                <path fill="#93c5fd" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,149.3C672,149,768,171,864,192C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                <path fill="#60a5fa" fillOpacity="0.8" d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,165.3C672,160,768,160,864,154.7C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                <path fill="#3b82f6" fillOpacity="0.4" d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,181.3C672,203,768,213,864,202.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 z-10 w-full">
              {/* Avatar with Glow and Pulse */}
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-[3px] sm:border-[4px] border-white/90 dark:border-slate-800 shadow-xl overflow-hidden bg-slate-200 shrink-0 relative z-10 transform group-hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-lg hover:scale-110 transition-transform z-20 group-hover:rotate-12">
                  <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex flex-col items-center sm:items-start pt-3">
                {isEditing ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3 w-full sm:w-80">
                    <input 
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleInputChange}
                      className="text-xl sm:text-3xl font-extrabold text-slate-800 dark:text-white bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-xl py-1.5 sm:py-2 px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <input 
                      name="designation"
                      value={editFormData.designation}
                      onChange={handleInputChange}
                      className="text-blue-600 dark:text-blue-400 font-bold bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-xl py-1 sm:py-1.5 px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-[14px] sm:text-base"
                    />
                  </motion.div>
                ) : (
                  <div className="text-center sm:text-left">
                    <h2 className="text-[26px] sm:text-[38px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight leading-tight">
                      {profileData.fullName}
                    </h2>
                    <p className="text-blue-600 dark:text-blue-400 font-bold text-[14px] sm:text-[16px] mt-1 sm:mt-1.5 flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start">
                      <Briefcase className="w-4 h-4" />
                      {profileData.designation}
                    </p>
                  </div>
                )}

                {/* Department Pill */}
                <div className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white dark:border-slate-700/50 rounded-full sm:rounded-2xl shadow-sm text-blue-700 dark:text-blue-300 text-[12px] sm:text-sm font-bold hover:shadow-md transition-shadow">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  {isEditing ? (
                    <input 
                      name="department"
                      value={editFormData.department}
                      onChange={handleInputChange}
                      className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 w-44 font-bold text-blue-700 dark:text-blue-300"
                    />
                  ) : (
                    <span>{profileData.department} Department</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-0 z-10 shrink-0 flex flex-col gap-3 w-full sm:w-auto pt-2">
              <button 
                onClick={handleEditToggle}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-[14px] rounded-xl font-bold tracking-wide transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl ${
                  isEditing 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 hover:shadow-blue-500/40'
                }`}
              >
                {isEditing ? (
                  <><Save className="w-4 h-4" /> Save Changes</>
                ) : (
                  <><Edit className="w-4 h-4" /> Update Profile</>
                )}
              </button>
              {isEditing && (
                <button 
                  onClick={handleCancelEdit}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-[14px] rounded-xl font-bold text-slate-600 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-600 shadow-sm hover:bg-white dark:hover:bg-slate-700 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              )}
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* BENTO GRID                                 */}
          {/* ========================================== */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-5"
          >
            
            {/* Row 1 */}
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-1 sm:col-span-1 lg:col-span-3"
              bg="bg-blue-50/40 dark:bg-blue-900/10"
              borderHover="hover:border-blue-300 dark:hover:border-blue-700/50"
              iconBg="bg-blue-100 dark:bg-blue-900/50"
              iconColor="text-blue-600"
              icon={<Calendar className="w-5 h-5" />}
              label="Date of Birth (DOB)"
              name="dob"
              value={isEditing ? editFormData.dob : profileData.dob}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="date"
            />
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-1 sm:col-span-1 lg:col-span-3"
              bg="bg-rose-50/40 dark:bg-rose-900/10"
              borderHover="hover:border-rose-300 dark:hover:border-rose-700/50"
              iconBg="bg-rose-100 dark:bg-rose-900/50"
              iconColor="text-rose-600"
              icon={<Activity className="w-5 h-5" />}
              label="Gender"
              name="gender"
              value={isEditing ? editFormData.gender : profileData.gender}
              isEditing={isEditing}
              onChange={handleInputChange}
            />

            {/* Row 2 */}
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-2 sm:col-span-1 lg:col-span-3"
              bg="bg-purple-50/40 dark:bg-purple-900/10"
              borderHover="hover:border-purple-300 dark:hover:border-purple-700/50"
              iconBg="bg-purple-100 dark:bg-purple-900/50"
              iconColor="text-purple-600"
              icon={<Briefcase className="w-5 h-5" />}
              label="Designation"
              name="designation"
              value={isEditing ? editFormData.designation : profileData.designation}
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-2 sm:col-span-1 lg:col-span-3"
              bg="bg-cyan-50/40 dark:bg-cyan-900/10"
              borderHover="hover:border-cyan-300 dark:hover:border-cyan-700/50"
              iconBg="bg-cyan-100 dark:bg-cyan-900/50"
              iconColor="text-cyan-600"
              icon={<Building2 className="w-5 h-5" />}
              label="Department"
              name="department"
              value={isEditing ? editFormData.department : profileData.department}
              isEditing={isEditing}
              onChange={handleInputChange}
            />

            {/* Row 3 */}
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-1 sm:col-span-1 lg:col-span-2"
              bg="bg-emerald-50/40 dark:bg-emerald-900/10"
              borderHover="hover:border-emerald-300 dark:hover:border-emerald-700/50"
              iconBg="bg-emerald-100 dark:bg-emerald-900/50"
              iconColor="text-emerald-600"
              icon={<Contact className="w-5 h-5" />}
              label="Employee ID"
              name="employeeId"
              value={isEditing ? editFormData.employeeId : profileData.employeeId}
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-1 sm:col-span-1 lg:col-span-2"
              bg="bg-orange-50/40 dark:bg-orange-900/10"
              borderHover="hover:border-orange-300 dark:hover:border-orange-700/50"
              iconBg="bg-orange-100 dark:bg-orange-900/50"
              iconColor="text-orange-600"
              icon={<Phone className="w-5 h-5" />}
              label="Registered Mobile Number"
              name="mobile"
              value={isEditing ? editFormData.mobile : profileData.mobile}
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-2 sm:col-span-2 lg:col-span-2"
              bg="bg-indigo-50/40 dark:bg-indigo-900/10"
              borderHover="hover:border-indigo-300 dark:hover:border-indigo-700/50"
              iconBg="bg-indigo-100 dark:bg-indigo-900/50"
              iconColor="text-indigo-600"
              icon={<Mail className="w-5 h-5" />}
              label="Registered Email ID"
              name="email"
              value={isEditing ? editFormData.email : profileData.email}
              isEditing={isEditing}
              onChange={handleInputChange}
              type="email"
            />

            {/* Row 4 */}
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-2 sm:col-span-1 lg:col-span-3"
              bg="bg-blue-50/40 dark:bg-blue-900/10"
              borderHover="hover:border-blue-300 dark:hover:border-blue-700/50"
              iconBg="bg-blue-100 dark:bg-blue-900/50"
              iconColor="text-blue-600"
              icon={<Building className="w-5 h-5" />}
              label="Office Address"
              name="officeAddress"
              value={isEditing ? editFormData.officeAddress : profileData.officeAddress}
              isEditing={isEditing}
              onChange={handleInputChange}
              isTextarea={true}
            />
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-2 sm:col-span-1 lg:col-span-3"
              bg="bg-amber-50/40 dark:bg-amber-900/10"
              borderHover="hover:border-amber-300 dark:hover:border-amber-700/50"
              iconBg="bg-amber-100 dark:bg-amber-900/50"
              iconColor="text-amber-600"
              icon={<Home className="w-5 h-5" />}
              label="Permanent Address"
              name="permanentAddress"
              value={isEditing ? editFormData.permanentAddress : profileData.permanentAddress}
              isEditing={isEditing}
              onChange={handleInputChange}
              isTextarea={true}
            />

            {/* Row 5 */}
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-2 sm:col-span-1 lg:col-span-2"
              bg="bg-teal-50/40 dark:bg-teal-900/10"
              borderHover="hover:border-teal-300 dark:hover:border-teal-700/50"
              iconBg="bg-teal-100 dark:bg-teal-900/50"
              iconColor="text-teal-600"
              icon={<Calendar className="w-5 h-5" />}
              label="Account Activation Date"
              name="activationDate"
              value={profileData.activationDate}
              isEditing={false}
              onChange={handleInputChange}
            />
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-1 sm:col-span-1 lg:col-span-2"
              bg="bg-violet-50/40 dark:bg-violet-900/10"
              borderHover="hover:border-violet-300 dark:hover:border-violet-700/50"
              iconBg="bg-violet-100 dark:bg-violet-900/50"
              iconColor="text-violet-600"
              icon={<User className="w-5 h-5" />}
              label="Account Type"
              name="accountType"
              value={profileData.accountType}
              isEditing={false}
              onChange={handleInputChange}
            />
            <BentoCard 
              variants={itemVariants}
              colSpan="col-span-1 sm:col-span-2 lg:col-span-2"
              bg="bg-green-50/40 dark:bg-green-900/10"
              borderHover="hover:border-green-300 dark:hover:border-green-700/50"
              iconBg="bg-green-100 dark:bg-green-900/50"
              iconColor="text-green-600"
              icon={<ShieldCheck className="w-5 h-5" />}
              label="Account Status"
              name="accountStatus"
              value={profileData.accountStatus}
              isEditing={false}
              onChange={handleInputChange}
              isStatus={true}
            />

          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Highly attractive Bento Card component with micro-animations
function BentoCard({ variants, colSpan, bg, borderHover, iconBg, iconColor, icon, label, name, value, isEditing, onChange, type = "text", isTextarea, isStatus }) {
  return (
    <motion.div 
      variants={variants}
      className={`group ${colSpan} ${bg} backdrop-blur-xl rounded-[16px] sm:rounded-[20px] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-3.5 border border-white/60 dark:border-slate-700/40 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 ${borderHover} relative overflow-hidden`}
    >
      {/* Decorative Shine Effect on Hover */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

      <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-[10px] sm:rounded-[12px] flex items-center justify-center shrink-0 ${iconBg} ${iconColor} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
        {icon}
      </div>
      
      <div className="flex flex-col flex-1 min-w-0 w-full justify-center">
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 sm:mb-1 uppercase tracking-wider">{label}</span>
        
        {isEditing ? (
          isTextarea ? (
            <textarea 
              name={name}
              value={value}
              onChange={onChange}
              rows={2}
              className="w-full text-[12px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-inner"
            />
          ) : (
            <input 
              name={name}
              value={value}
              onChange={onChange}
              type={type}
              className="w-full text-[12px] sm:text-[14px] font-bold text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl p-2 sm:p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
            />
          )
        ) : (
          isStatus ? (
            <div className="mt-1 flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 shadow-sm border border-green-200 dark:border-green-800/50">
                <CheckCircle2 className="w-4 h-4" /> {value}
              </span>
            </div>
          ) : (
            <span className="text-[12px] sm:text-[14px] font-bold text-slate-800 dark:text-white whitespace-pre-line leading-relaxed truncate overflow-hidden text-ellipsis w-full block">
              {value}
            </span>
          )
        )}
      </div>
    </motion.div>
  );
}
