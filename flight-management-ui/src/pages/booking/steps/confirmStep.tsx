import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaneTakeoff, PlaneLanding, Calendar, Users, CreditCard } from "lucide-react";
import type { BookingData } from "../bookingPage";

interface Props {
  bookingData: BookingData;
  onConfirm: () => void;
  onBack: () => void;
}

export default function ConfirmStep({ bookingData, onConfirm, onBack }: Props) {
  const flights = bookingData.flight || [];
  const details = bookingData.details;
  const totalPrice = flights.reduce((sum, f) => sum + f.price, 0);
  
  const handleConfirm = () => {
  const now = new Date();
  const firstFlightDate = flights[0]
    ? new Date(`${flights[0].departDate}T${flights[0].departTime}`)
    : null;

  if (firstFlightDate && firstFlightDate < now) {
    alert("This flight has already departed. Booking not allowed.");
    return;
  }

  // mock API call success
  setTimeout(() => {
    onConfirm();
  }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-600">
        Confirm Your Booking
      </h2>

      <Card className="shadow-md">
        <CardContent className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">Flight Summary</h3>

          {flights.map((flight) => (
            <div key={flight.id} className="grid grid-cols-2 gap-4 text-sm text-gray-700 border-b pb-2 mb-2 last:border-none last:pb-0 last:mb-0">
              <div className="flex items-center space-x-2">
                <PlaneTakeoff className="h-5 w-5 text-indigo-500" />
                <span>
                  <strong>From:</strong> {flight.departAirport} ({flight.departTime})
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <PlaneLanding className="h-5 w-5 text-indigo-500" />
                <span>
                  <strong>To:</strong> {flight.arriveAirport} ({flight.arriveTime})
                </span>
              </div>

              <div className="flex items-center space-x-2 col-span-2">
                <Calendar className="h-5 w-5 text-indigo-500" />
                <span>
                  <strong>Date:</strong> {flight.departDate}
                </span>
              </div>
            </div>
          ))}

          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Users className="h-5 w-5 text-indigo-500" />
            <span>
              <strong>Passengers:</strong> {bookingData.search?.passengers || 1}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <CreditCard className="h-5 w-5 text-indigo-500" />
            <span>
              <strong>Total Price:</strong> Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>

          <hr />

          <div className="text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Passenger</h4>
            <p>{details?.firstName}</p>
            <p>{details?.email}</p>
            <p>{details?.phone}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleConfirm}>
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
}
