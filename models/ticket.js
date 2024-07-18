const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  customerDetails: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
  },
  busDetails: {
    registrationNumber: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    price: { type: Number, required: true }
  },
  dateOfBooking: { type: Date, required: true },
  numberOfSeats: { type: Number, required: true }
}, { collection: 'tickets' });

module.exports = mongoose.model('Ticket', ticketSchema);
