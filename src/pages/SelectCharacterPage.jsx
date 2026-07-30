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

          <Button onClick={() => navigate("/menu")}>Back</Button>
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

          <Button
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
