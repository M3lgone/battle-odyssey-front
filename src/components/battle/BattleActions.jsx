import Button from "../ui/Button";

export default function BattleActions({ skills, onAttack, onSkill, onDefend, disabled = false }) {
  return (
    <div className="rounded-md border border-battle-gold-light/40 bg-black/25 p-4">
      <h3 className="mb-3 text-lg font-bold uppercase tracking-[0.15em] text-battle-gold-light">
        Actions
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={onAttack} disabled={disabled}>Attack</Button>

        <Button onClick={onDefend} disabled={disabled}>Defend</Button>

        {skills.map((skill) => (
          <Button key={skill.id} onClick={() => onSkill?.(skill)} disabled={disabled}>{skill.skill_name}</Button>
        ))}

        <Button disabled={disabled}>Flee</Button>
      </div>

      <p className="mt-3 text-center text-xs text-battle-text-muted">
        {skills
          .map(
            (skill) =>
              `${skill.skill_name} costs ${skill.skill_cost_magic_points} MP`
          )
          .join(" · ")}
      </p>
    </div>
  );
}
