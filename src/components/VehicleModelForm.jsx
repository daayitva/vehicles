import React, { useEffect, useState } from 'react';
import '../styles/model.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const VehicleModalForm = ({ onClose, vehicleToEdit,Role}) => {
  const [vehicleType, setVehicleType] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [purchaseYear, setPurchaseYear] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [driverNumber, setDriverNumber] = useState('');
  const [photo, setPhoto] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [licence, setLicence] = useState('');
  const [pricing, setPricing] = useState('');
  const [time, setTime] = useState('');
  const [pricingCriteria, setPricingCriteria] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(0);
const[logindatablchn,setLoginDataBlchn]=useState('')
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const vehicleTypes = ["Car", "Bike", "Van", "Truck", "SUV"];
  const pricingOptions = ["hour", "day", "week", "month"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
 
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/loginDriverData`);
        const emailData = res.data.Email;
        console.log(res)
       
        if (emailData) setEmail(emailData);
      } catch (err) {
        console.error("Failed to fetch driver email", err);
      }
    };

    fetchDriverData();
  }, []);

  // Pre-fill form if editing
  useEffect(() => {
    if (vehicleToEdit) {
      setVehicleType(vehicleToEdit.vehicleType || '');
      setMake(vehicleToEdit.make || '');
      setModel(vehicleToEdit.model || '');
      setPurchaseYear(vehicleToEdit.purchaseYear || '');
      setRegistrationNumber(vehicleToEdit.registrationNumber || '');
      setIdentificationNumber(vehicleToEdit.identificationNumber || '');
      setPlateNumber(vehicleToEdit.plateNumber || '');
      setDriverNumber(vehicleToEdit.driverNumber || '');
      setAadhar(vehicleToEdit.aadhar || '');
      setLicence(vehicleToEdit.licence || '');
      setPricing(vehicleToEdit.pricing || '');
      setTime(vehicleToEdit.time || '');
      setPricingCriteria(vehicleToEdit.pricingCriteria || '');
      setFuelType(vehicleToEdit.fuelType || '');
      setVehicleNumber(vehicleToEdit.VehicleNumber || 0);

      if (vehicleToEdit.photo) {
        setPreviewImage(`http://localhost:3000/files/${vehicleToEdit.photo}`);
      }
    }
  }, [vehicleToEdit]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("vehicleType", vehicleType);
    formData.append("make", make);
    formData.append("model", model);
    formData.append("purchaseYear", purchaseYear);
    formData.append("registrationNumber", registrationNumber);
    formData.append("identificationNumber", identificationNumber);
    formData.append("plateNumber", plateNumber);
    formData.append("driverNumber", driverNumber);
    formData.append("aadhar", aadhar);
    formData.append("licence", licence);
    formData.append("pricing", pricing);
    formData.append("time", time);
    formData.append("pricingCriteria", pricingCriteria);
    formData.append("fuelType", fuelType);
    formData.append("vehicleNumber", vehicleNumber);
    if (file) formData.append("file", file);

    try {
      if (vehicleToEdit && vehicleToEdit._id) {
        // Edit existing vehicle
        await axios.put(`http://localhost:3000/updateVehicle/${vehicleToEdit._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Vehicle updated successfully!");
        if(Role=="Admin"){
          navigate("/adminhome")
        }
        else{
        navigate("/driverhome")
        }
      } else {
        // Add new vehicle
        const res = await axios.post("http://localhost:3000/addVehicle", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data === "Data Stored ") {
          alert("✅ Vehicle added successfully!");
        }
      }

      onClose();
    } catch (error) {
      console.error("❌ Error submitting vehicle:", error);
      alert("Error saving vehicle. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{vehicleToEdit ? '✏️ Edit Vehicle' : '🚗 Rent New Vehicle'}</h3>
        <form onSubmit={handleSubmit} className="vehicle-form">
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required>
            <option value="">Select Vehicle Type</option>
            {vehicleTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>

          <input value={make} onChange={(e) => setMake(e.target.value)} placeholder="Make" required />
          <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" required />
          <input type="number" value={purchaseYear} onChange={(e) => setPurchaseYear(e.target.value)} placeholder="Purchase Year" required />
          <input value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} placeholder="Registration Number" required />
          <input value={identificationNumber} onChange={(e) => setIdentificationNumber(e.target.value)} placeholder="Identification Number" required />
          <input value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} placeholder="Plate Number" required />
          <input value={driverNumber} onChange={(e) => setDriverNumber(e.target.value)} placeholder="Driver Number" required />

          <label>Vehicle Photo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="Vehicle Preview"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            />
          )}

          <input value={aadhar} onChange={(e) => setAadhar(e.target.value)} placeholder="Aadhar Details" required />
          <input value={licence} onChange={(e) => setLicence(e.target.value)} placeholder="License Details" required />
          <input type="number" value={pricing} onChange={(e) => setPricing(e.target.value)} placeholder="Pricing (₹)" required />
          <input type="number" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} placeholder="Vehicle Count" required />
          <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time Duration (e.g. 5 days)" required />

          <select value={pricingCriteria} onChange={(e) => setPricingCriteria(e.target.value)} required>
            <option value="">Pricing Criteria</option>
            {pricingOptions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} required>
            <option value="">Fuel Type</option>
            {fuelTypes.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
          </select>

          <div className="modal-buttons">
            <button type="submit">{vehicleToEdit ? 'Update' : 'Submit'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleModalForm;
