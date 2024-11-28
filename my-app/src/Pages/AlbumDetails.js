import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import folderIcon from '../Assets/Icons/Folder_blue.png';
import photoIcon from '../Assets/Icons/Photo symbol.png';
import infoIcon from '../Assets/Icons/Info icon.png';
import editIcon from '../Assets/Icons/Edit pencil.png';
import uploadIcon from '../Assets/Icons/Upload.png';
import Button from '../UI/button';
import leftArrowIcon from '../Assets/Icons/Arrow left.png';
import checkIcon from '../Assets/Icons/white_check.png';
import Popup from '../UI/Popup';
import Confirmation from '../UI/Confirmation.js';

function AlbumDetails() {
  useEffect(() => {
    document.title = 'Albums';
  });
  const { name } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const maxImages = 10;

  const progressBar = () => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setUploadProgress(progress);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsConfirmationOpen(true); 
        },); 
      }
    }, 300);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));

      if (invalidFiles.length > 0) {
        alert('Please upload only image files.');
        return;
      }

      if (images.length + fileArray.length > maxImages) {
        alert(`You can only upload a maximum of ${maxImages} images at a time.`);
        return;
      }

      setImages((prevImages) => [...prevImages, ...fileArray]);
      setIsUploaded(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));
      if (invalidFiles.length > 0) {
        alert('Please upload only image files.');
        return;
      }
      if (images.length + fileArray.length > maxImages) {
        alert(`You can only upload a maximum of ${maxImages} images at a time.`);
        return;
      }
      setImages((prevImages) => [...prevImages, ...fileArray]);
      setIsUploaded(true);
    }
  };

  const handleRemoveAll = () => {
    setImages([]);
    setIsUploaded(false);

    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleUploadClick = () => {
    setIsVisible(false);
    setIsUploadClicked(true);
    progressBar();
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
    const updatedImages = images.filter((image) => !selectedImages.includes(image));
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    selectedImages.forEach((image) => {
      trash.push(URL.createObjectURL(image));
    });
    localStorage.setItem('trash', JSON.stringify(trash));

    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleEditClick = (image) => {
    setCurrentImage(image);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentImage(null);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <div className="fixed">
        <Navbar />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Albums</h1>
      <div className="flex">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="mt-2 w-32" />
        </div>

        <div className="flex-1 p-6" onDragOver={handleDragOver} onDrop={handleDrop}  >
          <div className="text-3xl text-left mt-2 ml-10 flex items-center space-x-4">
            <img src={folderIcon} alt="Folder Icon" className="w-8 h-8" />
            <h2 className="text-[#6AABD2] text-2xl">{decodeURIComponent(name)}</h2>
            <button className="ml-4">
              <img
                src={editIcon}
                alt="Edit Icon"
                className="w-4 h-5 mt-0 cursor-pointer"
                title="Edit Name"
              />
            </button>
          </div>

          <div className="flex-grow flex items-center justify-center mt-6">
            {isVisible && (
              <div className="border-2 border-dashed border-black rounded-2xl w-[33rem] h-56 flex flex-col items-center justify-center bg-[#F5F5F5]">
                <img src={photoIcon} alt="pic" className="h-20 w-20" />
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
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                  />
                </div>

                {images.length > 0 && (
                  <button
                    onClick={handleRemoveAll}
                    className="fixed bottom-2 left-[12rem] text-red-600 text-l underline hover:font-medium mr-6 z-50"
                  >
                    Remove All
                  </button>
                )}
                <div className="flex items-center space-x-2">
                  <img src={infoIcon} alt="Information Icon" className="h-5 w-5" />
                  <p className="text-black-500 text-sm">{maxImages} photos max</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-6 gap-y-12 ml-[95px]">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <div
                  onClick={() => isSelected && handleImageSelect(image)}
                  className={`cursor-pointer ${
                    isSelected && selectedImages.includes(image)
                      ? 'border-4 border-yellow-200 rounded-2xl'
                      : 'rounded-2xl'
                  }`}
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

                  {!isUploadClicked && (
                    <img
                      src={editIcon}
                      alt="Edit Icon"
                      className="absolute top-2 right-1/4 w-5 h-5 cursor-pointer"
                      title="Edit photo"
                      onClick={() => handleEditClick(image)}
                    />
                  )}

                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index + 1}`}
                    className={`h-40 w-48 object-cover rounded-2xl shadow-lg ${
                      isSelected && selectedImages.includes(image)
                        ? 'filter brightness-50' : ''
                    }`}
                    style={{
                      marginLeft: '-1px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isUploaded && !isUploadClicked && (
        <Button
          color="bg-[#CEECF5] hover:bg-[#B6D8E7]"
          icon={uploadIcon}
          children="Upload"
          onClick={handleUploadClick}
          className="fixed bottom-3 right-10 flex items-center justify-center"
        />
      )}

      {isUploadClicked && (
        <>
          <img
            src={uploadIcon}
            alt="Uploaded Icon"
            className="fixed top-1/3 right-12 transform -translate-y-5 w-7 h-7 cursor-pointer"
            title="Upload Photos"
          />

          <div className="absolute top-20 right-40 mt-6 mr-6">
            <Button
              onClick={handleButtonClick}
              color={isSelected ? "bg-[#B0B0B0]" : "bg-[#D9D9D9] hover:bg-[#B0B0B0]"} 
              className="fixed w-36 h-12"
            >
              <span>{isSelected ? 'Cancel' : 'Select'}</span>
            </Button>
          </div>
        </>
      )}

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

      <div className="fixed left-48 top-20">
        <img src={leftArrowIcon}
          alt="Back"
          className="w-8 h-8 mt-5 cursor-pointer"
          title="Back to Albums"
          onClick={handleBackClick}
        />
      </div>

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
      
      {isConfirmationOpen && (
        <Confirmation 
          message="Photo(s) Successfully Uploaded" 
          onConfirm={handleConfirmationClose}
        />
      )}

      <Popup isOpen={isPopupOpen} handleClose={handleClosePopup} image={currentImage} />
    </div>
  );
}

export default AlbumDetails;