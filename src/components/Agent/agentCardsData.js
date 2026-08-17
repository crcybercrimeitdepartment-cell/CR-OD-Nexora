/**
 * @file agentCardsData.js
 * @description Hardcoded details for all 24+ intelligence card modules for the Nexora AI Agent.
 */

export const AGENT_CARDS_DATA = {


  // =========================================================
  // 1. CDR
  // =========================================================

  cdr: {
    id: 'cdr',
    name: 'CDR Intelligence',
    shortName: 'CDR',
    subtitle: 'Call Detail Record',
    introduction: "CDR Intelligence is an advanced telecommunications intelligence module designed to process, analyze, and extract actionable insights from Call Detail Records provided by telecommunication service providers.",
    mission: "To streamline call record analysis, automate relationship discovery between calling parties, and provide instant chronological visibility into suspect telecommunications activity.",
    vision: "To establish an autonomous, multi-carrier telecom intelligence framework that correlates communication metadata with spatial, financial, and cyber datasets in real time.",
    whyChooseUs: [
      "High-speed multi-carrier file parsing (Airtel, Jio, Vi, BSNL)",
      "Automated B-Party relationship mapping & call frequency calculation",
      "Cell tower sector overlay & spatial activity timelines",
      "Cross-target communication comparison across multiple CDR datasets",
      "Audit-ready legal documentation & case export capabilities"
],
    keywords: ["CDR","Call Detail Record","Call Logs","Telecom Analysis","B-Party","Cell Tower","Call Duration","IMSI","IMEI","Telecom Intelligence"],
    other: "Supported Formats: CSV, XLS, XLSX, TXT, PDF. Security & Compliance: End-to-end AES-256 encryption, role-based access control (RBAC), tamper-evident audit logging, and national telecommunications compliance adherence.",


    overview: 'CDR Intelligence is a comprehensive communication-analysis module designed to process authorized Call Detail Records and convert large volumes of telecommunications metadata into structured and searchable intelligence. It provides a centralized environment for examining calling and receiving identifiers, communication dates and times, call duration, call type, frequency, and other available network information. The module helps analysts move beyond individual call records and understand broader communication patterns, recurring relationships, communication frequency, and chronological activity. CDR Intelligence is designed to support complex investigations where large amounts of communication information need to be reviewed systematically. It can also connect communication information with other authorized intelligence modules to provide broader case context while maintaining source attribution, access controls, and auditability.',

    purpose: 'The primary purpose of CDR Intelligence is to simplify the analysis of large volumes of call records and reduce the manual effort required to identify meaningful communication activity. A large CDR dataset may contain thousands or millions of individual records, making manual examination slow and difficult. The module provides structured search, filtering, grouping, comparison, timeline creation, relationship analysis, and reporting capabilities so that authorized users can focus on relevant information. It is designed to help users understand who communicated with whom within the available records, when communication occurred, how frequently communication took place, how communication patterns changed over time, and which relationships may require further review. The module supports analytical decision-making but does not independently establish intent or wrongdoing.',

    work: 'The module imports and normalizes authorized CDR files and organizes available information according to calling identifiers, receiving identifiers, dates, times, duration, call type, network information, and other supported metadata. Users can search records using individual or combined criteria and narrow large datasets to a specific investigation period. CDR Intelligence can identify frequently occurring communication relationships, calculate communication frequency, analyze call-duration patterns, compare activity across different periods, and generate chronological communication timelines. Users can examine individual communication relationships as well as broader communication networks. The module can also correlate CDR information with other authorized intelligence sources such as subscriber records, tower information, location records, and case information. This allows analysts to build a broader picture while keeping the original source of each record visible. The platform can provide dashboards showing communication volume, frequent contacts, activity trends, duration statistics, and relationship summaries. Analysts can save relevant searches, associate records with authorized cases, add observations, and generate structured investigation reports. All sensitive operations can be protected through role-based permissions, audit logs, encryption, and controlled data retention.',

    benefits: [
      'Reduces manual CDR record analysis.',
      'Makes large communication datasets easier to search and filter.',
      'Helps identify recurring communication relationships.',
      'Supports chronological communication timeline creation.',
      'Provides communication frequency and duration analysis.',
      'Supports multi-target communication comparison.',
      'Improves cross-module intelligence correlation.',
      'Provides centralized case-based communication analysis.',
      'Improves investigation documentation and reporting.',
      'Supports auditable and controlled analytical workflows.'
    ],

    useCases: [
      'Authorized communication investigation',
      'Communication-pattern analysis',
      'Case timeline creation',
      'Relationship and network analysis',
      'Fraud investigation',
      'Incident reconstruction',
      'Telecom record analysis',
      'Multi-target communication comparison'
    ],

    featureMenu: [
      { name: 'CDR Upload & Parsing Engine', desc: 'Import, validate, parse, and normalize authorized CDR files from supported telecom data formats into a standardized analytical structure.' },
      { name: 'Advanced CDR Search & Filtering', desc: 'Search communication records using identifiers, dates, time ranges, duration, call type, network information, and investigation-specific filters.' },
      { name: 'Frequent Contact & Link Analysis', desc: 'Discover recurring communication relationships and organize connected identifiers for relationship analysis.' },
      { name: 'Communication Frequency Analytics', desc: 'Analyze call frequency, communication volume, duration patterns, and activity distribution across selected periods.' },
      { name: 'Chronological Communication Timeline', desc: 'Generate visual timelines showing incoming and outgoing communication events in chronological order.' },
      { name: 'Cell Tower Correlation', desc: 'Correlate communication records with authorized tower or sector information where such records are available.' },
      { name: 'Cross-CDR Multi-Target Correlation', desc: 'Compare multiple authorized CDR datasets to identify shared communication relationships and overlapping activity.' },
      { name: 'Communication Network Graph', desc: 'Visualize available communication relationships through an interactive connection graph.' },
      { name: 'Peak Activity Analysis', desc: 'Identify periods with high or concentrated communication activity within the selected dataset.' },
      { name: 'Case-Based CDR Workspace', desc: 'Associate communication records, searches, observations, and reports with an authorized investigation or case.' },
      { name: 'CDR Analytics Dashboard', desc: 'Display communication volume, frequent contacts, activity trends, duration statistics, and relationship summaries.' },
      { name: 'Investigation Report Generator', desc: 'Generate structured CDR reports containing search criteria, communication summaries, timelines, observations, and supporting records.' }
    ]
  },


  // =========================================================
  // 2. SDR
  // =========================================================

  sdr: {
    id: 'sdr',
    name: 'SDR Intelligence',
    shortName: 'SDR',
    subtitle: 'Subscriber Detail Record',
    introduction: "SDR Intelligence is a subscriber record analysis module designed to aggregate, verify, and correlate telecommunications subscriber identity records across multiple telecom operators.",
    mission: "To simplify subscriber identity verification, eliminate manual record matching across disparate carrier databases, and establish verified subscriber profiles for authorized investigations.",
    vision: "To create a real-time subscriber verification network integrated with national identity frameworks for instant profile cross-validation.",
    whyChooseUs: [
      "Centralized subscriber identity profile aggregation",
      "Multi-attribute search across phone numbers, names, addresses, and IDs",
      "Historical SIM activation, deactivation, and service status tracking",
      "Seamless correlation with CDR, TDR, and case management modules",
      "Automated subscriber verification status workflows and reporting"
],
    keywords: ["SDR","Subscriber Detail Record","Subscriber Profile","CAF","Telecom Identity","SIM Owner","Subscriber Address","Mobile Registration"],
    other: "Compliance: Adheres to telecommunications regulator data protection guidelines. Capabilities: Batch subscriber lookup, historical address tracking, and secure integration APIs.",


    overview: 'SDR Intelligence is a subscriber-information analysis module designed to organize authorized telecommunications subscriber records into detailed and searchable profiles. It provides a centralized environment for reviewing subscriber information, connection details, service status, activation and deactivation history, available telecom identifiers, and other permitted subscriber metadata. The module helps users understand subscriber records in a structured way instead of manually searching through multiple telecom files or systems. SDR Intelligence can also connect subscriber information with other authorized telecommunications and case records to provide broader analytical context.',

    purpose: 'The primary purpose of SDR Intelligence is to simplify subscriber verification and provide a structured connection between telecom identifiers and available subscriber information. Subscriber records may be distributed across different files, systems, or historical records, making manual verification difficult. SDR Intelligence brings relevant information into a centralized workspace where authorized users can search, compare, review historical information, verify available details, and associate subscriber records with appropriate cases. The module is intended to improve accuracy, reduce repetitive manual work, and provide a consistent process for subscriber-related analysis.',

    work: 'The module imports and normalizes authorized subscriber records and creates searchable subscriber profiles. It organizes available information such as subscriber identifiers, connection details, service status, activation dates, deactivation dates, available address information, and other permitted telecom metadata. Users can search subscriber records using multiple identifiers and filters. The system can display connection history, compare available records, track verification status, and organize historical changes where such information is available. SDR Intelligence can correlate subscriber information with authorized CDR, tower, location, and case records. This allows users to move from subscriber information to related communication or investigation information while preserving the source and authorization context. The module can also maintain verification history, reviewer notes, audit records, dashboards, and structured subscriber reports. Role-based access can ensure that sensitive subscriber information is available only to authorized personnel.',

    benefits: [
      'Provides centralized subscriber information.',
      'Speeds up subscriber verification.',
      'Reduces manual telecom-record searching.',
      'Supports subscriber history analysis.',
      'Improves correlation between subscriber and communication records.',
      'Provides structured verification workflows.',
      'Supports case-based subscriber analysis.',
      'Improves documentation and reporting.'
    ],

    useCases: [
      'Subscriber verification',
      'Authorized telecom investigation',
      'Connection history analysis',
      'Telecom record correlation',
      'Fraud investigation',
      'Case documentation',
      'Subscriber record management'
    ],

    featureMenu: [
      { name: 'Subscriber Record Import', desc: 'Import and normalize authorized subscriber records into a standardized searchable structure.' },
      { name: 'Subscriber Profile Management', desc: 'Create detailed subscriber profiles containing available connection, service, and identification information.' },
      { name: 'Subscriber Search Engine', desc: 'Search subscriber records using available identifiers, connection information, service status, and supported filters.' },
      { name: 'Connection History', desc: 'Review available activation, deactivation, service, and connection history.' },
      { name: 'Subscriber Record Correlation', desc: 'Connect subscriber records with other authorized telecom and case information.' },
      { name: 'Subscriber Verification Workflow', desc: 'Track verification requests, review status, supporting information, and authorized reviewer observations.' },
      { name: 'Record Change Tracking', desc: 'Maintain available historical changes to subscriber information for authorized review.' },
      { name: 'Subscriber Analytics Dashboard', desc: 'Display subscriber counts, statuses, connection trends, and verification statistics.' },
      { name: 'Case Association', desc: 'Associate relevant subscriber profiles and records with authorized investigation cases.' },
      { name: 'Subscriber Intelligence Reports', desc: 'Generate structured reports containing subscriber information, verification results, history, and supporting records.' }
    ]
  },


  // =========================================================
  // 3. TDR
  // =========================================================

  tdr: {
    id: 'tdr',
    name: 'TDR Intelligence',
    shortName: 'TDR',
    subtitle: 'Tower Dump Record',
    introduction: "TDR Intelligence is a cellular location analysis module built to process Tower Dump Records and isolate mobile device activity surrounding specific crime scenes and time windows.",
    mission: "To isolate suspicious device activity within high-density cellular tower logs and identify common devices across multiple tower locations during critical investigation windows.",
    vision: "To deliver 3D spatio-temporal tower sector visualization and predictive movement path modeling for complex location-based investigations.",
    whyChooseUs: [
      "Multi-tower overlap detection to isolate recurring suspect devices",
      "Precision time-window filtering down to millisecond timestamps",
      "Interactive map visualization with tower location and sector azimuths",
      "High-throughput parsing of massive multi-gigabyte tower dumps",
      "Automated suspect scoring based on arrival and departure patterns"
],
    keywords: ["TDR","Tower Dump Record","Cell Tower","Tower Dump","Sector Analysis","Geofence","Tower Overlap","Location Incident"],
    other: "Supported Formats: Carrier raw dump files (Excel/CSV/Text). Features: Spatial geofencing algorithms, sector angle overlay, and cross-case tower comparison.",


    overview: 'TDR Intelligence is a specialized telecommunications and network-location analysis module designed to process, organize, search, and analyze authorized Tower Dump Records. Tower dump datasets can contain a large volume of network activity associated with one or more cellular towers, sectors, geographic areas, and specific time periods. The module transforms these complex records into a centralized intelligence environment where authorized analysts can examine activity according to tower, sector, identifier, date, time, geographic reference, and case. It is particularly useful when an investigation begins with a specific location and time window rather than a known individual. TDR Intelligence provides tower analysis, sector analysis, time-based filtering, activity timelines, comparison tools, geographic visualization where supported, cross-record correlation, dashboards, and structured reporting.',

    purpose: 'The primary purpose of TDR Intelligence is to make large and complex tower datasets manageable, searchable, comparable, and analytically useful. Raw tower records can contain a substantial number of events, making manual review time-consuming and making it difficult to recognize recurring activity or focus on a specific investigation period. TDR Intelligence allows authorized users to start with a tower, sector, geographic area, date, or time range and progressively narrow the available information. It supports location and tower-based analysis, time-window investigation, sector comparison, identifier activity review, chronological reconstruction, cross-record correlation, and structured reporting. The module provides analytical observations rather than automatically determining identity, intent, or physical presence.',

    work: 'The module imports and normalizes authorized tower dump records and organizes available information according to tower identifiers, sectors, timestamps, network information, identifiers, and geographic references. Users can select a specific tower, sector, date, and time range to focus the analysis on relevant records. TDR Intelligence can analyze identifier activity, identify repeated appearances, compare tower and sector activity, and generate chronological timelines. Users can review how available records are distributed across towers and sectors and compare activity during different investigation periods. Where authorized geographic information is available, the module can provide map-based visualization and geographic summaries. It can also correlate tower information with CDR, SDR, LAR, and other permitted case information. The platform can provide dashboards showing tower activity, sector distribution, time-based activity, identifier frequency, and comparison results. Analysts can save relevant searches, associate findings with authorized cases, record observations, and generate structured reports. Access to sensitive telecommunications and location-related information can be controlled through roles, permissions, audit logs, encryption, and retention policies.',

    benefits: [
      'Makes large tower datasets easier to analyze.',
      'Reduces manual tower-record filtering.',
      'Supports precise date and time analysis.',
      'Provides tower and sector comparison.',
      'Helps create chronological network-activity timelines.',
      'Supports authorized geographic analysis.',
      'Improves cross-record correlation.',
      'Helps prioritize relevant records for review.',
      'Provides structured investigation reporting.',
      'Supports auditable analytical workflows.'
    ],

    useCases: [
      'Authorized incident investigation',
      'Event-area analysis',
      'Tower activity analysis',
      'Sector comparison',
      'Timeline reconstruction',
      'Network activity analysis',
      'Location-related investigation support',
      'Case intelligence'
    ],

    featureMenu: [
      { name: 'Tower Dump Upload & Parsing', desc: 'Import, validate, parse, and normalize authorized tower dump files into a standardized analytical structure.' },
      { name: 'Tower & Sector Explorer', desc: 'Browse tower and sector information and review associated records within selected investigation parameters.' },
      { name: 'Time-Window Activity Analysis', desc: 'Filter tower activity using precise dates and time ranges to focus analysis on relevant periods.' },
      { name: 'Identifier Activity Analysis', desc: 'Review the appearance, frequency, and distribution of available identifiers within selected tower and sector records.' },
      { name: 'Tower Comparison', desc: 'Compare activity across multiple towers and sectors during the same or different time periods.' },
      { name: 'Tower Activity Timeline', desc: 'Generate chronological timelines showing available tower and sector events.' },
      { name: 'Tower Activity Visualization', desc: 'Present available tower and geographic information through map-based analytical interfaces.' },
      { name: 'Repeated Activity Detection', desc: 'Highlight recurring records and activity patterns according to configured analytical criteria.' },
      { name: 'Cross-Record Correlation', desc: 'Correlate TDR information with other authorized telecom, location, or case records.' },
      { name: 'TDR Analytics Dashboard', desc: 'Display tower activity, sector distribution, time-based activity, record counts, and comparison summaries.' },
      { name: 'Case-Based TDR Workspace', desc: 'Organize tower records, searches, observations, notes, and reports within an authorized investigation case.' },
      { name: 'TDR Report Generator', desc: 'Generate structured reports containing tower information, selected periods, search criteria, timelines, observations, and supporting records.' }
    ]
  },


  // =========================================================
  // 4. ILD
  // =========================================================

  ild: {
    id: 'ild',
    name: 'ILD Intelligence',
    shortName: 'ILD',
    subtitle: 'International Long Distance',
    introduction: "ILD Intelligence processes international long-distance communication records, gateway routing metadata, and cross-border calls to identify international contact networks.",
    mission: "To detect unauthorized international call bypass, map cross-border criminal networks, and analyze international communication trends.",
    vision: "To build a global international communication surveillance framework featuring automated risk scoring and international gateway monitoring.",
    whyChooseUs: [
      "Automated international country-code normalization & time-zone conversion",
      "Identification of international gateways, VoIP trunks, and high-risk destinations",
      "Cross-border contact frequency analytics and duration profiling",
      "Interactive international communication link graphs",
      "Exportable international investigation summary reports"
],
    keywords: ["ILD","International Long Distance","International Calls","VoIP Gateway","Country Code","Cross-Border Calls","International Routing"],
    other: "Security & Compliance: ISO/IEC 27001 compliant architecture. Features: Dual timestamp conversion (UTC vs local network time) and country risk classification.",


    overview: 'ILD Intelligence is a specialized telecommunications intelligence module designed to organize and analyze authorized International Long Distance communication records. International communication data can span multiple countries, regions, destinations, identifiers, time zones, dates, durations, and communication relationships, making manual analysis difficult. The module converts these records into a structured analytical environment where users can examine international communication by country, destination, identifier, date, time, duration, frequency, and available network metadata. It provides international communication timelines, destination analysis, frequency analysis, duration analysis, recurring relationship analysis, time-zone normalization, activity trends, relationship visualization, cross-module correlation, dashboards, and reporting.',

    purpose: 'The primary purpose of ILD Intelligence is to simplify the analysis of large-scale international communication records and provide authorized users with a consistent way to understand international communication activity. The module helps users identify frequently occurring destinations, analyze communication frequency, review duration patterns, examine chronological activity, compare different periods, and understand recurring communication relationships. It is designed to reduce manual review across large datasets and provide structured analytical context. The module does not independently determine the intent or meaning of an international communication event; it provides organized information that authorized users can evaluate alongside other available evidence.',

    work: 'The module imports and normalizes authorized international communication records and organizes available information according to origin identifiers, destination identifiers, countries or regions, dates, times, duration, call type, and network metadata. Users can search and filter records by destination, country, identifier, time period, duration, or communication type. ILD Intelligence can group records by country and destination, analyze communication frequency, calculate available duration statistics, and create chronological communication timelines. It can identify recurring communication relationships and compare international communication activity across different periods. Because international records can involve different time zones, the module can provide standardized timestamp views such as original network time, UTC, or an investigation-selected timezone while preserving the original record information. The module can also provide relationship graphs showing connections between identifiers and destinations, dashboards containing communication statistics, and cross-module correlation with authorized CDR, SDR, OSINT, and case records. Users can associate analysis with authorized investigations, record observations, maintain review history, and generate structured reports.',

    benefits: [
      'Centralizes international communication records.',
      'Simplifies cross-border communication analysis.',
      'Provides country and destination-level analysis.',
      'Supports communication frequency analysis.',
      'Helps identify recurring communication relationships.',
      'Supports international communication timelines.',
      'Makes time-zone comparison easier.',
      'Supports cross-module intelligence correlation.',
      'Reduces manual international telecom analysis.',
      'Improves reporting and case documentation.'
    ],

    useCases: [
      'Authorized international communication investigation',
      'Cross-border communication analysis',
      'International fraud investigation',
      'Communication timeline creation',
      'Destination analysis',
      'Communication pattern analysis',
      'International activity trend analysis',
      'Case documentation'
    ],

    featureMenu: [
      { name: 'ILD Record Upload & Parsing', desc: 'Import, validate, parse, and normalize authorized international communication records into a common analytical structure.' },
      { name: 'International Destination Analysis', desc: 'Group and analyze communication activity by country, region, or available international destination information.' },
      { name: 'International Communication Timeline', desc: 'Generate chronological timelines showing international communication activity across selected periods.' },
      { name: 'Communication Frequency Analysis', desc: 'Analyze international communication volume by day, week, month, destination, or selected time period.' },
      { name: 'Call Duration Analytics', desc: 'Analyze available communication duration, total duration, average duration, and duration patterns across destinations.' },
      { name: 'Recurring Destination Analysis', desc: 'Identify destinations and communication relationships that repeatedly occur within the authorized dataset.' },
      { name: 'Time-Zone Normalization', desc: 'Present international timestamps in a consistent investigation timezone while preserving original record-time information.' },
      { name: 'International Relationship Graph', desc: 'Visualize available relationships between communication identifiers and international destinations.' },
      { name: 'International Activity Trends', desc: 'Compare international communication activity across selected dates and periods to identify changes in volume or frequency.' },
      { name: 'Cross-Module ILD Correlation', desc: 'Correlate international communication information with other authorized telecom, OSINT, or case records.' },
      { name: 'International Communication Dashboard', desc: 'Display destinations, communication volume, frequency, duration, timelines, and activity trends through interactive dashboards.' },
      { name: 'ILD Investigation Report Generator', desc: 'Generate structured international communication reports containing destination analysis, timelines, statistics, observations, and supporting records.' }
    ]
  },


  // =========================================================
  // 5. ITDR
  // =========================================================

  itdr: {
    id: 'itdr',
    name: 'ITDR Intelligence',
    shortName: 'ITDR',
    subtitle: 'Internet Traffic Detail Record',
    introduction: "ITDR Intelligence processes internet traffic detail records, ISP session logs, protocol distributions, and bandwidth utilization data to profile network activity.",
    mission: "To provide granular visibility into subscriber internet sessions, detect abnormal traffic spikes, and trace internet usage timelines.",
    vision: "To establish predictive network traffic profiling capable of detecting hidden encrypted tunnels, proxy usage, and malicious command-and-control traffic.",
    whyChooseUs: [
      "High-performance ISP log parsing and session normalization",
      "Protocol distribution breakdown and bandwidth usage heatmaps",
      "Chronological internet session timeline reconstruction",
      "Automated anomaly detection for abnormal data transfer volumes",
      "Direct integration with IPDR and subscriber identity datasets"
],
    keywords: ["ITDR","Internet Traffic Detail Record","Internet Traffic","ISP Logs","Session Duration","Bandwidth Analysis","Network Protocols"],
    other: "Data Sources: NetFlow, IPFIX, syslog, and raw ISP session databases. Auditability: Immutable query audit trails and strict data retention controls.",


    overview: 'ITDR Intelligence is a specialized network-traffic analysis module designed to process authorized Internet Traffic Detail Records and convert large volumes of network activity metadata into structured intelligence. Internet traffic datasets can contain extensive information about sessions, timestamps, protocols, traffic categories, network identifiers, duration, and other available technical metadata. The module organizes these records into searchable sessions, chronological activity, traffic patterns, protocol summaries, and analytical dashboards. It provides authorized users with a centralized environment for understanding network activity across selected time periods and for connecting relevant traffic events with other permitted intelligence sources.',

    purpose: 'The purpose of ITDR Intelligence is to make large and complex internet traffic datasets easier to process, search, analyze, compare, and document. Network traffic records can contain thousands or millions of individual events, making manual review inefficient. ITDR provides structured tools for session analysis, time-based filtering, protocol analysis, traffic-volume analysis, recurring activity detection, event timeline creation, and cross-record correlation. The module helps authorized analysts focus on relevant network events while preserving source information and maintaining controlled access to sensitive network data.',

    work: 'The module imports and normalizes authorized ITDR datasets and organizes records according to timestamps, sessions, network identifiers, protocols, traffic types, duration, and other available metadata. Users can filter the dataset by date, time, session, protocol, identifier, or traffic category. ITDR Intelligence can group related events into available sessions and create chronological network-activity timelines. It can analyze traffic distribution, available traffic volume, session duration, protocol patterns, and recurring activity across selected periods. The module can compare network activity across different time windows and highlight records that meet configured analytical criteria. It can correlate relevant traffic information with IPDR, CDR, case, and other authorized records where appropriate. An analytics dashboard can present session counts, activity trends, protocol distribution, duration statistics, and timeline summaries. Users can save searches, associate records with authorized cases, add observations, and generate structured ITDR reports.',

    benefits: [
      'Simplifies large-scale network traffic analysis.',
      'Reduces manual review of traffic records.',
      'Provides searchable and filterable network information.',
      'Supports session and timeline analysis.',
      'Helps identify recurring network activity.',
      'Supports cybersecurity investigation workflows.',
      'Improves network-event correlation.',
      'Provides structured analytical reporting.'
    ],

    useCases: [
      'Network investigation',
      'Cybersecurity analysis',
      'Network traffic analysis',
      'Incident investigation',
      'Session analysis',
      'Digital investigation',
      'Network activity reporting'
    ],

    featureMenu: [
      { name: 'ITDR Upload & Parsing Engine', desc: 'Import and normalize authorized internet traffic records from supported data formats.' },
      { name: 'Traffic Session Analysis', desc: 'Organize available traffic events into searchable sessions and review their duration and activity.' },
      { name: 'Network Activity Timeline', desc: 'Generate chronological timelines of available network traffic events.' },
      { name: 'Protocol & Traffic Analysis', desc: 'Analyze available protocol, traffic-type, and network metadata across selected records.' },
      { name: 'Traffic Volume Analytics', desc: 'Analyze available traffic volume and activity distribution across selected periods.' },
      { name: 'Network Activity Filtering', desc: 'Filter records using timestamps, identifiers, sessions, protocols, traffic types, and other supported criteria.' },
      { name: 'Recurring Activity Detection', desc: 'Identify repeated network sessions or activity patterns based on configurable analytical criteria.' },
      { name: 'Cross-Record Correlation', desc: 'Correlate network traffic events with other authorized records and case information.' },
      { name: 'ITDR Analytics Dashboard', desc: 'Display traffic activity, sessions, protocols, trends, and time-based network statistics.' },
      { name: 'Incident-Based Workspace', desc: 'Organize traffic analysis, observations, records, and reports within an authorized incident or case.' },
      { name: 'ITDR Report Generator', desc: 'Generate structured reports containing traffic summaries, timelines, sessions, statistics, and analytical observations.' }
    ]
  },


  // =========================================================
  // 6. IPDR
  // =========================================================

  ipdr: {
    id: 'ipdr',
    name: 'IPDR Intelligence',
    shortName: 'IPDR',
    subtitle: 'Internet Protocol Detail Record',
    introduction: "IPDR Intelligence processes internet protocol session logs, IP allocation records, port translations, and NAT mapping data to correlate IP addresses with physical subscribers.",
    mission: "To resolve public and private IP addresses to specific subscriber profiles and trace digital communication endpoints across ISP backbones.",
    vision: "To provide real-time Carrier-Grade NAT (CGNAT) resolution and automated IP location intelligence across national ISP networks.",
    whyChooseUs: [
      "Automated CGNAT port-mapping & subscriber identity resolution",
      "Source and destination IP/Port session correlation",
      "Real-time IP geolocation and ISP infrastructure lookup",
      "Chronological IP session timeline construction",
      "Seamless linking with CDR, SDR, and cyber investigation modules"
],
    keywords: ["IPDR","Internet Protocol Detail Record","IP Address","CGNAT","Port Allocation","IP Session","ISP Lookup","NAT Logs"],
    other: "Compliance: Meets national cyber law IP log preservation mandates. Protocols: Supports IPv4, IPv6, CGNAT logs, and WHOIS database enrichment.",


    overview: 'IPDR Intelligence is an Internet Protocol analysis module designed to process authorized IP and network-session records and convert them into structured intelligence. It provides a centralized environment for analyzing IP addresses, session activity, timestamps, protocols, ports where available, network identifiers, duration, and other supported metadata. The module helps authorized analysts examine IP activity chronologically, identify recurring sessions, compare network events, and correlate relevant IP information with other permitted records.',

    purpose: 'The purpose of IPDR Intelligence is to provide a structured and searchable environment for IP-related analysis. Large IP datasets can be difficult to review manually because they contain numerous sessions and technical events distributed across different time periods. The module helps users locate relevant IP activity, examine sessions, compare events, identify recurring patterns, construct timelines, and organize findings for authorized investigations. It also provides a controlled environment for connecting IP activity with other authorized subscriber, telecom, network, or case information.',

    work: 'The module imports and normalizes authorized IPDR records and organizes available information according to IP address, timestamp, session, protocol, port where available, network identifier, duration, and other supported metadata. Users can search and filter records using one or multiple criteria. IPDR Intelligence can group related events into sessions, analyze session duration, identify recurring IP activity, and generate chronological IP timelines. Users can compare IP activity across different dates and time periods and examine relationships between available network identifiers. Where legally authorized and technically supported, IP information can be correlated with relevant subscriber or network records. The module can also connect IP activity with case information, provide analytical dashboards, maintain audit history, and generate structured reports. The system should preserve source information and clearly distinguish raw IP records from analytical observations or conclusions made by authorized users.',

    benefits: [
      'Provides centralized IP activity analysis.',
      'Speeds up IP record searching.',
      'Supports session-level analysis.',
      'Helps create IP activity timelines.',
      'Improves network-event correlation.',
      'Supports authorized cyber investigations.',
      'Reduces manual IP record review.',
      'Improves analytical reporting.'
    ],

    useCases: [
      'Cyber investigation',
      'Network analysis',
      'Incident response',
      'IP activity analysis',
      'Digital evidence correlation',
      'Network security investigation',
      'Case documentation'
    ],

    featureMenu: [
      { name: 'IPDR Upload & Parsing', desc: 'Import and normalize authorized IPDR datasets into a standardized analytical format.' },
      { name: 'IP Address Search', desc: 'Search and filter available records by IP address and associated metadata.' },
      { name: 'IP Session Analysis', desc: 'Organize available IP events into sessions and review session duration and activity.' },
      { name: 'IP Activity Timeline', desc: 'Generate chronological timelines of IP-related network activity.' },
      { name: 'Protocol & Port Analysis', desc: 'Analyze available protocol and port information associated with IP sessions.' },
      { name: 'Recurring IP Activity', desc: 'Identify repeated IP sessions or activity patterns within selected periods.' },
      { name: 'IP Relationship Analysis', desc: 'Analyze relationships between IP addresses, sessions, and available network identifiers.' },
      { name: 'Authorized Subscriber Correlation', desc: 'Correlate IP records with authorized subscriber or network records where available.' },
      { name: 'IPDR Analytics Dashboard', desc: 'Display IP activity, sessions, protocols, duration, and time-based network statistics.' },
      { name: 'IPDR Case Workspace', desc: 'Organize IP records, searches, notes, observations, and reports within authorized cases.' },
      { name: 'IPDR Report Generator', desc: 'Generate structured IP analysis reports containing timelines, sessions, observations, and supporting records.' }
    ]
  },


  // =========================================================
  // 7. IDR
  // =========================================================

  idr: {
    id: 'idr',
    name: 'IDR Intelligence',
    shortName: 'IDR',
    subtitle: 'Internet Data Record',
    introduction: "IDR Intelligence aggregates general internet activity records, web domain interactions, and digital footprint logs into a centralized analytical workspace.",
    mission: "To synthesize disparate internet activity data into structured timelines, surface recurring web interactions, and support cyber investigations.",
    vision: "To combine multi-source internet footprint records into AI-driven digital behavior graphs for predictive threat intelligence.",
    whyChooseUs: [
      "Centralized internet footprint aggregation across diverse log sources",
      "Domain frequency and category classification engines",
      "Automated timeline of user web sessions and digital events",
      "Cross-correlation with IPDR and telecom datasets",
      "Intuitive multi-filter search interface"
],
    keywords: ["IDR","Internet Data Record","Web Activity","Domain Logs","Digital Footprint","Internet History","Web Sessions"],
    other: "Privacy Standards: Fully privacy-compliant data handling. Includes domain categorization, URL sanitization, and automated session indexing.",


    overview: 'IDR Intelligence is a centralized internet-data analysis module designed to organize and analyze authorized Internet Data Records. It brings fragmented internet activity information into a structured environment where users can search, filter, compare, group, and analyze available internet-related records. The module provides a broader internet activity view that can include sessions, timestamps, identifiers, network information, activity types, and other available metadata. It helps analysts create timelines, identify recurring activity, compare different periods, and connect relevant records with other authorized intelligence.',

    purpose: 'The purpose of IDR Intelligence is to transform fragmented internet-related records into organized and searchable information. Internet datasets may come from different sources and may use different structures, making manual comparison difficult. IDR provides a centralized workspace where authorized users can search across available records, organize activity chronologically, identify repeated events, compare activity periods, and build structured case information. It is designed to reduce manual data handling while improving analytical visibility and reporting.',

    work: 'The module imports and normalizes authorized internet data and organizes records according to identifiers, timestamps, sessions, network information, activity types, and other available metadata. Users can search and filter records by date, time, identifier, session, activity type, and other supported criteria. IDR Intelligence can group related records, construct internet activity timelines, analyze frequency and trends, and identify recurring activity. It can compare selected periods and connect related records where authorized. The module can also correlate internet information with other authorized network and case records, provide dashboards for activity summaries, maintain case workspaces, and generate structured reports containing timelines, observations, statistics, and supporting records.',

    benefits: [
      'Centralizes internet-related records.',
      'Makes large datasets easier to search.',
      'Supports internet activity timeline creation.',
      'Helps identify recurring activity patterns.',
      'Improves cross-record correlation.',
      'Reduces manual data review.',
      'Supports structured case reporting.'
    ],

    useCases: [
      'Digital investigation',
      'Cybersecurity analysis',
      'Internet activity analysis',
      'Network intelligence',
      'Incident investigation',
      'Case research'
    ],

    featureMenu: [
      { name: 'Internet Data Import Engine', desc: 'Import and normalize authorized internet activity records from supported sources.' },
      { name: 'Internet Activity Search', desc: 'Search internet records using available identifiers, dates, sessions, and activity attributes.' },
      { name: 'Internet Activity Timeline', desc: 'Create chronological timelines from available internet events.' },
      { name: 'Session & Event Grouping', desc: 'Group related internet records into sessions or analytical event clusters.' },
      { name: 'Internet Activity Trends', desc: 'Analyze activity volume and frequency across selected time periods.' },
      { name: 'Cross-Record Correlation', desc: 'Connect related internet records with other authorized intelligence sources.' },
      { name: 'IDR Analytics Dashboard', desc: 'Display internet activity trends, sessions, timelines, and record statistics.' },
      { name: 'Case-Based Internet Workspace', desc: 'Associate internet records and analysis with authorized cases and investigations.' },
      { name: 'IDR Report Generator', desc: 'Generate structured reports containing internet activity summaries, timelines, and analytical observations.' }
    ]
  },


  // =========================================================
  // 8. LAR
  // =========================================================

  lar: {
    id: 'lar',
    name: 'LAR Intelligence',
    shortName: 'LAR',
    subtitle: 'Location Analysis Record',
    introduction: "LAR Intelligence processes location coordinate records, GPS logs, cellular location pings, and spatial movement data to analyze suspect mobility.",
    mission: "To transform raw spatial coordinate pings into clear movement timelines, stay-point clusters, and co-location relationship graphs.",
    vision: "To deliver real-time spatial movement analytics, automated stay-point detection, and multi-target co-location discovery.",
    whyChooseUs: [
      "High-precision map visualization & interactive route tracking",
      "Automated stay-point & frequent location clustering algorithms",
      "Multi-target co-presence & meeting location detection",
      "Timeline-based spatial movement playback",
      "Custom geofence alert creation and monitoring"
],
    keywords: ["LAR","Location Analysis Record","Location Tracking","GPS Logs","Movement Heatmap","Stay Point","Co-location","Geofence"],
    other: "Mapping Engines: OpenStreetMap, Mapbox, and custom GIS layers. Supported Formats: KML, GPX, GeoJSON, and cellular location pings.",


    overview: 'LAR Intelligence is a geographic and location-analysis module designed to organize authorized location records into structured movement and geographic intelligence. It provides tools for reviewing location events chronologically, visualizing available geographic information, identifying recurring locations, comparing activity across time periods, and connecting location information with other authorized case records. The module converts individual location events into a broader analytical picture while maintaining the distinction between recorded location information and conclusions drawn by investigators.',

    purpose: 'The purpose of LAR Intelligence is to simplify the analysis of large location datasets and transform individual geographic events into understandable timelines and location patterns. Location information may be distributed across many records, making it difficult to manually understand movement sequences or recurring locations. LAR provides map-based visualization, chronological analysis, location filtering, comparison, clustering, and correlation tools that help authorized users examine geographic information systematically.',

    work: "The module imports and normalizes authorized location records according to coordinates or location identifiers, timestamps, areas, event types, and associated identifiers. Users can search records by date, time, area, identifier, or other supported filters. LAR Intelligence can display permitted location information on interactive maps and create chronological movement timelines. It can identify frequently occurring locations, compare location activity across periods, group nearby events, and provide geographic summaries. The module can correlate location events with other authorized telecom, transport, or case records where appropriate. It can provide dashboards, case workspaces, analytical notes, audit information, and structured geographic reports. The platform should clearly communicate the limitations of location data and should not automatically treat a location event as definitive proof of a person's physical presence.",

    benefits: [
      'Converts raw location records into structured geographic information.',
      'Provides visual map-based analysis.',
      'Supports chronological movement analysis.',
      'Helps identify recurring locations.',
      'Makes large location datasets easier to review.',
      'Supports authorized cross-record correlation.',
      'Improves geographic investigation reporting.'
    ],

    useCases: [
      'Geographic analysis',
      'Movement analysis',
      'Incident reconstruction',
      'Location timeline creation',
      'Authorized investigation',
      'Geographic case intelligence'
    ],

    featureMenu: [
      { name: 'Location Data Import', desc: 'Import and normalize authorized location records into a consistent geographic format.' },
      { name: 'Interactive Location Map', desc: 'Visualize authorized location events on an interactive map with configurable filters.' },
      { name: 'Movement Timeline', desc: 'Generate chronological timelines showing available location events and movement sequences.' },
      { name: 'Location History Search', desc: 'Search authorized location records by date, time, identifier, area, or supported criteria.' },
      { name: 'Frequently Occurring Locations', desc: 'Identify locations that repeatedly appear within the selected authorized dataset.' },
      { name: 'Location Comparison', desc: 'Compare location activity across different dates, periods, or authorized identifiers.' },
      { name: 'Geographic Clustering', desc: 'Group nearby location events into analytical geographic clusters.' },
      { name: 'Cross-Module Location Correlation', desc: 'Correlate location events with other authorized telecom, transport, or case records.' },
      { name: 'Location Analytics Dashboard', desc: 'Display movement statistics, event counts, geographic distributions, and timeline summaries.' },
      { name: 'LAR Report Generator', desc: 'Generate structured geographic reports containing maps, timelines, selected records, and analytical observations.' }
    ]
  },


  // =========================================================
  // 9. OSINT
  // =========================================================

  osint: {
    id: 'osint',
    name: 'OSINT Intelligence',
    shortName: 'OSINT',
    subtitle: 'Open Source Intelligence',
    introduction: "OSINT Intelligence collects, analyzes, and cross-references publicly available web information, domain records, digital footprints, and open-source data.",
    mission: "To automate open-source intelligence gathering, expose digital assets, verify public profiles, and deliver comprehensive threat assessment dossiers.",
    vision: "To operate an autonomous AI web crawler engine for multi-tier open web search and dark web exposure monitoring.",
    whyChooseUs: [
      "Automated open-source intelligence gathering across public web sources",
      "Domain WHOIS, DNS, and IP footprint resolution",
      "Email address and phone number digital exposure search",
      "Data breach exposure checking & metadata extraction",
      "Structured OSINT investigation dossier generation"
],
    keywords: ["OSINT","Open Source Intelligence","Digital Footprint","Domain Lookup","WHOIS","Public Records","Dark Web","Email Lookup"],
    other: "Ethics & Compliance: Operates within ethical and legal open-source intelligence boundaries. Preserves web snapshots and evidence hashes.",


    overview: 'OSINT Intelligence is a public-source research and intelligence module designed to discover, collect, organize, verify, correlate, and analyze information available from lawful and publicly accessible sources. It provides a centralized research environment for working with public websites, government portals, public documents, news sources, company information, online publications, public databases, and other permitted open sources. The module helps transform scattered public information into structured entity profiles, timelines, relationships, source collections, and intelligence reports.',

    purpose: 'The purpose of OSINT Intelligence is to reduce the time and effort required to conduct extensive public-source research. Analysts often need to examine information across many independent websites and documents, which can make it difficult to maintain consistency and track where each finding originated. OSINT Intelligence provides a structured workspace where users can search permitted public sources, organize findings, preserve source references, compare information, identify relationships, build timelines, and prepare reports. The module emphasizes source attribution and verification so that users can distinguish confirmed information from unverified or conflicting information.',

    work: 'The module allows authorized users to define research subjects and search permitted public sources. Results can be collected and organized into structured entities such as people, organizations, websites, domains, locations, documents, and events. OSINT Intelligence can extract relevant information from publicly accessible sources, organize source references, create research timelines, identify relationships between entities, compare information from multiple sources, and highlight potentially conflicting information for human review. Users can maintain research notes, attach public documents, classify findings, record source URLs or references, and associate findings with authorized cases. The platform can provide relationship graphs, source dashboards, timeline views, search history, and structured intelligence reports.',

    benefits: [
      'Reduces manual public-source research.',
      'Centralizes information from multiple public sources.',
      'Improves research organization.',
      'Supports source tracking and verification.',
      'Helps identify relationships between public entities.',
      'Supports timeline and event analysis.',
      'Makes large-scale public research more efficient.',
      'Improves intelligence reporting.'
    ],

    useCases: [
      'Open-source investigation',
      'Public-record research',
      'Corporate research',
      'Due diligence',
      'Cyber threat research',
      'Background research',
      'Public-profile research',
      'Intelligence reporting'
    ],

    featureMenu: [
      { name: 'Multi-Source Search Workspace', desc: 'Search and organize results from permitted public websites and open sources within a centralized research interface.' },
      { name: 'Entity Research', desc: 'Create structured profiles for people, organizations, domains, locations, and other research subjects.' },
      { name: 'Source Verification & Tracking', desc: 'Maintain source references and help users evaluate reliability and consistency of collected information.' },
      { name: 'Public Document Discovery', desc: 'Find and organize publicly accessible documents, reports, publications, and records relevant to research.' },
      { name: 'OSINT Timeline Builder', desc: 'Arrange publicly sourced events and information chronologically to create structured research timelines.' },
      { name: 'Relationship Mapping', desc: 'Visualize relationships between publicly available entities, organizations, websites, documents, and events.' },
      { name: 'Duplicate Result Detection', desc: 'Identify repeated or substantially similar public-source information to reduce redundant research.' },
      { name: 'Source Comparison', desc: 'Compare information from multiple public sources and highlight differences or conflicting information for human review.' },
      { name: 'OSINT Case Workspace', desc: 'Organize research findings, sources, notes, entities, and reports within an authorized case.' },
      { name: 'OSINT Report Generator', desc: 'Generate structured research reports with sources, findings, timelines, relationships, and analyst observations.' }
    ]
  },


  // =========================================================
  // 10. SMI
  // =========================================================

  smi: {
    id: 'smi',
    name: 'SMI Intelligence',
    shortName: 'SMI',
    subtitle: 'Social Media Intelligence',
    introduction: "SMI Intelligence analyzes public social media accounts, user posts, network handles, follower connections, and digital sentiment.",
    mission: "To extract actionable intelligence from public social media platforms, trace digital handle ownership, and map social interaction networks.",
    vision: "To deliver real-time social threat detection, synthetic account network mapping, and AI-driven sentiment analysis.",
    whyChooseUs: [
      "Cross-platform social media handle matching",
      "Interactive connection and follower graph visualization",
      "Post activity timelines and engagement analytics",
      "Automated keyword, hashtag, and media monitoring",
      "Exportable social media intelligence reports"
],
    keywords: ["SMI","Social Media Intelligence","Social Handles","Profile Tracking","Network Graph","Hashtag Analysis","Digital Persona"],
    other: "API Compliance: Fully compliant with platform developer policies. Includes tamper-evident evidence archiving and screenshot hash verification.",


    overview: 'SMI Intelligence is a public social-media research and analysis module designed to organize and analyze publicly accessible social-media information. It provides a structured environment for reviewing public profiles, publicly available posts, activity timelines, public interactions, topics, trends, and other permitted information. The module helps users transform scattered public social-media information into organized profiles, timelines, relationships, topic summaries, and research reports while respecting applicable privacy requirements, platform policies, and access restrictions.',

    purpose: 'The purpose of SMI Intelligence is to reduce the manual effort involved in researching publicly accessible social-media information. Public information can be distributed across different platforms and may change frequently, making systematic research difficult. SMI provides a centralized workspace where authorized users can organize public findings, track sources, analyze timelines, compare information, examine public relationships, identify recurring topics, and generate structured reports. It should clearly distinguish directly observed public information from analytical interpretation.',

    work: 'The module organizes permitted public social-media information into profiles, posts, timelines, public interactions, topics, and relationships. Users can search public content using supported keywords, dates, profiles, topics, or other permitted criteria. SMI Intelligence can build activity timelines, identify recurring public topics, analyze public trends, organize source references, and visualize publicly observable relationships. It can also compare information across permitted public sources and identify duplicated or conflicting information for human review. Users can associate public-source research with authorized cases, maintain analyst notes, preserve source references, and generate structured reports. The platform should not bypass privacy controls, authentication, platform restrictions, or access limitations.',

    benefits: [
      'Reduces manual social-media research.',
      'Centralizes publicly available social information.',
      'Supports public-profile analysis.',
      'Helps create activity timelines.',
      'Supports public relationship analysis.',
      'Makes social trends easier to review.',
      'Improves source organization and reporting.'
    ],

    useCases: [
      'Authorized public-profile research',
      'Social-media investigation',
      'Threat research',
      'Reputation analysis',
      'Social trend analysis',
      'Public-source intelligence',
      'Case research'
    ],

    featureMenu: [
      { name: 'Public Profile Research', desc: 'Organize publicly accessible profile information into structured research records.' },
      { name: 'Social Activity Timeline', desc: 'Create chronological views of publicly available posts and activity.' },
      { name: 'Public Relationship Analysis', desc: 'Map publicly observable relationships and interactions within the permitted dataset.' },
      { name: 'Topic & Trend Analysis', desc: 'Identify recurring topics, keywords, hashtags, and public discussion trends.' },
      { name: 'Content Search & Filtering', desc: 'Search permitted public content using dates, keywords, profiles, topics, and other available criteria.' },
      { name: 'Source Tracking', desc: 'Maintain references to the public sources used during research.' },
      { name: 'Social Intelligence Dashboard', desc: 'Display activity trends, public profiles, topics, timelines, and relationship summaries.' },
      { name: 'SMI Case Workspace', desc: 'Organize public social-media research within an authorized investigation or research case.' },
      { name: 'SMI Report Generator', desc: 'Generate structured reports containing public-source findings, timelines, relationships, and analyst observations.' }
    ]
  },


  // =========================================================
  // 11. BSAR
  // =========================================================

  bsar: {
    id: 'bsar',
    name: 'BSAR Intelligence',
    shortName: 'BSAR',
    subtitle: 'Bank Statement Analysis Report',
    introduction: "BSAR Intelligence parses bank account statements, transaction registers, credit/debit logs, and fund transfer records for forensic auditing.",
    mission: "To detect financial fraud patterns, uncover money laundering conduits, and automate complex bank statement auditing.",
    vision: "To establish automated financial crime detection using graph neural networks and real-time transaction tracking.",
    whyChooseUs: [
      "Automated multi-bank PDF & Excel statement parsing",
      "Layering and circular transaction flow detection algorithms",
      "Interactive entity transaction graphs (sender to receiver)",
      "High-value and round-number anomaly alert engines",
      "Audit-ready financial forensic summaries"
],
    keywords: ["BSAR","Bank Statement","Financial Audit","Money Laundering","Transaction Analysis","Forensic Accounting","Fund Flow"],
    other: "Bank Compatibility: Supports 100+ national and international bank statement formats. Security: Encryption at rest and strict financial data privacy.",


    overview: 'BSAR Intelligence is a financial-record analysis module designed to process authorized bank statements and transaction records and convert them into structured financial intelligence. It provides tools for extracting and organizing transaction information, analyzing credits and debits, reviewing balances, categorizing transactions, identifying recurring activity, creating financial timelines, comparing periods, and preparing structured financial reports. The module is designed to help authorized users understand complex bank statements without manually reviewing every transaction individually.',

    purpose: 'The purpose of BSAR Intelligence is to reduce the time and manual effort required to review large bank statements and transaction datasets. Financial statements can contain thousands of entries, repeated transactions, varying descriptions, and multiple transaction categories. BSAR provides a centralized environment where users can search, filter, categorize, compare, summarize, and analyze transactions. It helps identify recurring activity and statistical patterns while ensuring that any unusual-activity indicators remain review flags rather than automatic conclusions of fraud or wrongdoing.',

    work: 'The module imports authorized bank statements and converts available transaction information into structured records. It organizes transactions according to dates, amounts, descriptions, transaction types, balances, and other available information. BSAR can categorize transactions, calculate credit and debit totals, identify recurring transactions, analyze transaction frequency, create chronological financial timelines, and compare activity across selected periods. Users can filter transactions using amount ranges, dates, categories, descriptions, or other available criteria. The module can provide dashboards showing financial summaries, transaction distributions, recurring activity, balance trends, and category statistics. Users can associate statements with authorized cases, maintain review notes, preserve supporting documents, and generate structured Bank Statement Analysis Reports.',

    benefits: [
      'Reduces manual bank-statement review.',
      'Processes large transaction datasets efficiently.',
      'Provides structured transaction analysis.',
      'Helps identify recurring financial activity.',
      'Supports chronological financial analysis.',
      'Improves transaction categorization.',
      'Supports financial investigation reporting.',
      'Makes complex statements easier to understand.'
    ],

    useCases: [
      'Authorized financial investigation',
      'Transaction analysis',
      'Fraud review',
      'Audit support',
      'Financial due diligence',
      'Case-based financial analysis',
      'Statement verification'
    ],

    featureMenu: [
      { name: 'Bank Statement Upload & Parsing', desc: 'Import authorized bank statements and convert transaction information into structured records.' },
      { name: 'Transaction Categorization', desc: 'Organize transactions into configurable categories using available transaction information.' },
      { name: 'Credit & Debit Analysis', desc: 'Analyze incoming and outgoing transactions, totals, frequencies, and balance changes.' },
      { name: 'Recurring Transaction Detection', desc: 'Identify repeated transaction patterns and recurring financial activity for authorized review.' },
      { name: 'Financial Timeline', desc: 'Create chronological views of account transactions and significant financial events.' },
      { name: 'Transaction Search & Filtering', desc: 'Search transactions by date, amount, description, category, transaction type, and other supported criteria.' },
      { name: 'Transaction Pattern Analysis', desc: 'Analyze transaction frequency, amounts, categories, and changes across selected periods.' },
      { name: 'Statement Summary Dashboard', desc: 'Display credits, debits, balances, transaction counts, categories, and financial trends.' },
      { name: 'Case-Based Financial Workspace', desc: 'Associate statements, transactions, analysis, observations, and reports with authorized cases.' },
      { name: 'BSAR Report Generator', desc: 'Generate structured financial analysis reports with transaction summaries, timelines, statistics, and observations.' }
    ]
  },


  // =========================================================
  // 12. BRI
  // =========================================================

  bri: {
    id: 'bri',
    name: 'BRI Intelligence',
    shortName: 'BRI',
    subtitle: 'Bank Record Intelligence',
    introduction: "BRI (Bike & Vehicle Record Intelligence) processes vehicle registration data, owner profiles, vehicle classes, and chassis/engine numbers.",
    mission: "To instantly verify vehicle ownership credentials, trace stolen vehicles, and cross-reference regional transport office records.",
    vision: "To integrate ANPR camera networks with national vehicle databases for real-time suspicious vehicle alerting.",
    whyChooseUs: [
      "Instant vehicle registration number lookup",
      "Complete RTO owner & registration status details",
      "Chassis and engine number cross-verification",
      "Multi-vehicle ownership history tracking",
      "Integration with toll gate transit logs and ANPR feeds"
],
    keywords: ["BRI","Vehicle Registration","RTO Intelligence","Number Plate","Chassis Number","Vehicle Owner","ANPR"],
    other: "Database Connectivity: Direct reference lookups with national transport databases. Features automated plate format standardization.",


    overview: 'BRI Intelligence is a broader financial-record intelligence module designed to organize and analyze authorized banking information across accounts, transactions, financial relationships, and historical records. While BSAR focuses primarily on statement analysis, BRI provides a wider financial intelligence environment that can connect multiple authorized banking records and organize them around accounts, entities, transactions, cases, and timelines. It supports financial record searching, account activity analysis, transaction relationship analysis, cross-account comparison, trend analysis, and structured financial reporting.',

    purpose: 'The purpose of BRI Intelligence is to provide a unified environment for analyzing authorized banking information from multiple records and sources. Financial information may be distributed across account records, transaction datasets, statements, and supporting documents. BRI brings this information together so authorized users can examine account activity, compare records, identify recurring relationships, construct financial timelines, and correlate relevant records. It is designed to provide broader context than a single bank statement and improve the organization of financial intelligence during authorized investigations, audits, compliance activities, and due-diligence workflows.',

    work: 'The module imports and normalizes authorized banking records and organizes them into account profiles, transaction histories, financial relationships, timelines, and analytical views. Users can search accounts and transactions using identifiers, dates, amounts, descriptions, and other supported criteria.BRI Intelligence can compare activity across multiple authorized accounts, identify recurring transactions, analyze transaction relationships, review changes across time periods, and create financial timelines. It can associate financial records with cases, documents, entities, and other authorized information.nThe platform can provide account-level dashboards, financial relationship graphs, transaction summaries, case workspaces, review histories, and structured reports. Sensitive financial information can be protected through role-based access, encryption, audit logs, and controlled data retention.',

    benefits: [
      'Centralizes authorized banking information.',
      'Provides broader financial record analysis.',
      'Supports account and transaction relationship analysis.',
      'Makes financial records easier to search.',
      'Supports cross-record correlation.',
      'Improves case-level financial visibility.',
      'Reduces manual financial research.',
      'Supports structured reporting.'
    ],

    useCases: [
      'Financial investigation',
      'Fraud analysis',
      'Financial due diligence',
      'Compliance review',
      'Audit support',
      'Bank-record research',
      'Case intelligence'
    ],

    featureMenu: [
      { name: 'Bank Record Import Engine', desc: 'Import and normalize authorized banking records from supported sources.' },
      { name: 'Account Profile Management', desc: 'Create structured profiles for authorized financial accounts and associated records.' },
      { name: 'Account Activity Timeline', desc: 'Display chronological financial activity associated with selected accounts.' },
      { name: 'Transaction Relationship Analysis', desc: 'Analyze relationships between authorized accounts and transaction records.' },
      { name: 'Financial Record Search', desc: 'Search banking records using account, date, amount, transaction, and other supported filters.' },
      { name: 'Cross-Account Analysis', desc: 'Compare activity across multiple authorized accounts within an investigation.' },
      { name: 'Financial Pattern Analytics', desc: 'Analyze transaction frequency, recurring activity, and changes across selected periods.' },
      { name: 'BRI Analytics Dashboard', desc: 'Display account counts, transaction statistics, activity trends, and financial summaries.' },
      { name: 'Case-Based Financial Workspace', desc: 'Organize authorized financial records, analysis, observations, and reports by case.' },
      { name: 'BRI Report Generator', desc: 'Generate structured financial intelligence reports containing account activity, timelines, relationships, and observations.' }
    ]
  },


  // =========================================================
  // 13. RTOI
  // =========================================================

  rtoi: {
    id: 'rtoi',
    name: 'RTOI Intelligence',
    shortName: 'RTOI',
    subtitle: 'Regional Transport Office Intelligence',
    introduction: "RTOI Intelligence processes driving license databases, transport permits, vehicle fitness certificates, and RTO regional records.",
    mission: "To provide instant validation of driving credentials, commercial permits, and driver licensing details across states.",
    vision: "To unify interstate transport department records into a single seamless licensing intelligence platform.",
    whyChooseUs: [
      "Driving license validation and photo cross-matching",
      "Transport permit and vehicle fitness certificate verification",
      "Interstate licensing database correlation",
      "Duplicate license detection across state jurisdictions",
      "Automated driver profile compilation"
],
    keywords: ["RTOI","RTO Intelligence","Driving License","Transport Permit","Vehicle Licensing","RTO Records","Driver Profile"],
    other: "Regulatory Alignment: Aligned with national road transport data standards. Includes license status tracking and enforcement history.",


    overview: 'RTOI Intelligence is a vehicle and transport-record analysis module designed to organize authorized vehicle registration and transport information into structured intelligence. It provides searchable vehicle profiles containing available registration details, vehicle characteristics, registration history, status, permits, fitness information, and other permitted transport metadata. The module helps users verify vehicle information, review historical records, compare available records, connect vehicles with authorized cases, and generate structured vehicle intelligence reports.',

    purpose: 'The purpose of RTOI Intelligence is to simplify vehicle verification and transport-record analysis by bringing relevant information into a centralized system. Vehicle information can be spread across registration records, permits, certificates, historical documents, and other transport records. RTOI organizes this information so authorized users can quickly search, review, compare, and document vehicle-related information. It is designed to reduce manual searching and improve consistency in vehicle verification and case-related transport analysis.',

    work: 'The module organizes authorized vehicle records according to registration identifiers, vehicle details, registration dates, status, available ownership-related information, permits, fitness information, and other supported transport data. Users can search for vehicles using available registration identifiers and additional filters. RTOI can provide vehicle profiles, registration histories, document associations, status tracking, record comparison, and case association. Users can review available historical changes and identify inconsistencies requiring further verification. The module can also provide transport analytics dashboards and structured reports. Access to sensitive vehicle or ownership-related information should be controlled according to user roles and applicable authorization.',

    benefits: [
      'Speeds up vehicle verification.',
      'Centralizes authorized transport information.',
      'Makes vehicle records easier to search.',
      'Supports vehicle history analysis.',
      'Improves transport-record organization.',
      'Supports case-based vehicle analysis.',
      'Improves reporting and documentation.'
    ],

    useCases: [
      'Vehicle verification',
      'Transport investigation',
      'Vehicle record analysis',
      'Authorized background research',
      'Case documentation',
      'Transport intelligence'
    ],

    featureMenu: [
      { name: 'Vehicle Record Search', desc: 'Search authorized vehicle information using registration numbers and other available identifiers.' },
      { name: 'Vehicle Profile', desc: 'Display a structured profile containing available vehicle registration and transport information.' },
      { name: 'Registration History', desc: 'Review available vehicle registration events and historical status information.' },
      { name: 'Permit & Fitness Analysis', desc: 'Organize available permit, fitness, and validity information for authorized review.' },
      { name: 'Vehicle Record Comparison', desc: 'Compare available vehicle information across records and identify inconsistencies for review.' },
      { name: 'Vehicle Case Association', desc: 'Associate authorized vehicle records with investigation cases and related intelligence.' },
      { name: 'Transport Analytics Dashboard', desc: 'Display vehicle statistics, registration trends, statuses, and record summaries.' },
      { name: 'RTOI Report Generator', desc: 'Generate structured vehicle intelligence reports containing profile information, history, observations, and supporting records.' }
    ]
  },


  // =========================================================
  // 14. PRI
  // =========================================================

  pri: {
    id: 'pri',
    name: 'PRI Intelligence',
    shortName: 'PRI',
    subtitle: 'Prison Record Intelligence',
    introduction: "PRI Intelligence manages passport details, visa records, border entry/exit logs, and travel document verification data.",
    mission: "To trace international travel histories, detect forged travel documents, and verify passport holder identities.",
    vision: "To establish automated border control intelligence cross-referencing international watchlists in real time.",
    whyChooseUs: [
      "Passport status and travel history verification",
      "Border exit/entry log chronological timelines",
      "Visa category and validity cross-checking",
      "Dual passport and identity anomaly detection",
      "Secure case workspace for travel investigations"
],
    keywords: ["PRI","Passport Record Intelligence","Immigration Logs","Visa Details","Travel History","Border Control","Passport Verification"],
    other: "Security Level: Diplomatic-grade data security with role-restricted access. Fully encrypted passport and travel log storage.",


    overview: 'PRI Intelligence is an authorized correctional-record intelligence module designed to organize and analyze relevant prison and correctional records within a secure centralized environment. It provides tools for searching authorized records, reviewing institutional information, organizing case references, maintaining historical timelines, associating supporting documents, tracking review activity, and generating controlled reports. Because correctional records can contain highly sensitive information, the module is designed around strong role-based access, auditability, security, and controlled data handling.',

    purpose: 'The purpose of PRI Intelligence is to improve the organization, retrieval, and analysis of authorized correctional information while maintaining strict security and access controls. Correctional records can be distributed across different systems and documents, making manual retrieval difficult. PRI provides a centralized workspace that allows authorized users to locate relevant records, review historical information, organize case information, track authorized activities, and prepare structured documentation.',

    work: 'The module imports or connects authorized correctional records and organizes them into structured profiles, institutional records, case references, documents, timelines, and review information. Users can search records using supported identifiers and filters and can review information relevant to a particular authorized case or administrative workflow. PRI can organize available admission, institutional, case, document, and historical information where permitted. It can build timelines, associate records with cases, track authorized review activities, and maintain notes and observations. The platform can provide controlled dashboards, audit logs, role-based access, case workspaces, and report generation. Sensitive correctional information should be accessible only to appropriately authorized users.',

    benefits: [
      'Centralizes authorized correctional records.',
      'Improves record retrieval.',
      'Supports structured case management.',
      'Provides historical record organization.',
      'Improves institutional documentation.',
      'Supports controlled information access.',
      'Provides auditability and reporting.'
    ],

    useCases: [
      'Correctional administration',
      'Authorized case investigation',
      'Record verification',
      'Institutional reporting',
      'Case management',
      'Correctional record research'
    ],

    featureMenu: [
      { name: 'Correctional Record Search', desc: 'Search authorized prison and correctional records using supported identifiers and filters.' },
      { name: 'Individual Record Profile', desc: 'Present an authorized structured view of relevant correctional information.' },
      { name: 'Institutional Timeline', desc: 'Organize available institutional events chronologically.' },
      { name: 'Case Reference Management', desc: 'Associate correctional records with authorized case references and related documentation.' },
      { name: 'Document Management', desc: 'Store and organize authorized correctional documents and supporting records.' },
      { name: 'Access & Audit Controls', desc: 'Maintain role-based access and activity logs for sensitive correctional information.' },
      { name: 'PRI Analytics Dashboard', desc: 'Provide authorized summaries of records, cases, statuses, and institutional activity.' },
      { name: 'PRI Report Generator', desc: 'Generate controlled correctional intelligence reports for authorized users.' }
    ]
  },


  // =========================================================
  // 15. LIH
  // =========================================================

  lih: {
    id: 'lih',
    name: 'LIH Intelligence',
    shortName: 'LIH',
    subtitle: 'Law Intelligence Hub',
    introduction: "LIH Intelligence processes hotel visitor registers, guest check-in records, lodge stay logs, and occupancy data.",
    mission: "To uncover suspect hotel stays, map multi-city accommodation patterns, and identify co-guest relationships.",
    vision: "To establish automated hotel visitor register correlation across nationwide hospitality databases.",
    whyChooseUs: [
      "Digital hotel guest register search engine",
      "Co-guest and group booking relationship mapping",
      "Multi-property stay timeline reconstruction",
      "ID document cross-matching with guest records",
      "Real-time stay alert creation"
],
    keywords: ["LIH","Lodging Intelligence","Hotel Records","Guest House Register","Check-in Logs","Visitor Stays","Hotel Occupancy"],
    other: "Hospitality Standards: Connects with hotel management system feeds. Includes guest name fuzzy matching and check-in timeline views.",


    overview: 'LIH Intelligence is a centralized legal and investigation intelligence hub designed to bring authorized information from multiple CR Intelligence modules into one connected workspace. Instead of reviewing telecom, financial, transport, location, public-source, legal, and document records separately, LIH organizes relevant information around common cases, entities, events, relationships, and timelines. It provides a unified environment for investigation management, cross-module correlation, entity analysis, timeline construction, document organization, search, dashboards, and structured reporting.',

    purpose: 'The primary purpose of LIH is to reduce information fragmentation during complex investigations. Investigative information often exists across multiple systems and data sources, making it difficult to understand how records relate to one another. LIH provides a centralized case-oriented environment where authorized users can connect relevant records, identify relationships, construct timelines, review supporting documents, assign case activities, and prepare comprehensive reports. It is designed to provide context without hiding the original source of information.',

    work: 'The module creates an authorized case workspace and connects relevant records from supported intelligence modules. It can organize information around entities such as people, organizations, vehicles, communication identifiers, locations, documents, financial records, and events. LIH can build relationships such as Person → Communication → Location → Vehicle → Financial Record → Company → Case. Users can examine these relationships through graphs, tables, timelines, and linked records. The platform provides unified search, cross-module correlation, case notes, document management, timeline creation, task management, review workflows, dashboards, and report generation. Each record can retain source information and access history so investigators can distinguish original data from analytical conclusions. LIH can act as the central layer of the CR Intelligence platform, bringing individual intelligence modules together into a complete investigation workspace.',

    benefits: [
      'Provides a unified investigation workspace.',
      'Reduces information fragmentation.',
      'Supports cross-module intelligence correlation.',
      'Improves case visibility.',
      'Provides centralized search and reporting.',
      'Supports relationship and timeline analysis.',
      'Improves investigation organization.',
      'Provides stronger auditability.'
    ],

    useCases: [
      'Case intelligence',
      'Legal research',
      'Investigation management',
      'Cross-module analysis',
      'Case coordination',
      'Intelligence reporting',
      'Evidence organization'
    ],

    featureMenu: [
      { name: 'Central Intelligence Workspace', desc: 'Bring authorized investigation information from multiple modules into one structured case environment.' },
      { name: 'Cross-Module Correlation Engine', desc: 'Connect related records across supported intelligence modules while preserving source references.' },
      { name: 'Entity Relationship Graph', desc: 'Visualize relationships between people, organizations, vehicles, identifiers, locations, documents, and cases.' },
      { name: 'Investigation Timeline Builder', desc: 'Combine relevant authorized events from multiple sources into a chronological case timeline.' },
      { name: 'Case Management', desc: 'Create, organize, assign, review, and track authorized investigation cases.' },
      { name: 'Unified Search', desc: 'Search across permitted case records and connected intelligence modules from a centralized interface.' },
      { name: 'Document & Evidence Workspace', desc: 'Organize authorized investigation documents and associate them with cases and entities.' },
      { name: 'Investigation Analytics Dashboard', desc: 'Provide case-level statistics, activity summaries, relationships, timelines, and investigation status.' },
      { name: 'LIH Report Generator', desc: 'Generate comprehensive case reports combining selected authorized intelligence and analytical observations.' }
    ]
  },


  // =========================================================
  // 16. BI
  // =========================================================

  bi: {
    id: 'bi',
    name: 'BI Intelligence',
    shortName: 'BI',
    subtitle: 'Biometric Intelligence',
    introduction: "BI (Bank Intelligence) provides deep financial institution profile analysis, multi-bank account mapping, loan details, and credit records.",
    mission: "To aggregate suspect banking profiles across financial institutions and uncover hidden financial networks.",
    vision: "To integrate core banking system (CBS) feeds for automated financial risk scoring and asset recovery tracking.",
    whyChooseUs: [
      "Multi-bank account profile aggregation",
      "KYC & account holder cross-verification",
      "Loan, credit, and asset holdings mapping",
      "Financial network link graph generation",
      "Comprehensive financial dossier export"
],
    keywords: ["BI","Bank Intelligence","Banking Profile","Account Holdings","KYC Bank","Financial Graph","CBS Records"],
    other: "Security Standards: Bank-grade encryption and security. Supports SWIFT, IFSC, and national payment network lookups.",


    overview: 'BI Intelligence is an authorized biometric-analysis and identity-verification module designed to securely manage and analyze approved biometric information. It provides controlled tools for biometric record management, quality assessment, permitted matching, verification workflows, result review, and audit tracking. The module is intended to help authorized organizations process biometric information consistently while maintaining strong security, privacy, access-control, and data-retention requirements.',

    purpose: 'The purpose of BI Intelligence is to improve authorized biometric verification workflows and reduce the manual effort involved in comparing and managing biometric records. It provides a structured process for receiving approved biometric information, checking quality, performing permitted matching, reviewing results, recording verification decisions, and maintaining an audit trail. Because biometric information is highly sensitive and difficult to replace once compromised, the module should use strict purpose limitation, encryption, role-based access, retention controls, and detailed auditing.',

    work: 'The module securely receives authorized biometric information and performs configurable quality checks before processing. Where permitted, it can extract approved biometric characteristics and compare them against authorized reference records. Matching results can be presented as potential matches or verification outcomes for appropriate human review. The system can maintain verification requests, processing history, review status, analyst comments, source information, and final authorized decisions. It can identify possible duplicate records and provide dashboards for verification activity. BI Intelligence can also integrate with approved identity-management workflows and case systems. All biometric operations should be logged and access should be restricted to authorized users.',

    benefits: [
      'Supports faster authorized identity verification.',
      'Reduces manual biometric record comparison.',
      'Helps identify duplicate records.',
      'Improves record consistency.',
      'Provides structured verification workflows.',
      'Supports strong audit and access controls.',
      'Improves biometric record management.'
    ],

    useCases: [
      'Authorized identity verification',
      'Access-control workflows',
      'Biometric record management',
      'Identity verification support',
      'Authorized investigation support'
    ],

    featureMenu: [
      { name: 'Biometric Record Management', desc: 'Securely organize authorized biometric records and associated verification information.' },
      { name: 'Biometric Quality Assessment', desc: 'Evaluate submitted biometric data for quality and processing suitability.' },
      { name: 'Authorized Biometric Matching', desc: 'Perform approved biometric comparisons against authorized reference datasets.' },
      { name: 'Verification Workflow', desc: 'Manage biometric verification requests, review status, results, and authorized reviewer decisions.' },
      { name: 'Duplicate Record Detection', desc: 'Identify potential duplicate biometric records for authorized review.' },
      { name: 'Audit & Access Management', desc: 'Track access and processing activities associated with sensitive biometric information.' },
      { name: 'BI Analytics Dashboard', desc: 'Display authorized verification volumes, statuses, processing outcomes, and review statistics.' },
      { name: 'BI Report Generator', desc: 'Generate controlled biometric verification reports with results, references, and audit information.' }
    ]
  },


  // =========================================================
  // 17. FRI
  // =========================================================

  fri: {
    id: 'fri',
    name: 'FRI Intelligence',
    shortName: 'FRI',
    subtitle: 'Facial Recognition Intelligence',
    introduction: "FRI Intelligence performs AI-powered face matching, CCTV frame extraction, biometric vector comparison, and suspect identification.",
    mission: "To match suspect photos against master criminal databases, identity archives, and surveillance video frames.",
    vision: "To deliver real-time 3D facial landmark recognition and aging-invariant facial matching across live camera feeds.",
    whyChooseUs: [
      "High-accuracy AI facial embedding vector engine",
      "Multi-face batch scanning in low-resolution photos",
      "Aging and facial hair invariant matching algorithms",
      "Integration with identity and criminal photo archives",
      "Confidence score ranking with visual match comparison"
],
    keywords: ["FRI","Facial Recognition","Face Match","Biometric Search","CCTV Face Detection","Photo Verification","Facial Vector"],
    other: "Biometric Standards: NIST-aligned match scoring. Implements strict biometric data privacy and authorization logging.",


    overview: 'FRI Intelligence is an authorized facial-image analysis module designed to support controlled identity-verification workflows. It provides tools for processing approved facial images, assessing image quality, detecting usable facial regions, performing permitted comparisons against authorized reference datasets, reviewing potential matches, and documenting results. The module is intended to assist human reviewers rather than independently determine identity and should operate under strict privacy, security, legal, and access-control requirements.',

    purpose: 'The purpose of FRI Intelligence is to improve the efficiency and consistency of authorized facial-image analysis. Large image collections can be difficult to review manually, particularly when users need to compare submitted images against approved reference records. FRI provides a structured workflow for image processing, quality assessment, authorized matching, result review, verification tracking, and reporting. The system should clearly communicate the limitations of automated facial recognition and ensure that important identity decisions remain subject to appropriate human review.',

    work: 'The module securely receives approved facial images and performs image-quality checks to determine whether they are suitable for processing. It can detect facial regions, extract approved facial characteristics, and perform permitted comparisons against authorized reference datasets. Potential matches can be presented with supporting information for human assessment. The system can record match status, reviewer decisions, notes, image references, processing history, and audit information. FRI can also provide search, filtering, verification workflows, dashboards, case association, and controlled reporting. The module should maintain clear source information and protect sensitive facial data through encryption, role-based permissions, access logging, and appropriate retention policies.',

    benefits: [
      'Accelerates authorized image analysis.',
      'Reduces manual image comparison effort.',
      'Supports controlled identity verification.',
      'Helps process large image collections.',
      'Provides structured matching results.',
      'Supports audit and review workflows.',
      'Improves organization of facial-image records.'
    ],

    useCases: [
      'Authorized identity verification',
      'Missing-person workflows',
      'Controlled security applications',
      'Image-based investigation support',
      'Identity research'
    ],

    featureMenu: [
      { name: 'Facial Image Upload & Processing', desc: 'Securely process authorized facial images and prepare them for permitted analysis.' },
      { name: 'Image Quality Assessment', desc: 'Evaluate image quality and identify conditions that may affect facial analysis.' },
      { name: 'Face Detection', desc: 'Identify usable facial regions within submitted images for authorized processing.' },
      { name: 'Authorized Face Matching', desc: 'Compare facial information against approved reference datasets under controlled access.' },
      { name: 'Potential Match Review', desc: 'Present potential matches and supporting information for authorized human assessment.' },
      { name: 'Match History', desc: 'Maintain authorized records of previous matching operations and review outcomes.' },
      { name: 'FRI Analytics Dashboard', desc: 'Display processing volumes, review status, and matching workflow statistics.' },
      { name: 'FRI Report Generator', desc: 'Generate controlled facial-analysis reports containing images, results, references, and review information.' }
    ]
  },


  // =========================================================
  // 18. LRI
  // =========================================================

  lri: {
    id: 'lri',
    name: 'LRI Intelligence',
    shortName: 'LRI',
    subtitle: 'Land Record Intelligence',
    introduction: "LRI Intelligence processes land registry records, property deeds, survey plot numbers, ownership details, and real estate holdings.",
    mission: "To identify benami property holdings, trace historical land ownership transfers, and map real estate assets.",
    vision: "To integrate GIS spatial land mapping with property registry databases for automated asset discovery.",
    whyChooseUs: [
      "Land survey number and deed registration lookup",
      "Property ownership cross-matching with suspect profiles",
      "Historical property transfer timeline tracking",
      "Benami and joint ownership network mapping",
      "GIS plot boundary spatial visualization"
],
    keywords: ["LRI","Land Record Intelligence","Property Ownership","Deed Registration","Survey Number","Real Estate","Benami Property"],
    other: "Data Sources: State revenue department registries. Features survey number fuzzy matching and land transaction history indexing.",


    overview: 'LRI Intelligence is a land and property-record analysis module designed to organize authorized land, property, registration, ownership, transaction, and supporting document information into structured property intelligence. It provides centralized property profiles, document organization, ownership timelines, transaction history, geographic information, record comparison, search, and reporting. The module helps users understand complex property records by connecting related documents and events into a single structured view.',

    purpose: 'The purpose of LRI Intelligence is to simplify property and land-record research by reducing the need to manually search through multiple documents, registration records, maps, ownership records, and transaction histories. It provides a centralized environment where authorized users can verify property information, review historical changes, organize documents, compare available records, and build property timelines. It is designed to support property verification, legal research, due diligence, authorized investigations, and administrative record management.',

    work: 'The module imports or connects authorized land and property records and organizes them into structured property profiles. Users can search properties using available identifiers, geographic information, registration references, owner-related information where authorized, or other supported criteria. LRI can organize ownership-related records, registration events, transaction information, property documents, geographic references, and historical changes into chronological timelines. Users can compare records and identify discrepancies that require additional verification. The module can associate multiple documents with a single property, connect related properties or entities where authorized, provide geographic visualization, and generate property intelligence reports. It can also integrate property information with other authorized case records.',

    benefits: [
      'Speeds up property research.',
      'Centralizes authorized land information.',
      'Improves property-document organization.',
      'Supports ownership and transaction analysis.',
      'Helps create property timelines.',
      'Reduces manual document searching.',
      'Supports legal and due-diligence workflows.',
      'Improves property-related reporting.'
    ],

    useCases: [
      'Property verification',
      'Land-record research',
      'Legal research',
      'Due diligence',
      'Property dispute support',
      'Authorized investigation',
      'Property record management'
    ],

    featureMenu: [
      { name: 'Property Record Search', desc: 'Search authorized property records using available identifiers, geographic references, and registration information.' },
      { name: 'Property Profile', desc: 'Create a centralized profile containing available property and registration information.' },
      { name: 'Ownership Timeline', desc: 'Organize available ownership-related events and historical changes chronologically.' },
      { name: 'Property Transaction History', desc: 'Review available property transaction and registration events.' },
      { name: 'Land Document Management', desc: 'Organize authorized deeds, certificates, registration documents, maps, and supporting records.' },
      { name: 'Property Record Comparison', desc: 'Compare available property information across different records and identify discrepancies for review.' },
      { name: 'Geographic Property View', desc: 'Visualize available property location and geographic information through maps.' },
      { name: 'Property Case Association', desc: 'Associate authorized property records and documents with relevant cases.' },
      { name: 'LRI Analytics Dashboard', desc: 'Display property statistics, transaction activity, document counts, and record summaries.' },
      { name: 'LRI Report Generator', desc: 'Generate structured property intelligence reports containing profiles, timelines, documents, observations, and supporting records.' }
    ]
  },


  // =========================================================
  // 19. ERI
  // =========================================================

  eri: {
    id: 'eri',
    name: 'ERI Intelligence',
    shortName: 'ERI',
    subtitle: 'Education Record Intelligence',
    introduction: "ERI Intelligence processes utility bill records, electricity meter connections, power usage logs, and billing addresses.",
    mission: "To verify physical addresses, detect illegal commercial operations in residential premises, and trace utility customer identities.",
    vision: "To utilize smart meter power consumption analytics for automated premises occupancy and activity detection.",
    whyChooseUs: [
      "Utility consumer number & address verification",
      "Power consumption trend & anomaly analysis",
      "Physical address cross-matching with telecom/SDR records",
      "Multi-connection property discovery",
      "Utility billing audit reports"
],
    keywords: ["ERI","Electricity Record Intelligence","Utility Bill","Power Meter","Consumer Address","Electricity Connection","Address Verification"],
    other: "Compatibility: Integrates with power distribution company databases. Features automated consumer address normalization.",


    overview: 'ERI Intelligence is an education-record management and analysis module designed to organize, verify, and analyze authorized academic and educational information in a centralized environment. It can manage student or candidate information, educational institutions, courses, qualifications, enrollment records, certificates, academic documents, verification requests, and verification outcomes. The module helps transform scattered academic information into structured education profiles, timelines, document collections, and verification reports. It can support document processing and comparison with authorized reference records while maintaining appropriate privacy, access, and audit controls.',

    purpose: 'The purpose of ERI Intelligence is to make education-record verification and management faster, more organized, and easier to review. Academic information can be distributed across certificates, marksheets, institutional records, applications, enrollment documents, and verification sources. ERI brings relevant authorized information together and provides a structured workflow for searching, comparing, reviewing, and verifying educational information. It can help organizations process large numbers of education records while maintaining consistent verification procedures, review histories, and supporting documentation.',

    work: 'The module creates structured education profiles for authorized students, candidates, or subjects and associates available institutions, courses, qualifications, academic periods, certificates, and supporting documents with those profiles. Users can search records by candidate, institution, qualification, academic year, certificate reference, or verification status. ERI can process authorized academic documents using document-processing and OCR technologies to extract available information from certificates and marksheets. Extracted information can be organized into structured fields and compared with authorized reference information. The module can create academic timelines, track verification status, identify discrepancies for human review, maintain reviewer notes, and record verification history. It can associate multiple documents with a single qualification and generate structured education verification reports. The system can also provide dashboards showing verification volumes, pending reviews, completed verifications, and other administrative statistics. Sensitive educational information should be protected through appropriate permissions, encryption, and audit controls.',

    benefits: [
      'Faster education verification.',
      'Reduced manual processing.',
      'Centralized academic information.',
      'Better document organization.',
      'Improved verification workflows.',
      'Supports academic timeline creation.',
      'Improves record consistency and review.',
      'Provides structured verification reporting.',
      'Supports scalable education-record processing.'
    ],

    useCases: [
      'Credential verification',
      'Background verification',
      'Institutional administration',
      'Academic research',
      'Certificate verification',
      'Recruitment and HR verification',
      'Admission and scholarship verification',
      'Authorized record management'
    ],

    featureMenu: [
      { name: 'Education Record Import', desc: 'Import and normalize authorized academic records into a structured education profile.' },
      { name: 'Student & Candidate Profile', desc: 'Create centralized education profiles containing available academic information and supporting records.' },
      { name: 'Institution Management', desc: 'Organize educational institutions and associate qualifications and documents with them.' },
      { name: 'Qualification Verification', desc: 'Review submitted qualifications against authorized reference information.' },
      { name: 'Certificate & Document Analysis', desc: 'Process academic certificates and documents using OCR and document-intelligence capabilities.' },
      { name: 'Academic Timeline Builder', desc: 'Create chronological education histories covering enrollment, qualifications, and academic milestones.' },
      { name: 'Record Comparison', desc: 'Compare submitted information with authorized records and flag inconsistencies for human review.' },
      { name: 'Verification Status Management', desc: 'Track pending, under-review, verified, mismatch, and other configured verification statuses.' },
      { name: 'ERI Analytics Dashboard', desc: 'Display verification volumes, pending records, completed reviews, and education-record statistics.' },
      { name: 'ERI Report Generator', desc: 'Generate structured education verification reports containing records, documents, timelines, review information, and outcomes.' }
    ]
  },


  // =========================================================
  // 20. KYCDI
  // =========================================================

  kycdI: {
    id: 'kycdi',
    name: 'KYCDI Intelligence',
    shortName: 'KYCDI',
    subtitle: 'KYC Document Intelligence',
    introduction: "KYCDI Intelligence consolidates Know Your Customer documents, identity cards (Aadhaar, PAN, Voter ID, Passport), and verification records.",
    mission: "To streamline multi-document identity verification, detect forged ID cards, and build verified individual master records.",
    vision: "To deliver automated OCR document verification with AI fraud detection for all national identity cards.",
    whyChooseUs: [
      "Automated identity card OCR & field extraction",
      "Multi-document cross-validation (Aadhaar, PAN, Voter ID)",
      "Tamper & forgery detection algorithms",
      "Centralized KYC profile management",
      "Instant identity verification scores"
],
    keywords: ["KYCDI","KYC Data Intelligence","Identity Verification","Aadhaar","PAN Card","Voter ID","Document OCR","KYC Verification"],
    other: "Privacy Compliance: Compliant with national data privacy frameworks. Encrypts PII data at rest and in transit.",


    overview: 'KYCDI Intelligence is a document-intelligence module designed to process authorized Know Your Customer documents and convert unstructured identity and verification documents into structured information. It can handle document classification, OCR-based extraction, field identification, document quality assessment, validation, comparison, duplicate detection, verification workflows, and reporting. The module provides a centralized environment for organizations that need to process large volumes of KYC documents efficiently and consistently.',

    purpose: 'The purpose of KYCDI Intelligence is to reduce the manual effort involved in reviewing and processing KYC documents. Identity and verification documents can vary significantly in format, layout, quality, and structure. KYCDI helps automatically identify document types, extract available information, organize extracted fields, and present them for verification. It supports faster onboarding and document review while allowing authorized reviewers to examine extracted information and resolve discrepancies before making decisions.',

    work: 'The module receives authorized KYC documents and first determines the document type and processing requirements. OCR and document-intelligence capabilities can extract available text and identify relevant fields. The system can validate document quality, check whether required fields are available, compare extracted information with authorized reference information, identify duplicate submissions, and flag inconsistencies for human review. KYCDI can manage verification status, document history, reviewer notes, source information, and audit trails. It can also provide dashboards showing processing volumes, verification status, document categories, and review queues. The module can generate structured KYC reports and connect verified information with authorized customer or case records while maintaining appropriate security and privacy controls.',

    benefits: [
      'Accelerates KYC document processing.',
      'Reduces manual data entry.',
      'Improves document classification.',
      'Supports automated information extraction.',
      'Improves document-review consistency.',
      'Helps identify missing or inconsistent information.',
      'Supports scalable KYC workflows.',
      'Improves verification reporting and auditability.'
    ],

    useCases: [
      'Customer onboarding',
      'KYC verification',
      'Compliance workflows',
      'Document processing',
      'Identity verification',
      'Document review',
      'Customer record management'
    ],

    featureMenu: [
      { name: 'KYC Document Upload', desc: 'Securely upload and organize authorized KYC documents for automated processing.' },
      { name: 'Document Classification Engine', desc: 'Identify supported document types and route them to appropriate processing workflows.' },
      { name: 'OCR & Field Extraction', desc: 'Extract available text and relevant fields from supported scanned and digital documents.' },
      { name: 'Document Quality Check', desc: 'Assess document readability and processing quality before verification.' },
      { name: 'KYC Field Validation', desc: 'Validate extracted fields against configured requirements and authorized reference information.' },
      { name: 'Duplicate Document Detection', desc: 'Identify potential duplicate document submissions for review.' },
      { name: 'KYC Verification Workflow', desc: 'Manage document review, verification status, reviewer actions, and final outcomes.' },
      { name: 'KYC Analytics Dashboard', desc: 'Display document volumes, processing status, verification queues, and review statistics.' },
      { name: 'KYC Case Association', desc: 'Associate authorized KYC documents and verification results with customer or case records.' },
      { name: 'KYCDI Report Generator', desc: 'Generate structured KYC document-analysis and verification reports.' }
    ]
  },


  // =========================================================
  // 21. PSRI
  // =========================================================

  psri: {
    id: 'psri',
    name: 'PSRI Intelligence',
    shortName: 'PSRI',
    subtitle: 'Police Station Record Intelligence',
    introduction: "PSRI Intelligence organizes FIR records, police station charge-sheets, criminal history registers, and incident case files into a searchable portal.",
    mission: "To provide law enforcement officers with instant access to criminal histories, crime trends, and station-level investigation records.",
    vision: "To establish automated crime pattern correlation across nationwide police stations and CCTNS networks.",
    whyChooseUs: [
      "FIR & crime record multi-attribute search engine",
      "Criminal history profile compilation",
      "Modus Operandi (MO) pattern matching",
      "Inter-station crime network link graphs",
      "Audit-ready legal documentation generator"
],
    keywords: ["PSRI","Police Station Record Intelligence","FIR Record","Crime History","Police Station Logs","Charge Sheet","CCTNS","Criminal Dossier"],
    other: "Access Control: Built specifically for law enforcement personnel. Adheres to police data confidentiality and strict RBAC controls.",


    overview: 'PSRI Intelligence is a secure police-station record management and analysis module designed to organize authorized complaints, incident records, case references, reports, investigation documents, and case-status information. It provides a centralized environment where authorized personnel can search records, review case histories, create timelines, connect supporting documents, and prepare structured reports. The module is designed to improve information retrieval and case organization while maintaining strict access control and auditability.',

    purpose: 'The purpose of PSRI Intelligence is to reduce the difficulty of searching and reviewing police-station records that may be distributed across multiple documents, registers, files, or systems. It provides authorized personnel with a structured case-oriented workspace for finding records, connecting related information, reviewing historical activity, managing documents, and preparing reports. The module can improve case visibility and reduce repetitive manual record handling.',

    work: 'The module organizes authorized police-station records into structured profiles and searchable case records. Users can search complaints, incidents, case references, reports, documents, and status information using available identifiers and filters. PSRI can create chronological case timelines, associate multiple documents with a case, connect related records where authorized, and maintain review notes and case observations. Users can track configured case statuses and review history. The platform can provide dashboards showing case volumes, statuses, pending reviews, activity trends, and other administrative statistics. Access can be restricted based on organizational role, with detailed audit logs maintained for sensitive record access and modifications.',

    benefits: [
      'Faster case searching.',
      'Centralized police-station records.',
      'Easier record correlation.',
      'Better case visibility.',
      'Improved reporting.',
      'Reduced manual record management.',
      'Improved auditability and access control.'
    ],

    useCases: [
      'Authorized investigation',
      'Case management',
      'Record verification',
      'Incident analysis',
      'Police-station reporting',
      'Case documentation'
    ],

    featureMenu: [
      { name: 'Police Record Search', desc: 'Search authorized police-station records using supported case, complaint, incident, and document identifiers.' },
      { name: 'Case Profile Management', desc: 'Create structured case profiles containing available records, documents, status, and timeline information.' },
      { name: 'Complaint & Incident Records', desc: 'Organize authorized complaint and incident information within searchable case records.' },
      { name: 'Case Timeline Builder', desc: 'Create chronological timelines from available case events and records.' },
      { name: 'Document Association', desc: 'Associate reports, documents, and supporting records with relevant cases.' },
      { name: 'Related Record Analysis', desc: 'Connect relevant authorized records where common identifiers or case references are available.' },
      { name: 'PSRI Analytics Dashboard', desc: 'Display case volumes, statuses, activity, pending reviews, and record statistics.' },
      { name: 'PSRI Report Generator', desc: 'Generate structured police-station intelligence reports containing case information, timelines, documents, and observations.' }
    ]
  },


  // =========================================================
  // 22. CoRI
  // =========================================================

  cori: {
    id: 'cori',
    name: 'CoRI Intelligence',
    shortName: 'CoRI',
    subtitle: 'Court Record Intelligence',
    introduction: "CORI Intelligence indexes judicial case records, court judgments, bail orders, pending warrants, and legal proceeding histories.",
    mission: "To aggregate judicial case records, track court hearing statuses, and surface legal precedents and suspect litigation histories.",
    vision: "To provide AI legal analytics predicting case outcomes and tracking repeat offender court proceedings nationwide.",
    whyChooseUs: [
      "Judicial case number & litigant name search engine",
      "Court order & judgment text searchability",
      "Pending warrant and bail status tracking",
      "Litigant litigation history timeline",
      "Automated legal case summary generator"
],
    keywords: ["CORI","Court Record Intelligence","Judicial Records","Court Case","Bail Order","Legal Judgment","Warrant Status","Litigation History"],
    other: "Integrations: Connects with e-Courts and judicial databases. Features full-text search across scanned judgment documents.",


    overview: 'CoRI Intelligence is a legal-document and court-record analysis module designed to organize authorized court records, case information, judgments, orders, filings, legal documents, and related information into a centralized searchable environment. It supports document indexing, OCR processing for scanned documents, case timelines, document relationships, search, comparison, legal research, and structured reporting. The module helps users navigate large collections of court information without relying solely on manual document review.',

    purpose: 'The purpose of CoRI Intelligence is to make court records and legal documents easier to search, organize, compare, and understand. Court-related information can consist of large numbers of documents produced over long periods, making it difficult to quickly locate relevant material. CoRI provides centralized indexing, document search, case organization, timeline creation, relationship mapping, and reporting capabilities for authorized legal and investigative workflows.',

    work: 'The module imports or indexes authorized court records and legal documents and organizes them around cases, parties, dates, document types, orders, judgments, and other available references. OCR can make scanned documents searchable, while document processing can identify relevant metadata. Users can search within documents, filter records by case or date, build chronological case timelines, connect related documents, and compare available versions or records. The system can associate documents with cases and entities and maintain source information. CoRI can provide dashboards showing case activity, document counts, timelines, and review status. Users can generate structured legal-record reports containing selected documents, case information, timelines, and analytical observations.',

    benefits: [
      'Faster legal document searching.',
      'Centralized court-record management.',
      'Improves document discovery.',
      'Supports case timeline creation.',
      'Reduces manual document review.',
      'Makes scanned documents searchable.',
      'Improves legal research organization.',
      'Supports structured legal reporting.'
    ],

    useCases: [
      'Legal research',
      'Court-record analysis',
      'Case preparation',
      'Document review',
      'Compliance',
      'Authorized investigation',
      'Legal intelligence'
    ],

    featureMenu: [
      { name: 'Court Record Import & Indexing', desc: 'Import and index authorized court records and legal documents for centralized search.' },
      { name: 'OCR Document Processing', desc: 'Convert supported scanned court documents into searchable text.' },
      { name: 'Case Search', desc: 'Search authorized court cases using available case references, parties, dates, and other metadata.' },
      { name: 'Legal Document Search', desc: 'Search indexed documents using keywords, phrases, document types, dates, and case references.' },
      { name: 'Court Case Timeline', desc: 'Create chronological timelines of filings, orders, hearings, judgments, and other available events.' },
      { name: 'Document Relationship Mapping', desc: 'Connect related legal documents, cases, parties, and events.' },
      { name: 'Case Comparison', desc: 'Compare selected authorized case records and documents for research and review.' },
      { name: 'CoRI Analytics Dashboard', desc: 'Display case activity, document volumes, timelines, and research statistics.' },
      { name: 'CoRI Report Generator', desc: 'Generate structured court-record research reports with documents, timelines, sources, and observations.' }
    ]
  },


  // =========================================================
  // 23. PORI
  // =========================================================

  pori: {
    id: 'pori',
    name: 'PORI Intelligence',
    shortName: 'PORI',
    subtitle: 'Post Office Record Intelligence',
    introduction: "PORI Intelligence analyzes postal dispatch registers, speed post tracking, parcel delivery records, and postal savings account profiles.",
    mission: "To trace suspicious parcel shipments, track postal money transfers, and locate physical delivery addresses.",
    vision: "To establish automated parcel tracking risk scoring integrated with national postal distribution hubs.",
    whyChooseUs: [
      "Speed post & parcel tracking number lookup",
      "Sender/recipient address cross-verification",
      "Postal savings account profile mapping",
      "Multi-parcel distribution network analysis",
      "Delivery timeline reconstruction"
],
    keywords: ["PORI","Post Office Record Intelligence","Postal Records","Speed Post","Parcel Tracking","Postal Address","Post Office Account"],
    other: "Formats: Compatible with India Post and global postal data formats. Supports tracking history consolidation and sender analysis.",


    overview: 'PORI Intelligence is a postal-record analysis module designed to organize authorized post-office and postal-service information into structured searchable records. It can manage available postal references, delivery information, service types, dates, locations, tracking information, and supporting records. The module helps users review postal activity chronologically, verify records, connect relevant information, and generate structured postal intelligence reports.',

    purpose: 'The purpose of PORI Intelligence is to make postal records easier to search, review, organize, and analyze. Postal information can be distributed across transaction records, delivery records, tracking references, service documents, and location information. PORI provides a centralized environment where authorized users can search relevant records, create timelines, compare information, associate documents, and prepare reports.',

    work: 'The module organizes authorized postal records according to available tracking or reference numbers, dates, locations, service types, delivery status, transaction information, and other supported metadata. Users can search records using multiple criteria and review the associated postal activity. PORI can create chronological postal timelines, associate records with authorized cases, connect supporting documents, compare available information, and maintain review history. The module can provide dashboards showing postal activity and generate structured reports for authorized workflows.',

    benefits: [
      'Faster postal-record analysis.',
      'Easier record verification.',
      'Better timeline creation.',
      'Centralized postal information.',
      'Reduced manual searching.',
      'Improved case documentation.'
    ],

    useCases: [
      'Authorized investigation',
      'Postal record verification',
      'Document tracking',
      'Case analysis',
      'Postal research',
      'Record management'
    ],

    featureMenu: [
      { name: 'Postal Record Search', desc: 'Search authorized postal information using available tracking, reference, date, location, and service criteria.' },
      { name: 'Postal Record Profile', desc: 'Display structured information about available postal events and associated records.' },
      { name: 'Delivery Timeline', desc: 'Create chronological timelines of available postal and delivery events.' },
      { name: 'Tracking Record Analysis', desc: 'Review available tracking events and status changes associated with postal records.' },
      { name: 'Postal Location Analysis', desc: 'Organize available postal location information for authorized review.' },
      { name: 'Document Association', desc: 'Associate postal documents and supporting records with relevant cases.' },
      { name: 'PORI Analytics Dashboard', desc: 'Display postal activity, delivery status, record counts, and timeline summaries.' },
      { name: 'PORI Report Generator', desc: 'Generate structured postal intelligence reports containing records, timelines, and observations.' }
    ]
  },


  // =========================================================
  // 24. TGRI
  // =========================================================

  tgri: {
    id: 'tgri',
    name: 'TGRI Intelligence',
    shortName: 'TGRI',
    subtitle: 'Toll Gate Record Intelligence',
    introduction: "TGRI Intelligence processes FASTag records, toll plaza transit logs, vehicle passage timestamps, and toll booth camera feeds.",
    mission: "To track vehicle highway mobility, verify vehicle passage past specific toll plazas, and pinpoint travel duration between cities.",
    vision: "To construct real-time nationwide highway vehicle tracking maps with predictive destination estimation.",
    whyChooseUs: [
      "FASTag transit log search & plate lookup",
      "Toll plaza passage chronological timeline",
      "Inter-toll travel speed & route analysis",
      "Co-traveling vehicle detection algorithms",
      "Toll plaza camera snapshot integration"
],
    keywords: ["TGRI","Toll Gate Record Intelligence","FASTag","Toll Plaza","Highway Transit","Vehicle Passage","Toll Logs","Route Tracking"],
    other: "Data Feeds: Integrates national toll electronic data interchange feeds. Supports FASTag ID, VRN, and plaza code queries.",


    overview: 'TGRI Intelligence is a transportation and toll-record analysis module designed to organize authorized toll-gate and road-usage records into structured vehicle and travel intelligence. It can analyze available toll events, timestamps, toll locations, vehicle references, transaction information, and route sequences. The module helps users create travel timelines, compare toll activity, examine route patterns, and correlate toll events with other authorized transport and case records.',

    purpose: 'The purpose of TGRI Intelligence is to simplify the analysis of large toll and road-usage datasets. Toll records can contain many transactions across different locations and dates, making manual review difficult. TGRI provides a centralized environment where authorized users can search vehicle-related toll activity, create chronological travel sequences, compare records across locations, and connect relevant toll information with other permitted intelligence.',

    work: 'The module imports and organizes authorized toll records according to vehicle references, timestamps, toll locations, transaction details, route information where available, and other metadata. Users can search records by vehicle, date, toll location, or time period. TGRI can construct chronological toll timelines and organize sequential toll events into travel patterns. It can compare activity across toll locations, analyze frequency, and correlate toll information with authorized vehicle, transport, location, or case records. The module can provide route-oriented dashboards, timeline visualizations, case workspaces, and structured reports. Travel sequences should be presented as record-based observations rather than automatic proof of complete physical movement between locations.',

    benefits: [
      'Simplifies toll-record analysis.',
      'Helps create travel timelines.',
      'Supports vehicle movement analysis.',
      'Makes large toll datasets easier to review.',
      'Supports authorized route analysis.',
      'Improves transport-record correlation.',
      'Supports structured case reporting.'
    ],

    useCases: [
      'Vehicle investigation',
      'Route analysis',
      'Incident reconstruction',
      'Transportation intelligence',
      'Toll-record verification',
      'Authorized case analysis'
    ],

    featureMenu: [
      { name: 'Toll Record Upload & Parsing', desc: 'Import and normalize authorized toll-gate records into a standardized structure.' },
      { name: 'Vehicle Toll Search', desc: 'Search available toll activity using authorized vehicle identifiers and other supported filters.' },
      { name: 'Toll Activity Timeline', desc: 'Create chronological timelines of available toll events.' },
      { name: 'Route Sequence Analysis', desc: 'Organize sequential toll events to provide a record-based view of travel activity.' },
      { name: 'Toll Location Comparison', desc: 'Compare activity across different toll locations and time periods.' },
      { name: 'Vehicle Travel Pattern Analysis', desc: 'Analyze recurring toll activity and available travel patterns.' },
      { name: 'Cross-Module Transport Correlation', desc: 'Correlate toll records with authorized vehicle, RTO, location, and case information.' },
      { name: 'TGRI Analytics Dashboard', desc: 'Display toll activity, locations, vehicle events, timelines, and travel summaries.' },
      { name: 'TGRI Report Generator', desc: 'Generate structured toll and travel intelligence reports containing records, timelines, and observations.' }
    ]
  },


  // =========================================================
  // 25. GHLRI
  // =========================================================

  ghlri: {
    id: 'ghlri',
    name: 'GHLRI Intelligence',
    shortName: 'GHLRI',
    subtitle: 'Guest House & Lodge Record Intelligence',
    introduction: "GHLRI Intelligence collects guest entry registers, lodge visitor logs, homestay bookings, and short-term rental occupancy records.",
    mission: "To trace suspect movement across unorganized lodging facilities, small guest houses, and budget lodges.",
    vision: "To establish a digital guest registration network standardizing lodge record keeping across urban and rural police jurisdictions.",
    whyChooseUs: [
      "Search engine for lodge & guest house registers",
      "Suspect entry log cross-verification with ID databases",
      "Co-occupant and group check-in analysis",
      "Frequent visitor alerting across lodges",
      "Digital guest register compliance reports"
],
    keywords: ["GHLRI","Guest House Intelligence","Lodge Records","Visitor Register","Guest Check-in","Homestay Records","Lodging Analytics"],
    other: "Submission: Designed for digital record submission by lodge owners. Supports offline register digitizing and OCR scanning.",


    overview: 'GHLRI Intelligence is an accommodation-record analysis module designed to organize authorized guest-house, lodge, hotel, and accommodation-related records into structured information. It can manage available booking references, guest records, check-in and check-out information, accommodation locations, dates, and supporting documents. The module helps authorized users create stay timelines, search accommodation records, compare bookings, associate relevant information with cases, and generate structured accommodation intelligence reports.',

    purpose: 'The purpose of GHLRI Intelligence is to simplify the analysis and verification of accommodation records. Accommodation information may exist across booking systems, guest registers, invoices, check-in records, and supporting documents. GHLRI provides a centralized environment where authorized users can search these records, organize them chronologically, identify related stays, review supporting information, and prepare structured reports.',

    work: 'The module organizes authorized accommodation records according to available booking references, guest identifiers, property information, check-in dates, check-out dates, room or stay references where permitted, and other available metadata. Users can search records by date, property, reference, or authorized identifier. GHLRI can create accommodation timelines, associate multiple documents with a stay, compare records, identify repeated accommodation records, and connect relevant information with authorized cases. The module can also provide dashboards, review workflows, audit logs, and structured reporting.',

    benefits: [
      'Faster accommodation-record analysis.',
      'Centralized booking information.',
      'Easier timeline creation.',
      'Better record correlation.',
      'Supports authorized stay verification.',
      'Reduces manual accommodation-record searching.',
      'Improves case documentation.'
    ],

    useCases: [
      'Authorized investigation',
      'Accommodation record verification',
      'Event reconstruction',
      'Stay timeline analysis',
      'Case research',
      'Accommodation intelligence'
    ],

    featureMenu: [
      { name: 'Accommodation Record Search', desc: 'Search authorized guest-house, lodge, hotel, and accommodation records using supported criteria.' },
      { name: 'Stay Profile', desc: 'Create structured profiles containing available booking and stay information.' },
      { name: 'Check-In & Check-Out Timeline', desc: 'Organize available accommodation events chronologically.' },
      { name: 'Property-Based Search', desc: 'Review authorized records associated with a particular accommodation property.' },
      { name: 'Recurring Stay Analysis', desc: 'Identify repeated accommodation records within the authorized dataset.' },
      { name: 'Document Association', desc: 'Associate booking records, invoices, registers, and supporting documents with relevant stays.' },
      { name: 'GHLRI Analytics Dashboard', desc: 'Display accommodation activity, stay counts, timelines, and property-level summaries.' },
      { name: 'GHLRI Report Generator', desc: 'Generate structured accommodation intelligence reports containing records, timelines, documents, and observations.' }
    ]
  },


  // =========================================================
  // 26. PPRI
  // =========================================================

  ppri: {
    id: 'ppri',
    name: 'PPRI Intelligence',
    shortName: 'PPRI',
    subtitle: 'Petrol Pump Record Intelligence',
    introduction: "PPRI Intelligence analyzes fueling transactions, petrol pump CCTV snapshots, fuel bill payments, and fleet card refueling records.",
    mission: "To verify vehicle refueling locations, link fuel transactions with vehicle movement timelines, and inspect fuel payment records.",
    vision: "To connect fuel station payment networks and ANPR cameras for automated vehicle fueling footprint analysis.",
    whyChooseUs: [
      "Fuel transaction timestamp & vehicle lookup",
      "Fleet refueling card activity tracking",
      "Payment method & UPI transaction matching",
      "Location-based fuel station activity analysis",
      "Vehicle movement timeline correlation"
],
    keywords: ["PPRI","Petrol Pump Record Intelligence","Fuel Transaction","Petrol Station","Refueling Logs","Fleet Card","Fuel Station CCTV"],
    other: "Payment Logs: Supports digital payment logs (UPI, Card, Wallet) and fuel pump POS machine transaction logs.",


    overview: 'PPRI Intelligence is a fuel-transaction and vehicle-activity analysis module designed to organize authorized petrol-pump and fuel-station transaction records into structured intelligence. It can analyze available transaction dates, times, station locations, vehicle references where available, fuel types, quantities, amounts, and transaction references. The module helps users review fuel activity chronologically, compare transactions across locations, examine recurring activity, and correlate relevant fuel records with authorized vehicle and travel information.',

    purpose: 'The purpose of PPRI Intelligence is to simplify the analysis of fuel-station records and support authorized vehicle and travel-related investigations. Large fuel transaction datasets can be difficult to review manually, especially when records span many stations and long periods. PPRI organizes these records into searchable transactions, timelines, station views, and analytical summaries, helping users identify relevant records and understand the available transaction history.',

    work: 'The module imports and normalizes authorized fuel transaction records and organizes them according to station, date, time, vehicle reference where available, fuel type, quantity, amount, and transaction reference. Users can search and filter records by vehicle, station, date, amount, or time period. PPRI can create chronological fuel transaction timelines, compare activity across stations, analyze recurring transactions, and associate fuel activity with authorized vehicle and transport records. Where appropriate, it can correlate information with TGRI, RTOI, LAR, and case records. The module can provide dashboards showing transaction volumes, fuel categories, station activity, and timeline summaries and can generate structured reports.',

    benefits: [
      'Simplifies fuel transaction analysis.',
      'Supports vehicle-related activity review.',
      'Helps create travel timelines.',
      'Makes large fuel datasets easier to search.',
      'Supports station and transaction comparison.',
      'Improves transport-record correlation.',
      'Supports structured reporting.'
    ],

    useCases: [
      'Authorized vehicle investigation',
      'Travel reconstruction',
      'Fuel transaction analysis',
      'Vehicle intelligence',
      'Transportation research',
      'Case analysis'
    ],

    featureMenu: [
      { name: 'Fuel Transaction Upload', desc: 'Import and normalize authorized petrol-pump and fuel-station transaction records.' },
      { name: 'Vehicle-Based Fuel Search', desc: 'Search available fuel transactions using authorized vehicle references and supported filters.' },
      { name: 'Fuel Transaction Timeline', desc: 'Create chronological views of available fuel purchases and transaction events.' },
      { name: 'Station Activity Analysis', desc: 'Analyze transaction activity associated with selected petrol pumps or fuel stations.' },
      { name: 'Fuel Quantity & Amount Analysis', desc: 'Analyze available fuel quantities, transaction amounts, and trends across selected periods.' },
      { name: 'Recurring Fuel Activity', desc: 'Identify repeated fuel transactions or recurring activity patterns for authorized review.' },
      { name: 'Vehicle & Travel Correlation', desc: 'Correlate authorized fuel records with vehicle, toll, transport, and case information.' },
      { name: 'PPRI Analytics Dashboard', desc: 'Display fuel transactions, station activity, vehicle events, and time-based summaries.' },
      { name: 'PPRI Report Generator', desc: 'Generate structured fuel and vehicle intelligence reports containing records, timelines, and observations.' }
    ]
  },


  // =========================================================
  // 27. RII
  // =========================================================

  rii: {
    id: 'rii',
    name: 'RII Intelligence',
    shortName: 'RII',
    subtitle: 'Railway Information Intelligence',
    introduction: "RII Intelligence processes PNR reservations, train ticket bookings, railway passenger manifests, and IRCTC transaction records.",
    mission: "To trace passenger train travel, identify co-travelers sharing PNR numbers, and reconstruct rail movement histories.",
    vision: "To provide real-time railway reservation monitoring cross-referenced with passenger identity watchlists.",
    whyChooseUs: [
      "PNR number & passenger manifest lookup",
      "Co-traveler seat allocation graph mapping",
      "Historical train travel timeline reconstruction",
      "Boarding & destination station frequency analysis",
      "Integration with station CCTV surveillance"
],
    keywords: ["RII","Railway Information Intelligence","PNR Lookup","Train Booking","IRCTC Records","Passenger Manifest","Railway Travel"],
    other: "Systems: Connects with authorized railway reservation systems. Preserves booking timestamps and payment transaction IDs.",


    overview: 'RII Intelligence is a railway and transportation-record analysis module designed to organize authorized railway booking, journey, station, route, and transportation information into structured intelligence. It helps users review available journey records, organize travel timelines, analyze routes, compare journeys, and connect railway information with other authorized transportation or case records. The module provides a centralized environment for railway information search, timeline analysis, document association, and reporting.',

    purpose: 'The purpose of RII Intelligence is to simplify the analysis of railway-related records and reduce the manual effort required to review multiple journeys, stations, routes, and dates. It provides authorized users with a structured way to search railway information, create chronological travel histories, compare routes, organize supporting records, and associate relevant railway information with authorized cases.',

    work: 'The module organizes authorized railway records according to available booking references, journey dates, stations, routes, passenger-related references where permitted, train information, and other supported metadata. Users can search and filter records by date, station, route, reference, or other criteria. RII can construct journey timelines, organize routes, compare available journeys, and associate railway documents with relevant records. It can correlate railway information with other authorized transport or case records where appropriate. The platform can provide travel dashboards, journey summaries, case workspaces, audit trails, and structured railway intelligence reports.',

    benefits: [
      'Faster railway-record analysis.',
      'Easier travel timeline creation.',
      'Better transportation intelligence.',
      'Centralized railway information.',
      'Reduced manual record searching.',
      'Supports authorized route analysis.',
      'Improves case documentation.'
    ],

    useCases: [
      'Authorized investigation',
      'Travel analysis',
      'Incident reconstruction',
      'Transportation research',
      'Railway record verification',
      'Case intelligence'
    ],

    featureMenu: [
      { name: 'Railway Record Search', desc: 'Search authorized railway information using available booking, journey, station, route, and date criteria.' },
      { name: 'Journey Profile', desc: 'Display structured information about available railway journeys and associated records.' },
      { name: 'Travel Timeline', desc: 'Create chronological timelines of available railway journey events.' },
      { name: 'Station & Route Analysis', desc: 'Analyze available station and route information associated with selected journeys.' },
      { name: 'Journey Comparison', desc: 'Compare selected authorized railway records across dates, routes, and other available attributes.' },
      { name: 'Railway Document Association', desc: 'Associate authorized tickets, booking records, and supporting documents with relevant journeys.' },
      { name: 'RII Analytics Dashboard', desc: 'Display journey volumes, routes, stations, timelines, and transportation summaries.' },
      { name: 'RII Report Generator', desc: 'Generate structured railway intelligence reports containing journey records, timelines, routes, and observations.' }
    ]
  },


  // =========================================================
  // 28. PCRI
  // =========================================================

  pcri: {
    id: 'pcri',
    name: 'PCRI Intelligence',
    shortName: 'PCRI',
    subtitle: 'PIN Code Record Intelligence',
    introduction: "PCRI Intelligence provides postal index number analytics, administrative boundary mapping, demographic overlays, and spatial pin code lookup.",
    mission: "To standardize address location data, resolve ambiguous postal addresses, and map crime activity by PIN code zone.",
    vision: "To deliver 3D demographic and spatial analytical layers mapping pincode boundaries nationwide.",
    whyChooseUs: [
      "Nationwide PIN code directory & boundary lookup",
      "Address normalization & pin code resolution",
      "Crime density & case distribution by PIN code",
      "Post office & jurisdiction mapping",
      "Spatial analytics for demographic research"
],
    keywords: ["PCRI","PIN Code Record Intelligence","Pincode Lookup","Postal Zone","Address Resolution","Demographic Map","Spatial Analytics"],
    other: "Database: Comprehensive national PIN code database with geographic centroids and police station jurisdiction mappings.",


    overview: 'PCRI Intelligence is a postal and geographic-reference module designed to organize PIN code information and connect postal codes with available geographic, administrative, and postal details. It provides a structured search environment for identifying corresponding post offices, areas, districts, states, and other available geographic information. The module can support address verification, geographic research, document processing, logistics analysis, and location-related intelligence workflows.',

    purpose: 'The purpose of PCRI Intelligence is to simplify postal-code and geographic reference searches. PIN code information is often used across addresses, KYC documents, property records, transport information, and other datasets, but inconsistent or incomplete postal information can make verification difficult. PCRI provides a standardized reference layer that helps users identify and validate available postal and geographic information.',

    work: 'The module maintains and searches authorized PIN code reference information and associates each code with available postal and geographic metadata. Users can search by PIN code, post office, district, state, area, or other supported fields. PCRI can support address validation by comparing available postal information with submitted records. It can also provide geographic summaries and associate PIN code information with other authorized records. The module can be used as a supporting reference service for other CR Intelligence modules such as KYCDI, LRI, RTOI, and OSINT, helping normalize location information across the platform.',

    benefits: [
      'Faster PIN code verification.',
      'Improves address consistency.',
      'Provides standardized postal references.',
      'Supports geographic research.',
      'Helps normalize location information.',
      'Supports document and KYC processing.',
      'Improves location-related data quality.'
    ],

    useCases: [
      'Address verification',
      'Geographic research',
      'KYC document processing',
      'Property research',
      'Logistics analysis',
      'Location intelligence'
    ],

    featureMenu: [
      { name: 'PIN Code Search', desc: 'Search postal codes using PIN numbers and available geographic or postal attributes.' },
      { name: 'Post Office Lookup', desc: 'Find associated post-office information for supported postal codes.' },
      { name: 'District & State Mapping', desc: 'Connect postal codes with available administrative geographic information.' },
      { name: 'Address Validation Support', desc: 'Compare available address information with postal reference data.' },
      { name: 'Postal Geography Explorer', desc: 'Explore relationships between postal codes, areas, districts, states, and post offices.' },
      { name: 'Location Data Normalization', desc: 'Standardize postal and geographic information for use across supported intelligence modules.' },
      { name: 'PCRI Analytics Dashboard', desc: 'Display postal-code distributions, geographic summaries, and reference statistics.' },
      { name: 'PCRI Report Generator', desc: 'Generate structured postal and geographic reference reports.' }
    ]
  },


  // =========================================================
  // 29. CRI
  // =========================================================

  cri: {
    id: 'cri',
    name: 'CRI Intelligence',
    shortName: 'CRI',
    subtitle: 'Company Registration Intelligence',
    introduction: "CRI Intelligence indexes MCA company registrations, director DIN numbers, financial filings, shell company indicators, and corporate structures.",
    mission: "To uncover corporate ownership networks, trace director cross-appointments, and identify fraudulent shell companies.",
    vision: "To provide automated corporate fraud detection mapping beneficial ownership networks across global corporate registries.",
    whyChooseUs: [
      "Company CIN & Director DIN lookup engine",
      "Interactive corporate director & subsidiary network graph",
      "Shell company risk indicator algorithms",
      "Annual financial filing & balance sheet summary",
      "Cross-matching corporate addresses with suspect profiles"
],
    keywords: ["CRI","Company Registration Intelligence","MCA Records","CIN","Director DIN","Corporate Audit","Shell Company","Business Registry"],
    other: "Registry: Connects with Ministry of Corporate Affairs (MCA) registries. Supports DIN network graphing and balance sheet analytical views.",

    overview: 'CRI Intelligence is a corporate and company-record research module designed to organize authorized and publicly available company registration information into structured corporate intelligence. It can create company profiles containing available registration details, incorporation information, company status, publicly available officer or director information, filings, registered information, and other permitted corporate records. The module helps users conduct company verification, due diligence, corporate research, relationship analysis, timeline creation, and structured reporting.',

    purpose: 'The purpose of CRI Intelligence is to simplify company verification and corporate research by bringing relevant company-registration information into a centralized workspace. Corporate information can be distributed across public registries, filings, documents, company websites, and other sources. CRI organizes available information into company profiles and timelines and helps authorized users compare records, identify relationships, review changes, and prepare due-diligence reports.',

    work: 'The module collects and organizes authorized and publicly accessible company-registration information into structured company profiles. Users can search companies using registration identifiers, company names, status, incorporation information, and other supported criteria. CRI can organize corporate timelines covering incorporation, status changes, filings, and other available events. It can associate publicly available officer or director information where legally appropriate and visualize relationships between companies, entities, and corporate records. The module can compare information from multiple permitted sources, preserve source references, associate company information with authorized cases, and generate structured corporate intelligence reports. It should clearly distinguish verified registry information from information sourced from other public sources.',

    benefits: [
      'Faster company research.',
      'Easier corporate verification.',
      'Supports corporate due diligence.',
      'Centralizes company information.',
      'Helps identify corporate relationships.',
      'Supports corporate timeline analysis.',
      'Improves research efficiency and reporting.'
    ],

    useCases: [
      'Company verification',
      'Corporate due diligence',
      'Compliance',
      'Business research',
      'Corporate relationship analysis',
      'Investigation support',
      'Company record management'
    ],

    featureMenu: [
      { name: 'Company Registration Search', desc: 'Search available company records using registration identifiers, names, status, and other supported criteria.' },
      { name: 'Company Profile', desc: 'Create structured profiles containing available company registration and corporate information.' },
      { name: 'Corporate Timeline', desc: 'Organize available company events, filings, status changes, and other records chronologically.' },
      { name: 'Corporate Relationship Analysis', desc: 'Visualize available relationships between companies and permitted corporate entities.' },
      { name: 'Officer & Director Research', desc: 'Organize publicly available officer or director information where legally permitted.' },
      { name: 'Corporate Record Comparison', desc: 'Compare company information across permitted sources and identify inconsistencies for review.' },
      { name: 'Company Document Management', desc: 'Organize available corporate filings, certificates, and supporting documents.' },
      { name: 'CRI Analytics Dashboard', desc: 'Display company statistics, statuses, timelines, relationships, and research summaries.' },
      { name: 'CRI Report Generator', desc: 'Generate structured corporate intelligence reports containing company profiles, sources, timelines, relationships, and observations.' }
    ]
  },


  // =========================================================
  // 30. MDRI
  // =========================================================

  mdri: {
    id: 'mdri',
    name: 'MDRI Intelligence',
    shortName: 'MDRI',
    subtitle: 'Medical Data Record Intelligence',
    introduction: "MDRI Intelligence organizes hospital admission records, medical store prescription logs, pharmacy transactions, and healthcare data.",
    mission: "To locate injured suspects seeking medical care, trace controlled substance purchases, and verify hospital records.",
    vision: "To establish a secure healthcare intelligence network alerting law enforcement of medico-legal cases (MLC) in real time.",
    whyChooseUs: [
      "Hospital medico-legal case (MLC) record lookup",
      "Pharmacy prescription & controlled drug transaction search",
      "Patient admission & emergency care timeline",
      "Suspect identity verification against medical records",
      "HIPAA/Data privacy compliant access logging"
],
    keywords: ["MDRI","Medical Data Record Intelligence","Hospital Records","MLC Register","Pharmacy Logs","Medical History","Healthcare Data"],
    other: "Privacy Standards: Built with healthcare privacy standards. Requires explicit legal authorization for medical record retrieval.",


    overview: 'MDRI Intelligence is a secure medical-record management and analysis module designed to organize authorized healthcare and medical information into structured records. It can manage medical documents, reports, test results, prescriptions, treatment records, visit information, and other permitted healthcare information. The module provides chronological medical timelines, document classification, search, record organization, controlled access, audit logging, and reporting capabilities. Because medical information is highly sensitive, the system should be designed with strong privacy, security, encryption, access-control, and retention requirements.',

    purpose: 'The purpose of MDRI Intelligence is to make authorized medical records easier to organize, search, retrieve, and review while protecting sensitive healthcare information. Medical records can exist across multiple documents and systems and may be difficult to understand chronologically. MDRI creates a structured medical record environment where authorized users can organize documents, build timelines, search records, associate related information, and maintain controlled access. The module is intended for record management and authorized analysis rather than replacing qualified medical professionals or making unsupported medical conclusions.',

    work: 'The module securely imports or connects authorized medical records and classifies them into structured categories such as reports, test results, prescriptions, visits, treatment records, and supporting documents. OCR and document-intelligence technologies can make scanned medical documents searchable where appropriate. MDRI can create chronological medical timelines, associate related documents, search records using permitted criteria, and organize information around authorized patient or case profiles. It can maintain verification and review status, source information, access history, and audit records. The module can provide controlled dashboards and reports showing record completeness, document categories, timelines, and review activity. Access to medical data should be strictly role-based and limited according to applicable privacy and healthcare requirements.',

    benefits: [
      'Faster authorized medical-record retrieval.',
      'Better medical-document organization.',
      'Supports chronological medical timelines.',
      'Reduces manual document searching.',
      'Improves record accessibility for authorized users.',
      'Provides strong auditability.',
      'Supports secure healthcare record management.'
    ],

    useCases: [
      'Healthcare record management',
      'Authorized medical research',
      'Medical documentation',
      'Compliance',
      'Controlled case analysis',
      'Medical record verification'
    ],

    featureMenu: [
      { name: 'Medical Record Upload & Classification', desc: 'Securely upload and organize authorized medical records and documents by supported categories.' },
      { name: 'Medical Document OCR', desc: 'Convert supported scanned medical documents into searchable text while maintaining security controls.' },
      { name: 'Medical Timeline', desc: 'Create chronological views of available visits, reports, tests, prescriptions, and treatment records.' },
      { name: 'Medical Record Search', desc: 'Search authorized medical information using permitted dates, document types, record references, and other criteria.' },
      { name: 'Document Relationship Management', desc: 'Associate related medical documents with the appropriate authorized record or case.' },
      { name: 'Medical Record Review Workflow', desc: 'Manage authorized document-review status, notes, verification, and supporting information.' },
      { name: 'MDRI Security & Audit', desc: 'Track access and processing activity for sensitive medical records using strong security controls.' },
      { name: 'MDRI Analytics Dashboard', desc: 'Display record counts, document categories, timelines, and authorized review statistics.' },
      { name: 'MDRI Report Generator', desc: 'Generate controlled medical-record reports containing selected records, timelines, documents, and observations.' }
    ]
},


  // =========================================================
  // 31. ABOUT US
  // =========================================================

  about: {
    id: 'about',
    name: 'About Us',
    shortName: 'ABOUT',
    subtitle: 'CR Intelligence Platform',
    introduction: "Nexora Platform is a next-generation AI-powered Multi-Domain Intelligence Engine bringing together 30+ domain intelligence modules under a unified interface.",
    mission: "To empower investigators, intelligence analysts, and law enforcement agencies with cutting-edge analytical tools, automated record correlation, and actionable insights.",
    vision: "To be the global standard in unified intelligence analysis, bridging data silos across telecommunications, cyber, financial, spatial, and governmental domains.",
    whyChooseUs: [
      "30+ integrated domain intelligence modules in one platform",
      "Sub-second search across multi-gigabyte datasets",
      "AI-driven entity correlation and network graph generation",
      "Military-grade encryption and immutable audit trails",
      "Role-based access control (RBAC) and data sovereignty compliance"
],
    keywords: ["About Us","Nexora Platform","AI Intelligence","Platform Overview","Cybercrime Intelligence","Investigation Suite","System Architecture"],
    other: "Architecture: High-availability enterprise platform architecture. Supports cloud, hybrid, and air-gapped on-premise deployments.",

    overview: '',
    purpose: '',
    work: '',
    benefits: [
      'Explains responsible-use principles.',
      'Provides transparency about the platform.',
      'Introduces the intelligence ecosystem.'
    ],
    useCases: [
      'Organization introduction',
      'Platform introduction',
      'Mission and vision presentation',
      'Capability overview',
      'Responsible-use information',
      'Technology overview',
      'Contact and organizational information'
    ],
    featureMenu: [
      { name: 'Company Overview', desc: 'Present the organization and explain the background and purpose of CR Intelligence.' },
      { name: 'Mission & Vision', desc: 'Explain the long-term mission, objectives, and direction of the platform.' },
      { name: 'Platform Capabilities', desc: 'Introduce the major intelligence, analysis, investigation, and information-management capabilities.' },
      { name: 'Technology Overview', desc: 'Describe the technology and architecture principles used to build the platform.' },
      { name: 'Security & Privacy Principles', desc: 'Explain the platform\'s approach to access control, security, privacy, auditing, and responsible information handling.' },
      { name: 'Intelligence Ecosystem', desc: 'Explain how different intelligence modules can work together within the CR Intelligence environment.' },
      { name: 'Responsible Use', desc: 'Provide information about authorized access, lawful use, privacy, and responsible intelligence practices.' },
      { name: 'Platform Highlights', desc: 'Present key capabilities and differentiating features of the CR Intelligence platform.' },
      { name: 'Contact & Organization Information', desc: 'Provide appropriate organizational contact and platform information.' }
    ]
  },


  // =========================================================
  // 32. ACCOUNT SETTINGS
  // =========================================================

  accountSettings: {
    id: 'account-settings',
    name: 'Account Settings',
    shortName: 'SETTINGS',
    subtitle: 'Account & Security Management',
    introduction: "Account Settings provides full user profile management, security configurations, API access keys, notification preferences, and workspace controls.",
    mission: "To offer users complete control over their analytical workspace, security parameters, and personal authorization settings.",
    vision: "To provide seamless zero-trust identity management and personalized AI assistant preferences.",
    whyChooseUs: [
      "Centralized security and password controls",
      "Two-factor authentication (2FA) enforcement",
      "Custom notification and alert preferences",
      "API key management and integration settings",
      "Activity history and session log inspection"
],
    keywords: ["Account Settings","User Profile","Security Settings","2FA","Password Change","API Keys","Preferences","Session Logs"],
    other: "Protocols: Supports SSO (Single Sign-On), OAuth2, SAML 2.0, and hardware token authentication protocols.",


    overview: 'Account Settings is a centralized user-management and security module that allows users to manage their profile information, authentication settings, account preferences, active sessions, notifications, security controls, and available permissions. It provides users with a single location for controlling account-related settings and gives administrators appropriate tools for managing organizational access. Because CR Intelligence may contain sensitive intelligence and investigation information, Account Settings plays an important role in maintaining secure authentication, role-based access, session management, auditability, and controlled access to platform capabilities.',

    purpose: 'The purpose of Account Settings is to provide users and administrators with secure and organized control over account configuration and access. Users should be able to manage their profile, password, authentication methods, notification preferences, active sessions, and other available personal settings without navigating through multiple unrelated areas of the platform. For administrators, the module can provide controlled tools for managing roles, permissions, account status, access levels, and security policies. The overall purpose is to improve account security, provide transparency around access, and ensure that users only receive the permissions required for their responsibilities.',

    work: 'The module provides a centralized interface where users can view and update supported profile information, change passwords, configure multi-factor authentication, manage active sessions, review recent login activity, and control notification preferences.For organizational accounts, authorized administrators can manage user roles and permissions. Permissions can determine which intelligence modules, records, reports, integrations, and administrative functions a user can access. The system can support role-based access control so that sensitive information is only available to appropriately authorized personnel. Account Settings can also provide security activity logs, session termination, login-history review, API and integration controls where applicable, and account status management. Changes to important security settings can be recorded in audit logs. The module can provide account-security alerts, password policies, authentication controls, permission review, and organization-level security settings. Sensitive operations should require appropriate authentication and should be fully auditable.',

    benefits: [
      'Improves account security.',
      'Provides centralized account management.',
      'Supports role-based access control.',
      'Gives users control over account preferences.',
      'Helps administrators manage permissions.',
      'Improves session and login visibility.',
      'Supports multi-factor authentication.',
      'Improves security auditing.',
      'Reduces unauthorized access risk.',
      'Provides structured user-management workflows.'
    ],

    useCases: [
      'Profile management',
      'Password management',
      'Multi-factor authentication',
      'Session management',
      'Notification management',
      'Role and permission management',
      'Security monitoring',
      'API and integration management',
      'Organization account administration'
    ],

    featureMenu: [
      { name: 'Profile Management', desc: 'View and update supported personal account information and profile preferences.' },
      { name: 'Password & Authentication', desc: 'Manage passwords and configure supported authentication and security options.' },
      { name: 'Multi-Factor Authentication', desc: 'Enable and manage additional authentication factors for improved account protection.' },
      { name: 'Active Session Management', desc: 'Review and terminate active account sessions across supported devices or locations.' },
      { name: 'Login Activity', desc: 'Review recent account access activity and available authentication events.' },
      { name: 'Notification Preferences', desc: 'Configure supported account, security, case, and system notifications.' },
      { name: 'Role & Permission Management', desc: 'Allow authorized administrators to assign roles and manage access to platform modules and capabilities.' },
      { name: 'Security Audit Log', desc: 'Maintain a record of important account, authentication, permission, and security activities.' },
      { name: 'API & Integration Settings', desc: 'Manage authorized API credentials and supported third-party or system integrations.' },
      { name: 'Account Status Management', desc: 'Allow authorized administrators to manage supported account states and access controls.' },
      { name: 'Account Security Dashboard', desc: 'Provide a centralized view of authentication status, active sessions, security settings, and recent account activity.' }
    ]
  }

};

