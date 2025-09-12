import { useState } from "react";
import SearchStep from "./steps/searchStep";
import FlightsStep from "./steps/flightStep";
import DetailsStep from "./steps/DetailsStep";
import ConfirmStep from "./steps/confirmStep";
import SuccessStep from "./steps/successStep";

export type BookingStep = "search" | "flights" | "details" | "confirm" | "success";

export interface BookingData {
  search?: {
    from: string;
    to: string;
    date?: string;
    passengers?: number;
  };
  flight?: {
    id: number;
    airline: string;
    code: string;
    departTime: string;
    departAirport: string;
    departDate: string;
    arriveTime: string;
    arriveAirport: string;
    duration: string;
    seat: string;
    price: number;
  }[];
  details?: {
    firstName: string;
    lastName: string;
    nik: string;
    dob: string;
    email: string;
    phone: string;
  };
}



export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>("search");

  const [bookingData, setBookingData] = useState<BookingData>({});

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center text-sm font-medium text-gray-600">
        {["Search", "Flights", "Details", "Confirm", "Success"].map((label, i) => (
          <div
            key={label}
            className={`flex-1 text-center ${
              step === label.toLowerCase() ? "text-indigo-600 font-bold" : ""
            }`}
          >
            {i + 1}. {label}
          </div>
        ))}
      </div>

      {/* Steps */}
        {step === "search" && (
            <SearchStep
                onNext={(data) => {
                setBookingData((prev) => ({ ...prev, search: data }));
                setStep("flights");
            }}
        />
        )}

        {step === "flights" && (
        <FlightsStep
            search={bookingData.search}
            onNext={(flight) => {
            setBookingData((prev) => ({ ...prev, flight }));
            setStep("details");
            }}
            onBack={() => setStep("search")}
        />
        )}


        {step === "details" && (
        <DetailsStep
            onNext={(details) => {
            setBookingData((prev) => ({ ...prev, details }));
            setStep("confirm");
            }}
            onBack={() => setStep("flights")}
        />
        )}


      {step === "flights" && (
        <FlightsStep
            onNext={(flight) => {
            setBookingData((prev) => ({ ...prev, flight }));
            setStep("details");
            }}
            onBack={() => setStep("search")}
        />
        )}

      {step === "details" && (
        <DetailsStep
            onNext={(details) => {
            setBookingData((prev) => ({ ...prev, details })); 
            setStep("confirm");
            }}
            onBack={() => setStep("flights")}
        />
       )}


      {step === "confirm" && (
        <ConfirmStep
          bookingData={bookingData}
          onConfirm={() => setStep("success")}
          onBack={() => setStep("details")}
        />
      )}

      {step === "success" && <SuccessStep bookingData={bookingData} />}
    </div>
  );
}
