/**
 * @file src/page/LegalPdfIntelligence/PdfSignature/PdfSignaturePage.jsx
 * @description Main PDF Signature container rendering 45 tool cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  FileSignature,
  Key,
  ShieldCheck,
  Cloud,
  Send,
  RefreshCw,
  Users,
  Download,
  Upload,
  CheckCircle,
  Eye,
  EyeOff,
  PlusCircle,
  Target,
  Palette,
  Check,
  History,
  FileText,
  Bell,
  Clock,
  XCircle,
  Layers,
  Lock,
  Shield,
  QrCode,
  Smartphone,
  Fingerprint,
  Award,
  Search,
  AlertTriangle,
  MapPin,
  MessageSquare,
  Zap
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import PdfSignPage from './PdfSign/PdfSignPage';
import DigitalSignPage from './DigitalSign/DigitalSignPage';
import ESignPage from './ESign/ESignPage';
import UsbTokenSignaturePage from './UsbTokenSignature/UsbTokenSignaturePage';
import PkiSignaturePage from './PkiSignature/PkiSignaturePage';
import CloudSignaturePage from './CloudSignature/CloudSignaturePage';
import RemoteSignaturePage from './RemoteSignature/RemoteSignaturePage';
import ReuseSignaturePage from './ReuseSignature/ReuseSignaturePage';
import MultiSignerWorkflowPage from './MultiSignerWorkflow/MultiSignerWorkflowPage';
import SigningOrderPage from './SigningOrder/SigningOrderPage';
import CertificateImportPage from './CertificateImport/CertificateImportPage';
import CertificateExportPage from './CertificateExport/CertificateExportPage';
import CertificateRevocationCheckPage from './CertificateRevocationCheck/CertificateRevocationCheckPage';
import VisibleSignatureDesignerPage from './VisibleSignatureDesigner/VisibleSignatureDesignerPage';
import InvisibleDigitalSignaturePage from './InvisibleDigitalSignature/InvisibleDigitalSignaturePage';
import SignatureFieldCreatorPage from './SignatureFieldCreator/SignatureFieldCreatorPage';
import AutoSignaturePlacementPage from './AutoSignaturePlacement/AutoSignaturePlacementPage';
import SignatureAppearanceTemplatesPage from './SignatureAppearanceTemplates/SignatureAppearanceTemplatesPage';
import InitialSignaturePage from './InitialSignature/InitialSignaturePage';
import SignatureValidationPage from './SignatureValidation/SignatureValidationPage';
import SignatureHistoryPage from './SignatureHistory/SignatureHistoryPage';
import SignatureAuditTrailPage from './SignatureAuditTrail/SignatureAuditTrailPage';
import SignatureReminderPage from './SignatureReminder/SignatureReminderPage';
import SignatureExpirationPage from './SignatureExpiration/SignatureExpirationPage';
import RejectSignatureRequestPage from './RejectSignatureRequest/RejectSignatureRequestPage';
import DelegatedSigningPage from './DelegatedSigning/DelegatedSigningPage';
import BulkSignaturePage from './BulkSignature/BulkSignaturePage';
import BatchSignatureValidationPage from './BatchSignatureValidation/BatchSignatureValidationPage';
import SignatureLockDocumentPage from './SignatureLockDocument/SignatureLockDocumentPage';
import LongTermSignatureValidationLtvPage from './LongTermSignatureValidationLtv/LongTermSignatureValidationLtvPage';
import TimestampSignaturePage from './TimestampSignature/TimestampSignaturePage';
import OfflineSignatureSupportPage from './OfflineSignatureSupport/OfflineSignatureSupportPage';
import QrCodeSignatureVerificationPage from './QrCodeSignatureVerification/QrCodeSignatureVerificationPage';
import FaceVerificationBeforeSigningPage from './FaceVerificationBeforeSigning/FaceVerificationBeforeSigningPage';
import OtpVerificationBeforeSigningPage from './OtpVerificationBeforeSigning/OtpVerificationBeforeSigningPage';
import BiometricSignaturePage from './BiometricSignature/BiometricSignaturePage';
import SignatureCertificateViewerPage from './SignatureCertificateViewer/SignatureCertificateViewerPage';
import SignatureComplianceCheckPage from './SignatureComplianceCheck/SignatureComplianceCheckPage';
import SignatureComparisonPage from './SignatureComparison/SignatureComparisonPage';
import SignatureEvidenceReportPage from './SignatureEvidenceReport/SignatureEvidenceReportPage';
import SignaturePermissionManagerPage from './SignaturePermissionManager/SignaturePermissionManagerPage';
import SigningStatusDashboardPage from './SigningStatusDashboard/SigningStatusDashboardPage';
import WitnessSignaturePage from './WitnessSignature/WitnessSignaturePage';
import SignatureLocationPage from './SignatureLocation/SignatureLocationPage';
import SignatureReasonPage from './SignatureReason/SignatureReasonPage';
import DemoTool1Page from './DemoTool1/DemoTool1Page';
import DemoTool2Page from './DemoTool2/DemoTool2Page';
import DemoTool3Page from './DemoTool3/DemoTool3Page';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'PDF_SIGNATURE',
  fullName: name
});

export const PDF_SIGNATURE_CARDS = [
  card('pdf-sign', 'PDF Sign', 'Add legal digital signatures and handwriting onto your PDF documents', FileSignature, 'text-pink-600', 'bg-pink-100'),
  card('digital-sign', 'Digital Sign', 'Cryptographically sign PDFs with PKI digital certificates and keys', Key, 'text-purple-600', 'bg-purple-100'),
  card('e-sign', 'e-Sign', 'Send and sign electronic signature documents seamlessly online', FileSignature, 'text-blue-600', 'bg-blue-100'),
  card('usb-token-signature', 'USB Token Signature', 'Sign PDFs using hardware USB cryptographic tokens and smart cards', Key, 'text-amber-600', 'bg-amber-100'),

  card('pki-signature', 'PKI Signature', 'Apply X.509 PKI certificate digital signatures with high assurance', ShieldCheck, 'text-indigo-600', 'bg-indigo-100'),
  card('cloud-signature', 'Cloud Signature', 'Sign documents remotely using secure cloud-hosted signing certificates', Cloud, 'text-cyan-600', 'bg-cyan-100'),
  card('remote-signature', 'Remote Signature', 'Authorize signature requests remotely via mobile and web interfaces', Send, 'text-emerald-600', 'bg-emerald-100'),
  card('reuse-signature', 'Reuse Signature', 'Save and reuse encrypted signature templates across multiple files', RefreshCw, 'text-rose-600', 'bg-rose-100'),

  card('multi-signer-workflow', 'Multi-signer Workflow', 'Coordinate multi-user signing sequences and document approval flows', Users, 'text-blue-600', 'bg-blue-100'),
  card('signing-order', 'Signing Order', 'Configure sequential or parallel signer routing rules for documents', Layers, 'text-purple-600', 'bg-purple-100'),
  card('certificate-import', 'Certificate Import', 'Import PFX, P12, and PEM digital signing certificates into system', Upload, 'text-emerald-600', 'bg-emerald-100'),
  card('certificate-export', 'Certificate Export', 'Export public key certificates for verification and trust exchange', Download, 'text-indigo-600', 'bg-indigo-100'),

  card('certificate-revocation-check', 'Certificate Revocation Check', 'Verify CRL and OCSP certificate status for active validity', CheckCircle, 'text-amber-600', 'bg-amber-100'),
  card('visible-signature-designer', 'Visible Signature Designer', 'Design custom signature stamps, logos, borders, and text details', Palette, 'text-pink-600', 'bg-pink-100'),
  card('invisible-digital-signature', 'Invisible Digital Signature', 'Embed hidden cryptographic proof without altering visual PDF pages', EyeOff, 'text-slate-600', 'bg-slate-100'),
  card('signature-field-creator', 'Signature Field Creator', 'Add interactive form fields for digital signature capture on PDF', PlusCircle, 'text-blue-600', 'bg-blue-100'),

  card('auto-signature-placement', 'Auto Signature Placement', 'Detect page anchors and automatically place signatures in predefined spots', Target, 'text-rose-600', 'bg-rose-100'),
  card('signature-appearance-templates', 'Signature Appearance Templates', 'Select from professional preset styles for visual signature display', Palette, 'text-purple-600', 'bg-purple-100'),
  card('initial-signature', 'Initial Signature', 'Apply quick initial stamps on every page of long legal contracts', Check, 'text-cyan-600', 'bg-cyan-100'),
  card('signature-validation', 'Signature Validation', 'Verify cryptographic signature integrity and document modification status', ShieldCheck, 'text-emerald-600', 'bg-emerald-100'),

  card('signature-history', 'Signature History', 'Review detailed chronological signature log and revision history', History, 'text-indigo-600', 'bg-indigo-100'),
  card('signature-audit-trail', 'Signature Audit Trail', 'Generate tamper-proof court-admissible audit reports with IP logs', FileText, 'text-rose-600', 'bg-rose-100'),
  card('signature-reminder', 'Signature Reminder', 'Send automated notification reminders to pending document signers', Bell, 'text-amber-600', 'bg-amber-100'),
  card('signature-expiration', 'Signature Expiration', 'Set expiration deadlines on signature requests for security compliance', Clock, 'text-rose-600', 'bg-rose-100'),

  card('reject-signature-request', 'Reject Signature Request', 'Allow signers to decline signature requests with custom reason notes', XCircle, 'text-slate-600', 'bg-slate-100'),
  card('delegated-signing', 'Delegated Signing', 'Delegate signature authority to designated proxy signers securely', Users, 'text-blue-600', 'bg-blue-100'),
  card('bulk-signature', 'Bulk Signature', 'Batch sign multiple PDF files simultaneously using a single passkey', Layers, 'text-purple-600', 'bg-purple-100'),
  card('batch-signature-validation', 'Batch Signature Validation', 'Validate digital signatures across large folders of PDF documents', CheckCircle, 'text-emerald-600', 'bg-emerald-100'),

  card('signature-lock-document', 'Signature Lock Document', 'Lock document editing and field modifications after final signature', Lock, 'text-amber-600', 'bg-amber-100'),
  card('long-term-signature-validation-ltv', 'Long-Term Signature Validation (LTV)', 'Embed LTV archival validation data (PAdES) for decade-long proof', Shield, 'text-indigo-600', 'bg-indigo-100'),
  card('timestamp-signature', 'Timestamp Signature', 'Apply RFC 3161 compliant official time stamps to document signatures', Clock, 'text-pink-600', 'bg-pink-100'),
  card('offline-signature-support', 'Offline Signature Support', 'Prepare and sign PDF files offline without active internet connection', Download, 'text-cyan-600', 'bg-cyan-100'),

  card('qr-code-signature-verification', 'QR Code Signature Verification', 'Embed scannable QR codes for instant mobile signature verification', QrCode, 'text-rose-600', 'bg-rose-100'),
  card('face-verification-before-signing', 'Face Verification Before Signing', 'Require facial recognition identity check before applying signature', Eye, 'text-purple-600', 'bg-purple-100'),
  card('otp-verification-before-signing', 'OTP Verification Before Signing', 'Send SMS / Email OTP code to verify signer identity prior to sign', Smartphone, 'text-blue-600', 'bg-blue-100'),
  card('biometric-signature', 'Biometric Signature', 'Capture biometric pressure and speed data with digital pen strokes', Fingerprint, 'text-indigo-600', 'bg-indigo-100'),

  card('signature-certificate-viewer', 'Signature Certificate Viewer', 'Inspect issuer details, serial numbers, and CA chains of signatures', Award, 'text-emerald-600', 'bg-emerald-100'),
  card('signature-compliance-check', 'Signature Compliance Check', 'Ensure signatures meet eIDAS, ESIGN Act, and FDA 21 CFR Part 11 rules', ShieldCheck, 'text-amber-600', 'bg-amber-100'),
  card('signature-comparison', 'Signature Comparison', 'Compare signature stroke geometry against enrolled baseline samples', Search, 'text-pink-600', 'bg-pink-100'),
  card('signature-evidence-report', 'Signature Evidence Report', 'Export full legal evidence summary package for forensic verification', FileText, 'text-purple-600', 'bg-purple-100'),

  card('signature-permission-manager', 'Signature Permission Manager', 'Control document permissions granted or restricted after signing', Lock, 'text-cyan-600', 'bg-cyan-100'),
  card('signing-status-dashboard', 'Signing Status Dashboard', 'Track real-time progress of sent, signed, and pending documents', Layers, 'text-blue-600', 'bg-blue-100'),
  card('witness-signature', 'Witness Signature', 'Include third-party witness countersignatures for legal deeds', Users, 'text-emerald-600', 'bg-emerald-100'),
  card('signature-location', 'Signature Location', 'Tag geo-location coordinates and signing address metadata to signature', MapPin, 'text-rose-600', 'bg-rose-100'),
  card('signature-reason', 'Signature Reason', 'Attach predefined signature purpose codes (Approved, Reviewed, Authored)', MessageSquare, 'text-indigo-600', 'bg-indigo-100'),

  card('demo-tool-1', 'Demo Tool 1', 'Demo PDF signature tool card for preview and testing', Layers, 'text-purple-600', 'bg-purple-100'),
  card('demo-tool-2', 'Demo Tool 2', 'Demo PDF signature tool card for preview and testing', Zap, 'text-pink-600', 'bg-pink-100'),
  card('demo-tool-3', 'Demo Tool 3', 'Demo PDF signature tool card for preview and testing', ShieldCheck, 'text-blue-600', 'bg-blue-100'),
];

export default function PdfSignaturePage({ onBack }) {
  const [activeSubPage, setActiveSubPage] = useState(null);

  const handleSubPageBack = () => setActiveSubPage(null);

  if (activeSubPage === 'pdf-sign') return <PdfSignPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'digital-sign') return <DigitalSignPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'e-sign') return <ESignPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'usb-token-signature') return <UsbTokenSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pki-signature') return <PkiSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'cloud-signature') return <CloudSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'remote-signature') return <RemoteSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'reuse-signature') return <ReuseSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'multi-signer-workflow') return <MultiSignerWorkflowPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signing-order') return <SigningOrderPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'certificate-import') return <CertificateImportPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'certificate-export') return <CertificateExportPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'certificate-revocation-check') return <CertificateRevocationCheckPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'visible-signature-designer') return <VisibleSignatureDesignerPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'invisible-digital-signature') return <InvisibleDigitalSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-field-creator') return <SignatureFieldCreatorPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'auto-signature-placement') return <AutoSignaturePlacementPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-appearance-templates') return <SignatureAppearanceTemplatesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'initial-signature') return <InitialSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-validation') return <SignatureValidationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-history') return <SignatureHistoryPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-audit-trail') return <SignatureAuditTrailPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-reminder') return <SignatureReminderPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-expiration') return <SignatureExpirationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'reject-signature-request') return <RejectSignatureRequestPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'delegated-signing') return <DelegatedSigningPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'bulk-signature') return <BulkSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'batch-signature-validation') return <BatchSignatureValidationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-lock-document') return <SignatureLockDocumentPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'long-term-signature-validation-ltv') return <LongTermSignatureValidationLtvPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'timestamp-signature') return <TimestampSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'offline-signature-support') return <OfflineSignatureSupportPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'qr-code-signature-verification') return <QrCodeSignatureVerificationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'face-verification-before-signing') return <FaceVerificationBeforeSigningPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'otp-verification-before-signing') return <OtpVerificationBeforeSigningPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'biometric-signature') return <BiometricSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-certificate-viewer') return <SignatureCertificateViewerPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-compliance-check') return <SignatureComplianceCheckPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-comparison') return <SignatureComparisonPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-evidence-report') return <SignatureEvidenceReportPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-permission-manager') return <SignaturePermissionManagerPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signing-status-dashboard') return <SigningStatusDashboardPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'witness-signature') return <WitnessSignaturePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-location') return <SignatureLocationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'signature-reason') return <SignatureReasonPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'demo-tool-1') return <DemoTool1Page onBack={handleSubPageBack} />;
  if (activeSubPage === 'demo-tool-2') return <DemoTool2Page onBack={handleSubPageBack} />;
  if (activeSubPage === 'demo-tool-3') return <DemoTool3Page onBack={handleSubPageBack} />;

  return (
    <section aria-labelledby="pdf-signature-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="pdf-signature-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            PDF Signature
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Online Sign PDF Document with legally binding digital & e-signatures.
          </p>
        </div>
      </header>

      {/* 45 PDF Signature Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {PDF_SIGNATURE_CARDS.map((tool, index) => (
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
