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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/20 mb-6"
        >
          <CheckCircle className="h-10 w-10 text-success" />
        </motion.div>
        <h1 className="text-3xl font-extrabold mb-2">You&apos;re All Set!</h1>
        <p className="text-muted">
          Order <span className="font-mono font-bold text-foreground">{order.id}</span> confirmed
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface-light px-4 py-2 text-sm text-muted">
          <Mail className="h-4 w-4" />
          Confirmation sent to{" "}
          <span className="font-medium text-foreground">{order.email}</span>
        </div>
      </motion.div>

      {/* Tickets */}
      <div className="space-y-3 mb-8">
        {order.items.map((item, i) => (
          <motion.div
            key={item.seatId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="relative overflow-hidden rounded-xl border border-border bg-surface"
          >
            {/* Ticket stub design */}
            <div className="flex">
              <div className="flex-1 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold">{item.eventName}</div>
                    <div className="text-sm text-primary-light">
                      {item.artist}
                    </div>
                    <div className="mt-1 text-xs text-muted">
                      {item.date} at {item.time}
                    </div>
                    <div className="text-xs text-muted">{item.venue}</div>
                  </div>
                </div>
              </div>
              {/* Dotted separator */}
              <div className="flex flex-col items-center justify-center w-0 border-l border-dashed border-border" />
              <div className="w-32 shrink-0 p-4 flex flex-col items-center justify-center text-center">
                <div className="text-xs text-muted uppercase font-bold tracking-wider">
                  {item.sectionName}
                </div>
                <div className="text-lg font-extrabold mt-1">
                  {item.rowLabel}{item.seatNumber}
                </div>
                <div className="text-xs text-muted mt-1">
                  Row {item.rowLabel} · Seat {item.seatNumber}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-border bg-surface p-5 mb-8"
      >
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted">Tickets ({order.items.length})</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted">Service fees</span>
          <span>${(order.items.length * 12.5).toFixed(2)}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
          <span>Total Paid</span>
          <span>${(order.total + order.items.length * 12.5).toFixed(2)}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface-light px-6 py-3 text-sm font-medium hover:bg-surface-lighter transition-colors">
          <Download className="h-4 w-4" />
          Download Tickets
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-colors"
        >
          Browse More Events
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
