"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { experienceFeatures } from "@/lib/data";
import { useModal } from "@/components/providers";
import { Reveal } from "@/components/reveal";

export function Experience() {
  const { openBooking } = useModal();
  return (
    <section id="experience" className="experience">
      <div className="experience__visual">
        <Image
          src="/images/experience_swimmer.jpg"
          alt="Aerial view of a swimmer in a crystalline sapphire lagoon beside a yacht"
          fill
          sizes="(max-width: 992px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
        <button className="play-badge" aria-label="Watch the Aventis experience film" onClick={openBooking}>
          <Play size={26} fill="currentColor" />
        </button>
      </div>

      <div className="experience__panel">
        <Reveal>
          <div className="eyebrow">Tailored Voyages</div>
          <h2 className="experience__title">Crafted Moments on Open Water</h2>
        </Reveal>
        <div className="feature-list">
          {experienceFeatures.map((f, i) => (
            <Reveal key={f.title} delay={0.08 * i}>
              <div className="feature-item">
                <span className="feature-item__icon">
                  <Image src={f.icon} alt="" width={28} height={28} />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
