# Synergia Event Booking API - MongoDB Edition

A comprehensive REST API built with Node.js, Express.js, and MongoDB for managing event bookings and registrations for the Synergia event platform. This version includes full CRUD operations with MongoDB integration, search, and filter capabilities.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [MongoDB Setup](#mongodb-setup)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Testing](#testing)
- [Assignment 2 Requirements](#assignment-2-requirements)

---

## 📖 Project Overview

Synergia API (MongoDB Edition) is an enhanced REST API that provides comprehensive functionality for:
- **Event Management**: Create, read, update, and delete events
- **Booking Management**: Full CRUD operations with MongoDB persistence
- **Advanced Search**: Search bookings by email
- **Smart Filtering**: Filter bookings by event, ticket type, and more
- **Data Persistence**: All bookings stored in MongoDB database
- **Input Validation**: Comprehensive validation for all fields

### Key Features
- ✅ RESTful API design
- ✅ MongoDB database integration with Mongoose ORM
- ✅ Email validation and search capabilities
- ✅ Advanced filtering and query operations
- ✅ Proper HTTP status codes
- ✅ JSON response format
- ✅ Environment-based configuration
- ✅ Graceful error handling

### What's New in Assignment 2
- MongoDB connection using Mongoose
- Booking model with schema validation
- Email and event search functionality
- Ticket type filtering
- Comprehensive error handling
- UUID-based booking identifiers
- Enhanced API response structure

---

## 🔧 Prerequisites

Before running this project, ensure you have the following installed on your system:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (Node Package Manager)
   - Usually comes with Node.js
   - Verify installation: `npm --version`

3. **MongoDB** (Local or Cloud)
   - Local: Download from https://www.mongodb.com/try/download/community
   - Cloud: MongoDB Atlas https://www.mongodb.com/cloud/atlas (recommended)

4. **Git** (optional)
   - Download from: https://git-scm.com/

---

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB Installation

#### Windows
1. Download MongoDB Community from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a service
4. Start MongoDB:
   ```bash
   mongod
   ```
   Or if installed as service, it will start automatically
5. Verify connection:
   ```bash
   mongo
   ```

#### Mac
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Connection String for Local MongoDB:**
```
mongodb://localhost:27017/synergia-bookings
```

### Option 2: MongoDB Atlas (Cloud - Recommended)

1. Visit: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (select Free tier)
4. Wait for cluster to deploy (5-10 minutes)
5. Click "Connect" and select "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database password
8. Update `.env` file with your connection string

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/synergia-bookings?retryWrites=true&w=majority
```

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

**Expected Packages:**
- express: Web framework
- body-parser: Request parsing middleware
- mongoose: MongoDB ORM
- dotenv: Environment variable management
- nodemon: Development auto-reload tool
- mongodb: MongoDB driver

### Step 3: Configure Environment Variables

Create or update the `.env` file in the project root:

```bash
# Copy from example
cp .env.example .env

# Edit .env with your settings
```

**Edit `.env` with your MongoDB connection:**

```env
# MongoDB Connection URL
MONGODB_URI=mongodb://localhost:27017/synergia-bookings

# Server Port
PORT=3000

# Environment
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/synergia-bookings?retryWrites=true&w=majority
```

### Step 4: Verify Installation

Ensure all packages are installed correctly:

```bash
npm list
```

---

## 🚀 Running the Project

### Prerequisites
- MongoDB server must be running before starting the API

### Start MongoDB (if local)

**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
brew services start mongodb-community  # Mac
sudo systemctl start mongodb           # Linux
```

### Start the API Server

Run the following command to start the API server:

```bash
npm start
```

**Expected Output:**
```
> nodemon server.js

✅ Synergia API running at http://localhost:3000
📦 MongoDB: Connected to mongodb://localhost:27017/synergia-bookings
```

### Accessing the API

- **Base URL**: http://localhost:3000
- **Port**: 3000
- **Status**: Running ✅

### Stop the Server

Press `Ctrl + C` in the terminal to stop the server.

---

## 📁 Project Structure

```
synergia-api/
├── models/
│   └── Booking.js                # Booking schema and model
├── .env                          # Environment variables (NOT in GitHub)
├── .env.example                  # Environment template (in GitHub)
├── .gitignore                    # Git ignore rules
├── server.js                     # Main application with all routes
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Dependency lock file
├── README.md                     # This file
├── test-mongodb-api.js           # MongoDB API test script
└── screenshots/                  # Project screenshots
```

### Key Files

- **server.js**: Main Express application with all API routes
- **models/Booking.js**: Mongoose schema for booking with validation
- **.env**: Local environment variables (never committed to GitHub)
- **.env.example**: Template showing required environment variables

---

## 📊 Booking Model Schema

```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  name: String,                     // Participant name (required, min 2 chars)
  email: String,                    // Email address (required, validated)
  event: String,                    // Event name (required)
  ticketType: String,               // Standard, Premium, VIP, or Student
  createdAt: Date                   // Timestamp (auto)
}
```

**Validation Rules:**
- `name`: Required, minimum 2 characters
- `email`: Required, must be valid email format
- `event`: Required
- `ticketType`: Enum (Standard, Premium, VIP, Student) - Default: Standard
- `createdAt`: Automatically set to current date

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000
```

### Root Endpoint

| No | Method | Endpoint | Description |
|---|--------|----------|-------------|
| - | GET | `/` | Welcome message |

---

### Booking Management Routes (MongoDB)

#### 1. Get All Bookings
```http
GET /api/bookings
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "event": "Synergia Tech Talk",
      "ticketType": "Premium",
      "createdAt": "2025-11-03T10:30:00.000Z"
    }
  ]
}
```

---

#### 2. Create New Booking
```http
POST /api/bookings
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "event": "Synergia Tech Talk",
  "ticketType": "Premium"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "event": "Synergia Tech Talk",
    "ticketType": "Premium",
    "createdAt": "2025-11-03T10:30:00.000Z"
  }
}
```

---

#### 3. Get Booking by ID
```http
GET /api/bookings/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "event": "Synergia Tech Talk",
    "ticketType": "Premium",
    "createdAt": "2025-11-03T10:30:00.000Z"
  }
}
```

---

#### 4. Update Booking
```http
PUT /api/bookings/:id
```

**Request Body (all fields optional):**
```json
{
  "name": "John Updated",
  "ticketType": "VIP"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": {...}
}
```

---

#### 5. Delete Booking
```http
DELETE /api/bookings/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {...}
}
```

---

#### 6. Search Bookings by Email
```http
GET /api/bookings/search/email?email=john@example.com
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "query": { "email": "john@example.com" },
  "data": [...]
}
```

---

#### 7. Filter Bookings by Event
```http
GET /api/bookings/filter/event?event=Synergia
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "query": { "event": "Synergia" },
  "data": [...]
}
```

---

#### 8. Filter Bookings by Ticket Type (Bonus)
```http
GET /api/bookings/filter/ticketType?ticketType=VIP
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "query": { "ticketType": "VIP" },
  "data": [...]
}
```

---

## 📝 Usage Examples

### Using cURL

```bash
# Get all bookings
curl http://localhost:3000/api/bookings

