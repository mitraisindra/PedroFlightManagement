import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, IdCard, Calendar } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { BookingData } from "../bookingPage";
import { useState } from "react";

interface Props {
  onNext: (details: BookingData["details"]) => void;
  onBack: () => void;
}

export default function DetailsStep({ onNext, onBack }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nik, setNik] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="max-w-md mx-auto space-y-6 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold text-center text-indigo-600">
        Passenger Details
      </h2>

      <Select onValueChange={setTitle}>
        <SelectTrigger>
          <SelectValue placeholder="Select Title" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Mr">Mr</SelectItem>
          <SelectItem value="Mrs">Mrs</SelectItem>
          <SelectItem value="Ms">Ms</SelectItem>
          <SelectItem value="Dr">Dr</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative">
        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="pl-10"
        />
      </div>

      <Input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <div className="relative">
        <IdCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="NIK (ID Number)"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() =>
            onNext({
              name: `${firstName} ${lastName}`,
              email,
              phone,
            })
          }
          disabled={!firstName || !lastName || !nik || !dob || !email || !phone}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
