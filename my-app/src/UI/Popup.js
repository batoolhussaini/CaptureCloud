import React, { useState, useRef } from 'react';
import star from '../Assets/Icons/Star 2.png';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';

function Popup({ isOpen, handleClose, image }) {
  const [tags, setTags] = useState('');
  const [caption, setCaption] = useState('');
  const imageRef = useRef(null);  // Ref to hold the image element

  // Example function handlers for Save and Delete buttons
  const handleSave = () => {
    console.log("Saving data with Tags:", tags, "and Caption:", caption);
  };

  const handleDelete = () => {
    console.log("Deleting data");
  };

  const handleFullScreen = () => {
    if (imageRef.current) {
      if (imageRef.current.requestFullscreen) {
        imageRef.current.requestFullscreen();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute -right-5 -top-2 text-3xl text-white transform translate-x-full"
          title="Close"
        >
          &times;
        </button>
        <div className="flex justify-center relative">
          <img 
            ref={imageRef}
            src={image ? URL.createObjectURL(image) : ''} 
            alt="Current" 
            className="max-w-full max-h-[50vh] object-contain my-4"
          />
          <button 
            onClick={handleFullScreen}
            className="absolute top-2 right-2 h-6 w-6"
            title="Full Screen"
          >
            <img src={fullScreenIcon} alt="Full Screen" />
          </button>
        </div>
        <div>
          <div className="flex items-center">
            <label htmlFor="Tags" className="mr-4 text-sm font-medium">Tags:</label>
            <input
              type="text"
              id="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="flex-1 px-3 py-2 border-2 border-[#6AABD2] rounded-3xl shadow-lg focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Add tags..."
            />
          </div>
          <div className="mt-2">
            <img src={star} alt="Icon" className="w-6 h-6 ml-2" />
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="flex-1 px-3 py-2 border-2 border-[#6AABD2] rounded-3xl shadow-lg focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Add caption. 60 characters max..."
              maxLength="60"
            />
          </div>
          <div className="flex justify-center space-x-32 mt-4">
            <button 
              onClick={handleSave}
              className="text-black rounded-3xl shadow-md bg-[#B1DEA5] hover:bg-[#8CBF7B] transition-color w-32 h-10"
            >
              Save
            </button>
            <button 
              onClick={handleDelete}
              className="bg-[#FF6666] hover:bg-[#e64a19] text-black rounded-3xl shadow-md transition-color w-32 h-10"
            >
              Delete Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
