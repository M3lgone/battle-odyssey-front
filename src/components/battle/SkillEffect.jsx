export default function SkillEffect({ asset }) {
  if (!asset) return null;

  return (
    <img
      src={asset}
      alt=""
      className="pointer-events-none absolute inset-0 m-auto h-24 w-24 animate-skill-bloom object-contain md:h-32 md:w-32"
    />
  );
}
