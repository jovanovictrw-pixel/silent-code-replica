interface CategoryFiltersProps {
  onFilterChange?: (filter: string) => void;
}

export function CategoryFilters({ onFilterChange }: CategoryFiltersProps) {
  const filters = ["ALL_SYSTEMS", "NEW_DROPS", "PRICE_ASC", "PRICE_DESC", "BUNDLES_ONLY"];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="sc-glass bg-white/5 border-white/10 backdrop-blur-2xl px-6 py-3 flex items-center gap-6 shadow-2xl">
        <div className="hidden md:flex items-center gap-2 pr-4 border-r border-white/10">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-[9px] font-heading tracking-[0.3em] text-white/40">FILTER_ENGINE</span>
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange?.(filter)}
              className="text-[10px] font-heading tracking-widest text-white/60 hover:text-white transition-colors whitespace-nowrap px-2 py-1"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="hidden md:block pl-4 border-l border-white/10">
          <span className="text-[9px] font-heading tracking-[0.3em] text-white/20">v4.0.2</span>
        </div>
      </div>
    </div>
  );
}
