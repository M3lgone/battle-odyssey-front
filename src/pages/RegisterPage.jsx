import { Link } from "react-router-dom";

import logo from "../assets/logo/logo-battle-odissey.png";
import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <img
        src={logo}
        alt="Battle Odyssey"
        className="mb-10 w-full max-w-sm"
      />

      <Window
        title="Register"
        className="w-full max-w-md"
      >
        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block font-semibold text-battle-gold-light"
            >
              Username
            </label>

            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-semibold text-battle-gold-light"
            >
              Email
            </label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-semibold text-battle-gold-light"
            >
              Password
            </label>

            <Input
              id="password"
              type="password"
              placeholder="Choose a password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block font-semibold text-battle-gold-light"
            >
              Confirm Password
            </label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat your password"
            />
          </div>

          <div className="pt-2">
            <Button type="submit">
              Create Account
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-battle-text-muted">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="font-semibold text-battle-gold transition hover:text-battle-gold-light"
          >
            Sign In
          </Link>
        </div>
      </Window>
    </div>
  );
}