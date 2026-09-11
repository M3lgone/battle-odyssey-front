import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Window from "../../components/ui/Window";
import { getEnemies, deleteEnemy } from "../../api/enemies";

export default function EnemiesPage() {
  const navigate = useNavigate();

  const [enemies, setEnemies] = useState([]);
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

  const handleDeleteRequest = (enemy) => {
    setDeleteTarget(enemy);
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
      await deleteEnemy(id);
      setEnemies((prev) => prev.filter((enemy) => enemy.id !== id));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (err.response?.status === 403) {
        setError("You cannot delete this enemy.");
        return;
      }

      if (err.response?.status === 404) {
        setError("Enemy not found.");
        return;
      }

      setError("Failed to delete enemy.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getEnemies()
      .then((response) => {
        setEnemies(response.data);
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

        setError("Failed to load enemies.");
        setCanRetry(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, retryCounter]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-battle-gold-light">Enemies</h2>

        <Button variant="admin" onClick={() => navigate("/admin/enemies/new")}>
          New Enemy
        </Button>
      </div>

      {loading && (
        <p className="mb-4 text-battle-text-muted">Loading enemies...</p>
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
            <th className="py-3 pr-4 text-center font-semibold">HP</th>
            <th className="py-3 pr-4 text-center font-semibold">MP</th>
            <th className="py-3 pr-4 text-center font-semibold">ATK</th>
            <th className="py-3 pr-4 text-center font-semibold">DEF</th>
            <th className="py-3 pr-4 text-center font-semibold">Skills</th>
            <th className="py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {enemies.map((enemy) => (
            <tr key={enemy.id} className="border-b border-white/10">
              <td className="py-3 pr-4">{enemy.enemy_name}</td>
              <td className="py-3 pr-4 text-center">{enemy.max_health_points}</td>
              <td className="py-3 pr-4 text-center">{enemy.max_magic_points}</td>
              <td className="py-3 pr-4 text-center">{enemy.attack}</td>
              <td className="py-3 pr-4 text-center">{enemy.defense}</td>
              <td className="py-3 pr-4 text-center">{enemy.skills?.length ?? "-"}</td>
              <td className="flex justify-center gap-2 py-3">
                <Button
                  variant="admin"
                  onClick={() => navigate(`/admin/enemies/${enemy.id}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  variant="admin-danger"
                  onClick={() => handleDeleteRequest(enemy)}
                  disabled={deletingId === enemy.id}
                >
                  {deletingId === enemy.id ? "Deleting..." : "Delete"}
                </Button>
              </td>
            </tr>
          ))}

          {!loading && !error && enemies.length === 0 && (
            <tr>
              <td colSpan={7} className="py-6 text-center text-battle-text-muted">
                No enemies.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <Window title="Delete Enemy" className="w-full max-w-md">
            <p className="mb-2 text-center text-battle-text">
              Are you sure you want to delete {deleteTarget.enemy_name}?
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
