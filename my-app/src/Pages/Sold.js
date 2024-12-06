import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import Button from '../UI/button';
import SearchbarSold from '../Layout/SearchbarSold.js';
import pic1 from '../Assets/Photos/mapPic3.jpg';
import pic2 from '../Assets/Photos/mapPic5.jpg';
import pic3 from '../Assets/Photos/mapPic24.jpg';
import pic4 from '../Assets/Photos/mapPic29.jpg';
import pic5 from '../Assets/Photos/mapPic27.jpg';
import pic6 from '../Assets/Photos/mapPic4.webp';
import pic7 from '../Assets/Photos/mapPic10.webp';
import pic8 from '../Assets/Photos/mapPic9.avif';
import pic9 from '../Assets/Photos/mapPic20.jpg';
import pic10 from '../Assets/Photos/mapPic28.jpg';
import pic11 from '../Assets/Photos/mapPic8.jpg';
import pic12 from '../Assets/Photos/mapPic17.jpg';
import pic13 from '../Assets/Photos/mapPic11.jpg';
import pic14 from '../Assets/Photos/mapPic18.jpg';
import checkIcon from '../Assets/Icons/white_check.png';
import Validation from '../UI/Validation';
import Confirmation from '../UI/Confirmation';
import RestoreValidation from '../UI/RestoreValidation.js';
import SoldRestoreValidation from '../UI/SoldRestoreValidation.js';
import SoldPhotoDetails from '../UI/SoldPhotoDetails.js';

import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';
import { useNavigate } from 'react-router-dom';

