export default function SkillSelector({ skills, onSelect, onBack, disabled = false }) {
  const list = skills ?? [];

  return (
    <div className="grid grid-cols-1 gap-1.5">
      {list.map((skill) => (
        <button
          key={skill.id}
          type="button"
          onClick={() => onSelect?.(skill)}
          disabled={disabled}
          className="flex w-full cursor-pointer flex-col rounded-md border-2 border-battle-gold bg-gradient-to-b from-[#173c8c] to-[#0f2f73] p-[2px] transition-all duration-150 hover:brightness-110 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="flex w-full min-w-0 flex-1 items-center justify-center gap-2 text-balance break-words rounded-sm border-[3px] border-black/70 px-3 py-1 text-center text-xs font-bold uppercase tracking-[0.15em] text-white sm:text-sm">
            <span className="flex w-full min-w-0 items-center justify-between gap-3">
              <span className="min-w-0 flex-1 break-words text-left">{skill.skill_name}</span>
              <span className="shrink-0">{skill.skill_cost_magic_points} MP</span>
            </span>
          </span>
        </button>
      ))}

      <button
        type="button"
        onClick={onBack}
        className="flex w-full cursor-pointer flex-col rounded-md border-2 border-battle-gold-light/50 bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-[2px] transition-all duration-150 hover:brightness-110 active:translate-y-[1px]"
      >
        <span className="flex w-full min-w-0 flex-1 items-center justify-center gap-2 text-balance break-words rounded-sm border-[3px] border-black/70 px-3 py-1 text-center text-xs font-bold uppercase tracking-[0.15em] text-white sm:text-sm">
          Back
        </span>
      </button>
    </div>
  );
}
