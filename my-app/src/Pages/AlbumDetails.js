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
import { imageToString, getImages, saveImages, removeImages } from '../UI/photos'; 

function AlbumDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const maxImages = 10;

  useEffect(() => {
    const savedImages = getImages(name);
    setImages(savedImages);
    if (savedImages.length > 0) {
      setIsVisible(false); 
      setIsUploadClicked(true); 
    }
  }, [name]);

  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));
      if (invalidFiles.length > 0) {
        alert("Please upload only image files.");
        return;
      }
      if (images.length + fileArray.length > maxImages) {
        alert(`You can only upload a maximum of ${maxImages} images at a time.`);
        return;
      }
      const newImages = [];
      for (let file of fileArray) {
        const base64 = await imageToString(file); 
        newImages.push(base64);
      }
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      setIsUploaded(true);
      saveImages(name, updatedImages);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));
      if (invalidFiles.length > 0) {
        alert("Please upload only image files.");
        return;
      }
      if (images.length + fileArray.length > maxImages) {
        alert(`You can only upload a maximum of ${maxImages} images at a time.`);
        return;
      }

      const newImages = [];
      for (let file of fileArray) {
        const base64image = await imageToString(file); 
        newImages.push(base64image);
      }

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      setIsUploaded(true);

      saveImages(name, updatedImages);
    }
  };

  const handleRemoveAll = () => {
    setImages([]);
    setIsUploaded(false);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = ''; 
    } removeImages(name);
  };

  const handleUploadClick = () => {
    setIsVisible(false);
    setIsUploadClicked(true);
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

  const deleteToTrash = (image) => {
    try {
      const trashImages = JSON.parse(localStorage.getItem('trash')) || [];
      trashImages.push(image);  
      localStorage.setItem('trash', JSON.stringify(trashImages));
      const updatedImages = images.filter((img) => img !== image);
      setImages(updatedImages); 
      saveImages(name, updatedImages); 
    } catch (e) { //once local storage is maxed out, it deletes any items in trash to free up space
      if (e.name === 'QuotaExceededError') { 
        localStorage.removeItem('trash');  
      } 
    }
  };
  
  const handleDeleteSelected = () => {
    selectedImages.forEach((image) => deleteToTrash(image));  
    setSelectedImages([]);  
    const updatedImages = images.filter((img) => !selectedImages.includes(img));
    setImages(updatedImages);  
    saveImages(name, updatedImages);  
  };
  
  return (
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar />
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <h1 className="text-6xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Albums</h1>  

      <div className="flex">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="mt-2 w-32" />
        </div>

        <div className="flex-1 p-6" 
          onDragOver={handleDragOver}  
          onDrop={handleDrop}         
        >
          <div className="text-4xl text-left mt-2 ml-10 flex items-center space-x-4">
            <img src={folderIcon} alt="Folder Icon" className="w-8 h-8" />
            <h2 className="text-[#6AABD2] text-2xl">{decodeURIComponent(name)}</h2>

            <button className="ml-4">
              <img src={editIcon} alt="Edit Icon" className="w-4 h-5 mt-0 cursor-pointer" title="Edit Name" />
            </button>
          </div>

          <div className="flex-grow flex items-center justify-center mt-6">
            {isVisible && (
              <div
                className="border-2 border-dashed border-black rounded-2xl w-[38rem] h-64 flex flex-col items-center justify-center bg-[#F5F5F5]"
              >
                <img src={photoIcon} alt="pic" className="h-28 w-28" />
                <div className="flex items-center space-x-2">
                  <p className="text-black text-2xl mt-6">
                    Drag and drop, or
                  </p>
                  <label htmlFor="fileInput" className="font-bold text-[#069DFA] hover:underline cursor-pointer text-2xl mt-6">
                    select
                  </label>
                  <input id="fileInput" type="file" name="image" className="hidden" onChange={handleImageChange} multiple accept="image/*"/>
                </div>

                {images.length > 0 && (
                <button onClick={handleRemoveAll} className="fixed bottom-1 left-[12rem] text-red-600 text-l underline hover:font-medium mr-6 z-50">
                  Remove All
                </button>
                )}
                <div className="flex items-center space-x-2">
                  <img src={infoIcon} alt="Information Icon" className="h-7 w-7" />
                  <p className="text-black-500 text-lg">
                    {maxImages} photos max
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
              
                  <img
                    src={image}  
                    alt={`Uploaded ${index + 1}`} 
                    className={`h-40 w-48 object-cover rounded-2xl shadow-lg ${isSelected && selectedImages.includes(image) ? 'filter brightness-50' : ''}`}  
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
            className="fixed top-1/3 right-12 transform -translate-y-5 w-7 h-7 cursor-pointer" title="Upload Photos"
            onClick={handleUploadClick}  
          />
          
          <div className="absolute top-12 right-40 mt-6 mr-6">
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
        <div className="fixed bottom-16 left-[45%] transform -translate-x-1/2 mt-6">
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
          className="w-7 h-7 mt-5 cursor-pointer" title="Back to Albums"
          onClick={handleBackClick}
        />
      </div>
    </div>
  );
}

export default AlbumDetails;