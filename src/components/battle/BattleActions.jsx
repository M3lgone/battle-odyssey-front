import { useState } from "react";
import Button from "../ui/Button";
import SkillSelector from "./SkillSelector";

export default function BattleActions({ skills, onAttack, onSkill, onDefend, onFlee, disabled = false }) {
  const [showSkills, setShowSkills] = useState(false);
  const list = skills ?? [];

  return (
    <div className="rounded-md border border-battle-gold-light/40 bg-black/25 p-4">
      {showSkills ? (
        <>
          <h3 className="mb-3 text-lg font-bold uppercase tracking-[0.15em] text-battle-gold-light">
            Skills
          </h3>

          <div className="h-[140px] overflow-hidden">
            <SkillSelector
              skills={list}
              disabled={disabled}
              onSelect={(skill) => { setShowSkills(false); onSkill?.(skill); }}
              onBack={() => setShowSkills(false)}
            />
          </div>
        </>
      ) : (
        <>
          <h3 className="mb-3 text-lg font-bold uppercase tracking-[0.15em] text-battle-gold-light">
            Actions
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="blue" onClick={onAttack} disabled={disabled}>Attack</Button>

            <Button variant="blue" onClick={onDefend} disabled={disabled}>Defend</Button>

            <Button variant="blue" onClick={() => setShowSkills(true)} disabled={disabled}>Skill</Button>

            <Button variant="blue" onClick={onFlee} disabled={disabled}>Flee</Button>
          </div>
        </>
      )}
    </div>
  );
}
