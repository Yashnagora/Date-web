"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

type LoadingScreenProps = {
  message?: string;
};

export function LoadingScreen({
  message = "Wrapping your date invite in extra sparkle..."
}: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="flex min-h-[70vh] flex-col items-center justify-center gap-5"
    >
      <motion.div
        animate={{ scale: [1, 1.18, 1], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-full border border-white/50 bg-white/55 p-5 shadow-glow backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55"
      >
        <Heart className="h-10 w-10 fill-blush-300 text-blush-500" />
      </motion.div>

      <div className="space-y-2 text-center">
        <p className="font-[family-name:var(--font-display)] text-2xl text-slate-800 dark:text-white">
          Just a tiny romantic loading moment
        </p>
        <p className="max-w-sm text-sm text-slate-600 dark:text-slate-300">{message}</p>
      </div>

      <div className="flex items-center gap-2">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
            className="h-2.5 w-2.5 rounded-full bg-blush-400"
          />
        ))}
      </div>
    </motion.div>
  );
}
