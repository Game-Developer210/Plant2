import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const CameraPage = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const navigate = useNavigate();

  const toggleCamera = () => {
    setFacingMode(prev => (prev === "environment" ? "user" : "environment"));
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/.netlify/functions/identifyPlant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          images: [imageSrc],
          organs: ["leaf"],
          details: [
            "common_names",
            "description",
            "description_all",
            "description_gpt",
            "taxonomy",
            "url",
            "rank",
            "synonyms",
            "edible_parts",
            "watering",
            "disease"
          ]
        }),
      });

      const data = await response.json();
      const top = data?.suggestions?.[0];

      if (top) {
        const details = top.plant_details;
        const descriptionText =
          details?.description ||
          details?.description_all ||
          details?.description_gpt ||
          "No description available.";

        const customDescription = `
✅ It is preferable to plant this plant in well-drained soil and in a partially sunny location.
📅 The ideal planting seasons are spring or fall, depending on the local climate.
        `.trim();

        const plantResult = {
          name: top.plant_name,
          probability: Math.round(top.probability * 100),
          commonNames: details?.common_names || [],
          description: `${descriptionText}\n\n${customDescription}`,
          wikiUrl: details?.url || `https://en.wikipedia.org/wiki/${top.plant_name}`,
          edibleParts: details?.edible_parts || []
        };

        setResult(plantResult);
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
    <div className="text-center" style={{ textAlign: 'center', paddingTop: '70px' }}>
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

      <div style={{
        display: 'flex',
        width: '100vw',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <button
          onClick={toggleCamera}
          style={{
            marginBottom: '10px',
            padding: '8px 16px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          🔄 Switch Camera
        </button>

        <Webcam
          key={facingMode}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: { exact: facingMode }
          }}
          onUserMediaError={(err) => console.error("Webcam error:", err)}
        />

        <button
          style={{ width: '20%', marginTop: '10px', marginBottom: '30px' }}
          onClick={capture}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          {loading ? "Analyzing..." : "Analyze image"}
        </button>

        {result && (
          <div style={{
            marginTop: '20px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #a7f3d0',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            maxWidth: '500px'
          }}>
            <h2 style={{ color: '#166534' }}>🌿 {result.name}</h2>
            <p style={{ fontWeight: 'bold' }}>
              🧠 Probability: <span style={{ color: '#065f46' }}>{result.probability}%</span>
            </p>
            {result.commonNames.length > 0 && (
              <p><strong>📛 Common Names:</strong> {result.commonNames.join(', ')}</p>
            )}
            <p><strong>📝 Description:</strong> {result.description}</p>
            {result.edibleParts.length > 0 && (
              <p><strong>🥗 Edible Parts:</strong> {result.edibleParts.join(', ')}</p>
            )}
            <a
              href={result.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: '10px', color: '#0d9488' }}
            >
              🔗 Read more on Wikipedia
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraPage;
