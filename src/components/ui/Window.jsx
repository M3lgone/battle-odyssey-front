export default function Window({ title, children, className = "" }) {
  return (
    <section
      className={`
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
      <div className="m-1 border border-battle-gold-light p-8">
        {title && (
          <div className="mb-8">
            <div className="flex items-center gap-4">
              {/* Línea izquierda */}
              <div className="flex flex-1 items-center">
                <div className="h-px flex-1 bg-battle-gold/60" />
                <div className="mx-2 h-2 w-2 rotate-45 border border-battle-gold" />
              </div>

              {/* Título */}
              <h2
                className="
                  px-2
                  text-center
                  text-3xl
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-battle-gold-light
                  drop-shadow-[0_0_6px_rgba(255,215,0,0.25)]
                "
              >
                {title}
              </h2>

              {/* Línea derecha */}
              <div className="flex flex-1 items-center">
                <div className="mx-2 h-2 w-2 rotate-45 border border-battle-gold" />
                <div className="h-px flex-1 bg-battle-gold/60" />
              </div>
            </div>

            {/* Línea decorativa inferior */}
            <div className="mt-3 flex justify-center">
              <div className="h-px w-12 bg-battle-gold/40" />
            </div>
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
