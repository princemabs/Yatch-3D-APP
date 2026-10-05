"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { searchChips } from "@/lib/data";

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  return (
    <div className={`modal ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Search charters">
      <div className="modal__backdrop" onClick={onClose} />
      <button className="modal__close" onClick={onClose} aria-label="Close search">
        <X size={20} />
      </button>
      <div className="search-modal__inner">
        <input
          ref={inputRef}
          className="search-modal__input"
          type="search"
          placeholder="Search yachts, destinations, experiences…"
          aria-label="Search query"
        />
        <div className="search-modal__chips">
          {searchChips.map((c) => (
            <button key={c} className="search-chip" onClick={() => inputRef.current && (inputRef.current.value = c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
