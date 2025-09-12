import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { BookingData } from "../bookingPage";

interface Props {
  bookingData: BookingData;
}

export default function SuccessStep({ bookingData }: Props) {
  const flightLegs = bookingData.flight ?? []; // it's already an array
  const details = bookingData.details;

  if (flightLegs.length === 0 || !details) return null;

  const firstLeg = flightLegs[0];
  const lastLeg = flightLegs[flightLegs.length - 1];
  const totalPrice = flightLegs.reduce((sum, leg) => sum + (leg.price || 0), 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center">
      {/* Success icon + heading */}
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
      <p className="text-gray-600">Your e-ticket has been issued 🎉</p>

      {/* Ticket card */}
      <Card className="shadow-md border-dashed">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Flight Ticket</h3>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              CONFIRMED
            </span>
          </div>

          {/* Flight Summary */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 text-left">
            <p>
              <strong>From:</strong> {firstLeg.departAirport}
            </p>
            <p>
              <strong>To:</strong> {lastLeg.arriveAirport}
            </p>
            <p>
              <strong>Date:</strong> {firstLeg.departDate}
            </p>
            <p>
              <strong>Time:</strong> {firstLeg.departTime} → {lastLeg.arriveTime}
            </p>
            <p>
              <strong>Passenger:</strong> {details.firstName + " " + details.lastName} 
            </p>
            <p>
              <strong>Seat(s):</strong>{" "}
              {flightLegs.map((leg) => leg.seat || "-").join(", ")}
            </p>
            <p className="col-span-2">
              <strong>Total Price:</strong> Rp{totalPrice.toLocaleString("id-ID")}
            </p>
          </div>

          {/* If multiple legs, show each */}
          {flightLegs.length > 1 && (
            <div className="mt-4 border-t pt-4 text-xs text-gray-600 space-y-2">
              <h4 className="font-semibold">Flight Segments</h4>
              {flightLegs.map((leg) => (
                <div key={leg.id} className="flex justify-between">
                  <span>
                    {leg.departAirport} {leg.departTime}
                  </span>
                  <span>→</span>
                  <span>
                    {leg.arriveAirport} {leg.arriveTime}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Fake barcode */}
          <div className="mt-6">
            <div className="w-full h-10 bg-gradient-to-r from-black to-gray-800 rounded"></div>
            <p className="mt-2 text-xs text-gray-500">
              Booking Ref: #{firstLeg.code}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
