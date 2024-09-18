import mongoose, { model, Schema } from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    flight: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Flight",
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Model create
export default model("Reservation", reservationSchema);
