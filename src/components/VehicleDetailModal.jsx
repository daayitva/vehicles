import React from 'react';
import '../styles/vehiclemodal.css';

const VehicleDetailModal = ({ vehicle, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal vehicle-detail-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{vehicle.make} {vehicle.model} Details</h3>
        <img
          src={vehicle.photo ? `http://localhost:3000/files/${vehicle.photo}` : "https://source.unsplash.com/400x200/?car"}
          alt="Vehicle"
          className="modal-image"
        />
        <div className="modal-content">
          <p><strong>Account:</strong> {vehicle.Email}</p>
          <p><strong>Vehicle Type:</strong> {vehicle.vehicleType}</p>
          <p><strong>Make:</strong> {vehicle.make}</p>
          <p><strong>Model:</strong> {vehicle.model}</p>
          <p><strong>Year:</strong> {vehicle.purchaseYear}</p>
          <p><strong>Registration No.:</strong> {vehicle.registrationNumber}</p>
          <p><strong>ID No.:</strong> {vehicle.identificationNumber}</p>
          <p><strong>Plate No.:</strong> {vehicle.plateNumber}</p>
          <p><strong>Driver Number:</strong> {vehicle.driverNumber}</p>
          <p><strong>Aadhar:</strong> {vehicle.aadhar}</p>
          <p><strong>License:</strong> {vehicle.licence}</p>
          <p><strong>Total Vehicles:</strong> {vehicle.VehicleNumber}</p>
          <p><strong>Pricing:</strong> ₹{vehicle.pricing}</p>
          <p><strong>Time:</strong> {vehicle.time}</p>
          <p><strong>Criteria:</strong> {vehicle.pricingCriteria}</p>
          <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
        </div>
        <button onClick={onClose} className="close-modal-btn">Close</button>
      </div>
    </div>
  );
};

export default VehicleDetailModal;
