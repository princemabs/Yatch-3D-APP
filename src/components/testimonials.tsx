"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [index, setIndex] = useState(0);

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__mark" aria-hidden>
          &ldquo;
        </div>
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setIndex(s.activeIndex)}
          speed={800}
          slidesPerView={1}
          autoHeight
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <blockquote className="testimonials__quote">{t.quote}</blockquote>
              <div className="testimonials__author">
                <div className="testimonials__avatar">
                  <Image src={t.avatar} alt={t.name} width={56} height={56} />
                </div>
                <div className="testimonials__name">{t.name}</div>
                <div className="testimonials__role">{t.role}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="test-bullets">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              className={`test-bullet ${index === i ? "active" : ""}`}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => swiperRef.current?.slideTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
