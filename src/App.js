import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Identify from './pages/Identify';
import About from './pages/About';
import PlantsLibrary from './pages/PlantsLibrary';
import QRCodePage from './pages/QRCodePage';
import ScanPage from './pages/ScanPage';
import CameraPage from './pages/CameraPage';
import TestCameraPage from './pages/TestCameraPage';
import "./App.css";

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className="background-container">
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/identify" element={<Identify />} />
          <Route path="/library" element={<PlantsLibrary />} />
          <Route path="/about" element={<About />} />
          <Route path="/qr" element={<QRCodePage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/testcamera" element={<TestCameraPage />} />
          </Routes>
        </div>
        </div>
     </div>
</Router>
  );
}

export default App;