/**
 * Quick helper list of all 24 cards for quick access, search & auto-complete in Agent UI.
 */
export const ALL_AGENT_CARDS = Object.values(AGENT_CARDS_DATA);

// Common typos & misspellings map
export const TYPO_MAP = {
  'crd': 'cdr',
  'srd': 'sdr',
  'trd': 'tdr',
  'ipd': 'ipdr',
  'iprd': 'ipdr',
  'osnit': 'osint',
  'bsra': 'bsar',
  'kyc': 'kycdi',
  'rto': 'rtoi',
  'pincode': 'pcri',
  'pin': 'pcri',
  'fastag': 'tgri',
  'toll': 'tgri',
  'irctc': 'rii',
  'train': 'rii',
  'railway': 'rii',
  'petrol': 'ppri',
  'fuel': 'ppri',
  'lodge': 'ghlri',
  'hotel': 'ghlri',
  'guesthouse': 'ghlri',
  'jail': 'pri',
  'inmate': 'pri',
  'prison': 'pri',
  'bank': 'bri',
  'statement': 'bsar',
  'face': 'fri',
  'facial': 'fri',
  'biometric': 'bi',
  'fingerprint': 'bi',
  'fir': 'psri',
  'police': 'psri',
  'court': 'cori',
  'mca': 'cri',
  'company': 'cri',
  'hospital': 'mdri',
  'medical': 'mdri',
  'postal': 'pori',
  'post': 'pori',
  'land': 'lri',
  'degree': 'eri',
  'education': 'eri',
  'law': 'lih'
};

