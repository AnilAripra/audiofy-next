"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Phone,
  Users,
  Mic,
  FileText,
  Settings,
  Search,
  Bell,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Call Analytics", href: "/call-analytics", icon: Phone },
  { label: "Agents", href: "/agents", icon: Users },
  { label: "Live Stream", href: "/live-stream", icon: Mic },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
];

type NavItemProps = {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  active: boolean;
  href: string;
};

function NavItem({ icon: Icon, label, active, href }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
        active
          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/20"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <aside
        className={`fixed left-0 top-0 h-full bg-slate-900/50 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-50 ${
          sidebarOpen ? "w-56" : "w-0 -translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Mic className="text-white" size={16} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Audiofy
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={pathname === item.href}
              />
            ))}
          </nav>
        </div>
      </aside>

      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-56" : "ml-0"
        }`}
      >
        <header className="bg-slate-900/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h1 className="text-xl font-bold">Sales Dashboard</h1>
                <p className="text-xs text-gray-400">11/01/2026 - 16/01/2026</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-48 text-sm"
                />
              </div>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-sm">
                AA
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
