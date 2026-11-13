import { education, experience, leadership, skills, training } from "../data";
import { Reveal, SectionHead } from "./ui";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          index="03"
          label="Experience"
          title={
            <>
              Intern to engineer, <span className="serif-em text-accent">shipping all the way.</span>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{experience.period}</p>
                <h3 className="mt-3 text-3xl font-medium tracking-[-0.035em]">{experience.company}</h3>
                <p className="mt-1 text-muted">{experience.place}</p>

                <ol className="relative mt-10 space-y-8 border-l border-line pl-6">
                  {experience.roles.map((r, i) => (
                    <li key={r.title} className="relative">
                      <span
                        className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-bg ${
                          i === 0 ? "bg-accent" : "bg-faint"
                        }`}
                      />
                      <p className="font-medium">{r.title}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted">{r.period}</p>
                      {i === 0 && (
                        <span className="mt-2 inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] text-accent">
                          Promoted Feb 2026
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-8">
            {experience.highlights.map((h, i) => (
              <Reveal key={h.k} delay={i * 0.04}>
                <li className="group grid gap-3 border-t border-line py-8 sm:grid-cols-[64px_170px_1fr] sm:gap-6">
                  <span className="font-mono text-xs text-faint transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium uppercase tracking-[0.08em]">{h.k}</span>
                  <p className="text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed tracking-[-0.01em] text-ink/85">{h.v}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-bg-2/60 px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          index="04"
          label="Capabilities"
          title={
            <>
              The toolbox, <span className="serif-em text-accent">front to back.</span>
            </>
          }
        />
        <div className="border-b border-line">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.03}>
              <div className="group grid gap-4 border-t border-line py-7 transition-colors md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10">
                <h3 className="flex items-baseline gap-4 text-xl font-medium tracking-[-0.02em]">
                  <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                  {g.group}
                </h3>
                <ul className="flex flex-wrap gap-x-2 gap-y-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          index="05"
          label="Education & community"
          title={
            <>
              First Class, <span className="serif-em text-accent">and still learning.</span>
            </>
          }
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-2xl bg-ink p-8 text-bg md:p-12">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-[90px]" />
              <div className="relative flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">{education.honours}</span>
                  <span className="font-mono text-xs opacity-60">{education.period}</span>
                </div>
                <h3 className="mt-6 text-[clamp(1.8rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                  {education.degree}
                </h3>
                <p className="mt-2 opacity-70">{education.school}, Sri Lanka</p>

                <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-50">GPA</p>
                    <p className="mt-1 text-[clamp(3.5rem,8vw,6.5rem)] font-medium leading-none tracking-[-0.06em]">
                      3.79<span className="ml-2 text-[0.3em] tracking-normal opacity-50">/ 4.00</span>
                    </p>
                  </div>
                  <ul className="flex max-w-md flex-wrap gap-1.5">
                    {education.coursework.map((c) => (
                      <li key={c} className="rounded-full border border-bg/20 px-3 py-1 text-xs opacity-80">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-line p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Training</p>
                <ul className="mt-5 space-y-5">
                  {training.map((t) => (
                    <li key={t.title}>
                      <p className="font-medium leading-snug">{t.title}</p>
                      <p className="mt-1 text-sm text-muted">
                        {t.org} · {t.year}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="h-full rounded-2xl border border-line p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Leadership & activities</p>
                <ul className="mt-5 space-y-4">
                  {leadership.map((l) => (
                    <li key={l.title + l.org}>
                      <p className="font-medium leading-snug">{l.title}</p>
                      <p className="mt-0.5 text-sm text-muted">
                        {l.org}
                        {l.year && ` · ${l.year}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
