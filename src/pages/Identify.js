import React, { useState } from 'react';

function Identify() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setLoading(true);
    setResult(null);

    const base64Image = await toBase64(imageFile);

    try {
      const response = await fetch("/.netlify/functions/identifyPlant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": API_KEY
        },
        body: JSON.stringify({
          images: base64Image,
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
          ],
        }),
      });
if (!response.ok) {
  const errorText = await response.text();
  console.error("🔴 API returned error:", errorText);
  setResult({ error: "API Error: " + errorText });
  setLoading(false);
  return;
}

      const data = await response.json();

      if (data?.suggestions?.length > 0) {
        const top = data.suggestions[0];
        const plantDetails = top.plant_details;

        const descriptionText =
          plantDetails?.description ||
          plantDetails?.description_all ||
          plantDetails?.description_gpt ||
          "✅ It is preferable to plant this plant in well-drained soil and in a partially sunny location.📆 The ideal planting seasons are spring or fall, depending on the local climate.";

        const customDescription = `
          ${descriptionText} `;

        const plant = {
          name: top.plant_name,
          probability: Math.round(top.probability * 100),
          commonNames: plantDetails?.common_names || [],
          description: customDescription.trim(),
          wikiUrl: plantDetails?.url || `https://en.wikipedia.org/wiki/${top.plant_name}`,
          edibleParts: plantDetails?.edible_parts || [],
        };

        setResult(plant);
      } else {
        setResult({ error: "Could not identify the plant." });
      }
    } catch (error) {
      console.error("Error parsing the image:", error);
      setResult({ error: "An error occurred while calling the API" });
    }

    setLoading(false);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <div style={{ padding: '20px', placeItems: 'center' }}>
        <h2>Get to know your plant 📸</h2>
        <p className='description'>Send an image of your plant and our AI will analyze it</p>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && (
          <div style={{ marginTop: '20px' }}>
            <img src={imagePreview} alt="Your Plant" style={{ maxWidth: '300px', borderRadius: '10px' }} />
            <br />
            <button onClick={handleAnalyze} style={{ marginTop: '10px' }}>🔍 Start Plant Analysis</button>
          </div>
        )}

        {loading && <p>⏳ Analyzing...</p>}

        {result && (
          <div style={{
            marginVertical: '30px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #a7f3d0',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            maxWidth: '500px'
          }}>
            {result.error ? (
              <p style={{ color: 'red' }}>{result.error}</p>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Identify;
