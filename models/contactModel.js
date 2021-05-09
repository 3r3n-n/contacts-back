const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const contactSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    match: [/^[A-Za-z ]+$/, 'Please fill a valid name (without numeric digits)']
  },

  lastName: {
    type: String,
    trim: true, required: true,
    match: [/^[A-Za-z ]+$/, 'Please fill a valid name (without numeric digits)']
  },

  phoneNumber: {
    type: String,
    trim: true, required: false,
    match: [/^\d+$/, 'Please fill a valid phone number (only numeric digits)']
  },

  company: {
    type: String, trim: true, required: false,
    match: [/^[a-zA-Z0-9\.]*$/, 'Company name should not have special characters']
  },

  email: {
    type: String,
    trim: true, required: true, unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
});

contactSchema.plugin(uniqueValidator);
contactSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Contact', contactSchema);