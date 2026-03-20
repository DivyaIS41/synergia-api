require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// ---------------------------
// MongoDB Connection
// ---------------------------
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/synergia-bookings')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Root route - for testing if API is running
app.get("/", (req, res) => {
  res.send("Welcome to the Synergia Event Booking API 🚀");
});

// ---------------------------
// In-memory Data Storage (Events only)
// ---------------------------
let events = [
  { id: 1, name: "Synergia Tech Talk", date: "2025-11-10", location: "Auditorium", capacity: 100 },
  { id: 2, name: "AI Workshop", date: "2025-11-12", location: "Lab 1", capacity: 50 }
];

// ---------------------------
// EVENT ROUTES
// ---------------------------

// 1. GET /events - Get all events
app.get("/events", (req, res) => {
  res.json(events);
});

// 2. POST /events/add - Create a new event
app.post("/events/add", (req, res) => {
  const { name, date, location, capacity } = req.body;
  if (!name || !date || !location || !capacity)
    return res.status(400).json({ message: "Please provide all event details" });

  const newEvent = {
    id: events.length + 1,
    name,
    date,
    location,
    capacity
  };
  events.push(newEvent);
  res.status(201).json({ message: "Event created successfully", event: newEvent });
});

// 3. GET /event/:id - Get event by ID
app.get("/event/:id", (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
});

// 4. PUT /event/:id - Update event details
app.put("/event/:id", (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });

  const { name, date, location, capacity } = req.body;
  if (name) event.name = name;
  if (date) event.date = date;
  if (location) event.location = location;
  if (capacity) event.capacity = capacity;

  res.json({ message: "Event updated successfully", event });
});

// 5. DELETE /event/:id - Cancel a event
app.delete("/event/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  events.splice(index, 1);
  res.json({ message: "Event deleted successfully" });
});

// ---------------------------
// BOOKING ROUTES (MongoDB CRUD Operations)
// ---------------------------

// 1. GET /api/bookings - Get all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// 2. POST /api/bookings - Create a new booking
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, event, ticketType } = req.body;

    // Validation
    if (!name || !email || !event) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, event'
      });
    }

    // Create new booking
    const newBooking = new Booking({
      name,
      email,
      event,
      ticketType: ticketType || 'Standard'
    });

    // Save to MongoDB
    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: savedBooking
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// 3. GET /api/bookings/:id - Get booking by ID
app.get("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
});

// 4. PUT /api/bookings/:id - Update participant details
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, event, ticketType } = req.body;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (event) updateData.event = event;
    if (ticketType) updateData.ticketType = ticketType;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: error.message
    });
  }
});

// 5. DELETE /api/bookings/:id - Cancel/Delete a booking
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: deletedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message
    });
  }
});

// 6. GET /api/bookings/search?email=xyz - Search booking by email
app.get("/api/bookings/search/email", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email parameter'
      });
    }

    // Case-insensitive email search
    const bookings = await Booking.find({
      email: { $regex: email, $options: 'i' }
    });

    res.json({
      success: true,
      count: bookings.length,
      query: { email },
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching bookings',
      error: error.message
    });
  }
});

// 7. GET /api/bookings/filter?event=Synergia - Filter booking by event
app.get("/api/bookings/filter/event", async (req, res) => {
  try {
    const { event } = req.query;

    if (!event) {
      return res.status(400).json({
        success: false,
        message: 'Please provide event parameter'
      });
    }

    // Case-insensitive event filter
    const bookings = await Booking.find({
      event: { $regex: event, $options: 'i' }
    });

    res.json({
      success: true,
      count: bookings.length,
      query: { event },
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error filtering bookings',
      error: error.message
    });
  }
});

// Additional filter by ticket type
app.get("/api/bookings/filter/ticketType", async (req, res) => {
  try {
    const { ticketType } = req.query;

    if (!ticketType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide ticketType parameter'
      });
    }

    const bookings = await Booking.find({ ticketType });

    res.json({
      success: true,
      count: bookings.length,
      query: { ticketType },
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error filtering bookings',
      error: error.message
    });
  }
});

// ---------------------------
// START SERVER
// ---------------------------
const server = app.listen(PORT, () => {
  console.log(`✅ Synergia API running at http://localhost:${PORT}`);
  console.log(`📦 MongoDB: Connected to ${process.env.MONGODB_URI || 'mongodb://localhost:27017/synergia-bookings'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏹️  Shutting down server...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
