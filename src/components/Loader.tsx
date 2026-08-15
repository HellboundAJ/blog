import { useEffect, useState } from "react";
import eyeball from "@/assets/eyeball.png.asset.json";

const TRAIL = [
  { delay: "0s", opacity: 1, scale: 1 },
  { delay: "-0.07s", opacity: 0.4, scale: 0.94 },
  { delay: "-0.14s", opacity: 0.22, scale: 0.88 },
  { delay: "-0.21s", opacity: 0.1, scale: 0.82 },
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
      <div className="relative h-36 w-36" aria-hidden>
        {TRAIL.map((t, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              animation: "orbit 1s cubic-bezier(.5,.05,.5,.95) infinite",
              animationDelay: t.delay,
              opacity: t.opacity,
            }}
          >
            <img
              src={eyeball.url}
              alt=""
              width={92}
              height={31}
              className="pixelated absolute left-1/2 top-0 w-[92px]"
              style={{ transform: `translate(-50%, -50%) scaleX(-1) scale(${t.scale})` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
