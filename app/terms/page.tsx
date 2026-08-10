import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Epstate",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By engaging Epstate for any service — whether via Telegram, email, or any other channel — you agree to these Terms and Conditions in full. If you do not agree, do not proceed with an engagement.",
  },
  {
    title: "Services & Scope",
    body: "All services are bespoke and scope-dependent. A project does not begin until both parties have agreed in writing on the scope, deliverables, timeline, and payment terms. Epstate reserves the right to decline any project without providing a reason.",
  },
  {
    title: "Pricing & Payment",
    body: "All pricing is quoted per-project. Quotes are valid for 14 days. We require a deposit before work begins — the exact amount is agreed per project. Remaining balances are due on delivery unless otherwise agreed in writing. All prices are exclusive of any applicable taxes.",
  },
  {
    title: "Revisions & Changes",
    body: "The number of revision rounds included is specified per project. Changes that materially alter the original agreed scope will be quoted separately and require written approval before implementation.",
  },
  {
    title: "Intellectual Property",
    body: "Upon receipt of final payment, full ownership of the deliverables transfers to the client. Epstate retains the right to display the work in its portfolio unless the client requests otherwise in writing at the time of engagement.",
  },
  {
    title: "Confidentiality",
    body: "Epstate treats all client information, business logic, and project details as confidential. We will not disclose your project specifics to third parties without your written consent, except where required by law.",
  },
  {
    title: "Limitation of Liability",
    body: "Epstate's total liability for any claim arising from a project shall not exceed the total fees paid for that specific project. We are not liable for indirect, consequential, or incidental damages of any kind.",
  },
  {
    title: "Warranties",
    body: "We warrant that deliverables will function as described in the agreed scope at the time of delivery. We do not warrant that software will be error-free indefinitely or compatible with future third-party updates beyond the delivery date.",
  },
  {
    title: "Termination",
    body: "Either party may terminate an engagement with 7 days written notice. Work completed to the point of termination is billable. Deposits are non-refundable unless Epstate is unable to begin the agreed work.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by applicable law. Any disputes will be resolved through good-faith negotiation in the first instance. If unresolved, disputes may be referred to binding arbitration.",
  },
  {
    title: "Contact",
    body: "For any questions regarding these terms, contact us at claxen@outlook.com or via Telegram @Claxen.",
  },
];

export default function Terms() {
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
          Terms &<br />Conditions
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
