import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo/logo-battle-odissey.png";
import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { login } from "../api/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await login(email, password);

      localStorage.setItem("token", response.data.token);
      navigate("/menu");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <img src={logo} alt="Battle Odyssey" className="mb-10 w-full max-w-sm" />

      <Window title="Login" className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm text-battle-error">{error}</p>
          )}

          <div className="pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-battle-text-muted">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="font-semibold text-battle-gold transition hover:text-battle-gold-light"
          >
            Register here
          </Link>
        </div>
      </Window>
    </div>
  );
}
