"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClosingCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background image simulation with gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0F1B3D 0%, #0a1628 30%, #131f42 60%, #0F1B3D 100%)",
        }}
      />
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cta-dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Ready to find problems{" "}
            <span className="font-[family-name:var(--font-playfair)] italic text-[#93C5FD]">
              worth
            </span>{" "}
            <span className="text-[#3B82F6]">solving</span>?
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Join thousands of engineers who are already making an impact. Start
            with a free account and discover your first challenge today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="group h-12 px-8 bg-white text-[#0F1B3D] hover:bg-white/90 text-sm font-semibold shadow-xl shadow-white/10 rounded-lg">
              Get Started Free
              <ArrowRight className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
            <button className="group relative h-12 px-8 rounded-lg text-sm font-semibold text-white border border-white/20 transition-all duration-300 hover:border-[#3B82F6]/50 hover:shadow-lg hover:shadow-[#3B82F6]/20 glass-button">
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Demo
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
