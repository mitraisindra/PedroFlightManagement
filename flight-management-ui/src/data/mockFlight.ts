// src/data/mockFlights.ts
import type { BookingData } from "@/pages/booking/bookingPage";

export interface MockItinerary {
  id: number;
  legs: NonNullable<BookingData["flight"]>;
  totalPrice: number;
  availableSeats: number;
}

export const mockFlights: MockItinerary[] = [
    {
    id: 1,
    availableSeats: 5,
    legs: [
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
        seat: "",
        price: 1620039,
      },
    ],
    totalPrice: 1620039,
  },
  {
    id: 2,
    availableSeats: 2,
    legs: [
      {
        id: 2,
        airline: "Pedro Air",
        code: "PA916",
        departTime: "12:00",
        departAirport: "CGK",
        departDate: "2025-09-19",
        arriveTime: "14:20",
        arriveAirport: "SUB",
        duration: "2h 20m",
        seat: "",
        price: 1480039,
      },
    ],
    totalPrice: 1480039,
  },
  {
    id: 3,
    availableSeats: 3,
    legs: [
      {
        id: 3,
        airline: "Pedro Air",
        code: "PA920-1",
        departTime: "09:00",
        departAirport: "CGK",
        departDate: "2025-09-20",
        arriveTime: "11:00",
        arriveAirport: "SUB",
        duration: "2h 00m",
        seat: "",
        price: 1000000,
      },
      {
        id: 4,
        airline: "Pedro Air",
        code: "PA920-2",
        departTime: "12:00",
        departAirport: "SUB",
        departDate: "2025-09-20",
        arriveTime: "14:30",
        arriveAirport: "UPG",
        duration: "2h 30m",
        seat: "",
        price: 1100000,
      },
    ],
    totalPrice: 2100000,
  },
  {
    id: 4,
    availableSeats: 6,
    legs: [
      {
        id: 5,
        airline: "Pedro Air",
        code: "PA101",
        departTime: "06:30",
        departAirport: "SUB",
        departDate: "2025-09-21",
        arriveTime: "09:00",
        arriveAirport: "DPS",
        duration: "2h 30m",
        seat: "",
        price: 1200000,
      },
    ],
    totalPrice: 1200000,
  },
  {
    id: 5,
    availableSeats: 1,
    legs: [
      {
        id: 6,
        airline: "Pedro Air",
        code: "PA102-1",
        departTime: "15:00",
        departAirport: "DPS",
        departDate: "2025-09-21",
        arriveTime: "17:00",
        arriveAirport: "SUB",
        duration: "2h 00m",
        seat: "",
        price: 800000,
      },
      {
        id: 7,
        airline: "Pedro Air",
        code: "PA102-2",
        departTime: "18:00",
        departAirport: "SUB",
        departDate: "2025-09-21",
        arriveTime: "20:00",
        arriveAirport: "CGK",
        duration: "2h 00m",
        seat: "",
        price: 850000,
      },
    ],
    totalPrice: 1650000,
  },
  {
    id: 6,
    availableSeats: 4,
    legs: [
      {
        id: 8,
        airline: "Pedro Air",
        code: "PA201",
        departTime: "10:15",
        departAirport: "CGK",
        departDate: "2025-09-22",
        arriveTime: "12:45",
        arriveAirport: "SIN",
        duration: "2h 30m",
        seat: "",
        price: 2200000,
      },
    ],
    totalPrice: 2200000,
  },
  {
    id: 7,
    availableSeats: 7,
    legs: [
      {
        id: 9,
        airline: "Pedro Air",
        code: "PA202",
        departTime: "13:00",
        departAirport: "SIN",
        departDate: "2025-09-22",
        arriveTime: "16:30",
        arriveAirport: "KUL",
        duration: "3h 30m",
        seat: "",
        price: 2500000,
      },
    ],
    totalPrice: 2500000,
  },
];

