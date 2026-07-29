import { useNavigate, useParams } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import BattleScene from "../components/battle/BattleScene";
import BattleActions from "../components/battle/BattleActions";
import BattleLog from "../components/battle/BattleLog";
import BattleStats from "../components/battle/BattleStats";

import characters from "../data/characters";
import enemies from "../data/enemies";

import warriorSprite from "../assets/characters/warrior.png";
import mageSprite from "../assets/characters/mage.png";
import archerSprite from "../assets/characters/archer.png";

// La API devuelve el sprite del personaje en character_image_url; el mock lo
// mapea al avatar para la selección, así que la batalla resuelve el sprite
// con este mapa local hasta la integración.
const characterSprites = {
  Warrior: warriorSprite,
  Mage: mageSprite,
  Archer: archerSprite,
};

export default function BattlePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const character = characters.find((character) => character.id === Number(id));

  // El servidor elige el enemigo según las batallas ganadas de la partida;
  // en esta iteración visual se usa siempre el primero del mock.
  const enemy = enemies[0];

  if (!character || !enemy) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Battle">
          <p className="mb-6 text-center text-battle-error">
            {!character ? "Character not found." : "No enemies available."}
          </p>

          <Button onClick={() => navigate("/characters")}>Back</Button>
        </Window>
      </div>
    );
  }

  const messages = [
    `A wild ${enemy.enemy_name} appears!`,
    `${character.class} is ready to fight.`,
    "Choose your action.",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <BattleScene
        background={enemy.background_image_url}
        characterImage={characterSprites[character.class]}
        characterName={character.class}
        enemyImage={enemy.enemy_image_url}
        enemyName={enemy.enemy_name}
      />

      <div className="border-t-2 border-battle-gold bg-gradient-to-b from-battle-window-top to-battle-window-bottom px-4 py-4">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          <BattleActions skills={character.skills} />

          <BattleStats
            name={character.class}
            hp={character.max_health_points}
            maxHp={character.max_health_points}
            mp={character.max_magic_points}
            maxMp={character.max_magic_points}
          />

          <BattleLog messages={messages} />

          <BattleStats
            name={enemy.enemy_name}
            hp={enemy.max_health_points}
            maxHp={enemy.max_health_points}
          />
        </div>
      </div>
    </div>
  );
}
