import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight, Briefcase, Copy, FileText, Github, GraduationCap, Hash, Linkedin, Mail, Moon, Search, Wrench, User, Layers,
} from "lucide-react";
import { profile, projects } from "../data";

type Item = { id: string; label: string; hint: string; group: string; icon: React.ElementType; run: () => void };

export default function CommandPalette({
  open,
  onClose,
  onToggleTheme,
}: {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
}) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const open_ = (url: string) => () => window.open(url, "_blank", "noopener");

  const items: Item[] = useMemo(
    () => [
      { id: "about", label: "About", hint: "Section", group: "Navigate", icon: User, run: go("about") },
      { id: "work", label: "Selected work", hint: "Section", group: "Navigate", icon: Layers, run: go("work") },
      { id: "experience", label: "Experience", hint: "Section", group: "Navigate", icon: Briefcase, run: go("experience") },
      { id: "skills", label: "Skills", hint: "Section", group: "Navigate", icon: Wrench, run: go("skills") },
      { id: "education", label: "Education", hint: "Section", group: "Navigate", icon: GraduationCap, run: go("education") },
      { id: "contact", label: "Contact", hint: "Section", group: "Navigate", icon: Mail, run: go("contact") },
      { id: "email", label: "Send an email", hint: profile.email, group: "Actions", icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "copy", label: "Copy email address", hint: "Clipboard", group: "Actions", icon: Copy, run: () => navigator.clipboard?.writeText(profile.email) },
      { id: "cv", label: "Download CV", hint: "PDF", group: "Actions", icon: FileText, run: open_(profile.cv) },
      { id: "theme", label: "Toggle theme", hint: "Light / dark", group: "Actions", icon: Moon, run: onToggleTheme },
      { id: "gh", label: "GitHub", hint: "github.com/sameerajayakodi", group: "Links", icon: Github, run: open_(profile.github) },
      { id: "li", label: "LinkedIn", hint: "linkedin.com/in/sameera-jayakodi", group: "Links", icon: Linkedin, run: open_(profile.linkedin) },
      ...projects.map((p) => ({
        id: `p-${p.id}`,
        label: p.title,
        hint: p.kicker,
        group: "Projects",
        icon: Hash,
        run: p.live ? open_(p.live) : go("work"),
      })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onToggleTheme],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => `${it.label} ${it.hint} ${it.group}`.toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setI(0), [q]);

  const run = (it?: Item) => {
    if (!it) return;
    onClose();
    setTimeout(it.run, 60);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((v) => Math.min(v + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((v) => Math.max(v - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[i]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.getElementById(`cmd-${filtered[i]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [i, filtered]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Jump to a section, project or action…"
                className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-faint focus-visible:outline-none"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && <li className="px-3 py-10 text-center text-sm text-muted">No results for “{q}”</li>}
              {filtered.map((it, idx) => {
                const header = it.group !== lastGroup;
                lastGroup = it.group;
                return (
                  <li key={it.id}>
                    {header && (
                      <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{it.group}</p>
                    )}
                    <button
                      id={`cmd-${it.id}`}
                      role="option"
                      aria-selected={idx === i}
                      onMouseMove={() => setI(idx)}
                      onClick={() => run(it)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        idx === i ? "bg-ink/[0.07] text-ink" : "text-muted"
                      }`}
                    >
                      <it.icon className={`h-4 w-4 ${idx === i ? "text-accent" : ""}`} />
                      <span className="text-ink">{it.label}</span>
                      <span className="ml-auto truncate pl-4 text-xs text-faint">{it.hint}</span>
                      {idx === i && <ArrowRight className="h-3.5 w-3.5 text-accent" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
