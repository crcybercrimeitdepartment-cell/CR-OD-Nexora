import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle2, AlertTriangle, Download, Settings, RefreshCw, Sparkles, Shield } from 'lucide-react';

export default function ToolWorkspace({ tool, onBack }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const toolName = tool?.name || tool?.title || 'Tool Workspace';
  const toolDesc = tool?.description || tool?.desc || 'Process and manage your PDF documents securely with enterprise-grade legal document intelligence.';
  const IconComponent = tool?.icon;

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      setIsDone(false);
    }
  };

  const handleProcess = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-800 pb-16">
      {/* Top Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 pt-4 pb-4">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#1e2a52] hover:bg-[#1e2a52] hover:text-white transition-all shadow-sm font-bold text-xs sm:text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              Legal PDF Module
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-6 space-y-6">
        {/* Tool Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-inner">
            {typeof IconComponent === 'function' ? (
              <IconComponent className="w-7 h-7" />
            ) : (
              <FileText className="w-7 h-7" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-black text-[#1e2a52]">{toolName}</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">{toolDesc}</p>
          </div>
        </div>

        {/* Upload Box */}
        <div className="bg-white rounded-2xl p-8 border-2 border-dashed border-slate-300 hover:border-blue-500 transition-colors text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
            <Upload className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800">
              {selectedFile ? selectedFile.name : 'Select or drop your PDF document here'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for processing` : 'Supports PDF, Word, Scanned Legal OCR, & Image formats up to 50MB'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <label className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer">
              <span>{selectedFile ? 'Change File' : 'Choose File'}</span>
              <input type="file" accept=".pdf,.doc,.docx,.png,.jpg" className="hidden" onChange={handleFileChange} />
            </label>

            {selectedFile && !isDone && (
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-[#1e2a52] hover:bg-[#151f3d] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Process Document</span>
                  </>
                )}
              </button>
            )}

            {isDone && (
              <button
                onClick={() => alert(`Document "${selectedFile?.name}" processed successfully.`)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Result</span>
              </button>
            )}
          </div>
        </div>

        {/* Security & Info Footer */}
        <div className="bg-slate-100 rounded-xl p-4 flex items-center justify-between text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>End-to-End Encrypted. Processed entirely within your local secure container.</span>
          </div>
          <span className="font-bold text-slate-500">ISO 27001 Compliant</span>
        </div>
      </div>
    </div>
  );
}
