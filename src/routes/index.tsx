import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { photos, gallery } from "@/lib/photos";
import { Cursor } from "@/components/Cursor";
import { Particles, FloatingHearts } from "@/components/Particles";
import { CountdownLove } from "@/components/CountdownLove";
import { Lightbox } from "@/components/Lightbox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "1 Ano e 8 Meses — Para Minha Rapunzel 💖" },
      { name: "description", content: "Uma carta de amor cinematográfica para celebrar 1 ano e 8 meses do nosso amor." },
      { property: "og:title", content: "1 Ano e 8 Meses — Para Minha Rapunzel 💖" },
      { property: "og:description", content: "Uma carta de amor cinematográfica para celebrar 1 ano e 8 meses do nosso amor." },
    ],
  }),
  component: Index,
});

function Index() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [burst, setBurst] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const timeline = [
    { title: "O dia em que nos conhecemos", img: photos.conhecemos, text: "Não esperava que a pessoa que eu mais iria amar estivesse bem ao meu lado naquele dia. Eu só conseguia observar o quanto você era linda. Mesmo que não exista uma foto exatamente desse momento, essa lembrança ficou guardada para sempre na minha memória. Quem diria que aquela menina tão linda se tornaria o amor da minha vida? Eu te amo, chata. 💖" },
    { title: "Nosso primeiro encontro", img: photos.encontro, text: "Eu estava muito ansioso e nervoso, mas quando nos vimos, nos abraçamos e começamos a conversar, tudo aconteceu de forma tão natural que eu nem percebi que era a primeira vez que estávamos saindo juntos. Parecia que já nos conhecíamos há muito tempo. Desde aquele momento, eu senti o quanto estar ao seu lado era algo especial. 💖" },
    { title: "Nosso primeiro beijo", img: photos.beijo, text: "Nosso primeiro beijo foi incrível em todos os aspectos. Foi um momento especial, divertido e inesquecível. Além de ter sido um beijo maravilhoso, ainda conseguimos quebrar uma cadeira no processo e ficar morrendo de vergonha depois. Até hoje, quando lembro desse momento, eu sorrio. Foi um dos dias mais marcantes da minha vida e uma lembrança que vou guardar para sempre no coração. 💖" },
    { title: "Nossas primeiras fotos juntos", img: photos.primeiras[0], text: "Naquela época, eu nem imaginava que estava tirando fotos com o amor da minha vida. Foram fotos simples, tiradas enquanto brincávamos e aproveitávamos o momento, mas hoje elas têm um significado enorme para mim. E vale lembrar que você não quis tirar foto comigo na escola, vacilona. Mas, mesmo assim, eu te amo muito e sou grato por cada foto, cada memória e cada momento que vivemos juntos. 💖" },
    { title: "Momentos inesquecíveis", img: photos.momentos[0], text: "Esses são alguns dos momentos inesquecíveis que sempre me fazem lembrar o porquê de eu te amar tanto. Cada lembrança, cada sorriso, cada abraço e cada momento ao seu lado reforçam o quanto você é especial para mim. Você é a minha princesa, o amor da minha vida e a pessoa com quem eu quero continuar criando memórias para sempre. Eu te amo, minha princesa. 💖" },
    { title: "Hoje", img: photos.hoje, text: "Hoje simplesmente completamos 1 ano e 8 meses juntos. 💖 Quero te dizer que te amo muito e agradecer por tudo. Você é o meu tudo, amor da minha vida. Obrigado por ser o motivo de eu acordar todas as manhãs querendo ser uma pessoa melhor. Hoje completamos mais um mês juntos, e eu espero que essa data, dia 4, se repita por muitas e muitas vezes. Você é minha Rapunzel, minha princesa, meu amor e meu maior sonho realizado. Feliz 1 ano e 8 meses, meu amor. Eu te amo infinitamente. 💖" },
  ];

  const reasons = [
    { icon: "🌸", title: "Seu sorriso", text: "Capaz de iluminar até o meu pior dia." },
    { icon: "🤍", title: "Seu carinho", text: "O lugar mais seguro do mundo." },
    { icon: "✨", title: "Sua companhia", text: "Com você, qualquer momento é especial." },
    { icon: "🍑", title: "Seu bundão", text: "Não tinha como não citar, princesa." },
    { icon: "👑", title: "Seu jeito único", text: "Não existe ninguém igual a você." },
    { icon: "💖", title: "Seu coração", text: "Imenso, generoso, e meu." },
    { icon: "🌷", title: "Seu peitão", text: "Confortável demais, meu refúgio." },
    { icon: "🕯️", title: "Seu apoio", text: "Em todos os momentos, sem falhar." },
    { icon: "🌙", title: "Você me faz feliz", text: "Mais do que eu jamais sonhei ser." },
  ];

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioOn) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setAudioOn(!audioOn);
  };

  const openSurprise = () => {
    setBurst(true);
    setTimeout(() => setSurpriseOpen(true), 400);
    setTimeout(() => setBurst(false), 2500);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Cursor />
      <Particles />
      <FloatingHearts />

      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/10/30/audio_347c1e4a55.mp3" />

      {/* Audio toggle */}
      <button
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-card/60 backdrop-blur-md border border-[color:var(--gold)]/40 flex items-center justify-center text-gold hover:scale-110 transition-transform shadow-glow"
        aria-label="Toggle music"
      >
        {audioOn ? "♪" : "♫"}
      </button>

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img src={photos.beijo} alt="" className="w-full h-full object-cover" style={{ filter: "blur(6px) brightness(0.45)" }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.2 }}
            className="font-script text-2xl md:text-3xl text-rose mb-6"
          >
            ✦ Para a minha Rapunzel ✦
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.4 }}
            className="font-display text-4xl md:text-7xl lg:text-8xl leading-tight mb-8"
          >
            <span className="shimmer-text">Feliz 1 Ano</span>
            <br />
            <span className="font-script text-5xl md:text-8xl text-gradient-gold">& 8 meses</span>
            <br />
            <span className="shimmer-text">Meu Amor</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.4 }}
            className="font-serif-body italic text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            "Cada momento ao seu lado transformou minha vida em algo muito mais significativo, trazendo uma luz a ela."
          </motion.p>
          <motion.a
            href="#historia"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 1 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 rounded-full bg-gradient-gold text-primary-foreground font-display tracking-widest text-sm md:text-base shadow-glow hover:shadow-rose transition-shadow"
          >
            Começar Nossa História
          </motion.a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold text-3xl z-10"
        >
          ↓
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section id="historia" className="relative py-32 px-6">
        <SectionTitle eyebrow="Nossa Jornada" title="Nossa História" />
        <div className="relative max-w-6xl mx-auto mt-20">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/60 to-transparent hidden md:block" />
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative py-32 px-6">
        <SectionTitle eyebrow="Memórias" title="Nossas Memórias Mais Especiais ✨" />
        <div className="max-w-7xl mx-auto mt-20 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 8) * 0.05 }}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setLightbox(i)}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-auto group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--gold)]/0 group-hover:ring-[color:var(--gold)]/40 rounded-2xl transition" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative py-32 px-6">
        <SectionTitle eyebrow="Tempo" title="Todo esse tempo ao seu lado, minha Rapunzel 💖" />
        <div className="max-w-5xl mx-auto mt-20">
          <CountdownLove />
          <p className="text-center font-script text-2xl md:text-3xl text-rose mt-12">
            ...e que sejam infinitos.
          </p>
        </div>
      </section>

      {/* REASONS */}
      <section className="relative py-32 px-6">
        <SectionTitle eyebrow="Por que" title="Motivos pelos quais eu te amo" />
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-3xl bg-card/40 backdrop-blur-md border border-[color:var(--gold)]/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-rose-gold opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-gold rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="relative">
                <div className="text-5xl mb-4">{r.icon}</div>
                <h3 className="font-display text-xl text-gradient-gold mb-2 tracking-wider">{r.title}</h3>
                <p className="font-serif-body italic text-muted-foreground text-lg leading-relaxed">{r.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LOVE LETTER */}
      <section className="relative py-32 px-6">
        <SectionTitle eyebrow="Carta" title="Uma Carta Para Você" />
        <motion.div
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto mt-20 relative"
        >
          <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-3xl rounded-3xl" />
          <div className="relative bg-card/80 backdrop-blur-xl border border-[color:var(--gold)]/40 rounded-3xl p-8 md:p-16 shadow-rose">
            <div className="font-script text-4xl text-gradient-gold mb-8 text-center">Meu amor,</div>
            <div className="font-serif-body text-lg md:text-xl leading-relaxed text-foreground/90 space-y-5">
              <p>Hoje completamos 1 ano e 8 meses juntos. O quanto eu te amo é indescritível, mas vou tentar colocar em palavras.</p>
              <p>Eu amo o quanto você é inteligente, elegante, engraçada, chata, irritante e bagunceira. Amo você tentando ser delicada, sendo uma gostosona ao mesmo tempo. Eu amo cada detalhe seu.</p>
              <p>Eu amo quando você me abraça. É como se, naquele momento, eu não precisasse mais me cobrar tanto. Sinto apenas um calor confortável e acolhedor que faz tudo ficar mais leve. Quando estou com você, consigo esquecer um pouco de todas as cobranças que faço a mim mesmo.</p>
              <p>Lá no fundo, existe uma parte de mim que não consegue aceitar que eu não tenha que te dar uma vida de princesa. Por isso, às vezes não durmo bem e vivo me cobrando cada vez mais. Mas quando estou ao seu lado, tudo fica mais leve. Você me faz sentir acolhido, protegido e amado.</p>
              <p>Você é uma pessoa em quem eu posso confiar. Mesmo com tudo o que passamos, eu sei que sempre conseguimos nos resolver, porque sei que você não desiste da gente. E isso me dá forças para dar o meu melhor todos os dias por nós.</p>
              <p className="text-gradient-gold font-medium">Eu te amo, minha Rapunzel. Você é o amor da minha vida.</p>
              <p>Me desculpa por tudo o que já fiz e que acabou te magoando, ou pelas vezes em que me comportei de uma forma que você não gostou. A verdade é que eu ainda estou aprendendo a conviver melhor com as pessoas. Às vezes sou grosso, teimoso ou ajo de uma forma que não deveria.</p>
              <p>Mas tenho a melhor mulher ao meu lado, alguém que me ajuda a melhorar todos os dias, que nunca me deixa sozinho e que faz de tudo por mim. Sou muito grato por ter você na minha vida.</p>
              <p>Obrigado por cada abraço, cada sorriso, cada conversa, cada momento e por nunca desistir de nós.</p>
              <p className="font-script text-3xl text-rose text-center pt-4">Eu te amo, meu amor. 💖</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SURPRISE */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle eyebrow="Para você" title="Tem uma surpresa..." />
          <motion.button
            onClick={openSurprise}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="mt-12 inline-block px-12 py-5 rounded-full bg-gradient-rose-gold text-primary-foreground font-display tracking-[0.25em] text-sm md:text-base shadow-rose hover:shadow-glow transition-all"
          >
            ✦ Abra Sua Surpresa ✦
          </motion.button>
        </div>

        {/* Heart burst */}
        <AnimatePresence>
          {burst && (
            <div className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center">
              {Array.from({ length: 40 }).map((_, i) => {
                const angle = (i / 40) * Math.PI * 2;
                const dist = 200 + Math.random() * 300;
                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 1.5 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute text-3xl"
                    style={{ color: i % 2 ? "oklch(0.85 0.15 85)" : "oklch(0.78 0.12 10)" }}
                  >
                    ♥
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {surpriseOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto"
              onClick={() => setSurpriseOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85 }}
                transition={{ type: "spring", damping: 18 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl bg-card/90 border border-[color:var(--gold)]/40 rounded-3xl p-8 md:p-12 shadow-rose my-12"
              >
                <div className="absolute -inset-2 bg-gradient-gold opacity-30 blur-2xl rounded-3xl -z-10" />
                <div className="text-center font-script text-3xl text-gradient-gold mb-6">Para o amor da minha vida 💖</div>
                <div className="font-serif-body text-base md:text-lg leading-relaxed space-y-4 text-foreground/90">
                  <p>Se eu pudesse escolher novamente, escolheria você em todas as vidas, em todos os tempos e em todos os universos.</p>
                  <p>Porque você é o meu tudo. Eu te amo, amor da minha vida, e não quero te perder nunca.</p>
                  <p>Obrigado por existir. Obrigado por fazer parte da minha vida e por ser essa pessoa incrível que me faz feliz todos os dias.</p>
                  <p>Você é uma princesa. E mesmo que eu tivesse uma vida infinita, eu escolheria você em todas elas.</p>
                  <p>Sou tão apaixonado por você que só de sentir o seu cheiro eu fico animado. Só de estar ao seu lado me sinto em paz. Só de tocar você, sinto um peso enorme saindo dos meus ombros. Meu coração acelera cada vez mais quando estou perto de você, minha Rapunzel.</p>
                  <p>Se a lua refletisse tudo o que eu sinto por você, o céu inteiro brilharia apenas para você.</p>
                  <p className="text-gradient-gold italic">"Se eu tivesse que escolher entre respirar e te amar, eu usaria meu último fôlego para dizer que te amo."</p>
                  <p>Você é o amor da minha vida, minha Rapunzel, meu sonho. Eu te amo infinitamente, meu amor. 💖</p>
                </div>
                <button onClick={() => setSurpriseOpen(false)} className="mt-8 mx-auto block px-6 py-2 rounded-full border border-[color:var(--gold)]/40 text-gold hover:bg-[color:var(--gold)]/10 transition">
                  fechar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* FOOTER */}
      <footer className="relative py-16 px-6 border-t border-[color:var(--gold)]/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-script text-2xl md:text-3xl text-gradient-gold mb-3">
            Feito com todo o meu amor para você, amor da minha vida, minha Rapunzel 💖
          </p>
          <p className="font-serif-body italic text-muted-foreground">
            — do amor da sua vida (Matheus)
          </p>
        </div>
      </footer>

      <Lightbox
        src={lightbox !== null ? gallery[lightbox] : null}
        onClose={() => setLightbox(null)}
        onPrev={() => setLightbox((p) => (p === null ? null : (p - 1 + gallery.length) % gallery.length))}
        onNext={() => setLightbox((p) => (p === null ? null : (p + 1) % gallery.length))}
      />
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="text-center max-w-3xl mx-auto"
    >
      <div className="font-script text-rose text-xl md:text-2xl mb-3">— {eyebrow} —</div>
      <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-gradient-gold leading-tight">{title}</h2>
      <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
    </motion.div>
  );
}

function TimelineItem({ item, index }: { item: { title: string; img: string; text: string }; index: number }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9 }}
      className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-24 ${isLeft ? '' : 'md:[direction:rtl]'}`}
    >
      <div className={`relative group ${isLeft ? '' : 'md:[direction:ltr]'}`}>
        <div className="absolute -inset-2 bg-gradient-gold opacity-30 blur-2xl rounded-3xl group-hover:opacity-50 transition-opacity" />
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--gold)]/30 shadow-rose">
          <img src={item.img} alt={item.title} className="w-full h-[400px] md:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      </div>
      <div className={isLeft ? '' : 'md:[direction:ltr]'}>
        <div className="font-script text-rose text-2xl mb-2">Capítulo {String(index + 1).padStart(2, '0')}</div>
        <h3 className="font-display text-3xl md:text-4xl text-gradient-gold mb-6">{item.title}</h3>
        <p className="font-serif-body text-lg md:text-xl leading-relaxed text-foreground/85">{item.text}</p>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-gold shadow-glow hidden md:block" style={{ top: '50%' }} />
    </motion.div>
  );
}
