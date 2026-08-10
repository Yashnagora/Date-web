"use client";

import { useCallback, useEffect, useState } from "react";

export const DATE_PLAN_STORAGE_KEY = "romantic-date-plan-v1";

export type DatePlan = {
  name?: string;
  date?: string;
  time?: string;
  savedAt?: number;
};

type UseDatePlanReturn = {
  plan: DatePlan;
  savePlan: (next: Partial<DatePlan>) => void;
  clearPlan: () => void;
};

const emptyPlan: DatePlan = {};

const isBrowser = () => typeof window !== "undefined";

export function readDatePlan(): DatePlan {
  if (!isBrowser()) {
    return { ...emptyPlan };
  }

  try {
    const raw = window.localStorage.getItem(DATE_PLAN_STORAGE_KEY);
    if (!raw) {
      return { ...emptyPlan };
    }

    const parsed = JSON.parse(raw) as DatePlan;
    return {
      name: typeof parsed.name === "string" && parsed.name.trim() ? parsed.name.trim() : undefined,
      date: typeof parsed.date === "string" ? parsed.date : undefined,
      time: typeof parsed.time === "string" ? parsed.time : undefined,
      savedAt: typeof parsed.savedAt === "number" ? parsed.savedAt : undefined
    };
  } catch {
    return { ...emptyPlan };
  }
}

export function writeDatePlan(plan: DatePlan): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(DATE_PLAN_STORAGE_KEY, JSON.stringify(plan));
    window.dispatchEvent(
      new CustomEvent("romantic-date-plan:change", { detail: plan })
    );
  } catch {
    // ignore quota / serialization errors
  }
}

export function formatPlanDate(dateValue?: string): string {
  if (!dateValue) return "";
  const date = new Date(dateValue + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export function formatPlanShortDate(dateValue?: string): string {
  if (!dateValue) return "";
  const date = new Date(dateValue + "T00:00:00");
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

export function buildPlanMessage(plan: DatePlan, options?: { emojis?: boolean }): string {
  const withEmoji = options?.emojis ?? true;
  const hasName = Boolean(plan.name);
  const hasDate = Boolean(plan.date);
  const hasTime = Boolean(plan.time);

  const parts: string[] = [];

  if (!hasDate && !hasTime && !hasName) {
    return withEmoji
      ? "No date and time selected yet 💭"
      : "No date and time selected yet.";
  }

  if (withEmoji) parts.push("It's a DATE! 💕");
  else parts.push("It's a DATE!");

  if (hasName) {
    parts.push(withEmoji ? `👤 ${plan.name}` : plan.name!);
  }
  if (hasDate) {
    parts.push(withEmoji ? `📅 ${formatPlanDate(plan.date)}` : formatPlanDate(plan.date!));
  }
  if (hasTime) {
    parts.push(withEmoji ? `⏰ ${plan.time}` : plan.time!);
  }

  if (withEmoji) parts.push("Can't wait! 💖");

  return parts.join("\n");
}

export async function copyPlanToClipboard(plan: DatePlan): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(buildPlanMessage(plan));
    return true;
  } catch {
    return false;
  }
}

/**
 * Optional: send an instant push notification to your phone via ntfy.sh (free, no signup).
 *
 * 1) Install the ntfy app on your phone (Android / iOS).
 * 2) Choose a hard-to-guess TOPIC NAME, e.g. "yash-date-site-7x3q".
 * 3) Subscribe to that topic inside the ntfy app.
 * 4) Paste the topic into the NTFY_TOPIC constant below.
 *
 * From then on: whenever someone picks a date on the site, your phone buzzes instantly 📳.
 */
export const NTFY_TOPIC = "yash-date-site-7x3q"; // e.g. "yash-date-site-7x3q"

export async function notifyPlan(plan: DatePlan): Promise<boolean> {
  if (!NTFY_TOPIC) return false;
  if (typeof fetch === "undefined") return false;
  try {
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: "POST",
      headers: { Title: "💖 Someone picked a date!" },
      body: buildPlanMessage(plan)
    });
    return true;
  } catch {
    return false;
  }
}

export function useDatePlan(): UseDatePlanReturn {
  const [plan, setPlan] = useState<DatePlan>(() => readDatePlan());

  useEffect(() => {
    if (!isBrowser()) return undefined;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === DATE_PLAN_STORAGE_KEY) {
        setPlan(readDatePlan());
      }
    };

    const handleInternal = (event: Event) => {
      const detail = (event as CustomEvent<DatePlan>).detail;
      setPlan(detail ? { ...detail } : readDatePlan());
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(
      "romantic-date-plan:change",
      handleInternal as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(
        "romantic-date-plan:change",
        handleInternal as EventListener
      );
    };
  }, []);

  const savePlan = useCallback((next: Partial<DatePlan>) => {
    const previous = readDatePlan();
    const merged: DatePlan = {
      ...previous,
      ...next,
      savedAt: Date.now()
    };
    writeDatePlan(merged);
    setPlan(merged);
  }, []);

  const clearPlan = useCallback(() => {
    if (isBrowser()) {
      try {
        window.localStorage.removeItem(DATE_PLAN_STORAGE_KEY);
      } catch {
        // ignore
      }
      window.dispatchEvent(
        new CustomEvent("romantic-date-plan:change", { detail: emptyPlan })
      );
    }
    setPlan({ ...emptyPlan });
  }, []);

  return { plan, savePlan, clearPlan };
}
