import { Outlet } from "react-router-dom";

export default function TitleLayout() {
  return (
    <main className="min-h-screen bg-[#000022] text-white">
      <Outlet />
    </main>
  );
}