import { useEffect, useRef } from "react";

/**
 * Synthesises a two-tone ring with the Web Audio API so we don't ship an audio
 * asset. Browsers block AudioContext until the page has seen a user gesture —
 * if that hasn't happened the ring silently no-ops, which is acceptable
 * (the on-screen incoming-call UI is the primary signal).
 */
export const useRingtone = (active: boolean) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) return;

    const AudioCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtor) return;

    let ctx: AudioContext;
    try {
      ctx = new AudioCtor();
      ctxRef.current = ctx;
    } catch {
      return;
    }

    void ctx.resume().catch(() => undefined);

    const playBurst = () => {
      if (ctx.state !== "running") return;
      // Two short beeps, roughly a classic ring cadence.
      [0, 0.4].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + offset;

        osc.type = "sine";
        osc.frequency.setValueAtTime(offset === 0 ? 440 : 480, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.18, start + 0.05);
        gain.gain.linearRampToValueAtTime(0, start + 0.32);

        osc.connect(gain).connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.35);
      });
    };

    playBurst();
    intervalRef.current = setInterval(playBurst, 2500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      void ctx.close().catch(() => undefined);
      ctxRef.current = null;
    };
  }, [active]);
};
