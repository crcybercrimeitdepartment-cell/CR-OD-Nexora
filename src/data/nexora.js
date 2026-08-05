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
  AccountSettingIcon
} from '../components/nexora';

export const NEXORA_MODULES = [
  {
    id: 'cdr',
    name: 'CDR',
    description: 'Call Detail Record - Advanced analytics for call logs, cell tower locations, and IMEI history tracking.',
    icon: CDRIcon,
    bgColor: 'bg-[#FFECEC]',
    iconColor: 'text-[#EF4444]'
  },
  {
    id: 'sdr',
    name: 'SDR',
    description: 'Subscriber Detail Record - Verify SIM registration, CAF details, and subscriber identity.',
    icon: SDRIcon,
    bgColor: 'bg-[#E3F2FD]',
    iconColor: 'text-[#3B82F6]'
  },
  {
    id: 'tdr',
    name: 'TDR',
    description: 'Tower Dump Record - Analyze cellular tower logs to uncover co-located numbers and patterns.',
    icon: TDRIcon,
    bgColor: 'bg-[#E0F7FA]',
    iconColor: 'text-[#06B6D4]'
  },
  {
    id: 'ild',
    name: 'ILD',
    description: 'International Long Distance - Track VOIP gateways, roaming records, and overseas communication logs.',
    icon: ILDIcon,
    bgColor: 'bg-[#ECFDF5]',
    iconColor: 'text-[#10B981]'
  },
  {
    id: 'itdr',
    name: 'ITDR',
    description: 'Internet Traffic Detail Record - Monitor session logs, bandwidth consumption, and digital activity.',
    icon: ITDRIcon,
    bgColor: 'bg-[#F3E5F5]',
    iconColor: 'text-[#A855F7]'
  },
  {
    id: 'ipdr',
    name: 'IPDR',
    description: 'Internet Protocol Detail Record - Trace IP allocations, NAT logs, and host connection histories.',
    icon: IPDRIcon,
    bgColor: 'bg-[#FFF3E0]',
    iconColor: 'text-[#F97316]'
  },
  {
    id: 'idr',
    name: 'IDR',
    description: 'Internet Data Record - Analyze domain requests, web activity, and digital footprints.',
    icon: IDRIcon,
    bgColor: 'bg-[#FCE4EC]',
    iconColor: 'text-[#EC4899]'
  },
  {
    id: 'lar',
    name: 'LAR',
    description: 'Location Analysis Record - Triangulate geolocation and map spatial movement tracking.',
    icon: LARIcon,
    bgColor: 'bg-[#F5F3FF]',
    iconColor: 'text-[#7C3AED]'
  },
  {
    id: 'osint',
    name: 'OSINT',
    description: 'Open Source Intelligence - Investigate public footprints, WHOIS records, and open web data.',
    icon: OSINTIcon,
    bgColor: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0284C7]'
  },
  {
    id: 'smi',
    name: 'SMI',
    description: 'Social Media Intelligence - Correlate profiles and map social graphs across platforms.',
    icon: SMIIcon,
    bgColor: 'bg-[#FEF3C7]',
    iconColor: 'text-[#D97706]'
  },

  {
    id: 'bsar',
    name: 'BSAR',
    description: 'Bank Statement Analysis Report - Audit credit/debit statements and profile financial transactions.',
    icon: BSARIcon,
    bgColor: 'bg-[#EFF6FF]',
    iconColor: 'text-[#2563EB]'
  },
  {
    id: 'bri',
    name: 'BRI',
    description: 'Bank Record Intelligence - Examine account details, IFSC mapping, and banking trails.',
    icon: BRIIcon,
    bgColor: 'bg-[#EEF2FF]',
    iconColor: 'text-[#4F46E5]'
  },
  {
    id: 'rtoi',
    name: 'RTOI',
    description: 'Regional Transport Office Intelligence - Lookup vehicle registrations, owner history, and RTO logs.',
    icon: RTOIIcon,
    bgColor: 'bg-[#F1F5F9]',
    iconColor: 'text-[#475569]'
  },
  {
    id: 'pri',
    name: 'PRI',
    description: 'Prison Record Intelligence - Track inmate databases, visitor logs, and correctional facility records.',
    icon: PRIIcon,
    bgColor: 'bg-[#F0FDF4]',
    iconColor: 'text-[#16A34A]'
  },
  {
    id: 'lih',
    name: 'LIH',
    description: 'Law Intelligence Hub - Access centralized legal databases and judicial archives.',
    icon: LIHIcon,
    bgColor: 'bg-[#F5F3FF]',
    iconColor: 'text-[#6D28D9]'
  },
  {
    id: 'bi',
    name: 'BI',
    description: 'Biometric Intelligence - Analyze biometric logs and identity verification systems.',
    icon: BIIcon,
    bgColor: 'bg-[#ECFDF5]',
    iconColor: 'text-[#059669]'
  },
  {
    id: 'fri',
    name: 'FRI',
    description: 'Facial Recognition Intelligence - Cross-reference facial logs and visual surveillance matches.',
    icon: FRIIcon,
    bgColor: 'bg-[#FEF3C7]',
    iconColor: 'text-[#B45309]'
  },

  {
    id: 'lri',
    name: 'LRI',
    description: 'Land Record Intelligence - Verify property ownership, land revenue, and deed registrations.',
    icon: LRIIcon,
    bgColor: 'bg-[#FDF2F8]',
    iconColor: 'text-[#DB2777]'
  },
  {
    id: 'eri',
    name: 'ERI',
    description: 'Education Record Intelligence - Authenticate academic degrees and university records.',
    icon: ERIIcon,
    bgColor: 'bg-[#FCE4EC]',
    iconColor: 'text-[#E11D48]'
  },
  {
    id: 'kycdi',
    name: 'KYCDI',
    description: 'KYC Document Intelligence - Verify identity documents, Aadhaar/PAN audits, and KYC records.',
    icon: KYCDIIcon,
    bgColor: 'bg-[#E3F2FD]',
    iconColor: 'text-[#2563EB]'
  },
  {
    id: 'psri',
    name: 'PSRI',
    description: 'Police Station Record Intelligence - Search FIR databases, crime history, and station logs.',
    icon: PSRIIcon,
    bgColor: 'bg-[#FFF3E0]',
    iconColor: 'text-[#D97706]'
  },
  {
    id: 'cori',
    name: 'CoRI',
    description: 'Court Record Intelligence - Access case status, court judgements, and judicial history.',
    icon: CoRIIcon,
    bgColor: 'bg-[#FDF4FF]',
    iconColor: 'text-[#C026D3]'
  },
  {
    id: 'pori',
    name: 'PORI',
    description: 'Post Office Record Intelligence - Track postal deliveries, addresses, and regional post office logs.',
    icon: PORIIcon,
    bgColor: 'bg-[#FFF7ED]',
    iconColor: 'text-[#EA580C]'
  },

  {
    id: 'tgri',
    name: 'TGRI',
    description: 'Toll Gate Record Intelligence - Analyze FASTag toll logs and ANPR vehicle captures.',
    icon: TGRIIcon,
    bgColor: 'bg-[#F5F3FF]',
    iconColor: 'text-[#6D28D9]'
  },
  {
    id: 'ghlri',
    name: 'GHLRI',
    description: 'Guest House & Lodge Record Intelligence - Review hotel check-in registers and visitor logs.',
    icon: GHLRIIcon,
    bgColor: 'bg-[#ECFDF5]',
    iconColor: 'text-[#059669]'
  },
  {
    id: 'ppri',
    name: 'PPRI',
    description: 'Petrol Pump Record Intelligence - Match fuel transaction logs with CCTV timestamps.',
    icon: PPRIIcon,
    bgColor: 'bg-[#FEF3C7]',
    iconColor: 'text-[#B45309]'
  },
  {
    id: 'rii',
    name: 'RII',
    description: 'Railway Information Intelligence - Analyze PNR travel logs and train passenger manifests.',
    icon: RIIIcon,
    bgColor: 'bg-[#E3F2FD]',
    iconColor: 'text-[#1D4ED8]'
  },
  {
    id: 'pcri',
    name: 'PCRI',
    description: 'PIN Code Record Intelligence - Map demographic and geographic intelligence by postal codes.',
    icon: PCRIIcon,
    bgColor: 'bg-[#EFF6FF]',
    iconColor: 'text-[#3B82F6]'
  },
  {
    id: 'cri',
    name: 'CRI',
    description: 'Company Registration Intelligence - Audit corporate records, regulatory registrations, and business intelligence.',
    icon: CRIIcon,
    bgColor: 'bg-[#FEF2F2]',
    iconColor: 'text-[#B91C1C]'
  },

  {
    id: 'mdri',
    name: 'MDRI',
    description: 'Medical Data Record Intelligence - Analyze hospital admission logs and health registry data.',
    icon: MDRIIcon,
    bgColor: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0284C7]'
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
    id: 'account-setting',
    name: 'Account Setting',
    description: 'Get in touch with our team for support, enterprise integration & general queries',
    icon: AccountSettingIcon,
    bgColor: 'bg-[#FFECEC]',
    iconColor: 'text-[#DC2626]'
  }
];
