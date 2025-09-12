import { Card } from "@/components/ui/card";
import { Plane, Ticket, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Book A Flight",
    icon: Plane,
    desc: "Search, choose, and book a flight.",
    path: "/user/booking",
  },
  {
  title: "My Bookings",
  icon: Ticket,
  desc: "View and cancel your bookings.",
  path: "/user/my-bookings",
  },
  // {
  //   title: "Cancel A Booking",
  //   icon: Ticket,
  //   desc: "Cancel an existing booking.",
  //   path: "/user/cancel",    
  // },
  {
    title: "Exit",
    icon: LogOut,
    desc: "Exit the user panel.",
    path: "/",               
  },
];

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map(({ title, icon: Icon, desc, path }) => (
          <Card
            key={title}
            className="p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(path)}
          >
            <div className="flex flex-col items-center text-center">
              <Icon className="w-10 h-10 text-indigo-600 mb-3" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-gray-500 mt-2">{desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
