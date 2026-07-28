import { useNavigate, useOutletContext } from "react-router-dom";

import Button from "../../components/ui/Button";

export default function SkillsPage() {
  const navigate = useNavigate();
  const { skills, setSkills } = useOutletContext();

  const handleDelete = (id) => {
    const skill = skills.find((skill) => skill.id === id);

    if (!window.confirm(`Delete ${skill.skill_name} (#${id})?`)) {
      return;
    }

    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-battle-gold-light">Skills</h2>

        <Button variant="admin" onClick={() => navigate("/admin/skills/new")}>
          New Skill
        </Button>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-battle-gold/40 text-battle-gold-light">
            <th className="py-3 pr-4 font-semibold">Name</th>
            <th className="py-3 pr-4 font-semibold">Description</th>
            <th className="py-3 pr-4 font-semibold">Damage</th>
            <th className="py-3 pr-4 font-semibold">MP Cost</th>
            <th className="py-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id} className="border-b border-white/10">
              <td className="py-3 pr-4">{skill.skill_name}</td>
              <td className="py-3 pr-4">{skill.description}</td>
              <td className="py-3 pr-4">{skill.damage_skill}</td>
              <td className="py-3 pr-4">{skill.skill_cost_magic_points}</td>
              <td className="flex gap-2 py-3">
                <Button
                  variant="admin"
                  onClick={() => navigate(`/admin/skills/${skill.id}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  variant="admin-danger"
                  onClick={() => handleDelete(skill.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}

          {skills.length === 0 && (
            <tr>
              <td colSpan={5} className="py-6 text-center text-battle-text-muted">
                No skills. Create the first one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
