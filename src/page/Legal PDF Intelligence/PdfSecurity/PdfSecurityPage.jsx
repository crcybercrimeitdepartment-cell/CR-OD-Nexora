/**
 * @file src/page/LegalPdfIntelligence/PdfSecurity/PdfSecurityPage.jsx
 * @description Main PDF Security container rendering 34 tool cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  Lock,
  Unlock,
  FileCheck,
  ShieldCheck,
  Share2,
  Clock,
  Paperclip,
  Bug,
  Link,
  Award,
  FileText,
  AlertTriangle,
  EyeOff,
  Folder,
  Sparkles,
  History,
  UserX,
  Layers,
  Search,
  FileCode,
  Copy,
  Code,
  Eye,
  Key,
  CheckSquare,
  Zap
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import ProtectPdfPage from './ProtectPdf/ProtectPdfPage';
import UnlockPdfPage from './UnlockPdf/UnlockPdfPage';
import DigitalSignatureVerificationPage from './DigitalSignatureVerification/DigitalSignatureVerificationPage';
import SecurityAuditReportPage from './SecurityAuditReport/SecurityAuditReportPage';

import DocumentIntegrityVerificationPage from './DocumentIntegrityVerification/DocumentIntegrityVerificationPage';
import WatermarkProtectionPage from './WatermarkProtection/WatermarkProtectionPage';
import SecurePdfSharingPage from './SecurePdfSharing/SecurePdfSharingPage';
import FileExpirationPage from './FileExpiration/FileExpirationPage';

import EmbeddedFileDetectionPage from './EmbeddedFileDetection/EmbeddedFileDetectionPage';
import MalwareScanPdfPage from './MalwareScanPdf/MalwareScanPdfPage';
import UnsafeLinkDetectionPage from './UnsafeLinkDetection/UnsafeLinkDetectionPage';
import PdfSecurityScorePage from './PdfSecurityScore/PdfSecurityScorePage';

import PdfSecurityPolicyTemplatesPage from './PdfSecurityPolicyTemplates/PdfSecurityPolicyTemplatesPage';
import AiSecurityRiskDetectionPage from './AiSecurityRiskDetection/AiSecurityRiskDetectionPage';
import AiSensitiveDataDetectionPage from './AiSensitiveDataDetection/AiSensitiveDataDetectionPage';
import AiDocumentClassificationPage from './AiDocumentClassification/AiDocumentClassificationPage';

import AiSecurityRecommendationsPage from './AiSecurityRecommendations/AiSecurityRecommendationsPage';
import AtomicServerTimestampingPage from './AtomicServerTimestamping/AtomicServerTimestampingPage';
import PdfMetadataProtectionPage from './PdfMetadataProtection/PdfMetadataProtectionPage';
import PdfSanitizationPage from './PdfSanitization/PdfSanitizationPage';

import PdfForensicAnalysisPage from './PdfForensicAnalysis/PdfForensicAnalysisPage';
import EmbeddedMediaDetectionPage from './EmbeddedMediaDetection/EmbeddedMediaDetectionPage';
import PdfVersionSecurityCheckPage from './PdfVersionSecurityCheck/PdfVersionSecurityCheckPage';
import RestrictAccessibilityCopyPage from './RestrictAccessibilityCopy/RestrictAccessibilityCopyPage';

import RestrictPageExtractionPage from './RestrictPageExtraction/RestrictPageExtractionPage';
import RemoveJavascriptPage from './RemoveJavascript/RemoveJavascriptPage';
import RemoveHiddenDataPage from './RemoveHiddenData/RemoveHiddenDataPage';
import RemoveFormDataPage from './RemoveFormData/RemoveFormDataPage';

import TrustedCertificatesPage from './TrustedCertificates/TrustedCertificatesPage';
import PdfAValidationPage from './PdfAValidation/PdfAValidationPage';
import BlackoutAreasPage from './BlackoutAreas/BlackoutAreasPage';
import HideSensitiveInformationPage from './HideSensitiveInformation/HideSensitiveInformationPage';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'PDF_SECURITY',
  fullName: name
});

export const PDF_SECURITY_CARDS = [
  card('protect-pdf', 'Protect PDF', 'Encrypt PDF files with strong password protection and permission controls.', Lock, 'text-rose-600', 'bg-rose-100'),
  card('unlock-pdf', 'Unlock PDF', 'Remove passwords and unlock restricted PDF permissions securely.', Unlock, 'text-blue-600', 'bg-blue-100'),
  card('digital-signature-verification', 'Digital Signature Verification', 'Verify authenticity, integrity, and signer certificates of signed PDFs.', FileCheck, 'text-purple-600', 'bg-purple-100'),
  card('security-audit-report', 'Security Audit Report', 'Generate comprehensive PDF security compliance and vulnerability reports.', ShieldCheck, 'text-emerald-600', 'bg-emerald-100'),

  card('document-integrity-verification', 'Document Integrity Verification', 'Validate cryptographic hashes to ensure document has not been tampered with.', ShieldCheck, 'text-amber-600', 'bg-amber-100'),
  card('watermark-protection', 'Watermark Protection', 'Add custom text, image, or dynamic anti-leak security watermarks.', FileText, 'text-emerald-600', 'bg-emerald-100'),
  card('secure-pdf-sharing', 'Secure PDF Sharing', 'Share encrypted, view-only PDFs with restricted download and access controls.', Share2, 'text-blue-600', 'bg-blue-100'),
  card('file-expiration', 'File Expiration', 'Set self-destruct timers and access expiry dates on shared PDF files.', Clock, 'text-amber-600', 'bg-amber-100'),

  card('embedded-file-detection', 'Embedded File Detection', 'Scan and inspect hidden attachments or embedded files inside PDFs.', Paperclip, 'text-purple-600', 'bg-purple-100'),
  card('malware-scan-pdf', 'Malware Scan PDF', 'Scan PDFs for malicious scripts, exploits, and hidden payload viruses.', Bug, 'text-rose-600', 'bg-rose-100'),
  card('unsafe-link-detection', 'Unsafe Link Detection', 'Identify phishing URLs, suspicious hyperlinks, and tracking web links.', Link, 'text-rose-600', 'bg-rose-100'),
  card('pdf-security-score', 'PDF Security Score', 'Calculate overall document security rating based on encryption and vulnerabilities.', Award, 'text-blue-600', 'bg-blue-100'),

  card('pdf-security-policy-templates', 'PDF Security Policy Templates', 'Apply enterprise security policies and compliance rule presets.', FileText, 'text-purple-600', 'bg-purple-100'),
  card('ai-security-risk-detection', 'AI Security Risk Detection', 'AI-driven analysis to detect potential security threats and data breaches.', AlertTriangle, 'text-rose-600', 'bg-rose-100'),
  card('ai-sensitive-data-detection', 'AI Sensitive Data Detection', 'Automatically detect PII, SSN, credit cards, and confidential data.', Sparkles, 'text-amber-600', 'bg-amber-100'),
  card('ai-document-classification', 'AI Document Classification', 'Categorize document confidentiality levels automatically using AI.', Folder, 'text-emerald-600', 'bg-emerald-100'),

  card('ai-security-recommendations', 'AI Security Recommendations', 'Get smart AI suggestions to harden document privacy and safety.', Sparkles, 'text-blue-600', 'bg-blue-100'),
  card('atomic-server-timestamping', 'Atomic Server Timestamping', 'Apply RFC 3161 compliant cryptographic server timestamps to PDFs.', Clock, 'text-amber-600', 'bg-amber-100'),
  card('pdf-metadata-protection', 'PDF Metadata Protection', 'Strip or sanitize hidden EXIF, author details, and creation metadata.', EyeOff, 'text-purple-600', 'bg-purple-100'),
  card('pdf-sanitization', 'PDF Sanitization', 'Deep clean hidden structures, comments, bookmarks, and revision logs.', ShieldCheck, 'text-pink-600', 'bg-pink-100'),

  card('pdf-forensic-analysis', 'PDF Forensic Analysis', 'Perform detailed forensic inspection of PDF structure and revision history.', Search, 'text-rose-600', 'bg-rose-100'),
  card('embedded-media-detection', 'Embedded Media Detection', 'Detect and extract embedded audio, video, and rich media objects.', FileCode, 'text-blue-600', 'bg-blue-100'),
  card('pdf-version-security-check', 'PDF Version Security Check', 'Analyze PDF format version risks and specification compliance.', AlertTriangle, 'text-purple-600', 'bg-purple-100'),
  card('restrict-accessibility-copy', 'Restrict Accessibility Copy', 'Prevent unauthorized copying of text, images, and content.', UserX, 'text-rose-600', 'bg-rose-100'),

  card('restrict-page-extraction', 'Restrict Page Extraction', 'Lock page extraction, splitting, and merging actions on PDF.', Lock, 'text-amber-600', 'bg-amber-100'),
  card('remove-javascript', 'Remove JavaScript', 'Strip dangerous embedded JavaScript actions and auto-executing scripts.', Code, 'text-emerald-600', 'bg-emerald-100'),
  card('remove-hidden-data', 'Remove Hidden Data', 'Clean invisible layers, annotations, and hidden document metadata.', EyeOff, 'text-cyan-600', 'bg-cyan-100'),
  card('remove-form-data', 'Remove Form Data', 'Purge form fields, user input history, and interactive form elements.', FileText, 'text-amber-600', 'bg-amber-100'),

  card('trusted-certificates', 'Trusted Certificates', 'Manage and validate digital certificate chains and CA roots.', Key, 'text-purple-600', 'bg-purple-100'),
  card('pdfa-validation', 'PDF/A Validation', 'Check strict PDF/A archivability and long-term compliance standards.', CheckSquare, 'text-pink-600', 'bg-pink-100'),
  card('blackout-areas', 'Blackout Areas', 'Redact sensitive document areas with permanent blackout boxes.', EyeOff, 'text-rose-600', 'bg-rose-100'),
  card('hide-sensitive-information', 'Hide Sensitive Information', 'Obfuscate sensitive content, text phrases, and confidential data.', EyeOff, 'text-blue-600', 'bg-blue-100'),
];

export default function PdfSecurityPage({ onBack }) {
  const [activeSubPage, setActiveSubPage] = useState(null);

  const handleSubPageBack = () => setActiveSubPage(null);

  if (activeSubPage === 'protect-pdf') return <ProtectPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'unlock-pdf') return <UnlockPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'digital-signature-verification') return <DigitalSignatureVerificationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'security-audit-report') return <SecurityAuditReportPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'document-integrity-verification') return <DocumentIntegrityVerificationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'watermark-protection') return <WatermarkProtectionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'secure-pdf-sharing') return <SecurePdfSharingPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'file-expiration') return <FileExpirationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'embedded-file-detection') return <EmbeddedFileDetectionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'malware-scan-pdf') return <MalwareScanPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'unsafe-link-detection') return <UnsafeLinkDetectionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-security-score') return <PdfSecurityScorePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-security-policy-templates') return <PdfSecurityPolicyTemplatesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ai-security-risk-detection') return <AiSecurityRiskDetectionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ai-sensitive-data-detection') return <AiSensitiveDataDetectionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ai-document-classification') return <AiDocumentClassificationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ai-security-recommendations') return <AiSecurityRecommendationsPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'atomic-server-timestamping') return <AtomicServerTimestampingPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-metadata-protection') return <PdfMetadataProtectionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-sanitization') return <PdfSanitizationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-forensic-analysis') return <PdfForensicAnalysisPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'embedded-media-detection') return <EmbeddedMediaDetectionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-version-security-check') return <PdfVersionSecurityCheckPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'restrict-accessibility-copy') return <RestrictAccessibilityCopyPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'restrict-page-extraction') return <RestrictPageExtractionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'remove-javascript') return <RemoveJavascriptPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'remove-hidden-data') return <RemoveHiddenDataPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'remove-form-data') return <RemoveFormDataPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'trusted-certificates') return <TrustedCertificatesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdfa-validation') return <PdfAValidationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'blackout-areas') return <BlackoutAreasPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'hide-sensitive-information') return <HideSensitiveInformationPage onBack={handleSubPageBack} />;

  return (
    <section aria-labelledby="pdf-security-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="pdf-security-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            PDF Security & Protection
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Protect your PDFs with passwords, encryption, redaction, and digital security tools.
          </p>
        </div>
      </header>

      {/* 34 PDF Security Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {PDF_SECURITY_CARDS.map((tool, index) => (
          <ToolCard
            key={`${tool.id}-${index}`}
            tool={tool}
            index={index}
            onClick={() => setActiveSubPage(tool.id)}
            disableCssAnimation={true}
          />
        ))}
      </div>
    </section>
  );
}
