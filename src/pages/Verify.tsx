import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft, Phone, User } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { findOrder } from "@/data/orders";

export default function VerifyPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = findOrder(id);
  const [verified, setVerified] = useState(false);
  const [served, setServed] = useState(false);

  useEffect(() => {
    document.title = "Verify Order — Canteen Staff";
  }, []);

  if (!order) {
    return (
      <AppShell title="Order not found">
        <Card className="border-border/70 p-8 text-center shadow-[var(--shadow-soft)]">
          <p className="text-sm text-muted-foreground">
            We couldn't find an order with ID <span className="font-mono">{id}</span>.
          </p>
          <Button asChild className="mt-4">
            <Link to="/orders">Back to Ready Orders</Link>
          </Button>
        </Card>
      </AppShell>
    );
  }

  if (served) {
    return (
      <AppShell title="Order Served">
        <Card className="mx-auto max-w-lg border-border/70 p-8 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-foreground">Order Served Successfully</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {order.id} · {order.token} · {order.customer}
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link to="/orders">Back to Ready Orders</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/history">View History</Link>
            </Button>
          </div>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Verify Order"
      subtitle={`${order.id} · ${order.token}`}
      action={
        <Button variant="ghost" size="sm" onClick={() => navigate("/orders")}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/70 shadow-[var(--shadow-soft)] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Ordered Items</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border p-0">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 px-6 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{it.name}</p>
                  <p className="text-xs text-muted-foreground">₹{it.price} each</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">× {it.quantity}</p>
                  <p className="text-xs text-muted-foreground">₹{it.price * it.quantity}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm font-medium text-muted-foreground">Total</span>
              <span className="text-lg font-semibold text-foreground">₹{order.amount}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="text-base">Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{order.customer}</p>
                <p className="text-xs text-muted-foreground">Token {order.token}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" /> {order.phone}
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <label className="flex items-start gap-3 text-sm">
                <Checkbox
                  checked={verified}
                  onCheckedChange={(v) => setVerified(v === true)}
                  aria-label="I verified the customer"
                  className="mt-0.5"
                />
                <span className="text-foreground">
                  I verified the customer's identity and order details.
                </span>
              </label>
            </div>
            <Button className="w-full" disabled={!verified} onClick={() => setServed(true)}>
              Serve Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
