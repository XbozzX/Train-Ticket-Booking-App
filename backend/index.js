import express from "express";
import { PORT, Smart_DM_URL } from "./config.js";
import { mongoose } from "mongoose";
import trainAPI from "./routes/trainScheduleRoute.js";
import cors from "cors";
import cron from "node-cron";
import Axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//create middleware for parsing the body
app.use(express.json());

//create middleware for handling CORS POLICY -- PLACE THIS CORS UPDATE FOR THE NODE.JS READ IT FIRST OR IT WILL GIVE CORS POLICY ISSUE
//Option 1: Allow all Origin with default of cors(*)

app.use(cors());

//Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: "https://book-store-pi-five.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );

//create middleware for parsing the page location to the http req
app.use(trainAPI);
mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("Connect");

    // localport setup
    // app.listen(PORT, () => {
    //   console.log(`App is listening to port: ${PORT}`);
    // });

    // route for http setup
    // app.get("/", (req, res) => {
    //   console.log(req);
    //   return res.status(234).send("Welcome bro");
    // });

    cron.schedule("*/2 * * * *", async () => {
      try {
        await Axios.put("http://localhost:5555/api/trains/unlockPendingSeats");
        console.log("Unlocked pending booking seats successfully");
      } catch (error) {
        console.error("Error unlocking seats:", error);
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
