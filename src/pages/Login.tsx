import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const navigate = useNavigate();
  const [staffId, setStaffId] = useState("STF-001");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Staff Login — Canteen";
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      navigate("/dashboard");
    }, 400);
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{ background: "radial-gradient(1200px 600px at 0% 0%, oklch(0.95 0.05 285 / 0.6), transparent 60%), radial-gradient(900px 500px at 100% 100%, oklch(0.92 0.07 305 / 0.6), transparent 55%), var(--background)" }}
    >
      <Card className="w-full max-w-md border-border/60 shadow-[var(--shadow-elevated)]">
        <CardHeader className="items-center text-center">
          <div
            className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl text-primary-foreground shadow-[var(--shadow-elevated)]"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <Utensils className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Canteen Staff</CardTitle>
          <CardDescription>Sign in to manage today's orders</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="staffId">Staff ID</Label>
              <Input
                id="staffId"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="STF-001"
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Demo only — any credentials work
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
