import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Category, type Project } from "../data";
import { SectionHead, Tag } from "./ui";
import WorkArt from "./WorkArt";

const filters: ("All" | Category)[] = ["All", "Production", "AI & Automation", "Personal"];

function Visual({ p }: { p: Project }) {
  if (p.image) {
    const host = p.live ? new URL(p.live).host : "";
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-line bg-surface px-3">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="mx-auto rounded-md bg-bg-2 px-3 py-0.5 font-mono text-[10px] text-muted">{host}</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <img
            src={p.image}
            alt={`${p.title} screenshot`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="dot-grid relative h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
      <WorkArt project={p} />
    </div>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-bg-2">
        <Visual p={p} />
        {!p.image && (
          <>
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-bg/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink backdrop-blur">
              {p.category}
            </span>
            <span className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
          </>
        )}
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {p.kicker} · {p.year}
          </p>
          <h3 className="mt-2 text-[clamp(1.5rem,2.2vw,2rem)] font-medium leading-tight tracking-[-0.035em]">
            {p.title}
          </h3>
        </div>
        <div className="flex shrink-0 gap-1.5 pt-1">
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-ink hover:text-ink"
              aria-label={`${p.title} source on GitHub`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bg transition hover:bg-accent hover:text-white"
              aria-label={`Open ${p.title} live`}
            >
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
          )}
        </div>
      </div>

      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{p.summary}</p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {p.points.map((pt) => (
          <li key={pt} className="flex gap-3">
            <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
            <span className="text-ink/85">{pt}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
        {p.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
        <span className="ml-auto pl-2 text-xs text-faint">{p.context}</span>
      </div>
    </article>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="work" className="scroll-mt-24 bg-bg-2/60 px-4 py-28 sm:px-6 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          index="02"
          label="Selected work"
          title={
            <>
              Systems in production, <span className="serif-em text-accent">and the ones I build for fun.</span>
            </>
          }
          aside={
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter projects">
              {filters.map((f) => {
                const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
                return (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={filter === f}
                    onClick={() => setFilter(f)}
                    className={`relative rounded-full px-4 py-2 text-[13px] transition-colors ${
                      filter === f ? "text-bg" : "text-muted hover:text-ink"
                    }`}
                  >
                    {filter === f && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {f} <sup className="font-mono text-[9px] opacity-60">{count}</sup>
                    </span>
                  </button>
                );
              })}
            </div>
          }
        />

        <motion.div layout className="grid gap-x-10 gap-y-20 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const row = Math.floor(i / 2);
              const left = i % 2 === 0;
              const wide = (row % 2 === 0) === left;
              const span = list.length === 1 ? "md:col-span-12" : wide ? "md:col-span-7" : "md:col-span-5";
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`${span} ${!wide && !left ? "md:pt-24" : ""}`}
                >
                  <ProjectCard p={p} index={projects.indexOf(p)} />
                </motion.div>
              );
            })}
            <motion.div
              key="more"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={list.length % 2 === 1 ? "md:col-span-5 md:pt-24" : "md:col-span-12"}
            >
              <div
                className={`flex h-full flex-col justify-between gap-8 rounded-2xl border border-dashed border-line p-8 md:p-10 ${
                  list.length % 2 === 1 ? "md:aspect-[16/10.5]" : "md:flex-row md:items-center"
                }`}
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Behind the NDA</p>
                  <p className="mt-4 max-w-md text-[clamp(1.3rem,2vw,1.7rem)] leading-snug tracking-[-0.025em]">
                    Most of my production work is private client software.
                    <span className="text-muted"> Happy to walk through the architecture and decisions on a call.</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition hover:bg-accent hover:text-white"
                  >
                    Book a walkthrough <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/sameerajayakodi"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition hover:border-ink"
                  >
                    <Github className="h-4 w-4" /> More on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
