export type OrderStatus = "new" | "taken" | "completed";

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
  notes?: string;
  createdAt: string;
  takenAt?: string;
  takenBy?: string;
  completedAt?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}
