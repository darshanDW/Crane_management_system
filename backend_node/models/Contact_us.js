const mongoose = require('mongoose');
const { create } = require('./Crane');
const contactusSchema = new mongoose.Schema({

    name: {type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
createdAt: {
    type: Date,
    default: Date.now()},
status:{
    type: String,
enum: ['open', 'resolved'],


}
});
const Contact_us = mongoose.model('Contact_us',contactusSchema);
module.exports=Contact_us;