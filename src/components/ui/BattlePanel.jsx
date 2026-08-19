const widths = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export default function BattlePanel({ children, width = "md", className = "" }) {
  return (
    <section
      className={`
        w-full
        ${widths[width]}
        overflow-hidden
        rounded-lg
        border-2
        border-battle-gold
        bg-gradient-to-b
        from-battle-window-top
        to-battle-window-bottom
        shadow-2xl
        ${className}
      `}
    >
      <div className="m-1 border border-battle-gold-light p-6 md:p-8">
        {children}
      </div>
    </section>
  );
}