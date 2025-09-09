import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Flight Management App
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Admin card */}
          <Link
            to="/admin"
            className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:underline">Admin</h2>
            <p className="text-gray-600">
              Open the admin panel to manage data, users, and configurations.
            </p>
          </Link>

          {/* User card */}
          <Link
            to="/user"
            className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:underline">User</h2>
            <p className="text-gray-600">
              Open the user panel to browse content and perform actions.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
