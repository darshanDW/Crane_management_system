const mongoose = require('mongoose');
const quoteSchema = new mongoose.Schema({
  craneType: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  rentalDuration: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  additionalServices: [{
    type: String
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  clientInfo: {
    name: String,
    email: String,
    phone: String,
    company: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quote= mongoose.model('Quote', quoteSchema);
module.exports=Quote;