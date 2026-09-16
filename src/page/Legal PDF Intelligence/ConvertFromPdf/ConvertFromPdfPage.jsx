/**
 * @file src/page/LegalPdfIntelligence/ConvertFromPdf/ConvertFromPdfPage.jsx
 * @description Main Convert from PDF container rendering 38 tool cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
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
  FileCheck
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import PdfToWordPage from './PdfToWord/PdfToWordPage';
import PdfToExcelPage from './PdfToExcel/PdfToExcelPage';
import PdfToPowerpointPage from './PdfToPowerpoint/PdfToPowerpointPage';
import PdfToJpgPage from './PdfToJpg/PdfToJpgPage';
import PdfToPngPage from './PdfToPng/PdfToPngPage';
import PdfToGifPage from './PdfToGif/PdfToGifPage';
import PdfToBmpPage from './PdfToBmp/PdfToBmpPage';
import PdfToTiffPage from './PdfToTiff/PdfToTiffPage';
import PdfToWebpPage from './PdfToWebp/PdfToWebpPage';
import PdfToSvgPage from './PdfToSvg/PdfToSvgPage';
import PdfToTextTxtPage from './PdfToTextTxt/PdfToTextTxtPage';
import PdfToHtmlPage from './PdfToHtml/PdfToHtmlPage';
import PdfToXmlPage from './PdfToXml/PdfToXmlPage';
import PdfToCsvPage from './PdfToCsv/PdfToCsvPage';
import PdfToJsonPage from './PdfToJson/PdfToJsonPage';
import PdfToRtfPage from './PdfToRtf/PdfToRtfPage';
import PdfToMarkdownMdPage from './PdfToMarkdownMd/PdfToMarkdownMdPage';
import PdfToEpubPage from './PdfToEpub/PdfToEpubPage';
import PdfToXpsPage from './PdfToXps/PdfToXpsPage';
import PdfToPdfAPage from './PdfToPdfA/PdfToPdfAPage';
import PdfToSearchablePdfOcrPage from './PdfToSearchablePdfOcr/PdfToSearchablePdfOcrPage';
import PdfToEditablePdfPage from './PdfToEditablePdf/PdfToEditablePdfPage';
import PdfToZipPage from './PdfToZip/PdfToZipPage';
import PdfToImageCollectionPage from './PdfToImageCollection/PdfToImageCollectionPage';
import PdfToIndividualPagesPage from './PdfToIndividualPages/PdfToIndividualPagesPage';
import PdfToSingleLongImagePage from './PdfToSingleLongImage/PdfToSingleLongImagePage';
import PdfToHeicPage from './PdfToHeic/PdfToHeicPage';
import PdfToRawImagePage from './PdfToRawImage/PdfToRawImagePage';
import PdfToOdtOpendocumentTextPage from './PdfToOdtOpendocumentText/PdfToOdtOpendocumentTextPage';
import PdfToOdsOpendocumentSpreadsheetPage from './PdfToOdsOpendocumentSpreadsheet/PdfToOdsOpendocumentSpreadsheetPage';
import PdfToOdpOpendocumentPresentationPage from './PdfToOdpOpendocumentPresentation/PdfToOdpOpendocumentPresentationPage';
import PdfToVisioVsdxPage from './PdfToVisioVsdx/PdfToVisioVsdxPage';
import PdfToPublisherPubPage from './PdfToPublisherPub/PdfToPublisherPubPage';
import PdfToPhotoshopPsdPage from './PdfToPhotoshopPsd/PdfToPhotoshopPsdPage';
import PdfToIllustratorAiPage from './PdfToIllustratorAi/PdfToIllustratorAiPage';
import PdfToCadDwgDxfPage from './PdfToCadDwgDxf/PdfToCadDwgDxfPage';
import PdfToEmailEmlPage from './PdfToEmailEml/PdfToEmailEmlPage';
import PdfToOutlookMsgPage from './PdfToOutlookMsg/PdfToOutlookMsgPage';
import DemoTool1Page from './DemoTool1/DemoTool1Page';
import DemoTool2Page from './DemoTool2/DemoTool2Page';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'CONVERT_FROM_PDF',
  fullName: name
});

export const CONVERT_FROM_PDF_CARDS = [
  card('pdf-to-word', 'PDF to Word', 'Convert PDF documents to editable Microsoft Word DOC and DOCX files', FileText, 'text-blue-600', 'bg-blue-100'),
  card('pdf-to-excel', 'PDF to Excel', 'Extract PDF tables and data rows directly into editable Excel spreadsheets', FileText, 'text-emerald-600', 'bg-emerald-100'),
  card('pdf-to-powerpoint', 'PDF to PowerPoint', 'Convert PDF pages into editable PowerPoint PPT and PPTX slides', FileText, 'text-orange-600', 'bg-orange-100'),
  card('pdf-to-jpg', 'PDF to JPG', 'Extract high resolution JPG images from every page of your PDF file', Image, 'text-amber-600', 'bg-amber-100'),

  card('pdf-to-png', 'PDF to PNG', 'Export PDF document pages into high quality PNG graphic format', Image, 'text-cyan-600', 'bg-cyan-100'),
  card('pdf-to-gif', 'PDF to GIF', 'Convert PDF document pages into formatted GIF image frame series', Image, 'text-indigo-600', 'bg-indigo-100'),
  card('pdf-to-bmp', 'PDF to BMP', 'Convert PDF files into uncompressed bitmap BMP graphic files', Image, 'text-blue-600', 'bg-blue-100'),
  card('pdf-to-tiff', 'PDF to TIFF', 'Convert PDF pages into multi-page TIFF scanned graphics and fax images', Image, 'text-emerald-600', 'bg-emerald-100'),

  card('pdf-to-webp', 'PDF to WebP', 'Export PDF pages into lightweight, high-density WebP web images', Image, 'text-rose-600', 'bg-rose-100'),
  card('pdf-to-svg', 'PDF to SVG', 'Convert PDF vector shapes and graphics into clean scalable SVG format', Code, 'text-amber-600', 'bg-amber-100'),
  card('pdf-to-text-txt', 'PDF to Text (TXT)', 'Extract raw unformatted text content from PDF files into TXT format', FileText, 'text-slate-600', 'bg-slate-100'),
  card('pdf-to-html', 'PDF to HTML', 'Convert PDF documents into web-ready HTML code and CSS layouts', Code, 'text-purple-600', 'bg-purple-100'),

  card('pdf-to-xml', 'PDF to XML', 'Extract structured XML data elements and schemas from PDF files', Code, 'text-emerald-600', 'bg-emerald-100'),
  card('pdf-to-csv', 'PDF to CSV', 'Export tabular data from PDF files directly into structured CSV format', FileText, 'text-orange-600', 'bg-orange-100'),
  card('pdf-to-json', 'PDF to JSON', 'Transform PDF layout elements and data trees into structured JSON', Code, 'text-indigo-600', 'bg-indigo-100'),
  card('pdf-to-rtf', 'PDF to RTF', 'Convert PDF documents into Rich Text Format RTF editable files', FileText, 'text-cyan-600', 'bg-cyan-100'),

  card('pdf-to-markdown-md', 'PDF to Markdown (MD)', 'Convert PDF text, headers, and lists into formatted Markdown syntax', Code, 'text-blue-600', 'bg-blue-100'),
  card('pdf-to-epub', 'PDF to EPUB', 'Convert fixed layout PDF e-books into reflowable EPUB digital format', BookOpen, 'text-purple-600', 'bg-purple-100'),
  card('pdf-to-xps', 'PDF to XPS', 'Convert PDF documents into XML Paper Specification XPS format', File, 'text-cyan-600', 'bg-cyan-100'),
  card('pdf-to-pdfa', 'PDF to PDF/A', 'Convert standard PDF documents into ISO-compliant archival PDF/A files', FileCheck, 'text-rose-600', 'bg-rose-100'),

  card('pdf-to-searchable-pdf-ocr', 'PDF to Searchable PDF (OCR)', 'Apply OCR text recognition to make scanned PDFs fully searchable', Search, 'text-purple-600', 'bg-purple-100'),
  card('pdf-to-editable-pdf', 'PDF to Editable PDF', 'Transform flattened or scanned PDFs into editable text PDF format', FileText, 'text-pink-600', 'bg-pink-100'),
  card('pdf-to-zip', 'PDF to ZIP', 'Compress converted PDF assets and page images into a single ZIP archive', Archive, 'text-amber-600', 'bg-amber-100'),
  card('pdf-to-image-collection', 'PDF to Image Collection', 'Export all PDF pages into a zipped high-quality image collection', Image, 'text-indigo-600', 'bg-indigo-100'),

  card('pdf-to-individual-pages', 'PDF to Individual Pages', 'Split multi-page PDF into separate standalone single-page PDF files', Layers, 'text-blue-600', 'bg-blue-100'),
  card('pdf-to-single-long-image', 'PDF to Single Long Image', 'Stitch multi-page PDF into one continuous vertical high-res image', Image, 'text-rose-600', 'bg-rose-100'),
  card('pdf-to-heic', 'PDF to HEIC', 'Convert PDF pages into high efficiency HEIC image file format', Image, 'text-pink-600', 'bg-pink-100'),
  card('pdf-to-raw-image', 'PDF to RAW Image', 'Export PDF pages into uncompressed RAW image formats', Image, 'text-purple-600', 'bg-purple-100'),

  card('pdf-to-odt-opendocument-text', 'PDF to ODT (OpenDocument Text)', 'Convert PDF documents into LibreOffice / OpenOffice ODT text format', FileText, 'text-emerald-600', 'bg-emerald-100'),
  card('pdf-to-ods-opendocument-spreadsheet', 'PDF to ODS (OpenDocument Spreadsheet)', 'Export PDF table structures into LibreOffice ODS spreadsheet format', FileText, 'text-cyan-600', 'bg-cyan-100'),
  card('pdf-to-odp-opendocument-presentation', 'PDF to ODP (OpenDocument Presentation)', 'Convert PDF slides into LibreOffice ODP presentation slide decks', FileText, 'text-orange-600', 'bg-orange-100'),
  card('pdf-to-visio-vsdx', 'PDF to Visio (VSDX)', 'Export vector PDF diagrams into Microsoft Visio VSDX diagram files', Grid, 'text-pink-600', 'bg-pink-100'),

  card('pdf-to-publisher-pub', 'PDF to Publisher (PUB)', 'Convert PDF page layouts into Microsoft Publisher PUB publications', FileText, 'text-purple-600', 'bg-purple-100'),
  card('pdf-to-photoshop-psd', 'PDF to Photoshop (PSD)', 'Convert PDF graphics into multi-layer Photoshop PSD design files', Image, 'text-blue-600', 'bg-blue-100'),
  card('pdf-to-illustrator-ai', 'PDF to Illustrator (AI)', 'Export vector PDF artwork into Adobe Illustrator AI graphics', Image, 'text-amber-600', 'bg-amber-100'),
  card('pdf-to-cad-dwg-dxf', 'PDF to CAD (DWG/DXF)', 'Convert vector PDF blueprints into AutoCAD DWG and DXF CAD files', Settings, 'text-rose-600', 'bg-rose-100'),

  card('pdf-to-email-eml', 'PDF to Email (EML)', 'Convert PDF records into standard email message files in EML format', Mail, 'text-indigo-600', 'bg-indigo-100'),
  card('pdf-to-outlook-msg', 'PDF to Outlook (MSG)', 'Export PDF content into Microsoft Outlook MSG message files', Mail, 'text-blue-600', 'bg-blue-100'),

  card('demo-tool-1', 'Demo Tool 1', 'Demo PDF conversion tool card for preview and testing', Layers, 'text-purple-600', 'bg-purple-100'),
  card('demo-tool-2', 'Demo Tool 2', 'Demo PDF conversion tool card for preview and testing', Zap, 'text-pink-600', 'bg-pink-100'),
];

export default function ConvertFromPdfPage({ onBack }) {
  const [activeSubPage, setActiveSubPage] = useState(null);

  const handleSubPageBack = () => setActiveSubPage(null);

  if (activeSubPage === 'pdf-to-word') return <PdfToWordPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-excel') return <PdfToExcelPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-powerpoint') return <PdfToPowerpointPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-jpg') return <PdfToJpgPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-png') return <PdfToPngPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-gif') return <PdfToGifPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-bmp') return <PdfToBmpPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-tiff') return <PdfToTiffPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-webp') return <PdfToWebpPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-svg') return <PdfToSvgPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-text-txt') return <PdfToTextTxtPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-html') return <PdfToHtmlPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-xml') return <PdfToXmlPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-csv') return <PdfToCsvPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-json') return <PdfToJsonPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-rtf') return <PdfToRtfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-markdown-md') return <PdfToMarkdownMdPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-epub') return <PdfToEpubPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-xps') return <PdfToXpsPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-pdfa') return <PdfToPdfAPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-searchable-pdf-ocr') return <PdfToSearchablePdfOcrPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-editable-pdf') return <PdfToEditablePdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-zip') return <PdfToZipPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-image-collection') return <PdfToImageCollectionPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-individual-pages') return <PdfToIndividualPagesPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-single-long-image') return <PdfToSingleLongImagePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-heic') return <PdfToHeicPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-raw-image') return <PdfToRawImagePage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-odt-opendocument-text') return <PdfToOdtOpendocumentTextPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-ods-opendocument-spreadsheet') return <PdfToOdsOpendocumentSpreadsheetPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-odp-opendocument-presentation') return <PdfToOdpOpendocumentPresentationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-visio-vsdx') return <PdfToVisioVsdxPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-publisher-pub') return <PdfToPublisherPubPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-photoshop-psd') return <PdfToPhotoshopPsdPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-illustrator-ai') return <PdfToIllustratorAiPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-cad-dwg-dxf') return <PdfToCadDwgDxfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-email-eml') return <PdfToEmailEmlPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-outlook-msg') return <PdfToOutlookMsgPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'demo-tool-1') return <DemoTool1Page onBack={handleSubPageBack} />;
  if (activeSubPage === 'demo-tool-2') return <DemoTool2Page onBack={handleSubPageBack} />;

  return (
    <section aria-labelledby="convert-from-pdf-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="convert-from-pdf-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Convert from PDF
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Free Convert PDF Document to editable Word, Excel, PPT, or images.
          </p>
        </div>
      </header>

      {/* 38 Convert from PDF Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {CONVERT_FROM_PDF_CARDS.map((tool, index) => (
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
