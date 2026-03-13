import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Sparkles, ShieldCheck } from "lucide-react";

/* ---------------- SOULFUL SPIRIT HEART (REAL LOVE) ---------------- */

const SpiritHeart = ({ color = "#fb7185", left, delay, size, depth = 1 }) => {
  const duration = 15 + Math.random() * 10;
  const opacityValue = depth === 0.6 ? 0.2 : 0.5;
  const blurValue = depth === 0.6 ? "2px" : "0px";

  return (
    <motion.div
      initial={{ y: "110vh", opacity: 0, scale: 0.8 }}
      animate={{
        y: "-20vh",
        opacity: [0, opacityValue, opacityValue, 0],
        x: [0, 25 * depth, -25 * depth, 0],
        rotate: [0, 15, -15, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="absolute flex flex-col items-center pointer-events-none"
      style={{ left, filter: `blur(${blurValue})`, zIndex: depth * 10 }}
    >
      {/* RADIANT AURA */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ backgroundColor: color }}
      />

      {/* THE HEART (Pulsing like a heartbeat) */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Heart 
          size={size} 
          className="text-rose-400 fill-rose-400/30" 
          strokeWidth={1.5}
          style={{ 
            filter: `drop-shadow(0 0 10px ${color}44)`
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const SecretRomanticPage = () => {
  const [nickname, setNickname] = useState("");
  const [stage, setStage] = useState("lock");
  const [error, setError] = useState("");

  const checkNickname = () => {
    if (nickname.trim().toLowerCase() === "hayati") {
      setStage("intro");
      setError("");
    } else {
      setError("Incorrect nickname. Please try again.");
    }
  };

  const sparkles = useMemo(() => [...Array(20)].map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5
  })), []);

  return (
    <section className="relative min-h-screen bg-[#fffafa] flex items-center justify-center px-6 py-20 font-serif overflow-hidden">
      
      {/* 1. SOFT ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 via-white to-rose-100/20" />

      {/* 2. REAL LOVE HEARTS (No strings, just spirit) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <SpiritHeart left="8%" delay={0} size={40} />
        <SpiritHeart left="82%" delay={4} size={50} />
        <SpiritHeart left="22%" delay={2} size={30} depth={0.6} />
        <SpiritHeart left="72%" delay={7} size={35} depth={0.6} />
        <SpiritHeart left="48%" delay={10} size={45} />
        <SpiritHeart left="18%" delay={5} size={20} depth={0.6} />
        <SpiritHeart left="62%" delay={12} size={25} depth={0.6} />
        <SpiritHeart left="94%" delay={1} size={30} depth={0.6} />
      </div>

      {/* 3. AMBIENT SPARKLES */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-rose-200"
            style={{ width: s.size, height: s.size, top: s.top, left: s.left }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      {/* 4. MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-xl bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(225,29,72,0.05)]"
      >
        <AnimatePresence mode="wait">
          {stage === "lock" && (
            <motion.div
              key="lock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-8"
            >
              <Lock className="mx-auto text-rose-300" size={28} />
              <h2 className="text-xs tracking-[0.8em] uppercase text-rose-400 font-light">Private Confession</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter the secret nickname..."
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    if (error) setError("");
                  }}
                  className={`w-full bg-transparent border-b ${
                    error ? "border-red-300" : "border-rose-100"
                  } text-center py-3 outline-none focus:border-rose-300 text-lg italic transition-colors text-rose-800`}
                />
                {error && <p className="text-red-400 text-xs italic pt-1">{error}</p>}
              </div>
              <button
                onClick={checkNickname}
                className="text-[10px] tracking-[0.5em] uppercase text-rose-400 hover:text-rose-600 transition-all font-semibold"
              >
                Unlock
              </button>
            </motion.div>
          )}

          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              <Sparkles className="mx-auto text-amber-300" size={28} />
              <p className="text-xl md:text-2xl italic text-rose-800 font-light leading-relaxed">
                "We will not talk about this thing."
              </p>
              <button
                onClick={() => setStage("question")}
                className="px-10 py-2.5 bg-rose-400 text-white rounded-full shadow-lg shadow-rose-100 text-xs tracking-widest hover:bg-rose-500 transition-all"
              >
                Continue
              </button>
            </motion.div>
          )}

          {stage === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-10"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="mx-auto text-rose-500 fill-rose-500/20" size={40} />
              </motion.div>
              <p className="text-xl italic text-rose-800">Are you ready to read my feelings?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={() => setStage("message")}
                  className="text-sm tracking-[0.2em] uppercase text-rose-500 font-bold hover:text-rose-700 transition-all"
                >
                  Yes, I am
                </button>
                <button
                  onClick={() => setStage("strong")}
                  className="text-sm tracking-[0.2em] uppercase text-gray-400 font-light hover:text-rose-300 transition-all"
                >
                  Not Yet
                </button>
              </div>
            </motion.div>
          )}

          {stage === "strong" && (
            <motion.div
              key="strong"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-6 py-10"
            >
              <ShieldCheck className="mx-auto text-emerald-400" size={42} />
              <p className="text-2xl italic text-rose-800 font-light">You did good.<br />And you are strong.</p>
              <button onClick={() => setStage("question")} className="text-xs text-rose-300 underline underline-offset-4">I am ready now</button>
            </motion.div>
          )}

          {stage === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative space-y-16 text-center max-h-[65vh] overflow-y-auto custom-scrollbar"
            >
              <div className="relative z-10 space-y-14 max-w-2xl mx-auto pb-10">
                {[
                  "I don't know exactly when it started.",
                  "But somewhere along the way… you became the person who makes my days feel different.",
                  "When you are with me, I feel like the happiest person in the world.",
                  "And when you are not there… something always feels missing.",
                  "I notice myself becoming more careful with you.\nMaybe even a little jealous.",
                  "Not because I want to control you…\nbut because you became someone very precious to me.",
                  "There is one moment I can never forget.",
                  "When I lost my senses in the hospital…\nand when I opened my eyes…",
                  "You were there.\nHolding my hand.",
                  "I saw the fear on your face.\nI saw how much you cared.",
                  "And that night on the video call…\nyou cried for me.",
                  "That moment changed something inside me.",
                  "And when I drop you at the station…",
                  "I always feel this quiet sadness.",
                  "Deep inside, I wish I could go with you.",
                  "If life ever gave me that chance…\nI would never let that train leave without me beside you.",
                  "So today… I want to say something honestly."
                ].map((msg, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2 }}
                    className="whitespace-pre-line text-lg md:text-2xl italic text-rose-900/70 leading-relaxed font-light px-4"
                  >
                    {msg}
                  </motion.p>
                ))}

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                  className="pt-20"
                >
                  <p className="text-5xl md:text-7xl italic text-rose-600 font-bold mb-4">
                    I love you.
                  </p>
                  <p className="text-lg italic text-rose-400">
                    — Shihab
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default SecretRomanticPage;