import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";

interface Seat {
  train_Number: string;
  seat_Number: string;
  seat_Status: string;
  seat_PaymentStatus: string;
}

interface TrainSchedule {
  _id: string;
  trainName: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  total_seat: Seat[];
}

const trainSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trainSchedules, setTrainSchedules] = useState<TrainSchedule | null>(
    null
  );
  const [coachSelector, setCoachSelector] = useState<string>("A");
  const { trainId } = location.state || {};
  const BASE_URL = "https://train-ticket-booking-tvtc.onrender.com";
  // console.log(trainId);
  // console.log(trainSchedules);

  useEffect(() => {
    Axios.get(`${BASE_URL}/api/trains/${trainId}`)
      .then((res) => {
        setTrainSchedules(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [trainId]);

  const handleSeatClick = (train: TrainSchedule, seat: Seat) => {
    navigate("/BookingDetail/:id", {
      state: {
        trainId: train._id,
        trainName: train.trainName,
        origin: train.origin,
        destination: train.destination,
        departureDate: train.departureDate,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
        price: train.price,
        selectedSeat: seat,
      },
    });
  };

  const handleCoachClick = (train_Number: string) => {
    setCoachSelector(train_Number);
  };

  if (!trainSchedules) {
    return <p>Loading train data...</p>;
  }

  return (
    // <TODO: THE TRAIN._ID NEVER CHANGE,,, SO IT WILL POINTING TO THE 1 DATA .... NEED TO FIX/>
    <div>
      <p>Train Selection : {trainId}</p>
      <div className=" m-4 p-4 border rounded-lg">
        <h2 className=" text-lg font-bold">
          {trainSchedules.trainName} - {trainSchedules.origin} to
          {trainSchedules.destination}
        </h2>
      </div>

      <div className="inline-flex space-x-1 my-4">
        <Button onClick={() => handleCoachClick("A")}>Coach A</Button>
        <Button onClick={() => handleCoachClick("B")}>Coach B</Button>
        <Button onClick={() => handleCoachClick("C")}>Coach C</Button>
        <Button onClick={() => handleCoachClick("D")}>Coach D</Button>
        <Button onClick={() => handleCoachClick("E")}>Coach E</Button>
        <Button onClick={() => handleCoachClick("F")}>Coach F</Button>
      </div>
      <div key={trainSchedules._id} className="inline-flex space-x-5 m-2">
        {trainSchedules.total_seat
          .filter((seat) => seat.train_Number === coachSelector) // Only show seats for the selected coach
          .map((seat) => (
            <Button
              key={seat.seat_Number}
              className={`border rounded-md text-center ${
                seat.seat_Status === "OPEN" ? "bg-green-500" : "bg-red-500"
              }`}
              disabled={
                seat.seat_Status === "CLOSE" ||
                seat.seat_Status === "PENDING BOOKING"
              }
              onClick={() => handleSeatClick(trainSchedules, seat)}
            >
              {seat.seat_Number}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default trainSelection;
