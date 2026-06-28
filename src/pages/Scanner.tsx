import { useEffect, useState } from "react";
import { CheckCircle2, Flashlight, Keyboard, ScanLine } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScannerFrame } from "@/components/scanner/ScannerFrame";
import { StatusBadge } from "@/components/ui/status-badge";
import { findOrder, completeOrder, useOrders } from "@/store/ordersStore";
import type { Order } from "@/types";

export default function ScannerPage() {
  const [flash, setFlash] = useState(false);
  const [token, setToken] = useState("");
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [matchedId, setMatchedId] = useState<string | null>(null);
  const [justCompleted, setJustCompleted] = useState<Order | null>(null);

  // Subscribe so the matched order updates when state changes.
  const orders = useOrders();
  const matched = matchedId ? orders.find((o) => o.id === matchedId) ?? null : null;

  useEffect(() => {
    document.title = "QR Scanner — Canteen Staff";
  }, []);

  function handleVerify() {
    setError(null);
    setJustCompleted(null);
    const query = token.trim() || orderId.trim();
    if (!query) {
      setError("Enter a token number or order ID to verify.");
      setMatchedId(null);
      return;
    }
    const found = findOrder(query);
    if (!found) {
      setError(`No order found for "${query}".`);
      setMatchedId(null);
      return;
    }
    setMatchedId(found.id);
  }

  function handleComplete() {
    if (!matched) return;
    completeOrder(matched.id);
    setJustCompleted({ ...matched, status: "completed" });
    setMatchedId(null);
    setToken("");
    setOrderId("");
  }

  function resetManual() {
    setMatchedId(null);
    setJustCompleted(null);
    setError(null);
    setToken("");
    setOrderId("");
  }

  return (
    <AppShell title="QR Scanner" subtitle="Scan or enter a token to verify an order">
      <div className="mx-auto max-w-xl">
        <Tabs defaultValue="scan" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scan">
              <ScanLine className="mr-2 h-4 w-4" /> Scan QR
            </TabsTrigger>
            <TabsTrigger value="manual">
              <Keyboard className="mr-2 h-4 w-4" /> Manual Entry
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="mt-4">
            <ScannerFrame />
            <div className="mt-6 flex justify-center">
              <Button
                variant={flash ? "default" : "outline"}
                onClick={() => setFlash((f) => !f)}
                aria-pressed={flash}
              >
                <Flashlight className="mr-2 h-4 w-4" />
                Flash {flash ? "on" : "off"}
              </Button>
            </div>
            <Card className="mt-6 border-border/70 p-4 text-sm text-muted-foreground shadow-[var(--shadow-soft)]">
              Tip: align the customer's QR code inside the frame. Switch to Manual Entry if scanning fails.
            </Card>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <Card className="border-border/70 shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="text-base">Manual Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token">Token Number</Label>
                  <Input
                    id="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="T100"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderId">
                    Order ID <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="ORD-2001"
                    autoComplete="off"
                  />
                </div>
                {error ? (
                  <p className="text-sm text-destructive" role="alert">{error}</p>
                ) : null}
                <div className="flex gap-2">
                  <Button onClick={handleVerify} className="flex-1">Verify</Button>
                  <Button variant="outline" onClick={resetManual}>Reset</Button>
                </div>
              </CardContent>
            </Card>

            {matched ? (
              <Card className="border-border/70 shadow-[var(--shadow-soft)]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base">
                    {matched.customer} · <span className="font-mono text-sm">{matched.token}</span>
                  </CardTitle>
                  <StatusBadge status={matched.status} />
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="divide-y divide-border rounded-lg border border-border">
                    {matched.items.map((it, idx) => (
                      <li key={`${matched.id}-item-${idx}`} className="flex items-center justify-between px-4 py-2 text-sm">
                        <span>{it.name}</span>
                        <span className="text-muted-foreground">× {it.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-semibold">₹{matched.amount}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleComplete}
                    disabled={matched.status === "completed"}
                  >
                    Complete Order
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            {justCompleted ? (
              <Card className="border-success/40 bg-success/5 shadow-[var(--shadow-soft)]">
                <CardContent className="flex items-center gap-3 p-4 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>
                    Order <span className="font-mono">{justCompleted.id}</span> for{" "}
                    {justCompleted.customer} marked as completed.
                  </span>
                </CardContent>
              </Card>
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
