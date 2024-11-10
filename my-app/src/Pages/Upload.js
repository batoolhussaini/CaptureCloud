import React from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import photoIcon from '../Assets/Icons/Photo symbol.png';
import infoIcon from '../Assets/Icons/Info icon.png';


function Upload() {


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
                  <input id="fileInput" type="file" name="image" className="hidden" />

                </div>
                  
                <div className="flex items-center space-x-2">
                  <img src={infoIcon} alt="Information Icon" className="h-7 w-7"/>
                  <p className="text-black-500 text-lg">
                    10 photos max 
                  </p>
                </div>
                  
              </div>
          </div>
      
  
    </div>
    );  
}

export default Upload;
