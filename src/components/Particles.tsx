import { useEffect, useRef } from "react";

export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const N = Math.min(90, Math.floor((w * h) / 18000));
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.25 - 0.05,
      a: Math.random() * Math.PI * 2,
      hue: Math.random() < 0.6 ? 50 : 10,
    }));
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.a += 0.04;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        const alpha = 0.5 + Math.sin(p.a) * 0.4;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 70%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />;
}

export function FloatingHearts() {
  const hearts = Array.from({ length: 14 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => {
        const left = Math.random() * 100;
        const dur = 14 + Math.random() * 16;
        const delay = Math.random() * 20;
        const size = 10 + Math.random() * 16;
        const drift = (Math.random() - 0.5) * 200;
        return (
          <div
            key={i}
            className="floating-heart absolute"
            style={{
              left: `${left}%`,
              bottom: 0,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              fontSize: `${size}px`,
              ['--drift' as any]: `${drift}px`,
              color: i % 2 === 0 ? 'oklch(0.78 0.12 10 / 0.5)' : 'oklch(0.85 0.15 85 / 0.4)',
            }}
          >
            ♥
          </div>
        );
      })}
    </div>
  );
}