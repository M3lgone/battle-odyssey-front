const EntityStats = ({ hp, mp, attack, defense }) => {
  return (
    <div className="mb-8 w-full max-w-xs space-y-6 text-lg">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-red-400">
          <span className="mr-2 text-xl">❤️</span>
          HP
        </span>

        <span className="font-semibold text-battle-text">
          {hp}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-semibold text-sky-400">
          <span className="mr-2 text-xl">💧</span>
          MP
        </span>

        <span className="font-semibold text-battle-text">
          {mp}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-semibold text-amber-400">
          <span className="mr-2 text-xl">⚔️</span>
          ATK
        </span>

        <span className="font-semibold text-battle-text">
          {attack}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-semibold text-emerald-400">
          <span className="mr-2 text-xl">🛡️</span>
          DEF
        </span>

        <span className="font-semibold text-battle-text">
          {defense}
        </span>
      </div>
    </div>
  );
};

export default EntityStats;