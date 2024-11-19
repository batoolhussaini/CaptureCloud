import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import Button from '../UI/button';
import checkIcon from '../Assets/Icons/white_check.png';

function Trash() {
    const location = useLocation();
    const { deletedImages } = location.state || {};  
    const [isSelected, setIsSelected] = useState(false); 
    const [selectedImages, setSelectedImages] = useState([]);
    const [isSelectAllActive, setIsSelectAllActive] = useState(false); 

    const handleButtonClick = () => {
        setIsSelected(!isSelected); 
        setSelectedImages([]); 
    };

    const handleImageSelect = (image) => {
        if (selectedImages.includes(image)) {
            setSelectedImages(selectedImages.filter((img) => img !== image)); 
        } else {
            setSelectedImages([...selectedImages, image]); 
        }
    };

    const handleSelectAll = () => {
        if (!isSelectAllActive) {
            setSelectedImages(deletedImages); 
        } else {
            setSelectedImages([]); 
        }
        setIsSelectAllActive(!isSelectAllActive); 
    };

    const handleRestore = () => {
    };

    const handlePermanentDelete = () => {
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <img src={logo} alt="Logo" className="mt-2 w-32" />
            </div>
            <div className="fixed">
                <Navbar />
            </div>
            <h1 className="text-6xl text-center mb-6 text-[#6AABD2] mt-6">Trash</h1>

            {deletedImages && deletedImages.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {deletedImages.map((image, index) => (
                        <div key={index} className="relative">
                            <div
                                onClick={() => isSelected && handleImageSelect(image)}  
                                className={`cursor-pointer ${isSelected && selectedImages.includes(image) ? 'border-4 border-yellow-200 rounded-2xl' : 'rounded-2xl'}`}
                            >
                                {isSelected && selectedImages.includes(image) && (
                                    <img
                                        src={checkIcon}
                                        alt="Checkmark"
                                        className="absolute top-3 left-40 w-6 h-5 z-10"  
                                    />
                                )}
                                <img 
                                    src={URL.createObjectURL(image)} 
                                    alt={`Deleted ${index + 1}`} 
                                    className="h-40 w-full object-cover rounded-3xl shadow-lg" 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No deleted images.</p>
            )}

            <div className="absolute top-12 right-40 mt-6 mr-6">
                <Button
                    onClick={handleButtonClick}
                    color="bg-[#D9D9D9] hover:bg-[#D0D8E9]" 
                    className="w-36 h-12"
                >
                    <span>{isSelected ? 'Cancel' : 'Select'}</span>
                </Button>
            </div>

            {isSelected && ( //will add to show up only when a photo is clicked, now just for demo purposes
                <>
                    <div className="fixed bottom-20 left-1/2 transform -translate-x-40">
                        <Button
                            onClick={handleRestore}
                            color="bg-[#B1DEA5] hover:bg-[#8CBF7B]"
                            className="w-36 h-12"
                        >
                            Restore
                        </Button>
                    </div>

                    <div className="fixed bottom-20 right-1/2 transform translate-x-20">
                        <Button
                            onClick={handlePermanentDelete}
                            color="bg-[#FF6666] hover:bg-[#e64a19]"
                            className="w-36 h-12"
                        >
                            Delete
                        </Button>
                    </div>
                    
                    <div className="absolute top-12 left-60 mt-10">
                    <span
                        onClick={handleSelectAll}
                        className={`cursor-pointer underline text-blue-500 text-2xl ${isSelectAllActive ? 'font-bold' : 'hover:font-bold'}`}
                        >
                        Select All
                    </span>
                </div>
                </>
            )}
        </div>
    );
}

export default Trash;
