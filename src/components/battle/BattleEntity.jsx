import DamageNumber from "./DamageNumber";
import ShieldEffect from "./ShieldEffect";
import SkillEffect from "./SkillEffect";

export default function BattleEntity({
  image,
  alt,
  visual,
  damageNumbers = [],
  skillEffects = [],
}) {
  const { pose, x, shield } = visual;

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
        className={`image-pixelated h-40 object-contain drop-shadow-[0_12px_8px_rgba(0,0,0,0.45)] md:h-64 ${
          pose === "damage" ? "animate-hit-shake" : ""
        }`}
      />

      {shield && <ShieldEffect />}

      {skillEffects.map((effect) => (
        <SkillEffect key={effect.id} asset={effect.asset} />
      ))}

      {damageNumbers.map((number) => (
        <DamageNumber key={number.id} amount={number.amount} />
      ))}
    </div>
  );
}
