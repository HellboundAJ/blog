import { useEffect, useState } from "react";
import watcher from "@/assets/watcher.png.asset.json";

/**
 * The Watcher peeks in from the right edge once the reader has scrolled
 * a while into a page. Only part of him is ever visible, and he can be dismissed.
 */
export function Watcher() {
  const [peek, setPeek] = useState(0); // 0..1
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      // starts creeping in at 25% scrolled, fully peeked at 55%
      setPeek(Math.max(0, Math.min(1, (p - 0.25) / 0.3)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed) return null;

  const visible = peek > 0.02;

  return (
    <div
      aria-hidden={!visible}
      className="pointer-events-none fixed bottom-0 right-0 z-30 hidden select-none md:block"
      style={{
        transform: `translateX(${(1 - peek) * 100}%)`,
        opacity: visible ? 1 : 0,
        transition: "transform 700ms cubic-bezier(.22,.8,.2,1), opacity 500ms linear",
      }}
    >
      <div className="relative w-[190px] overflow-hidden">
        {visible && (
          <button
            onClick={() => setClosed(true)}
            aria-label="Dismiss the watcher"
            className="pointer-events-auto absolute left-1 top-1 z-10 border-2 border-border bg-card px-2 py-0.5 font-pixel text-[8px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            X
          </button>
        )}
        {/* only the left half of him ever slides into frame */}
        <img
          src={watcher.url}
          alt=""
          width={330}
          height={520}
          loading="lazy"
          className="w-[330px] max-w-none translate-y-6 opacity-90 drop-shadow-[0_0_30px_rgba(255,120,40,0.25)]"
        />
      </div>
    </div>
  );
}
