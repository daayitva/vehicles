// controllers/vehicleController.js
const Vehicle = require("../models/Vehicle");

const addVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    const saved = await newVehicle.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addVehicle };
