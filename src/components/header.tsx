"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useModal } from "@/components/providers";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { openSearch, openBooking } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="main-header" className={scrolled ? "scrolled" : ""}>
      <a className="brand" href="#top" aria-label="Aventis Yacht Charters home">
        <Image className="brand__mark" src="/images/logo.svg" alt="" width={40} height={40} priority />
        <span className="brand__text">
          <span className="brand__name">AVENTIS</span>
          <span className="brand__sub">Yacht Charters</span>
        </span>
      </a>

      <nav className="nav" aria-label="Primary">
        {navLinks.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="header__actions">
        <button className="icon-btn" aria-label="Open search" onClick={openSearch}>
          <Search size={18} />
        </button>
        <button className="btn-gold" onClick={openBooking}>
          Book a Yacht <ArrowRight size={16} />
        </button>
        <button
          className="icon-btn hamburger"
          aria-label={drawer ? "Close menu" : "Open menu"}
          aria-expanded={drawer}
          onClick={() => setDrawer((v) => !v)}
        >
          {drawer ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 64,
              left: 16,
              right: 16,
              background: "rgba(7,15,23,0.96)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(197,155,95,0.2)",
              borderRadius: 16,
              padding: "12px 8px",
              zIndex: 1001,
            }}
          >
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setDrawer(false)}
                style={{
                  display: "block",
                  padding: "14px 18px",
                  color: "#fff",
                  fontSize: 15,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
