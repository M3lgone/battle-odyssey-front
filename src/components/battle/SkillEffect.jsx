const typeClasses = {
  slash: "animate-skill-slash",
  impact: "animate-skill-bloom",
};

export default function SkillEffect({ asset, type = "impact" }) {
  if (!asset) return null;

  const animationClass = typeClasses[type] ?? typeClasses.impact;

  return (
    <img
      src={asset}
      alt=""
      className={`pointer-events-none absolute inset-0 m-auto h-40 w-40 object-contain md:h-52 md:w-52 ${animationClass}`}
    />
  );
}
