import mongoose, { Schema, models } from "mongoose";

const companyBookingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3, // Consider adding a minimum length requirement
      maxlength: 255, // Consider adding a maximum length requirement
    },
    numPersons: {
      type: Number,
      required: true,
      min: 1, // Ensure at least one person is booked
    },
    location: {
      type: String,
      required: true,
      minlength: 3, // Consider adding a minimum length requirement
      maxlength: 255, // Consider adding a maximum length requirement
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10, // Consider specifying a minimum length based on your country's format
      maxlength: 15, // Consider specifying a maximum length based on your country's format
    },
    bookingDetails: {
      type: [
        {
          name: {
            type: String,
            required: true,
            minlength: 2, // Consider adding a minimum length requirement
            maxlength: 50, // Consider adding a maximum length requirement
          },
          gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"], // Consider adding other valid gender options
          },
          age: {
            type: Number,
            required: true,
            min: 0, // Minimum age might be 1 depending on your requirements
          },
          prefix: {
            type: String,
            required: true,
            minlength: 1, // Consider adding a minimum length requirement
            maxlength: 10, // Consider adding a maximum length requirement
          },
        },
      ],
      required: true,
      min: 1, // Ensure at least one person is booked
    },
    comments: {
      type: String,
      maxLength: 500, // Consider adding a maximum length requirement
    },
    tourId: {
      type: String,
      required: true,
    },
    dateOfTravel: {
      type: Date,
      required: true,
    },
    requestedBy: {
      type: mongoose.Types.ObjectId,
      ref: "TourCompany",
      required: true, // Ensure the requesting company is specified
    },
    tourCompany: {
      type: mongoose.Types.ObjectId,
      ref: "TourCompany",
      required: true, // Ensure the accepting company is specified
    },
    pricingOption: {
      type: {
        startLocation: {
          type: String,
          required: true,
        },
        endLocation: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0, // Enforce a minimum price of 0
        },
      },
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"], // Consider adding other valid status options
      default: "pending",
    },
  },
  { collection: "CompanyBooking", timestamps: true }
);

const CompanyBooking =
  models.CompanyBooking ||
  mongoose.model("CompanyBooking", companyBookingSchema);
export default CompanyBooking;
