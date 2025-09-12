import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PassengerStatus =
  | "Booked"
  | "Boarded"
  | "In-Transit"
  | "At Transit"
  | "Arrived"
  | "Missed Connection";

interface Passenger {
  id: number;
  name: string;
  seat: string;
  status: PassengerStatus;
}

interface Flight {
  id: number;
  code: string;
  departAirport: string;
  arriveAirport: string;
  status: "Scheduled" | "Departed" | "Arrived";
  isFinalLeg: boolean;
  passengers: Passenger[];
}

const initialFlights: Flight[] = [
  {
    id: 1,
    code: "PA920-1",
    departAirport: "CGK",
    arriveAirport: "SUB",
    status: "Scheduled",
    isFinalLeg: false,
    passengers: [
      { id: 1, name: "Husin Jufry", seat: "12A", status: "Booked" },
    ],
  },
  {
    id: 2,
    code: "PA920-2",
    departAirport: "SUB",
    arriveAirport: "UPG",
    status: "Scheduled",
    isFinalLeg: true,
    passengers: [
      { id: 1, name: "Husin Jufry", seat: "12A", status: "At Transit" },
    ],
  },
];

export default function FlightStatusPage() {
  const [flights, setFlights] = useState(initialFlights);

  const advanceFlight = (flightId: number) => {
    setFlights((prev) =>
      prev.map((flight) => {
        if (flight.id !== flightId) return flight;

        if (flight.status === "Scheduled") {
          return {
            ...flight,
            status: "Departed",
            passengers: flight.passengers.map((p) =>
              p.status === "Booked" || p.status === "At Transit"
                ? { ...p, status: "Boarded" }
                : p
            ),
          };
        }

        if (flight.status === "Departed") {
          return {
            ...flight,
            status: "Arrived",
            passengers: flight.passengers.map((p) => {
              if (p.status === "Boarded") {
                return {
                  ...p,
                  status: flight.isFinalLeg ? "Arrived" : "At Transit",
                };
              }
              return p;
            }),
          };
        }

        return flight;
      })
    );
  };

  const handleMissedConnections = (departingFlight: Flight) => {
    setFlights((prev) =>
      prev.map((flight) => {
        if (flight.id !== departingFlight.id) return flight;

        return {
          ...flight,
          passengers: flight.passengers.map((p) =>
            p.status !== "Boarded" && p.status !== "Arrived"
              ? { ...p, status: "Missed Connection" }
              : p
          ),
        };
      })
    );
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Flight Status Management
      </h2>

      {flights.map((flight) => (
        <Card key={flight.id} className="p-6 shadow space-y-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{flight.code}</h3>
              <p className="text-sm text-gray-500">
                {flight.departAirport} → {flight.arriveAirport}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={
                    flight.status === "Arrived"
                      ? "text-green-600"
                      : flight.status === "Departed"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }
                >
                  {flight.status}
                </span>
              </p>
            </div>

            <Button
              onClick={() => {
                advanceFlight(flight.id);
                if (flight.status === "Scheduled") {
                  handleMissedConnections(flight);
                }
              }}
              disabled={flight.status === "Arrived"}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Advance
            </Button>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Passengers</h4>
            <ul className="space-y-1 mt-2">
              {flight.passengers.map((p) => (
                <li key={p.id} className="text-sm">
                  {p.name} (Seat {p.seat}) -{" "}
                  <span
                    className={
                      p.status === "Arrived"
                        ? "text-green-600"
                        : p.status === "Missed Connection"
                        ? "text-red-600"
                        : "text-gray-600"
                    }
                  >
                    {p.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
}
