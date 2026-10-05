"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/data";

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <div className="stat-number">
        {value}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about__grid">
          <Reveal className="about__visual">
            <div className="about__img">
              <Image
                src="/images/about_lifestyle.jpg"
                alt="Guest relaxing on the teak aft deck of a luxury yacht overlooking the ocean"
                width={1400}
                height={1120}
                sizes="(max-width: 992px) 100vw, 55vw"
              />
            </div>
            <span className="about__badge">Since 1988</span>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="eyebrow">Our Heritage</div>
            <h2 className="about__title">A Legacy of Pure Maritime Luxury</h2>
            <p className="about__body">
              For more than three decades, Aventis has set the gold standard in private yacht
              charters. Combining discreet five-star hospitality with the world&apos;s most
              prestigious maritime fleet, we craft journeys as singular as the guests who sail them —
              every passage composed around your vision of the perfect escape.
            </p>

            <div className="about__stats">
              {stats.map((s) => (
                <StatCounter key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
