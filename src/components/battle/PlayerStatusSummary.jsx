const statStyles = {
  hp: {
    label: "HP",
    fill: "bg-gradient-to-b from-red-400 to-red-600",
    labelText: "text-white",
  },
  mp: {
    label: "MP",
    fill: "bg-gradient-to-b from-sky-400 to-sky-600",
    labelText: "text-white",
  },
};

function StatRow({ variant, current, max }) {
  const { label, fill, labelText } = statStyles[variant];
  const percentage =
    max > 0 ? Math.min(100, Math.max(0, (current / max) * 100)) : 0;

  return (
    <div className="flex items-center gap-3">
      <span
        className={`
          w-10
          text-center
          text-xs
          font-bold
          uppercase
          tracking-[0.15em] ${labelText}
          drop-shadow-[1px_1px_0_rgba(0,0,0,1)]
        `}
      >
        {label}
      </span>

      <div className="h-2.5 flex-1 overflow-hidden rounded-sm border border-battle-gold-light/40 bg-black/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
        <div
          className={`h-full rounded-sm ${fill} shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="w-20 text-right text-sm font-bold text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
        {current} <span className="text-xs text-gray-400">/ {max}</span>
      </span>
    </div>
  );
}

export default function PlayerStatusSummary({ name, hp, maxHp, mp, maxMp }) {
  return (
    <div className="w-full">
      <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-[0.2em] text-battle-gold-light drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
        {name}
      </h3>

      <div className="space-y-2">
        <StatRow variant="hp" current={hp} max={maxHp} />
        {mp !== undefined && <StatRow variant="mp" current={mp} max={maxMp} />}
      </div>
    </div>
  );
}