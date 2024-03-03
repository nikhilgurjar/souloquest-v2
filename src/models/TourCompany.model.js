import mongoose, { Schema, models } from "mongoose";

const tourCompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    profilePic: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      minlength: 10,
      maxlength: 12,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
    },
    about: {
      type: String,
      maxlength: 500,
    },
    instagramLink: {
      type: String,
      // minlength: 5,
    },
    facebookLink: {
      type: String,
      // minlength: 5,
      // unique: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "TourCompany", timestamps: true }
);

const TourCompany =
  models.TourCompany || mongoose.model("TourCompany", tourCompanySchema);
export default TourCompany;
