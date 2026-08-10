export type Position = {
  x: number;
  y: number;
};

type Bounds = {
  width: number;
  height: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function distanceBetween(a: Position, b: Position) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.hypot(dx, dy);
}

export function getNextEvasivePosition(
  bounds: Bounds,
  buttonSize: Bounds,
  previous: Position,
  safeMargin = 18
) {
  const maxX = Math.max(bounds.width - buttonSize.width - safeMargin, safeMargin);
  const maxY = Math.max(bounds.height - buttonSize.height - safeMargin, safeMargin);

  let next = previous;
  let attempts = 0;

  while (attempts < 12) {
    const candidate = {
      x: Math.round(Math.random() * (maxX - safeMargin) + safeMargin),
      y: Math.round(Math.random() * (maxY - safeMargin) + safeMargin)
    };

    if (distanceBetween(candidate, previous) > Math.min(bounds.width, bounds.height) / 4) {
      next = candidate;
      break;
    }

    next = candidate;
    attempts += 1;
  }

  return {
    x: clamp(next.x, safeMargin, maxX),
    y: clamp(next.y, safeMargin, maxY)
  };
}
