const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true } // Corrected typo

}, { collection: 'customers' });

module.exports = mongoose.model('Customer', customerSchema);
