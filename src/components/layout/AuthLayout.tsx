import { useEffect, useState, type ReactNode } from "react";

const CAPTIONS = [
  {
    quote:
      "I stopped skimming forty-page zoning reports. I ask Spaces what changed since last quarter and get an answer with the page number.",
    role: "Planning director, county government",
  },
  {
    quote:
      "Onboarding used to mean pointing new hires at a shared drive. Now they just ask the space and get a straight answer.",
    role: "Head of operations, mid-size firm",
  },
  {
    quote:
      "We uploaded a decade of engineering specs in an afternoon. Search that used to take a junior engineer a day now takes ten seconds.",
    role: "Engineering lead, infrastructure team",
  },
];

export function AuthLayout({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % CAPTIONS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-[860px]:grid-cols-1">
      <div
        className="relative overflow-hidden flex flex-col justify-between p-12 text-on-ink max-[860px]:hidden"
        style={{
          background:
            "linear-gradient(155deg, var(--color-ink-950) 0%, var(--color-ink-800) 48%, var(--violet-700, var(--color-ink-700)) 100%)",
        }}
      >
        <div className="absolute [inset:-10%_-10%_-10%_20%] opacity-50 pointer-events-none" aria-hidden>
          <svg viewBox="0 0 480 480" fill="none">
            <g
              className="animate-drift [transform-origin:center] [&_circle]:fill-violet-300 [&_path]:stroke-[rgba(165,149,214,0.35)] [&_path]:stroke-1"
            >
              <circle cx="80" cy="90" r="3" />
              <circle cx="180" cy="60" r="2" />
              <circle cx="260" cy="140" r="4" />
              <circle cx="360" cy="80" r="2.5" />
              <circle cx="120" cy="220" r="2.5" />
              <circle cx="300" cy="260" r="3" />
              <circle cx="410" cy="220" r="2" />
              <circle cx="60" cy="340" r="2" />
              <circle cx="200" cy="380" r="3.5" />
              <circle cx="340" cy="400" r="2.5" />
              <path d="M80 90L180 60M180 60L260 140M260 140L360 80M120 220L260 140M120 220L300 260M300 260L410 220M60 340L120 220M200 380L300 260M340 400L200 380" />
            </g>
          </svg>
        </div>

        <div className="relative">
          <div className="relative inline-flex items-center gap-2.5 font-display text-xl font-semibold [letter-spacing:-0.01em]">
            <span
              className="w-[26px] h-[26px] rounded-lg bg-[linear-gradient(135deg,var(--color-accent),var(--color-violet-300))]"
              aria-hidden
            />
            Spaces
          </div>
        </div>

        <div className="relative max-w-[460px] animate-caption-in" key={active}>
          <p className="font-display italic font-medium text-[clamp(20px,2.4vw,27px)] leading-[1.45] text-on-ink">
            &ldquo;{CAPTIONS[active].quote}&rdquo;
          </p>
          <p className="mt-4 text-[13px] text-on-ink-muted font-mono [letter-spacing:0.02em]">
            {CAPTIONS[active].role}
          </p>
        </div>

        <div className="relative flex gap-2">
          {CAPTIONS.map((_, i) => (
            <span
              key={i}
              className={`w-5 h-[3px] rounded-[2px] transition-[background] duration-300 ease-in-out ${
                i === active ? "bg-accent" : "bg-[rgba(255,255,255,0.2)]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center py-10 px-8 bg-paper">
        <div className="w-full max-w-[380px]">{children}</div>
      </div>
    </div>
  );
}
