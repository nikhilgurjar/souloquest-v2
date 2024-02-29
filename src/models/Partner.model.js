const mongoose = require('mongoose');


const partnerSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true,
      },
    location: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to userId
      ref: "User" // Assuming the user model is named "User"
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to userId
        ref: "chat-room" 
    }
  }, {
    timestamps: true,
    versionKey: false
  });
  
const PartnerModel =
    mongoose.models['partner-requests'] ||
    mongoose.model("partner-requests", partnerSchema);
  
export default PartnerModel;