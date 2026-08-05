"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  Globe,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PROBLEMS, CATEGORIES, type Problem } from "@/lib/problems-data";

const ITEMS_PER_PAGE = 9;

// Severity color
function severityColor(s: number) {
  if (s >= 8) return { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20", dot: "bg-red-500" };
  if (s >= 6) return { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20", dot: "bg-amber-500" };
  return { bg: "bg-yellow-500/10", text: "text-yellow-600", border: "border-yellow-500/20", dot: "bg-yellow-500" };
}

function scopeIcon(scope: string) {
  if (scope === "Global") return <Globe className="size-3" />;
  return <MapPin className="size-3" />;
}

// ─── Sidebar Component ───
function FilterSidebar({
  selectedCats,
  toggleCat,
  severityRange,
  setSeverityRange,
  scope,
  setScope,
  sort,
  setSort,
  searchQuery,
  setSearchQuery,
  activeFilterCount,
  clearFilters,
}: {
  selectedCats: Set<string>;
  toggleCat: (cat: string) => void;
  severityRange: number[];
  setSeverityRange: (v: number[]) => void;
  scope: string;
  setScope: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  activeFilterCount: number;
  clearFilters: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#0F1B3D]/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#0F1B3D]/10 bg-white text-sm text-[#0F1B3D] placeholder:text-[#0F1B3D]/30 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6]/30"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold text-[#0F1B3D]/50 uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCats.has(cat)}
                onCheckedChange={() => toggleCat(cat)}
                className="data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6]"
              />
              <span className="text-sm text-[#0F1B3D]/70 group-hover:text-[#0F1B3D] transition-colors leading-tight">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Severity */}
      <div>
        <h3 className="text-xs font-semibold text-[#0F1B3D]/50 uppercase tracking-wider mb-3">
          Severity ({severityRange[0]}–{severityRange[1]})
        </h3>
        <Slider
          value={severityRange}
          onValueChange={(v) => setSeverityRange(v as number[])}
          min={1}
          max={10}
          step={1}
          className="mt-2"
        />
        <div className="flex justify-between mt-1.5 text-xs text-[#0F1B3D]/30">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      {/* Scope */}
      <div>
        <h3 className="text-xs font-semibold text-[#0F1B3D]/50 uppercase tracking-wider mb-3">
          Scope
        </h3>
        <Select value={scope} onValueChange={setScope}>
          <SelectTrigger className="w-full border-[#0F1B3D]/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scopes</SelectItem>
            <SelectItem value="Local">Local</SelectItem>
            <SelectItem value="Regional">Regional</SelectItem>
            <SelectItem value="Global">Global</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold text-[#0F1B3D]/50 uppercase tracking-wider mb-3">
          Sort By
        </h3>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full border-[#0F1B3D]/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="severity-desc">Severity (High→Low)</SelectItem>
            <SelectItem value="severity-asc">Severity (Low→High)</SelectItem>
            <SelectItem value="population-desc">Population (High→Low)</SelectItem>
            <SelectItem value="title-asc">Title (A→Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors"
        >
          <X className="size-3.5" />
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  );
}

// ─── Problem Card ───
function ProblemCard({
  problem,
  index,
}: {
  problem: Problem;
  index: number;
}) {
  const sev = severityColor(problem.severity);

  return (
    <motion.article
      className="group bg-white rounded-xl border border-[#0F1B3D]/5 p-5 hover:shadow-lg hover:border-[#3B82F6]/15 transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      {/* Top: badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#3B82F6]/8 text-[#3B82F6] border border-[#3B82F6]/15">
          {problem.category}
        </span>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sev.bg} ${sev.text} border ${sev.border} flex items-center gap-1`}
        >
          <span className={`size-1.5 rounded-full ${sev.dot}`} />
          Sev {problem.severity}
        </span>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#0F1B3D]/5 text-[#0F1B3D]/50 flex items-center gap-1">
          {scopeIcon(problem.scope)}
          {problem.scope}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-[#0F1B3D] leading-snug mb-2 group-hover:text-[#3B82F6] transition-colors">
        {problem.title}
      </h3>

      {/* Description - 2 lines */}
      <p className="text-xs text-[#0F1B3D]/50 leading-relaxed line-clamp-2 mb-4 flex-1">
        {problem.description}
      </p>

      {/* Bottom meta */}
      <div className="flex items-center gap-3 text-xs text-[#0F1B3D]/40 mb-4">
        <span className="flex items-center gap-1">
          <Users className="size-3" />
          {problem.affectedPopulation}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="size-3" />
          {problem.regions.slice(0, 2).join(", ")}
          {problem.regions.length > 2 && ` +${problem.regions.length - 2}`}
        </span>
      </div>

      {/* Source + CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-[#0F1B3D]/5">
        <span className="text-[10px] font-medium text-[#0F1B3D]/30 uppercase tracking-wider">
          {problem.source}
        </span>
        <button className="text-xs font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors group/btn flex items-center gap-1">
          View brief
          <ChevronRight className="size-3 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}

// ─── Page ───
export default function SolveThemPage() {
  const [selectedCats, setSelectedCats] = React.useState<Set<string>>(new Set());
  const [severityRange, setSeverityRange] = React.useState([1, 10]);
  const [scope, setScope] = React.useState<string>("all");
  const [sort, setSort] = React.useState<string>("severity-desc");
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");

  const toggleCat = (cat: string) => {
    const next = new Set(selectedCats);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setSelectedCats(next);
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCats(new Set());
    setSeverityRange([1, 10]);
    setScope("all");
    setSearchQuery("");
    setPage(1);
  };

  const handleSeverityChange = (v: number[]) => {
    setSeverityRange(v);
    setPage(1);
  };

  const handleScopeChange = (v: string) => {
    setScope(v);
    setPage(1);
  };

  const handleSearchChange = (v: string) => {
    setSearchQuery(v);
    setPage(1);
  };

  // Filter + sort
  const filtered = React.useMemo(() => {
    let result = [...PROBLEMS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCats.size > 0) {
      result = result.filter((p) => selectedCats.has(p.category));
    }

    result = result.filter(
      (p) => p.severity >= severityRange[0] && p.severity <= severityRange[1]
    );

    if (scope !== "all") {
      result = result.filter((p) => p.scope === scope);
    }

    switch (sort) {
      case "severity-desc":
        result.sort((a, b) => b.severity - a.severity);
        break;
      case "severity-asc":
        result.sort((a, b) => a.severity - b.severity);
        break;
      case "population-desc":
        result.sort((a, b) =>
          b.affectedPopulation.localeCompare(a.affectedPopulation)
        );
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [selectedCats, severityRange, scope, sort, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const activeFilterCount =
    selectedCats.size +
    (severityRange[0] > 1 || severityRange[1] < 10 ? 1 : 0) +
    (scope !== "all" ? 1 : 0);

  const sidebarProps = {
    selectedCats,
    toggleCat,
    severityRange,
    setSeverityRange: handleSeverityChange,
    scope,
    setScope: handleScopeChange,
    sort,
    setSort,
    searchQuery,
    setSearchQuery: handleSearchChange,
    activeFilterCount,
    clearFilters,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB]">
      {/* Page Hero */}
      <section className="bg-[#0F1B3D] pt-20 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 text-xs font-medium text-[#93C5FD] mb-4">
            Solve Them
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            30+ real engineering{" "}
            <span className="text-[#3B82F6]">problems</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/50 max-w-xl">
            Curated from WHO, UN, IEA, and IPCC data. Filter, sort, and find
            the challenge that matches your skills.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-[#0F1B3D]/5 p-5 shadow-sm">
              <FilterSidebar {...sidebarProps} />
            </div>
          </aside>

          {/* Right: cards grid */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#0F1B3D]/50">
                Showing{" "}
                <span className="font-semibold text-[#0F1B3D]">
                  {filtered.length}
                </span>{" "}
                problem{filtered.length !== 1 ? "s" : ""}
              </p>

              {/* Mobile filter trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden border-[#0F1B3D]/10 text-[#0F1B3D]/70 gap-2"
                  >
                    <SlidersHorizontal className="size-3.5" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="size-4 rounded-full bg-[#3B82F6] text-white text-[10px] font-bold flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-4">
                    <FilterSidebar {...sidebarProps} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Cards grid */}
            {paged.length === 0 ? (
              <div className="text-center py-20">
                <Search className="size-10 text-[#0F1B3D]/15 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0F1B3D]/60">
                  No problems match your filters
                </h3>
                <p className="text-sm text-[#0F1B3D]/40 mt-2">
                  Try adjusting your category, severity, or scope selections.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-[#3B82F6] font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {paged.map((problem, i) => (
                  <ProblemCard key={problem.id} problem={problem} index={i} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 border-[#0F1B3D]/10"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      size="icon"
                      className={`size-9 ${
                        p === page
                          ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                          : "border-[#0F1B3D]/10 text-[#0F1B3D]/60"
                      }`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 border-[#0F1B3D]/10"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