# Create a new booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "event": "Synergia Tech Talk",
    "ticketType": "Premium"
  }'

# Search by email
curl http://localhost:3000/api/bookings/search/email?email=john@example.com

# Filter by event
curl http://localhost:3000/api/bookings/filter/event?event=Synergia

# Get specific booking by ID
curl http://localhost:3000/api/bookings/507f1f77bcf86cd799439011

# Update booking
curl -X PUT http://localhost:3000/api/bookings/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"ticketType": "VIP"}'

# Delete booking
curl -X DELETE http://localhost:3000/api/bookings/507f1f77bcf86cd799439011
```

---

## 🧪 Testing

### Start MongoDB and API

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start API server
npm start

# Terminal 3: Run tests
node test-mongodb-api.js
```

### Automated Testing

```bash
node test-mongodb-api.js
```

**Expected Output:**
```
🧪 Running MongoDB Booking API Tests...

1️⃣  Testing GET /
   Status: 200

2️⃣  Testing GET /api/bookings (Get all bookings)
   Status: 200

3️⃣  Testing POST /api/bookings (Create booking)
   Status: 201

... (more tests)

✅ All tests completed successfully!
```

---

## ✅ Assignment 2 Requirements

### Completed

| Requirement | Status |
|-------------|--------|
| Connect Node.js & Express to MongoDB | ✅ |
| Booking model with schema | ✅ |
| MongoDB CRUD operations | ✅ |
| Filtering & search queries | ✅ |
| REST API standards | ✅ |
| Required fields validation | ✅ |
| HTTP status codes | ✅ |
| All required endpoints | ✅ |
| .env file (not in GitHub) | ✅ |
| README with setup steps | ✅ |

### Endpoints Implemented

| No | Method | Endpoint | Status |
|----|--------|----------|--------|
| 1 | GET | `/api/bookings` | ✅ |
| 2 | POST | `/api/bookings` | ✅ |
| 3 | GET | `/api/bookings/:id` | ✅ |
| 4 | PUT | `/api/bookings/:id` | ✅ |
| 5 | DELETE | `/api/bookings/:id` | ✅ |
| 6 | GET | `/api/bookings/search/email` | ✅ |
| 7 | GET | `/api/bookings/filter/event` | ✅ |
| 8 | GET | `/api/bookings/filter/ticketType` | ✅ Bonus |

---

## 🛠️ Troubleshooting

### MongoDB Connection Issues

**Error: `ECONNREFUSED`**

**Solution:**
```bash
# Check if MongoDB is running
ps aux | grep mongod  # Mac/Linux

# Start MongoDB
mongod  # Local MongoDB
```

### Port Already in Use

**Error: `EADDRINUSE: address already in use :::3000`**

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

---

## 📄 License

ISC License

---

## 👨‍💼 Version

- **Assignment**: 2 - MongoDB Integration
- **Version**: 2.0.0
- **Updated**: March 2026

**Status**: ✅ Production Ready

---

**Happy Booking! 🚀**
