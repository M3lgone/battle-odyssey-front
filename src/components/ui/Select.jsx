export default function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`
        w-full
        rounded-md
        border
        border-battle-gold-light/40
        bg-black/25
        px-4
        py-3
        text-battle-text
        outline-none
        transition-colors
        focus:border-battle-gold
        focus:bg-black/35
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
}