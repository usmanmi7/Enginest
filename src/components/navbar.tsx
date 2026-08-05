"use client";

import * as React from "react";
import { Menu, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NAV_LINKS = [
  { label: "Resources", href: "#" },
  { label: "Solve Them", href: "/solve-them" },
  { label: "AI Assistant", href: "#" },
  { label: "About", href: "#" },
] as const;

const MORE_LINKS = [
  { label: "Success Stories", href: "#" },
  { label: "Careers", href: "#" },
  { label: "FAQ", href: "#" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F1B3D]/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="relative flex size-8 items-center justify-center rounded-lg bg-[#3B82F6] transition-transform group-hover:scale-105">
            <Zap className="size-4 text-white fill-white/30" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Enginest
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}

          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/5 outline-none">
                More
                <ChevronDown className="size-3.5 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 bg-[#0F1B3D]/95 backdrop-blur-md border-white/10"
            >
              {MORE_LINKS.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  className="text-white/80 hover:text-white focus:bg-white/10 focus:text-white cursor-pointer"
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-sm font-medium text-white/80 hover:text-white hover:bg-white/5"
          >
            Sign In
          </Button>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium px-5 shadow-lg shadow-[#3B82F6]/25 transition-all hover:shadow-[#3B82F6]/40">
            Get Started
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#0F1B3D] border-white/10 w-[280px]"
          >
            <SheetHeader>
              <SheetTitle className="text-white flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-md bg-[#3B82F6]">
                  <Zap className="size-3.5 text-white fill-white/30" />
                </div>
                Enginest
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="more" className="border-white/10">
                  <AccordionTrigger className="text-sm font-medium text-white/80 hover:text-white py-2.5 hover:no-underline">
                    More
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-0.5 pl-2">
                      {MORE_LINKS.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="px-3 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/5"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  Sign In
                </Button>
                <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-[#3B82F6]/25">
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
