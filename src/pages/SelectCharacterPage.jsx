import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";

import warriorImg from "../assets/characters/avatar-warrior.png";
import mageImg from "../assets/characters/avatar-mage.jpg";
import archerImg from "../assets/characters/avatar-archer.png";

export default function SelectCharacterPage() {
  const navigate = useNavigate();

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    {
      id: 1,
      class: "Warrior",
      attack: 20,
      defense: 20,
      maxHealth: 200,
      maxMagic: 50,
      image: warriorImg,
    },
    {
      id: 2,
      class: "Mage",
      attack: 30,
      defense: 15,
      maxHealth: 150,
      maxMagic: 200,
      image: mageImg,
    },
    {
      id: 3,
      class: "Archer",
      attack: 25,
      defense: 18,
      maxHealth: 175,
      maxMagic: 100,
      image: archerImg,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <Window title="Select Character" className="w-full max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`
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
                  src={character.image}
                  alt={character.class}
                  className="h-40 object-contain"
                />
              </div>

              <h2 className="mb-4 text-center text-xl text-battle-gold">
                {character.class}
              </h2>

              <div className="space-y-1 text-sm">
                <p>⚔ Attack: {character.attack}</p>
                <p>🛡 Defense: {character.defense}</p>
                <p>❤️ Health: {character.maxHealth}</p>
                <p>✨ Magic: {character.maxMagic}</p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Button onClick={() => navigate(`/characters/${character.id}`)}>
                  Details
                </Button>

                <Button onClick={() => setSelectedCharacter(character.id)}>
                  {selectedCharacter === character.id ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button onClick={() => navigate("/menu")}>Back</Button>

          <Button disabled={!selectedCharacter}>Start Battle</Button>
        </div>
      </Window>
    </div>
  );
}
