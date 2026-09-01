import { CRI_TOOLS } from '../../data/subTools';
import React, { useState, useEffect } from 'react';
import {
  Building2, FileText, Award, Rocket, Copyright, FileCheck, Heart,
  Briefcase, Lightbulb, Ship, Utensils, Pill, Factory, Store, Wine,
  Globe, CreditCard, PiggyBank, Activity, Layers, ShoppingCart,
  Users, Handshake, ScanLine, Flame, Wind, CheckCircle, Fuel, Scale, Home
} from 'lucide-react';
import ToolCard from '../../components/nexora';
import { usePageLayout } from '../../components/usePageLayout';
import MCAIPage from "./MCAI-MinistryofCorporateAffairsRecordIntelligence/MCAI-MinistryofCorporateAffairsRecordIntelligencePage";
import GSTRIPage from "./GSTRI-GoodsAndServicesTaxRecordIntelligence/GSTRI-GoodsAndServicesTaxRecordIntelligencePage";
import ISORIPage from "./ISORI-ISORegistrationIntelligence/ISORI-ISORegistrationIntelligencePage";
import SRIPage from "./SRI-SocietyRegistrationIntelligence/SRI-SocietyRegistrationIntelligencePage";
import TRIPage from "./TRI-TrustRegistrationIntelligence/TRI-TrustRegistrationIntelligencePage";
import Page12ARIPage from "./12ARI-12ARegistrationIntelligence/12ARI-12ARegistrationIntelligencePage";
import Page80GRIPage from "./80GRI-80GRegistrationIntelligence/80GRI-80GRegistrationIntelligencePage";
import URIPage from "./URI-UdyamRegistrationIntelligence/URI-UdyamRegistrationIntelligencePage";
import SIRIPage from "./SIRI-StartupIndiaRegistrationIntelligence/SIRI-StartupIndiaRegistrationIntelligencePage";
import IECIPage from "./IECI-ImportExportCodeRegistrationIntelligence/IECI-ImportExportCodeRegistrationIntelligencePage";
import FSSAIIPage from "./FSSAII-FoodSafetyandStandardsAuthorityofIndiaRegistrationIntelligence/FSSAII-FoodSafetyandStandardsAuthorityofIndiaRegistrationIntelligencePage";
import DLIPage from "./DLI-DrugLicenseRegistrationIntelligence/DLI-DrugLicenseRegistrationIntelligencePage";
import FLIPage from "./FLI-FactoryLicenseRegistrationIntelligence/FLI-FactoryLicenseRegistrationIntelligencePage";
import TLIPage from "./TLI-TradeLicenseRegistrationIntelligence/TLI-TradeLicenseRegistrationIntelligencePage";
import SERIPage from "./SERI-Shop&EstablishmentRegistrationIntelligence/SERI-Shop&EstablishmentRegistrationIntelligencePage";
import FCRAIPage from "./FCRAI-ForeignContributionRegulationActRegistrationIntelligence/FCRAI-ForeignContributionRegulationActRegistrationIntelligencePage";
import PANIPage from "./PANI-PermanentAccountNumberRegistrationIntelligence/PANI-PermanentAccountNumberRegistrationIntelligencePage";
import TANIPage from "./TANI-TaxDeductionandCollectionAccountNumberRegistrationIntelligence/TANI-TaxDeductionandCollectionAccountNumberRegistrationIntelligencePage";
import EPFOIPage from "./EPFOI-EmployeesProvidentFundOrganisationRegistrationIntelligence/EPFOI-EmployeesProvidentFundOrganisationRegistrationIntelligencePage";
import ESICIPage from "./ESICI-EmployeesStateInsuranceCorporationRegistrationIntelligence/ESICI-EmployeesStateInsuranceCorporationRegistrationIntelligencePage";
import NSICIPage from "./NSICI-NationalSmallIndustriesCorporationRegistrationIntelligence/NSICI-NationalSmallIndustriesCorporationRegistrationIntelligencePage";
import GeMRIPage from "./GeMRI-Governmente-MarketplaceRegistrationIntelligence/GeMRI-Governmente-MarketplaceRegistrationIntelligencePage";
import NGODIPage from "./NGODI-NGODARPANRegistrationIntelligence/NGODI-NGODARPANRegistrationIntelligencePage";
import CSR1IPage from "./CSR1I-CorporateSocialResponsibility(CSR-1)RegistrationIntelligence/CSR1I-CorporateSocialResponsibility(CSR-1)RegistrationIntelligencePage";
import TMRIPage from "./TMRI-TrademarkRegistrationIntelligence/TMRI-TrademarkRegistrationIntelligencePage";
import FNOCIPage from "./FNOCI-FireNoObjectionCertificateRegistrationIntelligence/FNOCI-FireNoObjectionCertificateRegistrationIntelligencePage";
import PCBIPage from "./PCBI-PollutionControlBoardRegistrationIntelligence/PCBI-PollutionControlBoardRegistrationIntelligencePage";
import BISIPage from "./BISI-BureauofIndianStandardsRegistrationIntelligence/BISI-BureauofIndianStandardsRegistrationIntelligencePage";
import PESOIPage from "./PESOI-PetroleumandExplosivesSafetyOrganisationLicenseRegistrationIntelligence/PESOI-PetroleumandExplosivesSafetyOrganisationLicenseRegistrationIntelligencePage";
import LMRIPage from "./LMRI-LegalMetrologyRegistrationIntelligence/LMRI-LegalMetrologyRegistrationIntelligencePage";
import CERIPage from "./CERI-ClinicalEstablishmentRegistrationIntelligence/CERI-ClinicalEstablishmentRegistrationIntelligencePage";
import RERAIPage from "./RERAI-RealEstateRegulatoryAuthorityRegistrationIntelligence/RERAI-RealEstateRegulatoryAuthorityRegistrationIntelligencePage";

