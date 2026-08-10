import MagneticLink from "./MagneticLink";

export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center justify-center px-6 py-32 text-center sm:py-48">
      <h2 className="font-display text-[clamp(2.5rem,11vw,8rem)] font-bold uppercase leading-[0.9] text-bone">
        Initiate
        <br />
        Project
      </h2>

      <a
        href="https://t.me/epstate"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className="group relative mt-12 overflow-hidden rounded-full border border-line bg-glass px-10 py-4 font-mono text-xs uppercase tracking-[0.25em] text-bone backdrop-blur-md transition-colors duration-300 hover:bg-bone hover:text-void"
      >
        Request a Custom Quote
      </a>

      <div className="mt-24 flex gap-10 sm:gap-16">
        <MagneticLink href="https://t.me/epstate" external>
          Telegram
        </MagneticLink>
        <MagneticLink href="mailto:hello@epstate.dev">Email</MagneticLink>
      </div>

      <p className="mt-24 font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
        © {new Date().getFullYear()} Epstate — Bespoke Pricing, Scope Dependent
      </p>
    </footer>
  );
}
