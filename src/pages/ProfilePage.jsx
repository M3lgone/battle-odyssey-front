import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Window
        title="Profile"
        className="w-full max-w-md"
      >
        <form className="space-y-5">
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Leave blank to keep current password"
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
          />

          <div className="space-y-3 pt-3">
            <Button type="submit">
              Save Changes
            </Button>

            <Button type="button">
              Delete Account
            </Button>

            <Button
              type="button"
              onClick={() => navigate("/menu")}
            >
              Back
            </Button>
          </div>
        </form>
      </Window>
    </div>
  );
}