import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../Assets/Icons/account_circle.png';
import homeIcon from '../Assets/Icons/Home.png';
import soldIcon from '../Assets/Icons/photo.png';
import uploadIcon from '../Assets/Icons/Upload cloud.png';
import trashIcon from '../Assets/Icons/Trash 3.png';
import statsIcon from '../Assets/Icons/Pie chart.png';
import albumsIcon from '../Assets/Icons/Trash 3.png';
import logoutIcon from '../Assets/Icons/Log out.png';
import line from '../Assets/Icons/Line 7.png';

function Navbar() {
  return (
    <div className="flex flex-col w-36 h-screen bg-Navbar-c text-text-c shadow-lg text-xs mt-0 pt-0"> 
      <div className="flex items-center justify-center mb-12 mt-16">
        <Link to="/account" className="flex items-center space-x-2 font-bold mr-4">
          <img src={profileIcon} alt="Profile" className="rounded-full h-8 w-8" />
          <span className="font-bold">Jane</span>
        </Link>
      </div>
      <div className="space-y-10 mt-10">
        <Link to="/home" className="flex items-center space-x-2 ml-8 hover:font-bold">
          <img src={homeIcon} alt="Home" className="h-6 w-6" />
          <span>Home</span>
        </Link>
        <Link to="/sold" className="flex items-center space-x-2 ml-8 hover:font-bold">
          <img src={soldIcon} alt="Sold" className="h-6 w-6 " />
          <span>Sold</span>
        </Link>
        <Link to="/upload" className="flex items-center space-x-2 ml-8 hover:font-bold">
          <img src={uploadIcon} alt="Upload" className="h-6 w-6" />
          <span>Upload</span>
        </Link>
        <Link to="/albums" className="flex items-center space-x-2 ml-8 hover:font-bold">
          <img src={albumsIcon} alt="Albums" className="h-6 w-6" />
          <span>Albums</span>
        </Link>
        <div className="flex items-center justify-center mb-12 hover:font-bold">
          <img src={line} alt="Separator" className="" />
        </div>
        <Link to="/statistics" className="flex items-center space-x-2 ml-8 hover:font-bold">
          <img src={statsIcon} alt="Statistics" className="h-6 w-6" />
          <span>Statistics</span>
        </Link>
        <Link to="/trash" className="flex items-center space-x-2 ml-8 hover:font-bold">
          <img src={trashIcon} alt="Trash" className="h-6 w-6" />
          <span>Trash</span>
        </Link>
      </div>
      <Link to="/login" className="flex items-center space-x-2 ml-8 mt-32 hover:font-bold">
        <img src={logoutIcon} alt="Log Out" className="h-6 w-6" />
        <span>Log Out</span>
      </Link>
    </div>
  );
}

export default Navbar;
