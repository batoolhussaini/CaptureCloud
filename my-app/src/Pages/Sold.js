import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import Button from '../UI/button';
import Searchbar from '../Layout/Searchbar.js';
import { usePhotoContext } from './PhotoContext'; 
import pic1 from '../Assets/Photos/pic1.jpg';
import pic2 from '../Assets/Photos/pic2.jpg';
import pic3 from '../Assets/Photos/pic3.jpeg';
import pic4 from '../Assets/Photos/pic4.jpg';
import pic5 from '../Assets/Photos/pic5.jpg';
import pic6 from '../Assets/Photos/pic6.avif';

function Sold() {
  useEffect(() => {
    document.title = 'Albums';
  });
  const { name } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageInfo, setImageInfo] = useState({});
  const [isRenamePopupOpen, setIsRenamePopupOpen] = useState(false);

  const maxImages = 10;

  const progressBar = () => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setUploadProgress(progress);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsConfirmationOpen(true); 
        },); 
      }
    }, 300);
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      const invalidFiles = fileArray.filter((file) => !file.type.startsWith('image/'));
      if (invalidFiles.length > 0) {
        alert('Please upload only image files.');
        return;
      }
      if (images.length + fileArray.length > maxImages) {
        alert(`You can only upload a maximum of ${maxImages} images at a time.`);
        return;
      }
      setImages((prevImages) => [...prevImages, ...fileArray]);
      setIsUploaded(true);
    }
  };

  const handleUploadClick = () => {
    setIsVisible(false);
    setIsUploadClicked(true);
    progressBar();
  };

  const handleBackClick = () => {
    navigate('/albums');
  };

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  const handleImageSelect = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image));
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    selectedImages.forEach((image) => {
      trash.push(URL.createObjectURL(image));
    });
    localStorage.setItem('trash', JSON.stringify(trash));

    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleEditClick = (image) => {
    setCurrentImage(image);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentImage(null);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
  };

  const handleSave = (image, updatedData) => {
    setImageInfo((prevInfo) => ({
      ...prevInfo,
      [image.name]: updatedData, 
    }));
    setIsPopupOpen(false); 
  };

  const handleDelete = (image) => {
    setImages((prevImages) => prevImages.filter((img) => img !== image));
    setIsPopupOpen(false); 
  };

  const handleEditAlbumName = () => {
    setIsRenamePopupOpen(true);
  };

  const handleRenameConfirm = (newName) => {
    const albums = JSON.parse(localStorage.getItem('albums')) || [];
    const updatedAlbums = albums.map((album) =>
      album.name === decodeURIComponent(name) ? { ...album, name: newName } : album
    );
    localStorage.setItem('albums', JSON.stringify(updatedAlbums));

    setIsRenamePopupOpen(false);
    navigate(`/album/${encodeURIComponent(newName)}`);
  };

  const handleRenameClose = () => {
    setIsRenamePopupOpen(false); 
  };

  const [hovered, setHovered] = useState(false); // Hover state for image box
  const [showModal, setShowModal] = useState(false); // Initial popup modal state
  const [showEditPopup, setShowEditPopup] = useState(false); // Edit popup state
  const [showSoldMessage, setShowSoldMessage] = useState(false); // Sold confirmation popup state
  const [isExpanded, setIsExpanded] = useState(false); // Expand state for any additional UI
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Index of the selected image

  useEffect(() => {
    document.title = 'Home';
  });

  // list of hardcoded images
  const [images, setImages] = useState([
    {
      url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
      caption: '',
      tags: ['cat', 'animal'],
      isStarred: false,
    },
    {
      url: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
      caption: '',
      tags: ['nature'],
      isStarred: false,
    },
    {
      url: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s',
      caption: '',
      tags: ['nature', 'water'],
      isStarred: false,
      
    },
    { url: pic1, caption: '', tags: ['pink'], isStarred: false, album: "Flowers" },
    { url: pic2, caption: '', tags: [], isStarred: false, album: "Flowers"  },
    { url: pic3, caption: '', tags: [], isStarred: false, album: "Flowers"  },
    { url: pic4, caption: '', tags: [], isStarred: false, album: "Flowers"  },
    { url: pic5, caption: '', tags: [], isStarred: false, album: "Flowers"  },
    { url: pic6, caption: '', tags: [], isStarred: false, album: "Flowers"  },
    // Add more dummy images as needed
  ]);

  // Using the context to get photos from the Upload page
  const { photos } = usePhotoContext();
  // Combine hardcoded images and uploaded photos into one list
  const combinedImages = [
    ...images, // Hardcoded images
    ...photos.map((photo) => ({
      url: URL.createObjectURL(photo),
      caption: '',
      tags: [],
      isStarred: false,
    })), // Uploaded photos
  ];

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % combinedImages.length;
    setSelectedImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + combinedImages.length) % combinedImages.length;
    setSelectedImageIndex(prevIndex);
  };

  // Open the first popup (Photo Details)
  const handleOpenPhotoDetails = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  // Open the EditPopup
  const handleOpenEditPopup = () => {
    setShowModal(false); // Close the first popup
    setShowEditPopup(true); // Open EditPopup
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

  // Handle marking a photo as sold
  const handleSoldPopup = () => {
    //move to sold - doesnt do anything for now
    setShowSoldMessage(false); // Close Sold confirmation
    setShowModal(false); // Close modal since the image is removed
  };

  // Delete an image
  const handleDeleteImage = () => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== selectedImageIndex)
    );
    setShowEditPopup(false); // Close the EditPopup after deleting
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
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 mt-6">
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
            Total Photos: {images.length}
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
         
        </div>
      </div>
    
      );
}

export default Sold;