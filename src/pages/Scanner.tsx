import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flashlight, Keyboard } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScannerFrame } from "@/components/scanner/ScannerFrame";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ScannerPage() {
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [manualId, setManualId] = useState("");

  useEffect(() => {
    document.title = "QR Scanner — Canteen Staff";
  }, []);

  return (
    <AppShell title="QR Scanner" subtitle="Point the camera at the customer's QR">
      <div className="mx-auto max-w-md">
        <ScannerFrame />
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant={flash ? "default" : "outline"}
            onClick={() => setFlash((f) => !f)}
            aria-pressed={flash}
          >
            <Flashlight className="mr-2 h-4 w-4" />
            Flash {flash ? "on" : "off"}
          </Button>
          <Button variant="outline" onClick={() => setManualOpen(true)}>
            <Keyboard className="mr-2 h-4 w-4" />
            Manual Entry
          </Button>
        </div>
        <Card className="mt-6 border-border/70 p-4 text-sm text-muted-foreground shadow-[var(--shadow-soft)]">
          Tip: ensure the QR is well-lit and within the frame for the fastest scan.
        </Card>
      </div>

      <Dialog open={manualOpen} onOpenChange={setManualOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter order ID</DialogTitle>
            <DialogDescription>
              Type the order ID from the customer's receipt (e.g. ORD-2001).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="manualId">Order ID</Label>
            <Input
              id="manualId"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              placeholder="ORD-2001"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setManualOpen(false)}>Cancel</Button>
            <Button
              disabled={!manualId.trim()}
              onClick={() => {
                setManualOpen(false);
                navigate(`/verify/${manualId.trim()}`);
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
