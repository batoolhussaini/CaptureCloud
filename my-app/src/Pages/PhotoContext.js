import React, { createContext, useState, useContext } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  const addPhotos = (newPhotos) => {
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  return (
    <PhotoContext.Provider value={{ photos, addPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};


export const usePhotoContext = () => useContext(PhotoContext);
