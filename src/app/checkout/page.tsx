"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Trash2,
  CreditCard,
  Lock,
  Ticket,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/use-cart";

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const serviceFee = cart.count * 12.5;
  const total = cart.total + serviceFee;

  const handleCheckout = async () => {
    if (!name.trim() || !email.trim()) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    cart.checkout(name, email);
    router.push("/confirmation");
  };

  if (cart.count === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-zinc-700 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-sm text-muted mb-6">
            Find an event and choose your seats.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Continue shopping
      </Link>

      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Tickets */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            Your Tickets ({cart.count})
          </h2>

          <AnimatePresence>
            {cart.items.map((item) => (
              <motion.div
                key={item.seatId}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="rounded-lg border border-border bg-surface-light p-4 flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                  <Ticket className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.eventName}</div>
                  <div className="text-xs text-primary-light">
                    {item.artist}
                  </div>
                  <div className="text-xs text-muted mt-1">
                    Row {item.rowLabel} &middot; Seat {item.seatNumber}
                    <span className="ml-1 capitalize text-zinc-500">
                      ({item.tier})
                    </span>
                  </div>
                  <div className="text-xs text-muted">
                    {item.venue} &middot; {item.date} at {item.time}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold text-sm">
                    ${item.price.toFixed(2)}
                  </div>
                  <button
                    onClick={() => cart.remove(item.seatId)}
                    className="mt-1 text-xs text-zinc-500 hover:text-danger transition-colors inline-flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" /> Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-20 rounded-xl border border-border bg-surface-light p-5 space-y-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Tickets ({cart.count})</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Service fees</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={processing || !name.trim() || !email.trim()}
              onClick={handleCheckout}
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Complete Purchase &mdash; ${total.toFixed(2)}
                </>
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-600">
              <Lock className="h-3 w-3" />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
