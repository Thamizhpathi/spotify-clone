// updateExistingUsers.js
import mongoose from "mongoose";
import user from "../models/users.module.js";
import { DB_URI } from "../config/env.js";

const updateUsers = async () => {
  try {
    // Connect to the database
    await mongoose.connect("mongodb+srv://thamizh:dqiJbs3DoWhO0g6i@thamizhcluster.lid7i.mongodb.net/spotifyDb?retryWrites=true&w=majority&appName=thamizhcluster");
    console.log("Connected to database");

    // Update all users with default values for new fields
    await user.updateMany(
      {},
      { $set: { gender: "", date: 1, month: "", year: 2000 } } // default values
    );
    
    console.log("All users updated successfully");

  } catch (error) {
    console.log("Error updating users:", error);
  } finally {
    // Disconnect from the database after the operation is complete
    mongoose.disconnect();
  }
};

// Execute the update operation
updateUsers();
