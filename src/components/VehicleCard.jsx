import React from "react";
import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  return (
    <Link to={`/vehicles/${vehicle._id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300 cursor-pointer">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-52 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{vehicle.name}</h2>
          <p className="text-gray-600">Type: {vehicle.type}</p>
          <p className="text-gray-600">Fuel: {vehicle.fuelType}</p>
          <p className="text-gray-600">Seats: {vehicle.seatingCapacity}</p>
          <p className="text-green-600 font-semibold mt-2">
            ₹{vehicle.pricePerDay} / day
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
