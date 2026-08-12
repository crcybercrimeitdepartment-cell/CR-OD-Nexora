import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  ArrowLeft, 
  ShieldCheck, 
  Loader2, 
  Mail, 
  UserCircle,
  ScanFace,
  CheckCircle2,
  LockKeyhole,
  Check,
  Settings,
  LayoutDashboard,
  HelpCircle,
  Bell,
  BookOpen,
  Calculator,
  Layers,
  LogOut
} from 'lucide-react';
import ToolCard, { Header as GlobalHeader, Footer as GlobalFooter } from '../components/nexora';
import { NEXORA_MODULES } from '../data/nexora';
import laptopWatermark from '../assets/WaterMark.png';
import phoneWatermark from '../assets/PhoneWaterMark.png';

export default function LoginPage({ onLoginSuccess }) {
  const [view, setView] = useState('initial'); 
  // views: initial, existing_username, verifying, existing_password, authenticating, 
  // face_verification_scanning, face_verification_success, otp, otp_verifying, identity_verified, dashboard, register, morphing
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // OTP state
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (view === 'face_verification_scanning') {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access denied or unavailable", err);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [view]);

  // Registration state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Handle existing user flow
  const handleNextToPassword = (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim()) return;
    
    if (username !== 'crcybercimeit@gmail.com') {
      setError('Invalid username. Please use the registered email.');
      return;
    }
    
    setView('verifying');
    setTimeout(() => {
      setView('existing_password');
    }, 1200);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!password.trim()) return;

    if (password !== 'CR@Secure2026IT') {
      setError('Invalid password. Please try again.');
      return;
    }

    setView('authenticating');
    setTimeout(() => {
      setView('face_verification_scanning');
      setTimeout(() => {
        setView('face_verification_success');
        setTimeout(() => {
          setView('otp');
        }, 1200);
      }, 3000);
    }, 1500);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join('').length < 6) return;
    
    setView('otp_verifying');
    setTimeout(() => {
      setView('identity_verified');
    }, 1500);
  };

  const handleStartMorph = () => {
    setView('morphing');
    // Start morph animation, then trigger app transition after completion (e.g. 2.2 seconds)
    setTimeout(() => {
      onLoginSuccess();
    }, 2200);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('Registration is restricted. You are not allowed to register through this portal for now .');
  };

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (!/^[0-9]*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6).split('');
    if (paste.some(char => !/^[0-9]$/.test(char))) return;
    
    const newOtp = [...otp];
    paste.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    const focusIndex = Math.min(paste.length, 5);
    inputRefs.current[focusIndex].focus();
  };

  const getStepStatus = (stepName) => {
    const sequence = [
      'existing_username', 
      'verifying', 
      'existing_password', 
      'authenticating', 
      'face_verification_scanning', 
      'face_verification_success', 
      'otp', 
      'otp_verifying', 
      'identity_verified', 
      'dashboard'
    ];
    
    const currentIndex = sequence.indexOf(view);
    const usernameIndex = sequence.indexOf('existing_username');
    const passwordIndex = sequence.indexOf('existing_password');
    const faceIndex = sequence.indexOf('face_verification_scanning');
    const otpIndex = sequence.indexOf('otp');
    const successIndex = sequence.indexOf('identity_verified');

    if (stepName === 'Username') {
      if (currentIndex > usernameIndex) return 'done';
      return 'active';
    }
    if (stepName === 'Password') {
      if (currentIndex > passwordIndex) return 'done';
      if (currentIndex === passwordIndex) return 'active';
      return 'pending';
    }
    if (stepName === 'Face') {
      if (currentIndex > faceIndex + 1) return 'done'; // +1 is success state
      if (currentIndex === faceIndex || currentIndex === faceIndex + 1) return 'active';
      return 'pending';
    }
    if (stepName === 'OTP') {
      if (currentIndex >= successIndex) return 'done';
      if (currentIndex === otpIndex || currentIndex === otpIndex + 1) return 'active';
      return 'locked';
    }
    return 'pending';
  };

  const ProgressIndicator = () => {
    const showProgress = ['existing_username', 'verifying', 'existing_password', 'authenticating', 'face_verification_scanning', 'face_verification_success', 'otp', 'otp_verifying', 'identity_verified'].includes(view);
    
    if (!showProgress) return null;

    const steps = [
      { name: 'Username', label: 'Username' },
      { name: 'Password', label: 'Password' },
      { name: 'Face', label: 'Face' },
      { name: 'OTP', label: 'OTP' }
    ];

    return (
      <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in w-full max-w-sm mx-auto">
        {steps.map((step, idx) => {
          const status = getStepStatus(step.name);
          return (
            <React.Fragment key={step.name}>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold tracking-wider uppercase ${
                  status === 'done' ? 'text-blue-600' : 
                  status === 'active' ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {step.label}
                </span>
                {status === 'done' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                {status === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                {status === 'locked' && <LockKeyhole className="w-3.5 h-3.5 text-slate-300" />}
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-px bg-slate-200 mx-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const HeaderIcon = ({ Icon, label, onClick }) => (
    <div 
      className="flex flex-col items-center justify-start cursor-pointer group w-[50px] md:w-[70px] shrink-0"
      onClick={onClick}
    >
      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 text-[#1e2a52]">
        <Icon className="w-5 h-5 md:w-5 md:h-5" strokeWidth={1.5} />
      </div>
      <span className="text-[6px] md:text-[7.5px] font-bold text-[#1e2a52] text-center leading-tight uppercase tracking-wide mt-1 relative pb-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center ${view === 'morphing' ? 'p-0' : 'p-4'}`}>
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-blue-50/50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] bg-gradient-to-t from-slate-100/50 to-transparent rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        layout
        transition={{ type: "spring", bounce: 0.12, duration: 0.9 }}
        style={{ borderRadius: view === 'morphing' ? 0 : 16 }}
        className={
          view === 'morphing' 
            ? 'w-full h-[100dvh] bg-[#f0f6ff] flex flex-col z-50 overflow-y-auto overflow-x-hidden border-none' 
            : 'w-full max-w-md bg-[#f0f6ff] p-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#b5d7fb] relative z-10 flex flex-col overflow-hidden'
        }
      >
        <motion.header 
          layout 
          className={
            view === 'morphing' 
              ? "w-full py-4 md:py-6 bg-[#cbe6ff] shadow-sm border-b border-[#b5d7fb] relative z-10 px-4 sm:px-6 md:px-10 flex items-center justify-between gap-2 sm:gap-4 md:gap-6"
              : "flex items-center justify-between w-full relative z-20 bg-[#cbe6ff] px-6 py-4 border-b border-[#b5d7fb]"
          }
        >
          <motion.div layout className="shrink-0 flex items-center justify-start">
            <motion.img 
              layout
              src="/nexora logo.png" 
              alt="Nexora Logo" 
              className={`${view === 'morphing' ? 'h-16 sm:h-20 md:h-24 lg:h-28 drop-shadow-md' : 'h-10 drop-shadow-sm'} w-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-200`} 
            />
          </motion.div>
          
          {view === 'morphing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }} className="hidden xl:flex items-start justify-center gap-1 mx-2 2xl:mx-8">
              <HeaderIcon Icon={Settings} label="Platform Settings" />
              <HeaderIcon Icon={LayoutDashboard} label="Dashboard Settings" />
              <HeaderIcon Icon={HelpCircle} label="Help" />
            </motion.div>
          )}

          <motion.div layout className={`flex flex-col items-center flex-1 min-w-0 ${view === 'morphing' ? 'text-center justify-center px-2 md:px-6 xl:px-12' : ''}`}>
            <motion.h1 
              layout 
              className={
                view === 'morphing' 
                  ? "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1"
                  : "text-xl font-black tracking-tight text-[#1e2a52]"
              }
            >
              NEXORA
            </motion.h1>

            {view === 'morphing' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-full max-w-lg mt-1 sm:mt-2 mb-3 sm:mb-4 flex flex-col items-center"
              >
                <div className="flex items-center justify-center w-full">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#b0b8d6] to-transparent opacity-70"></div>
                  <p className="px-1.5 sm:px-3 md:px-4 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] font-medium text-[#4b5563] text-center leading-snug xl:whitespace-nowrap">
                    One Secure Platform for <br className="block lg:hidden" /> Advanced Intelligence & Investigation Records
                  </p>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#b0b8d6] to-transparent opacity-70"></div>
                </div>
                <div className="relative flex-1 group w-full max-w-xl mx-auto mt-2">
                  <svg className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#1e2a52] transition-colors pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <input type="text" placeholder="Search..." disabled className="w-full bg-white border-2 border-[#1e2a52]/40 rounded-full py-1.5 sm:py-2.5 pl-9 sm:pl-11 pr-3 sm:pr-4 text-xs sm:text-sm shadow-[0_4px_16px_rgba(30,42,82,0.12)]" />
                </div>
              </motion.div>
            )}
          </motion.div>

          {view === 'morphing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }} className="hidden xl:flex items-start justify-center gap-1 mx-2 2xl:mx-8">
              <HeaderIcon Icon={Bell} label="Notification" />
              <HeaderIcon Icon={Calculator} label="Case Calculator" />
              <HeaderIcon Icon={LogOut} label="Log Out" onClick={() => { sessionStorage.removeItem('isAuthenticated'); window.location.reload(); }} />
            </motion.div>
          )}

          <motion.div layout className="shrink-0 flex items-center justify-end">
            <motion.img 
              layout
              src="https://res.cloudinary.com/dlhmkbijh/image/upload/v1785473583/Logo_mswjel.png" 
              alt="Partner Logo" 
              className={`${view === 'morphing' ? 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 drop-shadow-md' : 'h-10 drop-shadow-sm'} w-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-200`} 
            />
          </motion.div>
        </motion.header>

        {view === 'morphing' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ delay: 0.15, duration: 0.6 }} className="flex xl:hidden items-start justify-center gap-1 sm:gap-2 mt-2 w-full px-1">
            <HeaderIcon Icon={Settings} label="Platform Settings" />
            <HeaderIcon Icon={LayoutDashboard} label="Dashboard Settings" />
            <HeaderIcon Icon={HelpCircle} label="Help" />
            <HeaderIcon Icon={Bell} label="Notification" />
            <HeaderIcon Icon={Calculator} label="Case Calculator" />
            <HeaderIcon Icon={LogOut} label="Log Out" onClick={() => { sessionStorage.removeItem('isAuthenticated'); window.location.reload(); }} />
          </motion.div>
        )}

        <motion.div layout className={`w-full ${view === 'morphing' ? 'flex-1 max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-6 pt-16 sm:pt-20 lg:pt-24 pb-10 md:pb-16 flex flex-col relative z-0' : 'flex-1 px-8 pt-8 pb-4 relative z-10 flex flex-col items-center'}`}>
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden flex items-center justify-center mix-blend-multiply">
            <img src={laptopWatermark} className="w-full h-full object-cover" alt="watermark" />
          </div>
          <div className="relative z-10 w-full">
            <AnimatePresence mode="wait">
              {view !== 'morphing' ? (
                <motion.div 
                  key="auth-flow"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  className="w-full"
                >
                  <ProgressIndicator />
                {/* INITIAL SCREEN */}
                {view === 'initial' && (
                  <div className="animate-fade-in">
                    <div className="text-center mb-8">
                      <h2 className="text-lg font-medium text-slate-700">Welcome Back</h2>
                      <p className="text-slate-500 text-sm mt-1">Please select an option to continue</p>
                    </div>
                    
                    <div className="space-y-4">
                      <button 
                        onClick={() => {
                          setView('existing_username');
                          setError('');
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <User className="w-5 h-5" />
                        Existing User
                      </button>
                      
                      <button 
                        onClick={() => setView('register')}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
                      >
                        <UserCircle className="w-5 h-5" />
                        New User / Register
                      </button>
                    </div>
                  </div>
                )}

                {/* USERNAME SCREEN */}
                {view === 'existing_username' && (
                  <div className="animate-fade-in">
                    <button 
                      onClick={() => {
                        setView('initial');
                        setError('');
                      }}
                      className="text-slate-400 hover:text-slate-600 transition-colors mb-6 flex items-center gap-1 text-sm font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-slate-900">Sign in to your account</h2>
                      <p className="text-slate-500 text-sm mt-1">Enter your username to continue.</p>
                    </div>

                    <form onSubmit={handleNextToPassword}>
                      <div className="space-y-4 mb-8">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="username">Username</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-slate-400" />
                            </div>
                            <input 
                              id="username"
                              type="text" 
                              value={username}
                              onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                              }}
                              className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl bg-slate-50 text-slate-900 focus:ring-2 transition-all sm:text-sm outline-none ${
                                error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'
                              }`}
                              placeholder="Email or Username"
                              autoFocus
                              required
                            />
                          </div>
                          {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                          )}
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </form>
                  </div>
                )}

                {/* VERIFYING SCREEN */}
                {view === 'verifying' && (
                  <div className="animate-fade-in py-12 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                    <h2 className="text-lg font-medium text-slate-900">Verifying username...</h2>
                    <p className="text-slate-500 text-sm mt-1">Please wait a moment.</p>
                  </div>
                )}

                {/* PASSWORD SCREEN */}
                {view === 'existing_password' && (
                  <div className="animate-fade-in">
                    <button 
                      onClick={() => {
                        setView('existing_username');
                        setError('');
                      }}
                      className="text-slate-400 hover:text-slate-600 transition-colors mb-6 flex items-center gap-1 text-sm font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-slate-900">Enter your password</h2>
                      <div className="flex items-center gap-2 mt-2 py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg w-fit">
                        <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{username}</span>
                      </div>
                    </div>

                    <form onSubmit={handleLogin}>
                      <div className="space-y-4 mb-8">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input 
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                              }}
                              className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl bg-slate-50 text-slate-900 focus:ring-2 transition-all sm:text-sm outline-none ${
                                error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'
                              }`}
                              placeholder="••••••••"
                              autoFocus
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                          )}
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </form>
                  </div>
                )}

                {/* AUTHENTICATING SCREEN */}
                {view === 'authenticating' && (
                  <div className="animate-fade-in py-12 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                    <h2 className="text-lg font-medium text-slate-900">Authenticating...</h2>
                    <p className="text-slate-500 text-sm mt-1">Securing your connection.</p>
                  </div>
                )}

                {/* FACE VERIFICATION SCREEN */}
                {(view === 'face_verification_scanning' || view === 'face_verification_success') && (
                  <div className="animate-fade-in text-center py-4">
                    <h2 className="text-2xl font-bold text-slate-900">Face Verification</h2>
                    <p className="text-slate-500 text-sm mt-1 mb-8">Please verify your identity to continue.</p>

                    <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center">
                      <video 
                        ref={videoRef}
                        autoPlay 
                        playsInline 
                        muted 
                        className="absolute inset-0 w-full h-full object-cover z-0"
                      />
                      {view === 'face_verification_scanning' && (
                        <>
                          <ScanFace className="w-16 h-16 text-white/50 z-10 drop-shadow-md" strokeWidth={1.5} />
                          {/* Scanning Animation line */}
                          <div className="absolute inset-0 z-20 w-full h-full">
                            <div className="w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute top-0 animate-scan"></div>
                            <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
                          </div>
                        </>
                      )}
                      {view === 'face_verification_success' && (
                        <div className="absolute inset-0 z-20 w-full h-full bg-blue-50/70 flex flex-col items-center justify-center animate-fade-in backdrop-blur-sm">
                          <ScanFace className="w-16 h-16 text-blue-600 mb-2 drop-shadow-md" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>

                    {view === 'face_verification_scanning' ? (
                      <div className="flex flex-col items-center justify-center">
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin mb-2" />
                        <span className="font-medium text-blue-600">Verifying your face...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center animate-fade-in">
                        <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />
                        <span className="font-medium text-green-600">✓ Face Verified</span>
                      </div>
                    )}
                  </div>
                )}

                {/* OTP SCREEN */}
                {view === 'otp' && (
                  <div className="animate-fade-in py-2">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-slate-900">OTP Verification</h2>
                      <p className="text-slate-500 text-sm mt-1">Enter the 6-digit verification code sent to your registered account.</p>
                    </div>

                    <form onSubmit={handleVerifyOtp}>
                      <div className="flex justify-center gap-2 sm:gap-3 mb-6" onPaste={handleOtpPaste}>
                        {otp.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => (inputRefs.current[idx] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e, idx)}
                            onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                            autoFocus={idx === 0}
                          />
                        ))}
                      </div>

                      <div className="text-center mb-8">
                        <p className="text-sm text-slate-500">
                          Didn't receive code? <button type="button" className="text-blue-600 font-medium hover:underline">Resend in 0:45</button>
                        </p>
                      </div>

                      <button 
                        type="submit"
                        disabled={otp.join('').length < 6}
                        className="w-full flex justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Verify OTP
                      </button>
                    </form>
                  </div>
                )}

                {/* OTP VERIFYING */}
                {view === 'otp_verifying' && (
                  <div className="animate-fade-in py-12 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                    <h2 className="text-lg font-medium text-slate-900">Verifying OTP...</h2>
                    <p className="text-slate-500 text-sm mt-1">Checking the security code.</p>
                  </div>
                )}

                {/* IDENTITY VERIFIED (FINAL SUCCESS) */}
                {view === 'identity_verified' && (
                  <div className="animate-fade-in py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">✓ Identity Verified</h2>
                    <p className="text-slate-500 text-sm mb-10">Authentication successful.</p>
                    
                    <button 
                      onClick={handleStartMorph}
                      className="w-full flex justify-center py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                    >
                      Continue to Dashboard
                    </button>
                  </div>
                )}

                {/* DASHBOARD PLACEHOLDER */}
                {view === 'dashboard' && (
                  <div className="animate-fade-in py-10 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <ShieldCheck className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
                    <p className="text-slate-500 text-sm mt-2 mb-8">You are securely logged in.</p>
                    <button 
                      onClick={() => {
                        setView('initial');
                        setUsername('');
                        setPassword('');
                        setOtp(['','','','','','']);
                      }}
                      className="py-2.5 px-6 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}

                {/* REGISTER SCREEN */}
                {view === 'register' && (
                  <div className="animate-fade-in">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                      <p className="text-slate-500 text-sm mt-1">Enter your details to get started.</p>
                    </div>

                    <form onSubmit={handleRegister}>
                      <div className="space-y-4 mb-8">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="regFullName">Full Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserCircle className="h-4 w-4 text-slate-400" />
                            </div>
                            <input 
                              id="regFullName"
                              type="text" 
                              value={regFullName}
                              onChange={(e) => setRegFullName(e.target.value)}
                              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="regUsername">Username</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <input 
                              id="regUsername"
                              type="text" 
                              value={regUsername}
                              onChange={(e) => setRegUsername(e.target.value)}
                              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
                              placeholder="johndoe123"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="regEmail">Email</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-4 w-4 text-slate-400" />
                            </div>
                            <input 
                              id="regEmail"
                              type="email" 
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
                              placeholder="john@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="regPassword">Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-4 w-4 text-slate-400" />
                            </div>
                            <input 
                              id="regPassword"
                              type={showPassword ? "text" : "password"}
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              className="block w-full pl-9 pr-10 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
                              placeholder="••••••••"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="regConfirmPassword">Confirm Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-4 w-4 text-slate-400" />
                            </div>
                            <input 
                              id="regConfirmPassword"
                              type={showPassword ? "text" : "password"}
                              value={regConfirmPassword}
                              onChange={(e) => setRegConfirmPassword(e.target.value)}
                              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
                              placeholder="••••••••"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
                      >
                        Create Account
                      </button>

                      {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm text-center rounded-xl font-medium">
                          {error}
                        </div>
                      )}

                      <div className="text-center">
                        <button 
                          type="button"
                          onClick={() => {
                            setView('initial');
                            setError('');
                          }}
                          className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                        >
                          Back to Login
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                </motion.div>
              ) : (
                <motion.div 
                  key="dashboard-mock"
                  initial={{ opacity: 0, y: 60, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  transition={{ delay: 0.1, type: "spring", bounce: 0.1, duration: 0.8 }}
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
                >
                  {NEXORA_MODULES.slice(0, 12).map((tool, index) => (
                    <div key={tool.name} className="opacity-100">
                      <ToolCard tool={tool} index={index} disableCssAnimation={true} />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.footer 
          layout 
          className={
            view === 'morphing' 
              ? "w-full mt-auto relative z-10"
              : "w-full bg-[#cbe6ff] px-6 py-4 border-t border-[#b5d7fb] flex justify-between items-center text-[#1e2a52] text-[11px] font-medium relative z-20"
          }
        >
          {view !== 'morphing' ? (
            <>
              <motion.span layout>© 2026 Nexora</motion.span>
              <motion.span layout>Secure Platform</motion.span>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full"
            >
              <GlobalFooter pageName="NEXORA INTELLIGENCE" audience="Law Enforcement & Security Agencies" />
            </motion.div>
          )}
        </motion.footer>

      </motion.div>
    </div>
  );
}
