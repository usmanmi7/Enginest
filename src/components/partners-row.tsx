"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  { name: "WHO", full: "World Health Organization" },
  { name: "UN", full: "United Nations" },
  { name: "UNICEF", full: "UNICEF" },
  { name: "IEA", full: "Intl. Energy Agency" },
  { name: "IPCC", full: "IPCC" },
  { name: "World Bank", full: "World Bank" },
] as const;

export function PartnersRow() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm font-medium text-[#0F1B3D]/40 uppercase tracking-widest mb-8">
          Trusted by global organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-center gap-2 group cursor-default">
                <div className="size-8 rounded-md bg-[#0F1B3D]/5 flex items-center justify-center group-hover:bg-[#0F1B3D]/10 transition-colors">
                  <span className="text-[10px] font-bold text-[#0F1B3D]/60">
                    {partner.name.slice(0, 2)}
                  </span>
                </div>
                <span className="text-sm sm:text-base font-semibold text-[#0F1B3D]/50 group-hover:text-[#0F1B3D]/70 transition-colors">
                  {partner.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
