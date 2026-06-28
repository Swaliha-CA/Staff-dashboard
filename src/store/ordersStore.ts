import { useSyncExternalStore } from "react";
import type { Order } from "@/types";
import { seedOrders } from "@/data/orders";

let orders: Order[] = [...seedOrders];
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return orders;
}

export function useOrders(): Order[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function findOrder(idOrToken: string): Order | undefined {
  const q = idOrToken.trim().toLowerCase();
  return orders.find(
    (o) => o.id.toLowerCase() === q || o.token.toLowerCase() === q,
  );
}

export function takeOrder(id: string, staffName: string) {
  orders = orders.map((o) =>
    o.id === id && o.status === "new"
      ? { ...o, status: "taken", takenAt: new Date().toISOString(), takenBy: staffName }
      : o,
  );
  emit();
}

export function completeOrder(id: string) {
  orders = orders.map((o) =>
    o.id === id && o.status !== "completed"
      ? { ...o, status: "completed", completedAt: new Date().toISOString() }
      : o,
  );
  emit();
}

export function addOrder(order: Order) {
  orders = [...orders, order];
  emit();
}
