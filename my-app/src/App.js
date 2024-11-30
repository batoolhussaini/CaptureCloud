import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Account from './Pages/Account';
import Album from './Pages/Album';
import Statistics from './Pages/Statistics';
import Trash from './Pages/Trash';
import Sold from './Pages/Sold';
import Upload from './Pages/Upload';
import AllTags from './Pages/AllTags';
import AlbumDetails from './Pages/AlbumDetails';  
import Flowers from './Pages/Flowers';
import Map from './Pages/Map'
import MapPhotos from './Pages/MapPhotos'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/albums" element={<Album />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/sold" element={<Sold />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/album/:name" element={<AlbumDetails />} />  
        <Route path="/Flowers" element={<Flowers />} />
        <Route path="/all-tags" component={<AllTags />} />
        <Route path="/map" element={<Map />} />
        <Route path="/mapPhotos" element={<MapPhotos />} />
      </Routes>
    </Router>
  );
}

export default App;
