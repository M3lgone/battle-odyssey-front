import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { getEnemy, createEnemy } from "../../api/enemies";

export default function EnemyFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [enemy, setEnemy] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [enemyName, setEnemyName] = useState("");
  const [maxHealth, setMaxHealth] = useState(1);
  const [maxMagic, setMaxMagic] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [enemyImage, setEnemyImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    let cancelled = false;

    getEnemy(Number(id))
      .then((response) => {
        if (cancelled) return;
        const data = response.data;

        setEnemy(data);
        setEnemyName(data.enemy_name ?? "");
        setMaxHealth(data.max_health_points ?? 1);
        setMaxMagic(data.max_magic_points ?? 0);
        setAttack(data.attack ?? 0);
        setDefense(data.defense ?? 0);
        setEnemyImage(data.enemy_image_url ?? "");
        setBackgroundImage(data.background_image_url ?? "");
      })
      .catch((err) => {
        if (cancelled) return;

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (err.response?.status === 403) {
          setError("Access denied. Admins only.");
          return;
        }

        if (err.response?.status === 404) {
          setError("Enemy not found.");
          return;
        }

        setError("Failed to load enemy.");
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id, isEdit, navigate]);

  if (isEdit && loading) {
    return <p className="text-battle-text-muted">Loading enemy...</p>;
  }

  if (isEdit && error) {
    return (
      <div>
        <p className="mb-6 text-battle-error">{error}</p>

        <Button variant="admin" onClick={() => navigate("/admin/enemies")}>
          Back
        </Button>
      </div>
    );
  }

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormErrors({});
    setSaving(true);

    const payload = {
      enemy_name: enemyName,
      max_health_points: Number(maxHealth),
      max_magic_points: Number(maxMagic),
      attack: Number(attack),
      defense: Number(defense),
      enemy_image_url: enemyImage,
      background_image_url: backgroundImage,
    };

    try {
      if (isEdit) {
        return;
      }

      await createEnemy(payload);
      navigate("/admin/enemies");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (err.response?.status === 403) {
        setFormErrors({
          general: "Access denied. Admins only.",
        });
        return;
      }

      if (err.response?.status === 422) {
        setFormErrors(err.response.data?.errors || {});
        return;
      }

      setFormErrors({
        general: "Failed to create enemy. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-2xl font-bold text-battle-gold-light">
        {isEdit ? `Edit ${enemy.enemy_name} (#${enemy.id})` : "New Enemy"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {formErrors.general && (
          <p className="text-sm text-battle-error">{formErrors.general}</p>
        )}

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

          {formErrors.enemy_name && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.enemy_name[0]}
            </p>
          )}
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

          {formErrors.max_health_points && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.max_health_points[0]}
            </p>
          )}
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

          {formErrors.max_magic_points && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.max_magic_points[0]}
            </p>
          )}
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

          {formErrors.attack && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.attack[0]}
            </p>
          )}
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

          {formErrors.defense && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.defense[0]}
            </p>
          )}
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

          {formErrors.enemy_image_url && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.enemy_image_url[0]}
            </p>
          )}
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

          {formErrors.background_image_url && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.background_image_url[0]}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-3">
          <Button
            variant="admin"
            type="submit"
            disabled={isEdit || saving}
          >
            {isEdit
              ? "Save Changes"
              : (saving ? "Creating..." : "Create Enemy")}
          </Button>

          <Button variant="admin" onClick={() => navigate("/admin/enemies")}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}