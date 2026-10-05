"use client";

import { ArrowRight } from "lucide-react";
import { useModal } from "@/components/providers";
import { Reveal } from "@/components/reveal";

export function CtaBanner() {
  const { openBooking } = useModal();
  return (
    <section
      className="cta-banner"
      style={{ backgroundImage: "url(/images/cta_lounge_sunset.jpg)" }}
    >
      <div className="cta-banner__overlay" />
      <div className="container">
        <Reveal className="cta-banner__content">
          <div className="eyebrow">Your Personal Sanctuary</div>
          <h2 className="cta-banner__title">The Ocean Awaits. Plan Your Bespoke Escape.</h2>
          <button className="btn-gold" onClick={openBooking}>
            Inquire With A Charter Broker <ArrowRight size={16} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
