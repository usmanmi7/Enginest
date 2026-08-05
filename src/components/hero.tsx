"use client";

import * as React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F1B3D]">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none"
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-[#93C5FD]/8 blur-3xl pointer-events-none"
        animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[60%] left-[60%] w-64 h-64 rounded-full bg-[#3B82F6]/6 blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-4 py-1.5 text-sm font-medium text-[#93C5FD] backdrop-blur-sm">
            <Sparkles className="size-3.5 text-[#3B82F6]" />
            Engineering Innovation Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Find problems{" "}
          <span className="font-[family-name:var(--font-playfair)] italic text-[#93C5FD]">
            worth
          </span>{" "}
          <span className="text-[#3B82F6]">solving</span>
        </motion.h1>

        {/* Subtitle paragraph */}
        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Enginest curates real-world engineering challenges from industry and
          research, then uses AI to match them to your skills and interests — so
          you spend less time searching and more time innovating.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {/* Explore Problems - solid white */}
          <Button className="group h-12 px-8 bg-white text-[#0F1B3D] hover:bg-white/90 text-sm font-semibold shadow-xl shadow-white/10 transition-all hover:shadow-white/20 rounded-lg">
            Explore Problems
            <ArrowRight className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Try Innovation Engine - glass effect */}
          <button className="group relative h-12 px-8 rounded-lg text-sm font-semibold text-white border border-white/20 transition-all duration-300 hover:border-[#3B82F6]/50 hover:shadow-lg hover:shadow-[#3B82F6]/20 glass-button">
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="size-4 text-[#93C5FD] transition-transform group-hover:scale-110" />
              Try Innovation Engine
            </span>
          </button>
        </motion.div>

        {/* Social proof / trust hint */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-3 text-sm text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex -space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="size-7 rounded-full border-2 border-[#0F1B3D] bg-gradient-to-br from-[#3B82F6] to-[#93C5FD]"
                style={{ opacity: 0.4 + i * 0.12 }}
              />
            ))}
          </div>
          <span>Join 2,400+ engineers already innovating</span>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1B3D] to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
