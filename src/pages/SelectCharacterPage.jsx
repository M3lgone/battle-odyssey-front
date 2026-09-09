import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import { getCharacters } from "../api/characters";
import { createGame } from "../api/games";

import warriorImg from "../assets/avatars/avatar-warrior.png";
import mageImg from "../assets/avatars/avatar-mage.png";
import archerImg from "../assets/avatars/avatar-archer.png";

const imageMap = {
  "images/characters/warrior.png": warriorImg,
  "images/characters/mage.png": mageImg,
  "images/characters/archer.png": archerImg,
};

export default function SelectCharacterPage() {
  const navigate = useNavigate();

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [creatingGame, setCreatingGame] = useState(false);

  useEffect(() => {
    getCharacters()
      .then((response) => {
        setCharacters(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load characters.");
        setLoading(false);
      });
  }, []);

  const handleStartBattle = async () => {
    try {
      setCreatingGame(true);
      const response = await createGame(selectedCharacter);

      navigate(`/battle/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create game.");
    } finally {
      setCreatingGame(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Select Character">
          <p className="text-center text-battle-text-muted">Loading...</p>
        </Window>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Select Character">
          <p className="mb-6 text-center text-battle-error">{error}</p>

          <Button variant="black" onClick={() => navigate("/menu")}>Back</Button>
        </Window>
      </div>
    );
  }

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
                  src={
                    imageMap[character.character_image_url] ??
                    character.character_image_url
                  }
                  alt={character.class}
                  className="image-pixelated h-40 object-contain drop-shadow-[0_12px_8px_rgba(0,0,0,0.45)]"
                />
              </div>

              <h2 className="mb-4 text-center text-xl text-battle-gold">
                {character.class}
              </h2>

              <div className="mx-auto w-full max-w-[220px] space-y-0.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-red-400">
                    <span className="mr-2">❤️</span>
                    HP
                  </span>
                  <span className="font-semibold text-battle-text">
                    {character.max_health_points}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sky-400">
                    <span className="mr-2">💧</span>
                    MP
                  </span>
                  <span className="font-semibold text-battle-text">
                    {character.max_magic_points}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-400">
                    <span className="mr-2">⚔️</span>
                    ATK
                  </span>
                  <span className="font-semibold text-battle-text">
                    {character.attack}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-400">
                    <span className="mr-2">🛡️</span>
                    DEF
                  </span>
                  <span className="font-semibold text-battle-text">
                    {character.defense}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-6">
                <Button
                  variant="blue"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/characters/${character.id}`);
                  }}
                >
                  Details
                </Button>

                <Button variant="blue" onClick={() => setSelectedCharacter(character.id)}>
                  {selectedCharacter === character.id ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Button variant="black" onClick={() => navigate("/menu")}>Back</Button>

          <Button
            variant="blue"
            disabled={!selectedCharacter || creatingGame}
            onClick={handleStartBattle}
          >
            {creatingGame ? "Creating game..." : "Start Battle"}
          </Button>
        </div>
      </Window>
    </div>
  );
}
