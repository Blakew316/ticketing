"use client";

import { events } from "@/lib/events-data";
import EventCard from "@/components/events/EventCard";
import { Search, Sparkles, Zap, Shield, Star } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative overflow-hidden animated-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-purple-600/20 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-light">
              <Sparkles className="h-4 w-4" />
              Live Events Near You
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
              <span className="gradient-text">Unforgettable</span>
              <br />
              <span className="text-foreground">Live Experiences</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted leading-relaxed">
              Discover and book the best seats for concerts, festivals, and
              live events. Choose your perfect view with our interactive seat
              map.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search events, artists, or venues..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-border bg-surface/80 py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted backdrop-blur-xl transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { icon: Zap, label: "Live Events", value: "200+" },
              { icon: Star, label: "5-Star Reviews", value: "50K+" },
              { icon: Shield, label: "Secure Booking", value: "100%" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto h-5 w-5 text-primary-light mb-1" />
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs text-muted">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <p className="text-sm text-muted mt-1">
              {filtered.length} event{filtered.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setGenreFilter(genre)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  genreFilter === genre
                    ? "bg-primary text-white"
                    : "bg-surface-light text-muted hover:bg-surface-lighter hover:text-foreground"
                }`}
              >
                {genre === "all" ? "All Genres" : genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted">
              No events found matching your search.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
