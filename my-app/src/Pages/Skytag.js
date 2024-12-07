import React, { useState } from 'react';
import Navbar from '../Layout/Navbar.js';

import logo from '../Assets/Logo/Logo.png';

function Animaltag() {
  const [hovered, setHovered] = useState(null);
  const images = [
    {
      id: 1,
      url: 'https://static.vecteezy.com/system/resources/previews/024/892/056/non_2x/vibrant-sunset-sky-over-idyllic-landscape-a-moody-backdrop-generated-by-ai-free-photo.jpg',
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/July_night_sky_%2835972569256%29.jpg/420px-July_night_sky_%2835972569256%29.jpg',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="fixed">
        <Navbar />
      </div>

      <div className="flex-1">
        <div className="flex justify-center mt-2">
          <img src={logo} alt="Logo" className="w-32 ml-32" />
        </div>

        <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">Sky</h1>

        <div className="mt-12 grid grid-cols-4 gap-16 ml-[290px] mr-[70px] gap-y-12 mb-20">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`cursor-pointer rounded-2xl transform transition-transform duration-200 ${
                hovered === index ? 'scale-105' : ''
              }`}
              style={{ width: '12rem', height: '10.5rem' }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={image.url}
                alt={`Image ${image.id}`}
                className="w-full h-full object-cover rounded-2xl "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Animaltag;
