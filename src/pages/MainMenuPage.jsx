import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo-battle-odissey.png";

export default function MainMenuPage() {
  const navigate = useNavigate();

  const hasActiveGame = true; // Temporal

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <img
        src={logo}
        alt="Battle Odyssey"
        className="mb-10 w-full max-w-sm animate-[float_4s_ease-in-out_infinite]"
      />

      <Window title="Main Menu" className="w-full max-w-md">
        <div className="space-y-4">
          {hasActiveGame && <Button>Continue</Button>}

          <Button onClick={() => navigate("/characters")}>New Game</Button>

          <Button onClick={() => navigate("/profile")}>Profile</Button>

          <Button>Logout</Button>
        </div>
      </Window>
    </div>
  );
}

