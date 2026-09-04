import { useEffect, useRef, useState } from "react";

const ANIM_MIN_MS = 250;
const ANIM_MAX_MS = 800;
const ANIM_PER_POINT_MS = 10;

const statStyles = {
  hp: {
    label: "HP",
    fill: "bg-gradient-to-b from-red-400 to-red-600",
    labelText: "text-white",
  },
  mp: {
    label: "MP",
    fill: "bg-gradient-to-b from-sky-400 to-sky-600",
    labelText: "text-white",
  },
};

function durationFor(delta) {
  return Math.min(ANIM_MAX_MS, ANIM_MIN_MS + Math.abs(delta) * ANIM_PER_POINT_MS);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function useAnimatedValue(current) {
  const [displayed, setDisplayed] = useState(current);
  const displayedRef = useRef(current);
  const rafRef = useRef(null);

  useEffect(() => {
    const from = displayedRef.current;
    const to = current;

    if (from === to) return;

    const duration = durationFor(to - from);
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      const value = from + (to - from) * eased;

      displayedRef.current = value;
      setDisplayed(value);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        displayedRef.current = to;
        setDisplayed(to);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current]);

  return displayed;
}

export default function StatusBar({ variant, current, max }) {
  const { label, fill, labelText } = statStyles[variant];
  const displayed = useAnimatedValue(current);
  const percentage =
    max > 0 ? Math.min(100, Math.max(0, (displayed / max) * 100)) : 0;
  const shown = Math.round(displayed);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-bold uppercase tracking-[0.15em] ${labelText} drop-shadow-[1px_1px_0_rgba(0,0,0,1)]`}
        >
          {label}
        </span>

        <span className="text-sm font-bold text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
          {shown} <span className="text-xs text-gray-400">/ {max}</span>
        </span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-sm border border-battle-gold-light/40 bg-black/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
        <div
          className={`h-full rounded-sm ${fill} shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
