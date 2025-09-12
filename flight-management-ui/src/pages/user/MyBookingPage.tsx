// pages/user/MyBookingsPage.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlaneTakeoff, PlaneLanding, Calendar, User } from "lucide-react";
import { useState } from "react";
import type { BookingRecord } from "@/pages/booking/bookingPage";
import { mockFlights } from "@/data/mockFlight";

const mockBookings: BookingRecord[] = [
  {
    id: "B001",
    status: "BOOKED",
    details: {
      firstName: "Husin",
      lastName: "Jufry",
      email: "hus@gmail.com",
      phone: "08123456789",
      nik: "1234567890",
      dob: "1995-05-12",
    },
    flight: [
      {
        id: 1,
        airline: "Pedro Air",
        code: "PA912",
        departTime: "08:10",
        departAirport: "CGK",
        departDate: "2025-09-19",
        arriveTime: "10:30",
        arriveAirport: "KNO",
        duration: "2h 20m",
        seat: "12A",
        price: 1620039,
      },
    ],
  },
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>(mockBookings);

//   const handleCancel = (id: string) => {
//     setBookings((prev) =>
//       prev.map((b) =>
//         b.id === id ? { ...b, status: "CANCELLED" } : b
//       )
//     );
//   };

  const handleCancel = (id: string, flightIds: number[]) => {
  // update bookings
  setBookings((prev) =>
    prev.map((b) =>
      b.id === id ? { ...b, status: "CANCELLED" } : b
    )
  );

  // release seats back to mockFlights
    flightIds.forEach((fid) => {
        const itinerary = mockFlights.find((f) =>
        f.legs.some((leg) => leg.id === fid)
        );
        if (itinerary) {
        itinerary.availableSeats += 1;
        }
      });
    };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <h2 className="text-2xl font-bold text-indigo-600 text-center">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        bookings.map((b) => {
          const firstLeg = b.flight[0];
          const lastLeg = b.flight[b.flight.length - 1];
          return (
            <Card key={b.id} className="p-6 shadow space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">
                    {firstLeg.departAirport} → {lastLeg.arriveAirport}
                  </p>
                  <p className="text-sm text-gray-500">
                    {firstLeg.departDate} | {firstLeg.departTime} - {lastLeg.arriveTime}
                  </p>
                  <p className="text-xs text-gray-500">{b.flight.length > 1 ? "Transit" : "Direct"}</p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      b.status === "BOOKED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex items-center space-x-2">
                  <PlaneTakeoff className="h-4 w-4 text-indigo-500" />
                  <span>{firstLeg.departAirport} ({firstLeg.departTime})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PlaneLanding className="h-4 w-4 text-indigo-500" />
                  <span>{lastLeg.arriveAirport} ({lastLeg.arriveTime})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  <span>{firstLeg.departDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-indigo-500" />
                  <span>
                    {b.details.firstName} {b.details.lastName} ({b.details.email})
                  </span>
                </div>
              </div>

              {b.status === "BOOKED" && (
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                     onClick={() => handleCancel(b.id, b.flight.map((leg) => leg.id))}
                  >
                    Cancel Booking
                  </Button>
                </div>
              )}
            </Card>
          );
        })
      )}
    </div>
  );
}
