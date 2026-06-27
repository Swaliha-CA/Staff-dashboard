import type { Order } from "@/types";

const firstNames = ["Aarav", "Diya", "Ishaan", "Mira", "Kabir", "Anaya", "Vihaan", "Riya", "Arjun", "Saira", "Yash", "Tara", "Reyansh", "Aditi", "Kian", "Zoya", "Aryan", "Nisha", "Vivaan", "Esha"];
const itemPool = [
  { name: "Veg Sandwich", price: 60 },
  { name: "Masala Dosa", price: 90 },
  { name: "Cold Coffee", price: 70 },
  { name: "Paneer Roll", price: 110 },
  { name: "French Fries", price: 80 },
  { name: "Chicken Burger", price: 140 },
  { name: "Cheese Maggi", price: 75 },
  { name: "Lemon Iced Tea", price: 50 },
  { name: "Pasta Alfredo", price: 130 },
  { name: "Samosa (2 pc)", price: 30 },
];

function seedRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function makeOrder(i: number, status: "ready" | "served"): Order {
  const r = seedRand(i * 13 + (status === "ready" ? 1 : 999));
  const itemCount = 1 + Math.floor(r() * 3);
  const items = Array.from({ length: itemCount }, () => {
    const it = itemPool[Math.floor(r() * itemPool.length)];
    return { ...it, quantity: 1 + Math.floor(r() * 3) };
  });
  const amount = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const name = firstNames[Math.floor(r() * firstNames.length)];
  const tokenNum = 100 + Math.floor(r() * 900);
  const idPrefix = status === "ready" ? "ORD" : "SRV";
  const hour = status === "ready" ? 11 + Math.floor(r() * 3) : 9 + Math.floor(r() * 4);
  const min = Math.floor(r() * 60).toString().padStart(2, "0");
  const created = `2026-06-27T${hour.toString().padStart(2, "0")}:${min}:00`;
  return {
    id: `${idPrefix}-${(2000 + i).toString()}`,
    token: `T${tokenNum}`,
    customer: name,
    phone: `+91 9${Math.floor(100000000 + r() * 899999999)}`,
    items,
    amount,
    status,
    createdAt: created,
    servedAt: status === "served" ? created : undefined,
  };
}

export const readyOrders: Order[] = Array.from({ length: 20 }, (_, i) => makeOrder(i, "ready"));
export const servedOrders: Order[] = Array.from({ length: 20 }, (_, i) => makeOrder(i, "served"));
export const allOrders: Order[] = [...readyOrders, ...servedOrders];

export function findOrder(id: string): Order | undefined {
  return allOrders.find((o) => o.id === id);
}
