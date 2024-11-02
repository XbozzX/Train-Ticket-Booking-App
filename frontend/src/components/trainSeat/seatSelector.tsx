import React, { useState } from "react";
import { seat } from "../../../src/components/trainSeat/type/seat";
import { train } from "../../../src/components/trainSeat/type/train";
import "./seatSelector.css"; // Style the seat grid

interface SeatSelectorProps {
  seats: seat[];
  onSeatSelect: (selectedSeats: seat[]) => void;
}

const seatSelector: React.FC<SeatSelectorProps> = () => {
  // { seats, onSeatSelect }
  const [selectedSeats, setSelectedSeats] = useState<seat[]>([]);

  const handleSeatClick = (seat: seat) => {
    if (seat.status === "unavailable") return; // "available" | "selected" | "unavailable"

    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    let updatedSeats;

    if (isSelected) {
      updatedSeats = selectedSeats.filter((s) => s.id !== seat.id);
    } else {
      updatedSeats = [...selectedSeats, { ...seat, status: "selected" }];
    }

    setSelectedSeats(updatedSeats);
    //onSeatSelect(updatedSeats);
  };

  return (
    <div className="seat-grid">
      {seats.map((seat) => (
        <div
          key={seat.id}
          className={`seat ${seat.status} ${
            selectedSeats.some((s) => s.id === seat.id) ? "selected" : ""
          }`}
          onClick={() => handleSeatClick(seat)}
        >
          {seat.id}
        </div>
      ))}
    </div>
  );
};

export default seatSelector;
