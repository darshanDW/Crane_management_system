const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  craneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crane',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technician: {
    type: String,
    required: true
  }
}, { timestamps: true });

 const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
 module.exports=Maintenance;