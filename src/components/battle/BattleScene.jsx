export default function BattleScene({
  background,
  characterImage,
  characterName,
  enemyImage,
  enemyName,
}) {
  return (
    <section className="relative flex-1 overflow-hidden">
      <img
        src={background}
        alt=""
        className="image-pixelated absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative flex h-full items-end justify-between px-6 pb-6 md:px-[12%] md:pb-10">
        <img
          src={characterImage}
          alt={characterName}
          className="image-pixelated h-40 object-contain drop-shadow-[0_12px_8px_rgba(0,0,0,0.45)] md:h-64"
        />

        <img
          src={enemyImage}
          alt={enemyName}
          className="image-pixelated h-40 object-contain drop-shadow-[0_12px_8px_rgba(0,0,0,0.45)] md:h-64"
        />
      </div>
    </section>
  );
}
