"use client";

import { motion } from "motion/react";
import Hero3D from "./Hero3D";

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section className="relative flex h-svh items-center justify-center overflow-hidden">
      <Hero3D />

      {/* Concentrates a soft glow behind the wordmark so it reads as part of
          the particle field rather than sitting flatly on top of it. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_72%)]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-[clamp(3rem,13vw,10rem)] font-bold uppercase leading-[0.9] tracking-tight text-bone"
        >
          Epstate
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-6 font-mono text-xs uppercase tracking-[0.35em] text-ash sm:text-sm"
        >
          Next-Generation Digital Infrastructure
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ash"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-line" />
      </motion.div>
    </section>
  );
}
