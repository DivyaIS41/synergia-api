const mongoose = require('mongoose');

// Define Booking Schema
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  event: {
    type: String,
    required: [true, 'Event is required'],
    trim: true
  },
  ticketType: {
    type: String,
    enum: ['Standard', 'Premium', 'VIP', 'Student'],
    default: 'Standard'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export Booking Model
module.exports = mongoose.model('Booking', bookingSchema);
