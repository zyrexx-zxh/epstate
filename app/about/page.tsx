import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Epstate",
  description: "A boutique development agency building digital infrastructure that dominates.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-void px-6 py-32 sm:px-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-ash transition-colors hover:text-bone"
        >
          ← Back
        </Link>

        <h1 className="mt-16 font-display text-[clamp(3rem,10vw,7rem)] font-bold uppercase leading-[0.92] text-bone">
          About<br />Epstate
        </h1>

        <div className="mt-24 grid gap-20 md:grid-cols-2">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ash">01 / Ethos</span>
            <p className="mt-6 text-xl leading-relaxed text-bone">
              We don&apos;t build websites. We engineer digital infrastructure.
              The difference is intent — every line of code is written to
              perform, scale, and outlast the project brief.
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ash">02 / Approach</span>
            <p className="mt-6 text-xl leading-relaxed text-bone">
              Small team. Tight scope. Obsessive execution. We take on a
              limited number of projects at any given time so that every client
              gets the full weight of our attention.
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ash">03 / Stack</span>
            <ul className="mt-6 space-y-3 font-mono text-sm text-ash">
              {[
                "Next.js / React / TypeScript",
                "React Three Fiber / Three.js / WebGL",
                "GSAP / Motion / Lenis",
                "Python / FastAPI / MongoDB Atlas",
                "Pyrogram / Telethon / aiogram",
                "Render / Vercel / Railway",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-line" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ash">04 / Contact</span>
            <div className="mt-6 space-y-3 font-mono text-sm text-ash">
              <p>
                Telegram:{" "}
                <a href="https://t.me/Claxen" target="_blank" rel="noopener noreferrer" className="text-bone hover:underline">
                  @Claxen
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:claxen@outlook.com" className="text-bone hover:underline">
                  claxen@outlook.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
