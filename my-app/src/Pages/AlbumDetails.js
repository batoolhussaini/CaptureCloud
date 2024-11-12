import React, { useState } from 'react';
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

function AlbumDetails() {
  const { name } = useParams();  
  const navigate = useNavigate();  
  const [images, setImages] = useState([]); 
  const [isVisible, setIsVisible] = useState(true);  
  const [isUploaded, setIsUploaded] = useState(false); 
  const [isUploadClicked, setIsUploadClicked] = useState(false); 
  const [isSelected, setIsSelected] = useState(false); 

  const maxImages = 10; 

  const handleImageChange = (e) => {
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
        alert("Please upload only image files.");
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

  const handleDelete = (imageToDelete) => {
    setImages((prevImages) => prevImages.filter((image) => image !== imageToDelete));
  };

  const handleRemoveAll = () => {
    setImages([]); 
    setIsUploaded(false);  
  };

  const handleUploadClick = () => {
    setIsVisible(false);  
    setIsUploadClicked(true); 
  };

  const handleButtonClick = () => {
    setIsSelected(!isSelected); 
  };

  const handleBackClick = () => {
    navigate('/albums'); 
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32" />
      </div>  
      <div className='fixed'>
        <Navbar />
      </div>

      <h1 className="text-7xl text-center mb-6 text-[#6AABD2] mt-6">Albums</h1>  

      <div className="flex">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="mt-2 w-32" />
        </div>

        <div className="flex-1 p-6">
          <div className="text-4xl text-left mt-2 ml-10 flex items-center space-x-4">
            <img src={folderIcon} alt="Folder Icon" className="w-12 h-12" /> 
            <h2 className="text-[#6AABD2]">{decodeURIComponent(name)}</h2> 
            {isVisible && (
              <button className="ml-4">
                <img src={editIcon} alt="Edit Icon" className="w-7 h-8 cursor-pointer" />
              </button>
            )}
          </div>
      
          <div className="flex-grow flex items-center justify-center mt-6">
            {isVisible && (  
              <div 
                className="border-2 border-dashed border-black rounded-2xl w-[38rem] h-64 flex flex-col items-center justify-center bg-[#F5F5F5]"
                onDragOver={handleDragOver} 
                onDrop={handleDrop}
              >
                <img src={photoIcon} alt="Photo Icon" className="h-28 w-28" />
                <div className="flex items-center space-x-2">
                  <p className="text-black text-3xl mt-6">
                    Drag and drop, or  
                  </p>

                  <label htmlFor="fileInput" className="font-bold text-[#069DFA] hover:underline cursor-pointer text-3xl mt-6">
                    select
                  </label>
                  <input id="fileInput" type="file" name="image" className="hidden" onChange={handleImageChange} multiple />
                </div>

                <div className="flex items-center space-x-2">
                  <img src={infoIcon} alt="Information Icon" className="h-7 w-7"/>
                  <p className="text-black-500 text-lg">
                    {maxImages} photos max
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-5 gap-6 gap-y-12 ml-[40px]">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className="h-40 w-48 object-cover rounded-3xl ml-2 shadow-lg" />
                
                {isVisible && (  
                  <button
                    onClick={() => handleDelete(image)} 
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 text-black bg-white p-2 rounded-full hover:bg-gray-200"
                    style={{ top: '0px', right: '70px' }} >
                    <img src={editIcon} alt="Edit Icon" className="h-5 w-5"/>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isVisible && images.length > 0 && (
        <button onClick={handleRemoveAll} className="fixed bottom-8 left-[12rem] text-red-600 text-2xl underline hover:font-medium mr-6">
          Remove All
        </button>
      )}

      {isUploaded && !isUploadClicked && (
        <Button 
          color="bg-[#CEECF5] hover:bg-[#B6D8E7]" 
          icon={uploadIcon} 
          children="Upload" 
          onClick={handleUploadClick}
          className="fixed bottom-8 right-10 flex items-center justify-center"  
        />
      )}

      {isUploadClicked && (
        <>
          <img 
            src={uploadIcon} 
            alt="Uploaded Icon" 
            className="absolute top-1/3 right-12 transform -translate-y-1/4 w-10 h-10 cursor-pointer"  
            onClick={handleUploadClick}  
          />
          
          <div className="absolute top-12 right-40 mt-6 mr-6">
            <Button
              onClick={handleButtonClick}
              color="bg-[#D9D9D9] hover:bg-[#D0D8E9]" 
              className="fixed w-36 h-12"
            >
              <span>{isSelected ? 'Cancel' : 'Select'}</span>
            </Button>
          </div>
        </>
      )}

     <div className="fixed left-40 top-20">
        <img src={leftArrowIcon} alt="Back" 
        className="w-10 h-10 cursor-pointer" 
        onClick= {handleBackClick}
        />
      </div>
    </div>
  );
}

export default AlbumDetails;
