"use client";

import { motion } from "framer-motion";
import { Hammer, Lightbulb, Globe } from "lucide-react";

export function AboutSection() {
  return (
    <section className="bg-[#0F1B3D] py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 text-xs font-medium text-[#93C5FD] mb-6">
              About Enginest
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Built by engineers,{" "}
              <span className="text-[#93C5FD] font-[family-name:var(--font-playfair)] italic">
                for builders
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-lg">
              We started Enginest because we saw brilliant engineers spending
              more time searching for the right problems than solving them. The
              world&apos;s hardest challenges — climate adaptation, water
              scarcity, energy access — need skilled minds, not just good
              intentions.
            </p>
            <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed max-w-lg">
              Our platform bridges the gap between global problem spaces and
              engineering talent, using AI to match skills to impact so you can
              start innovating on day one.
            </p>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative grid grid-cols-2 gap-4">
              {/* Stat card 1 */}
              <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Globe className="size-6 text-[#3B82F6] mb-3" />
                <div className="text-2xl font-bold text-white">5B+</div>
                <div className="text-sm text-white/50 mt-1">
                  People impacted by problems in our database
                </div>
              </div>
              {/* Stat card 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Hammer className="size-6 text-[#10B981] mb-3" />
                <div className="text-2xl font-bold text-white">12K+</div>
                <div className="text-sm text-white/50 mt-1">
                  Engineers on the platform
                </div>
              </div>
              {/* Stat card 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Lightbulb className="size-6 text-[#F59E0B] mb-3" />
                <div className="text-2xl font-bold text-white">850+</div>
                <div className="text-sm text-white/50 mt-1">
                  Solutions started
                </div>
              </div>
            </div>
            {/* Glow */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
