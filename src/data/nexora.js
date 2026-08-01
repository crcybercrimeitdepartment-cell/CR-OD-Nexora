/**
 * @file nexora.js
 * @description Central data registry for the Nexora Intelligence Platform home dashboard.
 *
 * Exports `NEXORA_MODULES` — an ordered array of 40 intelligence module card definitions.
 * Each entry maps directly to one <ToolCard> on the home grid.
 */
import {
  CDRIcon,
  SDRIcon,
  TDRIcon,
  ILDIcon,
  ITDRIcon,
  IPDRIcon,
  IDRIcon,
  LARIcon,
  OSINTIcon,
  SMIIcon,
  CTIIcon,
  BSARIcon,
  BRIIcon,
  RTOIIcon,
  PRIIcon,
  LIHIcon,
  BIIcon,
  FRIIcon,
  CCTVIIcon,
  LRIIcon,
  ERIIcon,
  KYCDIIcon,
  PSRIIcon,
  CoRIIcon,
  PORIIcon,
  CSRIIcon,
  TGRIIcon,
  GHLRIIcon,
  PPRIIcon,
  RIIIcon,
  PCRIIcon,
  CRIIcon,
  MIIIcon,
  MInfIIcon,
  MDRIIcon,
  TIIIcon,
  TDIIcon,
  IntelligenceModulesIcon,
  AboutUsIcon,
  ContactUsIcon
} from '../components/nexora';

