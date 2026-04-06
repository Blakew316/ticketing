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
    // Simulate processing
    await new Promise((r) => setTimeout(r, 2000));
    cart.checkout(name, email);
    router.push("/confirmation");
  };

  if (cart.count === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted/30 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted mb-6">Find an event and choose your seats!</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-colors"
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
        <ArrowLeft className="h-4 w-4" /> Continue shopping
      </Link>

      <h1 className="text-3xl font-extrabold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Tickets list */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">
            Your Tickets ({cart.count})
          </h2>

          <AnimatePresence>
            {cart.items.map((item) => (
              <motion.div
                key={item.seatId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="rounded-xl border border-border bg-surface p-4 flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                  <Ticket className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{item.eventName}</div>
                  <div className="text-sm text-primary-light">{item.artist}</div>
                  <div className="text-xs text-muted mt-1">
                    {item.sectionName} &middot; Row {item.rowLabel} &middot;
                    Seat {item.seatNumber}
                  </div>
                  <div className="text-xs text-muted">
                    {item.venue} &middot; {item.date} at {item.time}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold">${item.price.toFixed(2)}</div>
                  <button
                    onClick={() => cart.remove(item.seatId)}
                    className="mt-1 text-xs text-muted hover:text-danger transition-colors inline-flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" /> Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order summary + Form */}
        <div className="lg:col-span-2">
          <div className="sticky top-20 rounded-2xl border border-border bg-surface p-5 space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">
                  Tickets ({cart.count})
                </span>
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
                <label className="block text-xs font-medium text-muted mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-border bg-surface-light px-3 py-2.5 text-sm placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-border bg-surface-light px-3 py-2.5 text-sm placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={processing || !name.trim() || !email.trim()}
              onClick={handleCheckout}
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-dark glow-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Complete Purchase — ${total.toFixed(2)}
                </>
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted">
              <Lock className="h-3 w-3" />
              Secure checkout — SSL encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
