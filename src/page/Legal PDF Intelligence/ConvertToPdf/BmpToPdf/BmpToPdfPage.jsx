/**
 * @file src/page/LegalPdfIntelligence/ConvertToPdf/BmpToPdf/BmpToPdfPage.jsx
 * @description BMP to PDF page component.
 */
import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BmpToPdfPage({ onBack }) {
  return (
    <section aria-labelledby="bmptopdf-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="bmptopdf-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            BMP to PDF
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Convert bitmap images (BMP) into high-resolution PDF
          </p>
        </div>
      </header>
    </section>
  );
}
