/**
 * @file main.jsx
 * @description Application entry point for Nexora Intelligence Platform.
 * Bootstraps the React app by mounting the root <App /> component
 * into the DOM element with id="root" defined in index.html.
 *
 * React.StrictMode is enabled to surface potential issues
 * during development (double-invoked effects, deprecated APIs, etc.).
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'     // Global Tailwind CSS + custom animation styles
import App from './App.jsx' // Root application component
import './i18n'          // i18n configuration for translations

// Mount the React component tree into the HTML root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
