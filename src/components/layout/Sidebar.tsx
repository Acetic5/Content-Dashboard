"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Instagram,
  BarChart3,
  CalendarDays,
  Swords,
  Newspaper,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navItems = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Instagram",
    href: "/instagram",
    icon: Instagram,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Content Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Competitor Tracker",
    href: "/competitors",
    icon: Swords,
  },
  {
    label: "News Consolidator",
    href: "/news",
    icon: Newspaper,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
          <LayoutDashboard className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-semibold tracking-wide text-foreground">
          ContentHub
        </span>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 text-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-sidebar-border" />

      <div className="p-4">
        <p className="text-xs text-muted-foreground/50">ContentHub v0.1.0</p>
      </div>
    </aside>
  );
}
