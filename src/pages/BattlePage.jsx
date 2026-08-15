import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import BattleScene from "../components/battle/BattleScene";
import BattleActions from "../components/battle/BattleActions";
import BattleLog from "../components/battle/BattleLog";
import BattleStats from "../components/battle/BattleStats";

import { getActiveGame } from "../api/games";
import { createBattle, getBattle, getBattles, updateBattle } from "../api/battles";

import warriorSprite from "../assets/characters/warrior.png";
import mageSprite from "../assets/characters/mage.png";
import archerSprite from "../assets/characters/archer.png";

import goblinSprite from "../assets/enemies/goblin.png";
import trollSprite from "../assets/enemies/troll.png";
import orcSprite from "../assets/enemies/orc.png";

import woodsBg from "../assets/backgrounds/woods.png";
import caveBg from "../assets/backgrounds/cave.png";
import fortressBg from "../assets/backgrounds/fortress.png";

const characterSprites = {
  Warrior: warriorSprite,
  Mage: mageSprite,
  Archer: archerSprite,
};

const enemySprites = {
  "images/enemies/goblin.png": goblinSprite,
  "images/enemies/troll.png": trollSprite,
  "images/enemies/orc.png": orcSprite,
};

const backgrounds = {
  "images/backgrounds/bg-goblin.png": woodsBg,
  "images/backgrounds/bg-troll.png": caveBg,
  "images/backgrounds/bg-orc.png": fortressBg,
};

function shouldFleeSucceed() {
  return Math.random() < 0.8;
}

