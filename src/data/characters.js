import warriorImg from "../assets/avatars/avatar-warrior.png";
import mageImg from "../assets/avatars/avatar-mage.png";
import archerImg from "../assets/avatars/avatar-archer.png";

const characters = [
  {
    id: 1,
    class: "Warrior",
    attack: 15,
    defense: 20,
    max_health_points: 120,
    max_magic_points: 100,
    character_image_url: warriorImg,
    skills: [
      {
        id: 1,
        skill_name: "Slash",
        description: "Strikes the enemy with a swift sword slash",
        damage_skill: 20,
        skill_cost_magic_points: 15,
      },
    ],
  },
  {
    id: 2,
    class: "Mage",
    attack: 10,
    defense: 15,
    max_health_points: 100,
    max_magic_points: 120,
    character_image_url: mageImg,
    skills: [
      {
        id: 2,
        skill_name: "Fireball",
        description: "Conjures a ball of fire to incinerate",
        damage_skill: 30,
        skill_cost_magic_points: 10,
      },
    ],
  },
  {
    id: 3,
    class: "Archer",
    attack: 25,
    defense: 15,
    max_health_points: 100,
    max_magic_points: 100,
    character_image_url: archerImg,
    skills: [
      {
        id: 3,
        skill_name: "Power shot",
        description: "Shoots a charged arrow with devastating force",
        damage_skill: 35,
        skill_cost_magic_points: 25,
      },
    ],
  },
];

export default characters;