"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import { destinations } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function Destinations() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [beginning, setBeginning] = useState(true);
  const [end, setEnd] = useState(false);

  const sync = (s: SwiperClass) => {
    setBeginning(s.isBeginning);
    setEnd(s.isEnd);
  };

  return (
    <section id="destinations" className="destinations section">
      <div className="container">
        <div className="destinations__grid">
          <Reveal>
            <div className="eyebrow">Top Destinations</div>
            <h2 className="destinations__title">Iconic Places, Extraordinary Journeys</h2>
            <p className="destinations__desc">
              From Newport&apos;s historic coastline to hidden gems around the world, discover
              breathtaking destinations by sea.
            </p>
            <a className="btn-gold" href="#footer">
              Explore Destinations <ArrowRight size={16} />
            </a>
            <div className="destinations__nav">
              <button
                className="dest-nav-btn dest-prev-btn"
                aria-label="Previous Destination"
                disabled={beginning}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                className="dest-nav-btn dest-next-btn"
                aria-label="Next Destination"
                disabled={end}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </Reveal>

          <div className="destinations-slider-wrapper">
            <Swiper
              onSwiper={(s) => {
                swiperRef.current = s;
                sync(s);
              }}
              onSlideChange={sync}
              spaceBetween={32}
              slidesPerView={1.08}
              speed={800}
              breakpoints={{
                481: { slidesPerView: 1.25, spaceBetween: 20 },
                769: { slidesPerView: 2.2, spaceBetween: 24 },
                1280: { slidesPerView: 2.8, spaceBetween: 32 },
              }}
            >
              {destinations.map((d) => (
                <SwiperSlide key={d.name}>
                  <article className="destination-card">
                    <div className="destination-card__media">
                      <Image
                        src={d.image}
                        alt={`${d.name}, ${d.subtitle}`}
                        width={800}
                        height={1000}
                        sizes="(max-width: 768px) 90vw, 33vw"
                      />
                    </div>
                    <div className="destination-card__caption">
                      <span>{d.subtitle}</span>
                      <h3>{d.name}</h3>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
