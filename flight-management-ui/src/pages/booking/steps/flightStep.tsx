import { Button } from "@/components/ui/button";
import { Plane, PlaneTakeoff, PlaneLanding, Users, Clock } from "lucide-react";
import type { BookingData } from "../bookingPage";
// src/pages/booking/steps/FlightsStep.tsx
import { mockFlights } from "@/data/mockFlight";


interface Props {
  search?: BookingData["search"];
  onNext: (flight: BookingData["flight"]) => void;
  onBack: () => void;
}

// const mockFlights: {
//   id: number;
//   legs: NonNullable<BookingData["flight"]>;
//   totalPrice: number;
//   availableSeats: number;
// }[] = [
//   {
//     id: 1,
//     availableSeats: 5,
//     legs: [
//       {
//         id: 1,
//         airline: "Pedro Air",
//         code: "PA912",
//         departTime: "08:10",
//         departAirport: "CGK",
//         departDate: "2025-09-19",
//         arriveTime: "10:30",
//         arriveAirport: "KNO",
//         duration: "2h 20m",
//         seat: "",
//         price: 1620039,
//       },
//     ],
//     totalPrice: 1620039,
//   },
//   {
//     id: 2,
//     availableSeats: 2,
//     legs: [
//       {
//         id: 2,
//         airline: "Pedro Air",
//         code: "PA916",
//         departTime: "12:00",
//         departAirport: "CGK",
//         departDate: "2025-09-19",
//         arriveTime: "14:20",
//         arriveAirport: "SUB",
//         duration: "2h 20m",
//         seat: "",
//         price: 1480039,
//       },
//     ],
//     totalPrice: 1480039,
//   },
//   {
//     id: 3,
//     availableSeats: 3,
//     legs: [
//       {
//         id: 3,
//         airline: "Pedro Air",
//         code: "PA920-1",
//         departTime: "09:00",
//         departAirport: "CGK",
//         departDate: "2025-09-20",
//         arriveTime: "11:00",
//         arriveAirport: "SUB",
//         duration: "2h 00m",
//         seat: "",
//         price: 1000000,
//       },
//       {
//         id: 4,
//         airline: "Pedro Air",
//         code: "PA920-2",
//         departTime: "12:00",
//         departAirport: "SUB",
//         departDate: "2025-09-20",
//         arriveTime: "14:30",
//         arriveAirport: "UPG",
//         duration: "2h 30m",
//         seat: "",
//         price: 1100000,
//       },
//     ],
//     totalPrice: 2100000,
//   },
//   {
//     id: 4,
//     availableSeats: 6,
//     legs: [
//       {
//         id: 5,
//         airline: "Pedro Air",
//         code: "PA101",
//         departTime: "06:30",
//         departAirport: "SUB",
//         departDate: "2025-09-21",
//         arriveTime: "09:00",
//         arriveAirport: "DPS",
//         duration: "2h 30m",
//         seat: "",
//         price: 1200000,
//       },
//     ],
//     totalPrice: 1200000,
//   },
//   {
//     id: 5,
//     availableSeats: 1,
//     legs: [
//       {
//         id: 6,
//         airline: "Pedro Air",
//         code: "PA102-1",
//         departTime: "15:00",
//         departAirport: "DPS",
//         departDate: "2025-09-21",
//         arriveTime: "17:00",
//         arriveAirport: "SUB",
//         duration: "2h 00m",
//         seat: "",
//         price: 800000,
//       },
//       {
//         id: 7,
//         airline: "Pedro Air",
//         code: "PA102-2",
//         departTime: "18:00",
//         departAirport: "SUB",
//         departDate: "2025-09-21",
//         arriveTime: "20:00",
//         arriveAirport: "CGK",
//         duration: "2h 00m",
//         seat: "",
//         price: 850000,
//       },
//     ],
//     totalPrice: 1650000,
//   },
//   {
//     id: 6,
//     availableSeats: 4,
//     legs: [
//       {
//         id: 8,
//         airline: "Pedro Air",
//         code: "PA201",
//         departTime: "10:15",
//         departAirport: "CGK",
//         departDate: "2025-09-22",
//         arriveTime: "12:45",
//         arriveAirport: "SIN",
//         duration: "2h 30m",
//         seat: "",
//         price: 2200000,
//       },
//     ],
//     totalPrice: 2200000,
//   },
//   {
//     id: 7,
//     availableSeats: 7,
//     legs: [
//       {
//         id: 9,
//         airline: "Pedro Air",
//         code: "PA202",
//         departTime: "13:00",
//         departAirport: "SIN",
//         departDate: "2025-09-22",
//         arriveTime: "16:30",
//         arriveAirport: "KUL",
//         duration: "3h 30m",
//         seat: "",
//         price: 2500000,
//       },
//     ],
//     totalPrice: 2500000,
//   },
// ];


export default function FlightsStep({ search, onNext, onBack }: Props) {
  const filteredFlights = mockFlights.filter((itinerary) => {
    if (!search?.from || !search?.to) return true;
    const firstLeg = itinerary.legs[0];
    const lastLeg = itinerary.legs[itinerary.legs.length - 1];
    return (
      firstLeg.departAirport.toLowerCase() === search.from.toLowerCase() &&
      lastLeg.arriveAirport.toLowerCase() === search.to.toLowerCase()
    );
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center text-indigo-600">
        Choose Your Flight
      </h2>

      {filteredFlights.length === 0 ? (
        <p className="text-center text-gray-500">No flights found.</p>
      ) : (
        filteredFlights.map((itinerary) => {
          const firstLeg = itinerary.legs[0];
          const lastLeg = itinerary.legs[itinerary.legs.length - 1];
          const notEnoughSeats =
            (search?.passengers || 1) > itinerary.availableSeats;

          return (
            <div
              key={itinerary.id}
              className="bg-white rounded-xl shadow p-6 space-y-4"
            >
              {/* Main itinerary summary */}
              <div className="flex justify-between items-center">
                <div className="text-left space-y-1">
                  <p className="text-xs text-gray-500">
                    {firstLeg.airline} {firstLeg.code}
                  </p>
                  <div className="flex items-center space-x-2">
                    <PlaneTakeoff className="h-4 w-4 text-indigo-500" />
                    <span className="font-bold text-lg">
                      {firstLeg.departAirport} {firstLeg.departTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PlaneLanding className="h-4 w-4 text-indigo-500" />
                    <span className="text-gray-600">
                      {lastLeg.arriveAirport} {lastLeg.arriveTime}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{firstLeg.departDate}</p>
                </div>

                <div className="flex flex-col items-center text-sm text-gray-500">
                  <Plane className="h-5 w-5 text-blue-500 mb-1" />
                  <span>
                    {itinerary.legs.length > 1
                      ? `${itinerary.legs.length - 1} stop`
                      : "Direct"}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />{" "}
                    <span>{lastLeg.duration}</span>
                  </span>
                </div>

                <div className="text-right">
                  <p className="mt-2 text-blue-600 font-bold">
                    Rp{itinerary.totalPrice.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center justify-end space-x-1">
                    <Users className="h-3 w-3" />{" "}
                    <span>{itinerary.availableSeats} seats left</span>
                  </p>
                  <Button
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={notEnoughSeats}
                    onClick={() =>
                      onNext(
                        itinerary.legs.map((leg, idx) => ({
                          ...leg,
                          seat: `Auto-${idx + 1}A`,
                        }))
                      )

                    }
                  >
                    {notEnoughSeats ? "Not enough seats" : "Choose"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      )}

      <Button variant="outline" onClick={onBack} className="w-full">
        Back to Search
      </Button>
    </div>
  );
}
