import type { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { TopBar } from "./TopBar";

interface AppShellProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function AppShell({ title, subtitle, action, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title={title} subtitle={subtitle} action={action} />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <BottomNavigation />
    </div>
  );
}
