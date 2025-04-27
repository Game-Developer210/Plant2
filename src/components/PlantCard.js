// src/components/PlantCard.js
import React from 'react';
import '../styles.css';
const PlantCard = ({ plant }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-all">
      <h2 className="text-lg font-semibold mb-2">{plant.common_name || 'Unknown name'}</h2>
      <p className='scientific-name'>{plant.scientific_name}</p>
      {plant.image_url && (
        <img src={plant.image_url} alt={plant.common_name} className="w-full plant-img h-40 object-cover mt-2 rounded" />
      )}
    </div>
  );
};

export default PlantCard;
