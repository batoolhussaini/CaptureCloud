import React from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import leftArrowIcon from '../Assets/Icons/Arrow left.png';
import { useNavigate } from 'react-router-dom';

function AllTags() {
  const tags = ['Animal', 'Beach', 'Fox', 'Forest', 'Mountain','Nature', 'Sky','Summer', 'Autumn', 'Night'];
  const navigate = useNavigate();
  const handleTagClick = (tag) => {
    if (tag === 'Sky') {
      window.location.href = '/skytag'; 
    } else {
      console.log(`Clicked on tag: ${tag}`);
    }
  };

    
  const handleBackClick = () => {
    navigate('/sold'); // Adjust this route to the correct path
  };


  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="flex justify-center mt-2">
          <img src={logo} alt="Logo" className="w-32 ml-32" />
        </div>

        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Tags</h1>
        <div className="fixed left-48 top-20 z-10"> 
        <img
          src={leftArrowIcon}
          alt="Back"
          className="w-8 h-8 mt-5 cursor-pointer"
          title="Back to Home"
          onClick={handleBackClick}
        />
        </div>
        {/* Centering the tags container */}
        <div className="flex justify-center items-center mt-8">
          <div className="grid grid-cols-4 gap-x-6 gap-y-8 text-lg font-medium text-black text-center font-[Anek Bangla] ml-32">
            {tags.sort().map((tag, index) => (
              <div key={index}>
                <span
                  className="underline text-black hover:text-[#6AABD2] cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTags;