"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import {
  LayoutDashboard,
  UsersRound,
  Dumbbell,
  ClipboardList,
  LineChart,
  Database,
  BarChart,
  Settings,
  User,
  Target,
} from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function DashboardSidebar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { t } = useLanguage()

  const items = [
    {
      href: "/dashboard",
      title: "Home",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/users",
      title: "Users",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/groups",
      title: "Groups",
      icon: <UsersRound className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/programs",
      title: "Programs",
      icon: <Dumbbell className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/assignments",
      title: "Assignments",
      icon: <ClipboardList className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/evaluations",
      title: "Αξιολόγηση",
      icon: <Target className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/tests",
      title: "Tests",
      icon: <LineChart className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/exercises",
      title: "Exercises",
      icon: <Database className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/results",
      title: "Results",
      icon: <BarChart className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/settings",
      title: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      <SidebarNav items={items} />
    </nav>
  )
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
