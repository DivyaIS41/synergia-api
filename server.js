const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


// Root route - for testing if API is running
app.get("/", (req, res) => {
  res.send("Welcome to the Synergia Event Booking API 🚀");
});

// ---------------------------
// In-memory Data Storage
// ---------------------------
let events = [
  { id: 1, name: "Synergia Tech Talk", date: "2025-11-10", location: "Auditorium", capacity: 100 },
  { id: 2, name: "AI Workshop", date: "2025-11-12", location: "Lab 1", capacity: 50 }
];

let bookings = [
  { id: 1, eventId: 1, name: "Chetan", email: "chetan@example.com" },
  { id: 2, eventId: 2, name: "Riya", email: "riya@example.com" }
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
// BOOKING ROUTES
// ---------------------------

// 1. GET /api/bookings - Get all bookings
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// 2. POST /api/bookings - Create a new booking
app.post("/api/bookings", (req, res) => {
  const { eventId, name, email } = req.body;
  const event = events.find(e => e.id === parseInt(eventId));
  if (!event) return res.status(404).json({ message: "Event not found" });

  const newBooking = {
    id: bookings.length + 1,
    eventId,
    name,
    email
  };

  bookings.push(newBooking);
  res.status(201).json({ message: "Booking successful", booking: newBooking });
});

// 3. GET /api/bookings/:id - Get booking by ID
app.get("/api/bookings/:id", (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
});

// 4. PUT /api/bookings/:id - Update participant details
app.put("/api/bookings/:id", (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  const { name, email } = req.body;
  if (name) booking.name = name;
  if (email) booking.email = email;

  res.json({ message: "Booking updated successfully", booking });
});

// 5. DELETE /api/bookings/:id - Cancel a booking
app.delete("/api/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ message: "Booking not found" });

  bookings.splice(index, 1);
  res.json({ message: "Booking cancelled successfully" });
});

// ---------------------------
// START SERVER
// ---------------------------
app.listen(PORT, () => {
  console.log(`✅ Synergia API running at http://localhost:${PORT}`);
});
