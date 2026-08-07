import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import { getActiveGame } from "../api/games";
import { logout } from "../api/auth";
import logo from "../assets/logo/logo-battle-odissey.png";

export default function MainMenuPage() {
  const navigate = useNavigate();

  const [activeGameId, setActiveGameId] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    getActiveGame()
      .then((response) => setActiveGameId(response.data.id))
      .catch(() => setActiveGameId(null));
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } catch {
      // El token ya no es válido o hubo un error de red
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <img
        src={logo}
        alt="Battle Odyssey"
        className="mb-10 w-full max-w-sm animate-[float_4s_ease-in-out_infinite]"
      />

      <Window title="Main Menu" className="w-full max-w-md">
        <div className="space-y-4">
          {activeGameId && (
            <Button onClick={() => navigate(`/battle/${activeGameId}`)}>
              Continue
            </Button>
          )}

          <Button onClick={() => navigate("/characters")}>New Game</Button>

          <Button onClick={() => navigate("/profile")}>Profile</Button>

          <Button onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </Window>
    </div>
  );
}

