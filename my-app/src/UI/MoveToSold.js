import React from 'react';
import i from '../Assets/Icons/i.png';

const MoveToSold = ({ title, message, onBlue, onGreen, button1Text, button2Text }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50" title = "Close">
        <div className="bg-white p-5 rounded-2xl shadow-lg border-2 border-black w-auto min-w-[500px] max-w-xl relative ml-32">
          <div className="flex items-center justify-center mb-4">
            <img src={i} alt="Icon" className="mr-4 h-10 w-8" />
            <h2 className="text-xl">{title}</h2>
          </div>
          <div className="text-md text-center mb-6">{message}</div>
          <div className="flex justify-around">
            <button 
              className="rounded-3xl shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-colors w-36 h-10 mt-6"
              onClick={onBlue} 
            >
              {button2Text}
            </button>
            <button 
              className="rounded-3xl shadow-md bg-[#B1DEA5] hover:bg-[#8CBF7B] transition-colors w-36 h-10 mt-6"
              onClick={onGreen} 
            >
              {button1Text}
            </button>
          </div>
          <button
            onClick={onBlue} 
            className="absolute top-3 right-3 text-bold text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
      </div>
    );
};

export default MoveToSold;
