import { useNavigate, useOutletContext } from "react-router-dom";

import Button from "../../components/ui/Button";

export default function EnemiesPage() {
  const navigate = useNavigate();
  const { enemies, setEnemies } = useOutletContext();

  const handleDelete = (id) => {
    const enemy = enemies.find((enemy) => enemy.id === id);

    if (!window.confirm(`Delete ${enemy.enemy_name} (#${id})?`)) {
      return;
    }

    setEnemies(enemies.filter((enemy) => enemy.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-battle-gold-light">Enemies</h2>

        <Button variant="admin" onClick={() => navigate("/admin/enemies/new")}>
          New Enemy
        </Button>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-battle-gold/40 text-battle-gold-light">
            <th className="py-3 pr-4 font-semibold">Name</th>
            <th className="py-3 pr-4 font-semibold">HP</th>
            <th className="py-3 pr-4 font-semibold">MP</th>
            <th className="py-3 pr-4 font-semibold">ATK</th>
            <th className="py-3 pr-4 font-semibold">DEF</th>
            <th className="py-3 pr-4 font-semibold">Skills</th>
            <th className="py-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {enemies.map((enemy) => (
            <tr key={enemy.id} className="border-b border-white/10">
              <td className="py-3 pr-4">{enemy.enemy_name}</td>
              <td className="py-3 pr-4">{enemy.max_health_points}</td>
              <td className="py-3 pr-4">{enemy.max_magic_points}</td>
              <td className="py-3 pr-4">{enemy.attack}</td>
              <td className="py-3 pr-4">{enemy.defense}</td>
              <td className="py-3 pr-4">{enemy.skills.length}</td>
              <td className="flex gap-2 py-3">
                <Button
                  variant="admin"
                  onClick={() => navigate(`/admin/enemies/${enemy.id}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  variant="admin-danger"
                  onClick={() => handleDelete(enemy.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}

          {enemies.length === 0 && (
            <tr>
              <td colSpan={7} className="py-6 text-center text-battle-text-muted">
                No enemies. Create the first one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
