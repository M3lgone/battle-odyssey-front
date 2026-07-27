import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo/logo-battle-odissey.png";

export default function TitleScreen() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleKeyDown = () => {
      navigate("/login");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div
      onClick={() => navigate("/login")}
      className="relative flex min-h-screen cursor-pointer select-none flex-col items-center justify-center"
    >
      {/* Logo + Press Any Button */}
      <div className="flex flex-col items-center gap-12">
        <div className="w-full max-w-2xl px-6">
          <img
            src={logo}
            alt="Battle Odyssey"
            draggable="false"
            className="h-auto w-full drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]"
          />
        </div>

        <p
          className="animate-pulse text-battle-gold-light text-xl font-bold uppercase tracking-[0.35rem]"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          Press Any Button
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 flex flex-col items-center text-center">
        <p className="text-sm text-battle-text-muted">
          © {currentYear} Battle Odyssey
        </p>

        <p className="text-xs uppercase tracking-widest text-battle-text-muted">
          All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
