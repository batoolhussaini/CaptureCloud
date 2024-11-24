import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import photoIcon from '../Assets/Icons/Photo symbol.png';
import infoIcon from '../Assets/Icons/Info icon.png';
import editIcon from '../Assets/Icons/Edit pencil.png';
import uploadIcon from '../Assets/Icons/Upload.png';
import Button from '../UI/button.js';
import Popup from '../UI/Popup.js'; 
import Confirmation from '../UI/Confirmation.js';
import Validation from '../UI/Validation.js';
import { usePhotoContext } from './PhotoContext';

function Upload() {
  useEffect(() => {
    document.title = 'Upload to Home';
  });

  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [currentImage, setCurrentImage] = useState(null);

  const { addPhotos } = usePhotoContext();
  
  const maxImages = 10;
  const navigate = useNavigate();

  const handleImageChange = (files) => {
    if (files) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));

      if (invalidFiles.length > 0) {
        alert("Please upload only image files.");
        return;
      }
      if (images.length + fileArray.length > maxImages) {
        alert(`You can only upload a maximum of ${maxImages} images.`);
        return;
      }
      setImages((prevImages) => [...prevImages, ...fileArray]);
    }
  };

  const handleRemoveAll = () => {
    if (images.length > 0) {
      setIsValidationOpen(true); 
    }
  };

  const confirmRemoveAll = () => {
    setImages([]);
    setIsValidationOpen(false); 
  };

  // Handles moving photos to Home page
  const handleUpload = () => {  
    setTimeout(() => {
      addPhotos(images);
      setImages([]);
      navigate('/home');
    }, 1000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleImageChange(files);
    setDragOver(false);
  };

  const togglePopup = (image) => {
    setCurrentImage(image);
    setIsPopupOpen(!isPopupOpen);
  };

  const handleCloseValidation = () => {
    setIsValidationOpen(false);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    setImages([]);
    navigate('/home');
  };


  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>

      <h1 className="text-4xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Upload to Home</h1>  
      <div className="flex-grow flex items-center justify-center ml-32">
        <div 
          className={`border-2 ${dragOver ? 'border-[#069DFA]' : 'border-black'} border-dashed rounded-2xl w-[33rem] h-56 flex flex-col items-center justify-center mt-6 bg-[#F5F5F5]`}
          onDragOver={handleDragOver} 
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          <img src={photoIcon} alt="Photo Icon" className="h-20 w-20" />
          <div className="flex items-center space-x-2">
            <p className="text-black text-lg mt-4">
                Drag and drop, or  
            </p>
            <label htmlFor="fileInput" className="font-bold text-[#069DFA] hover:underline cursor-pointer text-lg mt-4">
              select
            </label>
            <input id="fileInput" type="file" name="image" className="hidden" onChange={(e) => handleImageChange(e.target.files)} multiple accept="image/*"/>
          </div>
          <div className="flex items-center space-x-2">
            <img src={infoIcon} alt="Information Icon" className="h-5 w-5"/>
            <p className="text-black-500 text-sm">
              {maxImages} photos max
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-4 gap-16 ml-[240px] mr-[70px] gap-y-12 mb-20">
        {images.map((image, index) => (
          <div key={index} className="relative grid grid-cols-6 gap-2">
            
            <div className="col-span-5">
              <img 
                src={URL.createObjectURL(image)} 
                alt={`Uploaded ${index + 1}`} 
                className={`h-40 w-48 object-cover rounded-2xl shadow-lg`}
                    style={{
                      marginLeft: '-1px',
                    }}
              />
            </div>

            <div className="col-span-1 absolute right-7 flex justify-center items-start">
              <button 
                onClick={() => togglePopup(image)} 
                className="text-black bg-white p-2 rounded-full hover:bg-gray-200"
              >
                <img src={editIcon} alt="Edit Icon" className="h-5 w-5"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length > 0 && (
        <button onClick={handleRemoveAll} className="fixed bottom-8 left-[12rem] text-red-600 text-l underline hover:font-medium mr-6">
          Remove All
        </button>
      )}
      
      {images.length > 0 && (
        <Button 
          color="bg-[#CEECF5] hover:bg-[#B6D8E7]" 
          icon={uploadIcon} 
          children="Upload" 
          className="fixed bottom-8 right-10"
          onClick={handleUpload}
        />
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="relative rounded bg-[#6AABD2] w-3/4 h-6">
            <div
              className="bg-[#1E5F99] h-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="absolute text-white font-semibold">
            Uploading... {uploadProgress}%
          </div>
        </div>
        )}

      <Popup isOpen={isPopupOpen} handleClose={() => togglePopup(null)} image={currentImage}>
        <img 
          src={currentImage ? URL.createObjectURL(currentImage) : ''} 
          alt="Current" 
          className=""
        />
      </Popup>

      {isConfirmationOpen && (
        <Confirmation 
          message="Photo(s) Successfully Uploaded" 
          onConfirm={handleConfirmationClose}
        />
      )}

      {isValidationOpen && (
        <Validation 
          title="Remove All Photos?"
          message="Are you sure you want to remove all photos on this page? The photos will be permanently removed."
          onRed={confirmRemoveAll}
          button1Text="Resume Upload"
          button2Text="Remove"
          onBlue={handleCloseValidation}
        />
      )}
    </div>
  );
}

export default Upload;
