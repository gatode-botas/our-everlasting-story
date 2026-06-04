import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  useEffect(() => {
    let raf: number;
    const animate = () => {
      setRingPos(prev => ({ x: prev.x + (pos.x - prev.x) * 0.18, y: prev.y + (pos.y - prev.y) * 0.18 }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);
  return (
    <>
      <div className="cursor-dot" style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-ring" style={{ left: ringPos.x, top: ringPos.y }} />
    </>
  );
}