import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <main>
        <Outlet />
      </main>
    </div>
  );
}