export default function BattlePage() {
  const navigate = useNavigate();
  const { gameId } = useParams();

  const [battle, setBattle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const loadBattle = async () => {
      try {
        const gameRes = await getActiveGame();

        const battlesRes = await getBattles(gameRes.data.id);

        const ongoing = battlesRes.data.battles.find(
          (b) => b.result === "ongoing"
        );

        const battleRes = ongoing
          ? await getBattle(ongoing.id)
          : await createBattle(gameRes.data.id);

        if (battleRes.data.game_won) {
          setGameWon(true);
          setLoading(false);
          return;
        }

        setBattle(battleRes.data.battle ?? battleRes.data);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setFetchError(
          err.response?.data?.message || "Failed to start battle."
        );
        setLoading(false);
      }
    };

    loadBattle();
  }, [gameId, navigate]);

  const character = battle?.character;
  const enemy = battle?.enemies[0];

  const [enemyHp, setEnemyHp] = useState(enemy?.pivot?.current_hp ?? 0);
  const [charHp, setCharHp] = useState(battle?.character_current_hp ?? 0);
  const [charMp, setCharMp] = useState(battle?.character_current_mp ?? 0);
  const [enemyMp, setEnemyMp] = useState(enemy?.pivot?.current_mp ?? 0);
  const [playerDefending, setPlayerDefending] = useState(false);
  const [enemyDefending, setEnemyDefending] = useState(false);
  const [combatOver, setCombatOver] = useState(false);
  const [totalDealt, setTotalDealt] = useState(battle?.total_damage_dealt ?? 0);
  const [totalReceived, setTotalReceived] = useState(
    battle?.total_damage_received ?? 0
  );
  const [messages, setMessages] = useState([]);

  const initialized = useRef(false);

  useEffect(() => {
    if (!battle || initialized.current) return;

    const enemy = battle.enemies[0];

    initialized.current = true;

    setEnemyHp(enemy?.pivot?.current_hp ?? 0);
    setCharHp(battle.character_current_hp ?? 0);
    setCharMp(battle.character_current_mp ?? 0);
    setEnemyMp(enemy?.pivot?.current_mp ?? 0);
    setTotalDealt(battle.total_damage_dealt ?? 0);
    setTotalReceived(battle.total_damage_received ?? 0);
    setMessages([
      `A wild ${enemy?.enemy_name ?? "enemy"} appears!`,
      `${battle.character?.class ?? "Hero"} is ready to fight.`,
      "Choose your action.",
    ]);
  }, [battle]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Battle">
          <p className="text-center text-battle-text-muted">Loading...</p>
        </Window>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Battle">
          <p className="mb-6 text-center text-battle-gold">Victory! Run complete.</p>

          <Button onClick={() => navigate("/menu")}>Back to menu</Button>
        </Window>
      </div>
    );
  }

  if (fetchError || !battle) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Battle">
          <p className="mb-6 text-center text-battle-error">
            {fetchError || "Game not found."}
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
    const newTotalDealt = totalDealt + playerDamage;

    let newCharHp = charHp;
    let newEnemyMp = enemyMp;
    let newTotalReceived = totalReceived;

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

        newTotalReceived = totalReceived + enemyDamage;
        newEnemyMp = enemyMp - enemyTurn.mpCost;
        newCharHp = Math.max(0, charHp - enemyDamage);
        newMessages.push(
          enemyTurn.actionLabel,
          `${character.class} takes ${enemyDamage} damage.`
        );
      }
    }

    let ended = false;
    let result = null;

    if (newEnemyHp <= 0) {
      ended = true;
      result = "win";
      newMessages.push(`${enemy.enemy_name} has been defeated!`);
    } else if (newCharHp <= 0) {
      ended = true;
      result = "loss";
      newMessages.push(`${character.class} has been defeated!`);
    }

    setEnemyHp(newEnemyHp);
    setCharHp(newCharHp);
    setCharMp(newCharMp);
    setEnemyMp(newEnemyMp);
    setTotalDealt(newTotalDealt);
    setTotalReceived(newTotalReceived);
    setEnemyDefending(false);
    setPlayerDefending(false);
    setCombatOver(ended);
    setMessages(newMessages.slice(-4));

    if (ended) {
      finishBattle(
        result,
        newCharHp,
        newCharMp,
        newEnemyHp,
        newEnemyMp,
        newTotalDealt,
        newTotalReceived
      );
    }
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
    let enemyDamageDealt = 0;

    if (enemyTurn.defending) {
      setEnemyDefending(true);
      messages.push(enemyTurn.actionLabel);
    } else {
      let enemyDamage = enemyTurn.damage;

      if (applyPlayerDefense) {
        enemyDamage = Math.max(1, enemyDamage - character.defense);
      }

      enemyDamageDealt = enemyDamage;
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

    return { messages, charHp: charHpResult, enemyMp: enemyMpResult, ended, enemyDamageDealt };
  };

  const handleDefend = () => {
    if (combatOver) return;

    const result = applyEnemyTurn(
      [...messages, `${character.class} defends.`],
      charHp,
      enemyMp,
      true
    );

    const newTotalReceived = totalReceived + result.enemyDamageDealt;

    setCharHp(result.charHp);
    setEnemyMp(result.enemyMp);
    setTotalReceived(newTotalReceived);
    setPlayerDefending(false);
    setCombatOver(result.ended);
    setMessages(result.messages.slice(-4));

    if (result.ended) {
      finishBattle(
        "loss",
        result.charHp,
        charMp,
        enemyHp,
        result.enemyMp,
        totalDealt,
        newTotalReceived
      );
    }
  };

  const handleFlee = () => {
    if (combatOver) return;

    if (shouldFleeSucceed()) {
      setCombatOver(true);
      setMessages(
        [...messages, `${character.class} fled successfully.`].slice(-4)
      );

      finishBattle("flee", charHp, charMp, enemyHp, enemyMp, totalDealt, totalReceived);
      return;
    }

    const result = applyEnemyTurn(
      [...messages, `${character.class} failed to flee.`],
      charHp,
      enemyMp,
      false
    );

    const newTotalReceived = totalReceived + result.enemyDamageDealt;

    setCharHp(result.charHp);
    setEnemyMp(result.enemyMp);
    setTotalReceived(newTotalReceived);
    setPlayerDefending(false);
    setCombatOver(result.ended);
    setMessages(result.messages.slice(-4));

    if (result.ended) {
      finishBattle(
        "loss",
        result.charHp,
        charMp,
        enemyHp,
        result.enemyMp,
        totalDealt,
        newTotalReceived
      );
    }
  };

  const finishBattle = async (
    result,
    hp,
    mp,
    enemyHpValue,
    enemyMpValue,
    dealt,
    received
  ) => {
    await updateBattle(battle.id, {
      result,
      character_current_hp: hp,
      character_current_mp: mp,
      total_damage_dealt: dealt,
      total_damage_received: received,
      enemies: [
        {
          id: enemy.id,
          current_hp: enemyHpValue,
          current_mp: enemyMpValue,
        },
      ],
    }).catch(() => {});

    navigate("/menu");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <BattleScene
        background={
          backgrounds[enemy.background_image_url] ?? enemy.background_image_url
        }
        characterImage={characterSprites[character.class]}
        characterName={character.class}
        enemyImage={
          enemySprites[enemy.enemy_image_url] ?? enemy.enemy_image_url
        }
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
