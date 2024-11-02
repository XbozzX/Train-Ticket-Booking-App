"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";
import DateSetup from "@/components/datePicker";
import DatePicker from "react-datepicker";

type Props = {
  originTypeFilter: string;
  destinationTypeFilter: string;
  departureDateFilter: string;
  setOriginTypeFilter: (value: string) => void;
  setDestinationTypeFilter: (value: string) => void;
  setDepartureDateFilter: (value: string) => void;
};

const Search: React.FC<Props> = ({
  originTypeFilter,
  destinationTypeFilter,
  departureDateFilter,
  setOriginTypeFilter,
  setDestinationTypeFilter,
  setDepartureDateFilter,
}) => {
  return (
    <div>
      <div className=" inline-flex space-x-3">
        {/* < for origin /> */}
        <Select value={originTypeFilter} onValueChange={setOriginTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Origin..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>PERAK</SelectLabel>
              <SelectItem value="Batu Gajah">Batu Gajah</SelectItem>
              <SelectLabel>KEDAH</SelectLabel>
              <SelectItem value="Alor Setar">Alor Setar</SelectItem>
              <SelectItem value="Pulau Pinang">Pulau Pinang</SelectItem>
              <SelectLabel>KELANTAN</SelectLabel>
              <SelectItem value="Pasir Mas">Pasir Mas</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* < for destination /> */}
        <Select
          value={destinationTypeFilter}
          onValueChange={setDestinationTypeFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Destination..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>KUALA LUMPUR</SelectLabel>
              <SelectItem value="KL Sentral">KL Sentral</SelectItem>
              <SelectLabel>JOHOR</SelectLabel>
              <SelectItem value="Johor Bharu">Johor Bharu</SelectItem>
              <SelectLabel>SELANGOR</SelectLabel>
              <SelectItem value="Kajang">Kajang</SelectItem>
              <SelectLabel>PAHANG</SelectLabel>
              <SelectItem value="Kuantan">Kuantan</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* <DateSetup
          selected={departureDateFilter ? new Date(departureDateFilter) : null}
          onChange={(date: Date | null) =>
            setDepartureDateFilter(date ? date.toISOString().split("T")[0] : "")
          }
          className="w-[180px] border rounded px-2"
          placeholderText="Select Date"
          dateFormat="yyyy-MM-dd"
        /> */}

        {/* Date Picker for Departure Date */}
        <DatePicker
          selected={departureDateFilter ? new Date(departureDateFilter) : null}
          onChange={(date) =>
            setDepartureDateFilter(date ? date.toISOString().split("T")[0] : "")
          }
          className=" w-[180px] border rounded p-1 border-solid  px-2 "
          placeholderText="Select Date"
          dateFormat="yyyy-MM-dd"
        />

        {/* < for destination /> */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Number of Pax..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Search;
