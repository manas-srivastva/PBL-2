import { Library, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const DashboardHeader = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-card/70 backdrop-blur-2xl">
    <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Library className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-tight text-foreground leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            LibSense
          </h1>
          <span className="hidden sm:block text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
            Real-Time Occupancy
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-status-available-bg/80 backdrop-blur-sm px-3 py-1.5 border border-status-available/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-live absolute inline-flex h-full w-full rounded-full bg-status-available opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-status-available" />
          </span>
          <span className="text-[11px] font-semibold text-status-available">Live</span>
        </div>
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default DashboardHeader;
