import { Link } from "react-router-dom";
import { Shield, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 p-6">
      <div className="flex flex-col items-center max-w-4xl w-full space-y-16">
        {/* header */}
        <h2 className="pt-2 text-4xl font-bold leading-tight text-center 
               bg-gradient-to-r from-indigo-500 to-green-500 bg-clip-text text-transparent animate-pulse">
              Flight Management App
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {/* Admin card */}
          <Link to="/admin" className="block">
            <Card className="bg-white border rounded-xl shadow-sm hover:shadow-lg hover:border-indigo-400 transition cursor-pointer h-full p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <Shield className="w-10 h-10 text-indigo-600 mb-2" />
                <CardTitle className="text-xl font-semibold">Admin</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Open the admin panel to manage users and configurations.
              </CardContent>
            </Card>
          </Link>

          {/* User card */}
          <Link to="/user" className="block">
            <Card className="bg-white border rounded-xl shadow-sm hover:shadow-lg hover:border-green-400 transition cursor-pointer h-full p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <User className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle className="text-xl font-semibold">User</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Open the user panel to browse flights and perform actions.
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
