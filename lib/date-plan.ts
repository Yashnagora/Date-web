"use client";

import { useCallback, useEffect, useState } from "react";

export const DATE_PLAN_STORAGE_KEY = "romantic-date-plan-v1";

export type DatePlan = {
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
