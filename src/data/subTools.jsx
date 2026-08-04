import React from 'react';
import { Users, UserCheck, MessageCircle, Share2, Camera, Hash, Briefcase, Send, MessageSquare, Smartphone, PlaySquare, Globe, Heart, PhoneCall, AtSign, FileText, Video, Train, Activity, Key, Shield, FileSignature, MapPin, Car, TrendingUp, GitMerge, Clock, Grid, AlertTriangle, BarChart, FileCheck, Book, Scale, Gavel, Landmark, FileSearch, AlertCircle, Bookmark, Scroll, Search, Folder, Database, Lock, Info, BookOpen, Flame, Plane, CreditCard, ShoppingCart, Baby, Building2, Award, Rocket, Copyright, Lightbulb, Ship, Utensils, Pill, Factory, Store, Wine, PiggyBank, Layers, Handshake, ScanLine, Wind, CheckCircle, Fuel, Home, Target, Shuffle, Filter, Scissors, Map, ClipboardList, LineChart, Calendar, UserPlus, UserMinus, UserX, Moon, History, PlayCircle, Network, SplitSquareHorizontal, ShieldAlert, MonitorPlay } from 'lucide-react';

export const SMI_TOOLS = [

  { parentId: 'SMI', id: 'ci', name: 'CI', desc: 'Contact Intelligence - Extract and analyze contact lists and phonebooks across platforms.', icon: (p) => <Users {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'SMI', id: 'pi', name: 'PI', desc: 'Profile Intelligence - Cross-reference user profiles and avatars across multiple social networks.', icon: (p) => <UserCheck {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'SMI', id: 'cri', name: 'CRI', desc: 'Communication Registration Intelligence - Monitor public chat rooms, group interactions and community forums.', icon: (p) => <MessageCircle {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'SMI', id: 'fbpi', name: 'FBPI', desc: 'Facebook Platform Intelligence - Analyze Facebook timelines, friend lists, and public interactions.', icon: (p) => <Share2 {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'SMI', id: 'igi', name: 'IGI', desc: 'Instagram Intelligence - Track Instagram posts, followers, stories, and engagement metrics.', icon: (p) => <Camera {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'SMI', id: 'xti', name: 'XTI', desc: 'X (Twitter) Intelligence - Monitor tweets, retweets, hashtags, and social sentiment on X.', icon: (p) => <Hash {...p} />, color: 'text-gray-800', bg: 'bg-gray-100' },
  { parentId: 'SMI', id: 'lii', name: 'LII', desc: 'LinkedIn Intelligence - Audit professional networks, employment histories, and company connections.', icon: (p) => <Briefcase {...p} />, color: 'text-blue-700', bg: 'bg-blue-50' },
  { parentId: 'SMI', id: 'tgi', name: 'TGI', desc: 'Telegram Intelligence - Analyze Telegram public channels, group memberships, and forwarded messages.', icon: (p) => <Send {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'SMI', id: 'wai', name: 'WAI', desc: 'WhatsApp Intelligence - Track WhatsApp public groups, broadcast lists, and business profiles.', icon: (p) => <MessageSquare {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { parentId: 'SMI', id: 'sci', name: 'SCI', desc: 'Snapchat Intelligence - Monitor Snapchat public stories, Snap Maps, and user engagement.', icon: (p) => <Smartphone {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { parentId: 'SMI', id: 'yti', name: 'YTI', desc: 'YouTube Intelligence - Analyze YouTube channel statistics, video comments, and subscriber networks.', icon: (p) => <PlaySquare {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'SMI', id: 'gbi', name: 'GBI', desc: 'Google Business Intelligence - Audit code repositories, developer contributions, and issue discussions.', icon: (p) => <Globe {...p} />, color: 'text-gray-900', bg: 'bg-gray-200' },
  { parentId: 'SMI', id: 'pmi', name: 'PMI', desc: 'Payment Intelligence - Track Pinterest boards, saved pins, and visual interest networks.', icon: (p) => <Heart {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'SMI', id: 'shi', name: 'SHI', desc: 'Shopping Intelligence - Monitor regional content, trending topics, and user engagement on Sharechat.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'SMI', id: 'fdi', name: 'FDI', desc: 'Food Delivery Intelligence - Analyze Discord servers, Reddit forums, and community discussions.', icon: (p) => <MessageCircle {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-100' },
  { parentId: 'SMI', id: 'tri', name: 'TRI', desc: 'Travel Intelligence - Verify caller identities, spam reports, and phone directory listings.', icon: (p) => <PhoneCall {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'SMI', id: 'csi', name: 'CSI', desc: 'Cab Service Intelligence - Track activity on community platforms like Quora and Craigslist.', icon: (p) => <Users {...p} />, color: 'text-red-400', bg: 'bg-red-50' },
  { parentId: 'SMI', id: 'sbi', name: 'SBI', desc: 'Subscription Intelligence - Analyze Skype profiles, public directories, and personal blog posts.', icon: (p) => <AtSign {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'SMI', id: 'mdi', name: 'MDI', desc: 'Media Intelligence - Audit Medium articles, author networks, and long-form content platforms.', icon: (p) => <FileText {...p} />, color: 'text-gray-800', bg: 'bg-gray-200' },
  { parentId: 'SMI', id: 'tli', name: 'TLI', desc: 'Timeline Intelligence - Monitor short-form video content, viral trends, and creator analytics.', icon: (p) => <Video {...p} />, color: 'text-black', bg: 'bg-pink-100' }

];

export const RII_TOOLS = [

  { parentId: 'RII', id: 'sii', name: 'SII', desc: 'Station Information Intelligence - Access station infrastructure, logs & staff directories', icon: (p) => <MapPin {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'RII', id: 'tii', name: 'TII', desc: 'Train Information Intelligence - Analyze train manifests, schedules & carriage details', icon: (p) => <Train {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'RII', id: 'pii', name: 'PII', desc: 'Passenger Information Intelligence - Verify passenger identities, ticketing & travel logs', icon: (p) => <UserCheck {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'RII', id: 'tmi', name: 'TMI', desc: 'Train Movement Intelligence - Monitor real-time train tracking, delays & route analytics', icon: (p) => <Activity {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'RII', id: 'smii', name: 'SMII', desc: 'Station Master Information Intelligence - Review station master logs, approvals & incident reports', icon: (p) => <Key {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'RII', id: 'rpfi', name: 'RPFI', desc: 'Railway Protection Force Intelligence - Track RPF deployments, security alerts & criminal records', icon: (p) => <Shield {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'RII', id: 'tei', name: 'TEI', desc: 'Ticket Examiner Intelligence - Audit TTE reports, penalty logs & on-board verification records', icon: (p) => <FileSignature {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'RII', id: 'rlci', name: 'RLCI', desc: 'Railway Level Crossing Intelligence - Analyze level crossing status, gate logs & traffic data', icon: (p) => <FileText {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' }

];

export const TGRI_TOOLS = [

  { parentId: 'TGRI', id: 'tti', name: 'TTI', desc: 'Toll Transaction Intelligence - Analyze toll gate transactions, fee collections & payment histories', icon: (p) => <FileText {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'TGRI', id: 'vi', name: 'VI', desc: 'Vehicle Intelligence - Monitor vehicle classifications, registration details & crossing patterns', icon: (p) => <Car {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'TGRI', id: 'fti', name: 'FTI', desc: 'FASTag Intelligence - Track electronic toll collections, RFID tags & account balances', icon: (p) => <Activity {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'TGRI', id: 'tpi', name: 'TPI', desc: 'Toll Plaza Intelligence - Review plaza operations, camera logs & infrastructure data', icon: (p) => <MapPin {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'TGRI', id: 'mi', name: 'MI', desc: 'Movement Intelligence - Analyze vehicle movement logs, crossing frequencies & timestamps', icon: (p) => <TrendingUp {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'TGRI', id: 'ri', name: 'RI', desc: 'Route Intelligence - Map toll trajectories, entry-exit points & travel durations', icon: (p) => <GitMerge {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'TGRI', id: 'tli', name: 'TLI', desc: 'Timeline Intelligence - Correlate toll passings over chronological timelines & historical data', icon: (p) => <Clock {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'TGRI', id: 'pi', name: 'PI', desc: 'Pattern Intelligence - Identify travel routines, recurring routes & behavioral patterns', icon: (p) => <Grid {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'TGRI', id: 'rki', name: 'RKI', desc: 'Risk Intelligence - Detect anomalies, blacklisted vehicles & potential security threats', icon: (p) => <AlertTriangle {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'TGRI', id: 'rli', name: 'RLI', desc: 'Relationship Intelligence - Discover convoy patterns, co-travelers & associated vehicles', icon: (p) => <Users {...p} />, color: 'text-pink-600', bg: 'bg-pink-100' },
  { parentId: 'TGRI', id: 'ai', name: 'AI', desc: 'Analytics Intelligence - Access comprehensive toll data reports, traffic flow & insights', icon: (p) => <BarChart {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'TGRI', id: 'io', name: 'IO', desc: 'Investigation Output - Generate consolidated case reports, evidence files & query results', icon: (p) => <FileCheck {...p} />, color: 'text-gray-600', bg: 'bg-gray-100' }

];

export const LIH_TOOLS = [

  { parentId: 'LIH', id: 'bnsi', name: 'BNSI', desc: 'Bharatiya Nyaya Sanhita Intelligence - Access provisions and analytics.', icon: (p) => <Book {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'LIH', id: 'bnssi', name: 'BNSSI', desc: 'Bharatiya Nagarik Suraksha Sanhita Intelligence - Explore procedures and codes.', icon: (p) => <Scale {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'LIH', id: 'bsai', name: 'BSAI', desc: 'Bharatiya Sakshya Adhiniyam Intelligence - Evidence laws and records.', icon: (p) => <Shield {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'LIH', id: 'ipci', name: 'IPCI', desc: 'Indian Penal Code Intelligence - Historical penal code references.', icon: (p) => <Gavel {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'LIH', id: 'crpci', name: 'CrPCI', desc: 'Code of Criminal Procedure Intelligence - Procedural law records.', icon: (p) => <Landmark {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'LIH', id: 'ieai', name: 'IEAI', desc: 'Indian Evidence Act Intelligence - Archive of evidence laws.', icon: (p) => <FileSearch {...p} />, color: 'text-gray-800', bg: 'bg-gray-100' },
  { parentId: 'LIH', id: 'ldi', name: 'LDI', desc: 'Legal Dictionary Intelligence - Analyze and manage legal documents.', icon: (p) => <FileText {...p} />, color: 'text-blue-700', bg: 'bg-blue-50' },
  { parentId: 'LIH', id: 'lari', name: 'LARI', desc: 'Legal Acts & Rules Intelligence - AI-driven legal research.', icon: (p) => <Search {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'LIH', id: 'sli', name: 'SLI', desc: 'Specialized Laws Intelligence - Search through statutory provisions.', icon: (p) => <Scroll {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { parentId: 'LIH', id: 'lffi', name: 'LFFI', desc: 'Legal Forms & Formats Intelligence - Filing guidelines and frameworks.', icon: (p) => <Folder {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { parentId: 'LIH', id: 'lji', name: 'LJI', desc: 'Legal Judgments Intelligence - Access historical and recent judgments.', icon: (p) => <Gavel {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'LIH', id: 'lcni', name: 'LCNI', desc: 'Legal Circulars & Notifications Intelligence - Map relationships between cases.', icon: (p) => <Database {...p} />, color: 'text-gray-900', bg: 'bg-gray-200' },
  { parentId: 'LIH', id: 'pmsi', name: 'PMSI', desc: 'Police Manuals & SOP Intelligence - Inmate and prison records.', icon: (p) => <Lock {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'LIH', id: 'lti', name: 'LTI', desc: 'Legal Templates Intelligence - Emerging technologies in the legal sector.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'LIH', id: 'cri', name: 'CRI', desc: 'Court Rules Intelligence - Search and analyze criminal histories.', icon: (p) => <AlertCircle {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-100' },
  { parentId: 'LIH', id: 'igi', name: 'IGI', desc: 'Investigation Guidelines Intelligence - Tools for digital forensics.', icon: (p) => <Search {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'LIH', id: 'goi', name: 'GOI', desc: 'Government Orders Intelligence - Analyze official orders and gazettes.', icon: (p) => <Bookmark {...p} />, color: 'text-red-400', bg: 'bg-red-50' },
  { parentId: 'LIH', id: 'lai', name: 'LAI', desc: 'Legal Amendment Intelligence - AI assistance for legal opinions.', icon: (p) => <Users {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'LIH', id: 'ldri', name: 'LDRI', desc: 'Legal Drafting Intelligence - Alternative dispute tracking.', icon: (p) => <Briefcase {...p} />, color: 'text-gray-800', bg: 'bg-gray-200' },
  { parentId: 'LIH', id: 'csi', name: 'CSI', desc: 'Case Study Intelligence - Analytics for crime scene investigations.', icon: (p) => <Info {...p} />, color: 'text-black', bg: 'bg-pink-100' }

];

export const KYC_TOOLS = [

  { parentId: 'KYCDI', id: 'ebi', name: 'EBI', desc: 'Electricity Bill Intelligence - Analyze voter profiles, constituency logs & election fraud detection', icon: (p) => <Landmark {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'KYCDI', id: 'lpgri', name: 'LPGRI', desc: 'LPG Record Intelligence - Monitor gas subsidy records, consumer logs & distribution audits', icon: (p) => <Flame {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'KYCDI', id: 'pim', name: 'PIM', desc: 'Passport Intelligence Module - Track passport issuance, travel logs & visa immigration history', icon: (p) => <Plane {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'KYCDI', id: 'pani', name: 'PANI', desc: 'PAN Intelligence - Verify PAN details, tax defaults & linked corporate entities', icon: (p) => <CreditCard {...p} />, color: 'text-green-600', bg: 'bg-green-100' },
  { parentId: 'KYCDI', id: 'vii', name: 'VII', desc: 'Voter ID Intelligence - Audit voter ID registrations, duplicate records & electoral rolls', icon: (p) => <UserCheck {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'KYCDI', id: 'rci', name: 'RCI', desc: 'Residence Certificate Intelligence - Verify ration card benefits, family trees & civil supplies logs', icon: (p) => <ShoppingCart {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'KYCDI', id: 'bci', name: 'BCI', desc: 'Birth Certificate Intelligence - Access municipal birth records, parentage audits & registry logs', icon: (p) => <Baby {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'KYCDI', id: 'cci', name: 'CCI', desc: 'Caste Certificate Intelligence - Validate caste certificate issuance, validity & reservation benefits', icon: (p) => <FileText {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },

];

export const GHLRI_TOOLS = [

  { parentId: 'GHLRI', id: 'ghi', name: 'GHI', desc: 'Guest History Intelligence - Analyze guest check-in histories, logs & travel records', icon: (p) => <Users {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'GHLRI', id: 'ghlri', name: 'GHLRI', desc: 'Guest House & Lodge Registration Intelligence - Verify lodge registrations, ownership & compliance', icon: (p) => <FileCheck {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'GHLRI', id: 'bil', name: 'BIL', desc: 'BAR Information List - Access and manage BAR information logs.', icon: (p) => <Wine {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'GHLRI', id: 'ril', name: 'RIL', desc: 'Restaurant Information List - Review restaurant data and logs.', icon: (p) => <Utensils {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' }

];

export const CRI_TOOLS = [

  { parentId: 'CRI', id: 'mcai', name: 'MCAI', desc: 'Ministry of Corporate Affairs Record Intelligence - Audit corporate records, DIN lookups & company filings', icon: (p) => <Building2 {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'CRI', id: 'gstri', name: 'GSTRI', desc: 'Goods and Services Tax Record Intelligence - Track GST returns, tax defaults & compliance audits', icon: (p) => <FileText {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'CRI', id: 'isori', name: 'ISORI', desc: 'ISO Registration Intelligence - Verify ISO certifications, validity & standards compliance', icon: (p) => <Award {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'CRI', id: 'sri', name: 'SRI', desc: 'Society Registration Intelligence - Monitor registered startups, DPIIT recognition & funding', icon: (p) => <Rocket {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'CRI', id: 'tri', name: 'TRI', desc: 'Trust Registration Intelligence - Search trademark registries, IP filings & status', icon: (p) => <Copyright {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'CRI', id: '12ari', name: '12ARI', desc: '12A Registration Intelligence - Audit NGO tax exemptions & trust compliance', icon: (p) => <FileCheck {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'CRI', id: '80gri', name: '80GRI', desc: '80G Registration Intelligence - Track tax deduction certificates for charitable organizations', icon: (p) => <Heart {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'CRI', id: 'uri', name: 'URI', desc: 'Udyam Registration Intelligence - Verify MSME registrations & micro-enterprise credentials', icon: (p) => <Briefcase {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'CRI', id: 'siri', name: 'SIRI', desc: 'Startup India Registration Intelligence - Validate Startup India portal credentials & benefits', icon: (p) => <Lightbulb {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { parentId: 'CRI', id: 'ieci', name: 'IECI', desc: 'Import Export Code Registration Intelligence - Monitor trade licenses, export codes & cross-border trade logs', icon: (p) => <Ship {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'CRI', id: 'fssaii', name: 'FSSAII', desc: 'Food Safety and Standards Authority of India Registration Intelligence - Track food safety licenses, hygiene audits & vendor compliance', icon: (p) => <Utensils {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { parentId: 'CRI', id: 'dli', name: 'DLI', desc: 'Drug License Registration Intelligence - Audit pharmaceutical licenses, distribution channels & pharmacy logs', icon: (p) => <Pill {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'CRI', id: 'fli', name: 'FLI', desc: 'Factory License Registration Intelligence - Verify manufacturing licenses, plant compliance & industrial permits', icon: (p) => <Factory {...p} />, color: 'text-slate-600', bg: 'bg-slate-100' },
  { parentId: 'CRI', id: 'tli', name: 'TLI', desc: 'Trade License Registration Intelligence - Track local trade permits, municipal licenses & commercial registries', icon: (p) => <Store {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'CRI', id: 'seri', name: 'SERI', desc: 'Shop & Establishment Registration Intelligence - Monitor liquor licenses, excise duties & state tax compliance', icon: (p) => <Wine {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'CRI', id: 'fcrai', name: 'FCRAI', desc: 'Foreign Contribution Regulation Act Registration Intelligence - Track foreign donations, NGO funding & FCRA accounts', icon: (p) => <Globe {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'CRI', id: 'pani', name: 'PANI', desc: 'Permanent Account Number Registration Intelligence - Verify Permanent Account Numbers, associated entities & tax histories', icon: (p) => <CreditCard {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'CRI', id: 'tani', name: 'TANI', desc: 'Tax Deduction and Collection Account Number Registration Intelligence - Audit Tax Deduction and Collection Account Numbers & TDS compliance', icon: (p) => <CreditCard {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'CRI', id: 'epfoi', name: 'EPFOI', desc: 'Employees\' Provident Fund Organisation Registration Intelligence - Track EPF contributions, establishment codes & payroll data', icon: (p) => <PiggyBank {...p} />, color: 'text-blue-400', bg: 'bg-blue-50' },
  { parentId: 'CRI', id: 'esici', name: 'ESICI', desc: 'Employees\' State Insurance Corporation Registration Intelligence - Monitor ESIC registrations, employee health insurance & factory compliance', icon: (p) => <Activity {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'CRI', id: 'nsici', name: 'NSICI', desc: 'National Small Industries Corporation Registration Intelligence - Verify NSIC certificates, government procurement & MSME benefits', icon: (p) => <Layers {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'CRI', id: 'gemri', name: 'GeMRI', desc: 'Government e-Marketplace Registration Intelligence - Track GeM portal vendors, procurement bids & supplier ratings', icon: (p) => <ShoppingCart {...p} />, color: 'text-orange-400', bg: 'bg-orange-50' },
  { parentId: 'CRI', id: 'ngodi', name: 'NGODI', desc: 'NGO DARPAN Registration Intelligence - Verify NITI Aayog NGO Darpan IDs, trust deeds & government grants', icon: (p) => <Users {...p} />, color: 'text-green-600', bg: 'bg-green-100' },
  { parentId: 'CRI', id: 'csr1i', name: 'CSR1I', desc: 'Corporate Social Responsibility (CSR-1) Registration Intelligence - Monitor Corporate Social Responsibility filings & approved implementing agencies', icon: (p) => <Handshake {...p} />, color: 'text-rose-400', bg: 'bg-rose-50' },
  { parentId: 'CRI', id: 'tmri', name: 'TMRI', desc: 'Trademark Registration Intelligence - Monitor trademark portfolios, IP infringement & brand registries', icon: (p) => <ScanLine {...p} />, color: 'text-purple-400', bg: 'bg-purple-50' },
  { parentId: 'CRI', id: 'fnoci', name: 'FNOCI', desc: 'Fire No Objection Certificate Registration Intelligence - Track Fire Department No Objection Certificates & building safety audits', icon: (p) => <Flame {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'CRI', id: 'pcbi', name: 'PCBI', desc: 'Pollution Control Board Registration Intelligence - Verify environmental clearances, emission logs & PCB consents', icon: (p) => <Wind {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'CRI', id: 'bisi', name: 'BISI', desc: 'Bureau of Indian Standards Registration Intelligence - Track BIS certifications, ISI marks & product quality standards', icon: (p) => <CheckCircle {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'CRI', id: 'pesoi', name: 'PESOI', desc: 'Petroleum and Explosives Safety Organisation License Registration Intelligence - Audit explosive licenses, petroleum storage & hazardous material transport', icon: (p) => <Fuel {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { parentId: 'CRI', id: 'lmri', name: 'LMRI', desc: 'Legal Metrology Registration Intelligence - Monitor weights & measures licenses, packaging compliance & LMPC certificates', icon: (p) => <Scale {...p} />, color: 'text-slate-500', bg: 'bg-slate-100' },
  { parentId: 'CRI', id: 'ceri', name: 'CERI', desc: 'Clinical Establishment Registration Intelligence - Track customs broker licenses, bonded warehouses & ICEGATE registrations', icon: (p) => <Ship {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'CRI', id: 'rerai', name: 'RERAI', desc: 'Real Estate Regulatory Authority Registration Intelligence - Verify RERA project registrations, builder compliance & real estate agent logs', icon: (p) => <Home {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' }

];

export const BSAR_TOOLS = [
  { parentId: 'BSAR', id: 'us', name: 'US', desc: 'Upload Statement - Upload and process bank statement files.', icon: (p) => <FileText {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'BSAR', id: 'var', name: 'VAR', desc: 'View Analysis Report - View detailed analytics and transaction reports.', icon: (p) => <BarChart {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'BSAR', id: 'rh', name: 'RH', desc: 'Report History - Access historical bank statement reports.', icon: (p) => <Clock {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'BSAR', id: 'rm', name: 'RM', desc: 'Report Management - Manage and organize generated reports.', icon: (p) => <Folder {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' }
];

export const PRI_TOOLS = [
  { parentId: 'PRI', id: 'phi', name: 'PHI', desc: 'Prisoner History Intelligence - Monitor and track prisoner details.', icon: (p) => <Users {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'PRI', id: 'jhi', name: 'JHI', desc: 'Jail History Intelligence - Manage jail records and intelligence.', icon: (p) => <Database {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'PRI', id: 'demo1', name: 'PrisonDEMO1', desc: 'Prison DEMO 1 - Coming soon.', icon: (p) => <PlayCircle {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'PRI', id: 'demo2', name: 'PrisonDEMO2', desc: 'Prison DEMO 2 - Coming soon.', icon: (p) => <PlayCircle {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' }
];

export const LRI_TOOLS = [
  { parentId: 'LRI', id: 'sfh', name: 'SFH', desc: 'Search Flat History - Verify flat ownership and transaction logs.', icon: (p) => <Home {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'LRI', id: 'sah', name: 'SAH', desc: 'Search Apartment History - Analyze apartment records and history.', icon: (p) => <Building2 {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'LRI', id: 'sbh', name: 'SBH', desc: 'Search Builder History - Review builder projects and credibility.', icon: (p) => <Briefcase {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'LRI', id: 'sth', name: 'STH', desc: 'Search Tenant History - Check tenant backgrounds and leases.', icon: (p) => <Users {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'LRI', id: 'slh', name: 'SLH', desc: 'Search Land History - Verify land registry and past transfers.', icon: (p) => <MapPin {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'LRI', id: 'ssh', name: 'SSH', desc: 'Search Society History - Access housing society registration records.', icon: (p) => <Landmark {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' }
];

export const ERI_TOOLS = [
  { parentId: 'ERI', id: 'sir', name: 'SIR', desc: 'Student Information Record - Access student details and history.', icon: (p) => <UserCheck {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'ERI', id: 'cri_cert', name: 'CRI', desc: 'Certificate Record Intelligence - Verify educational certificates and degrees.', icon: (p) => <FileCheck {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'ERI', id: 'cri_coll', name: 'CRI', desc: 'College Record Intelligence - Monitor college data and registrations.', icon: (p) => <Building2 {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'ERI', id: 'uri', name: 'URI', desc: 'University Record Intelligence - Analyze university affiliations and records.', icon: (p) => <Landmark {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'ERI', id: 'iri', name: 'IRI', desc: 'Institute Record Intelligence - Track private institutes and academies.', icon: (p) => <Briefcase {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'ERI', id: 'otri', name: 'OTRI', desc: 'Online Tutorial Record Intelligence - Track online tutorials and ed-tech platforms.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'ERI', id: 'hri', name: 'HRI', desc: 'Hostel Record Intelligence - Review hostel accommodations and logs.', icon: (p) => <Home {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'ERI', id: 'sri', name: 'SRI', desc: 'School Record Intelligence - Verify school affiliations and student histories.', icon: (p) => <BookOpen {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' }
];

export const PSRI_TOOLS = [
  { parentId: 'PSRI', id: 'psl', name: 'PSL', desc: 'Police Station List - Access logs and records of local police stations.', icon: (p) => <Shield {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'PSRI', id: 'cpsl', name: 'CPSL', desc: 'Cyber Police Station List - Cyber crime reporting and analytics.', icon: (p) => <Smartphone {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'PSRI', id: 'tpsl', name: 'TPSL', desc: 'Traffic Police Station List - Traffic incident records and station details.', icon: (p) => <Car {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'PSRI', id: 'pol', name: 'POL', desc: 'Police Outpost List - Monitor and access outpost jurisdictions.', icon: (p) => <MapPin {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'PSRI', id: 'spol', name: 'SPOL', desc: 'Superintendent of Police Office List - SP office records and district communications.', icon: (p) => <Users {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'PSRI', id: 'cbol', name: 'CBOL', desc: 'Crime Branch Office List - Intelligence and crime branch directories.', icon: (p) => <Briefcase {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'PSRI', id: 'vol', name: 'VOL', desc: 'Vigilance Office List - Anti-corruption and vigilance records.', icon: (p) => <Search {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'PSRI', id: 'eowol', name: 'EOWOL', desc: 'Economic Offences Wing Office List - Financial crime investigation offices.', icon: (p) => <BarChart {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'PSRI', id: 'cbiol', name: 'CBIOL', desc: 'Central Bureau of Investigation Office List - Federal investigation agency records.', icon: (p) => <Landmark {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'PSRI', id: 'edol', name: 'EDOL', desc: 'Enforcement Directorate Office List - Economic laws and intelligence directories.', icon: (p) => <Scale {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'PSRI', id: 'ibol', name: 'IBOL', desc: 'Intelligence Bureau Office List - Intelligence operations and bureau records.', icon: (p) => <ScanLine {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'PSRI', id: 'niaol', name: 'NIAOL', desc: 'National Investigation Agency Office List - Counter-terrorism and national investigations.', icon: (p) => <Globe {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'PSRI', id: 'ncbol', name: 'NCBOL', desc: 'Narcotics Control Bureau Office List - Drug enforcement and narcotics intelligence.', icon: (p) => <Pill {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-50' },
  { parentId: 'PSRI', id: 'driol', name: 'DRIOL', desc: 'Directorate of Revenue Intelligence Office List - Revenue and tax enforcement operations.', icon: (p) => <CreditCard {...p} />, color: 'text-emerald-400', bg: 'bg-emerald-50' },
  { parentId: 'PSRI', id: 'sfiol', name: 'SFIOL', desc: 'Serious Fraud Investigation Office List - Corporate fraud investigations and records.', icon: (p) => <FileSearch {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'PSRI', id: 'cvcol', name: 'CVCOL', desc: 'Central Vigilance Commission Office List - Central vigilance and compliance monitoring.', icon: (p) => <CheckCircle {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'PSRI', id: 'cfsll', name: 'CFSLL', desc: 'Central Forensic Science Laboratory List - Central forensic laboratories and analysis.', icon: (p) => <Database {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'PSRI', id: 'sfsll', name: 'SFSLL', desc: 'State Forensic Science Laboratory List - State-level forensic records and labs.', icon: (p) => <Activity {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'PSRI', id: 'cri_case', name: 'CRI', desc: 'Case Record Intelligence - Detailed case intelligence and reporting.', icon: (p) => <FileText {...p} />, color: 'text-pink-600', bg: 'bg-pink-100' },
  { parentId: 'PSRI', id: 'cmri', name: 'CMRI', desc: 'Criminal Record Intelligence - Monitor and track criminal records globally.', icon: (p) => <Users {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' }
];

export const CORI_TOOLS = [
  { parentId: 'CoRI', id: 'sci', name: 'SCI', desc: 'Supreme Court Information - Apex court records and judgments.', icon: (p) => <Scale {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'CoRI', id: 'hci', name: 'HCI', desc: 'High Court Information - State-level high court records and updates.', icon: (p) => <Landmark {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'CoRI', id: 'dci', name: 'DCI', desc: 'District Court Information - District-level judicial records.', icon: (p) => <Building2 {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'CoRI', id: 'fci', name: 'FCI', desc: 'Family Court Information - Matrimonial and family dispute records.', icon: (p) => <Users {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'CoRI', id: 'cci', name: 'CCI', desc: 'Civil Court Information - Civil case and litigation records.', icon: (p) => <Briefcase {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'CoRI', id: 'crci', name: 'CrCI', desc: 'Criminal Court Information - Criminal trial and conviction records.', icon: (p) => <Shield {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'CoRI', id: 'comci', name: 'ComCI', desc: 'Commercial Court Information - Business and commercial disputes.', icon: (p) => <TrendingUp {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'CoRI', id: 'conci', name: 'ConCI', desc: 'Consumer Court Information - Consumer rights and grievances records.', icon: (p) => <ShoppingCart {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'CoRI', id: 'spci', name: 'SpCI', desc: 'Special Court Information - Special tribunals and designated court proceedings.', icon: (p) => <AlertCircle {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'CoRI', id: 'ti', name: 'TI', desc: 'Tribunal Information - Statutory tribunal records and judgments.', icon: (p) => <FileSignature {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'CoRI', id: 'ftci', name: 'FTCI', desc: 'Fast Track Court Information - Fast track proceedings and rapid judgments.', icon: (p) => <Clock {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'CoRI', id: 'lai', name: 'LAI', desc: 'Lok Adalat Information - Alternative dispute resolution records.', icon: (p) => <Handshake {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'CoRI', id: 'gni', name: 'GNI', desc: 'Gram Nyayalaya Information - Rural court records and local governance disputes.', icon: (p) => <Home {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-50' },
  { parentId: 'CoRI', id: 'cpxi', name: 'CpxI', desc: 'Court Complex Information - Details of integrated court complexes.', icon: (p) => <Building2 {...p} />, color: 'text-emerald-400', bg: 'bg-emerald-50' },
  { parentId: 'CoRI', id: 'col', name: 'COL', desc: 'Collector Office List - District collector administrative records.', icon: (p) => <MapPin {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'CoRI', id: 'scol', name: 'SCOL', desc: 'Sub-Collector Office List - Sub-divisional administration records.', icon: (p) => <MapPin {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'CoRI', id: 'tol', name: 'TOL', desc: 'Tahasildar OfficeList - Revenue and local administration records.', icon: (p) => <MapPin {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'CoRI', id: 'bdol', name: 'BDOL', desc: 'Block Development Office List - Block-level administration and funding records.', icon: (p) => <MapPin {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'CoRI', id: 'riol', name: 'RIOL', desc: 'Revenue Inspector Office List - Revenue inspection and land records.', icon: (p) => <Search {...p} />, color: 'text-pink-600', bg: 'bg-pink-100' },
  { parentId: 'CoRI', id: 'rcol', name: 'RCOL', desc: 'Revenue Circle Office List - Revenue circle and division management.', icon: (p) => <Target {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' },
  { parentId: 'CoRI', id: 'gpol', name: 'GPOL', desc: 'Gram Panchayat Office List - Village-level local self-government records.', icon: (p) => <MapPin {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'CoRI', id: 'psol', name: 'PSOL', desc: 'Panchayat Samiti Office List - Block-level panchayat administration records.', icon: (p) => <MapPin {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'CoRI', id: 'zpol', name: 'ZPOL', desc: 'Zilla Parishad Office List - District-level panchayat administration and development.', icon: (p) => <MapPin {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'CoRI', id: 'mol', name: 'MOL', desc: 'Municipality Office List - Urban municipal body records and services.', icon: (p) => <Building2 {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'CoRI', id: 'mcol', name: 'MCOL', desc: 'Municipal Corporation Office List - Metropolitan municipal body records and services.', icon: (p) => <Building2 {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'CoRI', id: 'nacol', name: 'NACOL', desc: 'Notified Area Council Office List - Transitional urban area administrative records.', icon: (p) => <Building2 {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'CoRI', id: 'drdaol', name: 'DRDAOL', desc: 'District Rural Development Agency Office List - Rural development program monitoring.', icon: (p) => <Users {...p} />, color: 'text-pink-600', bg: 'bg-pink-100' },
  { parentId: 'CoRI', id: 'srol', name: 'SROL', desc: 'Sub-Registrar Office List - Property and marriage registration records.', icon: (p) => <FileSignature {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' }
];

export const PPRI_TOOLS = [
  { parentId: 'PPRI', id: 'ppl', name: 'PPL', desc: 'Petrol Pump List - comprehensive database of registered petrol pumps.', icon: (p) => <Fuel {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'PPRI', id: 'ppri', name: 'PPRI', desc: 'Petrol Pump Registration Information - owner and license details.', icon: (p) => <FileText {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'PPRI', id: 'rppi', name: 'RPPI', desc: 'Route Petrol Pump Intelligence - map and analyze fuel stations along a route.', icon: (p) => <MapPin {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { parentId: 'PPRI', id: 'pprid', name: 'PPRID', desc: 'PPRI Demo - Interactive demonstration of fuel analytics.', icon: (p) => <PlaySquare {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' }
];

export const ILD_TOOLS = [
  { parentId: 'ILD', id: 'imp', name: 'Import', desc: 'Import international long distance call records.', icon: (p) => <Database {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'ILD', id: 'gr', name: 'General Report', desc: 'View summary of long distance communications.', icon: (p) => <FileText {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'ILD', id: 'mr', name: 'Mapping Report', desc: 'Analyze geographical mapping of international calls.', icon: (p) => <Map {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'ILD', id: 'ar', name: 'Analysis Report', desc: 'Detailed analytics of call patterns and durations.', icon: (p) => <LineChart {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'ILD', id: 'mc', name: 'Mixed Calls', desc: 'Analyze interleaved domestic and international traffic.', icon: (p) => <Shuffle {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'ILD', id: 'nn', name: 'New Numbers', desc: 'Identify newly activated international numbers.', icon: (p) => <UserPlus {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'ILD', id: 'cn', name: 'Common Numbers', desc: 'Identify frequently contacted international numbers.', icon: (p) => <Users {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'ILD', id: 'cwsm', name: 'Compare with Suspect', desc: 'Cross reference with watchlists.', icon: (p) => <UserX {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'ILD', id: 'ildd1', name: 'ILD-DEMO_1', desc: 'ILD Demo 1 - Interactive demonstration module 1.', icon: (p) => <PlayCircle {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'ILD', id: 'ildd2', name: 'ILD-DEMO_2', desc: 'ILD Demo 2 - Interactive demonstration module 2.', icon: (p) => <PlayCircle {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'ILD', id: 'ildd3', name: 'ILD-DEMO_3', desc: 'ILD Demo 3 - Interactive demonstration module 3.', icon: (p) => <PlayCircle {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'ILD', id: 'ildd4', name: 'ILD-DEMO_4', desc: 'ILD Demo 4 - Interactive demonstration module 4.', icon: (p) => <PlayCircle {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' }
];

export const TDR_TOOLS = [
  { parentId: 'TDR', id: 'imp', name: 'Import', desc: 'Import tower dump records.', icon: (p) => <Database {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'TDR', id: 'df', name: 'Dynamic Filters', desc: 'Apply dynamic filters to narrow down search criteria.', icon: (p) => <Filter {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'TDR', id: 'sum', name: 'Summary', desc: 'View summary of tower dump records.', icon: (p) => <ClipboardList {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'TDR', id: 'cn', name: 'Common Numbers', desc: 'Identify common numbers across multiple dumps.', icon: (p) => <Users {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'TDR', id: 'ucmmin', name: 'Un-Common / Missing Mobile / IMEI Numbers', desc: 'Identify missing or uncommon devices.', icon: (p) => <UserMinus {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'TDR', id: 'aucmin', name: 'Advanced Un-Common Mobile / IMEI Numbers', desc: 'Advanced analytics for uncommon devices.', icon: (p) => <UserMinus {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'TDR', id: 'sa', name: 'Split Analysis', desc: 'Perform split analysis on cellular data.', icon: (p) => <Scissors {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'TDR', id: 'cwsmicg', name: 'Compare with Suspect Mobile No. / IMEI / Cell IDs Group', desc: 'Cross-reference with known suspect entities.', icon: (p) => <UserX {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'TDR', id: 'nabtc', name: 'Numbers Activated Before the Crime (Result Based on SDR)', desc: 'Identify newly activated numbers before an incident.', icon: (p) => <Clock {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'TDR', id: 'tdrd1', name: 'TDR-DEMO_1', desc: 'Interactive demonstration module 1.', icon: (p) => <PlayCircle {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'TDR', id: 'tdrd2', name: 'TDR-DEMO_2', desc: 'Interactive demonstration module 2.', icon: (p) => <PlayCircle {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'TDR', id: 'tdrd3', name: 'TDR-DEMO_3', desc: 'Interactive demonstration module 3.', icon: (p) => <PlayCircle {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'TDR', id: 'tdrd4', name: 'TDR-DEMO_4', desc: 'Interactive demonstration module 4.', icon: (p) => <PlayCircle {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'TDR', id: 'tdrd5', name: 'TDR-DEMO_5', desc: 'Interactive demonstration module 5.', icon: (p) => <PlayCircle {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'TDR', id: 'tdrd6', name: 'TDR-DEMO_6', desc: 'Interactive demonstration module 6.', icon: (p) => <PlayCircle {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'TDR', id: 'tdrd7', name: 'TDR-DEMO_7', desc: 'Interactive demonstration module 7.', icon: (p) => <PlayCircle {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' }
];

export const CDR_TOOLS = [
  { parentId: 'CDR', id: 'icrd', name: 'Input CDR Raw Data', desc: 'Upload and parse raw call records.', icon: (p) => <Database {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'CDR', id: 'gr', name: 'General Report', desc: 'View summary of communication activity.', icon: (p) => <FileText {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'CDR', id: 'mr', name: 'Mapping Report', desc: 'Analyze geographical mapping of calls.', icon: (p) => <Map {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'CDR', id: 'ar', name: 'Analysis Report', desc: 'Detailed analytics of call patterns.', icon: (p) => <LineChart {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'CDR', id: 'pr', name: 'Periodic Report', desc: 'Analyze communications over time periods.', icon: (p) => <Calendar {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'CDR', id: 'adr', name: 'Additional Report', desc: 'Extra insights and custom metrics.', icon: (p) => <FileText {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'CDR', id: 'ga', name: 'Geo Analysis', desc: 'Advanced spatial tracking and visualization.', icon: (p) => <Globe {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'CDR', id: 'mc', name: 'Mixed Calls', desc: 'Analyze cross-network or cross-region traffic.', icon: (p) => <Shuffle {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'CDR', id: 'fsd', name: 'Filter / Split Data', desc: 'Segregate data based on advanced criteria.', icon: (p) => <Filter {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'CDR', id: 'oup', name: 'Off / Unused Period', desc: 'Identify periods of inactivity.', icon: (p) => <Moon {...p} />, color: 'text-slate-500', bg: 'bg-slate-50' },
  { parentId: 'CDR', id: 'nmn', name: 'New / Missing Numbers', desc: 'Identify anomalies in call logs.', icon: (p) => <UserMinus {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'CDR', id: 'cn', name: 'Common Numbers', desc: 'Highlight frequently contacted entities.', icon: (p) => <Users {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'CDR', id: 'cdrtocdrcell', name: 'CDR to CDR Cells (X–Y Axis Reports)', desc: 'Visual intersection metrics.', icon: (p) => <FileText {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'CDR', id: 'cdrtoweripdrild', name: 'CDR, Tower Dump, IPDR & ILD Common Numbers', desc: 'Multi-source correlation.', icon: (p) => <Users {...p} />, color: 'text-lime-500', bg: 'bg-lime-50' },
  { parentId: 'CDR', id: 'crs', name: 'CDR Report Summary', desc: 'Overarching dashboard of call intelligence.', icon: (p) => <ClipboardList {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'CDR', id: 'cwsm', name: 'Compare with Suspect Mobile Numbers / IMEI / Cell IDs Groups', desc: 'Compare with Suspect Mobile Numbers / IMEI / Cell IDs Groups.', icon: (p) => <UserX {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'CDR', id: 'cpa', name: 'CDR Pattern Analysis', desc: 'Behavioral tracking of suspects.', icon: (p) => <TrendingUp {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'CDR', id: 'clma', name: 'CDR Last Month Analysis', desc: '30-day historical overview.', icon: (p) => <Calendar {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'CDR', id: 'csa', name: 'CDR Split Analysis', desc: 'Granular segregation of raw records.', icon: (p) => <Scissors {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'CDR', id: 'cdrd1', name: 'CDR-DEMO_1', desc: 'Interactive demonstration module 1.', icon: (p) => <PlayCircle {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'CDR', id: 'cdrd2', name: 'CDR-DEMO_2', desc: 'Interactive demonstration module 2.', icon: (p) => <PlayCircle {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'CDR', id: 'cdrd3', name: 'CDR-DEMO_3', desc: 'Interactive demonstration module 3.', icon: (p) => <PlayCircle {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'CDR', id: 'cdrd4', name: 'CDR-DEMO_4', desc: 'Interactive demonstration module 4.', icon: (p) => <PlayCircle {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'CDR', id: 'cdrd5', name: 'CDR-DEMO_5', desc: 'Interactive demonstration module 5.', icon: (p) => <PlayCircle {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' }
];

export const IPDR_TOOLS = [
  { parentId: 'IPDR', id: 'imp', name: 'Import', desc: 'Import internet protocol detail records.', icon: (p) => <Database {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'IPDR', id: 'ipdrm', name: 'IPDR Mapping', desc: 'Correlate IP assignments with providers.', icon: (p) => <Map {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'IPDR', id: 'ga', name: 'Geo Analysis', desc: 'Track geographical origins of IP addresses.', icon: (p) => <Globe {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'IPDR', id: 'cmn', name: 'Common Mobile Numbers / IMEI / Cell IDs / Destination IP / Destination Port', desc: 'Identify shared entities and ports across IP records.', icon: (p) => <Users {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'IPDR', id: 'cwsm', name: 'Compare with Suspect Mobile Numbers / IMEI / Cell IDs / Destination IP Group', desc: 'Cross-reference with suspect IP and mobile groups.', icon: (p) => <UserX {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'IPDR', id: 'ibpn', name: 'Identify B Party Numbers', desc: 'Trace secondary contacts.', icon: (p) => <Search {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'IPDR', id: 'ipdrr', name: 'IPDR Requisition', desc: 'Request official logs from ISPs.', icon: (p) => <FileText {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'IPDR', id: 'cwip', name: 'Country-wise IPs', desc: 'Breakdown IP assignments globally.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'IPDR', id: 'umn', name: 'Uncommon / Missing Numbers', desc: 'Detect anomalous IPs or ports.', icon: (p) => <UserMinus {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'IPDR', id: 'sa', name: 'Split Analysis', desc: 'Detailed granular analysis of traffic.', icon: (p) => <Scissors {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'IPDR', id: 'ipdrd1', name: 'IPDR-DEMO_1', desc: 'Interactive demonstration module 1.', icon: (p) => <PlayCircle {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'IPDR', id: 'ipdrd2', name: 'IPDR-DEMO_2', desc: 'Interactive demonstration module 2.', icon: (p) => <PlayCircle {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' }
];

export const ALL_SUB_TOOLS = [
  ...SMI_TOOLS,
  ...RII_TOOLS,
  ...TGRI_TOOLS,
  ...LIH_TOOLS,
  ...KYC_TOOLS,
  ...GHLRI_TOOLS,
  ...CRI_TOOLS,
  ...BSAR_TOOLS,
  ...PRI_TOOLS,
  ...LRI_TOOLS,
  ...ERI_TOOLS,
  ...PSRI_TOOLS,
  ...CORI_TOOLS,
  ...PPRI_TOOLS,
  ...ILD_TOOLS,
  ...TDR_TOOLS,
  ...CDR_TOOLS,
  ...IPDR_TOOLS
];
