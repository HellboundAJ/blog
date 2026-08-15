import { useEffect, useState } from "react";
import eyeball from "@/assets/eyeball.png.asset.json";

/**
 * Loading screen: a single pixel eyeball dragging its nerves around a circle.
 * The trail copies are progressively rotated around the eyeball itself, so the
 * nerves bend along the arc instead of looking like a flat image being spun.
 */
const TRAIL = [
  { delay: "0s", opacity: 1, scale: 1, bend: 0 },
  { delay: "-0.05s", opacity: 0.55, scale: 0.97, bend: -7 },
  { delay: "-0.1s", opacity: 0.34, scale: 0.93, bend: -14 },
  { delay: "-0.15s", opacity: 0.2, scale: 0.89, bend: -21 },
  { delay: "-0.2s", opacity: 0.11, scale: 0.85, bend: -28 },
  { delay: "-0.26s", opacity: 0.05, scale: 0.8, bend: -36 },
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
        style={{ width: "min(9rem, 46vw)", height: "min(9rem, 46vw)" }}
      >
        {TRAIL.map((t, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              animation: "orbit 1.15s linear infinite",
              animationDelay: t.delay,
              opacity: t.opacity,
              filter: i === 0 ? "none" : `blur(${i * 0.5}px)`,
            }}
          >
            <img
              src={eyeball.url}
              alt=""
              width={92}
              height={31}
              className="pixelated absolute left-1/2 top-0 w-[64%] max-w-[92px]"
              style={{
                transformOrigin: "18% 50%",
                transform: `translate(-14%, -50%) scaleX(-1) rotate(${t.bend}deg) scale(${t.scale})`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
