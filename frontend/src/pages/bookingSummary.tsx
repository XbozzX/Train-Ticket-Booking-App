import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate, useLocation } from "react-router-dom";

interface Seat {
  train_Number: string;
  seat_Number: string;
  seat_Status: string;
  seat_PaymentStatus: string;
}

interface BookingDetailsProps {
  trainId: string;
  trainName: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  selectedSeat: Seat;
}

const bookingSummary: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { id } = useParams();
  const BookingDetails = location.state as BookingDetailsProps;

  const handleConfirmClick = () => {
    navigate("/");
  };

  return (
    <div className=" p-4">
      <h2 className=" text-lg font-bold"> Booking Summary</h2>
      <p>trainId:{BookingDetails.trainId}</p>
      <p>trainName:{BookingDetails.trainName}</p>
      <p>origin:{BookingDetails.origin}</p>
      <p>destination:{BookingDetails.destination}</p>
      <p>departureDate:{BookingDetails.departureDate}</p>
      <p>departureTime:{BookingDetails.departureTime}</p>
      <p>arrivalTime:{BookingDetails.arrivalTime}</p>
      <p>price:{BookingDetails.price}</p>
      <p>train_Number:{BookingDetails.selectedSeat.train_Number}</p>
      <p>seat_Number:{BookingDetails.selectedSeat.seat_Number}</p>
      <div>
        <Button onClick={handleConfirmClick}>Confirm</Button>
      </div>
    </div>
  );
};

export default bookingSummary;
