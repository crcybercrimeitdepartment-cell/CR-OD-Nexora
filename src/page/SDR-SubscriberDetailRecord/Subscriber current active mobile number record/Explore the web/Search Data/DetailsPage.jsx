import React, { useState } from 'react';
import { User as FiUser, CreditCard as FiCreditCard, MapPin as FiMapPin, CheckCircle as FiCheckCircle, FileText as FiFileText, ArrowLeft } from 'lucide-react';
import { DataCard, PageNavigation, SectionHeader } from '../../../../../components/report';

const localCss = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
`;

const steps = [
  { label: 'Basic Info', Icon: FiUser },
  { label: 'Service & ID', Icon: FiCreditCard },
  { label: 'Perm. Address', Icon: FiMapPin },
  { label: 'Pres. Address', Icon: FiMapPin },
];

const stepSections = [
  { number: '01', title: 'Basic Information' },
  { number: '02', title: 'Service & Identification' },
  { number: '03', title: 'Permanent Address' },
  { number: '04', title: 'Present Address' },
];

const StepIndicator = ({ current }) => (
  <div className="flex flex-wrap items-center justify-center gap-0 mb-6 mt-3 select-none px-2">
    {steps.map(({ label, Icon }, i) => {
      const done   = i < current;
      const active = i === current;
      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5 relative z-10">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
              ${done   ? 'bg-rose-600 text-white' : ''}
              ${active ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white scale-110 shadow-lg shadow-rose-200 ring-4 ring-white' : ''}
              ${!done && !active ? 'bg-white text-slate-400 border-2 border-slate-200' : ''}
            `}>
              {done ? <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>
            <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${active ? 'text-rose-700' : done ? 'text-rose-500' : 'text-slate-400'}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-1 w-5 sm:w-12 md:w-20 -mt-5 mx-0.5 sm:mx-1 md:mx-2 rounded-full transition-all duration-700 ${done ? 'bg-rose-500' : 'bg-slate-200'}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const page1Fields = [
  "Subscriber Telecom Operator Name", "Full Name", "Father Name", "Mother Name", "Spouse Name",
  "Date of Birth", "Age", "Gender", "Nationality", "Profession", "Subscriber Preferred Language",
  "Subscriber Mobile Number", "Subscriber Alternate Mobile Number", "SIM Type", "SIM No",
  "Activation Date", "Activation Time", "Type of Subscriber", "Subscriber Service Type",
  "Subscriber Connection Type", "Subscriber SIM Registration Circle", "Subscriber MSISDN",
  "Subscriber Mobile IMSI", "ICCID"
];

const page2Fields = [
  "SR No", "Subscriber Current Operator Name", "Subscriber Current Operator Area",
  "Subscriber Existing Operator Name", "Subscriber Existing Operator Area", "Subscriber SIM Status",
  "SIM Deactivation Date", "SIM Deactivation Time", "SIM Deactivation Reason",
  "Subscriber Number of Active Connections", "Subscriber Multiple Connection",
  "Subscriber Telemarketing Usage Consent", "Subscriber Service/Facility Required",
  "Subscriber Tariff Plan Applied", "M2M Flag", "Service Circle", "Circle ID",
  "Subscriber Identification Type", "Subscriber Identification Number",
  "Subscriber Proof of Address Type", "Subscriber Proof of Address Document Number",
  "Subscriber Passport Number", "Subscriber Visa Validity", "Subscriber PAN / GIR No.",
  "Subscriber Mail ID"
];

const page3Fields = [
  "Perm. House No.", "Perm. C/O / S/O / D/O / W/O", "Perm. Flat No.", "Perm. Plot No.",
  "Perm. Building Name", "Perm. Apartment Name", "Perm. Street Name", "Perm. Road Name",
  "Perm. Area", "Perm. Locality", "Perm. Village", "Perm. Landmark", "Perm. Town",
  "Perm. City", "Perm. Block", "Perm. Tehsil", "Perm. District", "Perm. State",
  "Perm. PIN Code", "Perm. Country", "Perm. Local Police Station", "Perm. Local Post Office"
];

const page4Fields = [
  "Pres. House No.", "Pres. C/O / S/O / D/O / W/O", "Pres. Flat No.", "Pres. Plot No.",
  "Pres. Building Name", "Pres. Apartment Name", "Pres. Street Name", "Pres. Road Name",
  "Pres. Area", "Pres. Locality", "Pres. Village", "Pres. Landmark", "Pres. Town",
  "Pres. City", "Pres. Block", "Pres. Tehsil", "Pres. District", "Pres. State",
  "Pres. PIN Code", "Pres. Country", "Pres. Local Police Station", "Pres. Local Post Office"
];

const generateMockData = (record) => {
  const data = {};
  const allFields = [...page1Fields, ...page2Fields, ...page3Fields, ...page4Fields];
  allFields.forEach((field) => {
    if (field.includes('Date')) data[field] = '12/05/2023';
    else if (field.includes('Name')) data[field] = 'John Doe';
    else if (field.includes('Number') || field.includes('No')) data[field] = '9876543210';
    else if (field.includes('Gender')) data[field] = 'Male';
    else if (field.includes('Type')) data[field] = 'Prepaid';
    else if (field.includes('Address') || field.includes('Road') || field.includes('Street')) data[field] = '123 Tech Avenue';
    else if (field.includes('City') || field.includes('District')) data[field] = 'Metropolis';
    else if (field.includes('Country')) data[field] = 'India';
    else if (field.includes('PIN')) data[field] = '110001';
    else data[field] = `Sample ${field}`;
  });

  if (record) {
    if (record.telecomOperator) {
      data["Subscriber Telecom Operator Name"] = record.telecomOperator;
      data["Subscriber Current Operator Name"] = record.telecomOperator;
    }
    if (record.subscriberName) data["Full Name"] = record.subscriberName;
    if (record.parentSpouseName) data["Father Name"] = record.parentSpouseName;
    if (record.dateOfBirth) data["Date of Birth"] = record.dateOfBirth;
    if (record.gender) data["Gender"] = record.gender;
    if (record.mobileNumber) data["Subscriber Mobile Number"] = record.mobileNumber;
    if (record.alternateMobileNumber) data["Subscriber Alternate Mobile Number"] = record.alternateMobileNumber;
    if (record.simNumber) {
      data["SIM No"] = record.simNumber;
      data["ICCID"] = record.simNumber;
    }
    if (record.simActivationDate) data["Activation Date"] = record.simActivationDate;
    if (record.connectionType) {
      data["Subscriber Connection Type"] = record.connectionType;
      data["SIM Type"] = record.connectionType;
    }
    if (record.address) {
      data["Perm. Road Name"] = record.address;
      data["Pres. Road Name"] = record.address;
    }
  }

  return data;
};

export const DetailsPage = ({ record, onBack }) => {
  const [step, setStep] = useState(0);
  const [formData] = useState(() => generateMockData(record));

  const currentFields = step === 0 ? page1Fields : step === 1 ? page2Fields : step === 2 ? page3Fields : page4Fields;

  return (
    <div className="min-h-screen relative overflow-x-hidden p-4 md:p-8 flex flex-col bg-transparent">
      <style>{localCss}</style>
      
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 animate-fadeInUp bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-200 shrink-0">
              <FiFileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Subscriber Detail Record
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 bg-white/90 border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
                <span>Back</span>
              </button>
            )}
            <div className="px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold border border-rose-100 flex items-center gap-2 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
              Step {step + 1} of 4
            </div>
          </div>
        </div>

        <StepIndicator current={step} />

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-100 flex-1 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="h-full flex flex-col">
            
            {/* Numbered Section Header for Active Step */}
            <SectionHeader
              number={stepSections[step].number}
              title={stepSections[step].title}
              accentColor="rose"
              className="mb-4"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-8">
              {currentFields.map((field, idx) => (
                <DataCard 
                  key={idx} 
                  id={idx + 1}
                  label={field} 
                  value={formData[field]} 
                  accentColor="rose"
                />
              ))}
            </div>

            {/* Standardized Navigation Footer */}
            <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <PageNavigation
                currentPage={step + 1}
                totalPages={4}
                onPageChange={(p) => setStep(p - 1)}
                accentColor="#e11d48"
              />

              {step === 3 && (
                <button 
                  type="button"
                  onClick={() => alert("Record Acknowledged")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm active:scale-[0.98] shadow-xs hover:shadow-sm transition-all duration-150 cursor-pointer w-full sm:w-auto shrink-0"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Acknowledge Record</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
