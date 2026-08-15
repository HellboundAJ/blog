import { useEffect, useState } from "react";
import eyeball from "@/assets/eyeball.png.asset.json";

export function Loader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setFading(true), 1500);
    const b = setTimeout(() => setGone(true), 2100);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{ backgroundColor: "var(--background)" }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative h-64 w-64">
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-border" />
        <div
          className="absolute inset-0"
          style={{ animation: "orbit 1.4s linear infinite" }}
          aria-hidden
        >
          <img
            src={eyeball.url}
            alt=""
            width={150}
            height={51}
            className="pixelated absolute left-1/2 top-0 w-[150px] -translate-x-1/2 -translate-y-4 drop-shadow-[0_0_18px_rgba(255,70,20,0.6)]"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-primary/30 blur-2xl" />
        </div>
      </div>

      <p className="ember-text mt-6 font-pixel text-[10px] tracking-widest">
        SUMMONING<span className="flicker">...</span>
      </p>
    </div>
  );
}