/**
 * Header Component.
 * Renders the title and a brief description of the page's purpose.
 * 
 * @param {Object} props - Component properties.
 * @param {string} [props.title] - Optional override for the title.
 * @param {string} [props.description] - Optional override for the description.
 * @returns {JSX.Element} The rendered header component.
 */
export function Header({ title, description }) {
  const displayTitle = title || "Company Registration Intelligence";
  const displayDesc = description || "Audit corporate records, regulatory registrations, and business intelligence. Trace corporate ownership structures, identify shell companies, and cross-reference board of directors data to uncover hidden affiliations. Access real-time compliance reports, financial filings, and structural hierarchies to support complex fraud investigations and corporate due diligence.";
  
  return (
    <header className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none">
      <div className="flex items-center justify-center w-full relative z-20">
        <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
            <span>{displayTitle}</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            {displayDesc}
          </p>
        </div>
      </div>
    </header>
  );
}



/**
 * Main Page Component.
 * Handles the display, routing, and user interactions for this specific intelligence record.
 * 
 * @param {Object} props - Component properties.
 * @param {Function} props.onBack - Callback function triggered when the user clicks the "Back" button to return to the parent dashboard.
 * @returns {JSX.Element} The rendered page layout.
 */
export default function CRIPage({ onBack }) {
  const { dynamicGridClass, displayTools } = usePageLayout('cri', CRI_TOOLS);
  const [selectedSubPage, setSelectedSubPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSubPage]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page === 'CRI' && event.state.subPage) {
        setSelectedSubPage(event.state.subPage);
      } else {
        setSelectedSubPage(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    // Check initial state in case of direct load or forward navigation
    if (window.history.state && window.history.state.subPage) {
      setSelectedSubPage(window.history.state.subPage);
    }
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectSubPage = (id) => {
    window.history.pushState({ page: 'CRI', subPage: id }, '', `#CRI-${id}`);
    setSelectedSubPage(id);
  };

  const handleSubPageBack = () => {
    if (window.history.state && window.history.state.subPage) {
      window.history.back();
    } else {
      setSelectedSubPage(null);
    }
  };

  if (selectedSubPage === 'mcai') return <MCAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'gstri') return <GSTRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'isori') return <ISORIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'sri') return <SRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tri') return <TRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === '12ari') return <Page12ARIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === '80gri') return <Page80GRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'uri') return <URIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'siri') return <SIRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ieci') return <IECIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fssaii') return <FSSAIIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'dli') return <DLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fli') return <FLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tli') return <TLIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'seri') return <SERIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fcrai') return <FCRAIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pani') return <PANIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tani') return <TANIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'epfoi') return <EPFOIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'esici') return <ESICIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'nsici') return <NSICIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'gemri') return <GeMRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ngodi') return <NGODIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'csr1i') return <CSR1IPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'tmri') return <TMRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'fnoci') return <FNOCIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pcbi') return <PCBIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'bisi') return <BISIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'pesoi') return <PESOIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'lmri') return <LMRIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'ceri') return <CERIPage onBack={handleSubPageBack} />;
  if (selectedSubPage === 'rerai') return <RERAIPage onBack={handleSubPageBack} />;

  return (
    <div className="flex-1 flex flex-col w-full relative pt-11 sm:pt-4">
      {onBack && (
        <button onClick={onBack}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}
      <Header />
      
      <div className="flex-1 flex flex-col w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-6 overflow-x-hidden">
        <div className={`grid ${dynamicGridClass} gap-2.5 sm:gap-4 md:gap-5`}>
          {displayTools.map((tool, idx) => (
            <ToolCard 
              key={tool.id} 
              tool={{ ...tool, description: tool.desc }} 
              index={idx} 
              onClick={(t) => handleSelectSubPage(t.id)} 
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
