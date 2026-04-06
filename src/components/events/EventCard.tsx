"use client";

import Link from "next/link";
import { Calendar, Clock, MapPin, Music } from "lucide-react";
import { Event } from "@/lib/types";
import { motion } from "framer-motion";

const genreGradients: Record<string, string> = {
  "Electronic / Synth-Pop": "from-violet-600 via-purple-600 to-fuchsia-600",
  "Indie Rock": "from-orange-600 via-red-600 to-pink-600",
  "R&B / Soul": "from-amber-600 via-orange-500 to-rose-600",
  "Hard Rock / Metal": "from-gray-700 via-red-900 to-gray-900",
  "Classical / Orchestral": "from-blue-600 via-indigo-600 to-violet-600",
  "EDM / Bass": "from-cyan-500 via-blue-600 to-purple-700",
};

const genreIcons: Record<string, string> = {
  "Electronic / Synth-Pop": "🎹",
  "Indie Rock": "🎸",
  "R&B / Soul": "🎤",
  "Hard Rock / Metal": "🤘",
  "Classical / Orchestral": "🎻",
  "EDM / Bass": "🎧",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventCard({
  event,
  index,
}: {
  event: Event;
  index: number;
}) {
  const gradient =
    genreGradients[event.genre] || "from-indigo-600 to-purple-600";
  const icon = genreIcons[event.genre] || "🎵";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={event.status === "sold-out" ? "#" : `/events/${event.id}/seats`}>
        <div
          className={`group relative overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
            event.status === "sold-out" ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {/* Gradient Banner */}
          <div
            className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/20" />
            <span className="relative text-7xl transition-transform duration-500 group-hover:scale-125">
              {icon}
            </span>
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              {event.status === "on-sale" && (
                <span className="rounded-full bg-success/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  On Sale
                </span>
              )}
              {event.status === "few-left" && (
                <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm animate-pulse">
                  Few Left!
                </span>
              )}
              {event.status === "sold-out" && (
                <span className="rounded-full bg-danger/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  Sold Out
                </span>
              )}
            </div>
            {/* Price Range */}
            <div className="absolute bottom-3 left-3">
              <span className="rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                ${event.priceRange.min} — ${event.priceRange.max}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="text-lg font-bold leading-tight group-hover:text-primary-light transition-colors">
              {event.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-primary-light">
              {event.artist}
            </p>

            <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(event.date)}</span>
                <Clock className="ml-2 h-3.5 w-3.5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {event.venue.name} &middot; {event.venue.city},{" "}
                  {event.venue.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="h-3.5 w-3.5" />
                <span>{event.genre}</span>
              </div>
            </div>

            {event.status !== "sold-out" && (
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted">
                  Choose your seats
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary-light transition-colors group-hover:bg-primary group-hover:text-white">
                  Get Tickets →
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
