import { useNavigate, useParams } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import EntityStats from "../components/EntityStats";
import characters from "../data/characters";

export default function CharacterDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const character = characters.find((character) => character.id === Number(id));

  if (!character) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Character Details">
          <p className="mb-6 text-center text-battle-error">
            Character not found.
          </p>

          <Button onClick={() => navigate("/characters")}>Back</Button>
        </Window>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <Window title="Character Details" className="w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <img
            src={character.character_image_url}
            alt={character.class}
            className="mb-6 h-56 object-contain"
          />

          <h2 className="mb-6 text-3xl text-battle-gold">{character.class}</h2>

          <EntityStats
            hp={character.max_health_points}
            mp={character.max_magic_points}
            attack={character.attack}
            defense={character.defense}
          />

          <div className="mb-8 w-full">
            <h3 className="mb-4 text-center text-2xl text-battle-gold">
              Skills
            </h3>

            <div className="space-y-2">
              {character.skills.map((skill) => (
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
                    ⚔️ {skill.damage_skill} · 💧 {skill.skill_cost_magic_points}{" "}
                    MP
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full gap-4">
            <Button onClick={() => navigate("/characters")}>Back</Button>
          </div>
        </div>
      </Window>
    </div>
  );
}
