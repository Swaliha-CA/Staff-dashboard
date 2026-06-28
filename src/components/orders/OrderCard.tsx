import { memo } from "react";
import { Clock, StickyNote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Order } from "@/types";

interface OrderCardProps {
  order: Order;
  queueNumber: number;
  onTake?: (id: string) => void;
  onComplete?: (id: string) => void;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function OrderCardBase({ order, queueNumber, onTake, onComplete }: OrderCardProps) {
  const totalQty = order.items.reduce((s, i) => s + i.quantity, 0);
  return (
    <Card className="border-border/70 shadow-[var(--shadow-soft)]">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-stretch sm:justify-between">
        <div className="flex items-start gap-4 min-w-0">
          <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
            <span className="text-[10px] font-medium leading-none">Queue</span>
            <span className="text-base font-semibold leading-none">#{queueNumber}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-foreground">
                {order.customer}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">{order.token}</span>
              <StatusBadge status={order.status} />
            </div>
            <ul className="mt-2 space-y-0.5 text-sm text-foreground">
              {order.items.map((it, idx) => (
                <li key={`${order.id}-${idx}`} className="flex items-baseline justify-between gap-3">
                  <span className="truncate">{it.name}</span>
                  <span className="font-medium text-muted-foreground">× {it.quantity}</span>
                </li>
              ))}
            </ul>
            {order.notes ? (
              <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{order.notes}</span>
              </p>
            ) : null}
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Ordered at {formatTime(order.createdAt)} · {totalQty} item{totalQty > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-end justify-end sm:items-center">
          {order.status === "new" && onTake ? (
            <Button size="sm" onClick={() => onTake(order.id)}>
              Take Order
            </Button>
          ) : null}
          {order.status === "taken" && onComplete ? (
            <Button size="sm" variant="default" onClick={() => onComplete(order.id)}>
              Completed
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export const OrderCard = memo(OrderCardBase);
