import { Armchair, CheckCircle, Briefcase, Activity } from "lucide-react";
import type { Seat } from "@/lib/mockData";

interface StatsBarProps {
  seats: Seat[];
}

const StatsBar = ({ seats }: StatsBarProps) => {
  const total = seats.length;
  const available = seats.filter((s) => s.status === "available").length;
  const reserved = seats.filter((s) => s.status === "reserved").length;
  const occupied = seats.filter((s) => s.status === "occupied").length;
  const busyPercent = Math.round(((occupied + reserved) / total) * 100);

  const stats = [
    { label: "Total Seats", value: total, icon: Armchair, color: "text-foreground", accent: "bg-primary/8" },
    { label: "Available", value: available, icon: CheckCircle, color: "text-status-available", accent: "bg-status-available/8" },
    { label: "Bag Only", value: reserved, icon: Briefcase, color: "text-status-reserved", accent: "bg-status-reserved/8" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="glass-card-elevated p-4 flex items-start gap-3 group animate-slide-up"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
        >
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.accent} transition-transform duration-300 group-hover:scale-110`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted-foreground">{stat.label}</span>
            <span className={`text-2xl font-bold tracking-tight ${stat.color}`}>{stat.value}</span>
          </div>
        </div>
      ))}
      <div
        className="glass-card-elevated p-4 flex flex-col gap-2 animate-slide-up"
        style={{ animationDelay: "240ms", animationFillMode: "both" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-muted-foreground">Occupancy</span>
          <Activity className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-foreground">{busyPercent}%</span>
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${busyPercent}%`,
              background:
                busyPercent > 80
                  ? `linear-gradient(90deg, hsl(var(--status-occupied)), hsl(var(--status-occupied) / 0.7))`
                  : busyPercent > 50
                  ? `linear-gradient(90deg, hsl(var(--status-reserved)), hsl(var(--status-reserved) / 0.7))`
                  : `linear-gradient(90deg, hsl(var(--status-available)), hsl(var(--status-available) / 0.7))`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
