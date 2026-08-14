import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, Mail, Fingerprint, ScanFace, Mic, KeyRound, 
  ShieldCheck, AlertCircle, ToggleRight, ToggleLeft, 
  Settings, ChevronRight, ChevronDown, Activity, CheckCircle2, XCircle, 
  Shield, Server, Eye
} from 'lucide-react';

export default function TwoFactorAuthenticationPage({ onBack }) {
  const [authMethods, setAuthMethods] = useState({
    mobile: { id: 'mobile', name: 'Mobile Number', registered: 'Registered', status: 'ON', date: '10 Aug 2026', c: 'emerald', icon: Smartphone, color: 'blue', type: 'OTP' },
    email: { id: 'email', name: 'Email Address', registered: 'Registered', status: 'OFF', date: '10 Aug 2026', c: 'emerald', icon: Mail, color: 'emerald', type: 'OTP' },
    fingerprint: { id: 'fingerprint', name: 'Fingerprint', registered: 'Registered', status: 'ON', date: '10 Aug 2026', c: 'emerald', icon: Fingerprint, color: 'purple', type: 'Biometric' },
    face: { id: 'face', name: 'Face Recognition', registered: 'Not Registered', status: 'OFF', date: '—', c: 'slate', icon: ScanFace, color: 'rose', type: 'Biometric' },
    voice: { id: 'voice', name: 'Voice Sample', registered: 'Pending', status: 'OFF', date: '—', c: 'amber', icon: Mic, color: 'amber', type: 'Biometric' },
    passkey: { id: 'passkey', name: 'Passkey', registered: 'Registered', status: 'ON', date: '10 Aug 2026', c: 'emerald', icon: KeyRound, color: 'teal', type: 'Passkey' }
  });

  const [otpMode, setOtpMode] = useState('Both');
  const [isOtpDropdownOpen, setIsOtpDropdownOpen] = useState(false);
  const [captchaEnabled, setCaptchaEnabled] = useState(true);

  const toggleStatus = (id) => {
    setAuthMethods(prev => {
      // Don't allow turning on if not registered
      if (prev[id].registered !== 'Registered') return prev;
      return {
        ...prev,
        [id]: { ...prev[id], status: prev[id].status === 'ON' ? 'OFF' : 'ON' }
      };
    });
  };

  const methodsArray = Object.values(authMethods);
  const totalRegistered = methodsArray.filter(m => m.registered === 'Registered').length;
  const totalPending = methodsArray.filter(m => m.registered === 'Pending').length;
  const totalActive = methodsArray.filter(m => m.status === 'ON').length;
  const disabledCount = methodsArray.filter(m => m.registered === 'Registered' && m.status === 'OFF').length;

  const securityScore = totalActive >= 4 ? 'Strong' : totalActive >= 2 ? 'Moderate' : 'Weak';
  const scoreColors = {
    Strong: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/50', iconBg: 'bg-emerald-100 dark:bg-emerald-900/50', textIcon: 'text-emerald-600 dark:text-emerald-400', textTitle: 'text-emerald-800 dark:text-emerald-300', textSub: 'text-emerald-600/80 dark:text-emerald-400/80' },
    Moderate: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800/50', iconBg: 'bg-blue-100 dark:bg-blue-900/50', textIcon: 'text-blue-600 dark:text-blue-400', textTitle: 'text-blue-800 dark:text-blue-300', textSub: 'text-blue-600/80 dark:text-blue-400/80' },
    Weak: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/50', iconBg: 'bg-amber-100 dark:bg-amber-900/50', textIcon: 'text-amber-600 dark:text-amber-400', textTitle: 'text-amber-800 dark:text-amber-300', textSub: 'text-amber-600/80 dark:text-amber-400/80' }
  };
  const currentScore = scoreColors[securityScore];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 pt-20 sm:pt-24 pb-12 px-3 sm:px-6 relative font-sans">
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

      <div className="max-w-[1600px] mx-auto w-full z-10 relative">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-[28px] border border-white/60 dark:border-slate-800/60 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight flex items-center gap-3">
              Two-Factor Authentication (2FA)
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
              Manage multi-layered security protocols to protect your NEXORA account
            </p>
          </div>
          <div className={`flex items-center gap-3 ${currentScore.bg} border ${currentScore.border} rounded-xl px-4 py-2 shadow-sm transition-colors duration-300`}>
            <div className={`w-8 h-8 rounded-full ${currentScore.iconBg} ${currentScore.textIcon} flex items-center justify-center shrink-0 transition-colors duration-300`}>
              {securityScore === 'Weak' ? <AlertCircle className="w-4.5 h-4.5" /> : <ShieldCheck className="w-4.5 h-4.5" />}
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-bold ${currentScore.textTitle} transition-colors duration-300`}>Security Score</span>
              <span className={`text-xs font-semibold ${currentScore.textSub} transition-colors duration-300`}>{securityScore}</span>
            </div>
          </div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 xl:grid-cols-2 gap-6 grid-flow-dense">
          
          {/* Card 1: Authentication Registration */}
          <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col">
            <h3 className="font-extrabold text-[calc(16px*var(--text-scale,1))] text-slate-800 dark:text-white mb-5 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/50 pb-4">
              Authentication Registration
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Method Cards */}
              {methodsArray.map((method, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-3 hover:shadow-md transition-shadow group cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${method.color}-100 dark:bg-${method.color}-900/30 text-${method.color}-600 dark:text-${method.color}-400`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">{method.name}</h4>
                    <span className="text-[calc(10px*var(--text-scale,1))] font-semibold text-slate-500 flex items-center gap-1 mt-1">
                      Configure Registration <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Registration & Authentication Status */}
          <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col">
            <h3 className="font-extrabold text-[calc(16px*var(--text-scale,1))] text-slate-800 dark:text-white mb-5 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/50 pb-4">
              Registration & Authentication Status
            </h3>

            <div className="overflow-x-auto custom-scrollbar mb-6">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 uppercase py-3">Method</th>
                    <th className="text-left text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 uppercase py-3">Registration</th>
                    <th className="text-left text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 uppercase py-3">Status</th>
                    <th className="text-left text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 uppercase py-3">Registered On</th>
                    <th className="text-right text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 uppercase py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {methodsArray.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 text-sm font-bold text-slate-800 dark:text-white">{row.name}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[calc(10px*var(--text-scale,1))] font-bold bg-${row.c}-100 text-${row.c}-700`}>
                          {row.reg === 'Registered' && <CheckCircle2 className="w-3 h-3" />}
                          {row.reg === 'Pending' && <AlertCircle className="w-3 h-3" />}
                          {row.reg}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`text-xs font-bold ${row.stat === 'ON' ? 'text-blue-600' : 'text-slate-400'}`}>{row.stat}</span>
                      </td>
                      <td className="py-3 text-xs font-semibold text-slate-500">{row.date}</td>
                      <td className="py-3 text-right">
                        <button className="text-[calc(11px*var(--text-scale,1))] font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-sm hover:border-blue-400 hover:text-blue-600 transition-colors">
                          {row.reg === 'Not Registered' ? 'Register' : row.reg === 'Pending' ? 'Complete' : 'View / Update'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-auto bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex flex-col">
                <span className="text-[calc(10px*var(--text-scale,1))] uppercase font-bold text-slate-500">Total Methods</span>
                <span className="text-lg font-black text-slate-800 dark:text-white">{methodsArray.length}</span>
              </div>
              <div className="flex flex-col border-l border-slate-200 dark:border-slate-700 pl-3">
                <span className="text-[calc(10px*var(--text-scale,1))] uppercase font-bold text-emerald-500">Registered</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{totalRegistered}</span>
              </div>
              <div className="flex flex-col border-l border-slate-200 dark:border-slate-700 pl-3">
                <span className="text-[calc(10px*var(--text-scale,1))] uppercase font-bold text-amber-500">Pending</span>
                <span className="text-lg font-black text-amber-600 dark:text-amber-400">{totalPending}</span>
              </div>
              <div className="flex flex-col border-l border-slate-200 dark:border-slate-700 pl-3">
                <span className="text-[calc(10px*var(--text-scale,1))] uppercase font-bold text-blue-500">Active</span>
                <span className="text-lg font-black text-blue-600 dark:text-blue-400">{totalActive}</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Authentication Settings */}
          <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col">
            <h3 className="font-extrabold text-[calc(16px*var(--text-scale,1))] text-slate-800 dark:text-white mb-5 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/50 pb-4">
              Authentication Settings
            </h3>
            
            <div className="space-y-6">
              {/* OTP */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2"><Smartphone className="w-4 h-4"/> OTP Authentication</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Mobile OTP</span>
                    <button onClick={() => toggleStatus('mobile')} className="outline-none">
                      {authMethods.mobile.status === 'ON' ? <ToggleRight className="w-7 h-7 text-emerald-500" /> : <ToggleLeft className="w-7 h-7 text-slate-400" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Email OTP</span>
                    <button onClick={() => toggleStatus('email')} className="outline-none">
                      {authMethods.email.status === 'ON' ? <ToggleRight className="w-7 h-7 text-emerald-500" /> : <ToggleLeft className="w-7 h-7 text-slate-400" />}
                    </button>
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">OTP Mode</span>
                      <span className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-semibold">Mobile Only, Email Only, Both</span>
                    </div>
                    <div className="relative">
                      <button 
                        onClick={() => setIsOtpDropdownOpen(!isOtpDropdownOpen)}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none flex items-center justify-between min-w-[130px] hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                      >
                        {otpMode} <ChevronDown className={`w-3.5 h-3.5 ml-2 transition-transform duration-200 ${isOtpDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOtpDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsOtpDropdownOpen(false)} />
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full right-0 mt-1.5 w-[140px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden z-20"
                          >
                            {['Mobile Only', 'Email Only', 'Both'].map((mode) => (
                              <div
                                key={mode}
                                onClick={() => { setOtpMode(mode); setIsOtpDropdownOpen(false); }}
                                className={`px-3.5 py-2 text-xs font-bold cursor-pointer transition-colors ${otpMode === mode ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                              >
                                {mode}
                              </div>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Biometric */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2"><Fingerprint className="w-4 h-4"/> Biometric & Passkey</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Fingerprint</span>
                    <button onClick={() => toggleStatus('fingerprint')} className="outline-none">
                      {authMethods.fingerprint.status === 'ON' ? <ToggleRight className="w-7 h-7 text-emerald-500" /> : <ToggleLeft className="w-7 h-7 text-slate-400" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 opacity-60">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">Face <span className="text-[calc(9px*var(--text-scale,1))] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">Not Reg</span></span>
                    <ToggleLeft className="w-7 h-7 text-slate-400 cursor-not-allowed" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 opacity-60">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">Voice <span className="text-[calc(9px*var(--text-scale,1))] bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded text-amber-600">Pending</span></span>
                    <ToggleLeft className="w-7 h-7 text-slate-400 cursor-not-allowed" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Passkey</span>
                    <button onClick={() => toggleStatus('passkey')} className="outline-none">
                      {authMethods.passkey.status === 'ON' ? <ToggleRight className="w-7 h-7 text-emerald-500" /> : <ToggleLeft className="w-7 h-7 text-slate-400" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Captcha */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2"><Shield className="w-4 h-4"/> CAPTCHA Protection</h4>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">CAPTCHA Protection</span>
                    <span className="text-[calc(10px*var(--text-scale,1))] text-slate-500 font-semibold mt-1">Random Selection (Image, Challenge, Auto Calculation)</span>
                  </div>
                  <button onClick={() => setCaptchaEnabled(!captchaEnabled)} className="outline-none">
                    {captchaEnabled ? <ToggleRight className="w-7 h-7 text-blue-500" /> : <ToggleLeft className="w-7 h-7 text-slate-400" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Authentication Method Summary */}
          <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[28px] border border-white/80 dark:border-slate-700/60 shadow-lg p-6 flex flex-col">
            <h3 className="font-extrabold text-[calc(16px*var(--text-scale,1))] text-slate-800 dark:text-white mb-5 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/50 pb-4">
              Authentication Method Summary
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
               <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-1 text-center">
                  <span className="text-2xl font-black text-slate-800 dark:text-white">{totalRegistered}</span>
                  <span className="text-[calc(10px*var(--text-scale,1))] font-bold uppercase tracking-wider text-slate-400">Total Registered</span>
               </div>
               <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 flex flex-col gap-1 text-center">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{totalActive}</span>
                  <span className="text-[calc(10px*var(--text-scale,1))] font-bold uppercase tracking-wider text-emerald-500/70">Active Methods</span>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-1 text-center">
                  <span className="text-2xl font-black text-slate-800 dark:text-white">{disabledCount}</span>
                  <span className="text-[calc(10px*var(--text-scale,1))] font-bold uppercase tracking-wider text-slate-400">Disabled</span>
               </div>
               <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/50 flex flex-col gap-1 text-center">
                  <span className={`text-2xl font-black ${captchaEnabled ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>{captchaEnabled ? 'ON' : 'OFF'}</span>
                  <span className={`text-[calc(10px*var(--text-scale,1))] font-bold uppercase tracking-wider ${captchaEnabled ? 'text-blue-500/70' : 'text-slate-400/70'}`}>CAPTCHA</span>
               </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar mt-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 uppercase py-2">Method</th>
                    <th className="text-center text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 uppercase py-2">Registered</th>
                    <th className="text-right text-[calc(11px*var(--text-scale,1))] font-bold text-slate-500 uppercase py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {methodsArray.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                      <td className="py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300">{row.name}</td>
                      <td className="py-2.5 text-center">
                        {row.registered === 'Registered' && <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />}
                      </td>
                      <td className="py-2.5 text-right">
                        <span className={`text-xs font-bold ${row.status === 'ON' ? 'text-blue-600' : 'text-slate-400'}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
