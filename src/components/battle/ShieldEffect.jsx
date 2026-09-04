export default function ShieldEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        className="h-24 w-24 animate-shield-pulse drop-shadow-[0_0_12px_rgba(96,165,250,0.8)] md:h-32 md:w-32"
      >
        <path
          d="M12 2 L20 5 V11 C20 16.5 16.5 20.5 12 22 C7.5 20.5 4 16.5 4 11 V5 Z"
          fill="rgba(96,165,250,0.15)"
          stroke="#93c5fd"
          strokeWidth="1.5"
        />
        <path
          d="M12 2 L20 5 V11 C20 16.5 16.5 20.5 12 22 C7.5 20.5 4 16.5 4 11 V5 Z"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
