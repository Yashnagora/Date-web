import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = PropsWithChildren<{
  className?: string;
}>;

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/45 bg-white/50 p-6 shadow-blush backdrop-blur-2xl",
        "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent",
        "dark:border-white/10 dark:bg-slate-950/35",
        className
      )}
    >
      {children}
    </div>
  );
}
