"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Settings } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#hero" },
  { label: "Katalog", href: "#catalog" },
  { label: "Featured", href: "#featured" },
  { label: "Testimoni", href: "#testimonials" },
  { label: "Kontak", href: "#contact" },
];

export default function Navbar({ onAdminOpen }: { onAdminOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollTo("#hero")}
            whileHover={{ scale: 1.04 }}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:shadow-violet-500/60 transition-all duration-300">
                <Zap size={18} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Web<span className="text-violet-400">Craft</span>
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  active === link.href
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {active === link.href && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onAdminOpen}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm"
            >
              <Settings size={15} />
              <span>Admin</span>
            </button>
            <motion.button
              onClick={() => scrollTo("#contact")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300"
            >
              Hubungi Kami
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-2"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
              >
                {link.label}
              </motion.button>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => { setMobileOpen(false); onAdminOpen(); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
              >
                <Settings size={16} />
                Admin Panel
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-center"
              >
                Hubungi Kami
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
