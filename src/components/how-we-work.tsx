"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = [
  {
    step: 1,
    title: "Discover",
    desc: "Browse curated engineering problems from global organizations. Filter by domain, impact, and complexity to find what resonates with you.",
    color: "#3B82F6",
  },
  {
    step: 2,
    title: "Get Matched",
    desc: "Our AI analyzes your skills, interests, and experience to recommend problems where you'll have the highest impact — with match scores.",
    color: "#8B5CF6",
  },
  {
    step: 3,
    title: "Build",
    desc: "Use playbooks, resources, and team templates to start solving. Our step-by-step frameworks guide you from research to prototype.",
    color: "#10B981",
  },
  {
    step: 4,
    title: "Collaborate",
    desc: "Assemble teams with complementary skills. Share progress, iterate on solutions, and get AI-powered feedback at every stage.",
    color: "#F59E0B",
  },
  {
    step: 5,
    title: "Deploy & Impact",
    desc: "Submit solutions to partner organizations for real-world deployment. Track your impact metrics and build your innovation portfolio.",
    color: "#EC4899",
  },
] as const;

export function HowWeWork() {
  const [active, setActive] = React.useState(0);

  const next = () => setActive((p) => (p + 1) % STEPS.length);
  const prev = () => setActive((p) => (p - 1 + STEPS.length) % STEPS.length);

  const current = STEPS[active];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B3D] tracking-tight">
            How we <span className="text-[#3B82F6]">work</span>
          </h2>
          <p className="mt-4 text-base text-[#0F1B3D]/60 max-w-xl mx-auto">
            From discovery to real-world impact in five steps.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10">
          {STEPS.map((s, i) => (
            <button
              key={s.step}
              onClick={() => setActive(i)}
              className={`relative flex items-center justify-center transition-all duration-300 ${
                i === active
                  ? "size-12 sm:size-14 rounded-2xl text-white font-bold text-lg shadow-lg"
                  : "size-10 sm:size-12 rounded-xl text-[#0F1B3D]/40 font-semibold text-sm hover:text-[#0F1B3D]/70 hover:bg-[#F5F7FB]"
              }`}
              style={
                i === active
                  ? { backgroundColor: current.color, boxShadow: `0 8px 24px ${current.color}30` }
                  : {}
              }
            >
              {s.step}
            </button>
          ))}
        </div>

        {/* Content carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="bg-[#F5F7FB] rounded-2xl p-8 sm:p-12 text-center"
            >
              <div
                className="inline-flex size-14 rounded-2xl items-center justify-center mb-6"
                style={{ backgroundColor: `${current.color}15` }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: current.color }}
                >
                  {current.step}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0F1B3D] mb-4">
                {current.title}
              </h3>
              <p className="text-base sm:text-lg text-[#0F1B3D]/60 leading-relaxed max-w-xl mx-auto">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 size-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#0F1B3D]/60 hover:text-[#0F1B3D] transition-colors border border-[#0F1B3D]/5"
            aria-label="Previous step"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 size-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#0F1B3D]/60 hover:text-[#0F1B3D] transition-colors border border-[#0F1B3D]/5"
            aria-label="Next step"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
