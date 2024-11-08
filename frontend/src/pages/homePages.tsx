import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
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

const homePages: React.FC = () => {
  const navigate = useNavigate();
  const [trainSchedules, setTrainSchedules] = useState<TrainSchedule[]>([]);
  const [originTypeFilter, setOriginTypeFilter] = useState("");
  const [destinationTypeFilter, setDestinationTypeFilter] = useState("");
  const [departureDateFilter, setDepartureDateFilter] = useState("");
  const BASE_URL = "https://train-ticket-booking-app-pxmd.onrender.com";

  //will fetch the train data based on {origin, destination, departureDate} params
  useEffect(() => {
    const fetchTrainSchedules = () => {
      Axios.get(`${BASE_URL}/api/trains`, {
        params: {
          origin: originTypeFilter,
          destination: destinationTypeFilter,
          departureDate: departureDateFilter,
        },
      })
        .then((res) => {
          setTrainSchedules(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchTrainSchedules();
    const fetchIntervalId = setInterval(fetchTrainSchedules, 6000); // will call the fetchTrainSchedules() every 6 second
    return () => clearInterval(fetchIntervalId);
  }),
    [];

  // After the user click the button -> It wil transfer the data into PaymentPages
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
      <div>
        <table className=" w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th>No</th>
              <th>trainName</th>
              <th>origin</th>
              <th>destination</th>
              <th>departureDate</th>
              <th>departureTime</th>
              <th>arrivalTime</th>
              <th>Seat Available</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {trainSchedules.map((schedule, index) => (
              <tr key={schedule._id} className=" h-8">
                <td className=" border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className=" border border-slate-700 rounded-md text-center">
                  {schedule.trainName}
                </td>
                <td className=" border border-slate-700 rounded-md text-center">
                  {schedule.origin}
                </td>
                <td className=" border border-slate-700 rounded-md text-center">
                  {schedule.destination}
                </td>
                <td className=" border border-slate-700 rounded-md text-center">
                  {schedule.departureDate}
                </td>
                <td className=" border border-slate-700 rounded-md text-center">
                  {schedule.departureTime}
                </td>
                <td className=" border border-slate-700 rounded-md text-center">
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
                <Button onClick={() => handleClick(schedule)}>Booking</Button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default homePages;
