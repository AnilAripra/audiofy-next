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
  PhoneCall,
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
  { label: "Recordings", href: "/recordings", icon: PhoneCall  },
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
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const defaultRange = {
    startDate: new Date(2026, 0, 11),
    endDate: new Date(2026, 0, 16),
    key: "selection",
  };
  const [range, setRange] = useState([defaultRange]);
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full theme-panel backdrop-blur-xl border-r transition-all duration-300 z-50 overflow-hidden ${
          sidebarOpen
            ? "w-64 translate-x-0"
            : "w-0 -translate-x-full lg:w-0 lg:-translate-x-full"
        }`}
        style={{ borderColor: "var(--border)" }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-6 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shrink-0">
              <Mic className="text-white" size={16} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent whitespace-nowrap">
              Audiofy
            </span>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-auto p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <nav className="space-y-1 flex-1 overflow-y-auto">
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
        className={`transition-all duration-300 ${sidebarOpen && !isMobile ? "ml-64" : "ml-0"}`}
      >
        <header
          className="theme-panel sticky top-0 z-30 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="px-4 md:px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <h1 className="text-xl font-bold truncate">
                  {title ?? pathname ?? "Sales Dashboard"}
                </h1>
              </div>

              {/* Mobile Date Picker Toggle or simplified view could go here if needed */}
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
              <div className="hidden md:block">
                <DateRangePicker
                  value={range}
                  onChange={(r) => setRange(r)}
                  defaultRange={defaultRange}
                />
              </div>

              <div className="flex items-center gap-3 justify-end">
                <div className="relative hidden md:block">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--muted)" }}
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 pr-3 py-2 rounded-lg focus:outline-none w-48 text-sm theme-input"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>
                <button
                  className="p-2 rounded-lg transition-colors relative"
                  style={{ background: "transparent" }}
                >
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                </button>
                <button
                  onClick={toggleTheme}
                  title="Toggle theme"
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center"
                  style={{ background: "transparent" }}
                >
                  {theme === "light" ? (
                    <Sun size={18} style={{ color: "var(--muted)" }} />
                  ) : (
                    <Moon size={18} style={{ color: "var(--muted)" }} />
                  )}
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0">
                  AA
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}
