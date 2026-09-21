import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Standard PageNavigation Component for NEXORA Report Pages.
 * 
 * Enforces the standardized layout:
 * [ Previous ] | Page X of Y | [ Next ]
 *
 * @param {Object} props
 * @param {number} props.currentPage - Current 1-based page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} [props.onPageChange] - Callback invoked with next page number
 * @param {Function} [props.onPrev] - Optional direct previous page handler
 * @param {Function} [props.onNext] - Optional direct next page handler
 * @param {string} [props.className] - Additional wrapper classes
 * @param {string} [props.accentColor] - Optional accent color (e.g., '#ea580c', '#16a34a', '#1e3a8a')
 */
export default function PageNavigation({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onPrev,
  onNext,
  onSubmit,
  submitText = 'Submit',
  className = '',
  accentColor
}) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const handlePrev = (e) => {
    if (e) e.preventDefault();
    if (isFirstPage) return;
    if (onPrev) {
      onPrev();
    } else if (onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (isLastPage) {
      if (onSubmit) {
        onSubmit();
      }
      return;
    }
    if (onNext) {
      onNext();
    } else if (onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  // Border and text styling based on accent color
  const activeBtnStyle = accentColor
    ? { borderColor: accentColor, color: accentColor }
    : {};

  const submitBtnStyle = accentColor
    ? { backgroundColor: accentColor, borderColor: accentColor, color: '#ffffff' }
    : { backgroundColor: '#1e3a8a', borderColor: '#1e3a8a', color: '#ffffff' };

  return (
    <nav
      aria-label="Report pagination"
      className={`w-full flex items-center justify-between sm:justify-center gap-2 sm:gap-4 py-2 select-none ${className}`}
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={isFirstPage}
        aria-label="Previous page"
        className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-lg sm:rounded-[10px] text-xs sm:text-sm font-bold transition-all duration-150 min-w-[80px] sm:min-w-[96px] ${
          isFirstPage
            ? 'bg-slate-100/70 text-slate-400 border border-slate-200/60 cursor-not-allowed opacity-60'
            : 'bg-white text-[#1e3a8a] border border-slate-200/90 hover:bg-slate-50 hover:border-[#1e3a8a]/40 hover:shadow-xs active:scale-[0.98] cursor-pointer'
        }`}
        style={!isFirstPage && accentColor ? activeBtnStyle : {}}
      >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span>Previous</span>
      </button>

      {/* Center Page Display: Page X of Y */}
      <div className="inline-flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
        <span className="text-xs sm:text-sm font-extrabold text-[#1e3a8a] whitespace-nowrap tracking-wide">
          Page {currentPage} of {Math.max(1, totalPages)}
        </span>
      </div>

      {/* Next / Submit Button */}
      {isLastPage && onSubmit ? (
        <button
          type="button"
          onClick={handleNext}
          aria-label={submitText}
          className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-4 sm:px-5 py-2 rounded-lg sm:rounded-[10px] text-xs sm:text-sm font-bold transition-all duration-150 min-w-[80px] sm:min-w-[96px] shadow-xs hover:shadow-sm hover:brightness-105 active:scale-[0.98] cursor-pointer text-white"
          style={submitBtnStyle}
        >
          <span>{submitText}</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          disabled={isLastPage}
          aria-label="Next page"
          className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-lg sm:rounded-[10px] text-xs sm:text-sm font-bold transition-all duration-150 min-w-[80px] sm:min-w-[96px] ${
            isLastPage
              ? 'bg-slate-100/70 text-slate-400 border border-slate-200/60 cursor-not-allowed opacity-60'
              : 'bg-white text-[#1e3a8a] border border-slate-200/90 hover:bg-slate-50 hover:border-[#1e3a8a]/40 hover:shadow-xs active:scale-[0.98] cursor-pointer'
          }`}
          style={!isLastPage && accentColor ? activeBtnStyle : {}}
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        </button>
      )}
    </nav>
  );
}
