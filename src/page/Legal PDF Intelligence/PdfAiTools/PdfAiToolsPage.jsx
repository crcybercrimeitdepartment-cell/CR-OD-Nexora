/**
 * @file src/page/LegalPdfIntelligence/PdfAiTools/PdfAiToolsPage.jsx
 * @description Main PDF AI Tools container rendering 35 tool cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Globe,
  Code,
  FileText,
  Zap,
  Cloud,
  MessageSquare,
  Brain,
  HelpCircle,
  BookOpen,
  Search,
  CheckCircle,
  Edit,
  Scan,
  Users,
  Download,
  Calendar,
  Share2,
  Box,
  RefreshCw,
  History,
  Monitor,
  Smartphone,
  Layers,
  Link
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import AiSummarizerPage from './AiSummarizer/AiSummarizerPage';
import TranslatePdfPage from './TranslatePdf/TranslatePdfPage';
import PdfToMarkdownPage from './PdfToMarkdown/PdfToMarkdownPage';
import PdfFormsPage from './PdfForms/PdfFormsPage';

import WorkflowAndAutomationPage from './WorkflowAndAutomation/WorkflowAndAutomationPage';
import GoogleDriveIntegrationPage from './GoogleDriveIntegration/GoogleDriveIntegrationPage';
import DropboxIntegrationPage from './DropboxIntegration/DropboxIntegrationPage';
import AiChatWithPdfPage from './AiChatWithPdf/AiChatWithPdfPage';

import MultiDocumentChatPage from './MultiDocumentChat/MultiDocumentChatPage';
import AiDocumentInsightsPage from './AiDocumentInsights/AiDocumentInsightsPage';
import SimplifyDocumentPage from './SimplifyDocument/SimplifyDocumentPage';
import AnswerDocumentQuestionsPage from './AnswerDocumentQuestions/AnswerDocumentQuestionsPage';

import ExtractKeyPointsPage from './ExtractKeyPoints/ExtractKeyPointsPage';
import ResearchAssistantPage from './ResearchAssistant/ResearchAssistantPage';
import AiSemanticSearchPage from './AiSemanticSearch/AiSemanticSearchPage';
import GrammarImprovementPage from './GrammarImprovement/GrammarImprovementPage';

import WritingEnhancementPage from './WritingEnhancement/WritingEnhancementPage';
import AiOcrPage from './AiOcr/AiOcrPage';
import MeetingSummaryPage from './MeetingSummary/MeetingSummaryPage';
import ContractSummaryPage from './ContractSummary/ContractSummaryPage';

import AcroformsSupportPage from './AcroformsSupport/AcroformsSupportPage';
import XfaFormsSupportPage from './XfaFormsSupport/XfaFormsSupportPage';
import LinkFillableFieldsPage from './LinkFillableFields/LinkFillableFieldsPage';
import ExportFormDataPage from './ExportFormData/ExportFormDataPage';

import AddDateFieldsPage from './AddDateFields/AddDateFieldsPage';
import OnedriveIntegrationPage from './OnedriveIntegration/OnedriveIntegrationPage';
import SharepointIntegrationPage from './SharepointIntegration/SharepointIntegrationPage';
import BoxIntegrationPage from './BoxIntegration/BoxIntegrationPage';

import AutomaticCloudSyncPage from './AutomaticCloudSync/AutomaticCloudSyncPage';
import CloudVersionHistoryPage from './CloudVersionHistory/CloudVersionHistoryPage';
import BrowserBasedEditingPage from './BrowserBasedEditing/BrowserBasedEditingPage';
import ContinueEditingAnywherePage from './ContinueEditingAnywhere/ContinueEditingAnywherePage';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'PDF_AI_TOOLS',
  fullName: name
});

export const PDF_AI_TOOLS_CARDS = [
  card('ai-summarizer', 'AI Summarizer', 'Generate concise executive summaries and key takeaways automatically.', Sparkles, 'text-purple-600', 'bg-purple-100'),
  card('translate-pdf', 'Translate PDF', 'Instantly translate PDF documents into 100+ languages preserving layout.', Globe, 'text-blue-600', 'bg-blue-100'),
  card('pdf-to-markdown', 'PDF to Markdown', 'Convert PDFs to clean, formatted Markdown code ready for note apps & LLMs.', Code, 'text-emerald-600', 'bg-emerald-100'),
  card('pdf-forms', 'PDF Forms', 'Create, fill out, and manage interactive PDF forms with smart validation.', FileText, 'text-amber-600', 'bg-amber-100'),

  card('workflow-automation', 'Workflow & Automation', 'Automate repetitive PDF tasks with custom trigger-based workflows.', Zap, 'text-rose-600', 'bg-rose-100'),
  card('google-drive-integration', 'Google Drive Integration', 'Connect directly to Google Drive to open, edit, and save PDFs seamlessly.', Cloud, 'text-blue-600', 'bg-blue-100'),
  card('dropbox-integration', 'Dropbox Integration', 'Sync and edit PDF files stored in your Dropbox cloud accounts effortlessly.', Cloud, 'text-cyan-600', 'bg-cyan-100'),
  card('ai-chat-with-pdf', 'AI Chat with PDF', 'Have interactive conversations with your PDF documents to ask questions.', MessageSquare, 'text-indigo-600', 'bg-indigo-100'),

  card('multi-document-chat', 'Multi-document Chat', 'Chat across multiple PDFs simultaneously to cross-reference insights.', MessageSquare, 'text-purple-600', 'bg-purple-100'),
  card('ai-document-insights', 'AI Document Insights', 'Uncover hidden patterns, sentiment, structure, and smart analytics in PDFs.', Brain, 'text-pink-600', 'bg-pink-100'),
  card('simplify-document', 'Simplify Document', 'Rewrite complex jargon and technical documents into easy plain language.', Sparkles, 'text-amber-600', 'bg-amber-100'),
  card('answer-document-questions', 'Answer Document Questions', 'Get precise answers with exact page citations from your document.', HelpCircle, 'text-emerald-600', 'bg-emerald-100'),

  card('extract-key-points', 'Extract Key Points', 'Extract bullet points, action items, dates, and core concepts automatically.', FileText, 'text-blue-600', 'bg-blue-100'),
  card('research-assistant', 'Research Assistant', 'Deep dive into academic papers and legal briefs with AI research assistance.', BookOpen, 'text-indigo-600', 'bg-indigo-100'),
  card('ai-semantic-search', 'AI Semantic Search', 'Search documents by concept and context rather than just exact keywords.', Search, 'text-purple-600', 'bg-purple-100'),
  card('grammar-improvement', 'Grammar Improvement', 'Detect and fix grammatical errors, typos, and style inconsistencies.', CheckCircle, 'text-emerald-600', 'bg-emerald-100'),

  card('writing-enhancement', 'Writing Enhancement', 'Refine tone, clarity, vocabulary, and readability of your PDF content.', Edit, 'text-rose-600', 'bg-rose-100'),
  card('ai-ocr', 'AI OCR', 'Turn scanned image PDFs into searchable, selectable, and editable text.', Scan, 'text-amber-600', 'bg-amber-100'),
  card('meeting-summary', 'Meeting Summary', 'Transform meeting notes and transcript PDFs into structured action items.', Users, 'text-cyan-600', 'bg-cyan-100'),
  card('contract-summary', 'Contract Summary', 'Analyze legal contracts to summarize clauses, obligations, and risks.', FileText, 'text-indigo-600', 'bg-indigo-100'),

  card('acroforms-support', 'AcroForms Support', 'Full compatibility with standard AcroForms for interactive form field filling.', FileText, 'text-purple-600', 'bg-purple-100'),
  card('xfa-forms-support', 'XFA Forms Support', 'Process, view, and fill complex dynamic Adobe XFA forms seamlessly.', Layers, 'text-blue-600', 'bg-blue-100'),
  card('link-fillable-fields', 'Link Fillable Fields', 'Connect form fields together to auto-populate duplicate data across pages.', Link, 'text-pink-600', 'bg-pink-100'),
  card('export-form-data', 'Export Form Data', 'Extract filled form responses into CSV, JSON, or Excel spreadsheet formats.', Download, 'text-emerald-600', 'bg-emerald-100'),

  card('add-date-fields', 'Add Date Fields', 'Insert smart auto-updating date pickers and timestamp fields into forms.', Calendar, 'text-amber-600', 'bg-amber-100'),
  card('onedrive-integration', 'OneDrive Integration', 'Access, edit, and save your PDFs directly inside Microsoft OneDrive.', Cloud, 'text-blue-600', 'bg-blue-100'),
  card('sharepoint-integration', 'SharePoint Integration', 'Enterprise integration with SharePoint document libraries and team sites.', Share2, 'text-emerald-600', 'bg-emerald-100'),
  card('box-integration', 'Box Integration', 'Securely access and manage PDF documents stored in Box cloud storage.', Box, 'text-amber-600', 'bg-amber-100'),

  card('automatic-cloud-sync', 'Automatic Cloud Sync', 'Keep changes synced across all connected cloud storage platforms.', RefreshCw, 'text-rose-600', 'bg-rose-100'),
  card('cloud-version-history', 'Cloud Version History', 'Track document revisions, restore previous versions, and view edit logs.', History, 'text-indigo-600', 'bg-indigo-100'),
  card('browser-based-editing', 'Browser-based Editing', 'Edit PDFs directly in your web browser with zero installation needed.', Monitor, 'text-purple-600', 'bg-purple-100'),
  card('continue-editing-anywhere', 'Continue Editing Anywhere', 'Pick up where you left off across desktop, tablet, and mobile devices.', Smartphone, 'text-cyan-600', 'bg-cyan-100'),
];

export default function PdfAiToolsPage({ onBack }) {
  const [activeSubPage, setActiveSubPage] = useState(null);

  const handleSubPageBack = () => setActiveSubPage(null);

  if (activeSubPage === 'ai-summarizer') return <AiSummarizerPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'translate-pdf') return <TranslatePdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-to-markdown') return <PdfToMarkdownPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'pdf-forms') return <PdfFormsPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'workflow-automation') return <WorkflowAndAutomationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'google-drive-integration') return <GoogleDriveIntegrationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'dropbox-integration') return <DropboxIntegrationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ai-chat-with-pdf') return <AiChatWithPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'multi-document-chat') return <MultiDocumentChatPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ai-document-insights') return <AiDocumentInsightsPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'simplify-document') return <SimplifyDocumentPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'answer-document-questions') return <AnswerDocumentQuestionsPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'extract-key-points') return <ExtractKeyPointsPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'research-assistant') return <ResearchAssistantPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ai-semantic-search') return <AiSemanticSearchPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'grammar-improvement') return <GrammarImprovementPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'writing-enhancement') return <WritingEnhancementPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'ai-ocr') return <AiOcrPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'meeting-summary') return <MeetingSummaryPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'contract-summary') return <ContractSummaryPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'acroforms-support') return <AcroformsSupportPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'xfa-forms-support') return <XfaFormsSupportPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'link-fillable-fields') return <LinkFillableFieldsPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'export-form-data') return <ExportFormDataPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'add-date-fields') return <AddDateFieldsPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'onedrive-integration') return <OnedriveIntegrationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'sharepoint-integration') return <SharepointIntegrationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'box-integration') return <BoxIntegrationPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'automatic-cloud-sync') return <AutomaticCloudSyncPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'cloud-version-history') return <CloudVersionHistoryPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'browser-based-editing') return <BrowserBasedEditingPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'continue-editing-anywhere') return <ContinueEditingAnywherePage onBack={handleSubPageBack} />;

  return (
    <section aria-labelledby="pdf-ai-tools-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="pdf-ai-tools-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            AI & Smart Features
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Leverage artificial intelligence to summarize, translate, analyze, and chat with your PDFs.
          </p>
        </div>
      </header>

      {/* 35 PDF AI Tools Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {PDF_AI_TOOLS_CARDS.map((tool, index) => (
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
