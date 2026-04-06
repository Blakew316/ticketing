"use client";

import { VenueRow, Seat } from "@/lib/types";
import { motion } from "framer-motion";
import { useRef } from "react";

const TIER_COLORS: Record<string, string> = {
  vip: "#2563eb",
  premium: "#3b82f6",
  standard: "#60a5fa",
  balcony: "#93c5fd",
};

const TIER_LABELS: Record<string, string> = {
  vip: "VIP",
  premium: "Premium",
  standard: "Standard",
  balcony: "Balcony",
};

interface SeatPickerProps {
  rows: VenueRow[];
  selectedSeats: Set<string>;
  onToggleSeat: (fullId: string, row: VenueRow, seat: Seat) => void;
}

export default function SeatPicker({
  rows,
  selectedSeats,
  onToggleSeat,
}: SeatPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maxSeats = Math.max(...rows.map((r) => r.seats.length));

  // Group rows by tier for dividers
  let currentTier = "";

  return (
    <div className="rounded-xl border border-border bg-surface-light overflow-hidden">
      {/* Stage */}
      <div className="flex justify-center pt-8 pb-6 px-4">
        <div className="relative">
          <div className="w-64 sm:w-80 h-10 rounded-t-[100%] bg-zinc-800 border border-zinc-700 flex items-end justify-center pb-1.5">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
              Stage
            </span>
          </div>
          <div className="w-64 sm:w-80 h-1 bg-primary/40 rounded-b-sm" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 pb-5 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-white" />
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-zinc-700" />
          Taken
        </span>
      </div>

      {/* Seat Grid */}
      <div ref={containerRef} className="overflow-x-auto pb-6 px-4">
        <div className="flex flex-col gap-[5px] min-w-fit mx-auto" style={{ maxWidth: maxSeats * 22 + 60 }}>
          {rows.map((row) => {
            const showTierLabel = row.tier !== currentTier;
            if (showTierLabel) currentTier = row.tier;

            return (
              <div key={row.id}>
                {showTierLabel && (
                  <div className="flex items-center gap-3 py-2 mt-1">
                    <div className="h-px flex-1 bg-border" />
                    <span
                      className="text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: TIER_COLORS[row.tier] }}
                    >
                      {TIER_LABELS[row.tier]} &mdash; ${row.price}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <span className="w-5 text-right text-[10px] font-mono text-zinc-500 shrink-0">
                    {row.label}
                  </span>

                  <div className="flex gap-[3px] justify-center flex-1">
                    {row.seats.map((seat) => {
                      const fullId = `${row.id}-${seat.id}`;
                      const isSelected = selectedSeats.has(fullId);
                      const isAvailable = seat.status === "available";
                      const canInteract = isAvailable || isSelected;

                      let bg: string;
                      if (isSelected) {
                        bg = "#ffffff";
                      } else if (isAvailable) {
                        bg = TIER_COLORS[row.tier];
                      } else {
                        bg = "#27272a";
                      }

                      return (
                        <motion.button
                          key={seat.id}
                          disabled={!canInteract}
                          onClick={() => onToggleSeat(fullId, row, seat)}
                          whileHover={canInteract ? { scale: 1.4 } : undefined}
                          whileTap={canInteract ? { scale: 0.9 } : undefined}
                          className={`h-[18px] w-[18px] rounded-[3px] transition-colors ${
                            canInteract
                              ? "cursor-pointer"
                              : "cursor-not-allowed opacity-40"
                          }`}
                          style={{ backgroundColor: bg }}
                          title={`Row ${row.label}, Seat ${seat.number}${
                            isSelected
                              ? " (Selected)"
                              : isAvailable
                              ? ` — $${row.price}`
                              : ` (${seat.status})`
                          }`}
                        >
                          {isSelected && (
                            <span className="flex items-center justify-center text-[9px] font-bold text-zinc-900">
                              ✓
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <span className="w-5 text-left text-[10px] font-mono text-zinc-500 shrink-0">
                    {row.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
