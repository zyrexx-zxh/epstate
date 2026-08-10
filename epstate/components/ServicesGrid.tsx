"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [service.parallaxRange, -service.parallaxRange]
  );
  const y = reducedMotion ? 0 : rawY;

  return (
    <motion.div ref={ref} style={{ y }} className={service.offset}>
      <div
        data-cursor-hover
        className="group relative overflow-hidden rounded-2xl border border-line bg-glass p-8 backdrop-blur-sm transition-transform duration-500 ease-out hover:-translate-y-2 sm:p-10"
      >
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
        <div className="pointer-events-none absolute inset-0 -z-10 scale-100 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" />
      </div>
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
