import { Outlet, Link } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] bg-white">
      <header className="border-b p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">User Panel</h1>
        <nav className="space-x-4">
          <Link className="underline" to="/">Home</Link>
          <Link className="underline" to="/user">Dashboard</Link>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
