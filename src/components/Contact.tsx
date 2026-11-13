import { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data";
import { Reveal, useLocalTime } from "./ui";

export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return { copied, copy };
}

export default function Contact() {
  const { copied, copy } = useCopyEmail();
  const time = useLocalTime();

  const links = [
    { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
    { label: "GitHub", href: profile.github, icon: Github },
    { label: "Download CV", href: profile.cv, icon: FileText },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-4 pb-10 pt-28 sm:px-6 md:pt-40">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/15 blur-[150px]" />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex items-center gap-4 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="text-accent">06</span>
            <span>Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-12 text-[clamp(3.2rem,11vw,10.5rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
            Let’s build
            <br />
            <span className="serif-em font-normal text-accent">something</span> real.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="max-w-lg text-lg text-muted">
              Building something with React, Node.js, Spring Boot or AI automation? I’d like to hear about it. Email is the fastest way to reach me.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-3 pl-5 pr-3 text-[clamp(0.95rem,1.6vw,1.15rem)] font-medium text-bg transition hover:bg-accent hover:text-white"
              >
                <Mail className="h-4 w-4" />
                <span className="break-all">{profile.email}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg/15">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </span>
              </a>
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-3 text-sm transition hover:border-ink"
                aria-live="polite"
              >
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <ul className="divide-y divide-line border-y border-line">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-4 text-lg tracking-tight transition-colors hover:text-accent"
                  >
                    <span className="flex items-center gap-3">
                      <l.icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                      {l.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <footer className="mt-32 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Homagama, LK — {time} local</span>
          <span className="hidden md:block">Built with React · Vite · Tailwind</span>
          <a href="#top" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
