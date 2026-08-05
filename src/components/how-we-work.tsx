"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Hammer, Users, Rocket } from "lucide-react";

const STEPS = [
  {
    step: 1,
    title: "Discover",
    desc: "Browse curated problems from global orgs. Filter by domain, impact, and complexity.",
    icon: Search,
    color: "#3B82F6",
  },
  {
    step: 2,
    title: "Get Matched",
    desc: "AI analyzes your skills to recommend problems where you'll have the highest impact.",
    icon: Sparkles,
    color: "#8B5CF6",
  },
  {
    step: 3,
    title: "Build",
    desc: "Use playbooks and resources to start solving. Frameworks guide you from research to prototype.",
    icon: Hammer,
    color: "#10B981",
  },
  {
    step: 4,
    title: "Collaborate",
    desc: "Assemble teams with complementary skills. Share progress and get AI-powered feedback.",
    icon: Users,
    color: "#F59E0B",
  },
  {
    step: 5,
    title: "Deploy & Impact",
    desc: "Submit solutions to partners for real-world deployment. Track impact metrics and build your portfolio.",
    icon: Rocket,
    color: "#EC4899",
  },
] as const;

export function HowWeWork() {
  const [active, setActive] = React.useState(0);
  const current = STEPS[active];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-18"
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

        {/* Two-column: Timeline left + Detail card right */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
          {/* Timeline - vertical on all screens */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Connecting line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#0F1B3D]/10" />

            <div className="flex flex-col gap-1">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <button
                    key={s.step}
                    onClick={() => setActive(i)}
                    className={`relative flex items-center gap-4 text-left rounded-xl px-3 py-3.5 transition-all duration-300 group ${
                      isActive
                        ? "bg-[#F5F7FB] shadow-sm"
                        : "hover:bg-[#F5F7FB]/50"
                    }`}
                  >
                    {/* Dot on line */}
                    <div
                      className={`relative z-10 size-[10px] rounded-full shrink-0 transition-all duration-300 ${
                        isActive ? "scale-[1.6]" : ""
                      }`}
                      style={{
                        backgroundColor: isActive ? s.color : "#CBD5E1",
                        boxShadow: isActive
                          ? `0 0 0 4px ${s.color}20`
                          : "none",
                      }}
                    />

                    {/* Icon + label */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`size-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive
                            ? "scale-110"
                            : "opacity-40 group-hover:opacity-60"
                        }`}
                        style={{
                          backgroundColor: isActive
                            ? `${s.color}15`
                            : "#F5F7FB",
                        }}
                      >
                        <Icon
                          className="size-4"
                          style={{ color: isActive ? s.color : "#94A3B8" }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-sm font-semibold transition-colors duration-300 ${
                            isActive
                              ? "text-[#0F1B3D]"
                              : "text-[#0F1B3D]/50 group-hover:text-[#0F1B3D]/70"
                          }`}
                        >
                          {s.title}
                        </div>
                        <div
                          className={`text-xs transition-colors duration-300 ${
                            isActive
                              ? "text-[#0F1B3D]/40"
                              : "text-[#0F1B3D]/30"
                          }`}
                        >
                          Step {s.step}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Detail card */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Card background with gradient accent */}
            <div className="bg-[#F5F7FB] rounded-2xl p-8 sm:p-10 lg:p-12 border border-[#0F1B3D]/5">
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ backgroundColor: current.color }}
              />

              <div className="flex items-start gap-5">
                {/* Large icon */}
                <div
                  className="size-14 sm:size-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${current.color}12` }}
                >
                  <current.icon
                    className="size-7 sm:size-8"
                    style={{ color: current.color }}
                  />
                </div>

                <div className="min-w-0">
                  {/* Step badge */}
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
                    style={{
                      backgroundColor: `${current.color}10`,
                      color: current.color,
                    }}
                  >
                    Step {current.step} of 5
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0F1B3D] mb-4">
                    {current.title}
                  </h3>

                  <p className="text-base sm:text-lg text-[#0F1B3D]/60 leading-relaxed max-w-lg">
                    {current.desc}
                  </p>

                  {/* Progress dots */}
                  <div className="flex items-center gap-2 mt-8">
                    {STEPS.map((s, i) => (
                      <div
                        key={s.step}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          i === active
                            ? "w-8"
                            : "w-1.5 opacity-30 hover:opacity-50"
                        }`}
                        style={{
                          backgroundColor:
                            i === active ? s.color : "#0F1B3D",
                        }}
                        onClick={() => setActive(i)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
