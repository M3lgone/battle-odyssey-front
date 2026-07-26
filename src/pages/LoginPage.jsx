import { Link } from "react-router-dom";

import logo from "../assets/logo/logo-battle-odissey.png";
import Window from "../components/ui/Window";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10">

      <img
        src={logo}
        alt="Battle Odyssey"
        className="mb-10 w-full max-w-sm"
      />

      <Window
        title="Login"
        className="w-full max-w-md"
      >
        <form className="space-y-6">

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-semibold text-battle-gold-light"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                rounded-md
                border
                border-battle-gold-light/40
                bg-black/20
                px-4
                py-3
                text-battle-text
                outline-none
                transition
                focus:border-battle-gold
              "
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-semibold text-battle-gold-light"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="
                w-full
                rounded-md
                border
                border-battle-gold-light/40
                bg-black/20
                px-4
                py-3
                text-battle-text
                outline-none
                transition
                focus:border-battle-gold
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              rounded-md
              border
              border-battle-gold
              bg-battle-gold
              px-4
              py-3
              font-bold
              text-black
              transition
              hover:brightness-110
              active:scale-[0.98]
            "
          >
            Sign In
          </button>

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