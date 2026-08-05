"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  BookOpen,
  FolderOpen,
  Users,
  Bot,
} from "lucide-react";

const SERVICES = [
  {
    icon: Search,
    title: "Problem Discovery",
    desc: "Browse curated engineering challenges from climate, health, infrastructure, and energy — each scoped with real-world context and impact data.",
    color: "#3B82F6",
  },
  {
    icon: Sparkles,
    title: "AI Innovation Engine",
    desc: "Get AI-matched problem recommendations based on your expertise, interests, and past work. Our engine learns what drives you.",
    color: "#8B5CF6",
  },
  {
    icon: BookOpen,
    title: "Build Playbooks",
    desc: "Step-by-step solution frameworks for each challenge type. Start with proven approaches, then iterate with your own insights.",
    color: "#10B981",
  },
  {
    icon: FolderOpen,
    title: "Engineering Resources",
    desc: "Datasets, standards, research papers, and simulation tools organized by problem domain — everything you need in one place.",
    color: "#F59E0B",
  },
  {
    icon: Users,
    title: "Team Templates",
    desc: "Pre-configured team structures with role definitions, collaboration workflows, and skill gap analysis for each challenge.",
    color: "#EC4899",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    desc: "A conversational partner that understands engineering constraints, suggests approaches, and helps you navigate complexity in real time.",
    color: "#06B6D4",
  },
] as const;

export function ServiceCards() {
  return (
    <section className="bg-[#F5F7FB] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-[#0F1B3D] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything you need to{" "}
            <span className="text-[#3B82F6]">innovate</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-base sm:text-lg text-[#0F1B3D]/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A complete platform from discovery to deployment — powered by AI at
            every step.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#0F1B3D]/5 hover:border-[#3B82F6]/20 overflow-hidden"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: svc.color }}
                />

                <div
                  className="size-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${svc.color}15` }}
                >
                  <Icon
                    className="size-5"
                    style={{ color: svc.color }}
                  />
                </div>

                <h3 className="text-lg font-semibold text-[#0F1B3D] mb-3 group-hover:text-[#3B82F6] transition-colors">
                  {svc.title}
                </h3>

                <p className="text-sm text-[#0F1B3D]/60 leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
