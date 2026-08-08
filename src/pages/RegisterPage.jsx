import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo/logo-battle-odissey.png";
import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { register } from "../api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password, passwordConfirmation);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <img src={logo} alt="Battle Odyssey" className="mb-10 w-full max-w-sm" />

      <Window title="Register" className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-semibold text-battle-gold-light"
            >
              Name
            </label>

            <Input
              id="name"
              type="text"
              maxLength="60"
              placeholder="Choose a name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
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
              minLength="8"
              placeholder="Choose a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="passwordConfirmation"
              className="mb-2 block font-semibold text-battle-gold-light"
            >
              Confirm Password
            </label>

            <Input
              id="passwordConfirmation"
              type="password"
              minLength="8"
              placeholder="Repeat your password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm text-battle-error">{error}</p>
          )}

          <div className="pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
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