/**
 * @file src/page/LegalPdfIntelligence/ConvertToPdf/ConvertToPdfPage.jsx
 * @description Main Convert to PDF container rendering 38 tool cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  FileCheck,
  FileText,
  Image,
  Globe,
  Code,
  BookOpen,
  File,
  Mail,
  Archive,
  Folder,
  Layers,
  ShieldCheck,
  Zap,
  Search,
  Settings,
  Grid,
  Copy,
  PlusCircle
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import PdfToPdfaPage from './PdfToPdfA/PdfToPdfAPage';
import WordToPdfPage from './WordToPdf/WordToPdfPage';
import ExcelToPdfPage from './ExcelToPdf/ExcelToPdfPage';
import PowerpointToPdfPage from './PowerPointToPdf/PowerPointToPdfPage';
import JpgToPdfPage from './JpgToPdf/JpgToPdfPage';
import PngToPdfPage from './PngToPdf/PngToPdfPage';
import ScreenshotToPdfPage from './ScreenshotToPdf/ScreenshotToPdfPage';
import TextToPdfPage from './TextToPdf/TextToPdfPage';
import HtmlToPdfPage from './HtmlToPdf/HtmlToPdfPage';
import GifToPdfPage from './GifToPdf/GifToPdfPage';
import BmpToPdfPage from './BmpToPdf/BmpToPdfPage';
import TiffToPdfPage from './TiffToPdf/TiffToPdfPage';
import WebpToPdfPage from './WebPToPdf/WebPToPdfPage';
import SvgToPdfPage from './SvgToPdf/SvgToPdfPage';
import HeicToPdfPage from './HeicToPdf/HeicToPdfPage';
import RawImageToPdfPage from './RawImageToPdf/RawImageToPdfPage';
import RtfToPdfPage from './RtfToPdf/RtfToPdfPage';
import MarkdownMdToPdfPage from './MarkdownMdToPdf/MarkdownMdToPdfPage';
import XmlToPdfPage from './XmlToPdf/XmlToPdfPage';
import CsvToPdfPage from './CsvToPdf/CsvToPdfPage';
import JsonToPdfPage from './JsonToPdf/JsonToPdfPage';
import EpubToPdfPage from './EpubToPdf/EpubToPdfPage';
import MobiToPdfPage from './MobiToPdf/MobiToPdfPage';
import OdtToPdfPage from './OdtToPdf/OdtToPdfPage';
import OdsToPdfPage from './OdsToPdf/OdsToPdfPage';
import OdpToPdfPage from './OdpToPdf/OdpToPdfPage';
import VisioToPdfPage from './VisioToPdf/VisioToPdfPage';
import PublisherToPdfPage from './PublisherToPdf/PublisherToPdfPage';
import XpsToPdfPage from './XpsToPdf/XpsToPdfPage';
import CadDwgDxfToPdfPage from './CadDwgDxfToPdf/CadDwgDxfToPdfPage';
import PhotoshopPsdToPdfPage from './PhotoshopPsdToPdf/PhotoshopPsdToPdfPage';
import IllustratorAiToPdfPage from './IllustratorAiToPdf/IllustratorAiToPdfPage';
import EmailEmlToPdfPage from './EmailEmlToPdf/EmailEmlToPdfPage';
import OutlookMsgToPdfPage from './OutlookMsgToPdf/OutlookMsgToPdfPage';
import WebPageUrlToPdfPage from './WebPageUrlToPdf/WebPageUrlToPdfPage';
import ZipToPdfPage from './ZipToPdf/ZipToPdfPage';
import FolderToPdfPage from './FolderToPdf/FolderToPdfPage';
import MultipleFilesToPdfPage from './MultipleFilesToPdf/MultipleFilesToPdfPage';
import DemoTool1Page from './DemoTool1/DemoTool1Page';
import DemoTool2Page from './DemoTool2/DemoTool2Page';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'CONVERT_TO_PDF',
  fullName: name
});

export const CONVERT_TO_PDF_CARDS = [
  card('pdf-to-pdfa', 'PDF to PDF/A', 'Convert standard PDF documents into ISO-compliant archival PDF/A format', FileCheck, 'text-rose-600', 'bg-rose-100'),
  card('word-to-pdf', 'Word to PDF', 'Convert Microsoft Word DOC and DOCX files into formatted PDF documents', FileText, 'text-blue-600', 'bg-blue-100'),
  card('excel-to-pdf', 'Excel to PDF', 'Convert Microsoft Excel XLS and XLSX spreadsheets into clean PDF pages', FileText, 'text-emerald-600', 'bg-emerald-100'),
  card('powerpoint-to-pdf', 'PowerPoint to PDF', 'Convert PowerPoint PPT and PPTX slide presentations directly into PDF format', FileText, 'text-orange-600', 'bg-orange-100'),

  card('jpg-to-pdf', 'JPG to PDF', 'Convert JPG image files into clean, professional multi-page PDF documents', Image, 'text-amber-600', 'bg-amber-100'),
  card('png-to-pdf', 'PNG to PDF', 'Convert PNG images with transparency into high quality searchable PDF files', Image, 'text-cyan-600', 'bg-cyan-100'),
  card('screenshot-to-pdf', 'Screenshot to PDF', 'Turn screen captures, snips, and app screenshots into printable PDF files', Image, 'text-pink-600', 'bg-pink-100'),
  card('text-to-pdf', 'Text to PDF', 'Transform plain text TXT files into structured, printable PDF documents', FileText, 'text-slate-600', 'bg-slate-100'),

  card('html-to-pdf', 'HTML to PDF', 'Convert web pages, HTML code, and CSS styled layouts into vector PDFs', Code, 'text-purple-600', 'bg-purple-100'),
  card('gif-to-pdf', 'GIF to PDF', 'Convert static or animated GIF images into formatted PDF document frames', Image, 'text-indigo-600', 'bg-indigo-100'),
  card('bmp-to-pdf', 'BMP to PDF', 'Convert uncompressed bitmap BMP graphics into optimized PDF documents', Image, 'text-blue-600', 'bg-blue-100'),
  card('tiff-to-pdf', 'TIFF to PDF', 'Convert multi-page TIFF scanned images and fax files into standard PDFs', Image, 'text-emerald-600', 'bg-emerald-100'),

  card('webp-to-pdf', 'WebP to PDF', 'Convert modern WebP web image graphics into high-density PDF files', Image, 'text-rose-600', 'bg-rose-100'),
  card('svg-to-pdf', 'SVG to PDF', 'Convert scalable vector SVG graphics into crisp resolution-independent PDFs', Code, 'text-amber-600', 'bg-amber-100'),
  card('heic-to-pdf', 'HEIC to PDF', 'Convert Apple iPhone HEIC photo captures directly into universal PDF format', Image, 'text-pink-600', 'bg-pink-100'),
  card('raw-image-to-pdf', 'RAW Image to PDF', 'Convert camera RAW files (CR2, NEF, ARW) into high fidelity PDF pages', Image, 'text-purple-600', 'bg-purple-100'),

  card('rtf-to-pdf', 'RTF to PDF', 'Convert Rich Text Format RTF documents into formatted portable PDFs', FileText, 'text-cyan-600', 'bg-cyan-100'),
  card('markdown-md-to-pdf', 'Markdown (MD) to PDF', 'Render formatted Markdown files with code syntax highlighting into PDF', Code, 'text-blue-600', 'bg-blue-100'),
  card('xml-to-pdf', 'XML to PDF', 'Convert structured XML data files into styled PDF report layouts', Code, 'text-emerald-600', 'bg-emerald-100'),
  card('csv-to-pdf', 'CSV to PDF', 'Convert comma-separated CSV data files into formatted PDF table reports', FileText, 'text-orange-600', 'bg-orange-100'),

  card('json-to-pdf', 'JSON to PDF', 'Convert JSON datasets into human-readable formatted PDF document reports', Code, 'text-indigo-600', 'bg-indigo-100'),
  card('epub-to-pdf', 'EPUB to PDF', 'Convert EPUB e-books into fixed-layout printable PDF digital documents', BookOpen, 'text-purple-600', 'bg-purple-100'),
  card('mobi-to-pdf', 'MOBI to PDF', 'Convert Kindle MOBI e-books into standardized portable PDF documents', BookOpen, 'text-rose-600', 'bg-rose-100'),
  card('odt-to-pdf', 'ODT to PDF', 'Convert OpenOffice / LibreOffice ODT text documents into formatted PDFs', FileText, 'text-amber-600', 'bg-amber-100'),

  card('ods-to-pdf', 'ODS to PDF', 'Convert OpenOffice / LibreOffice ODS spreadsheets into PDF document tables', FileText, 'text-emerald-600', 'bg-emerald-100'),
  card('odp-to-pdf', 'ODP to PDF', 'Convert OpenOffice / LibreOffice ODP presentations into PDF slide decks', FileText, 'text-blue-600', 'bg-blue-100'),
  card('visio-to-pdf', 'Visio to PDF', 'Convert Microsoft Visio VSDX diagrams and flowcharts into vector PDFs', Grid, 'text-pink-600', 'bg-pink-100'),
  card('publisher-to-pdf', 'Publisher to PDF', 'Convert Microsoft Publisher PUB desktop publications into crisp PDFs', FileText, 'text-purple-600', 'bg-purple-100'),

  card('xps-to-pdf', 'XPS to PDF', 'Convert XML Paper Specification XPS and OXPS files into standard PDFs', File, 'text-cyan-600', 'bg-cyan-100'),
  card('cad-dwg-dxf-to-pdf', 'CAD (DWG/DXF) to PDF', 'Convert AutoCAD DWG and DXF technical drawings into vector PDF files', Settings, 'text-rose-600', 'bg-rose-100'),
  card('photoshop-psd-to-pdf', 'Photoshop (PSD) to PDF', 'Convert Photoshop PSD multi-layer design files into consolidated PDFs', Image, 'text-blue-600', 'bg-blue-100'),
  card('illustrator-ai-to-pdf', 'Illustrator (AI) to PDF', 'Convert Adobe Illustrator AI vector artwork files into standard PDFs', Image, 'text-orange-600', 'bg-orange-100'),

  card('email-eml-to-pdf', 'Email (EML) to PDF', 'Convert email message files EML with header details into PDF records', Mail, 'text-indigo-600', 'bg-indigo-100'),
  card('outlook-msg-to-pdf', 'Outlook (MSG) to PDF', 'Convert Microsoft Outlook MSG emails and attachments into secure PDFs', Mail, 'text-blue-600', 'bg-blue-100'),
  card('web-page-url-to-pdf', 'Web Page (URL) to PDF', 'Capture live web URLs and render complete website pages into PDF', Globe, 'text-emerald-600', 'bg-emerald-100'),
  card('zip-to-pdf', 'ZIP to PDF', 'Extract compressed ZIP archives and merge contained files into one PDF', Archive, 'text-purple-600', 'bg-purple-100'),

  card('folder-to-pdf', 'Folder to PDF', 'Batch convert entire local file folders into consolidated PDF documents', Folder, 'text-amber-600', 'bg-amber-100'),
  card('multiple-files-to-pdf', 'Multiple Files to PDF', 'Batch convert diverse file formats simultaneously into single or multi PDFs', Layers, 'text-rose-600', 'bg-rose-100'),

  card('demo-tool-1', 'Demo Tool 1', 'Demo PDF conversion tool card for preview and testing', Layers, 'text-purple-600', 'bg-purple-100'),
  card('demo-tool-2', 'Demo Tool 2', 'Demo PDF conversion tool card for preview and testing', Zap, 'text-pink-600', 'bg-pink-100'),
];

export default function ConvertToPdfPage({ onBack }) {
  const [activeSubPage, setActiveSubPage] = useState(null);

  const handleSubPageBack = () => setActiveSubPage(null);

  if (activeSubPage === 'pdf-to-pdfa') return <PdfToPdfaPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'word-to-pdf') return <WordToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'excel-to-pdf') return <ExcelToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'powerpoint-to-pdf') return <PowerpointToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'jpg-to-pdf') return <JpgToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'png-to-pdf') return <PngToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'screenshot-to-pdf') return <ScreenshotToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'text-to-pdf') return <TextToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'html-to-pdf') return <HtmlToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'gif-to-pdf') return <GifToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'bmp-to-pdf') return <BmpToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'tiff-to-pdf') return <TiffToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'webp-to-pdf') return <WebpToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'svg-to-pdf') return <SvgToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'heic-to-pdf') return <HeicToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'raw-image-to-pdf') return <RawImageToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'rtf-to-pdf') return <RtfToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'markdown-md-to-pdf') return <MarkdownMdToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'xml-to-pdf') return <XmlToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'csv-to-pdf') return <CsvToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'json-to-pdf') return <JsonToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'epub-to-pdf') return <EpubToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'mobi-to-pdf') return <MobiToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'odt-to-pdf') return <OdtToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ods-to-pdf') return <OdsToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'odp-to-pdf') return <OdpToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'visio-to-pdf') return <VisioToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'publisher-to-pdf') return <PublisherToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'xps-to-pdf') return <XpsToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'cad-dwg-dxf-to-pdf') return <CadDwgDxfToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'photoshop-psd-to-pdf') return <PhotoshopPsdToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'illustrator-ai-to-pdf') return <IllustratorAiToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'email-eml-to-pdf') return <EmailEmlToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'outlook-msg-to-pdf') return <OutlookMsgToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'web-page-url-to-pdf') return <WebPageUrlToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'zip-to-pdf') return <ZipToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'folder-to-pdf') return <FolderToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'multiple-files-to-pdf') return <MultipleFilesToPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'demo-tool-1') return <DemoTool1Page onBack={handleSubPageBack} />;
  if (activeSubPage === 'demo-tool-2') return <DemoTool2Page onBack={handleSubPageBack} />;

  return (
    <section aria-labelledby="convert-to-pdf-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="convert-to-pdf-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Convert to PDF
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Online Convert Word, Excel, PPT, images, and HTML into PDF format.
          </p>
        </div>
      </header>

      {/* 38 Convert to PDF Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {CONVERT_TO_PDF_CARDS.map((tool, index) => (
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
