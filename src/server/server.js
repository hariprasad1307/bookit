const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookit', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Define Admin schema
const adminSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  aadharnumber:String,
  // Add other fields as needed
},{ collection: 'admin' });
const Admin = mongoose.model('admin', adminSchema);

// Define Customer schema
const customerSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  age: Number,
  gender: String
  // Add other fields as needed
});

// Routes
app.post('/admin-signup', async (req, res) => {
  try {
    const { name, phoneNumber, email ,aadharnumber} = req.body;
    const admin = new Admin({ name, phoneNumber, email,aadharnumber });
    await admin.save();
    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    console.error('Error creating admin account:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
