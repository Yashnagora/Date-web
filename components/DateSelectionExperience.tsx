"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Clock, Heart } from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import { GlassCard } from "@/components/GlassCard";
import { PageTransition } from "@/components/PageTransition";
import { formatPlanDate, useDatePlan } from "@/lib/date-plan";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM"
] as const;

type TimeSlot = (typeof TIME_SLOTS)[number];

export function DateSelectionExperience() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const { savePlan } = useDatePlan();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<TimeSlot | "">("");
  const [confirmed, setConfirmed] = useState(false);

  const canSetDate = Boolean(selectedDate && selectedTime);

  const handleSetDate = () => {
    if (!canSetDate) return;
    savePlan({ date: selectedDate, time: selectedTime });
    setConfirmed(true);
  };

  const handleContinue = () => {
    const delay = prefersReducedMotion ? 200 : 520;
    window.setTimeout(() => router.push("/yay"), delay);
  };

  return (
    <PageTransition className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
      <GlassCard className="w-full max-w-xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {!confirmed ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-7"
            >
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className="flex justify-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-200/70 bg-gradient-to-br from-rose-100 to-pink-200 shadow-glow dark:border-rose-400/20 dark:from-rose-950/60 dark:to-fuchsia-950/60">
                  <span className="text-3xl" aria-hidden="true">
                    📅
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
                className="text-center"
              >
                <h1
                  className={cn(
                    "font-[family-name:var(--font-display)] leading-tight tracking-tight",
                    "text-[#6b1f2e] dark:text-rose-200",
                    "text-4xl sm:text-5xl"
                  )}
                >
                  So… when are you free?
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
                className="space-y-2"
              >
                <label
                  htmlFor="date-input"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Pick a Day <span aria-hidden="true">📅</span>
                </label>
                <div className="relative">
                  <input
                    id="date-input"
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    className={cn(
                      "block w-full appearance-none rounded-xl border border-rose-100/80 bg-white/85",
                      "px-4 py-3.5 pr-11 text-sm text-slate-800 shadow-sm outline-none transition",
                      "placeholder:text-slate-400",
                      "focus:border-rose-300 focus:ring-4 focus:ring-rose-200/50",
                      "dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500",
                      "dark:focus:border-rose-400/50 dark:focus:ring-rose-500/20",
                      "h-[48px]"
                    )}
                    style={{ colorScheme: "light" }}
                  />
                  <CalendarDays
                    className="pointer-events-none absolute right-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-rose-400 dark:text-rose-300"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
                className="space-y-2"
              >
                <label
                  htmlFor="time-select"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  What Time? <span aria-hidden="true">⏰</span>
                </label>
                <div className="relative">
                  <select
                    id="time-select"
                    value={selectedTime}
                    onChange={(event) =>
                      setSelectedTime(event.target.value as TimeSlot | "")
                    }
                    className={cn(
                      "block w-full appearance-none rounded-xl border border-rose-100/80 bg-white/85",
                      "px-4 py-3.5 pr-11 text-sm text-slate-800 shadow-sm outline-none transition",
                      "focus:border-rose-300 focus:ring-4 focus:ring-rose-200/50",
                      "dark:border-white/10 dark:bg-white/5 dark:text-slate-100",
                      "dark:focus:border-rose-400/50 dark:focus:ring-rose-500/20",
                      "h-[48px]",
                      !selectedTime && "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    <option value="" disabled>
                      Select a time…
                    </option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="text-slate-800">
                        {slot}
                      </option>
                    ))}
                  </select>
                  <Clock
                    className="pointer-events-none absolute right-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-rose-400 dark:text-rose-300"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <svg
                    className="pointer-events-none absolute right-10 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="pt-1"
              >
                <AnimatedButton
                  type="button"
                  onClick={handleSetDate}
                  disabled={!canSetDate}
                  variant="pink"
                  icon={<Heart className="h-4 w-4 fill-white text-white" />}
                  className={cn(
                    "!min-h-[50px] w-full justify-center text-base tracking-wide",
                    "disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:scale-100 disabled:hover:translate-y-0"
                  )}
                >
                  set the date! ♥
                </AnimatedButton>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="space-y-6 py-6 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -14 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.05 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/70 shadow-glow dark:bg-fuchsia-950/40"
              >
                <Heart className="h-9 w-9 fill-rose-300 text-rose-500" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
                className="space-y-3"
              >
                <h2 className="font-[family-name:var(--font-display)] text-4xl text-rose-900 dark:text-rose-200 sm:text-5xl">
                  IT&apos;S A DATE! <span aria-hidden="true">💕</span>
                </h2>
                <p className="text-lg text-slate-700 dark:text-slate-200 sm:text-xl">
                  Can&apos;t wait for our date <span aria-hidden="true">🥰</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
                className="mx-auto max-w-md rounded-2xl border border-rose-100/80 bg-gradient-to-br from-rose-50/80 to-pink-100/70 p-5 shadow-sm dark:border-white/10 dark:from-rose-950/40 dark:to-fuchsia-950/40"
              >
                <div className="flex items-center justify-around gap-4 text-left sm:text-center">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500 dark:text-rose-300">
                      Day
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-xl text-slate-800 dark:text-slate-100 sm:text-2xl">
                      {formatPlanDate(selectedDate)}
                    </p>
                  </div>
                  <div className="h-12 w-px bg-rose-200/70 dark:bg-rose-200/15" />
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500 dark:text-rose-300">
                      Time
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-xl text-slate-800 dark:text-slate-100 sm:text-2xl">
                      {selectedTime}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.52, ease: "easeOut" }}
                className="mx-auto max-w-sm pt-2"
              >
                <AnimatedButton
                  type="button"
                  onClick={handleContinue}
                  variant="pink"
                  icon={<Heart className="h-4 w-4 fill-white text-white" />}
                  className="!min-h-[50px] w-full justify-center text-base tracking-wide"
                >
                  okayyy let&apos;s go! ✨
                </AnimatedButton>
                <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
                  (whenever you&apos;re ready 💕)
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                preparing all the sparkle… <span aria-hidden="true">✨</span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </PageTransition>
  );
}
