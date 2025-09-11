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
  const flight = bookingData.flight;
  const details = bookingData.details;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-600">
        Confirm Your Booking
      </h2>

      <Card className="shadow-md">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Flight Summary</h3>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <PlaneTakeoff className="h-5 w-5 text-indigo-500" />
              <span>
                <strong>From:</strong> {flight?.departAirport || "-"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <PlaneLanding className="h-5 w-5 text-indigo-500" />
              <span>
                <strong>To:</strong> {flight?.arriveAirport || "-"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              <span>
                <strong>Date:</strong> {flight?.departDate || "-"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-500" />
              <span>
                <strong>Passengers:</strong> {bookingData.search?.passengers || 1}
              </span>
            </div>

            <div className="flex items-center space-x-2 col-span-2">
              <CreditCard className="h-5 w-5 text-indigo-500" />
              <span>
                <strong>Price:</strong> Rp{" "}
                {flight?.price
                  ? flight.price.toLocaleString("id-ID")
                  : "-"}
              </span>
            </div>
          </div>

          <hr />

          <div className="text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Passenger</h4>
            <p>{details?.name}</p>
            <p>{details?.email}</p>
            <p>{details?.phone}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={onConfirm}>
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
}
