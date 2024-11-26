import React, { useState } from 'react';

const CPPopup = ({ title, button, onConfirm, sub1, sub2, sub3, handleClose }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one numeric digit.';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  const handleConfirm = () => {
    const validationError = validatePassword(input2);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    if (input2 !== input3) {
      setErrorMessage('Passwords do not match.');
    } else {
      setErrorMessage('');
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#FAFAFA] p-6 rounded-2xl shadow-lg w-1/2 relative ml-32">
        <h1 className="text-3xl text-center mb-8 mt-6">{title}</h1>

        <div className="flex flex-col items-center">
          <div className="flex items-center mb-6">
            <p className="text-m mr-4 w-40 text-right">{sub1}</p>
            <input
              type="password"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              className="border-2 border-gray-300 rounded-3xl h-10 w-64 shadow-lg"
            />
          </div>

          <div className="flex items-center mb-6">
            <p className="text-m mr-4 w-40 text-right">{sub2}</p>
            <input
              type="password"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              className="border-2 border-gray-300 rounded-3xl h-10 w-64 shadow-lg"
            />
          </div>

          <div className="flex items-center mb-6">
            <p className="text-m mr-4 w-40 text-right">{sub3}</p>
            <input
              type="password"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
              className="border-2 border-gray-300 rounded-3xl h-10 w-64 shadow-lg"
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
        >
          x
        </button>
      </div>
    </div>
  );
};

export default CPPopup;
