import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Music, Volume2 } from "lucide-react";

/* ---------------- BALLOON COMPONENT ---------------- */
const RealisticBalloon = ({ color, left, delay, size }) => {
  const controls = useAnimation();

  return (
    <motion.div
      initial={{ y: "110vh" }}
      animate={{ 
        y: ["110vh", "-20vh"],
        x: [0, 20, -20, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 18 + Math.random() * 10, 
        repeat: Infinity, 
        delay, 
        ease: "linear" 
      }}
      // Physics-based micro-interaction: Balloon "reacts" to mouse
      whileHover={{ scale: 1.1, x: Math.random() > 0.5 ? 40 : -40 }}
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
const Hero = ({ lang, setLang, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  // Parallax Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.12;
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  const content = {
    EN: {
      date: "March 15, 2026",
      greeting: "Happy Birthday",
      name: "Nourin",
      quote: "“Maybe some souls are just made of moonlight and soft rain.”",
      scroll: "Scroll Our Story"
    },
    BN: {
      date: "১৫ মার্চ, ২০২৬",
      greeting: "শুভ জন্মদিন",
      name: "নওরিন",
      quote: "“মানুষের আনন্দ দেখাও আনন্দের কাজ। আবার মানুষের কষ্ট দেখাও কষ্টের কাজ।”",
      scroll: "আমাদের গল্প দেখুন"
    }
  };

  const t = content[lang];

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#fffafb] to-[#fdecef] px-6 py-20"
    >
      <audio ref={audioRef} loop src="/audio/f.mp3" />

      {/* Modern Glassmorphism Controls */}
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
            isPlaying ? "bg-rose-500 text-white" : "bg-white/80 text-rose-500 backdrop-blur-md"
          }`}
        >
          {isPlaying ? <Volume2 size={18} /> : <Music size={18} />}
        </button>
      </div>

      {/* Depth Layer: Distant Balloons */}
      <div className="absolute inset-0 pointer-events-none opacity-40 blur-[1px]">
        <RealisticBalloon color="#fca5a5" left="15%" delay={5} size={50} />
        <RealisticBalloon color="#f9a8d4" left="75%" delay={8} size={45} />
      </div>

      {/* Interaction Layer: Close Balloons */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <RealisticBalloon color="#fb7185" left="8%" delay={0} size={75} />
        <RealisticBalloon color="#f472b6" left="85%" delay={2} size={85} />
        <RealisticBalloon color="#fcd34d" left="92%" delay={6} size={65} />
      </div>

      {/* Main Content with Staggered Entrance & Parallax */}
      <motion.div
        key={lang}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: textY }}
        className="relative z-10 text-center max-w-2xl space-y-8 pointer-events-none"
      >
        <motion.p variants={itemVariants} className="text-rose-400 tracking-[0.5em] text-[10px] uppercase font-black">
          {t.date}
        </motion.p>

        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-serif text-rose-600/90 lowercase italic">
          {t.greeting}
        </motion.h1>

        <motion.h2 variants={itemVariants} className="text-6xl md:text-9xl font-black text-rose-700 tracking-tighter drop-shadow-sm">
          {t.name}
        </motion.h2>

        {/* Breathing Portrait with Parallax Counter-Motion */}
        <motion.div variants={itemVariants} style={{ y: imgY }} className="flex justify-center mt-12 pointer-events-auto">
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-full bg-rose-300 blur-3xl opacity-30 scale-125 group-hover:scale-150 transition-transform duration-1000" />
            <img
              src="/images/personal/n2.jpg"
              alt="Nourin"
              className="relative w-64 h-64 md:w-96 md:h-96 object-cover rounded-full shadow-[0_20px_50px_rgba(225,29,72,0.2)] border-8 border-white"
            />
          </motion.div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-slate-500 italic text-lg md:text-2xl font-serif leading-relaxed px-6 py-4">
          {t.quote}
        </motion.p>

        <motion.div variants={itemVariants} className="text-rose-400 text-3xl font-serif italic pt-4 opacity-80">
          — {lang === "EN" ? "Shihab" : "শিহাব"}
        </motion.div>
      </motion.div>

      {/* Animated Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 flex flex-col items-center"
      >
        <span className="text-[9px] uppercase tracking-[0.6em] text-rose-500 font-bold mb-3">
          {t.scroll}
        </span>
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-rose-400 via-rose-300 to-transparent" 
        />
      </motion.div>
    </section>
  );
};

export default Hero;