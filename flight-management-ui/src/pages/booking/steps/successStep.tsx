import type { BookingData } from "../bookingPage";

interface SuccessStepProps {
  bookingData: BookingData;
}

export default function SuccessStep({ bookingData }: SuccessStepProps) {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
      <p className="text-gray-600">Your e-ticket has been issued 🎉</p>

      {/* E-ticket card */}
      <div className="mx-auto max-w-md border-2 border-dashed rounded-2xl shadow-lg bg-white">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Flight Ticket</h3>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
              CONFIRMED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>From:</strong> {bookingData.flight?.departAirport}</p>
            <p><strong>To:</strong> {bookingData.flight?.arriveAirport}</p>
            <p><strong>Date:</strong> {bookingData.flight?.departDate}</p>
            <p><strong>Time:</strong> {bookingData.flight?.departTime} - {bookingData.flight?.arriveTime}</p>
            <p><strong>Duration:</strong> {bookingData.flight?.duration}</p>
            <p><strong>Passenger:</strong> {bookingData.details?.name}</p>
            <p><strong>Price:</strong> ${bookingData.flight?.price}</p>
          </div>
        </div>

        {/* fake barcode section */}
        <div className="border-t px-6 py-3 bg-gray-50">
          <div className="h-10 w-full bg-gradient-to-r from-black to-gray-700 rounded-sm" />
          <p className="text-xs text-gray-500 mt-2">Booking Ref: #{bookingData.flight?.id}</p>
        </div>
      </div>
    </div>
  );
}
