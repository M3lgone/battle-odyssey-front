export function shouldFleeSucceed() {
  return Math.random() < 0.8;
}

export function computeEnemyTurn(character, enemy, enemyMp) {
  if (Math.random() < 0.2) {
    return {
      defending: true,
      damage: 0,
      actionLabel: `${enemy.enemy_name} defends.`,
      mpCost: 0,
      skillName: null,
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
      skillName: skill.skill_name,
    };
  }

  return {
    defending: false,
    damage: enemy.attack,
    actionLabel: `${enemy.enemy_name} attacks ${character.class}.`,
    mpCost: 0,
    skillName: null,
  };
}

function resolveAttackOrSkill(combat, action) {
  const {
    character,
    enemy,
    charHp,
    charMp,
    enemyHp,
    enemyMp,
    enemyDefending,
    playerDefending,
    totalDealt,
    totalReceived,
    messages,
  } = combat;

  const isSkill = action.type === "skill";
  const damage = isSkill ? action.skill.damage_skill : character.attack;
  const mpCost = isSkill ? action.skill.skill_cost_magic_points : 0;
  const actionLabel = isSkill
    ? `${character.class} uses ${action.skill.skill_name}.`
    : `${character.class} attacks ${enemy.enemy_name}.`;

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

  const steps = [];

  let enemyDefendedThisTurn = false;

  steps.push(
    isSkill
      ? { type: "cast", actor: "player", skillName: action.skill.skill_name }
      : { type: "attack", actor: "player" }
  );
  steps.push({
    type: "impact",
    target: "enemy",
    amount: playerDamage,
    newHp: newEnemyHp,
  });

  if (newEnemyHp > 0) {
    const enemyTurn = computeEnemyTurn(character, enemy, enemyMp);

    if (enemyTurn.defending) {
      enemyDefendedThisTurn = true;
      newMessages.push(enemyTurn.actionLabel);
      steps.push({ type: "shield", actor: "enemy", on: true });
      steps.push({ type: "shield", actor: "enemy", on: false });
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

      steps.push(
        enemyTurn.mpCost > 0
          ? { type: "cast", actor: "enemy", skillName: enemyTurn.skillName }
          : { type: "attack", actor: "enemy" }
      );
      steps.push({
        type: "impact",
        target: "player",
        amount: enemyDamage,
        newHp: newCharHp,
      });
    }
  }

  let ended = false;
  let result = null;

  if (newEnemyHp <= 0) {
    ended = true;
    result = "win";
    newMessages.push(`${enemy.enemy_name} has been defeated!`);
    steps.push({ type: "death", target: "enemy" });
  } else if (newCharHp <= 0) {
    ended = true;
    result = "loss";
    newMessages.push(`${character.class} has been defeated!`);
    steps.push({ type: "death", target: "player" });
  }

  const next = {
    charHp: newCharHp,
    charMp: newCharMp,
    enemyHp: newEnemyHp,
    enemyMp: newEnemyMp,
    enemyDefending: enemyDefendedThisTurn,
    playerDefending: false,
    totalDealt: newTotalDealt,
    totalReceived: newTotalReceived,
    messages: newMessages.slice(-4),
  };

  return { next, steps, result, ended };
}

function resolveDefend(combat) {
  const {
    character,
    enemy,
    charHp,
    charMp,
    enemyHp,
    enemyMp,
    enemyDefending,
    totalDealt,
    totalReceived,
    messages,
  } = combat;

  const steps = [];
  steps.push({ type: "shield", actor: "player", on: true });

  const enemyTurn = computeEnemyTurn(character, enemy, enemyMp);

  const newMessages = [...messages, `${character.class} defends.`];

  let charHpResult = charHp;
  let enemyMpResult = enemyMp;
  let enemyDamageDealt = 0;

  if (enemyTurn.defending) {
    newMessages.push(enemyTurn.actionLabel);
    steps.push({ type: "shield", actor: "enemy", on: true });
    steps.push({ type: "shield", actor: "enemy", on: false });
  } else {
    let enemyDamage = enemyTurn.damage;
    enemyDamage = Math.max(1, enemyDamage - character.defense);

    enemyDamageDealt = enemyDamage;
    enemyMpResult = enemyMp - enemyTurn.mpCost;
    charHpResult = Math.max(0, charHp - enemyDamage);
    newMessages.push(
      enemyTurn.actionLabel,
      `${character.class} takes ${enemyDamage} damage.`
    );

    steps.push(
      enemyTurn.mpCost > 0
        ? { type: "cast", actor: "enemy", skillName: enemyTurn.skillName }
        : { type: "attack", actor: "enemy" }
    );
    steps.push({
      type: "impact",
      target: "player",
      amount: enemyDamage,
      newHp: charHpResult,
    });
  }

  steps.push({ type: "shield", actor: "player", on: false });

  let ended = false;
  let result = null;

  if (charHpResult <= 0) {
    ended = true;
    result = "loss";
    newMessages.push(`${character.class} has been defeated!`);
    steps.push({ type: "death", target: "player" });
  }

  const newTotalReceived = totalReceived + enemyDamageDealt;

  const next = {
    charHp: charHpResult,
    charMp,
    enemyHp,
    enemyMp: enemyMpResult,
    enemyDefending: enemyTurn.defending ? true : enemyDefending,
    playerDefending: false,
    totalDealt,
    totalReceived: newTotalReceived,
    messages: newMessages.slice(-4),
  };

  return { next, steps, result, ended };
}