// Aliases mapping keyword/phrase -> card ID
export const CARD_ALIASES = {
  'call detail record': 'cdr',
  'call detail': 'cdr',
  'call record': 'cdr',
  'call log': 'cdr',
  'call records': 'cdr',
  'cdr intelligence': 'cdr',
  'cdr': 'cdr',
  
  'subscriber detail record': 'sdr',
  'subscriber detail': 'sdr',
  'subscriber info': 'sdr',
  'sim owner': 'sdr',
  'sim details': 'sdr',
  'sdr intelligence': 'sdr',
  'sdr': 'sdr',

  'tower dump record': 'tdr',
  'tower dump': 'tdr',
  'cell tower': 'tdr',
  'tower record': 'tdr',
  'tdr intelligence': 'tdr',
  'tdr': 'tdr',

  'international long distance': 'ild',
  'international call': 'ild',
  'ild intelligence': 'ild',
  'ild': 'ild',

  'internet traffic detail record': 'itdr',
  'internet traffic': 'itdr',
  'itdr intelligence': 'itdr',
  'itdr': 'itdr',

  'internet protocol detail record': 'ipdr',
  'ip detail record': 'ipdr',
  'ip detail': 'ipdr',
  'ip log': 'ipdr',
  'ipdr intelligence': 'ipdr',
  'ipdr': 'ipdr',

  'internet data record': 'idr',
  'internet data': 'idr',
  'idr intelligence': 'idr',
  'idr': 'idr',

  'location analysis record': 'lar',
  'location analysis': 'lar',
  'location record': 'lar',
  'location tracking': 'lar',
  'lar intelligence': 'lar',
  'lar': 'lar',

  'open source intelligence': 'osint',
  'open source': 'osint',
  'osint intelligence': 'osint',
  'osint': 'osint',

  'social media intelligence': 'smi',
  'social media': 'smi',
  'smi intelligence': 'smi',
  'smi': 'smi',

  'bank statement analysis report': 'bsar',
  'bank statement analysis': 'bsar',
  'bank statement': 'bsar',
  'bsar intelligence': 'bsar',
  'bsar': 'bsar',

  'bank record intelligence': 'bri',
  'bank record': 'bri',
  'bank details': 'bri',
  'bri': 'bri',

  'regional transport office': 'rtoi',
  'regional transport': 'rtoi',
  'vehicle details': 'rtoi',
  'rto intelligence': 'rtoi',
  'rtoi': 'rtoi',

  'prison record intelligence': 'pri',
  'prison record': 'pri',
  'jail record': 'pri',
  'pri': 'pri',

  'law intelligence hub': 'lih',
  'law intelligence': 'lih',
  'lih': 'lih',

  'biometric intelligence': 'bi',
  'biometric': 'bi',

  'facial recognition intelligence': 'fri',
  'facial recognition': 'fri',
  'face recognition': 'fri',
  'fri': 'fri',

  'land record intelligence': 'lri',
  'land record': 'lri',
  'lri': 'lri',

  'education record intelligence': 'eri',
  'education record': 'eri',
  'eri': 'eri',

  'kyc document intelligence': 'kycdi',
  'kyc document': 'kycdi',
  'kyc info': 'kycdi',
  'kycdi': 'kycdi',

  'police station record intelligence': 'psri',
  'police station record': 'psri',
  'police record': 'psri',
  'psri': 'psri',

  'court record intelligence': 'cori',
  'court record': 'cori',
  'cori': 'cori',

  'post office record intelligence': 'pori',
  'post office record': 'pori',
  'post office': 'pori',
  'pori': 'pori',

  'toll gate record intelligence': 'tgri',
  'toll gate record': 'tgri',
  'toll gate': 'tgri',
  'tgri': 'tgri',

  'guest house lodge record': 'ghlri',
  'guest house': 'ghlri',
  'lodge record': 'ghlri',
  'ghlri': 'ghlri',

  'petrol pump record intelligence': 'ppri',
  'petrol pump record': 'ppri',
  'petrol pump': 'ppri',
  'ppri': 'ppri',

  'railway information intelligence': 'rii',
  'railway information': 'rii',
  'railway record': 'rii',
  'rii': 'rii',

  'pin code record intelligence': 'pcri',
  'pin code record': 'pcri',
  'pincode': 'pcri',
  'pcri': 'pcri',

  'company registration intelligence': 'cri',
  'company registration': 'cri',
  'cri': 'cri',

  'medical data record intelligence': 'mdri',
  'medical data record': 'mdri',
  'medical record': 'mdri',
  'mdri': 'mdri',

  'about us': 'about',
  'account settings': 'account-settings',
  'settings': 'account-settings'
};

