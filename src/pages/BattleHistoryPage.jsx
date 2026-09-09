import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import { getBattles } from "../api/battles";

import goblinAvatar from "../assets/avatars/avatar-goblin.png";
import trollAvatar from "../assets/avatars/avatar-troll.png";
import orcAvatar from "../assets/avatars/avatar-orc.png";

const resultLabels = {
  win: "Win",
  loss: "Loss",
  flee: "Flee",
  ongoing: "Ongoing",
};

const resultStyles = {
  win: "border-emerald-400/50 bg-emerald-400/10 text-emerald-400",
  loss: "border-battle-error/50 bg-battle-error/10 text-battle-error",
  flee: "border-amber-400/50 bg-amber-400/10 text-amber-400",
  ongoing: "border-sky-400/50 bg-sky-400/10 text-sky-400",
};

const enemyAvatars = {
  goblin: goblinAvatar,
  troll: trollAvatar,
  orc: orcAvatar,
};

export default function BattleHistoryPage() {
  const navigate = useNavigate();
  const { gameId } = useParams();

  const [battles, setBattles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getBattles(gameId)
      .then((response) => {
        if (cancelled) return;
        setBattles(response.data.battles ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (err.response?.status === 404) {
          setError("Game not found.");
          setLoading(false);
          return;
        }

        if (err.response?.status === 403) {
          setError(
            err.response?.data?.message ||
              "This battle history does not belong to you."
          );
          setLoading(false);
          return;
        }

        setError(
          err.response?.data?.message || "Failed to load battle history."
        );
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [gameId, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Battle History">
          <p className="text-center text-battle-text-muted">Loading...</p>
        </Window>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <Window title="Battle History" className="w-full max-w-3xl">
          <p className="mb-6 text-center text-battle-error">{error}</p>

          <Button variant="black" onClick={() => navigate("/menu")}>
            Back
          </Button>
        </Window>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <Window title="Battle History" className="w-full max-w-3xl">
        {battles.length === 0 ? (
          <p className="text-center text-battle-text-muted">
            No battles recorded yet.
          </p>
        ) : (
          <div className="space-y-5">
            {battles.map((battle) => {
              const enemy = battle.enemies?.[0];
              const enemyKey =
                enemy?.enemy_image_url
                  ?.replace("images/enemies/", "")
                  .replace(".png", "") ?? enemy?.enemy_name?.toLowerCase();
              const enemyAvatar = enemyAvatars[enemyKey];

              return (
              <article
                key={battle.id}
                className="relative overflow-hidden rounded-md border border-battle-gold-light/40 bg-black/25 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              >
                {enemyAvatar && (
                  <img
                    src={enemyAvatar}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 top-1/2 h-44 w-44 -translate-y-1/2 select-none object-contain opacity-15 grayscale [mask-image:linear-gradient(to_left,black_55%,transparent)] sm:h-56 sm:w-56"
                  />
                )}
                <div className="relative z-10 flex items-center justify-between gap-3 border-b border-battle-gold/20 bg-black/40 px-4 py-3">
                  <p
                    className={`rounded border px-2 py-0.5 text-sm font-black uppercase tracking-[0.2em] ${resultStyles[battle.result] ?? "border-battle-gold/50 bg-battle-gold/10 text-battle-gold"}`}
                  >
                    {resultLabels[battle.result] ?? battle.result}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-battle-text-muted">
                    Battle #{battle.id}
                  </p>
                </div>

                <div className="relative z-10 space-y-4 p-4">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <div className="min-w-0 text-left">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-battle-gold-light">
                        Character
                      </p>

                      <p className="truncate text-lg font-black uppercase tracking-[0.1em] text-battle-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {battle.character?.class ?? "—"}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-1 px-1">
                      <span className="h-px w-6 bg-battle-gold/60 sm:w-10" />
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-battle-gold drop-shadow-[0_0_6px_rgba(255,213,74,0.45)]">
                        VS
                      </span>
                      <span className="h-px w-6 bg-battle-gold/60 sm:w-10" />
                    </div>

                    <div className="min-w-0 text-right">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-battle-gold-light">
                        Enemy
                      </p>

                      <p className="truncate text-lg font-black uppercase tracking-[0.1em] text-battle-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {battle.enemies?.[0]?.enemy_name ?? "—"}
                      </p>
                    </div>
                  </div>

                  <p className="text-center text-xs text-battle-text-muted sm:text-sm">
                    Date:{" "}
                    {battle.created_at
                      ? new Date(battle.created_at).toLocaleString()
                      : "—"}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded border border-white/10 bg-black/40 px-3 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-battle-text-muted">
                        <span className="mr-1 text-battle-gold">⚔</span>
                        Damage
                      </p>

                      <p className="mt-0.5 font-bold text-battle-gold">
                        {battle.total_damage_dealt ?? "—"}
                      </p>
                    </div>

                    <div className="rounded border border-white/10 bg-black/40 px-3 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-battle-text-muted">
                        <span className="mr-1 text-orange-300">🛡</span>
                        Received
                      </p>

                      <p className="mt-0.5 font-bold text-orange-300">
                        {battle.total_damage_received ?? "—"}
                      </p>
                    </div>

                    <div className="rounded border border-white/10 bg-black/40 px-3 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-battle-text-muted">
                        <span className="mr-1 text-red-400">♥</span>
                        HP
                      </p>

                      <p className="mt-0.5 font-bold text-red-400">
                        {battle.character_current_hp ?? "—"}
                      </p>
                    </div>

                    <div className="rounded border border-white/10 bg-black/40 px-3 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-battle-text-muted">
                        <span className="mr-1 text-sky-400">💧</span>
                        MP
                      </p>

                      <p className="mt-0.5 font-bold text-sky-400">
                        {battle.character_current_mp ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        )}

        <div className="mt-8">
          <Button variant="black" onClick={() => navigate("/menu")}>
            Back
          </Button>
        </div>
      </Window>
    </div>
  );
}
