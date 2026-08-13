import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import { getCharacters } from "../../api/characters";

export default function CharactersPage() {
  const navigate = useNavigate();

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canRetry, setCanRetry] = useState(false);
  const [retryCounter, setRetryCounter] = useState(0);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setCanRetry(false);
    setRetryCounter((c) => c + 1);
  };

  useEffect(() => {
    getCharacters()
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (err.response?.status === 403) {
          setError("Access denied.");
          return;
        }

        setError("Failed to load characters.");
        setCanRetry(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, retryCounter]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-battle-gold-light">Characters</h2>

        <Button
          variant="admin"
          onClick={() => navigate("/admin/characters/new")}
        >
          New Character
        </Button>
      </div>

      {loading && (
        <p className="mb-4 text-battle-text-muted">Loading characters...</p>
      )}

      {error && (
        <div className="mb-4">
          <p className="text-red-400">{error}</p>
          {canRetry && (
            <Button variant="admin" onClick={handleRetry}>
              Retry
            </Button>
          )}
        </div>
      )}

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-battle-gold/40 text-battle-gold-light">
            <th className="py-3 pr-4 font-semibold">Class</th>
            <th className="py-3 pr-4 font-semibold">HP</th>
            <th className="py-3 pr-4 font-semibold">MP</th>
            <th className="py-3 pr-4 font-semibold">ATK</th>
            <th className="py-3 pr-4 font-semibold">DEF</th>
            <th className="py-3 pr-4 font-semibold">Skills</th>
            <th className="py-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {characters.map((character) => (
            <tr key={character.id} className="border-b border-white/10">
              <td className="py-3 pr-4">{character.class}</td>
              <td className="py-3 pr-4">{character.max_health_points}</td>
              <td className="py-3 pr-4">{character.max_magic_points}</td>
              <td className="py-3 pr-4">{character.attack}</td>
              <td className="py-3 pr-4">{character.defense}</td>
              <td className="py-3 pr-4">{character.skills?.length ?? "-"}</td>
              <td className="flex gap-2 py-3">
                <Button
                  variant="admin"
                  onClick={() =>
                    navigate(`/admin/characters/${character.id}/edit`)
                  }
                >
                  Edit
                </Button>

                <Button variant="admin-danger" disabled>
                  Delete
                </Button>
              </td>
            </tr>
          ))}

          {!loading && !error && characters.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="py-6 text-center text-battle-text-muted"
              >
                No characters. Create the first one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
