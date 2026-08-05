"use client";

import * as React from "react";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Problem Discovery", href: "#" },
      { label: "AI Innovation Engine", href: "#" },
      { label: "Playbooks", href: "#" },
      { label: "Engineering Resources", href: "#" },
      { label: "Team Templates", href: "#" },
      { label: "AI Assistant", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Twitter / X", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Partnerships", href: "#" },
    ],
  },
] as const;

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#0a1628] border-t border-white/5">
      {/* Newsletter bar */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Stay in the loop
              </h3>
              <p className="mt-1 text-sm text-white/50">
                Get new challenges and platform updates delivered weekly.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full sm:w-auto gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-10 px-4 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6]/50 w-full sm:w-64 transition-colors"
                required
              />
              <Button
                type="submit"
                className="h-10 px-5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium shrink-0 shadow-lg shadow-[#3B82F6]/20"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <a href="/" className="flex items-center gap-2 group">
              <div className="size-8 rounded-lg bg-[#3B82F6] flex items-center justify-center">
                <Zap className="size-4 text-white fill-white/30" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Enginest
              </span>
            </a>
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-[200px]">
              Find problems worth solving. Engineering innovation powered by AI.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white/80 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} Enginest. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
