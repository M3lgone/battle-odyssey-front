export default function Window({
  title,
  children,
  className = '',
}) {
  return (
    <section
      className={`
        w-full
        overflow-hidden
        rounded-lg
        border-2
        border-battle-gold
        bg-gradient-to-b
        from-battle-window-top
        to-battle-window-bottom
        shadow-xl
        ${className}
      `}
    >
      <div className="m-1 border border-battle-gold-light">

        {title && (
          <header className="border-b border-battle-gold-light px-6 py-4">
                <div className="flex items-center gap-4">

                    <div className="h-px flex-1 bg-battle-gold-light/50" />

                    <h2 className="text-2xl font-bold uppercase tracking-[0.25em] text-battle-gold">
                    {title}
                    </h2>

                    <div className="h-px flex-1 bg-battle-gold-light/50" />

                </div>
            </header>
        )}

        <div className="p-6">
          {children}
        </div>

      </div>
    </section>
  );
}