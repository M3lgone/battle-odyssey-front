import { useNavigate, useParams } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";

import warriorImg from "../assets/characters/avatar-warrior.png";
import mageImg from "../assets/characters/avatar-mage.jpg";
import archerImg from "../assets/characters/avatar-archer.png";

export default function CharacterDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const characters = [
    {
      id: 1,
      class: "Warrior",
      attack: 20,
      defense: 20,
      maxHealth: 200,
      maxMagic: 50,
      image: warriorImg,
      skills: ["Slash", "Shield Bash", "Berserk"],
    },
    {
      id: 2,
      class: "Mage",
      attack: 30,
      defense: 15,
      maxHealth: 150,
      maxMagic: 200,
      image: mageImg,
      skills: ["Fireball", "Ice Lance", "Lightning Bolt"],
    },
    {
      id: 3,
      class: "Archer",
      attack: 25,
      defense: 18,
      maxHealth: 175,
      maxMagic: 100,
      image: archerImg,
      skills: ["Power Shot", "Multi Shot", "Poison Arrow"],
    },
  ];

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
            src={character.image}
            alt={character.class}
            className="mb-6 h-56 object-contain"
          />

          <h2 className="mb-6 text-3xl text-battle-gold">{character.class}</h2>

          <div className="mb-8 w-full max-w-xs space-y-6 text-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-red-400">
                <span className="mr-2 text-xl">❤️</span>
                HP
              </span>

              <span className="font-semibold text-battle-text">
                {character.maxHealth}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-sky-400">
                <span className="mr-2 text-xl">💧</span>
                MP
              </span>

              <span className="font-semibold text-battle-text">
                {character.maxMagic}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-400">
                <span className="mr-2 text-xl">⚔️</span>
                ATK
              </span>

              <span className="font-semibold text-battle-text">
                {character.attack}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-400">
                <span className="mr-2 text-xl">🛡️</span>
                DEF
              </span>

              <span className="font-semibold text-battle-text">
                {character.defense}
              </span>
            </div>
          </div>

          <div className="mb-8 w-full">
            <h3 className="mb-4 text-center text-2xl text-battle-gold">
              Skills
            </h3>

            <div className="space-y-2">
              {character.skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-md border border-battle-gold-light/40 bg-black/25 p-3 text-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full gap-4">
            <Button onClick={() => navigate("/characters")}>Back</Button>

            <Button>Select Character</Button>
          </div>
        </div>
      </Window>
    </div>
  );
}
