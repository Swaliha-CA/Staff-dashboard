export type OrderStatus = "ready" | "preparing" | "served" | "cancelled";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  token: string;
  customer: string;
  phone: string;
  items: OrderItem[];
  amount: number;
  status: OrderStatus;
  createdAt: string;
  servedAt?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}
