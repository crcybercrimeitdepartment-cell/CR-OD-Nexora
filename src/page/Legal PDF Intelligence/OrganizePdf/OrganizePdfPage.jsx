/**
 * @file src/page/LegalPdfIntelligence/OrganizePdf/OrganizePdfPage.jsx
 * @description Main Organize PDF container rendering 32 tools cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  Merge,
  Split,
  Layers,
  Trash2,
  FileCheck,
  Scan,
  Minimize2,
  Wrench,
  Search,
  Edit3,
  RotateCw,
  Hash,
  ShieldCheck,
  Crop,
  Grid,
  Video,
  Palette,
  Globe,
  Zap,
  Image,
  FileText,
  Maximize2,
  Edit,
  Download,
  Copy,
  PlusCircle,
  RefreshCw,
  Bookmark,
  Tag,
  Maximize
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import MergePdfPage from './MergePdf/MergePdfPage';
import SplitPdfPage from './SplitPdf/SplitPdfPage';
import OrganizePdfPageTool from './OrganizePdf/OrganizePdfPage';
import RemovePdfPagesPage from './RemovePdfPages/RemovePdfPagesPage';
import ExtractPdfPagesPage from './ExtractPdfPages/ExtractPdfPagesPage';
import ScanToPdfPage from './ScanToPdf/ScanToPdfPage';
import CompressPdfPage from './CompressPdf/CompressPdfPage';
import RepairPdfPage from './RepairPdf/RepairPdfPage';
import OcrPdfPage from './OcrPdf/OcrPdfPage';
import EditPdfPage from './EditPdf/EditPdfPage';
import RotatePdfPage from './RotatePdf/RotatePdfPage';
import AddPageNumbersPage from './AddPageNumbers/AddPageNumbersPage';
import AddWatermarkPage from './AddWatermark/AddWatermarkPage';
import CropPdfPage from './CropPdf/CropPdfPage';
import FlattenPdfPage from './FlattenPdf/FlattenPdfPage';
import MergePdfPagesIntoOnePagePage from './MergePdfPagesIntoOnePage/MergePdfPagesIntoOnePagePage';
import RichMediaSupportEmbedAudioVideoPage from './RichMediaSupportEmbedAudioVideo/RichMediaSupportEmbedAudioVideoPage';
import BackgroundManagementPage from './BackgroundManagement/BackgroundManagementPage';
import WebOptimizationPage from './WebOptimization/WebOptimizationPage';
import PdfLinearizationFastWebViewPage from './PdfLinearizationFastWebView/PdfLinearizationFastWebViewPage';
import PdfToImageCollectionPage from './PdfToImageCollection/PdfToImageCollectionPage';
import PdfToIndividualPagesPage from './PdfToIndividualPages/PdfToIndividualPagesPage';
import PdfToSingleLongImagePage from './PdfToSingleLongImage/PdfToSingleLongImagePage';
import PdfToEditablePdfPage from './PdfToEditablePdf/PdfToEditablePdfPage';
import PdfToSearchablePdfOcrPage from './PdfToSearchablePdfOcr/PdfToSearchablePdfOcrPage';
import DownloadOptimizedPdfPage from './DownloadOptimizedPdf/DownloadOptimizedPdfPage';
import DuplicatePdfPagesPage from './DuplicatePdfPages/DuplicatePdfPagesPage';
import InsertBlankPagePage from './InsertBlankPage/InsertBlankPagePage';
import ReplacePdfPagesPage from './ReplacePdfPages/ReplacePdfPagesPage';
import ReorderBookmarksAfterPageChangesPage from './ReorderBookmarksAfterPageChanges/ReorderBookmarksAfterPageChangesPage';
import PageLabelManagementPage from './PageLabelManagement/PageLabelManagementPage';
import PageSizeNormalizationPage from './PageSizeNormalization/PageSizeNormalizationPage';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'ORGANIZE_PDF',
  fullName: name
});

export const ORGANIZE_PDF_CARDS = [
  card('merge-pdf', 'Merge PDF', 'Combine multiple PDF documents into a single organized file seamlessly', Merge, 'text-rose-600', 'bg-rose-100'),
  card('split-pdf', 'Split PDF', 'Separate pages or extract custom page ranges into independent PDFs', Split, 'text-blue-600', 'bg-blue-100'),
  card('organize-pdf', 'Organize PDF', 'Rearrange, sort, and manage page sequences with simple drag and drop', Layers, 'text-purple-600', 'bg-purple-100'),
  card('remove-pdf-pages', 'Remove PDF Pages', 'Delete unnecessary or blank pages from your PDF documents instantly', Trash2, 'text-rose-600', 'bg-rose-100'),

  card('extract-pdf-pages', 'Extract PDF Pages', 'Extract specific pages and save them as standalone PDF files', FileCheck, 'text-amber-600', 'bg-amber-100'),
  card('scan-to-pdf', 'Scan to PDF', 'Convert paper documents and photos directly into clean digital PDFs', Scan, 'text-emerald-600', 'bg-emerald-100'),
  card('compress-pdf', 'Compress PDF', 'Reduce PDF filesize while preserving high visual document quality', Minimize2, 'text-blue-600', 'bg-blue-100'),
  card('repair-pdf', 'Repair PDF', 'Fix corrupted PDF files and restore lost document content efficiently', Wrench, 'text-amber-600', 'bg-amber-100'),

  card('ocr-pdf', 'OCR PDF', 'Recognize text inside scanned PDFs and make documents searchable', Search, 'text-purple-600', 'bg-purple-100'),
  card('edit-pdf', 'Edit PDF', 'Add text, drawings, shapes, and images directly onto PDF pages', Edit3, 'text-pink-600', 'bg-pink-100'),
  card('rotate-pdf', 'Rotate PDF', 'Rotate individual pages or entire documents clockwise or counter-clockwise', RotateCw, 'text-cyan-600', 'bg-cyan-100'),
  card('add-page-numbers', 'Add Page Numbers', 'Insert header or footer page numbers with custom formats and positions', Hash, 'text-slate-600', 'bg-slate-100'),

  card('add-watermark', 'Add Watermark', 'Apply text or image watermarks for copyright and security protection', ShieldCheck, 'text-pink-600', 'bg-pink-100'),
  card('crop-pdf', 'Crop PDF', 'Trim page margins and crop selected document areas with precision', Crop, 'text-indigo-600', 'bg-indigo-100'),
  card('flatten-pdf', 'Flatten PDF', 'Merge annotations, form fields, and layers into an uneditable layer', Layers, 'text-orange-600', 'bg-orange-100'),
  card('merge-pdf-pages-into-one-page', 'Merge PDF Pages into One Page', 'Layout N-up multiple PDF pages onto a single consolidated page sheet', Grid, 'text-emerald-600', 'bg-emerald-100'),

  card('rich-media-support-embed-audio-video', 'Rich Media Support (Embed Audio/Video)', 'Embed interactive audio tracks, video clips, and media elements in PDF', Video, 'text-blue-600', 'bg-blue-100'),
  card('background-management', 'Background Management', 'Customize, swap, or clear background colors and images across pages', Palette, 'text-pink-600', 'bg-pink-100'),
  card('web-optimization', 'Web Optimization', 'Optimize PDF internal structures for fast browser rendering and web viewing', Globe, 'text-emerald-600', 'bg-emerald-100'),
  card('pdf-linearization-fast-web-view', 'PDF Linearization (Fast Web View)', 'Enable progressive streaming page loads for seamless online viewing', Zap, 'text-purple-600', 'bg-purple-100'),

  card('pdf-to-image-collection', 'PDF to Image Collection', 'Convert every PDF page into high-quality JPG or PNG image files archive', Image, 'text-amber-600', 'bg-amber-100'),
  card('pdf-to-individual-pages', 'PDF to Individual Pages', 'Split your entire PDF document into separate single-page PDF files', FileText, 'text-blue-600', 'bg-blue-100'),
  card('pdf-to-single-long-image', 'PDF to Single Long Image', 'Stitch multi-page PDF into one continuous vertical high-res image', Maximize2, 'text-pink-600', 'bg-pink-100'),
  card('pdf-to-editable-pdf', 'PDF to Editable PDF', 'Transform read-only PDFs into fully editable document layouts', Edit, 'text-purple-600', 'bg-purple-100'),

  card('pdf-to-searchable-pdf-ocr', 'PDF to Searchable PDF (OCR)', 'Make text inside image PDFs searchable and selectable via OCR engines', Search, 'text-cyan-600', 'bg-cyan-100'),
  card('download-optimized-pdf', 'Download Optimized PDF', 'Generate fast-loading, highly compressed PDF ready for instant download', Download, 'text-emerald-600', 'bg-emerald-100'),
  card('duplicate-pdf-pages', 'Duplicate PDF Pages', 'Clone selected PDF pages and insert duplicate copies anywhere in file', Copy, 'text-indigo-600', 'bg-indigo-100'),
  card('insert-blank-page', 'Insert Blank Page', 'Insert new blank pages at any position within your PDF document', PlusCircle, 'text-blue-600', 'bg-blue-100'),

  card('replace-pdf-pages', 'Replace PDF Pages', 'Swap specific PDF pages with replacement pages from another file', RefreshCw, 'text-rose-600', 'bg-rose-100'),
  card('reorder-bookmarks-after-page-changes', 'Reorder Bookmarks After Page Changes', 'Automatically synchronize and re-index PDF bookmarks and navigation tree', Bookmark, 'text-purple-600', 'bg-purple-100'),
  card('page-label-management', 'Page Label Management', 'Configure custom page numbering styles like Roman numerals and prefixes', Tag, 'text-cyan-600', 'bg-cyan-100'),
  card('page-size-normalization', 'Page Size Normalization', 'Standardize non-uniform PDF page dimensions into consistent standard sizes', Maximize, 'text-amber-600', 'bg-amber-100'),
];

export default function OrganizePdfPage({ onBack }) {
  const [activeSubPage, setActiveSubPage] = useState(null);

  const handleSubPageBack = () => setActiveSubPage(null);

  if (activeSubPage === 'merge-pdf') return <MergePdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'split-pdf') return <SplitPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'organize-pdf') return <OrganizePdfPageTool onBack={handleSubPageBack} />;
  if (activeSubPage === 'remove-pdf-pages') return <RemovePdfPagesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'extract-pdf-pages') return <ExtractPdfPagesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'scan-to-pdf') return <ScanToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'compress-pdf') return <CompressPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'repair-pdf') return <RepairPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ocr-pdf') return <OcrPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'edit-pdf') return <EditPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'rotate-pdf') return <RotatePdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'add-page-numbers') return <AddPageNumbersPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'add-watermark') return <AddWatermarkPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'crop-pdf') return <CropPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'flatten-pdf') return <FlattenPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'merge-pdf-pages-into-one-page') return <MergePdfPagesIntoOnePagePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'rich-media-support-embed-audio-video') return <RichMediaSupportEmbedAudioVideoPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'background-management') return <BackgroundManagementPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'web-optimization') return <WebOptimizationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-linearization-fast-web-view') return <PdfLinearizationFastWebViewPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-image-collection') return <PdfToImageCollectionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-individual-pages') return <PdfToIndividualPagesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-single-long-image') return <PdfToSingleLongImagePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-editable-pdf') return <PdfToEditablePdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-searchable-pdf-ocr') return <PdfToSearchablePdfOcrPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'download-optimized-pdf') return <DownloadOptimizedPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'duplicate-pdf-pages') return <DuplicatePdfPagesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'insert-blank-page') return <InsertBlankPagePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'replace-pdf-pages') return <ReplacePdfPagesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'reorder-bookmarks-after-page-changes') return <ReorderBookmarksAfterPageChangesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'page-label-management') return <PageLabelManagementPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'page-size-normalization') return <PageSizeNormalizationPage onBack={handleSubPageBack} />;

  return (
    <section aria-labelledby="organize-pdf-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="organize-pdf-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Organize PDF
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Rearrange, delete, rotate, and manage pages within your PDF documents effortlessly.
          </p>
        </div>
      </header>

      {/* 32 Organize PDF Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {ORGANIZE_PDF_CARDS.map((tool, index) => (
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
