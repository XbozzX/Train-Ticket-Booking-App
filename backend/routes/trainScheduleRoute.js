import express, { request, response } from "express";
//import { Smart_DM_URL } from "./config.js";
import { MongoClient } from "mongodb";
import { trainScheduleSchema } from "../models/trainSchedule.js";

const trainScheduleRoute = express.Router();

//Route for GET the book data
trainScheduleRoute.get("/api/trains", async (request, response) => {
  try {
    const trainSchedule_data = await trainScheduleSchema.find(); //will find all the book data
    return response.status(200).json({
      count: trainSchedule_data.length, //create count for the json data
      data: trainSchedule_data, //get the book data
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send(error.message);
  }
});

// Route get by id
trainScheduleRoute.get("/api/trains/:_id", async (request, response) => {
  const { _id } = request.params;
  console.log("id");
  console.log(_id);
  try {
    const train = await trainScheduleSchema.findById(_id);

    if (!train) {
      return response.status(404).json({ message: "Train not found" });
    }

    response.status(200).json({ data: train });
    console.log("test");
    // console.log(data);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error retrieving train data", error });
  }
});

// Create event
trainScheduleRoute.post("/api/trains/create", async (request, response) => {
  try {
    // if (!request.body.trainName || !request.body.origin || !request.body.destination  ) {
    //   return response.status(400).send({ message: "All field is required" });
    // }
    const newBooking = {
      trainName: request.body.trainName,
      origin: request.body.origin,
      destination: request.body.destination,
      departureDate: request.body.departureDate,
      departureTime: request.body.departureTime,
      arrivalTime: request.body.arrivalTime,
      price: request.body.price,
      total_seat: request.body.total_seat,
    };

    const event = new trainScheduleSchema(newBooking);
    await event.save();
    return response.status(201).send(event);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

//update
trainScheduleRoute.put("/api/trains/:id/seats", async (request, response) => {
  const { id } = request.params;
  const { train_Number, seat_Number, seat_Status, seat_PaymentStatus } =
    request.body;

  try {
    const train = await trainScheduleSchema.findById(id);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    const seat = train.total_seat.find(
      (s) => s.train_Number === train_Number && s.seat_Number === seat_Number
    );

    if (!seat) {
      return response.status(404).json({ message: "Seat not found" });
    }

    seat.seat_Status = seat_Status;
    seat.seat_PaymentStatus = seat_PaymentStatus;

    await train.save();
    response.status(200).json({ message: "Seat status updated successfully" });
  } catch (error) {
    console.error("Error updating seat status:", error);
    response.status(500).json({ message: "Failed to update seat status" });
  }
});

// route to update seats from "PENDING BOOKING" to "OPEN"
trainScheduleRoute.put(
  "/api/trains/unlockPendingSeats",
  async (request, response) => {
    try {
      const result = await trainScheduleSchema.updateMany(
        {
          "total_seat.seat_Status": "PENDING BOOKING",
        },
        { $set: { "total_seat.$[seat].seat_Status": "OPEN" } },
        { arrayFilters: [{ "seat.seat_Status": "PENDING BOOKING" }] }
      );

      response.json({ success: true, updatedSeat: result });
    } catch (error) {
      console.error("Error updating seats:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

// const uri =
//   "mongodb+srv://muhammadafhamnazri:vhJ5tSpYaNHHM1fW@cluster0.h6yb7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri);

// trainBookingRoute.get("/", async (req, res) => {
//   try {
//     await client.connect();
//     const database = client.db("XbozzX"); // replace with your database name
//     const collection = database.collection("trainSchedule"); // replace with your collection name

//     const trainData = await collection.find({}).toArray();

//     console.log(trainData);
//     return res.status(200).json({
//       count: trainData.length, //create count for the json data
//       data: trainData, //get the book data
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send(error.message);
//   }
// });

export default trainScheduleRoute;
