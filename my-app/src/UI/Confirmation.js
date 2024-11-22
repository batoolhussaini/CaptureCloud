import React from 'react';

// PopUp component definition using TailwindCSS
const Confirmation = ({ message, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-black w-auto min-w-[400px] max-w-md" style={{ width: 'auto' }}>
        <div className="text-lg text-center mb-6">{message}</div>
        <button 
          className="text-black rounded-3xl shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-colors w-28 h-10 mx-auto block"
          onClick={onConfirm}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
