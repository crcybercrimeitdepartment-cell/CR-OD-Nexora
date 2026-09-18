/**
 * Single source of truth for Biometric Intelligence live capture cards and detail pages.
 * Content corresponds exactly to "NEXORA — CARD TITLE & DESCRIPTION RECOMMENDATIONS".
 */
export const BIOMETRIC_CAPTURE_CARDS = {
  capture_face: {
    id: "capture_face",
    title: "Capture Face",
    description:
      "Capture facial biometric information for identity verification and biometric intelligence workflows.",
    actionLabel: "Start Capture",
    themeColor: "blue",
  },
  capture_fingerprint: {
    id: "capture_fingerprint",
    title: "Capture Fingerprint",
    description:
      "Capture fingerprint biometric information for identity verification and biometric intelligence workflows.",
    actionLabel: "Start Capture",
    themeColor: "emerald",
  },
  capture_iris: {
    id: "capture_iris",
    title: "Capture Iris",
    description:
      "Capture iris biometric information for identity verification and biometric intelligence workflows.",
    actionLabel: "Start Capture",
    themeColor: "purple",
  },
  capture_voice: {
    id: "capture_voice",
    title: "Capture Voice",
    description:
      "Capture voice biometric information for identity verification and biometric intelligence workflows.",
    actionLabel: "Start Recording",
    themeColor: "orange",
  },
};

export const BIOMETRIC_CAPTURE_CARDS_LIST = Object.values(BIOMETRIC_CAPTURE_CARDS);
