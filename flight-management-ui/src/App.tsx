import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserLayout from "@/pages/user/UserLayout";
import UserDashboard from "@/pages/user/UserDashboard";
import BookingPage from "./pages/booking/bookingPage";
import MyBookingsPage from "./pages/user/MyBookingPage";
import FlightStatusPage from "./pages/admin/aircraft/flight-execution/ui/FlightStatusPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Admin area */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* more admin routes later, e.g.: <Route path="users" element={<AdminUsers />} /> */}
          <Route path="/admin/flight-status" element={<FlightStatusPage />} />
        </Route>

        {/* User area */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="my-bookings" element={<MyBookingsPage />} />
          {/* more user routes later */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
