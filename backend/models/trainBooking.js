import { mongoose } from "mongoose";

// schema for timer sensor data
const trainBooking = new mongoose.Schema(
  {
    passengerName: {
      type: String,
      required: true,
    },
    seatsNumber: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Create model based on schema
export const trainBookingSchema = mongoose.model("trainBooking", trainBooking);
