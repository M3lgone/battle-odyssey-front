export default function DamageNumber({ amount }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-2 animate-damage-float text-2xl font-bold text-red-500 drop-shadow-[0_0_4px_rgba(0,0,0,0.9)] md:text-3xl">
      -{amount}
    </div>
  );
}
