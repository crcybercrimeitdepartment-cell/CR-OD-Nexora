/**
 * @file nexora.jsx
 * @description Global shared UI components for Nexora.
 *
 * Exports:
 *  - `ToolCard` (default)  — Home dashboard card for each intelligence category
 *  - Icon wrapper functions — Thin Lucide-React wrappers used in data/nexora.js
 *  - `Header`              — Top application bar with logos, title, and search
 *  - `Footer`              — Full-width dark footer with links, stats, and social icons
 *
 * Design conventions:
 *  - Cards use alternating slide-in animations (left/right) per row pair.
 *  - SVG `animate-draw-line` class traces the card border on hover.
 *  - All components are fully responsive (mobile-first Tailwind breakpoints).
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  PhoneCall,
  UserCheck,
  Activity,
  Server,
  Database,
  MapPin,
  FileSpreadsheet,
  Search,
  Radio,
  Globe,
  Share2,
  Car,
  Building2,
  Landmark,
  Mail,
  PackageCheck,
  FileText,
  ShieldAlert,
  Map,
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  Navigation,
  Hotel,
  Fuel,
  Info,
  Cpu,
  Phone,
  ChevronRight,
  Lock,
  Zap,
  Heart,
  UserPlus,
  Calendar,
  Clock,
  MessageSquare,
  HelpCircle,
  History,
  Briefcase,
  Coins,
  Camera,
  CreditCard,
  Train,
  AlertTriangle,
  Shield,
  Newspaper,
  Wifi,
  Settings
} from 'lucide-react';

const cyberCrimeLogo = 'https://res.cloudinary.com/dlhmkbijh/image/upload/v1785473583/Logo_mswjel.png';
const nexoraLogoHeader = '/nexora logo.png';
const nexoraLogoFooter = '/nexora logo.png';


/**
 * ToolCard
 * The primary interactive card displayed in the home dashboard grid.
 * Each card represents one intelligence category and navigates to its sub-page on click.
 *
 * Animation:
 *  - Even rows (0-indexed pairs) slide in from the left; odd rows from the right.
 *  - Stagger delay is 120 ms per row pair so cards cascade as the page loads.
 *  - An SVG border traces around the card on hover via CSS `animate-draw-line`.
 *
 * Accessibility:
 *  - role="button" + tabIndex={0} makes the div keyboard-focusable.
 *  - onKeyDown handles Enter and Space to trigger the click.
 *
 * @component
 * @param {Object}   props           - Component props
 * @param {Object}   props.tool      - Tool data object from NEXORA_MODULES array
 * @param {string}   props.tool.name     - Primary display name (falls back to `title`)
 * @param {string}   props.tool.description - Short tool description text
 * @param {Function|JSX.Element} props.tool.icon - Lucide icon component or JSX element
 * @param {string}   props.tool.bgColor   - Tailwind bg class for icon badge (e.g. 'bg-[#FFECEC]')
 * @param {string}   props.tool.iconColor - Tailwind text class for the icon (e.g. 'text-[#EF4444]')
 * @param {number}   [props.index=0]  - Card's position index in the grid (determines animation direction)
 * @param {Function} [props.onClick]  - Callback invoked with the tool object when the card is clicked
 * @returns {JSX.Element} A clickable card with icon, name, and description
 */
