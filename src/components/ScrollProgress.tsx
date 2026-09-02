'use client';

/**
 * ScrollProgress
 * --------------
 * Thin gradient progress bar pinned to the top of the viewport that fills
 * as the user scrolls through the page. A classic Awwwards flourish —
 * driven by GSAP ScrollTrigger so it stays in sync with Lenis smoothing.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: () =>
        Math.max(
          0,
          (document.documentElement.scrollHeight || 0) -
            window.innerHeight
        ),
      onUpdate: (self) => {
        // scaleX from 0 -> 1 with origin left — cheap GPU transform.
        gsap.to(el, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'power1.out',
          overwrite: true,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0"
        style={{
          background:
            'linear-gradient(90deg, #3B82F6 0%, #93C5FD 50%, #2563EB 100%)',
          boxShadow: '0 0 12px rgba(59, 130, 246, 0.6)',
        }}
      />
    </div>
  );
}
