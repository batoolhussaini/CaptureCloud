import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import photoIcon from '../Assets/Icons/Photo symbol.png';
import infoIcon from '../Assets/Icons/Info icon.png';
import editIcon from '../Assets/Icons/Edit pencil.png';
import uploadIcon from '../Assets/Icons/Upload.png';
import Button from '../UI/button.js'; // Import the Button component

function Upload() {
  const [images, setImages] = useState([]); // Store file objects
  const [dragOver, setDragOver] = useState(false); // State to track drag over
  const maxImages = 10;
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Modify handleImageChange to accept files directly
  const handleImageChange = (files) => {
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

      // Add new files to the images state
      setImages((prevImages) => [...prevImages, ...fileArray]);

      // Reset the file input after handling the change
      const fileInput = document.getElementById('fileInput');
      if (fileInput) {
        fileInput.value = ''; // Reset the file input so the same file can be uploaded again
      }
    }
  };

  const handleDelete = (imageToDelete) => {
    setImages((prevImages) => prevImages.filter((image) => image !== imageToDelete));
  };

  const handleRemoveAll = () => {
    setImages([]); 
    // Reset the file input when removing all images
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = ''; // Reset the file input
    }
  };

  const handleUpload = () => {
    // Clear images first
    setImages([]);
    // Then navigate to the home page
    navigate('/home'); // Directly navigate to home without delay
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true); // Set dragOver to true when dragging over
  };

  const handleDragLeave = () => {
    setDragOver(false); // Revert dragOver to false when dragging leaves
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleImageChange(files); // Pass the files directly to handleImageChange
    setDragOver(false); // Reset dragOver to false after drop
  };

  return (
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar /> 
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>

      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Upload to Home</h1>  
      
      <div className="flex-grow flex items-center justify-center ml-32">
        <div 
          className={`border-2 ${dragOver ? 'border-[#069DFA]' : 'border-black'} border-dashed rounded-2xl w-[38rem] h-64 flex flex-col items-center justify-center mt-6 bg-[#F5F5F5]`}
          onDragOver={handleDragOver} 
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          <img src={photoIcon} alt="Photo Icon" className="h-28 w-28" />
          <div className="flex items-center space-x-2">
            <p className="text-black text-2xl mt-6">
                Drag and drop, or  
            </p>
            <label htmlFor="fileInput" className="font-bold text-[#069DFA] hover:underline cursor-pointer text-2xl mt-6 ">
              select
            </label>
            <input id="fileInput" type="file" name="image" className="hidden" onChange={(e) => handleImageChange(e.target.files)} multiple accept="image/*"/>
          </div>
          <div className="flex items-center space-x-2">
            <img src={infoIcon} alt="Information Icon" className="h-7 w-7"/>
            <p className="text-black-500 text-lg">
              {maxImages} photos max
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-4 gap-16 ml-[240px] mr-[70px] gap-y-12">
        {images.map((image, index) => (
          <div key={index} className="relative grid grid-cols-6 gap-2">
            <div className="col-span-5">
              <img 
                src={URL.createObjectURL(image)} 
                alt={`Uploaded ${index + 1}`} 
                className="h-40 w-full object-cover rounded-3xl shadow-lg" 
              />
            </div>

            <div className="col-span-1 flex justify-center items-start">
              <button 
                onClick={() => handleDelete(image)} 
                className="text-black bg-white p-2 rounded-full hover:bg-gray-200"
              >
                <img src={editIcon} alt="Edit Icon" className="h-4 w-4"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-28"></div> 

      {images.length > 0 && (
        <button onClick={handleRemoveAll} className="fixed bottom-8 left-[12rem] text-red-600 text-2xl underline hover:font-medium mr-6">
          Remove All
        </button>
      )}
      
      {images.length > 0 && (
        <Button 
          color="bg-[#CEECF5] hover:bg-[#B6D8E7]" 
          icon={uploadIcon} 
          children="Upload" 
          className="bottom-8 right-10"
          onClick={handleUpload} // Trigger the handleUpload function when clicked
        />
      )}
    </div>
  );  
}

export default Upload;
