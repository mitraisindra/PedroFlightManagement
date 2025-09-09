import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserLayout from "@/pages/user/UserLayout";
import UserDashboard from "@/pages/user/UserDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Admin area */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* more admin routes later, e.g.: <Route path="users" element={<AdminUsers />} /> */}
        </Route>

        {/* User area */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          {/* more user routes later */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
