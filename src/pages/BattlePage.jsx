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
  const [charHp, setCharHp] = useState(character?.max_health_points ?? 0);
  const [charMp, setCharMp] = useState(character?.max_magic_points ?? 0);
  const [enemyMp, setEnemyMp] = useState(enemy?.max_magic_points ?? 0);
  const [playerDefending, setPlayerDefending] = useState(false);
  const [enemyDefending, setEnemyDefending] = useState(false);
  const [combatOver, setCombatOver] = useState(false);
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

  const computeEnemyTurn = () => {
    if (Math.random() < 0.2) {
      return {
        defending: true,
        damage: 0,
        actionLabel: `${enemy.enemy_name} defends.`,
        mpCost: 0,
      };
    }

    const hasSkills = enemy.skills.length > 0;
    let useSkill = false;
    let skill = null;

    if (hasSkills) {
      useSkill = Math.random() < 0.3;

      if (useSkill) {
        skill = enemy.skills[Math.floor(Math.random() * enemy.skills.length)];
        useSkill = enemyMp >= skill.skill_cost_magic_points;
      }
    }

    if (useSkill && skill) {
      return {
        defending: false,
        damage: skill.damage_skill,
        actionLabel: `${enemy.enemy_name} uses ${skill.skill_name}.`,
        mpCost: skill.skill_cost_magic_points,
      };
    }

    return {
      defending: false,
      damage: enemy.attack,
      actionLabel: `${enemy.enemy_name} attacks ${character.class}.`,
      mpCost: 0,
    };
  };

  const performAction = (damage, mpCost, actionLabel) => {
    if (mpCost > charMp) {
      setMessages((prev) => [...prev, "Not enough MP."].slice(-4));
      return;
    }

    let playerDamage = damage;

    if (enemyDefending) {
      playerDamage = Math.max(1, playerDamage - enemy.defense);
    }

    const newCharMp = mpCost > 0 ? charMp - mpCost : charMp;
    const newEnemyHp = Math.max(0, enemyHp - playerDamage);

    let newCharHp = charHp;
    let newEnemyMp = enemyMp;

    const newMessages = [
      ...messages,
      actionLabel,
      `${enemy.enemy_name} takes ${playerDamage} damage.`,
    ];

    if (newEnemyHp > 0) {
      const enemyTurn = computeEnemyTurn();

      if (enemyTurn.defending) {
        setEnemyDefending(true);
        newMessages.push(enemyTurn.actionLabel);
      } else {
        let enemyDamage = enemyTurn.damage;

        if (playerDefending) {
          enemyDamage = Math.max(1, enemyDamage - character.defense);
        }

        newEnemyMp = enemyMp - enemyTurn.mpCost;
        newCharHp = Math.max(0, charHp - enemyDamage);
        newMessages.push(
          enemyTurn.actionLabel,
          `${character.class} takes ${enemyDamage} damage.`
        );
      }
    }

    let ended = false;

    if (newEnemyHp <= 0) {
      ended = true;
      newMessages.push(`${enemy.enemy_name} has been defeated!`);
    } else if (newCharHp <= 0) {
      ended = true;
      newMessages.push(`${character.class} has been defeated!`);
    }

    setEnemyHp(newEnemyHp);
    setCharHp(newCharHp);
    setCharMp(newCharMp);
    setEnemyMp(newEnemyMp);
    setEnemyDefending(false);
    setPlayerDefending(false);
    setCombatOver(ended);
    setMessages(newMessages.slice(-4));
  };

  const handleAttack = () => {
    if (combatOver) return;

    performAction(
      character.attack,
      0,
      `${character.class} attacks ${enemy.enemy_name}.`
    );
  };

  const handleSkill = (skill) => {
    if (combatOver) return;

    performAction(
      skill.damage_skill,
      skill.skill_cost_magic_points,
      `${character.class} uses ${skill.skill_name}.`
    );
  };

  const applyEnemyTurn = (baseMessages, baseCharHp, baseEnemyMp, applyPlayerDefense) => {
    const enemyTurn = computeEnemyTurn();
    const messages = [...baseMessages];

    let charHpResult = baseCharHp;
    let enemyMpResult = baseEnemyMp;

    if (enemyTurn.defending) {
      setEnemyDefending(true);
      messages.push(enemyTurn.actionLabel);
    } else {
      let enemyDamage = enemyTurn.damage;

      if (applyPlayerDefense) {
        enemyDamage = Math.max(1, enemyDamage - character.defense);
      }

      enemyMpResult = baseEnemyMp - enemyTurn.mpCost;
      charHpResult = Math.max(0, baseCharHp - enemyDamage);
      messages.push(
        enemyTurn.actionLabel,
        `${character.class} takes ${enemyDamage} damage.`
      );
    }

    let ended = false;

    if (charHpResult <= 0) {
      ended = true;
      messages.push(`${character.class} has been defeated!`);
    }

    return { messages, charHp: charHpResult, enemyMp: enemyMpResult, ended };
  };

  const handleDefend = () => {
    if (combatOver) return;

    const result = applyEnemyTurn(
      [...messages, `${character.class} defends.`],
      charHp,
      enemyMp,
      true
    );

    setCharHp(result.charHp);
    setEnemyMp(result.enemyMp);
    setPlayerDefending(false);
    setCombatOver(result.ended);
    setMessages(result.messages.slice(-4));
  };

  const handleFlee = () => {
    if (combatOver) return;

    if (Math.random() < 0.8) {
      setCombatOver(true);
      setMessages(
        [...messages, `${character.class} fled successfully.`].slice(-4)
      );
      return;
    }

    const result = applyEnemyTurn(
      [...messages, `${character.class} failed to flee.`],
      charHp,
      enemyMp,
      false
    );

    setCharHp(result.charHp);
    setEnemyMp(result.enemyMp);
    setPlayerDefending(false);
    setCombatOver(result.ended);
    setMessages(result.messages.slice(-4));
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
          <BattleActions skills={character.skills} onAttack={handleAttack} onSkill={handleSkill} onDefend={handleDefend} onFlee={handleFlee} disabled={combatOver} />

          <BattleStats
            name={character.class}
            hp={charHp}
            maxHp={character.max_health_points}
            mp={charMp}
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
