const variants = {
  hp: { label: "HP", color: "bg-red-500" },
  mp: { label: "MP", color: "bg-sky-500" },
};

export default function HealthBar({ variant = "hp", current, max }) {
  const { label, color } = variants[variant];
  const percentage =
    max > 0 ? Math.min(100, Math.max(0, (current / max) * 100)) : 0;

  return (
    <div>
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-battle-text-muted">{label}</span>

        <span>
          {current} / {max}
        </span>
      </div>

      <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-black/50">
        <div
          className={`h-full rounded-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
