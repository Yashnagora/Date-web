"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "romantic-site-music-enabled";
const melody = [392, 523.25, 659.25, 523.25, 440, 587.33, 659.25, 523.25];

export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopRef = useRef<number | null>(null);

  const createNote = useCallback(
    (frequency: number, startTime: number, duration: number, waveform: OscillatorType = "sine") => {
      if (!contextRef.current || !masterGainRef.current) {
        return;
      }

      const oscillator = contextRef.current.createOscillator();
      const gainNode = contextRef.current.createGain();

      oscillator.type = waveform;
      oscillator.frequency.setValueAtTime(frequency, startTime);

      gainNode.gain.setValueAtTime(0.0001, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.04, startTime + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(masterGainRef.current);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration + 0.05);
    },
    []
  );

  const stopLoop = useCallback(() => {
    if (loopRef.current) {
      window.clearInterval(loopRef.current);
      loopRef.current = null;
    }

    if (masterGainRef.current && contextRef.current) {
      const now = contextRef.current.currentTime;
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setTargetAtTime(0.0001, now, 0.18);
    }
  }, []);

  const startLoop = useCallback(async () => {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    contextRef.current ??= new AudioContextCtor();

    if (!masterGainRef.current) {
      masterGainRef.current = contextRef.current.createGain();
      masterGainRef.current.gain.value = 0.045;
      masterGainRef.current.connect(contextRef.current.destination);
    }

    if (contextRef.current.state === "suspended") {
      await contextRef.current.resume();
    }

    const schedulePhrase = () => {
      if (!contextRef.current) {
        return;
      }

      const base = contextRef.current.currentTime + 0.02;

      melody.forEach((frequency, index) => {
        createNote(frequency, base + index * 0.27, 0.42, index % 2 === 0 ? "triangle" : "sine");
      });
    };

    schedulePhrase();
    stopLoop();
    loopRef.current = window.setInterval(schedulePhrase, 2500);
  }, [createNote, stopLoop]);

  const toggle = useCallback(async () => {
    const next = !enabled;
    setEnabled(next);

    if (next) {
      await startLoop();
    } else {
      stopLoop();
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, [enabled, startLoop, stopLoop]);

  useEffect(() => {
    const savedPreference = window.localStorage.getItem(STORAGE_KEY);
    if (!savedPreference) {
      return;
    }

    setEnabled(savedPreference === "true");
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    void startLoop();

    return () => stopLoop();
  }, [enabled, startLoop, stopLoop]);

  useEffect(
    () => () => {
      stopLoop();
      void contextRef.current?.close();
    },
    [stopLoop]
  );

  return {
    enabled,
    toggle
  };
}
