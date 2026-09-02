'use client';

/**
 * useGsapReveal
 * -------------
 * A small hook that scans the document for elements marked with
 * `data-reveal` (and optional `data-reveal-delay="<ms>"`,
 * `data-reveal-variant="<fade|up|down|scale|clip-right>"`) and builds a
 * single ScrollTrigger.batch that animates them into view.
 *
 * Why a hook (not a provider): each page calls it once after mount and gets
 * a fully-scoped set of triggers that are killed on unmount — keeps memory
 * clean across route transitions in Next.js App Router.
 *
 * The animation runs ONCE per element (toggleActions: play none none none)
 * and respects prefers-reduced-motion by simply setting opacity:1 / no-op.
 */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Variant = 'fade' | 'up' | 'down' | 'scale' | 'clip-right' | 'blur';

const VARIANT_FROM: Record<Variant, gsap.TweenVars> = {
  fade: { autoAlpha: 0 },
  up: { autoAlpha: 0, y: 40 },
  down: { autoAlpha: 0, y: -40 },
  scale: { autoAlpha: 0, scale: 0.92 },
  'clip-right': { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' },
  blur: { autoAlpha: 0, filter: 'blur(12px)' },
};

const VARIANT_TO: Record<Variant, gsap.TweenVars> = {
  fade: { autoAlpha: 1 },
  up: { autoAlpha: 1, y: 0 },
  down: { autoAlpha: 1, y: 0 },
  scale: { autoAlpha: 1, scale: 1 },
  'clip-right': { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  blur: { autoAlpha: 1, filter: 'blur(0px)' },
};

export function useGsapReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    );

    if (targets.length === 0) return;

    // Set initial state immediately to avoid flash.
    targets.forEach((el) => {
      const variant = (el.dataset.revealVariant as Variant) || 'up';
      const fromVars = { ...VARIANT_FROM[variant] };

      // Honor explicit overrides via inline style / data attributes.
      if (el.dataset.revealY) fromVars.y = Number(el.dataset.revealY);

      if (prefersReducedMotion) {
        gsap.set(el, { autoAlpha: 1, y: 0, scale: 1, filter: 'none', clipPath: 'none' });
        return;
      }
      gsap.set(el, fromVars);
    });

    if (prefersReducedMotion) return;

    const triggers = targets
      .filter((el) => !el.dataset.revealDisabled)
      .map((el) => {
        const variant = (el.dataset.revealVariant as Variant) || 'up';
        const delay = el.dataset.revealDelay
          ? Number(el.dataset.revealDelay) / 1000
          : 0;
        const duration = el.dataset.revealDuration
          ? Number(el.dataset.revealDuration) / 1000
          : 0.9;

        return ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              ...VARIANT_TO[variant],
              duration,
              delay,
              ease: 'power3.out',
            });
          },
        });
      });

    // Refresh after a tick so images / layout shifts settle.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
