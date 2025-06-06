"use client";
import Link from "next/link";
import {
  Home,
  Image as ImageIcon,
  Database,
  CalendarClock,
  ListChecks,
  Settings,
  FlaskConical,
  LogOut,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SettingsDrawer from "./SettingsDrawer";
import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
};

function NavItem({ href, label, icon: Icon, active, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar({
  activePath,
  isAdmin,
  onLogout,
  closeDrawer,
}: {
  activePath: string;
  isAdmin: boolean;
  onLogout: () => void;
  closeDrawer?: () => void;
}) {
  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/media", label: "Media", icon: ImageIcon },
    { href: "/data", label: "Data", icon: Database },
    { href: "/scheduler", label: "Scheduler", icon: CalendarClock },
    { href: "/tasks", label: "Tasks", icon: ListChecks },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const adminLinks = [
    { href: "/admin", label: "Admin", icon: FlaskConical },
  ];

  return (
    <div className="flex flex-col h-full w-full min-w-[220px] bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="px-4 py-3 flex items-center justify-between border-b border-sidebar-border">
        <h1 className="text-lg font-semibold tracking-tight">SchedulerX</h1>
        <ThemeToggle />
      </div>
      <nav className="flex flex-col flex-1 gap-1 p-2">
        {links.map((l) => (
          <NavItem
            key={l.href}
            href={l.href}
            label={l.label}
            icon={l.icon}
            active={activePath === l.href || activePath.startsWith(l.href + "/")}
            onClick={closeDrawer}
          />
        ))}
        {isAdmin && (
          <>
            <hr className="my-3 border-sidebar-border" />
            {adminLinks.map((l) => (
              <NavItem
                key={l.href}
                href={l.href}
                label={l.label}
                icon={l.icon}
                active={activePath.startsWith(l.href)}
                onClick={closeDrawer}
              />
            ))}
          </>
        )}
        <hr className="my-3 border-sidebar-border" />
        <button
          onClick={() => {
            onLogout();
            if (closeDrawer) closeDrawer();
          }}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </button>
        <SettingsDrawer triggerClass="mt-2" />
      </nav>
    </div>
  );
}
