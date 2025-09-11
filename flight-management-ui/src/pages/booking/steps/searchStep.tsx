import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaneTakeoff, PlaneLanding, Calendar, Users } from "lucide-react";
import type { BookingData } from "../bookingPage";
import { useState } from "react";

interface Props {
  onNext: (data: BookingData["search"]) => void;
}

export default function SearchStep({ onNext }: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="max-w-md mx-auto space-y-6 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold text-center text-indigo-600">
        Search Flights
      </h2>

      {/* From */}
      <div className="relative">
        <PlaneTakeoff className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="From (Airport)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* To */}
      <div className="relative">
        <PlaneLanding className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="To (Airport)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Date */}
      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Passengers */}
      <div className="relative">
        <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="number"
          min={1}
          value={passengers}
          onChange={(e) => setPassengers(parseInt(e.target.value))}
          className="pl-10"
        />
      </div>

      {/* Submit */}
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={() =>
          onNext({
            from,
            to,
            date,
            passengers,
          })
        }
      >
        Search Flights
      </Button>
    </div>
  );
}
