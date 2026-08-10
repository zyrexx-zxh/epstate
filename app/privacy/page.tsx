import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Epstate",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect only the information you provide directly to us — typically your name, contact details, and project requirements submitted via email or Telegram. We do not run tracking pixels, third-party analytics, or advertising networks on this site.",
  },
  {
    title: "How We Use Your Information",
    body: "Information you share is used solely to scope, quote, and deliver your project. We do not sell, rent, or share your personal data with any third parties outside of the service providers strictly necessary to fulfil your project (e.g. hosting infrastructure).",
  },
  {
    title: "Data Storage",
    body: "Project communications are retained for the duration of the engagement and a reasonable period thereafter for accounting and support purposes. You may request deletion of your data at any time by contacting us.",
  },
  {
    title: "Cookies",
    body: "This website does not use cookies for tracking or advertising. Any cookies set are strictly functional — session state required for the site to operate correctly.",
  },
  {
    title: "Third-Party Services",
    body: "This site is hosted on Render. Project deliverables may be hosted on Render, Vercel, or Railway depending on your project requirements. Each provider maintains its own privacy policy.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, contact us via email or Telegram. We will respond within 14 days.",
  },
  {
    title: "Contact",
    body: "For any privacy-related questions, reach out at claxen@outlook.com or via Telegram @Claxen.",
  },
];

export default function Privacy() {
  return (
    <main className="min-h-screen bg-void px-6 py-32 sm:px-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-ash transition-colors hover:text-bone"
        >
          ← Back
        </Link>

        <h1 className="mt-16 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold uppercase leading-[0.92] text-bone">
          Privacy<br />Policy
        </h1>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-ash">
          Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-20 space-y-14">
          {sections.map((s, i) => (
            <div key={s.title}>
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-[10px] text-ash">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl font-semibold text-bone sm:text-2xl">
                  {s.title}
                </h2>
              </div>
              <p className="mt-4 pl-9 text-base leading-relaxed text-ash">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
