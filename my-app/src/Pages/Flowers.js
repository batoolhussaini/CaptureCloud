import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import folderIcon from '../Assets/Icons/Folder_blue.png';
import leftArrowIcon from '../Assets/Icons/Arrow left.png';
import checkIcon from '../Assets/Icons/white_check.png';
import Button from '../UI/button';
import editIcon from '../Assets/Icons/Edit pencil.png';
import uploadIcon from '../Assets/Icons/Upload.png';
import ARpopup from '../UI/ARpopup';
import EditPopup from '../UI/EditPopup.js';
import PhotoDetails from '../UI/PhotoDetails.js';
import Validation from '../UI/Validation';
import Confirmation from '../UI/Confirmation';
import RestoreValidation from '../UI/RestoreValidation';

import pic1 from '../Assets/Photos/pic1.jpg';
import pic2 from '../Assets/Photos/pic2.jpg';
import pic3 from '../Assets/Photos/pic3.jpeg';
import pic4 from '../Assets/Photos/pic4.jpg';
import pic5 from '../Assets/Photos/pic5.jpg';
import pic6 from '../Assets/Photos/pic6.avif';

function Flowers() {
  const [flowers, setFlowers] = useState([
    { url: pic1, caption: '', tags: ['pink'], isStarred: false, album: 'Flowers' },
    { url: pic2, caption: '', tags: [], isStarred: false, album: 'Flowers' },
    { url: pic3, caption: '', tags: [], isStarred: false, album: 'Flowers' },
    { url: pic4, caption: '', tags: [], isStarred: false, album: 'Flowers' },
    { url: pic5, caption: '', tags: [], isStarred: false, album: 'Flowers' },
    { url: pic6, caption: '', tags: [], isStarred: false, album: 'Flowers' },
  ]);

  useEffect(() => {
    document.title = 'Albums';

     // Removing the already deleted or removed images
     const removedFromHome = JSON.parse(localStorage.getItem('removedFromFlowers')) || [];    // Get the images that were removed from home page
    
     const removalCount = {};
     removedFromHome.forEach((url) => {
       removalCount[url] = (removalCount[url] || 0) + 1;
     });
 
     const updatedImages = flowers.filter((image) => {
       if (removalCount[image.url]) {
         removalCount[image.url]--;
         return false;
       }
       return true;
     });

     setFlowers(updatedImages);
 
     localStorage.setItem('removedFromFlowers', JSON.stringify(removedFromHome));
 
  });
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);
  const [albumName, setAlbumName] = useState('Flowers');
  const [hovered, setHovered] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isValidationVisible, setValidationVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false); 
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadConfirmationVisible, setUploadConfirmationVisible] = useState(false);
  const [isSoldValidationVisible, setSoldValidationVisible] = useState(false);
  const [isSoldConfirmationVisible, setSoldConfirmationVisible] = useState(false);

  const handleOpenPhotoDetails = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handleOpenEditPopup = () => {
    setShowModal(false); 
    setShowEditPopup(true); 
  };

  const handleSaveEdits = (updatedDetails) => {
    setFlowers((prevImages) =>
      prevImages.map((image, index) =>
        index === selectedImageIndex ? { ...image, ...updatedDetails } : image
      )
    );
    setShowEditPopup(false); 
    setShowModal(true); 
  };

  const handleDeleteImage = () => {
    const imageToSell = flowers[selectedImageIndex];
    const updatedFlowers = flowers.filter((_, index) => index !== selectedImageIndex);

    const soldImages = JSON.parse(localStorage.getItem('trash')) || [];
    soldImages.push(imageToSell.url);
    localStorage.setItem('trash', JSON.stringify(soldImages));

    // Collect the image to be deleted from Home page
    const removedFromHomeImages = JSON.parse(localStorage.getItem('removedFromFlowers')) || [];
    removedFromHomeImages.push(imageToSell.url);
    localStorage.setItem('removedFromFlowers', JSON.stringify(removedFromHomeImages));


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
    navigate('/albums');
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

  const handleUploadIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const progressBar = () => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setUploadProgress(progress);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setUploadProgress(0);
          setUploadConfirmationVisible(true);
        }, 500);
      }
    }, 300);
  };

  const handleImageChange = (event) => {
    const pics = event.target.files;
    if (pics && pics.length > 0) {
      const fileArray = Array.from(pics);
      const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));

      if (invalidFiles.length > 0) {
        alert('Please upload only image files.');
        return;
      }
      progressBar();

      const newImages = [];
      fileArray.forEach((pics) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          newImages.push({
            url: imageUrl,
            caption: '',
            tags: [],
            isStarred: false,
            album: albumName,
          });

          if (newImages.length === fileArray.length) {
            setFlowers((prevFlowers) => [...prevFlowers, ...newImages]);
            fileInputRef.current.value = null;
          }
        };
        reader.readAsDataURL(pics);
      });
    }
  };

  const confirmDelete = () => {
    const updatedFlowers = flowers.filter((image) => !selectedImages.includes(image));
    setFlowers(updatedFlowers);
    const currentTrash = JSON.parse(localStorage.getItem('trash')) || [];
    const newTrash = [...currentTrash, ...selectedImages];
    localStorage.setItem('trash', JSON.stringify(newTrash));

    const removedFromHomeImages = JSON.parse(localStorage.getItem('removedFromFlowers')) || [];
    selectedImages.forEach((id) => {
      const image = flowers.find((img) => img.id === id);
      if (image) {
        removedFromHomeImages.push(image.url);
      }
    });
    localStorage.setItem('removedFromFlowers', JSON.stringify(removedFromHomeImages));

    setSelectedImages([]);
    setValidationVisible(false);
    setConfirmationVisible(true);
  };

  const cancelDelete = () => {
    setValidationVisible(false);
  };

  const handleEditAlbumName = () => {
    setIsRenamePopupOpen(true);
  };

  const handleRenameConfirm = (newName) => {
    setAlbumName(newName);
    setIsRenamePopupOpen(false);
  };

  const handleRenameClose = () => {
    setIsRenamePopupOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % flowers.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + flowers.length) % flowers.length);
  };

  const handleSold = () => {
    setSoldValidationVisible(true);
  };

  const cancelSold = () => {
    setSoldValidationVisible(false);
  };

  const confirmSold = () => {
    const imageToSell = flowers[selectedImageIndex];
    const updatedFlowers = flowers.filter((_, index) => index !== selectedImageIndex);

    const soldImages = JSON.parse(localStorage.getItem('sold')) || [];
    soldImages.push(imageToSell.url);
    localStorage.setItem('sold', JSON.stringify(soldImages));

    // Collect the image to be deleted from Home page
    const removedFromHomeImages = JSON.parse(localStorage.getItem('removedFromFlowers')) || [];
    removedFromHomeImages.push(imageToSell.url);
    localStorage.setItem('removedFromFlowers', JSON.stringify(removedFromHomeImages));


    setFlowers(updatedFlowers);
    setSoldValidationVisible(false);
    setSoldConfirmationVisible(true);

    if (updatedFlowers.length > 0) {
      setSelectedImageIndex(selectedImageIndex % updatedFlowers.length);
    } else {
      setShowModal(false);
    }
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

      <div className="flex">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="mt-2 w-32" />
        </div>

        <div className="flex-1 p-6">
          <div className="text-2xl text-left mt-2 ml-10 flex items-center space-x-4">
            <img src={folderIcon} alt="Folder Icon" className="w-9 h-19" />
            <h2 className="text-[#6AABD2]">{albumName}</h2>
            <button className="ml-2" onClick={handleEditAlbumName}>
              <img
                src={editIcon}
                alt="Edit Icon"
                className="w-5 h-5 mt-1 cursor-pointer"
                title="Rename album"
              />
            </button>
          </div>

          {isRenamePopupOpen && <ARpopup onConfirm={handleRenameConfirm} onClose={handleRenameClose} />}

          <div
            className="fixed top-12 right-40 mt-14 mr-6 z-20"
            title={isSelected ? 'Cancel Select' : 'Select Photo(s)'}
          >
            <Button
              onClick={handleButtonClick}
              color={isSelected ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9] hover:bg-[#B0B0B0]'}
              className="w-36 h-12 z-50"
            >
              <span>{isSelected ? 'Cancel' : 'Select'}</span>
            </Button>
          </div>

          {isSelected && selectedImages.length > 0 && (
            <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 mt-6">
              <Button
                onClick={handleDeleteSelected}
                color="bg-[#FF6666] hover:bg-[#e64a19]"
                className="w-36 h-12"
              >
                Delete Photos
              </Button>
            </div>
          )}

          <div className="mt-12 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-6 gap-y-12 ml-[130px]">
            {flowers.map((image, index) => (
              <div key={index} className="relative">
                <div
                  onClick={() => isSelected && handleImageSelect(image)}
                  className={`cursor-pointer ${
                    isSelected && selectedImages.includes(image)
                      ? 'border-4 border-yellow-200 rounded-2xl'
                      : 'rounded-2xl'
                  } relative`}
                  style={{
                    width: '12rem',
                    height: '10.5rem',
                  }}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
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
                    style={{
                      marginLeft: '-1px',
                    }}
                  />
                  {hovered === index && !isSelected && (
                    <button
                      onClick={() => handleOpenPhotoDetails(index)}
                      className="bg-[#BDD9E2] font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg text-center w-36 h-10 flex items-center justify-center z-20"
                    >
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
              onMarkSold={handleSold}
              onNext={handleNextImage}
              onPrev={handlePrevImage}
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
          title="Back to Albums"
          onClick={handleBackClick}
        />
        <img
          src={uploadIcon}
          alt="Uploaded Icon"
          className="fixed top-[220px] right-12 transform -translate-y-5 w-7 h-7 cursor-pointer"
          onClick={handleUploadIconClick}
          title="Upload Photos"
        />
        
      </div>

      <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium mb-4 ml-2">
        <p className="text-black font-small">
          Total Photos: {flowers.length}
        </p>
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

      {isUploadConfirmationVisible && (
        <Confirmation
          message="Photo(s) successfully uploaded."
          onConfirm={() => setUploadConfirmationVisible(false)}
        />
      )}

      <input type="file"  multiple accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
    </div>
  );
}

export default Flowers;
