import React, { useState } from "react";
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

const paymentPages: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const BookingDetails = location.state as BookingDetailsProps;
  const BASE_URL = "https://train-ticket-booking-app-pxmd.onrender.com";

  // Handle payment initiation
  const handlePayment = async (train: BookingDetailsProps, seat: Seat) => {
    setIsLoading(true);
    setIsSuccess(false);

    //will update the seat_Status & seat_PaymentStatus data
    try {
      const response: any = await Axios.put(
        `${BASE_URL}/api/trains/${BookingDetails.trainId}/seats`,
        {
          train_Number: BookingDetails.selectedSeat.train_Number,
          seat_Number: BookingDetails.selectedSeat.seat_Number,
          seat_Status: "CLOSE",
          seat_PaymentStatus: "PAY",
        }
      );
      if (response && response.status === 200) {
        console.log("Booking successfully updated");
        navigate("/bookingSummary", {
          // It wil transfer the data into BookingSummary Page
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

    // Simulate payment processing with timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 3000); // 3 seconds delay to simulate processing
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Payment Details</h1>
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

      {/* <p>trainName:{BookingDetails.trainName}</p>
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
      {isLoading ? (
        <div className="w-64 h-6 bg-gray-300 rounded-lg overflow-hidden mb-4">
          <div
            className="h-full bg-green-500 animate-pulse"
            style={{ width: "100%" }}
          ></div>
        </div>
      ) : isSuccess ? (
        <div className="text-green-600 font-bold text-lg">
          Payment Successful!
        </div>
      ) : (
        <button
          onClick={() =>
            handlePayment(BookingDetails, BookingDetails.selectedSeat)
          }
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default paymentPages;
