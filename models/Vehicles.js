const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: String,
  type: String,
  fuelType: String,
  pricePerDay: Number,
  seatingCapacity: Number,
  image: String,
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
