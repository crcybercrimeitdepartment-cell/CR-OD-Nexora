import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import WebCamSetting from '../page/PlatformSettings/WebCamSetting';
import { addModuleSession } from '../page/PlatformSettings/indexedDB';

const defaultActivityTracker = {
  cameraRef: { current: null },
  isCameraActive: false,
  trackLocation: () => {},
  stopMainSession: () => {},
  logClick: () => {}
};

const ActivityTrackerContext = createContext(defaultActivityTracker);

export const useActivityTracker = () => {
  const context = useContext(ActivityTrackerContext);
  return context || defaultActivityTracker;
};

export const ActivityTrackerProvider = ({ children }) => {
  const cameraRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const currentMainSessionRef = useRef(null);
  const currentSubSessionRef = useRef(null);

  const stopSubSession = async () => {
    const session = currentSubSessionRef.current;
    if (!session) return;
    currentSubSessionRef.current = null;
    if (!session.startTime) return;
    const stopTime = new Date().toISOString();
    const duration = Math.max(0, new Date(stopTime).getTime() - new Date(session.startTime).getTime());
    try {
      await addModuleSession({ ...session, stopTime, duration, status: 'Completed' });
    } catch (e) { console.error(e); }
  };

  const stopMainSession = async () => {
    const session = currentMainSessionRef.current;
    if (!session) return;
    currentMainSessionRef.current = null;
    await stopSubSession(); // Stop any active child first
    if (!session.startTime) return;
    const stopTime = new Date().toISOString();
    const duration = Math.max(0, new Date(stopTime).getTime() - new Date(session.startTime).getTime());
    try {
      await addModuleSession({ ...session, stopTime, duration, status: 'Completed' });
    } catch (e) { console.error(e); }
  };

  const trackLocation = async (pageId, subPageId = null) => {
    const currentPage = currentMainSessionRef.current?.moduleName;
    const currentSub = currentSubSessionRef.current?.moduleName;
    
    // If the main page changed, stop everything and start a new main session
    if (currentPage !== pageId) {
      await stopMainSession();
      
      let image = null;
      if (cameraRef.current && isCameraActive) {
        image = await cameraRef.current.captureImage();
      }

      currentMainSessionRef.current = {
        id: crypto.randomUUID(),
        moduleName: pageId || 'Home Dashboard',
        type: 'main',
        mainSessionId: null,
        startTime: new Date().toISOString(),
        image,
        sessionClicks: []
      };
    }

    // If there is a subpage, and it changed (or didn't exist before)
    if (subPageId && currentSub !== subPageId) {
      await stopSubSession();
      
      let image = null;
      if (cameraRef.current && isCameraActive) {
        image = await cameraRef.current.captureImage();
      }

      currentSubSessionRef.current = {
        id: crypto.randomUUID(),
        moduleName: subPageId,
        type: 'sub',
        mainSessionId: currentMainSessionRef.current?.id, // Link to parent!
        startTime: new Date().toISOString(),
        image,
        sessionClicks: []
      };
    } else if (!subPageId && currentSub) {
      // User navigated back to the main page from a subpage
      await stopSubSession();
    }
  };

  const logClick = async () => {
    // Log click to the most specific active session (sub if exists, otherwise main)
    const session = currentSubSessionRef.current || currentMainSessionRef.current;
    if (!session || !isCameraActive || !cameraRef.current) return;
    
    const image = await cameraRef.current.captureImage();
    if (image) {
      session.sessionClicks.push({
        timestamp: new Date().toISOString(),
        image
      });
    }
  };


  // Add click listener to document to track random user clicks during an active session
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Don't track every single click to avoid lag, maybe throttle it.
      // But for demo, let's track clicks if they are on buttons/links
      if (e.target.closest('button') || e.target.closest('a')) {
         logClick();
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isCameraActive]);

  return (
    <ActivityTrackerContext.Provider value={{ cameraRef, isCameraActive, trackLocation, stopMainSession, logClick }}>
      <WebCamSetting ref={cameraRef} onCameraStateChange={setIsCameraActive} />
      {children}
    </ActivityTrackerContext.Provider>
  );
};
