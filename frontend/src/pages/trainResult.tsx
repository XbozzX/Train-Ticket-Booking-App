import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Button } from "@/components/ui/button.tsx";
import Search from "@/components/Search/Search";

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

const TrainResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trainSchedules, setTrainSchedules] = useState<TrainSchedule[]>([]);
  const [originTypeFilter, setOriginTypeFilter] = useState("");
  const [destinationTypeFilter, setDestinationTypeFilter] = useState("");
  const [departureDateFilter, setDepartureDateFilter] = useState("");

  // Parse query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const origin = queryParams.get("origin") || "";
  const destination = queryParams.get("destination") || "";
  const departureDate = queryParams.get("departureDate") || "";
  const BASE_URL = "https://train-ticket-booking-app-cty1.vercel.app";

  useEffect(() => {
    const fetchTrainSchedules = async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/api/trains`);
        const data = response.data.data;

        const filteredSchedules = data.filter((schedule: TrainSchedule) => {
          return (
            (!origin || schedule.origin === origin) &&
            (!destination || schedule.destination === destination) &&
            (!departureDate || schedule.departureDate === departureDate)
          );
        });

        setTrainSchedules(filteredSchedules);
      } catch (error) {
        console.log("Error fetching train schedules:", error);
      }
    };
    // Fetch filtered train schedules based on query parameters
    fetchTrainSchedules();
  }, [origin, destination, departureDate]);

  const handleClick = (train: TrainSchedule) => {
    navigate("/trainSelection", {
      state: {
        trainId: train._id,
        trainName: train.trainName,
        origin: train.origin,
        destination: train.destination,
        departureDate: train.departureDate,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
        price: train.price,
      },
    });
  };

  const handleFilterClick = () => {
    navigate(
      `/train?origin=${originTypeFilter}&destination=${destinationTypeFilter}&departureDate=${departureDateFilter}`
    );
  };

  return (
    <div>
      <div className=" inline-flex space-x-3">
        {/* <TODO : FIX THE SEARCH FUNCTION https://www.youtube.com/watch?v=sWVgMcz8Q44/> */}
        <Search
          originTypeFilter={originTypeFilter}
          destinationTypeFilter={destinationTypeFilter}
          departureDateFilter={departureDateFilter}
          setOriginTypeFilter={setOriginTypeFilter}
          setDestinationTypeFilter={setDestinationTypeFilter}
          setDepartureDateFilter={setDepartureDateFilter}
        />
        <Button onClick={handleFilterClick}> Search </Button>
      </div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th>No</th>
            <th>Train Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {trainSchedules.map((schedule, index) => (
            <tr key={schedule._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {schedule.trainName}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {schedule.origin}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {schedule.destination}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {schedule.departureDate}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {schedule.departureTime}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {schedule.arrivalTime}
              </td>
              <td className=" border border-slate-700 rounded-md text-center">
                {
                  schedule.total_seat.filter(
                    (seat) => seat.seat_Status === "OPEN"
                  ).length
                }
              </td>
              <td className=" border border-slate-700 rounded-md text-center">
                RM {Number(schedule.price).toFixed(2)}
              </td>
              <Button onClick={() => handleClick(schedule)}> Booking</Button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainResults;
