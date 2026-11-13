import { marquee, profile, stats } from "../data";
import { CountUp, Reveal, SectionHead } from "./ui";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-bg-2 py-5" aria-label="Technologies">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium tracking-[-0.03em]">
            {i % 3 === 1 ? <span className="serif-em text-muted">{t}</span> : t}
            <span className="text-accent" aria-hidden>✳</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-2 to-transparent" />
    </div>
  );
}

const facts = [
  { k: "Based in", v: "Homagama, Sri Lanka" },
  { k: "Currently", v: "Software Engineer (Trainee), Adeona Technologies" },
  { k: "Education", v: "BSc (Hons) CS — First Class, NSBM" },
  { k: "Working on", v: "MCP servers · LLM chatbots · n8n" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          index="01"
          label="About"
          title={
            <>
              Engineer who owns it <span className="serif-em text-accent">end to end.</span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-[clamp(1.5rem,2.6vw,2.4rem)] font-normal leading-[1.2] tracking-[-0.025em]">
              Requirements, system design, APIs, UI, deployment and support — I take features the whole way,
              <span className="text-muted"> across fleet management, compliance, HR, e-learning, bidding and real-estate platforms.</span>
            </p>
            <div className="mt-10 grid gap-6 text-[15px] leading-relaxed text-muted sm:grid-cols-2">
              {profile.about.map((p, i) => (
                <p key={i} className={i === 2 ? "sm:col-span-2" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[110px_1fr] gap-4 py-4 text-sm">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              className={`border-line py-8 pr-4 ${i % 2 === 0 ? "border-r" : ""} lg:border-r ${i === 3 ? "lg:border-r-0" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} ${i % 2 === 1 ? "pl-5" : ""} lg:pl-6 lg:first:pl-0`}
            >
              <div className="text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-none tracking-[-0.05em]">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <p className="mt-3 max-w-[18ch] text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
