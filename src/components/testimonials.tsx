"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Dr. Amara Osei",
    role: "Mechanical Engineer, Ghana",
    text: "Enginest matched me with a water purification challenge that perfectly leveraged my fluid dynamics background. I went from browsing to building a solution prototype in under two weeks.",
  },
  {
    name: "Kenji Yamamoto",
    role: "Energy Systems Engineer, Japan",
    text: "The AI Assistant understood my constraint — I needed problems solvable with existing hardware. It filtered thousands of challenges down to five I could actually start on immediately.",
  },
  {
    name: "Sofia Reyes",
    role: "Biomedical Engineer, Mexico",
    text: "The playbooks saved me months of research. Instead of starting from scratch on a prosthetics accessibility problem, I had a validated framework to build on from day one.",
  },
  {
    name: "Liam Chen",
    role: "Civil Engineer, Australia",
    text: "Finding a team through Enginest was effortless. The skill-gap analysis showed exactly who we needed, and within a week we had a cross-functional team tackling flood resilience.",
  },
] as const;

export function Testimonials() {
  const [active, setActive] = React.useState(0);
  const next = () => setActive((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () =>
    setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Auto-advance
  React.useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[active];

  return (
    <section className="bg-[#0F1B3D] py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            What engineers are{" "}
            <span className="text-[#93C5FD]">saying</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <Quote className="size-10 text-[#3B82F6]/30 mx-auto mb-6 rotate-180" />
              <blockquote className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 font-light italic">
                &ldquo;{current.text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#93C5FD] flex items-center justify-center text-white font-bold text-sm">
                  {current.name[0]}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">
                    {current.name}
                  </div>
                  <div className="text-xs text-white/50">{current.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/3 -translate-x-2 sm:-translate-x-8 size-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/3 translate-x-2 sm:translate-x-8 size-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-[#3B82F6]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
