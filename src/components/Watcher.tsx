import { useEffect, useState } from "react";
import watcher from "@/assets/watcher.png.asset.json";

/**
 * The Watcher rises from the bottom-right once the reader is deep enough
 * into a page. Once he shows up he stays until dismissed with the X.
 */
export function Watcher() {
  const [shown, setShown] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (p > 0.3) setShown(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed) return null;

  return (
    <div
      aria-hidden={!shown}
      className="pointer-events-none fixed bottom-0 right-4 z-30 hidden select-none md:block"
      style={{
        transform: shown ? "translateY(0)" : "translateY(110%)",
        opacity: shown ? 1 : 0,
        transition: "transform 1100ms cubic-bezier(.22,.8,.2,1), opacity 700ms linear",
      }}
    >
      <div className="relative w-[110px]">
        {shown && (
          <button
            onClick={() => setClosed(true)}
            aria-label="Dismiss the watcher"
            className="pointer-events-auto absolute -left-1 top-0 z-10 border-2 border-border bg-card px-1.5 py-0.5 font-pixel text-[7px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            X
          </button>
        )}
        <img
          src={watcher.url}
          alt=""
          width={110}
          height={173}
          loading="lazy"
          className="w-[110px] opacity-90 drop-shadow-[0_0_24px_rgba(255,120,40,0.25)]"
        />
      </div>
    </div>
  );
}
