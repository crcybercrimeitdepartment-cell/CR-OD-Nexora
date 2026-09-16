/**
 * @file src/page/LegalPdfIntelligence/DocumentManagement/DocumentManagementPage.jsx
 * @description Main Document Management container rendering 40 tools cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  Folder,
  Save,
  Upload,
  Download,
  Edit3,
  RefreshCw,
  Printer,
  Minimize2,
  ShieldCheck,
  Lock,
  Unlock,
  Search,
  Sliders,
  Bookmark,
  BookOpen,
  Link,
  Link2,
  ExternalLink,
  Target,
  Compass,
  Star,
  Edit,
  Eye,
  Info,
  Database,
  Paperclip,
  PlusCircle,
  Trash2,
  Layout,
  Book,
  Grid,
  RotateCcw,
  HardDrive,
  CheckCircle,
  Archive
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import FileManagerPage from './FileManager/FileManagerPage';
import SaveAsPage from './SaveAs/SaveAsPage';
import BatchImportPage from './BatchImport/BatchImportPage';
import BatchExportPage from './BatchExport/BatchExportPage';
import BatchRenamePage from './BatchRename/BatchRenamePage';
import BatchConversionPage from './BatchConversion/BatchConversionPage';
import BatchPrintingPage from './BatchPrinting/BatchPrintingPage';
import BatchCompressionPage from './BatchCompression/BatchCompressionPage';
import BatchWatermarkPage from './BatchWatermark/BatchWatermarkPage';
import BatchEncryptionPage from './BatchEncryption/BatchEncryptionPage';
import BatchDecryptionPage from './BatchDecryption/BatchDecryptionPage';
import FindAndReplacePage from './FindAndReplace/FindAndReplacePage';
import AdvancedSearchPage from './AdvancedSearch/AdvancedSearchPage';
import BookmarkManagementPage from './BookmarkManagement/BookmarkManagementPage';
import TableOfContentsPage from './TableOfContents/TableOfContentsPage';
import HyperlinkSupportPage from './HyperlinkSupport/HyperlinkSupportPage';
import InternalLinksPage from './InternalLinks/InternalLinksPage';
import ExternalLinksPage from './ExternalLinks/ExternalLinksPage';
import NamedDestinationsPage from './NamedDestinations/NamedDestinationsPage';
import QuickNavigationPage from './QuickNavigation/QuickNavigationPage';
import FavoritesPage from './Favorites/FavoritesPage';
import EditMetadataPage from './EditMetadata/EditMetadataPage';
import ViewMetadataPage from './ViewMetadata/ViewMetadataPage';
import DocumentPropertiesPage from './DocumentProperties/DocumentPropertiesPage';
import CustomPropertiesPage from './CustomProperties/CustomPropertiesPage';
import XmpMetadataSupportPage from './XmpMetadataSupport/XmpMetadataSupportPage';
import FileAttachmentsPage from './FileAttachments/FileAttachmentsPage';
import AddAttachmentsPage from './AddAttachments/AddAttachmentsPage';
import ExtractAttachmentsPage from './ExtractAttachments/ExtractAttachmentsPage';
import RemoveAttachmentsPage from './RemoveAttachments/RemoveAttachmentsPage';
import DocumentTemplatesPage from './DocumentTemplates/DocumentTemplatesPage';
import TemplateLibraryPage from './TemplateLibrary/TemplateLibraryPage';
import SilentPrintingPage from './SilentPrinting/SilentPrintingPage';
import PrintBookletPage from './PrintBooklet/PrintBookletPage';
import PrintMultiplePagesPerSheetPage from './PrintMultiplePagesPerSheet/PrintMultiplePagesPerSheetPage';
import AutoRecoveryPage from './AutoRecovery/AutoRecoveryPage';
import BackupRecoveryPage from './BackupRecovery/BackupRecoveryPage';
import PdfValidationPage from './PdfValidation/PdfValidationPage';
import DigitalSignatureValidationPage from './DigitalSignatureValidation/DigitalSignatureValidationPage';
import DocumentArchivingPage from './DocumentArchiving/DocumentArchivingPage';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'DOCUMENT_MANAGEMENT',
  fullName: name
});

export const DOCUMENT_MANAGEMENT_CARDS = [
  card('file-manager', 'File Manager', 'Comprehensive file organization, folder structures, and document browsing.', Folder, 'text-rose-600', 'bg-rose-100'),
  card('save-as', 'Save As', 'Export documents in custom file formats, naming schemes, and destination paths.', Save, 'text-sky-600', 'bg-sky-100'),
  card('batch-import', 'Batch Import', 'Import multiple PDF files simultaneously into your workspace in bulk.', Upload, 'text-purple-600', 'bg-purple-100'),
  card('batch-export', 'Batch Export', 'Bulk export multiple documents into desired file formats at once.', Download, 'text-rose-600', 'bg-rose-100'),

  card('batch-rename', 'Batch Rename', 'Rename multiple PDF files at once using custom rule patterns and counters.', Edit3, 'text-amber-600', 'bg-amber-100'),
  card('batch-conversion', 'Batch Conversion', 'Convert multiple files to and from PDF format in single bulk operations.', RefreshCw, 'text-emerald-600', 'bg-emerald-100'),
  card('batch-printing', 'Batch Printing', 'Send multiple PDF documents directly to your printer queue in one single action.', Printer, 'text-blue-600', 'bg-blue-100'),
  card('batch-compression', 'Batch Compression', 'Reduce file size of multiple PDF documents simultaneously without losing quality.', Minimize2, 'text-amber-600', 'bg-amber-100'),

  card('batch-watermark', 'Batch Watermark', 'Apply custom text, logo, or image watermarks across multiple PDFs in bulk.', ShieldCheck, 'text-purple-600', 'bg-purple-100'),
  card('batch-encryption', 'Batch Encryption', 'Secure multiple PDF files with strong password protection and permissions.', Lock, 'text-pink-600', 'bg-pink-100'),
  card('batch-decryption', 'Batch Decryption', 'Remove passwords and security restrictions from multiple PDFs at once.', Unlock, 'text-rose-600', 'bg-rose-100'),
  card('find-and-replace', 'Find & Replace', 'Search and replace text strings seamlessly across entire document pages.', Search, 'text-sky-600', 'bg-sky-100'),

  card('advanced-search', 'Advanced Search', 'Deep search with custom filters, regex patterns, and metadata matching.', Sliders, 'text-purple-600', 'bg-purple-100'),
  card('bookmark-management', 'Bookmark Management', 'Create, organize, edit, and navigate structured PDF document outline bookmarks.', Bookmark, 'text-amber-600', 'bg-amber-100'),
  card('table-of-contents', 'Table of Contents', 'Auto-generate and customize interactive Table of Contents for easy navigation.', BookOpen, 'text-orange-600', 'bg-orange-100'),
  card('hyperlink-support', 'Hyperlink Support', 'Add, edit, test, and manage active web URL hyperlinks within pages.', Link, 'text-emerald-600', 'bg-emerald-100'),

  card('internal-links', 'Internal Links', 'Link specific text or regions to other pages or chapters inside the document.', Link2, 'text-sky-600', 'bg-sky-100'),
  card('external-links', 'External Links', 'Create clickable links to external files, websites, or network locations.', ExternalLink, 'text-amber-600', 'bg-amber-100'),
  card('named-destinations', 'Named Destinations', 'Define target anchors for precise cross-document and intra-document deep linking.', Target, 'text-purple-600', 'bg-purple-100'),
  card('quick-navigation', 'Quick Navigation', 'Jump instantly to specific pages, chapters, or recently visited locations.', Compass, 'text-pink-600', 'bg-pink-100'),

  card('favorites', 'Favorites', 'Bookmark important documents and frequently visited pages for 1-click access.', Star, 'text-amber-600', 'bg-amber-100'),
  card('edit-metadata', 'Edit Metadata', 'Modify document title, author, subject, keywords, and creation properties.', Edit, 'text-blue-600', 'bg-blue-100'),
  card('view-metadata', 'View Metadata', 'Inspect hidden document metadata, author details, software version, and logs.', Eye, 'text-purple-600', 'bg-purple-100'),
  card('document-properties', 'Document Properties', 'View detailed file dimensions, font lists, security settings, and specs.', Info, 'text-red-600', 'bg-red-100'),

  card('custom-properties', 'Custom Properties', 'Add custom key-value metadata fields for specialized tracking and indexing.', Sliders, 'text-amber-600', 'bg-amber-100'),
  card('xmp-metadata-support', 'XMP Metadata Support', 'Embed and manage Adobe XMP standardized extensible metadata streams.', Database, 'text-emerald-600', 'bg-emerald-100'),
  card('file-attachments', 'File Attachments', 'View and manage embedded file attachments stored inside the PDF container.', Paperclip, 'text-sky-600', 'bg-sky-100'),
  card('add-attachments', 'Add Attachments', 'Embed additional files, images, or spreadsheets directly into the PDF container.', PlusCircle, 'text-amber-600', 'bg-amber-100'),

  card('extract-attachments', 'Extract Attachments', 'Save embedded PDF attachments out onto your local computer disk.', Download, 'text-purple-600', 'bg-purple-100'),
  card('remove-attachments', 'Remove Attachments', 'Delete unwanted embedded files to clean up document container size.', Trash2, 'text-pink-600', 'bg-pink-100'),
  card('document-templates', 'Document Templates', 'Create reusable document layouts and standardized form structures.', Layout, 'text-orange-600', 'bg-orange-100'),
  card('template-library', 'Template Library', 'Browse pre-made professional templates for contracts, invoices, and reports.', BookOpen, 'text-blue-600', 'bg-blue-100'),

  card('silent-printing', 'Silent Printing', 'Background automated printing without pop-up print dialog prompts.', Printer, 'text-purple-600', 'bg-purple-100'),
  card('print-booklet', 'Print Booklet', 'Print pages in double-sided booklet, brochure, and magazine folding layouts.', Book, 'text-pink-600', 'bg-pink-100'),
  card('print-multiple-pages-per-sheet', 'Print Multiple Pages per Sheet', 'N-up printing layout to fit 2, 4, or 8 pages onto a single sheet of paper.', Grid, 'text-amber-600', 'bg-amber-100'),
  card('auto-recovery', 'Auto Recovery', 'Automatically restore unsaved changes after unexpected app or system shutdowns.', RotateCcw, 'text-emerald-600', 'bg-emerald-100'),

  card('backup-recovery', 'Backup Recovery', 'Create and restore automatic document backup versions safely and reliably.', HardDrive, 'text-sky-600', 'bg-sky-100'),
  card('pdf-validation', 'PDF Validation', 'Validate PDFs against ISO standards like PDF/A, PDF/E, and PDF/X.', CheckCircle, 'text-amber-600', 'bg-amber-100'),
  card('digital-signature-validation', 'Digital Signature Validation', 'Verify authenticity, integrity, and certificate validity of signed PDFs.', ShieldCheck, 'text-purple-600', 'bg-purple-100'),
  card('document-archiving', 'Document Archiving', 'Convert and optimize documents for long-term ISO PDF/A compliance.', Archive, 'text-pink-600', 'bg-pink-100')
];

export default function DocumentManagementPage({ onBack }) {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case 'file-manager':
        return <FileManagerPage onBack={() => setActiveTool(null)} />;
      case 'save-as':
        return <SaveAsPage onBack={() => setActiveTool(null)} />;
      case 'batch-import':
        return <BatchImportPage onBack={() => setActiveTool(null)} />;
      case 'batch-export':
        return <BatchExportPage onBack={() => setActiveTool(null)} />;
      case 'batch-rename':
        return <BatchRenamePage onBack={() => setActiveTool(null)} />;
      case 'batch-conversion':
        return <BatchConversionPage onBack={() => setActiveTool(null)} />;
      case 'batch-printing':
        return <BatchPrintingPage onBack={() => setActiveTool(null)} />;
      case 'batch-compression':
        return <BatchCompressionPage onBack={() => setActiveTool(null)} />;
      case 'batch-watermark':
        return <BatchWatermarkPage onBack={() => setActiveTool(null)} />;
      case 'batch-encryption':
        return <BatchEncryptionPage onBack={() => setActiveTool(null)} />;
      case 'batch-decryption':
        return <BatchDecryptionPage onBack={() => setActiveTool(null)} />;
      case 'find-and-replace':
        return <FindAndReplacePage onBack={() => setActiveTool(null)} />;
      case 'advanced-search':
        return <AdvancedSearchPage onBack={() => setActiveTool(null)} />;
      case 'bookmark-management':
        return <BookmarkManagementPage onBack={() => setActiveTool(null)} />;
      case 'table-of-contents':
        return <TableOfContentsPage onBack={() => setActiveTool(null)} />;
      case 'hyperlink-support':
        return <HyperlinkSupportPage onBack={() => setActiveTool(null)} />;
      case 'internal-links':
        return <InternalLinksPage onBack={() => setActiveTool(null)} />;
      case 'external-links':
        return <ExternalLinksPage onBack={() => setActiveTool(null)} />;
      case 'named-destinations':
        return <NamedDestinationsPage onBack={() => setActiveTool(null)} />;
      case 'quick-navigation':
        return <QuickNavigationPage onBack={() => setActiveTool(null)} />;
      case 'favorites':
        return <FavoritesPage onBack={() => setActiveTool(null)} />;
      case 'edit-metadata':
        return <EditMetadataPage onBack={() => setActiveTool(null)} />;
      case 'view-metadata':
        return <ViewMetadataPage onBack={() => setActiveTool(null)} />;
      case 'document-properties':
        return <DocumentPropertiesPage onBack={() => setActiveTool(null)} />;
      case 'custom-properties':
        return <CustomPropertiesPage onBack={() => setActiveTool(null)} />;
      case 'xmp-metadata-support':
        return <XmpMetadataSupportPage onBack={() => setActiveTool(null)} />;
      case 'file-attachments':
        return <FileAttachmentsPage onBack={() => setActiveTool(null)} />;
      case 'add-attachments':
        return <AddAttachmentsPage onBack={() => setActiveTool(null)} />;
      case 'extract-attachments':
        return <ExtractAttachmentsPage onBack={() => setActiveTool(null)} />;
      case 'remove-attachments':
        return <RemoveAttachmentsPage onBack={() => setActiveTool(null)} />;
      case 'document-templates':
        return <DocumentTemplatesPage onBack={() => setActiveTool(null)} />;
      case 'template-library':
        return <TemplateLibraryPage onBack={() => setActiveTool(null)} />;
      case 'silent-printing':
        return <SilentPrintingPage onBack={() => setActiveTool(null)} />;
      case 'print-booklet':
        return <PrintBookletPage onBack={() => setActiveTool(null)} />;
      case 'print-multiple-pages-per-sheet':
        return <PrintMultiplePagesPerSheetPage onBack={() => setActiveTool(null)} />;
      case 'auto-recovery':
        return <AutoRecoveryPage onBack={() => setActiveTool(null)} />;
      case 'backup-recovery':
        return <BackupRecoveryPage onBack={() => setActiveTool(null)} />;
      case 'pdf-validation':
        return <PdfValidationPage onBack={() => setActiveTool(null)} />;
      case 'digital-signature-validation':
        return <DigitalSignatureValidationPage onBack={() => setActiveTool(null)} />;
      case 'document-archiving':
        return <DocumentArchivingPage onBack={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  if (activeTool) {
    return renderTool();
  }

  return (
    <section aria-labelledby="document-management-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="document-management-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Document Management
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Best PDF Management to catalog, index, tag, and organize large PDF libraries.
          </p>
        </div>
      </header>

      {/* 40 Document Management Tool Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {DOCUMENT_MANAGEMENT_CARDS.map((tool, index) => (
          <ToolCard
            key={`${tool.id}-${index}`}
            tool={tool}
            index={index}
            onClick={() => setActiveTool(tool.id)}
            disableCssAnimation={true}
          />
        ))}
      </div>
    </section>
  );
}
