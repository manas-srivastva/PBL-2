import { useRef, useEffect } from "react";
import { Check, User, Briefcase } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Seat } from "@/lib/mockData";

interface SeatCardProps {
  seat: Seat;
  highlighted?: boolean;
}

const statusConfig = {
  available: {
    bg: "bg-status-available-bg",
    border: "border-status-available/25",
    icon: Check,
    iconColor: "text-status-available",
    glow: "shadow-[0_0_12px_-3px_hsl(var(--status-available)/0.3)]",
  },
  occupied: {
    bg: "bg-status-occupied-bg",
    border: "border-status-occupied/25",
    icon: User,
    iconColor: "text-status-occupied",
    glow: "shadow-[0_0_12px_-3px_hsl(var(--status-occupied)/0.3)]",
  },
  reserved: {
    bg: "bg-status-reserved-bg",
    border: "border-status-reserved/25",
    icon: Briefcase,
    iconColor: "text-status-reserved",
    glow: "shadow-[0_0_12px_-3px_hsl(var(--status-reserved)/0.3)]",
  },
};

const SeatCard = ({ seat, highlighted = false }: SeatCardProps) => {
  const config = statusConfig[seat.status];
  const Icon = config.icon;
  const prevStatus = useRef(seat.status);
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prevStatus.current !== seat.status && cardRef.current) {
      cardRef.current.classList.add("seat-flip");
      const timer = setTimeout(() => cardRef.current?.classList.remove("seat-flip"), 500);
      prevStatus.current = seat.status;
      return () => clearTimeout(timer);
    }
  }, [seat.status]);

  useEffect(() => {
    if (highlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [highlighted]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          ref={cardRef}
          className={`
            relative flex flex-col items-center justify-center gap-1 
            rounded-xl border p-3 transition-all duration-300 ease-out
            hover:scale-110 cursor-pointer
            ${config.bg} ${config.border}
            hover:${config.glow}
            ${highlighted ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 z-10 shimmer-highlight" : ""}
          `}
          style={{ perspective: "600px" }}
        >
          <Icon className={`h-4.5 w-4.5 ${config.iconColor} transition-transform duration-300`} />
          <span className="text-[10px] font-semibold text-muted-foreground tracking-wide">
            {seat.id.split("-").pop()}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent
        className="bg-card/95 backdrop-blur-xl border-border/40 p-3 rounded-xl"
        sideOffset={8}
      >
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-foreground">Seat {seat.id}</span>
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${config.bg} border ${config.border}`} />
            <span className="text-[11px] text-muted-foreground capitalize">{seat.status}</span>
          </div>
          <span className="text-[10px] text-muted-foreground/70">
            Updated {seat.lastUpdated}
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default SeatCard;
