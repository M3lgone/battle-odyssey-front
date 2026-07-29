export default function BattleLog({ messages }) {
  return (
    <div className="rounded-md border border-battle-gold-light/40 bg-black/25 p-4">
      <h3 className="mb-3 text-lg font-bold uppercase tracking-[0.15em] text-battle-gold-light">
        Battle Log
      </h3>

      <ul className="space-y-1 text-sm">
        {messages.map((message, index) => (
          <li
            key={index}
            className={
              index === messages.length - 1
                ? "text-battle-text"
                : "text-battle-text-muted"
            }
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
