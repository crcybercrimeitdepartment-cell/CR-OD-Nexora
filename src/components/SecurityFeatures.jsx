import { useEffect } from "react";

const SecurityFeatures = () => {
  useEffect(() => {
    /*
     * ============================================================
     * UI PROTECTION / ANTI-COPY FEATURES
     * ============================================================
     *
     * Purpose:
     * - Casual copy/selection protection
     * - Right-click protection
     * - Text/image drag protection
     * - Common copy shortcuts protection
     * - Basic print/source/devtools shortcut protection
     *
     * Important:
     * This is UI-level protection only.
     * It cannot prevent screenshots, screen recording,
     * DevTools, OCR, API extraction, etc.
     */

    // ------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------

    const isInputElement = (target) => {
      if (!target) return false;

      const element = target.closest?.(
        "input, textarea, select, button, a, [contenteditable='true']"
      );

      return !!element;
    };

    const isEditableElement = (target) => {
      if (!target) return false;

      const element = target.closest?.(
        "input, textarea, [contenteditable='true']"
      );

      return !!element;
    };

    const isInteractiveElement = (target) => {
      if (!target) return false;

      return !!target.closest?.(
        "input, textarea, select, button, a, [role='button'], [role='link'], [contenteditable='true']"
      );
    };

    // ------------------------------------------------------------
    // 1. Prevent text selection
    // ------------------------------------------------------------

    const handleSelectStart = (e) => {
      // Keep selection working inside editable/interactive elements
      if (isEditableElement(e.target)) {
        return;
      }

      // Allow selection for buttons/links where browser interaction
      // may be required.
      if (isInteractiveElement(e.target)) {
        return;
      }

      e.preventDefault();
    };

    // ------------------------------------------------------------
    // 2. Prevent copy
    // ------------------------------------------------------------

    const handleCopy = (e) => {
      // Do not break inputs, textareas or editable fields
      if (isEditableElement(e.target)) {
        return;
      }

      e.preventDefault();
    };

    // ------------------------------------------------------------
    // 3. Prevent cut
    // ------------------------------------------------------------

    const handleCut = (e) => {
      if (isEditableElement(e.target)) {
        return;
      }

      e.preventDefault();
    };

    // ------------------------------------------------------------
    // 4. Prevent context menu / right click
    // ------------------------------------------------------------

    const handleContextMenu = (e) => {
      // Keep context menu available inside editable fields
      if (isEditableElement(e.target)) {
        return;
      }

      // Keep required interactive controls usable
      const interactive = e.target.closest?.(
        "button, input, textarea, select, [contenteditable='true']"
      );

      if (interactive) {
        return;
      }

      e.preventDefault();
    };

    // ------------------------------------------------------------
    // 5. Prevent text dragging
    // ------------------------------------------------------------

    const handleDragStart = (e) => {
      const target = e.target;

      // Do not interfere with editable elements
      if (isEditableElement(target)) {
        return;
      }

      // Allow explicitly configured draggable elements
      if (target.closest?.("[data-allow-drag='true']")) {
        return;
      }

      e.preventDefault();
    };

    // ------------------------------------------------------------
    // 6. Prevent drag/drop of protected content
    // ------------------------------------------------------------

    const handleDrag = (e) => {
      if (isEditableElement(e.target)) {
        return;
      }

      if (e.target.closest?.("[data-allow-drag='true']")) {
        return;
      }

      e.preventDefault();
    };

    const handleDrop = (e) => {
      if (isEditableElement(e.target)) {
        return;
      }

      if (e.target.closest?.("[data-allow-drag='true']")) {
        return;
      }

      e.preventDefault();
    };

    // ------------------------------------------------------------
    // 7. Prevent double-click text highlighting
    // ------------------------------------------------------------

    const handleDoubleClick = (e) => {
      if (isEditableElement(e.target)) {
        return;
      }

      if (isInteractiveElement(e.target)) {
        return;
      }

      e.preventDefault();
    };

    // ------------------------------------------------------------
    // 8. Keyboard shortcut protection
    // ------------------------------------------------------------

    const handleKeyDown = (e) => {
      const target = e.target;

      // Never interfere with editable fields
      if (isEditableElement(target)) {
        return;
      }

      const key = e.key?.toLowerCase();

      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      // ----------------------------------------------------------
      // Copy / Select All / Cut
      // ----------------------------------------------------------

      if (ctrlOrCmd && ["c", "a", "x"].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ----------------------------------------------------------
      // Print
      // ----------------------------------------------------------

      if (ctrlOrCmd && key === "p") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ----------------------------------------------------------
      // View Source
      // ----------------------------------------------------------

      if (ctrlOrCmd && key === "u") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ----------------------------------------------------------
      // F12 - Developer Tools
      // ----------------------------------------------------------

      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ----------------------------------------------------------
      // Ctrl + Shift + I
      // Developer Tools
      // ----------------------------------------------------------

      if (
        ctrlOrCmd &&
        e.shiftKey &&
        key === "i"
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ----------------------------------------------------------
      // Ctrl + Shift + J
      // Console
      // ----------------------------------------------------------

      if (
        ctrlOrCmd &&
        e.shiftKey &&
        key === "j"
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ----------------------------------------------------------
      // Ctrl + Shift + C
      // Inspect Element
      // ----------------------------------------------------------

      if (
        ctrlOrCmd &&
        e.shiftKey &&
        key === "c"
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    // ------------------------------------------------------------
    // 9. Image protection
    // ------------------------------------------------------------

    const protectImages = () => {
      const images = document.querySelectorAll("img");

      images.forEach((img) => {
        img.setAttribute("draggable", "false");

        img.style.webkitUserDrag = "none";
        img.style.userSelect = "none";
        img.style.webkitUserSelect = "none";
        img.style.pointerEvents =
          img.closest("a, button") ? "" : "none";
      });

      return images;
    };

    // Initial image protection
    let images = protectImages();

    // ------------------------------------------------------------
    // 10. Observe dynamically loaded images
    // ------------------------------------------------------------

    const observer = new MutationObserver(() => {
      images = protectImages();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // ------------------------------------------------------------
    // 11. Add protection CSS
    // ------------------------------------------------------------

    const style = document.createElement("style");

    style.setAttribute(
      "data-security-features",
      "ui-protection"
    );

    style.textContent = `
      /*
       * ==========================================================
       * Protected UI
       * ==========================================================
       */

      body {
        -webkit-touch-callout: none;
      }

      /*
       * Prevent normal text selection across the application.
       * Editable elements are restored below.
       */

      body * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        -webkit-touch-callout: none;
      }

      /*
       * Keep editable fields fully usable.
       */

      input,
      textarea,
      select,
      [contenteditable="true"] {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;

        -webkit-touch-callout: default;
      }

      /*
       * Buttons and links remain interactive.
       */

      button,
      a,
      input,
      textarea,
      select {
        -webkit-user-drag: none;
      }

      /*
       * Images cannot normally be dragged.
       */

      img {
        -webkit-user-drag: none;
        user-drag: none;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      /*
       * Prevent browser image highlighting.
       */

      img::selection {
        background: transparent;
      }

      img::-moz-selection {
        background: transparent;
      }

      /*
       * Explicitly allow scrolling.
       */

      html,
      body {
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
      }

      /*
       * Keep required interactive elements visually normal.
       */

      button,
      a,
      input,
      textarea,
      select {
        cursor: auto;
      }

      /*
       * Elements explicitly marked as selectable remain selectable.
       *
       * Example:
       * className="allow-selection"
       */

      .allow-selection,
      .allow-selection * {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }

      /*
       * Elements explicitly marked as draggable remain draggable.
       *
       * Example:
       * data-allow-drag="true"
       */

      [data-allow-drag="true"],
      [data-allow-drag="true"] * {
        -webkit-user-drag: auto !important;
        user-drag: auto !important;
      }

      /*
       * Explicitly protected content.
       */

      .protected-content,
      .protected-content * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;

        -webkit-user-drag: none !important;
        user-drag: none !important;
      }

      /*
       * Restore interaction for editable controls inside
       * protected containers.
       */

      .protected-content input,
      .protected-content textarea,
      .protected-content select,
      .protected-content [contenteditable="true"] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;

        pointer-events: auto !important;
      }
    `;

    document.head.appendChild(style);

    // ------------------------------------------------------------
    // 12. Attach event listeners
    // ------------------------------------------------------------

    document.addEventListener(
      "selectstart",
      handleSelectStart,
      true
    );

    document.addEventListener(
      "copy",
      handleCopy,
      true
    );

    document.addEventListener(
      "cut",
      handleCut,
      true
    );

    document.addEventListener(
      "contextmenu",
      handleContextMenu,
      true
    );

    document.addEventListener(
      "dragstart",
      handleDragStart,
      true
    );

    document.addEventListener(
      "drag",
      handleDrag,
      true
    );

    document.addEventListener(
      "drop",
      handleDrop,
      true
    );

    document.addEventListener(
      "dblclick",
      handleDoubleClick,
      true
    );

    document.addEventListener(
      "keydown",
      handleKeyDown,
      true
    );

    // ------------------------------------------------------------
    // 13. Cleanup
    // ------------------------------------------------------------

    return () => {
      document.removeEventListener(
        "selectstart",
        handleSelectStart,
        true
      );

      document.removeEventListener(
        "copy",
        handleCopy,
        true
      );

      document.removeEventListener(
        "cut",
        handleCut,
        true
      );

      document.removeEventListener(
        "contextmenu",
        handleContextMenu,
        true
      );

      document.removeEventListener(
        "dragstart",
        handleDragStart,
        true
      );

      document.removeEventListener(
        "drag",
        handleDrag,
        true
      );

      document.removeEventListener(
        "drop",
        handleDrop,
        true
      );

      document.removeEventListener(
        "dblclick",
        handleDoubleClick,
        true
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
        true
      );

      observer.disconnect();

      if (
        style &&
        document.head.contains(style)
      ) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default SecurityFeatures;