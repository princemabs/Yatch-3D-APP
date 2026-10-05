"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { yachts, fleetTabs } from "@/lib/data";
import { useModal } from "@/components/providers";
import { Reveal } from "@/components/reveal";

export function Fleet() {
  const [active, setActive] = useState<string>("all");
  const { openBooking } = useModal();
  const visible = yachts.filter((y) => active === "all" || y.category === active);

  return (
    <section id="fleet" className="fleet section">
      <div className="container">
        <Reveal className="fleet__head">
          <div className="eyebrow is-centered">The Collection</div>
          <h2 className="fleet__title">Handpicked Signature Vessels</h2>
          <p className="fleet__sub">
            A curated selection from our fleet of 120 vessels — each with a dedicated crew and a
            character entirely its own.
          </p>
        </Reveal>

        <div className="fleet__tabs" role="tablist" aria-label="Filter fleet by type">
          {fleetTabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              className={`tab-pill ${active === t.id ? "active" : ""}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div layout className="fleet__grid">
          <AnimatePresence mode="popLayout">
            {visible.map((y) => (
              <motion.article
                key={y.name}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="yacht-card"
              >
                <div className="yacht-card__media">
                  <Image
                    src={y.image}
                    alt={`${y.name}, a ${y.tag.toLowerCase()}`}
                    width={900}
                    height={560}
                    sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                  />
                  <span className="yacht-card__tag">{y.tag}</span>
                </div>
                <div className="yacht-card__body">
                  <h3 className="yacht-card__name">{y.name}</h3>
                  <p className="yacht-card__specs">{y.specs}</p>
                  <div className="yacht-card__foot">
                    <span className="yacht-card__rate">
                      From <b>{y.rate}</b> / week
                    </span>
                    <button
                      className="yacht-card__arrow"
                      aria-label={`View ${y.name}`}
                      onClick={openBooking}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
