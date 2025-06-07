// pages/Vehicles.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleCard from '../components/VehicleCard';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vehicles')
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Available Vehicles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {vehicles.map((v) => (
          <VehicleCard key={v._id} vehicle={v} />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
