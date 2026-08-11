import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { addCameraSession } from './indexedDB';

const WebCamSetting = forwardRef(({ onCameraStateChange }, ref) => {
  const [cameraActive, setCameraActive] = useState(false);
  const cameraStreamRef = useRef(null);
  const cameraStartTimeRef = useRef(null);

  const stopCameraStream = useCallback(() => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      cameraStreamRef.current = null;
    }
    cameraStartTimeRef.current = null;
    setCameraActive(false);
    if (onCameraStateChange) onCameraStateChange(false);
  }, [onCameraStateChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCameraStream();
  }, [stopCameraStream]);

  const toggleCamera = useCallback(async () => {
    // ── TURN OFF ──────────────────────────────────────────────────────────
    if (cameraActive && cameraStreamRef.current) {
      const stopTime = new Date().toISOString();
      const startTime = cameraStartTimeRef.current;
      const durationMs = startTime
        ? new Date(stopTime).getTime() - new Date(startTime).getTime()
        : 0;

      stopCameraStream();

      // Only save if we have a valid startTime
      if (startTime) {
        try {
          await addCameraSession({
            startTime,
            stopTime,
            duration: durationMs,
            status: 'Completed',
          });
        } catch (err) {
          console.error('Failed to save camera session:', err);
        }
      }
      return;
    }

    // ── TURN ON ───────────────────────────────────────────────────────────
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraStreamRef.current = stream;
      cameraStartTimeRef.current = new Date().toISOString();
      setCameraActive(true);
      if (onCameraStateChange) onCameraStateChange(true);
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err.name, err.message);
      stopCameraStream();
    }
  }, [cameraActive, stopCameraStream, onCameraStateChange]);

  const captureImage = useCallback(async () => {
    if (!cameraStreamRef.current) return null;
    try {
      const track = cameraStreamRef.current.getVideoTracks()[0];
      if (!track) return null;
      
      if (window.ImageCapture) {
        const imageCapture = new window.ImageCapture(track);
        const bitmap = await imageCapture.grabFrame();
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0);
        return canvas.toDataURL('image/jpeg', 0.5);
      }
      throw new Error("ImageCapture not supported");
    } catch (err) {
      // Fallback using video element
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.srcObject = cameraStreamRef.current;
        video.muted = true;
        video.playsInline = true;
        video.onloadedmetadata = () => {
          video.play().then(() => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.5));
          }).catch(() => resolve(null));
        };
        video.onerror = () => resolve(null);
      });
    }
  }, []);

  useImperativeHandle(ref, () => ({
    toggleCamera,
    isActive: cameraActive,
    captureImage
  }));

  // Renderless component handling pure camera/session logic
  return null;
});

export default WebCamSetting;
