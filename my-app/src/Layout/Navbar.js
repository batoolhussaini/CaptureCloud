import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../Assets/Icons/account_circle.png';
import homeIcon from '../Assets/Icons/Home.png';
import homeSelectedIcon from '../Assets/Icons/home-selected.png';
import janeSelectedIcon from '../Assets/Icons/Jane-selected-removebg-preview.png';
import soldIcon from '../Assets/Icons/photo.png';
import soldSelectedIcon from '../Assets/Icons/Sold-selected-removebg-preview.png';
import uploadIcon from '../Assets/Icons/Upload cloud.png';
import uploadSelectedIcon from '../Assets/Icons/Upload-selected-removebg-preview.png';
import trashIcon from '../Assets/Icons/Trash 3.png';
import trashSelectedIcon from '../Assets/Icons/Trash-selected-removebg-preview.png';
import statsIcon from '../Assets/Icons/Pie chart.png';
import statsSelectedIcon from '../Assets/Icons/Sats-selected-removebg-preview.png';
import albumsIcon from '../Assets/Icons/folder_filled.png';
import albumsSelectedIcon from '../Assets/Icons/Album-selected-removebg-preview.png';
import logoutIcon from '../Assets/Icons/Log out.png';
import line from '../Assets/Icons/Line 7.png';
import chevronRightIcon from '../Assets/Icons/Chevron right.png';  

function Navbar() {
  const location = useLocation();  // Use location to determine current path
  const [albumsVisible, setAlbumsVisible] = useState(false); 
  const [isChevronRotated, setIsChevronRotated] = useState(false);

  //will add later when we display top 3 albums, it will track if the chevron icon has been rotatetd so that it displays the 3 albums
  const toggleAlbumsVisibility = () => {
    setAlbumsVisible(!albumsVisible);
    setIsChevronRotated(!isChevronRotated); 
  };

  const isAlbumDetailPage = location.pathname.startsWith('/album/');
  const isAlbumsPage = location.pathname === '/albums' || isAlbumDetailPage;

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
              <img src={homeIcon} alt="Home" className="h-5 w-5" />
              <span>Home</span>
            </>
          )}
        </Link>

        <Link to="/sold" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/sold' ? (
            <img src={soldSelectedIcon} alt="Sold" className="transform -translate-x-4" />
          ) : (
            <>
              <img src={soldIcon} alt="Sold" className="h-5 w-5" />
              <span>Sold</span>
            </>
          )}
        </Link>

        <Link to="/upload" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/upload' ? (
            <img src={uploadSelectedIcon} alt="Upload" className="transform -translate-x-4" />
          ) : (
            <>
              <img src={uploadIcon} alt="Upload" className="h-5 w-5" />
              <span>Upload</span>
            </>
          )}
        </Link>

        <Link to="/albums" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {isAlbumsPage ? (
            <div className="flex items-center">
              <img
                src={chevronRightIcon}
                alt="Chevron"
                className={`h-4 w-4 cursor-pointer transform transition-transform duration-300 ${isChevronRotated ? 'rotate-90' : ''} -translate-x-7`} 
                onClick={toggleAlbumsVisibility} 
              />
              <img src={albumsSelectedIcon} alt="Albums" className="transform -translate-x-8" />
            </div>
          ) : (
            <>
              <img src={albumsIcon} alt="Albums" className="h-5 w-5" />
              <span>Albums</span>
            </>
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
              <img src={statsIcon} alt="Statistics" className="h-5 w-5" />
              <span>Statistics</span>
            </>
          )}
        </Link>

        <Link to="/trash" className="flex items-center space-x-2 ml-8 hover:font-bold">
          {location.pathname === '/trash' ? (
            <img src={trashSelectedIcon} alt="Trash" className="transform -translate-x-4" />
          ) : (
            <>
              <img src={trashIcon} alt="Trash" className="h-5 w-5" />
              <span>Trash</span>
            </>
          )}
        </Link>
      </div>

      <Link to="/login" className="flex items-center space-x-2 ml-8 mt-32 hover:font-bold">
        <img src={logoutIcon} alt="Log Out" className="h-5 w-5" />
        <span>Log Out</span>
      </Link>
    </div>
  );
}

export default Navbar;
