"use client";

import { useState } from "react";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type MotionButtonProps = ComponentPropsWithoutRef<typeof motion.button>;

type AnimatedButtonProps = Omit<MotionButtonProps, "children" | "className" | "onClick"> & {
  icon?: ReactNode;
  variant?: "pink" | "purple" | "soft";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: ReactNode;
};

const variantClasses = {
  pink: "bg-[linear-gradient(135deg,#ff7db8,#ff9ccc,#ffbad5)] text-white shadow-[0_18px_38px_rgba(236,72,153,0.28)]",
  purple:
    "bg-[linear-gradient(135deg,rgba(139,92,246,0.92),rgba(167,139,250,0.94))] text-white shadow-[0_18px_38px_rgba(124,58,237,0.26)]",
  soft: "bg-white/80 text-slate-700 shadow-[0_18px_38px_rgba(255,255,255,0.26)] dark:bg-white/10 dark:text-slate-100"
} as const;

export function AnimatedButton({
  children,
  className,
  icon,
  onClick,
  variant = "pink",
  ...props
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const size = Math.max(bounds.width, bounds.height) * 1.2;
    const newRipple = {
      id: Date.now(),
      x: event.clientX - bounds.left - size / 2,
      y: event.clientY - bounds.top - size / 2,
      size
    };

    setRipples((current) => [...current, newRipple]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== newRipple.id));
    }, 650);

    onClick?.(event);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 16 }}
      className={cn(
        "group relative inline-flex min-h-13 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-[0.02em]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-pink-200/60 dark:focus-visible:ring-offset-fuchsia-950",
        variantClasses[variant],
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.35),transparent)] bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:animate-shimmer group-hover:opacity-100" />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/40 animate-[ripple_650ms_ease-out_forwards]"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
        />
      ))}
      {icon ? <span className="relative z-10">{icon}</span> : null}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
