import type { OrderStatus } from "@/types";

const styles: Record<OrderStatus, string> = {
  ready: "bg-primary/10 text-primary ring-primary/20",
  preparing: "bg-warning/15 text-warning-foreground ring-warning/30",
  served: "bg-success/10 text-success ring-success/20",
  cancelled: "bg-destructive/10 text-destructive ring-destructive/20",
};

const labels: Record<OrderStatus, string> = {
  ready: "Ready",
  preparing: "Preparing",
  served: "Served",
  cancelled: "Cancelled",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
