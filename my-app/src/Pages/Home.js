import React from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import Searchbar from '../Layout/Searchbar.js';

function Home() {
  return (
    <div className="flex flex-col">
       <div className='fixed'>
        <Navbar /> 
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32" /> 
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6">Home</h1> 
      <Searchbar /> 
     
    </div>
  );
}

export default Home;

