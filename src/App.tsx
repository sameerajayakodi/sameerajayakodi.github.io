import { useCallback, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About, { Marquee } from "./components/About";
import Work from "./components/Work";
import { Education, Experience, Skills } from "./components/Experience";
import Contact from "./components/Contact";
import CommandPalette from "./components/CommandPalette";

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, [dark]);
  const toggle = useCallback(() => setDark((d) => !d), []);
  return { dark, toggle };
}

export default function App() {
  const { dark, toggle } = useTheme();
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA/.test((e.target as HTMLElement)?.tagName ?? "");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setPalette(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grain" aria-hidden />
      <a
        href="#about"
        className="fixed left-4 top-4 z-[90] -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav dark={dark} onToggleTheme={toggle} onOpenPalette={() => setPalette(true)} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <CommandPalette open={palette} onClose={() => setPalette(false)} onToggleTheme={toggle} />
    </>
  );
}
