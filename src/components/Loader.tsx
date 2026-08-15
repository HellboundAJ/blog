import { useEffect, useState } from "react";
import eyeball from "@/assets/eyeball.png";

/**
 * Loading screen: a single pixel eyeball dragging its nerves around a circle.
 * Several delayed copies trail behind the lead eyeball so it feels like a
 * sweeping flame rather than a static image being spun.
 */
const TRAIL = [
  { delay: "0s", opacity: 1, scale: 1 },
  { delay: "-0.05s", opacity: 0.35, scale: 0.94 },
  { delay: "-0.1s", opacity: 0.15, scale: 0.86 },
];


export function Loader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setFading(true), 1600);
    const b = setTimeout(() => setGone(true), 2200);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{ backgroundColor: "var(--background)" }}
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="relative"
        aria-hidden
        style={{ width: "min(11rem, 55vw)", height: "min(11rem, 55vw)" }}
      >
        {TRAIL.map((t, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              animation: "orbit 1.3s linear infinite",
              animationDelay: t.delay,
              opacity: t.opacity,
            }}
          >
            <img
              src={eyeball.url}
              alt=""
              width={92}
              height={31}
              className="pixelated absolute left-1/2 top-0 w-[52%] max-w-[92px]"
              style={{
                transform: `translate(-50%, -50%) scaleX(-1) scale(${t.scale})`,
                filter:
                  i === 0
                    ? "drop-shadow(0 0 10px oklch(0.55 0.22 25 / 0.65))"
                    : undefined,
              }}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
