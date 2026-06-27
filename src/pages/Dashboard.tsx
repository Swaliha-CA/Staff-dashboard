import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, ListOrdered, Timer, TrendingUp, Utensils, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/cards/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { readyOrders, servedOrders } from "@/data/orders";
import { StatusBadge } from "@/components/ui/status-badge";
import { currentStaff } from "@/data/staff";

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard — Canteen Staff";
  }, []);

  const totalToday = readyOrders.length + servedOrders.length;
  const served = servedOrders.length;
  const ready = readyOrders.length;
  const completion = Math.round((served / totalToday) * 100);
  const recent = [...servedOrders].slice(0, 5);

  return (
    <AppShell title={`Hi, ${currentStaff.name.split(" ")[0]}`} subtitle="Here's today's overview">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Ready Orders" value={ready} hint="Awaiting pickup" Icon={Utensils} tone="primary" />
        <StatCard label="Orders Served Today" value={served} hint="Completed pickups" Icon={CheckCircle2} tone="success" />
        <StatCard label="Pending Pickups" value={ready} hint="Customers en route" Icon={Clock} tone="warning" />
        <StatCard label="Today's Orders" value={totalToday} hint="Across all counters" Icon={ListOrdered} tone="accent" />
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Avg. Prep Time" value="08m" hint="Per order" Icon={Timer} tone="primary" />
        <StatCard label="Completion Rate" value={`${completion}%`} hint="Of today's orders" Icon={TrendingUp} tone="success" />
        <StatCard label="Today's Summary" value={`₹${(served * 180).toLocaleString()}`} hint="Estimated revenue" Icon={Utensils} tone="accent" />
      </section>

      <Card className="mt-6 border-border/70 shadow-[var(--shadow-soft)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Recent Activity</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/history">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {recent.map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {o.customer} <span className="text-muted-foreground">· {o.token}</span>
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {o.items.length} item{o.items.length > 1 ? "s" : ""} · ₹{o.amount}
                </p>
              </div>
              <StatusBadge status={o.status} />
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
