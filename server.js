const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Ticket = require('./models/ticket');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login-page', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Import models
const Admin = require('./models/admin');
const Customer = require('./models/customer');
const Bus = require('./models/bus');

// Admin Signup route
app.post('/api/admin/signup', async (req, res) => {
  try {
    const adminData = req.body;
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const admin = new Admin({ ...adminData, password: hashedPassword });
    const result = await admin.save();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Customer Signup route
app.post('/api/customer/signup', async (req, res) => {
  try {
    const customerData = req.body;
    const hashedPassword = await bcrypt.hash(customerData.password, 10);
    const customer = new Customer({ ...customerData, password: hashedPassword });
    const result = await customer.save();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin Login route
app.post('/api/admin/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const admin = await Admin.findOne({ phoneNumber: phoneNumber });
    if (!admin) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (passwordMatch) {
      res.status(200).json({ success: true, message: 'Login successful', name: admin.name, phoneNumber: admin.phoneNumber });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error finding admin:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Customer Login route
app.post('/api/customer/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const customer = await Customer.findOne({ phoneNumber: phoneNumber });
    if (!customer) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (passwordMatch) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error finding customer:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Route to add a new bus
app.post('/api/buses', (req, res) => {
  const busData = req.body;
  const bus = new Bus(busData);
  bus.save()
    .then(result => res.status(200).json({ success: true, data: result }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Combined route to get buses by phone number or origin/destination
app.get('/api/buses', (req, res) => {
  const { phoneNumber, origin, destination } = req.query;

  let query = {};
  if (phoneNumber) {
    query = { phoneNumber: phoneNumber };
  } else if (origin && destination) {
    query = { origin: origin, destination: destination };
  } else {
    return res.status(400).json({ success: false, error: 'Phone number or both origin and destination are required' });
  }

  Bus.find(query)
    .then(buses => res.status(200).json(buses))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Route to update bus by registration number
app.put('/api/buses/:registrationNumber', (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  Bus.findOneAndUpdate({ registrationNumber }, req.body, { new: true })
    .then(bus => {
      if (!bus) {
        return res.status(404).json({ success: false, message: 'Bus not found' });
      }
      res.status(200).json({ success: true, data: bus });
    })
    .catch(err => {
      console.error('Error updating bus:', err);
      res.status(500).json({ success: false, error: err.message });
    });
});

// Route to book a bus
app.put('/api/buses/book/:registrationNumber', async (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  const { customerId } = req.body;

  try {
    const bus = await Bus.findOne({ registrationNumber });

    if (!bus) {
      return res.status(404).json({ success: false, error: 'Bus not found' });
    }

    // Assuming customerId is provided and valid
    bus.bookings.push({ customerId });
    await bus.save();

    res.status(200).json({ success: true, message: 'Bus booked successfully', data: bus });
  } catch (err) {
    console.error('Error booking bus:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/customers/:phoneNumber', async (req, res) => {
  try {
    const customer = await Customer.findOne({ phoneNumber: req.params.phoneNumber });
    if (!customer) {
      return res.status(404).send({ message: 'Customer not found' });
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching customer details', error });
  }
});

// Route to book a bus and store ticket information
app.post('/api/tickets', async (req, res) => {
  const { phoneNumber, dateOfBooking, numberOfSeats, bus } = req.body;

  try {
    // Fetch customer details
    const customer = await Customer.findOne({ phoneNumber });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Save ticket information
    const ticket = new Ticket({
      customerDetails: {
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
        age: customer.age,
        gender: customer.gender,
      },
      busDetails: {
        registrationNumber: bus.registrationNumber,
        origin: bus.origin,
        destination: bus.destination,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        price: bus.price,
      },
      dateOfBooking,
      numberOfSeats,
    });

    await ticket.save();

    res.status(200).json({ success: true, message: 'Booking successful', data: ticket });
  } catch (err) {
    console.error('Error booking ticket:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
