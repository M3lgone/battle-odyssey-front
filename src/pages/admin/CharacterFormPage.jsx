import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { getCharacter } from "../../api/characters";

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

export default function CharacterFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { characters, setCharacters } = useOutletContext();

  const isEdit = Boolean(id);

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      class: characterClass,
      attack: Number(attack),
      defense: Number(defense),
      max_health_points: Number(maxHealth),
      max_magic_points: Number(maxMagic),
      character_image_url: image,
    };

    if (isEdit) {
      return;
    }

    const template = characters.find(
      (item) => item.class === characterClass
    );

    const newCharacter = {
      id: Math.max(...characters.map((item) => item.id), 0) + 1,
      ...data,
      skills: template ? [...template.skills] : [],
    };

    setCharacters([...characters, newCharacter]);
    navigate("/admin/characters");
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-2xl font-bold text-battle-gold-light">
        {isEdit
          ? `Edit ${character.class} (#${character.id})`
          : "New Character"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
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
        </div>

        <div className="flex gap-3 pt-3">
          <Button variant="admin" type="submit" disabled={isEdit}>
            {isEdit ? "Save Changes" : "Create Character"}
          </Button>

          <Button variant="admin" onClick={() => navigate("/admin/characters")}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
