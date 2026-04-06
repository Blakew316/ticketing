"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ShoppingCart,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { getEvent } from "@/lib/events-data";
import { VenueRow, Seat } from "@/lib/types";
import SeatPicker from "@/components/venue/SeatPicker";
import { useCart } from "@/lib/use-cart";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface SelectedSeatInfo {
  seatId: string;
  rowLabel: string;
  seatNumber: number;
  price: number;
  tier: string;
}

export default function SeatSelectionPage() {
  const params = useParams();
  const router = useRouter();
  const event = getEvent(params.id as string);
  const cart = useCart();

  const [selectedSeats, setSelectedSeats] = useState<
    Map<string, SelectedSeatInfo>
  >(new Map());

  const selectedSeatIds = useMemo(
    () => new Set(selectedSeats.keys()),
    [selectedSeats]
  );

  const handleToggleSeat = useCallback(
    (fullId: string, row: VenueRow, seat: Seat) => {
      setSelectedSeats((prev) => {
        const next = new Map(prev);
        if (next.has(fullId)) {
          next.delete(fullId);
        } else {
          if (next.size >= 8) return prev;
          next.set(fullId, {
            seatId: fullId,
            rowLabel: row.label,
            seatNumber: seat.number,
            price: row.price,
            tier: row.tier,
          });
        }
        return next;
      });
    },
    []
  );

  const totalPrice = useMemo(
    () =>
      Array.from(selectedSeats.values()).reduce((sum, s) => sum + s.price, 0),
    [selectedSeats]
  );

  const handleAddToCart = useCallback(() => {
    if (!event) return;
    selectedSeats.forEach((info) => {
      cart.add({
        eventId: event.id,
        eventName: event.name,
        artist: event.artist,
        date: event.date,
        time: event.time,
        venue: event.venue.name,
        rowLabel: info.rowLabel,
        seatNumber: info.seatNumber,
        seatId: info.seatId,
        price: info.price,
        tier: info.tier,
      });
    });
    router.push("/checkout");
  }, [event, selectedSeats, cart, router]);

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Event Not Found</h2>
          <Link href="/" className="text-sm text-primary-light hover:underline">
            Back to events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to events
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{event.name}</h1>
            <p className="text-sm text-primary-light mt-0.5">{event.artist}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {event.venue.name}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted">
            Click seats to select &middot; Max 8 per order
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seat Map */}
        <div className="lg:col-span-2">
          <SeatPicker
            rows={event.venue.rows}
            selectedSeats={selectedSeatIds}
            onToggleSeat={handleToggleSeat}
          />
        </div>

        {/* Selection Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border border-border bg-surface-light p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Your Selection
            </h2>

            {selectedSeats.size === 0 ? (
              <div className="py-10 text-center text-sm text-muted">
                <ShoppingCart className="mx-auto h-8 w-8 mb-2 opacity-20" />
                <p>No seats selected</p>
                <p className="mt-1 text-xs text-zinc-600">
                  Pick your seats from the map
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {Array.from(selectedSeats.values()).map((info) => (
                    <motion.div
                      key={info.seatId}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      className="flex items-center justify-between rounded-lg bg-surface-lighter px-3 py-2.5"
                    >
                      <div className="text-sm">
                        <span className="font-medium">
                          Row {info.rowLabel}, Seat {info.seatNumber}
                        </span>
                        <span className="ml-2 text-xs text-muted capitalize">
                          {info.tier}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          ${info.price}
                        </span>
                        <button
                          onClick={() =>
                            setSelectedSeats((prev) => {
                              const next = new Map(prev);
                              next.delete(info.seatId);
                              return next;
                            })
                          }
                          className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted">
                      {selectedSeats.size} ticket
                      {selectedSeats.size > 1 ? "s" : ""}
                    </span>
                    <span className="text-lg font-bold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 mb-4">
                    + service fees at checkout
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAddToCart}
                    className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    Add to Cart & Checkout
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
