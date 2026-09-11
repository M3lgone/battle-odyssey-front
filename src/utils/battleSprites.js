import warriorSprite from "../assets/characters/warrior.png";
import warriorAttackSprite from "../assets/characters/warrior-attack.png";
import warriorDamageSprite from "../assets/characters/damage-warrior.png";
import warriorDeadSprite from "../assets/characters/dead-warrior.png";
import warriorVictorySprite from "../assets/characters/win-warrior.png";
import warriorFleeSprite from "../assets/characters/flee-warrior.png";

import mageSprite from "../assets/characters/mage.png";
import mageAttackSprite from "../assets/characters/mage-attack.png";
import mageDamageSprite from "../assets/characters/damage-mage.png";
import mageDeadSprite from "../assets/characters/dead-mage.png";
import mageVictorySprite from "../assets/characters/win-mage.png";
import mageFleeSprite from "../assets/characters/flee-mage.png";

import archerSprite from "../assets/characters/archer.png";
import archerAttackSprite from "../assets/characters/archer-attack.png";
import archerDamageSprite from "../assets/characters/damage-archer.png";
import archerDeadSprite from "../assets/characters/dead-archer.png";
import archerVictorySprite from "../assets/characters/win-archer.png";
import archerFleeSprite from "../assets/characters/flee-archer.png";

import goblinSprite from "../assets/enemies/goblin.png";
import goblinAttackSprite from "../assets/enemies/goblin-attack.png";
import goblinDamageSprite from "../assets/enemies/damage-goblin.png";
import goblinDeadSprite from "../assets/enemies/dead-goblin.png";

import trollSprite from "../assets/enemies/troll.png";
import trollAttackSprite from "../assets/enemies/troll-attack.png";
import trollDamageSprite from "../assets/enemies/damage-troll.png";
import trollDeadSprite from "../assets/enemies/dead-troll.png";

import orcSprite from "../assets/enemies/orc.png";
import orcAttackSprite from "../assets/enemies/orc-attack.png";
import orcDamageSprite from "../assets/enemies/damage-orc.png";
import orcDeadSprite from "../assets/enemies/dead-orc.png";

import woodsBg from "../assets/backgrounds/woods.png";
import caveBg from "../assets/backgrounds/cave.png";
import fortressBg from "../assets/backgrounds/fortress.png";

import slash from "../assets/skills/slash.png";
import hack from "../assets/skills/hack.png";
import smash from "../assets/skills/smash.png";
import rampage from "../assets/skills/rampage.png";
import fireball from "../assets/skills/fireball.png";
import powerShot from "../assets/skills/power-shot.png";

const characterPoses = {
  Warrior: {
    normal: warriorSprite,
    attack: warriorAttackSprite,
    damage: warriorDamageSprite,
    dead: warriorDeadSprite,
    victory: warriorVictorySprite,
    flee: warriorFleeSprite,
  },
  Mage: {
    normal: mageSprite,
    attack: mageAttackSprite,
    damage: mageDamageSprite,
    dead: mageDeadSprite,
    victory: mageVictorySprite,
    flee: mageFleeSprite,
  },
  Archer: {
    normal: archerSprite,
    attack: archerAttackSprite,
    damage: archerDamageSprite,
    dead: archerDeadSprite,
    victory: archerVictorySprite,
    flee: archerFleeSprite,
  },
};

const enemyPoses = {
  goblin: {
    normal: goblinSprite,
    attack: goblinAttackSprite,
    damage: goblinDamageSprite,
    dead: goblinDeadSprite,
  },
  troll: {
    normal: trollSprite,
    attack: trollAttackSprite,
    damage: trollDamageSprite,
    dead: trollDeadSprite,
  },
  orc: {
    normal: orcSprite,
    attack: orcAttackSprite,
    damage: orcDamageSprite,
    dead: orcDeadSprite,
  },
};

const backgrounds = {
  "images/backgrounds/bg-goblin.png": woodsBg,
  "images/backgrounds/bg-troll.png": caveBg,
  "images/backgrounds/bg-orc.png": fortressBg,
};

const skillAssets = {
  slash,
  hack,
  smash,
  rampage,
  fireball,
  "power-shot": powerShot,
};

const skillAnimations = {
  fireball: "projectile",
  "power-shot": "projectile",
  slash: "slash",
  hack: "impact",
  smash: "impact",
  rampage: "impact",
};

function slugify(name) {
  return (name ?? "").toLowerCase().trim().replace(/\s+/g, "-");
}

export function getCharacterSprite(cls, pose) {
  const poses = characterPoses[cls];
  return poses?.[pose] ?? poses?.normal;
}

export function getEnemySprite(imageUrl, pose) {
  const key = imageUrl
    ? imageUrl.replace("images/enemies/", "").replace(".png", "")
    : "";
  const poses = enemyPoses[key];
  return poses?.[pose] ?? poses?.normal ?? imageUrl;
}

export function getBackground(imageUrl) {
  return backgrounds[imageUrl] ?? imageUrl;
}

export function getSkillAsset(skillName) {
  return skillAssets[slugify(skillName)];
}

export function getSkillAnimation(skillName) {
  return { type: skillAnimations[slugify(skillName)] ?? "impact" };
}
