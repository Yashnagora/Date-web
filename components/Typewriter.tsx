"use client";

import { TypeAnimation } from "react-type-animation";
import { useReducedMotion } from "framer-motion";

type TypewriterProps = {
  lines: readonly string[];
  className?: string;
};

export function Typewriter({ lines, className }: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const joined = lines.join(" ");

  if (prefersReducedMotion) {
    return <p className={className}>{joined}</p>;
  }

  const sequence = lines.flatMap((line) => [line, 1300]);

  return (
    <div className={className}>
      <TypeAnimation
        repeat={Infinity}
        speed={60}
        deletionSpeed={74}
        sequence={sequence}
        wrapper="p"
        cursor
        aria-hidden="true"
      />
      <span className="sr-only">{joined}</span>
    </div>
  );
}
