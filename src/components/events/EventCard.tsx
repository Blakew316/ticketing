"use client";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/lib/types";
import { motion } from "framer-motion";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function EventCard({
  event,
  index,
}: {
  event: Event;
  index: number;
}) {
  const isSoldOut = event.status === "sold-out";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={isSoldOut ? "#" : `/events/${event.id}/seats`}>
        <div
          className={`group relative overflow-hidden rounded-xl border border-border bg-surface-light transition-all duration-200 hover:border-zinc-600 hover:bg-surface-lighter ${
            isSoldOut ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-primary to-primary-light" />

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-primary-light mb-1">
                  {event.genre}
                </p>
                <h3 className="text-base font-semibold leading-snug truncate">
                  {event.name}
                </h3>
                <p className="text-sm text-muted mt-0.5">{event.artist}</p>
              </div>

              {/* Status */}
              <div className="shrink-0">
                {event.status === "on-sale" && (
                  <span className="rounded-md bg-success/10 px-2 py-1 text-[11px] font-medium text-success">
                    On Sale
                  </span>
                )}
                {event.status === "few-left" && (
                  <span className="rounded-md bg-amber-500/10 px-2 py-1 text-[11px] font-medium text-amber-400">
                    Few Left
                  </span>
                )}
                {event.status === "sold-out" && (
                  <span className="rounded-md bg-zinc-500/10 px-2 py-1 text-[11px] font-medium text-zinc-500">
                    Sold Out
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {formatDate(event.date)} &middot; {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {event.venue.name}
              </span>
            </div>

            {!isSoldOut && (
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold">
                  ${event.priceRange.min} &ndash; ${event.priceRange.max}
                </span>
                <span className="text-xs font-medium text-primary-light group-hover:text-primary transition-colors">
                  Get Tickets &rarr;
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
