import React, { useState } from 'react';
import { User as FiUser, CreditCard as FiCreditCard, MapPin as FiMapPin, CheckCircle as FiCheckCircle, FileText as FiFileText, ArrowLeft } from 'lucide-react';

const globalCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
`;

const DisplayField = ({ label, value }) => (
  <div className="flex flex-col mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-sm relative group overflow-hidden hover:border-rose-300 hover:shadow-md transition-all duration-300">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 z-10 transition-colors group-hover:text-rose-500">
      {label}
    </label>
    <div className="text-sm font-extrabold text-slate-800 z-10 truncate" title={value || "Not provided"}>
      {value || <span className="text-slate-300 italic font-medium">Not provided</span>}
    </div>
  </div>
);

const steps = [
  { label: 'Basic Info', Icon: FiUser },
  { label: 'Service & ID', Icon: FiCreditCard },
  { label: 'Perm. Address', Icon: FiMapPin },
  { label: 'Pres. Address', Icon: FiMapPin },
];

const StepIndicator = ({ current }) => (
  <div className="flex flex-wrap items-center justify-center gap-0 mb-8 mt-4 select-none px-2">
    {steps.map(({ label, Icon }, i) => {
      const done   = i < current;
      const active = i === current;
      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5 relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
              ${done   ? 'bg-rose-600 text-white' : ''}
              ${active ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white scale-110 shadow-lg shadow-rose-200 ring-4 ring-white' : ''}
              ${!done && !active ? 'bg-white text-slate-400 border-2 border-slate-200' : ''}
            `}>
              {done ? <FiCheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${active ? 'text-rose-700' : done ? 'text-rose-500' : 'text-slate-400'}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-1 w-8 sm:w-16 md:w-24 -mt-5 mx-1 md:mx-2 rounded-full transition-all duration-700 ${done ? 'bg-rose-500' : 'bg-slate-200'}`} />
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

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const currentFields = step === 0 ? page1Fields : step === 1 ? page2Fields : step === 2 ? page3Fields : page4Fields;

  return (
    <div className="min-h-screen relative overflow-x-hidden p-4 md:p-8 flex flex-col bg-transparent">
      <style>{globalCss}</style>
      
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-2 mb-8">
              {currentFields.map((field, idx) => (
                <DisplayField 
                  key={idx} 
                  label={field} 
                  value={formData[field]} 
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
              <button 
                type="button" 
                onClick={handleBack}
                disabled={step === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm
                  ${step === 0 
                    ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-transparent' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600 hover:shadow-md cursor-pointer'
                  }`}
              >
                ← Back
              </button>

              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  Next Step →
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => alert("Record Acknowledged")}
                  className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  Acknowledge Record
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
