import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <Window title="404" className="w-full max-w-md">
        <p className="text-center text-xl font-bold uppercase tracking-[0.2em] text-battle-gold-light">
          Page Not Found
        </p>

        <p className="mt-4 text-center text-battle-text-muted">
          This page does not exist.
        </p>

        <div className="mt-8">
          <Button variant="black" onClick={() => navigate("/menu")}>
            Back to Menu
          </Button>
        </div>
      </Window>
    </div>
  );
}
