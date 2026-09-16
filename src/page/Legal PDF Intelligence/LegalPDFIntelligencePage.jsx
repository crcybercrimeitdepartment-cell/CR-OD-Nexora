/**
 * @file src/page/LegalPdfIntelligence/LegalPdfIntelligencePage.jsx
 * @description Main Legal PDF Intelligence container rendering 20 intelligence cards.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  Layers,
  FileCheck,
  FileText,
  ShieldCheck,
  FileSignature,
  Brain,
  FileSearch,
  Users,
  Eye,
  Folder,
  PlaySquare,
  BookOpen,
  MessageSquare,
  Key,
  Copyright,
  Lock,
  Settings,
  Info,
  Cpu,
  Mail
} from 'lucide-react';
import ToolCard from '../../components/nexora';

import OrganizePdfPage from './OrganizePdf/OrganizePdfPage';
import ConvertToPdfPage from './ConvertToPdf/ConvertToPdfPage';
import ConvertFromPdfPage from './ConvertFromPdf/ConvertFromPdfPage';
import PdfSecurityPage from './PdfSecurity/PdfSecurityPage';
import PdfSignaturePage from './PdfSignature/PdfSignaturePage';
import PdfAiToolsPage from './PdfAiTools/PdfAiToolsPage';
import CompareAndRedactionPage from './CompareAndRedaction/CompareAndRedactionPage';
import TeamAndBusinessPage from './TeamAndBusiness/TeamAndBusinessPage';
import AccessibilityPage from './Accessibility/AccessibilityPage';
import DocumentManagementPage from './DocumentManagement/DocumentManagementPage';
import ImageProcessingPage from './ImageProcessing/ImageProcessingPage';
import PdfReaderPage from './PdfReader/PdfReaderPage';
import ReviewAndAnnotationPage from './ReviewAndAnnotation/ReviewAndAnnotationPage';
import FingerprintAuthenticationAndSignaturePage from './FingerprintAuthenticationAndSignature/FingerprintAuthenticationAndSignaturePage';
import PdfCopyrightProtectionPage from './PdfCopyrightProtection/PdfCopyrightProtectionPage';
import FolderSecurityPage from './FolderSecurity/FolderSecurityPage';
import PdfToolsPage from './PdfTools/PdfToolsPage';
import SoftwareAboutUsPage from './SoftwareAboutUs/SoftwareAboutUsPage';
import AiAgentPage from './AiAgent/AiAgentPage';
import ContactUsPage from './ContactUs/ContactUsPage';

const SUB_PAGES = {
  'organize-pdf': OrganizePdfPage,
  'convert-to-pdf': ConvertToPdfPage,
  'convert-from-pdf': ConvertFromPdfPage,
  'pdf-security': PdfSecurityPage,
  'pdf-signature': PdfSignaturePage,
  'pdf-ai-tools': PdfAiToolsPage,
  'compare-redaction': CompareAndRedactionPage,
  'team-business': TeamAndBusinessPage,
  'accessibility': AccessibilityPage,
  'document-management': DocumentManagementPage,
  'image-processing': ImageProcessingPage,
  'pdf-reader': PdfReaderPage,
  'review-annotation': ReviewAndAnnotationPage,
  'fingerprint-auth-signature': FingerprintAuthenticationAndSignaturePage,
  'pdf-copyright-protection': PdfCopyrightProtectionPage,
  'folder-security': FolderSecurityPage,
  'pdf-tools': PdfToolsPage,
  'software-about-us': SoftwareAboutUsPage,
  'ai-agent': AiAgentPage,
  'contact-us': ContactUsPage,
};

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'LPDI',
  fullName: name
});

export const LPDI_CARDS = [
  card('organize-pdf', 'Organize pdf', 'Free Merge PDF, Split PDF File, Reorder & Extract PDF pages fast', Layers, 'text-rose-600', 'bg-rose-100'),
  card('convert-to-pdf', 'Convert to PDF', 'Online Convert Word, Excel, PPT, images, and HTML into PDF format', FileCheck, 'text-blue-600', 'bg-blue-100'),
  card('convert-from-pdf', 'Convert from PDF', 'Free Convert PDF Document to editable Word, Excel, PPT, or images', FileText, 'text-[#6D28D9]', 'bg-[#F5F3FF]'),
  card('pdf-security', 'PDF Security', 'Secure Protect PDF File with strong password encryption and unlock permissions', ShieldCheck, 'text-amber-600', 'bg-amber-100'),

  card('pdf-signature', 'PDF Signature', 'Online Sign PDF Document with legally binding digital & e-signatures', FileSignature, 'text-pink-600', 'bg-pink-100'),
  card('pdf-ai-tools', 'PDF AI Tools', 'Online Search & Chat with PDF, extract AI summaries, and analyze text', Brain, 'text-[#6D28D9]', 'bg-[#F5F3FF]'),
  card('compare-redaction', 'Compare & Redaction', 'Online Redact PDF File & compare document versions side-by-side', FileSearch, 'text-blue-600', 'bg-blue-100'),
  card('team-business', 'Team & Business', 'Secure PDF Management, multi-user collaboration, and enterprise tools', Users, 'text-[#0284C7]', 'bg-[#E0F2FE]'),

  card('accessibility', 'Accessibility', 'Optimize PDF Document for screen readers, alt text, and PDF/UA accessibility', Eye, 'text-cyan-600', 'bg-cyan-100'),
  card('document-management', 'Document Management', 'Best PDF Management to catalog, index, tag, and organize large PDF libraries', Folder, 'text-[#059669]', 'bg-[#ECFDF5]'),
  card('image-processing', 'Image Processing', 'Free Compress PDF File images, optimize resolution, and crop photos in PDF', PlaySquare, 'text-amber-600', 'bg-amber-100'),
  card('pdf-reader', 'PDF Reader', 'Online View PDF File with high-speed PDF Viewer & dark reading mode', BookOpen, 'text-[#475569]', 'bg-[#F1F5F9]'),

  card('review-annotation', 'Review & Annotation', 'Free Edit PDF Document with sticky notes, freehand drawing, & highlights', MessageSquare, 'text-pink-600', 'bg-pink-100'),
  card('fingerprint-auth-signature', 'Fingerprint Authentication & Signature', 'Fast Sign Digital PDF with biometric fingerprint authorization & tamper protection', Key, 'text-indigo-600', 'bg-indigo-100'),
  card('pdf-copyright-protection', 'pdf copyright protection', 'Secure Protect Digital PDF with custom watermarks, copyright text, & DRM', Copyright, 'text-orange-600', 'bg-orange-100'),
  card('folder-security', 'folder security', 'Secure Protect PDF File folders with strong password encryption', Lock, 'text-rose-600', 'bg-rose-100'),

  card('pdf-tools', 'pdf tools', 'All-in-one suite of essential utility tools for PDF management', Settings, 'text-purple-600', 'bg-purple-100'),
  card('software-about-us', 'software about us', 'Learn more about our mission, platform architecture, and team', Info, 'text-emerald-600', 'bg-emerald-100'),
  card('ai-agent', 'AI Agent', 'Interact with our advanced AI agent to automate your PDF workflows', Cpu, 'text-blue-600', 'bg-blue-100'),
  card('contact-us', 'Contact Us', 'Get in touch with our support team for enterprise features and queries', Mail, 'text-pink-600', 'bg-pink-100'),
];

export default function LegalPdfIntelligencePage({ onBack }) {
  const [activeSubPage, setActiveSubPage] = useState(null);

  const SubPageComponent = activeSubPage ? SUB_PAGES[activeSubPage] : null;
  if (SubPageComponent) {
    return <SubPageComponent onBack={() => setActiveSubPage(null)} />;
  }

  return (
    <section aria-labelledby="lpdi-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="lpdi-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Legal PDF Intelligence
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Comprehensive Legal PDF Intelligence Platform. Advanced PDF organization, multi-format conversion, digital signatures, AI-powered document analysis, redaction, security encryption, and enterprise document management tailored for law enforcement, legal professionals, and investigative audits.
          </p>
        </div>
      </header>

      {/* 20 Intelligence Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {LPDI_CARDS.map((tool, index) => (
          <ToolCard
            key={`${tool.id}-${index}`}
            tool={tool}
            index={index}
            onClick={() => {
              if (SUB_PAGES[tool.id]) {
                setActiveSubPage(tool.id);
              }
            }}
            disableCssAnimation={true}
          />
        ))}
      </div>
    </section>
  );
}

