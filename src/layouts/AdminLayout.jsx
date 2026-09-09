import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-battle-text">
      <header className="border-b border-battle-gold/40 bg-black/60 px-6 py-4">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <p className="text-lg font-bold uppercase tracking-[0.15em] text-battle-gold-light">
              Admin Panel
            </p>

            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                to="/admin/users"
                className="text-battle-text-muted transition hover:text-battle-gold"
              >
                Users
              </Link>

              <Link
                to="/admin/characters"
                className="text-battle-text-muted transition hover:text-battle-gold"
              >
                Characters
              </Link>

              <Link
                to="/admin/enemies"
                className="text-battle-text-muted transition hover:text-battle-gold"
              >
                Enemies
              </Link>

              <Link
                to="/admin/skills"
                className="text-battle-text-muted transition hover:text-battle-gold"
              >
                Skills
              </Link>
            </nav>
          </div>

          <Link
            to="/menu"
            className="text-sm text-battle-text-muted transition hover:text-battle-gold"
          >
            Back to Menu
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
