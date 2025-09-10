import { Card } from "@/components/ui/card";
import { Plane, Ticket , LogOut } from "lucide-react";

const actions = [
  { title: "Book A Flight", icon: Plane, desc: "Add a new aircraft to the system." },
  { title: "Cancel A Booking", icon: Ticket, desc: "Define a new airport or city destination." },
  { title: "Exit", icon: LogOut, desc: "Exit the admin panel." },
];

export default function UserDashboard() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map(({ title, icon: Icon, desc }) => (
          <Card
            key={title}
            className="p-6 hover:shadow-lg transition cursor-pointer"
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
