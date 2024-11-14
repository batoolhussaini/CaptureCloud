import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../Assets/Icons/account_circle.png';
import homeIcon from '../Assets/Icons/Home.png';
import homeSelectedIcon from '../Assets/Icons/home-selected.png';
import janeSelectedIcon from '../Assets/Icons/Jane-selected-removebg-preview.png';
import soldIcon from '../Assets/Icons/photo.png';
import soldSelectedIcon from '../Assets/Icons/Sold-selected-removebg-preview.png'; // Assuming you have a selected icon for 'Sold'
import uploadIcon from '../Assets/Icons/Upload cloud.png';
import uploadSelectedIcon from '../Assets/Icons/Upload-selected-removebg-preview.png'; // Assuming you have a selected icon for 'Upload'
import trashIcon from '../Assets/Icons/Trash 3.png';
import trashSelectedIcon from '../Assets/Icons/Trash-selected-removebg-preview.png'; // Assuming you have a selected icon for 'Trash'
import statsIcon from '../Assets/Icons/Pie chart.png';
import statsSelectedIcon from '../Assets/Icons/Sats-selected-removebg-preview.png'; // Assuming you have a selected icon for 'Statistics'
import albumsIcon from '../Assets/Icons/folder_filled.png';
import albumsSelectedIcon from '../Assets/Icons/Album-selected-removebg-preview.png'; // Assuming you have a selected icon for 'Albums'
import logoutIcon from '../Assets/Icons/Log out.png';
import line from '../Assets/Icons/Line 7.png';

function Navbar() {
  const location = useLocation();  // Use location to determine current path

  // Function to check if we are on an album detail page
  const isAlbumDetailPage = location.pathname.startsWith('/album/');

  return (
    <div className="flex flex-col w-36 h-screen bg-Navbar-c text-text-c shadow-lg text-xs mt-0 pt-0">
      <div className="flex items-center justify-center mb-12 mt-16">
        <Link to="/account" className="flex items-center space-x-2 font-bold mr-4">
          {location.pathname === '/account' ? (
            <img src={janeSelectedIcon} alt="Profile" className="rounded-full transform translate-x-1 h-10" />
          ) : (
            <>
              <img src={profileIcon} alt="Profile" className="h-8 w-8 rounded-full" />
              <span>Jane</span>
            </>
          )}
        </Link>
      </div>

      <div className="space-y-10 mt-10">
        <Link to="/home" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/home' ? (
            <img src={homeSelectedIcon} alt="Home" className="transform -translate-x-4" />
          ) : (
            <>
              <img src={homeIcon} alt="Home" className="h-6 w-6" />
              <span>Home</span>
            </>
          )}
        </Link>

        <Link to="/sold" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/sold' ? (
            <img src={soldSelectedIcon} alt="Sold" className="transform -translate-x-4" />
          ) : (
            <>
              <img src={soldIcon} alt="Sold" className="h-6 w-6" />
              <span>Sold</span>
            </>
          )}
        </Link>

        <Link to="/upload" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/upload' ? (
            <img src={uploadSelectedIcon} alt="Upload" className="transform -translate-x-4" />
          ) : (
            <>
              <img src={uploadIcon} alt="Upload" className="h-6 w-6" />
              <span>Upload</span>
            </>
          )}
        </Link>

        <Link to="/albums" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {isAlbumDetailPage ? (
            <img src={albumsSelectedIcon} alt="Albums" className="transform -translate-x-4" />
          ) : (
            location.pathname === '/albums' ? (
              <img src={albumsSelectedIcon} alt="Albums" className="transform -translate-x-4" />
            ) : (
              <>
                <img src={albumsIcon} alt="Albums" className="h-6 w-6" />
                <span>Albums</span>
              </>
            )
          )}
        </Link>

        <div className="flex items-center justify-center mb-12 hover:font-bold">
          <img src={line} alt="Separator" />
        </div>

        <Link to="/statistics" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/statistics' ? (
            <img src={statsSelectedIcon} alt="Statistics" className="transform -translate-x-4" />
          ) : (
            <>
              <img src={statsIcon} alt="Statistics" className="h-6 w-6" />
              <span>Statistics</span>
            </>
          )}
        </Link>

        <Link to="/trash" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/trash' ? (
            <img src={trashSelectedIcon} alt="Trash" className="transform -translate-x-4" />
          ) : (
            <>
              <img src={trashIcon} alt="Trash" className="h-6 w-6" />
              <span>Trash</span>
            </>
          )}
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
