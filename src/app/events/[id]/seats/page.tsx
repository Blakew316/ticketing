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
  Info,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { getEvent } from "@/lib/events-data";
import { Section, Row, Seat } from "@/lib/types";
import VenueMap from "@/components/venue/VenueMap";
import SeatGrid from "@/components/venue/SeatGrid";
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
  sectionId: string;
  sectionName: string;
  sectionType: string;
  rowLabel: string;
  seatNumber: number;
  price: number;
}

export default function SeatSelectionPage() {
  const params = useParams();
  const router = useRouter();
  const event = getEvent(params.id as string);
  const cart = useCart();

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Map<string, SelectedSeatInfo>>(new Map());

  const selectedSeatIds = useMemo(
    () => new Set(selectedSeats.keys()),
    [selectedSeats]
  );

  const handleToggleSeat = useCallback(
    (fullId: string, row: Row, seat: Seat) => {
      if (!selectedSection) return;
      setSelectedSeats((prev) => {
        const next = new Map(prev);
        if (next.has(fullId)) {
          next.delete(fullId);
        } else {
          if (next.size >= 8) return prev; // max 8 tickets
          next.set(fullId, {
            seatId: fullId,
            sectionId: selectedSection.id,
            sectionName: selectedSection.name,
            sectionType: selectedSection.type,
            rowLabel: row.label,
            seatNumber: seat.number,
            price: selectedSection.price,
          });
        }
        return next;
      });
    },
    [selectedSection]
  );

  const totalPrice = useMemo(
    () => Array.from(selectedSeats.values()).reduce((sum, s) => sum + s.price, 0),
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
        sectionName: info.sectionName,
        sectionType: info.sectionType,
        rowLabel: info.rowLabel,
        seatNumber: info.seatNumber,
        seatId: info.seatId,
        price: info.price,
      });
    });
    router.push("/checkout");
  }, [event, selectedSeats, cart, router]);

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
          <Link href="/" className="text-primary-light hover:underline">
            Back to events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Back nav + Event info */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to events
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{event.name}</h1>
            <p className="text-primary-light font-medium mt-1">{event.artist}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {event.venue.name}
              </span>
            </div>
          </div>
          <div className="text-sm text-muted flex items-start gap-1.5">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            Click a section on the map, then select your seats
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Venue map + Seat grid */}
        <div className="lg:col-span-2 space-y-6">
          {/* Venue Map */}
          <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
              Select a Section
            </h2>
            <VenueMap
              sections={event.venue.sections}
              selectedSectionId={selectedSection?.id ?? null}
              onSelectSection={setSelectedSection}
            />
          </div>

          {/* Seat Grid */}
          <AnimatePresence mode="wait">
            {selectedSection && (
              <SeatGrid
                key={selectedSection.id}
                section={selectedSection}
                selectedSeats={selectedSeatIds}
                onToggleSeat={handleToggleSeat}
                onClose={() => setSelectedSection(null)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right: Selection summary / mini-cart */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
              Your Selection
            </h2>

            {selectedSeats.size === 0 ? (
              <div className="py-8 text-center text-sm text-muted">
                <ShoppingCart className="mx-auto h-10 w-10 mb-3 opacity-30" />
                <p>No seats selected yet.</p>
                <p className="mt-1 text-xs">
                  Select a section and pick your seats.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {Array.from(selectedSeats.values()).map((info) => (
                    <motion.div
                      key={info.seatId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between rounded-lg bg-surface-light p-3"
                    >
                      <div className="text-sm">
                        <div className="font-medium">{info.sectionName}</div>
                        <div className="text-xs text-muted">
                          Row {info.rowLabel} &middot; Seat {info.seatNumber}
                        </div>
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
                          className="rounded-full p-1 text-muted hover:bg-danger/20 hover:text-danger transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
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
                    <span className="font-bold text-lg">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted mb-4">
                    <span>+ fees at checkout</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition-all hover:bg-primary-dark glow-primary"
                  >
                    Add to Cart & Checkout
                  </motion.button>
                </div>

                <p className="text-[10px] text-center text-muted mt-2">
                  Max 8 tickets per order
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
