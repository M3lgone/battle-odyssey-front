import { useLocation, useNavigate } from "react-router-dom";

import winWarrior from "../assets/characters/win-warrior.png";
import winMage from "../assets/characters/win-mage.png";
import winArcher from "../assets/characters/win-archer.png";

const winSprites = {
  Warrior: winWarrior,
  Mage: winMage,
  Archer: winArcher,
};

const winSizes = {
  Warrior: "w-48 sm:w-64 md:w-[20rem]",
  Mage: "w-48 sm:w-64 md:w-[20rem]",
  Archer: "w-64 sm:w-80 md:w-[26rem]",
};

export default function VictoryFinalPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const characterClass = location.state?.characterClass;
  const winSprite = winSprites[characterClass];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-battle-background px-6 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,213,74,0.14)_0%,rgba(0,0,34,0)_60%)]" />

      <div className="relative flex flex-col items-center">
        <h1 className="animate-victory-title-in text-center text-6xl font-bold uppercase tracking-[0.2em] text-battle-gold drop-shadow-[0_0_28px_rgba(255,213,74,0.45)] sm:text-7xl md:text-8xl">
          Victory!
        </h1>

        {winSprite && (
          <img
            src={winSprite}
            alt=""
            className={`animate-victory-hero-in image-pixelated mt-10 h-auto max-w-[85vw] object-contain drop-shadow-[0_12px_8px_rgba(0,0,0,0.55)] drop-shadow-[0_0_28px_rgba(255,213,74,0.25)] ${winSizes[characterClass] ?? winSizes.Archer}`}
          />
        )}

        <div className="animate-victory-cta-in mt-12">
          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="cursor-pointer text-sm font-semibold uppercase tracking-[0.2em] text-battle-gold-light transition-colors duration-150 hover:text-white"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
