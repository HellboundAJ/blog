import { useEffect, useRef, useState } from "react";
import watcher from "@/assets/watcher.png";

/**
 * The Watcher rises from the bottom-left once the reader has scrolled far
 * enough into the page. Once he is up, he stays up — scrolling back does not
 * send him away. Only the X dismisses him.
 */
export function Watcher() {
  const [shown, setShown] = useState(false);
  const [closed, setClosed] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (shownRef.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (p > 0.28) {
        shownRef.current = true;
        setShown(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed) return null;

  return (
    <div
      aria-hidden={!shown}
      className="pointer-events-none fixed bottom-0 left-2 z-30 hidden select-none md:block"
      style={{
        transform: shown ? "translateY(0)" : "translateY(110%)",
        opacity: shown ? 1 : 0,
        transition: "transform 1400ms cubic-bezier(.22,.8,.2,1), opacity 900ms linear",
      }}
    >
      <div className="relative" style={{ width: 150 }}>
        {shown && (
          <button
            onClick={() => setClosed(true)}
            aria-label="Dismiss"
            className="pointer-events-auto absolute -right-1 top-0 z-10 border-2 border-border bg-card px-1.5 py-0.5 font-pixel text-[7px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            X
          </button>
        )}
        <img
          src={watcher}
          alt=""
          loading="lazy"
          style={{ width: 150, filter: "drop-shadow(0 0 26px rgba(255,60,30,0.32))" }}
          className="opacity-90"
        />
      </div>
    </div>
  );
}
