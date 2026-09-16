/**
 * @file src/page/LegalPdfIntelligence/ImageProcessing/ImageProcessingPage.jsx
 * @description Main Image Processing & OCR container rendering 32 tools cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  RefreshCw,
  Crop,
  Maximize2,
  RotateCw,
  Sparkles,
  Zap,
  Sun,
  Palette,
  Wand2,
  Sliders,
  Activity,
  FileText,
  Minimize2,
  TrendingUp,
  Scissors,
  Layers,
  ShieldCheck,
  Image,
  Scan,
  Square,
  Filter,
  Move,
  Camera,
  Eye,
  Edit3,
  Trash2,
  Grid
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import ImageEditorPage from './ImageEditor/ImageEditorPage';
import FlipImagesPage from './FlipImages/FlipImagesPage';
import CropImagesPage from './CropImages/CropImagesPage';
import ResizeImagesPage from './ResizeImages/ResizeImagesPage';
import RotateImagesPage from './RotateImages/RotateImagesPage';
import EnhanceImagesPage from './EnhanceImages/EnhanceImagesPage';
import SharpenImagesPage from './SharpenImages/SharpenImagesPage';
import AdjustBrightnessPage from './AdjustBrightness/AdjustBrightnessPage';
import AdjustContrastPage from './AdjustContrast/AdjustContrastPage';
import AdjustSaturationPage from './AdjustSaturation/AdjustSaturationPage';
import AutoColorCorrectionPage from './AutoColorCorrection/AutoColorCorrectionPage';
import WhiteBalanceAdjustmentPage from './WhiteBalanceAdjustment/WhiteBalanceAdjustmentPage';
import GammaCorrectionPage from './GammaCorrection/GammaCorrectionPage';
import ConvertImageFormatPage from './ConvertImageFormat/ConvertImageFormatPage';
import ImageCompressionPage from './ImageCompression/ImageCompressionPage';
import ImageUpscalingAiSuperResolutionPage from './ImageUpscalingAiSuperResolution/ImageUpscalingAiSuperResolutionPage';
import RemoveBackgroundPage from './RemoveBackground/RemoveBackgroundPage';
import BackgroundReplacementPage from './BackgroundReplacement/BackgroundReplacementPage';
import WatermarkImagesPage from './WatermarkImages/WatermarkImagesPage';
import ReplaceImagesPage from './ReplaceImages/ReplaceImagesPage';
import ScanDocumentsPage from './ScanDocuments/ScanDocumentsPage';
import MultiPageScanningPage from './MultiPageScanning/MultiPageScanningPage';
import AutoDetectPageBordersPage from './AutoDetectPageBorders/AutoDetectPageBordersPage';
import DeskewImagesPage from './DeskewImages/DeskewImagesPage';
import RemoveNoisePage from './RemoveNoise/RemoveNoisePage';
import PerspectiveCorrectionPage from './PerspectiveCorrection/PerspectiveCorrectionPage';
import LensDistortionCorrectionPage from './LensDistortionCorrection/LensDistortionCorrectionPage';
import DeblurImagesAiPage from './DeblurImagesAi/DeblurImagesAiPage';
import ImageDenoiseAiPage from './ImageDenoiseAi/ImageDenoiseAiPage';
import ExifMetadataEditorPage from './ExifMetadataEditor/ExifMetadataEditorPage';
import ExifMetadataRemoverPage from './ExifMetadataRemover/ExifMetadataRemoverPage';
import ImageResolutionDpiConverterPage from './ImageResolutionDpiConverter/ImageResolutionDpiConverterPage';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'IMAGE_PROCESSING',
  fullName: name
});

export const IMAGE_PROCESSING_CARDS = [
  card('image-editor', 'Image Editor', 'Comprehensive file organization, folder structures, and document browsing.', Edit, 'text-rose-600', 'bg-rose-100'),
  card('flip-images', 'Flip Images', 'Export documents in custom file formats, naming schemes, and destination paths.', RefreshCw, 'text-sky-600', 'bg-sky-100'),
  card('crop-images', 'Crop Images', 'Import multiple PDF files simultaneously into your workspace in bulk.', Crop, 'text-purple-600', 'bg-purple-100'),
  card('resize-images', 'Resize Images', 'Bulk export multiple documents into desired file formats at once.', Maximize2, 'text-rose-600', 'bg-rose-100'),

  card('rotate-images', 'Rotate Images', 'Batch rename multiple documents using flexible pattern templates and counters.', RotateCw, 'text-amber-600', 'bg-amber-100'),
  card('enhance-images', 'Enhance Images', 'Convert batches of documents to target formats with custom settings.', Sparkles, 'text-emerald-600', 'bg-emerald-100'),
  card('sharpen-images', 'Sharpen Images', 'Send multiple PDF documents directly to your printer queue in one single action.', Zap, 'text-blue-600', 'bg-blue-100'),
  card('adjust-brightness', 'Adjust Brightness', 'Reduce file size of multiple PDF documents simultaneously without losing quality.', Sun, 'text-amber-600', 'bg-amber-100'),

  card('adjust-contrast', 'Adjust Contrast', 'Apply text or image watermarks to multiple PDF files across defined page ranges.', Sun, 'text-purple-600', 'bg-purple-100'),
  card('adjust-saturation', 'Adjust Saturation', 'Secure multiple document files with password protection and 256-bit AES encryption.', Palette, 'text-pink-600', 'bg-pink-100'),
  card('auto-color-correction', 'Auto Color Correction', 'Remove passwords and permissions security from multiple authorized document files.', Wand2, 'text-rose-600', 'bg-rose-100'),
  card('white-balance-adjustment', 'White Balance Adjustment', 'Search and replace text strings seamlessly across entire document pages.', Sliders, 'text-sky-600', 'bg-sky-100'),

  card('gamma-correction', 'Gamma Correction', 'Advanced regex search, boolean filters, and proximity keyword queries.', Activity, 'text-purple-600', 'bg-purple-100'),
  card('convert-image-format', 'Convert Image Format', 'Create, organize, edit, and navigate structured PDF document outline bookmarks.', FileText, 'text-amber-600', 'bg-amber-100'),
  card('image-compression', 'Image Compression', 'Generate and customize interactive table of contents with page number references.', Minimize2, 'text-orange-600', 'bg-orange-100'),
  card('image-upscaling-ai-super-resolution', 'Image Upscaling (AI Super Resolution)', 'Add clickable web URLs and email hyperlinks to text regions across documents.', TrendingUp, 'text-emerald-600', 'bg-emerald-100'),

  card('remove-background', 'Remove Background', 'Link specific text or regions to other pages or chapters inside the document.', Scissors, 'text-sky-600', 'bg-sky-100'),
  card('background-replacement', 'Background Replacement', 'Attach cross document external links to external files, websites, and endpoints.', Layers, 'text-amber-600', 'bg-amber-100'),
  card('watermark-images', 'Watermark Images', 'Define target anchors for precise cross-document and intra-document deep linking.', ShieldCheck, 'text-purple-600', 'bg-purple-100'),
  card('replace-images', 'Replace Images', 'Quick jump navigation bar with page preview thumbnails and history tracking.', Image, 'text-pink-600', 'bg-pink-100'),

  card('scan-documents', 'Scan Documents', 'Bookmark important documents and frequently visited pages for 1-click access.', Scan, 'text-amber-600', 'bg-amber-100'),
  card('multi-page-scanning', 'Multi-page Scanning', 'Modify document title, author, subject, keywords, and creation properties.', Layers, 'text-blue-600', 'bg-blue-100'),
  card('auto-detect-page-borders', 'Auto Detect Page Borders', 'Inspect hidden document metadata, author details, software version, and logs.', Square, 'text-purple-600', 'bg-purple-100'),
  card('deskew-images', 'Deskew Images', 'Manage standard document info dictionary fields and custom metadata keys.', RotateCw, 'text-red-600', 'bg-red-100'),

  card('remove-noise', 'Remove Noise', 'Define custom key-value metadata pairs for advanced indexing and cataloging.', Filter, 'text-amber-600', 'bg-amber-100'),
  card('perspective-correction', 'Perspective Correction', 'Read and write standardized Adobe XMP metadata packets embedded in documents.', Move, 'text-emerald-600', 'bg-emerald-100'),
  card('lens-distortion-correction', 'Lens Distortion Correction', 'Manage files attached to PDF documents with full extraction and preview.', Camera, 'text-sky-600', 'bg-sky-100'),
  card('deblur-images-ai', 'Deblur Images (AI)', 'Embed supplemental file attachments directly inside document structures.', Eye, 'text-amber-600', 'bg-amber-100'),

  card('image-denoise-ai', 'Image Denoise (AI)', 'Extract attached files and embedded media assets to local storage folders.', Sparkles, 'text-purple-600', 'bg-purple-100'),
  card('exif-metadata-editor', 'EXIF Metadata Editor', 'Delete unwanted embedded files to clean up document container size.', Edit3, 'text-pink-600', 'bg-pink-100'),
  card('exif-metadata-remover', 'EXIF Metadata Remover', 'Create reusable document layouts and standardized form structures.', Trash2, 'text-orange-600', 'bg-orange-100'),
  card('image-resolution-dpi-converter', 'Image Resolution (DPI) Converter', 'Access curated library of pre-built professional document templates.', Grid, 'text-blue-600', 'bg-blue-100')
];

export default function ImageProcessingPage({ onBack }) {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case 'image-editor':
        return <ImageEditorPage onBack={() => setActiveTool(null)} />;
      case 'flip-images':
        return <FlipImagesPage onBack={() => setActiveTool(null)} />;
      case 'crop-images':
        return <CropImagesPage onBack={() => setActiveTool(null)} />;
      case 'resize-images':
        return <ResizeImagesPage onBack={() => setActiveTool(null)} />;
      case 'rotate-images':
        return <RotateImagesPage onBack={() => setActiveTool(null)} />;
      case 'enhance-images':
        return <EnhanceImagesPage onBack={() => setActiveTool(null)} />;
      case 'sharpen-images':
        return <SharpenImagesPage onBack={() => setActiveTool(null)} />;
      case 'adjust-brightness':
        return <AdjustBrightnessPage onBack={() => setActiveTool(null)} />;
      case 'adjust-contrast':
        return <AdjustContrastPage onBack={() => setActiveTool(null)} />;
      case 'adjust-saturation':
        return <AdjustSaturationPage onBack={() => setActiveTool(null)} />;
      case 'auto-color-correction':
        return <AutoColorCorrectionPage onBack={() => setActiveTool(null)} />;
      case 'white-balance-adjustment':
        return <WhiteBalanceAdjustmentPage onBack={() => setActiveTool(null)} />;
      case 'gamma-correction':
        return <GammaCorrectionPage onBack={() => setActiveTool(null)} />;
      case 'convert-image-format':
        return <ConvertImageFormatPage onBack={() => setActiveTool(null)} />;
      case 'image-compression':
        return <ImageCompressionPage onBack={() => setActiveTool(null)} />;
      case 'image-upscaling-ai-super-resolution':
        return <ImageUpscalingAiSuperResolutionPage onBack={() => setActiveTool(null)} />;
      case 'remove-background':
        return <RemoveBackgroundPage onBack={() => setActiveTool(null)} />;
      case 'background-replacement':
        return <BackgroundReplacementPage onBack={() => setActiveTool(null)} />;
      case 'watermark-images':
        return <WatermarkImagesPage onBack={() => setActiveTool(null)} />;
      case 'replace-images':
        return <ReplaceImagesPage onBack={() => setActiveTool(null)} />;
      case 'scan-documents':
        return <ScanDocumentsPage onBack={() => setActiveTool(null)} />;
      case 'multi-page-scanning':
        return <MultiPageScanningPage onBack={() => setActiveTool(null)} />;
      case 'auto-detect-page-borders':
        return <AutoDetectPageBordersPage onBack={() => setActiveTool(null)} />;
      case 'deskew-images':
        return <DeskewImagesPage onBack={() => setActiveTool(null)} />;
      case 'remove-noise':
        return <RemoveNoisePage onBack={() => setActiveTool(null)} />;
      case 'perspective-correction':
        return <PerspectiveCorrectionPage onBack={() => setActiveTool(null)} />;
      case 'lens-distortion-correction':
        return <LensDistortionCorrectionPage onBack={() => setActiveTool(null)} />;
      case 'deblur-images-ai':
        return <DeblurImagesAiPage onBack={() => setActiveTool(null)} />;
      case 'image-denoise-ai':
        return <ImageDenoiseAiPage onBack={() => setActiveTool(null)} />;
      case 'exif-metadata-editor':
        return <ExifMetadataEditorPage onBack={() => setActiveTool(null)} />;
      case 'exif-metadata-remover':
        return <ExifMetadataRemoverPage onBack={() => setActiveTool(null)} />;
      case 'image-resolution-dpi-converter':
        return <ImageResolutionDpiConverterPage onBack={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  if (activeTool) {
    return renderTool();
  }

  return (
    <section aria-labelledby="image-processing-title" className="flex flex-col gap-6 sm:gap-7">
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
          <h1 id="image-processing-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Image Processing & OCR
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Extract images, compress graphics, perform OCR text recognition, and enhance scans.
          </p>
        </div>
      </header>

      {/* 32 Image Processing Tool Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {IMAGE_PROCESSING_CARDS.map((tool, index) => (
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
