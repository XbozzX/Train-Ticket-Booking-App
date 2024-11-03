import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
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

const BookingDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const BookingDetails = location.state as BookingDetailsProps;
  const BASE_URL = "https://train-ticket-booking-app-pxmd.onrender.com";

  // After the user click the button -> it will update the seat status
  const handleBookingClick = async (train: BookingDetailsProps, seat: Seat) => {
    try {
      const response: any = await Axios.put(
        `${BASE_URL}/api/trains/${BookingDetails.trainId}/seats`,
        {
          train_Number: BookingDetails.selectedSeat.train_Number,
          seat_Number: BookingDetails.selectedSeat.seat_Number,
          seat_Status: "PENDING BOOKING",
          seat_PaymentStatus: "PENDING",
        }
      );

      if (response && response.status === 200) {
        console.log("Booking successfully updated");
        navigate("/PaymentPages", {
          // It wil transfer the data into PaymentPages
          state: {
            trainId: train.trainId,
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
      } else {
        console.log("Unexpected response status:", response?.status);
      }
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
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
            <TableCell>PENDING PAYMENT</TableCell>
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

      {/* <h2 className=" text-lg font-bold"> Booking Details</h2>
      <p>trainName:{BookingDetails.trainName}</p>
      <p>origin:{BookingDetails.origin}</p>
      <p>destination:{BookingDetails.destination}</p>
      <p>departureDate:{BookingDetails.departureDate}</p>
      <p>departureTime:{BookingDetails.departureTime}</p>
      <p>arrivalTime:{BookingDetails.arrivalTime}</p>
      <p>price:{BookingDetails.price}</p>
      <p>train_Number:{BookingDetails.selectedSeat.train_Number}</p>
      <p>seat_Number:{BookingDetails.selectedSeat.seat_Number}</p>
      <p>seat_Status:{BookingDetails.selectedSeat.seat_Status}</p>
      <p>seat_PaymentStatus:{BookingDetails.selectedSeat.seat_PaymentStatus}</p> */}

      <div>
        <Button
          onClick={() =>
            handleBookingClick(BookingDetails, BookingDetails.selectedSeat)
          }
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingDetail;
