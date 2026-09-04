import StatusBar from "./StatusBar";

export default function BattleStats({ name, hp, maxHp, mp, maxMp }) {
  return (
    <div className="rounded-md border border-battle-gold-light/40 bg-black/25 p-4">
      <h3 className="mb-3 text-lg font-bold uppercase tracking-[0.15em] text-battle-gold-light">
        {name}
      </h3>

      <div className="space-y-3">
        <StatusBar variant="hp" current={hp} max={maxHp} />

        {mp !== undefined && <StatusBar variant="mp" current={mp} max={maxMp} />}
      </div>
    </div>
  );
}
