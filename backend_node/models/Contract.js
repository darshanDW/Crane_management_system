const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  quoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote',
    required: true
  },
  contractNumber: {
    type: String,
    required: true,
    unique: true
  },
  craneId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crane',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'signed', 'completed'],
    default: 'draft'
  },
  signatureData: {
    type: String,

  },
  signedDate: {
    type: Date
  },
  terms: {
    type: String,
    required: true
  },
  additionalServices: {
    type: [String], // Array to store selected additional services
    enum: ['insurance', 'fuel', 'maintenance'], // Define valid additional services
    default: []
  },
  operatorRequired: {
    type: Boolean, // Boolean to indicate if an operator is needed
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

 const Contract= mongoose.model('Contract', contractSchema);
module.exports=Contract;