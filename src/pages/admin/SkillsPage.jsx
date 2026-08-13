import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import { getSkills } from "../../api/skills";

export default function SkillsPage() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canRetry, setCanRetry] = useState(false);
  const [retryCounter, setRetryCounter] = useState(0);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setCanRetry(false);
    setRetryCounter((c) => c + 1);
  };

  useEffect(() => {
    getSkills()
      .then((response) => {
        setSkills(response.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (err.response?.status === 403) {
          setError("Access denied. Admins only.");
          return;
        }

        setError("Failed to load skills.");
        setCanRetry(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, retryCounter]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-battle-gold-light">Skills</h2>

        <Button variant="admin" onClick={() => navigate("/admin/skills/new")}>
          New Skill
        </Button>
      </div>

      {loading && (
        <p className="mb-4 text-battle-text-muted">Loading skills...</p>
      )}

      {error && (
        <div className="mb-4">
          <p className="text-red-400">{error}</p>
          {canRetry && (
            <Button variant="admin" onClick={handleRetry}>
              Retry
            </Button>
          )}
        </div>
      )}

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

                <Button variant="admin-danger" disabled>
                  Delete
                </Button>
              </td>
            </tr>
          ))}

          {!loading && !error && skills.length === 0 && (
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
