"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { GlassCard } from "@/components/GlassCard";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition } from "@/components/PageTransition";
import { Typewriter } from "@/components/Typewriter";
import { useEvasiveButton } from "@/hooks/useEvasiveButton";
import { romanticImages, typewriterLines } from "@/lib/constants";

export function HomeExperience() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [celebrating, setCelebrating] = useState(false);
  const { areaRef, buttonStyle, handleMouseEnter, handlePointerMove, handleTouchStart } =
    useEvasiveButton();

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleYes = () => {
    if (celebrating) {
      return;
    }

    setCelebrating(true);
    const delay = prefersReducedMotion ? 420 : 1350;
    window.setTimeout(() => router.push("/wait-what"), delay);
  };

  return (
    <>
      <ConfettiEffect active={celebrating} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <PageTransition
            key="home"
            className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6"
          >
            <GlassCard className="w-full max-w-2xl p-5 sm:p-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="space-y-6"
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  className="flex justify-center"
                >
                  <div className="relative w-full max-w-md overflow-hidden rounded-[1.5rem] border border-white/55 bg-white/60 p-3 shadow-glow dark:border-white/10 dark:bg-white/5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_50%)]" />
                    <Image
                      src={romanticImages.home.src}
                      alt={romanticImages.home.alt}
                      width={800}
                      height={560}
                      priority
                      className="relative h-auto w-full rounded-[1.15rem]"
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  className="space-y-4 text-center"
                >
                  <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900/45 dark:text-slate-200">
                    <Sparkles className="h-3.5 w-3.5 text-blush-500" />
                    A little romantic chaos
                  </span>

                  <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-slate-900 dark:text-white sm:text-5xl">
                    {"\u{1F338} Will you go on a date with me? \u{1F338}"}
                  </h1>

                  <Typewriter
                    lines={typewriterLines}
                    className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base"
                  />
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  className="rounded-[1.5rem] border border-white/50 bg-white/40 p-4 dark:border-white/10 dark:bg-slate-900/30"
                >
                  <div
                    ref={areaRef}
                    className="relative h-36"
                    onPointerMove={handlePointerMove}
                    onMouseLeave={handleMouseEnter}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-[112%] -translate-y-1/2">
                      <AnimatedButton
                        type="button"
                        aria-label="Say yes"
                        onClick={handleYes}
                        disabled={celebrating}
                        icon={<Heart className="h-4 w-4 fill-white text-white" />}
                        className="min-w-[118px]"
                      >
                        {celebrating ? "YAY!" : "YES"}
                      </AnimatedButton>
                    </div>

                    <motion.button
                      type="button"
                      aria-hidden="true"
                      tabIndex={-1}
                      whileTap={{ scale: 0.97 }}
                      style={buttonStyle}
                      onMouseEnter={handleMouseEnter}
                      onTouchStart={handleTouchStart}
                      onClick={(event) => {
                        event.preventDefault();
                        handleTouchStart();
                      }}
                      className="absolute inline-flex min-h-13 min-w-[112px] items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(124,58,237,0.95),rgba(168,85,247,0.9))] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(124,58,237,0.25)]"
                    >
                      NO
                    </motion.button>
                  </div>

                  <p className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Hint: the purple button is committed to the bit.
                  </p>
                </motion.div>
              </motion.div>
            </GlassCard>
          </PageTransition>
        )}
      </AnimatePresence>
    </>
  );
}
