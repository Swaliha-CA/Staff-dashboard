import type { Order } from "@/types";

const firstNames = [
  "Aarav", "Diya", "Ishaan", "Mira", "Kabir", "Anaya", "Vihaan", "Riya",
  "Arjun", "Saira", "Yash", "Tara", "Reyansh", "Aditi", "Kian", "Zoya",
];
const itemPool = [
  { name: "Veg Sandwich", price: 60 },
  { name: "Masala Dosa", price: 90 },
  { name: "Cold Coffee", price: 70 },
  { name: "Paneer Roll", price: 110 },
  { name: "French Fries", price: 80 },
  { name: "Chicken Burger", price: 140 },
  { name: "Cheese Maggi", price: 75 },
  { name: "Lemon Iced Tea", price: 50 },
];
const notesPool = [
  undefined,
  undefined,
  "Less spicy please",
  "Extra cheese",
  "No onions",
  undefined,
];

function seedRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function makeOrder(i: number): Order {
  const r = seedRand(i * 17 + 3);
  const itemCount = 1 + Math.floor(r() * 3);
  const items = Array.from({ length: itemCount }, () => {
    const it = itemPool[Math.floor(r() * itemPool.length)];
    return { ...it, quantity: 1 + Math.floor(r() * 3) };
  });
  const amount = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const name = firstNames[Math.floor(r() * firstNames.length)];
  const tokenNum = 100 + i;
  // Sequential ascending timestamps so FIFO is deterministic.
  const baseMin = 0 + i * 7;
  const hour = 10 + Math.floor(baseMin / 60);
  const min = (baseMin % 60).toString().padStart(2, "0");
  const created = `2026-06-28T${hour.toString().padStart(2, "0")}:${min}:00`;
  return {
    id: `ORD-${(2000 + i).toString()}`,
    token: `T${tokenNum}`,
    customer: name,
    phone: `+91 9${Math.floor(100000000 + r() * 899999999)}`,
    items,
    amount,
    status: "new",
    notes: notesPool[i % notesPool.length],
    createdAt: created,
  };
}

export const seedOrders: Order[] = Array.from({ length: 10 }, (_, i) => makeOrder(i));
