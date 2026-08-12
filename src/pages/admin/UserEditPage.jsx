import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { getUser } from "../../api/users";

export default function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("player");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    getUser(Number(id))
      .then((response) => {
        const data = response.data;

        setUser(data);
        setName(data.name ?? "");
        setEmail(data.email ?? "");
        setRole(data.role ?? "player");
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

        if (err.response?.status === 404) {
          setError("User not found.");
          return;
        }

        setError("Failed to load user.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (loading) {
    return (
      <p className="text-battle-text-muted">Loading user...</p>
    );
  }

  if (error) {
    return (
      <div>
        <p className="mb-6 text-battle-error">{error}</p>

        <Button variant="admin" onClick={() => navigate("/admin/users")}>
          Back
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <p className="mb-6 text-battle-error">User not found.</p>

        <Button variant="admin" onClick={() => navigate("/admin/users")}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-2xl font-bold text-battle-gold-light">
        Edit {user.name} (#{user.id})
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Name
          </label>

          <Input
            id="name"
            type="text"
            maxLength="60"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Email
          </label>

          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Role
          </label>

          <Select
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          >
            <option value="player">player</option>
            <option value="admin">admin</option>
          </Select>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            New Password
          </label>

          <Input
            id="password"
            type="password"
            minLength="8"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError("");
            }}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div>
          <label
            htmlFor="passwordConfirmation"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Confirm Password
          </label>

          <Input
            id="passwordConfirmation"
            type="password"
            minLength="8"
            value={passwordConfirmation}
            onChange={(event) => {
              setPasswordConfirmation(event.target.value);
              setPasswordError("");
            }}
            placeholder="Repeat the new password"
          />
        </div>

        {passwordError && (
          <p className="text-sm text-battle-error">{passwordError}</p>
        )}

        <div className="flex gap-3 pt-3">
          <Button variant="admin" type="submit" disabled>
            Save Changes
          </Button>

          <Button variant="admin" onClick={() => navigate("/admin/users")}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
