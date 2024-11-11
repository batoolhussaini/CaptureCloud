import React from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';

function Statistics() {
    return (
      <div className="flex flex-col">
      <div className='fixed'>
       <Navbar /> 
     </div>
     <div className="flex justify-center">
       <img src={logo} alt="Logo" className="mt-2 w-32" />
     </div>
    
   </div>
      );
}

export default Statistics;