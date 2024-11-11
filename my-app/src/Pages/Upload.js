import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import photoIcon from '../Assets/Icons/Photo symbol.png';
import infoIcon from '../Assets/Icons/Info icon.png';
import editIcon from '../Assets/Icons/Edit pencil.png';
import uploadIcon from '../Assets/Icons/Upload.png';



function Upload() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files); // Convert FileList to an array
      const newImages = fileArray.map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result); // Store the image as base64
          };
          reader.readAsDataURL(file);
        });
      });
  
      // Wait for all images to be loaded and then update the state
      Promise.all(newImages).then((loadedImages) => {
        setImages((prevImages) => [...prevImages, ...loadedImages]);
      });
    }
  };

  const handleDelete = (imageToDelete) => {
    setImages((prevImages) => prevImages.filter((image) => image !== imageToDelete));
  };


  return (
    // Menu bar and logo
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar /> 
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32" />
      </div>

      <h1 className="text-7xl text-center mb-6 text-[#6AABD2] mt-6">Upload to Home</h1>  

      <div className="flex-grow flex items-center justify-center">
          <div className="border-2 border-dashed border-black rounded-2xl w-[38rem] h-64 flex flex-col items-center justify-center mt-6 bg-[#F5F5F5]">
            <img src={photoIcon} alt="Photo Icon" className="h-28 w-28" />
            
            <div className="flex items-center space-x-2">
              <p className="text-black text-3xl mt-6">
                  Drag and drop, or  
              </p>

              <label htmlFor="fileInput" className="font-bold text-[#069DFA] hover:underline cursor-pointer text-3xl mt-6">
                select
              </label>
              <input id="fileInput" type="file" name="image" className="hidden" onChange={handleImageChange} multiple/>

            </div>
              
            <div className="flex items-center space-x-2">
              <img src={infoIcon} alt="Information Icon" className="h-7 w-7"/>
              <p className="text-black-500 text-lg">
                10 photos max 
              </p>
            </div>
              
          </div>
      </div>

      <div className="mt-12 grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-5 gap-6 ml-[250px] gap-y-12">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image} alt={`Uploaded ${index + 1}`} className="h-48 w-48 object-cover border-2 border-gray-400 rounded-3xl ml-2" />
            
            <button
              onClick={() => handleDelete(image)} className="absolute top-0 right-0 text-black bg-white p-2 rounded-full hover:bg-gray-200"
              style={{ transform: 'translate(-75px, -10px)' }} >
              <img src={editIcon} alt="Edit Icon" className="h-5 w-5"/>
            </button>
        </div>
        ))}
      </div>

      <button type="submit"
              className="fixed bottom-6 right-6 w-36 h-14 bg-[#CEECF5] hover:bg-[#D0D8E5] rounded-3xl shadow-lg text-center text-xl flex items-center justify-center space-x-2">
           <img src={uploadIcon} alt="Upload Icon" className="h-6 w-6"/> 
           <span>Upload</span>
      </button>


      
  
    </div>
    );  
}

export default Upload;


