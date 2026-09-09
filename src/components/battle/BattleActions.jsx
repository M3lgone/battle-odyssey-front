import { useState } from "react";
import Button from "../ui/Button";

export default function BattleActions({ skills, onAttack, onSkill, onDefend, onFlee, disabled = false }) {
  const [showSkills, setShowSkills] = useState(false);
  const list = skills ?? [];

  if (showSkills) {
    return (
      <div className="rounded-md border border-battle-gold-light/40 bg-black/25 p-4">
        <h3 className="mb-3 text-lg font-bold uppercase tracking-[0.15em] text-battle-gold-light">
          Skills
        </h3>

        <div className="grid grid-cols-1 gap-2">
          {list.map((skill) => (
            <Button variant="blue" key={skill.id} onClick={() => { setShowSkills(false); onSkill?.(skill); }} disabled={disabled}>
              <span className="flex w-full min-w-0 items-center justify-between gap-3">
                <span className="min-w-0 flex-1 break-words text-left">{skill.skill_name}</span>
                <span className="shrink-0">{skill.skill_cost_magic_points} MP</span>
              </span>
            </Button>
          ))}

          <Button variant="black" onClick={() => setShowSkills(false)}>Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-battle-gold-light/40 bg-black/25 p-4">
      <h3 className="mb-3 text-lg font-bold uppercase tracking-[0.15em] text-battle-gold-light">
        Actions
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="blue" onClick={onAttack} disabled={disabled}>Attack</Button>

        <Button variant="blue" onClick={onDefend} disabled={disabled}>Defend</Button>

        <Button variant="blue" onClick={() => setShowSkills(true)} disabled={disabled}>Skill</Button>

        <Button variant="blue" onClick={onFlee} disabled={disabled}>Flee</Button>
      </div>
    </div>
  );
}
