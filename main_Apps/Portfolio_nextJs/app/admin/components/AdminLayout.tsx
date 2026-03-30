"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid, FiLayers, FiTag, FiActivity, FiSun, FiMoon, FiLogOut,
  FiChevronLeft, FiChevronRight, FiSettings, FiBarChart2, FiUser,
  FiClock, FiZap, FiHome
} from "react-icons/fi";
import { toast } from "react-hot-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const navItems = [
  { href: "/admin", icon: FiGrid, label: "Dashboard", gradient: "from-blue-500 to-blue-600" },
  { href: "/admin/projects", icon: FiLayers, label: "Projects", gradient: "from-purple-500 to-purple-600" },
  { href: "/admin/tags", icon: FiTag, label: "Tags", gradient: "from-pink-500 to-pink-600" },
  { href: "/admin/analytics", icon: FiBarChart2, label: "Analytics", gradient: "from-emerald-500 to-emerald-600" },
  { href: "/admin/settings", icon: FiSettings, label: "Settings", gradient: "from-orange-500 to-orange-600" },
];

export default function AdminLayout({ children, isLoggedIn, onLogout, darkMode, onToggleDark }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      onToggleDark();
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-slate-950" : "bg-slate-50"}`}>
      <motion.aside
        initial={{ x: -260, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className={`h-full ${darkMode ? "bg-slate-900/95" : "bg-white/95"} backdrop-blur-xl border-r ${darkMode ? "border-slate-800/50" : "border-slate-200/50"} flex flex-col shadow-2xl`}>
          
          <div className="p-5 border-b border-slate-100 dark:border-slate-800/50">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-11 h-11 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30 flex-shrink-0"
              >
                <FiGrid className="text-white" size={20} />
              </motion.div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <h2 className="font-black text-lg text-slate-800 dark:text-white whitespace-nowrap">
                      Portfolio Admin
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <p className="text-[10px] text-slate-400">v2.0 Dashboard</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 mx-3 mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <FiUser size={16} className="text-white" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <p className="font-bold text-sm text-slate-800 dark:text-white whitespace-nowrap">Samir</p>
                  <p className="text-[10px] text-slate-400">Administrator</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="mb-4">
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-4 mb-2"
                  >
                    Main Menu
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            {navItems.map((item, idx) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all relative overflow-hidden group ${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : darkMode
                        ? "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r opacity-100"
                        style={{ background: `linear-gradient(90deg, var(--tw-gradient-stops))` }}
                      />
                    )}
                    <item.icon size={20} className="flex-shrink-0 relative z-10" />
                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap overflow-hidden relative z-10"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    {!sidebarOpen && (
                      <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                        {item.label}
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800/50 space-y-2">
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={onToggleDark}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                darkMode ? "text-slate-400 hover:bg-slate-800/50 hover:text-yellow-400" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onLogout();
                toast.success("Logged out successfully");
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <FiLogOut size={20} />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`absolute -right-3 top-24 w-7 h-7 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"} border rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform`}
          >
            {sidebarOpen ? <FiChevronLeft size={14} /> : <FiChevronRight size={14} />}
          </button>
        </div>
      </motion.aside>

      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        <div className="p-6 lg:p-8 max-w-[1800px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 mb-2">
            <FiClock size={14} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
