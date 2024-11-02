import seat from "./seat";

export interface train {
  id: number;
  name: string;
  availableSeats: seat[]; // Array of seats with status
  departure: string;
  arrival: string;
}

export default train;
