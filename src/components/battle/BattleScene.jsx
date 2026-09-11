import BattleEntity from "./BattleEntity";
import ProjectileEffect from "./ProjectileEffect";
import { getSkillAsset } from "../../utils/battleSprites";

export default function BattleScene({
  background,
  playerVisual,
  playerSprite,
  playerName,
  enemyVisual,
  enemySprite,
  enemyName,
  damageNumbers,
  skillEffects,
}) {
  const playerDamage = damageNumbers.filter((n) => n.target === "player");
  const enemyDamage = damageNumbers.filter((n) => n.target === "enemy");

  const projectiles = skillEffects.filter((e) => e.type === "projectile");

  const playerEffects = skillEffects
    .filter((e) => e.target === "player" && e.type !== "projectile")
    .map((e) => ({ id: e.id, asset: getSkillAsset(e.skillName), type: e.type }));
  const enemyEffects = skillEffects
    .filter((e) => e.target === "enemy" && e.type !== "projectile")
    .map((e) => ({ id: e.id, asset: getSkillAsset(e.skillName), type: e.type }));

  return (
    <section className="relative flex-1 overflow-hidden">
      <img
        src={background}
        alt=""
        className="image-pixelated absolute inset-0 h-full w-full object-cover object-[center_20%]"
      />

      <div className="relative flex h-full items-end justify-between px-6 pb-0 md:px-[12%] md:pb-1">
        <div className="translate-y-[75px] md:translate-y-[120px]">
          <BattleEntity
            image={playerSprite}
            alt={playerName}
            visual={playerVisual}
            damageNumbers={playerDamage}
            skillEffects={playerEffects}
            isPlayer
          />
        </div>

        <div className="translate-y-[81px] md:translate-y-[130px]">
          <BattleEntity
            image={enemySprite}
            alt={enemyName}
            visual={enemyVisual}
            damageNumbers={enemyDamage}
            skillEffects={enemyEffects}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          {projectiles.map((e) => (
            <ProjectileEffect
              key={e.id}
              asset={getSkillAsset(e.skillName)}
              direction={e.origin === "player" ? "ltr" : "rtl"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
