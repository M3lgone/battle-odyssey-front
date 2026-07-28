export default function Textarea({ className = "", rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`
        w-full
        rounded-md
        border
        border-battle-gold-light/40
        bg-black/25
        px-4
        py-3
        text-battle-text
        placeholder:text-battle-text-muted/60
        outline-none
        transition-colors
        focus:border-battle-gold
        focus:bg-black/35
        ${className}
      `}
      {...props}
    />
  );
}
