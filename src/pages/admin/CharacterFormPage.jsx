import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { getCharacter, createCharacter } from "../../api/characters";

import warriorImg from "../../assets/avatars/avatar-warrior.png";
import mageImg from "../../assets/avatars/avatar-mage.png";
import archerImg from "../../assets/avatars/avatar-archer.png";

const classOptions = ["Warrior", "Mage", "Archer"];

const imageOptions = [
  { label: "Warrior", value: warriorImg },
  { label: "Mage", value: mageImg },
  { label: "Archer", value: archerImg },
];

const imageMap = {
  "images/characters/warrior.png": warriorImg,
  "images/characters/mage.png": mageImg,
  "images/characters/archer.png": archerImg,
};

const imageToPath = {
  [warriorImg]: "images/characters/warrior.png",
  [mageImg]: "images/characters/mage.png",
  [archerImg]: "images/characters/archer.png",
};

export default function CharacterFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [characterClass, setCharacterClass] = useState("Warrior");
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [maxHealth, setMaxHealth] = useState(1);
  const [maxMagic, setMaxMagic] = useState(0);
  const [image, setImage] = useState(warriorImg);

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    let cancelled = false;

    getCharacter(Number(id))
      .then((response) => {
        if (cancelled) return;
        const data = response.data;

        setCharacter(data);
        setCharacterClass(data.class ?? "Warrior");
        setAttack(data.attack ?? 0);
        setDefense(data.defense ?? 0);
        setMaxHealth(data.max_health_points ?? 1);
        setMaxMagic(data.max_magic_points ?? 0);
        setImage(imageMap[data.character_image_url] ?? warriorImg);
      })
      .catch((err) => {
        if (cancelled) return;
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
          setError("Character not found.");
          return;
        }

        setError("Failed to load character.");
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id, isEdit, navigate]);

  if (isEdit && loading) {
    return (
      <p className="text-battle-text-muted">Loading character...</p>
    );
  }

  if (isEdit && error) {
    return (
      <div>
        <p className="mb-6 text-battle-error">{error}</p>

        <Button variant="admin" onClick={() => navigate("/admin/characters")}>
          Back
        </Button>
      </div>
    );
  }

  if (isEdit && !character) {
    return (
      <div>
        <p className="mb-6 text-battle-error">Character not found.</p>

        <Button variant="admin" onClick={() => navigate("/admin/characters")}>
          Back
        </Button>
      </div>
    );
  }

  const handleClassChange = (event) => {
    const newClass = event.target.value;

    setCharacterClass(newClass);
    setImage(imageOptions.find((option) => option.label === newClass).value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEdit) {
      return;
    }

    setFormErrors({});
    setSaving(true);

    const payload = {
      class: characterClass,
      attack: Number(attack),
      defense: Number(defense),
      max_health_points: Number(maxHealth),
      max_magic_points: Number(maxMagic),
      character_image_url: imageToPath[image],
    };

    try {
      await createCharacter(payload);
      navigate("/admin/characters");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (err.response?.status === 403) {
        setFormErrors({
          general: "Access denied. Admins only.",
        });
        return;
      }

      if (err.response?.status === 422) {
        setFormErrors(err.response.data?.errors || {});
        return;
      }

      setFormErrors({
        general: "Failed to create character. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-2xl font-bold text-battle-gold-light">
        {isEdit
          ? `Edit ${character.class} (#${character.id})`
          : "New Character"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {formErrors.general && (
          <p className="text-sm text-battle-error">{formErrors.general}</p>
        )}

        <div>
          <label
            htmlFor="class"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Class
          </label>

          <Select
            id="class"
            value={characterClass}
            onChange={handleClassChange}
            required
          >
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          {formErrors.class && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.class[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="attack"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Attack
          </label>

          <Input
            id="attack"
            type="number"
            min="0"
            value={attack}
            onChange={(event) => setAttack(event.target.value)}
            required
          />

          {formErrors.attack && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.attack[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="defense"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Defense
          </label>

          <Input
            id="defense"
            type="number"
            min="0"
            value={defense}
            onChange={(event) => setDefense(event.target.value)}
            required
          />

          {formErrors.defense && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.defense[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="maxHealth"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Max Health Points
          </label>

          <Input
            id="maxHealth"
            type="number"
            min="1"
            value={maxHealth}
            onChange={(event) => setMaxHealth(event.target.value)}
            required
          />

          {formErrors.max_health_points && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.max_health_points[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="maxMagic"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Max Magic Points
          </label>

          <Input
            id="maxMagic"
            type="number"
            min="0"
            value={maxMagic}
            onChange={(event) => setMaxMagic(event.target.value)}
            required
          />

          {formErrors.max_magic_points && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.max_magic_points[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="mb-1 block text-sm font-semibold text-battle-text-muted"
          >
            Image
          </label>

          <Select
            id="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            required
          >
            {imageOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          {formErrors.character_image_url && (
            <p className="mt-1 text-sm text-battle-error">
              {formErrors.character_image_url[0]}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-3">
          <Button
            variant="admin"
            type="submit"
            disabled={saving || isEdit}
          >
            {isEdit ? "Save Changes" : saving ? "Creating..." : "Create Character"}
          </Button>

          <Button variant="admin" onClick={() => navigate("/admin/characters")}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
