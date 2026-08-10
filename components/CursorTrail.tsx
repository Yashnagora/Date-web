"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

import { useCursorTrail } from "@/hooks/useCursorTrail";

export function CursorTrail() {
  const { cursor, enabled, trail } = useCursorTrail();

  if (!enabled) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/30 p-2 shadow-glow backdrop-blur-md"
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: "spring", stiffness: 520, damping: 30, mass: 0.4 }}
      >
        <Heart className="h-4 w-4 fill-blush-300 text-blush-500" />
      </motion.div>

      {trail.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0.7, scale: 0.8, y: 0 }}
          animate={{ opacity: 0, scale: 1.2, y: -14 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: heart.x, top: heart.y }}
        >
          <Heart className="h-3.5 w-3.5 fill-rose-300/75 text-rose-400/90" />
        </motion.div>
      ))}
    </div>
  );
}
