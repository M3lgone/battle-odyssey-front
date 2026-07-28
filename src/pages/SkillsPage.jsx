import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import characters from "../data/characters";
import enemies from "../data/enemies";

const skills = [...characters, ...enemies].flatMap((entity) => entity.skills);

export default function SkillsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <Window title="Skills" className="w-full max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="rounded-md border border-battle-gold-light/40 bg-black/25 p-3 text-center"
            >
              <p className="font-semibold text-battle-gold">
                {skill.skill_name}
              </p>

              <p className="text-sm text-battle-text-muted">
                {skill.description}
              </p>

              <p className="mt-1 text-sm">
                ⚔️ {skill.damage_skill} · 💧 {skill.skill_cost_magic_points} MP
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button onClick={() => navigate("/menu")}>Back</Button>
        </div>
      </Window>
    </div>
  );
}
