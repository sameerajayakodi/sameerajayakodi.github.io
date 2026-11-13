import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { profile } from "../data";
import { useLocalTime } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

function SplitWord({ word, delay }: { word: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-flex overflow-hidden pb-[0.06em]" aria-hidden>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? false : { y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, delay: delay + i * 0.035, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const time = useLocalTime();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const meta = [
    { k: "Role", v: `${profile.role} at Adeona Technologies` },
    { k: "Local time", v: `Homagama, LK — ${time}` },
    { k: "Focus", v: "MCP servers, LLM chatbots & n8n" },
  ];

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-4 pb-8 pt-28 sm:px-6 md:pt-32"
    >
      {/* Background: dot grid + cursor spotlight + accent glow */}
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 70%) var(--my, 30%), var(--accent-soft), transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        <motion.dl
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-1 gap-3 border-b border-line pb-5 font-mono text-[11px] uppercase tracking-[0.14em] sm:grid-cols-3"
        >
          {meta.map((m) => (
            <div key={m.k} className="flex gap-3">
              <dt className="text-faint">{m.k}</dt>
              <dd className="text-muted">{m.v}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div style={{ y: nameY, opacity: fade }} className="flex flex-1 flex-col justify-center py-6">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="mb-4 flex items-center gap-3 text-sm text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Software engineer — full-stack & AI automation
          </motion.p>

          <h1 className="select-none text-[clamp(4.2rem,min(15vw,25svh),15rem)] font-semibold leading-[0.82] tracking-[-0.065em]">
            <span className="sr-only">{profile.name}</span>
            <span className="block">
              <SplitWord word="Sameera" delay={0.35} />
            </span>
            <span className="flex items-end gap-[0.12em]">
              <span className="mb-[0.18em] hidden max-w-[16ch] text-[clamp(0.9rem,1.25vw,1.15rem)] font-normal leading-snug tracking-normal text-muted lg:block">
                <span className="serif-em text-[1.5em] text-ink">builds the whole thing</span>
                <br />— from the schema to the screen, and stays for what happens after launch.
              </span>
              <span className="ml-auto lg:ml-0">
                <SplitWord word="Jayakodi" delay={0.55} />
              </span>
              <motion.span
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1.1, ease }}
                className="mb-[0.14em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-accent"
                aria-hidden
              />
            </span>
          </h1>
        </motion.div>

        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="max-w-xl"
          >
            <p className="text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-muted">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition hover:bg-accent hover:text-white"
              >
                See selected work
                <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </a>
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium transition hover:border-ink/40"
              >
                <FileText className="h-4 w-4" /> Download CV
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2 py-3 text-sm text-muted transition hover:text-ink"
              >
                LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          <motion.a
            href="#about"
            aria-label="Scroll to about"
            initial={reduce ? false : { opacity: 0, rotate: -40 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1.4, delay: 1, ease }}
            className="group relative hidden h-36 w-36 shrink-0 md:block"
          >
            <svg viewBox="0 0 100 100" className="spin-slow h-full w-full text-muted">
              <defs>
                <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current font-mono text-[7.4px] uppercase tracking-[0.2em]">
                <textPath href="#badge-circle">Full-stack · AI automation · Sri Lanka ·</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-white transition-transform duration-500 group-hover:scale-110">
              <ArrowDown className="h-5 w-5" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
