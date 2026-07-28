import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function EnemyFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enemies, setEnemies } = useOutletContext();

  const isEdit = Boolean(id);
  const enemy = enemies.find((enemy) => enemy.id === Number(id));

  const [enemyName, setEnemyName] = useState(enemy?.enemy_name ?? "");
  const [maxHealth, setMaxHealth] = useState(enemy?.max_health_points ?? 1);
  const [maxMagic, setMaxMagic] = useState(enemy?.max_magic_points ?? 0);
  const [attack, setAttack] = useState(enemy?.attack ?? 0);
  const [defense, setDefense] = useState(enemy?.defense ?? 0);
  const [enemyImage, setEnemyImage] = useState(enemy?.enemy_image_url ?? "");
  const [backgroundImage, setBackgroundImage] = useState(
    enemy?.background_image_url ?? ""
  );

  if (isEdit && !enemy) {
    return (
      <div>
        <p className="mb-6 text-battle-error">Enemy not found.</p>

        <Button variant="admin" onClick={() => navigate("/admin/enemies")}>
          Back
        </Button>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      enemy_name: enemyName,
      max_health_points: Number(maxHealth),
      max_magic_points: Number(maxMagic),
      attack: Number(attack),
      defense: Number(defense),
      enemy_image_url: enemyImage,
      background_image_url: backgroundImage,
    };

    if (isEdit) {
      setEnemies(
        enemies.map((item) =>
          item.id === enemy.id ? { ...item, ...data } : item
        )
      );
    } else {
      const newEnemy = {
        id: Math.max(...enemies.map((item) => item.id), 0) + 1,
        ...data,
        skills: [],
      };

      setEnemies([...enemies, newEnemy]);
    }

    navigate("/admin/enemies");
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-2xl font-bold text-battle-gold-light">
        {isEdit ? `Edit ${enemy.enemy_name} (#${enemy.id})` : "New Enemy"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="enemyName"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Name
          </label>

          <Input
            id="enemyName"
            type="text"
            maxLength="255"
            value={enemyName}
            onChange={(event) => setEnemyName(event.target.value)}
            placeholder="e.g. Goblin"
            required
          />
        </div>

        <div>
          <label
            htmlFor="maxHealth"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Max Health Points
          </label>

          <Input
            id="maxHealth"
            type="number"
            min="1"
            value={maxHealth}
            onChange={(event) => setMaxHealth(event.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="maxMagic"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Max Magic Points
          </label>

          <Input
            id="maxMagic"
            type="number"
            min="0"
            value={maxMagic}
            onChange={(event) => setMaxMagic(event.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="attack"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Attack
          </label>

          <Input
            id="attack"
            type="number"
            min="0"
            value={attack}
            onChange={(event) => setAttack(event.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="defense"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Defense
          </label>

          <Input
            id="defense"
            type="number"
            min="0"
            value={defense}
            onChange={(event) => setDefense(event.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="enemyImage"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Enemy Image URL
          </label>

          <Input
            id="enemyImage"
            type="text"
            value={enemyImage}
            onChange={(event) => setEnemyImage(event.target.value)}
            placeholder="images/enemies/goblin.png"
            required
          />
        </div>

        <div>
          <label
            htmlFor="backgroundImage"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Background Image URL
          </label>

          <Input
            id="backgroundImage"
            type="text"
            value={backgroundImage}
            onChange={(event) => setBackgroundImage(event.target.value)}
            placeholder="images/backgrounds/bg-goblin.png"
            required
          />
        </div>

        <div className="flex gap-3 pt-3">
          <Button variant="admin" type="submit">
            {isEdit ? "Save Changes" : "Create Enemy"}
          </Button>

          <Button variant="admin" onClick={() => navigate("/admin/enemies")}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
