import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Music, Volume2 } from "lucide-react";

/* ---------------- BALLOON COMPONENT ---------------- */
const RealisticBalloon = ({ color, left, delay, size }) => {
  return (
    <motion.div
      initial={{ y: "110vh" }}
      animate={{
        y: ["110vh", "-20vh"],
        x: [0, 20, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 18 + Math.random() * 10,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      whileHover={{ scale: 1.1 }}
      className="absolute flex flex-col items-center cursor-pointer pointer-events-auto z-0"
      style={{ left }}
    >
      <div
        className="rounded-[50%_50%_50%_50%_/_65%_65%_35%_35%] relative overflow-hidden shadow-2xl"
        style={{
          width: size,
          height: size * 1.3,
          background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, transparent 40%), radial-gradient(circle at 50% 50%, ${color} 0%, rgba(0,0,0,0.3) 120%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="absolute top-[15%] left-[20%] w-[25%] h-[18%] bg-white/40 rounded-full blur-sm" />
      </div>

      <div style={{ background: color }} className="w-3 h-2 -mt-1" />

      <motion.div
        animate={{ rotate: [0, 12, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-[1px] h-36 bg-gradient-to-b from-slate-400/20 to-transparent origin-top"
      />
    </motion.div>
  );
};

/* ---------------- HERO SECTION ---------------- */
const Hero = ({ lang = "EN", setLang, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  /* ---------------- SCROLL EFFECT ---------------- */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.15;
  }, []);

  /* ---------------- MUSIC TOGGLE ---------------- */
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked");
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  /* ---------------- CONTENT ---------------- */
  const content = {
    EN: {
      date: "March 15, 2026",
      greeting: "Happy Birthday",
      name: "Nourin",
      quote:
        "In all the chaos of life, you became my peace without even trying.",
      scroll: "Scroll Our Story",
      signature: "Shihab",
    },
    BN: {
      date: "১৫ মার্চ, ২০২৬",
      greeting: "শুভ জন্মদিন",
      name: "নওরিন",
      quote:
        "সব কোলাহলের ভিড়ে তুই-ই আমার শান্তি হয়ে গেছিস, কোনো চেষ্টা ছাড়াই।",
      scroll: "আমাদের গল্প ",
      signature: "শিহাব",
    },
  };

  const t = content[lang];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#fffafb] to-[#fdecef] px-6 py-20"
    >
      {/* AUDIO */}
      <audio ref={audioRef} loop src="/audio/f.mp3" />

      {/* CONTROLS */}
      <div className="fixed top-6 right-6 z-[100] flex gap-3">
        <button
          onClick={() => setLang(lang === "EN" ? "BN" : "EN")}
          className="bg-white/60 backdrop-blur-xl border border-rose-100 px-5 py-2 rounded-2xl text-[11px] font-bold text-rose-500 shadow-sm active:scale-90 transition-all uppercase tracking-widest"
        >
          {lang === "EN" ? "Bengali" : "English"}
        </button>

        <button
          onClick={toggleMusic}
          className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${
            isPlaying
              ? "bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.6)]"
              : "bg-white/80 text-rose-500 backdrop-blur-md"
          }`}
        >
          {isPlaying ? <Volume2 size={18} /> : <Music size={18} />}
        </button>
      </div>

      {/* BALLOONS */}
      <div className="absolute inset-0 pointer-events-none opacity-40 blur-[1px]">
        <RealisticBalloon color="#fca5a5" left="15%" delay={5} size={50} />
        <RealisticBalloon color="#f9a8d4" left="75%" delay={8} size={45} />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <RealisticBalloon color="#fb7185" left="8%" delay={0} size={75} />
        <RealisticBalloon color="#f472b6" left="85%" delay={2} size={85} />
        <RealisticBalloon color="#fcd34d" left="92%" delay={6} size={65} />
      </div>

      {/* CONTENT */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 text-center max-w-2xl space-y-8 pointer-events-none"
      >
        <p className="text-rose-400 tracking-[0.5em] text-[10px] uppercase font-black">
          {t.date}
        </p>

        <h1 className="text-4xl md:text-6xl font-serif text-rose-600/90 italic">
          {t.greeting}
        </h1>

        <h2 className="text-6xl md:text-9xl font-black text-rose-700 tracking-tight">
          {t.name}
        </h2>

        <motion.div
          style={{ y: imgY }}
          className="flex justify-center mt-12 pointer-events-auto"
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-rose-300 blur-3xl opacity-30 scale-125" />
            <img
              src="/images/personal/n2.jpg"
              alt="Nourin"
              className="relative w-64 h-64 md:w-96 md:h-96 object-cover rounded-full shadow-[0_20px_50px_rgba(225,29,72,0.2)] border-8 border-white"
            />
          </motion.div>
        </motion.div>

        <p className="text-slate-500 italic text-lg md:text-2xl font-serif leading-relaxed px-6 py-4">
          {t.quote}
        </p>

        <div className="text-rose-400 text-3xl font-serif italic pt-4 opacity-80">
          — {t.signature}
        </div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 flex flex-col items-center">
        <span className="text-[9px] uppercase tracking-[0.6em] text-rose-500 font-bold mb-3">
          {t.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-rose-400 via-rose-300 to-transparent"
        />
      </div>
    </section>
  );
};

export default Hero;