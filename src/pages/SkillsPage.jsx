import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Window from "../components/ui/Window";
import Button from "../components/ui/Button";
import { getSkills } from "../api/skills";

export default function SkillsPage() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getSkills()
      .then((response) => {
        if (cancelled) return;
        setSkills(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(err.response?.data?.message || "Failed to load skills.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Skills">
          <p className="text-center text-battle-text-muted">Loading...</p>
        </Window>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Window title="Skills">
          <p className="mb-6 text-center text-battle-error">{error}</p>

          <Button variant="black" onClick={() => navigate("/menu")}>Back</Button>
        </Window>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <Window title="Skills" className="w-full max-w-6xl">
        {skills.length === 0 ? (
          <p className="text-center text-battle-text-muted">
            No skills available.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-md border border-battle-gold-light/40 bg-black/25 p-3 text-center"
              >
                <p className="font-semibold text-battle-gold">
                  {skill.skill_name}
                </p>

                <p className="text-sm text-battle-text-muted">
                  {skill.description}
                </p>

                <p className="mt-1 text-sm">
                  ⚔️ {skill.damage_skill} · 💧 {skill.skill_cost_magic_points} MP
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Button variant="black" onClick={() => navigate("/menu")}>Back</Button>
        </div>
      </Window>
    </div>
  );
}