function Sold() {
  const [combinedImages, setCombinedImages] = useState([]);
  const [images] = useState([
    {
      id: 1,
      url: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
      caption: '',
      tags: ['paris', 'nature'],
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
      tags: ['animals', 'water'],
      isStarred: false,
    },
    { id: 4, url: pic1, caption: '', tags: [''], isStarred: false, album: '' },
    { id: 5, url: pic2, caption: '', tags: [], isStarred: false, album: '' },
    { id: 6, url: pic3, caption: '', tags: [], isStarred: false, album: '' },
    { id: 7, url: pic4, caption: '', tags: [], isStarred: false, album: '' },
    { id: 8, url: pic5, caption: '', tags: [], isStarred: false, album: '' },
    { id: 9, url: pic6, caption: '', tags: [], isStarred: false, album: '' },
    { id: 10, url: pic7, caption: '', tags: ['paris'], isStarred: false, album: '' },
    { id: 11, url: pic8, caption: '', tags: ['paris'], isStarred: false, album: '' },
    { id: 12, url: pic9, caption: '', tags: [], isStarred: false, album: '' },
    { id: 13, url: pic10, caption: '', tags: [], isStarred: false, album: '' },
    { id: 14, url: pic11, caption: '', tags: ['paris'], isStarred: false, album: '' },
    { id: 15, url: pic12, caption: '', tags: [], isStarred: false, album: '' },
    { id: 16, url: pic13, caption: '', tags: [], isStarred: false, album: '' },
    { id: 17, url: pic14, caption: '', tags: [], isStarred: false, album: '' },
  ]);

  useEffect(() => {
    const sold = JSON.parse(localStorage.getItem('sold')) || [];
    document.title = 'Sold Photos';

    // Removing the already deleted or removed images
    const removedFromSold = JSON.parse(localStorage.getItem('removedFromSold')) || [];    // Get the images removed from home page
    
    const removalCount = {};
    removedFromSold.forEach((url) => {
      removalCount[url] = (removalCount[url] || 0) + 1;
    });

    const updatedImages = images.filter((image) => {
      if (removalCount[image.url]) {
        removalCount[image.url]--;
        return false;
      }
      return true;
    });

    const updatedSold = sold.filter((photo) => {
      if (removalCount[photo]) {
        // Decrement count and skip it once
        removalCount[photo]--;
        return false;
      }
      return true;
    });
    
   localStorage.setItem('removedFromSold', JSON.stringify(removedFromSold));

    const allImages = [
      ...updatedImages, // Hardcoded images
      ...updatedSold.map((photo, index) => ({
        id: 17 + index + 1, // Ensure unique IDs
        url: photo,
        caption: '',
        tags: [],
        isStarred: false,
      })), // Home photos
    ];

    setCombinedImages(allImages);
    
  }, [images]);

  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const [actionType, setActionType] = useState(null);
  const [isValidationVisible, setValidationVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isDeleteValidationVisible, setDeleteValidationVisible] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [isRestoreValidationVisible, setRestoreValidationVisible] = useState(false);
  const [isRestoreConfirmationVisible, setRestoreConfirmationVisible] = useState(false);
  const handleButtonClick = () => {
    setIsSelected(!isSelected);
    setSelectedImages([]);
  };

  const handleImageSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDeleteSelected = () => {
    setValidationVisible(true);
    setActionType('delete');
  };

  const confirmDelete = () => {
    const updatedImages = combinedImages.filter((image) => !selectedImages.includes(image.id));
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    const removedFromSoldImages = JSON.parse(localStorage.getItem('removedFromSold')) || [];
    selectedImages.forEach((id) => {
      const image = combinedImages.find((img) => img.id === id);
      if (image) {
        trash.push(image.url);
        removedFromSoldImages.push(image.url);
      }
    });
    localStorage.setItem('trash', JSON.stringify(trash));
    localStorage.setItem('removedFromSold', JSON.stringify(removedFromSoldImages));


    setCombinedImages(updatedImages);
    setSelectedImages([]);
    setIsSelected(false);
    setValidationVisible(false);
    setConfirmationVisible(true);
  };

  const cancelDelete = () => {
    setValidationVisible(false);
  };

  const handleRestoreSelected = () => {
    setRestoreValidationVisible(true);
    setActionType('restore');
  };

  const confirmRestoreSelected = () => {
    const updatedImages = combinedImages.filter((image) => !selectedImages.includes(image.id));
    const homeImages = JSON.parse(localStorage.getItem('home')) || [];
    const removedFromSoldImages = JSON.parse(localStorage.getItem('removedFromSold')) || [];

    selectedImages.forEach((id) => {
      const image = combinedImages.find((img) => img.id === id);
      if (image) {
        homeImages.push(image.url);
        removedFromSoldImages.push(image.url);

      }
    });
    localStorage.setItem('home', JSON.stringify(homeImages));
    localStorage.setItem('removedFromSold', JSON.stringify(removedFromSoldImages));


    setCombinedImages(updatedImages);
    setSelectedImages([]);
    setIsSelected(false);
    setRestoreValidationVisible(false);
    setConfirmationVisible(true);
  };

  const cancelRestoreSelected = () => {
    setRestoreValidationVisible(false);
  };

  const handleDeleteImage = () => {
    setDeleteValidationVisible(true);
  };

  const confirmDeleteImage = () => {
    const imageToDelete = combinedImages[selectedImageIndex];
    const updatedImages = combinedImages.filter((image) => image.id !== imageToDelete.id);
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    trash.push(imageToDelete.url);
    localStorage.setItem('trash', JSON.stringify(trash));

    // Collect the image to be deleted from Home page
    const removedFromSoldImages = JSON.parse(localStorage.getItem('removedFromSold')) || [];
    removedFromSoldImages.push(imageToDelete.url);
    localStorage.setItem('removedFromSold', JSON.stringify(removedFromSoldImages));

    setCombinedImages(updatedImages);
    if (updatedImages.length > 0) {
      const nextIndex = selectedImageIndex % updatedImages.length;
      setSelectedImageIndex(nextIndex);
      setCurrentImage(updatedImages[nextIndex]);
    } else {
      setShowModal(false);
    }
    setDeleteValidationVisible(false);
    setDeleteConfirmationVisible(true);
  };

  const cancelDeleteImage = () => {
    setDeleteValidationVisible(false);
  };

  const handleRestoreImage = () => {
    setRestoreValidationVisible(true);
    setActionType('restoreSingle');
  };

  const confirmRestoreImage = () => {
    const imageToRestore = combinedImages[selectedImageIndex];
    const updatedImages = combinedImages.filter((image) => image.id !== imageToRestore.id);
    const homeImages = JSON.parse(localStorage.getItem('home')) || [];
    homeImages.push(imageToRestore.url);
    localStorage.setItem('home', JSON.stringify(homeImages));

    // Collect the image to be deleted from Home page
    const removedFromSoldImages = JSON.parse(localStorage.getItem('removedFromSold')) || [];
    removedFromSoldImages.push(imageToRestore.url);
    localStorage.setItem('removedFromSold', JSON.stringify(removedFromSoldImages));


    setCombinedImages(updatedImages);
    if (updatedImages.length > 0) {
      const nextIndex = selectedImageIndex % updatedImages.length;
      setSelectedImageIndex(nextIndex);
      setCurrentImage(updatedImages[nextIndex]);
    }
    setShowModal(false);
    setRestoreValidationVisible(false);
    setRestoreConfirmationVisible(true);
  };

  const cancelRestoreImage = () => {
    setRestoreValidationVisible(false);
  };

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % combinedImages.length;
    setSelectedImageIndex(nextIndex);
    setCurrentImage(combinedImages[nextIndex]);
  };

  const handlePreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + combinedImages.length) % combinedImages.length;
    setSelectedImageIndex(prevIndex);
    setCurrentImage(combinedImages[prevIndex]);
  };

  const handleOpenPhotoDetails = (index) => {
    setSelectedImageIndex(index);
    setCurrentImage(combinedImages[index]);
    setShowModal(true);
  };
  
  const handleSearchUpdate = (searchTags) => {
    if (searchTags.length === 0) {
      setCombinedImages(images);
    } else {
      const filtered = combinedImages.filter((image) =>
        searchTags.every(tag => image.tags.includes(tag))
      );
      setCombinedImages(filtered);
    }
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
      <div
        className="absolute top-20 right-40 mt-6 mr-6 z-10"
        title={isSelected ? 'Cancel Select' : 'Select Photo(s)'}
      >
        <Button
          onClick={handleButtonClick}
          color={isSelected ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9] hover:bg-[#B0B0B0]'}
          className="fixed w-36 h-12"
        >
          <span>{isSelected ? 'Cancel' : 'Select'}</span>
        </Button>
      </div>

      {isSelected && selectedImages.length > 0 && (
        <>
          <div className="fixed bottom-16 left-1/2 transform -translate-x-40 z-50">
            <Button
              onClick={handleRestoreSelected}
              color="bg-[#B1DEA5] hover:bg-[#8CBF7B]"
              className="w-36 h-12"
            >
              Restore to Home
            </Button>
          </div>

          <div className="fixed bottom-16 right-1/2 transform translate-x-20 z-50">
            <Button
              onClick={handleDeleteSelected}
              color="bg-[#FF6666] hover:bg-[#e64a19]"
              className="w-36 h-12"
            >
              Delete Photos
            </Button>
          </div>
        </>
      )}

      {/* Searchbar */}
      <div className="mt-4 flex flex-col items-center ml-32">
          <SearchbarSold onSearchUpdate={handleSearchUpdate}  />
          <div className="">
          {combinedImages.map((image) => (
          <div key={image.id} className="relative">
          </div>
        ))}
      </div>
        </div>

      {/* Top Tags */}
      <div className="flex flex-row mt-8 items-start justify-center gap-5 ml-32">
          {combinedImages.length > 0 ? (
            <>
              <h2 className="m-1 mt-[-1px] text-xl text-center text-[#016AC7] font-bold">
                Top Tags
              </h2>
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
              <button
                className={`mb-5 text-xl font-bold ${
                  combinedImages.length > 0
                    ? 'text-[#016AC7]'
                    : 'text-gray-500 cursor-not-allowed'
                }`}
                onClick={combinedImages.length > 0 ? () => navigate('/tagslist') : null}
              >
                All Tags &#10230;
              </button>
            </>
          ) : (
            <h2 className="m-1 text-xl text-center text-gray-500 font-bold">
              Top Tags
            </h2>
          )}
        </div>

      {/* Image Boxes */}
      <div className="mt-12 grid grid-cols-4 gap-16 ml-[290px] mr-[70px] gap-y-12">
        {combinedImages.map((image, index) => (
          <div key={image.id} className="relative group">
            <div
              onClick={() => (isSelected ? handleImageSelect(image.id) : handleOpenPhotoDetails(index))}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`cursor-pointer ${
                isSelected && selectedImages.includes(image.id)
                  ? 'border-4 border-yellow-200 rounded-2xl'
                  : 'rounded-2xl'
              } transform transition-transform duration-200 ${
                hovered === index ? 'scale-105' : ''
              }`}
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
                <img
                  src={fullScreenIcon}
                  alt="Expand"
                  title="Fullscreen"
                  className="absolute top-2 left-2 w-8 h-8 opacity-100 transition-opacity duration-200"
                />
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

      {showModal && currentImage && (
          <SoldPhotoDetails
            image={currentImage.url}
            onClose={() => setShowModal(false)}
            onRestore={handleRestoreImage}
            onDelete={handleDeleteImage}
            onPrev={handlePreviousImage}
            onNext={handleNextImage}
          />
      )}

      <div style={{ backgroundColor: '#FFFFFF' }} className="h-16"></div> 

      {isValidationVisible && !showModal && actionType === 'delete' && (
        <Validation
          title="Move to Trash?"
          message="Are you sure you want to move the selected photo(s) to trash?"
          button1Text="Cancel"
          button2Text="Delete"
          onBlue={cancelDelete}
          onRed={confirmDelete}
          className="z-60"
        />
      )}

      {isConfirmationVisible && actionType === 'delete' && (
        <Confirmation
          message="Successfully moved to trash."
          onConfirm={() => setConfirmationVisible(false)}
          className="z-60"
        />
      )}

      {isRestoreValidationVisible && !showModal && actionType === 'restore' && (
        <SoldRestoreValidation
          title="Restore Selected Photos?"
          message="Are you sure you want to restore the selected photo(s) to Home Page?"
          button1Text="Restore"
          button2Text="Cancel"
          onBlue={cancelRestoreSelected}
          onGreen={confirmRestoreSelected}
          className="z-60"
        />
      )}

      {isConfirmationVisible && actionType === 'restore' && (
        <Confirmation
          message="Successfully restored to Home Page."
          onConfirm={() => setConfirmationVisible(false)}
          className="z-60"
        />
      )}

      {isDeleteValidationVisible && showModal && (
        <Validation
          title="Move to Trash?"
          message="Are you sure you want to move this photo to trash?"
          button1Text="Cancel"
          button2Text="Delete"
          onBlue={cancelDeleteImage}
          onRed={confirmDeleteImage}
          className="z-60"
        />
      )}

      {isDeleteConfirmationVisible && (
        <Confirmation
          message="Successfully moved to trash."
          onConfirm={() => setDeleteConfirmationVisible(false)}
          className="z-60"
        />
      )}

      {isRestoreValidationVisible && showModal && actionType === 'restoreSingle' && (
        <RestoreValidation
          title="Restore Photo?"
          message="Are you sure you want to restore this photo to Home Page?"
          button1Text="Restore"
          button2Text="Cancel"
          onBlue={cancelRestoreImage}
          onGreen={confirmRestoreImage}
          className="z-60"
        />
      )}

      {isRestoreConfirmationVisible && (
        <Confirmation
          message="Successfully restored to Home Page."
          onConfirm={() => setRestoreConfirmationVisible(false)}
          className="z-60"
        />
      )}

      <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium mb-4 right-94">
        <p className="text-black font-small">
          Total Photos: {combinedImages.length}
        </p>
      </div>
    </div>
  );
}

export default Sold;
