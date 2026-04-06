"use client";

import Link from "next/link";
import { ShoppingCart, Ticket } from "lucide-react";
import { useCart } from "@/lib/use-cart";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Ticket className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            StagePass
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Events
          </Link>
          <span className="text-sm text-muted/40 cursor-default">Venues</span>
          <span className="text-sm text-muted/40 cursor-default">Artists</span>
        </nav>

        <Link
          href="/checkout"
          className="relative flex items-center gap-2 rounded-lg bg-surface-light px-3.5 py-2 text-sm transition-colors hover:bg-surface-lighter"
        >
          <ShoppingCart className="h-4 w-4 text-muted" />
          <span className="hidden sm:inline text-muted">Cart</span>
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
    </header>
  );
}
