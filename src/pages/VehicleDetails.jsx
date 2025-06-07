import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VehicleDetails = () => {
  const { id } = useParams(); // URL se vehicle id le lo
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/vehicles/${id}`)
      .then(res => {
        setVehicle(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Vehicle not found or server error");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/vehicles" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Vehicles
      </Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={vehicle.image} alt={vehicle.name} className="w-full h-96 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{vehicle.name}</h1>
          <p className="text-gray-700 mb-2"><strong>Type:</strong> {vehicle.type}</p>
          <p className="text-gray-700 mb-2"><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
          <p className="text-gray-700 mb-2"><strong>Seating Capacity:</strong> {vehicle.seatingCapacity}</p>
          <p className="text-green-600 font-semibold text-xl mt-4">
            ₹{vehicle.pricePerDay} / day
          </p>
          {/* Booking button placeholder */}
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
