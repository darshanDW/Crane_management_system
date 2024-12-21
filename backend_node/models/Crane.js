const mongoose = require('mongoose');

const craneSchema = new mongoose.Schema({
  craneNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance'],
    default: 'available'
  },
  lastMaintenance: {
    type: Date,
    default: null
  },
  imageUrl: {
    type: String, // URL for the crane image stored in Cloudinary
    required: true
  },
  imagePublicId: {
    type: String, // URL for the crane document stored in Cloudinary
    required: true
  },
  documentUrl: {
    type: String, // URL for the crane document stored in Cloudinary
    required: true
  },
  documentPublicId: {
    type: String, // URL for the crane document stored in Cloudinary
    required: true
  }
});


 const Crane = mongoose.model('Crane', craneSchema);
  module.exports = Crane;