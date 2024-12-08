import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import leftArrowIcon from '../Assets/Icons/Arrow left.png';
import checkIcon from '../Assets/Icons/white_check.png';
import Button from '../UI/button';
import EditPopup from '../UI/EditPopup.js';
import PhotoDetails from '../UI/PhotoDetails.js';
import RestoreValidation from '../UI/RestoreValidation';
import Validation from '../UI/Validation';
import Confirmation from '../UI/Confirmation';

import pic1 from '../Assets/Photos/mapPic28.jpg';
import pic2 from '../Assets/Photos/mapPic29.jpg';
import pic3 from '../Assets/Photos/mapPic30.jpg';

function MapPhotos() {
  useEffect(() => { document.title = 'Egypt'; });
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [flowers, setFlowers] = useState([
    { url: pic1, caption: '', tags: [], isStarred: false, album: "" },
    { url: pic2, caption: '', tags: [], isStarred: false, album: ""  },
    { url: pic3, caption: '', tags: [], isStarred: false, album: ""  },
  ]);
  const [hovered, setHovered] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isValidationVisible, setValidationVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false); // Edit popup state
  const [isSoldConfirmationVisible, setSoldConfirmationVisible] = useState(false);
  const [isSoldValidationVisible, setSoldValidationVisible] = useState(false);

  // Open the first popup (Photo Details)
  const handleOpenPhotoDetails = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  // Open the EditPopup
  const handleOpenEditPopup = () => {
    setShowModal(false); // Close the first popup
    setShowEditPopup(true); // Open EditPopup
  };
    
  // Save edits from the EditPopup
  const handleSaveEdits = (updatedDetails) => {
    setFlowers((prevImages) =>
      prevImages.map((image, index) =>
        index === selectedImageIndex
          ? { ...image, ...updatedDetails } // Update selected image
          : image
      )
    );
    setShowEditPopup(false); // Close EditPopup
    setShowModal(true); // Reopen the first popup to show updated details
  };
  
  // Delete an image
  const handleDeleteImage = () => {
    const imageToSell = flowers[selectedImageIndex];
    const updatedFlowers = flowers.filter((_, index) => index !== selectedImageIndex);

    const soldImages = JSON.parse(localStorage.getItem('trash')) || [];
    soldImages.push(imageToSell.url);
    localStorage.setItem('trash', JSON.stringify(soldImages));

    setFlowers(updatedFlowers);
    setShowEditPopup(false); // Close the EditPopup after deleting
    setConfirmationVisible(true);

    if (updatedFlowers.length > 0) {
      setSelectedImageIndex(selectedImageIndex % updatedFlowers.length);
    } else {
      setShowModal(false);
    }
  };

  const handleBackClick = () => {
    navigate('/map');
  };

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  const handleImageSelect = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleDeleteSelected = () => {
    setValidationVisible(true);
  };
  

  const confirmDelete = () => {
    const updatedFlowers = flowers.filter((image) => !selectedImages.includes(image));
    setFlowers(updatedFlowers);
    const currentTrash = JSON.parse(localStorage.getItem('trash')) || [];
    const newTrash = [...currentTrash, ...selectedImages];
    localStorage.setItem('trash', JSON.stringify(newTrash));
    setSelectedImages([]);
    setValidationVisible(false);
    setConfirmationVisible(true);
  };

  const cancelDelete = () => {
    setValidationVisible(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % flowers.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      (prevIndex - 1 + flowers.length) % flowers.length
    );
  };

  const handleSold = () => {
    setSoldValidationVisible(true);
  };

  const confirmSold = () => {
    const imageToSell = flowers[selectedImageIndex];
    const updatedFlowers = flowers.filter((_, index) => index !== selectedImageIndex);

    const soldImages = JSON.parse(localStorage.getItem('sold')) || [];
    soldImages.push(imageToSell.url);
    localStorage.setItem('sold', JSON.stringify(soldImages));

    setFlowers(updatedFlowers);
    setSoldValidationVisible(false);
    setSoldConfirmationVisible(true);

    if (updatedFlowers.length > 0) {
      setSelectedImageIndex(selectedImageIndex % updatedFlowers.length);
    } else {
      setShowModal(false);
    }
  };

  const cancelSold = () => {
    setSoldValidationVisible(false);
  };
  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Giza, Egypt</h1>

      <div className="flex">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="mt-2 w-32" />
        </div>

        <div className="flex-1 p-6">
          <div className="fixed top-12 right-40 mt-14 mr-6" title={isSelected ? "Cancel Select" : "Select Photo(s)"}>
            <Button
              onClick={handleButtonClick}
              color={isSelected ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9] hover:bg-[#B0B0B0]'}
              className="w-36 h-12">
              <span>{isSelected ? 'Cancel' : 'Select'}</span>
            </Button>
          </div>

          {isSelected && selectedImages.length > 0 && (
            <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 mt-6">
              <Button
                onClick={handleDeleteSelected}
                color="bg-[#FF6666] hover:bg-[#e64a19]"
                className="w-36 h-12">
                Delete Photos
              </Button>
            </div>
          )}

          <div className="mt-12 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-6 gap-y-12 ml-[95px]">
            {flowers.map((image, index) => (
              <div key={index} className="relative">
                <div
                  onClick={() => isSelected && handleImageSelect(image)}
                  className={`cursor-pointer ${
                    isSelected && selectedImages.includes(image)
                      ? 'border-4 border-yellow-200 rounded-2xl'
                      : 'rounded-2xl'
                  } relative`}
                  style={{ width: '12rem', height: '10.5rem' }}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}>
                  {isSelected && selectedImages.includes(image) && (
                    <img
                      src={checkIcon}
                      alt="Checkmark"
                      className="absolute top-3 left-40 w-6 h-5 z-10"
                    />
                  )}
                  <img
                    src={image.url}
                    alt={`Flower ${index + 1}`}
                    className={`h-40 w-48 object-cover rounded-2xl shadow-lg transition-transform duration-200 ${
                      isSelected && selectedImages.includes(image) ? 'filter brightness-50' : ''
                    } ${hovered === index && !isSelected ? 'transform scale-105' : ''}`}
                    style={{ marginLeft: '-1px' }}
                  />
                  {hovered === index && !isSelected && (
                    <button
                      onClick={() => handleOpenPhotoDetails(index)}
                      className="bg-[#BDD9E2] font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg text-center w-36 h-10 flex items-center justify-center z-20">
                      Photo Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {showModal && selectedImageIndex !== null && (
            <PhotoDetails
              image={flowers[selectedImageIndex]}
              isStarred={flowers[selectedImageIndex].isStarred}
              caption={flowers[selectedImageIndex].caption}
              onClose={() => setShowModal(false)}
              onEdit={handleOpenEditPopup}
              onNext={handleNextImage}
              onPrev={handlePrevImage}
              onMarkSold={handleSold}
            />
          )}

          {showEditPopup && selectedImageIndex !== null && (
            <EditPopup
              image={flowers[selectedImageIndex]}
              onClose={() => setShowEditPopup(false)}
              onSave={handleSaveEdits}
              onDelete={handleDeleteImage}
            />
          )}
        </div>
      </div>

      <div className="fixed left-48 top-20">
        <img
          src={leftArrowIcon}
          alt="Back"
          className="w-8 h-8 mt-5 cursor-pointer"
          title="Back to Map"
          onClick={handleBackClick}
        />
        <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium mb-4 right-94">
          Total Photos: {flowers.length}
        </div>
      </div>

      {isValidationVisible && (
        <Validation
          title="Move to Trash?"
          message="Are you sure you want to move the selected photo(s) to trash?"
          button1Text="Cancel"
          button2Text="Delete"
          onBlue={cancelDelete}
          onRed={confirmDelete}
        />
      )}

      {isSoldValidationVisible && (
        <RestoreValidation
          title="Mark as Sold?"
          message="This action will remove the photo from Home and move it to the Sold page"
          button1Text="Sold"
          button2Text="Cancel"
          onBlue={cancelSold}
          onGreen={confirmSold}
        />
      )}

      {isConfirmationVisible && (
        <Confirmation
          message="Successfully moved to trash."
          onConfirm={() => setConfirmationVisible(false)}
        />
      )}

      {isSoldConfirmationVisible && (
        <Confirmation
          message="Successfully moved to the Sold page."
          onConfirm={() => setSoldConfirmationVisible(false)}
        />
      )}
    </div>
  );
}

export default MapPhotos;