export const NEXORA_MODULES = [
  {
    id: 'cdr',
    name: 'CDR',
    description: 'Call Detail Record - Call logs, tower locations, duration & IMEI history',
    icon: CDRIcon,
    bgColor: 'bg-[#FFECEC]',
    iconColor: 'text-[#EF4444]'
  },
  {
    id: 'sdr',
    name: 'SDR',
    description: 'Subscriber Detail Record - SIM CAF registration & subscriber identity audit',
    icon: SDRIcon,
    bgColor: 'bg-[#E3F2FD]',
    iconColor: 'text-[#3B82F6]'
  },
  {
    id: 'tdr',
    name: 'TDR',
    description: 'Tower Dump Record - Cell site BTS tower logs & co-location analysis',
    icon: TDRIcon,
    bgColor: 'bg-[#E0F7FA]',
    iconColor: 'text-[#06B6D4]'
  },
  {
    id: 'ild',
    name: 'ILD',
    description: 'International Long Distance - VOIP gateway, roaming & overseas call logs',
    icon: ILDIcon,
    bgColor: 'bg-[#ECFDF5]',
    iconColor: 'text-[#10B981]'
  },
  {
    id: 'itdr',
    name: 'ITDR',
    description: 'Internet Traffic Detail Record - Session logs & bandwidth consumption analysis',
    icon: ITDRIcon,
    bgColor: 'bg-[#F3E5F5]',
    iconColor: 'text-[#A855F7]'
  },
  {
    id: 'ipdr',
    name: 'IPDR',
    description: 'Internet Protocol Detail Record - IP allocation, NAT logs & host connection tracking',
    icon: IPDRIcon,
    bgColor: 'bg-[#FFF3E0]',
    iconColor: 'text-[#F97316]'
  },
  {
    id: 'idr',
    name: 'IDR',
    description: 'Internet Data Record - Domain requests, web activity & digital footprint trails',
    icon: IDRIcon,
    bgColor: 'bg-[#FCE4EC]',
    iconColor: 'text-[#EC4899]'
  },
  {
    id: 'lar',
    name: 'LAR',
    description: 'Location Analysis Record - Geo-triangulation, movement history & spatial tracking',
    icon: LARIcon,
    bgColor: 'bg-[#F5F3FF]',
    iconColor: 'text-[#7C3AED]'
  },
  {
    id: 'osint',
    name: 'OSINT',
    description: 'Open Source Intelligence - Digital footprinting, WHOIS & web archive lookup',
    icon: OSINTIcon,
    bgColor: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0284C7]'
  },
  {
    id: 'smi',
    name: 'SMI',
    description: 'Social Media Intelligence - Profile correlation & social graph mapping',
    icon: SMIIcon,
    bgColor: 'bg-[#FEF3C7]',
    iconColor: 'text-[#D97706]'
  },
  {
    id: 'cti',
    name: 'CTI',
    description: 'Cyber Threat Intelligence - Threat vector analysis & dark web IOC monitoring',
    icon: CTIIcon,
    bgColor: 'bg-[#FEF2F2]',
    iconColor: 'text-[#DC2626]'
  },
  {
    id: 'bsar',
    name: 'BSAR',
    description: 'Bank Statement Analysis Report - Credit/debit audits & transaction profiling',
    icon: BSARIcon,
    bgColor: 'bg-[#EFF6FF]',
    iconColor: 'text-[#2563EB]'
  },
  {
    id: 'bri',
    name: 'BRI',
    description: 'Bank Record Intelligence - Account details, IFSC mapping & transaction trails',
    icon: BRIIcon,
    bgColor: 'bg-[#EEF2FF]',
    iconColor: 'text-[#4F46E5]'
  },
  {
    id: 'rtoi',
    name: 'RTOI',
    description: 'Regional Transport Office Intelligence - Vehicle registration & owner history',
    icon: RTOIIcon,
    bgColor: 'bg-[#F1F5F9]',
    iconColor: 'text-[#475569]'
  },
  {
    id: 'pri',
    name: 'PRI',
    description: 'Passport Record Intelligence - Passport validation & travel immigration logs',
    icon: PRIIcon,
    bgColor: 'bg-[#F0FDF4]',
    iconColor: 'text-[#16A34A]'
  },
  {
    id: 'lih',
    name: 'LIH',
    description: 'Location & IP History - Historical IP logs & geo-location movement timeline',
    icon: LIHIcon,
    bgColor: 'bg-[#F5F3FF]',
    iconColor: 'text-[#6D28D9]'
  },
  {
    id: 'bi',
    name: 'BI',
    description: 'Business Intelligence - Corporate audit, financial indicators & company profiles',
    icon: BIIcon,
    bgColor: 'bg-[#ECFDF5]',
    iconColor: 'text-[#059669]'
  },
  {
    id: 'fri',
    name: 'FRI',
    description: 'Financial Record Intelligence - Monetary transaction trails & forex transfer audits',
    icon: FRIIcon,
    bgColor: 'bg-[#FEF3C7]',
    iconColor: 'text-[#B45309]'
  },
  {
    id: 'cctvi',
    name: 'CCTVI',
    description: 'CCTV Surveillance Intelligence - Camera feed timestamps & facial log analysis',
    icon: CCTVIIcon,
    bgColor: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0284C7]'
  },
  {
    id: 'lri',
    name: 'LRI',
    description: 'Land Record Intelligence - Property ownership, land revenue & deed registration',
    icon: LRIIcon,
    bgColor: 'bg-[#FDF2F8]',
    iconColor: 'text-[#DB2777]'
  },
  {
    id: 'eri',
    name: 'ERI',
    description: 'Education Record Intelligence - Academic degree verification & university records',
    icon: ERIIcon,
    bgColor: 'bg-[#FCE4EC]',
    iconColor: 'text-[#E11D48]'
  },
  {
    id: 'kycdi',
    name: 'KYCDI',
    description: 'KYC Data Intelligence - Identity verification, Aadhaar/PAN audit & KYC records',
    icon: KYCDIIcon,
    bgColor: 'bg-[#E3F2FD]',
    iconColor: 'text-[#2563EB]'
  },
  {
    id: 'psri',
    name: 'PSRI',
    description: 'Police Station Record Intelligence - FIR database, crime history & station logs',
    icon: PSRIIcon,
    bgColor: 'bg-[#FFF3E0]',
    iconColor: 'text-[#D97706]'
  },
  {
    id: 'cori',
    name: 'CoRI',
    description: 'Company Registration Intelligence - MCA corporate records & director DIN lookup',
    icon: CoRIIcon,
    bgColor: 'bg-[#FDF4FF]',
    iconColor: 'text-[#C026D3]'
  },
  {
    id: 'pori',
    name: 'PORI',
    description: 'Post Office Record Intelligence - Postal tracking & regional post office logs',
    icon: PORIIcon,
    bgColor: 'bg-[#FFF7ED]',
    iconColor: 'text-[#EA580C]'
  },
  {
    id: 'csri',
    name: 'CSRI',
    description: 'Courier Service Record Intelligence - Logistics manifest & consignment trails',
    icon: CSRIIcon,
    bgColor: 'bg-[#FEF2F2]',
    iconColor: 'text-[#DC2626]'
  },
  {
    id: 'tgri',
    name: 'TGRI',
    description: 'Toll Gate Record Intelligence - FASTag toll logs & ANPR camera vehicle captures',
    icon: TGRIIcon,
    bgColor: 'bg-[#F5F3FF]',
    iconColor: 'text-[#6D28D9]'
  },
  {
    id: 'ghlri',
    name: 'GHLRI',
    description: 'Guest House & Lodge Record Intelligence - Hotel check-in registers & visitor logs',
    icon: GHLRIIcon,
    bgColor: 'bg-[#ECFDF5]',
    iconColor: 'text-[#059669]'
  },
  {
    id: 'ppri',
    name: 'PPRI',
    description: 'Petrol Pump Record Intelligence - Fuel transaction logs & CCTV timestamp matching',
    icon: PPRIIcon,
    bgColor: 'bg-[#FEF3C7]',
    iconColor: 'text-[#B45309]'
  },
  {
    id: 'rii',
    name: 'RII',
    description: 'Railway Information Intelligence - PNR travel logs & train passenger manifests',
    icon: RIIIcon,
    bgColor: 'bg-[#E3F2FD]',
    iconColor: 'text-[#1D4ED8]'
  },
  {
    id: 'pcri',
    name: 'PCRI',
    description: 'Prison & Custody Record Intelligence - Inmate database & correctional facility logs',
    icon: PCRIIcon,
    bgColor: 'bg-[#EFF6FF]',
    iconColor: 'text-[#3B82F6]'
  },
  {
    id: 'cri',
    name: 'CRI',
    description: 'Criminal Record Intelligence - Offender history, warrant registry & crime analytics',
    icon: CRIIcon,
    bgColor: 'bg-[#FEF2F2]',
    iconColor: 'text-[#B91C1C]'
  },
  {
    id: 'mii',
    name: 'MII',
    description: 'Military & Defense Intelligence - Security clearance logs & defense strategic data',
    icon: MIIIcon,
    bgColor: 'bg-[#F1F5F9]',
    iconColor: 'text-[#334155]'
  },
  {
    id: 'minfi',
    name: 'MInfI',
    description: 'Media & Information Intelligence - News archive correlation & media monitoring',
    icon: MInfIIcon,
    bgColor: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0369A1]'
  },
  {
    id: 'mdri',
    name: 'MDRI',
    description: 'Medical Data Record Intelligence - Hospital admission logs & health registry data',
    icon: MDRIIcon,
    bgColor: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0284C7]'
  },
  {
    id: 'tii',
    name: 'TII',
    description: 'Telecom Infrastructure Intelligence - Cell tower topology & fiber line mapping',
    icon: TIIIcon,
    bgColor: 'bg-[#F3E5F5]',
    iconColor: 'text-[#7E22CE]'
  },
  {
    id: 'tdi',
    name: 'TDI',
    description: 'Tower Dump Intelligence - Cell site dump analytics & subscriber overlap discovery',
    icon: TDIIcon,
    bgColor: 'bg-[#E0F7FA]',
    iconColor: 'text-[#0891B2]'
  },
  {
    id: 'intelligence-modules',
    name: 'Intelligence Modules',
    description: 'Modular intelligence toolkits, specialized analytics & integration suites',
    icon: IntelligenceModulesIcon,
    bgColor: 'bg-[#EEF2FF]',
    iconColor: 'text-[#4338CA]'
  },
  {
    id: 'about-us',
    name: 'About Us',
    description: 'Learn more about Nexora platform architecture, intelligence capabilities & mission',
    icon: AboutUsIcon,
    bgColor: 'bg-[#F1F5F9]',
    iconColor: 'text-[#334155]'
  },
  {
    id: 'contact-us',
    name: 'Contact Us',
    description: 'Get in touch with our team for support, enterprise integration & general queries',
    icon: ContactUsIcon,
    bgColor: 'bg-[#FFECEC]',
    iconColor: 'text-[#DC2626]'
  }
];
