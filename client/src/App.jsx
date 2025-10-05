import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddEdit from "./pages/AddEdit";
import Analytics from "./pages/Analytics";
import DarkModeToggle from "./components/DarkModeToggle";
import { AnimatePresence, motion } from "framer-motion";
import { HomeIcon, PlusCircleIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("dark") === "true");
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark", dark);
  }, [dark]);

  const navLinks = [
    { name: "Dashboard", path: "/", icon: <HomeIcon className="w-5 h-5 inline mr-1" /> },
    { name: "Add Record", path: "/add", icon: <PlusCircleIcon className="w-5 h-5 inline mr-1" /> },
    { name: "Analytics", path: "/analytics", icon: <ChartBarIcon className="w-5 h-5 inline mr-1" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
          >
            Country GDP Records
          </Link>

          <nav className="flex items-center gap-6 relative">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 font-medium transition-colors flex items-center rounded-md ${
                  location.pathname === link.path
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                    : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-300"
                }`}
              >
                {link.icon}
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-1/4 w-1/2 h-1 bg-indigo-500 rounded"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Dark Mode Toggle */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <DarkModeToggle dark={dark} setDark={setDark} />
            </motion.div>
          </nav>
        </div>
      </header>

      {/* Main Content with AnimatePresence */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddEdit />} />
              <Route path="/edit/:id" element={<AddEdit />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
