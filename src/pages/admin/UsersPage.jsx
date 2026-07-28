import { useNavigate, useOutletContext } from "react-router-dom";

import Button from "../../components/ui/Button";

export default function UsersPage() {
  const navigate = useNavigate();
  const { users, setUsers } = useOutletContext();

  const handleDelete = (id) => {
    const user = users.find((user) => user.id === id);

    if (!window.confirm(`Delete ${user.name} (#${id})?`)) {
      return;
    }

    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-battle-gold-light">Users</h2>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-battle-gold/40 text-battle-gold-light">
            <th className="py-3 pr-4 font-semibold">Name</th>
            <th className="py-3 pr-4 font-semibold">Email</th>
            <th className="py-3 pr-4 font-semibold">Role</th>
            <th className="py-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-white/10">
              <td className="py-3 pr-4">{user.name}</td>
              <td className="py-3 pr-4">{user.email}</td>
              <td className="py-3 pr-4">{user.role}</td>
              <td className="flex gap-2 py-3">
                <Button
                  variant="admin"
                  onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  variant="admin-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="py-6 text-center text-battle-text-muted"
              >
                No users.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
