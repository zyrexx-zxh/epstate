const MARQUEE_TEXT = "BESPOKE PRICING • SCOPE DEPENDENT • ";

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line py-6 sm:py-10">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1}
            className="mr-4 font-display text-5xl font-bold uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_#f6f5f1] sm:text-7xl md:text-8xl"
          >
            {MARQUEE_TEXT.repeat(4)}
          </span>
        ))}
      </div>
    </div>
  );
}