// Regex patterns to strip common question patterns
export const QUESTION_PREFIXES_REGEX = /^(what\s+is\s+the|what\s+is|what\s+are\s+the|what\s+are|explain\s+to\s+me|explain|tell\s+me\s+about|tell\s+me|what\s+about|how\s+does|how\s+do\s+i\s+use|work\s+of|purpose\s+of|benefits\s+of|use\s+cases\s+of|features\s+of|details\s+of|info\s+on|information\s+about|info\s+about|show\s+me|give\s+me|search|lookup|anything\s+related\s+to|related\s+to|meaning\s+of|definition\s+of|describe|can\s+you\s+tell\s+me\s+about|can\s+you|please|what's|whats)\s+/gi;

export const QUESTION_SUFFIXES_REGEX = /\s+(content|keyword\s+name|keyword|name|details|info|information|overview|summary|data|card|module|intelligence|system|work|purpose|benefits|features|use\s+cases)\b/gi;

/**
 * Detects matching card and tab intent from user query.
 * @param {string} rawQuery
 * @returns {{ card: Object|null, tab: string|null, cleanedQuery: string, terms: string[] }}
 */
export function detectCardAndTab(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return { card: null, tab: null, cleanedQuery: '', terms: [] };
  }

  const queryLower = rawQuery.trim().toLowerCase();
  
  // 1. Detect sub-intent (tab) from query
  let detectedTab = null;
  if (/\b(intro|introduction|preamble|starting|about\s+module)\b/i.test(queryLower)) {
    detectedTab = 'introduction';
  } else if (/\b(mission|core\s+mission|objective\s+mission)\b/i.test(queryLower)) {
    detectedTab = 'mission';
  } else if (/\b(vision|future\s+vision|scope\s+vision)\b/i.test(queryLower)) {
    detectedTab = 'vision';
  } else if (/\b(why\s+choose|why\s+choose\s+us|why\s+select|why\s+use|advantages?\s+over)\b/i.test(queryLower)) {
    detectedTab = 'whyChooseUs';
  } else if (/\b(keywords?|tags?|search\s+terms?|aliases?)\b/i.test(queryLower)) {
    detectedTab = 'keywords';
  } else if (/\b(other|other\s+details?|technical\s+specs?|compliance|formats?|specifications?)\b/i.test(queryLower)) {
    detectedTab = 'other';
  } else if (/\b(purpose|aim|goal|objective|why\s+is)\b/i.test(queryLower)) {
    detectedTab = 'purpose';
  } else if (/\b(work|working|how\s+does\s+it\s+work|how\s+it\s+works|process|workflow|operation)\b/i.test(queryLower)) {
    detectedTab = 'work';
  } else if (/\b(benefit|benefits|advantage|advantages|value)\b/i.test(queryLower)) {
    detectedTab = 'benefits';
  } else if (/\b(use\s*cases?|where\s+to\s+use|application|examples?)\b/i.test(queryLower)) {
    detectedTab = 'useCases';
  } else if (/\b(features?|feature\s*menu|sub\s*tools?|subtools?|tools?|menu|capabilities)\b/i.test(queryLower)) {
    detectedTab = 'featureMenu';
  } else if (/\b(overview|summary|about|definition|meaning|explain|what\s+is)\b/i.test(queryLower)) {
    detectedTab = 'overview';
  }

  // 2. Clean conversational filler & question words
  let cleaned = queryLower
    .replace(QUESTION_PREFIXES_REGEX, ' ')
    .replace(QUESTION_SUFFIXES_REGEX, ' ')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) {
    cleaned = queryLower.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Split into words & apply typo map
  const rawWords = cleaned.split(' ').filter(Boolean);
  const words = rawWords.map(w => TYPO_MAP[w] || w);
  const normalizedCleaned = words.join(' ');

  // 3. Check Direct Aliases (exact phrase matching)
  for (const [alias, cardId] of Object.entries(CARD_ALIASES)) {
    if (queryLower.includes(alias) || normalizedCleaned.includes(alias) || words.includes(alias)) {
      const card = ALL_AGENT_CARDS.find(c => c.id.toLowerCase() === cardId.toLowerCase());
      if (card) {
        return { card, tab: detectedTab, cleanedQuery: normalizedCleaned, terms: words };
      }
    }
  }

  // 4. Check Card ShortName or ID match
  for (const word of words) {
    const card = ALL_AGENT_CARDS.find(c => 
      c.shortName.toLowerCase() === word ||
      c.id.toLowerCase() === word
    );
    if (card) {
      return { card, tab: detectedTab, cleanedQuery: normalizedCleaned, terms: words };
    }
  }

  // 5. Check if any card shortName, name, or subtitle matches words
  const cardByNameOrSubtitle = ALL_AGENT_CARDS.find(c => {
    const sName = c.shortName.toLowerCase();
    const name = c.name.toLowerCase();
    const sub = c.subtitle.toLowerCase();
    
    if (words.some(w => w.length >= 2 && sName === w)) return true;
    if (normalizedCleaned.length >= 2 && (name.includes(normalizedCleaned) || sub.includes(normalizedCleaned))) return true;

    return false;
  });

  if (cardByNameOrSubtitle) {
    return { card: cardByNameOrSubtitle, tab: detectedTab, cleanedQuery: normalizedCleaned, terms: words };
  }

  const STOP_WORDS = new Set(['the', 'and', 'why', 'how', 'who', 'what', 'when', 'where', 'which', 'choose', 'use', 'us', 'me', 'it', 'its', 'this', 'that', 'from', 'with', 'for', 'about', 'tell', 'show', 'give', 'explain', 'work', 'purpose', 'benefit', 'benefits', 'feature', 'features', 'mission', 'vision', 'keywords', 'details', 'other', 'overview', 'menu', 'list', 'are', 'is', 'was', 'were', 'does', 'did', 'done', 'doing']);

  // 6. Substring fallback match (excluding stop words)
  for (const word of words) {
    if (word.length >= 3 && !STOP_WORDS.has(word)) {
      const match = ALL_AGENT_CARDS.find(c => 
        c.shortName.toLowerCase().includes(word) ||
        c.name.toLowerCase().includes(word) ||
        c.subtitle.toLowerCase().includes(word)
      );
      if (match) {
        return { card: match, tab: detectedTab, cleanedQuery: normalizedCleaned, terms: words };
      }
    }
  }

  return { card: null, tab: detectedTab, cleanedQuery: normalizedCleaned, terms: words };
}

