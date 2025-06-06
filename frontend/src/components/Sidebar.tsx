"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SettingsDrawer from "./SettingsDrawer";

function NavItem({ icon, label, href, active, onClick }: { icon: string; label: string; href: string; active?: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded transition-colors font-medium text-white hover:bg-gray-800 ${active ? "bg-gray-800" : ""}`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar({ activePath, isAdmin, onLogout, closeDrawer }: { activePath: string; isAdmin: boolean; onLogout: () => void; closeDrawer?: () => void }) {
  return (
    <div className="flex flex-col h-full w-full min-w-[220px] bg-gray-900 p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">SchedulerX</h1>
        <ThemeToggle />
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        <NavItem icon="📂" label="Media" href="/media" active={activePath.startsWith("/media")} onClick={closeDrawer} />
        <NavItem icon="🗓️" label="Scheduler" href="/scheduler" active={activePath.startsWith("/scheduler")} onClick={closeDrawer} />
        <NavItem icon="⚙️" label="Pipeline" href="/pipeline" active={activePath.startsWith("/pipeline")} onClick={closeDrawer} />
        <NavItem icon="📊" label="Logs" href="/analytics" active={activePath.startsWith("/analytics")} onClick={closeDrawer} />
        <hr className="my-3 border-gray-700" />
        <NavItem icon="👤" label="Account" href="/account" active={activePath.startsWith("/account")} onClick={closeDrawer} />
        {isAdmin && <NavItem icon="🧪" label="Dev Tools" href="/tools" active={activePath.startsWith("/tools")} onClick={closeDrawer} />}
        <hr className="my-3 border-gray-700" />
        <button
          onClick={() => { onLogout(); if (closeDrawer) closeDrawer(); }}
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition-colors text-white font-medium"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
        <SettingsDrawer triggerClass="mt-2" />
      </nav>
    </div>
  );
}
