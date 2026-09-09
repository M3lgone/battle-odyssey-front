import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import BattleScene from "../components/battle/BattleScene";
import BattleActions from "../components/battle/BattleActions";
import BattleLog from "../components/battle/BattleLog";
import BattleStats from "../components/battle/BattleStats";

import { createBattle, getBattle, getBattles, updateBattle } from "../api/battles";
import { getBackground, getCharacterSprite, getEnemySprite } from "../utils/battleSprites";
import { resolveTurn } from "../services/battleEngine";
import useBattleAnimation from "../hooks/useBattleAnimation";

export default function BattlePage() {
  const navigate = useNavigate();
  const { gameId } = useParams();

  const [battle, setBattle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const loadBattle = async () => {
      try {
        const battlesRes = await getBattles(gameId);

        const ongoing = battlesRes.data.battles.find(
          (b) => b.result === "ongoing"
        );

        const battleRes = ongoing
          ? await getBattle(ongoing.id)
          : await createBattle(gameId);

        if (battleRes.data.game_won) {
          setGameWon(true);
          setLoading(false);
          return;
        }

        setBattle(battleRes.data.battle ?? battleRes.data);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setFetchError(
          err.response?.data?.message || "Failed to start battle."
        );
        setLoading(false);
      }
    };

    loadBattle();
  }, [gameId, navigate]);

  const character = battle?.character;
  const enemy = battle?.enemies[0];

  const [enemyHp, setEnemyHp] = useState(enemy?.pivot?.current_hp ?? 0);
  const [charHp, setCharHp] = useState(battle?.character_current_hp ?? 0);
  const [charMp, setCharMp] = useState(battle?.character_current_mp ?? 0);
  const [enemyMp, setEnemyMp] = useState(enemy?.pivot?.current_mp ?? 0);
  const [playerDefending, setPlayerDefending] = useState(false);
  const [enemyDefending, setEnemyDefending] = useState(false);
  const [combatOver, setCombatOver] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [dying, setDying] = useState(false);
  const deathTimer = useRef(null);
  const [victorious, setVictorious] = useState(false);
  const victoryTimer = useRef(null);
  const [totalDealt, setTotalDealt] = useState(battle?.total_damage_dealt ?? 0);
  const [totalReceived, setTotalReceived] = useState(
    battle?.total_damage_received ?? 0
  );
  const [messages, setMessages] = useState([]);

  const initialized = useRef(false);

  useEffect(() => {
    if (!battle || initialized.current) return;

    const battleEnemy = battle.enemies[0];

    initialized.current = true;

    setEnemyHp(battleEnemy?.pivot?.current_hp ?? 0);
    setCharHp(battle.character_current_hp ?? 0);
    setCharMp(battle.character_current_mp ?? 0);
    setEnemyMp(battleEnemy?.pivot?.current_mp ?? 0);
    setTotalDealt(battle.total_damage_dealt ?? 0);
    setTotalReceived(battle.total_damage_received ?? 0);
    setMessages([
      `${battleEnemy?.enemy_name?.toUpperCase() ?? "ENEMY"} ENCOUNTER!`,
      `${battle.character?.class ?? "Hero"} is ready to fight.`,
      "Choose your action.",
    ]);
  }, [battle]);

  useEffect(() => {
    return () => {
      if (deathTimer.current) clearTimeout(deathTimer.current);
      if (victoryTimer.current) clearTimeout(victoryTimer.current);
    };
  }, []);

  const {
    playerVisual,
    enemyVisual,
    damageNumbers,
    skillEffects,
    busy,
    runSequence,
  } = useBattleAnimation();

  const finishBattle = async (
    result,
    hp,
    mp,
    enemyHpValue,
    enemyMpValue,
    dealt,
    received
  ) => {
    if (saving) return;

    const payload = {
      result,
      character_current_hp: hp,
      character_current_mp: mp,
      total_damage_dealt: dealt,
      total_damage_received: received,
      enemies: [
        {
          id: enemy.id,
          current_hp: enemyHpValue,
          current_mp: enemyMpValue,
        },
      ],
    };

    setLastResult({ result, hp, mp, enemyHpValue, enemyMpValue, dealt, received });
    setSaving(true);
    setUpdateError(null);

    try {
      const response = await updateBattle(battle.id, payload);
      const gameStatus = response.data?.game_status;

      if (result === "win" && gameStatus === "active") {
        navigate("/between-battles", {
          state: {
            gameId: gameId,
            defeatedEnemy: {
              id: enemy.id,
              enemy_name: enemy.enemy_name,
              enemyKey: enemy.enemy_image_url
                .replace("images/enemies/", "")
                .replace(".png", ""),
            },
            character: {
              class: character.class,
              max_health_points: character.max_health_points,
              max_magic_points: character.max_magic_points,
            },
            playerStatus: {
              currentHp: hp,
              currentMp: mp,
            },
          },
        });
        return;
      }

      if (result === "loss") {
        setDying(true);
        deathTimer.current = window.setTimeout(() => {
          navigate("/game-over", { state: { characterClass: character.class } });
        }, 1000);
        return;
      }

      if (result === "win" && gameStatus === "finished") {
        setVictorious(true);
        victoryTimer.current = window.setTimeout(() => {
          navigate("/victory-final", {
            state: { characterClass: character.class },
          });
        }, 1400);
        return;
      }

      navigate("/menu");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setUpdateError(
        err.response?.data?.message ||
          "Failed to save battle result. Please try again."
      );
      setSaving(false);
    }
  };

  const handleRetrySave = () => {
    if (!lastResult) return;

    finishBattle(
      lastResult.result,
      lastResult.hp,
      lastResult.mp,
      lastResult.enemyHpValue,
      lastResult.enemyMpValue,
      lastResult.dealt,
      lastResult.received
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Battle">
          <p className="text-center text-battle-text-muted">Loading...</p>
        </Window>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Battle">
          <p className="mb-6 text-center text-battle-gold">Victory! Run complete.</p>

          <Button variant="black" onClick={() => navigate("/menu")}>Back to menu</Button>
        </Window>
      </div>
    );
  }

  if (updateError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Battle">
          <p className="mb-6 text-center text-battle-error">{updateError}</p>

          <Button variant="blue" onClick={handleRetrySave} disabled={saving}>
            {saving ? "Saving..." : "Retry"}
          </Button>

          <Button variant="black" onClick={() => navigate("/menu")}>Back to menu</Button>
        </Window>
      </div>
    );
  }

  if (fetchError || !battle) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Battle">
          <p className="mb-6 text-center text-battle-error">
            {fetchError || "Game not found."}
          </p>

          <Button variant="black" onClick={() => navigate("/characters")}>Back</Button>
        </Window>
      </div>
    );
  }

  const commitOutcome = (next, ended) => {
    setEnemyHp(next.enemyHp);
    setCharHp(next.charHp);
    setCharMp(next.charMp);
    setEnemyMp(next.enemyMp);
    setEnemyDefending(next.enemyDefending);
    setPlayerDefending(next.playerDefending);
    setTotalDealt(next.totalDealt);
    setTotalReceived(next.totalReceived);
    setCombatOver(ended);
    setMessages(next.messages);
  };

  const runAction = async (action) => {
    if (busy || combatOver || saving) return;

    const combat = {
      character,
      enemy,
      charHp,
      charMp,
      enemyHp,
      enemyMp,
      enemyDefending,
      playerDefending,
      totalDealt,
      totalReceived,
      messages,
    };

    const { next, steps, result, ended } = resolveTurn(combat, action);

    if (steps.length > 0) {
      await runSequence(steps, {
        onImpact: (step) => {
          if (step.target === "enemy") {
            setEnemyHp(step.newHp);
          } else {
            setCharHp(step.newHp);
          }
        },
      });
    }

    commitOutcome(next, ended);

    if (result) {
      finishBattle(
        result,
        next.charHp,
        next.charMp,
        next.enemyHp,
        next.enemyMp,
        next.totalDealt,
        next.totalReceived
      );
    }
  };

  const handleAttack = () => {
    runAction({ type: "attack" });
  };

  const handleSkill = (skill) => {
    runAction({ type: "skill", skill });
  };

  const handleDefend = () => {
    runAction({ type: "defend" });
  };

  const handleFlee = () => {
    runAction({ type: "flee" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <BattleScene
        background={getBackground(enemy.background_image_url)}
        playerVisual={playerVisual}
        playerSprite={getCharacterSprite(character.class, playerVisual.pose)}
        playerName={character.class}
        enemyVisual={enemyVisual}
        enemySprite={getEnemySprite(enemy.enemy_image_url, enemyVisual.pose)}
        enemyName={enemy.enemy_name}
        damageNumbers={damageNumbers}
        skillEffects={skillEffects}
      />

      <div className="border-t-2 border-battle-gold bg-gradient-to-b from-battle-window-top to-battle-window-bottom px-4 py-4">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          <BattleActions
            skills={character.skills}
            onAttack={handleAttack}
            onSkill={handleSkill}
            onDefend={handleDefend}
            onFlee={handleFlee}
            disabled={combatOver || saving || busy}
          />

          <BattleStats
            name={character.class}
            hp={charHp}
            maxHp={character.max_health_points}
            mp={charMp}
            maxMp={character.max_magic_points}
          />

          <BattleLog messages={messages} />

          <BattleStats
            name={enemy.enemy_name}
            hp={enemyHp}
            maxHp={enemy.max_health_points}
            mp={enemyMp}
            maxMp={enemy.max_magic_points}
          />
        </div>
      </div>

      {dying && (
        <div
          className="pointer-events-none fixed inset-0 z-50 animate-death-fade"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(127,29,29,0.35) 0%, rgba(0,0,0,0.92) 55%, #000 100%)",
          }}
        />
      )}

      {victorious && (
        <div
          className="pointer-events-none fixed inset-0 z-50 animate-victory-flash"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,240,180,0.9) 0%, rgba(255,213,74,0.5) 40%, rgba(0,0,34,0.85) 100%)",
          }}
        />
      )}
    </div>
  );
}
