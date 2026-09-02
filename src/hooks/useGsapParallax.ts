'use client';

/**
 * useGsapParallax
 * ---------------
 * Adds subtle vertical parallax to any element marked with
 * `data-parallax="<speed>"`. Speed is the multiplier on scroll:
 *   - 0.2  → moves at 20% of scroll (very slow, "deep background")
 *   - -0.2 → moves opposite to scroll
 *
 * Uses GSAP ScrollTrigger so it stays perfectly in sync with Lenis.
 * Respects prefers-reduced-motion (no-op).
 */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapParallax(deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]')
    );
    if (targets.length === 0) return;

    const triggers = targets.map((el) => {
      const speed = Number(el.dataset.parallax) || 0;
      if (speed === 0) return null;

      // Build a tween that scrubs from -speed*100% to +speed*100% across
      // the element's scroll range. We apply it to y, with overwrite guard.
      const tween = gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      return tween;
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((t) => t?.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
