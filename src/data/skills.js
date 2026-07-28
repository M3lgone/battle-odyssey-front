// Catálogo de skills con la forma del contrato API (API_CONTEXT.md).
// Representa GET /skills; las skills embebidas en characters.js y enemies.js
// representan la relación (GET /characters/{id}, GET /enemies/{id}).
// En la fase de integración se sustituirá por llamadas a la API.
const skills = [
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
  {
    id: 10,
    skill_name: "Stab",
    description: "A quick stab with a rusty dagger.",
    damage_skill: 8,
    skill_cost_magic_points: 5,
  },
  {
    id: 11,
    skill_name: "Throw Stone",
    description: "Throws a stone at the enemy from a distance.",
    damage_skill: 6,
    skill_cost_magic_points: 0,
  },
  {
    id: 12,
    skill_name: "Club Smash",
    description: "Smashes the enemy with a heavy wooden club.",
    damage_skill: 14,
    skill_cost_magic_points: 8,
  },
  {
    id: 13,
    skill_name: "War Cry",
    description: "A terrifying roar that weakens the enemy's resolve.",
    damage_skill: 10,
    skill_cost_magic_points: 6,
  },
  {
    id: 14,
    skill_name: "Shadow Bolt",
    description: "Hurls a bolt of pure darkness at the enemy.",
    damage_skill: 18,
    skill_cost_magic_points: 15,
  },
  {
    id: 15,
    skill_name: "Drain Life",
    description: "Steals the enemy's life force with dark magic.",
    damage_skill: 22,
    skill_cost_magic_points: 20,
  },
];

export default skills;
