import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import phone from '../Assets/Icons/Phone.png';
import question from '../Assets/Icons/Question Circle.png';
import uploadCloud from '../Assets/Icons/Upload cloud black.png';
import Popup from '../UI/Changepasswordpopup.js'; 
import CUPopup from '../UI/ConactUsPopup.js';
import Confirmation from '../UI/Confirmation.js';
import Validation from '../UI/Validation';
import QAPopup from '../UI/QAPopup.js';


function Account() {
  useEffect(() => { document.title = 'My Account'; });
  const [name] = useState("Jane Doe");
  const [email] = useState("janedoe@gmail.com");
  const [showPopup, setShowPopup] = useState(false);
  const [showCUPopup, setShowCUPopup] = useState(false);
  const [showQAPopup, setShowQAPopup] = useState(false);

  const [showConfPopup, setShowConfPopup] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [showPasswordChangeConf, setShowPasswordChangeConf] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleCUPopup = () => {
    setShowCUPopup(!showCUPopup); 
  };

  const toggleQAPopup = () => {
    setShowQAPopup(!showQAPopup); 
  };

  const toggleValidationPopup = () => {
    setShowValidationPopup(!showValidationPopup);
  };

  const handleCloseValidation = () => {
    setShowPopup(false);
    setShowPasswordChangeConf(true);
  };

  const handleCUPopupConfirm = () => {
    setShowCUPopup(false); 
    setShowConfPopup(true); 
  };

  const handleConfPopupConfirm = () => {
    setShowConfPopup(false); 
  };

  const handleDeleteAccountConfirm = () => {
    setShowValidationPopup(false); 
  };

  const handleConfirmDelete = () => {
    setShowValidationPopup(false);
    navigate('/login'); 
  };

  const handlePasswordChangeConfClose = () => {
    setShowPasswordChangeConf(false);
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
        <div className="p-12 rounded-3xl border-2 border-black w-2/5 mx-auto flex flex-col justify-between mt-6 relative">
          <div className="flex items-center">
            <label htmlFor="name" className="mr-10 w-16 text-m font-medium">
              Name
            </label>
            <div className="w-full bg-[#F5F5F5] p-3 rounded-2xl text-sm text-[#3D7292] text-zinc-600 drop-shadow-lg border border-black">
              {name}
            </div>
          </div>

          <div className="flex items-center">
            <label htmlFor="email" className="mr-10 w-16 text-m mt-4 font-medium">
              Email
            </label>
            <div className="w-full bg-[#F5F5F5] p-3 rounded-2xl text-sm text-[#3D7292] text-zinc-600 drop-shadow-lg border border-black mt-6">
              {email}
            </div>
          </div>

          <button type="button"
                  className="w-[220px] h-12 bg-[#CEECF5] hover:bg-[#B6D8E7] text-sm rounded-2xl shadow-lg block mx-auto mt-6"
                  onClick={togglePopup}>
              Change Password
          </button>

          {showPopup && 
            <Popup 
              title="Change Password" 
              sub1="Current Password" 
              sub2="New Password" 
              sub3="New Password" 
              button="Confirm"
              onConfirm={handleCloseValidation}
              handleClose={() => setShowPopup(false)}
            />
          }

          <button type="submit"
                  className="w-[220px] h-12 bg-[#ED6B6D] hover:bg-[#D45A55] text-sm rounded-2xl shadow-lg block mx-auto mt-5 transition-colors" onClick={toggleValidationPopup}>
              Delete Account
          </button>
        </div>
      </div>

      <button className="absolute bottom-20 right-14 flex items-center text-[#3D7292] hover:text-[#6AABD2] hover:underline transition-colors" onClick={toggleQAPopup}>
        <img src={question} alt="Phone Icon" className="w-6 h-6 mr-2" />
        FAQ
      </button> 
      
      <button className="absolute bottom-10 right-14 flex items-center text-[#3D7292] hover:text-[#6AABD2] hover:underline transition-colors" onClick={toggleCUPopup}>
        <img src={phone} alt="Phone Icon" className="w-6 h-6 mr-2" />
        Contact us
      </button> 

      {showCUPopup && 
        <CUPopup 
          title="Contact Us" 
          sub1="Name" 
          sub2="Email" 
          sub3="Message" 
          button="Submit"
          onConfirm={handleCUPopupConfirm}
          handleClose={() => setShowCUPopup(false)}
        />
      }

      {showQAPopup && 
        <QAPopup 
          button="Done"
          handleClose={() => setShowQAPopup(false)}
        />
      }

      {showConfPopup && 
        <Confirmation 
          message="Your inquiry has been received by our team. We will get back to you as soon as possible." 
          onConfirm={handleConfPopupConfirm}
        />
      }

      {showValidationPopup && 
        <Validation 
          title="Delete Account?" 
          message="Are you sure you want to permanently delete your account? You will lose access too all your uploaded photos." 
          button1Text="Cancel" 
          button2Text="Delete"
          onBlue={handleDeleteAccountConfirm} 
          onRed={handleConfirmDelete} 
        />
      }

      {showPasswordChangeConf && 
        <Confirmation 
          message="Password has been changed successfully." 
          onConfirm={handlePasswordChangeConfClose}
        />
      }

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
