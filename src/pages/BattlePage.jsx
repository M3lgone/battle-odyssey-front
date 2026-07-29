import { useState } from "react";
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

const characterSprites = {
  Warrior: warriorSprite,
  Mage: mageSprite,
  Archer: archerSprite,
};

export default function BattlePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const character = characters.find((character) => character.id === Number(id));

  const enemy = enemies[0];

  const [enemyHp, setEnemyHp] = useState(enemy?.max_health_points ?? 0);
  const [messages, setMessages] = useState([
    `A wild ${enemy?.enemy_name ?? "enemy"} appears!`,
    `${character?.class ?? "Hero"} is ready to fight.`,
    "Choose your action.",
  ]);

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

  const handleAttack = () => {
    const damage = character.attack;

    setEnemyHp((prev) => Math.max(0, prev - damage));
    setMessages((prev) => {
      const updated = [
      ...prev,
      `${character.class} attacks ${enemy.enemy_name}.`,
      `${enemy.enemy_name} takes ${damage} damage.`,
    ];

  return updated.slice(-4);
});
  };

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
          <BattleActions skills={character.skills} onAttack={handleAttack} />

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
            hp={enemyHp}
            maxHp={enemy.max_health_points}
          />
        </div>
      </div>
    </div>
  );
}
