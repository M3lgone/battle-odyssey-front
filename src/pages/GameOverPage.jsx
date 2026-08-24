import { useLocation, useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";

import deadWarrior from "../assets/characters/dead-warrior.png";
import deadMage from "../assets/characters/dead-mage.png";
import deadArcher from "../assets/characters/dead-archer.png";

const deadSprites = {
  Warrior: deadWarrior,
  Mage: deadMage,
  Archer: deadArcher,
};

export default function GameOverPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const characterClass = location.state?.characterClass;
  const deadSprite = deadSprites[characterClass];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(127,29,29,0.35)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="relative flex flex-col items-center">
        <h1 className="text-center text-5xl font-bold uppercase tracking-[0.2em] text-red-800 drop-shadow-[0_0_24px_rgba(153,27,27,0.45)] sm:text-6xl md:text-7xl">
          Game Over
        </h1>

        {deadSprite && (
          <img
            src={deadSprite}
            alt=""
            className="image-pixelated mt-8 h-auto w-64 max-w-[85vw] object-contain drop-shadow-[0_12px_8px_rgba(0,0,0,0.55)] drop-shadow-[0_0_28px_rgba(153,27,27,0.35)] sm:w-80 md:w-[26rem]"
          />
        )}

        <div className="mt-10 w-full max-w-xs">
          <Button onClick={() => navigate("/menu")}>Back to Menu</Button>
        </div>
      </div>
    </div>
  );
}
