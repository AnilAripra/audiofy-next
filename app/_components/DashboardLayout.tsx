"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
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
  Sun,
  Moon,
} from "lucide-react";
import { format } from "date-fns";
import DateRangePicker from "./DateRangePicker";

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
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const defaultRange = {
    startDate: new Date(2026, 0, 11),
    endDate: new Date(2026, 0, 16),
    key: "selection",
  };
  const [range, setRange] = useState([defaultRange]);
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <aside
        className={`fixed left-0 top-0 h-full theme-panel backdrop-blur-xl border-r transition-all duration-300 z-50 overflow-hidden ${
          sidebarOpen ? "w-56 translate-x-0" : "w-0 -translate-x-full"
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

      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-0 md:ml-56" : "ml-0 md:ml-0"}`}>
        <header className="theme-panel sticky top-0 z-40 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h1 className="text-xl font-bold">
                  {title ?? pathname ?? "Sales Dashboard"}
                </h1>
                <DateRangePicker
                  value={range}
                  onChange={(r) => setRange(r)}
                  defaultRange={defaultRange}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--muted)' }}
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-3 py-2 rounded-lg focus:outline-none w-48 text-sm theme-input"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>
              <button className="p-2 rounded-lg transition-colors relative" style={{ background: 'transparent' }}>
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              <button onClick={toggleTheme} title="Toggle theme" className="p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center" style={{ background: 'transparent' }}>
                {theme === 'light' ? <Sun size={18} style={{ color: 'var(--muted)' }} /> : <Moon size={18} style={{ color: 'var(--muted)' }} />}
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
