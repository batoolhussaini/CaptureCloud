import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import Searchbar from '../Layout/Searchbar.js';
import logo from '../Assets/Logo/Logo.png';
import EditPopup from '../Layout/EditPopup.js';
import InfoIcon from '../Assets/Icons/Info icon.png';

function Home() {
  const [hovered, setHovered] = useState(false); // Hover state for image box
  const [showModal, setShowModal] = useState(false); // Initial popup modal state
  const [showEditPopup, setShowEditPopup] = useState(false); // Edit popup state
  const [showSoldMessage, setShowSoldMessage] = useState(false); // Sold confirmation popup state
  const [isExpanded, setIsExpanded] = useState(false); // Expand state for any additional UI
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Index of the selected image

  // State for the list of images
  const [images, setImages] = useState([
    {
      url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
      caption: '',
      tags: [],
      isStarred: false,
    },
    {
      url: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
      caption: '',
      tags: [],
      isStarred: false,
    },
    {
      url: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s',
      caption: '',
      tags: [],
      isStarred: false,
    }
    // Add more dummy images as needed
  ]);

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
    setImages((prevImages) => prevImages.filter((_, index) => index !== selectedImageIndex));
    setShowEditPopup(false); // Close the EditPopup after deleting
  };

  // Toggle expand state
  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex-1">
        {/* Header Section */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="mt-2 w-32" />
        </div>

        <h1 className="text-5xl font-medium text-center mb-3 text-text-c mt-6">Home</h1>

        {/* Searchbar */}
        <div className="mt-4 flex flex-col items-center">
          <Searchbar />
        </div>

        {/* Top Tags - HARDCODEDDDD FIX THISS */}
        <div className="flex flex-row mt-8 items-start justify-center gap-5">
          <h2 className="m-1 text-xl text-center text-[#016AC7] font-bold">Top Tags</h2>
          <button className="bg-blueButton-c text-[#016AC7] px-2 py-1 rounded-full mr-2 mb-2 flex items-center">
            &#9733; Favourites
          </button>
          <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">Nature</button>
          <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">Summer</button>
          <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">Beach</button>
          <button className="bg-blueButton-c text-[#016AC7] px-3 py-1 rounded-full mr-2 mb-2 flex items-center">Animal</button>
          <button className="mb-4 text-xl text-[#016AC7] font-bold">All Tags &#10230;</button>
        </div>

        {/* Image Boxes */}
        <div className="mt-10 grid grid-cols-5 gap-3 justify-items-center">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-52 h-48 rounded-lg transform transition-transform duration-200 ${
                hovered ==index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHovered(index)} //only show this if certain image is hovered on
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image Element */}
              <img
                src={image.url}
                alt={`Preview ${index}`} //with index now
                className="relative w-52 h-48 rounded-lg transform transition-transform duration-200"
              />
              {hovered == index && (
                <button
                  onClick={() => handleOpenPhotoDetails(index)} // Show the initial popup
                  className="bg-[#BDD9E2] font-medium p-2 px-4 rounded-full shadow-md focus:outline-none absolute inset-0 m-auto flex items-center justify-center w-3/4 h-10"
                >
                  Photo Details
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Initial Popup Modal */}
        {showModal && selectedImageIndex !== null && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg w-100 shadow-lg relative">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>

              {/* Image and Updated Caption */}
              <img
                src={images[selectedImageIndex].url}
                alt="Photo details"
                className="max-w-full max-h-[80vh] object-contain rounded-lg mb-4"
              />
              <div className="flex items-center mb-4">
                {images[selectedImageIndex].isStarred && (
                  <span className={'text-3xl text-text-c'}>
                    &#9733; {/* Star icon */}
                  </span>
                )}
                <p className="text-gray-700 ml-2">{images[selectedImageIndex].caption}</p>
              </div>

              {/* Edit and Sold Buttons */}
              <div className="flex justify-between">
                <button onClick={handleOpenEditPopup} className="bg-ccBlue px-4 py-2 rounded-full font-medium">
                  Edit
                </button>
                <button onClick={() => setShowSoldMessage(true)} className="bg-ccBlue px-4 py-2 rounded-full font-medium">
                  Sold
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sold Confirmation */}
        {showSoldMessage && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
              <h2 className="text-lg font-bold mb-4 flex items-center justify-center gap-3">
                <img src={InfoIcon} className="w-10 h-10" alt="Info Icon" />
                Mark Photo as Sold?
              </h2>
              <p className="text-gray-700 mb-4">
                This photo will be moved to the Sold page and removed from Home.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowSoldMessage(false)} // Cancel
                  className="bg-[#BDD9E2] px-4 py-2 rounded-full font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSoldPopup} // Handle Sold action
                  className="bg-greenButton-c px-4 py-2 rounded-full text-black font-medium"
                >
                  Sold
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EditPopup Component */}
        {showEditPopup && selectedImageIndex !== null && (
          <EditPopup
            image={images[selectedImageIndex]}
            onClose={() => setShowEditPopup(false)}
            onSave={handleSaveEdits}
            onDelete={handleDeleteImage}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
