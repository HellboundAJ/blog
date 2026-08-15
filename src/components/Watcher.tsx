import { useEffect, useState } from "react";
import watcher from "@/assets/watcher.png.asset.json";
import treeman from "@/assets/treeman.png.asset.json";

function Creeper({
  src,
  side,
  width,
  threshold,
  glow,
}: {
  src: string;
  side: "left" | "right";
  width: number;
  threshold: number;
  glow: string;
}) {
  const [shown, setShown] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (p > threshold) setShown(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  if (closed) return null;

  return (
    <div
      aria-hidden={!shown}
      className={`pointer-events-none fixed bottom-0 z-30 hidden select-none md:block ${
        side === "left" ? "left-2" : "right-2"
      }`}
      style={{
        transform: shown ? "translateY(0)" : "translateY(110%)",
        opacity: shown ? 1 : 0,
        transition: "transform 1400ms cubic-bezier(.22,.8,.2,1), opacity 900ms linear",
      }}
    >
      <div className="relative" style={{ width }}>
        {shown && (
          <button
            onClick={() => setClosed(true)}
            aria-label="Dismiss"
            className={`pointer-events-auto absolute top-0 z-10 border-2 border-border bg-card px-1.5 py-0.5 font-pixel text-[7px] text-muted-foreground transition-colors hover:border-primary hover:text-primary ${
              side === "left" ? "-right-1" : "-left-1"
            }`}
          >
            X
          </button>
        )}
        <img
          src={src}
          alt=""
          loading="lazy"
          style={{ width, filter: `drop-shadow(0 0 26px ${glow})` }}
          className="opacity-90"
        />
      </div>
    </div>
  );
}

/**
 * Two lurkers rise from the bottom as the reader scrolls: the cloaked Watcher
 * on the left, the rooted Treeman on the right. Each stays until dismissed.
 */
export function Watcher() {
  return (
    <>
      <Creeper
        src={watcher.url}
        side="left"
        width={150}
        threshold={0.28}
        glow="rgba(255,120,40,0.28)"
      />
      <Creeper
        src={treeman.url}
        side="right"
        width={170}
        threshold={0.45}
        glow="rgba(255,90,40,0.22)"
      />
    </>
  );
}
