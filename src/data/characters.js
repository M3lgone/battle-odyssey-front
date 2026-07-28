import warriorImg from "../assets/characters/avatar-warrior.png";
import mageImg from "../assets/characters/avatar-mage.jpg";
import archerImg from "../assets/characters/avatar-archer.png";

const characters = [
  {
    id: 1,
    class: "Warrior",
    attack: 20,
    defense: 20,
    max_health_points: 200,
    max_magic_points: 50,
    character_image_url: warriorImg,
    skills: [
      {
        id: 1,
        skill_name: "Slash",
        description: "Strikes the enemy with a swift sword slash.",
        damage_skill: 20,
        skill_cost_magic_points: 15,
      },
      {
        id: 2,
        skill_name: "Shield Bash",
        description: "Slams the enemy with the shield, dealing moderate damage.",
        damage_skill: 15,
        skill_cost_magic_points: 10,
      },
      {
        id: 3,
        skill_name: "Berserk",
        description: "Unleashes a furious all-out attack.",
        damage_skill: 35,
        skill_cost_magic_points: 25,
      },
    ],
  },
  {
    id: 2,
    class: "Mage",
    attack: 30,
    defense: 15,
    max_health_points: 150,
    max_magic_points: 200,
    character_image_url: mageImg,
    skills: [
      {
        id: 4,
        skill_name: "Fireball",
        description: "Hurls a blazing fireball at the enemy.",
        damage_skill: 30,
        skill_cost_magic_points: 20,
      },
      {
        id: 5,
        skill_name: "Ice Lance",
        description: "Pierces the enemy with a lance of ice.",
        damage_skill: 25,
        skill_cost_magic_points: 18,
      },
      {
        id: 6,
        skill_name: "Lightning Bolt",
        description: "Strikes the enemy with a bolt of lightning.",
        damage_skill: 40,
        skill_cost_magic_points: 30,
      },
    ],
  },
  {
    id: 3,
    class: "Archer",
    attack: 25,
    defense: 18,
    max_health_points: 175,
    max_magic_points: 100,
    character_image_url: archerImg,
    skills: [
      {
        id: 7,
        skill_name: "Power Shot",
        description: "A powerful, carefully aimed shot.",
        damage_skill: 25,
        skill_cost_magic_points: 12,
      },
      {
        id: 8,
        skill_name: "Multi Shot",
        description: "Fires multiple arrows in quick succession.",
        damage_skill: 20,
        skill_cost_magic_points: 20,
      },
      {
        id: 9,
        skill_name: "Poison Arrow",
        description: "An arrow coated with venom.",
        damage_skill: 18,
        skill_cost_magic_points: 15,
      },
    ],
  },
];

export default characters;
