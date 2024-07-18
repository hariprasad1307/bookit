const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true } // Corrected typo
}, { collection: 'Admins' });

module.exports = mongoose.model('Admin', adminSchema);
