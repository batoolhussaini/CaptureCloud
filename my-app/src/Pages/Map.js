import React from "react";
import Navbar from '../Layout/Navbar.js';
import logo from '../Assets/Logo/Logo.png';
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker10 from '../Assets/Icons/Group 29.png';
import marker11 from '../Assets/Icons/Group 30.png';

function Map() {
    const navigate = useNavigate();

    const handleMarkerClick = () => {
        navigate('/mapPhotos');
    };

    // Create an icon with custom size
    const createCustomIcon = (size) => {
        return new L.Icon({
            iconUrl: marker10,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            className: "custom-marker-icon",
        });
    };
    const customIcon = createCustomIcon(90);

    const createCustomIcon2 = (size) => {
        return new L.Icon({
            iconUrl: marker11,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            className: "custom-marker-icon2", 
        });
    };
    const customIcon2 = createCustomIcon2(90);

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
                        style={{ height: "590px", width: "100%" }}                    >
                        {/* Leaflet Credit Display */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        />

                        {/* Markers */}
                        <Marker
                            position={[51.0447, -114.0719]}
                            icon={customIcon}
                            eventHandlers={{
                                click: handleMarkerClick,
                                mouseover: (e) => {
                                    e.target.setIcon(createCustomIcon(110)); 
                                },
                                mouseout: (e) => {
                                    e.target.setIcon(createCustomIcon(90)); 
                                },
                            }}
                        />
                        <Marker
                            position={[53.5461, -113.4937]}
                            icon={customIcon2}
                            eventHandlers={{
                                click: handleMarkerClick,
                                mouseover: (e) => {
                                    e.target.setIcon(createCustomIcon2(110)); 
                                },
                                mouseout: (e) => {
                                    e.target.setIcon(createCustomIcon2(90)); 
                                },
                            }}
                        />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Map;
