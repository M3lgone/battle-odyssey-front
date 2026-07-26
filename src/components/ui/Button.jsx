export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        w-full
        rounded-md
        border
        border-battle-gold
        bg-gradient-to-b
        from-battle-gold-light
        to-battle-gold-dark
        px-4
        py-3
        font-bold
        uppercase
        tracking-wider
        text-black
        shadow-md
        transition-all
        duration-200
        hover:brightness-110
        hover:-translate-y-0.5
        active:translate-y-0
        active:brightness-95
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
        `}
      {...props}
    >
      {children}
    </button>
  );
}