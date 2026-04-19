import Link from "next/link";
import {
  Instagram,
  BarChart3,
  CalendarDays,
  Swords,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = [
  {
    label: "Instagram Manager",
    description: "Schedule posts, manage drafts, and track published content.",
    href: "/instagram",
    icon: Instagram,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    label: "Analytics",
    description: "Track engagement, reach, and audience growth over time.",
    href: "/analytics",
    icon: BarChart3,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Content Calendar",
    description: "Plan and visualize your content publishing schedule.",
    href: "/calendar",
    icon: CalendarDays,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    label: "Competitor Tracker",
    description: "Monitor competitors' content strategies and benchmarks.",
    href: "/competitors",
    icon: Swords,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "News Consolidator",
    description: "Aggregate industry news and trending topics in one place.",
    href: "/news",
    icon: Newspaper,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function OverviewPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome to ContentHub. Select a section to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.href}
              className="group transition-colors hover:border-border/80 hover:bg-card/80"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${section.bg}`}>
                    <Icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                </div>
                <CardTitle className="mt-3 text-base">{section.label}</CardTitle>
                <CardDescription className="text-sm">
                  {section.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" size="sm" className="w-full justify-between">
                  <Link href={section.href}>
                    Open {section.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
