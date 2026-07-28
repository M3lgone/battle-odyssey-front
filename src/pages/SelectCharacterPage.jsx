import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import characters from "../data/characters";

export default function SelectCharacterPage() {
  const navigate = useNavigate();

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <Window title="Select Character" className="w-full max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => setSelectedCharacter(character.id)}
              className={`
    cursor-pointer
    rounded-md
    p-5
    transition-all
    ${
      selectedCharacter === character.id
        ? "border-2 border-battle-gold bg-black/40"
        : "border border-battle-gold-light/40 bg-black/25"
    }
  `}
            >
              <div className="mb-4 flex justify-center">
                <img
                  src={character.character_image_url}
                  alt={character.class}
                  className="h-40 object-contain"
                />
              </div>

              <h2 className="mb-4 text-center text-xl text-battle-gold">
                {character.class}
              </h2>

              <div className="space-y-1 text-sm">
                <p>❤️ HP: {character.max_health_points}</p>
                <p>💧 MP: {character.max_magic_points}</p>
                <p>⚔️ ATK: {character.attack}</p>
                <p>🛡️ DEF: {character.defense}</p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/characters/${character.id}`);
                  }}
                >
                  Details
                </Button>

                <Button onClick={() => setSelectedCharacter(character.id)}>
                  {selectedCharacter === character.id ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-end justify-between">
          <Button onClick={() => navigate("/menu")}>Back</Button>

          <div className="flex flex-col items-center gap-2">
            <Button disabled>Start Battle</Button>

            <p className="text-xs uppercase tracking-widest text-battle-text-muted">
              Coming soon
            </p>
          </div>
        </div>
      </Window>
    </div>
  );
}
