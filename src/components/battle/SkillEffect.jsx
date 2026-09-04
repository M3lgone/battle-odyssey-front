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
      className={`pointer-events-none absolute inset-0 m-auto h-24 w-24 object-contain md:h-32 md:w-32 ${animationClass}`}
    />
  );
}
