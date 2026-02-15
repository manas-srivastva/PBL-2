import { useState, useCallback } from "react";
import { RefreshCw, Search, Zap } from "lucide-react";
import { allSeats, simulateUpdate } from "@/lib/mockData";
import DashboardHeader from "@/components/DashboardHeader";
import StatsBar from "@/components/StatsBar";
import SeatGrid from "@/components/SeatGrid";
import ZoneFilter from "@/components/FloorFilter";
import Legend from "@/components/Legend";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [seats, setSeats] = useState(allSeats);
  const [activeZone, setActiveZone] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = useCallback(() => {
    setIsSimulating(true);
    setSeats((prev) => simulateUpdate(prev));
    setTimeout(() => setIsSimulating(false), 600);
  }, []);

  const filteredForStats = activeZone === "all"
    ? seats
    : seats.filter((s) => s.zone === activeZone);

  return (
    <div className="min-h-screen bg-background subtle-gradient">
      <DashboardHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <StatsBar seats={filteredForStats} />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-60 shrink-0 flex flex-col gap-3 animate-fade-in">
            <ZoneFilter active={activeZone} onChange={setActiveZone} />

            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className={`
                glass-card-elevated flex items-center justify-center gap-2 px-4 py-3 
                text-sm font-semibold text-primary 
                hover:bg-accent active:scale-[0.97] transition-all duration-300
                ${isSimulating ? "opacity-70" : ""}
              `}
            >
              <RefreshCw className={`h-4 w-4 transition-transform duration-500 ${isSimulating ? "animate-spin" : ""}`} />
              Simulate Update
            </button>

            <div className="glass-card-elevated p-4 lg:block hidden">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 block">Legend</span>
              <Legend />
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 glass-card-elevated p-6 animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <h2 className="text-base font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Seat Map
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search seat…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-48 pl-9 text-xs rounded-xl bg-secondary/50 border-border/30 focus:bg-card transition-colors duration-200"
                  />
                </div>
                <div className="lg:hidden">
                  <Legend />
                </div>
              </div>
            </div>
            <SeatGrid seats={seats} activeZone={activeZone} searchQuery={searchQuery} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
