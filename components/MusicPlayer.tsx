"use client";

import { Pause, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { useAmbientAudio } from "@/hooks/useAmbientAudio";

export function MusicPlayer() {
  const { enabled, toggle } = useAmbientAudio();

  return (
    <motion.button
      type="button"
      aria-pressed={enabled}
      aria-label={enabled ? "Pause background music" : "Play background music"}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => void toggle()}
      className="fixed right-4 top-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-blush backdrop-blur-xl transition-colors duration-300 hover:bg-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 dark:border-white/10 dark:bg-slate-900/55 dark:text-slate-100 dark:hover:bg-slate-900/75 sm:right-6 sm:top-6"
    >
      <Sparkles className="h-3.5 w-3.5 text-blush-500" />
      {enabled ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
      <span>{enabled ? "Music on" : "Music off"}</span>
    </motion.button>
  );
}
