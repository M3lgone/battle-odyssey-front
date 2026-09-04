import { useEffect, useRef, useState } from "react";

const LUNGE = 48;
const LUNGE_MS = 180;
const IMPACT_MS = 250;
const RETURN_MS = 180;
const DAMAGE_NUMBER_MS = 700;
const SKILL_EFFECT_MS = 550;
const SHIELD_MS = 80;
const DEATH_MS = 350;
const FLEE_MS = 300;

const initialVisual = { pose: "normal", x: 0, shield: false };

export default function useBattleAnimation() {
  const [playerVisual, setPlayerVisual] = useState(initialVisual);
  const [enemyVisual, setEnemyVisual] = useState(initialVisual);
  const [damageNumbers, setDamageNumbers] = useState([]);
  const [skillEffects, setSkillEffects] = useState([]);
  const [busy, setBusy] = useState(false);

  const busyRef = useRef(false);
  const timersRef = useRef([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  const schedule = (fn, ms) => {
    const id = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((t) => t !== id);
      fn();
    }, ms);
    timersRef.current.push(id);
    return id;
  };

  const setVisual = (actor, patch) => {
    const setter = actor === "player" ? setPlayerVisual : setEnemyVisual;
    setter((prev) => ({ ...prev, ...patch }));
  };

  const addDamageNumber = (target, amount) => {
    const id = nextIdRef.current++;
    setDamageNumbers((prev) => [...prev, { id, target, amount }]);
    schedule(() => {
      setDamageNumbers((prev) => prev.filter((n) => n.id !== id));
    }, DAMAGE_NUMBER_MS);
  };

  const addSkillEffect = (target, skillName) => {
    const id = nextIdRef.current++;
    setSkillEffects((prev) => [...prev, { id, target, skillName }]);
    schedule(() => {
      setSkillEffects((prev) => prev.filter((e) => e.id !== id));
    }, SKILL_EFFECT_MS);
  };

  const runSequence = async (steps, { onImpact } = {}) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);

    const wait = (ms) => new Promise((resolve) => schedule(resolve, ms));
    const other = (actor) => (actor === "player" ? "enemy" : "player");
    let attacker = null;

    try {
      for (const step of steps) {
        switch (step.type) {
          case "shield":
            setVisual(step.actor, { shield: step.on });
            await wait(SHIELD_MS);
            break;

          case "attack":
            attacker = step.actor;
            setVisual(step.actor, {
              pose: "attack",
              x: step.actor === "player" ? LUNGE : -LUNGE,
            });
            await wait(LUNGE_MS);
            break;

          case "cast":
            attacker = step.actor;
            setVisual(step.actor, {
              pose: "attack",
              x: step.actor === "player" ? LUNGE : -LUNGE,
            });
            addSkillEffect(other(step.actor), step.skillName);
            await wait(LUNGE_MS);
            break;

          case "impact": {
            if (onImpact) onImpact(step);
            setVisual(step.target, { pose: "damage" });
            addDamageNumber(step.target, step.amount);
            await wait(IMPACT_MS);
            if (step.newHp > 0) {
              setVisual(step.target, { pose: "normal" });
            }
            if (attacker) {
              setVisual(attacker, { pose: "normal", x: 0 });
            }
            await wait(RETURN_MS);
            break;
          }

          case "death":
            setVisual(step.target, { pose: "dead" });
            await wait(DEATH_MS);
            break;

          case "flee":
            await wait(FLEE_MS);
            break;

          default:
            break;
        }
      }
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  return {
    playerVisual,
    enemyVisual,
    damageNumbers,
    skillEffects,
    busy,
    runSequence,
  };
}
