'use client';

/**
 * SmoothScrollProvider
 * --------------------
 * Wires together Lenis (smooth-scroll engine used by most Awwwards winning
 * sites) and GSAP ScrollTrigger. Lenis drives the scroll position; on every
 * RAF tick we tell ScrollTrigger to update so its triggers stay in sync with
 * the smoothed scroll value. We also forward Lenis to the global `window`
 * so other code (debug, custom cursors, etc.) can hook into it if needed.
 *
 * IMPORTANT:
 *  - Honors `prefers-reduced-motion` (disables smoothing, falls back to native scroll).
 *  - Disables itself on touch / coarse-pointer devices to keep native momentum.
 *  - Cleans up on unmount.
 *  - Does NOT break Framer Motion `useScroll` — Lenis still dispatches real
 *    `scroll` events so any library listening to native scroll works unchanged.
 */

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register once (idempotent — gsap.registerPlugin ignores duplicates).
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    // Skip smooth scroll entirely for reduced-motion or touch users — native
    // is better there.
    if (prefersReducedMotion || isCoarsePointer) {
      // Make sure ScrollTrigger is still alive for any reveal animations.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15, // seconds — controls "weight" of the smoothing
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      // `autoResize` lets Lenis recalc on viewport / layout changes.
      autoResize: true,
    });

    // Expose for debugging / other libs.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Sync ScrollTrigger with Lenis on every frame.
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000); // Lenis expects ms
    };

    // Hook GSAP's ticker to drive Lenis — single RAF loop, no extra rAF.
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Whenever ScrollTrigger recalculates (e.g. fonts/images load, layout
    // shifts), tell Lenis about the new page height.
    const refreshLenis = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', refreshLenis);

    // Force a refresh once everything is mounted + fonts are ready.
    const refreshTimeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      window.clearTimeout(refreshTimeout);
      ScrollTrigger.removeEventListener('refresh', refreshLenis);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
