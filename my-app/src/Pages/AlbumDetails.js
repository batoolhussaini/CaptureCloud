import React, { useState, useEffect, useRef } from 'react';
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
import Validation from '../UI/Validation.js';
import ARpopup from '../UI/ARpopup.js';

function AlbumDetails() {
  useEffect(() => {
    document.title = 'Albums';
  }, []); 

  const { name } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isConfirmationOpenButton, setIsConfirmationOpenButton] = useState(false);
  const [isConfirmationOpenIcon, setIsConfirmationOpenIcon] = useState(false);
  const [isConfirmationOpenDelete, setIsConfirmationOpenDelete] = useState(false); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [uploadProgressButton, setUploadProgressButton] = useState(0);
  const [uploadProgressIcon, setUploadProgressIcon] = useState(0);
  const [imageInfo, setImageInfo] = useState({});
  const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);
  const fileInputRef = useRef(null);
  const iconFileInputRef = useRef(null); 

  const maxImagesPerUpload = 10;

  const progressBarButton = () => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setUploadProgressButton(progress);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsConfirmationOpenButton(true);
          setUploadProgressButton(0);
          setIsVisible(false);
          setIsUploadClicked(true);
        }, 500);
      }
    }, 300);
  };

  const progressBarIcon = () => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setUploadProgressIcon(progress);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsConfirmationOpenIcon(true);
          setUploadProgressIcon(0);
        }, 500);
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

      if (fileArray.length > maxImagesPerUpload) {
        alert(`You can only upload a maximum of ${maxImagesPerUpload} images at a time.`);
        return;
      }

      setImages((prevImages) => [...prevImages, ...fileArray]);
      setIsUploaded(true);
    }
  };

  const handleIconUploadChange = (e) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));

      if (invalidFiles.length > 0) {
        alert('Please upload only image files.');
        return;
      }

      if (fileArray.length > maxImagesPerUpload) {
        alert(`You can only upload a maximum of ${maxImagesPerUpload} images at a time.`);
        return;
      }

      setImages((prevImages) => [...prevImages, ...fileArray]);
      setIsUploaded(true);
      progressBarIcon(); 
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
      if (fileArray.length > maxImagesPerUpload) {
        alert(`You can only upload a maximum of ${maxImagesPerUpload} images at a time.`);
        return;
      }
      setImages((prevImages) => [...prevImages, ...fileArray]);
      setIsUploaded(true);
    }
  };

  const handleRemoveAll = () => {
    setImages([]);
    setIsUploaded(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (iconFileInputRef.current) {
      iconFileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    progressBarButton(); 
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
    setIsValidationOpen(true);
  };

  const confirmDelete = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image));
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    selectedImages.forEach((image) => {
      trash.push(URL.createObjectURL(image));
    });
    localStorage.setItem('trash', JSON.stringify(trash));

    setImages(updatedImages);
    setSelectedImages([]);
    setIsValidationOpen(false);
    setIsConfirmationOpenDelete(true); 
  };

  const cancelDelete = () => {
    setIsValidationOpen(false);
  };

  const handleEditClick = (image) => {
    setCurrentImage(image);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentImage(null);
  };

  const handleConfirmationCloseButton = () => {
    setIsConfirmationOpenButton(false);
  };

  const handleConfirmationCloseIcon = () => {
    setIsConfirmationOpenIcon(false);
  };

  const handleConfirmationCloseDelete = () => {
    setIsConfirmationOpenDelete(false);
  };

  const handleSave = (image, updatedData) => {
    setImageInfo((prevInfo) => ({
      ...prevInfo,
      [image.name]: updatedData,
    }));
    setIsPopupOpen(false);
  };

  const handleDelete = (image) => {
    setImages((prevImages) => prevImages.filter((img) => img !== image));
    setIsPopupOpen(false);
  };

  const handleEditAlbumName = () => {
    setIsRenamePopupOpen(true);
  };

  const handleRenameConfirm = (newName) => {
    const albums = JSON.parse(localStorage.getItem('albums')) || [];
    const updatedAlbums = albums.map((album) =>
      album.name === decodeURIComponent(name) ? { ...album, name: newName } : album
    );
    localStorage.setItem('albums', JSON.stringify(updatedAlbums));

    setIsRenamePopupOpen(false);
    navigate(`/album/${encodeURIComponent(newName)}`);
  };

  const handleRenameClose = () => {
    setIsRenamePopupOpen(false);
  };

  const handleUploadIconClick = () => {
    if (iconFileInputRef.current) {
      iconFileInputRef.current.click();
    }
  };

  const handleUploadBackArrowClick = () => {
    navigate('/albums');
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image instanceof File) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [images]);

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

        <div className="flex-1 p-6" onDragOver={handleDragOver} onDrop={handleDrop}>
          <div className="text-3xl text-left mt-2 ml-10 flex items-center space-x-4">
            <img src={folderIcon} alt="Folder Icon" className="w-9 h-9" />
            <h2 className="text-[#6AABD2] text-2xl">{decodeURIComponent(name)}</h2>
            <button className="ml-4" onClick={handleEditAlbumName}>
              <img
                src={editIcon}
                alt="Edit Icon"
                className="w-4 h-5 mt-0 cursor-pointer"
                title="Rename album"
              />
            </button>
          </div>

          {isRenamePopupOpen && (
            <ARpopup onConfirm={handleRenameConfirm} onClose={handleRenameClose} />
          )}
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
                  <p className="text-black-500 text-sm">
                    {maxImagesPerUpload} photos per upload max
                  </p>
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
                  style={{ width: '12rem', height: '10.5rem' }}
                >
                  {isSelected && selectedImages.includes(image) && (
                    <img
                      src={checkIcon}
                      alt="Checkmark"
                      className="absolute top-3 left-40 w-6 h-5 z-10"
                    />
                  )}

                  {image instanceof File && (
                    <div className="relative w-48 h-40">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index + 1}`}
                        className={`h-40 w-48 object-cover rounded-2xl shadow-lg ${
                          isSelected && selectedImages.includes(image) ? 'filter brightness-50' : ''
                        }`}
                        style={{
                          marginLeft: '-1px',
                        }}
                      />
                      {!isUploadClicked && (
                        <button
                          onClick={() => handleEditClick(image)}
                          className="absolute top-0 -right-10 bg-white p-2 rounded-full hover:bg-gray-200"
                          title="Edit photo details"
                        >
                          <img src={editIcon} alt="Edit Icon" className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  )}
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
            alt="Upload Icon"
            onClick={handleUploadIconClick}
            className="fixed top-[220px] right-12 transform -translate-y-5 w-7 h-7 cursor-pointer"
            title="Upload Photos"
          />
          <div
            className="absolute top-20 right-40 mt-6 mr-6"
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
        <img
          src={leftArrowIcon}
          alt="Back"
          className="w-8 h-8 mt-5 cursor-pointer"
          title="Back to Albums"
          onClick={handleUploadBackArrowClick}
        />
      </div>

      {uploadProgressButton > 0 && uploadProgressButton < 100 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="relative rounded bg-[#6AABD2] w-3/4 h-6">
            <div
              className="bg-[#1E5F99] h-full"
              style={{ width: `${uploadProgressButton}%` }}
            />
          </div>
          <div className="absolute text-white font-semibold">
            Uploading... {uploadProgressButton}%
          </div>
        </div>
      )}

      {uploadProgressIcon > 0 && uploadProgressIcon < 100 && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="relative rounded bg-[#6AABD2] w-3/4 h-6">
            <div
              className="bg-[#1E5F99] h-full"
              style={{ width: `${uploadProgressIcon}%` }}
            />
          </div>
          <div className="absolute text-white font-semibold">
            Uploading... {uploadProgressIcon}%
          </div>
        </div>
      )}

      {isValidationOpen && (
        <Validation
          title="Move to Trash?"
          message="Are you sure you want to move the selected photos to trash?"
          button1Text="Cancel"
          button2Text="Delete"
          onBlue={cancelDelete}
          onRed={confirmDelete}
        />
      )}

      {isConfirmationOpenButton && (
        <Confirmation
          message="Photo(s) successfully uploaded."
          onConfirm={handleConfirmationCloseButton}
        />
      )}

      {isConfirmationOpenIcon && (
        <Confirmation
          message="Photo(s) successfully uploaded."
          onConfirm={handleConfirmationCloseIcon}
        />
      )}

      {isConfirmationOpenDelete && (
        <Confirmation
          message="Photo(s) successfully deleted."
          onConfirm={handleConfirmationCloseDelete}
        />
      )}

      <Popup
        isOpen={isPopupOpen}
        handleClose={handleClosePopup}
        image={currentImage}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      {isUploadClicked && (
        <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium mb-4 right-94">
          <p className="text-black font-small">
            Total Photos: {images.length}
          </p>
        </div>
      )}
      <div style={{ backgroundColor: '#FFFFFF' }} className="h-8"></div>


      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        multiple
        accept="image/*"
        ref={iconFileInputRef}
        onChange={handleIconUploadChange}
        id="iconFileInput"
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default AlbumDetails;
