# Synergia Event Booking API

A REST API built with Node.js and Express.js for managing event bookings and registrations for the Synergia event platform.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Testing](#testing)

---

## 📖 Project Overview

Synergia API is a comprehensive REST API that provides functionality for:
- **Event Management**: Create, read, update, and delete events
- **Booking Management**: Create, read, update, and delete event bookings
- **Participant Tracking**: Manage participant information for events

### Key Features
- RESTful API design
- In-memory data storage (can be extended with MongoDB)
- Request validation
- Proper HTTP status codes
- JSON response format

---

## 🔧 Prerequisites

Before running this project, ensure you have the following installed on your system:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (Node Package Manager)
   - Usually comes with Node.js
   - Verify installation: `npm --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

---

## 💾 Installation

Follow these steps to set up the project on your local machine:

### Step 1: Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd synergia-api

# OR manually download and extract the project folder
cd synergia-api
```

### Step 2: Install Dependencies

Navigate to the project directory and install all required npm packages:

```bash
npm install
```

**Expected Output:**
```
up to date, audited 117 packages in 2s
...
```

### Step 3: Verify Installation

Ensure all packages are installed correctly:

```bash
npm list
```

---

## 🚀 Running the Project

### Start the Server

Run the following command to start the API server:

```bash
npm start
```

**Expected Output:**
```
> nodemon server.js

✅ Synergia API running at http://localhost:3000
```

The server will automatically restart if you make any changes to the code (thanks to nodemon).

### Server Status

- **URL**: http://localhost:3000
- **Port**: 3000
- **Status**: Running ✅

### Stop the Server

Press `Ctrl + C` in the terminal to stop the server.

---

## 📁 Project Structure

```
synergia-api/
├── server.js                 # Main application file with API routes
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency lock file
├── README.md               # This file
├── test-api.js             # Automated test script
└── screenshots/            # Project screenshots
```

### Key Files

- **server.js**: Contains all Express routes and event/booking management logic
- **package.json**: Defines project dependencies (express, body-parser, mongodb, ws, nodemon)

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000
```

### Root Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message to verify API is running |

---

### Event Management Routes

#### Get All Events
```http
GET /events
```
**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Synergia Tech Talk",
    "date": "2025-11-10",
    "location": "Auditorium",
    "capacity": 100
  },
  {
    "id": 2,
    "name": "AI Workshop",
    "date": "2025-11-12",
    "location": "Lab 1",
    "capacity": 50
  }
]
```

#### Get Single Event
```http
GET /event/:id
```
**Example:** `GET /event/1`

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Synergia Tech Talk",
  "date": "2025-11-10",
  "location": "Auditorium",
  "capacity": 100
}
```

#### Create New Event
```http
POST /events/add
```
**Request Body:**
```json
{
  "name": "Hackathon 2025",
  "date": "2025-11-15",
  "location": "Lab 2",
  "capacity": 200
}
```

**Response (201 Created):**
```json
{
  "message": "Event created successfully",
  "event": {
    "id": 3,
    "name": "Hackathon 2025",
    "date": "2025-11-15",
    "location": "Lab 2",
    "capacity": 200
  }
}
```

#### Update Event
```http
PUT /event/:id
```
**Example:** `PUT /event/1`

**Request Body (all fields optional):**
```json
{
  "name": "Updated Event Name",
  "date": "2025-11-20",
  "location": "New Location",
  "capacity": 150
}
```

**Response (200 OK):**
```json
{
  "message": "Event updated successfully",
  "event": {
    "id": 1,
    "name": "Updated Event Name",
    "date": "2025-11-20",
    "location": "New Location",
    "capacity": 150
  }
}
```

#### Delete Event
```http
DELETE /event/:id
```
**Example:** `DELETE /event/1`

**Response (200 OK):**
```json
{
  "message": "Event deleted successfully"
}
```

---

### Booking Management Routes

#### Get All Bookings
```http
GET /api/bookings
```
**Response (200 OK):**
```json
[
  {
    "id": 1,
    "eventId": 1,
    "name": "Chetan",
    "email": "chetan@example.com"
  },
  {
    "id": 2,
    "eventId": 2,
    "name": "Riya",
    "email": "riya@example.com"
  }
]
```

#### Get Single Booking
```http
GET /api/bookings/:id
```
**Example:** `GET /api/bookings/1`

**Response (200 OK):**
```json
{
  "id": 1,
  "eventId": 1,
  "name": "Chetan",
  "email": "chetan@example.com"
}
```

#### Create New Booking
```http
POST /api/bookings
```
**Request Body:**
```json
{
  "eventId": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
```

**Response (201 Created):**
```json
{
  "message": "Booking successful",
  "booking": {
    "id": 3,
    "eventId": 1,
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

#### Update Booking
```http
PUT /api/bookings/:id
```
**Example:** `PUT /api/bookings/1`

**Request Body (all fields optional):**
```json
{
  "name": "Alice Updated",
  "email": "alice.updated@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "Booking updated successfully",
  "booking": {
    "id": 1,
    "eventId": 1,
    "name": "Alice Updated",
    "email": "alice.updated@example.com"
  }
}
```

#### Cancel Booking
```http
DELETE /api/bookings/:id
```
**Example:** `DELETE /api/bookings/1`

**Response (200 OK):**
```json
{
  "message": "Booking cancelled successfully"
}
```

---

## 📝 Usage Examples

### Using cURL

```bash
# Get all events
curl http://localhost:3000/events

# Create a new event
curl -X POST http://localhost:3000/events/add \
  -H "Content-Type: application/json" \
  -d '{
    "name": "WebDev Workshop",
    "date": "2025-12-01",
    "location": "Room 101",
    "capacity": 75
  }'

# Create a booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Using Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Test each endpoint following the documentation above

### Using JavaScript (Node.js)

```javascript
const fetch = require('node-fetch');

// Get all events
fetch('http://localhost:3000/events')
  .then(res => res.json())
  .then(data => console.log(data));

// Create a new event
fetch('http://localhost:3000/events/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Event',
    date: '2025-12-01',
    location: 'Hall A',
    capacity: 100
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🧪 Testing

### Automated Testing

Run the included test script to verify all API endpoints:

```bash
node test-api.js
```

**Expected Output:**
```
🧪 Running API Tests...

1️⃣  Testing GET /
   Status: 200
   Response: Welcome to the Synergia Event Booking API 🚀

2️⃣  Testing GET /events
   Status: 200
   Events: [...]

... (more tests)

✅ All tests completed successfully!
```

### Manual Testing

Use tools like:
- **cURL** (command line)
- **Postman** (GUI tool)
- **Insomnia** (API client)
- **Thunder Client** (VS Code extension)

---

## 🛠️ Dependencies

The project uses the following npm packages:

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21.1 | Web framework for building REST API |
| body-parser | ^1.20.3 | Middleware for parsing request bodies |
| mongodb | ^6.20.0 | Database driver (for future MongoDB integration) |
| ws | ^8.18.3 | WebSocket library (for real-time features) |
| nodemon | ^3.1.0 | Development tool for auto-restarting on changes |

---

## 📋 Requirements

### Functional Requirements
- ✅ Create, read, update, and delete events
- ✅ Create, read, update, and delete bookings
- ✅ Validate input data
- ✅ Return appropriate HTTP status codes
- ✅ Handle errors gracefully

### Non-Functional Requirements
- ✅ Fast response times
- ✅ Clear API documentation
- ✅ RESTful design principles
- ✅ Easy to extend and maintain

---

## 🚨 Troubleshooting

### Port 3000 is Already in Use

If you see an error like `EADDRINUSE: address already in use :::3000`:

```bash
# Find the process using port 3000 and kill it
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :3000
kill -9 <PID>
```

Then restart the server.

### Modules Not Found

If you get a "Cannot find module" error:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Server Not Responding

Ensure the server is running:

```bash
# Check if port 3000 is listening
netstat -ano | findstr :3000  # Windows
lsof -i :3000                # Mac/Linux
```

---

## 📞 Support & Contribution

For issues or contributions, please:
1. Check the project documentation
2. Review existing issues in the repository
3. Create a new issue with detailed information

---

## 📄 License

ISC License - Feel free to use this project for academic and personal purposes.

---

## 👨‍💼 Author

Developed for the Synergia Event Management Platform

---

## 🎯 Future Enhancements

- [ ] Integrate with MongoDB for persistent data storage
- [ ] Add authentication & authorization
- [ ] Implement WebSocket for real-time updates
- [ ] Add email notifications
- [ ] Create admin dashboard
- [ ] Add payment integration
- [ ] Implement user roles and permissions

---

**Last Updated**: March 2026

**Status**: ✅ Production Ready
