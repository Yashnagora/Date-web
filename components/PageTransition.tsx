"use client";

import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type PageTransitionProps = PropsWithChildren<{
  className?: string;
}>;

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 110, damping: 18 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
