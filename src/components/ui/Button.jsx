const variants = {
  game: {
    button: "w-full flex flex-col border-battle-gold from-[#173c8c] to-[#0f2f73]",
    inner: "px-6 py-3 text-lg flex w-full min-w-0 flex-1 items-center justify-center gap-2 text-center text-balance break-words",
  },
  blue: {
    button: "w-full flex flex-col border-battle-gold from-[#173c8c] to-[#0f2f73]",
    inner: "px-6 py-3 text-lg flex w-full min-w-0 flex-1 items-center justify-center gap-2 text-center text-balance break-words",
  },
  black: {
    button: "w-full flex flex-col border-battle-gold-light/50 from-[#1e293b] to-[#0f172a]",
    inner: "px-6 py-3 text-lg flex w-full min-w-0 flex-1 items-center justify-center gap-2 text-center text-balance break-words",
  },
  red: {
    button: "w-full flex flex-col border-red-400 from-[#7f1d1d] to-[#450a0a]",
    inner: "px-6 py-3 text-lg flex w-full min-w-0 flex-1 items-center justify-center gap-2 text-center text-balance break-words",
  },
  admin: {
    button: "border-battle-gold-light/50 from-[#1e293b] to-[#0f172a]",
    inner: "px-4 py-2 text-sm",
  },
  "admin-danger": {
    button: "border-red-400 from-[#7f1d1d] to-[#450a0a]",
    inner: "px-4 py-2 text-sm",
  },
};

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "game",
  className = "",
}) {
  const styles = variants[variant] ?? variants.game;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        cursor-pointer
        rounded-md

        border-2
        bg-gradient-to-b

        p-[2px]

        transition-all
        duration-150

        hover:brightness-110
        active:translate-y-[1px]
        disabled:cursor-not-allowed
        disabled:opacity-50

        ${styles.button}
        ${className}
      `}
    >
      <div
        className={`
          rounded-sm
          border-[3px]
          border-black/70

          text-center
          font-bold
          uppercase
          tracking-[0.15em]
          text-white

          ${styles.inner}
        `}
      >
        {children}
      </div>
    </button>
  );
}
