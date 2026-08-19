import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import BattleStats from "../components/battle/BattleStats";

export default function BetweenBattlesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [processing, setProcessing] = useState(false);

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        <Window title="Between Battles" className="w-full max-w-md">
          <p className="mb-6 text-center text-battle-error">
            Missing battle data. Please return to the menu.
          </p>

          <Button onClick={() => navigate("/menu")}>Back to menu</Button>
        </Window>
      </div>
    );
  }

  const { gameId, defeatedEnemy, character, playerStatus } = state;

  const handleContinue = () => {
    if (processing) return;

    setProcessing(true);
    navigate(`/battle/${gameId}`);
  };

  const handleBackToMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <Window title="Between Battles" className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-center text-2xl font-bold uppercase tracking-[0.2em] text-battle-gold-light md:text-3xl">
            Battle Won!
          </h1>

          <div className="relative">
            <img
              src={defeatedEnemy.imageSrc}
              alt={defeatedEnemy.enemy_name}
              className="image-pixelated h-40 w-40 object-contain opacity-40 grayscale drop-shadow-[0_12px_8px_rgba(0,0,0,0.45)] md:h-48 md:w-48"
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-black text-red-500 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] md:text-8xl">
                ✕
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold uppercase tracking-[0.15em] text-battle-gold-light md:text-3xl">
              {defeatedEnemy.enemy_name}
            </p>

            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-battle-error md:text-base">
              — Defeated —
            </p>
          </div>

          <div className="w-full border-t border-battle-gold/40" />

          <div className="w-full">
            <BattleStats
              name="Your Status"
              hp={playerStatus.currentHp}
              maxHp={character.max_health_points}
              mp={playerStatus.currentMp}
              maxMp={character.max_magic_points}
            />
          </div>

          <p className="text-center text-battle-text-muted">
            You defeated the enemy.
          </p>

          <div className="w-full space-y-4">
            <Button onClick={handleContinue} disabled={processing}>
              {processing ? "Continuing..." : "Next"}
            </Button>

            <Button onClick={handleContinue} disabled={processing}>
              {processing ? "Continuing..." : "Rest & Next"}
            </Button>

            <Button onClick={handleBackToMenu} disabled={processing}>
              Back to menu
            </Button>
          </div>
        </div>
      </Window>
    </div>
  );
}