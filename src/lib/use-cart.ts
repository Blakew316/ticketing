"use client";

import { useSyncExternalStore } from "react";
import { cartStore } from "./cart-store";

export function useCart() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  return {
    items,
    count: items.length,
    total: items.reduce((sum, i) => sum + i.price, 0),
    add: cartStore.add,
    remove: cartStore.remove,
    clear: cartStore.clear,
    checkout: cartStore.checkout,
    getLastOrder: cartStore.getLastOrder,
  };
}
