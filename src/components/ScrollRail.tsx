import { useEffect, useState } from "react";

export function ScrollRail() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("hb-theme");
    const isDark = saved !== "light";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("hb-theme", next ? "dark" : "light");
  };

  const btn =
    "flex h-10 w-10 items-center justify-center border-2 border-border bg-card font-pixel text-[10px] text-muted-foreground transition-colors hover:border-primary hover:text-primary";

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-2">
      <button className={btn} onClick={toggle} aria-label="Toggle theme">
        {dark ? "☾" : "☀"}
      </button>
      <button
        className={btn}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        ▲
      </button>
      <button
        className={btn}
        onClick={() =>
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
        }
        aria-label="Scroll to bottom"
      >
        ▼
      </button>
    </div>
  );
}
