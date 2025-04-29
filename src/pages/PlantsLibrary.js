import React, { useEffect, useState } from 'react';
import PlantCard from '../components/PlantCard';
import PlantLoader from '../components/PlantLoader';
import '../pages/PlantsLibrary.css'; 

const PlantsLibrary = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch('/.netlify/functions/getPlants');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        console.log('✅ Received data:', data);
        if (data && data.data) {
          setPlants(data.data);
          setFilteredPlants(data.data);
          setLoading(false);
        } else {
          setError('⚠️ No plant data found!');
        }
      } catch (err) {
        console.error('❌ Error fetching data:', err.message);
        setError('❌ Connection error or CORS overflow.');
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredPlants(plants.filter(plant =>
        plant.common_name?.toLowerCase().includes(search.toLowerCase())
      ));
    } else {
      setFilteredPlants(plants);
    }
  }, [search, plants]);

  return (
    <div className="p-4" style={{ paddingTop: '100px' }}>
      <h1>Plants Library 🌿</h1>
      <p style={{ color: "gray", marginBottom: '0.75rem', marginTop: '-20px' }}>
        Explore our curated collection of amazing plants - from rare exotics to easy-care favorites!
      </p>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search for a plant...'
        style={{ padding: '0.5rem', width: '100%', maxWidth: '1000px', marginBottom: '20px' }}
      />
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <PlantLoader />
      ) : (
        <div className="plant-grid">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantsLibrary;
