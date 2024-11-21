import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import Button from '../UI/button';
import checkIcon from '../Assets/Icons/white_check.png';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png'; 

function Trash() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSelectAllActive, setIsSelectAllActive] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null); 

  useEffect(() => {
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    setDeletedImages(trash);
  }, []);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
    setSelectedImages([]);
  };

  const handleImageSelect = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleSelectAll = () => {
    if (!isSelectAllActive) {
      setSelectedImages(deletedImages);
    } else {
      setSelectedImages([]);
    }
    setIsSelectAllActive(!isSelectAllActive);
  };

  const handleRestore = () => {
    const updatedTrash = deletedImages.filter(image => !selectedImages.includes(image));
    localStorage.setItem('trash', JSON.stringify(updatedTrash));
    setDeletedImages(updatedTrash);
    setSelectedImages([]);
  };

  const handlePermanentDelete = (imageToDelete = null) => {
    const updatedTrash = imageToDelete 
      ? deletedImages.filter(image => image !== imageToDelete)
      : deletedImages.filter(image => !selectedImages.includes(image));
    localStorage.setItem('trash', JSON.stringify(updatedTrash));
    setDeletedImages(updatedTrash);
    setSelectedImages([]);
  };

  const handleImageClick = (image) => {
    if (!isSelected) {
      setExpandedImage(image); 
    }
  };

  const handleCloseModal = () => {
    setExpandedImage(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <div className="fixed">
        <Navbar />
      </div>
      <h1 className="text-6xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Trash</h1>

      {deletedImages && deletedImages.length > 0 ? (
        <div className="mt-12 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-6 gap-y-12 ml-[257px]">
          {deletedImages.map((image, index) => (
            <div key={index} className="relative group"> 
              <div
                onClick={() => isSelected ? handleImageSelect(image) : handleImageClick(image)} 
                className={`cursor-pointer ${isSelected && selectedImages.includes(image) ? 'border-4 border-yellow-200 rounded-2xl' : 'rounded-2xl'}`}
                style={{
                  width: '12rem',
                  height: '10.5rem',
                }}
              >
                {isSelected && selectedImages.includes(image) && (
                  <img
                    src={checkIcon}
                    alt="Checkmark"
                    className="absolute top-3 left-40 w-6 h-5 z-10"
                  />
                )}

                {!isSelected && (
                  <img
                    src={fullScreenIcon}
                    alt="Expand"
                    title="View fullscreen" 
                    className="absolute top-2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                  />
                )}

                <img
                  src={image}
                  alt={`Deleted ${index + 1}`}
                  className={`h-40 w-48 object-cover rounded-2xl shadow-lg ${isSelected && selectedImages.includes(image) ? 'filter brightness-50' : ''}`}
                  style={{
                    marginLeft: '-1px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="ml-32 text-center">No deleted images.</p>
      )}

      <div className="absolute top-12 right-40 mt-14 mr-6">
        <Button
          onClick={handleButtonClick}
          color="bg-[#D9D9D9] hover:bg-[#B0B0B0]"
          className="w-36 h-12"
        >
          <span>{isSelected ? 'Cancel' : 'Select'}</span>
        </Button>
      </div>

      {isSelected && selectedImages.length > 0 && (
        <>
          <div className="fixed bottom-20 left-1/2 transform -translate-x-40">
            <Button
              onClick={handleRestore}
              color="bg-[#B1DEA5] hover:bg-[#8CBF7B]"
              className="w-36 h-12"
            >
              Restore
            </Button>
          </div>

          <div className="fixed bottom-20 right-1/2 transform translate-x-20">
            <Button
              onClick={() => handlePermanentDelete()}  
              color="bg-[#FF6666] hover:bg-[#e64a19]"
              className="w-36 h-12"
            >
              Delete
            </Button>
          </div>

          <div className="absolute top-12 left-60 mt-10">
            <span
              onClick={handleSelectAll}
              className={`cursor-pointer underline text-blue-500 text-2xl ${isSelectAllActive ? 'font-bold' : 'hover:font-bold'}`}
            >
              Select All
            </span>
          </div>
        </>
      )}

      {expandedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="p-4 rounded-lg relative">
            <button
              className="absolute top-2 -right-8 text-3xl text-white" title="Exit fullscreen" 
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={expandedImage}
              alt="Expanded"
              className="max-w-full max-h-[80vh] object-contain"
              style={{
                transform: 'translateX(20px)', 
              }}
            />
          </div>
          <div className="fixed bottom-16 left-1/2 transform -translate-x-40">
            <div className="w-auto">
              <Button
                onClick={() => {
                  handleRestore();
                  handleCloseModal();
                }}
                color="bg-[#B1DEA5] hover:bg-[#8CBF7B]"
                className="w-36 h-12"
              >
                Restore
              </Button>
            </div>
          </div>

          <div className="fixed bottom-16 right-1/2 transform translate-x-20">
            <div className="w-auto">
              <Button
                onClick={() => {
                  handlePermanentDelete(expandedImage);
                  handleCloseModal();
                }}
                color="bg-[#FF6666] hover:bg-[#e64a19]"
                className="w-36 h-12"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trash;