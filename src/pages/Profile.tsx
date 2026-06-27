import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, LogOut, Mail, Phone, BadgeCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentStaff } from "@/data/staff";

export default function ProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile — Canteen Staff";
  }, []);

  const initials = currentStaff.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <AppShell title="Profile" subtitle="Your account">
      <Card className="border-border/70 shadow-[var(--shadow-soft)]">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-semibold text-primary-foreground shadow-[var(--shadow-elevated)]"
            style={{ backgroundImage: "var(--gradient-primary)" }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-foreground">{currentStaff.name}</h2>
            <p className="text-sm text-muted-foreground">{currentStaff.role}</p>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
              <BadgeCheck className="h-3.5 w-3.5" /> Active · {currentStaff.id}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 border-border/70 shadow-[var(--shadow-soft)]">
        <CardContent className="divide-y divide-border p-0">
          <Row Icon={Mail} label="Email" value={currentStaff.email} />
          <Row Icon={Phone} label="Phone" value={currentStaff.phone} />
        </CardContent>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button variant="outline">
          <KeyRound className="mr-2 h-4 w-4" /> Change Password
        </Button>
        <Button variant="destructive" onClick={() => navigate("/")}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </AppShell>
  );
}

function Row({
  Icon,
  label,
  value,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
