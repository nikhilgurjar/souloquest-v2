const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const chatRoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    avatar: { type: String, default: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'},
    departureDate: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});

const ChatRoomModel =
    mongoose.models['chat-room'] ||
    mongoose.model("chat-room", chatRoomSchema);
  
export default ChatRoomModel;