import React from "react";
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker10 from '../Assets/Icons/marker10.png';




function Map() {
    const navigate = useNavigate();

    const handleMarkerClick = () => {
        navigate('/mapPhotos');
    }

    const customIcon = new L.Icon({
        iconUrl: marker10,
        iconSize: [25, 41], 
        iconAnchor: [12, 41] 
    });

    return (
        <div className="flex flex-col">
            <div className="fixed">
                <Navbar />
            </div>

            {/* Main content area */}
            <div className="flex-1">
                {/* Header Section */}
                <div className="flex justify-center">
                <img src={logo} alt="Logo" className="mt-2 w-32 ml-32" />
                </div>

                <h1 className="text-5xl text-center mb-6 text-[#6AABD2] mt-6 ml-32">
                Map
                </h1>


                {/* Map Section */}
                <div className="flex justify-center ml-36 mb-12 px-4 sm:px-8 lg:px-12">
                    <MapContainer
                        center={[51.0447, -114.0719]} 
                        zoom={3}
                        style={{ height: "500px", width: "100%" }}
                    >
                        {/* Leaflet Credit Display */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        />

                        {/* Markers */}
                        <Marker 
                            position={[51.0447, -114.0719]} icon={customIcon} eventHandlers={{ click: handleMarkerClick }}>
                        </Marker>

                        <Marker 
                            position={[53.5461, -113.4937]} icon={customIcon} eventHandlers={{ click: handleMarkerClick }}>
                        </Marker>
                    </MapContainer>

                </div>
        </div>
    </div>

  );
}

export default Map;
