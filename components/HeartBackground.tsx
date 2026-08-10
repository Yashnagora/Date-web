import { Flower2, Sparkles } from "lucide-react";

import { flowers, sparkles } from "@/lib/constants";
import { FloatingHearts } from "@/components/FloatingHearts";

export function HeartBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,225,238,0.95),_transparent_48%),radial-gradient(circle_at_bottom_right,_rgba(196,181,253,0.32),_transparent_28%),linear-gradient(160deg,_rgba(255,248,252,0.94),_rgba(255,231,242,0.82)_45%,_rgba(249,208,226,0.75))] dark:bg-[radial-gradient(circle_at_top,_rgba(91,33,74,0.52),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.24),_transparent_28%),linear-gradient(160deg,_rgba(20,13,28,0.98),_rgba(36,17,44,0.94)_48%,_rgba(67,27,61,0.92))]" />

      <div className="absolute left-[-8%] top-[12%] h-72 w-72 rounded-full bg-white/30 blur-3xl dark:bg-fuchsia-400/10" />
      <div className="absolute right-[-6%] top-[8%] h-80 w-80 rounded-full bg-blush-200/45 blur-3xl dark:bg-purple-500/12" />
      <div className="absolute bottom-[-10%] left-[14%] h-96 w-96 rounded-full bg-rose-200/35 blur-3xl dark:bg-pink-500/10" />

      <FloatingHearts />

      {sparkles.map((sparkle, index) => (
        <Sparkles
          key={`${sparkle.left}-${sparkle.top}-${index}`}
          className="absolute h-4 w-4 animate-twinkle-soft text-white/80 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] dark:text-fuchsia-200/80"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.delay
          }}
          strokeWidth={1.8}
        />
      ))}

      {flowers.map((flower, index) => (
        <Flower2
          key={`${flower.left}-${flower.top}-${index}`}
          className="absolute h-14 w-14 text-blush-300/55 drop-shadow-[0_8px_28px_rgba(244,114,182,0.18)] dark:text-fuchsia-200/18"
          style={{
            left: flower.left,
            top: flower.top,
            rotate: flower.rotate
          }}
          strokeWidth={1.25}
        />
      ))}

      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)] [background-size:22px_22px] dark:opacity-10" />
    </div>
  );
}
