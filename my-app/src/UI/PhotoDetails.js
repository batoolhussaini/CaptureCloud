import React from 'react';

function PhotoDetails({
  image,
  isStarred,
  caption,
  onClose,
  onEdit,
  onMarkSold,
  onPrev, // Changed from 'onPrevious' to 'onPrev'
  onNext,
}) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg relative flex items-center justify-center">
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
            className="absolute top-1 -right-5 text-gray-600 hover:text-gray-800"
            title="Close"
          >
            &times;
          </button>

          {/* Image and Caption */}
          <img
            src={typeof image === 'string' ? image : image.url}
            alt="Details"
            className="max-w-full max-h-[80vh] object-contain rounded-lg mb-4"
          />
          <div className="flex items-center mb-4">
            {isStarred && (
              <span className="text-3xl text-text-c">
                &#9733; {/* Star icon */}
              </span>
            )}
            <p className="text-gray-700 ml-2">{caption}</p>
          </div>

          {/* Edit and Sold Buttons */}
          <div className="flex justify-between w-full">
            <button
              onClick={onEdit}
              className="bg-ccBlue px-9 py-3 rounded-[20px] font-medium text-xl"
            >
              Edit
            </button>
            <button
              onClick={onMarkSold}
              className="bg-ccBlue px-9 py-3 rounded-[20px] font-medium text-xl"
            >
              Sold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails;
