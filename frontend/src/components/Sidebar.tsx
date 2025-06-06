"use client";
import Link from "next/link";

interface SidebarProps {
  activePath: string;
  onLogout: () => void;
  closeDrawer?: () => void;
}

const navLinks = [
  { href: "/", label: "Home", icon: "🏡" },
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/analytics", label: "Analytics", icon: "📊" },
  { href: "/media", label: "Media", icon: "🖼️" },
  { href: "/media-upload", label: "Upload Media", icon: "⬆️" },
  { href: "/data", label: "Data Browser", icon: "📁" },
  { href: "/scheduler", label: "Scheduler", icon: "⏰" },
  { href: "/tasks", label: "Tasks", icon: "📝" },
  { href: "/admin", label: "Admin", icon: "🛠️" },
];

export default function Sidebar({ activePath, onLogout, closeDrawer }: SidebarProps) {
  return (
    <nav className="flex flex-col h-full w-64 bg-gray-900 text-white p-4 border-r border-gray-800">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:underline focus:outline-none">
          SchedulerX
        </Link>
        {closeDrawer && (
          <button
            onClick={closeDrawer}
            className="md:hidden p-2 rounded hover:bg-gray-800"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        )}
      </div>
      <ul className="flex-1 space-y-2">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                activePath === link.href || (link.href !== "/" && activePath.startsWith(link.href))
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={closeDrawer}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-2">
        <button
          onClick={() => {
            if (closeDrawer) closeDrawer();
            onLogout();
          }}
          className="w-full px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
