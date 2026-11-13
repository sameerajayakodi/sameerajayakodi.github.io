import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, animate } from "motion/react";
import { profile } from "../data";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-center gap-4 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">{index}</span>
          <span>{label}</span>
          <span className="ml-auto hidden sm:block">Sameera Jayakodi — Portfolio ’26</span>
        </div>
      </Reveal>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            {title}
          </h2>
        </Reveal>
        {aside && <Reveal delay={0.1}>{aside}</Reveal>}
      </div>
    </div>
  );
}

export function useLocalTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: profile.timezone,
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">
      {children}
    </span>
  );
}
