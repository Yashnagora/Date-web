import { Heart } from "lucide-react";

import { heartParticles } from "@/lib/constants";

export function FloatingHearts() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {heartParticles.map((heart, index) => (
        <Heart
          key={`${heart.left}-${heart.top}-${index}`}
          className="absolute fill-blush-300/45 text-blush-400/65 drop-shadow-[0_0_18px_rgba(244,114,182,0.4)]"
          strokeWidth={1.5}
          style={{
            left: heart.left,
            top: heart.top,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animation: `heartFloat ${heart.duration} ease-in-out ${heart.delay} infinite`
          }}
        />
      ))}
    </div>
  );
}
