"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Heart, MessageCircleHeart } from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import { GlassCard } from "@/components/GlassCard";
import { PageTransition } from "@/components/PageTransition";
import { formatPlanDate, useDatePlan } from "@/lib/date-plan";
import { WHATSAPP_LINK, romanticImages } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CelebrationExperience() {
  const { plan } = useDatePlan();
  const hasPlan = Boolean(plan.date && plan.time);

  return (
    <PageTransition className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
      <GlassCard className="w-full max-w-3xl p-6 sm:p-8 lg:p-10">
        <div className="space-y-8 text-center">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-[1.7rem] border border-white/50 bg-white/60 p-3 shadow-glow dark:border-white/10 dark:bg-white/5">
            <Image
              src={romanticImages.celebration.src}
              alt={romanticImages.celebration.alt}
              width={900}
              height={820}
              className="h-auto w-full rounded-[1.3rem]"
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="font-[family-name:var(--font-display)] text-5xl text-slate-900 dark:text-white sm:text-6xl">
              YAYYYYY {"\u2764\uFE0F"}
            </h1>

            <motion.div
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/70 shadow-glow dark:bg-fuchsia-950/35"
              animate={{ scale: [1, 1.12, 1], rotate: [0, -3, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-10 w-10 fill-blush-300 text-blush-500" />
            </motion.div>

            <p className="text-2xl text-slate-700 dark:text-slate-200">You just made my day.</p>
            <p className="text-base text-slate-500 dark:text-slate-400">
              Now text me immediately {"\u{1F60C}"}
            </p>
          </div>

          {hasPlan ? (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.18 }}
              className="mx-auto max-w-xl rounded-[1.7rem] border border-rose-100/80 bg-gradient-to-br from-rose-50/85 via-pink-50/75 to-fuchsia-50/75 p-5 shadow-blush/40 sm:p-6 dark:border-white/10 dark:from-rose-950/45 dark:via-fuchsia-950/40 dark:to-indigo-950/35"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-200/70 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-600 dark:border-white/10 dark:bg-white/5 dark:text-rose-200">
                <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-500" />
                Our Date
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border border-white/70 bg-white/75 p-4 text-left",
                    "dark:border-white/5 dark:bg-white/5"
                  )}
                >
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-pink-200 text-rose-600 dark:from-rose-500/25 dark:to-fuchsia-500/20 dark:text-rose-200">
                    <CalendarDays className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500 dark:text-rose-300">
                      Day
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-lg text-slate-800 dark:text-slate-100 sm:text-xl">
                      {formatPlanDate(plan.date)}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border border-white/70 bg-white/75 p-4 text-left",
                    "dark:border-white/5 dark:bg-white/5"
                  )}
                >
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-100 to-rose-200 text-rose-600 dark:from-fuchsia-500/25 dark:to-rose-500/20 dark:text-rose-200">
                    <Clock className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500 dark:text-rose-300">
                      Time
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-lg text-slate-800 dark:text-slate-100 sm:text-xl">
                      {plan.time}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                marked in my heart 💌 — and definitely in my calendar.
              </p>
            </motion.div>
          ) : null}

          <AnimatedButton
            type="button"
            onClick={() => window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer")}
            icon={<MessageCircleHeart className="h-4 w-4" />}
            className="mx-auto"
          >
            Open WhatsApp
          </AnimatedButton>
        </div>
      </GlassCard>
    </PageTransition>
  );
}
