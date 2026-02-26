import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Sparkles, ShieldCheck } from "lucide-react";

const SecretRomanticPage = () => {
  const [nickname, setNickname] = useState("");
  const [stage, setStage] = useState("lock");

  const checkNickname = () => {
    if (nickname.trim().toLowerCase() === "hayati") {
      setStage("intro");
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#fff0f3] via-[#fde2e7] to-[#fff5f7] flex items-center justify-center px-6 py-20 font-serif overflow-hidden">

      {/* Soft Floating Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-300/20 blur-3xl"
            style={{
              width: 250,
              height: 250,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-xl bg-white/80 backdrop-blur-xl border border-rose-100 rounded-[3rem] p-8 md:p-12 shadow-[0_30px_80px_rgba(225,29,72,0.15)]"
      >
        <AnimatePresence mode="wait">

          {/* LOCK */}
          {stage === "lock" && (
            <motion.div
              key="lock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-8"
            >
              <Lock className="mx-auto text-rose-400" size={32} />
              <h2 className="text-xs tracking-[0.6em] uppercase text-rose-400">
                Private Confession
              </h2>

              <input
                type="text"
                placeholder="Enter the final nickname..."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-transparent border-b border-rose-200 text-center py-3 outline-none focus:border-rose-400 text-lg italic"
              />

              <button
                onClick={checkNickname}
                className="text-xs tracking-[0.4em] uppercase text-rose-500 hover:text-rose-600 transition-all"
              >
                Unlock
              </button>
            </motion.div>
          )}

          {/* INTRO */}
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              <Sparkles className="mx-auto text-amber-400" size={32} />
              <p className="text-xl md:text-2xl italic text-rose-700">
                "We will not talk about this thing."
              </p>
              <button
                onClick={() => setStage("question")}
                className="px-8 py-3 bg-rose-100 rounded-full border border-rose-200 text-sm tracking-widest hover:bg-rose-200 transition-all"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* QUESTION */}
          {stage === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-10"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="mx-auto text-rose-500 fill-rose-500" size={42} />
              </motion.div>

              <p className="text-xl italic text-rose-700">
                Are you ready to read my feelings?
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => setStage("message")}
                  className="px-10 py-3 bg-rose-500/20 rounded-2xl border border-rose-400/40 hover:bg-rose-500/30 transition-all"
                >
                  Yes, I am
                </button>

                <button
                  onClick={() => setStage("strong")}
                  className="px-10 py-3 bg-white/60 rounded-2xl border border-rose-200 hover:bg-white transition-all text-rose-500"
                >
                  No, Not Yet
                </button>
              </div>
            </motion.div>
          )}

          {/* STRONG */}
          {stage === "strong" && (
            <motion.div
              key="strong"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-6 py-10"
            >
              <ShieldCheck className="mx-auto text-emerald-500" size={48} />
              <p className="text-2xl italic text-rose-700">
                You did good.
                <br />
                And you are strong.
              </p>
            </motion.div>
          )}

          {/* MESSAGE */}
         {stage === "message" && (
  <motion.div
    key="message"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="relative space-y-16 text-center"
  >
    {/* Soft Heart Glow Background */}
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
      transition={{ duration: 6, repeat: Infinity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <Heart size={260} className="text-rose-300 fill-rose-300 blur-3xl" />
    </motion.div>

    <div className="relative z-10 space-y-14 max-w-2xl mx-auto">
      {[
        "If a million loved you, I am one of them.\nIf only one loved you, it was me.\nIf no one loved you, then know that I am dead.",
        "I care about you more than I ever manage to say.",
        "When you're silent, I worry.\nWhen you cry, it hurts me too.",
        "I'm scared of losing you. You matter to me more than you know.",
        "I'd fight anything just to see you smile.",
        "I got attached to you without planning it.",
        "You stay in my head, in my habits, in my feelings.",
        "That's the truth I don't hide anymore."
      ].map((msg, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.6, duration: 1.2 }}
          className="whitespace-pre-line text-lg md:text-2xl italic text-rose-700 leading-[2.1] tracking-wide"
        >
          {msg}
        </motion.p>
      ))}
    </div>

    {/* Closing Line */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5 }}
      className="pt-16 text-xs tracking-[0.6em] uppercase text-rose-400"
    >
      End of the Unspoken Truth
    </motion.div>
  </motion.div>
)}

        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default SecretRomanticPage;