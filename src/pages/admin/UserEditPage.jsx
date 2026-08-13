import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { getUser, updateUser } from "../../api/users";

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
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormErrors({});

    const localErrors = {};

    if (password === "" && passwordConfirmation !== "") {
      localErrors.passwordConfirmation = "Enter a new password first.";
    } else if (password !== "") {
      if (password.length < 8) {
        localErrors.password = "Password must be at least 8 characters.";
      } else if (password !== passwordConfirmation) {
        localErrors.passwordConfirmation = "Passwords do not match.";
      }
    }

    if (Object.keys(localErrors).length > 0) {
      setFormErrors(localErrors);
      return;
    }

    const payload = {
      name,
      email,
      role,
    };

    if (password !== "") {
      payload.password = password;
      payload.password_confirmation = passwordConfirmation;
    }

    setSaving(true);

    try {
      const response = await updateUser(Number(id), payload);
      const data = response.data;

      setUser(data);
      setName(data.name ?? "");
      setEmail(data.email ?? "");
      setRole(data.role ?? "player");
      setPassword("");
      setPasswordConfirmation("");
      setFormErrors({});

      navigate("/admin/users");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (err.response?.status === 403) {
        setFormErrors({ general: "Access denied. Admins only." });
        return;
      }

      if (err.response?.status === 404) {
        setFormErrors({ general: "User not found." });
        return;
      }

      if (err.response?.status === 422) {
        setFormErrors(err.response.data?.errors || {});
        return;
      }

      setFormErrors({
        general: "Failed to save changes. Please try again.",
      });
    } finally {
      setSaving(false);
    }
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
        {formErrors.general && (
          <p className="text-sm text-battle-error">{formErrors.general}</p>
        )}

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

          {formErrors.name && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.name[0]}
            </p>
          )}
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

          {formErrors.email && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.email[0]}
            </p>
          )}
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

          {formErrors.role && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.role[0]}
            </p>
          )}
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
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Leave blank to keep current password"
          />

          {formErrors.password && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.password[0]}
            </p>
          )}
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
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            placeholder="Repeat the new password"
          />

          {formErrors.password_confirmation && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.password_confirmation[0]}
            </p>
          )}

          {formErrors.passwordConfirmation && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.passwordConfirmation}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-3">
          <Button variant="admin" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>

          <Button variant="admin" onClick={() => navigate("/admin/users")}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
