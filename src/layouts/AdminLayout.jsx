import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import charactersMock from "../data/characters";

export default function AdminLayout() {
  const [characters, setCharacters] = useState(charactersMock);

  return (
    <div className="min-h-screen bg-slate-950 text-battle-text">
      <header className="border-b border-battle-gold/40 bg-black/60 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="text-lg font-bold uppercase tracking-[0.15em] text-battle-gold-light">
            Admin Panel
          </p>

          <Link
            to="/menu"
            className="text-sm text-battle-text-muted transition hover:text-battle-gold"
          >
            Back to Menu
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet context={{ characters, setCharacters }} />
      </main>
    </div>
  );
}
