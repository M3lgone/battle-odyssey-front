import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";

export default function SkillFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { skills, setSkills } = useOutletContext();

  const isEdit = Boolean(id);
  const skill = skills.find((skill) => skill.id === Number(id));

  const [skillName, setSkillName] = useState(skill?.skill_name ?? "");
  const [description, setDescription] = useState(skill?.description ?? "");
  const [damage, setDamage] = useState(skill?.damage_skill ?? 0);
  const [cost, setCost] = useState(skill?.skill_cost_magic_points ?? 0);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      skill_name: skillName,
      description: description,
      damage_skill: Number(damage),
      skill_cost_magic_points: Number(cost),
    };

    if (isEdit) {
      setSkills(
        skills.map((item) =>
          item.id === skill.id ? { ...item, ...data } : item
        )
      );
    } else {
      const newSkill = {
        id: Math.max(...skills.map((item) => item.id), 0) + 1,
        ...data,
      };

      setSkills([...skills, newSkill]);
    }

    navigate("/admin/skills");
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-2xl font-bold text-battle-gold-light">
        {isEdit ? `Edit ${skill.skill_name} (#${skill.id})` : "New Skill"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
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
        </div>

        <div className="flex gap-3 pt-3">
          <Button variant="admin" type="submit">
            {isEdit ? "Save Changes" : "Create Skill"}
          </Button>

          <Button variant="admin" onClick={() => navigate("/admin/skills")}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
