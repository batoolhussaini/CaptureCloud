import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CPPopup = ({ title, button, onConfirm, sub1, sub2, sub3, handleClose }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordValidation = {
    hasMinLength: input2.length >= 6,
    hasNumber: /\d/.test(input2),
    hasSpecialChar: /[^A-Za-z0-9]/.test(input2),
    hasUppercase: /[A-Z]/.test(input2),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleConfirm = () => {
    if (!isPasswordValid) {
      setErrorMessage("Password does not meet the criteria.");
      return;
    }
    if (input1 !== "Fox245."){
      setErrorMessage('Current password is incorrect.');
      return;
    }
    if (input2 !== input3) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (input2 && input3 === input1) {
      setErrorMessage('New password cannot be the same as old password.');
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
          <div className="flex items-center relative mb-6">
            <p className="text-m mr-4 w-40 text-left">{sub1}</p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Type current password"
              className="border-2 border-[#6AABD2] rounded-3xl h-10 w-64 shadow-lg placeholder:italic pl-2 text-sm"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          </div>

          <div className="flex items-center relative mb-6">
            <p className="text-m mr-4 w-40 text-left">{sub2}</p>
            <input
              type={showNewPassword ? "text" : "password"}
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Type new password"
              className="border-2 border-[#6AABD2] rounded-3xl h-10 w-64 shadow-lg placeholder:italic pl-2 text-sm"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          </div>

          {input2 && (
            <ul className="-mt-3 text-xs space-y-1 ml-44 mb-3">
              <li className="flex items-center">
                <span className={`mr-2 ${passwordValidation.hasMinLength ? "text-green-600" : "text-red-600"}`}>
                  {passwordValidation.hasMinLength ? "✔" : "✘"}
                </span>
                At least 6 characters
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${passwordValidation.hasNumber ? "text-green-600" : "text-red-600"}`}>
                  {passwordValidation.hasNumber ? "✔" : "✘"}
                </span>
                At least 1 number
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${passwordValidation.hasSpecialChar ? "text-green-600" : "text-red-600"}`}>
                  {passwordValidation.hasSpecialChar ? "✔" : "✘"}
                </span>
                At least 1 special character
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${passwordValidation.hasUppercase ? "text-green-600" : "text-red-600"}`}>
                  {passwordValidation.hasUppercase ? "✔" : "✘"}
                </span>
                At least 1 uppercase letter
              </li>
            </ul>
          )}
          <div className="flex items-center relative mb-6">
            <p className="text-m mr-4 w-40 text-left">{sub3}</p>
            <input
              type={showPassword ? "text" : "password"}
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
              placeholder="Re-type new password"
              className="border-2 border-[#6AABD2] rounded-3xl h-10 w-64 shadow-lg placeholder:italic pl-2 text-sm"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
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

export default CPPopup;
