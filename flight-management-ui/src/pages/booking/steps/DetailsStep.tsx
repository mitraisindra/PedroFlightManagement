import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, IdCard, Calendar } from "lucide-react";
import type { BookingData } from "../bookingPage";
import { useState } from "react";

interface Props {
  onNext: (details: BookingData["details"]) => void;
  onBack: () => void;
}

export default function DetailsStep({ onNext, onBack }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nik, setNik] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = () => {
    if (!firstName || !lastName || !nik || !dob || !email.includes("@") || phone.length < 5) {
      alert("Please enter valid passenger details.");
      return;
    }
    onNext({ firstName, lastName, nik, dob, email, phone });
  };

  return (
    <div className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold text-indigo-600">Passenger Details</h2>

      {/* First Name */}
      <div className="relative">
        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Last Name */}
      <div className="relative">
        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* NIK */}
      <div className="relative">
        <IdCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="NIK"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* DOB */}
      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
