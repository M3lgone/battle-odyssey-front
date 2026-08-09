import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { getMe, updateMe, deleteMe } from "../api/auth";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMe()
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError("Failed to load profile.");
        setLoading(false);
      });
  }, [navigate]);

  const handleEditProfile = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setNewPassword("");
    setConfirmPassword("");
    setFormErrors({});
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setFormErrors({});
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setFormErrors({});

    if (newPassword && newPassword !== confirmPassword) {
      setFormErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    if (!newPassword && confirmPassword) {
      setFormErrors({ confirmPassword: "Enter a new password first." });
      return;
    }

    const body = { name: editName, email: editEmail };

    if (newPassword) {
      body.password = newPassword;
      body.password_confirmation = confirmPassword;
    }

    setSaving(true);

    try {
      const response = await updateMe(body);
      setUser(response.data);
      setNewPassword("");
      setConfirmPassword("");
      setFormErrors({});
      setEditing(false);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (err.response?.status === 422) {
        setFormErrors(err.response.data.errors || {});
        return;
      }

      setFormErrors({ general: "Failed to update profile. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmingDelete(false);
    setDeleteError(null);
  };

  const handleDeleteConfirm = async () => {
    setDeleteError(null);
    setDeleting(true);

    try {
      await deleteMe();

      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setDeleteError("Failed to delete profile. Please try again.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Profile">
          <p className="text-center text-battle-text-muted">Loading...</p>
        </Window>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Profile">
          <p className="mb-6 text-center text-battle-error">{error}</p>

          <Button onClick={() => navigate("/menu")}>Back</Button>
        </Window>
      </div>
    );
  }

  if (confirmingDelete) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <Window
          title="Delete Profile"
          className="w-full max-w-md"
        >
          <p className="mb-2 text-center text-battle-text">
            Are you sure you want to delete your profile?
          </p>

          <p className="mb-8 text-center text-sm text-battle-text-muted">
            This will permanently delete your account and all associated data.
          </p>

          <div className="space-y-3">
            {deleteError && (
              <p className="text-sm text-battle-error">{deleteError}</p>
            )}

            <Button onClick={handleDeleteCancel} disabled={deleting}>
              Cancel
            </Button>

            <Button onClick={handleDeleteConfirm} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete Profile"}
            </Button>
          </div>
        </Window>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <Window
          title="Edit Profile"
          className="w-full max-w-md"
        >
          <form onSubmit={handleSave} className="space-y-5">
            {formErrors.general && (
              <p className="text-sm text-battle-error">{formErrors.general}</p>
            )}
            <div>
              <Input
                label="Name"
                type="text"
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-battle-error">{formErrors.name}</p>
              )}
            </div>

            <div>
              <Input
                label="Email"
                type="email"
                value={editEmail}
                onChange={(event) => setEditEmail(event.target.value)}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-battle-error">{formErrors.email}</p>
              )}
            </div>

            <div>
              <Input
                label="New Password"
                type="password"
                placeholder="Leave blank to keep current password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-battle-error">{formErrors.password}</p>
              )}
            </div>

            <div>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-battle-error">{formErrors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-3 pt-3">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                type="button"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Window>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Window title="Profile" className="w-full max-w-md">
        <div className="space-y-8">
          <div className="space-y-4">
            <div>
              <h3 className="mb-1 text-sm font-semibold text-battle-gold-light uppercase tracking-wider">
                Name
              </h3>

              <p className="text-battle-text">{user.name}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold text-battle-gold-light uppercase tracking-wider">
                Email
              </h3>

              <p className="text-battle-text">{user.email}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold text-battle-gold-light uppercase tracking-wider">
                Role
              </h3>

              <p className="capitalize text-battle-text">{user.role}</p>
            </div>
          </div>

          <div className="space-y-3 pt-3">
            <Button onClick={handleEditProfile}>Edit Profile</Button>

            <Button onClick={() => setConfirmingDelete(true)}>
              Delete Profile
            </Button>

            <Button onClick={() => navigate("/menu")}>Back</Button>
          </div>
        </div>
      </Window>
    </div>
  );
}
