// Datos mock con la forma del contrato API (API_CONTEXT.md).
// En la fase de integración se sustituirán por GET /enemies y GET /enemies/{id}.
const enemies = [
  {
    id: 1,
    enemy_name: "Goblin",
    max_health_points: 80,
    max_magic_points: 30,
    attack: 10,
    defense: 5,
    enemy_image_url: "images/enemies/goblin.png",
    background_image_url: "images/backgrounds/bg-goblin.png",
    skills: [
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
    ],
  },
  {
    id: 2,
    enemy_name: "Orc",
    max_health_points: 120,
    max_magic_points: 20,
    attack: 15,
    defense: 10,
    enemy_image_url: "images/enemies/orc.png",
    background_image_url: "images/backgrounds/bg-orc.png",
    skills: [
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
    ],
  },
  {
    id: 3,
    enemy_name: "Dark Sorcerer",
    max_health_points: 100,
    max_magic_points: 150,
    attack: 20,
    defense: 8,
    enemy_image_url: "images/enemies/dark-sorcerer.png",
    background_image_url: "images/backgrounds/bg-dark-sorcerer.png",
    skills: [
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
    ],
  },
];

export default enemies;
