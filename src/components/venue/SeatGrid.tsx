"use client";

import { Section, Seat, Row } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SeatGridProps {
  section: Section;
  selectedSeats: Set<string>;
  onToggleSeat: (seatId: string, row: Row, seat: Seat) => void;
  onClose: () => void;
}

function getSeatColor(status: string, isSelected: boolean) {
  if (isSelected) return "#6366f1";
  switch (status) {
    case "available":
      return "#22d3ee";
    case "reserved":
      return "#71717a";
    case "sold":
      return "#3f3f46";
    default:
      return "#3f3f46";
  }
}

export default function SeatGrid({
  section,
  selectedSeats,
  onToggleSeat,
  onClose,
}: SeatGridProps) {
  const maxSeatsInRow = Math.max(...section.rows.map((r) => r.seats.length));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="rounded-2xl border border-border bg-surface p-4 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold" style={{ color: section.color }}>
            {section.name}
          </h3>
          <p className="text-sm text-muted">
            ${section.price} per ticket &middot;{" "}
            {section.rows.reduce(
              (sum, r) =>
                sum + r.seats.filter((s) => s.status === "available").length,
              0
            )}{" "}
            available
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-muted hover:bg-surface-lighter hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Mini stage indicator */}
      <div className="flex justify-center mb-6">
        <div className="rounded-t-xl bg-primary/20 border border-primary/40 px-12 py-1.5 text-[10px] font-bold tracking-widest text-primary-light uppercase">
          Stage
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ background: "#22d3ee" }} />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ background: "#6366f1" }} />
          Selected
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ background: "#71717a" }} />
          Reserved
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ background: "#3f3f46" }} />
          Sold
        </div>
      </div>

      {/* Seat Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex flex-col gap-1.5 min-w-full">
          {section.rows.map((row) => (
            <div
              key={row.id}
              className="flex items-center gap-1"
            >
              <span className="w-6 text-right text-[10px] font-mono font-bold text-muted shrink-0">
                {row.label}
              </span>
              <div
                className="flex gap-1 justify-center flex-1"
                style={{ minWidth: maxSeatsInRow * 22 }}
              >
                {row.seats.map((seat) => {
                  const fullId = `${section.id}-${row.id}-${seat.id}`;
                  const isSelected = selectedSeats.has(fullId);
                  const isAvailable = seat.status === "available";

                  return (
                    <motion.button
                      key={seat.id}
                      disabled={!isAvailable && !isSelected}
                      onClick={() => onToggleSeat(fullId, row, seat)}
                      whileHover={
                        isAvailable ? { scale: 1.3, y: -2 } : undefined
                      }
                      whileTap={isAvailable ? { scale: 0.9 } : undefined}
                      className={`h-5 w-5 rounded-[3px] text-[8px] font-bold transition-colors ${
                        isAvailable || isSelected
                          ? "cursor-pointer hover:shadow-lg"
                          : "cursor-not-allowed"
                      } ${isSelected ? "ring-2 ring-white ring-offset-1 ring-offset-surface" : ""}`}
                      style={{
                        backgroundColor: getSeatColor(seat.status, isSelected),
                      }}
                      title={`Row ${row.label}, Seat ${seat.number} — ${
                        isSelected
                          ? "Selected"
                          : seat.status === "available"
                          ? `$${section.price}`
                          : seat.status
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center text-white"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              <span className="w-6 text-left text-[10px] font-mono font-bold text-muted shrink-0">
                {row.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
