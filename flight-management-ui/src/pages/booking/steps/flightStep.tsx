import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";
import type { BookingData } from "../bookingPage";

interface Props {
  onNext: (flight: BookingData["flight"]) => void;
  onBack: () => void;
}

const mockFlights = [
  {
    id: 1,
    airline: "Pedro Airlines",
    code: "QG912",
    departTime: "08:10",
    departAirport: "CGK",
    departDate: "Fri, Sep 19",
    arriveTime: "10:30",
    arriveAirport: "KNO",
    duration: "2h 20m",
    price: 1620039,
  },
  {
    id: 2,
    airline: "Pedro Airlines",
    code: "QG916",
    departTime: "12:00",
    departAirport: "CGK",
    departDate: "Fri, Sep 19",
    arriveTime: "14:20",
    arriveAirport: "KNO",
    duration: "2h 20m",
    price: 1620039,
  },
];

export default function FlightsStep({ onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center text-indigo-600">Choose Your Flight</h2>

      <div className="space-y-4">
        {mockFlights.map((f) => (
          <div
            key={f.id}
            className="flex justify-between items-center bg-white rounded-xl shadow p-6"
          >
            <div className="text-left">
              <p className="text-xs text-gray-500">{f.airline} {f.code}</p>
              <p className="text-2xl font-bold">{f.departTime}</p>
              <p className="text-gray-600">{f.departAirport}</p>
              <p className="text-sm text-gray-500">{f.departDate}</p>
            </div>

            <div className="flex flex-col items-center text-sm text-gray-500">
              <Plane className="h-5 w-5 text-blue-500 mb-1" />
              <span>Direct</span>
              <span>{f.duration}</span>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">{f.arriveTime}</p>
              <p className="text-gray-600">{f.arriveAirport}</p>
              <p className="text-sm text-gray-500">{f.departDate}</p>
              <p className="mt-2 text-blue-600 font-bold">
                Rp{f.price.toLocaleString()}
              </p>
              <Button
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => onNext(f)}   // ✅ send full object
                >
                Choose
              </Button>

            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={onBack} className="w-full">
        Back to Search
      </Button>
    </div>
  );
}
