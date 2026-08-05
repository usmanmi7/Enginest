"use client";

import { motion } from "framer-motion";
import { Bot, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIAssistantCTA() {
  return (
    <section className="bg-[#F5F7FB] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - AI chat preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#0F1B3D] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#0F1B3D]/20 border border-white/5">
              {/* Chat header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="size-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
                  <Bot className="size-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Enginest AI
                  </div>
                  <div className="text-xs text-white/40">
                    Innovation Assistant
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs text-[#10B981]">Active</span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-4">
                {/* User */}
                <div className="flex justify-end">
                  <div className="bg-[#3B82F6]/20 text-white/90 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">
                    I&apos;m a mechanical engineer interested in renewable energy.
                    What problems fit me?
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white/90 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[85%] leading-relaxed">
                    <p className="mb-3">
                      Based on your profile, here are your top matches:
                    </p>
                    {/* Match cards */}
                    <div className="space-y-2">
                      <div className="bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-lg px-3 py-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-white/80">
                          Offshore wind turbine blade recycling
                        </span>
                        <span className="text-xs font-bold text-[#3B82F6]">
                          92%
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-white/80">
                          Solar tracker mechanism optimization
                        </span>
                        <span className="text-xs font-bold text-[#10B981]">
                          87%
                        </span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-white/80">
                          Hydrogen storage tank design
                        </span>
                        <span className="text-xs font-bold text-[#F59E0B]">
                          84%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div
              className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#3B82F6]/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* Right - CTA text */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 text-xs font-medium text-[#3B82F6] mb-4">
              <Sparkles className="size-3" />
              AI-Powered Matching
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B3D] tracking-tight leading-tight">
              Your AI copilot for{" "}
              <span className="text-[#3B82F6]">problem solving</span>
            </h2>
            <p className="mt-5 text-base text-[#0F1B3D]/60 leading-relaxed">
              Tell the AI Assistant your skills and interests. It searches our
              entire problem database, computes match scores, and surfaces the
              challenges where you&apos;ll have the highest impact — instantly.
            </p>
            <p className="mt-3 text-base text-[#0F1B3D]/60 leading-relaxed">
              Get personalized recommendations, explore solution approaches, and
              find teammates — all through natural conversation.
            </p>
            <Button className="mt-8 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium px-6 shadow-lg shadow-[#3B82F6]/25 group">
              Try AI Assistant
              <ArrowRight className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
