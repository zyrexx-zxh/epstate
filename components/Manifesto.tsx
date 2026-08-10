"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO =
  "We don't just write code. We engineer highly scalable, high-performance digital ecosystems. From pixel-perfect frontends to automated backend architecture, we build infrastructure that dominates.";

export default function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLSpanElement>(".word");
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      className="relative flex min-h-[140vh] items-center justify-center px-6 py-40"
    >
      <p
        ref={textRef}
        className="max-w-5xl text-balance text-center font-display text-3xl font-medium leading-[1.15] sm:text-4xl md:text-5xl lg:text-[4.5rem]"
      >
        {MANIFESTO.split(" ").map((word, i) => (
          <span
            key={i}
            className="word mr-[0.28em] inline-block text-bone opacity-20 last:mr-0"
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}
