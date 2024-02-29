const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
  },
  subcategories: {
    type: [String],
    default: [],
  },
  name: {
    type: String,
    required: true,
  },
  locationString: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
  },
  rating: {
    type: Number,
    // required: true,
  },
  phone: String,
  address: {
    type: String,
  },
  addressObj: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    country: String,
    postalcode: String,
  },
  email: {
    type: String
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  website: String,
  ratingHistogram: {
    count1: Number,
    count2: Number,
    count3: Number,
    count4: Number,
    count5: Number,
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
  versionKey: false
});

const Destinations =
  mongoose.models['destinations'] ||
  mongoose.model("destinations", destinationSchema);

export default Destinations;