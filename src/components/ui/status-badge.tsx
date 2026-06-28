import type { OrderStatus } from "@/types";

const styles: Record<OrderStatus, string> = {
  new: "bg-primary/10 text-primary ring-primary/20",
  taken: "bg-warning/15 text-warning-foreground ring-warning/30",
  completed: "bg-success/10 text-success ring-success/20",
};

const labels: Record<OrderStatus, string> = {
  new: "New",
  taken: "Taken",
  completed: "Completed",
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
