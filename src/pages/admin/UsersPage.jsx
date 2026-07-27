import { useNavigate } from "react-router-dom";

import Window from "../../components/ui/Window";
import Button from "../../components/ui/Button";

export default function UsersPage() {
  const navigate = useNavigate();

  // Temporal
  const users = [
    { id: 1, name: "Ismael", role: "admin" },
    { id: 2, name: "John", role: "player" },
    { id: 3, name: "Anna", role: "player" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Window
        title="Users"
        className="w-full max-w-2xl"
      >
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded border border-battle-gold p-3"
            >
              <div>
                <p>{user.name}</p>
                <p className="text-sm text-battle-text-muted">
                  {user.role}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/admin/users/${user.id}`)}
                >
                  Edit
                </Button>

                <Button>
                  Delete
                </Button>
              </div>
            </div>
          ))}

          <Button onClick={() => navigate("/menu")}>
            Back
          </Button>
        </div>
      </Window>
    </div>
  );
}