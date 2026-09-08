import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import EntityStats from "../components/EntityStats";
import { getCharacter } from "../api/characters";

import warriorImg from "../assets/avatars/avatar-warrior.png";
import mageImg from "../assets/avatars/avatar-mage.png";
import archerImg from "../assets/avatars/avatar-archer.png";

const imageMap = {
  "images/characters/warrior.png": warriorImg,
  "images/characters/mage.png": mageImg,
  "images/characters/archer.png": archerImg,
};

export default function CharacterDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getCharacter(Number(id))
      .then((response) => {
        if (cancelled) return;
        setCharacter(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (err.response?.status === 404) {
          setError("Character not found.");
          setLoading(false);
          return;
        }

        setError("Failed to load character.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Character Details">
          <p className="text-center text-battle-text-muted">Loading...</p>
        </Window>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Character Details">
          <p className="mb-6 text-center text-battle-error">{error}</p>

          <Button variant="black" onClick={() => navigate("/characters")}>Back</Button>
        </Window>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Character Details">
          <p className="mb-6 text-center text-battle-error">
            Character not found.
          </p>

          <Button variant="black" onClick={() => navigate("/characters")}>Back</Button>
        </Window>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <Window title="Character Details" className="w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <img
            src={
              imageMap[character.character_image_url] ??
              character.character_image_url
            }
            alt={character.class}
            className="image-pixelated mb-6 h-56 object-contain drop-shadow-[0_12px_8px_rgba(0,0,0,0.45)]"
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
            <Button variant="black" onClick={() => navigate("/characters")}>Back</Button>
          </div>
        </div>
      </Window>
    </div>
  );
}