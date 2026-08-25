import React from 'react';
import {  Coins, Users, UserCheck, MessageCircle, Share2, Camera, Hash, Briefcase, Send, MessageSquare, Smartphone, PlaySquare, Globe, Heart, PhoneCall, AtSign, FileText, Video, Train, Activity, Key, Shield, FileSignature, MapPin, Car, TrendingUp, GitMerge, Clock, Grid, AlertTriangle, BarChart, FileCheck, Book, Scale, Gavel, Landmark, FileSearch, AlertCircle, Bookmark, Scroll, Search, Folder, Database, Lock, Info, BookOpen, Flame, Plane, CreditCard, ShoppingCart, Baby, Building2, Award, Rocket, Copyright, Lightbulb, Ship, Utensils, Pill, Factory, Store, Wine, PiggyBank, Layers, Handshake, ScanLine, Wind, CheckCircle, Fuel, Home, Target, Shuffle, Filter, Scissors, Map, ClipboardList, LineChart, Calendar, UserPlus, UserMinus, UserX, Moon, History, PlayCircle, Network, SplitSquareHorizontal, ShieldAlert, MonitorPlay , Crosshair, Eye, Flag, Star, Cpu, Brain, Building, Link, ShieldCheck, LifeBuoy, Phone } from "lucide-react";

