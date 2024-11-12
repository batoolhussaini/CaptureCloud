import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import plusIcon from '../Assets/Icons/Folder_add_duotone_fill.png'; 
import folderIcon from '../Assets/Icons/Folder_add_fill.png'; 
import { Link } from 'react-router-dom'; 
import Button from '../UI/button';  

function Album() {
  const [isSelected, setIsSelected] = useState(false); 
  const [newAlbumName, setNewAlbumName] = useState(''); 
  const [albums, setAlbums] = useState([]); 

  const handleButtonClick = () => {
    setIsSelected(!isSelected); 
  };

  const handlePlusClick = () => {
    setAlbums([
      ...albums,
      { name: `NewAlbum ${albums.length + 1}`, icon: folderIcon }
    ]);
  };

  return (
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar />
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32" />
      </div>
      <h1 className="text-7xl text-center mb-6 text-[#6AABD2] mt-6">Albums</h1>  

      <div className="flex flex-wrap mt-6 ml-40 justify-start gap-15">
        <div className="flex flex-col items-center space-y-2 w-1/4"> 
          <button onClick={handlePlusClick}>
            <img src={plusIcon} alt="Plus Icon" className="h-[300px] w-[300px]" /> 
          </button>
        </div>

        {albums.map((album) => (
          <div key={album.name} className="flex flex-col items-center space-y-50 p-4 w-1/4">
            <Link to={`/album/${encodeURIComponent(album.name)}`}>
              <img src={album.icon} alt={album.name} className="h-[279px] w-[300px]" /> 
            </Link>
            <span className="text-center text-blue-400">{album.name}</span> 
          </div>
        ))}
      </div>

      <div className="absolute top-12 right-40 mt-6 mr-6">
        <Button
          onClick={handleButtonClick}
          color="bg-[#D9D9D9] hover:bg-[#D0D8E9]" 
          className="fixed w-36 h-12"
        >
          <span>{isSelected ? 'Cancel' : 'Select'}</span>
        </Button>
      </div>
    </div>
  );
}

export default Album;
