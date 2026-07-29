import goblinImg from "../assets/enemies/goblin.png";
import trollImg from "../assets/enemies/troll.png";
import orcImg from "../assets/enemies/orc.png";

import woodsImg from "../assets/backgrounds/woods.png";
import caveImg from "../assets/backgrounds/cave.png";
import fortressImg from "../assets/backgrounds/fortress.png";

const enemies = [
  {
    id: 1,
    enemy_name: "Goblin",
    max_health_points: 80,
    max_magic_points: 30,
    attack: 10,
    defense: 5,
    enemy_image_url: goblinImg,
    background_image_url: woodsImg,
    skills: [
      {
        id: 4,
        skill_name: "Hack",
        description: "Swings a crude weapon with reckless force",
        damage_skill: 15,
        skill_cost_magic_points: 5,
      },
    ],
  },
  {
    id: 2,
    enemy_name: "Troll",
    max_health_points: 100,
    max_magic_points: 50,
    attack: 18,
    defense: 12,
    enemy_image_url: trollImg,
    background_image_url: caveImg,
    skills: [
      {
        id: 5,
        skill_name: "Smash",
        description: "Crushes everything with brutal strength",
        damage_skill: 25,
        skill_cost_magic_points: 10,
      },
    ],
  },
  {
    id: 3,
    enemy_name: "Orc",
    max_health_points: 180,
    max_magic_points: 80,
    attack: 22,
    defense: 15,
    enemy_image_url: orcImg,
    background_image_url: fortressImg,
    skills: [
      {
        id: 6,
        skill_name: "Rampage",
        description: "Unleashes a furious flurry of attacks",
        damage_skill: 35,
        skill_cost_magic_points: 25,
      },
    ],
  },
];

export default enemies;