import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Window from "../../components/ui/Window";
import { getSkills, deleteSkill } from "../../api/skills";

export default function SkillsPage() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canRetry, setCanRetry] = useState(false);
  const [retryCounter, setRetryCounter] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setCanRetry(false);
    setRetryCounter((c) => c + 1);
  };

  const handleDeleteRequest = (skill) => {
    setDeleteTarget(skill);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) {
      return;
    }

    const id = deleteTarget.id;
    setDeleteTarget(null);
    setDeletingId(id);

    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (err.response?.status === 403) {
        setError("You cannot delete this skill.");
        return;
      }

      if (err.response?.status === 404) {
        setError("Skill not found.");
        return;
      }

      setError("Failed to delete skill.");
    } finally {
      setDeletingId(null);
    }
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

      <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-battle-gold/40 text-battle-gold-light">
            <th className="py-3 pr-4 font-semibold">Name</th>
            <th className="py-3 pr-4 font-semibold">Description</th>
            <th className="py-3 pr-4 text-center font-semibold">Damage</th>
            <th className="py-3 pr-4 text-center font-semibold">MP Cost</th>
            <th className="py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id} className="border-b border-white/10">
              <td className="py-3 pr-4">{skill.skill_name}</td>
              <td className="py-3 pr-4">{skill.description}</td>
              <td className="py-3 pr-4 text-center">{skill.damage_skill}</td>
              <td className="py-3 pr-4 text-center">{skill.skill_cost_magic_points}</td>
              <td className="flex justify-center gap-2 py-3">
                <Button
                  variant="admin"
                  onClick={() => navigate(`/admin/skills/${skill.id}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  variant="admin-danger"
                  onClick={() => handleDeleteRequest(skill)}
                  disabled={deletingId === skill.id}
                >
                  {deletingId === skill.id ? "Deleting..." : "Delete"}
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

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <Window title="Delete Skill" className="w-full max-w-md">
            <p className="mb-2 text-center text-battle-text">
              Are you sure you want to delete {deleteTarget.skill_name}?
            </p>

            <p className="mb-8 text-center text-sm text-battle-text-muted">
              This action cannot be undone.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                variant="admin"
                onClick={handleDeleteCancel}
                disabled={deletingId !== null}
              >
                Cancel
              </Button>

              <Button
                variant="admin-danger"
                onClick={handleDeleteConfirm}
                disabled={deletingId !== null}
              >
                Delete
              </Button>
            </div>
          </Window>
        </div>
      )}
    </div>
  );
}
