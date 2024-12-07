import React, { useState, useRef } from 'react';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';
import exitFullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';

import i from '../Assets/Icons/i.png';
import Validation from './Validation';
import FullScreen from './FullScreenView';
import albumsIcon from '../Assets/Icons/folder_filled.png';
import locationIcon from '../Assets/Icons/Globe.png';
import plusButton from '../Assets/Photos/plus.png';


function EditPopup({ image, onClose, onSave, onDelete }) {
  const [caption, setCaption] = useState(image.caption || '');
  const [tags, setTags] = useState(image.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isStarred, setIsStarred] = useState(image.isStarred || false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(image.album || '');
  const [tagErrorMessage, setTagErrorMessage] = useState('');
  const [captionErrorMessage, setCaptionErrorMessage] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const imageRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(image.location || '');

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
      setTagErrorMessage(''); // Clear error message when a valid tag is added
    } else if (tags.includes(newTag)) {
      setTagErrorMessage('Tag already exists.');
    } else {
      setTagErrorMessage('Please write a tag before adding.');
    }
  };

  const handleCaptionChange = (e) => {
    const newCaption = e.target.value;
    if (newCaption.length > 60) {
      setCaptionErrorMessage('Caption cannot exceed 60 characters.');
    } else {
      setCaptionErrorMessage(''); // Clear the error message if valid
      setCaption(newCaption);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    const updatedDetails = {
      caption, isStarred, tags, 
      album: selectedAlbum,
      location: selectedLocation
    };
    onSave(updatedDetails);
  };

  const handleExitWithoutSaving = () => {
    setShowExitWarning(false);
    onClose();
  };

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };

  const handleExitFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowExitWarning(true)}
          className="absolute -right-5 -top-2 text-3xl text-white transform translate-x-full"
          title = "Close"
        >
          &times;
        </button>
        {/* Exit Warning Dialog */}
        {showExitWarning && (
          <Validation
            title="Exit Edit Screen?"
            message="Are you sure you want to exit? Edits will not be saved."
            onBlue={() => setShowExitWarning(false)} // Resume editing
            onRed={handleExitWithoutSaving} // Exit without saving
            button1Text="Resume Edit"
            button2Text="Exit"
          />
        )}

        {/* Image Preview */}
        <div className="flex justify-center relative">
          <img
            ref={imageRef}
            src={typeof image === "string" ? image : image.url} 
            alt="Edit Image"
            className="max-w-full max-h-[50vh] object-contain my-4"
          />
          <button onClick={handleFullScreen} className="absolute top-2 right-2 h-6 w-6" title="Full Screen">
            <img src={fullScreenIcon} alt="Full Screen" />
          </button>
        </div>

        {/* Full Screen Popup */}
        {isFullScreen && (
          <FullScreen
            img={image}
            onClose={() => handleExitFullScreen()}
          />
        )}

        {/* Star Image */}
        <div className="mb-2 flex items-center justify-between">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className={`text-4xl ${isStarred ? 'text-text-c' : 'text-gray-400'}`}
          >
            &#9733; {/* Star icon */}
          </button>
        </div>

        {/* Caption and Album Input */} 
        <div className="mb-4 flex items-center justify-between space-x-4">
          {/* Edit Caption */}
          <div className="flex flex-col">
            <label htmlFor="caption" className="block text-gray-700 font-medium">
              Edit Caption
            </label>
            <input
              id="caption"
              type="text"
              value={caption}
              onChange={handleCaptionChange}
              className="w-[500px] border-2 text-gray-500 italic text-c rounded-full p-1 border-text-c"
              placeholder="Enter a caption, 60 characters max"
            />

          {/* Display Error Message */}
          {captionErrorMessage && (
          <div className="text-red-500 text-center mt-4">{captionErrorMessage}</div>
        )}
          </div>

  {/* Album Selection */}
  <div className="flex items-center -mb-4 space-x-2">
    <img
      src={albumsIcon}
      alt="albums"
      className="h-8 w-8"
    />
    <label htmlFor="albums" className="text-gray-700 font-medium">
      Album
    </label>
    <select
      id="albums"
      value={selectedAlbum}
      onChange={(e) => setSelectedAlbum(e.target.value)}
      className="border-2 text-gray-500 italic rounded-full px-4 py-2 border-text-c"
    >
      <option value="" disabled selected>
        Select an Album
      </option>
      <option value="Flowers">Flowers</option>
      <option value="Cats">Cats</option>
    </select>
  </div>
</div>

<div className="mb-4 flex items-center justify-between space-x-4">
        {/* Tags Input */}
        <div className="">
        <label className="block text-gray-700 font-medium">
          Add Tags
        </label>
        <div className="flex items-center mb-4">
          <input
            className="w-[490px] border-2 text-gray-500 italic text-c rounded-full p-1 border-text-c"
            placeholder="Add tags..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
        <img
          src={plusButton}
          onClick={handleAddTag}
          alt="Add Tag"
          title = "Add Tag"
          className="cursor-pointer m-1 bg-text-c p-1 rounded-full w-9 h-9"
        />
        </div>

        {/* Display Error Message */}
          {tagErrorMessage && (
          <div className="text-red-500 text-center mt-4">{tagErrorMessage}</div>
        )}

        {/* Tags List */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blueButton-c text-blue-800 px-2 py-1 rounded-lg flex items-center"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                title = "Remove tag"
                className="ml-1 text-black"
              >
                &times;
              </button>
            </span>
          ))}
          </div>
        </div>

        {/* Location Label and Dropdown */}
          <form className="max-w-sm flex items-center space-x-2 -mt-8">
          <img src={locationIcon} alt="Albums" className="ml-5"style={{ height: '3vh', width: '3vh' }} />
            <label htmlFor="location" className="text-gray-700 font-medium mt-1">
              Location
            </label>
            <select
              id="location"
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border-2 text-gray-500 italic rounded-full px-3 py-2 border-text-c"
            >
              <option value="" disabled selected>
                Select Location
              </option>
              <option value="Ontario, Canada">Ontario, Canada </option>
              <option value="Paris, France">Paris, France </option>
              <option value="Giza, Egypt">Giza, Egypt </option>
              <option value="Seoul, South Korea">Seoul, South Korea </option>
              <option value="Banff, Canada">Banff, Canada </option>
            </select>
          </form>
    </div>
        {/* Save and Delete Buttons */}
        <div className="flex justify-center space-x-32 mt-8">
          <button
            onClick={handleSave}
            className="text-black rounded-3xl shadow-md bg-[#B1DEA5] hover:bg-[#8CBF7B] transition-color w-32 h-10"
          >
            Save Edits
          </button>
          <button
            onClick={() => setShowValidation(true)}
            className="bg-[#FF6666] hover:bg-[#e64a19] text-black rounded-3xl shadow-md transition-color w-32 h-10"
          >
            Delete Photo
          </button>
        </div>
      </div>
      {showValidation && (
        <Validation
          title="Delete Photo?"
          message="Are you sure you want to move this photo to trash?"
          onRed={() => {
            onDelete(image); 
            setShowValidation(false);
          }}
          onBlue={() => setShowValidation(false)}
          button1Text="Cancel"
          button2Text="Delete"
        />
      )}
    </div>
  );
}

export default EditPopup;