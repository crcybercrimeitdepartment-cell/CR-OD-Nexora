// Mock data generator for SDR records
const generateMockData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    recordId: `SDR${String(i + 1).padStart(6, '0')}`,
    telecomOperator: ['Airtel', 'Jio', 'Vi', 'BSNL'][i % 4],
    subscriberName: 'Rahul Kumar',
    parentSpouseName: 'S/O XXXXX',
    dateOfBirth: '14-05-1990',
    gender: 'Male',
    address: 'House No. 42-B, Pocket-2, Mayur Vihar Phase-1, New Delhi - 110091',
    mobileNumber: `98XXXXXX0${i + 1}`,
    simNumber: `899100000000000000${i + 1}`,
    simActivationDate: `0${(i % 9) + 1}-0${(i % 8) + 1}-202${(i % 4)}`,
    aadhaarNumber: 'XXXX-XXXX-1234',
    connectionType: i % 2 === 0 ? 'Prepaid' : 'Postpaid',
    alternateMobileNumber: '98XXXXXX99'
  }));
};

export const getSDRSearchResults = async (_searchParams) => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const records = generateMockData();
      resolve({
        records,
        totalCount: records.length
      });
    }, 1200);
  });
};

// Mock data generator for Mobile Number & SIM Ownership History
export const getSimOwnershipHistory = (record) => {
  if (!record) return [];
  return [
    {
      id: 1,
      ownerName: record.subscriberName || 'Rahul Kumar',
      relation: record.parentSpouseName || 'S/O XXXXX',
      status: 'Current Active Owner',
      isActive: true,
      mobileNumber: record.mobileNumber,
      simNumber: record.simNumber,
      imsi: `404${record.simNumber?.slice(-12) || '450123456789'}`,
      startDate: record.simActivationDate || '12-04-2023',
      endDate: 'Present',
      telecomOperator: record.telecomOperator,
      connectionType: record.connectionType,
      idProofType: 'Aadhaar (Biometric e-KYC)',
      idProofNumber: record.aadhaarNumber || 'XXXX-XXXX-1234',
      posAgent: 'Star Telecom Services (POS: DEL-88219)',
      circle: 'Delhi / NCR'
    },
    {
      id: 2,
      ownerName: 'Amit Sharma',
      relation: 'S/O R.K. Sharma',
      status: 'Transferred / Reallocated',
      isActive: false,
      mobileNumber: record.mobileNumber,
      simNumber: '8991400291827361520',
      imsi: '404450192837461',
      startDate: '15-08-2021',
      endDate: '28-02-2023',
      telecomOperator: record.telecomOperator === 'Jio' ? 'Airtel' : 'Vodafone Idea',
      connectionType: 'Prepaid',
      idProofType: 'Voter ID Card',
      idProofNumber: 'DL/04/029/987123',
      posAgent: 'Shiv Communications (POS: DEL-12490)',
      circle: 'Delhi / NCR'
    },
    {
      id: 3,
      ownerName: 'Vikram Singh',
      relation: 'S/O Mohan Singh',
      status: 'Disconnected / Closed',
      isActive: false,
      mobileNumber: record.mobileNumber,
      simNumber: '8991400119283746281',
      imsi: '404450119283745',
      startDate: '10-01-2019',
      endDate: '12-05-2021',
      telecomOperator: 'BSNL',
      connectionType: 'Postpaid',
      idProofType: 'Driving License',
      idProofNumber: 'DL-0420190038411',
      posAgent: 'BSNL Customer Care Center',
      circle: 'Delhi / NCR'
    }
  ];
};

// Mock data generator for Subscriber Mobile Number MNP History
export const getMnpHistory = (record) => {
  if (!record) return [];
  return [
    {
      id: 1,
      upcCode: `UPC${record.mobileNumber?.slice(-4) || '8841'}`,
      upcGeneratedDate: '10-04-2023 11:24 AM',
      donorOperator: record.telecomOperator === 'Airtel' ? 'Vodafone Idea' : 'Airtel',
      recipientOperator: record.telecomOperator || 'Jio',
      portingRequestDate: '11-04-2023',
      completionDate: record.simActivationDate || '12-04-2023',
      portingStatus: 'Completed Successfully',
      clearingHouseRef: `MNP-NZ-2023-${record.recordId?.replace('SDR', '') || '104829'}`,
      circle: 'Delhi / NCR',
      reason: 'Subscriber Request (Tariff & Network preference)'
    },
    {
      id: 2,
      upcCode: 'UPC3912',
      upcGeneratedDate: '12-08-2021 04:15 PM',
      donorOperator: 'BSNL',
      recipientOperator: record.telecomOperator === 'Airtel' ? 'Vodafone Idea' : 'Airtel',
      portingRequestDate: '13-08-2021',
      completionDate: '15-08-2021',
      portingStatus: 'Completed Successfully',
      clearingHouseRef: 'MNP-NZ-2021-094821',
      circle: 'Delhi / NCR',
      reason: 'Network Coverage Upgrade'
    }
  ];
};

