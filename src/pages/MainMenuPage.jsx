import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import { getActiveGame } from "../api/games";
import { getMe, logout } from "../api/auth";
import logo from "../assets/logo/logo-battle-odissey.png";

export default function MainMenuPage() {
  const navigate = useNavigate();

  const [activeGameId, setActiveGameId] = useState(null);
  const [loadingGame, setLoadingGame] = useState(true);
  const [gameError, setGameError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const loadActiveGame = useCallback(() => {
    getActiveGame()
      .then((response) => {
        setActiveGameId(response.data.id);
        setLoadingGame(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (err.response?.status === 404) {
          setActiveGameId(null);
          setLoadingGame(false);
          return;
        }

        setActiveGameId(null);
        setLoadingGame(false);
        setGameError("Failed to load active game.");
      });
  }, [navigate]);

  useEffect(() => {
    loadActiveGame();
  }, [loadActiveGame]);

  const handleRetry = () => {
    setLoadingGame(true);
    setGameError(null);
    loadActiveGame();
  };

  useEffect(() => {
    getMe()
      .then((response) => {
        setIsAdmin(response.data.role === "admin");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
      });
  }, [navigate]);

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
          {gameError && (
            <>
              <p className="text-center text-battle-error">{gameError}</p>
              <Button onClick={handleRetry} disabled={loadingGame}>
                {loadingGame ? "Retrying..." : "Retry"}
              </Button>
            </>
          )}

          {!gameError && loadingGame && (
            <p className="text-center text-battle-text-muted">Loading...</p>
          )}

          {!gameError && !loadingGame && activeGameId && (
            <Button onClick={() => navigate(`/battle/${activeGameId}`)}>
              Continue
            </Button>
          )}

          <Button onClick={() => navigate("/characters")}>New Game</Button>

          <Button onClick={() => navigate("/profile")}>Profile</Button>

          {isAdmin && (
            <Button onClick={() => navigate("/admin")}>Admin Panel</Button>
          )}

          <Button onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </Window>
    </div>
  );
}
