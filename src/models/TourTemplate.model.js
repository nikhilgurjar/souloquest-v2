import mongoose, { Schema, models } from "mongoose";

const tourCompanySchema = new Schema(
  {
    tourCompany: { type: mongoose.Types.ObjectId, ref: "TourCompany" },
    startDate: {
      type: Date,
      required: true,
    },
    numDays: { type: Number, required: true },
    maxParticipants: { type: Number, required: true },
    numDays: { type: Number, required: true },
    tourId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    overview: {
      type: String,
      required: true,
      minlength: 10,
    },
    categories: {
      type: [String],
      required: true,
      //   enum: TOUR_CATEGORIES, // Define an array of valid categories
      validate: {
        validator: function (value) {
          return value.length >= 1 && value.length <= 3;
        },
        message: "Please select 1-3 categories for your tour template.",
      },
    },
    destinations: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Your tour template must have at least one destination.",
      },
    },
    included: {
      type: [String],
      default: [],
    },
    notIncluded: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
      // Assuming URLs
      // validate: {
      //   validator: function (value) {
      //     return value.length > 0 && value.length <= 3;
      //   },
      //   message: "Please provide 1-3 images for your tour template.",
      // },
    },
    recurrence: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "None"],
      validate: {
        validator: function (value) {
          return this.recurrence ? value : "None";
        },
        message: "Frequency is required for recurring tour templates.",
      },
    },
    frequencyWeekdays: {
      type: [Number],
      validate: {
        validator: function (value) {
          return this.frequency === "weekly" ? value.length > 0 : true;
        },
        message: "Please select at least one weekday for weekly frequency.",
      },
    },
    frequencyDates: {
      type: [Date],
      validate: {
        validator: function (value) {
          return this.frequency === "monthly" ? value.length > 0 : true;
        },
        message: "Please select at least one date for monthly frequency.",
      },
    },
    priceOptions: {
      type: [
        {
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
      ],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Your tour template must have at least one price option.",
      },
    },
    itenary: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
      ],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Your tour template must have at least one Itenary item.",
      },
    },
    rating: {
      type: Number,
      default: 1,
    },
    numRatings: {
      type: Number,
      default: 0,
    },
  },
  { collection: "TourTemplate", timestamps: true }
);

const TourTemplate =
  models.TourTemplate || mongoose.model("TourTemplate", tourCompanySchema);
export default TourTemplate;