// Mock data generator for Subscriber Current Mobile Number Activation Details
export const getActivationDetails = (record) => {
  if (!record) return null;
  return {
    // Current Mobile & SIM Specs
    mobileNumber: record.mobileNumber,
    simNumber: record.simNumber,
    imsi: `404${record.simNumber?.slice(-12) || '450123456789'}`,
    telecomOperator: record.telecomOperator,
    connectionType: record.connectionType,
    activationDate: record.simActivationDate,
    serviceStatus: 'Active & Operating',
    tariffPlan: record.connectionType === 'Postpaid' ? 'Enterprise Unlimited ₹499/mo' : 'Truly Unlimited ₹299 (28 Days)',
    circle: 'Delhi / NCR (Licensed Service Area)',
    
    // Subscriber Personal Details
    subscriberName: record.subscriberName,
    parentSpouseName: record.parentSpouseName,
    dateOfBirth: record.dateOfBirth,
    gender: record.gender,
    nationality: 'Indian',
    occupation: 'Private Service',
    
    // Contact & Alternate Details
    alternateMobileNumber: record.alternateMobileNumber,
    emailAddress: 'rahul.kumar***@gmail.com',
    
    // Registered Address Details
    localAddress: 'House No. 42-B, Pocket-2, Mayur Vihar Phase-1',
    permanentAddress: 'House No. 42-B, Pocket-2, Mayur Vihar Phase-1',
    city: 'New Delhi',
    state: 'Delhi',
    pinCode: '110091',
    
    // Identification & Verification Details
    aadhaarNumber: record.aadhaarNumber,
    kycType: 'UIDAI e-KYC (Biometric Iris & Fingerprint)',
    kycVerificationDate: `${record.simActivationDate} 10:45:12 AM`,
    kycStatus: 'Verified & Approved',
    cafNumber: `CAF-${record.recordId}-${new Date().getFullYear()}`,
    
    // Point of Sale (POS) Details
    posName: 'Star Telecom Retail Hub',
    posCode: 'POS-DEL-88219',
    posAgentName: 'Sunil Verma',
    posAddress: 'Shop 14, Main Market, Mayur Vihar, New Delhi - 110091'
  };
};

// Mock data generator for SIM Deactivation Details
export const getDeactivationDetails = (record) => {
  if (!record) return null;
  return {
    // Current Mobile & SIM Specs
    mobileNumber: record.mobileNumber,
    simNumber: record.simNumber,
    imsi: `404${record.simNumber?.slice(-12) || '450123456789'}`,
    telecomOperator: record.telecomOperator,
    connectionType: record.connectionType,
    activationDate: record.simActivationDate,
    circle: 'Delhi / NCR (Licensed Service Area)',
    subscriberName: record.subscriberName,
    parentSpouseName: record.parentSpouseName,
    
    // Deactivation Specifics
    deactivationDate: '18-01-2024',
    deactivationTime: '04:15:30 PM IST',
    deactivationStatus: 'Permanently Deactivated & Surrendered',
    deactivationReason: 'Subscriber Voluntary Surrender (Non-Usage / Relocation)',
    requestTicketNumber: `DCR-DEL-2024-${record.recordId?.replace('SDR', '') || '88419'}`,
    requestedBy: `${record.subscriberName} (Biometric Authenticated)`,
    approvalChannel: 'Operator Customer Service Center / Portal',
    
    // Regulatory & Quarantine Lifecycle (DoT / TRAI Norms)
    quarantinePeriod: '90 Days (Mandatory Cooling-off as per TRAI guidelines)',
    quarantineEndDate: '18-04-2024',
    reallocationEligibilityDate: '19-04-2024 (Pool Re-entry)',
    coolingStatus: 'Active Quarantine Period in Progress',
    nocClearanceStatus: 'NOC Issued (Zero Dues Verified)',
    nodalOfficerId: 'DOT-NDO-DL-9941 (Nodal Authority Delhi)',
    
    // Account & Dues Settlement
    finalBillAmount: '₹0.00',
    outstandingDues: 'Nil (Full & Final Cleared)',
    securityDepositRefund: record.connectionType === 'Postpaid' ? '₹500.00 (Refunded to Bank A/C ending 4402)' : 'Not Applicable (Prepaid Balance Forfeited)',
    settlementDate: '20-01-2024',
    
    // Deactivation POS / Channel Details
    nodalCenterName: 'Airtel/Jio Circle Nodal Center',
    serviceCenterCode: 'SC-NZ-DEL-014',
    executiveName: 'Pooja Rawat (Customer Relations)',
    serviceCenterAddress: 'Ground Floor, Telecom Plaza, Barakhamba Road, Connaught Place, New Delhi - 110001'
  };
};

