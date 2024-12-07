import React, { useState } from 'react';

const CUPopup = ({ title, button, onConfirm, sub1, sub2, sub3, handleClose }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirm = () => {
    if (!input1 || !input2 || !input3) {
      setErrorMessage('all fields must be filled out.');
      return;
    }
    if (input3.length > 500) {
      setErrorMessage('message cannot exceed 500 characters.');
      return;
    }
    setErrorMessage('');
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#FAFAFA] p-6 rounded-2xl shadow-lg w-[45%] relative ml-32 border-2 border-black">
        <h1 className="text-3xl text-center mb-8 mt-6">{title}</h1>

        <div className="flex flex-col items-center">
          <div className="flex items-center mb-6">
            <p className="text-m mr-4 w-20 text-left">{sub1}</p>
            <input
              type="text"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Type name"
              className="border-2 border-[#6AABD2] rounded-3xl h-10 w-80 shadow-lg placeholder:italic pl-3 text-sm"
            />
          </div>

          <div className="flex items-center mb-6">
            <p className="text-m mr-4 w-20 text-left">{sub2}</p>
            <input
              type="email"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Type email address"
              className="border-2 border-[#6AABD2] rounded-3xl h-10 w-80 shadow-lg placeholder:italic pl-3 text-sm"
            />
          </div>

          <div className="flex items-start mb-1">
            <p className="text-m mr-4 w-20 text-left">{sub3}</p>
            <textarea
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
              placeholder="500 characters max"
              className="border-2 border-[#6AABD2] rounded-3xl h-40 w-80 shadow-lg placeholder:italic pl-3 pt-1 text-sm resize-none"
              style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
            
            />
          </div>
          
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">{errorMessage}</div>
          )}

          <button
            onClick={handleConfirm}
            className="text-black rounded-3xl shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-colors w-28 h-10 mt-6"
          >
            {button}
          </button>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          title="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CUPopup;
