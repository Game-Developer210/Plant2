import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function ScanPage() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>📷 Take a picture of your plant</h2>
      {!capturedImage ? (
        <div style={{
          display: 'grid', 
          gridTemplateRows: 'auto auto auto',
          gap: '15px',
          justifyItems: 'center'
        }}>
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
            />
          </div>
          <button onClick={capture} style={{ 
            marginTop: '0', // Remove margin as grid gap handles spacing
            padding: '8px 16px',
            borderRadius: '5px'
          }}>
            📸 Take a photo
          </button>
        </div>
      ) : (
        <>
          <img
            src={capturedImage}
            alt="The captured plant"
            style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
          />
          <br />
          <button onClick={() => setCapturedImage(null)} style={{ marginTop: '10px' }}>
            🔄 Recapture
          </button>
        </>
      )}
    </div>
  );
}

export default ScanPage;
