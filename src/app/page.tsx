"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F1B3D]">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
