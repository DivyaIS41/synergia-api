require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/synergia-bookings";

// Create MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ---------------------------
// Function to Add Professors
// ---------------------------
async function addProfessors() {
  try {
    await client.connect();
    const db = client.db("college");
    const collection = db.collection("professors");

    const professors = [
      {
        name: "Anita",
        age: 45,
        skills: ["AI", "ML", "Data Science"],
        department: "CSE",
        salary: 85000
      },
      {
        name: "Rajesh",
        age: 50,
        skills: ["VLSI", "Digital Electronics"],
        department: "ECE",
        salary: 78000
      }
    ];

    const result = await collection.insertMany(professors);
    console.log("✅ Professors added successfully!");
    console.log("Inserted IDs:", result.insertedIds);

  } catch (error) {
    console.error("❌ Error adding professors:", error);
  } finally {
    await client.close();
  }
}

// ---------------------------
// Function to Read Professors
// ---------------------------
async function readProfessors() {
  try {
    await client.connect();
    const db = client.db("college");
    const collection = db.collection("professors");

    const professors = await collection.find().toArray();
    console.log("📘 Professors List:");
    console.table(professors);

  } catch (error) {
    console.error("❌ Error reading professors:", error);
  } finally {
    await client.close();
  }
}

// ---------------------------
// Function to Update a Professor
// ---------------------------
async function updateProfessor() {
  try {
    await client.connect();
    const db = client.db("college");
    const collection = db.collection("professors");

    const filter = { name: "Anita" };
    const updateData = {
      $set: {
        salary: 90000,
        department: "AI-ML"
      },
      $push: {
        skills: "Deep Learning"
      }
    };

    const result = await collection.updateOne(filter, updateData);

    if (result.matchedCount > 0) {
      console.log(`✅ Professor "${filter.name}" updated successfully!`);
    } else {
      console.log(`⚠️ No professor found with name "${filter.name}"`);
    }

  } catch (error) {
    console.error("❌ Error updating professor:", error);
  } finally {
    await client.close();
  }
}

// ---------------------------
// Function to Delete a Professor
// ---------------------------
async function deleteProfessor() {
  try {
    await client.connect();
    const db = client.db("college");
    const collection = db.collection("professors");

    // Example: delete professor by name
    const filter = { name: "Rajesh" };

    const result = await collection.deleteOne(filter);

    if (result.deletedCount > 0) {
      console.log(`🗑️ Professor "${filter.name}" deleted successfully!`);
    } else {
      console.log(`⚠️ No professor found with name "${filter.name}"`);
    }

  } catch (error) {
    console.error("❌ Error deleting professor:", error);
  } finally {
    await client.close();
  }
}

// ---------------------------
// Choose which function to run
// ---------------------------

// addProfessors();    // Create
// readProfessors();   // Read
// updateProfessor();  // Update
deleteProfessor();     // Delete
