import { useEffect, useRef } from "react";

/** Slow drifting ember particles. Only visible in dark (hell) mode. */
export function Embers() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 700 ? 26 : 55;
    const parts = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      s: 1 + Math.random() * 2.5,
      v: 0.2 + Math.random() * 0.6,
      d: Math.random() * Math.PI * 2,
      a: 0.25 + Math.random() * 0.5,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of parts) {
        p.y -= p.v;
        p.d += 0.01;
        p.x += Math.sin(p.d) * 0.35;
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.s > 2 ? "#ff8a3d" : "#ff3b1f";
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden opacity-70 dark:block"
    />
  );
}
