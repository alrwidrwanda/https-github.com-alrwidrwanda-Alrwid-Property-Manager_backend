const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  unitNumber: { type: String, required: true },
  block: String,
  floor: Number,
  direction: String,
  parkingSpot: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  status: { type: String, default: "Available" },
  basePrice: Number,
  currency: String
}, { timestamps: true });

module.exports = mongoose.model("Apartment", apartmentSchema);