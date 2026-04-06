"use client";

import Link from "next/link";
import { ShoppingCart, Music, Ticket } from "lucide-react";
import { useCart } from "@/lib/use-cart";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-transform group-hover:scale-110">
            <Ticket className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">StagePass</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Events
          </Link>
          <span className="text-sm font-medium text-muted/50 cursor-default">
            Venues
          </span>
          <span className="text-sm font-medium text-muted/50 cursor-default">
            Artists
          </span>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/checkout"
            className="relative flex items-center gap-2 rounded-full bg-surface-light px-4 py-2 text-sm font-medium transition-all hover:bg-surface-lighter"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </header>
  );
}
