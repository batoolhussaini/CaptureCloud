import React, { useState } from 'react';
import Button from '../UI/button';
import fullScreenIcon from '../Assets/Icons/Full_Screen_Corner.png';
import FullScreen from './FullScreenView';



function SoldPhotoDetails({
  image,
  onClose,
  onRestore,
  onDelete,
  onPrev, // Changed from 'onPrevious' to 'onPrev'
  onNext,
}) 
{
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };
  const handleExitFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-lg max-w-4xl w-auto mx-4 relative">
        <button onClick={handleFullScreen} className="absolute top-3 right-2 h-6 w-6" title="Full Screen">
          <img src={fullScreenIcon} alt="Full Screen" />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={onPrev} // Updated from 'onPrevious' to 'onPrev'
          className="absolute left-[-70px] top-1/2 transform -translate-y-1/2 bg-[#ffffff] text-black font-bold rounded-full h-14 w-10 flex items-center justify-center shadow-md hover:bg-[#D9D9D9]"
          title="Previous"
        >
          &lt;
        </button>
        <button
          onClick={onNext}
          className="absolute right-[-70px] top-1/2 transform -translate-y-1/2 bg-[#ffffff] text-black font-bold rounded-full h-14 w-10 flex items-center justify-center shadow-md hover:bg-[#D9D9D9]"
          title="Next"
        >
          &gt;
        </button>

        <div className="relative w-full max-w-[90vw] max-h-[90vh] flex flex-col items-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -right-16 -top-11 text-3xl text-white transform translate-x-full"
            title="Close"
          >
            &times;
          </button>

          {/* Image and Caption */}
          <img
            src={typeof image === 'string' ? image : image.url}
            alt="Details"
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          {/* Edit and Sold Buttons */}
          <div className="flex justify-center items-center w-full p-8 mb-4 mr-6">
            <div className="left-1/2 transform -translate-x-40 z-20">
                <Button
                  onClick={onRestore}
                  color="bg-[#B1DEA5] hover:bg-[#8CBF7B]"
                  className="w-36 h-12"
                >
                  Restore to Home
                </Button>
              </div>

              <div className="right-1/2 transform translate-x-20 z-20">
                <Button
                  onClick={onDelete} 
                  color="bg-[#FF6666] hover:bg-[#e64a19]"
                  className="w-36 h-12"
                >
                  Delete
                </Button>
              </div>
          </div>
        </div>
      </div>

      {/* Full Screen Popup */}
      {isFullScreen && (
          <FullScreen
            img={image}
            onClose={() => handleExitFullScreen()}
          />
        )}
    </div>
  );
}

export default SoldPhotoDetails;
