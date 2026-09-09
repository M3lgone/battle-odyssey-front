export default function ProjectileEffect({ asset, direction }) {
  if (!asset) return null;

  const animationClass =
    direction === "ltr" ? "animate-projectile-ltr" : "animate-projectile-rtl";

  return (
    <div
      className={`pointer-events-none absolute bottom-[2px] translate-y-1/2 md:bottom-[7px] ${animationClass}`}
    >
      <img
        src={asset}
        alt=""
        className={`h-50 w-50 object-contain md:h-70 md:w-70 ${
          direction === "rtl" ? "-scale-x-100" : ""
        }`}
      />
    </div>
  );
}
