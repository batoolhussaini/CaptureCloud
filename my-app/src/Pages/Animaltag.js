// import React, { useState } from 'react';
// import Navbar from '../Layout/Navbar.js';
// import SearchbarHome from '../Layout/SearchbarHome.js';
// import logo from '../Assets/Logo/Logo.png';

// function Animaltag() {
//   const [hovered, setHovered] = useState(null);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const [isValidationVisible, setValidationVisible] = useState(false);
//   const [isConfirmationVisible, setConfirmationVisible] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);


//   const [images, setImages] = useState([
//     { url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350', caption: '', tags: [], isStarred: false, album: "" },
//     { url: 'https://images.unsplash.com/photo-1442522772768-9032b6d10e3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: '', tags: [], isStarred: false, album: ""  },
//     { url: 'https://wallpapershome.com/images/pages/pic_h/1055.jpg', caption: '', tags: [], isStarred: false, album: ""  },
//     { url: 'https://cdn.britannica.com/94/494-050-A674AD3A/Fallow-deer.jpg', caption: '', tags: [], isStarred: false, album: ""  },
//   ]);

//   // Open the first popup (Photo Details)
//   const handleOpenPhotoDetails = (index) => {
//     setSelectedImageIndex(index);
//     setShowModal(true);
//   };

//   // Open the EditPopup
//   const handleOpenEditPopup = () => {
//     setShowModal(false); // Close the first popup
//     setShowEditPopup(true); // Open EditPopup
//   };

//   const isAnimalSelected = selectedTags.includes("Animal");

//   return (
//     <div className="flex flex-col">
//       <div className="fixed">
//         <Navbar />
//       </div>

//       <div className="flex-1">
//         <div className="flex justify-center mt-2">
//           <img src={logo} alt="Logo" className="w-32 ml-32" />
//         </div>

//         <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Animal</h1>

//         <div className="flex flex-row flex-wrap mt-8 items-start justify-center gap-10 ml-32">
//           {images.map((image, index) => (
//             <div
//               key={image.id}
//               className={`cursor-pointer rounded-2xl transform transition-transform duration-200 ${
//                 hovered === index ? 'scale-105' : ''
//               }`}
//               style={{ width: '12rem', height: '10.5rem' }}
//               onMouseEnter={() => setHovered(index)}
//               onMouseLeave={() => setHovered(null)}
//             >
//               <img
//                 src={image.url}
//                 alt={`Image ${image.id}`}
//                 className="w-full h-full object-cover rounded-2xl"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Animaltag;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import logo from '../Assets/Logo/Logo.png';
import leftArrowIcon from '../Assets/Icons/Arrow left.png';
import checkIcon from '../Assets/Icons/white_check.png';
import Button from '../UI/button';
import EditPopup from '../UI/EditPopup.js';
import PhotoDetails from '../UI/PhotoDetails.js';
import Validation from '../UI/Validation';
import Confirmation from '../UI/Confirmation';

function Animaltag() {
  useEffect(() => {
    document.title = 'Animal';
  });

  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [images, setImages] = useState([
    { url: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350', caption: '', tags: [], isStarred: false, album: '' },
    { url: 'https://images.unsplash.com/photo-1442522772768-9032b6d10e3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: '', tags: [], isStarred: false, album: '' },
    { url: 'https://wallpapershome.com/images/pages/pic_h/1055.jpg', caption: '', tags: [], isStarred: false, album: '' },
    { url: 'https://cdn.britannica.com/94/494-050-A674AD3A/Fallow-deer.jpg', caption: '', tags: [], isStarred: false, album: '' },
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
    navigate('/all-tags'); // Adjust this route to the correct path
  };

  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>
      <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Animal</h1>

      <div className="flex">
        <div className="flex-1 p-6">
          
          <div className="mt-12 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-1 gap-y-12 ml-[200px]">
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
                />
                {hovered === index && (
                  <button
                    onClick={() => handleOpenPhotoDetails(index)}
                    className="bg-[#BDD9E2] font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg text-center w-36 h-10 flex items-center justify-center z-20"
                  >
                    Photo Details
                  </button>
                )}
              </div>
            ))}
          </div>

          {showModal && selectedImageIndex !== null && (
            <PhotoDetails
              image={images[selectedImageIndex]}
              isStarred={images[selectedImageIndex].isStarred}
              caption={images[selectedImageIndex].caption}
              onClose={() => setShowModal(false)}
              onEdit={handleOpenEditPopup}
            />
          )}

          {showEditPopup && selectedImageIndex !== null && (
            <EditPopup
              image={images[selectedImageIndex]}
              onClose={() => setShowEditPopup(false)}
              onSave={handleSaveEdits}
            />
          )}
        </div>
      </div>

      <div className="fixed left-48 top-20">
        <img
          src={leftArrowIcon}
          alt="Back"
          className="w-8 h-8 mt-5 cursor-pointer"
          title="Back to Animal Home"
          onClick={handleBackClick}
        />
        <div className="fixed bottom-4 left-[250px] transform -translate-x-1/2 text-medium mb-4 right-94">
          Total Photos: {images.length}
        </div>
      </div>
    </div>
  );
}

export default Animaltag;

