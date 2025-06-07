import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicles");
      setVehicles(res.data);
    } catch (err) {
      toast.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this vehicle?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
      toast.success("Vehicle deleted successfully");
      setVehicles(vehicles.filter((v) => v._id !== id));
    } catch (err) {
      toast.error("Failed to delete vehicle");
    }
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Vehicle List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {loading ? (
        <p className="text-center text-gray-600">Loading vehicles...</p>
      ) : filteredVehicles.length === 0 ? (
        <p className="text-center text-gray-500">No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle._id} className="border rounded-xl shadow-md p-4 relative bg-white">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.name}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold">{vehicle.name}</h3>
              <p className="text-gray-600">Type: {vehicle.type}</p>
              <p className="text-gray-600">Fuel: {vehicle.fuelType}</p>
              <p className="text-gray-600">Seats: {vehicle.seatingCapacity}</p>
              <p className="text-blue-600 font-bold mt-1">₹{vehicle.pricePerDay}/day</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => toast.info("Edit functionality coming soon")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
