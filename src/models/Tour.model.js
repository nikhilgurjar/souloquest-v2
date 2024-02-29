import mongoose, { Schema, models } from "mongoose";

const TourStatus = {
  YetToOpen: "yet-to-open",
  RegistrationOpen: "registration-open",
  RegistrationClosed: "registration-closed",
  Completed: "completed",
};

const tourSchema = new Schema(
  {
    tourGuide: { type: mongoose.Schema.Types.ObjectId, ref: "TourGuide" },
    numRegistered: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(TourStatus),
      default: TourStatus.YetToOpen,
    },
    tourTemplate: { type: mongoose.Schema.Types.ObjectId, ref: "TourTemplate" },
  },
  { collection: "Tours", timestamps: true }
);

const Tour = models.Tours || mongoose.model("Tours", tourSchema);
export default Tour;
