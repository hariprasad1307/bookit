const mongoose = require('mongoose');

// Define the schema for the Bus model
const busSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true },
  numberOfSeats: { type: Number, required: true },
  busType: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  phoneNumber: { type: String, required: true }, // Assuming phoneNumber is required for your application
  departureTime: { type: String, required: true }, // Adding departure time
  arrivalTime: { type: String, required: true }    // Adding arrival time
});

// Create a model based on the schema
const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
