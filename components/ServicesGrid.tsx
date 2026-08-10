"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";

type Service = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  offset: string;
  parallaxRange: number;
};

const SERVICES: Service[] = [
  {
    index: "01",
    title: "Custom Web Development",
    description:
      "Interfaces built from the ground up — no templates, no page builders, no shortcuts.",
    tags: ["Next.js", "React", "Three.js"],
    offset: "md:mt-0",
    parallaxRange: 50,
  },
  {
    index: "02",
    title: "Pixel-Perfect Website Clones",
    description:
      "Send a reference. We rebuild it exactly, pixel for pixel, in a stack that's actually yours.",
    tags: ["Figma → Code", "Pixel Diffing", "Responsive QA"],
    offset: "md:mt-24",
    parallaxRange: -40,
  },
  {
    index: "03",
    title: "Scalable Python Backend Scripting",
    description:
      "Automation, APIs, and backend logic engineered to run unattended, at scale.",
    tags: ["FastAPI", "Async Workers", "MongoDB Atlas"],
    offset: "md:mt-12",
    parallaxRange: 45,
  },
  {
    index: "04",
    title: "Automated Bots (Telegram Bot Specialists)",
    description:
      "Userbots, multi-client systems, and Telegram automation built to survive production.",
    tags: ["Pyrogram", "Telethon", "aiogram"],
    offset: "md:mt-32",
    parallaxRange: -55,
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [service.parallaxRange, -service.parallaxRange]
  );
  const y = reducedMotion ? 0 : rawY;

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 260, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 260, damping: 20 });

  return (
    <motion.div ref={cardRef} style={{ y }} className={service.offset}>
      <motion.div
        data-cursor-hover
        className="group relative overflow-hidden rounded-2xl border border-line bg-glass backdrop-blur-sm"
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformPerspective: 900,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={(e) => {
          if (reducedMotion) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          rotX.set(relY * -14);
          rotY.set(relX * 14);
          e.currentTarget.style.setProperty("--gx", `${(relX + 0.5) * 100}%`);
          e.currentTarget.style.setProperty("--gy", `${(relY + 0.5) * 100}%`);
        }}
        onMouseLeave={() => {
          setHovered(false);
          rotX.set(0);
          rotY.set(0);
        }}
      >
        {/* Moving glare that follows cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
            background:
              "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.1), transparent 55%)",
          }}
        />

        {/* Card content */}
        <div className="p-8 sm:p-10">
          <div className="flex items-start justify-between gap-4 font-mono text-xs tracking-widest text-ash">
            <span>{service.index}</span>
            <span className="text-right opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {service.tags.join(" · ")}
            </span>
          </div>
          <h3 className="mt-16 font-display text-2xl font-semibold leading-tight text-bone sm:text-3xl">
            {service.title}
          </h3>
          <p className="mt-4 max-w-sm text-sm text-ash sm:text-base">
            {service.description}
          </p>
        </div>

        {/* Ambient inner glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="relative px-6 py-32 sm:py-48">
      <div className="mx-auto mb-20 flex max-w-6xl items-end justify-between">
        <h2 className="font-display text-sm font-medium uppercase tracking-[0.3em] text-ash">
          Services
        </h2>
        <span className="font-mono text-xs text-ash">04 Disciplines</span>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
        {SERVICES.map((service) => (
          <ServiceCard key={service.index} service={service} />
        ))}
      </div>
    </section>
  );
}
