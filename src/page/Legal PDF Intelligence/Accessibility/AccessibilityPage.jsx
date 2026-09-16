/**
 * @file src/page/LegalPdfIntelligence/Accessibility/AccessibilityPage.jsx
 * @description Main Accessibility container rendering 20 tools cards and sub-page routing.
 */
import React, { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  Volume2,
  Volume1,
  AlignLeft,
  Sun,
  Keyboard,
  CheckSquare,
  Tag,
  Image,
  FileCheck,
  Palette,
  ShieldCheck,
  BookOpen,
  Type,
  Sliders,
  Maximize2,
  Target,
  Command,
  Mic
} from 'lucide-react';
import ToolCard from '../../../components/nexora';

import AccessibilitySupportPage from './AccessibilitySupport/AccessibilitySupportPage';
import ScreenReaderSupportPage from './ScreenReaderSupport/ScreenReaderSupportPage';
import ReadAloudPage from './ReadAloud/ReadAloudPage';
import TextReflowPage from './TextReflow/TextReflowPage';
import HighContrastModePage from './HighContrastMode/HighContrastModePage';
import KeyboardNavigationPage from './KeyboardNavigation/KeyboardNavigationPage';
import AccessibilityCheckerPage from './AccessibilityChecker/AccessibilityCheckerPage';
import TaggedPdfSupportPage from './TaggedPdfSupport/TaggedPdfSupportPage';
import AlternativeTextAltTextPage from './AlternativeTextAltText/AlternativeTextAltTextPage';
import AccessibleFormsPage from './AccessibleForms/AccessibleFormsPage';
import ColorContrastValidationPage from './ColorContrastValidation/ColorContrastValidationPage';
import PdfUaCompliancePage from './PdfUaCompliance/PdfUaCompliancePage';
import DyslexiaReadingModePage from './DyslexiaReadingMode/DyslexiaReadingModePage';
import CustomFontSizeControlsPage from './CustomFontSizeControls/CustomFontSizeControlsPage';
import AdjustableLineSpacingPage from './AdjustableLineSpacing/AdjustableLineSpacingPage';
import AdjustableLetterSpacingPage from './AdjustableLetterSpacing/AdjustableLetterSpacingPage';
import ReadingRulerPage from './ReadingRuler/ReadingRulerPage';
import FocusModePage from './FocusMode/FocusModePage';
import KeyboardShortcutCustomizationPage from './KeyboardShortcutCustomization/KeyboardShortcutCustomizationPage';
import VoiceNavigationPage from './VoiceNavigation/VoiceNavigationPage';

const card = (id, name, desc, Icon, color, bg) => ({
  id,
  name,
  desc,
  icon: (props) => <Icon {...props} />,
  color,
  bg,
  parentId: 'ACCESSIBILITY',
  fullName: name
});

export const ACCESSIBILITY_CARDS = [
  card('accessibility-support', 'Accessibility Support', 'Comprehensive suite of features ensuring PDF documents are accessible to everyone.', Eye, 'text-red-600', 'bg-red-100'),
  card('screen-reader-support', 'Screen Reader Support', 'Full compatibility with NVDA, JAWS, and VoiceOver screen reader software.', Volume2, 'text-sky-600', 'bg-sky-100'),
  card('read-aloud', 'Read Aloud', 'High-quality text-to-speech engine to listen to document content hands-free.', Volume1, 'text-purple-600', 'bg-purple-100'),
  card('text-reflow', 'Text Reflow', 'Automatically reflows document text for seamless reading on any screen size.', AlignLeft, 'text-rose-600', 'bg-rose-100'),

  card('high-contrast-mode', 'High Contrast Mode', 'Dark mode, inverted colors, and custom high-contrast color schemes for visual ease.', Sun, 'text-amber-600', 'bg-amber-100'),
  card('keyboard-navigation', 'Keyboard Navigation', 'Complete keyboard access with visible focus indicators for all interactive elements.', Keyboard, 'text-emerald-600', 'bg-emerald-100'),
  card('accessibility-checker', 'Accessibility Checker', 'Automated scan to detect accessibility barriers, missing tags, and color issues.', CheckSquare, 'text-blue-600', 'bg-blue-100'),
  card('tagged-pdf-support', 'Tagged PDF Support', 'View, edit, and create semantic PDF tags for logical document hierarchy.', Tag, 'text-amber-600', 'bg-amber-100'),

  card('alternative-text-alt-text', 'Alternative Text (Alt Text)', 'Add and edit meaningful alt text descriptions for images, charts, and diagrams.', Image, 'text-purple-600', 'bg-purple-100'),
  card('accessible-forms', 'Accessible Forms', 'Interactive form fields with clear labels, tooltips, and tab-order navigation.', FileCheck, 'text-pink-600', 'bg-pink-100'),
  card('color-contrast-validation', 'Color Contrast Validation', 'Verify foreground and background text contrast ratios against WCAG standards.', Palette, 'text-red-600', 'bg-red-100'),
  card('pdf-ua-compliance', 'PDF/UA Compliance', 'Validate and conform documents to ISO 14289-1 (PDF/UA) universal accessibility.', ShieldCheck, 'text-sky-600', 'bg-sky-100'),

  card('dyslexia-reading-mode', 'Dyslexia Reading Mode', 'Specialized fonts, tinted backgrounds, and spacing optimized for dyslexia.', BookOpen, 'text-purple-600', 'bg-purple-100'),
  card('custom-font-size-controls', 'Custom Font Size Controls', 'Scalable font sizing and instant text magnification without losing document layout.', Type, 'text-red-600', 'bg-red-100'),
  card('adjustable-line-spacing', 'Adjustable Line Spacing', 'Customize line height and vertical paragraph spacing for optimal readability.', Sliders, 'text-amber-600', 'bg-amber-100'),
  card('adjustable-letter-spacing', 'Adjustable Letter Spacing', 'Fine-tune tracking and kerning between characters to reduce visual crowding.', Maximize2, 'text-emerald-600', 'bg-emerald-100'),

  card('reading-ruler', 'Reading Ruler', 'On-screen focus bar and line guide to help maintain focus while reading long texts.', Maximize2, 'text-sky-600', 'bg-sky-100'),
  card('focus-mode', 'Focus Mode', 'Distraction-free reading view that isolates current paragraphs and hides UI panels.', Target, 'text-amber-600', 'bg-amber-100'),
  card('keyboard-shortcut-customization', 'Keyboard Shortcut Customization', 'Remap hotkeys and keyboard shortcuts to match user accessibility preferences.', Command, 'text-purple-600', 'bg-purple-100'),
  card('voice-navigation', 'Voice Navigation', 'Control document reading, scrolling, and page turning using voice commands.', Mic, 'text-pink-600', 'bg-pink-100')
];

