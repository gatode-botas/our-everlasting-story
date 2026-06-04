import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Lightbox({ src, onClose, onPrev, onNext }: { src: string | null; onClose: () => void; onPrev: () => void; onNext: () => void; }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-8 text-gold text-4xl hover:scale-125 transition-transform">‹</button>
          <motion.img
            key={src}
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            src={src} alt="" className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-rose object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-8 text-gold text-4xl hover:scale-125 transition-transform">›</button>
          <button onClick={onClose} className="absolute top-4 right-4 text-gold text-2xl hover:scale-125 transition-transform">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}