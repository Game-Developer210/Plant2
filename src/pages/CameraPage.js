import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const CameraPage = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setLoading(true);

    try {
      const response = await fetch("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": "yHseyDpnjWNVXcgDkW5rSA5wEyTTfOMb0R7HlYXKcrHysAZRQG"
        },
        body: JSON.stringify({
          images: [imageSrc],
          modifiers: ["crops_fast", "similar_images"],
          plant_language: "en",
          plant_details: ["common_names"]
        })
      });

      const result = await response.json();
      const plantName = result?.suggestions?.[0]?.plant_name || "";

      if (plantName) {
        navigate("/library", { state: { plantName } });
      } else {
        alert("The plant has not been accurately identified.");
      }
    } catch (error) {
      console.error("Parse failed:", error);
      alert("An error occurred during parsing.");
    }

    setLoading(false);
  };

  return (
    <div className="text-center" style={{ textAlign: 'center', }}>
      <h1>Welcome to my plant🌿</h1>
      <p>Explore the world of plants and identify your plant type</p>

      <button
        onClick={() => navigate('/qr')}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '18px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Scan the barcode to start shooting.
      </button>
      <h2 className="text-xl font-bold mb-4">Take a picture of your plant</h2>
      <div style={{display: 'flex', width: '100vw', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button style={{width: '20%', marginTop: '10px', marginBottom: '50px'}} onClick={capture} className="mt-4 p-2 bg-green-500 text-white rounded">
      {loading ? "Analyzing..." : "Analyze image"}      </button>
      </div>
    </div>
  );
};

export default CameraPage;