function resolveFlee(combat) {
  const {
    character,
    enemy,
    charHp,
    charMp,
    enemyHp,
    enemyMp,
    enemyDefending,
    playerDefending,
    totalDealt,
    totalReceived,
    messages,
  } = combat;

  if (shouldFleeSucceed()) {
    const steps = [{ type: "flee" }];
    const newMessages = [
      ...messages,
      `${character.class} fled successfully.`,
    ].slice(-4);

    const next = {
      charHp,
      charMp,
      enemyHp,
      enemyMp,
      enemyDefending,
      playerDefending,
      totalDealt,
      totalReceived,
      messages: newMessages,
    };

    return { next, steps, result: "flee", ended: true };
  }

  const steps = [];

  const enemyTurn = computeEnemyTurn(character, enemy, enemyMp);

  const newMessages = [...messages, `${character.class} failed to flee.`];

  let charHpResult = charHp;
  let enemyMpResult = enemyMp;
  let enemyDamageDealt = 0;

  if (enemyTurn.defending) {
    newMessages.push(enemyTurn.actionLabel);
    steps.push({ type: "shield", actor: "enemy", on: true });
    steps.push({ type: "shield", actor: "enemy", on: false });
  } else {
    let enemyDamage = enemyTurn.damage;

    enemyDamageDealt = enemyDamage;
    enemyMpResult = enemyMp - enemyTurn.mpCost;
    charHpResult = Math.max(0, charHp - enemyDamage);
    newMessages.push(
      enemyTurn.actionLabel,
      `${character.class} takes ${enemyDamage} damage.`
    );

    steps.push(
      enemyTurn.mpCost > 0
        ? { type: "cast", actor: "enemy", skillName: enemyTurn.skillName }
        : { type: "attack", actor: "enemy" }
    );
    steps.push({
      type: "impact",
      target: "player",
      amount: enemyDamage,
      newHp: charHpResult,
    });
  }

  let ended = false;
  let result = null;

  if (charHpResult <= 0) {
    ended = true;
    result = "loss";
    newMessages.push(`${character.class} has been defeated!`);
    steps.push({ type: "death", target: "player" });
  }

  const newTotalReceived = totalReceived + enemyDamageDealt;

  const next = {
    charHp: charHpResult,
    charMp,
    enemyHp,
    enemyMp: enemyMpResult,
    enemyDefending: enemyTurn.defending ? true : enemyDefending,
    playerDefending: false,
    totalDealt,
    totalReceived: newTotalReceived,
    messages: newMessages.slice(-4),
  };

  return { next, steps, result, ended };
}

export function resolveTurn(combat, action) {
  if (action.type === "skill" && action.skill.skill_cost_magic_points > combat.charMp) {
    return {
      next: {
        charHp: combat.charHp,
        charMp: combat.charMp,
        enemyHp: combat.enemyHp,
        enemyMp: combat.enemyMp,
        enemyDefending: combat.enemyDefending,
        playerDefending: combat.playerDefending,
        totalDealt: combat.totalDealt,
        totalReceived: combat.totalReceived,
        messages: [...combat.messages, "Not enough MP."].slice(-4),
      },
      steps: [],
      result: null,
      ended: false,
    };
  }

  if (action.type === "flee") {
    return resolveFlee(combat);
  }

  if (action.type === "defend") {
    return resolveDefend(combat);
  }

  return resolveAttackOrSkill(combat, action);
}
