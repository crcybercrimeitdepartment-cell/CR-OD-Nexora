import React, { useState, useRef, useEffect } from 'react';

/**
 * CaptureBiometrics Component
 * Dynamically renders the correct interface for capturing live biometric data:
 * - Opens the device camera for Face and Iris scans.
 * - Displays an animated scanner with progress bar for Fingerprints.
 * - Displays an animated audio recording interface for Voice.
 *
 * @param {Object} props
 * @param {string} props.featureType - The active feature (e.g., 'capture_face', 'capture_fingerprint')
 */
export default function CaptureBiometrics({ featureType }) {
  // State variables for controlling the capture lifecycle and UI
  const [isCapturing, setIsCapturing] = useState(false);
  const [photo, setPhoto] = useState(null); // Holds base64 image data or simulation placeholder string
  const [scanProgress, setScanProgress] = useState(0); // Progress (0-100) for fingerprint/voice simulation
  
  // DOM Refs for accessing the raw video feed and canvas for taking pictures
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null); // Ref for the simulation interval timer

  // Derive human-readable feature name for UI text (e.g., "Face", "Fingerprint")
  const featureName = featureType 
    ? featureType.replace('capture_', '').charAt(0).toUpperCase() + featureType.replace('capture_', '').slice(1)
    : 'Biometrics';

  // Boolean flags to determine which specific UI elements to render
  const isCameraType = featureType === 'capture_face' || featureType === 'capture_iris';
  const isFingerprint = featureType === 'capture_fingerprint';
  const isVoice = featureType === 'capture_voice';
  const isFace = featureType === 'capture_face';
  const isIris = featureType === 'capture_iris';

  /**
   * Initializes the capture process.
   * Requests media devices (camera) for face/iris, or starts progress simulation for fingerprint/voice.
   */
  const startCapture = async () => {
    setIsCapturing(true);
    setPhoto(null);
    setScanProgress(0);

    if (isCameraType) {
      try {
        // Request camera access and pipe the stream directly to the video element
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        alert("Camera access denied or not available. Please allow camera access in your browser settings.");
        setIsCapturing(false);
      }
    } else {
      // Simulate fingerprint scanning or voice recording by incrementing progress over time
      scanIntervalRef.current = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(scanIntervalRef.current);
            finishSimulation();
            return 100;
          }
          return prev + 5; // Increment by 5% every 100ms
        });
      }, 100);
    }
  };

  /**
   * Stops any ongoing capture process cleanly.
   * Stops the camera tracks or clears the simulation interval.
   */
  const stopCapture = () => {
    // Stop all media tracks to turn off the camera light
    if (isCameraType && videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    // Clear any active simulated scan timers
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    setIsCapturing(false);
    setScanProgress(0);
  };

  /**
   * Captures a still frame from the live video feed using an offscreen canvas.
   * Converts the frame to a base64 Data URL and saves it to state.
   */
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      // Draw current video frame onto canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png'); // Extract image data
      setPhoto(dataUrl);
      stopCapture(); // Turn off camera after successful capture
    }
  };

  /**
   * Finalizes the simulated scan for fingerprint/voice.
   * Sets a placeholder photo state to transition the UI to the "Success" screen.
   */
  const finishSimulation = () => {
    setPhoto(`simulate_${featureType}`);
    stopCapture();
  };

  // Cleanup effect: Ensure the camera/timers are turned off if the component unmounts or feature changes
  useEffect(() => {
    return () => stopCapture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureType]);

  /**
   * Renders the perfectly aligned dynamic SVG icon for the active biometric type.
   * Uses layered absolute/relative flex positioning to ensure corner brackets align flawlessly with inner icons.
   */
  const renderIcon = () => {
    if (isFace) {
      return (
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
          </svg>
          <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      );
    }
    if (isFingerprint) {
      return (
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
          </svg>
          <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        </div>
      );
    }
    if (isIris) {
      return (
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
          </svg>
          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      );
    }
    if (isVoice) {
      return (
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8v-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0h-2a2 2 0 01-2-2v-2" />
          </svg>
          <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
      );
    }
    return null;
  };

  /**
   * Retrieves the dynamic background color class based on the active feature.
   */
  const getBgColor = () => {
    if (isFace) return "bg-blue-50 border border-blue-100 shadow-sm";
    if (isFingerprint) return "bg-emerald-50 border border-emerald-100 shadow-sm";
    if (isIris) return "bg-purple-50 border border-purple-100 shadow-sm";
    if (isVoice) return "bg-orange-50 border border-orange-100 shadow-sm";
    return "bg-slate-50 border border-slate-200 shadow-sm";
  };

  return (
    <div className="w-full p-8 bg-white rounded-3xl shadow-sm border border-slate-200 mt-2 flex flex-col items-center justify-center animate-fade-in transition-all min-h-[400px]">
      
      {/* State 1: Idle (Not capturing, No photo taken) */}
      {!isCapturing && !photo ? (
        <>
          <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 ${getBgColor()}`}>
            {renderIcon()}
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Capture {featureName}</h3>
          <p className="text-slate-500 mb-8 text-center max-w-sm text-[15px]">
            {isCameraType && `Use your device's camera to securely capture your ${featureName.toLowerCase()}.`}
            {isFingerprint && "Place your finger securely on the scanner to verify your identity."}
            {isVoice && "Use your device's microphone to record a secure voice sample."}
          </p>
          {/* Start Capture Button */}
          <button onClick={startCapture} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-10 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-lg">
            {isCameraType ? "Open Camera" : isFingerprint ? "Start Scanner" : "Start Recording"}
          </button>
        </>
      ) : isCapturing && isCameraType ? (
        
        /* State 2a: Capturing using Device Camera (Face/Iris) */
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden bg-black shadow-lg mb-6 border-4 border-slate-100">
            {/* Live Camera Feed */}
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto object-cover max-h-[400px]"></video>
            
            {/* UI Overlays: Target Box / Face Outline */}
            <div className="absolute inset-0 border-2 border-blue-500/50 rounded-2xl pointer-events-none"></div>
            {featureType === 'capture_face' && (
              <div className="absolute inset-8 border-2 border-dashed border-white/50 rounded-[40%] pointer-events-none animate-pulse"></div>
            )}
            
            {/* Shutter Button */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <button onClick={capturePhoto} className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full border-4 border-white flex items-center justify-center hover:bg-white/50 transition-colors shadow-lg">
                <div className="w-12 h-12 bg-white rounded-full shadow-inner"></div>
              </button>
            </div>
          </div>
          
          <button onClick={stopCapture} className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
            Cancel
          </button>
          {/* Hidden Canvas used for capturing video frame to image */}
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      ) : isCapturing && !isCameraType ? (
        
        /* State 2b: Capturing using Simulated Hardware (Fingerprint/Voice) */
        <div className="w-full flex flex-col items-center">
          <div className="relative w-48 h-48 flex items-center justify-center mb-10 mt-4">
            
            {/* Animated Scanner UI */}
            <div className={`absolute inset-0 rounded-full border-4 ${isVoice ? 'border-orange-100' : 'border-emerald-100'}`}></div>
            <div className={`absolute inset-0 rounded-full border-4 ${isVoice ? 'border-orange-500' : 'border-emerald-500'} opacity-20 animate-ping`} style={{ animationDuration: '2s' }}></div>
            <div className={`absolute inset-4 rounded-full border-4 ${isVoice ? 'border-orange-500' : 'border-emerald-500'} opacity-40 animate-ping`} style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
            
            {/* Central Icon */}
            <div className="z-10">{renderIcon()}</div>
            
            {/* Progress Bar under Scanner */}
            <div className="absolute -bottom-10 w-full px-2">
               <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className={`h-full ${isVoice ? 'bg-orange-500' : 'bg-emerald-500'} transition-all duration-300`} style={{ width: `${scanProgress}%` }}></div>
               </div>
            </div>
          </div>
          
          <h4 className="text-xl font-bold text-slate-700 mb-8 mt-6">
            {isVoice ? "Listening..." : "Scanning..."} {scanProgress}%
          </h4>
          
          <button onClick={stopCapture} className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
            Cancel
          </button>
        </div>
      ) : (
        
        /* State 3: Capture Complete / Review Photo Screen */
        <div className="w-full flex flex-col items-center">
          <div className="mb-8 p-4 border-2 border-dashed border-slate-200 rounded-3xl shadow-sm bg-slate-50 min-w-[300px]">
            {/* If actual photo captured from camera, show it. Otherwise show success placeholder */}
            {photo && photo.startsWith('data:') ? (
              <img src={photo} alt="Captured biometric" className="max-h-64 object-contain rounded-2xl shadow-sm mx-auto" />
            ) : (
              <div className="w-full h-64 flex flex-col items-center justify-center text-green-500 gap-4">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-xl font-bold text-slate-700">{featureName} Captured Successfully</span>
              </div>
            )}
          </div>
          
          {/* Action Buttons: Retake & Verify */}
          <div className="flex gap-4">
            <button onClick={() => setPhoto(null)} className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
              Retake
            </button>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Verify {featureName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
