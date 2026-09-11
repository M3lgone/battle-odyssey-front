import StatusBar from "./StatusBar";

export default function PlayerStatusSummary({ name, hp, maxHp, mp, maxMp }) {
  return (
    <div className="w-full">
      <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-[0.2em] text-battle-gold-light drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
        {name}
      </h3>

      <div className="space-y-2">
        <StatusBar variant="hp" current={hp} max={maxHp} />
        {mp !== undefined && <StatusBar variant="mp" current={mp} max={maxMp} />}
      </div>
    </div>
  );
}
