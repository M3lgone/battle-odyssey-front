import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import { getUsers } from "../../api/users";

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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
    getUsers()
      .then((response) => {
        setUsers(response.data);
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

        setError("Failed to load users.");
        setCanRetry(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, retryCounter]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-battle-gold-light">Users</h2>
      </div>

      {loading && (
        <p className="mb-4 text-battle-text-muted">Loading users...</p>
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
                    onClick={() =>
                      navigate(`/admin/users/${user.id}/edit`)
                    }
                  >
                    Edit
                  </Button>

                  <Button variant="admin-danger" disabled>
                    Delete
                  </Button>
                </td>
            </tr>
          ))}

          {users.length === 0 && !loading && !error && (
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
