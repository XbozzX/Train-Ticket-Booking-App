import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";

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
  // const { id } = useParams();
  const BookingDetails = location.state as BookingDetailsProps;
  const BASE_URL = "https://train-ticket-booking-app-pxmd.onrender.com";
  // console.log(BookingDetails.trainId);
  // const [trainSchedules, setTrainSchedules] = useState<BookingDetailsProps[]>(
  //   []
  // );
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
      // console.log(response);
      // navigate("/PaymentPages");
      if (response && response.status === 200) {
        console.log("Booking successfully updated");
        navigate("/PaymentPages", {
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
        console.log(train);
      } else {
        console.log("Unexpected response status:", response?.status);
      }
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  //console.log(BookingDetails);
  return (
    <div className=" p-4">
      <h2 className=" text-lg font-bold"> Booking Details</h2>
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
      <p>seat_Status:{BookingDetails.selectedSeat.seat_Status}</p>
      <p>seat_PaymentStatus:{BookingDetails.selectedSeat.seat_PaymentStatus}</p>

      <div>
        <Button
          onClick={() =>
            handleBookingClick(BookingDetails, BookingDetails.selectedSeat)
          }
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default BookingDetail;
