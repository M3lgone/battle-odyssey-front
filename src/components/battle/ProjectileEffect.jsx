export default function ProjectileEffect({ asset, direction }) {
  if (!asset) return null;

  const animationClass =
    direction === "ltr" ? "animate-projectile-ltr" : "animate-projectile-rtl";

  return (
    <div
      className={`pointer-events-none absolute bottom-[104px] translate-y-1/2 md:bottom-[168px] ${animationClass}`}
    >
      <img
        src={asset}
        alt=""
        className={`h-16 w-16 object-contain md:h-24 md:w-24 ${
          direction === "rtl" ? "-scale-x-100" : ""
        }`}
      />
    </div>
  );
}
