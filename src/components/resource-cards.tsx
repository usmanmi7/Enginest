"use client";

import { motion } from "framer-motion";
import { FileText, Video, BookOpen } from "lucide-react";

const RESOURCES = [
  {
    icon: FileText,
    title: "Case Study: Flood Resilience in Southeast Asia",
    desc: "How a team of four engineers used Enginest to prototype a low-cost flood monitoring system in 8 weeks, now deployed across 12 villages.",
    tag: "Case Study",
    color: "#3B82F6",
  },
  {
    icon: Video,
    title: "Webinar: AI-Powered Problem Discovery",
    desc: "Watch our founder demonstrate how the AI Innovation Engine matches skills to challenges, and see a live 94% match in real time.",
    tag: "Webinar",
    color: "#8B5CF6",
  },
  {
    icon: BookOpen,
    title: "Guide: From Problem to Prototype in 30 Days",
    desc: "A step-by-step playbook for taking any Enginest challenge from initial research through to a testable prototype within one month.",
    tag: "Guide",
    color: "#10B981",
  },
] as const;

export function ResourceCards() {
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
            Latest <span className="text-[#3B82F6]">resources</span>
          </h2>
          <p className="mt-4 text-base text-[#0F1B3D]/60 max-w-xl mx-auto">
            Learn from real engineering successes and expert insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESOURCES.map((res, i) => {
            const Icon = res.icon;
            return (
              <motion.article
                key={res.title}
                className="group bg-[#F5F7FB] rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#3B82F6]/10 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${res.color}10`,
                      color: res.color,
                    }}
                  >
                    {res.tag}
                  </span>
                </div>
                <Icon
                  className="size-6 mb-4 transition-transform group-hover:scale-110"
                  style={{ color: res.color }}
                />
                <h3 className="text-base font-semibold text-[#0F1B3D] mb-3 group-hover:text-[#3B82F6] transition-colors leading-snug">
                  {res.title}
                </h3>
                <p className="text-sm text-[#0F1B3D]/55 leading-relaxed">
                  {res.desc}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
