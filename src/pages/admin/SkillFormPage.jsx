import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import { getSkill, createSkill, updateSkill } from "../../api/skills";

export default function SkillFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [damage, setDamage] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    let cancelled = false;

    getSkill(Number(id))
      .then((response) => {
        if (cancelled) return;
        const data = response.data;

        setSkill(data);
        setSkillName(data.skill_name ?? "");
        setDescription(data.description ?? "");
        setDamage(data.damage_skill ?? 0);
        setCost(data.skill_cost_magic_points ?? 0);
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
          setError("Skill not found.");
          return;
        }

        setError("Failed to load skill.");
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
    return (
      <p className="text-battle-text-muted">Loading skill...</p>
    );
  }

  if (isEdit && error) {
    return (
      <div>
        <p className="mb-6 text-battle-error">{error}</p>

        <Button variant="admin" onClick={() => navigate("/admin/skills")}>
          Back
        </Button>
      </div>
    );
  }

  if (isEdit && !skill) {
    return (
      <div>
        <p className="mb-6 text-battle-error">Skill not found.</p>

        <Button variant="admin" onClick={() => navigate("/admin/skills")}>
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
      skill_name: skillName,
      description,
      damage_skill: Number(damage),
      skill_cost_magic_points: Number(cost),
    };

    try {
      if (isEdit) {
        await updateSkill(Number(id), payload);
      } else {
        await createSkill(payload);
      }
      navigate("/admin/skills");
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

      if (err.response?.status === 404) {
        setFormErrors({
          general: "Skill not found.",
        });
        return;
      }

      if (err.response?.status === 422) {
        setFormErrors(err.response.data?.errors || {});
        return;
      }

      setFormErrors({
        general: isEdit
          ? "Failed to save skill. Please try again."
          : "Failed to create skill. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-2xl font-bold text-battle-gold-light">
        {isEdit ? `Edit ${skill.skill_name} (#${skill.id})` : "New Skill"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {formErrors.general && (
          <p className="text-sm text-battle-error">{formErrors.general}</p>
        )}

        <div>
          <label
            htmlFor="skillName"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Name
          </label>

          <Input
            id="skillName"
            type="text"
            maxLength="255"
            value={skillName}
            onChange={(event) => setSkillName(event.target.value)}
            placeholder="e.g. Fireball"
            required
          />

          {formErrors.skill_name && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.skill_name[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Description
          </label>

          <Textarea
            id="description"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="e.g. Hurls a blazing fireball at the enemy."
            required
          />

          {formErrors.description && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.description[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="damage"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Damage
          </label>

          <Input
            id="damage"
            type="number"
            min="0"
            value={damage}
            onChange={(event) => setDamage(event.target.value)}
            required
          />

          {formErrors.damage_skill && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.damage_skill[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cost"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            MP Cost
          </label>

          <Input
            id="cost"
            type="number"
            min="0"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
            required
          />

          {formErrors.skill_cost_magic_points && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.skill_cost_magic_points[0]}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-3">
          <Button
            variant="admin"
            type="submit"
            disabled={saving}
          >
            {isEdit
              ? (saving ? "Saving..." : "Save Changes")
              : (saving ? "Creating..." : "Create Skill")}
          </Button>

          <Button variant="admin" onClick={() => navigate("/admin/skills")}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
