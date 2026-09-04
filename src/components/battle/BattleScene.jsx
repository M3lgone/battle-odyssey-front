import BattleEntity from "./BattleEntity";
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

  const playerEffects = skillEffects
    .filter((e) => e.target === "player")
    .map((e) => ({ id: e.id, asset: getSkillAsset(e.skillName) }));
  const enemyEffects = skillEffects
    .filter((e) => e.target === "enemy")
    .map((e) => ({ id: e.id, asset: getSkillAsset(e.skillName) }));

  return (
    <section className="relative flex-1 overflow-hidden">
      <img
        src={background}
        alt=""
        className="image-pixelated absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative flex h-full items-end justify-between px-6 pb-6 md:px-[12%] md:pb-10">
        <BattleEntity
          image={playerSprite}
          alt={playerName}
          visual={playerVisual}
          damageNumbers={playerDamage}
          skillEffects={playerEffects}
        />

        <BattleEntity
          image={enemySprite}
          alt={enemyName}
          visual={enemyVisual}
          damageNumbers={enemyDamage}
          skillEffects={enemyEffects}
        />
      </div>
    </section>
  );
}
