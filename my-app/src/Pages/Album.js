import React, { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import folderPlusIcon from '../Assets/Icons/Folder_add_duotone_fill.png'; 
import folderIcon from '../Assets/Icons/Folder_add_fill.png'; 
import { Link } from 'react-router-dom'; 
import Button from '../UI/button';  
import checkIcon from '../Assets/Icons/Check.png'; 

function Album() {
  const [isSelected, setIsSelected] = useState(false); 
  const [newAlbumName, setNewAlbumName] = useState(''); 

  const [albums, setAlbums] = useState(() => {
    const savedAlbums = localStorage.getItem('albums');
    return savedAlbums ? JSON.parse(savedAlbums) : [];
  });

  const [selectedAlbums, setSelectedAlbums] = useState([]);

  useEffect(() => {
    localStorage.setItem('albums', JSON.stringify(albums));
  }, [albums]);

  const handleButtonClick = () => {
    setIsSelected(!isSelected); 
    if (isSelected) {
      setSelectedAlbums([]); 
    }
  };

  const handlePlusClick = () => {
    if (!isSelected) {  
      setAlbums([ 
        ...albums, 
        { name: `NewAlbum ${albums.length + 1}`, icon: folderIcon }
      ]);
    }
  };

  const handleAlbumSelect = (albumName, e) => {
    e.preventDefault(); 
    if (selectedAlbums.includes(albumName)) {
      setSelectedAlbums(selectedAlbums.filter(name => name !== albumName));
    } else {
      setSelectedAlbums([...selectedAlbums, albumName]);
    }
  };

 const handleDeleteSelected = () => {
  const updatedAlbums = albums.filter((album) => !selectedAlbums.includes(album.name));
  setAlbums(updatedAlbums);
  setSelectedAlbums([]); 
  localStorage.setItem('albums', JSON.stringify(updatedAlbums));
};


  return (
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar />
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32" />
      </div>
      <h1 className="text-6xl text-center mb-6 text-[#6AABD2] mt-6">Albums</h1>  

      <div className="flex flex-wrap mt-7 ml-40 justify-start gap-15">
        <div className="flex flex-col items-center space-y-2 w-1/4"> 
          <button 
            onClick={handlePlusClick} 
            disabled={isSelected} 
          >
            <img 
              src={folderPlusIcon} 
              alt="Folder Plus Icon" 
              className="h-[195px] w-[225px] mt-12"  title="New Album"
              style={{ opacity: isSelected ? 0.5 : 1 }} 
            />
          </button>
        </div>

        {albums.map((album) => (
          <div key={album.name} className="flex flex-col items-center space-y-50 p-4 w-1/4">
            <div 
              onClick={(e) => isSelected ? handleAlbumSelect(album.name, e) : null} 
              className={`cursor-pointer ${isSelected && selectedAlbums.includes(album.name) ? 'border-4 border-yellow-200 rounded-2xl relative' : 'rounded-2xl'}`}
              style={{ marginTop: '47px' }} 
            >
              {isSelected && selectedAlbums.includes(album.name) && (
                <img 
                  src={checkIcon} 
                  alt="Checkmark" 
                  className="absolute top-2 right-2 w-5 h-5"
                />
              )}

              {!isSelected && (
                <Link to={`/album/${encodeURIComponent(album.name)}`}>
                  <img 
                    src={album.icon} 
                    alt={album.name} 
                    className="h-[180px] w-[230px] " 
                  />
                </Link>
              )}
              {isSelected && (
                <img 
                  src={album.icon} 
                  alt={album.name} 
                  className="h-[180px] w-[230px] " 
                />
              )}
            </div>
            <span className="text-center text-blue-400">{album.name}</span> 
            </div>
        ))}

      </div>

      <div className="fixed top-12 right-40 mt-6 mr-6">
        <Button
          onClick={handleButtonClick}
          color={isSelected ? "bg-[#B0B0B0]" : "bg-[#D9D9D9] hover:bg-[#B0B0B0]"} 
          className="w-36 h-12"
        >
          <span>{isSelected ? 'Cancel' : 'Select'}</span>
        </Button>
      </div>

      {isSelected && selectedAlbums.length > 0 && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 mt-6">
          <Button
            onClick={handleDeleteSelected}
            color="bg-[#FF0000] hover:bg-[#D70000]" 
            className="w-36 h-12"
          >
            Delete Albums
          </Button>
        </div>
      )}
    </div>
  );
}

export default Album;
