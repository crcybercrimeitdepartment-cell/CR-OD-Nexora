import React, { useState } from 'react';

/**
 * UploadImage Component
 * 
 * Provides an interface for users to upload an image file from their device.
 * It handles the file selection and generates a local blob URL to preview
 * the uploaded image before it is submitted for facial recognition analysis.
 */
export default function UploadImage() {
  // State to hold the temporary local URL of the selected image for preview
  const [image, setImage] = useState(null);

  /**
   * Event handler for the file input.
   * Extracts the selected file and creates an object URL for preview rendering.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the file input.
   */
  const handleFileChange = (e) => {
    // Ensure a file was actually selected before attempting to process
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-slate-200 mt-6 flex flex-col items-center justify-center animate-fade-in transition-all">
      {/* Conditional Rendering: Show upload UI if no image is selected yet */}
      {!image ? (
        <>
          {/* Default Upload Icon */}
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-2">Upload Image</h3>
          <p className="text-slate-500 mb-6 text-center max-w-md">Select an image from your device to perform facial recognition analysis.</p>
          
          {/* Hidden File Input mapped to a styled label button */}
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-full transition-colors shadow-sm">
            Browse Files
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </>
      ) : (
        /* Conditional Rendering: Show image preview and action buttons once uploaded */
        <div className="w-full flex flex-col items-center">
          {/* Image Preview */}
          <img src={image} alt="Uploaded preview" className="max-h-64 object-contain rounded-lg shadow-md mb-6" />
          
          {/* Action Buttons: Remove & Analyze */}
          <div className="flex gap-4">
            <button onClick={() => setImage(null)} className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full transition-colors">
              Remove
            </button>
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              Analyze Face
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
