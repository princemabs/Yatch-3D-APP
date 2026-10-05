"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const firstRef = useRef<HTMLInputElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setSent(false);
      setTimeout(() => firstRef.current?.focus(), 80);
    }
  }, [open]);

  return (
    <div className={`modal ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Charter booking inquiry">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="booking-modal__dialog">
        <button className="modal__close" onClick={onClose} aria-label="Close booking form">
          <X size={20} />
        </button>
        <h2>Begin Your Charter Inquiry</h2>
        <p className="sub">
          Share a few details and a dedicated charter broker will craft your bespoke proposal within 24 hours.
        </p>

        {sent ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--color-gold-light)", padding: "20px 0" }}>
            <Check /> Thank you — your inquiry is received. A broker will be in touch shortly.
          </div>
        ) : (
          <form
            className="form-grid"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="form-field">
              <label htmlFor="bk-dest">Destination</label>
              <input id="bk-dest" ref={firstRef} placeholder="e.g. French Riviera" required />
            </div>
            <div className="form-field">
              <label htmlFor="bk-yacht">Yacht Preference</label>
              <select id="bk-yacht" defaultValue="">
                <option value="" disabled>Select a type</option>
                <option>Motor Yacht</option>
                <option>Sailing Yacht</option>
                <option>Luxury Catamaran</option>
                <option>Mega Yacht</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="bk-dates">Charter Dates</label>
              <input id="bk-dates" type="text" placeholder="e.g. Jul 12 – Jul 19" />
            </div>
            <div className="form-field">
              <label htmlFor="bk-guests">Number of Guests</label>
              <input id="bk-guests" type="number" min={1} max={30} placeholder="8" />
            </div>
            <div className="form-field full">
              <label htmlFor="bk-notes">Special Requests</label>
              <textarea id="bk-notes" rows={3} placeholder="Dietary preferences, celebrations, water toys…" />
            </div>
            <div className="form-field full">
              <button type="submit" className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                Submit Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
