"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import { GlassCard } from "@/components/GlassCard";
import { PageTransition } from "@/components/PageTransition";
import { romanticImages } from "@/lib/constants";

export function ReactionExperience() {
  const router = useRouter();

  return (
    <PageTransition className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
      <GlassCard className="w-full max-w-4xl p-6 sm:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="overflow-hidden rounded-[1.8rem] border border-white/50 bg-white/60 p-3 shadow-glow dark:border-white/10 dark:bg-white/5"
          >
            <Image
              src={romanticImages.surprise.src}
              alt={romanticImages.surprise.alt}
              width={900}
              height={900}
              className="h-auto w-full rounded-[1.35rem]"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="space-y-6 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-blush-500" />
              You really did that
            </span>

            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-slate-900 dark:text-white sm:text-5xl">
                WAIT YOU ACTUALLY SAID YES?? {"\u{1F62D}"}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
                I was so ready for you to say no {"\u{1F97A}"}
              </p>
              <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                This has gone much better than my backup plan, which was to stare dramatically at
                the ceiling and write sad poetry for three business days.
              </p>
            </div>

            <AnimatedButton
              type="button"
              onClick={() => router.push("/choose-date")}
              icon={<ArrowRight className="h-4 w-4" />}
              className="mx-auto lg:mx-0"
            >
              Okay okay! →
            </AnimatedButton>
          </motion.div>
        </div>
      </GlassCard>
    </PageTransition>
  );
}
