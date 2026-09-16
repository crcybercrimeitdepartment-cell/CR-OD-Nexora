/**
 * @file src/page/LegalPdfIntelligence/ImageProcessing/ImageEditor/ImageEditorPage.jsx
 * @description Image Editor tool page component.
 */
import React from 'react';
import { ArrowLeft, Image, Download, Settings, ShieldCheck } from 'lucide-react';

export default function ImageEditorPage({ onBack }) {
  return (
    <section aria-labelledby="imageeditor-title" className="flex flex-col gap-6 sm:gap-7">
      <header className="relative pb-2 sm:pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#1e2a52] shadow-sm transition hover:bg-slate-50 hover:shadow-md md:absolute md:left-0 md:top-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="mt-7 text-center md:mt-0 md:px-28">
          <h1 id="imageeditor-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Image Editor
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Comprehensive file organization, folder structures, and document browsing.
          </p>
        </div>
      </header>

      {/* Main Workspace Card */}
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50/50 hover:bg-slate-50 transition">
          <Image className="h-16 w-16 text-amber-600 mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Image Processing & OCR Workspace</h3>
          <p className="text-sm text-slate-600 mb-6 max-w-md">
            Upload images or PDF pages to process graphics, OCR text recognition, and enhancements for Image Editor.
          </p>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#1e2a52] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-indigo-900 hover:shadow-xl">
            <Download className="h-4 w-4" /> Select PDF / Image File
            <input type="file" className="hidden" accept=".pdf,image/*" />
          </label>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
              <Settings className="h-4 w-4 text-amber-600" /> Enhancement Parameters
            </div>
            <p className="text-xs text-slate-600">Adjust DPI resolution, color correction filters, contrast, and noise reduction levels.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> AI OCR & Metadata
            </div>
            <p className="text-xs text-slate-600">Perform AI super resolution, EXIF metadata editing, and automated border deskewing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
