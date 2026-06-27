import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListOrdered, ScanLine, History, User } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

interface NavItem {
  to: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const items: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/orders", label: "Orders", Icon: ListOrdered },
  { to: "/scanner", label: "Scanner", Icon: ScanLine },
  { to: "/history", label: "History", Icon: History },
  { to: "/profile", label: "Profile", Icon: User },
];

export function BottomNavigation() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <ul className="mx-auto flex max-w-3xl items-stretch justify-between px-2">
        {items.map(({ to, label, Icon }) => {
          const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`group flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-8 w-12 items-center justify-center rounded-full transition-all ${
                    active ? "bg-primary/10" : "group-hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
