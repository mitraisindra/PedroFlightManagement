import { Card } from "@/components/ui/card";
import { Plane, MapPin, Route, ClipboardList, FastForward, PlayCircle, LogOut } from "lucide-react";

const actions = [
  { title: "Register Aircraft", icon: Plane, desc: "Add a new aircraft to the system." },
  { title: "Add Destination", icon: MapPin, desc: "Define a new airport or city destination." },
  { title: "Create Flight Route", icon: Route, desc: "Set up a route between two destinations." },
  { title: "Run Booking Service", icon: ClipboardList, desc: "Enable passengers to book flights." },
  { title: "Go to Next Day", icon: FastForward, desc: "Advance system to the next day." },
  { title: "Run Flight", icon: PlayCircle, desc: "Execute scheduled flights." },
  { title: "Exit", icon: LogOut, desc: "Exit the admin panel." },
];

export default function AdminDashboard() {
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
