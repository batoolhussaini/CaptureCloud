import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import photoIcon from '../Assets/Icons/Photo symbol.png';
import infoIcon from '../Assets/Icons/Info icon.png';
import editIcon from '../Assets/Icons/Edit pencil.png';
import uploadIcon from '../Assets/Icons/Upload.png';
import Button from '../UI/button.js'; // Import the Button component

function Upload() {
  const [images, setImages] = useState([]);
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
      }
      const allowableFiles = fileArray.slice(0, maxImages - images.length);
      const newImages = allowableFiles.map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(newImages).then((loadedImages) => {
        setImages((prevImages) => [...prevImages, ...loadedImages]);
      });
    }
  };

  const handleDelete = (imageToDelete) => {
    setImages((prevImages) => prevImages.filter((image) => image !== imageToDelete));
  };

  const handleRemoveAll = () => {
    setImages([]); 
  };

  return (
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar /> 
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32" />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6">Upload to Home</h1>  
      <div className="flex-grow flex items-center justify-center">
        <div className="border-2 border-dashed border-black rounded-2xl w-[38rem] h-64 flex flex-col items-center justify-center mt-6 bg-[#F5F5F5]">
          <img src={photoIcon} alt="Photo Icon" className="h-28 w-28" />
          <div className="flex items-center space-x-2">
            <p className="text-black text-2xl mt-6">
                Drag and drop, or  
            </p>
            <label htmlFor="fileInput" className="font-bold text-[#069DFA] hover:underline cursor-pointer text-2xl mt-6">
              select
            </label>
            <input id="fileInput" type="file" name="image" className="hidden" onChange={handleImageChange} multiple accept="image/*"/>
          </div>
          <div className="flex items-center space-x-2">
            <img src={infoIcon} alt="Information Icon" className="h-7 w-7"/>
            <p className="text-black-500 text-lg">
              {maxImages} photos max
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-5 gap-6 ml-[250px] gap-y-12">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`Uploaded ${index + 1}`} className="h-40 w-48 object-cover rounded-3xl ml-2 shadow-lg" />
            <button onClick={() => handleDelete(image)} className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 text-black bg-white p-2 rounded-full hover:bg-gray-200" style={{ top: '0px', right: '70px' }} >
              <img src={editIcon} alt="Edit Icon" className="h-5 w-5"/>
            </button>
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <button onClick={handleRemoveAll} className="fixed bottom-6 left-[12rem] text-red-600 text-2xl underline hover:font-medium mr-6">
          Remove All
        </button>
      )}
       <Button 
                color="bg-[#CEECF5] hover:bg-[#B6D8E7]"
                icon={uploadIcon}
                children="Upload"
                className="bottom-10 right-10" // Specify positioning here
            />
    </div>
  );  
}

export default Upload;
