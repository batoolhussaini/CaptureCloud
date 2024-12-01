import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import Button from '../UI/button';
import Searchbar from '../Layout/Searchbar.js';
import Popup from '../UI/Soldpopup.js';
import pic1 from '../Assets/Photos/mapPic3.jpg';
import pic2 from '../Assets/Photos/mapPic5.jpg';
import pic3 from '../Assets/Photos/mapPic28.jpg';
import pic4 from '../Assets/Photos/mapPic29.jpg';
import pic5 from '../Assets/Photos/mapPic27.jpg';
import checkIcon from '../Assets/Icons/white_check.png';
import Validation from '../UI/Validation';
import Confirmation from '../UI/Confirmation';

function Sold() {
  useEffect(() => {
    document.title = 'Sold Photos';
  }, []);

  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // Array of image IDs
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [hovered, setHovered] = useState(null); // Hover state for image box
  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
      caption: '',
      tags: ['cat', 'animal'],
      isStarred: false,
    },
    {
      id: 2,
      url: 'https://www.planetware.com/wpimages/2022/05/canada-pictures-beautiful-places-to-photograph-lake-louise-summer.jpg',
      caption: '',
      tags: ['nature'],
      isStarred: false,
    },
    {
      id: 3,
      url: 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
      caption: '',
      tags: ['nature', 'water'],
      isStarred: false,
    },
    { id: 4, url: pic1, caption: '', tags: ['pink'], isStarred: false, album: '' },
    { id: 5, url: pic2, caption: '', tags: [], isStarred: false, album: '' },
    { id: 6, url: pic3, caption: '', tags: [], isStarred: false, album: '' },
    { id: 7, url: pic4, caption: '', tags: [], isStarred: false, album: '' },
    { id: 8, url: pic5, caption: '', tags: [], isStarred: false, album: '' },
  ]);

  const [isValidationVisible, setValidationVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
    setSelectedImages([]); // Reset selected images when toggling select mode
  };

  const handleImageSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDeleteSelected = () => {
    setValidationVisible(true); // Show validation popup
  };

  const confirmDelete = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    selectedImages.forEach((id) => {
      const image = images.find((img) => img.id === id);
      if (image) {
        trash.push(image.url);
      }
    });
    localStorage.setItem('trash', JSON.stringify(trash));

    setImages(updatedImages);
    setSelectedImages([]);
    setValidationVisible(false); // Hide validation popup
    setConfirmationVisible(true); // Show confirmation popup
  };

  const cancelDelete = () => {
    setValidationVisible(false); // Hide validation popup
  };

  const handleDeleteImage = () => {
    const imageToDelete = images[selectedImageIndex];
    const updatedImages = images.filter((image) => image.id !== imageToDelete.id);
    setImages(updatedImages);
    setShowModal(false); // Close the popup after deleting
  };

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % images.length;
    setSelectedImageIndex(nextIndex);
    setCurrentImage(images[nextIndex]);
  };

  const handlePreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + images.length) % images.length;
    setSelectedImageIndex(prevIndex);
    setCurrentImage(images[prevIndex]);
  };

  const handleOpenPhotoDetails = (index) => {
    setSelectedImageIndex(index); // Set the index of selected image
    setCurrentImage(images[index]); // Set the current image to the one at the selected index
    setShowModal(true); // Open the modal
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <div className="fixed">
        <Navbar />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Sold Photos</h1>
      <div className="absolute top-20 right-40 mt-6 mr-6 z-50" title={isSelected ? 'Cancel Select' : 'Select Photo(s)'}>
        <Button
          onClick={handleButtonClick}
          color={isSelected ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9] hover:bg-[#B0B0B0]'}
          className="fixed w-36 h-12"
        >
          <span>{isSelected ? 'Cancel' : 'Select'}</span>
        </Button>
      </div>
      {isSelected && selectedImages.length > 0 && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 mt-6 z-50">
          <Button onClick={handleDeleteSelected} color="bg-[#FF6666] hover:bg-[#e64a19]" className="w-36 h-12">
            Delete Photos
          </Button>
        </div>
      )}

      <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium z-50">
        <p className="text-black font-small">Total Photos: {images.length}</p>
      </div>

      {/* Searchbar */}
      <div className="mt-4 flex flex-col items-center ml-32">
        <Searchbar />
      </div>

      {/* Top Tags */}
      <div className="flex flex-row mt-8 items-start justify-center gap-5">
        <h2 className="m-1 text-xl text-center text-[#016AC7] font-bold">Top Tags</h2>
        <button className="bg-blueButton-c text-[#016AC7] px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
          &#9733; Favourites
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Nature
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Summer
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Beach
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Animal
        </button>
        <button className="mb-4 text-xl text-[#016AC7] font-bold">All Tags &#10230;</button>
      </div>

      {/* Image Boxes */}
      <div className="mt-12 grid grid-cols-4 gap-16 ml-[240px] mr-[70px] gap-y-12 mb-20">
        {images.map((image, index) => (
          <div key={image.id} className="relative group">
            <div
              onClick={() => (isSelected ? handleImageSelect(image.id) : handleOpenPhotoDetails(index))}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`cursor-pointer ${
                isSelected && selectedImages.includes(image.id) ? 'border-4 border-yellow-200 rounded-2xl' : 'rounded-2xl'
              } transform transition-transform duration-200 ${hovered === index ? 'scale-105' : ''}`}
              style={{ width: '12rem', height: '10.5rem' }}
            >
              {isSelected && selectedImages.includes(image.id) && (
                <img
                  src={checkIcon}
                  alt="Checkmark"
                  className="absolute top-3 left-40 w-6 h-5 z-10"
                />
              )}
              {!isSelected && hovered === index && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPhotoDetails(index);
                  }}
                  className="bg-[#BDD9E2] font-medium p-2 px-4 rounded-full shadow-md focus:outline-none absolute inset-0 m-auto flex items-center justify-center w-3/4 h-10"
                >
                  Photo Details
                </button>
              )}
              <img
                src={image ? image.url : ''}
                alt={`Preview ${index}`}
                className="h-40 w-48 object-cover rounded-2xl shadow-lg"
                style={{ marginLeft: '-1px' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Validation Popup */}
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

      {/* Confirmation Popup */}
      {isConfirmationVisible && (
        <Confirmation
          message="Successfully moved to trash."
          onConfirm={() => setConfirmationVisible(false)}
        />
      )}

      {/* Popup Modal */}
      {showModal && currentImage && (
        <Popup
          image={currentImage}
          onClose={() => setShowModal(false)}
          onDelete={handleDeleteImage}
        />
      )}
    </div>
  );
}

export default Sold;
