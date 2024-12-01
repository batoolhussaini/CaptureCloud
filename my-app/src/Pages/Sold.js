import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import Button from '../UI/button';
import Searchbar from '../Layout/Searchbar.js';
import Popup from '../UI/Soldpopup.js';
import { usePhotoContext } from './PhotoContext'; 
import pic1 from '../Assets/Photos/pic1.jpg';
import pic2 from '../Assets/Photos/pic2.jpg';
import pic3 from '../Assets/Photos/pic3.jpeg';
import pic4 from '../Assets/Photos/pic4.jpg';
import pic5 from '../Assets/Photos/pic5.jpg';
import pic6 from '../Assets/Photos/pic6.avif';
import checkIcon from '../Assets/Icons/white_check.png';

function Sold() {

  useEffect(() => {
    document.title = 'Sold';
  }, []);

  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // Array of image IDs
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [hovered, setHovered] = useState(null); // Hover state for image box

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
    setSelectedImages([]); // Reset selected images when toggling select mode
  };

  const handleImageSelect = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedImages = combinedImages.filter((image) => !selectedImages.includes(image.id));
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    selectedImages.forEach((id) => {
      const image = combinedImages.find((img) => img.id === id);
      if (image) {
        trash.push(image.url);
      }
    });
    localStorage.setItem('trash', JSON.stringify(trash));

    setCombinedImages(updatedImages);
    setSelectedImages([]);
  };

  const handleDeleteImage = () => {
    const imageToDelete = combinedImages[selectedImageIndex];
    const updatedImages = combinedImages.filter((image) => image.id !== imageToDelete.id);
    setCombinedImages(updatedImages);
    setShowModal(false); // Close the popup after deleting
  };

  // List of hardcoded images with unique IDs
  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
      caption: '',
      tags: ['cat', 'animal'],
      isStarred: false,
    },
    {
      id: 2,
      url: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
      caption: '',
      tags: ['nature'],
      isStarred: false,
    },
    {
      id: 3,
      url: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s',
      caption: '',
      tags: ['nature', 'water'],
      isStarred: false,
    },
    { id: 4, url: pic1, caption: '', tags: ['pink'], isStarred: false, album: "Flowers" },
    { id: 5, url: pic2, caption: '', tags: [], isStarred: false, album: "Flowers" },
    { id: 6, url: pic3, caption: '', tags: [], isStarred: false, album: "Flowers" },
    { id: 7, url: pic4, caption: '', tags: [], isStarred: false, album: "Flowers" },
    { id: 8, url: pic5, caption: '', tags: [], isStarred: false, album: "Flowers" },
    { id: 9, url: pic6, caption: '', tags: [], isStarred: false, album: "Flowers" },
  ]);

  // Using the context to get photos from the Upload page
  const { photos } = usePhotoContext();

  // State for combined images
  const [combinedImages, setCombinedImages] = useState([]);

  useEffect(() => {
    // Get the maximum id from the existing images
    const maxId = images.reduce((max, image) => (image.id > max ? image.id : max), 0);

    const newCombinedImages = [
      ...images,
      ...photos.map((photo, index) => ({
        id: maxId + index + 1,
        url: URL.createObjectURL(photo),
        caption: '',
        tags: [],
        isStarred: false,
      })),
    ];
    setCombinedImages(newCombinedImages);
  }, [images, photos]);

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % combinedImages.length;
    setSelectedImageIndex(nextIndex);
    setCurrentImage(combinedImages[nextIndex]);
  };

  const handlePreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + combinedImages.length) % combinedImages.length;
    setSelectedImageIndex(prevIndex);
    setCurrentImage(combinedImages[prevIndex]);
  };

  // Open the popup (Photo Details)
  const handleOpenPhotoDetails = (index) => {
    setSelectedImageIndex(index); // Set the index of selected image
    setCurrentImage(combinedImages[index]); // Set the current image to the one at the selected index
    setShowModal(true); // Open the modal
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <div className="fixed">
        <Navbar />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Sold Photos</h1>
      <>
        <div className="absolute top-20 right-40 mt-6 mr-6 z-50" title={isSelected ? "Cancel Select" : "Select Photo(s)"}>
          <Button
            onClick={handleButtonClick}
            color={isSelected ? "bg-[#B0B0B0]" : "bg-[#D9D9D9] hover:bg-[#B0B0B0]"} 
            className="fixed w-36 h-12"
          >
            <span>{isSelected ? 'Cancel' : 'Select'}</span>
          </Button>
        </div>
      </>
      {isSelected && selectedImages.length > 0 && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 mt-6 z-50">
          <Button
            onClick={handleDeleteSelected}
            color="bg-[#FF6666] hover:bg-[#e64a19]"
            className="w-36 h-12"
          >
            Delete Photos
          </Button>
        </div>
      )}

      <div className="fixed bottom-0 left-60 transform text-center">
        <p className="text-black font-small">
          Total Photos: {combinedImages.length}
        </p>
      </div>

      {/* Searchbar */}
      <div className="mt-4 flex flex-col items-center ml-32">
        <Searchbar />
      </div>

      {/* Top Tags */}
      <div className="flex flex-row mt-8 items-start justify-center gap-5">
        <h2 className="m-1 text-xl text-center text-[#016AC7] font-bold">
          Top Tags
        </h2>
        <button className="bg-blueButton-c text-[#016AC7] px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
          &#9733; Favourites
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Nature
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Summer
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Beach
        </button>
        <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
          Animal
        </button>
        <button className="mb-4 text-xl text-[#016AC7] font-bold">
          All Tags &#10230;
        </button>
      </div>

      {/* Image Boxes */}
      <div className="mt-12 grid grid-cols-4 gap-16 ml-[240px] mr-[70px] gap-y-12 mb-20">
        {combinedImages.map((image, index) => (
          <div key={image.id} className="relative group">
            <div
              onClick={() => isSelected ? handleImageSelect(image.id) : handleOpenPhotoDetails(index)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`cursor-pointer ${isSelected && selectedImages.includes(image.id) ? 'border-4 border-yellow-200 rounded-2xl' : 'rounded-2xl'} transform transition-transform duration-200 ${hovered === index ? 'scale-105' : ''}`}
              style={{ width: '12rem', height: '10.5rem' }}
            >
              {/* Checkmark for selected images */}
              {isSelected && selectedImages.includes(image.id) && (
                <img
                  src={checkIcon}
                  alt="Checkmark"
                  className="absolute top-3 left-40 w-6 h-5 z-10"
                />
              )}
              {/* Show "Photo Details" button only when not in select mode and hovered */}
              {!isSelected && hovered === index && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the image click event
                    handleOpenPhotoDetails(index);
                  }}
                  className="bg-[#BDD9E2] font-medium p-2 px-4 rounded-full shadow-md focus:outline-none absolute inset-0 m-auto flex items-center justify-center w-3/4 h-10"
                >
                  Photo Details
                </button>
              )}
              {/* Image Element */}
              <img
                src={image ? image.url : ''} 
                alt={`Preview ${index}`}
                className="h-40 w-48 object-cover rounded-2xl shadow-lg"
                style={{ marginLeft: '-1px' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showModal && currentImage && (
        <Popup
          image={currentImage}
          onClose={() => setShowModal(false)}
          onDelete={handleDeleteImage}
        />
      )}
    </div>
  );
}

export default Sold;
