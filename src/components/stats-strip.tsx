"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "30+", label: "Curated Problems", suffix: "" },
  { value: "26", label: "Engineering Categories", suffix: "" },
  { value: "5B+", label: "People Impacted", suffix: "" },
] as const;

export function StatsStrip() {
  return (
    <section className="relative bg-[#F5F7FB] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="text-4xl sm:text-5xl font-bold text-[#0F1B3D] tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm sm:text-base text-[#0F1B3D]/60 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
