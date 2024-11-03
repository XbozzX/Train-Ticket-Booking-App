import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const BookingDetails = location.state as BookingDetailsProps;

  // will redirect to Home Pages
  const handleConfirmClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h2 className=" text-lg font-bold"> Booking Details</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Train Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Departure Date</TableHead>
            <TableHead>Departure Time</TableHead>
            <TableHead>Arrival Time</TableHead>
            <TableHead>Coaches</TableHead>
            <TableHead>Seat Number</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              {BookingDetails.trainName}
            </TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>{BookingDetails.origin}</TableCell>
            <TableCell>{BookingDetails.destination}</TableCell>
            <TableCell>{BookingDetails.departureDate}</TableCell>
            <TableCell>{BookingDetails.departureTime}</TableCell>
            <TableCell>{BookingDetails.arrivalTime}</TableCell>
            <TableCell>{BookingDetails.selectedSeat.train_Number}</TableCell>
            <TableCell>{BookingDetails.selectedSeat.seat_Number}</TableCell>
            <TableCell className="text-right">
              RM {BookingDetails.price}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* <h2 className=" text-lg font-bold"> Booking Summary</h2>
      <p>trainId:{BookingDetails.trainId}</p>
      <p>trainName:{BookingDetails.trainName}</p>
      <p>origin:{BookingDetails.origin}</p>
      <p>destination:{BookingDetails.destination}</p>
      <p>departureDate:{BookingDetails.departureDate}</p>
      <p>departureTime:{BookingDetails.departureTime}</p>
      <p>arrivalTime:{BookingDetails.arrivalTime}</p>
      <p>price:{BookingDetails.price}</p>
      <p>train_Number:{BookingDetails.selectedSeat.train_Number}</p>
      <p>seat_Number:{BookingDetails.selectedSeat.seat_Number}</p> */}
      <div>
        <Button onClick={handleConfirmClick}>Confirm</Button>
      </div>
    </div>
  );
};

export default bookingSummary;
