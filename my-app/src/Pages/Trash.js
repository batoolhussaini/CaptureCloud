import React from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';

function Trash() {
    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <img src={logo} alt="Logo" className="mt-2 w-32" />
            </div>
            <div className="fixed">
                <Navbar />
            </div>
            <h1 className="text-6xl text-center mb-6 text-[#6AABD2] mt-6">Trash</h1>
            <div className="flex">
                <div className="flex justify-center">
                    <img src={logo} alt="Logo" className="mt-2 w-32" />
                </div>
            </div> 
        </div>
    ); 
}


export default Trash;
