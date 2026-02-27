import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

/* ---------------- REALISTIC BALLOON ---------------- */
const RealisticBalloon = ({ color, left, delay, size, z = 30 }) => {
  return (
    <motion.div
      initial={{ y: "110vh" }}
      animate={{
        y: ["110vh", "-25vh"],
        x: [0, 25, -25, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 20 + Math.random() * 8,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="absolute flex flex-col items-center pointer-events-none"
      style={{ left, zIndex: z }}
    >
      {/* Balloon Body */}
      <div
        className="rounded-[50%_50%_50%_50%_/_65%_65%_35%_35%] relative overflow-hidden shadow-2xl"
        style={{
          width: size,
          height: size * 1.3,
          background: `
            radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, ${color} 0%, rgba(0,0,0,0.3) 120%)
          `,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="absolute top-[15%] left-[20%] w-[25%] h-[18%] bg-white/40 rounded-full blur-sm" />
      </div>

      {/* Knot */}
      <div
        style={{ background: color }}
        className="w-3 h-2 -mt-1"
      />

      {/* String */}
      <motion.div
        animate={{ rotate: [0, 12, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-[1px] h-40 bg-gradient-to-b from-slate-400/20 to-transparent origin-top"
      />
    </motion.div>
  );
};

const BirthdayWishes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    subject: "A Letter For You 🤍",
    message: `I am not your heart,
but I miss you more than words can explain.

I am not your family,
yet I care for you like my own.

I am not your blood,
but I’m ready to share your pain and tears.

I’ll stand by you in silence and storms alike —
because I’m your best friend,
always here, no matter what,
even when the world feels heavy.

And I will always remind you —
you are stronger than you think.`,
    signature: "Happy Birthday, Moti 🤍",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-[#fffafb] via-[#fdecef] to-[#fff5f7] overflow-hidden font-serif">

      {/* ---------------- SOFT GLOW BACKGROUND ---------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-300/20 blur-3xl"
            style={{
              width: 300,
              height: 300,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -60, 0], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 12 + i, repeat: Infinity }}
          />
        ))}
      </div>

      {/* ---------------- BALLOONS ABOVE CONTENT ---------------- */}
      <div className="absolute inset-0 pointer-events-none">
        <RealisticBalloon color="#fb7185" left="8%" delay={0} size={90} />
        <RealisticBalloon color="#f472b6" left="25%" delay={5} size={75} />
        <RealisticBalloon color="#fca5a5" left="70%" delay={2} size={100} />
        <RealisticBalloon color="#fcd34d" left="90%" delay={7} size={70} />
      </div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="relative z-20 w-full max-w-lg">

        <AnimatePresence mode="wait">

          {/* CLOSED ENVELOPE */}
          {!isOpen && (
            <motion.div
              key="closed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6 }}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer relative"
            >
              <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(225,29,72,0.15)] border border-rose-100 p-14 text-center">
                <p className="text-rose-500 text-xs tracking-[0.5em] uppercase mb-6 font-bold">
                  {content.subject}
                </p>
                <p className="text-rose-400 italic text-sm opacity-70">
                  Tap to open
                </p>
              </div>

              {/* Seal */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center shadow-xl">
                  <Heart className="text-white fill-white" size={24} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* OPENED LETTER */}
          {isOpen && (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white/95 backdrop-blur-xl border border-rose-100 rounded-[3rem] shadow-[0_30px_100px_rgba(225,29,72,0.2)] p-10 md:p-16"
            >
              <div className="space-y-12 text-center">

                {/* Animated Heart */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex justify-center"
                >
                  <Heart className="text-rose-400 fill-rose-400/30" size={70} />
                </motion.div>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="whitespace-pre-line text-lg md:text-2xl italic text-rose-700 leading-[2.1]"
                >
                  {content.message}
                </motion.p>

                {/* Signature */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-2xl md:text-4xl italic text-rose-600 pt-8"
                >
                  {content.signature}
                </motion.p>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default BirthdayWishes;