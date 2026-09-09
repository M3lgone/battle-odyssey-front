import DamageNumber from "./DamageNumber";
import ShieldEffect from "./ShieldEffect";
import SkillEffect from "./SkillEffect";

export default function BattleEntity({
  image,
  alt,
  visual,
  damageNumbers = [],
  skillEffects = [],
  isPlayer = false,
}) {
  const { pose, x, shield } = visual;
  const isDead = pose === "dead" && isPlayer;

  return (
    <div
      className="relative"
      style={{
        transform: `translateX(${x}px)`,
        transition: "transform 200ms ease-out",
      }}
    >
      <img
        src={image}
        alt={alt}
        className={`image-pixelated max-w-full object-contain drop-shadow-[0_12px_8px_rgba(0,0,0,0.45)] ${
          isDead ? "h-32 translate-y-2 md:h-52 md:translate-y-3" : "h-40 md:h-64"
        } ${pose === "damage" ? "animate-hit-shake" : ""}`}
      />

      {shield && <ShieldEffect />}

      {skillEffects.map((effect) => (
        <SkillEffect key={effect.id} asset={effect.asset} type={effect.type} />
      ))}

      {damageNumbers.map((number) => (
        <DamageNumber key={number.id} amount={number.amount} />
      ))}
    </div>
  );
}
