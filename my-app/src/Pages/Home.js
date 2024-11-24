import React from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import { usePhotoContext } from './PhotoContext'; // for photo upload from Upload page

function Home() {
  const { photos } = usePhotoContext();   // for photo upload from Upload page

  return (
    <div className="flex flex-col">
       <div className='fixed'>
        <Navbar /> 
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>


      <div>
        <h1 className="text-4xl text-center mb-6 text-[#6AABD2] mt-6">Home</h1>
        <div className="grid grid-cols-4 gap-6">

          {photos.map((photo, index) => (
            <img
              key={index}
              src={URL.createObjectURL(photo)}
              alt={`Uploaded ${index + 1}`}
              className="h-40 w-full object-cover rounded-3xl shadow-lg"
            />
          ))}

        </div>
      </div>
     
    </div>
  );
}

export default Home;

