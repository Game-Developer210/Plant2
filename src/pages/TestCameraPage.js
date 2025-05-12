import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const TestCameraPage = () => {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment");

  const toggleCamera = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    console.log("Switching camera to:", nextMode);
    setFacingMode(nextMode);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>📷 Test Camera</h1>
      <p>Current Mode: <strong>{facingMode}</strong></p>

      <button
        onClick={toggleCamera}
        style={{
          padding: '10px 20px',
          marginBottom: '20px',
          fontSize: '16px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        🔄 Switch Camera
      </button>

      <div style={{ maxWidth: '90%', margin: 'auto' }}>
        <Webcam
          key={facingMode} // Forces re-render on switch
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode }}
          onUserMediaError={(err) => {
            console.error("Webcam error:", err);
            alert("Failed to access camera. Please check permissions.");
          }}
        />
      </div>
    </div>
  );
};

export default TestCameraPage;
