"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { SearchModal } from "@/components/search-modal";
import { BookingModal } from "@/components/booking-modal";

type ModalKind = "search" | "booking" | null;

type ModalCtx = {
  open: ModalKind;
  openSearch: () => void;
  openBooking: () => void;
  close: () => void;
};

const Ctx = createContext<ModalCtx | null>(null);

export function useModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useModal must be used within <Providers>");
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<ModalKind>(null);

  const close = useCallback(() => setOpen(null), []);
  const openSearch = useCallback(() => setOpen("search"), []);
  const openBooking = useCallback(() => setOpen("booking"), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Ctx.Provider value={{ open, openSearch, openBooking, close }}>
      {children}
      <SearchModal open={open === "search"} onClose={close} />
      <BookingModal open={open === "booking"} onClose={close} />
    </Ctx.Provider>
  );
}
