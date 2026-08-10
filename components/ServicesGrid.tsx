"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

type Service = {
  index: string;
  title: string;
  sub: string;
  description: string;
  tags: string[];
  accent: string;
};

const SERVICES: Service[] = [
  {
    index: "01",
    title: "Custom Web\nDevelopment",
    sub: "Frontend Infrastructure",
    description:
      "Interfaces built from the ground up — no templates, no page builders. Performance-first, physics-driven, pixel obsessed.",
    tags: ["Next.js", "React", "TypeScript", "WebGL"],
    accent: "rgba(99,102,241,0.16)",
  },
  {
    index: "02",
    title: "Pixel-Perfect\nClones",
    sub: "Visual Reproduction",
    description:
      "Send us a reference. We rebuild it pixel for pixel in a stack you actually own. No Webflow, no Framer, no lock-in.",
    tags: ["Figma → Code", "Pixel Diff", "Responsive QA"],
    accent: "rgba(20,184,166,0.13)",
  },
  {
    index: "03",
    title: "Python Backend\nScripting",
    sub: "Server Infrastructure",
    description:
      "Automation pipelines, REST APIs, async workers. Engineered to run unattended, at scale, in production.",
    tags: ["FastAPI", "Async Workers", "MongoDB"],
    accent: "rgba(251,146,60,0.13)",
  },
  {
    index: "04",
    title: "Automated\nBot Systems",
    sub: "Telegram Automation",
    description:
      "Userbots, multi-client orchestration, production-grade Telegram automation. Not hobby scripts — real architecture.",
    tags: ["Pyrogram", "Telethon", "aiogram"],
    accent: "rgba(168,85,247,0.14)",
  },
];

const TOTAL = SERVICES.length;

function Card({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);
  const glareRef = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 240, damping: 22, mass: 0.5 });
  const springRotY = useSpring(rotY, { stiffness: 240, damping: 22, mass: 0.5 });

  return (
    <motion.div
      data-cursor-hover
      className="relative flex-shrink-0 rounded-2xl overflow-hidden"
      style={{
        width: "clamp(320px, 70vw, 860px)",
        height: "78vh",
        marginRight: "2vw",
        rotateX: springRotX,
        rotateY: springRotY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
        background: "#060606",
        boxShadow: hovered
          ? "0 0 0 1px rgba(255,255,255,0.18), 0 30px 80px rgba(0,0,0,0.6)"
          : "0 0 0 1px rgba(255,255,255,0.07), 0 20px 60px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.45s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        rotX.set(relY * -12);
        rotY.set(relX * 12);
        if (glareRef.current) {
          glareRef.current.style.setProperty("--gx", `${(relX + 0.5) * 100}%`);
          glareRef.current.style.setProperty("--gy", `${(relY + 0.5) * 100}%`);
        }
      }}
      onMouseLeave={() => {
        setHovered(false);
        rotX.set(0);
        rotY.set(0);
      }}
    >
      {/* Per-card colour bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 115%, ${service.accent}, transparent 60%)`,
        }}
      />

      {/* Top rim light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Ghost index number */}
      <span
        aria-hidden
        className="absolute pointer-events-none select-none font-display font-bold text-white"
        style={{
          fontSize: "clamp(130px, 30vw, 360px)",
          bottom: "-0.12em",
          right: "-0.04em",
          opacity: 0.035,
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        {service.index}
      </span>

      {/* Cursor glare */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          background:
            "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.09), transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-12">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.38em] text-ash block">
              {service.index} / {String(TOTAL).padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 block mt-1.5">
              {service.sub}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end max-w-[46%]">
            {service.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[8px] uppercase tracking-wider text-ash border border-white/10 rounded-full px-2.5 py-[3px]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div>
          <div
            className="h-px w-10 mb-7"
            style={{ background: service.accent.replace(/[\d.]+\)$/, "0.7)") }}
          />
          <h3
            className="font-display font-bold text-bone whitespace-pre-line"
            style={{
              fontSize: "clamp(2.1rem, 4vw, 4.6rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
            }}
          >
            {service.title}
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-ash max-w-[36ch] md:text-[15px]">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDist, setScrollDist] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        setScrollDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    const id = setTimeout(calc, 120);
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", calc);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDist]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveCard(Math.min(TOTAL - 1, Math.floor(v * TOTAL)));
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ height: scrollDist ? `calc(100vh + ${scrollDist}px)` : "520vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Header */}
        <div className="flex items-end justify-between px-8 md:px-14 mb-8 md:mb-10">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.38em] text-ash">
              Disciplines
            </span>
            <h2
              className="font-display font-bold text-bone mt-2 leading-[0.92]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", letterSpacing: "-0.02em" }}
            >
              What We Build
            </h2>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2.5">
            {SERVICES.map((_, i) => (
              <div
                key={i}
                className="h-px rounded-full transition-all duration-500 ease-out"
                style={{
                  width: i === activeCard ? 32 : 12,
                  background: i === activeCard ? "#f6f5f1" : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
            <span className="font-mono text-[9px] uppercase tracking-widest text-ash ml-2">
              {String(activeCard + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Horizontal track driven by vertical scroll */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center will-change-transform"
        >
          <div className="flex-shrink-0 w-[8vw] md:w-[10vw]" />
          {SERVICES.map((service) => (
            <Card key={service.index} service={service} />
          ))}
          <div className="flex-shrink-0 w-[10vw]" />
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.32em] text-white/25 select-none pointer-events-none">
          <span className="h-px w-6 bg-white/20" />
          Scroll to explore
          <span className="h-px w-6 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
