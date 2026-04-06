"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Download, Ticket, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { cartStore } from "@/lib/cart-store";
import { TicketOrder } from "@/lib/types";

export default function ConfirmationPage() {
  const router = useRouter();
  const [order, setOrder] = useState<TicketOrder | null>(null);

  useEffect(() => {
    const o = cartStore.getLastOrder();
    if (!o) {
      router.push("/");
      return;
    }
    setOrder(o);
  }, [router]);

  if (!order) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success/10 mb-5"
        >
          <CheckCircle className="h-8 w-8 text-success" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-1">You&apos;re All Set</h1>
        <p className="text-sm text-muted">
          Order{" "}
          <span className="font-mono font-semibold text-foreground">
            {order.id}
          </span>{" "}
          confirmed
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted">
          <Mail className="h-3 w-3" />
          Sent to {order.email}
        </div>
      </motion.div>

      {/* Tickets */}
      <div className="space-y-2 mb-8">
        {order.items.map((item, i) => (
          <motion.div
            key={item.seatId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="rounded-lg border border-border bg-surface-light"
          >
            <div className="flex">
              <div className="flex-1 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                    <Ticket className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.eventName}</div>
                    <div className="text-xs text-primary-light">
                      {item.artist}
                    </div>
                    <div className="mt-1 text-xs text-muted">
                      {item.date} at {item.time} &middot; {item.venue}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-0 border-l border-dashed border-border" />
              <div className="w-28 shrink-0 p-4 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] text-muted uppercase font-semibold tracking-wider capitalize">
                  {item.tier}
                </div>
                <div className="text-base font-bold mt-0.5">
                  {item.rowLabel}
                  {item.seatNumber}
                </div>
                <div className="text-[10px] text-muted mt-0.5">
                  Row {item.rowLabel} &middot; Seat {item.seatNumber}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-lg border border-border bg-surface-light p-5 mb-8"
      >
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted">Tickets ({order.items.length})</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted">Service fees</span>
          <span>${(order.items.length * 12.5).toFixed(2)}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-bold">
          <span>Total Paid</span>
          <span>${(order.total + order.items.length * 12.5).toFixed(2)}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface-light px-5 py-2.5 text-sm font-medium hover:bg-surface-lighter transition-colors">
          <Download className="h-4 w-4" />
          Download Tickets
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          Browse More Events
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
