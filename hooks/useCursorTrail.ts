"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

type TrailHeart = {
  id: number;
  x: number;
  y: number;
};

type CursorState = {
  x: number;
  y: number;
};

export function useCursorTrail() {
  const isFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailHeart[]>([]);
  const lastTrailAt = useRef(0);

  useEffect(() => {
    if (!isFinePointer) {
      setTrail([]);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });

      const now = Date.now();
      if (now - lastTrailAt.current < 55) {
        return;
      }

      lastTrailAt.current = now;
      setTrail((current) => [
        ...current.slice(-10),
        { id: now, x: event.clientX, y: event.clientY }
      ]);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isFinePointer]);

  useEffect(() => {
    if (!trail.length) {
      return;
    }

    const cleanup = window.setInterval(() => {
      const expiry = Date.now() - 650;
      setTrail((current) => current.filter((heart) => heart.id > expiry));
    }, 120);

    return () => window.clearInterval(cleanup);
  }, [trail.length]);

  return useMemo(
    () => ({
      enabled: isFinePointer,
      cursor,
      trail
    }),
    [cursor, isFinePointer, trail]
  );
}
