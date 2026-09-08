import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import BattlePanel from "../components/ui/BattlePanel";
import PlayerStatusSummary from "../components/battle/PlayerStatusSummary";

import { createBattle } from "../api/battles";

import goblinAvatar from "../assets/avatars/avatar-goblin.png";
import trollAvatar from "../assets/avatars/avatar-troll.png";
import orcAvatar from "../assets/avatars/avatar-orc.png";

const enemyAvatars = {
  goblin: goblinAvatar,
  troll: trollAvatar,
  orc: orcAvatar,
};

function Divider() {
  return (
    <div className="flex w-full items-center gap-3">
      <span className="h-px flex-1 bg-battle-gold/50" />
      <span className="h-2 w-2 rotate-45 border border-battle-gold" />
      <span className="h-px flex-1 bg-battle-gold/50" />
    </div>
  );
}

export default function BetweenBattlesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [processing, setProcessing] = useState(false);
  const [createError, setCreateError] = useState(null);

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        <Window title="Between Battles" className="w-full max-w-md">
          <p className="mb-6 text-center text-battle-error">
            Missing battle data. Please return to the menu.
          </p>

          <Button variant="black" onClick={() => navigate("/menu")}>Back to menu</Button>
        </Window>
      </div>
    );
  }

  const { gameId, defeatedEnemy, character, playerStatus } = state;

  const enemyAvatar = enemyAvatars[defeatedEnemy.enemyKey];

  const handleNext = async () => {
    if (processing) return;

    setProcessing(true);
    setCreateError(null);

    try {
      await createBattle(gameId, {
        character_current_hp: playerStatus.currentHp,
        character_current_mp: playerStatus.currentMp,
      });
      navigate(`/battle/${gameId}`);
    } catch (err) {
      setCreateError(
        err.response?.data?.message ||
          "Failed to start next battle. Please try again."
      );
      setProcessing(false);
    }
  };

  const handleRestAndNext = async () => {
    if (processing) return;

    setProcessing(true);
    setCreateError(null);

    try {
      await createBattle(gameId);
      navigate(`/battle/${gameId}`);
    } catch (err) {
      setCreateError(
        err.response?.data?.message ||
          "Failed to start next battle. Please try again."
      );
      setProcessing(false);
    }
  };

  const handleBackToMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <BattlePanel width="md">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-center text-3xl font-bold uppercase tracking-[0.2em] text-battle-gold-light md:text-4xl">
            Battle Won!
          </h1>

          <div className="space-y-3">
            <div className="relative p-4">
              {enemyAvatar && (
                <img
                  src={enemyAvatar}
                  alt={defeatedEnemy.enemy_name}
                  className="image-pixelated h-44 w-44 object-contain opacity-40 grayscale drop-shadow-[0_0_12px_rgba(239,68,68,0.35)] drop-shadow-[0_12px_8px_rgba(0,0,0,0.45)] md:h-52 md:w-52"
                />
              )}

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-black text-red-500 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] md:text-8xl">
                  ✕
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl font-bold uppercase tracking-[0.15em] text-battle-error md:text-2xl">
                {defeatedEnemy.enemy_name}
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-battle-error md:text-sm">
                — Defeated —
              </p>
            </div>
          </div>

          <Divider />

          <PlayerStatusSummary
            name={character.class}
            hp={playerStatus.currentHp}
            maxHp={character.max_health_points}
            mp={playerStatus.currentMp}
            maxMp={character.max_magic_points}
          />

          <Divider />

          {createError && (
            <p className="text-center text-battle-error">{createError}</p>
          )}

          <div className="w-full space-y-4">
            <div>
              <Button variant="blue" onClick={handleNext} disabled={processing}>
                {processing ? "Continuing..." : "Next"}
              </Button>

              <p className="mt-1 text-center text-xs text-battle-text-muted">
                Continue to the next battle.
              </p>
            </div>

            <div>
              <Button variant="blue" onClick={handleRestAndNext} disabled={processing}>
                {processing ? "Continuing..." : "Rest & Next"}
              </Button>

              <p className="mt-1 text-center text-xs text-battle-text-muted">
                HP and MP will be restored.
              </p>
            </div>

            <Button variant="black" onClick={handleBackToMenu} disabled={processing}>
              Back to menu
            </Button>
          </div>
        </div>
      </BattlePanel>
    </div>
  );
}