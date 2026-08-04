import React, { useState, useRef, useEffect } from 'react';

/**
 * ClickedPhoto Component
 * 
 * Interacts with the user's device camera via the MediaDevices API.
 * Allows the user to open a live video feed, capture a still frame onto an offscreen canvas,
 * and preview the resulting image before submitting it for facial analysis.
 */
export default function ClickedPhoto() {
  // State flags to manage the camera lifecycle and the resulting photo
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  
  // Refs to directly manipulate the DOM elements for the video stream and image extraction
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  /**
   * Requests permission to use the camera and attaches the media stream to the video element.
   */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraOpen(true);
      setPhoto(null); // Clear any previous photo
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      alert("Camera access denied or not available. Please allow camera access in your browser settings.");
    }
  };

  /**
   * Shuts down the camera hardware by stopping all active media tracks on the stream.
   */
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      // Loop through all tracks (e.g. video/audio) and stop them to turn off the camera light
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  /**
   * Captures the current frame from the live video feed.
   * Draws the frame onto a hidden canvas and exports it as a base64 encoded PNG.
   */
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Sync canvas dimensions with video feed resolution
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      // Render the current video frame onto the canvas context
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert the canvas graphic to a usable data URL
      const dataUrl = canvas.toDataURL('image/png');
      setPhoto(dataUrl);
      
      // Stop the camera immediately after capture to save resources
      stopCamera();
    }
  };

  /**
   * Cleanup effect: ensures the camera is properly shut down if the user navigates away
   * while the component is still mounted and streaming.
   */
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-slate-200 mt-6 flex flex-col items-center justify-center animate-fade-in transition-all min-h-[300px]">
      
      {/* State 1: Camera is not open and no photo exists (Show Start Screen) */}
      {!isCameraOpen && !photo ? (
        <>
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Capture Photo</h3>
          <p className="text-slate-500 mb-6 text-center max-w-md">Use your device's camera to take a new photo for immediate recognition.</p>
          <button onClick={startCamera} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-full transition-colors shadow-sm">
            Open Camera
          </button>
        </>
      ) : isCameraOpen ? (
        
        /* State 2: Camera is actively streaming (Show Viewfinder) */
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-md rounded-xl overflow-hidden bg-black shadow-lg mb-6">
            {/* Live Video Feed attached to videoRef */}
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto object-cover max-h-[400px]"></video>
            
            {/* Overlay Shutter Button */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <button onClick={capturePhoto} className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full border-4 border-white flex items-center justify-center hover:bg-white/50 transition-colors">
                <div className="w-10 h-10 bg-white rounded-full shadow-inner"></div>
              </button>
            </div>
          </div>
          <button onClick={stopCamera} className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full transition-colors">
            Cancel
          </button>
          
          {/* Hidden canvas used purely for drawing and extracting the image frame */}
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      ) : (
        
        /* State 3: Photo captured successfully (Show Preview & Action Buttons) */
        <div className="w-full flex flex-col items-center">
          <img src={photo} alt="Captured preview" className="max-h-64 object-contain rounded-lg shadow-md mb-6" />
          <div className="flex gap-4">
            <button onClick={() => setPhoto(null)} className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full transition-colors">
              Retake
            </button>
            <button className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition-colors shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Analyze Face
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
