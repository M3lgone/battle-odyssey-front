import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="relative flex min-h-[85vh] w-full max-w-4xl rounded-md">

        <div className="absolute inset-0 rounded-md border-4 border-white bg-gradient-to-b from-blue-800 to-blue-950 shadow-[0_0_0_6px_#64748b,0_0_20px_rgba(0,0,255,.5)]" />

        <main className="relative z-10 flex w-full flex-1 items-center justify-center p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}