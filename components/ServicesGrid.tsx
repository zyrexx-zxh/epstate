"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  index: string;
  title: string;
  description: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    index: "01",
    title: "Custom Web\nDevelopment",
    description: "Interfaces built from the ground up — no templates, no page builders, no shortcuts. Performance-first, physics-driven, pixel obsessed.",
    tags: ["Next.js", "React", "Three.js", "TypeScript"],
  },
  {
    index: "02",
    title: "Pixel-Perfect\nWebsite Clones",
    description: "Send a reference. We rebuild it exactly — pixel for pixel — in a stack that's actually yours. No Webflow, no Framer, no lock-in.",
    tags: ["Figma → Code", "Pixel Diffing", "Responsive QA"],
  },
  {
    index: "03",
    title: "Scalable Python\nBackend Scripting",
    description: "Automation pipelines, REST APIs, and async backend logic engineered to run unattended at scale, from a single script to distributed workers.",
    tags: ["FastAPI", "Async Workers", "MongoDB Atlas"],
  },
  {
    index: "04",
    title: "Automated Bot\nSystems",
    description: "Userbots, multi-client orchestration, and Telegram automation built to survive production traffic. Not hobby scripts — production-grade architecture.",
    tags: ["Pyrogram", "Telethon", "aiogram", "Multi-client"],
  },
];

function Card({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 220, damping: 22 });
  const springRotY = useSpring(rotY, { stiffness: 220, damping: 22 });

  return (
    <motion.div
      data-cursor-hover
      className="group relative flex h-full w-[min(72vw,860px)] flex-shrink-0 flex-col justify-between border-l border-line p-10 md:p-16"
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        rotX.set(relY * -12);
        rotY.set(relX * 12);
        (e.currentTarget as HTMLElement).style.setProperty("--gx", `${(relX + 0.5) * 100}%`);
        (e.currentTarget as HTMLElement).style.setProperty("--gy", `${(relY + 0.5) * 100}%`);
      }}
      onMouseLeave={() => {
        setHovered(false);
        rotX.set(0);
        rotY.set(0);
      }}
    >
      {/* moving glare */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-sm"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.09), transparent 52%)",
        }}
      />

      {/* giant ghost index number */}
      <span
        className="pointer-events-none absolute bottom-6 right-8 select-none font-display text-[18vw] font-bold leading-none text-white opacity-[0.04]"
        aria-hidden
      >
        {service.index}
      </span>

      {/* top row */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
        <span>{service.index} / 04</span>
        <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {service.tags[0]}
        </span>
      </div>

      {/* middle — title */}
      <div className="my-auto py-16">
        <h3 className="whitespace-pre-line font-display text-[clamp(2.6rem,5vw,5rem)] font-bold leading-[0.95] text-bone">
          {service.title}
        </h3>
        <p className="mt-8 max-w-md text-base leading-relaxed text-ash">
          {service.description}
        </p>
      </div>

      {/* bottom row */}
      <div className="flex items-end justify-between">
        <div className="flex flex-wrap gap-2">
          {service.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ash"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="font-mono text-xs text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          ↗
        </span>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getW = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getW(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinType: "transform",
          anticipatePin: 1,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${getW()}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="overflow-hidden">
      <div ref={trackRef} className="flex h-screen w-max items-stretch">

        {/* intro panel */}
        <div className="flex w-[38vw] flex-shrink-0 flex-col justify-end px-10 pb-20 md:px-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ash">
            Disciplines
          </span>
          <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.5rem)] font-bold leading-[0.92] text-bone">
            What We<br />Build
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ash">
            Four core disciplines. Zero compromise. Scroll to explore.
          </p>
          <div className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-ash">
            <span>Drag</span>
            <span className="h-px w-12 bg-line" />
            <span>→</span>
          </div>
        </div>

        {SERVICES.map((s) => (
          <Card key={s.index} service={s} />
        ))}

        {/* end padding */}
        <div className="w-[28vw] flex-shrink-0" />
      </div>
    </section>
  );
}