export const SMI_TOOLS = [

  { parentId: 'SMI', id: 'ci', name: 'Contact Intelligence', fullName: 'Contact Intelligence', desc: 'Extract and analyze contact lists and phonebooks across platforms.', icon: (p) => <Users {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'SMI', id: 'pi', name: 'Cross', fullName: 'Cross', desc: 'reference user profiles and avatars across multiple social networks.', icon: (p) => <UserCheck {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'SMI', id: 'cri', name: 'Communication Registration Intelligence', fullName: 'Communication Registration Intelligence', desc: 'Monitor public chat rooms, group interactions and community forums.', icon: (p) => <MessageCircle {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'SMI', id: 'fbpi', name: 'Facebook Platform Intelligence', fullName: 'Facebook Platform Intelligence', desc: 'Analyze Facebook timelines, friend lists, and public interactions.', icon: (p) => <Share2 {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'SMI', id: 'igi', name: 'Instagram Intelligence', fullName: 'Instagram Intelligence', desc: 'Track Instagram posts, followers, stories, and engagement metrics.', icon: (p) => <Camera {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'SMI', id: 'xti', name: 'X (Twitter) Intelligence', fullName: 'X (Twitter) Intelligence', desc: 'Monitor tweets, retweets, hashtags, and social sentiment on X.', icon: (p) => <Hash {...p} />, color: 'text-gray-800', bg: 'bg-gray-100' },
  { parentId: 'SMI', id: 'lii', name: 'LinkedIn Intelligence', fullName: 'LinkedIn Intelligence', desc: 'Audit professional networks, employment histories, and company connections.', icon: (p) => <Briefcase {...p} />, color: 'text-blue-700', bg: 'bg-blue-50' },
  { parentId: 'SMI', id: 'tgi', name: 'Telegram Intelligence', fullName: 'Telegram Intelligence', desc: 'Analyze Telegram public channels, group memberships, and forwarded messages.', icon: (p) => <Send {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'SMI', id: 'wai', name: 'WhatsApp Intelligence', fullName: 'WhatsApp Intelligence', desc: 'Track WhatsApp public groups, broadcast lists, and business profiles.', icon: (p) => <MessageSquare {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { parentId: 'SMI', id: 'sci', name: 'Snapchat Intelligence', fullName: 'Snapchat Intelligence', desc: 'Monitor Snapchat public stories, Snap Maps, and user engagement.', icon: (p) => <Smartphone {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { parentId: 'SMI', id: 'yti', name: 'YouTube Intelligence', fullName: 'YouTube Intelligence', desc: 'Analyze YouTube channel statistics, video comments, and subscriber networks.', icon: (p) => <PlaySquare {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'SMI', id: 'gbi', name: 'Google Business Intelligence', fullName: 'Google Business Intelligence', desc: 'Audit code repositories, developer contributions, and issue discussions.', icon: (p) => <Globe {...p} />, color: 'text-gray-900', bg: 'bg-gray-200' },
  { parentId: 'SMI', id: 'pmi', name: 'Payment Intelligence', fullName: 'Payment Intelligence', desc: 'Track Pinterest boards, saved pins, and visual interest networks.', icon: (p) => <Heart {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'SMI', id: 'shi', name: 'Shopping Intelligence', fullName: 'Shopping Intelligence', desc: 'Monitor regional content, trending topics, and user engagement on Sharechat.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'SMI', id: 'fdi', name: 'Food Delivery Intelligence', fullName: 'Food Delivery Intelligence', desc: 'Analyze Discord servers, Reddit forums, and community discussions.', icon: (p) => <MessageCircle {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-100' },
  { parentId: 'SMI', id: 'tri', name: 'Travel Intelligence', fullName: 'Travel Intelligence', desc: 'Verify caller identities, spam reports, and phone directory listings.', icon: (p) => <PhoneCall {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'SMI', id: 'csi', name: 'Cab Service Intelligence', fullName: 'Cab Service Intelligence', desc: 'Track activity on community platforms like Quora and Craigslist.', icon: (p) => <Users {...p} />, color: 'text-red-400', bg: 'bg-red-50' },
  { parentId: 'SMI', id: 'sbi', name: 'Subscription Intelligence', fullName: 'Subscription Intelligence', desc: 'Analyze Skype profiles, public directories, and personal blog posts.', icon: (p) => <AtSign {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'SMI', id: 'mdi', name: 'Audit Medium articles, author networks, and long', fullName: 'Audit Medium articles, author networks, and long', desc: 'form content platforms.', icon: (p) => <FileText {...p} />, color: 'text-gray-800', bg: 'bg-gray-200' },
  { parentId: 'SMI', id: 'tli', name: 'Monitor short', fullName: 'Monitor short', desc: 'form video content, viral trends, and creator analytics.', icon: (p) => <Video {...p} />, color: 'text-black', bg: 'bg-pink-100' }

];

export const SDR_TOOLS = [
  { parentId: 'SDR', id: 'bsnlsr', name: 'Search Box', fullName: 'Search Box', desc: 'Search and query subscriber records across all telecom providers.', icon: (p) => <Search {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'SDR', id: 'sar', name: 'CDR (SDR) Analysis & Report', fullName: 'CDR (SDR) Analysis & Report', desc: 'Generate comprehensive CDR and subscriber analysis reports.', icon: (p) => <FileText {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'SDR', id: 'mnv', name: 'Mobile Number Verification (MNV)', fullName: 'Mobile Number Verification (MNV)', desc: 'Authenticate mobile numbers and SIM registries.', icon: (p) => <Shield {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'SDR', id: 'imeii', name: 'IMEI Intelligence (IMEII)', fullName: 'IMEI Intelligence (IMEII)', desc: 'Track and analyze mobile device identities via IMEI.', icon: (p) => <Hash {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'SDR', id: 'tnol', name: 'Cell ID Management', fullName: 'Cell ID Management', desc: 'Manage and analyze Cell IDs and telecom tower intelligence.', icon: (p) => <Network {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'SDR', id: 'asr', name: 'SDR Subscriber Information Management', fullName: 'SDR Subscriber Information Management', desc: 'Manage and access comprehensive subscriber information records.', icon: (p) => <UserCheck {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'SDR', id: 'sdrd1', name: 'Demo', fullName: 'Demo', desc: 'Preview of upcoming subscriber intelligence features.', icon: (p) => <PlayCircle {...p} />, color: 'text-slate-600', bg: 'bg-slate-100' },
  { parentId: 'SDR', id: 'rh', name: 'SDR Data Admin', fullName: 'SDR Data Admin', desc: 'Administer and manage SDR data records and system configuration.', icon: (p) => <Database {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
];

export const OSINT_TOOLS = [
  { parentId: 'OSINT', id: 'ii', name: 'Identity Intelligence', fullName: 'Identity Intelligence', desc: 'Investigate identities, aliases, and digital footprints.', icon: (p) => <UserCheck {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'OSINT', id: 'iti', name: 'Internet Intelligence', fullName: 'Internet Intelligence', desc: 'Analyze domain registrations, IP histories, and web hosting.', icon: (p) => <Globe {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'OSINT', id: 'imi', name: 'Image Intelligence', fullName: 'Image Intelligence', desc: 'Perform reverse image searches and EXIF data analysis.', icon: (p) => <Camera {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'OSINT', id: 'di', name: 'Document Intelligence', fullName: 'Document Intelligence', desc: 'Extract metadata and analyze public documents and PDFs.', icon: (p) => <FileText {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'OSINT', id: 'ci', name: 'Cryptocurrency Intelligence', fullName: 'Cryptocurrency Intelligence', desc: 'Trace blockchain transactions and crypto wallet histories.', icon: (p) => <Coins {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'OSINT', id: 'dwi', name: 'Dark Web Intelligence', fullName: 'Dark Web Intelligence', desc: 'Monitor dark web forums, breaches, and hidden services.', icon: (p) => <Globe {...p} />, color: 'text-gray-800', bg: 'bg-gray-200' },
  { parentId: 'OSINT', id: 'gsi', name: 'Geospatial Intelligence', fullName: 'Geospatial Intelligence', desc: 'Analyze geolocation data, maps, and physical coordinates.', icon: (p) => <MapPin {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'OSINT', id: 'ei', name: 'Entity Intelligence', fullName: 'Entity Intelligence', desc: 'Investigate organizations, corporations, and structured entities.', icon: (p) => <Building2 {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'OSINT', id: 'ri', name: 'Relationship Intelligence', fullName: 'Relationship Intelligence', desc: 'Map connections and relationships between multiple entities.', icon: (p) => <Share2 {...p} />, color: 'text-pink-600', bg: 'bg-pink-100' },
  { parentId: 'OSINT', id: 'ti', name: 'Threat Intelligence', fullName: 'Threat Intelligence', desc: 'Identify cyber threats, malicious IPs, and attack vectors.', icon: (p) => <ShieldAlert {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'OSINT', id: 'rsi', name: 'Risk Intelligence', fullName: 'Risk Intelligence', desc: 'Assess and monitor potential risks and vulnerabilities.', icon: (p) => <AlertTriangle {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'OSINT', id: 'mi', name: 'Monitoring Intelligence', fullName: 'Monitoring Intelligence', desc: 'Continuous tracking of keywords, domains, and entities.', icon: (p) => <Activity {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' },
  { parentId: 'OSINT', id: 'evi', name: 'Evidence Intelligence', fullName: 'Evidence Intelligence', desc: 'Securely capture and preserve digital evidence.', icon: (p) => <Lock {...p} />, color: 'text-slate-600', bg: 'bg-slate-200' },
  { parentId: 'OSINT', id: 'ai', name: 'Analytics Intelligence', fullName: 'Analytics Intelligence', desc: 'Process and analyze large datasets for actionable insights.', icon: (p) => <Database {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'OSINT', id: 'vi', name: 'Visualization Intelligence', fullName: 'Visualization Intelligence', desc: 'Generate charts, graphs, and visual representations of data.', icon: (p) => <Grid {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'OSINT', id: 'upii', name: 'UPI Intelligence', fullName: 'UPI Intelligence', desc: 'Analyze UPI IDs, transaction histories, and VPA linkages.', icon: (p) => <Smartphone {...p} />, color: 'text-green-600', bg: 'bg-green-100' },
  { parentId: 'OSINT', id: 'li', name: 'Landline Intelligence', fullName: 'Landline Intelligence', desc: 'Trace landline numbers, subscriber details, and locations.', icon: (p) => <PhoneCall {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'OSINT', id: 'osw', name: 'Open Source Websites', fullName: 'Open Source Websites', desc: 'Access directories, public records, and open databases.', icon: (p) => <Globe {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'OSINT', id: 'dbi', name: 'Data Breach Intelligence', fullName: 'Data Breach Intelligence', desc: 'Search compromised databases and leaked credential repositories.', icon: (p) => <Database {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'OSINT', id: 'icci', name: 'Analyze international prefixes and cross', fullName: 'Analyze international prefixes and cross', desc: 'border calls.', icon: (p) => <PhoneCall {...p} />, color: 'text-blue-700', bg: 'bg-blue-200' }
];

export const RII_TOOLS = [

  { parentId: 'RII', id: 'sii', name: 'Station Information Intelligence', fullName: 'Station Information Intelligence', desc: 'Access station infrastructure, logs & staff directories', icon: (p) => <MapPin {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'RII', id: 'tii', name: 'Train Information Intelligence', fullName: 'Train Information Intelligence', desc: 'Analyze train manifests, schedules & carriage details', icon: (p) => <Train {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'RII', id: 'pii', name: 'Passenger Information Intelligence', fullName: 'Passenger Information Intelligence', desc: 'Verify passenger identities, ticketing & travel logs', icon: (p) => <UserCheck {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'RII', id: 'tmi', name: 'Train Movement Intelligence', fullName: 'Train Movement Intelligence', desc: 'Monitor real-time train tracking, delays & route analytics', icon: (p) => <Activity {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'RII', id: 'smii', name: 'Station Master Information Intelligence', fullName: 'Station Master Information Intelligence', desc: 'Review station master logs, approvals & incident reports', icon: (p) => <Key {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'RII', id: 'rpfi', name: 'Railway Protection Force Intelligence', fullName: 'Railway Protection Force Intelligence', desc: 'Track RPF deployments, security alerts & criminal records', icon: (p) => <Shield {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'RII', id: 'tei', name: 'Ticket Examiner Intelligence', fullName: 'Ticket Examiner Intelligence', desc: 'Audit TTE reports, penalty logs & on-board verification records', icon: (p) => <FileSignature {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'RII', id: 'rlci', name: 'Railway Level Crossing Intelligence', fullName: 'Railway Level Crossing Intelligence', desc: 'Analyze level crossing status, gate logs & traffic data', icon: (p) => <FileText {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' }

];

export const TGRI_TOOLS = [

  { parentId: 'TGRI', id: 'tti', name: 'Toll Transaction Intelligence', fullName: 'Toll Transaction Intelligence', desc: 'Analyze toll gate transactions, fee collections & payment histories', icon: (p) => <FileText {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'TGRI', id: 'vi', name: 'Vehicle Intelligence', fullName: 'Vehicle Intelligence', desc: 'Monitor vehicle classifications, registration details & crossing patterns', icon: (p) => <Car {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'TGRI', id: 'fti', name: 'FASTag Intelligence', fullName: 'FASTag Intelligence', desc: 'Track electronic toll collections, RFID tags & account balances', icon: (p) => <Activity {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'TGRI', id: 'tpi', name: 'Toll Plaza Intelligence', fullName: 'Toll Plaza Intelligence', desc: 'Review plaza operations, camera logs & infrastructure data', icon: (p) => <MapPin {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'TGRI', id: 'mi', name: 'Movement Intelligence', fullName: 'Movement Intelligence', desc: 'Analyze vehicle movement logs, crossing frequencies & timestamps', icon: (p) => <TrendingUp {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'TGRI', id: 'ri', name: 'Route Intelligence', fullName: 'Route Intelligence', desc: 'Map toll trajectories, entry-exit points & travel durations', icon: (p) => <GitMerge {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'TGRI', id: 'tli', name: 'Timeline Intelligence', fullName: 'Timeline Intelligence', desc: 'Correlate toll passings over chronological timelines & historical data', icon: (p) => <Clock {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'TGRI', id: 'pi', name: 'Pattern Intelligence', fullName: 'Pattern Intelligence', desc: 'Identify travel routines, recurring routes & behavioral patterns', icon: (p) => <Grid {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'TGRI', id: 'rki', name: 'Risk Intelligence', fullName: 'Risk Intelligence', desc: 'Detect anomalies, blacklisted vehicles & potential security threats', icon: (p) => <AlertTriangle {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'TGRI', id: 'rli', name: 'Relationship Intelligence', fullName: 'Relationship Intelligence', desc: 'Discover convoy patterns, co-travelers & associated vehicles', icon: (p) => <Users {...p} />, color: 'text-pink-600', bg: 'bg-pink-100' },
  { parentId: 'TGRI', id: 'ai', name: 'Analytics Intelligence', fullName: 'Analytics Intelligence', desc: 'Access comprehensive toll data reports, traffic flow & insights', icon: (p) => <BarChart {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'TGRI', id: 'io', name: 'Investigation Output', fullName: 'Investigation Output', desc: 'Generate consolidated case reports, evidence files & query results', icon: (p) => <FileCheck {...p} />, color: 'text-gray-600', bg: 'bg-gray-100' }

];

export const LIH_TOOLS = [

  { parentId: 'LIH', id: 'bnsi', name: 'Bharatiya Nyaya Sanhita Intelligence', fullName: 'Bharatiya Nyaya Sanhita Intelligence', desc: 'Access provisions and analytics.', icon: (p) => <Book {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'LIH', id: 'bnssi', name: 'Bharatiya Nagarik Suraksha Sanhita Intelligence', fullName: 'Bharatiya Nagarik Suraksha Sanhita Intelligence', desc: 'Explore procedures and codes.', icon: (p) => <Scale {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'LIH', id: 'bsai', name: 'Bharatiya Sakshya Adhiniyam Intelligence', fullName: 'Bharatiya Sakshya Adhiniyam Intelligence', desc: 'Evidence laws and records.', icon: (p) => <Shield {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'LIH', id: 'ipci', name: 'Indian Penal Code Intelligence', fullName: 'Indian Penal Code Intelligence', desc: 'Historical penal code references.', icon: (p) => <Gavel {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'LIH', id: 'crpci', name: 'Code of Criminal Procedure Intelligence', fullName: 'Code of Criminal Procedure Intelligence', desc: 'Procedural law records.', icon: (p) => <Landmark {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'LIH', id: 'ieai', name: 'Indian Evidence Act Intelligence', fullName: 'Indian Evidence Act Intelligence', desc: 'Archive of evidence laws.', icon: (p) => <FileSearch {...p} />, color: 'text-gray-800', bg: 'bg-gray-100' },
  { parentId: 'LIH', id: 'ldi', name: 'Legal Dictionary Intelligence', fullName: 'Legal Dictionary Intelligence', desc: 'Analyze and manage legal documents.', icon: (p) => <FileText {...p} />, color: 'text-blue-700', bg: 'bg-blue-50' },
  { parentId: 'LIH', id: 'lari', name: 'Legal Acts & Rules Intelligence', fullName: 'Legal Acts & Rules Intelligence', desc: 'AI-driven legal research.', icon: (p) => <Search {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'LIH', id: 'sli', name: 'Specialized Laws Intelligence', fullName: 'Specialized Laws Intelligence', desc: 'Search through statutory provisions.', icon: (p) => <Scroll {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { parentId: 'LIH', id: 'lffi', name: 'Legal Forms & Formats Intelligence', fullName: 'Legal Forms & Formats Intelligence', desc: 'Filing guidelines and frameworks.', icon: (p) => <Folder {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { parentId: 'LIH', id: 'lji', name: 'Legal Judgments Intelligence', fullName: 'Legal Judgments Intelligence', desc: 'Access historical and recent judgments.', icon: (p) => <Gavel {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'LIH', id: 'lcni', name: 'Legal Circulars & Notifications Intelligence', fullName: 'Legal Circulars & Notifications Intelligence', desc: 'Map relationships between cases.', icon: (p) => <Database {...p} />, color: 'text-gray-900', bg: 'bg-gray-200' },
  { parentId: 'LIH', id: 'pmsi', name: 'Police Manuals & SOP Intelligence', fullName: 'Police Manuals & SOP Intelligence', desc: 'Inmate and prison records.', icon: (p) => <Lock {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'LIH', id: 'lti', name: 'Legal Templates Intelligence', fullName: 'Legal Templates Intelligence', desc: 'Emerging technologies in the legal sector.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'LIH', id: 'cri', name: 'Court Rules Intelligence', fullName: 'Court Rules Intelligence', desc: 'Search and analyze criminal histories.', icon: (p) => <AlertCircle {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-100' },
  { parentId: 'LIH', id: 'igi', name: 'Investigation Guidelines Intelligence', fullName: 'Investigation Guidelines Intelligence', desc: 'Tools for digital forensics.', icon: (p) => <Search {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'LIH', id: 'goi', name: 'Government Orders Intelligence', fullName: 'Government Orders Intelligence', desc: 'Analyze official orders and gazettes.', icon: (p) => <Bookmark {...p} />, color: 'text-red-400', bg: 'bg-red-50' },
  { parentId: 'LIH', id: 'lai', name: 'Legal Amendment Intelligence', fullName: 'Legal Amendment Intelligence', desc: 'AI assistance for legal opinions.', icon: (p) => <Users {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'LIH', id: 'ldri', name: 'Legal Drafting Intelligence', fullName: 'Legal Drafting Intelligence', desc: 'Alternative dispute tracking.', icon: (p) => <Briefcase {...p} />, color: 'text-gray-800', bg: 'bg-gray-200' },
  { parentId: 'LIH', id: 'csi', name: 'Case Study Intelligence', fullName: 'Case Study Intelligence', desc: 'Analytics for crime scene investigations.', icon: (p) => <Info {...p} />, color: 'text-black', bg: 'bg-pink-100' }

];

export const KYC_TOOLS = [

  { parentId: 'KYCDI', id: 'ebi', name: 'Electricity Bill Intelligence', fullName: 'Electricity Bill Intelligence', desc: 'Analyze voter profiles, constituency logs & election fraud detection', icon: (p) => <Landmark {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'KYCDI', id: 'lpgri', name: 'LPG Record Intelligence', fullName: 'LPG Record Intelligence', desc: 'Monitor gas subsidy records, consumer logs & distribution audits', icon: (p) => <Flame {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'KYCDI', id: 'pim', name: 'Passport Intelligence Module', fullName: 'Passport Intelligence Module', desc: 'Track passport issuance, travel logs & visa immigration history', icon: (p) => <Plane {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'KYCDI', id: 'pani', name: 'PAN Intelligence', fullName: 'PAN Intelligence', desc: 'Verify PAN details, tax defaults & linked corporate entities', icon: (p) => <CreditCard {...p} />, color: 'text-green-600', bg: 'bg-green-100' },
  { parentId: 'KYCDI', id: 'vii', name: 'Voter ID Intelligence', fullName: 'Voter ID Intelligence', desc: 'Audit voter ID registrations, duplicate records & electoral rolls', icon: (p) => <UserCheck {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'KYCDI', id: 'rci', name: 'Residence Certificate Intelligence', fullName: 'Residence Certificate Intelligence', desc: 'Verify ration card benefits, family trees & civil supplies logs', icon: (p) => <ShoppingCart {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'KYCDI', id: 'bci', name: 'Birth Certificate Intelligence', fullName: 'Birth Certificate Intelligence', desc: 'Access municipal birth records, parentage audits & registry logs', icon: (p) => <Baby {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'KYCDI', id: 'cci', name: 'Caste Certificate Intelligence', fullName: 'Caste Certificate Intelligence', desc: 'Validate caste certificate issuance, validity & reservation benefits', icon: (p) => <FileText {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },

];

export const GHLRI_TOOLS = [

  { parentId: 'GHLRI', id: 'ghi', name: 'Guest History Intelligence', fullName: 'Guest History Intelligence', desc: 'Analyze guest check-in histories, logs & travel records', icon: (p) => <Users {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'GHLRI', id: 'ghlri', name: 'Guest House & Lodge Registration Intelligence', fullName: 'Guest House & Lodge Registration Intelligence', desc: 'Verify lodge registrations, ownership & compliance', icon: (p) => <FileCheck {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'GHLRI', id: 'bil', name: 'BAR Information List', fullName: 'BAR Information List', desc: 'Access and manage BAR information logs.', icon: (p) => <Wine {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'GHLRI', id: 'ril', name: 'Restaurant Information List', fullName: 'Restaurant Information List', desc: 'Review restaurant data and logs.', icon: (p) => <Utensils {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' }

];

export const CRI_TOOLS = [

  { parentId: 'CRI', id: 'mcai', name: 'Ministry of Corporate Affairs Record Intelligence', fullName: 'Ministry of Corporate Affairs Record Intelligence', desc: 'Audit corporate records, DIN lookups & company filings', icon: (p) => <Building2 {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'CRI', id: 'gstri', name: 'Goods and Services Tax Record Intelligence', fullName: 'Goods and Services Tax Record Intelligence', desc: 'Track GST returns, tax defaults & compliance audits', icon: (p) => <FileText {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'CRI', id: 'isori', name: 'ISO Registration Intelligence', fullName: 'ISO Registration Intelligence', desc: 'Verify ISO certifications, validity & standards compliance', icon: (p) => <Award {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'CRI', id: 'sri', name: 'Society Registration Intelligence', fullName: 'Society Registration Intelligence', desc: 'Monitor registered startups, DPIIT recognition & funding', icon: (p) => <Rocket {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'CRI', id: 'tri', name: 'Trust Registration Intelligence', fullName: 'Trust Registration Intelligence', desc: 'Search trademark registries, IP filings & status', icon: (p) => <Copyright {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'CRI', id: '12ari', name: '12A Registration Intelligence', fullName: '12A Registration Intelligence', desc: 'Audit NGO tax exemptions & trust compliance', icon: (p) => <FileCheck {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'CRI', id: '80gri', name: '80G Registration Intelligence', fullName: '80G Registration Intelligence', desc: 'Track tax deduction certificates for charitable organizations', icon: (p) => <Heart {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'CRI', id: 'uri', name: 'Udyam Registration Intelligence', fullName: 'Udyam Registration Intelligence', desc: 'Verify MSME registrations & micro-enterprise credentials', icon: (p) => <Briefcase {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'CRI', id: 'siri', name: 'Startup India Registration Intelligence', fullName: 'Startup India Registration Intelligence', desc: 'Validate Startup India portal credentials & benefits', icon: (p) => <Lightbulb {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { parentId: 'CRI', id: 'ieci', name: 'Import Export Code Registration Intelligence', fullName: 'Import Export Code Registration Intelligence', desc: 'Monitor trade licenses, export codes & cross-border trade logs', icon: (p) => <Ship {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'CRI', id: 'fssaii', name: 'Food Safety and Standards Authority of India Registration Intelligence', fullName: 'Food Safety and Standards Authority of India Registration Intelligence', desc: 'Track food safety licenses, hygiene audits & vendor compliance', icon: (p) => <Utensils {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { parentId: 'CRI', id: 'dli', name: 'Drug License Registration Intelligence', fullName: 'Drug License Registration Intelligence', desc: 'Audit pharmaceutical licenses, distribution channels & pharmacy logs', icon: (p) => <Pill {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'CRI', id: 'fli', name: 'Factory License Registration Intelligence', fullName: 'Factory License Registration Intelligence', desc: 'Verify manufacturing licenses, plant compliance & industrial permits', icon: (p) => <Factory {...p} />, color: 'text-slate-600', bg: 'bg-slate-100' },
  { parentId: 'CRI', id: 'tli', name: 'Trade License Registration Intelligence', fullName: 'Trade License Registration Intelligence', desc: 'Track local trade permits, municipal licenses & commercial registries', icon: (p) => <Store {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'CRI', id: 'seri', name: 'Shop & Establishment Registration Intelligence', fullName: 'Shop & Establishment Registration Intelligence', desc: 'Monitor liquor licenses, excise duties & state tax compliance', icon: (p) => <Wine {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'CRI', id: 'fcrai', name: 'Foreign Contribution Regulation Act Registration Intelligence', fullName: 'Foreign Contribution Regulation Act Registration Intelligence', desc: 'Track foreign donations, NGO funding & FCRA accounts', icon: (p) => <Globe {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'CRI', id: 'pani', name: 'Permanent Account Number Registration Intelligence', fullName: 'Permanent Account Number Registration Intelligence', desc: 'Verify Permanent Account Numbers, associated entities & tax histories', icon: (p) => <CreditCard {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'CRI', id: 'tani', name: 'Tax Deduction and Collection Account Number Registration Intelligence', fullName: 'Tax Deduction and Collection Account Number Registration Intelligence', desc: 'Audit Tax Deduction and Collection Account Numbers & TDS compliance', icon: (p) => <CreditCard {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'CRI', id: 'epfoi', name: 'EPFOI', desc: 'Employees\' Provident Fund Organisation Registration Intelligence - Track EPF contributions, establishment codes & payroll data', icon: (p) => <PiggyBank {...p} />, color: 'text-blue-400', bg: 'bg-blue-50' },
  { parentId: 'CRI', id: 'esici', name: 'ESICI', desc: 'Employees\' State Insurance Corporation Registration Intelligence - Monitor ESIC registrations, employee health insurance & factory compliance', icon: (p) => <Activity {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'CRI', id: 'nsici', name: 'National Small Industries Corporation Registration Intelligence', fullName: 'National Small Industries Corporation Registration Intelligence', desc: 'Verify NSIC certificates, government procurement & MSME benefits', icon: (p) => <Layers {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'CRI', id: 'gemri', name: 'Government e', fullName: 'Government e', desc: 'Marketplace Registration Intelligence - Track GeM portal vendors, procurement bids & supplier ratings', icon: (p) => <ShoppingCart {...p} />, color: 'text-orange-400', bg: 'bg-orange-50' },
  { parentId: 'CRI', id: 'ngodi', name: 'NGO DARPAN Registration Intelligence', fullName: 'NGO DARPAN Registration Intelligence', desc: 'Verify NITI Aayog NGO Darpan IDs, trust deeds & government grants', icon: (p) => <Users {...p} />, color: 'text-green-600', bg: 'bg-green-100' },
  { parentId: 'CRI', id: 'csr1i', name: 'Corporate Social Responsibility (CSR', fullName: 'Corporate Social Responsibility (CSR', desc: '1) Registration Intelligence - Monitor Corporate Social Responsibility filings & approved implementing agencies', icon: (p) => <Handshake {...p} />, color: 'text-rose-400', bg: 'bg-rose-50' },
  { parentId: 'CRI', id: 'tmri', name: 'Trademark Registration Intelligence', fullName: 'Trademark Registration Intelligence', desc: 'Monitor trademark portfolios, IP infringement & brand registries', icon: (p) => <ScanLine {...p} />, color: 'text-purple-400', bg: 'bg-purple-50' },
  { parentId: 'CRI', id: 'fnoci', name: 'Fire No Objection Certificate Registration Intelligence', fullName: 'Fire No Objection Certificate Registration Intelligence', desc: 'Track Fire Department No Objection Certificates & building safety audits', icon: (p) => <Flame {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'CRI', id: 'pcbi', name: 'Pollution Control Board Registration Intelligence', fullName: 'Pollution Control Board Registration Intelligence', desc: 'Verify environmental clearances, emission logs & PCB consents', icon: (p) => <Wind {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'CRI', id: 'bisi', name: 'Bureau of Indian Standards Registration Intelligence', fullName: 'Bureau of Indian Standards Registration Intelligence', desc: 'Track BIS certifications, ISI marks & product quality standards', icon: (p) => <CheckCircle {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'CRI', id: 'pesoi', name: 'Petroleum and Explosives Safety Organisation License Registration Intelligence', fullName: 'Petroleum and Explosives Safety Organisation License Registration Intelligence', desc: 'Audit explosive licenses, petroleum storage & hazardous material transport', icon: (p) => <Fuel {...p} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { parentId: 'CRI', id: 'lmri', name: 'Legal Metrology Registration Intelligence', fullName: 'Legal Metrology Registration Intelligence', desc: 'Monitor weights & measures licenses, packaging compliance & LMPC certificates', icon: (p) => <Scale {...p} />, color: 'text-slate-500', bg: 'bg-slate-100' },
  { parentId: 'CRI', id: 'ceri', name: 'Clinical Establishment Registration Intelligence', fullName: 'Clinical Establishment Registration Intelligence', desc: 'Track customs broker licenses, bonded warehouses & ICEGATE registrations', icon: (p) => <Ship {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'CRI', id: 'rerai', name: 'Real Estate Regulatory Authority Registration Intelligence', fullName: 'Real Estate Regulatory Authority Registration Intelligence', desc: 'Verify RERA project registrations, builder compliance & real estate agent logs', icon: (p) => <Home {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' }

];

export const BSAR_TOOLS = [
  { parentId: 'BSAR', id: 'us', name: 'Upload Statement', fullName: 'Upload Statement', desc: 'Upload and process bank statement files.', icon: (p) => <FileText {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'BSAR', id: 'var', name: 'View Analysis Report', fullName: 'View Analysis Report', desc: 'View detailed analytics and transaction reports.', icon: (p) => <BarChart {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'BSAR', id: 'rh', name: 'Report History', fullName: 'Report History', desc: 'Access historical bank statement reports.', icon: (p) => <Clock {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'BSAR', id: 'rm', name: 'Report Management', fullName: 'Report Management', desc: 'Manage and organize generated reports.', icon: (p) => <Folder {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' }
];

export const PRI_TOOLS = [
  { parentId: 'PRI', id: 'phi', name: 'Prisoner History Intelligence', fullName: 'Prisoner History Intelligence', desc: 'Monitor and track prisoner details.', icon: (p) => <Users {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'PRI', id: 'jhi', name: 'Jail History Intelligence', fullName: 'Jail History Intelligence', desc: 'Manage jail records and intelligence.', icon: (p) => <Database {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'PRI', id: 'demo1', name: 'Prison DEMO 1', fullName: 'Prison DEMO 1', desc: 'Coming soon.', icon: (p) => <PlayCircle {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'PRI', id: 'demo2', name: 'Prison DEMO 2', fullName: 'Prison DEMO 2', desc: 'Coming soon.', icon: (p) => <PlayCircle {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' }
];

export const LRI_TOOLS = [
  { parentId: 'LRI', id: 'sfh', name: 'Search Flat History', fullName: 'Search Flat History', desc: 'Verify flat ownership and transaction logs.', icon: (p) => <Home {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'LRI', id: 'sah', name: 'Search Apartment History', fullName: 'Search Apartment History', desc: 'Analyze apartment records and history.', icon: (p) => <Building2 {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'LRI', id: 'sbh', name: 'Search Builder History', fullName: 'Search Builder History', desc: 'Review builder projects and credibility.', icon: (p) => <Briefcase {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'LRI', id: 'sth', name: 'Search Tenant History', fullName: 'Search Tenant History', desc: 'Check tenant backgrounds and leases.', icon: (p) => <Users {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'LRI', id: 'slh', name: 'Search Land History', fullName: 'Search Land History', desc: 'Verify land registry and past transfers.', icon: (p) => <MapPin {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'LRI', id: 'ssh', name: 'Search Society History', fullName: 'Search Society History', desc: 'Access housing society registration records.', icon: (p) => <Landmark {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' }
];

export const ERI_TOOLS = [
  { parentId: 'ERI', id: 'sir', name: 'Student Information Record', fullName: 'Student Information Record', desc: 'Access student details and history.', icon: (p) => <UserCheck {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'ERI', id: 'cri_cert', name: 'Certificate Record Intelligence', fullName: 'Certificate Record Intelligence', desc: 'Verify educational certificates and degrees.', icon: (p) => <FileCheck {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'ERI', id: 'cri_coll', name: 'College Record Intelligence', fullName: 'College Record Intelligence', desc: 'Monitor college data and registrations.', icon: (p) => <Building2 {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'ERI', id: 'uri', name: 'University Record Intelligence', fullName: 'University Record Intelligence', desc: 'Analyze university affiliations and records.', icon: (p) => <Landmark {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'ERI', id: 'iri', name: 'Institute Record Intelligence', fullName: 'Institute Record Intelligence', desc: 'Track private institutes and academies.', icon: (p) => <Briefcase {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'ERI', id: 'otri', name: 'Online Tutorial Record Intelligence', fullName: 'Online Tutorial Record Intelligence', desc: 'Track online tutorials and ed-tech platforms.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'ERI', id: 'hri', name: 'Hostel Record Intelligence', fullName: 'Hostel Record Intelligence', desc: 'Review hostel accommodations and logs.', icon: (p) => <Home {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'ERI', id: 'sri', name: 'School Record Intelligence', fullName: 'School Record Intelligence', desc: 'Verify school affiliations and student histories.', icon: (p) => <BookOpen {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' }
];

export const PSRI_TOOLS = [
  { parentId: 'PSRI', id: 'psl', name: 'Police Station List', fullName: 'Police Station List', desc: 'Access logs and records of local police stations.', icon: (p) => <Shield {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'PSRI', id: 'cpsl', name: 'Cyber Police Station List', fullName: 'Cyber Police Station List', desc: 'Cyber crime reporting and analytics.', icon: (p) => <Smartphone {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'PSRI', id: 'tpsl', name: 'Traffic Police Station List', fullName: 'Traffic Police Station List', desc: 'Traffic incident records and station details.', icon: (p) => <Car {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'PSRI', id: 'pol', name: 'Police Outpost List', fullName: 'Police Outpost List', desc: 'Monitor and access outpost jurisdictions.', icon: (p) => <MapPin {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'PSRI', id: 'spol', name: 'Superintendent of Police Office List', fullName: 'Superintendent of Police Office List', desc: 'SP office records and district communications.', icon: (p) => <Users {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'PSRI', id: 'cbol', name: 'Crime Branch Office List', fullName: 'Crime Branch Office List', desc: 'Intelligence and crime branch directories.', icon: (p) => <Briefcase {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'PSRI', id: 'vol', name: 'Vigilance Office List', fullName: 'Vigilance Office List', desc: 'Anti-corruption and vigilance records.', icon: (p) => <Search {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'PSRI', id: 'eowol', name: 'Economic Offences Wing Office List', fullName: 'Economic Offences Wing Office List', desc: 'Financial crime investigation offices.', icon: (p) => <BarChart {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'PSRI', id: 'cbiol', name: 'Central Bureau of Investigation Office List', fullName: 'Central Bureau of Investigation Office List', desc: 'Federal investigation agency records.', icon: (p) => <Landmark {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'PSRI', id: 'edol', name: 'Enforcement Directorate Office List', fullName: 'Enforcement Directorate Office List', desc: 'Economic laws and intelligence directories.', icon: (p) => <Scale {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'PSRI', id: 'ibol', name: 'Intelligence Bureau Office List', fullName: 'Intelligence Bureau Office List', desc: 'Intelligence operations and bureau records.', icon: (p) => <ScanLine {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'PSRI', id: 'niaol', name: 'National Investigation Agency Office List', fullName: 'National Investigation Agency Office List', desc: 'Counter-terrorism and national investigations.', icon: (p) => <Globe {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'PSRI', id: 'ncbol', name: 'Narcotics Control Bureau Office List', fullName: 'Narcotics Control Bureau Office List', desc: 'Drug enforcement and narcotics intelligence.', icon: (p) => <Pill {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-50' },
  { parentId: 'PSRI', id: 'driol', name: 'Directorate of Revenue Intelligence Office List', fullName: 'Directorate of Revenue Intelligence Office List', desc: 'Revenue and tax enforcement operations.', icon: (p) => <CreditCard {...p} />, color: 'text-emerald-400', bg: 'bg-emerald-50' },
  { parentId: 'PSRI', id: 'sfiol', name: 'Serious Fraud Investigation Office List', fullName: 'Serious Fraud Investigation Office List', desc: 'Corporate fraud investigations and records.', icon: (p) => <FileSearch {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'PSRI', id: 'cvcol', name: 'Central Vigilance Commission Office List', fullName: 'Central Vigilance Commission Office List', desc: 'Central vigilance and compliance monitoring.', icon: (p) => <CheckCircle {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'PSRI', id: 'cfsll', name: 'Central Forensic Science Laboratory List', fullName: 'Central Forensic Science Laboratory List', desc: 'Central forensic laboratories and analysis.', icon: (p) => <Database {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'PSRI', id: 'sfsll', name: 'State Forensic Science Laboratory List', fullName: 'State Forensic Science Laboratory List', desc: 'State-level forensic records and labs.', icon: (p) => <Activity {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'PSRI', id: 'cri_case', name: 'Case Record Intelligence', fullName: 'Case Record Intelligence', desc: 'Detailed case intelligence and reporting.', icon: (p) => <FileText {...p} />, color: 'text-pink-600', bg: 'bg-pink-100' },
  { parentId: 'PSRI', id: 'cmri', name: 'Criminal Record Intelligence', fullName: 'Criminal Record Intelligence', desc: 'Monitor and track criminal records globally.', icon: (p) => <Users {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' }
];

export const CORI_TOOLS = [
  { parentId: 'CoRI', id: 'sci', name: 'Supreme Court Information', fullName: 'Supreme Court Information', desc: 'Apex court records and judgments.', icon: (p) => <Scale {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'CoRI', id: 'hci', name: 'High Court Information', fullName: 'High Court Information', desc: 'State-level high court records and updates.', icon: (p) => <Landmark {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'CoRI', id: 'dci', name: 'District Court Information', fullName: 'District Court Information', desc: 'District-level judicial records.', icon: (p) => <Building2 {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'CoRI', id: 'fci', name: 'Family Court Information', fullName: 'Family Court Information', desc: 'Matrimonial and family dispute records.', icon: (p) => <Users {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'CoRI', id: 'cci', name: 'Civil Court Information', fullName: 'Civil Court Information', desc: 'Civil case and litigation records.', icon: (p) => <Briefcase {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'CoRI', id: 'crci', name: 'Criminal Court Information', fullName: 'Criminal Court Information', desc: 'Criminal trial and conviction records.', icon: (p) => <Shield {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'CoRI', id: 'comci', name: 'Commercial Court Information', fullName: 'Commercial Court Information', desc: 'Business and commercial disputes.', icon: (p) => <TrendingUp {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'CoRI', id: 'conci', name: 'Consumer Court Information', fullName: 'Consumer Court Information', desc: 'Consumer rights and grievances records.', icon: (p) => <ShoppingCart {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'CoRI', id: 'spci', name: 'Special Court Information', fullName: 'Special Court Information', desc: 'Special tribunals and designated court proceedings.', icon: (p) => <AlertCircle {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'CoRI', id: 'ti', name: 'Tribunal Information', fullName: 'Tribunal Information', desc: 'Statutory tribunal records and judgments.', icon: (p) => <FileSignature {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'CoRI', id: 'ftci', name: 'Fast Track Court Information', fullName: 'Fast Track Court Information', desc: 'Fast track proceedings and rapid judgments.', icon: (p) => <Clock {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'CoRI', id: 'lai', name: 'Lok Adalat Information', fullName: 'Lok Adalat Information', desc: 'Alternative dispute resolution records.', icon: (p) => <Handshake {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'CoRI', id: 'gni', name: 'Gram Nyayalaya Information', fullName: 'Gram Nyayalaya Information', desc: 'Rural court records and local governance disputes.', icon: (p) => <Home {...p} />, color: 'text-indigo-400', bg: 'bg-indigo-50' },
  { parentId: 'CoRI', id: 'cpxi', name: 'Court Complex Information', fullName: 'Court Complex Information', desc: 'Details of integrated court complexes.', icon: (p) => <Building2 {...p} />, color: 'text-emerald-400', bg: 'bg-emerald-50' },
  { parentId: 'CoRI', id: 'col', name: 'Collector Office List', fullName: 'Collector Office List', desc: 'District collector administrative records.', icon: (p) => <MapPin {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'CoRI', id: 'scol', name: 'Sub', fullName: 'Sub', desc: 'Collector Office List - Sub-divisional administration records.', icon: (p) => <MapPin {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'CoRI', id: 'tol', name: 'Tahasildar OfficeList', fullName: 'Tahasildar OfficeList', desc: 'Revenue and local administration records.', icon: (p) => <MapPin {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'CoRI', id: 'bdol', name: 'Block Development Office List', fullName: 'Block Development Office List', desc: 'Block-level administration and funding records.', icon: (p) => <MapPin {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'CoRI', id: 'riol', name: 'Revenue Inspector Office List', fullName: 'Revenue Inspector Office List', desc: 'Revenue inspection and land records.', icon: (p) => <Search {...p} />, color: 'text-pink-600', bg: 'bg-pink-100' },
  { parentId: 'CoRI', id: 'rcol', name: 'Revenue Circle Office List', fullName: 'Revenue Circle Office List', desc: 'Revenue circle and division management.', icon: (p) => <Target {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' },
  { parentId: 'CoRI', id: 'gpol', name: 'Gram Panchayat Office List', fullName: 'Gram Panchayat Office List', desc: 'Village-level local self-government records.', icon: (p) => <MapPin {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'CoRI', id: 'psol', name: 'Panchayat Samiti Office List', fullName: 'Panchayat Samiti Office List', desc: 'Block-level panchayat administration records.', icon: (p) => <MapPin {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'CoRI', id: 'zpol', name: 'Zilla Parishad Office List', fullName: 'Zilla Parishad Office List', desc: 'District-level panchayat administration and development.', icon: (p) => <MapPin {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'CoRI', id: 'mol', name: 'Municipality Office List', fullName: 'Municipality Office List', desc: 'Urban municipal body records and services.', icon: (p) => <Building2 {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'CoRI', id: 'mcol', name: 'Municipal Corporation Office List', fullName: 'Municipal Corporation Office List', desc: 'Metropolitan municipal body records and services.', icon: (p) => <Building2 {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'CoRI', id: 'nacol', name: 'Notified Area Council Office List', fullName: 'Notified Area Council Office List', desc: 'Transitional urban area administrative records.', icon: (p) => <Building2 {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'CoRI', id: 'drdaol', name: 'District Rural Development Agency Office List', fullName: 'District Rural Development Agency Office List', desc: 'Rural development program monitoring.', icon: (p) => <Users {...p} />, color: 'text-pink-600', bg: 'bg-pink-100' },
  { parentId: 'CoRI', id: 'srol', name: 'Sub', fullName: 'Sub', desc: 'Registrar Office List - Property and marriage registration records.', icon: (p) => <FileSignature {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' }
];

export const PPRI_TOOLS = [
  { parentId: 'PPRI', id: 'ppl', name: 'Petrol Pump List', fullName: 'Petrol Pump List', desc: 'comprehensive database of registered petrol pumps.', icon: (p) => <Fuel {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'PPRI', id: 'ppri', name: 'Petrol Pump Registration Information', fullName: 'Petrol Pump Registration Information', desc: 'owner and license details.', icon: (p) => <FileText {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'PPRI', id: 'rppi', name: 'Route Petrol Pump Intelligence', fullName: 'Route Petrol Pump Intelligence', desc: 'map and analyze fuel stations along a route.', icon: (p) => <MapPin {...p} />, color: 'text-green-500', bg: 'bg-green-50' },
  { parentId: 'PPRI', id: 'pprid', name: 'PPRI Demo', fullName: 'PPRI Demo', desc: 'Interactive demonstration of fuel analytics.', icon: (p) => <PlaySquare {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' }
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
  { parentId: 'ILD', id: 'ildd1', name: 'ILD Demo 1', fullName: 'ILD Demo 1', desc: 'Interactive demonstration module 1.', icon: (p) => <PlayCircle {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'ILD', id: 'ildd2', name: 'ILD Demo 2', fullName: 'ILD Demo 2', desc: 'Interactive demonstration module 2.', icon: (p) => <PlayCircle {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'ILD', id: 'ildd3', name: 'ILD Demo 3', fullName: 'ILD Demo 3', desc: 'Interactive demonstration module 3.', icon: (p) => <PlayCircle {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'ILD', id: 'ildd4', name: 'ILD Demo 4', fullName: 'ILD Demo 4', desc: 'Interactive demonstration module 4.', icon: (p) => <PlayCircle {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' }
];

export const TDR_TOOLS = [
  { parentId: 'TDR', id: 'imp', name: 'Import', desc: 'Import tower dump records.', icon: (p) => <Database {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { parentId: 'TDR', id: 'df', name: 'Dynamic Filters', desc: 'Apply dynamic filters to narrow down search criteria.', icon: (p) => <Filter {...p} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { parentId: 'TDR', id: 'sum', name: 'Summary', desc: 'View summary of tower dump records.', icon: (p) => <ClipboardList {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'TDR', id: 'cn', name: 'Common Numbers', desc: 'Identify common numbers across multiple dumps.', icon: (p) => <Users {...p} />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { parentId: 'TDR', id: 'ucmmin', name: 'Un-Common / Missing Mobile / IMEI Numbers', desc: 'Identify missing or uncommon devices.', icon: (p) => <UserMinus {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'TDR', id: 'aucmin', name: 'Advanced Un-Common Mobile / IMEI Numbers', desc: 'Advanced analytics for uncommon devices.', icon: (p) => <UserMinus {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'TDR', id: 'sa', name: 'Split Analysis', desc: 'Perform split analysis on cellular data.', icon: (p) => <Scissors {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'TDR', id: 'cwsmicg', name: 'Cross', fullName: 'Cross', desc: 'reference with known suspect entities.', icon: (p) => <UserX {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
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
  { parentId: 'CDR', id: 'mc', name: 'Analyze cross', fullName: 'Analyze cross', desc: 'network or cross-region traffic.', icon: (p) => <Shuffle {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'CDR', id: 'fsd', name: 'Filter / Split Data', desc: 'Segregate data based on advanced criteria.', icon: (p) => <Filter {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'CDR', id: 'oup', name: 'Off / Unused Period', desc: 'Identify periods of inactivity.', icon: (p) => <Moon {...p} />, color: 'text-slate-500', bg: 'bg-slate-50' },
  { parentId: 'CDR', id: 'nmn', name: 'New / Missing Numbers', desc: 'Identify anomalies in call logs.', icon: (p) => <UserMinus {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'CDR', id: 'cn', name: 'Common Numbers', desc: 'Highlight frequently contacted entities.', icon: (p) => <Users {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { parentId: 'CDR', id: 'cdrtocdrcell', name: 'CDR to CDR Cells (X–Y Axis Reports)', desc: 'Visual intersection metrics.', icon: (p) => <FileText {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'CDR', id: 'cdrtoweripdrild', name: 'Multi', fullName: 'Multi', desc: 'source correlation.', icon: (p) => <Users {...p} />, color: 'text-lime-500', bg: 'bg-lime-50' },
  { parentId: 'CDR', id: 'crs', name: 'CDR Report Summary', desc: 'Overarching dashboard of call intelligence.', icon: (p) => <ClipboardList {...p} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { parentId: 'CDR', id: 'cwsm', name: 'Compare with Suspect Mobile Numbers / IMEI / Cell IDs Groups', desc: 'Compare with Suspect Mobile Numbers / IMEI / Cell IDs Groups.', icon: (p) => <UserX {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'CDR', id: 'cpa', name: 'CDR Pattern Analysis', desc: 'Behavioral tracking of suspects.', icon: (p) => <TrendingUp {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'CDR', id: 'clma', name: '30', fullName: '30', desc: 'day historical overview.', icon: (p) => <Calendar {...p} />, color: 'text-blue-500', bg: 'bg-blue-50' },
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
  { parentId: 'IPDR', id: 'cwsm', name: 'Cross', fullName: 'Cross', desc: 'reference with suspect IP and mobile groups.', icon: (p) => <UserX {...p} />, color: 'text-red-500', bg: 'bg-red-50' },
  { parentId: 'IPDR', id: 'ibpn', name: 'Identify B Party Numbers', desc: 'Trace secondary contacts.', icon: (p) => <Search {...p} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { parentId: 'IPDR', id: 'ipdrr', name: 'IPDR Requisition', desc: 'Request official logs from ISPs.', icon: (p) => <FileText {...p} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { parentId: 'IPDR', id: 'cwip', name: 'Country-wise IPs', desc: 'Breakdown IP assignments globally.', icon: (p) => <Globe {...p} />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { parentId: 'IPDR', id: 'umn', name: 'Uncommon / Missing Numbers', desc: 'Detect anomalous IPs or ports.', icon: (p) => <UserMinus {...p} />, color: 'text-rose-500', bg: 'bg-rose-50' },
  { parentId: 'IPDR', id: 'sa', name: 'Split Analysis', desc: 'Detailed granular analysis of traffic.', icon: (p) => <Scissors {...p} />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { parentId: 'IPDR', id: 'ipdrd1', name: 'IPDR-DEMO_1', desc: 'Interactive demonstration module 1.', icon: (p) => <PlayCircle {...p} />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { parentId: 'IPDR', id: 'ipdrd2', name: 'IPDR-DEMO_2', desc: 'Interactive demonstration module 2.', icon: (p) => <PlayCircle {...p} />, color: 'text-pink-500', bg: 'bg-pink-50' }
];

export const ABOUTUS_TOOLS = [
  { parentId: 'AboutUs', id: 'au1', name: 'Introduction to NEXORA', fullName: 'Introduction to NEXORA', desc: 'Introduction to NEXORA module details and configuration.', icon: (p) => <Info {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'AboutUs', id: 'au2', name: 'Who We Are', fullName: 'Who We Are', desc: 'Who We Are module details and configuration.', icon: (p) => <Users {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'AboutUs', id: 'au3', name: 'Purpose of NEXORA', fullName: 'Purpose of NEXORA', desc: 'Purpose of NEXORA module details and configuration.', icon: (p) => <Target {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'AboutUs', id: 'au4', name: 'Objectives of NEXORA', fullName: 'Objectives of NEXORA', desc: 'Objectives of NEXORA module details and configuration.', icon: (p) => <Crosshair {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' },
  { parentId: 'AboutUs', id: 'au5', name: 'Vision of NEXORA', fullName: 'Vision of NEXORA', desc: 'Vision of NEXORA module details and configuration.', icon: (p) => <Eye {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'AboutUs', id: 'au6', name: 'Mission of NEXORA', fullName: 'Mission of NEXORA', desc: 'Mission of NEXORA module details and configuration.', icon: (p) => <Flag {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'AboutUs', id: 'au7', name: 'Our Core Values', fullName: 'Our Core Values', desc: 'Our Core Values module details and configuration.', icon: (p) => <Heart {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'AboutUs', id: 'au8', name: 'Our Journey Timeline', fullName: 'Our Journey Timeline', desc: 'Our Journey Timeline module details and configuration.', icon: (p) => <History {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'AboutUs', id: 'au9', name: 'Key Features of NEXORA', fullName: 'Key Features of NEXORA', desc: 'Key Features of NEXORA module details and configuration.', icon: (p) => <Star {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'AboutUs', id: 'au10', name: 'AI Innovation', fullName: 'AI Innovation', desc: 'AI Innovation module details and configuration.', icon: (p) => <Cpu {...p} />, color: 'text-violet-600', bg: 'bg-violet-100' },
  { parentId: 'AboutUs', id: 'au11', name: 'Workflow Automation', fullName: 'Workflow Automation', desc: 'Workflow Automation module details and configuration.', icon: (p) => <GitMerge {...p} />, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100' },
  { parentId: 'AboutUs', id: 'au12', name: 'Investigation Capabilities of NEXORA', fullName: 'Investigation Capabilities of NEXORA', desc: 'Investigation Capabilities of NEXORA module details and configuration.', icon: (p) => <Search {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'AboutUs', id: 'au13', name: 'Technology & Security of NEXORA', fullName: 'Technology & Security of NEXORA', desc: 'Technology & Security of NEXORA module details and configuration.', icon: (p) => <Key {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { parentId: 'AboutUs', id: 'au14', name: 'Research & Development (R&D)', fullName: 'Research & Development (R&D)', desc: 'Research & Development (R&D) module details and configuration.', icon: (p) => <Brain {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'AboutUs', id: 'au15', name: 'Quality Assurance', fullName: 'Quality Assurance', desc: 'Quality Assurance module details and configuration.', icon: (p) => <CheckCircle {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'AboutUs', id: 'au16', name: 'Performance & Reliability', fullName: 'Performance & Reliability', desc: 'Performance & Reliability module details and configuration.', icon: (p) => <Activity {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'AboutUs', id: 'au17', name: 'Data Protection', fullName: 'Data Protection', desc: 'Data Protection module details and configuration.', icon: (p) => <Shield {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' },
  { parentId: 'AboutUs', id: 'au18', name: 'Benefits of NEXORA', fullName: 'Benefits of NEXORA', desc: 'Benefits of NEXORA module details and configuration.', icon: (p) => <Layers {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'AboutUs', id: 'au19', name: 'Product Statistics', fullName: 'Product Statistics', desc: 'Product Statistics module details and configuration.', icon: (p) => <BarChart {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'AboutUs', id: 'au20', name: 'Global Presence', fullName: 'Global Presence', desc: 'Global Presence module details and configuration.', icon: (p) => <Globe {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'AboutUs', id: 'au21', name: 'Target Users of NEXORA', fullName: 'Target Users of NEXORA', desc: 'Target Users of NEXORA module details and configuration.', icon: (p) => <UserCheck {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'AboutUs', id: 'au22', name: 'Why Choose NEXORA', fullName: 'Why Choose NEXORA', desc: 'Why Choose NEXORA module details and configuration.', icon: (p) => <Lightbulb {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'AboutUs', id: 'au23', name: 'Our Commitment', fullName: 'Our Commitment', desc: 'Our Commitment module details and configuration.', icon: (p) => <Handshake {...p} />, color: 'text-violet-600', bg: 'bg-violet-100' },
  { parentId: 'AboutUs', id: 'au24', name: 'Support & Services', fullName: 'Support & Services', desc: 'Support & Services module details and configuration.', icon: (p) => <LifeBuoy {...p} />, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100' },
  { parentId: 'AboutUs', id: 'au25', name: 'Future Roadmap of NEXORA', fullName: 'Future Roadmap of NEXORA', desc: 'Future Roadmap of NEXORA module details and configuration.', icon: (p) => <TrendingUp {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'AboutUs', id: 'au26', name: 'Contact NEXORA', fullName: 'Contact NEXORA', desc: 'Contact NEXORA module details and configuration.', icon: (p) => <Phone {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { parentId: 'AboutUs', id: 'au27', name: 'Privacy Policy', fullName: 'Privacy Policy', desc: 'Privacy Policy module details and configuration.', icon: (p) => <Lock {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'AboutUs', id: 'au28', name: 'Terms & Conditions', fullName: 'Terms & Conditions', desc: 'Terms & Conditions module details and configuration.', icon: (p) => <FileSignature {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'AboutUs', id: 'au29', name: 'Data Protection Policy', fullName: 'Data Protection Policy', desc: 'Data Protection Policy module details and configuration.', icon: (p) => <ShieldCheck {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'AboutUs', id: 'au30', name: 'Information Security Policy', fullName: 'Information Security Policy', desc: 'Information Security Policy module details and configuration.', icon: (p) => <Database {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' },
  { parentId: 'AboutUs', id: 'au31', name: 'User Access & Authorization Policy', fullName: 'User Access & Authorization Policy', desc: 'User Access & Authorization Policy module details and configuration.', icon: (p) => <Key {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'AboutUs', id: 'au32', name: 'Data Retention & Disposal Policy', fullName: 'Data Retention & Disposal Policy', desc: 'Data Retention & Disposal Policy module details and configuration.', icon: (p) => <Scissors {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'AboutUs', id: 'au33', name: 'Data Classification Policy', fullName: 'Data Classification Policy', desc: 'Data Classification Policy module details and configuration.', icon: (p) => <Folder {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'AboutUs', id: 'au34', name: 'Data Sharing & Disclosure Policy', fullName: 'Data Sharing & Disclosure Policy', desc: 'Data Sharing & Disclosure Policy module details and configuration.', icon: (p) => <Share2 {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'AboutUs', id: 'au35', name: 'Lawful Access & Investigation Policy', fullName: 'Lawful Access & Investigation Policy', desc: 'Lawful Access & Investigation Policy module details and configuration.', icon: (p) => <Gavel {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'AboutUs', id: 'au36', name: 'Acceptable Use Policy', fullName: 'Acceptable Use Policy', desc: 'Acceptable Use Policy module details and configuration.', icon: (p) => <CheckCircle {...p} />, color: 'text-violet-600', bg: 'bg-violet-100' },
  { parentId: 'AboutUs', id: 'au37', name: 'IT Act & DPDP Act Compliance', fullName: 'IT Act & DPDP Act Compliance', desc: 'IT Act & DPDP Act Compliance module details and configuration.', icon: (p) => <Scale {...p} />, color: 'text-fuchsia-600', bg: 'bg-fuchsia-100' },
  { parentId: 'AboutUs', id: 'au38', name: 'Copyright & Intellectual Property Policy', fullName: 'Copyright & Intellectual Property Policy', desc: 'Copyright & Intellectual Property Policy module details and configuration.', icon: (p) => <Copyright {...p} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  { parentId: 'AboutUs', id: 'au39', name: 'Audit & Logging Policy', fullName: 'Audit & Logging Policy', desc: 'Audit & Logging Policy module details and configuration.', icon: (p) => <ClipboardList {...p} />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { parentId: 'AboutUs', id: 'au40', name: 'Incident Response Policy', fullName: 'Incident Response Policy', desc: 'Incident Response Policy module details and configuration.', icon: (p) => <AlertTriangle {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'AboutUs', id: 'au41', name: 'Disclaimer', fullName: 'Disclaimer', desc: 'Disclaimer module details and configuration.', icon: (p) => <AlertCircle {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'AboutUs', id: 'au42', name: 'Demo 1', fullName: 'Demo 1', desc: 'Demo 1 module details and configuration.', icon: (p) => <PlayCircle {...p} />, color: 'text-rose-600', bg: 'bg-rose-100' },
  { parentId: 'AboutUs', id: 'au43', name: 'Demo 2', fullName: 'Demo 2', desc: 'Demo 2 module details and configuration.', icon: (p) => <PlayCircle {...p} />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { parentId: 'AboutUs', id: 'au44', name: 'Demo 3', fullName: 'Demo 3', desc: 'Demo 3 module details and configuration.', icon: (p) => <PlayCircle {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' }
];

export const ACCOUNTSETTING_TOOLS = [
  { parentId: 'AccountSetting', id: 'as1', name: 'Profile', fullName: 'Profile', desc: 'Manage personal avatar, display name, user bio, and public account profile.', icon: (p) => <Users {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'AccountSetting', id: 'as6', name: 'Active Sessions', fullName: 'Active Sessions', desc: 'Monitor logged-in sessions, active IP addresses, and revoke remote access.', icon: (p) => <Activity {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'AccountSetting', id: 'as7', name: 'Device Management', fullName: 'Device Management', desc: 'Manage trusted hardware devices, registered workstations, and mobile devices.', icon: (p) => <Smartphone {...p} />, color: 'text-sky-600', bg: 'bg-sky-100' },
  { parentId: 'AccountSetting', id: 'as8', name: 'Login History', fullName: 'Login History', desc: 'Audit past authentication logs, location timestamps, and failed login attempts.', icon: (p) => <History {...p} />, color: 'text-teal-600', bg: 'bg-teal-100' },
  { parentId: 'AccountSetting', id: 'as9', name: 'Search History', fullName: 'Search History', desc: 'Access query logs, past intelligence searches, and recent case lookups.', icon: (p) => <Search {...p} />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { parentId: 'AccountSetting', id: 'as10', name: 'Timeline History', fullName: 'Timeline History', desc: 'Chronological sequence of all system activities and investigation timelines.', icon: (p) => <Clock {...p} />, color: 'text-violet-600', bg: 'bg-violet-100' },
  { parentId: 'AccountSetting', id: 'as11', name: 'Work History', fullName: 'Work History', desc: 'Review past investigation cases, assigned reports, and completed operational files.', icon: (p) => <Briefcase {...p} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { parentId: 'AccountSetting', id: 'as18', name: 'Subscription & Billing', fullName: 'Subscription & Billing', desc: 'Manage enterprise tier plan, invoice receipts, and billing payment methods.', icon: (p) => <CreditCard {...p} />, color: 'text-amber-600', bg: 'bg-amber-100' },
  { parentId: 'AccountSetting', id: 'as13', name: 'Delete History', fullName: 'Delete History', desc: 'Clear search cache, temporary logs, and local investigation history.', icon: (p) => <Scissors {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
  { parentId: 'AccountSetting', id: 'as15', name: 'Backup & Restore', fullName: 'Backup & Restore', desc: 'Configure encrypted cloud backups and restore account configuration snapshots.', icon: (p) => <Database {...p} />, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { parentId: 'AccountSetting', id: 'as16', name: 'Storage Usage', fullName: 'Storage Usage', desc: 'Monitor allocated cloud storage, index database size, and media attachments.', icon: (p) => <Layers {...p} />, color: 'text-purple-600', bg: 'bg-purple-100' },
  { parentId: 'AccountSetting', id: 'as26', name: 'Delete Account', fullName: 'Delete Account', desc: 'Request permanent account deletion and data wiping procedures.', icon: (p) => <UserX {...p} />, color: 'text-red-600', bg: 'bg-red-100' },
];

export const ALL_SUB_TOOLS = [
  ...ABOUTUS_TOOLS,
  ...ACCOUNTSETTING_TOOLS,
  ...SMI_TOOLS,
  ...SDR_TOOLS,
  ...OSINT_TOOLS,
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
