export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        cursor-pointer
        w-full
        rounded-md

        border-2 border-battle-gold
        bg-gradient-to-b
        from-[#173c8c]
        to-[#0f2f73]

        p-[2px]

        transition-all
        duration-150

        hover:brightness-110
        active:translate-y-[1px]
        disabled:cursor-not-allowed
        disabled:opacity-50

        ${className}
      `}
    >
      <div
        className="
          rounded-sm
          border-[3px]
          border-black/70
          px-6
          py-3

          text-center
          text-lg
          font-bold
          uppercase
          tracking-[0.15em]
          text-white
        "
      >
        {children}
      </div>
    </button>
  );
}
