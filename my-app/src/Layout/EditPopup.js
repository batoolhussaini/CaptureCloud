import React, { useState } from 'react';
import InfoIcon from '../Assets/Icons/Info icon.png';

function EditPopup({ image, onClose, onSave, onDelete }) {
  const [caption, setCaption] = useState(image.caption || '');
  const [tags, setTags] = useState(image.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isStarred, setIsStarred] = useState(image.isStarred || false);
  const [showExitWarning, setShowExitWarning] = useState(false);

  
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSave = () => {
    const updatedDetails = {
      caption, isStarred, tags
    };
    onSave(updatedDetails); // Pass updated details to parent
  };

  const handleExitWithoutSaving = () => {
    setShowExitWarning(false);
    onClose();
  }

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center">
      <div className="bg-white p-6 rounded-lg w-100 shadow-lg relative w-full max-w-lg sm:w-100 sm:p-8">
        {/* Close Button */}
        <button
          onClick={() => setShowExitWarning(true)}
          className="absolute text-3xl top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        {/* Exit Warning Dialog */}
        {showExitWarning && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            
              <h2 className="text-lg font-bold mb-4 flex items-center justify-center gap-3">
              <img src={InfoIcon} className="w-10 h-10" alt="Info Icon" />
                Exit Edit Screen?
              </h2>
              <p className="text-gray-700 mb-4">
                Are you sure you want to exit?<br />
                Edits will not be saved.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowExitWarning(false)} // Resume editing
                  className="bg-[#BDD9E2] px-4 py-2 rounded-full font-medium"
                >
                  Resume Edit
                </button>
                <button
                  onClick={handleExitWithoutSaving} // Exit without saving
                  className="bg-red-500 px-4 py-2 rounded-full text-white font-medium"
                >
                  Exit Edit
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Image Preview */}
        <img
          src={image.url}
          alt="Edit Image"
          className="w-full rounded-lg mb-5"
        />
        {/* Star Image */}
        <div className="mb-2">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className={`text-3xl ${isStarred ? 'text-text-c' : 'text-gray-400'}`}
          >
            &#9733; {/* Star icon */}
          </button>
        </div>

        {/* Tags and Caption Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Edit Caption
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border-2 text-gray-500 italic text-c rounded-full p-1 border-text-c"
            placeholder="Enter a caption, 60 characters max"
          />
        </div>

        {/* Tags Input */}
        <div className="flex items-center mb-4">
          <input
            className="w-full border-2 text-gray-500 italic text-c rounded-full p-1 border-text-c"
            placeholder="Add tags..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            onClick={handleAddTag}
            className="text-l ml-1 bg-text-c font-medium text-white px-3 py-1.5 rounded-full"
          >
            Add
          </button>
        </div>

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
                className="ml-1 text-purple-600"
              >
                &times;
              </button>
            </span>
          ))}
        </div>



        {/* Save and Delete Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="bg-[#BDD9E2] px-4 py-2 rounded-full font-medium"
          >
            Save Edits
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 px-4 py-2 rounded-full text-white font-medium"
          >
            Delete Photo
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
