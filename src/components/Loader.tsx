import { useEffect, useState } from "react";
import eyeball from "@/assets/eyeball.png.asset.json";

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
        className="relative h-56 w-56"
        style={{ animation: "orbit 1.2s linear infinite" }}
        aria-hidden
      >
        <img
          src={eyeball.url}
          alt=""
          width={130}
          height={44}
          className="pixelated absolute left-1/2 top-0 w-[130px]"
          style={{ transform: "translate(-50%, -50%) scaleX(-1)" }}
        />
      </div>
    </div>
  );
}
