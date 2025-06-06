"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  };

  const noSidebar = pathname === "/login";

  if (noSidebar) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Static sidebar for desktop */}
      <aside className="hidden md:flex">
        <Sidebar activePath={pathname} isAdmin onLogout={handleLogout} />
      </aside>

      {/* Drawer sidebar for mobile */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-sidebar text-sidebar-foreground max-w-xs w-64">
          <Sidebar
            activePath={pathname}
            isAdmin
            onLogout={handleLogout}
            closeDrawer={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden p-2">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded bg-gray-900 text-white"
            aria-label="Open navigation"
          >
            ☰
          </button>
        </div>
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}