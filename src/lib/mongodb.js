import mongoose from "mongoose";

export const connectMongoDB = async () => {
  console.log("tryingConnection");
  if (mongoose.connection.readyState !== 1) {
    try {
      const options = {
        autoIndex: process.env.NODE_ENV !== "production", // Turn off autoIndexing in production for better performance
        serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6,
      };
      await mongoose.connect(process.env.MONGODB_URI, options);
      console.info("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
    }
  } else {
    console.info("Mongodb connection already exist");
  }
};
