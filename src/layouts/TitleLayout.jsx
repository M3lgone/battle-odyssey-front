import { Outlet } from 'react-router-dom';

export default function TitleLayout() {
  return (
    <main className="min-h-screen bg-battle-background text-battle-text">
      <Outlet />
    </main>
  );
}