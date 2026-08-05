"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { StatsStrip } from "@/components/stats-strip";
import { PartnersRow } from "@/components/partners-row";
import { ServiceCards } from "@/components/service-cards";
import { AboutSection } from "@/components/about-section";
import { HowWeWork } from "@/components/how-we-work";
import { AIAssistantCTA } from "@/components/ai-assistant-cta";
import { Testimonials } from "@/components/testimonials";
import { ResourceCards } from "@/components/resource-cards";
import { ClosingCTA } from "@/components/closing-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F1B3D]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsStrip />
        <PartnersRow />
        <ServiceCards />
        <AboutSection />
        <HowWeWork />
        <AIAssistantCTA />
        <Testimonials />
        <ResourceCards />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
