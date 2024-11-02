import { mongoose } from "mongoose";

// schema for timer sensor data
const trainSchedule = new mongoose.Schema(
  {
    trainName: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    total_seat: [
      {
        train_Number: {
          type: String,
          required: true,
        },
        seat_Number: {
          type: String,
          required: true,
        },
        seat_Status: {
          type: String,
          required: true,
        },
        seat_PaymentStatus: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Create model based on schema
export const trainScheduleSchema = mongoose.model(
  "trainSchedule",
  trainSchedule
);