export default function ToolCard({ tool, index = 0, onClick, customHeight, disableCssAnimation = false }) {
  const IconComponent = tool.icon;
  const isElement = React.isValidElement(tool.icon); // True if icon is already a JSX element
  const toolName = tool.name || tool.title;           // Support both `name` and legacy `title` keys
  const toolBg = tool.bgColor || tool.bg || 'bg-slate-100';
  const toolIconColor = tool.iconColor || tool.color || 'text-slate-600';

  // Compute which row pair this card belongs to (2 cards per row on mobile)
  const rowIndex = Math.floor(index / 2);
  // Stagger delay: each row pair is delayed 120ms later than the one above it
  const delayMs = rowIndex * 120;
  // Alternate slide direction: even rows from left, odd rows from right
  const slideAnimation = disableCssAnimation ? '' : (rowIndex % 2 === 0 ? 'animate-card-slide-left' : 'animate-card-slide-right');

  const cardHeight = customHeight || 'h-[84px] sm:h-[96px]';

  return (
    <div
      onClick={() => onClick && onClick(tool)}
      style={disableCssAnimation ? {} : { animationDelay: `${delayMs}ms` }}
      className={`${slideAnimation} bg-white rounded-[14px] sm:rounded-[18px] p-2.5 sm:p-3.5 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-250 ease-out cursor-pointer flex items-center gap-2.5 sm:gap-4 group select-none relative overflow-hidden ${cardHeight}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(tool);
        }
      }}
    >
      {/* Animated Black Border Line Drawing on Hover */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 overflow-visible">
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx="16"
          fill="none"
          stroke="#0F172A"
          strokeWidth="2"
          pathLength="100"
          className="animate-draw-line"
        />
      </svg>

      {/* Left Icon Container */}
      <div className={`w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-xl sm:rounded-2xl ${toolBg} ${toolIconColor} flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-sm relative z-0`}>
        {isElement ? (
          tool.icon
        ) : typeof IconComponent === 'function' ? (
          <IconComponent className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
        ) : null}
      </div>

      {/* Right Text Stack */}
      <div className="flex flex-col text-left min-w-0 relative z-0">
        <h3 className="text-[11px] sm:text-[14px] font-bold text-slate-900 leading-snug line-clamp-3 group-hover:text-red-600 transition-colors">
          {toolName}
        </h3>
        <p className="text-[9.5px] sm:text-[11.5px] text-slate-500 font-normal leading-tight line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1">
          {tool.description || tool.desc}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   ICON WRAPPER COMPONENTS
   Each function is a named export that wraps a single Lucide React icon.
   They are imported by `src/data/nexora.js` and assigned to tool
   objects as the `icon` prop, allowing ToolCard to render them dynamically.

   Naming convention: <Category>Icon — matches the tool category name.
   All accept an optional `className` prop (default: "w-8 h-8") for sizing.
   ========================================================================== */

export function CDRIcon({ className = "w-8 h-8" }) { return <PhoneCall className={className} />; }
export function SDRIcon({ className = "w-8 h-8" }) { return <UserCheck className={className} />; }
export function TDRIcon({ className = "w-8 h-8" }) { return <Radio className={className} />; }
export function ILDIcon({ className = "w-8 h-8" }) { return <Globe className={className} />; }
export function ITDRIcon({ className = "w-8 h-8" }) { return <Activity className={className} />; }
export function IPDRIcon({ className = "w-8 h-8" }) { return <Server className={className} />; }
export function IDRIcon({ className = "w-8 h-8" }) { return <Database className={className} />; }
export function LARIcon({ className = "w-8 h-8" }) { return <MapPin className={className} />; }
export function OSINTIcon({ className = "w-8 h-8" }) { return <Search className={className} />; }
export function SMIIcon({ className = "w-8 h-8" }) { return <Share2 className={className} />; }
export function CTIIcon({ className = "w-8 h-8" }) { return <ShieldAlert className={className} />; }
export function BSARIcon({ className = "w-8 h-8" }) { return <FileSpreadsheet className={className} />; }
export function BRIIcon({ className = "w-8 h-8" }) { return <Landmark className={className} />; }
export function RTOIIcon({ className = "w-8 h-8" }) { return <Car className={className} />; }
export function PRIIcon({ className = "w-8 h-8" }) { return <FileText className={className} />; }
export function LIHIcon({ className = "w-8 h-8" }) { return <History className={className} />; }
export function BIIcon({ className = "w-8 h-8" }) { return <Briefcase className={className} />; }
export function FRIIcon({ className = "w-8 h-8" }) { return <Coins className={className} />; }
export function CCTVIIcon({ className = "w-8 h-8" }) { return <Camera className={className} />; }
export function LRIIcon({ className = "w-8 h-8" }) { return <Map className={className} />; }
export function ERIIcon({ className = "w-8 h-8" }) { return <GraduationCap className={className} />; }
export function KYCDIIcon({ className = "w-8 h-8" }) { return <CreditCard className={className} />; }
export function PSRIIcon({ className = "w-8 h-8" }) { return <ShieldCheck className={className} />; }
export function CoRIIcon({ className = "w-8 h-8" }) { return <Building2 className={className} />; }
export function PORIIcon({ className = "w-8 h-8" }) { return <Mail className={className} />; }
export function CSRIIcon({ className = "w-8 h-8" }) { return <PackageCheck className={className} />; }
export function TGRIIcon({ className = "w-8 h-8" }) { return <Navigation className={className} />; }
export function GHLRIIcon({ className = "w-8 h-8" }) { return <Hotel className={className} />; }
export function PPRIIcon({ className = "w-8 h-8" }) { return <Fuel className={className} />; }
export function RIIIcon({ className = "w-8 h-8" }) { return <Train className={className} />; }
export function PCRIIcon({ className = "w-8 h-8" }) { return <Lock className={className} />; }
export function CRIIcon({ className = "w-8 h-8" }) { return <AlertTriangle className={className} />; }
export function MIIIcon({ className = "w-8 h-8" }) { return <Shield className={className} />; }
export function MInfIIcon({ className = "w-8 h-8" }) { return <Newspaper className={className} />; }
export function MDRIIcon({ className = "w-8 h-8" }) { return <Stethoscope className={className} />; }
export function TIIIcon({ className = "w-8 h-8" }) { return <Wifi className={className} />; }
export function TDIIcon({ className = "w-8 h-8" }) { return <Radio className={className} />; }
export function IntelligenceModulesIcon({ className = "w-8 h-8" }) { return <Cpu className={className} />; }
export function AboutUsIcon({ className = "w-8 h-8" }) { return <Info className={className} />; }
export function AccountSettingIcon({ className = "w-8 h-8" }) { return <Settings className={className} />; }



/**
 * Header
 * Sticky top application bar rendered on every page view.
 *
 * Layout (3-column flex row):
 *  LEFT  — Nexora logo (scales responsively h-14 → h-32)
 *  CENTER — Page title, tagline divider, and the live search bar + Follow button
 *  RIGHT  — CR Cyber Crime Foundation logo
 *
 * The search bar is a controlled input; its value and change handler are
 * passed in from App.jsx so that search state lives at the top level.
 *
 * @component
 * @param {Object}   props                  - Component props
 * @param {string}   [props.searchQuery=""] - Current search input value (controlled)
 * @param {Function} [props.onSearchChange] - Callback fired on every keystroke with the new value
 * @returns {JSX.Element} A full-width <header> element
 */
export function Header({ searchQuery = "", onSearchChange = () => { } }) {
  const { scrollY } = useScroll();

  const logoY = useTransform(scrollY, [0, 150], [0, -20]);
  const logoRotate = useTransform(scrollY, [0, 150], [0, -5]);
  const rightLogoRotate = useTransform(scrollY, [0, 150], [0, 5]);
  const logoOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  const searchScale = useTransform(scrollY, [0, 150], [1, 0.95]);
  const shadowOpacity = useTransform(scrollY, [0, 150], [0.12, 0]);

  return (
    <header className="w-full py-4 md:py-6 bg-[#cbe6ff] shadow-sm border-b border-[#b5d7fb] mb-6 lg:mb-8 relative z-10">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Header Row: Left Logo | Center Title & Subtitle | Right Logo */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6 w-full">
          {/* LEFT LOGO: Nexora */}
          <motion.div
            style={{ y: logoY, rotate: logoRotate, opacity: logoOpacity }}
            className="shrink-0 flex items-center justify-start"
          >
            <img
              src={nexoraLogoHeader}
              alt="Nexora Logo"
              className="h-20 sm:h-28 md:h-36 lg:h-44 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-200"
            />
          </motion.div>

          {/* CENTER: Page Title & Subtitle & Search */}
          <div className="flex-1 text-center flex flex-col items-center justify-center px-1 sm:px-2 min-w-0">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
              NEXORA
            </h1>

            <div className="flex items-center justify-center w-full max-w-lg mt-1 sm:mt-2 mb-3 sm:mb-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#b0b8d6] to-transparent opacity-70"></div>
              <p className="px-1.5 sm:px-3 md:px-4 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] font-medium text-[#4b5563] text-center leading-snug xl:whitespace-nowrap">
                One Secure Platform for <br className="block lg:hidden" /> Advanced Intelligence & Investigation Records
              </p>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#b0b8d6] to-transparent opacity-70"></div>
            </div>

            <motion.div
              style={{ scale: searchScale }}
              className="flex items-center justify-center gap-2 sm:gap-3.5 w-full max-w-xl mx-auto"
            >
              <div className="relative flex-1 group">
                <svg className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#1e2a52] transition-colors pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <motion.input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  style={{ boxShadow: useTransform(shadowOpacity, v => `0 4px 16px rgba(30,42,82,${v})`) }}
                  className="w-full bg-white border-2 border-[#1e2a52]/40 hover:border-[#1e2a52] rounded-full py-1.5 sm:py-2.5 pl-9 sm:pl-11 pr-3 sm:pr-4 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[#1e2a52]/20 focus:border-[#1e2a52] transition-all text-[#1e2a52] placeholder-[#1e2a52]/60"
                />
              </div>
              <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#1e2a52] hover:bg-[#121c3b] text-white font-bold py-1.5 sm:py-2.5 px-3 sm:px-6 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-[0_4px_12px_rgba(30,42,82,0.3)] hover:shadow-[0_6px_16px_rgba(30,42,82,0.4)] hover:-translate-y-0.5 shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                <span className="hidden sm:inline">Follow</span>
              </button>
            </motion.div>
          </div>

          <motion.div
            style={{ y: logoY, rotate: rightLogoRotate, opacity: logoOpacity }}
            className="shrink-0 flex items-center justify-end"
          >
            <img
              src={cyberCrimeLogo}
              alt="CR Cyber Crime Foundation"
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain drop-shadow-md hover:scale-105 transition-transform duration-200"
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
}

/**
 * Footer
 * Full-width dark footer displayed at the bottom of every page.
 *
 * Structure:
 *  TOP    — 12-column grid: Brand column (logo + tagline + stars + social icons)
 *           + 3 link columns (Modules, Company, Support)
 *           + Feature highlight column (Secure / No Data / Fast / Anywhere)
 *  MIDDLE — 4-stat bar: 2M+ Users | 150+ Countries | 99.9% Uptime | 4.9/5 Rating
 *  BOTTOM — Policy links on the left, "Made with ❤" on the right
 *
 * @component
 * @param {Object}   props               - Component props
 * @param {Function} [props.onSelectLink] - Optional callback when a footer link is clicked (receives link label string)
 * @returns {JSX.Element} A full-width dark <footer> element
 */
// Real-Time Ultra-Smooth Chroma-Key Video Canvas Component for User's running animation.mp4
const RunningManCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/running_animation.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    let animId;
    // Offscreen canvas for fast pixel processing
    const offscreen = document.createElement('canvas');
    offscreen.width = 240;
    offscreen.height = 160;
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });

    const renderFrame = () => {
      const canvas = canvasRef.current;
      if (canvas && video.readyState >= 2 && offCtx) {
        const ctx = canvas.getContext('2d');
        const w = 240;
        const h = 160;

        // Draw video frame onto offscreen canvas
        offCtx.drawImage(video, 0, 0, w, h);
        const imgData = offCtx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Fast character pixel isolation
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const isSkin = (r > 180 && g > 120 && r > b + 25);
          const isShortsOrHair = (r < 75 && g < 75 && b < 75);
          const isWhiteShoe = (r > 210 && g > 210 && b > 210);
          const isBlueSweater = (b > 175 && r < 145 && g < 188 && b > r + 40);

          if (!(isSkin || isShortsOrHair || isWhiteShoe || isBlueSweater)) {
            data[i + 3] = 0; // Make 100% transparent
          }
        }

        // Put pre-keyed frame onto visible canvas
        ctx.putImageData(imgData, 0, 0);
      }

      if ('requestVideoFrameCallback' in video) {
        video.requestVideoFrameCallback(renderFrame);
      } else {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    video.play().then(() => {
      if ('requestVideoFrameCallback' in video) {
        video.requestVideoFrameCallback(renderFrame);
      } else {
        animId = requestAnimationFrame(renderFrame);
      }
    }).catch(err => {
      console.log('Video error:', err);
    });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={160}
      className="runner-canvas"
    />
  );
};

export function Footer({ pageName = "NEXORA INTELLIGENCE", audience = "Law Enforcement & Security Agencies", onSelectLink }) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${day} ${monthName}, ${year}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  return (
    <footer className="w-full bg-[#cbe6ff] text-[#1e2a52] font-sans border-t border-[#b5d7fb] pt-0 pb-10 lg:pb-12 mt-14 sm:mt-20 lg:mt-24 relative z-10">
      {/* TOP GREY LINE STRIP WITH ANIMATED CSS CAR */}
      <div className="w-full relative select-none mb-10 lg:mb-16">
        {/* Grey Road Track */}
        <div className="h-6 sm:h-8 w-full bg-[#71767E] border-y border-[#595E66] relative flex items-center shadow-inner">

          {/* Static White Dashed Center Line */}
          <div className="w-full h-[2px] sm:h-[3px] bg-[repeating-linear-gradient(90deg,#FFFFFF_0px,#FFFFFF_24px,transparent_24px,transparent_48px)] opacity-90 absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none"></div>

          {/* USER'S EXACT RUNNING ANIMATION VIDEO (CHROMA-KEYED CANVASES) */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ animation: 'thiefRunAcross 10s linear infinite', willChange: 'transform' }}>
            <div className="thief-wrapper">
              <RunningManCanvas />
            </div>
          </div>

          {/* USER'S EXACT ANIMATED CSS CAR DRIVING ON THE GREY LINE */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ animation: 'driveAcross 10s linear infinite', willChange: 'transform' }}>
            <div className="css-car-wrapper">
              <div className="car-container">
                <div className="car"></div>
                {/* Police Emergency Beacon Siren Light */}
                <div className="police-siren-light">
                  <div className="siren-glass">
                    <div className="siren-core"></div>
                  </div>
                  <div className="siren-base"></div>
                </div>
                {/* NEXORA Brand text on Car side */}
                <div className="car-brand-name">NEXORA</div>
                <div className="front-part"></div>
                <div className="front-part2"></div>
                <div className="front-part3"></div>
                <div className="bottom-part"></div>
                <div className="window"></div>
                <div className="window2"></div>
                <div className="window3"></div>
                <div className="details"></div>
                <div className="details2"></div>
                <div className="details3"></div>
                <div className="details4"></div>
                <div className="details5"></div>
                <div className="bumper"></div>
                <div className="bumper2"></div>
                <div className="head-lights"></div>
                <div className="tail-lights"></div>
                <div className="extra-lighting-details"></div>
                <div className="extra-lighting-details2"></div>
                <div className="extra-lighting-details3"></div>
                <div className="container-wheel1">
                  <div className="wheel-ring wheel-ring1">
                    <div className="wheel-center"></div>
                    <div className="wheel-ring-stick"></div>
                    <div className="wheel-ring-stick wheel-ring-stick2"></div>
                    <div className="wheel-ring-stick wheel-ring-stick3"></div>
                    <div className="wheel-ring-stick wheel-ring-stick4"></div>
                    <div className="wheel-ring-stick wheel-ring-stick5"></div>
                  </div>
                  <div className="wheel-break"></div>
                </div>
                <div className="container-wheel2">
                  <div className="wheel-ring wheel-ring2">
                    <div className="wheel-center"></div>
                    <div className="wheel-ring-stick"></div>
                    <div className="wheel-ring-stick wheel-ring-stick2"></div>
                    <div className="wheel-ring-stick wheel-ring-stick3"></div>
                    <div className="wheel-ring-stick wheel-ring-stick4"></div>
                    <div className="wheel-ring-stick wheel-ring-stick5"></div>
                  </div>
                  <div className="wheel-break wheel-break2"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full max-w-[1500px] mx-auto px-4 lg:px-8">

        {/* TOP SECTION: 5 Columns */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 pb-10 lg:pb-16 border-b border-[#b5d7fb]">

          {/* Column 1: Brand & Socials (takes 4 cols space on lg screens) */}
          <div className="flex flex-col space-y-4 lg:space-y-6 lg:col-span-4">
            <div className="flex items-center gap-3 lg:gap-3.5">
              <img
                src={nexoraLogoFooter}
                alt="Nexora Logo"
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain drop-shadow-sm shrink-0"
              />
              <span className="text-[#1e2a52] font-black text-lg sm:text-xl lg:text-2xl tracking-tight leading-tight">
                NEXORA
              </span>
            </div>

            <div className="text-xs sm:text-sm text-[#4b5563] space-y-1 font-medium leading-relaxed">
              <p>Your all-in-one trusted platform for CDR, SDR, IPDR, OSINT, location analytics, bank statement audits, and forensic intelligence record management.</p>
            </div>

          </div>

          {/* LINKS WRAPPER (INTELLIGENCE MODULES in 2 columns) */}
          <div className="grid grid-cols-1 lg:col-span-4 lg:pl-6 lg:border-l lg:border-[#b5d7fb]">
            {/* Column 2: INTELLIGENCE MODULES */}
            <div className="flex flex-col space-y-3 lg:space-y-4">
              <h3 className="text-[#1e2a52] text-[11px] lg:text-[13px] font-black uppercase tracking-wider mb-1 lg:mb-2">INTELLIGENCE MODULES</h3>
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 lg:gap-y-3">
                {['Call Detail Record', 'Subscriber Record', 'Internet Traffic', 'OSINT Analytics', 'Bank Statement Audit', 'All Modules'].map((link) => (
                  <button key={link} onClick={() => onSelectLink && onSelectLink(link)} className="flex items-center justify-between text-[11px] lg:text-[13px] text-[#4b5563] font-medium hover:text-[#1e2a52] group transition-colors text-left w-full max-w-[160px] py-0.5 lg:py-0">
                    <span>{link}</span>
                    <ChevronRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#6b7280] group-hover:text-[#1e2a52] shrink-0 ml-1" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Feature Highlights (2 columns) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-6 lg:col-span-4 lg:pl-6 lg:border-l lg:border-[#b5d7fb] pt-3 border-t border-[#b5d7fb] lg:pt-0 lg:border-t-0">
            <div className="flex items-center gap-2 lg:items-start lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-[10px] bg-emerald-100/80 flex items-center justify-center shrink-0 border border-emerald-200/60">
                <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] lg:text-sm font-bold text-[#1e2a52] leading-tight">100% Encrypted</span>
                <span className="text-[9px] lg:text-[12px] text-[#4b5563] font-medium mt-0 lg:mt-1 hidden sm:block">Law enforcement grade</span>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:items-start lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-[10px] bg-purple-100/80 flex items-center justify-center shrink-0 border border-purple-200/60">
                <Lock className="w-4 h-4 lg:w-5 lg:h-5 text-purple-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] lg:text-sm font-bold text-[#1e2a52] leading-tight">Zero Data Leak</span>
                <span className="text-[9px] lg:text-[12px] text-[#4b5563] font-medium mt-0 lg:mt-1 hidden sm:block">Confidential & audited</span>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:items-start lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-[10px] bg-blue-100/80 flex items-center justify-center shrink-0 border border-blue-200/60">
                <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-blue-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] lg:text-sm font-bold text-[#1e2a52] leading-tight">Real-Time Analytics</span>
                <span className="text-[9px] lg:text-[12px] text-[#4b5563] font-medium mt-0 lg:mt-1 hidden sm:block">Instant record correlation</span>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:items-start lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-[10px] bg-teal-100/80 flex items-center justify-center shrink-0 border border-teal-200/60">
                <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-teal-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] lg:text-sm font-bold text-[#1e2a52] leading-tight">Unified Hub</span>
                <span className="text-[9px] lg:text-[12px] text-[#4b5563] font-medium mt-0 lg:mt-1 hidden sm:block">Multi-agency intelligence</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Left (Date/Time) | Center (Copyright) | Right (Feedback & Help) */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 lg:pt-14 pb-2 gap-4 text-xs sm:text-sm text-[#4b5563] font-medium">

          {/* Left Side: Live Date & Time Badge */}
          <div className="flex items-center gap-2 bg-[#bcdcfa]/60 hover:bg-[#b0d8fc]/80 border border-[#9ecaf7] rounded-lg px-3 py-1.5 text-[#1e2a52] text-xs sm:text-[13px] font-medium transition-colors shadow-2xs">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1e2a52] shrink-0" />
            <span>{formatDate(time)}</span>
            <span className="text-[#1e2a52]/50 font-bold px-0.5">·</span>
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1e2a52] shrink-0 ml-0.5" />
            <span className="font-mono tracking-tight">{formatTime(time)}</span>
          </div>

          {/* Center: Made with ❤️ & Copyright */}
          <div className="flex flex-col items-center justify-center text-center gap-0.5">
            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-[13px]">
              Made with <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 shrink-0 inline" /> for {audience}
            </div>
            <div className="font-bold text-[#1e2a52] text-xs sm:text-[13px]">
              © 2026 {pageName}
            </div>
          </div>

          {/* Right Side: Feedback & Help Pill Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onSelectLink && onSelectLink('Feedback')}
              className="flex items-center gap-1.5 bg-[#bcdcfa]/60 hover:bg-[#a9d3fc] border border-[#9ecaf7] text-[#1e2a52] px-3.5 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1e2a52]" />
              <span>Feedback</span>
            </button>
            <button
              onClick={() => onSelectLink && onSelectLink('Help')}
              className="flex items-center gap-1.5 bg-[#bcdcfa]/60 hover:bg-[#a9d3fc] border border-[#9ecaf7] text-[#1e2a52] px-3.5 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1e2a52]" />
              <span>Help</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
