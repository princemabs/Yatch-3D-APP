"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { heroStages } from "@/lib/data";
import { useModal } from "@/components/providers";

const FRAME_COUNT = 240;
const framePath = (i: number) => `/frames/frame_${String(i).padStart(3, "0")}.jpg`;

export function Hero() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [reduced, setReduced] = useState(false);
  const { openBooking } = useModal();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const images: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);

    let targetFrame = 0;
    let currentFrame = 0;
    let raf = 0;
    const stageRef = { current: 0 };

    const loadFrame = (i: number) => {
      if (images[i]) return;
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loaded[i] = true;
        if (i === 0) drawCover(img); // paint the first frame ASAP
      };
      images[i] = img;
    };

    const nearestLoaded = (i: number) => {
      if (loaded[i]) return i;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (loaded[i - d]) return i - d;
        if (loaded[i + d]) return i + d;
      }
      return -1;
    };

    const sizeCanvas = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const drawCover = (img: HTMLImageElement) => {
      if (!img.naturalWidth) return;
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (canvas.width - dw) / 2;
      const dy = (canvas.height - dh) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    sizeCanvas();

    // --- Preloading strategy ---
    for (let i = 0; i < 30; i++) loadFrame(i); // first 30 immediately
    for (let i = 0; i < FRAME_COUNT; i += 8) loadFrame(i); // keyframes

    const ric: (cb: () => void) => number =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ||
      ((cb) => window.setTimeout(cb, 1));
    let lazyIdx = 0;
    const streamRest = () => {
      let budget = 6;
      while (lazyIdx < FRAME_COUNT && budget > 0) {
        if (!images[lazyIdx]) {
          loadFrame(lazyIdx);
          budget--;
        }
        lazyIdx++;
      }
      if (lazyIdx < FRAME_COUNT) ric(streamRest);
    };
    ric(streamRest);

    // --- Scroll → target frame + stage + HUD ---
    const onScroll = () => {
      const el = runwayRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 1) : 0;
      targetFrame = p * (FRAME_COUNT - 1);
      const s = p < 0.33 ? 0 : p < 0.67 ? 1 : 2;
      if (s !== stageRef.current) {
        stageRef.current = s;
        setStage(s);
      }
      if (barFillRef.current) barFillRef.current.style.width = `${15 + p * 85}%`;
    };

    const onResize = () => {
      sizeCanvas();
      const fi = nearestLoaded(Math.round(currentFrame));
      if (fi >= 0) drawCover(images[fi]!);
    };

    if (prefersReduced) {
      // Static fallback: paint a representative mid frame once it loads.
      loadFrame(120);
      const mid = images[120]!;
      if (mid.complete && mid.naturalWidth) drawCover(mid);
      else mid.onload = () => { loaded[120] = true; drawCover(mid); };
      window.addEventListener("resize", onResize, { passive: true });
      return () => window.removeEventListener("resize", onResize);
    }

    const tick = () => {
      currentFrame += (targetFrame - currentFrame) * 0.085;
      const fi = nearestLoaded(Math.round(currentFrame));
      if (fi >= 0) drawCover(images[fi]!);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handlePrimary = (i: number) => {
    const targets = ["#fleet", "#destinations", null];
    const t = targets[i];
    if (t) document.querySelector(t)?.scrollIntoView({ behavior: "smooth" });
    else openBooking();
  };
  const handleSecondary = (i: number) => {
    if (i === 0) document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
    else openBooking();
  };

  return (
    <section id="hero-runway" ref={runwayRef} aria-label="Aventis hero">
      <div className="hero-sticky-frame">
        <canvas id="hero-canvas" ref={canvasRef} aria-hidden />

        <div className="hero-content-stage">
          {heroStages.map((s, i) => (
            <div key={i} className={`hero-stage ${stage === i ? "active" : ""}`}>
              <div className="hero-stage__eyebrow">{s.eyebrow}</div>
              <h1 className="hero-stage__title">{s.title}</h1>
              <p className="hero-stage__desc">{s.desc}</p>
              <div className="hero-stage__actions">
                <button className="btn-gold" onClick={() => handlePrimary(i)}>
                  {s.primary} <ArrowRight size={16} />
                </button>
                <button className="btn-ghost" onClick={() => handleSecondary(i)}>
                  {i === 0 && <Play size={14} />} {s.secondary}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-hud-location">
          <span className="dot" /> Newport, New England
        </div>

        <div className="hero-hud-stages" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`hud-num ${stage === i ? "active" : ""}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
          <span className="hud-bar">
            <span className="hud-bar__fill" ref={barFillRef} />
          </span>
        </div>
      </div>

      {reduced && (
        <noscript>
          <div className="hero-fallback" style={{ backgroundImage: "url(/frames/frame_120.jpg)" }} />
        </noscript>
      )}
    </section>
  );
}
