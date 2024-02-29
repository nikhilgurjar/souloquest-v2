const mongoose = require("mongoose");

const itenarySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    required: true
  },
  description: String,
  image: String,
  destinations: {
    type: [Array], // Array of arrays for nested day and destination structure
    default: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to userId
    ref: "User" // Assuming the user model is named "User"
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const Itenaries =
  mongoose.models['itenaries'] ||
  mongoose.model("itenaries", itenarySchema);

export default Itenaries;