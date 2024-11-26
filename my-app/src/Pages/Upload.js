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
import { usePhotoContext } from './PhotoContext.js';

function Upload() {
  useEffect(() => {
    document.title = 'Upload to Home';
  });

  const [images, setImages] = useState([]);
  const [imageMetadata, setImageMetadata] = useState({}); // Store metadata for each image
  const [dragOver, setDragOver] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

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
      fileArray.forEach(file => {
        setImageMetadata(prevMetadata => ({
          ...prevMetadata,
          [file.name]: { tags: [], caption: '', isStarClicked: false }
        }));
      });
    }
  };

  const handleImageDelete = (imageToDelete) => {
    setImages(images.filter(image => image !== imageToDelete));
    setImageMetadata(prevMetadata => {
      const updatedMetadata = { ...prevMetadata };
      delete updatedMetadata[imageToDelete.name];
      return updatedMetadata;
    });
    setIsPopupOpen(false);
  };

  const handleSaveMetadata = (image, metadata) => {
    setImageMetadata(prevMetadata => ({
      ...prevMetadata,
      [image.name]: metadata
    }));
    setIsPopupOpen(false);
  };

  const togglePopup = (image) => {
    setCurrentImage(image);
    setIsPopupOpen(!isPopupOpen);
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
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} 
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); handleImageChange(e.dataTransfer.files); setDragOver(false); }}>
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
          <div key={index} className="relative w-48 h-40">
              <img 
                src={URL.createObjectURL(image)} 
                alt={`Uploaded ${index + 1}`} 
                className={`w-full h-full object-cover rounded-2xl shadow-lg`}    
              />
              <button 
                onClick={() => togglePopup(image)} 
                className="absolute top-0 -right-10 bg-white p-2 rounded-full hover:bg-gray-200"
              >
                <img src={editIcon} alt="Edit Icon" className="h-5 w-5"/>
              </button>
          </div>
        ))}
      </div>

      <Popup 
        isOpen={isPopupOpen} 
        handleClose={() => togglePopup(null)} 
        image={currentImage} 
        metadata={currentImage ? imageMetadata[currentImage.name] : null}
        onDelete={handleImageDelete}
        onSave={handleSaveMetadata}
      />
    </div>
  );
}

export default Upload;
