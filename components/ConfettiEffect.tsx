"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

type ConfettiEffectProps = {
  active: boolean;
};

export function ConfettiEffect({ active }: ConfettiEffectProps) {
  useEffect(() => {
    if (!active) {
      return;
    }

    const defaults = {
      spread: 72,
      startVelocity: 38,
      ticks: 220,
      zIndex: 100
    };

    confetti({
      ...defaults,
      particleCount: 110,
      origin: { x: 0.25, y: 0.5 },
      colors: ["#ff7db8", "#ffc6df", "#ffffff", "#c4b5fd"]
    });

    confetti({
      ...defaults,
      particleCount: 90,
      origin: { x: 0.75, y: 0.48 },
      colors: ["#f472b6", "#ddd6fe", "#fb7185", "#ffffff"]
    });
  }, [active]);

  return null;
}
