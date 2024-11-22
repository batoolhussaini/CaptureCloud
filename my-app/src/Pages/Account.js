import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import phone from '../Assets/Icons/Phone.png';
import uploadCloud from '../Assets/Icons/Upload cloud black.png';
import Popup from '../UI/Changepasswordpopup.js'; 

function Account() {
  const [name] = useState("Jane Doe");
  const [email] = useState("janedoe@gmail.com");
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCloseValidation = () => {
    setShowPopup(false); // This will set the popup's visibility to false, closing it.
  };

  return (
    <div className="flex flex-col">
      <div className='fixed'>
        <Navbar /> 
      </div>
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
      </div>

      <h1 className="text-5xl text-center mb-6 ml-32 text-[#6AABD2] mt-6">My Account</h1>  

      <div className="ml-32">
        <div className="p-12 rounded-3xl border-2 border-black w-2/4 mx-auto flex flex-col justify-between min-h-[400px] mt-6 relative">
          <div className="flex items-center mb-4">
            <label htmlFor="name" className="mr-10 w-16 text-xl font-medium">
              Name
            </label>
            <div className="w-full bg-[#F5F5F5] p-3 rounded-2xl text-large text-[#3D7292] text-gray-700 drop-shadow-2xl border border-black">
              {name}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="email" className="mr-10 w-16 text-xl mt-4 font-medium">
              Email
            </label>
            <div className="w-full bg-[#F5F5F5] p-3 rounded-2xl text-large text-[#3D7292] text-gray-700 drop-shadow-2xl border border-black mt-6">
              {email}
            </div>
          </div>

          <button type="button"
                  className="w-[280px] h-12 bg-[#CEECF5] hover:bg-[#B6D8E7] text-l rounded-2xl shadow-lg block mx-auto mt-6"
                  onClick={togglePopup}>
              Change Password
          </button>

          {showPopup && 
            <Popup 
              title="Change Password" 
              sub1="Change Password" 
              sub2="Current Password" 
              sub3="New Password" 
              button="Confirm"
              onConfirm={handleCloseValidation}
            />
          }

          <button type="submit"
                  className="w-[280px] h-12 bg-[#ED6B6D] hover:bg-[#D45A55] text-l rounded-2xl shadow-lg block mx-auto mt-6">
              Delete Account
          </button>
        </div>
      </div>
      
      <button className="absolute bottom-10 right-14 flex items-center text-[#3D7292] hover:text-[#6AABD2] hover:underline">
        <img src={phone} alt="Phone Icon" className="w-6 h-6 mr-2" />
        Contact Us
      </button> 

      <div className="absolute bottom-16 left-[14rem] flex items-center text text-black">
        <img src={uploadCloud} alt="Upload Cloud Icon" className="w-8 h-8 mr-2" />
        <span>53 out of 500 GB used</span>
      </div>

      <div className="absolute bottom-10 left-[14rem] w-56 bg-[#F5F5F5] h-[12px] border-2 border-black rounded-full shadow-[2px_2px_5px_rgba(0,0,0,0.3)]"></div>
      <div className="absolute bottom-10 left-[14rem] w-8 bg-[#6AABD2] h-[12px] border-2 border-black rounded-full shadow-[2px_2px_5px_rgba(0,0,0,0.3)]"></div>

    </div>
  );
}

export default Account;