/**
 * Filter cards intelligently for search/live input lists
 * @param {string} inputQuery
 * @returns {Array} List of matching card objects
 */
export function filterCardsSmart(inputQuery) {
  if (!inputQuery || !inputQuery.trim()) return ALL_AGENT_CARDS;
  
  const { card, cleanedQuery, terms } = detectCardAndTab(inputQuery);
  
  if (card) {
    const others = ALL_AGENT_CARDS.filter(c => c.id !== card.id && (
      c.name.toLowerCase().includes(cleanedQuery) ||
      c.shortName.toLowerCase().includes(cleanedQuery) ||
      c.subtitle.toLowerCase().includes(cleanedQuery)
    ));
    return [card, ...others];
  }

  if (!cleanedQuery && terms.length === 0) return ALL_AGENT_CARDS;

  return ALL_AGENT_CARDS.filter(c => {
    const kwStr = Array.isArray(c.keywords) ? c.keywords.join(' ') : (c.keywords || '');
    const wcuStr = Array.isArray(c.whyChooseUs) ? c.whyChooseUs.join(' ') : (c.whyChooseUs || '');
    const text = `${c.name} ${c.shortName} ${c.subtitle} ${c.overview} ${c.purpose} ${c.introduction} ${c.mission} ${c.vision} ${kwStr} ${wcuStr} ${c.other}`.toLowerCase();
    if (cleanedQuery && text.includes(cleanedQuery)) return true;
    if (terms.some(t => t.length >= 2 && text.includes(t))) return true;
    return false;
  });
}
