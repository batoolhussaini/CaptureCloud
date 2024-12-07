
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import leftArrowIcon from '../Assets/Icons/Arrow left.png';
import EditPopup from '../UI/EditPopup.js';
import PhotoDetails from '../UI/PhotoDetails.js';
import SoldPhotoDetails from '../UI/SoldPhotoDetails.js';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';



function Skytag() {
  const [isHomePage, setisHomePage] = useState(false);

  useEffect(() => {
    document.title = 'Animal';

    const pageBeforeAnimalTag = localStorage.getItem("pageBeforeSkyTag");
    const navigateTo = pageBeforeAnimalTag ? JSON.parse(pageBeforeAnimalTag) : '/default-path';
    const homePage = navigateTo === '/sold';
    setisHomePage(homePage)
  });

  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [images, setImages] = useState([
    { url: 'https://static.vecteezy.com/system/resources/previews/024/892/056/non_2x/vibrant-sunset-sky-over-idyllic-landscape-a-moody-backdrop-generated-by-ai-free-photo.jpg', caption: '', tags: [], isStarred: false, album: '' },
    { url: 'https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', caption: '', tags: [], isStarred: false, album: '' },
    { url: 'https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', caption: '', tags: [], isStarred: false, album: '' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/July_night_sky_%2835972569256%29.jpg/420px-July_night_sky_%2835972569256%29.jpg', caption: '', tags: [], isStarred: false, album: '' },
  ]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  

  // Open Photo Details modal
  const handleOpenPhotoDetails = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  // Open Edit Popup
  const handleOpenEditPopup = () => {
    setShowModal(false);
    setShowEditPopup(true);
  };

  // Save edits from the EditPopup
  const handleSaveEdits = (updatedDetails) => {
    setImages((prevImages) =>
      prevImages.map((image, index) =>
        index === selectedImageIndex
          ? { ...image, ...updatedDetails } // Update selected image
          : image
      )
    );
    setShowEditPopup(false); // Close EditPopup
    setShowModal(true); // Reopen the first popup to show updated details
  };

  // Back button navigation
  const handleBackClick = () => {
    const pageBeforeSkyTag = localStorage.getItem("pageBeforeSkyTag");
    const navigateTo = pageBeforeSkyTag ? JSON.parse(pageBeforeSkyTag) : '/default-path';
    navigate(navigateTo); // Adjust this route to the correct path
  };


  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Sky</h1>

      <div className="flex">
        <div className="flex-1 p-6">
          
          <div className="mt-12 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-1 gap-y-12 mr-10 ml-[250px]">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative transform transition-transform duration-200 ${
                  hovered === index ? 'scale-105' : ''
                }`}
                style={{ width: '12rem', height: '10.5rem' }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={image.url}
                  alt={`Animal ${index + 1}`}
                  className="h-40 w-48 object-cover rounded-2xl shadow-lg transition-transform duration-200"
                  onClick={() => handleOpenPhotoDetails(index)}
                />
                {hovered === index && (
                  <img
                  src={fullScreenIcon}
                  alt="Expand"
                  title="Fullscreen"
                  className="absolute top-2 left-2 w-8 h-8 opacity-100 transition-opacity duration-200"
                />
                  // <button
                  //   onClick={() => handleOpenPhotoDetails(index)}
                  //   className="bg-[#BDD9E2] font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg text-center w-36 h-10 flex items-center justify-center z-20"
                  // >
                  //   Photo Details
                  // </button>
                )}
              </div>
            ))}
          </div>

          {showModal && selectedImageIndex !== null && (
            <SoldPhotoDetails
              image={images[selectedImageIndex].url}
              onClose={() => setShowModal(false)}

            />
          )}

        </div>
      </div>

      <div className="fixed left-48 top-20">
        {isHomePage ? (
          <img
            src={leftArrowIcon}
            alt="Back"
            className="w-8 h-8 mt-5 cursor-pointer"
            title="Back to Sold Photos"
            onClick={handleBackClick}
          />
        ) : (
          <img
          src={leftArrowIcon}
          alt="Back"
          className="w-8 h-8 mt-5 cursor-pointer"
          title="Back to Tags"
          onClick={handleBackClick}
        />
        )}
        <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium mb-4 right-94">
          Total Photos: {images.length}
        </div>
      </div>
    </div>
  );
}

export default Skytag;