export default function AccessibilityPage({ onBack }) {
  const [activeTool, setActiveTool] = useState(null);

  const renderTool = () => {
    switch (activeTool) {
      case 'accessibility-support':
        return <AccessibilitySupportPage onBack={() => setActiveTool(null)} />;
      case 'screen-reader-support':
        return <ScreenReaderSupportPage onBack={() => setActiveTool(null)} />;
      case 'read-aloud':
        return <ReadAloudPage onBack={() => setActiveTool(null)} />;
      case 'text-reflow':
        return <TextReflowPage onBack={() => setActiveTool(null)} />;
      case 'high-contrast-mode':
        return <HighContrastModePage onBack={() => setActiveTool(null)} />;
      case 'keyboard-navigation':
        return <KeyboardNavigationPage onBack={() => setActiveTool(null)} />;
      case 'accessibility-checker':
        return <AccessibilityCheckerPage onBack={() => setActiveTool(null)} />;
      case 'tagged-pdf-support':
        return <TaggedPdfSupportPage onBack={() => setActiveTool(null)} />;
      case 'alternative-text-alt-text':
        return <AlternativeTextAltTextPage onBack={() => setActiveTool(null)} />;
      case 'accessible-forms':
        return <AccessibleFormsPage onBack={() => setActiveTool(null)} />;
      case 'color-contrast-validation':
        return <ColorContrastValidationPage onBack={() => setActiveTool(null)} />;
      case 'pdf-ua-compliance':
        return <PdfUaCompliancePage onBack={() => setActiveTool(null)} />;
      case 'dyslexia-reading-mode':
        return <DyslexiaReadingModePage onBack={() => setActiveTool(null)} />;
      case 'custom-font-size-controls':
        return <CustomFontSizeControlsPage onBack={() => setActiveTool(null)} />;
      case 'adjustable-line-spacing':
        return <AdjustableLineSpacingPage onBack={() => setActiveTool(null)} />;
      case 'adjustable-letter-spacing':
        return <AdjustableLetterSpacingPage onBack={() => setActiveTool(null)} />;
      case 'reading-ruler':
        return <ReadingRulerPage onBack={() => setActiveTool(null)} />;
      case 'focus-mode':
        return <FocusModePage onBack={() => setActiveTool(null)} />;
      case 'keyboard-shortcut-customization':
        return <KeyboardShortcutCustomizationPage onBack={() => setActiveTool(null)} />;
      case 'voice-navigation':
        return <VoiceNavigationPage onBack={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  if (activeTool) {
    return renderTool();
  }

  return (
    <section aria-labelledby="accessibility-title" className="flex flex-col gap-6 sm:gap-7">
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
          <h1 id="accessibility-title" className="text-3xl font-black leading-tight tracking-tight text-[#1e2a52] sm:text-4xl lg:text-5xl">
            Accessibility & Assistive Tools
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
            Make your PDF documents accessible with screen reader optimization, alt text, and tags.
          </p>
        </div>
      </header>

      {/* 20 Accessibility Tool Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {ACCESSIBILITY_CARDS.map((tool, index) => (
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
