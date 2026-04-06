"use client";

import { events } from "@/lib/events-data";
import EventCard from "@/components/events/EventCard";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");

  const genres = useMemo(
    () => ["all", ...new Set(events.map((e) => e.genre))],
    []
  );

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        search === "" ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.artist.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genreFilter === "all" || e.genre === genreFilter;
      return matchesSearch && matchesGenre;
    });
  }, [search, genreFilter]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface-light">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
              Find Your Perfect Seat
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base text-muted">
              Browse upcoming concerts and pick exactly where you want to be.
              Interactive seat maps with real-time availability.
            </p>

            <div className="mx-auto mt-8 max-w-md">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search events or artists..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-zinc-500 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <p className="text-sm text-muted mt-0.5">
              {filtered.length} event{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setGenreFilter(genre)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  genreFilter === genre
                    ? "bg-primary text-white"
                    : "bg-surface-light text-muted hover:text-foreground"
                }`}
              >
                {genre === "all" ? "All" : genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted">
            No events match your search.
          </div>
        )}
      </section>
    </>
  );
}
