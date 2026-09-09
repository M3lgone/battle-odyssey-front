const HERO_AVATAR_SCALES = {
  Warrior: 1.17,
  Mage: 1.12,
  Archer: 1.0,
};

const ENEMY_AVATAR_SCALES = {
  goblin: 1.02,
  orc: 0.98,
  troll: 1.03,
};

export default function AvatarImage({
  src,
  alt,
  heroKey,
  enemyKey,
  scale,
  boxClassName = "",
  imgClassName = "",
  wrapperClassName = "",
}) {
  const resolvedScale =
    scale ??
    (heroKey != null
      ? (HERO_AVATAR_SCALES[heroKey] ?? 1)
      : (ENEMY_AVATAR_SCALES[enemyKey] ?? 1));

  return (
    <div
      className={`flex items-center justify-center overflow-visible ${boxClassName} ${wrapperClassName}`}
    >
      <img
        src={src}
        alt={alt}
        className={`image-pixelated h-full w-full object-contain ${imgClassName}`}
        style={{ transform: `scale(${resolvedScale})` }}
      />
    </div>
  );
}
