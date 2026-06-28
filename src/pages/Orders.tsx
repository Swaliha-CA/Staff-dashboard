import { useCallback, useEffect, useMemo } from "react";
import { CheckCircle2, ClipboardList, ListOrdered, Utensils } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/cards/StatCard";
import { OrderCard } from "@/components/orders/OrderCard";
import { Card } from "@/components/ui/card";
import { useOrders, takeOrder, completeOrder } from "@/store/ordersStore";
import { currentStaff } from "@/data/staff";

export default function OrdersPage() {
  const orders = useOrders();

  useEffect(() => {
    document.title = "Orders Queue — Canteen Staff";
  }, []);

  const active = useMemo(
    () =>
      orders
        .filter((o) => o.status !== "completed")
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [orders],
  );

  const stats = useMemo(() => {
    const newCount = orders.filter((o) => o.status === "new").length;
    const takenCount = orders.filter((o) => o.status === "taken").length;
    const completedCount = orders.filter((o) => o.status === "completed").length;
    return { newCount, takenCount, completedCount, activeCount: active.length };
  }, [orders, active.length]);

  const handleTake = useCallback((id: string) => {
    takeOrder(id, currentStaff.name);
  }, []);
  const handleComplete = useCallback((id: string) => {
    completeOrder(id);
  }, []);

  return (
    <AppShell
      title="Orders Queue"
      subtitle="First come, first served"
    >
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Active Orders" value={stats.activeCount} Icon={Utensils} tone="primary" />
        <StatCard label="Orders Taken" value={stats.takenCount} Icon={ClipboardList} tone="warning" />
        <StatCard label="Completed Today" value={stats.completedCount} Icon={CheckCircle2} tone="success" />
        <StatCard label="Pending Queue" value={stats.newCount} Icon={ListOrdered} tone="accent" />
      </section>

      <section className="mt-6 space-y-3">
        {active.length === 0 ? (
          <Card className="border-border/70 p-10 text-center shadow-[var(--shadow-soft)]">
            <p className="text-sm text-muted-foreground">
              The queue is empty. New orders will appear here automatically.
            </p>
          </Card>
        ) : (
          active.map((o, idx) => (
            <OrderCard
              key={o.id}
              order={o}
              queueNumber={idx + 1}
              onTake={handleTake}
              onComplete={handleComplete}
            />
          ))
        )}
      </section>
    </AppShell>
  );
}
