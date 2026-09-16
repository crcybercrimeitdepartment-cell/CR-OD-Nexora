/**
 * @file src/page/LegalPdfIntelligence/CompareAndRedaction/CompareAndRedactionPage.jsx
 * @description Main Compare & Redaction container rendering tool cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  FileSearch,
  EyeOff,
  Copy,
  Layers
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import ComparePdfPage from './ComparePdf/ComparePdfPage';
import RedactPdfPage from './RedactPdf/RedactPdfPage';
import DuplicateCheckPage from './DuplicateCheck/DuplicateCheckPage';
import DemoTool1Page from './DemoTool1/DemoTool1Page';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'COMPARE_REDACTION',
  fullName: name
});

export const COMPARE_REDACTION_CARDS = [
  card('compare-pdf', 'Compare PDF', 'Compare two PDF documents side-by-side to highlight text differences, visual changes, and structural edits.', FileSearch, 'text-blue-600', 'bg-blue-100'),
  card('redact-pdf', 'Redact PDF', 'Permanently block out or remove sensitive text, private images, and confidential data.', EyeOff, 'text-rose-600', 'bg-rose-100'),
  card('duplicate-check', 'Duplicate Check', 'Scan and identify duplicate pages, redundant content, or identical PDF files in your document repository.', Copy, 'text-purple-600', 'bg-purple-100'),

  card('demo-tool-1', 'Demo Tool 1', 'Demo Compare & Redaction tool card for preview and testing', Layers, 'text-purple-600', 'bg-purple-100'),
];

export default function CompareAndRedactionPage({ onBack }) {
  const [activeSubPage, setActiveSubPage] = useState(null);

  const handleSubPageBack = () => setActiveSubPage(null);

  if (activeSubPage === 'compare-pdf') return <ComparePdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'redact-pdf') return <RedactPdfPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'duplicate-check') return <DuplicateCheckPage onBack={handleSubPageBack} />;
  if (activeSubPage === 'demo-tool-1') return <DemoTool1Page onBack={handleSubPageBack} />;

  return (
    <section aria-labelledby="compare-redaction-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="compare-redaction-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Compare & Redaction
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Compare document versions side-by-side and permanently redact sensitive information.
          </p>
        </div>
      </header>

      {/* Compare & Redaction Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {COMPARE_REDACTION_CARDS.map((tool, index) => (
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
