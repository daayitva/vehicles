import React, { useState, useEffect } from 'react';
import '../styles/driverDashboard.css';
import axios from 'axios';
import VehicleModalForm from './VehicleModelForm';
import VehicleDetailModal from './VehicleDetailModal';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
const DriverDashboard = () => {
  const [driverDetails, setDriverDetails] = useState({});
  const [rentedVehicles, setRentedVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editVehicle, setEditVehicle] = useState(null); // New state for editing

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };
  const fetchVehicles = async (emailData) => {
    try {
      const vehicleRes = await axios.get(`http://localhost:3000/allRentedVehicle/${emailData}`);
      setRentedVehicles(vehicleRes.data);
    } catch (err) {
      console.error("Failed to fetch vehicles", err);
    }
  };

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/loginDriverData`);
        const emailData = res.data.Email;

        if (emailData) {
          const driverRes = await axios.get(`http://localhost:3000/findByEmail/${emailData}`);
          setFullName(driverRes.data.FullName);
          setEmail(driverRes.data.Email);
          setPhoneNumber(driverRes.data.Phone);
          setDriverDetails(driverRes.data);
          await fetchVehicles(emailData);
          const vehicleRes = await axios.get(`http://localhost:3000/allRentedVehicle/${emailData}`);
          setRentedVehicles(vehicleRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch driver data", err);
      }
    };

    fetchDriverData();
  }, []);

  const openVehicleDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleEdit = async (vehicle) => {
    try {
       
      setEditVehicle(vehicle);
      setShowModal(true);
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }

  };

  const deleteVehicle = async (id) => {
    try {
      await axios.get(`http://localhost:3000/deleteVehicle/${id}`);
      setRentedVehicles(prev => prev.filter(vehicle => vehicle._id !== id));
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  };

  return (
    <div className="driver-dashboard">
      <div className="dashboard-header">
        <h2>Driver Dashboard</h2>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="rent-btn" onClick={() => {
            setShowModal(true);
            setEditVehicle(null); // Clear edit when renting new
          }}>
            Rent New Vehicle
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="driver-profile">
        <div className="driver-info">
          <p><strong>Name:</strong> {fullName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phoneNumber}</p>
        </div>
      </div>

      <div className="rented-vehicles">
        <h3>Previously Rented Vehicles</h3>
        <div className="vehicle-grid">
          {rentedVehicles.map((vehicle, index) => (
            <div key={index} className="vehicle-card">
              <figure>
                <img
                  src={vehicle.photo ? `http://localhost:3000/files/${vehicle.photo}` : "https://source.unsplash.com/400x200/?vehicle"}
                  alt="Vehicle"
                />
                <figcaption>{vehicle.make} {vehicle.model}</figcaption>
              </figure>
              <div className="vehicle-details">
                <p><strong>Type:</strong> {vehicle.vehicleType}</p>
                <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
                <p><strong>Price:</strong> ₹{vehicle.pricing} / {vehicle.pricingCriteria}</p>

                <div className="vehicle-actions">
                  <button className="view-btn" onClick={() => openVehicleDetails(vehicle)}><span>View</span></button>
                  <button className="edit-btn" onClick={() => handleEdit(vehicle)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteVehicle(vehicle._id)}>
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <VehicleModalForm
          onClose={() => {
            setShowModal(false);
            setEditVehicle(null);
            fetchVehicles(email);
          }}
          driverId={driverDetails.id}
          vehicleToEdit={editVehicle}
          Role="Driver"// Pass the vehicle to be edited (or null for new)
        />
      )}

      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
};

export default DriverDashboard;
