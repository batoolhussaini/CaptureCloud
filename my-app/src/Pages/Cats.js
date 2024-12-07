import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import folderIcon from '../Assets/Icons/Folder_blue.png';
import photoIcon from '../Assets/Icons/Photo symbol.png';
import infoIcon from '../Assets/Icons/Info icon.png';
import editIcon from '../Assets/Icons/Edit pencil.png';
import leftArrowIcon from '../Assets/Icons/Arrow left.png';
import Button from '../UI/button';
import uploadIcon from '../Assets/Icons/Upload.png';
import ARpopup from '../UI/ARpopup';

function Cats() {
  const [photos, setPhotos] = useState([]);
  const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const maxImagesPerUpload = 10;

  const handleUploadBackArrowClick = () => {
    navigate('/albums');
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));

      if (invalidFiles.length > 0) {
        alert('Please upload only image files.');
        return;
      }

      if (fileArray.length > maxImagesPerUpload) {
        alert(`You can only upload a maximum of ${maxImagesPerUpload} photos at a time.`);
        return;
      }

      setPhotos((prevPhotos) => [...prevPhotos, ...fileArray]);
    }
  };

  const handleEditAlbumName = () => {
    setIsRenamePopupOpen(true);
  };

  const handleRenameConfirm = (newName) => {
    console.log(`Album renamed to: ${newName}`); 
    setIsRenamePopupOpen(false);
  };

  const handleRenameClose = () => {
    setIsRenamePopupOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Albums</h1>

      <div className="flex items-center mt-6 ml-40"> 
        <div className="fixed left-[190px] top-20"> 
          <img
            src={leftArrowIcon}
            alt="Back"
            className="w-8 h-8 mt-5 cursor-pointer"
            title="Back to Albums"
            onClick={handleUploadBackArrowClick}
          />
        </div>
        <div className="flex items-center ml-[40px]"> 
          <img src={folderIcon} alt="Folder Icon" className="w-8 h-8" />
          <h2 className="text-2xl text-[#6AABD2] ml-6">Cats</h2> 
          <button className="ml-3" onClick={handleEditAlbumName}>
            <img
              src={editIcon}
              alt="Edit Icon"
              className="w-4 h-5 mt-0 cursor-pointer"
              title="Rename album"
            />
          </button>
        </div>
      </div>

      {photos.length === 0 && (
        <div className="flex flex-col items-center mt-20">
          <div className="border-2 border-dashed border-black rounded-2xl w-[33rem] h-56 flex flex-col items-center justify-center bg-[#F5F5F5] ml-10"> 
            <img src={photoIcon} alt="Empty Folder Icon" className="h-20 w-20" />
            <div className="flex items-center space-x-2">
              <p className="text-black text-lg mt-4">Drag and drop, or</p>
              <label
                htmlFor="fileInput"
                className="font-bold text-[#069DFA] hover:underline cursor-pointer text-lg mt-4"
              >
                select
              </label>
              <input
                id="fileInput"
                type="file"
                name="image"
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                ref={fileInputRef}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <img src={infoIcon} alt="Information Icon" className="h-5 w-5" />
              <p className="text-black-500 text-sm">{maxImagesPerUpload} photos per upload max</p>
            </div>
          </div>
        </div>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-4 gap-4 p-6 mt-10">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Cat Photo ${index + 1}`}
                className="h-[200px] w-[200px] object-cover rounded-md shadow-md"
              />
            </div>
          ))}
        </div>
      )}

      {isRenamePopupOpen && (
        <ARpopup onConfirm={handleRenameConfirm} onClose={handleRenameClose} />
      )}
    </div>
  );
}

export default Cats;
