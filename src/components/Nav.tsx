import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Command, Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { profile } from "../data";

export const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav({
  dark,
  onToggleTheme,
  onOpenPalette,
}: {
  dark: boolean;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
}) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <nav
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
            scrolled
              ? "border-line bg-bg/70 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
          aria-label="Primary"
        >
          <a href="#top" className="group flex items-center gap-2.5 pl-1.5" aria-label="Back to top">
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-ink text-bg">
              <span className="serif-em text-[17px] leading-none">sj</span>
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                    active === s.id ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-ink/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenPalette}
              className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition hover:border-ink/30 hover:text-ink sm:flex"
              aria-label="Open command menu"
            >
              <Command className="h-3 w-3" /> K
            </button>
            <button
              onClick={onToggleTheme}
              className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:bg-ink/[0.07] hover:text-ink"
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="hidden items-center gap-1 rounded-full bg-ink px-4 py-1.5 text-[13px] font-medium text-bg transition hover:bg-accent hover:text-white lg:flex"
            >
              Get in touch <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-8 w-8 place-items-center rounded-full text-ink md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-bg px-6 pb-10 pt-6 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-12 space-y-2">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-3 text-5xl font-medium tracking-[-0.04em]"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 text-sm text-muted">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={profile.cv} target="_blank" rel="noreferrer">CV ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
