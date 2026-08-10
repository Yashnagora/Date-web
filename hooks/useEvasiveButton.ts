"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import { getNextEvasivePosition } from "@/lib/evasive";

const BUTTON_SIZE = {
  width: 112,
  height: 52
};

export function useEvasiveButton() {
  const areaRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 210, y: 18 });

  const resetPosition = useCallback(() => {
    if (!areaRef.current) {
      return;
    }

    const bounds = areaRef.current.getBoundingClientRect();
    setPosition({
      x: Math.max(bounds.width - BUTTON_SIZE.width - 24, 24),
      y: Math.max(bounds.height / 2 - BUTTON_SIZE.height / 2, 16)
    });
  }, []);

  useEffect(() => {
    resetPosition();
    window.addEventListener("resize", resetPosition);

    return () => window.removeEventListener("resize", resetPosition);
  }, [resetPosition]);

  const moveButton = useCallback(() => {
    if (!areaRef.current) {
      return;
    }

    const bounds = areaRef.current.getBoundingClientRect();
    setPosition((previous) =>
      getNextEvasivePosition(
        { width: bounds.width, height: bounds.height },
        BUTTON_SIZE,
        previous
      )
    );
  }, []);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!areaRef.current) {
        return;
      }

      const bounds = areaRef.current.getBoundingClientRect();
      const pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top
      };

      const center = {
        x: position.x + BUTTON_SIZE.width / 2,
        y: position.y + BUTTON_SIZE.height / 2
      };

      const distance = Math.hypot(pointer.x - center.x, pointer.y - center.y);
      if (distance < 120) {
        moveButton();
      }
    },
    [moveButton, position.x, position.y]
  );

  const buttonStyle = useMemo(
    () => ({
      left: `${position.x}px`,
      top: `${position.y}px`
    }),
    [position.x, position.y]
  );

  return {
    areaRef,
    buttonStyle,
    handlePointerMove,
    handleMouseEnter: moveButton,
    handleTouchStart: moveButton
  };
}
