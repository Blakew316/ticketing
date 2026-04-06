"use client";

import { CartItem, TicketOrder } from "./types";

type Listener = () => void;

let cart: CartItem[] = [];
let lastOrder: TicketOrder | null = null;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return cart;
  },
  getServerSnapshot() {
    return cart;
  },
  add(item: CartItem) {
    if (cart.find((c) => c.seatId === item.seatId)) return;
    cart = [...cart, item];
    emit();
  },
  remove(seatId: string) {
    cart = cart.filter((c) => c.seatId !== seatId);
    emit();
  },
  clear() {
    cart = [];
    emit();
  },
  getTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
  },
  checkout(name: string, email: string): TicketOrder {
    const order: TicketOrder = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price, 0),
      purchasedAt: new Date().toISOString(),
      name,
      email,
    };
    lastOrder = order;
    cart = [];
    emit();
    return order;
  },
  getLastOrder() {
    return lastOrder;
  },
};
