import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import Searchbar from '../Layout/Searchbar.js';
import logo from '../Assets/Logo/Logo.png';

function Home() {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar /> 
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4">
        {/* Header Section */}
        <div className="flex justify-center bg-gray-100 py-4">
          <img src={logo} alt="Logo" className="w-32" />
        </div>
        
        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6">Home</h1> 

        {/* Searchbar */}
        <div className="mt-8 flex flex-col items-center">
          <div className="w-full h-13 -mt-13 bg-blue-200 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-800">
            <Searchbar /> 
          </div> 
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-col items-center">
          <div className="w-full h-10 -mt-4 bg-blue-200 border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-800">
            5 tags will be here
          </div> 
        </div>

        {/* Image Box with Hover Effect */}
        <div className="mt-8 flex flex-col items-center">
          <div 
            className={`relative w-48 h-48 bg-purple-200 border-2 border-gray-300 rounded-lg transform transition-transform duration-200 ${hovered ? 'scale-105' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Image or background */}
            {hovered && (
              <button 
                onClick={() => setShowModal(true)} // Show the modal on click
                className="bg-[#BDD9E2] p-2 px-4 rounded-full shadow-md focus:outline-none focus:border-blue-500 absolute inset-0 m-auto flex items-center justify-center w-3/4 h-10"
              >
                Photo Details
              </button>
            )}
          </div>
        </div>

        {/* Popup Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
              <button
                onClick={() => setShowModal(false)} // Close button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" alt="Expanded view" className="w-full rounded-lg mb-4" />
              <p className="text-gray-700 mb-4">&#11088; Caption ...</p>
              <div className="flex justify-between">
                <button className="bg-[#CEECF5] px-4 py-2 rounded-lg">Edit</button>
                <button className="bg-[#CEECF5] px-4 py-2 rounded-lg">Sold</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

