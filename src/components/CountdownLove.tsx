import { useEffect, useState } from "react";

// Start date: 1 year 8 months before June 4, 2026 = October 4, 2024
const START = new Date("2024-10-04T00:00:00");

function diff(now: Date) {
  let years = now.getFullYear() - START.getFullYear();
  let months = now.getMonth() - START.getMonth();
  let days = now.getDate() - START.getDate();
  let hours = now.getHours() - START.getHours();
  let minutes = now.getMinutes() - START.getMinutes();
  let seconds = now.getSeconds() - START.getSeconds();
  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prev = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prev; months--;
  }
  if (months < 0) { months += 12; years--; }
  return { years, months, days, hours, minutes, seconds };
}

export function CountdownLove() {
  const [t, setT] = useState(() => diff(new Date()));
  useEffect(() => {
    const i = setInterval(() => setT(diff(new Date())), 1000);
    return () => clearInterval(i);
  }, []);
  const items = [
    { v: t.years, l: "Anos" },
    { v: t.months, l: "Meses" },
    { v: t.days, l: "Dias" },
    { v: t.hours, l: "Horas" },
    { v: t.minutes, l: "Minutos" },
    { v: t.seconds, l: "Segundos" },
  ];
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
      {items.map((it) => (
        <div key={it.l} className="relative group">
          <div className="absolute inset-0 bg-gradient-gold opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl" />
          <div className="relative bg-card/60 backdrop-blur-md border border-[color:var(--gold)]/30 rounded-2xl p-4 md:p-6 text-center shadow-glow">
            <div className="font-display text-3xl md:text-5xl text-gradient-gold tabular-nums">
              {String(it.v).padStart(2, "0")}
            </div>
            <div className="font-serif-body text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground mt-2">
              {it.l}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}